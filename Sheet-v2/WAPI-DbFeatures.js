//Definitions Database
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "JobStyle", "Role", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Combat", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion", "Sense_Social", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill", "Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "HP", "WILL", "EN", "Initiative", "Affinity", "InnateDefense", "InnateSense", "Recall", "Carrying Capacity", "Combat_HV", "Combat_Armor", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Style_Basic Set", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "LoreCategory_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCategory_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCategory_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCategory_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCategory_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCategory_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCategory_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Stabilize", "Technique_Skill Check", "Technique_Unarmed Strike", "Technique_Encourage", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "atr{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR", "modifiers": "", "linkedGroups": ["Attribute"],
				"isResource": "", "modAttrs": ["adv-cr"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 }]
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "skl{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "8;CR;AdvancementSkill", "modifiers": "", "linkedGroups": ["Skill:_rank"],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_skill"],
				"formulaCalculations": [{ "modName": "", "value": 8, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_skill", "value": 0, "multiplier": 1 }]
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "job{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": ["Job:_rank"],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"JobStyle": {
				"name": "JobStyle", "fieldName": "jobstyle", "group": "Type", "description": "", "variable": "jbs{0}{1}", "title": "Job", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "1", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 1, "multiplier": 1 }]
			},
			"Role": {
				"name": "Role", "fieldName": "role", "group": "Type", "description": "", "variable": "rol{0}{1}", "title": "Roles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "knw{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "10;TrainingKnowledge", "modifiers": "", "linkedGroups": ["Language:_rank", "Lore:_rank", "LoreCategory:_rank"],
				"isResource": "", "modAttrs": ["trn-tp_knowledge"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "trn-tp_knowledge", "value": 0, "multiplier": 1 }]
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "lng{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreCategory": {
				"name": "LoreCategory", "fieldName": "lorecategory", "group": "Type", "description": "", "variable": "lrc{0}{1}", "title": "Lore Category", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "lor{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "sty{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": ["Style", "JobStyle"],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"StyleType": {
				"name": "StyleType", "fieldName": "styletype", "group": "Type", "description": "", "variable": "stt{0}{1}", "title": "Style Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "tch{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "6;CR*2;AdvancementTechnique;TrainingTechniques", "modifiers": "", "linkedGroups": ["Technique", "Style"],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_technique", "trn-tp_technique"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 2 },
				{ "modName": "adv-ap_technique", "value": 0, "multiplier": 1 },
				{ "modName": "trn-tp_technique", "value": 0, "multiplier": 1 }]
			},
			"PageSet": {
				"name": "PageSet", "fieldName": "pageset", "group": "Type", "description": "", "variable": "pgs{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "pag{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title": {
				"name": "Title", "fieldName": "title", "group": "Type", "description": "", "variable": "ttl{0}{1}", "title": "Title", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "group": "Type", "description": "", "variable": "adv{0}{1}", "title": "Advancement", "subGroup": "", "descriptions": ["Advancement Points are gained whenever you level. ", "Every level you gain grants you one advancement point."],
				"abbreviation": "", "formula": "Level", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": ["adv-level"],
				"formulaCalculations": [{ "modName": "adv-level", "value": 0, "multiplier": 1 }]
			},
			"Training": {
				"name": "Training", "fieldName": "training", "group": "Type", "description": "", "variable": "trn{0}{1}", "title": "Training Points", "subGroup": "", "descriptions": ["Training points are gained through training. You can spend training points on bonus build points for both knowledge and techniques. ", "Whenever you gain PP, you gain one Training Point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "def{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "sen{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AffinityType": {
				"name": "AffinityType", "fieldName": "affinitytype", "group": "Type", "description": "", "variable": "afn{0}{1}", "title": "Affinity Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateDefenseType": {
				"name": "InnateDefenseType", "fieldName": "innatedefensetype", "group": "Type", "description": "", "variable": "idf{0}{1}", "title": "Innate Defense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateSenseType": {
				"name": "InnateSenseType", "fieldName": "innatesensetype", "group": "Type", "description": "", "variable": "isn{0}{1}", "title": "Innate Sense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "cmb{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "soc{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"DamageType": {
				"name": "DamageType", "fieldName": "damagetype", "group": "Type", "description": "", "variable": "dmg{0}{1}", "title": "Damage Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "trt{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "sts{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "cnd{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_subfilter": {
				"name": "_subfilter", "fieldName": "_subfilter", "group": "VariableMod", "description": "", "variable": "_subfilter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_info": {
				"name": "_info", "fieldName": "_info", "group": "VariableMod", "description": "", "variable": "_info", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_affinity": {
				"name": "_affinity", "fieldName": "_affinity", "group": "VariableMod", "description": "", "variable": "_affinity", "title": "Affinity Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "AffinityType", "description": "", "variable": "Wood", "title": "Wood", "subGroup": "", "descriptions": ["Wood is the element of growth, cooperation, and idealism. Magical techniques of the wood element tend to affect large groups and areas.", "A Wood affinity grants the following:\nInitiative bonus equal to your Character Rank.\nHeal Value bonus equal to your Character Rank x 2.\nCold Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "AffinityType", "description": "", "variable": "Fire", "title": "Fire", "subGroup": "", "descriptions": ["Fire is the element of expansion, spontaneity, and vigor. Magical techniques of the fire element tend to spread fire swiftly in a variety of impact areas.", "A Fire affinity grants the following:\nInitiative bonus equal to your Character Rank.\nBurn Resistance bonus equal to your Character Rank.\nFire Resistance bonus equal to your Character Rank x 2.", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "AffinityType", "description": "", "variable": "Earth", "title": "Earth", "subGroup": "", "descriptions": ["Earth is the element of stability, patience, and practicality. Magical techniques of the earth element tend to be simple and direct in functionality.", "An Earth affinity grants the following:\nFire Resistance bonus equal to your Character Rank x 2.\nPiercing Resistance bonus equal to your Character Rank.\nShock Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "AffinityType", "description": "", "variable": "Metal", "title": "Metal", "subGroup": "", "descriptions": ["Metal is the element of recession, rigidity, and quality. Magical techniques of the metal element tend to be strong and durable but costly.", "A Metal affinity grants the following:\nArmor bonus equal to your Character Rank.\nForce Resistance bonus equal to your Character Rank.\nPiercing Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "AffinityType", "description": "", "variable": "Water", "title": "Water", "subGroup": "", "descriptions": ["Water is the element of conservation, flexibility, and wisdom. Magical techniques of the water element tend to use little energy allowing them to quickly come into effect and disappear soon after.", "A Water affinity grants the following:\nSurge bonus equal to 1.\nCold Resistance bonus equal to your Character Rank x 2.\nForce Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"BOD": {
				"name": "BOD", "fieldName": "bod", "group": "InnateDefenseType", "description": "", "variable": "BOD", "title": "Body", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PRC": {
				"name": "PRC", "fieldName": "prc", "group": "InnateDefenseType", "description": "", "variable": "PRC", "title": "Precision", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"QCK": {
				"name": "QCK", "fieldName": "qck", "group": "InnateDefenseType", "description": "", "variable": "QCK", "title": "Quickness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"CNV": {
				"name": "CNV", "fieldName": "cnv", "group": "InnateSenseType", "description": "", "variable": "CNV", "title": "Conviction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"INT": {
				"name": "INT", "fieldName": "int", "group": "InnateSenseType", "description": "", "variable": "INT", "title": "Intuition ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"RSN": {
				"name": "RSN", "fieldName": "rsn", "group": "InnateSenseType", "description": "", "variable": "RSN", "title": "Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributevaluemediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributevaluegreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributevaluegood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributevalueaverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributevaluebad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier0": {
				"name": "JobTier0", "fieldName": "jobtier0", "group": "JobTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier1": {
				"name": "JobTier1", "fieldName": "jobtier1", "group": "JobTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier2": {
				"name": "JobTier2", "fieldName": "jobtier2", "group": "JobTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier3": {
				"name": "JobTier3", "fieldName": "jobtier3", "group": "JobTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier0": {
				"name": "LoreTier0", "fieldName": "loretier0", "group": "LoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier1": {
				"name": "LoreTier1", "fieldName": "loretier1", "group": "LoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier2": {
				"name": "LoreTier2", "fieldName": "loretier2", "group": "LoreTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreTier3": {
				"name": "LoreTier3", "fieldName": "loretier3", "group": "LoreTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"GeneralLoreTier0": {
				"name": "GeneralLoreTier0", "fieldName": "generalloretier0", "group": "GeneralLoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"GeneralLoreTier1": {
				"name": "GeneralLoreTier1", "fieldName": "generalloretier1", "group": "GeneralLoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Academics": {
				"name": "Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "Academics", "title": "Academics", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Profession": {
				"name": "Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "Profession", "title": "Profession", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Craftmanship": {
				"name": "Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "Craftmanship", "title": "Craftmanship", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Geography": {
				"name": "Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "Geography", "title": "Geography", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"History": {
				"name": "History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "History", "title": "History", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Culture": {
				"name": "Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "Culture", "title": "Culture", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Religion": {
				"name": "Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "Religion", "title": "Religion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Character Creator": {
				"name": "PageSet_Character Creator", "fieldName": "character_creator", "group": "PageSet", "description": "", "variable": "pgs-character_creator{0}", "title": "Character Creator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Core": {
				"name": "PageSet_Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "pgs-core{0}", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Advancement": {
				"name": "PageSet_Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "pgs-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PageSet_Training": {
				"name": "PageSet_Training", "fieldName": "training", "group": "PageSet", "description": "", "variable": "pgs-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "pag-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, press Finish to populate this character's stats.", "On this page you can set your character's origins including their name, their primary element, and ancestry. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Jobs": {
				"name": "Page_Jobs", "fieldName": "jobs", "group": "Page", "description": "", "variable": "pag-jobs{0}", "title": "Jobs", "subGroup": "", "descriptions": ["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ", "On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.", "Gaining a rank in a job often grants new techniques to use when a job's techniques are active.", "You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Skills": {
				"name": "Page_Skills", "fieldName": "skills", "group": "Page", "description": "", "variable": "pag-skills{0}", "title": "Skills", "subGroup": "", "descriptions": ["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.", "Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.", "On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Knowledge": {
				"name": "Page_Knowledge", "fieldName": "knowledge", "group": "Page", "description": "", "variable": "pag-knowledge{0}", "title": "Knowledge", "subGroup": "", "descriptions": ["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ", "Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ", "Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.", "Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.", "On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.", "You gain a number of skill points equal to 8 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Attributes": {
				"name": "Page_Attributes", "fieldName": "attributes", "group": "Page", "description": "", "variable": "pag-attributes{0}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.", "By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can have one attribute at a -1 penalty.", "You gain a number of attribute points equal to 6 + your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Styles": {
				"name": "Page_Styles", "fieldName": "styles", "group": "Page", "description": "", "variable": "pag-styles{0}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_LearnTechniques": {
				"name": "Page_LearnTechniques", "fieldName": "learntechniques", "group": "Page", "description": "", "variable": "pag-learntechniques{0}", "title": "Learn Styles and Techniques", "subGroup": "", "descriptions": ["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.", "All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.", "When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.", "You gain a number of technique points equal to 6 + your Character Rank x 2. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_SetStyles": {
				"name": "Page_SetStyles", "fieldName": "setstyles", "group": "Page", "description": "", "variable": "pag-setstyles{0}", "title": "Set Styles", "subGroup": "", "descriptions": ["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. ", ""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "pag-character{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "pag-overview{0}", "title": "Overview", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "pag-details{0}", "title": "Details", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "pag-chat{0}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "pag-options{0}", "title": "Options", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "pag-gear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Actions": {
				"name": "Page_Actions", "fieldName": "actions", "group": "Page", "description": "", "variable": "pag-actions{0}", "title": "Actions", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Training": {
				"name": "Page_Training", "fieldName": "training", "group": "Page", "description": "", "variable": "pag-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Page_Advancement": {
				"name": "Page_Advancement", "fieldName": "advancement", "group": "Page", "description": "", "variable": "pag-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Origin": {
				"name": "Title_Origin", "fieldName": "origin", "group": "Title", "description": "", "variable": "ttl-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["These are the origin details of your character. They make no mechanical differences to your character, however may impact how you roleplay your character."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginStats": {
				"name": "Title_OriginStats", "fieldName": "originstats", "group": "Title", "description": "", "variable": "ttl-originstats{0}", "title": "Origin Statistics", "subGroup": "", "descriptions": ["These are your characters core statistics that are set at character creation and cannot change. Each stat can affect how your character plays. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginAdvancement": {
				"name": "Title_OriginAdvancement", "fieldName": "originadvancement", "group": "Title", "description": "", "variable": "ttl-originadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "Here you can set your character's level. You may also spend any advancement points gained from increasing your character level on additional build points for jobs, skills, or techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_OriginTraining": {
				"name": "Title_OriginTraining", "fieldName": "origintraining", "group": "Title", "description": "", "variable": "ttl-origintraining{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "Here you can set any training points your character may have gained prior to character creation. You may also immediately spend these points on further build points."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Advancement": {
				"name": "Title_Advancement", "fieldName": "advancement", "group": "Title", "description": "", "variable": "ttl-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Title_Training": {
				"name": "Title_Training", "fieldName": "training", "group": "Title", "description": "", "variable": "ttl-training{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "Advancement", "description": "", "variable": "adv-level{0}", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"CR": {
				"name": "CR", "fieldName": "cr", "group": "Advancement", "description": "", "variable": "adv-cr{0}", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level.", "Your Character rank begins at 1. \nAt 5th Level it increases to 2.\nAt 15th Level it increases to 3.\nAt 30th Level it increases to 4.\nAt 50th Level it increases to 5."],
				"abbreviation": "CR", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"XP": {
				"name": "XP", "fieldName": "xp", "group": "Advancement", "description": "", "variable": "adv-xp{0}", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "formula": "30", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 30, "multiplier": 1 }]
			},
			"AdvancementJob": {
				"name": "AdvancementJob", "fieldName": "advancementjob", "group": "Advancement", "description": "", "variable": "adv-ap_job{0}", "title": "Job Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Job Points. These job points can be used to increase tier in a job. You must spend 2 advancement points to gain 1 job point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AdvancementSkill": {
				"name": "AdvancementSkill", "fieldName": "advancementskill", "group": "Advancement", "description": "", "variable": "adv-ap_skill{0}", "title": "Skill Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Skill Points. These skill points can be used to learn a new skill. You must spend 2 advancement points to gain 1 skill point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"AdvancementTechnique": {
				"name": "AdvancementTechnique", "fieldName": "advancementtechnique", "group": "Advancement", "description": "", "variable": "adv-ap_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 advancement points to gain 1 technique point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTier": {
				"name": "JobTier", "fieldName": "jobtier", "group": "Advancement", "description": "", "variable": "adv-jobtier{0}", "title": "Job Tier", "subGroup": "", "descriptions": ["Your job tier represents your skill in this job. Any tier above 0 allows you to choose this job as a set job style. Each tier will unlock the use of additional techniques as shown below.", "Your maximum job tier in any job is equal to your Character Rank."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"JobTechniques": {
				"name": "JobTechniques", "fieldName": "jobtechniques", "group": "Advancement", "description": "", "variable": "adv-jobtechniques{0}", "title": "Job Techniques", "subGroup": "", "descriptions": ["These techniques are gained when reaching the listed tier in the job. These techniques often help you perform tasks related to your job."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"TrainingKnowledge": {
				"name": "TrainingKnowledge", "fieldName": "trainingknowledge", "group": "Training", "description": "", "variable": "trn-tp_knowledge{0}", "title": "Knowledge Points", "subGroup": "", "descriptions": ["You can spend training points to gain Knowledge Points. These knowledge points can be used to increase tier in a job. You must spend 1 training points to gain 1 knowledge point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"TrainingTechniques": {
				"name": "TrainingTechniques", "fieldName": "trainingtechniques", "group": "Training", "description": "", "variable": "trn-tp_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend training points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 training points to gain 1 technique point."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"PP": {
				"name": "PP", "fieldName": "pp", "group": "Training", "description": "", "variable": "trn-pp{0}", "title": "Progression", "subGroup": "", "descriptions": ["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ", "Once a character reaches 12 TP, they may spend their PP to gain a new knowledge or technique."],
				"abbreviation": "", "formula": "12", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 12, "multiplier": 1 }]
			},
			"Attribute_BOD": {
				"name": "Attribute_BOD", "fieldName": "bod", "group": "Attribute", "description": "", "variable": "atr-bod{0}", "title": "Body", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_PRC": {
				"name": "Attribute_PRC", "fieldName": "prc", "group": "Attribute", "description": "", "variable": "atr-prc{0}", "title": "Precision", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_QCK": {
				"name": "Attribute_QCK", "fieldName": "qck", "group": "Attribute", "description": "", "variable": "atr-qck{0}", "title": "Quickness", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "QCK", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_CNV": {
				"name": "Attribute_CNV", "fieldName": "cnv", "group": "Attribute", "description": "", "variable": "atr-cnv{0}", "title": "Conviction", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_INT": {
				"name": "Attribute_INT", "fieldName": "int", "group": "Attribute", "description": "", "variable": "atr-int{0}", "title": "Intuition ", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Attribute_RSN": {
				"name": "Attribute_RSN", "fieldName": "rsn", "group": "Attribute", "description": "", "variable": "atr-rsn{0}", "title": "Reason", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Combat": {
				"name": "Defense_Combat", "fieldName": "combat", "group": "Defense", "description": "", "variable": "def-combat{0}", "title": "Combat Sense", "subGroup": "Combined Defense", "descriptions": ["Combat Defense is a character's ability to use all their defenses available to defend themselves in combat. This defense is equal to the highest defense between a character's Brace, Disruption, and Reflex defenses."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Defense_Brace": {
				"name": "Defense_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "def-brace{0}", "title": "Brace", "subGroup": "Combat Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech;_gear", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "def-brace_expertise", "def-brace _tech", "def-brace_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Fortitude": {
				"name": "Defense_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "def-fortitude{0}", "title": "Fortitude", "subGroup": "Defense", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "formula": "7;Attribute_BOD", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "def-fortitude_expertise", "def-fortitude _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Defense_Disruption": {
				"name": "Defense_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "def-disruption{0}", "title": "Disruption", "subGroup": "Combat Defense", "descriptions": ["Guard represents a character's ability to resist an attack by disrupting its impact via parrying with a weapon or reducing its effectiveness. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech;_gear", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "def-disruption_expertise", "def-disruption _tech", "def-disruption_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Hide": {
				"name": "Defense_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "def-hide{0}", "title": "Hide", "subGroup": "Defense", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "formula": "7;Attribute_PRC", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "def-hide_expertise", "def-hide _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Defense_Reflex": {
				"name": "Defense_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "def-reflex{0}", "title": "Reflex", "subGroup": "Combat Defense", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "formula": "7;Attribute_QCK", "modifiers": "_expertise; _tech;_gear", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "def-reflex_expertise", "def-reflex _tech", "def-reflex_gear"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Defense_Evasion": {
				"name": "Defense_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "def-evasion{0}", "title": "Evasion", "subGroup": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "formula": "4;Attribute_QCK", "modifiers": "_expertise; _tech;_gear", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "def-evasion_expertise", "def-evasion _tech", "def-evasion_gear"],
				"formulaCalculations": [{ "modName": "", "value": 4, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Sense_Social": {
				"name": "Sense_Social", "fieldName": "social", "group": "Sense", "description": "", "variable": "sen-social{0}", "title": "Social Sense", "subGroup": "Combined Sense", "descriptions": ["Social Sense is your ability to use all of your social senses at once to make a read on a situation. This sense is equal to the highest sese between your Insight, Scrutiny, and Resolve."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Sense_Insight": {
				"name": "Sense_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "sen-insight{0}", "title": "Insight", "subGroup": "Social Sense", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "sen-insight_expertise", "sen-insight _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Notice": {
				"name": "Sense_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "sen-notice{0}", "title": "Notice", "subGroup": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "formula": "7;Attribute_INT", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "sen-notice_expertise", "sen-notice _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Scrutiny": {
				"name": "Sense_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "sen-scrutiny{0}", "title": "Scrutiny", "subGroup": "Social Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "sen-scrutiny_expertise", "sen-scrutiny _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Detect": {
				"name": "Sense_Detect", "fieldName": "detect", "group": "Sense", "description": "", "variable": "sen-detect{0}", "title": "Detect", "subGroup": "Sense", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "formula": "7;Attribute_RSN", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "sen-detect_expertise", "sen-detect _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Resolve": {
				"name": "Sense_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "sen-resolve{0}", "title": "Resolve", "subGroup": "Social Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "formula": "7;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "sen-resolve_expertise", "sen-resolve _tech"],
				"formulaCalculations": [{ "modName": "", "value": 7, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Sense_Freewill": {
				"name": "Sense_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "sen-freewill{0}", "title": "Freewill", "subGroup": "Sense", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "formula": "10;Attribute_CNV", "modifiers": "_expertise; _tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "sen-freewill_expertise", "sen-freewill _tech"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_expertise", "value": 0, "multiplier": 1 },
				{ "modName": " _tech", "value": 0, "multiplier": 1 }]
			},
			"Full Name": {
				"name": "Full Name", "fieldName": "full_name", "group": "General", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Display Name": {
				"name": "Display Name", "fieldName": "display_name", "group": "General", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Background": {
				"name": "Background", "fieldName": "background", "group": "General", "description": "", "variable": "background", "title": "Background", "subGroup": "", "descriptions": ["This is the background story of your character. Add any details on the character's past here."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Age": {
				"name": "Age", "fieldName": "age", "group": "General", "description": "", "variable": "age", "title": "Age", "subGroup": "", "descriptions": ["This represents how old the character is in years."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Gender": {
				"name": "Gender", "fieldName": "gender", "group": "General", "description": "", "variable": "gender", "title": "Gender", "subGroup": "", "descriptions": ["The gender the character identifies as."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Homeland": {
				"name": "Homeland", "fieldName": "homeland", "group": "General", "description": "", "variable": "homeland", "title": "Homeland", "subGroup": "", "descriptions": ["Where this character grew up. This will usually shape their perspectives in the world."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"HP": {
				"name": "HP", "fieldName": "hp", "group": "General", "description": "", "variable": "hp{0}", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "formula": "10; CR*10; Level; Attribute_BOD", "modifiers": "_tech;_affinity", "linkedGroups": [],
				"isResource": true, "modAttrs": ["adv-cr", "adv-level", "atr-bod", "hp_tech", "hp_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"WILL": {
				"name": "WILL", "fieldName": "will", "group": "General", "description": "", "variable": "will{0}", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "formula": "10;CR*10;Level;Attribute_CNV", "modifiers": "_tech", "linkedGroups": [],
				"isResource": true, "modAttrs": ["adv-cr", "adv-level", "atr-cnv", "will_tech"],
				"formulaCalculations": [{ "modName": "", "value": 10, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"EN": {
				"name": "EN", "fieldName": "en", "group": "General", "description": "", "variable": "en{0}", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": [],
				"formulaCalculations": []
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "initiative{0}", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "formula": "CR;Attribute_QCK", "modifiers": "_tech;_affinity", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "atr-qck", "initiative_tech", "initiative_affinity"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "General", "description": "", "variable": "affinity{0}", "title": "Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells will have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity.", "Your chosen affinity grants weaknesses and resistances to certain elemental damage types."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateDefense": {
				"name": "InnateDefense", "fieldName": "innatedefense", "group": "General", "description": "", "variable": "innatefefense{0}", "title": "Innate Defense", "subGroup": "", "descriptions": ["You are especially proficient in a physical attribute when it comes to defending yourself. Check the Attributes page for more details on each of these attributes and what defenses they apply to.", "All defenses that key off of your chosen attribute gains a permanent +2 bonus. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"InnateSense": {
				"name": "InnateSense", "fieldName": "innatesense", "group": "General", "description": "", "variable": "innatesense{0}", "title": "Innate Sense", "subGroup": "", "descriptions": ["You are especially proficient in a mental attribute when it comes to detecting attacks against you. Check the Attributes page for more details on each of these attributes and what defenses they apply to. ", "All senses that key off of your chosen attribute gains a permanent +2 bonus."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Recall": {
				"name": "Recall", "fieldName": "recall", "group": "General", "description": "", "variable": "recall{0}", "title": "Recall", "subGroup": "", "descriptions": ["Recall is your ability to remember information learned in the past. It is used as a modifier when using Recall Knowledge to gain information. "],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "recall_tech"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carrying_capacity", "group": "Gear", "description": "", "variable": "capacity{0}", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "formula": "40;Attribute_BOD*20", "modifiers": "_tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "capacity_tech"],
				"formulaCalculations": [{ "modName": "", "value": 40, "multiplier": 1 },
				{ "modName": "atr-bod", "value": 0, "multiplier": 20 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_HV": {
				"name": "Combat_HV", "fieldName": "hv", "group": "Combat", "description": "", "variable": "cmb-hv{0}", "title": "Heal Value", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from some healing abilities."],
				"abbreviation": "HV", "formula": "5;CR*4;Attribute_CNV", "modifiers": "_tech;_affinity", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "atr-cnv", "cmb-hv_tech", "cmb-hv_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 5, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 4 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Armor": {
				"name": "Combat_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "cmb-armor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "formula": "0", "modifiers": "_tech;_gear;_affinity", "linkedGroups": [],
				"isResource": "", "modAttrs": ["cmb-armor_tech", "cmb-armor_gear", "cmb-armor_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 0, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Resistance": {
				"name": "Combat_Resistance", "fieldName": "resistance", "group": "Combat", "description": "", "variable": "cmb-resistance{0}", "title": "Resistance", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "_tech;_gear;_affinity", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_ResistanceDesc": {
				"name": "Combat_ResistanceDesc", "fieldName": "resistancedesc", "group": "Combat", "description": "", "variable": "cmb-resistancedesc{0}", "title": "Resistance", "subGroup": "", "descriptions": ["Resistance reduces damage of specific damage types by a value equal to the resistance's type. The resistance calculation happens after armor is applied."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_WeaknessDesc": {
				"name": "Combat_WeaknessDesc", "fieldName": "weaknessdesc", "group": "Combat", "description": "", "variable": "cmb-weaknessdesc{0}", "title": "Weakness", "subGroup": "", "descriptions": ["Weakness is the opposite of Resistance, increasing damage against you when hit by specific damage types by a value equal to the weakness' type. The weakness calculation happens after armor is applied."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Durability": {
				"name": "Combat_Durability", "fieldName": "durability", "group": "Combat", "description": "", "variable": "cmb-durability{0}", "title": "Durability", "subGroup": "", "descriptions": ["Durability is the number of times a character can restore their HP back to full when their HP drops to 0."],
				"abbreviation": "", "formula": "2", "modifiers": "_tech", "linkedGroups": [],
				"isResource": true, "modAttrs": ["cmb-durability_tech"],
				"formulaCalculations": [{ "modName": "", "value": 2, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Combat_Surge": {
				"name": "Combat_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "cmb-surge{0}", "title": "Healing Surge", "subGroup": "", "descriptions": ["Healing Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "formula": "4", "modifiers": "_tech;_affinity", "linkedGroups": [],
				"isResource": "", "modAttrs": ["cmb-surge_tech", "cmb-surge_affinity"],
				"formulaCalculations": [{ "modName": "", "value": 4, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_affinity", "value": 0, "multiplier": 1 }]
			},
			"Combat_Chakra": {
				"name": "Combat_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "cmb-chakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "formula": "3;CR", "modifiers": "", "linkedGroups": [],
				"isResource": true, "modAttrs": ["adv-cr"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 1 }]
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Combat_Move Speed": {
				"name": "Combat_Move Speed", "fieldName": "move_speed", "group": "Combat", "description": "", "variable": "cmb-movespeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "formula": "3", "modifiers": "_tech;_gear", "linkedGroups": [],
				"isResource": "", "modAttrs": ["cmb-movespeed_tech", "cmb-movespeed_gear"],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 },
				{ "modName": "_gear", "value": 0, "multiplier": 1 }]
			},
			"Combat_Move Potency": {
				"name": "Combat_Move Potency", "fieldName": "move_potency", "group": "Combat", "description": "", "variable": "cmb-movepotency{0}", "title": "Move Potency", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "formula": "6", "modifiers": "_tech", "linkedGroups": [],
				"isResource": "", "modAttrs": ["cmb-movepotency_tech"],
				"formulaCalculations": [{ "modName": "", "value": 6, "multiplier": 1 },
				{ "modName": "_tech", "value": 0, "multiplier": 1 }]
			},
			"Social_Approval": {
				"name": "Social_Approval", "fieldName": "approval", "group": "Social", "description": "", "variable": "soc-approval{0}", "title": "Approval Resistance", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. "],
				"abbreviation": "", "formula": "20;CR*15;Level;Attribute_CNV", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-level", "atr-cnv"],
				"formulaCalculations": [{ "modName": "", "value": 20, "multiplier": 1 },
				{ "modName": "adv-cr", "value": 0, "multiplier": 15 },
				{ "modName": "adv-level", "value": 0, "multiplier": 1 },
				{ "modName": "atr-cnv", "value": 0, "multiplier": 1 }]
			},
			"Social_Patience": {
				"name": "Social_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "soc-patience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how long a character can last in social combat before they become frustrated and unable to participate meaningfully. "],
				"abbreviation": "", "formula": "CR*10;", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", ""],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 10 },
				{ "modName": "", "value": 0, "multiplier": 1 }]
			},
			"Burn": {
				"name": "Burn", "fieldName": "burn", "group": "DamageType", "description": "", "variable": "dmg-burn{0}", "title": "Burn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Cold": {
				"name": "Cold", "fieldName": "cold", "group": "DamageType", "description": "", "variable": "dmg-cold{0}", "title": "Cold", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Energy": {
				"name": "Energy", "fieldName": "energy", "group": "DamageType", "description": "", "variable": "dmg-energy{0}", "title": "Energy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Force": {
				"name": "Force", "fieldName": "force", "group": "DamageType", "description": "", "variable": "dmg-force{0}", "title": "Force", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Piercing": {
				"name": "Piercing", "fieldName": "piercing", "group": "DamageType", "description": "", "variable": "dmg-piercing{0}", "title": "Piercing", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Shock": {
				"name": "Shock", "fieldName": "shock", "group": "DamageType", "description": "", "variable": "dmg-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Tension": {
				"name": "Tension", "fieldName": "tension", "group": "DamageType", "description": "", "variable": "dmg-tension{0}", "title": "Tension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "trt-accurate{0}", "title": "Accurate", "subGroup": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "trt-affinity{0}", "title": "Affinity", "subGroup": "Technique Trait", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "trt-affinity+{0}", "title": "Affinity+", "subGroup": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "ap", "group": "Trait", "description": "", "variable": "trt-ap{0}", "title": "AP:X", "subGroup": "Technique Trait", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "trt-brutal{0}", "title": "Brutal", "subGroup": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Evadible": {
				"name": "Trait_Evadible", "fieldName": "evadible", "group": "Trait", "description": "", "variable": "trt-evadible{0}", "title": "Evadible", "subGroup": "Technique Trait", "descriptions": ["When making a check against a target, compare your check results against the target's evasion. On failure, none of the technique's effects take effect. A target may always choose to not evade a technique. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "trt-focus{0}", "title": "Focus", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "trt-focus+{0}", "title": "Focus+", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "trt-material{0}", "title": "Material", "subGroup": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "trt-simple{0}", "title": "Simple", "subGroup": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "trt-volatile{0}", "title": "Volatile", "subGroup": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "trt-vortex{0}", "title": "Vortex", "subGroup": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "trt-weapon{0}", "title": "Weapon", "subGroup": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "trt-wall{0}", "title": "Wall", "subGroup": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "trt-arcing{0}", "title": "Arcing", "subGroup": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "trt-shield{0}", "title": "Shield", "subGroup": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "trt-thrown{0}", "title": "Thrown", "subGroup": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-handed", "group": "Trait", "description": "", "variable": "trt-two-handed{0}", "title": "Two-Handed", "subGroup": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "trt-loud{0}", "title": "Loud", "subGroup": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "trt-flammable{0}", "title": "Flammable", "subGroup": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "trt-flexible{0}", "title": "Flexible", "subGroup": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "trt-frozen{0}", "title": "Frozen", "subGroup": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "trt-sharp{0}", "title": "Sharp", "subGroup": "Material Trait", "descriptions": ["Sharp materials can maintain durability even when reduced to a thin edge. Sharp materials are appropriate for slashing weapons and anything that needs to retain form when made especially thin."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "trt-sturdy{0}", "title": "Sturdy", "subGroup": "Material Trait", "descriptions": ["Sturdy materials are especially durable and resilient. Sturdy material is resistant to all damage types except force."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "trt-transparent{0}", "title": "Transparent", "subGroup": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Downed": {
				"name": "Status_Downed", "fieldName": "downed", "group": "Status", "description": "", "variable": "sts-downed{0}", "title": "Downed", "subGroup": "", "descriptions": ["A creature that is downed can only perform techniques with the Simple trait. This status ends when the creature's trauma is less than their Trauma Limit."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Engaged": {
				"name": "Status_Engaged", "fieldName": "engaged", "group": "Status", "description": "", "variable": "sts-engaged{0}", "title": "Engaged", "subGroup": "", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Ethereal": {
				"name": "Status_Ethereal", "fieldName": "ethereal", "group": "Status", "description": "", "variable": "sts-ethereal{0}", "title": "Ethereal", "subGroup": "", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Grappled": {
				"name": "Status_Grappled", "fieldName": "grappled", "group": "Status", "description": "", "variable": "sts-grappled{0}", "title": "Grappled", "subGroup": "", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Hidden": {
				"name": "Status_Hidden", "fieldName": "hidden", "group": "Status", "description": "", "variable": "sts-hidden{0}", "title": "Hidden", "subGroup": "", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Initiative Penalty": {
				"name": "Status_Initiative Penalty", "fieldName": "initiative_penalty", "group": "Status", "description": "", "variable": "sts-initiative_penalty{0}", "title": "Initiative Penalty", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Invisible": {
				"name": "Status_Invisible", "fieldName": "invisible", "group": "Status", "description": "", "variable": "sts-invisible{0}", "title": "Invisible", "subGroup": "", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Roll a die or flip a coin to determine if the attack misses. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Restrained": {
				"name": "Status_Restrained", "fieldName": "restrained", "group": "Status", "description": "", "variable": "sts-restrained{0}", "title": "Restrained", "subGroup": "", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Status_Unconscious": {
				"name": "Status_Unconscious", "fieldName": "unconscious", "group": "Status", "description": "", "variable": "sts-unconscious{0}", "title": "Unconscious", "subGroup": "", "descriptions": ["An unconscious creature cannot take actions or reactions, can’t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it’s holding and falls prone.\nThe creature automatically fails all saving throws.\nAttack rolls against the creature have +1 Advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Aflame": {
				"name": "Condition_Aflame", "fieldName": "aflame", "group": "Condition", "description": "", "variable": "cnd-aflame{0}", "title": "Aflame", "subGroup": "", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Angered": {
				"name": "Condition_Angered", "fieldName": "angered", "group": "Condition", "description": "", "variable": "cnd-angered{0}", "title": "Angered", "subGroup": "", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Chilled": {
				"name": "Condition_Chilled", "fieldName": "chilled", "group": "Condition", "description": "", "variable": "cnd-chilled{0}", "title": "Chilled", "subGroup": "", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Delayed": {
				"name": "Condition_Delayed", "fieldName": "delayed", "group": "Condition", "description": "", "variable": "cnd-delayed{0}", "title": "Delayed", "subGroup": "", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Disgusted": {
				"name": "Condition_Disgusted", "fieldName": "disgusted", "group": "Condition", "description": "", "variable": "cnd-disgusted{0}", "title": "Disgusted", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Dying": {
				"name": "Condition_Dying", "fieldName": "dying", "group": "Condition", "description": "", "variable": "cnd-dying{0}", "title": "Dying", "subGroup": "", "descriptions": ["At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Empowered": {
				"name": "Condition_Empowered", "fieldName": "empowered", "group": "Condition", "description": "", "variable": "cnd-empowered{0}", "title": "Empowered", "subGroup": "", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encouraged": {
				"name": "Condition_Encouraged", "fieldName": "encouraged", "group": "Condition", "description": "", "variable": "cnd-encouraged{0}", "title": "Encouraged", "subGroup": "", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Encumbered": {
				"name": "Condition_Encumbered", "fieldName": "encumbered", "group": "Condition", "description": "", "variable": "cnd-encumbered{0}", "title": "Encumbered", "subGroup": "", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Frightened": {
				"name": "Condition_Frightened", "fieldName": "frightened", "group": "Condition", "description": "", "variable": "cnd-frightened{0}", "title": "Frightened", "subGroup": "", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Hasted": {
				"name": "Condition_Hasted", "fieldName": "hasted", "group": "Condition", "description": "", "variable": "cnd-hasted{0}", "title": "Hasted", "subGroup": "", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Immobilized": {
				"name": "Condition_Immobilized", "fieldName": "immobilized", "group": "Condition", "description": "", "variable": "cnd-immobilized{0}", "title": "Immobilized", "subGroup": "", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Impaired": {
				"name": "Condition_Impaired", "fieldName": "impaired", "group": "Condition", "description": "", "variable": "cnd-impaired{0}", "title": "Impaired", "subGroup": "", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Joyful": {
				"name": "Condition_Joyful", "fieldName": "joyful", "group": "Condition", "description": "", "variable": "cnd-joyful{0}", "title": "Joyful", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Launched": {
				"name": "Condition_Launched", "fieldName": "launched", "group": "Condition", "description": "", "variable": "cnd-launched{0}", "title": "Launched", "subGroup": "", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Paralyzed": {
				"name": "Condition_Paralyzed", "fieldName": "paralyzed", "group": "Condition", "description": "", "variable": "cnd-paralyzed{0}", "title": "Paralyzed", "subGroup": "", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Prone": {
				"name": "Condition_Prone", "fieldName": "prone", "group": "Condition", "description": "", "variable": "cnd-prone{0}", "title": "Prone", "subGroup": "", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Saddened": {
				"name": "Condition_Saddened", "fieldName": "saddened", "group": "Condition", "description": "", "variable": "cnd-saddened{0}", "title": "Saddened", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Sickened": {
				"name": "Condition_Sickened", "fieldName": "sickened", "group": "Condition", "description": "", "variable": "cnd-sickened{0}", "title": "Sickened", "subGroup": "", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Staggered": {
				"name": "Condition_Staggered", "fieldName": "staggered", "group": "Condition", "description": "", "variable": "cnd-staggered{0}", "title": "Staggered", "subGroup": "", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Stunned": {
				"name": "Condition_Stunned", "fieldName": "stunned", "group": "Condition", "description": "", "variable": "cnd-stunned{0}", "title": "Stunned", "subGroup": "", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Condition_Surprised": {
				"name": "Condition_Surprised", "fieldName": "surprised", "group": "Condition", "description": "", "variable": "cnd-surprised{0}", "title": "Surprised", "subGroup": "", "descriptions": ["-"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Style_Basic Set": {
				"name": "Style_Basic Set", "fieldName": "basic_set", "group": "Style", "description": "", "variable": "sty-basic_set{0}", "title": "Basic Set", "subGroup": "Basics", "descriptions": ["A standard list of techniques. Anyone can perform these techniques. "],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "swordplay", "group": "Style", "description": "", "variable": "sty-swordplay{0}", "title": "Swordplay", "subGroup": "Standard", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "ki_extension", "group": "Style", "description": "", "variable": "sty-ki_extension{0}", "title": "Ki Extension", "subGroup": "Standard", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "formula": "3", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": [{ "modName": "", "value": 3, "multiplier": 1 }]
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "skl-acrobatics{0}", "title": "Acrobatics", "subGroup": "Athletics Skill", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "Attribute_QCK", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "skl-acrobatics_rank"],
				"formulaCalculations": [{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "group": "Skill", "description": "", "variable": "skl-agility{0}", "title": "Agility", "subGroup": "Athletics Skill", "descriptions": [""],
				"abbreviation": "", "formula": "Attribute_QCK", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "skl-agility_rank"],
				"formulaCalculations": [{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "skl-analyze{0}", "title": "Analyze", "subGroup": "Sensing Skill", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "skl-analyze_rank"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "skl-build{0}", "title": "Build", "subGroup": "Creation Skill", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "skl-build_rank"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "skl-channel{0}", "title": "Channel", "subGroup": "Creation Skill", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "formula": "Attribute_CNV", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "skl-channel_rank"],
				"formulaCalculations": [{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "skl-charm{0}", "title": "Charm", "subGroup": "Social Skill", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "formula": "Attribute_CNV", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "skl-charm_rank"],
				"formulaCalculations": [{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "group": "Skill", "description": "", "variable": "skl-command{0}", "title": "Command", "subGroup": " Skill", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "],
				"abbreviation": "", "formula": "", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "group": "Skill", "description": "", "variable": "skl-concoct{0}", "title": "Concoct", "subGroup": " Skill", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "formula": "", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "skl-cook{0}", "title": "Cook", "subGroup": "Creation Skill", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "formula": "Attribute_INT", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "skl-cook_rank"],
				"formulaCalculations": [{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "group": "Skill", "description": "", "variable": "skl-deception{0}", "title": "Deception", "subGroup": "Social Skill", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "skl-deception_rank"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "group": "Skill", "description": "", "variable": "skl-disguise{0}", "title": "Disguise", "subGroup": "Creation Skill", "descriptions": [""],
				"abbreviation": "", "formula": "Attribute_INT", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "skl-disguise_rank"],
				"formulaCalculations": [{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "skl-empathy{0}", "title": "Empathy", "subGroup": "Sensing Skill", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "formula": "Attribute_INT", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "skl-empathy_rank"],
				"formulaCalculations": [{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "skl-enchant{0}", "title": "Enchant", "subGroup": "Manipulate Skill", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "formula": "Attribute_CNV", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "skl-enchant_rank"],
				"formulaCalculations": [{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "skl-finesse{0}", "title": "Finesse", "subGroup": "Combat Skill", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "formula": "Attribute_QCK", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "skl-finesse_rank"],
				"formulaCalculations": [{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "group": "Skill", "description": "", "variable": "skl-flexibility{0}", "title": "Flexibility", "subGroup": " Skill", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "formula": "", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "group": "Skill", "description": "", "variable": "skl-grappling{0}", "title": "Grappling", "subGroup": "Combat Skill", "descriptions": [""],
				"abbreviation": "", "formula": "Attribute_BOD", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "skl-grappling_rank"],
				"formulaCalculations": [{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "group": "Skill", "description": "", "variable": "skl-heal{0}", "title": "Heal", "subGroup": " Skill", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "formula": "", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "group": "Skill", "description": "", "variable": "skl-intimidation{0}", "title": "Intimidation", "subGroup": "Social Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "formula": "Attribute_CNV", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "skl-intimidation_rank"],
				"formulaCalculations": [{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "group": "Skill", "description": "", "variable": "skl-leadership{0}", "title": "Leadership", "subGroup": "Social Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "formula": "Attribute_INT", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "skl-leadership_rank"],
				"formulaCalculations": [{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "group": "Skill", "description": "", "variable": "skl-maneuver{0}", "title": "Maneuver", "subGroup": " Skill", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "formula": "", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "group": "Skill", "description": "", "variable": "skl-medicine{0}", "title": "Medicine", "subGroup": "Creation Skill", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "skl-medicine_rank"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "skl-might{0}", "title": "Might", "subGroup": "Combat Skill", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "formula": "Attribute_BOD", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "skl-might_rank"],
				"formulaCalculations": [{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "group": "Skill", "description": "", "variable": "skl-negotiation{0}", "title": "Negotiation", "subGroup": "Social Skill", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "formula": "Attribute_RSN", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-rsn", "skl-negotiation_rank"],
				"formulaCalculations": [{ "modName": "atr-rsn", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "group": "Skill", "description": "", "variable": "skl-palming{0}", "title": "Palming", "subGroup": "Manipulate Skill", "descriptions": [""],
				"abbreviation": "", "formula": "Attribute_QCK", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "skl-palming_rank"],
				"formulaCalculations": [{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "group": "Skill", "description": "", "variable": "skl-physique{0}", "title": "Physique", "subGroup": "Athletics Skill", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "formula": "Attribute_BOD", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "skl-physique_rank"],
				"formulaCalculations": [{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "skl-pilot{0}", "title": "Pilot", "subGroup": "Manipulate Skill", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "formula": "Attribute_QCK", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-qck", "skl-pilot_rank"],
				"formulaCalculations": [{ "modName": "atr-qck", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "skl-resonance{0}", "title": "Resonance", "subGroup": "Sensing Skill", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "formula": "Attribute_CNV", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-cnv", "skl-resonance_rank"],
				"formulaCalculations": [{ "modName": "atr-cnv", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "skl-search{0}", "title": "Search", "subGroup": "Sensing Skill", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "formula": "Attribute_INT", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-int", "skl-search_rank"],
				"formulaCalculations": [{ "modName": "atr-int", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "skl-shoot{0}", "title": "Shoot", "subGroup": "Combat Skill", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "formula": "Attribute_PRC", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "skl-shoot_rank"],
				"formulaCalculations": [{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "skl-skirmish{0}", "title": "Skirmish", "subGroup": "Combat Skill", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "formula": "Attribute_PRC", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "skl-skirmish_rank"],
				"formulaCalculations": [{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "skl-sneak{0}", "title": "Sneak", "subGroup": "Athletics Skill", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "formula": "Attribute_PRC", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "skl-sneak_rank"],
				"formulaCalculations": [{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "group": "Skill", "description": "", "variable": "skl-survival{0}", "title": "Survival", "subGroup": "Sensing Skill", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "formula": "Attribute_BOD", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "skl-survival_rank"],
				"formulaCalculations": [{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "skl-throw{0}", "title": "Throw", "subGroup": "Manipulate Skill", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "formula": "Attribute_PRC", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "skl-throw_rank"],
				"formulaCalculations": [{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "skl-tinker{0}", "title": "Tinker", "subGroup": "Manipulate Skill", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "formula": "Attribute_PRC", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-prc", "skl-tinker_rank"],
				"formulaCalculations": [{ "modName": "atr-prc", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "skl-traversal{0}", "title": "Traversal", "subGroup": "Athletics Skill", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "formula": "Attribute_BOD", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["atr-bod", "skl-traversal_rank"],
				"formulaCalculations": [{ "modName": "atr-bod", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Language_Minere": {
				"name": "Language_Minere", "fieldName": "minere", "group": "Language", "description": "", "variable": "lng-minere{0}", "title": "Minere", "subGroup": "", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Junal": {
				"name": "Language_Junal", "fieldName": "junal", "group": "Language", "description": "", "variable": "lng-junal{0}", "title": "Junal", "subGroup": "", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Apollen": {
				"name": "Language_Apollen", "fieldName": "apollen", "group": "Language", "description": "", "variable": "lng-apollen{0}", "title": "Apollen", "subGroup": "", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Lib": {
				"name": "Language_Lib", "fieldName": "lib", "group": "Language", "description": "", "variable": "lng-lib{0}", "title": "Lib", "subGroup": "", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Cert": {
				"name": "Language_Cert", "fieldName": "cert", "group": "Language", "description": "", "variable": "lng-cert{0}", "title": "Cert", "subGroup": "", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Byric": {
				"name": "Language_Byric", "fieldName": "byric", "group": "Language", "description": "", "variable": "lng-byric{0}", "title": "Byric", "subGroup": "", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Dustell": {
				"name": "Language_Dustell", "fieldName": "dustell", "group": "Language", "description": "", "variable": "lng-dustell{0}", "title": "Dustell", "subGroup": "", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Muralic": {
				"name": "Language_Muralic", "fieldName": "muralic", "group": "Language", "description": "", "variable": "lng-muralic{0}", "title": "Muralic", "subGroup": "", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shira": {
				"name": "Language_Shira", "fieldName": "shira", "group": "Language", "description": "", "variable": "lng-shira{0}", "title": "Shira", "subGroup": "", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Ciel": {
				"name": "Language_Ciel", "fieldName": "ciel", "group": "Language", "description": "", "variable": "lng-ciel{0}", "title": "Ciel", "subGroup": "", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Citeq": {
				"name": "Language_Citeq", "fieldName": "citeq", "group": "Language", "description": "", "variable": "lng-citeq{0}", "title": "Citeq", "subGroup": "", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Manstan": {
				"name": "Language_Manstan", "fieldName": "manstan", "group": "Language", "description": "", "variable": "lng-manstan{0}", "title": "Manstan", "subGroup": "", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Salkan": {
				"name": "Language_Salkan", "fieldName": "salkan", "group": "Language", "description": "", "variable": "lng-salkan{0}", "title": "Salkan", "subGroup": "", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Sansic": {
				"name": "Language_Sansic", "fieldName": "sansic", "group": "Language", "description": "", "variable": "lng-sansic{0}", "title": "Sansic", "subGroup": "", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Silq": {
				"name": "Language_Silq", "fieldName": "silq", "group": "Language", "description": "", "variable": "lng-silq{0}", "title": "Silq", "subGroup": "", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Kleikan": {
				"name": "Language_Kleikan", "fieldName": "kleikan", "group": "Language", "description": "", "variable": "lng-kleikan{0}", "title": "Kleikan", "subGroup": "", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Crinere": {
				"name": "Language_Crinere", "fieldName": "crinere", "group": "Language", "description": "", "variable": "lng-crinere{0}", "title": "Crinere", "subGroup": "", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Palmic": {
				"name": "Language_Palmic", "fieldName": "palmic", "group": "Language", "description": "", "variable": "lng-palmic{0}", "title": "Palmic", "subGroup": "", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Shorespeak": {
				"name": "Language_Shorespeak", "fieldName": "shorespeak", "group": "Language", "description": "", "variable": "lng-shorespeak{0}", "title": "Shorespeak", "subGroup": "", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Verdeni": {
				"name": "Language_Verdeni", "fieldName": "verdeni", "group": "Language", "description": "", "variable": "lng-verdeni{0}", "title": "Verdeni", "subGroup": "", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Vulca": {
				"name": "Language_Vulca", "fieldName": "vulca", "group": "Language", "description": "", "variable": "lng-vulca{0}", "title": "Vulca", "subGroup": "", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Emotion": {
				"name": "Language_Emotion", "fieldName": "emotion", "group": "Language", "description": "", "variable": "lng-emotion{0}", "title": "Emotion", "subGroup": "", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Empathy": {
				"name": "Language_Empathy", "fieldName": "empathy", "group": "Language", "description": "", "variable": "lng-empathy{0}", "title": "Empathy", "subGroup": "", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Wolfwarg": {
				"name": "Language_Wolfwarg", "fieldName": "wolfwarg", "group": "Language", "description": "", "variable": "lng-wolfwarg{0}", "title": "Wolfwarg", "subGroup": "", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Jovean": {
				"name": "Language_Jovean", "fieldName": "jovean", "group": "Language", "description": "", "variable": "lng-jovean{0}", "title": "Jovean", "subGroup": "", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Language_Mytikan": {
				"name": "Language_Mytikan", "fieldName": "mytikan", "group": "Language", "description": "", "variable": "lng-mytikan{0}", "title": "Mytikan", "subGroup": "", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"LoreCategory_Academics": {
				"name": "LoreCategory_Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "lrc-academics{0}", "title": "Academics", "subGroup": "Academics", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-academics_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "lor-health{0}", "title": "Health", "subGroup": "Academics", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-health_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "lor-mana{0}", "title": "Mana", "subGroup": "Academics", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-mana_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "lor-mathematics{0}", "title": "Mathematics", "subGroup": "Academics", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-mathematics_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "lor-nature{0}", "title": "Nature", "subGroup": "Academics", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-nature_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "lor-school{0}", "title": "School", "subGroup": "Academics", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-school_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "lor-spirit{0}", "title": "Spirit", "subGroup": "Academics", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-spirit_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "lor-warfare{0}", "title": "Warfare", "subGroup": "Academics", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-warfare_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "lor-zoology{0}", "title": "Zoology", "subGroup": "Academics", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-zoology_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_Profession": {
				"name": "LoreCategory_Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "lrc-profession{0}", "title": "Profession", "subGroup": "Profession", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-profession_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "lor-farming{0}", "title": "Farming", "subGroup": "Profession", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-farming_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "lor-fishing{0}", "title": "Fishing", "subGroup": "Profession", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-fishing_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "lor-hunting{0}", "title": "Hunting", "subGroup": "Profession", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-hunting_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "lor-legal{0}", "title": "Legal", "subGroup": "Profession", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-legal_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "lor-mercantile{0}", "title": "Mercantile", "subGroup": "Profession", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-mercantile_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "lor-mining{0}", "title": "Mining", "subGroup": "Profession", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-mining_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_Craftmanship": {
				"name": "LoreCategory_Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "lrc-craftmanship{0}", "title": "Craftmanship", "subGroup": "Craftmanship", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-craftmanship_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "lor-alchemy{0}", "title": "Alchemy", "subGroup": "Craftmanship", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-alchemy_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "lor-architecture{0}", "title": "Architecture", "subGroup": "Craftmanship", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-architecture_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "lor-brewing{0}", "title": "Brewing", "subGroup": "Craftmanship", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-brewing_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "lor-cooking{0}", "title": "Cooking", "subGroup": "Craftmanship", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-cooking_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "lor-engineering{0}", "title": "Engineering", "subGroup": "Craftmanship", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-engineering_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "lor-glassblowing{0}", "title": "Glassblowing", "subGroup": "Craftmanship", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-glassblowing_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "lor-leatherworking{0}", "title": "Leatherworking", "subGroup": "Craftmanship", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-leatherworking_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "lor-sculpting{0}", "title": "Sculpting", "subGroup": "Craftmanship", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-sculpting_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "lor-smithing{0}", "title": "Smithing", "subGroup": "Craftmanship", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-smithing_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "lor-weaving{0}", "title": "Weaving", "subGroup": "Craftmanship", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-weaving_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_Geography": {
				"name": "LoreCategory_Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "lrc-geography{0}", "title": "Geography", "subGroup": "Geography", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-geography_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "lor-aridsha{0}", "title": "Aridsha", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-aridsha_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "lor-ceres{0}", "title": "Ceres", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-ceres_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "lor-colswei{0}", "title": "Colswei", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-colswei_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "lor-khem{0}", "title": "Khem", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-khem_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "lor-novus{0}", "title": "Novus", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-novus_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "lor-walthair{0}", "title": "Walthair", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-walthair_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "lor-wayling{0}", "title": "Wayling", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-wayling_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "ethereal_plane", "group": "Lore", "description": "", "variable": "lor-ethereal_plane{0}", "title": "Ethereal Plane", "subGroup": "Geography", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-ethereal_plane_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_History": {
				"name": "LoreCategory_History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "lrc-history{0}", "title": "History", "subGroup": "History", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridsha_history", "group": "Lore", "description": "", "variable": "lor-aridsha_history{0}", "title": "Aridsha History", "subGroup": "History", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-aridsha_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceres_history", "group": "Lore", "description": "", "variable": "lor-ceres_history{0}", "title": "Ceres History", "subGroup": "History", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-ceres_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colswei_history", "group": "Lore", "description": "", "variable": "lor-colswei_history{0}", "title": "Colswei History", "subGroup": "History", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-colswei_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khem_history", "group": "Lore", "description": "", "variable": "lor-khem_history{0}", "title": "Khem History", "subGroup": "History", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-khem_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novus_history", "group": "Lore", "description": "", "variable": "lor-novus_history{0}", "title": "Novus History", "subGroup": "History", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-novus_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthair_history", "group": "Lore", "description": "", "variable": "lor-walthair_history{0}", "title": "Walthair History", "subGroup": "History", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-walthair_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "wayling_history", "group": "Lore", "description": "", "variable": "lor-wayling_history{0}", "title": "Wayling History", "subGroup": "History", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-wayling_history_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_Culture": {
				"name": "LoreCategory_Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "lrc-culture{0}", "title": "Culture", "subGroup": "Culture", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-culture_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "lor-art{0}", "title": "Art", "subGroup": "Culture", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-art_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "lor-etiquette{0}", "title": "Etiquette", "subGroup": "Culture", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-etiquette_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "lor-fashion{0}", "title": "Fashion", "subGroup": "Culture", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-fashion_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "lor-games{0}", "title": "Games", "subGroup": "Culture", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-games_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "lor-music{0}", "title": "Music", "subGroup": "Culture", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-music_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "lor-scribing{0}", "title": "Scribing", "subGroup": "Culture", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-scribing_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "lor-theater{0}", "title": "Theater", "subGroup": "Culture", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-theater_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"LoreCategory_Religion": {
				"name": "LoreCategory_Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "lrc-religion{0}", "title": "Religion", "subGroup": "Religion", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lrc-religion_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "church_of_kongkwei", "group": "Lore", "description": "", "variable": "lor-church_of_kongkwei{0}", "title": "Church of Kongkwei", "subGroup": "Religion", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-church_of_kongkwei_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "lor-guidance{0}", "title": "Guidance", "subGroup": "Religion", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-guidance_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life's_circle", "group": "Lore", "description": "", "variable": "lor-life's_circle{0}", "title": "Life's Circle", "subGroup": "Religion", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-life's_circle_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "ocean_court", "group": "Lore", "description": "", "variable": "lor-ocean_court{0}", "title": "Ocean Court", "subGroup": "Religion", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-ocean_court_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "lor-sylvan{0}", "title": "Sylvan", "subGroup": "Religion", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-sylvan_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "lor-zushaon{0}", "title": "Zushaon", "subGroup": "Religion", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "formula": "Recall", "modifiers": "_rank", "linkedGroups": [],
				"isResource": "", "modAttrs": ["recall", "lor-zushaon_rank"],
				"formulaCalculations": [{ "modName": "recall", "value": 0, "multiplier": 1 },
				{ "modName": "_rank", "value": 0, "multiplier": 1 }]
			},
			"Job_Trainee": {
				"name": "Job_Trainee", "fieldName": "trainee", "group": "Job", "description": "", "variable": "job-trainee{0}", "title": "Trainee", "subGroup": "", "descriptions": ["The trainee is representative of your character learning a skill. It delivers fewer growths at level up and no job techniques. Instead, every level grants points to spend on skills."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "interceptor", "group": "Job", "description": "", "variable": "job-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "guardian", "group": "Job", "description": "", "variable": "job-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "spellslinger", "group": "Job", "description": "", "variable": "job-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "warrior", "group": "Job", "description": "", "variable": "job-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "rogue", "group": "Job", "description": "", "variable": "job-rogue{0}", "title": "Rogue", "subGroup": "", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "scholar", "group": "Job", "description": "", "variable": "job-scholar{0}", "title": "Scholar", "subGroup": "", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "physician", "group": "Job", "description": "", "variable": "job-physician{0}", "title": "Physician", "subGroup": "", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "formula": "CR;AdvancementJob", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": ["adv-cr", "adv-ap_job"],
				"formulaCalculations": [{ "modName": "adv-cr", "value": 0, "multiplier": 1 },
				{ "modName": "adv-ap_job", "value": 0, "multiplier": 1 }]
			},
			"Role_Generalist": {
				"name": "Role_Generalist", "fieldName": "generalist", "group": "Role", "description": "", "variable": "rol-generalist{0}", "title": "Generalist", "subGroup": "", "descriptions": ["Very general"],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Defender": {
				"name": "Role_Defender", "fieldName": "defender", "group": "Role", "description": "", "variable": "rol-defender{0}", "title": "Defender", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Athlete": {
				"name": "Role_Athlete", "fieldName": "athlete", "group": "Role", "description": "", "variable": "rol-athlete{0}", "title": "Athlete", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Skirmisher": {
				"name": "Role_Skirmisher", "fieldName": "skirmisher", "group": "Role", "description": "", "variable": "rol-skirmisher{0}", "title": "Skirmisher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Role_Marksman": {
				"name": "Role_Marksman", "fieldName": "marksman", "group": "Role", "description": "", "variable": "rol-marksman{0}", "title": "Marksman", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": "", "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Break Free": {
				"name": "Technique_Break Free", "fieldName": "break_free", "group": "Technique", "description": "", "variable": "tch-break_free{0}", "title": "Break Free", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dash": {
				"name": "Technique_Dash", "fieldName": "dash", "group": "Technique", "description": "", "variable": "tch-dash{0}", "title": "Dash", "subGroup": "Basic Positioning", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Escape": {
				"name": "Technique_Escape", "fieldName": "escape", "group": "Technique", "description": "", "variable": "tch-escape{0}", "title": "Escape", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grapple": {
				"name": "Technique_Grapple", "fieldName": "grapple", "group": "Technique", "description": "", "variable": "tch-grapple{0}", "title": "Grapple", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hide": {
				"name": "Technique_Hide", "fieldName": "hide", "group": "Technique", "description": "", "variable": "tch-hide{0}", "title": "Hide", "subGroup": "Basic Positioning", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Mount": {
				"name": "Technique_Mount", "fieldName": "mount", "group": "Technique", "description": "", "variable": "tch-mount{0}", "title": "Mount", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prepare": {
				"name": "Technique_Prepare", "fieldName": "prepare", "group": "Technique", "description": "", "variable": "tch-prepare{0}", "title": "Prepare", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Reposition": {
				"name": "Technique_Reposition", "fieldName": "reposition", "group": "Technique", "description": "", "variable": "tch-reposition{0}", "title": "Reposition", "subGroup": "Basic Positioning", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Seach": {
				"name": "Technique_Seach", "fieldName": "seach", "group": "Technique", "description": "", "variable": "tch-seach{0}", "title": "Seach", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aid": {
				"name": "Technique_Aid", "fieldName": "aid", "group": "Technique", "description": "", "variable": "tch-aid{0}", "title": "Aid", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stabilize": {
				"name": "Technique_Stabilize", "fieldName": "stabilize", "group": "Technique", "description": "", "variable": "tch-stabilize{0}", "title": "Stabilize", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skill Check": {
				"name": "Technique_Skill Check", "fieldName": "skill_check", "group": "Technique", "description": "", "variable": "tch-skill_check{0}", "title": "Skill Check", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Unarmed Strike": {
				"name": "Technique_Unarmed Strike", "fieldName": "unarmed_strike", "group": "Technique", "description": "", "variable": "tch-unarmed_strike{0}", "title": "Unarmed Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Encourage": {
				"name": "Technique_Encourage", "fieldName": "encourage", "group": "Technique", "description": "", "variable": "tch-encourage{0}", "title": "Encourage", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Rapport": {
				"name": "Technique_Build Rapport", "fieldName": "build_rapport", "group": "Technique", "description": "", "variable": "tch-build_rapport{0}", "title": "Build Rapport", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Build Pressure": {
				"name": "Technique_Build Pressure", "fieldName": "build_pressure", "group": "Technique", "description": "", "variable": "tch-build_pressure{0}", "title": "Build Pressure", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Captivate": {
				"name": "Technique_Captivate", "fieldName": "captivate", "group": "Technique", "description": "", "variable": "tch-captivate{0}", "title": "Captivate", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demand": {
				"name": "Technique_Demand", "fieldName": "demand", "group": "Technique", "description": "", "variable": "tch-demand{0}", "title": "Demand", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Grab an Edge": {
				"name": "Technique_Grab an Edge", "fieldName": "grab_an_edge", "group": "Technique", "description": "", "variable": "tch-grab_an_edge{0}", "title": "Grab an Edge", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Interact": {
				"name": "Technique_Interact", "fieldName": "interact", "group": "Technique", "description": "", "variable": "tch-interact{0}", "title": "Interact", "subGroup": "Basic Set", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Wind": {
				"name": "Technique_Second Wind", "fieldName": "second_wind", "group": "Technique", "description": "", "variable": "tch-second_wind{0}", "title": "Second Wind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Second Breath": {
				"name": "Technique_Second Breath", "fieldName": "second_breath", "group": "Technique", "description": "", "variable": "tch-second_breath{0}", "title": "Second Breath", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undaunted": {
				"name": "Technique_Undaunted", "fieldName": "undaunted", "group": "Technique", "description": "", "variable": "tch-undaunted{0}", "title": "Undaunted", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Strike": {
				"name": "Technique_Preemptive Strike", "fieldName": "preemptive_strike", "group": "Technique", "description": "", "variable": "tch-preemptive_strike{0}", "title": "Preemptive Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Preemptive Stagger": {
				"name": "Technique_Preemptive Stagger", "fieldName": "preemptive_stagger", "group": "Technique", "description": "", "variable": "tch-preemptive_stagger{0}", "title": "Preemptive Stagger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Critical Maim": {
				"name": "Technique_Critical Maim", "fieldName": "critical_maim", "group": "Technique", "description": "", "variable": "tch-critical_maim{0}", "title": "Critical Maim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellshot": {
				"name": "Technique_Spellshot", "fieldName": "spellshot", "group": "Technique", "description": "", "variable": "tch-spellshot{0}", "title": "Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Follow-Up Spellshot": {
				"name": "Technique_Follow-Up Spellshot", "fieldName": "follow-up_spellshot", "group": "Technique", "description": "", "variable": "tch-follow-up_spellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bursting Spellshot": {
				"name": "Technique_Bursting Spellshot", "fieldName": "bursting_spellshot", "group": "Technique", "description": "", "variable": "tch-bursting_spellshot{0}", "title": "Bursting Spellshot", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior": {
				"name": "Technique_Savior", "fieldName": "savior", "group": "Technique", "description": "", "variable": "tch-savior{0}", "title": "Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knock Away Savior": {
				"name": "Technique_Knock Away Savior", "fieldName": "knock_away_savior", "group": "Technique", "description": "", "variable": "tch-knock_away_savior{0}", "title": "Knock Away Savior", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Savior's Retaliation": {
				"name": "Technique_Savior's Retaliation", "fieldName": "savior's_retaliation", "group": "Technique", "description": "", "variable": "tch-savior's_retaliation{0}", "title": "Savior's Retaliation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spellstrike": {
				"name": "Technique_Spellstrike", "fieldName": "spellstrike", "group": "Technique", "description": "", "variable": "tch-spellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Skirmish": {
				"name": "Technique_Power Skirmish", "fieldName": "power_skirmish", "group": "Technique", "description": "", "variable": "tch-power_skirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneak Attack": {
				"name": "Technique_Sneak Attack", "fieldName": "sneak_attack", "group": "Technique", "description": "", "variable": "tch-sneak_attack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sneaky Follow-Up": {
				"name": "Technique_Sneaky Follow-Up", "fieldName": "sneaky_follow-up", "group": "Technique", "description": "", "variable": "tch-sneaky_follow-up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Assassinate": {
				"name": "Technique_Assassinate", "fieldName": "assassinate", "group": "Technique", "description": "", "variable": "tch-assassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Emergency Care": {
				"name": "Technique_Emergency Care", "fieldName": "emergency_care", "group": "Technique", "description": "", "variable": "tch-emergency_care{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightingale": {
				"name": "Technique_Nightingale", "fieldName": "nightingale", "group": "Technique", "description": "", "variable": "tch-nightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Rhapsody": {
				"name": "Technique_Rhapsody", "fieldName": "rhapsody", "group": "Technique", "description": "", "variable": "tch-rhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Metamagic": {
				"name": "Technique_Metamagic", "fieldName": "metamagic", "group": "Technique", "description": "", "variable": "tch-metamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Strategize": {
				"name": "Technique_Strategize", "fieldName": "strategize", "group": "Technique", "description": "", "variable": "tch-strategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Foresight": {
				"name": "Technique_Foresight", "fieldName": "foresight", "group": "Technique", "description": "", "variable": "tch-foresight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Saw That Coming": {
				"name": "Technique_Saw That Coming", "fieldName": "saw_that_coming", "group": "Technique", "description": "", "variable": "tch-saw_that_coming{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_As You May Recall": {
				"name": "Technique_As You May Recall", "fieldName": "as_you_may_recall", "group": "Technique", "description": "", "variable": "tch-as_you_may_recall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Generalist": {
				"name": "Technique_Generalist", "fieldName": "generalist", "group": "Technique", "description": "", "variable": "tch-generalist{0}", "title": "Generalist", "subGroup": "Generalist", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender": {
				"name": "Technique_Defender", "fieldName": "defender", "group": "Technique", "description": "", "variable": "tch-defender{0}", "title": "Defender", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender II": {
				"name": "Technique_Defender II", "fieldName": "defender_ii", "group": "Technique", "description": "", "variable": "tch-defender_ii{0}", "title": "Defender II", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Will": {
				"name": "Technique_Defender's Will", "fieldName": "defender's_will", "group": "Technique", "description": "", "variable": "tch-defender's_will{0}", "title": "Defender's Will", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Taunt": {
				"name": "Technique_Defender's Taunt", "fieldName": "defender's_taunt", "group": "Technique", "description": "", "variable": "tch-defender's_taunt{0}", "title": "Defender's Taunt", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Defender's Recovery": {
				"name": "Technique_Defender's Recovery", "fieldName": "defender's_recovery", "group": "Technique", "description": "", "variable": "tch-defender's_recovery{0}", "title": "Defender's Recovery", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher": {
				"name": "Technique_Skirmisher", "fieldName": "skirmisher", "group": "Technique", "description": "", "variable": "tch-skirmisher{0}", "title": "Skirmisher", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher II": {
				"name": "Technique_Skirmisher II", "fieldName": "skirmisher_ii", "group": "Technique", "description": "", "variable": "tch-skirmisher_ii{0}", "title": "Skirmisher II", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Step": {
				"name": "Technique_Skirmisher's Step", "fieldName": "skirmisher's_step", "group": "Technique", "description": "", "variable": "tch-skirmisher's_step{0}", "title": "Skirmisher's Step", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skirmisher's Strike": {
				"name": "Technique_Skirmisher's Strike", "fieldName": "skirmisher's_strike", "group": "Technique", "description": "", "variable": "tch-skirmisher's_strike{0}", "title": "Skirmisher's Strike", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman": {
				"name": "Technique_Marksman", "fieldName": "marksman", "group": "Technique", "description": "", "variable": "tch-marksman{0}", "title": "Marksman", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman II": {
				"name": "Technique_Marksman II", "fieldName": "marksman_ii", "group": "Technique", "description": "", "variable": "tch-marksman_ii{0}", "title": "Marksman II", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Longshot": {
				"name": "Technique_Marksman's Longshot", "fieldName": "marksman's_longshot", "group": "Technique", "description": "", "variable": "tch-marksman's_longshot{0}", "title": "Marksman's Longshot", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Sight": {
				"name": "Technique_Marksman's Sight", "fieldName": "marksman's_sight", "group": "Technique", "description": "", "variable": "tch-marksman's_sight{0}", "title": "Marksman's Sight", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Marksman's Strike": {
				"name": "Technique_Marksman's Strike", "fieldName": "marksman's_strike", "group": "Technique", "description": "", "variable": "tch-marksman's_strike{0}", "title": "Marksman's Strike", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete": {
				"name": "Technique_Athlete", "fieldName": "athlete", "group": "Technique", "description": "", "variable": "tch-athlete{0}", "title": "Athlete", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete II": {
				"name": "Technique_Athlete II", "fieldName": "athlete_ii", "group": "Technique", "description": "", "variable": "tch-athlete_ii{0}", "title": "Athlete II", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Sprint": {
				"name": "Technique_Athlete's Sprint", "fieldName": "athlete's_sprint", "group": "Technique", "description": "", "variable": "tch-athlete's_sprint{0}", "title": "Athlete's Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Athlete's Reach": {
				"name": "Technique_Athlete's Reach", "fieldName": "athlete's_reach", "group": "Technique", "description": "", "variable": "tch-athlete's_reach{0}", "title": "Athlete's Reach", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bounding Sprint": {
				"name": "Technique_Bounding Sprint", "fieldName": "bounding_sprint", "group": "Technique", "description": "", "variable": "tch-bounding_sprint{0}", "title": "Bounding Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Away": {
				"name": "Technique_Skulk Away", "fieldName": "skulk_away", "group": "Technique", "description": "", "variable": "tch-skulk_away{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Skulk Then Hide": {
				"name": "Technique_Skulk Then Hide", "fieldName": "skulk_then_hide", "group": "Technique", "description": "", "variable": "tch-skulk_then_hide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_First Aid": {
				"name": "Technique_First Aid", "fieldName": "first_aid", "group": "Technique", "description": "", "variable": "tch-first_aid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleansing Aid": {
				"name": "Technique_Cleansing Aid", "fieldName": "cleansing_aid", "group": "Technique", "description": "", "variable": "tch-cleansing_aid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Environmental Awareness": {
				"name": "Technique_Environmental Awareness", "fieldName": "environmental_awareness", "group": "Technique", "description": "", "variable": "tch-environmental_awareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Eclectic Knowledge": {
				"name": "Technique_Eclectic Knowledge", "fieldName": "eclectic_knowledge", "group": "Technique", "description": "", "variable": "tch-eclectic_knowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Point of Clarity": {
				"name": "Technique_Point of Clarity", "fieldName": "point_of_clarity", "group": "Technique", "description": "", "variable": "tch-point_of_clarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pole Vault": {
				"name": "Technique_Pole Vault", "fieldName": "pole_vault", "group": "Technique", "description": "", "variable": "tch-pole_vault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Draw": {
				"name": "Technique_Quick Draw", "fieldName": "quick_draw", "group": "Technique", "description": "", "variable": "tch-quick_draw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike": {
				"name": "Technique_Extension Strike", "fieldName": "extension_strike", "group": "Technique", "description": "", "variable": "tch-extension_strike{0}", "title": "Extension Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Step Extension": {
				"name": "Technique_Step Extension", "fieldName": "step_extension", "group": "Technique", "description": "", "variable": "tch-step_extension{0}", "title": "Step Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Extension": {
				"name": "Technique_Lasting Extension", "fieldName": "lasting_extension", "group": "Technique", "description": "", "variable": "tch-lasting_extension{0}", "title": "Lasting Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Far Strike": {
				"name": "Technique_Far Strike", "fieldName": "far_strike", "group": "Technique", "description": "", "variable": "tch-far_strike{0}", "title": "Far Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extension Strike +": {
				"name": "Technique_Extension Strike +", "fieldName": "extension_strike_+", "group": "Technique", "description": "", "variable": "tch-extension_strike_+{0}", "title": "Extension Strike +", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash": {
				"name": "Technique_Quick Slash", "fieldName": "quick_slash", "group": "Technique", "description": "", "variable": "tch-quick_slash{0}", "title": "Quick Slash", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "formula": false, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Precision Blade": {
				"name": "Technique_Precision Blade", "fieldName": "precision_blade", "group": "Technique", "description": "", "variable": "tch-precision_blade{0}", "title": "Precision Blade", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "formula": false, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Armor Piercer": {
				"name": "Technique_Armor Piercer", "fieldName": "armor_piercer", "group": "Technique", "description": "", "variable": "tch-armor_piercer{0}", "title": "Armor Piercer", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "formula": false, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Slash II": {
				"name": "Technique_Quick Slash II", "fieldName": "quick_slash_ii", "group": "Technique", "description": "", "variable": "tch-quick_slash_ii{0}", "title": "Quick Slash II", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "formula": false, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave": {
				"name": "Technique_Cleave", "fieldName": "cleave", "group": "Technique", "description": "", "variable": "tch-cleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crushing Blade": {
				"name": "Technique_Crushing Blade", "fieldName": "crushing_blade", "group": "Technique", "description": "", "variable": "tch-crushing_blade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave": {
				"name": "Technique_Great Cleave", "fieldName": "great_cleave", "group": "Technique", "description": "", "variable": "tch-great_cleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cleave +": {
				"name": "Technique_Cleave +", "fieldName": "cleave_+", "group": "Technique", "description": "", "variable": "tch-cleave_+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sudden Cleave": {
				"name": "Technique_Sudden Cleave", "fieldName": "sudden_cleave", "group": "Technique", "description": "", "variable": "tch-sudden_cleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Cleave II": {
				"name": "Technique_Great Cleave II", "fieldName": "great_cleave_ii", "group": "Technique", "description": "", "variable": "tch-great_cleave_ii{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Flex": {
				"name": "Technique_Power Flex", "fieldName": "power_flex", "group": "Technique", "description": "", "variable": "tch-power_flex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Crush Knuckle": {
				"name": "Technique_Crush Knuckle", "fieldName": "crush_knuckle", "group": "Technique", "description": "", "variable": "tch-crush_knuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_": {
				"name": "Technique_", "fieldName": "", "group": "Technique", "description": "", "variable": "tch-{0}", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": false, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knuckle Flurry": {
				"name": "Technique_Knuckle Flurry", "fieldName": "knuckle_flurry", "group": "Technique", "description": "", "variable": "tch-knuckle_flurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Water Blast": {
				"name": "Technique_Water Blast", "fieldName": "water_blast", "group": "Technique", "description": "", "variable": "tch-water_blast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser": {
				"name": "Technique_Geyser", "fieldName": "geyser", "group": "Technique", "description": "", "variable": "tch-geyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Geyser Line": {
				"name": "Technique_Geyser Line", "fieldName": "geyser_line", "group": "Technique", "description": "", "variable": "tch-geyser_line{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surf": {
				"name": "Technique_Surf", "fieldName": "surf", "group": "Technique", "description": "", "variable": "tch-surf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Geyser Line": {
				"name": "Technique_Great Geyser Line", "fieldName": "great_geyser_line", "group": "Technique", "description": "", "variable": "tch-great_geyser_line{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tidal Wave": {
				"name": "Technique_Tidal Wave", "fieldName": "tidal_wave", "group": "Technique", "description": "", "variable": "tch-tidal_wave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Surge": {
				"name": "Technique_Sand Surge", "fieldName": "sand_surge", "group": "Technique", "description": "", "variable": "tch-sand_surge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Spout": {
				"name": "Technique_Sand Spout", "fieldName": "sand_spout", "group": "Technique", "description": "", "variable": "tch-sand_spout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Wave": {
				"name": "Technique_Sand Wave", "fieldName": "sand_wave", "group": "Technique", "description": "", "variable": "tch-sand_wave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sand Launcher": {
				"name": "Technique_Sand Launcher", "fieldName": "sand_launcher", "group": "Technique", "description": "", "variable": "tch-sand_launcher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sicken": {
				"name": "Technique_Sicken", "fieldName": "sicken", "group": "Technique", "description": "", "variable": "tch-sicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spores": {
				"name": "Technique_Spores", "fieldName": "spores", "group": "Technique", "description": "", "variable": "tch-spores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sickening Cloud": {
				"name": "Technique_Sickening Cloud", "fieldName": "sickening_cloud", "group": "Technique", "description": "", "variable": "tch-sickening_cloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Virulent Spores": {
				"name": "Technique_Virulent Spores", "fieldName": "virulent_spores", "group": "Technique", "description": "", "variable": "tch-virulent_spores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Firebolt": {
				"name": "Technique_Firebolt", "fieldName": "firebolt", "group": "Technique", "description": "", "variable": "tch-firebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flame Arrow": {
				"name": "Technique_Flame Arrow", "fieldName": "flame_arrow", "group": "Technique", "description": "", "variable": "tch-flame_arrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireball": {
				"name": "Technique_Fireball", "fieldName": "fireball", "group": "Technique", "description": "", "variable": "tch-fireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fireblast": {
				"name": "Technique_Fireblast", "fieldName": "fireblast", "group": "Technique", "description": "", "variable": "tch-fireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ragnarok": {
				"name": "Technique_Ragnarok", "fieldName": "ragnarok", "group": "Technique", "description": "", "variable": "tch-ragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Bonfire": {
				"name": "Technique_Bonfire", "fieldName": "bonfire", "group": "Technique", "description": "", "variable": "tch-bonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wall of Fire": {
				"name": "Technique_Wall of Fire", "fieldName": "wall_of_fire", "group": "Technique", "description": "", "variable": "tch-wall_of_fire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field of Flame": {
				"name": "Technique_Field of Flame", "fieldName": "field_of_flame", "group": "Technique", "description": "", "variable": "tch-field_of_flame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Shaft": {
				"name": "Technique_Lightning Shaft", "fieldName": "lightning_shaft", "group": "Technique", "description": "", "variable": "tch-lightning_shaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shock": {
				"name": "Technique_Shock", "fieldName": "shock", "group": "Technique", "description": "", "variable": "tch-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lightning Bolt": {
				"name": "Technique_Lightning Bolt", "fieldName": "lightning_bolt", "group": "Technique", "description": "", "variable": "tch-lightning_bolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Plasma Arc": {
				"name": "Technique_Plasma Arc", "fieldName": "plasma_arc", "group": "Technique", "description": "", "variable": "tch-plasma_arc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fulgor": {
				"name": "Technique_Fulgor", "fieldName": "fulgor", "group": "Technique", "description": "", "variable": "tch-fulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Snap": {
				"name": "Technique_Cold Snap", "fieldName": "cold_snap", "group": "Technique", "description": "", "variable": "tch-cold_snap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Frostbite": {
				"name": "Technique_Frostbite", "fieldName": "frostbite", "group": "Technique", "description": "", "variable": "tch-frostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezebind": {
				"name": "Technique_Freezebind", "fieldName": "freezebind", "group": "Technique", "description": "", "variable": "tch-freezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Burst": {
				"name": "Technique_Cold Burst", "fieldName": "cold_burst", "group": "Technique", "description": "", "variable": "tch-cold_burst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Front": {
				"name": "Technique_Cold Front", "fieldName": "cold_front", "group": "Technique", "description": "", "variable": "tch-cold_front{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Diamond Dust": {
				"name": "Technique_Diamond Dust", "fieldName": "diamond_dust", "group": "Technique", "description": "", "variable": "tch-diamond_dust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Bullet": {
				"name": "Technique_Wind Bullet", "fieldName": "wind_bullet", "group": "Technique", "description": "", "variable": "tch-wind_bullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gust": {
				"name": "Technique_Gust", "fieldName": "gust", "group": "Technique", "description": "", "variable": "tch-gust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Windsweep": {
				"name": "Technique_Windsweep", "fieldName": "windsweep", "group": "Technique", "description": "", "variable": "tch-windsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gale": {
				"name": "Technique_Gale", "fieldName": "gale", "group": "Technique", "description": "", "variable": "tch-gale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Darkness": {
				"name": "Technique_Darkness", "fieldName": "darkness", "group": "Technique", "description": "", "variable": "tch-darkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Wall": {
				"name": "Technique_Shadow Wall", "fieldName": "shadow_wall", "group": "Technique", "description": "", "variable": "tch-shadow_wall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Nightfall": {
				"name": "Technique_Nightfall", "fieldName": "nightfall", "group": "Technique", "description": "", "variable": "tch-nightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fog Cloud": {
				"name": "Technique_Fog Cloud", "fieldName": "fog_cloud", "group": "Technique", "description": "", "variable": "tch-fog_cloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sleet": {
				"name": "Technique_Sleet", "fieldName": "sleet", "group": "Technique", "description": "", "variable": "tch-sleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Freezing Sleet": {
				"name": "Technique_Freezing Sleet", "fieldName": "freezing_sleet", "group": "Technique", "description": "", "variable": "tch-freezing_sleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hail": {
				"name": "Technique_Hail", "fieldName": "hail", "group": "Technique", "description": "", "variable": "tch-hail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Binding Sleet": {
				"name": "Technique_Binding Sleet", "fieldName": "binding_sleet", "group": "Technique", "description": "", "variable": "tch-binding_sleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ice Storm": {
				"name": "Technique_Ice Storm", "fieldName": "ice_storm", "group": "Technique", "description": "", "variable": "tch-ice_storm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fimbulwinter": {
				"name": "Technique_Fimbulwinter", "fieldName": "fimbulwinter", "group": "Technique", "description": "", "variable": "tch-fimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Smoke Cloud": {
				"name": "Technique_Smoke Cloud", "fieldName": "smoke_cloud", "group": "Technique", "description": "", "variable": "tch-smoke_cloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burning Smoke": {
				"name": "Technique_Burning Smoke", "fieldName": "burning_smoke", "group": "Technique", "description": "", "variable": "tch-burning_smoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Choking Smoke": {
				"name": "Technique_Choking Smoke", "fieldName": "choking_smoke", "group": "Technique", "description": "", "variable": "tch-choking_smoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Acceleration": {
				"name": "Technique_Acceleration", "fieldName": "acceleration", "group": "Technique", "description": "", "variable": "tch-acceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Power Vault": {
				"name": "Technique_Power Vault", "fieldName": "power_vault", "group": "Technique", "description": "", "variable": "tch-power_vault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Expeditious": {
				"name": "Technique_Expeditious", "fieldName": "expeditious", "group": "Technique", "description": "", "variable": "tch-expeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Climb": {
				"name": "Technique_Quick Climb", "fieldName": "quick_climb", "group": "Technique", "description": "", "variable": "tch-quick_climb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quick Swim": {
				"name": "Technique_Quick Swim", "fieldName": "quick_swim", "group": "Technique", "description": "", "variable": "tch-quick_swim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Poise": {
				"name": "Technique_Poise", "fieldName": "poise", "group": "Technique", "description": "", "variable": "tch-poise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cat Fall": {
				"name": "Technique_Cat Fall", "fieldName": "cat_fall", "group": "Technique", "description": "", "variable": "tch-cat_fall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kip Up": {
				"name": "Technique_Kip Up", "fieldName": "kip_up", "group": "Technique", "description": "", "variable": "tch-kip_up{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Silent Stride": {
				"name": "Technique_Silent Stride", "fieldName": "silent_stride", "group": "Technique", "description": "", "variable": "tch-silent_stride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shove": {
				"name": "Technique_Shove", "fieldName": "shove", "group": "Technique", "description": "", "variable": "tch-shove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knockdown": {
				"name": "Technique_Knockdown", "fieldName": "knockdown", "group": "Technique", "description": "", "variable": "tch-knockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tumble": {
				"name": "Technique_Tumble", "fieldName": "tumble", "group": "Technique", "description": "", "variable": "tch-tumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Field Medic": {
				"name": "Technique_Field Medic", "fieldName": "field_medic", "group": "Technique", "description": "", "variable": "tch-field_medic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Camoflauge": {
				"name": "Technique_Camoflauge", "fieldName": "camoflauge", "group": "Technique", "description": "", "variable": "tch-camoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Blurred Light": {
				"name": "Technique_Blurred Light", "fieldName": "blurred_light", "group": "Technique", "description": "", "variable": "tch-blurred_light{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light Refraction": {
				"name": "Technique_Light Refraction", "fieldName": "light_refraction", "group": "Technique", "description": "", "variable": "tch-light_refraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Steps": {
				"name": "Technique_Shadow Steps", "fieldName": "shadow_steps", "group": "Technique", "description": "", "variable": "tch-shadow_steps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shadow Walker": {
				"name": "Technique_Shadow Walker", "fieldName": "shadow_walker", "group": "Technique", "description": "", "variable": "tch-shadow_walker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Step": {
				"name": "Technique_Wind Step", "fieldName": "wind_step", "group": "Technique", "description": "", "variable": "tch-wind_step{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Updraft": {
				"name": "Technique_Updraft", "fieldName": "updraft", "group": "Technique", "description": "", "variable": "tch-updraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Clouded Updraft": {
				"name": "Technique_Clouded Updraft", "fieldName": "clouded_updraft", "group": "Technique", "description": "", "variable": "tch-clouded_updraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wind Fall": {
				"name": "Technique_Wind Fall", "fieldName": "wind_fall", "group": "Technique", "description": "", "variable": "tch-wind_fall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Walk on Air": {
				"name": "Technique_Walk on Air", "fieldName": "walk_on_air", "group": "Technique", "description": "", "variable": "tch-walk_on_air{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fire Step": {
				"name": "Technique_Fire Step", "fieldName": "fire_step", "group": "Technique", "description": "", "variable": "tch-fire_step{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Liftoff": {
				"name": "Technique_Liftoff", "fieldName": "liftoff", "group": "Technique", "description": "", "variable": "tch-liftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Jet": {
				"name": "Technique_Jet", "fieldName": "jet", "group": "Technique", "description": "", "variable": "tch-jet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cunning Action": {
				"name": "Technique_Cunning Action", "fieldName": "cunning_action", "group": "Technique", "description": "", "variable": "tch-cunning_action{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Demoralize": {
				"name": "Technique_Demoralize", "fieldName": "demoralize", "group": "Technique", "description": "", "variable": "tch-demoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Fascinate": {
				"name": "Technique_Fascinate", "fieldName": "fascinate", "group": "Technique", "description": "", "variable": "tch-fascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Impersonator": {
				"name": "Technique_Impersonator", "fieldName": "impersonator", "group": "Technique", "description": "", "variable": "tch-impersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ether Sense": {
				"name": "Technique_Ether Sense", "fieldName": "ether_sense", "group": "Technique", "description": "", "variable": "tch-ether_sense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Spirit Sense": {
				"name": "Technique_Spirit Sense", "fieldName": "spirit_sense", "group": "Technique", "description": "", "variable": "tch-spirit_sense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Tremorsense": {
				"name": "Technique_Tremorsense", "fieldName": "tremorsense", "group": "Technique", "description": "", "variable": "tch-tremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dustcraft": {
				"name": "Technique_Dustcraft", "fieldName": "dustcraft", "group": "Technique", "description": "", "variable": "tch-dustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shape Material": {
				"name": "Technique_Shape Material", "fieldName": "shape_material", "group": "Technique", "description": "", "variable": "tch-shape_material{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Quickcraft": {
				"name": "Technique_Quickcraft", "fieldName": "quickcraft", "group": "Technique", "description": "", "variable": "tch-quickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Shaping": {
				"name": "Technique_Improved Shaping", "fieldName": "improved_shaping", "group": "Technique", "description": "", "variable": "tch-improved_shaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Shaping": {
				"name": "Technique_Greater Shaping", "fieldName": "greater_shaping", "group": "Technique", "description": "", "variable": "tch-greater_shaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Shaping": {
				"name": "Technique_Legendary Shaping", "fieldName": "legendary_shaping", "group": "Technique", "description": "", "variable": "tch-legendary_shaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Material": {
				"name": "Technique_Dust Material", "fieldName": "dust_material", "group": "Technique", "description": "", "variable": "tch-dust_material{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dust Area": {
				"name": "Technique_Dust Area", "fieldName": "dust_area", "group": "Technique", "description": "", "variable": "tch-dust_area{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Dusting": {
				"name": "Technique_Improved Dusting", "fieldName": "improved_dusting", "group": "Technique", "description": "", "variable": "tch-improved_dusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Greater Dusting": {
				"name": "Technique_Greater Dusting", "fieldName": "greater_dusting", "group": "Technique", "description": "", "variable": "tch-greater_dusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Legendary Dusting": {
				"name": "Technique_Legendary Dusting", "fieldName": "legendary_dusting", "group": "Technique", "description": "", "variable": "tch-legendary_dusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Path": {
				"name": "Technique_Form Path", "fieldName": "form_path", "group": "Technique", "description": "", "variable": "tch-form_path{0}", "title": "Form Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Pillar": {
				"name": "Technique_Form Pillar", "fieldName": "form_pillar", "group": "Technique", "description": "", "variable": "tch-form_pillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stepping Path": {
				"name": "Technique_Stepping Path", "fieldName": "stepping_path", "group": "Technique", "description": "", "variable": "tch-stepping_path{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Form Wall": {
				"name": "Technique_Form Wall", "fieldName": "form_wall", "group": "Technique", "description": "", "variable": "tch-form_wall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Scattered Pillars": {
				"name": "Technique_Scattered Pillars", "fieldName": "scattered_pillars", "group": "Technique", "description": "", "variable": "tch-scattered_pillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Great Wall": {
				"name": "Technique_Great Wall", "fieldName": "great_wall", "group": "Technique", "description": "", "variable": "tch-great_wall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cultivate": {
				"name": "Technique_Cultivate", "fieldName": "cultivate", "group": "Technique", "description": "", "variable": "tch-cultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Entangle": {
				"name": "Technique_Entangle", "fieldName": "entangle", "group": "Technique", "description": "", "variable": "tch-entangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wildwood": {
				"name": "Technique_Wildwood", "fieldName": "wildwood", "group": "Technique", "description": "", "variable": "tch-wildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distortion": {
				"name": "Technique_Distortion", "fieldName": "distortion", "group": "Technique", "description": "", "variable": "tch-distortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Lasting Distortion": {
				"name": "Technique_Lasting Distortion", "fieldName": "lasting_distortion", "group": "Technique", "description": "", "variable": "tch-lasting_distortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heat Field": {
				"name": "Technique_Heat Field", "fieldName": "heat_field", "group": "Technique", "description": "", "variable": "tch-heat_field{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burn Guard": {
				"name": "Technique_Burn Guard", "fieldName": "burn_guard", "group": "Technique", "description": "", "variable": "tch-burn_guard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Cold Field": {
				"name": "Technique_Cold Field", "fieldName": "cold_field", "group": "Technique", "description": "", "variable": "tch-cold_field{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Chill Guard": {
				"name": "Technique_Chill Guard", "fieldName": "chill_guard", "group": "Technique", "description": "", "variable": "tch-chill_guard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinesis": {
				"name": "Technique_Kinesis", "fieldName": "kinesis", "group": "Technique", "description": "", "variable": "tch-kinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Distant Kinesis": {
				"name": "Technique_Distant Kinesis", "fieldName": "distant_kinesis", "group": "Technique", "description": "", "variable": "tch-distant_kinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Strike": {
				"name": "Technique_Kinetic Strike", "fieldName": "kinetic_strike", "group": "Technique", "description": "", "variable": "tch-kinetic_strike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Kinetic Throw": {
				"name": "Technique_Kinetic Throw", "fieldName": "kinetic_throw", "group": "Technique", "description": "", "variable": "tch-kinetic_throw{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Heavy Kinesis": {
				"name": "Technique_Heavy Kinesis", "fieldName": "heavy_kinesis", "group": "Technique", "description": "", "variable": "tch-heavy_kinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Burden": {
				"name": "Technique_Burden", "fieldName": "burden", "group": "Technique", "description": "", "variable": "tch-burden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Pressure": {
				"name": "Technique_Pressure", "fieldName": "pressure", "group": "Technique", "description": "", "variable": "tch-pressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Restrain": {
				"name": "Technique_Restrain", "fieldName": "restrain", "group": "Technique", "description": "", "variable": "tch-restrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Wide Pressure": {
				"name": "Technique_Wide Pressure", "fieldName": "wide_pressure", "group": "Technique", "description": "", "variable": "tch-wide_pressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Prostration": {
				"name": "Technique_Prostration", "fieldName": "prostration", "group": "Technique", "description": "", "variable": "tch-prostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Deep Pressure": {
				"name": "Technique_Deep Pressure", "fieldName": "deep_pressure", "group": "Technique", "description": "", "variable": "tch-deep_pressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Gravity Well": {
				"name": "Technique_Gravity Well", "fieldName": "gravity_well", "group": "Technique", "description": "", "variable": "tch-gravity_well{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Shield Block": {
				"name": "Technique_Shield Block", "fieldName": "shield_block", "group": "Technique", "description": "", "variable": "tch-shield_block{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Glancing Block": {
				"name": "Technique_Glancing Block", "fieldName": "glancing_block", "group": "Technique", "description": "", "variable": "tch-glancing_block{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Aegis": {
				"name": "Technique_Aegis", "fieldName": "aegis", "group": "Technique", "description": "", "variable": "tch-aegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Light": {
				"name": "Technique_Light", "fieldName": "light", "group": "Technique", "description": "", "variable": "tch-light{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Dancing Lights": {
				"name": "Technique_Dancing Lights", "fieldName": "dancing_lights", "group": "Technique", "description": "", "variable": "tch-dancing_lights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Flash": {
				"name": "Technique_Flash", "fieldName": "flash", "group": "Technique", "description": "", "variable": "tch-flash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sunlight": {
				"name": "Technique_Sunlight", "fieldName": "sunlight", "group": "Technique", "description": "", "variable": "tch-sunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release": {
				"name": "Technique_Stress Release", "fieldName": "stress_release", "group": "Technique", "description": "", "variable": "tch-stress_release{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release +": {
				"name": "Technique_Stress Release +", "fieldName": "stress_release_+", "group": "Technique", "description": "", "variable": "tch-stress_release_+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Stress Release ++": {
				"name": "Technique_Stress Release ++", "fieldName": "stress_release_++", "group": "Technique", "description": "", "variable": "tch-stress_release_++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training": {
				"name": "Technique_Sensory Training", "fieldName": "sensory_training", "group": "Technique", "description": "", "variable": "tch-sensory_training{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sensory Training +": {
				"name": "Technique_Sensory Training +", "fieldName": "sensory_training_+", "group": "Technique", "description": "", "variable": "tch-sensory_training_+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Broad Study": {
				"name": "Technique_Broad Study", "fieldName": "broad_study", "group": "Technique", "description": "", "variable": "tch-broad_study{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Experienced Tracker": {
				"name": "Technique_Experienced Tracker", "fieldName": "experienced_tracker", "group": "Technique", "description": "", "variable": "tch-experienced_tracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual": {
				"name": "Technique_Multilingual", "fieldName": "multilingual", "group": "Technique", "description": "", "variable": "tch-multilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Multilingual +": {
				"name": "Technique_Multilingual +", "fieldName": "multilingual_+", "group": "Technique", "description": "", "variable": "tch-multilingual_+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore": {
				"name": "Technique_Specialized Lore", "fieldName": "specialized_lore", "group": "Technique", "description": "", "variable": "tch-specialized_lore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore +": {
				"name": "Technique_Specialized Lore +", "fieldName": "specialized_lore_+", "group": "Technique", "description": "", "variable": "tch-specialized_lore_+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Specialized Lore ++": {
				"name": "Technique_Specialized Lore ++", "fieldName": "specialized_lore_++", "group": "Technique", "description": "", "variable": "tch-specialized_lore_++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Improved Initiative": {
				"name": "Technique_Improved Initiative", "fieldName": "improved_initiative", "group": "Technique", "description": "", "variable": "tch-improved_initiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training": {
				"name": "Technique_Knowledge Training", "fieldName": "knowledge_training", "group": "Technique", "description": "", "variable": "tch-knowledge_training{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training +": {
				"name": "Technique_Knowledge Training +", "fieldName": "knowledge_training_+", "group": "Technique", "description": "", "variable": "tch-knowledge_training_+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Knowledge Training ++": {
				"name": "Technique_Knowledge Training ++", "fieldName": "knowledge_training_++", "group": "Technique", "description": "", "variable": "tch-knowledge_training_++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training": {
				"name": "Technique_Social Training", "fieldName": "social_training", "group": "Technique", "description": "", "variable": "tch-social_training{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training +": {
				"name": "Technique_Social Training +", "fieldName": "social_training_+", "group": "Technique", "description": "", "variable": "tch-social_training_+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Social Training ++": {
				"name": "Technique_Social Training ++", "fieldName": "social_training_++", "group": "Technique", "description": "", "variable": "tch-social_training_++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus": {
				"name": "Technique_Refocus", "fieldName": "refocus", "group": "Technique", "description": "", "variable": "tch-refocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Refocus +": {
				"name": "Technique_Refocus +", "fieldName": "refocus_+", "group": "Technique", "description": "", "variable": "tch-refocus_+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel": {
				"name": "Technique_Sustained Channel", "fieldName": "sustained_channel", "group": "Technique", "description": "", "variable": "tch-sustained_channel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Sustained Channel +": {
				"name": "Technique_Sustained Channel +", "fieldName": "sustained_channel_+", "group": "Technique", "description": "", "variable": "tch-sustained_channel_+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control": {
				"name": "Technique_Ki Control", "fieldName": "ki_control", "group": "Technique", "description": "", "variable": "tch-ki_control{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control +": {
				"name": "Technique_Ki Control +", "fieldName": "ki_control_+", "group": "Technique", "description": "", "variable": "tch-ki_control_+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Ki Control ++": {
				"name": "Technique_Ki Control ++", "fieldName": "ki_control_++", "group": "Technique", "description": "", "variable": "tch-ki_control_++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value": {
				"name": "Technique_Surge Value", "fieldName": "surge_value", "group": "Technique", "description": "", "variable": "tch-surge_value{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Surge Value +": {
				"name": "Technique_Surge Value +", "fieldName": "surge_value_+", "group": "Technique", "description": "", "variable": "tch-surge_value_+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training": {
				"name": "Technique_Channel Training", "fieldName": "channel_training", "group": "Technique", "description": "", "variable": "tch-channel_training{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training +": {
				"name": "Technique_Channel Training +", "fieldName": "channel_training_+", "group": "Technique", "description": "", "variable": "tch-channel_training_+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Channel Training ++": {
				"name": "Technique_Channel Training ++", "fieldName": "channel_training_++", "group": "Technique", "description": "", "variable": "tch-channel_training_++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training": {
				"name": "Technique_Physical Training", "fieldName": "physical_training", "group": "Technique", "description": "", "variable": "tch-physical_training{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Physical Training +": {
				"name": "Technique_Physical Training +", "fieldName": "physical_training_+", "group": "Technique", "description": "", "variable": "tch-physical_training_+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training": {
				"name": "Technique_Body Training", "fieldName": "body_training", "group": "Technique", "description": "", "variable": "tch-body_training{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training +": {
				"name": "Technique_Body Training +", "fieldName": "body_training_+", "group": "Technique", "description": "", "variable": "tch-body_training_+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Body Training ++": {
				"name": "Technique_Body Training ++", "fieldName": "body_training_++", "group": "Technique", "description": "", "variable": "tch-body_training_++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training": {
				"name": "Technique_Technical Training", "fieldName": "technical_training", "group": "Technique", "description": "", "variable": "tch-technical_training{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training +": {
				"name": "Technique_Technical Training +", "fieldName": "technical_training_+", "group": "Technique", "description": "", "variable": "tch-technical_training_+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Technical Training ++": {
				"name": "Technique_Technical Training ++", "fieldName": "technical_training_++", "group": "Technique", "description": "", "variable": "tch-technical_training_++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training": {
				"name": "Technique_Martial Training", "fieldName": "martial_training", "group": "Technique", "description": "", "variable": "tch-martial_training{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training +": {
				"name": "Technique_Martial Training +", "fieldName": "martial_training_+", "group": "Technique", "description": "", "variable": "tch-martial_training_+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Martial Training ++": {
				"name": "Technique_Martial Training ++", "fieldName": "martial_training_++", "group": "Technique", "description": "", "variable": "tch-martial_training_++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up": {
				"name": "Technique_HP Up", "fieldName": "hp_up", "group": "Technique", "description": "", "variable": "tch-hp_up{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up+": {
				"name": "Technique_HP Up+", "fieldName": "hp_up+", "group": "Technique", "description": "", "variable": "tch-hp_up+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_HP Up++": {
				"name": "Technique_HP Up++", "fieldName": "hp_up++", "group": "Technique", "description": "", "variable": "tch-hp_up++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost": {
				"name": "Technique_Vitality Boost", "fieldName": "vitality_boost", "group": "Technique", "description": "", "variable": "tch-vitality_boost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost +": {
				"name": "Technique_Vitality Boost +", "fieldName": "vitality_boost_+", "group": "Technique", "description": "", "variable": "tch-vitality_boost_+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Vitality Boost ++": {
				"name": "Technique_Vitality Boost ++", "fieldName": "vitality_boost_++", "group": "Technique", "description": "", "variable": "tch-vitality_boost_++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying": {
				"name": "Technique_Undying", "fieldName": "undying", "group": "Technique", "description": "", "variable": "tch-undying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Undying +": {
				"name": "Technique_Undying +", "fieldName": "undying_+", "group": "Technique", "description": "", "variable": "tch-undying_+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack": {
				"name": "Technique_Extra Follow-Up Attack", "fieldName": "extra_follow-up_attack", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Extra Follow-Up Attack +": {
				"name": "Technique_Extra Follow-Up Attack +", "fieldName": "extra_follow-up_attack_+", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack_+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Change Tech Slots": {
				"name": "Technique_Change Tech Slots", "fieldName": "change_tech_slots", "group": "Technique", "description": "", "variable": "tch-change_tech_slots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Hold Out": {
				"name": "Technique_Hold Out", "fieldName": "hold_out", "group": "Technique", "description": "", "variable": "tch-hold_out{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			},
			"Technique_Overdrive": {
				"name": "Technique_Overdrive", "fieldName": "overdrive", "group": "Technique", "description": "", "variable": "tch-overdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "formula": true, "modifiers": "", "linkedGroups": [],
				"isResource": "", "modAttrs": [],
				"formulaCalculations": []
			}
		},
		sortingGroups = {
			"group": {
				"Type": ["Attribute", "Skill", "Job", "JobStyle", "Role", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error"], "AffinityType": ["Wood", "Fire", "Earth", "Metal", "Water"], "InnateDefenseType": ["BOD", "PRC", "QCK"], "InnateSenseType": ["CNV", "INT", "RSN"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "JobTier": ["JobTier0", "JobTier1", "JobTier2", "JobTier3"], "LoreTier": ["LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3"], "GeneralLoreTier": ["GeneralLoreTier0", "GeneralLoreTier1"], "LoreCategory": ["Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "LoreCategory_Academics", "LoreCategory_Profession", "LoreCategory_Craftmanship", "LoreCategory_Geography", "LoreCategory_History", "LoreCategory_Culture", "LoreCategory_Religion"], "PageSet": ["PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training"], "Page": ["Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement"], "Title": ["Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training"], "Advancement": ["Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques"], "Training": ["TrainingKnowledge", "TrainingTechniques", "PP"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Defense": ["Defense_Combat", "Defense_Brace", "Defense_Fortitude", "Defense_Disruption", "Defense_Hide", "Defense_Reflex", "Defense_Evasion"], "Sense": ["Sense_Social", "Sense_Insight", "Sense_Notice", "Sense_Scrutiny", "Sense_Detect", "Sense_Resolve", "Sense_Freewill"], "General": ["Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "HP", "WILL", "EN", "Initiative", "Affinity", "InnateDefense", "InnateSense", "Recall"], "Gear": ["Carrying Capacity"], "Combat": ["Combat_HV", "Combat_Armor", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Combat_Move Speed", "Combat_Move Potency"], "": ["Chakra"], "Social": ["Social_Approval", "Social_Patience"], "DamageType": ["Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Status": ["Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious"], "Condition": ["Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised"], "Style": ["Style_Basic Set", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan"], "Lore": ["Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "Role": ["Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"]
				, "Technique": ["Technique_Break Free", "Technique_Dash", "Technique_Escape", "Technique_Grapple", "Technique_Hide", "Technique_Mount", "Technique_Prepare", "Technique_Reposition", "Technique_Seach", "Technique_Aid", "Technique_Stabilize", "Technique_Skill Check", "Technique_Unarmed Strike", "Technique_Encourage", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand", "Technique_Grab an Edge", "Technique_Interact", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Generalist", "Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery", "Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike", "Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike", "Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +", "Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"]
			}, "subGroup": { "": ["Attribute", "Skill", "Job", "JobStyle", "Role", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "HP", "WILL", "EN", "Initiative", "Affinity", "InnateDefense", "InnateSense", "Recall", "Carrying Capacity", "Combat_HV", "Combat_Armor", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Combat_Durability", "Combat_Surge", "Combat_Chakra", "Chakra", "Combat_Move Speed", "Combat_Move Potency", "Social_Approval", "Social_Patience", "Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman", "Technique_Unarmed Strike", "Technique_Second Wind", "Technique_Second Breath", "Technique_Undaunted", "Technique_Preemptive Strike", "Technique_Preemptive Stagger", "Technique_Critical Maim", "Technique_Spellshot", "Technique_Follow-Up Spellshot", "Technique_Bursting Spellshot", "Technique_Savior", "Technique_Knock Away Savior", "Technique_Savior's Retaliation", "Technique_Spellstrike", "Technique_Power Skirmish", "Technique_Sneak Attack", "Technique_Sneaky Follow-Up", "Technique_Assassinate", "Technique_Emergency Care", "Technique_Nightingale", "Technique_Rhapsody", "Technique_Metamagic", "Technique_Strategize", "Technique_Foresight", "Technique_Saw That Coming", "Technique_As You May Recall", "Technique_Skulk Away", "Technique_Skulk Then Hide", "Technique_First Aid", "Technique_Cleansing Aid", "Technique_Environmental Awareness", "Technique_Eclectic Knowledge", "Technique_Point of Clarity", "Technique_Pole Vault", "Technique_Quick Draw", "Technique_Cleave", "Technique_Crushing Blade", "Technique_Great Cleave", "Technique_Cleave +", "Technique_Sudden Cleave", "Technique_Great Cleave II", "Technique_Power Flex", "Technique_Crush Knuckle", "Technique_", "Technique_Knuckle Flurry", "Technique_Water Blast", "Technique_Geyser", "Technique_Geyser Line", "Technique_Surf", "Technique_Great Geyser Line", "Technique_Tidal Wave", "Technique_Sand Surge", "Technique_Sand Spout", "Technique_Sand Wave", "Technique_Sand Launcher", "Technique_Sicken", "Technique_Spores", "Technique_Sickening Cloud", "Technique_Virulent Spores", "Technique_Firebolt", "Technique_Flame Arrow", "Technique_Fireball", "Technique_Fireblast", "Technique_Ragnarok", "Technique_Bonfire", "Technique_Wall of Fire", "Technique_Field of Flame", "Technique_Lightning Shaft", "Technique_Shock", "Technique_Lightning Bolt", "Technique_Plasma Arc", "Technique_Fulgor", "Technique_Cold Snap", "Technique_Frostbite", "Technique_Freezebind", "Technique_Cold Burst", "Technique_Cold Front", "Technique_Diamond Dust", "Technique_Wind Bullet", "Technique_Gust", "Technique_Windsweep", "Technique_Gale", "Technique_Darkness", "Technique_Shadow Wall", "Technique_Nightfall", "Technique_Fog Cloud", "Technique_Sleet", "Technique_Freezing Sleet", "Technique_Hail", "Technique_Binding Sleet", "Technique_Ice Storm", "Technique_Fimbulwinter", "Technique_Smoke Cloud", "Technique_Burning Smoke", "Technique_Choking Smoke", "Technique_Acceleration", "Technique_Power Vault", "Technique_Expeditious", "Technique_Quick Climb", "Technique_Quick Swim", "Technique_Poise", "Technique_Cat Fall", "Technique_Kip Up", "Technique_Silent Stride", "Technique_Shove", "Technique_Knockdown", "Technique_Tumble", "Technique_Field Medic", "Technique_Camoflauge", "Technique_Blurred Light", "Technique_Light Refraction", "Technique_Shadow Steps", "Technique_Shadow Walker", "Technique_Wind Step", "Technique_Updraft", "Technique_Clouded Updraft", "Technique_Wind Fall", "Technique_Walk on Air", "Technique_Fire Step", "Technique_Liftoff", "Technique_Jet", "Technique_Cunning Action", "Technique_Demoralize", "Technique_Fascinate", "Technique_Impersonator", "Technique_Ether Sense", "Technique_Spirit Sense", "Technique_Tremorsense", "Technique_Dustcraft", "Technique_Shape Material", "Technique_Quickcraft", "Technique_Improved Shaping", "Technique_Greater Shaping", "Technique_Legendary Shaping", "Technique_Dust Material", "Technique_Dust Area", "Technique_Improved Dusting", "Technique_Greater Dusting", "Technique_Legendary Dusting", "Technique_Form Path", "Technique_Form Pillar", "Technique_Stepping Path", "Technique_Form Wall", "Technique_Scattered Pillars", "Technique_Great Wall", "Technique_Cultivate", "Technique_Entangle", "Technique_Wildwood", "Technique_Distortion", "Technique_Lasting Distortion", "Technique_Heat Field", "Technique_Burn Guard", "Technique_Cold Field", "Technique_Chill Guard", "Technique_Kinesis", "Technique_Distant Kinesis", "Technique_Kinetic Strike", "Technique_Kinetic Throw", "Technique_Heavy Kinesis", "Technique_Burden", "Technique_Pressure", "Technique_Restrain", "Technique_Wide Pressure", "Technique_Prostration", "Technique_Deep Pressure", "Technique_Gravity Well", "Technique_Shield Block", "Technique_Glancing Block", "Technique_Aegis", "Technique_Light", "Technique_Dancing Lights", "Technique_Flash", "Technique_Sunlight", "Technique_Stress Release", "Technique_Stress Release +", "Technique_Stress Release ++", "Technique_Sensory Training", "Technique_Sensory Training +", "Technique_Broad Study", "Technique_Experienced Tracker", "Technique_Multilingual", "Technique_Multilingual +", "Technique_Specialized Lore", "Technique_Specialized Lore +", "Technique_Specialized Lore ++", "Technique_Improved Initiative", "Technique_Knowledge Training", "Technique_Knowledge Training +", "Technique_Knowledge Training ++", "Technique_Social Training", "Technique_Social Training +", "Technique_Social Training ++", "Technique_Refocus", "Technique_Refocus +", "Technique_Sustained Channel", "Technique_Sustained Channel +", "Technique_Ki Control", "Technique_Ki Control +", "Technique_Ki Control ++", "Technique_Surge Value", "Technique_Surge Value +", "Technique_Channel Training", "Technique_Channel Training +", "Technique_Channel Training ++", "Technique_Physical Training", "Technique_Physical Training +", "Technique_Body Training", "Technique_Body Training +", "Technique_Body Training ++", "Technique_Technical Training", "Technique_Technical Training +", "Technique_Technical Training ++", "Technique_Martial Training", "Technique_Martial Training +", "Technique_Martial Training ++", "Technique_HP Up", "Technique_HP Up+", "Technique_HP Up++", "Technique_Vitality Boost", "Technique_Vitality Boost +", "Technique_Vitality Boost ++", "Technique_Undying", "Technique_Undying +", "Technique_Extra Follow-Up Attack", "Technique_Extra Follow-Up Attack +", "Technique_Change Tech Slots", "Technique_Hold Out", "Technique_Overdrive"], "Attribute": ["Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN"], "Combined Defense": ["Defense_Combat"], "Combat Defense": ["Defense_Brace", "Defense_Disruption", "Defense_Reflex"], "Defense": ["Defense_Fortitude", "Defense_Hide", "Defense_Evasion"], "Combined Sense": ["Sense_Social"], "Social Sense": ["Sense_Insight", "Sense_Scrutiny", "Sense_Resolve"], "Sense": ["Sense_Notice", "Sense_Detect", "Sense_Freewill"], "Technique Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall"], "Item Trait": ["Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud"], "Material Trait": ["Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent"], "Basics": ["Style_Basic Set"], "Standard": ["Style_Swordplay", "Style_Ki Extension"], "Athletics Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Physique", "Skill_Sneak", "Skill_Traversal"], "Sensing Skill": ["Skill_Analyze", "Skill_Empathy", "Skill_Resonance", "Skill_Search", "Skill_Survival"], "Creation Skill": ["Skill_Build", "Skill_Channel", "Skill_Cook", "Skill_Disguise", "Skill_Medicine"], "Social Skill": ["Skill_Charm", "Skill_Deception", "Skill_Intimidation", "Skill_Leadership", "Skill_Negotiation"], " Skill": ["Skill_Command", "Skill_Concoct", "Skill_Flexibility", "Skill_Heal", "Skill_Maneuver"], "Manipulate Skill": ["Skill_Enchant", "Skill_Palming", "Skill_Pilot", "Skill_Throw", "Skill_Tinker"], "Combat Skill": ["Skill_Finesse", "Skill_Grappling", "Skill_Might", "Skill_Shoot", "Skill_Skirmish"], "Academics": ["LoreCategory_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology"], "Profession": ["LoreCategory_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining"], "Craftmanship": ["LoreCategory_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving"], "Geography": ["LoreCategory_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane"], "History": ["LoreCategory_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History"], "Culture": ["LoreCategory_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater"], "Religion": ["LoreCategory_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Basic Set": ["Technique_Break Free", "Technique_Escape", "Technique_Mount", "Technique_Prepare", "Technique_Seach", "Technique_Aid", "Technique_Stabilize", "Technique_Skill Check", "Technique_Grab an Edge", "Technique_Interact"], "Basic Positioning": ["Technique_Dash", "Technique_Hide", "Technique_Reposition"], "Basic Attack": ["Technique_Grapple"], "Basic Social": ["Technique_Encourage", "Technique_Build Rapport", "Technique_Build Pressure", "Technique_Captivate", "Technique_Demand"], "Generalist": ["Technique_Generalist"], "Defender": ["Technique_Defender", "Technique_Defender II", "Technique_Defender's Will", "Technique_Defender's Taunt", "Technique_Defender's Recovery"], "Skirmisher": ["Technique_Skirmisher", "Technique_Skirmisher II", "Technique_Skirmisher's Step", "Technique_Skirmisher's Strike"], "Marksman": ["Technique_Marksman", "Technique_Marksman II", "Technique_Marksman's Longshot", "Technique_Marksman's Sight", "Technique_Marksman's Strike"], "Athlete": ["Technique_Athlete", "Technique_Athlete II", "Technique_Athlete's Sprint", "Technique_Athlete's Reach", "Technique_Bounding Sprint"], "Ki Extension": ["Technique_Extension Strike", "Technique_Step Extension", "Technique_Lasting Extension", "Technique_Far Strike", "Technique_Extension Strike +"], "Swordplay": ["Technique_Quick Slash", "Technique_Precision Blade", "Technique_Armor Piercer", "Technique_Quick Slash II"] }, "formulaMods": { "CR": ["Attribute", "Skill", "Job", "Technique", "HP", "WILL", "Initiative", "Combat_HV", "Combat_Chakra", "Social_Approval", "Social_Patience", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "AdvancementSkill": ["Skill"], "AdvancementJob": ["Job", "Job_Trainee", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "": ["Role", "Language", "LoreCategory", "Lore", "StyleType", "PageSet", "Page", "Title", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "PageSet_Character Creator", "PageSet_Core", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_Training", "Level", "CR", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "TrainingKnowledge", "TrainingTechniques", "Attribute_BOD", "Attribute_PRC", "Attribute_QCK", "Attribute_CNV", "Attribute_INT", "Attribute_RSN", "Defense_Combat", "Sense_Social", "Full Name", "Display Name", "Background", "Age", "Gender", "Homeland", "EN", "Affinity", "InnateDefense", "InnateSense", "Combat_Resistance", "Combat_ResistanceDesc", "Combat_WeaknessDesc", "Chakra", "Social_Patience", "Burn", "Cold", "Energy", "Force", "Piercing", "Shock", "Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Sharp", "Trait_Sturdy", "Trait_Transparent", "Status_Downed", "Status_Engaged", "Status_Ethereal", "Status_Grappled", "Status_Hidden", "Status_Initiative Penalty", "Status_Invisible", "Status_Restrained", "Status_Unconscious", "Condition_Aflame", "Condition_Angered", "Condition_Chilled", "Condition_Delayed", "Condition_Disgusted", "Condition_Dying", "Condition_Empowered", "Condition_Encouraged", "Condition_Encumbered", "Condition_Frightened", "Condition_Hasted", "Condition_Immobilized", "Condition_Impaired", "Condition_Joyful", "Condition_Launched", "Condition_Paralyzed", "Condition_Prone", "Condition_Saddened", "Condition_Sickened", "Condition_Staggered", "Condition_Stunned", "Condition_Surprised", "Skill_Command", "Skill_Concoct", "Skill_Flexibility", "Skill_Heal", "Skill_Maneuver", "Language_Minere", "Language_Junal", "Language_Apollen", "Language_Lib", "Language_Cert", "Language_Byric", "Language_Dustell", "Language_Muralic", "Language_Shira", "Language_Ciel", "Language_Citeq", "Language_Manstan", "Language_Salkan", "Language_Sansic", "Language_Silq", "Language_Kleikan", "Language_Crinere", "Language_Palmic", "Language_Shorespeak", "Language_Verdeni", "Language_Vulca", "Language_Emotion", "Language_Empathy", "Language_Wolfwarg", "Language_Jovean", "Language_Mytikan", "Role_Generalist", "Role_Defender", "Role_Athlete", "Role_Skirmisher", "Role_Marksman"], "TrainingKnowledge": ["Knowledge"], "AdvancementTechnique": ["Technique"], "TrainingTechniques": ["Technique"], "Level": ["Advancement", "HP", "WILL", "Social_Approval"], "Attribute_BOD": ["Defense_Brace", "Defense_Fortitude", "HP", "Carrying Capacity", "Skill_Grappling", "Skill_Might", "Skill_Physique", "Skill_Survival", "Skill_Traversal"], "Attribute_PRC": ["Defense_Disruption", "Defense_Hide", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Throw", "Skill_Tinker"], "Attribute_QCK": ["Defense_Reflex", "Defense_Evasion", "Initiative", "Skill_Acrobatics", "Skill_Agility", "Skill_Finesse", "Skill_Palming", "Skill_Pilot"], "Attribute_INT": ["Sense_Insight", "Sense_Notice", "Skill_Cook", "Skill_Disguise", "Skill_Empathy", "Skill_Leadership", "Skill_Search"], "Attribute_RSN": ["Sense_Scrutiny", "Sense_Detect", "Recall", "Skill_Analyze", "Skill_Build", "Skill_Deception", "Skill_Medicine", "Skill_Negotiation"], "Attribute_CNV": ["Sense_Resolve", "Sense_Freewill", "WILL", "Combat_HV", "Social_Approval", "Skill_Channel", "Skill_Charm", "Skill_Enchant", "Skill_Intimidation", "Skill_Resonance"], "Recall": ["LoreCategory_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCategory_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCategory_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCategory_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCategory_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCategory_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCategory_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"] }
		},
		_max = "_max",
		_true = "_true",
		_rank = "_rank",
		_build = "_build",
		_filter = "_filter",
		_subfilter = "_subfilter",
		_expand = "_expand",
		_tab = "_tab",
		_page = "_page",
		_info = "_info",
		_exit = "_exit",
		_finish = "_finish",
		_origin = "_origin",
		_learn = "_learn",
		_pts = "_pts",
		_tech = "_tech",
		_expertise = "_expertise",
		_gear = "_gear",
		_affinity = "_affinity",
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
		},
		getDescription = function (key) {
			let data = get(key);
			return data.getDescription();
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
		GetDescription: getDescription,
		_max: _max,
		_true: _true,
		_rank: _rank,
		_build: _build,
		_filter: _filter,
		_subfilter: _subfilter,
		_expand: _expand,
		_tab: _tab,
		_page: _page,
		_info: _info,
		_exit: _exit,
		_finish: _finish,
		_origin: _origin,
		_learn: _learn,
		_pts: _pts,
		_tech: _tech,
		_expertise: _expertise,
		_gear: _gear,
		_affinity: _affinity,
		_error: _error
	};
}());
