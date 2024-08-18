//Definitions Database
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "PageSet", "Page", "Title", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_training", "_adv", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Advancement", "Title_Training", "Level", "CR", "XP", "Training Points", "PP", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Full Name", "Display Name", "HP", "WILL", "EN", "Initiative", "Carrying Capacity", "Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "ATR{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATR"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "SKL{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKL"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "JOB{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOB"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Role": {
				"name": "Role", "fieldName": "role", "group": "Type", "description": "", "variable": "ROL{0}{1}", "title": "Roles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "KNW{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "10", "modifiers": "_training", "linkedGroups": 3, "isResource": false, "modAttrs": ["KNW"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "_training", "value": 0, "multiplier": 1 }]
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "LNG{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "LOR{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "STY{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STY"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "TCH{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCH", "TCH"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"PageSet": {
				"name": "PageSet", "fieldName": "pageSet", "group": "Type", "description": "", "variable": "PGS{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "PAG{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Title": {
				"name": "Title", "fieldName": "title", "group": "Type", "description": "", "variable": "TTL{0}{1}", "title": "Title", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "DEF{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "SEN{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "Type", "description": "", "variable": "AFN{0}{1}", "title": "Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "CMB{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "SOC{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "TRA{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "STS{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "CND{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_info": {
				"name": "_info", "fieldName": "_info", "group": "VariableMod", "description": "", "variable": "_info", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_training": {
				"name": "_training", "fieldName": "_training", "group": "VariableMod", "description": "", "variable": "_training", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_adv": {
				"name": "_adv", "fieldName": "_adv", "group": "VariableMod", "description": "", "variable": "_adv", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "Affinity", "description": "", "variable": "wood", "title": "Wood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "Affinity", "description": "", "variable": "fire", "title": "Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "Affinity", "description": "", "variable": "earth", "title": "Earth", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "Affinity", "description": "", "variable": "metal", "title": "Metal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "Affinity", "description": "", "variable": "water", "title": "Water", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributeValueMediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributeValueGreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributeValueGood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributeValueAverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributeValueBad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier0": {
				"name": "JobTier0", "fieldName": "jobTier0", "group": "JobTier", "description": "", "variable": "0", "title": "Tier 0", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier1": {
				"name": "JobTier1", "fieldName": "jobTier1", "group": "JobTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier2": {
				"name": "JobTier2", "fieldName": "jobTier2", "group": "JobTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier3": {
				"name": "JobTier3", "fieldName": "jobTier3", "group": "JobTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier0": {
				"name": "LoreTier0", "fieldName": "loreTier0", "group": "LoreTier", "description": "", "variable": "0", "title": "Tier 0", "subGroup": "", "descriptions": ["", "", "", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Character Creator": {
				"name": "PageSet_Character Creator", "fieldName": "characterCreator", "group": "PageSet", "description": "", "variable": "PGScharacterCreator{0}", "title": "Character Creator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Core": {
				"name": "PageSet_Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "PGScore{0}", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Advancement": {
				"name": "PageSet_Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "PGSadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Training": {
				"name": "PageSet_Training", "fieldName": "training", "group": "PageSet", "description": "", "variable": "PGStraining{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "PAGorigin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, press Finish to populate this character's stats.", "On this page you can set your character's origins including their name, their primary element, and ancestry. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Jobs": {
				"name": "Page_Jobs", "fieldName": "jobs", "group": "Page", "description": "", "variable": "PAGjobs{0}", "title": "Jobs", "subGroup": "", "descriptions": ["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ", "On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.", "Gaining a rank in a job often grants new techniques to use when a job's techniques are active.", "You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Skills": {
				"name": "Page_Skills", "fieldName": "skills", "group": "Page", "description": "", "variable": "PAGskills{0}", "title": "Skills", "subGroup": "", "descriptions": ["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.", "Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.", "On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Knowledge": {
				"name": "Page_Knowledge", "fieldName": "knowledge", "group": "Page", "description": "", "variable": "PAGknowledge{0}", "title": "Knowledge", "subGroup": "", "descriptions": ["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ", "Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ", "Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.", "Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.", "On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Attributes": {
				"name": "Page_Attributes", "fieldName": "attributes", "group": "Page", "description": "", "variable": "PAGattributes{0}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.", "By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can have one attribute at a -1 penalty.", "You gain a number of attribute points equal to 6 + your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Styles": {
				"name": "Page_Styles", "fieldName": "styles", "group": "Page", "description": "", "variable": "PAGstyles{0}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_LearnTechniques": {
				"name": "Page_LearnTechniques", "fieldName": "learnTechniques", "group": "Page", "description": "", "variable": "PAGlearnTechniques{0}", "title": "Learn Styles and Techniques", "subGroup": "", "descriptions": ["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.", "All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.", "When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.", "You gain a number of technique points equal to 6 + your Character Rank x 2. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_SetStyles": {
				"name": "Page_SetStyles", "fieldName": "setStyles", "group": "Page", "description": "", "variable": "PAGsetStyles{0}", "title": "Set Styles", "subGroup": "", "descriptions": ["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. ", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Basics": {
				"name": "Page_Basics", "fieldName": "basics", "group": "Page", "description": "", "variable": "PAGbasics{0}", "title": "Basics", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "PAGcharacter{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "PAGoverview{0}", "title": "Overview", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "PAGdetails{0}", "title": "Details", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "PAGchat{0}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "PAGoptions{0}", "title": "Options", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "PAGgear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Actions": {
				"name": "Page_Actions", "fieldName": "actions", "group": "Page", "description": "", "variable": "PAGactions{0}", "title": "Actions", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Training": {
				"name": "Page_Training", "fieldName": "training", "group": "Page", "description": "", "variable": "PAGtraining{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Advancement": {
				"name": "Page_Advancement", "fieldName": "advancement", "group": "Page", "description": "", "variable": "PAGadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Advancement": {
				"name": "Title_Advancement", "fieldName": "advancement", "group": "Title", "description": "", "variable": "TTLadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Training": {
				"name": "Title_Training", "fieldName": "training", "group": "Title", "description": "", "variable": "TTLtraining{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "Advancement", "description": "", "variable": "level", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cR", "group": "Advancement", "description": "", "variable": "cr", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level."],
				"abbreviation": "CR", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xP", "group": "Advancement", "description": "", "variable": "xp", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "formula": "30", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["xp"],
				"formulaCalculations": [{ "modName": "", "value": 30, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Training Points": {
				"name": "Training Points", "fieldName": "trainingPoints", "group": "Training", "description": "", "variable": "trainingPoints", "title": "Training Points", "subGroup": "", "descriptions": ["Whenever you gain enough "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"PP": {
				"name": "PP", "fieldName": "pP", "group": "Training", "description": "", "variable": "pp", "title": "Progression", "subGroup": "", "descriptions": ["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ", "Once a character reaches 12 TP, they may spend their PP to gain a new knowledge or technique."],
				"abbreviation": "", "formula": "12", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["pp"],
				"formulaCalculations": [{ "modName": "", "value": 12, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bOD", "group": "Attribute", "description": "", "variable": "ATRbod{0}", "title": "Body", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRbod"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "pRC", "group": "Attribute", "description": "", "variable": "ATRprc{0}", "title": "Precision", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRprc"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qCK", "group": "Attribute", "description": "", "variable": "ATRqck{0}", "title": "Quickness", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRqck"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cNV", "group": "Attribute", "description": "", "variable": "ATRcnv{0}", "title": "Conviction", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRcnv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "iNT", "group": "Attribute", "description": "", "variable": "ATRint{0}", "title": "Intuition ", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRint"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rSN", "group": "Attribute", "description": "", "variable": "ATRrsn{0}", "title": "Reason", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRrsn"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "DEFbrace{0}", "title": "Brace", "subGroup": "Combat Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "DEFfortitude{0}", "title": "Fortitude", "subGroup": "Defense", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "DEFdisruption{0}", "title": "Disruption", "subGroup": "Combat Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "DEFhide{0}", "title": "Hide", "subGroup": "Defense", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "DEFreflex{0}", "title": "Reflex", "subGroup": "Combat Defense", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "formula": "7;Attribute_QCK", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": []
				,
				"formulaCalculations": []
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "DEFevasion{0}", "title": "Evasion", "subGroup": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "formula": "4;Attribute_QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "SENinsight{0}", "title": "Insight", "subGroup": "Social Sense", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "SENnotice{0}", "title": "Notice", "subGroup": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "SENscrutiny{0}", "title": "Scrutiny", "subGroup": "Social Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "group": "Sense", "description": "", "variable": "SENdetect{0}", "title": "Detect", "subGroup": "Sense", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "SENresolve{0}", "title": "Resolve", "subGroup": "Social Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "formula": "7;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "SENfreewill{0}", "title": "Freewill", "subGroup": "Sense", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "formula": "10;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "fullName", "group": "General", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "displayName", "group": "General", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hP", "group": "General", "description": "", "variable": "hp", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "formula": "10; CR*10; Level; Attribute_BOD", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "level", "ATRbod", "hp"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 10 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "ATRbod", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"WILL": {
				"name": "WILL", "fieldName": "wILL", "group": "General", "description": "", "variable": "will", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "formula": "10;CR*10;Level;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "level", "ATRcnv", "will"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 10 },
				{ "modName": "level", "value": 0, "multiplier": 1 },
				{ "modName": "ATRcnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"EN": {
				"name": "EN", "fieldName": "eN", "group": "General", "description": "", "variable": "en", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "initiative", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "formula": "CR;Attribute_QCK", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "ATRqck", "initiative"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "ATRqck", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carryingCapacity", "group": "Gear", "description": "", "variable": "capacity", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "formula": "40;Attribute_BOD*20", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": ["ATRbod", "capacity"],
				"formulaCalculations": [{ "modName": "", "value": 40, "multiplier": 1 },
				{ "modName": "ATRbod", "value": 0, "multiplier": 20 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hV", "group": "Combat", "description": "", "variable": "CMBhv{0}", "title": "Heal Value", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from healing abilities."],
				"abbreviation": "", "formula": "2;CR*2;Attribute_CNV", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "CMBarmor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "formula": "0", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "group": "Combat", "description": "", "variable": "CMBdurability{0}", "title": "Durability", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "CMBsurge{0}", "title": "Surge", "subGroup": "", "descriptions": ["Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "CMBchakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "formula": "3;CR", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "moveSpeed", "group": "Combat", "description": "", "variable": "CMBmoveSpeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "formula": "3", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "movePotency", "group": "Combat", "description": "", "variable": "CMBmovePotency{0}", "title": "Move Speed Die", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "formula": "6", "modifiers": "_tech", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "group": "Social", "description": "", "variable": "SOCapproval{0}", "title": "Approval", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "formula": "20;CR*15;Level;Attribute_CNV", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "SOCpatience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "formula": "CR*10;", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "TRAaccurate{0}", "title": "Accurate", "subGroup": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "TRAaffinity{0}", "title": "Affinity", "subGroup": "Technique Trait", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "TRAaffinity+{0}", "title": "Affinity+", "subGroup": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "aP", "group": "Trait", "description": "", "variable": "TRAaP{0}", "title": "AP:X", "subGroup": "Technique Trait", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "TRAbrutal{0}", "title": "Brutal", "subGroup": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "TRAfocus{0}", "title": "Focus", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "TRAfocus+{0}", "title": "Focus+", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "TRAmaterial{0}", "title": "Material", "subGroup": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "TRAsimple{0}", "title": "Simple", "subGroup": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "TRAvolatile{0}", "title": "Volatile", "subGroup": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "TRAvortex{0}", "title": "Vortex", "subGroup": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "TRAweapon{0}", "title": "Weapon", "subGroup": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "TRAwall{0}", "title": "Wall", "subGroup": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "TRAarcing{0}", "title": "Arcing", "subGroup": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "TRAshield{0}", "title": "Shield", "subGroup": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "TRAthrown{0}", "title": "Thrown", "subGroup": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-Handed", "group": "Trait", "description": "", "variable": "TRAtwo-Handed{0}", "title": "Two-Handed", "subGroup": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "TRAloud{0}", "title": "Loud", "subGroup": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "TRAflammable{0}", "title": "Flammable", "subGroup": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "TRAflexible{0}", "title": "Flexible", "subGroup": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "TRAfrozen{0}", "title": "Frozen", "subGroup": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "TRAsharp{0}", "title": "Sharp", "subGroup": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "TRAsturdy{0}", "title": "Sturdy", "subGroup": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "TRAtransparent{0}", "title": "Transparent", "subGroup": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "group": "Status", "description": "", "variable": "STSdowned{0}", "title": "Downed", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "group": "Status", "description": "", "variable": "STSengaged{0}", "title": "Engaged", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "group": "Status", "description": "", "variable": "STSethereal{0}", "title": "Ethereal", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "group": "Status", "description": "", "variable": "STSgrappled{0}", "title": "Grappled", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "group": "Status", "description": "", "variable": "STShidden{0}", "title": "Hidden", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiativePenalty", "group": "Status", "description": "", "variable": "STSinitiativePenalty{0}", "title": "Initiative Penalty", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "group": "Status", "description": "", "variable": "STSinvisible{0}", "title": "Invisible", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "group": "Status", "description": "", "variable": "STSrestrained{0}", "title": "Restrained", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "group": "Status", "description": "", "variable": "STSunconscious{0}", "title": "Unconscious", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "group": "Condition", "description": "", "variable": "CNDaflame{0}", "title": "Aflame", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "group": "Condition", "description": "", "variable": "CNDangered{0}", "title": "Angered", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "group": "Condition", "description": "", "variable": "CNDchilled{0}", "title": "Chilled", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "group": "Condition", "description": "", "variable": "CNDdelayed{0}", "title": "Delayed", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "group": "Condition", "description": "", "variable": "CNDdisgusted{0}", "title": "Disgusted", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "group": "Condition", "description": "", "variable": "CNDdying{0}", "title": "Dying", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "group": "Condition", "description": "", "variable": "CNDempowered{0}", "title": "Empowered", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "group": "Condition", "description": "", "variable": "CNDencouraged{0}", "title": "Encouraged", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "group": "Condition", "description": "", "variable": "CNDencumbered{0}", "title": "Encumbered", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "group": "Condition", "description": "", "variable": "CNDfrightened{0}", "title": "Frightened", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "group": "Condition", "description": "", "variable": "CNDhasted{0}", "title": "Hasted", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "group": "Condition", "description": "", "variable": "CNDimmobilized{0}", "title": "Immobilized", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "group": "Condition", "description": "", "variable": "CNDimpaired{0}", "title": "Impaired", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "group": "Condition", "description": "", "variable": "CNDjoyful{0}", "title": "Joyful", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "group": "Condition", "description": "", "variable": "CNDlaunched{0}", "title": "Launched", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "group": "Condition", "description": "", "variable": "CNDparalyzed{0}", "title": "Paralyzed", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "group": "Condition", "description": "", "variable": "CNDprone{0}", "title": "Prone", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "group": "Condition", "description": "", "variable": "CNDsaddened{0}", "title": "Saddened", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "group": "Condition", "description": "", "variable": "CNDsickened{0}", "title": "Sickened", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "group": "Condition", "description": "", "variable": "CNDstaggered{0}", "title": "Staggered", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "group": "Condition", "description": "", "variable": "CNDstunned{0}", "title": "Stunned", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "group": "Condition", "description": "", "variable": "CNDsurprised{0}", "title": "Surprised", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basicSet", "group": "Style", "description": "", "variable": "STYbasicSet{0}", "title": "Basic Set", "subGroup": "", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYbasicSet"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "group": "Style", "description": "", "variable": "STYswordplay{0}", "title": "Swordplay", "subGroup": "", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYswordplay"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "kiExtension", "group": "Style", "description": "", "variable": "STYkiExtension{0}", "title": "Ki Extension", "subGroup": "", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": ["STYkiExtension"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "SKLacrobatics{0}", "title": "Acrobatics", "subGroup": "", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLacrobatics_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "group": "Skill", "description": "", "variable": "SKLagility{0}", "title": "Agility", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLagility_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "SKLanalyze{0}", "title": "Analyze", "subGroup": "", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLanalyze_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "SKLbuild{0}", "title": "Build", "subGroup": "", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLbuild_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "SKLchannel{0}", "title": "Channel", "subGroup": "", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLchannel_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "SKLcharm{0}", "title": "Charm", "subGroup": "", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcharm_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "group": "Skill", "description": "", "variable": "SKLcommand{0}", "title": "Command", "subGroup": "", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcommand_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "group": "Skill", "description": "", "variable": "SKLconcoct{0}", "title": "Concoct", "subGroup": "", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLconcoct_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "SKLcook{0}", "title": "Cook", "subGroup": "", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLcook_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "group": "Skill", "description": "", "variable": "SKLdeception{0}", "title": "Deception", "subGroup": "", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLdeception_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "group": "Skill", "description": "", "variable": "SKLdisguise{0}", "title": "Disguise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLdisguise_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "SKLempathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLempathy_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "SKLenchant{0}", "title": "Enchant", "subGroup": "", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLenchant_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "SKLfinesse{0}", "title": "Finesse", "subGroup": "", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLfinesse_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "group": "Skill", "description": "", "variable": "SKLflexibility{0}", "title": "Flexibility", "subGroup": "", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLflexibility_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "group": "Skill", "description": "", "variable": "SKLgrappling{0}", "title": "Grappling", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLgrappling_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "group": "Skill", "description": "", "variable": "SKLheal{0}", "title": "Heal", "subGroup": "", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLheal_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "group": "Skill", "description": "", "variable": "SKLintimidation{0}", "title": "Intimidation", "subGroup": "", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLintimidation_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "group": "Skill", "description": "", "variable": "SKLleadership{0}", "title": "Leadership", "subGroup": "", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLleadership_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "group": "Skill", "description": "", "variable": "SKLmaneuver{0}", "title": "Maneuver", "subGroup": "", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmaneuver_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "group": "Skill", "description": "", "variable": "SKLmedicine{0}", "title": "Medicine", "subGroup": "", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmedicine_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "SKLmight{0}", "title": "Might", "subGroup": "", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLmight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "group": "Skill", "description": "", "variable": "SKLnegotiation{0}", "title": "Negotiation", "subGroup": "", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLnegotiation_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "group": "Skill", "description": "", "variable": "SKLpalming{0}", "title": "Palming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLpalming_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "group": "Skill", "description": "", "variable": "SKLphysique{0}", "title": "Physique", "subGroup": "", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLphysique_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "SKLpilot{0}", "title": "Pilot", "subGroup": "", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLpilot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "SKLresonance{0}", "title": "Resonance", "subGroup": "", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLresonance_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "SKLsearch{0}", "title": "Search", "subGroup": "", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsearch_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "SKLshoot{0}", "title": "Shoot", "subGroup": "", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLshoot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "SKLskirmish{0}", "title": "Skirmish", "subGroup": "", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLskirmish_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "SKLsneak{0}", "title": "Sneak", "subGroup": "", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsneak_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "group": "Skill", "description": "", "variable": "SKLsurvival{0}", "title": "Survival", "subGroup": "", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLsurvival_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "SKLthrow{0}", "title": "Throw", "subGroup": "", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLthrow_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "SKLtinker{0}", "title": "Tinker", "subGroup": "", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLtinker_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "SKLtraversal{0}", "title": "Traversal", "subGroup": "", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "formula": "8;CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "SKLtraversal_adv"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "group": "Language", "description": "", "variable": "LNGminere{0}", "title": "Minere", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "group": "Language", "description": "", "variable": "LNGjunal{0}", "title": "Junal", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "group": "Language", "description": "", "variable": "LNGapollen{0}", "title": "Apollen", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "group": "Language", "description": "", "variable": "LNGlib{0}", "title": "Lib", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "group": "Language", "description": "", "variable": "LNGcert{0}", "title": "Cert", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "group": "Language", "description": "", "variable": "LNGbyric{0}", "title": "Byric", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "group": "Language", "description": "", "variable": "LNGdustell{0}", "title": "Dustell", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "group": "Language", "description": "", "variable": "LNGmuralic{0}", "title": "Muralic", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "group": "Language", "description": "", "variable": "LNGshira{0}", "title": "Shira", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "group": "Language", "description": "", "variable": "LNGciel{0}", "title": "Ciel", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "group": "Language", "description": "", "variable": "LNGciteq{0}", "title": "Citeq", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "group": "Language", "description": "", "variable": "LNGmanstan{0}", "title": "Manstan", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "group": "Language", "description": "", "variable": "LNGsalkan{0}", "title": "Salkan", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "group": "Language", "description": "", "variable": "LNGsansic{0}", "title": "Sansic", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "group": "Language", "description": "", "variable": "LNGsilq{0}", "title": "Silq", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "group": "Language", "description": "", "variable": "LNGkleikan{0}", "title": "Kleikan", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "group": "Language", "description": "", "variable": "LNGcrinere{0}", "title": "Crinere", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "group": "Language", "description": "", "variable": "LNGpalmic{0}", "title": "Palmic", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "group": "Language", "description": "", "variable": "LNGshorespeak{0}", "title": "Shorespeak", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "group": "Language", "description": "", "variable": "LNGverdeni{0}", "title": "Verdeni", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "group": "Language", "description": "", "variable": "LNGvulca{0}", "title": "Vulca", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "group": "Language", "description": "", "variable": "LNGemotion{0}", "title": "Emotion", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "group": "Language", "description": "", "variable": "LNGempathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "group": "Language", "description": "", "variable": "LNGwolfwarg{0}", "title": "Wolfwarg", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "group": "Language", "description": "", "variable": "LNGjovean{0}", "title": "Jovean", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "group": "Language", "description": "", "variable": "LNGmytikan{0}", "title": "Mytikan", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Academics": {
				"name": "Lore_Academics", "fieldName": "academics", "group": "Lore", "description": "", "variable": "LORacademics{0}", "title": "Academics", "subGroup": "", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "LORhealth{0}", "title": "Health", "subGroup": "", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "LORmana{0}", "title": "Mana", "subGroup": "", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "LORmathematics{0}", "title": "Mathematics", "subGroup": "", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "LORnature{0}", "title": "Nature", "subGroup": "", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "LORschool{0}", "title": "School", "subGroup": "", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "LORspirit{0}", "title": "Spirit", "subGroup": "", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "LORwarfare{0}", "title": "Warfare", "subGroup": "", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "LORzoology{0}", "title": "Zoology", "subGroup": "", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Profession": {
				"name": "Lore_Profession", "fieldName": "profession", "group": "Lore", "description": "", "variable": "LORprofession{0}", "title": "Profession", "subGroup": "", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "LORfarming{0}", "title": "Farming", "subGroup": "", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "LORfishing{0}", "title": "Fishing", "subGroup": "", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "LORhunting{0}", "title": "Hunting", "subGroup": "", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "LORlegal{0}", "title": "Legal", "subGroup": "", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "LORmercantile{0}", "title": "Mercantile", "subGroup": "", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "LORmining{0}", "title": "Mining", "subGroup": "", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Craftmanship": {
				"name": "Lore_Craftmanship", "fieldName": "craftmanship", "group": "Lore", "description": "", "variable": "LORcraftmanship{0}", "title": "Craftmanship", "subGroup": "", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "LORalchemy{0}", "title": "Alchemy", "subGroup": "", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "LORarchitecture{0}", "title": "Architecture", "subGroup": "", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "LORbrewing{0}", "title": "Brewing", "subGroup": "", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "LORcooking{0}", "title": "Cooking", "subGroup": "", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "LORengineering{0}", "title": "Engineering", "subGroup": "", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "LORglassblowing{0}", "title": "Glassblowing", "subGroup": "", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "LORleatherworking{0}", "title": "Leatherworking", "subGroup": "", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "LORsculpting{0}", "title": "Sculpting", "subGroup": "", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "LORsmithing{0}", "title": "Smithing", "subGroup": "", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "LORweaving{0}", "title": "Weaving", "subGroup": "", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Geography": {
				"name": "Lore_Geography", "fieldName": "geography", "group": "Lore", "description": "", "variable": "LORgeography{0}", "title": "Geography", "subGroup": "", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "LORaridsha{0}", "title": "Aridsha", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "LORceres{0}", "title": "Ceres", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "LORcolswei{0}", "title": "Colswei", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "LORkhem{0}", "title": "Khem", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "LORnovus{0}", "title": "Novus", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "LORwalthair{0}", "title": "Walthair", "subGroup": "", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "LORwayling{0}", "title": "Wayling", "subGroup": "", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "etherealPlane", "group": "Lore", "description": "", "variable": "LORetherealPlane{0}", "title": "Ethereal Plane", "subGroup": "", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_History": {
				"name": "Lore_History", "fieldName": "history", "group": "Lore", "description": "", "variable": "LORhistory{0}", "title": "History", "subGroup": "", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridshaHistory", "group": "Lore", "description": "", "variable": "LORaridshaHistory{0}", "title": "Aridsha History", "subGroup": "", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceresHistory", "group": "Lore", "description": "", "variable": "LORceresHistory{0}", "title": "Ceres History", "subGroup": "", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colsweiHistory", "group": "Lore", "description": "", "variable": "LORcolsweiHistory{0}", "title": "Colswei History", "subGroup": "", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khemHistory", "group": "Lore", "description": "", "variable": "LORkhemHistory{0}", "title": "Khem History", "subGroup": "", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novusHistory", "group": "Lore", "description": "", "variable": "LORnovusHistory{0}", "title": "Novus History", "subGroup": "", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthairHistory", "group": "Lore", "description": "", "variable": "LORwalthairHistory{0}", "title": "Walthair History", "subGroup": "", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "waylingHistory", "group": "Lore", "description": "", "variable": "LORwaylingHistory{0}", "title": "Wayling History", "subGroup": "", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Culture": {
				"name": "Lore_Culture", "fieldName": "culture", "group": "Lore", "description": "", "variable": "LORculture{0}", "title": "Culture", "subGroup": "", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "LORart{0}", "title": "Art", "subGroup": "", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "LORetiquette{0}", "title": "Etiquette", "subGroup": "", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "LORfashion{0}", "title": "Fashion", "subGroup": "", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "LORgames{0}", "title": "Games", "subGroup": "", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "LORmusic{0}", "title": "Music", "subGroup": "", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "LORscribing{0}", "title": "Scribing", "subGroup": "", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "LORtheater{0}", "title": "Theater", "subGroup": "", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Religion": {
				"name": "Lore_Religion", "fieldName": "religion", "group": "Lore", "description": "", "variable": "LORreligion{0}", "title": "Religion", "subGroup": "", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "churchOfKongkwei", "group": "Lore", "description": "", "variable": "LORchurchOfKongkwei{0}", "title": "Church of Kongkwei", "subGroup": "", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "LORguidance{0}", "title": "Guidance", "subGroup": "", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life'sCircle", "group": "Lore", "description": "", "variable": "LORlife'sCircle{0}", "title": "Life's Circle", "subGroup": "", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "oceanCourt", "group": "Lore", "description": "", "variable": "LORoceanCourt{0}", "title": "Ocean Court", "subGroup": "", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "LORsylvan{0}", "title": "Sylvan", "subGroup": "", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "LORzushaon{0}", "title": "Zushaon", "subGroup": "", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "group": "Job", "description": "", "variable": "JOBtrainee{0}", "title": "Trainee", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBtrainee_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "group": "Job", "description": "", "variable": "JOBinterceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBinterceptor_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "group": "Job", "description": "", "variable": "JOBguardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBguardian_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "group": "Job", "description": "", "variable": "JOBspellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBspellslinger_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "group": "Job", "description": "", "variable": "JOBwarrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBwarrior_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "group": "Job", "description": "", "variable": "JOBrogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBrogue_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "group": "Job", "description": "", "variable": "JOBscholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBscholar_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "group": "Job", "description": "", "variable": "JOBphysician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "formula": "CR", "modifiers": "_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "JOBphysician_adv"],
				"formulaCalculations": [{ "modName": "cr", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "group": "Role", "description": "", "variable": "ROLgeneralist{0}", "title": "Generalist", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "group": "Role", "description": "", "variable": "ROLdefender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "group": "Role", "description": "", "variable": "ROLathlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "group": "Role", "description": "", "variable": "ROLskirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "group": "Role", "description": "", "variable": "ROLmarksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": 1, "isResource": false, "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "breakFree", "group": "Technique", "description": "", "variable": "TCHbreakFree{0}", "title": "Break Free", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbreakFree_training", "TCHbreakFree_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "group": "Technique", "description": "", "variable": "TCHdash{0}", "title": "Dash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdash_training", "TCHdash_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "group": "Technique", "description": "", "variable": "TCHescape{0}", "title": "Escape", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHescape_training", "TCHescape_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "group": "Technique", "description": "", "variable": "TCHgrapple{0}", "title": "Grapple", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgrapple_training", "TCHgrapple_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "group": "Technique", "description": "", "variable": "TCHhide{0}", "title": "Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHhide_training", "TCHhide_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "group": "Technique", "description": "", "variable": "TCHmount{0}", "title": "Mount", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmount_training", "TCHmount_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "group": "Technique", "description": "", "variable": "TCHprepare{0}", "title": "Prepare", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHprepare_training", "TCHprepare_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "group": "Technique", "description": "", "variable": "TCHreposition{0}", "title": "Reposition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHreposition_training", "TCHreposition_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "group": "Technique", "description": "", "variable": "TCHseach{0}", "title": "Seach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHseach_training", "TCHseach_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "group": "Technique", "description": "", "variable": "TCHaid{0}", "title": "Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHaid_training", "TCHaid_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "group": "Technique", "description": "", "variable": "TCHencourage{0}", "title": "Encourage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHencourage_training", "TCHencourage_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "group": "Technique", "description": "", "variable": "TCHstabilize{0}", "title": "Stabilize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstabilize_training", "TCHstabilize_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skillCheck", "group": "Technique", "description": "", "variable": "TCHskillCheck{0}", "title": "Skill Check", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskillCheck_training", "TCHskillCheck_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "buildRapport", "group": "Technique", "description": "", "variable": "TCHbuildRapport{0}", "title": "Build Rapport", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbuildRapport_training", "TCHbuildRapport_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "buildPressure", "group": "Technique", "description": "", "variable": "TCHbuildPressure{0}", "title": "Build Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbuildPressure_training", "TCHbuildPressure_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "group": "Technique", "description": "", "variable": "TCHcaptivate{0}", "title": "Captivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcaptivate_training", "TCHcaptivate_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "group": "Technique", "description": "", "variable": "TCHdemand{0}", "title": "Demand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdemand_training", "TCHdemand_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grabAnEdge", "group": "Technique", "description": "", "variable": "TCHgrabAnEdge{0}", "title": "Grab an Edge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgrabAnEdge_training", "TCHgrabAnEdge_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "group": "Technique", "description": "", "variable": "TCHinteract{0}", "title": "Interact", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHinteract_training", "TCHinteract_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "secondWind", "group": "Technique", "description": "", "variable": "TCHsecondWind{0}", "title": "Second Wind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsecondWind_training", "TCHsecondWind_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "secondBreath", "group": "Technique", "description": "", "variable": "TCHsecondBreath{0}", "title": "Second Breath", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsecondBreath_training", "TCHsecondBreath_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "group": "Technique", "description": "", "variable": "TCHundaunted{0}", "title": "Undaunted", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHundaunted_training", "TCHundaunted_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptiveStrike", "group": "Technique", "description": "", "variable": "TCHpreemptiveStrike{0}", "title": "Preemptive Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpreemptiveStrike_training", "TCHpreemptiveStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptiveStagger", "group": "Technique", "description": "", "variable": "TCHpreemptiveStagger{0}", "title": "Preemptive Stagger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpreemptiveStagger_training", "TCHpreemptiveStagger_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "criticalMaim", "group": "Technique", "description": "", "variable": "TCHcriticalMaim{0}", "title": "Critical Maim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcriticalMaim_training", "TCHcriticalMaim_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "group": "Technique", "description": "", "variable": "TCHspellshot{0}", "title": "Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspellshot_training", "TCHspellshot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-UpSpellshot", "group": "Technique", "description": "", "variable": "TCHfollow-UpSpellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfollow-UpSpellshot_training", "TCHfollow-UpSpellshot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "burstingSpellshot", "group": "Technique", "description": "", "variable": "TCHburstingSpellshot{0}", "title": "Bursting Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHburstingSpellshot_training", "TCHburstingSpellshot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "group": "Technique", "description": "", "variable": "TCHsavior{0}", "title": "Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsavior_training", "TCHsavior_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knockAwaySavior", "group": "Technique", "description": "", "variable": "TCHknockAwaySavior{0}", "title": "Knock Away Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknockAwaySavior_training", "TCHknockAwaySavior_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior'sRetaliation", "group": "Technique", "description": "", "variable": "TCHsavior'sRetaliation{0}", "title": "Savior's Retaliation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsavior'sRetaliation_training", "TCHsavior'sRetaliation_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "group": "Technique", "description": "", "variable": "TCHspellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspellstrike_training", "TCHspellstrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "powerSkirmish", "group": "Technique", "description": "", "variable": "TCHpowerSkirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpowerSkirmish_training", "TCHpowerSkirmish_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneakAttack", "group": "Technique", "description": "", "variable": "TCHsneakAttack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsneakAttack_training", "TCHsneakAttack_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneakyFollow-Up", "group": "Technique", "description": "", "variable": "TCHsneakyFollow-Up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsneakyFollow-Up_training", "TCHsneakyFollow-Up_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "group": "Technique", "description": "", "variable": "TCHassassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHassassinate_training", "TCHassassinate_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergencyCare", "group": "Technique", "description": "", "variable": "TCHemergencyCare{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHemergencyCare_training", "TCHemergencyCare_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "group": "Technique", "description": "", "variable": "TCHnightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHnightingale_training", "TCHnightingale_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "group": "Technique", "description": "", "variable": "TCHrhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHrhapsody_training", "TCHrhapsody_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "group": "Technique", "description": "", "variable": "TCHmetamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmetamagic_training", "TCHmetamagic_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "group": "Technique", "description": "", "variable": "TCHstrategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstrategize_training", "TCHstrategize_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "group": "Technique", "description": "", "variable": "TCHforesight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHforesight_training", "TCHforesight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "sawThatComing", "group": "Technique", "description": "", "variable": "TCHsawThatComing{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsawThatComing_training", "TCHsawThatComing_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "asYouMayRecall", "group": "Technique", "description": "", "variable": "TCHasYouMayRecall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHasYouMayRecall_training", "TCHasYouMayRecall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "group": "Technique", "description": "", "variable": "TCHgeneralist{0}", "title": "Generalist", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgeneralist_training", "TCHgeneralist_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "group": "Technique", "description": "", "variable": "TCHdefender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefender_training", "TCHdefender_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defenderII", "group": "Technique", "description": "", "variable": "TCHdefenderII{0}", "title": "Defender II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefenderII_training", "TCHdefenderII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender'sWill", "group": "Technique", "description": "", "variable": "TCHdefender'sWill{0}", "title": "Defender's Will", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefender'sWill_training", "TCHdefender'sWill_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender'sTaunt", "group": "Technique", "description": "", "variable": "TCHdefender'sTaunt{0}", "title": "Defender's Taunt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefender'sTaunt_training", "TCHdefender'sTaunt_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender'sRecovery", "group": "Technique", "description": "", "variable": "TCHdefender'sRecovery{0}", "title": "Defender's Recovery", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefender'sRecovery_training", "TCHdefender'sRecovery_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "group": "Technique", "description": "", "variable": "TCHskirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskirmisher_training", "TCHskirmisher_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisherII", "group": "Technique", "description": "", "variable": "TCHskirmisherII{0}", "title": "Skirmisher II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskirmisherII_training", "TCHskirmisherII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher'sStep", "group": "Technique", "description": "", "variable": "TCHskirmisher'sStep{0}", "title": "Skirmisher's Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskirmisher'sStep_training", "TCHskirmisher'sStep_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher'sStrike", "group": "Technique", "description": "", "variable": "TCHskirmisher'sStrike{0}", "title": "Skirmisher's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskirmisher'sStrike_training", "TCHskirmisher'sStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "group": "Technique", "description": "", "variable": "TCHmarksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmarksman_training", "TCHmarksman_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksmanII", "group": "Technique", "description": "", "variable": "TCHmarksmanII{0}", "title": "Marksman II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmarksmanII_training", "TCHmarksmanII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman'sLongshot", "group": "Technique", "description": "", "variable": "TCHmarksman'sLongshot{0}", "title": "Marksman's Longshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmarksman'sLongshot_training", "TCHmarksman'sLongshot_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman'sSight", "group": "Technique", "description": "", "variable": "TCHmarksman'sSight{0}", "title": "Marksman's Sight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmarksman'sSight_training", "TCHmarksman'sSight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman'sStrike", "group": "Technique", "description": "", "variable": "TCHmarksman'sStrike{0}", "title": "Marksman's Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmarksman'sStrike_training", "TCHmarksman'sStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "group": "Technique", "description": "", "variable": "TCHathlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHathlete_training", "TCHathlete_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athleteII", "group": "Technique", "description": "", "variable": "TCHathleteII{0}", "title": "Athlete II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHathleteII_training", "TCHathleteII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete'sSprint", "group": "Technique", "description": "", "variable": "TCHathlete'sSprint{0}", "title": "Athlete's Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHathlete'sSprint_training", "TCHathlete'sSprint_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete'sReach", "group": "Technique", "description": "", "variable": "TCHathlete'sReach{0}", "title": "Athlete's Reach", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHathlete'sReach_training", "TCHathlete'sReach_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "boundingSprint", "group": "Technique", "description": "", "variable": "TCHboundingSprint{0}", "title": "Bounding Sprint", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHboundingSprint_training", "TCHboundingSprint_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulkAway", "group": "Technique", "description": "", "variable": "TCHskulkAway{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskulkAway_training", "TCHskulkAway_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulkThenHide", "group": "Technique", "description": "", "variable": "TCHskulkThenHide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHskulkThenHide_training", "TCHskulkThenHide_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "firstAid", "group": "Technique", "description": "", "variable": "TCHfirstAid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfirstAid_training", "TCHfirstAid_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansingAid", "group": "Technique", "description": "", "variable": "TCHcleansingAid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcleansingAid_training", "TCHcleansingAid_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmentalAwareness", "group": "Technique", "description": "", "variable": "TCHenvironmentalAwareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHenvironmentalAwareness_training", "TCHenvironmentalAwareness_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclecticKnowledge", "group": "Technique", "description": "", "variable": "TCHeclecticKnowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHeclecticKnowledge_training", "TCHeclecticKnowledge_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "pointOfClarity", "group": "Technique", "description": "", "variable": "TCHpointOfClarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpointOfClarity_training", "TCHpointOfClarity_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "poleVault", "group": "Technique", "description": "", "variable": "TCHpoleVault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpoleVault_training", "TCHpoleVault_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quickDraw", "group": "Technique", "description": "", "variable": "TCHquickDraw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickDraw_training", "TCHquickDraw_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extensionStrike", "group": "Technique", "description": "", "variable": "TCHextensionStrike{0}", "title": "Extension Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHextensionStrike_training", "TCHextensionStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "stepExtension", "group": "Technique", "description": "", "variable": "TCHstepExtension{0}", "title": "Step Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstepExtension_training", "TCHstepExtension_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lastingExtension", "group": "Technique", "description": "", "variable": "TCHlastingExtension{0}", "title": "Lasting Extension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlastingExtension_training", "TCHlastingExtension_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "farStrike", "group": "Technique", "description": "", "variable": "TCHfarStrike{0}", "title": "Far Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfarStrike_training", "TCHfarStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extensionStrike+", "group": "Technique", "description": "", "variable": "TCHextensionStrike+{0}", "title": "Extension Strike +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHextensionStrike+_training", "TCHextensionStrike+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Defense Piercer ": {
				"name": "Technique_Defense Piercer ", "fieldName": "defensePiercer", "group": "Technique", "description": "", "variable": "TCHdefensePiercer{0}", "title": "Defense Piercer ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdefensePiercer_training", "TCHdefensePiercer_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quickSlash", "group": "Technique", "description": "", "variable": "TCHquickSlash{0}", "title": "Quick Slash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickSlash_training", "TCHquickSlash_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precisionBlade", "group": "Technique", "description": "", "variable": "TCHprecisionBlade{0}", "title": "Precision Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHprecisionBlade_training", "TCHprecisionBlade_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armorPiercer", "group": "Technique", "description": "", "variable": "TCHarmorPiercer{0}", "title": "Armor Piercer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHarmorPiercer_training", "TCHarmorPiercer_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quickSlashII", "group": "Technique", "description": "", "variable": "TCHquickSlashII{0}", "title": "Quick Slash II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickSlashII_training", "TCHquickSlashII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "group": "Technique", "description": "", "variable": "TCHcleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcleave_training", "TCHcleave_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushingBlade", "group": "Technique", "description": "", "variable": "TCHcrushingBlade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcrushingBlade_training", "TCHcrushingBlade_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "greatCleave", "group": "Technique", "description": "", "variable": "TCHgreatCleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreatCleave_training", "TCHgreatCleave_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave+", "group": "Technique", "description": "", "variable": "TCHcleave+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcleave+_training", "TCHcleave+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "suddenCleave", "group": "Technique", "description": "", "variable": "TCHsuddenCleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsuddenCleave_training", "TCHsuddenCleave_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "greatCleaveII", "group": "Technique", "description": "", "variable": "TCHgreatCleaveII{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreatCleaveII_training", "TCHgreatCleaveII_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "powerFlex", "group": "Technique", "description": "", "variable": "TCHpowerFlex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpowerFlex_training", "TCHpowerFlex_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crushKnuckle", "group": "Technique", "description": "", "variable": "TCHcrushKnuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcrushKnuckle_training", "TCHcrushKnuckle_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impact Knuckle": {
				"name": "Technique_Impact Knuckle", "fieldName": "impactKnuckle", "group": "Technique", "description": "", "variable": "TCHimpactKnuckle{0}", "title": "Impact Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHimpactKnuckle_training", "TCHimpactKnuckle_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckleFlurry", "group": "Technique", "description": "", "variable": "TCHknuckleFlurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknuckleFlurry_training", "TCHknuckleFlurry_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "waterBlast", "group": "Technique", "description": "", "variable": "TCHwaterBlast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwaterBlast_training", "TCHwaterBlast_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "group": "Technique", "description": "", "variable": "TCHgeyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgeyser_training", "TCHgeyser_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyserLine", "group": "Technique", "description": "", "variable": "TCHgeyserLine{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgeyserLine_training", "TCHgeyserLine_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "group": "Technique", "description": "", "variable": "TCHsurf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsurf_training", "TCHsurf_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "greatGeyserLine", "group": "Technique", "description": "", "variable": "TCHgreatGeyserLine{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreatGeyserLine_training", "TCHgreatGeyserLine_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidalWave", "group": "Technique", "description": "", "variable": "TCHtidalWave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtidalWave_training", "TCHtidalWave_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sandSurge", "group": "Technique", "description": "", "variable": "TCHsandSurge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsandSurge_training", "TCHsandSurge_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sandSpout", "group": "Technique", "description": "", "variable": "TCHsandSpout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsandSpout_training", "TCHsandSpout_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sandWave", "group": "Technique", "description": "", "variable": "TCHsandWave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsandWave_training", "TCHsandWave_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sandLauncher", "group": "Technique", "description": "", "variable": "TCHsandLauncher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsandLauncher_training", "TCHsandLauncher_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "group": "Technique", "description": "", "variable": "TCHsicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsicken_training", "TCHsicken_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "group": "Technique", "description": "", "variable": "TCHspores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspores_training", "TCHspores_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickeningCloud", "group": "Technique", "description": "", "variable": "TCHsickeningCloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsickeningCloud_training", "TCHsickeningCloud_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulentSpores", "group": "Technique", "description": "", "variable": "TCHvirulentSpores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHvirulentSpores_training", "TCHvirulentSpores_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "group": "Technique", "description": "", "variable": "TCHfirebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfirebolt_training", "TCHfirebolt_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flameArrow", "group": "Technique", "description": "", "variable": "TCHflameArrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHflameArrow_training", "TCHflameArrow_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "group": "Technique", "description": "", "variable": "TCHfireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfireball_training", "TCHfireball_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "group": "Technique", "description": "", "variable": "TCHfireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfireblast_training", "TCHfireblast_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "group": "Technique", "description": "", "variable": "TCHragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHragnarok_training", "TCHragnarok_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "group": "Technique", "description": "", "variable": "TCHbonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbonfire_training", "TCHbonfire_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wallOfFire", "group": "Technique", "description": "", "variable": "TCHwallOfFire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwallOfFire_training", "TCHwallOfFire_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "fieldOfFlame", "group": "Technique", "description": "", "variable": "TCHfieldOfFlame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfieldOfFlame_training", "TCHfieldOfFlame_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightningShaft", "group": "Technique", "description": "", "variable": "TCHlightningShaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlightningShaft_training", "TCHlightningShaft_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "group": "Technique", "description": "", "variable": "TCHshock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshock_training", "TCHshock_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightningBolt", "group": "Technique", "description": "", "variable": "TCHlightningBolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlightningBolt_training", "TCHlightningBolt_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasmaArc", "group": "Technique", "description": "", "variable": "TCHplasmaArc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHplasmaArc_training", "TCHplasmaArc_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "group": "Technique", "description": "", "variable": "TCHfulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfulgor_training", "TCHfulgor_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "coldSnap", "group": "Technique", "description": "", "variable": "TCHcoldSnap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcoldSnap_training", "TCHcoldSnap_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "group": "Technique", "description": "", "variable": "TCHfrostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfrostbite_training", "TCHfrostbite_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "group": "Technique", "description": "", "variable": "TCHfreezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfreezebind_training", "TCHfreezebind_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "coldBurst", "group": "Technique", "description": "", "variable": "TCHcoldBurst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcoldBurst_training", "TCHcoldBurst_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "coldFront", "group": "Technique", "description": "", "variable": "TCHcoldFront{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcoldFront_training", "TCHcoldFront_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamondDust", "group": "Technique", "description": "", "variable": "TCHdiamondDust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdiamondDust_training", "TCHdiamondDust_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "windBullet", "group": "Technique", "description": "", "variable": "TCHwindBullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwindBullet_training", "TCHwindBullet_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "group": "Technique", "description": "", "variable": "TCHgust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgust_training", "TCHgust_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "group": "Technique", "description": "", "variable": "TCHwindsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwindsweep_training", "TCHwindsweep_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "group": "Technique", "description": "", "variable": "TCHgale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgale_training", "TCHgale_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "group": "Technique", "description": "", "variable": "TCHdarkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdarkness_training", "TCHdarkness_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadowWall", "group": "Technique", "description": "", "variable": "TCHshadowWall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshadowWall_training", "TCHshadowWall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "group": "Technique", "description": "", "variable": "TCHnightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHnightfall_training", "TCHnightfall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fogCloud", "group": "Technique", "description": "", "variable": "TCHfogCloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfogCloud_training", "TCHfogCloud_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "group": "Technique", "description": "", "variable": "TCHsleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsleet_training", "TCHsleet_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezingSleet", "group": "Technique", "description": "", "variable": "TCHfreezingSleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfreezingSleet_training", "TCHfreezingSleet_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "group": "Technique", "description": "", "variable": "TCHhail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHhail_training", "TCHhail_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "bindingSleet", "group": "Technique", "description": "", "variable": "TCHbindingSleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbindingSleet_training", "TCHbindingSleet_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "iceStorm", "group": "Technique", "description": "", "variable": "TCHiceStorm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHiceStorm_training", "TCHiceStorm_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "group": "Technique", "description": "", "variable": "TCHfimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfimbulwinter_training", "TCHfimbulwinter_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smokeCloud", "group": "Technique", "description": "", "variable": "TCHsmokeCloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsmokeCloud_training", "TCHsmokeCloud_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burningSmoke", "group": "Technique", "description": "", "variable": "TCHburningSmoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHburningSmoke_training", "TCHburningSmoke_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "chokingSmoke", "group": "Technique", "description": "", "variable": "TCHchokingSmoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchokingSmoke_training", "TCHchokingSmoke_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "group": "Technique", "description": "", "variable": "TCHacceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHacceleration_training", "TCHacceleration_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "powerVault", "group": "Technique", "description": "", "variable": "TCHpowerVault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpowerVault_training", "TCHpowerVault_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "group": "Technique", "description": "", "variable": "TCHexpeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHexpeditious_training", "TCHexpeditious_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quickClimb", "group": "Technique", "description": "", "variable": "TCHquickClimb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickClimb_training", "TCHquickClimb_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quickSwim", "group": "Technique", "description": "", "variable": "TCHquickSwim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickSwim_training", "TCHquickSwim_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "group": "Technique", "description": "", "variable": "TCHpoise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpoise_training", "TCHpoise_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "catFall", "group": "Technique", "description": "", "variable": "TCHcatFall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcatFall_training", "TCHcatFall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kipUp", "group": "Technique", "description": "", "variable": "TCHkipUp{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkipUp_training", "TCHkipUp_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silentStride", "group": "Technique", "description": "", "variable": "TCHsilentStride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsilentStride_training", "TCHsilentStride_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "group": "Technique", "description": "", "variable": "TCHshove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshove_training", "TCHshove_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "group": "Technique", "description": "", "variable": "TCHknockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknockdown_training", "TCHknockdown_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "group": "Technique", "description": "", "variable": "TCHtumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtumble_training", "TCHtumble_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "fieldMedic", "group": "Technique", "description": "", "variable": "TCHfieldMedic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfieldMedic_training", "TCHfieldMedic_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "group": "Technique", "description": "", "variable": "TCHcamoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcamoflauge_training", "TCHcamoflauge_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurredLight", "group": "Technique", "description": "", "variable": "TCHblurredLight{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHblurredLight_training", "TCHblurredLight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "lightRefraction", "group": "Technique", "description": "", "variable": "TCHlightRefraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlightRefraction_training", "TCHlightRefraction_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadowSteps", "group": "Technique", "description": "", "variable": "TCHshadowSteps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshadowSteps_training", "TCHshadowSteps_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadowWalker", "group": "Technique", "description": "", "variable": "TCHshadowWalker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshadowWalker_training", "TCHshadowWalker_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "windStep", "group": "Technique", "description": "", "variable": "TCHwindStep{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwindStep_training", "TCHwindStep_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "group": "Technique", "description": "", "variable": "TCHupdraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHupdraft_training", "TCHupdraft_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "cloudedUpdraft", "group": "Technique", "description": "", "variable": "TCHcloudedUpdraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcloudedUpdraft_training", "TCHcloudedUpdraft_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "windFall", "group": "Technique", "description": "", "variable": "TCHwindFall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwindFall_training", "TCHwindFall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walkOnAir", "group": "Technique", "description": "", "variable": "TCHwalkOnAir{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwalkOnAir_training", "TCHwalkOnAir_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fireStep", "group": "Technique", "description": "", "variable": "TCHfireStep{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfireStep_training", "TCHfireStep_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "group": "Technique", "description": "", "variable": "TCHliftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHliftoff_training", "TCHliftoff_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "group": "Technique", "description": "", "variable": "TCHjet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHjet_training", "TCHjet_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunningAction", "group": "Technique", "description": "", "variable": "TCHcunningAction{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcunningAction_training", "TCHcunningAction_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "group": "Technique", "description": "", "variable": "TCHdemoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdemoralize_training", "TCHdemoralize_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "group": "Technique", "description": "", "variable": "TCHfascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHfascinate_training", "TCHfascinate_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "group": "Technique", "description": "", "variable": "TCHimpersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHimpersonator_training", "TCHimpersonator_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "etherSense", "group": "Technique", "description": "", "variable": "TCHetherSense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHetherSense_training", "TCHetherSense_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spiritSense", "group": "Technique", "description": "", "variable": "TCHspiritSense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspiritSense_training", "TCHspiritSense_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "group": "Technique", "description": "", "variable": "TCHtremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtremorsense_training", "TCHtremorsense_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "group": "Technique", "description": "", "variable": "TCHdustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdustcraft_training", "TCHdustcraft_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shapeMaterial", "group": "Technique", "description": "", "variable": "TCHshapeMaterial{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshapeMaterial_training", "TCHshapeMaterial_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "group": "Technique", "description": "", "variable": "TCHquickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHquickcraft_training", "TCHquickcraft_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improvedShaping", "group": "Technique", "description": "", "variable": "TCHimprovedShaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHimprovedShaping_training", "TCHimprovedShaping_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greaterShaping", "group": "Technique", "description": "", "variable": "TCHgreaterShaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreaterShaping_training", "TCHgreaterShaping_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendaryShaping", "group": "Technique", "description": "", "variable": "TCHlegendaryShaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlegendaryShaping_training", "TCHlegendaryShaping_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dustMaterial", "group": "Technique", "description": "", "variable": "TCHdustMaterial{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdustMaterial_training", "TCHdustMaterial_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dustArea", "group": "Technique", "description": "", "variable": "TCHdustArea{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdustArea_training", "TCHdustArea_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improvedDusting", "group": "Technique", "description": "", "variable": "TCHimprovedDusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHimprovedDusting_training", "TCHimprovedDusting_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greaterDusting", "group": "Technique", "description": "", "variable": "TCHgreaterDusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreaterDusting_training", "TCHgreaterDusting_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendaryDusting", "group": "Technique", "description": "", "variable": "TCHlegendaryDusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlegendaryDusting_training", "TCHlegendaryDusting_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "formPath", "group": "Technique", "description": "", "variable": "TCHformPath{0}", "title": "Form Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHformPath_training", "TCHformPath_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "formPillar", "group": "Technique", "description": "", "variable": "TCHformPillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHformPillar_training", "TCHformPillar_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "steppingPath", "group": "Technique", "description": "", "variable": "TCHsteppingPath{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsteppingPath_training", "TCHsteppingPath_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "formWall", "group": "Technique", "description": "", "variable": "TCHformWall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHformWall_training", "TCHformWall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scatteredPillars", "group": "Technique", "description": "", "variable": "TCHscatteredPillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHscatteredPillars_training", "TCHscatteredPillars_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "greatWall", "group": "Technique", "description": "", "variable": "TCHgreatWall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgreatWall_training", "TCHgreatWall_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "group": "Technique", "description": "", "variable": "TCHcultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcultivate_training", "TCHcultivate_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "group": "Technique", "description": "", "variable": "TCHentangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHentangle_training", "TCHentangle_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "group": "Technique", "description": "", "variable": "TCHwildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwildwood_training", "TCHwildwood_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "group": "Technique", "description": "", "variable": "TCHdistortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdistortion_training", "TCHdistortion_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lastingDistortion", "group": "Technique", "description": "", "variable": "TCHlastingDistortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlastingDistortion_training", "TCHlastingDistortion_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heatField", "group": "Technique", "description": "", "variable": "TCHheatField{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHheatField_training", "TCHheatField_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burnGuard", "group": "Technique", "description": "", "variable": "TCHburnGuard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHburnGuard_training", "TCHburnGuard_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "coldField", "group": "Technique", "description": "", "variable": "TCHcoldField{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHcoldField_training", "TCHcoldField_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chillGuard", "group": "Technique", "description": "", "variable": "TCHchillGuard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchillGuard_training", "TCHchillGuard_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "group": "Technique", "description": "", "variable": "TCHkinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkinesis_training", "TCHkinesis_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distantKinesis", "group": "Technique", "description": "", "variable": "TCHdistantKinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdistantKinesis_training", "TCHdistantKinesis_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kineticStrike", "group": "Technique", "description": "", "variable": "TCHkineticStrike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkineticStrike_training", "TCHkineticStrike_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kineticThrow", "group": "Technique", "description": "", "variable": "TCHkineticThrow{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkineticThrow_training", "TCHkineticThrow_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavyKinesis", "group": "Technique", "description": "", "variable": "TCHheavyKinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHheavyKinesis_training", "TCHheavyKinesis_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "group": "Technique", "description": "", "variable": "TCHburden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHburden_training", "TCHburden_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "group": "Technique", "description": "", "variable": "TCHpressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHpressure_training", "TCHpressure_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "group": "Technique", "description": "", "variable": "TCHrestrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHrestrain_training", "TCHrestrain_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "widePressure", "group": "Technique", "description": "", "variable": "TCHwidePressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHwidePressure_training", "TCHwidePressure_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "group": "Technique", "description": "", "variable": "TCHprostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHprostration_training", "TCHprostration_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deepPressure", "group": "Technique", "description": "", "variable": "TCHdeepPressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdeepPressure_training", "TCHdeepPressure_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravityWell", "group": "Technique", "description": "", "variable": "TCHgravityWell{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHgravityWell_training", "TCHgravityWell_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shieldBlock", "group": "Technique", "description": "", "variable": "TCHshieldBlock{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHshieldBlock_training", "TCHshieldBlock_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancingBlock", "group": "Technique", "description": "", "variable": "TCHglancingBlock{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHglancingBlock_training", "TCHglancingBlock_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "group": "Technique", "description": "", "variable": "TCHaegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHaegis_training", "TCHaegis_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "group": "Technique", "description": "", "variable": "TCHlight{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHlight_training", "TCHlight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancingLights", "group": "Technique", "description": "", "variable": "TCHdancingLights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHdancingLights_training", "TCHdancingLights_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "group": "Technique", "description": "", "variable": "TCHflash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHflash_training", "TCHflash_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "group": "Technique", "description": "", "variable": "TCHsunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsunlight_training", "TCHsunlight_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stressRelease", "group": "Technique", "description": "", "variable": "TCHstressRelease{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstressRelease_training", "TCHstressRelease_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stressRelease+", "group": "Technique", "description": "", "variable": "TCHstressRelease+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstressRelease+_training", "TCHstressRelease+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stressRelease++", "group": "Technique", "description": "", "variable": "TCHstressRelease++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHstressRelease++_training", "TCHstressRelease++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensoryTraining", "group": "Technique", "description": "", "variable": "TCHsensoryTraining{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsensoryTraining_training", "TCHsensoryTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensoryTraining+", "group": "Technique", "description": "", "variable": "TCHsensoryTraining+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsensoryTraining+_training", "TCHsensoryTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broadStudy", "group": "Technique", "description": "", "variable": "TCHbroadStudy{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbroadStudy_training", "TCHbroadStudy_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experiencedTracker", "group": "Technique", "description": "", "variable": "TCHexperiencedTracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHexperiencedTracker_training", "TCHexperiencedTracker_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "group": "Technique", "description": "", "variable": "TCHmultilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmultilingual_training", "TCHmultilingual_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual+", "group": "Technique", "description": "", "variable": "TCHmultilingual+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmultilingual+_training", "TCHmultilingual+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specializedLore", "group": "Technique", "description": "", "variable": "TCHspecializedLore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspecializedLore_training", "TCHspecializedLore_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specializedLore+", "group": "Technique", "description": "", "variable": "TCHspecializedLore+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspecializedLore+_training", "TCHspecializedLore+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specializedLore++", "group": "Technique", "description": "", "variable": "TCHspecializedLore++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHspecializedLore++_training", "TCHspecializedLore++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improvedInitiative", "group": "Technique", "description": "", "variable": "TCHimprovedInitiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHimprovedInitiative_training", "TCHimprovedInitiative_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledgeTraining", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknowledgeTraining_training", "TCHknowledgeTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledgeTraining+", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknowledgeTraining+_training", "TCHknowledgeTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledgeTraining++", "group": "Technique", "description": "", "variable": "TCHknowledgeTraining++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHknowledgeTraining++_training", "TCHknowledgeTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "socialTraining", "group": "Technique", "description": "", "variable": "TCHsocialTraining{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsocialTraining_training", "TCHsocialTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "socialTraining+", "group": "Technique", "description": "", "variable": "TCHsocialTraining+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsocialTraining+_training", "TCHsocialTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "socialTraining++", "group": "Technique", "description": "", "variable": "TCHsocialTraining++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsocialTraining++_training", "TCHsocialTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "group": "Technique", "description": "", "variable": "TCHrefocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHrefocus_training", "TCHrefocus_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus+", "group": "Technique", "description": "", "variable": "TCHrefocus+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHrefocus+_training", "TCHrefocus+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustainedChannel", "group": "Technique", "description": "", "variable": "TCHsustainedChannel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsustainedChannel_training", "TCHsustainedChannel_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustainedChannel+", "group": "Technique", "description": "", "variable": "TCHsustainedChannel+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsustainedChannel+_training", "TCHsustainedChannel+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "kiControl", "group": "Technique", "description": "", "variable": "TCHkiControl{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkiControl_training", "TCHkiControl_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "kiControl+", "group": "Technique", "description": "", "variable": "TCHkiControl+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkiControl+_training", "TCHkiControl+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "kiControl++", "group": "Technique", "description": "", "variable": "TCHkiControl++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHkiControl++_training", "TCHkiControl++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surgeValue", "group": "Technique", "description": "", "variable": "TCHsurgeValue{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsurgeValue_training", "TCHsurgeValue_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surgeValue+", "group": "Technique", "description": "", "variable": "TCHsurgeValue+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHsurgeValue+_training", "TCHsurgeValue+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channelTraining", "group": "Technique", "description": "", "variable": "TCHchannelTraining{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchannelTraining_training", "TCHchannelTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channelTraining+", "group": "Technique", "description": "", "variable": "TCHchannelTraining+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchannelTraining+_training", "TCHchannelTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channelTraining++", "group": "Technique", "description": "", "variable": "TCHchannelTraining++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchannelTraining++_training", "TCHchannelTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physicalTraining", "group": "Technique", "description": "", "variable": "TCHphysicalTraining{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHphysicalTraining_training", "TCHphysicalTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physicalTraining+", "group": "Technique", "description": "", "variable": "TCHphysicalTraining+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHphysicalTraining+_training", "TCHphysicalTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "bodyTraining", "group": "Technique", "description": "", "variable": "TCHbodyTraining{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbodyTraining_training", "TCHbodyTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "bodyTraining+", "group": "Technique", "description": "", "variable": "TCHbodyTraining+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbodyTraining+_training", "TCHbodyTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "bodyTraining++", "group": "Technique", "description": "", "variable": "TCHbodyTraining++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHbodyTraining++_training", "TCHbodyTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technicalTraining", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtechnicalTraining_training", "TCHtechnicalTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technicalTraining+", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtechnicalTraining+_training", "TCHtechnicalTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technicalTraining++", "group": "Technique", "description": "", "variable": "TCHtechnicalTraining++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHtechnicalTraining++_training", "TCHtechnicalTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martialTraining", "group": "Technique", "description": "", "variable": "TCHmartialTraining{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmartialTraining_training", "TCHmartialTraining_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martialTraining+", "group": "Technique", "description": "", "variable": "TCHmartialTraining+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmartialTraining+_training", "TCHmartialTraining+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martialTraining++", "group": "Technique", "description": "", "variable": "TCHmartialTraining++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHmartialTraining++_training", "TCHmartialTraining++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hPUp", "group": "Technique", "description": "", "variable": "TCHhPUp{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHhPUp_training", "TCHhPUp_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hPUp+", "group": "Technique", "description": "", "variable": "TCHhPUp+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHhPUp+_training", "TCHhPUp+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hPUp++", "group": "Technique", "description": "", "variable": "TCHhPUp++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHhPUp++_training", "TCHhPUp++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitalityBoost", "group": "Technique", "description": "", "variable": "TCHvitalityBoost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHvitalityBoost_training", "TCHvitalityBoost_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitalityBoost+", "group": "Technique", "description": "", "variable": "TCHvitalityBoost+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHvitalityBoost+_training", "TCHvitalityBoost+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitalityBoost++", "group": "Technique", "description": "", "variable": "TCHvitalityBoost++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHvitalityBoost++_training", "TCHvitalityBoost++_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "group": "Technique", "description": "", "variable": "TCHundying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHundying_training", "TCHundying_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying+", "group": "Technique", "description": "", "variable": "TCHundying+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHundying+_training", "TCHundying+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extraFollow-UpAttack", "group": "Technique", "description": "", "variable": "TCHextraFollow-UpAttack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHextraFollow-UpAttack_training", "TCHextraFollow-UpAttack_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extraFollow-UpAttack+", "group": "Technique", "description": "", "variable": "TCHextraFollow-UpAttack+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHextraFollow-UpAttack+_training", "TCHextraFollow-UpAttack+_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "changeTechSlots", "group": "Technique", "description": "", "variable": "TCHchangeTechSlots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHchangeTechSlots_training", "TCHchangeTechSlots_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "holdOut", "group": "Technique", "description": "", "variable": "TCHholdOut{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHholdOut_training", "TCHholdOut_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "group": "Technique", "description": "", "variable": "TCHoverdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2", "modifiers": "_training;_adv", "linkedGroups": 1, "isResource": false, "modAttrs": ["cr", "TCHoverdrive_training", "TCHoverdrive_adv"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "cr", "value": 0, "multiplier": 2 },
				{ "modName": "_training", "value": 0, "multiplier": 1 },
				{ "modName": "_adv", "value": 0, "multiplier": 1 }]
			}
		},
		sortingGroups = { "group": { "Type": ["Attribute", "Skill", "Job", "Role", "Knowledge", "Language", "Lore", "Style", "Technique", "PageSet", "Page", "Title", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_training", "_adv", "_pts", "_tech", "_expertise", "_gear", "_error"], "Affinity": ["Wood", "Fire", "Earth", "Metal", "Water"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "JobTier": ["JobTier0", "JobTier1", "JobTier2", "JobTier3"], "LoreTier": ["LoreTier0"], "PageSet": ["PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training"], "Page": ["Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement"], "Title": ["Title_Advancement", "Title_Training"], "Advancement": ["Level", "CR", "XP"], "Training": ["Training Points", "PP"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "General": ["Full Name", "Display Name", "HP", "WILL", "EN", "Initiative"], "Gear": ["Carrying Capacity"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Encourage", "Technique_Stabilize", "Technique_Skill Check", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Defense Piercer ", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_Impact Knuckle", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"] }, "formulaMods": { "CR": ["Attribute", "Skill", "Job", "Technique", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "Lore", "PageSet", "Page", "Title", "Defense", "Sense", "Affinity", "Combat", "Social", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_training", "_adv", "_pts", "_tech", "_expertise", "_gear", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Basics", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Advancement", "Title_Training", "Level", "CR", "Training Points", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Full Name", "Display Name", "EN", "Chakra", "Social_Patience", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Lore_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "Attribute_BOD": ["Defense_Brace", "Defense_Fortitude", "HP", "Carrying Capacity"], "Attribute_PRC": ["Defense_Disruption", "Defense_Hide"], "Attribute_QCK": ["Defense_Reflex", "Defense_Evasion", "Initiative"], "Attribute_INT": ["Sense_Insight", "Sense_Notice"], "Attribute_RSN": ["Sense_Scrutiny", "Sense_Detect"], "Attribute_CNV": ["Sense_Resolve", "Sense_Freewill", "WILL", "Combat_HV", "Social_Approval"], "Level": ["HP", "WILL", "Social_Approval"] } },
		_max = "_max",
		_true = "_true",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_info = "_info",
		_exit = "_exit",
		_finish = "_finish",
		_origin = "_origin",
		_learn = "_learn",
		_training = "_training",
		_adv = "_adv",
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
		},
		getTitle = function (key) {
			let data = get(key);
			return data.title;
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
		GetTitle: getTitle,
		_max: _max,
		_true: _true,
		_rank: _rank,
		_build: _build,
		_filter: _filter,
		_expand: _expand,
		_tab: _tab,
		_page: _page,
		_info: _info,
		_exit: _exit,
		_finish: _finish,
		_origin: _origin,
		_learn: _learn,
		_training: _training,
		_adv: _adv,
		_pts: _pts,
		_tech: _tech,
		_expertise: _expertise,
		_gear: _gear,
		_error: _error
	};
}());
