//Definitions Database
var WuxDef = WuxDef || (function () {
	'use strict';

	var
		keys = ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "Speak", "Whisper", "Yell", "Think", "Describe", "PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense", "Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "RepeatingActiveEmotes", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "RepeatingOutfits", "Chat_OutfitDefault", "Chat_OutfitDefaultURL", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN", "Def_Brace", "Def_Fortitude", "Def_Disruption", "Def_Hide", "Def_Reflex", "Def_Evasion", "Def_Insight", "Def_Notice", "Def_Scrutiny", "Def_Detect", "Def_Resolve", "Def_Freewill", "CombatDefense", "SocialSense", "WillBreak", "FullName", "DisplayName", "Background", "Age", "Gender", "Homeland", "Affinity", "InnateDefense", "InnateSense", "HP", "WILL", "EN", "Initiative", "Recall", "Carrying Capacity", "Cmb_HV", "Cmb_Armor", "Resistance", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Chakra", "Chakra", "Cmb_MoveSpd", "Cmb_MovePot", "Cmb_MartialForce", "Cmb_SpellForce", "Soc_Pressure", "Soc_Rapport", "Soc_Approval", "Soc_Patience", "Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension", "Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent", "Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious", "Stat_Aflame", "Stat_Angered", "Stat_Chilled", "Stat_Delayed", "Stat_Disgusted", "Stat_Empowered", "Stat_Encouraged", "Stat_Encumbered", "Stat_Frightened", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Joyful", "Stat_Launched", "Stat_Paralyzed", "Stat_Prone", "Stat_Saddened", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned", "Stat_Surprised", "Style_Basic Action", "Style_Basic Attack", "Style_Basic Movement", "Style_Basic Social", "Style_Basic Support", "Style_Charm Unrestrained", "Style_Swordplay", "Style_Ki Extension", "Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Demoralize", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Inspire", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal", "Lang_Minere", "Lang_Junal", "Lang_Apollen", "Lang_Lib", "Lang_Cert", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq", "Lang_Kleikan", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca", "Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan", "LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "JStyle_Rogue", "JStyle_Scholar", "JStyle_Physician", "Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"],
		values = {
			"Attribute": {
				"name": "Attribute", "fieldName": "attribute", "group": "Type", "description": "", "variable": "atr{0}{1}", "title": "Attributes", "subGroup": "", "descriptions": [""],
				"abbreviation": "Attr", "baseFormula": "6;CR", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Attribute"],
				"isResource": ""
			},
			"Skill": {
				"name": "Skill", "fieldName": "skill", "group": "Type", "description": "", "variable": "skl{0}{1}", "title": "Skills", "subGroup": "", "descriptions": [""],
				"abbreviation": "Skill", "baseFormula": "Level*2$8;CR;AdvancementSkill", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 2, "max": 8 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_skill", "definitionName": "AdvancementSkill", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Skill:_rank"],
				"isResource": ""
			},
			"Job": {
				"name": "Job", "fieldName": "job", "group": "Type", "description": "", "variable": "job{0}{1}", "title": "Jobs", "subGroup": "", "descriptions": [""],
				"abbreviation": "Job", "baseFormula": "CR;AdvancementJob", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Job:_rank"],
				"isResource": ""
			},
			"JobStyle": {
				"name": "JobStyle", "fieldName": "jobstyle", "group": "Type", "description": "", "variable": "jbs{0}{1}", "title": "Job", "subGroup": "", "descriptions": [""],
				"abbreviation": "JStyle", "baseFormula": "1", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": ["Job"],
				"isResource": ""
			},
			"Knowledge": {
				"name": "Knowledge", "fieldName": "knowledge", "group": "Type", "description": "", "variable": "knw{0}{1}", "title": "Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "Know", "baseFormula": "6;TrainingKnowledge", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_knowledge", "definitionName": "TrainingKnowledge", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Language:_rank", "Lore:_rank", "LoreCategory:_rank"],
				"isResource": ""
			},
			"Language": {
				"name": "Language", "fieldName": "language", "group": "Type", "description": "", "variable": "lng{0}{1}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "Lang", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCategory": {
				"name": "LoreCategory", "fieldName": "lorecategory", "group": "Type", "description": "", "variable": "lrc{0}{1}", "title": "Lore Category", "subGroup": "", "descriptions": [""],
				"abbreviation": "LoreCat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore": {
				"name": "Lore", "fieldName": "lore", "group": "Type", "description": "", "variable": "lor{0}{1}", "title": "Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "Lore", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Style": {
				"name": "Style", "fieldName": "style", "group": "Type", "description": "", "variable": "sty{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "Style", "baseFormula": "3", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": ["Style", "JobStyle"],
				"isResource": ""
			},
			"StyleType": {
				"name": "StyleType", "fieldName": "styletype", "group": "Type", "description": "", "variable": "stt{0}{1}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "StyleType", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Technique": {
				"name": "Technique", "fieldName": "technique", "group": "Type", "description": "", "variable": "tch{0}{1}", "title": "Techniques", "subGroup": "", "descriptions": [""],
				"abbreviation": "Tech", "baseFormula": "Level*1$4;CR*3;AdvancementTechnique;TrainingTechniques", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": ["Technique", "Style"],
				"isResource": ""
			},
			"PageSet": {
				"name": "PageSet", "fieldName": "pageset", "group": "Type", "description": "", "variable": "pgs{0}{1}", "title": "Page Set", "subGroup": "", "descriptions": [""],
				"abbreviation": "PageSet", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page": {
				"name": "Page", "fieldName": "page", "group": "Type", "description": "", "variable": "pag{0}{1}", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "Page", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title": {
				"name": "Title", "fieldName": "title", "group": "Type", "description": "", "variable": "ttl{0}{1}", "title": "Title", "subGroup": "", "descriptions": [""],
				"abbreviation": "Title", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Advancement": {
				"name": "Advancement", "fieldName": "advancement", "group": "Type", "description": "", "variable": "adv{0}{1}", "title": "Advancement", "subGroup": "", "descriptions": ["Advancement Points are gained whenever you level. ", "Every level you gain grants you one advancement point."],
				"abbreviation": "Adv", "baseFormula": "Level", "modifiers": "", "formula": { "workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": true
			},
			"Training": {
				"name": "Training", "fieldName": "training", "group": "Type", "description": "", "variable": "trn{0}{1}", "title": "Training Points", "subGroup": "", "descriptions": ["Training points are gained through training. You can spend training points on bonus build points for both knowledge and techniques. ", "Whenever you gain PP, you gain one Training Point."],
				"abbreviation": "Trn", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Defense": {
				"name": "Defense", "fieldName": "defense", "group": "Type", "description": "", "variable": "def{0}{1}", "title": "Defense", "subGroup": "", "descriptions": ["A defense protects a character from physical harm"],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Sense": {
				"name": "Sense", "fieldName": "sense", "group": "Type", "description": "", "variable": "sen{0}{1}", "title": "Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AffinityType": {
				"name": "AffinityType", "fieldName": "affinitytype", "group": "Type", "description": "", "variable": "afn{0}{1}", "title": "Affinity Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Aff", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateDefenseType": {
				"name": "InnateDefenseType", "fieldName": "innatedefensetype", "group": "Type", "description": "", "variable": "idf{0}{1}", "title": "Innate Defense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateSenseType": {
				"name": "InnateSenseType", "fieldName": "innatesensetype", "group": "Type", "description": "", "variable": "isn{0}{1}", "title": "Innate Sense Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Def", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"General": {
				"name": "General", "fieldName": "general", "group": "Type", "description": "", "variable": "gen{0}{1}", "title": "General", "subGroup": "", "descriptions": [""],
				"abbreviation": "Gen", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Chat": {
				"name": "Chat", "fieldName": "chat", "group": "Type", "description": "", "variable": "chat{0}{1}", "title": "Chat", "subGroup": "", "descriptions": [""],
				"abbreviation": "Chat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Combat": {
				"name": "Combat", "fieldName": "combat", "group": "Type", "description": "", "variable": "cmb{0}{1}", "title": "Combat", "subGroup": "", "descriptions": ["These statistics determine how well a character can survive in dangerous situations"],
				"abbreviation": "Cmb", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Social": {
				"name": "Social", "fieldName": "social", "group": "Type", "description": "", "variable": "soc{0}{1}", "title": "Social", "subGroup": "", "descriptions": [""],
				"abbreviation": "Soc", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"DamageType": {
				"name": "DamageType", "fieldName": "damagetype", "group": "Type", "description": "", "variable": "dmg{0}{1}", "title": "Damage Type", "subGroup": "", "descriptions": [""],
				"abbreviation": "Dmg", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait": {
				"name": "Trait", "fieldName": "trait", "group": "Type", "description": "", "variable": "trt{0}{1}", "title": "Traits", "subGroup": "", "descriptions": [""],
				"abbreviation": "Trait", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Status": {
				"name": "Status", "fieldName": "status", "group": "Type", "description": "", "variable": "sts{0}{1}", "title": "Status", "subGroup": "", "descriptions": [""],
				"abbreviation": "Stat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Condition": {
				"name": "Condition", "fieldName": "condition", "group": "Type", "description": "", "variable": "cnd{0}{1}", "title": "Condition", "subGroup": "", "descriptions": [""],
				"abbreviation": "Stat", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_max": {
				"name": "_max", "fieldName": "_max", "group": "VariableMod", "description": "", "variable": "_max", "title": "Max", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_true": {
				"name": "_true", "fieldName": "_true", "group": "VariableMod", "description": "", "variable": "_true", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_rank": {
				"name": "_rank", "fieldName": "_rank", "group": "VariableMod", "description": "", "variable": "_rank", "title": "Rank", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_build": {
				"name": "_build", "fieldName": "_build", "group": "VariableMod", "description": "", "variable": "_build", "title": "Build", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_filter": {
				"name": "_filter", "fieldName": "_filter", "group": "VariableMod", "description": "", "variable": "_filter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_subfilter": {
				"name": "_subfilter", "fieldName": "_subfilter", "group": "VariableMod", "description": "", "variable": "_subfilter", "title": "Filter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_expand": {
				"name": "_expand", "fieldName": "_expand", "group": "VariableMod", "description": "", "variable": "_expand", "title": "Expand", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_tab": {
				"name": "_tab", "fieldName": "_tab", "group": "VariableMod", "description": "", "variable": "_tab", "title": "Tab", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_page": {
				"name": "_page", "fieldName": "_page", "group": "VariableMod", "description": "", "variable": "_page", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_info": {
				"name": "_info", "fieldName": "_info", "group": "VariableMod", "description": "", "variable": "_info", "title": "Page", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_exit": {
				"name": "_exit", "fieldName": "_exit", "group": "VariableMod", "description": "", "variable": "_exit", "title": "Exit", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_finish": {
				"name": "_finish", "fieldName": "_finish", "group": "VariableMod", "description": "", "variable": "_finish", "title": "Finish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_origin": {
				"name": "_origin", "fieldName": "_origin", "group": "VariableMod", "description": "", "variable": "_origin", "title": "Origin", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_learn": {
				"name": "_learn", "fieldName": "_learn", "group": "VariableMod", "description": "", "variable": "_learn", "title": "Learn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_pts": {
				"name": "_pts", "fieldName": "_pts", "group": "VariableMod", "description": "", "variable": "_pts", "title": "Points", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_tech": {
				"name": "_tech", "fieldName": "_tech", "group": "VariableMod", "description": "", "variable": "_tech", "title": "Technique Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_expertise": {
				"name": "_expertise", "fieldName": "_expertise", "group": "VariableMod", "description": "", "variable": "_expertise", "title": "Expertise Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_gear": {
				"name": "_gear", "fieldName": "_gear", "group": "VariableMod", "description": "", "variable": "_gear", "title": "Gear Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_affinity": {
				"name": "_affinity", "fieldName": "_affinity", "group": "VariableMod", "description": "", "variable": "_affinity", "title": "Affinity Bonus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"_error": {
				"name": "_error", "fieldName": "_error", "group": "VariableMod", "description": "", "variable": "_error", "title": "Error", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Wood": {
				"name": "Wood", "fieldName": "wood", "group": "AffinityType", "description": "", "variable": "Wood", "title": "Wood", "subGroup": "", "descriptions": ["Wood is the element of growth, cooperation, and idealism. Magical techniques of the wood element tend to affect large groups and areas.", "A Wood affinity grants the following:\nInitiative bonus equal to your Character Rank.\nHeal Value bonus equal to your Character Rank x 2.\nCold Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Fire": {
				"name": "Fire", "fieldName": "fire", "group": "AffinityType", "description": "", "variable": "Fire", "title": "Fire", "subGroup": "", "descriptions": ["Fire is the element of expansion, spontaneity, and vigor. Magical techniques of the fire element tend to spread fire swiftly in a variety of impact areas.", "A Fire affinity grants the following:\nInitiative bonus equal to your Character Rank.\nBurn Resistance bonus equal to your Character Rank.\nFire Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Earth": {
				"name": "Earth", "fieldName": "earth", "group": "AffinityType", "description": "", "variable": "Earth", "title": "Earth", "subGroup": "", "descriptions": ["Earth is the element of stability, patience, and practicality. Magical techniques of the earth element tend to be simple and direct in functionality.", "An Earth affinity grants the following:\nFire Resistance bonus equal to your Character Rank x 2.\nPiercing Resistance bonus equal to your Character Rank.\nShock Resistance bonus equal to your Character Rank x 2."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Metal": {
				"name": "Metal", "fieldName": "metal", "group": "AffinityType", "description": "", "variable": "Metal", "title": "Metal", "subGroup": "", "descriptions": ["Metal is the element of recession, rigidity, and quality. Magical techniques of the metal element tend to be strong and durable but costly.", "A Metal affinity grants the following:\nArmor bonus equal to your Character Rank.\nForce Resistance bonus equal to your Character Rank.\nPiercing Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Water": {
				"name": "Water", "fieldName": "water", "group": "AffinityType", "description": "", "variable": "Water", "title": "Water", "subGroup": "", "descriptions": ["Water is the element of conservation, flexibility, and wisdom. Magical techniques of the water element tend to use little energy allowing them to quickly come into effect and disappear soon after.", "A Water affinity grants the following:\nSurge bonus equal to 1.\nCold Resistance bonus equal to your Character Rank x 2.\nForce Resistance bonus equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"BOD": {
				"name": "BOD", "fieldName": "bod", "group": "InnateDefenseType", "description": "", "variable": "BOD", "title": "Body", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PRC": {
				"name": "PRC", "fieldName": "prc", "group": "InnateDefenseType", "description": "", "variable": "PRC", "title": "Precision", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"QCK": {
				"name": "QCK", "fieldName": "qck", "group": "InnateDefenseType", "description": "", "variable": "QCK", "title": "Quickness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"CNV": {
				"name": "CNV", "fieldName": "cnv", "group": "InnateSenseType", "description": "", "variable": "CNV", "title": "Conviction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"INT": {
				"name": "INT", "fieldName": "int", "group": "InnateSenseType", "description": "", "variable": "INT", "title": "Intuition ", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RSN": {
				"name": "RSN", "fieldName": "rsn", "group": "InnateSenseType", "description": "", "variable": "RSN", "title": "Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueMediocre": {
				"name": "AttributeValueMediocre", "fieldName": "attributevaluemediocre", "group": "AttributeValue", "description": "", "variable": "0", "title": "Mediocre (+0)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueGreat": {
				"name": "AttributeValueGreat", "fieldName": "attributevaluegreat", "group": "AttributeValue", "description": "", "variable": "3", "title": "Great (+3)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueGood": {
				"name": "AttributeValueGood", "fieldName": "attributevaluegood", "group": "AttributeValue", "description": "", "variable": "2", "title": "Good (+2)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueAverage": {
				"name": "AttributeValueAverage", "fieldName": "attributevalueaverage", "group": "AttributeValue", "description": "", "variable": "1", "title": "Average (+1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AttributeValueBad": {
				"name": "AttributeValueBad", "fieldName": "attributevaluebad", "group": "AttributeValue", "description": "", "variable": "-1", "title": "Bad (-1)", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier0": {
				"name": "JobTier0", "fieldName": "jobtier0", "group": "JobTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier1": {
				"name": "JobTier1", "fieldName": "jobtier1", "group": "JobTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier2": {
				"name": "JobTier2", "fieldName": "jobtier2", "group": "JobTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier3": {
				"name": "JobTier3", "fieldName": "jobtier3", "group": "JobTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier0": {
				"name": "LoreTier0", "fieldName": "loretier0", "group": "LoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier1": {
				"name": "LoreTier1", "fieldName": "loretier1", "group": "LoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier2": {
				"name": "LoreTier2", "fieldName": "loretier2", "group": "LoreTier", "description": "", "variable": "2", "title": "Tier 2", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreTier3": {
				"name": "LoreTier3", "fieldName": "loretier3", "group": "LoreTier", "description": "", "variable": "3", "title": "Tier 3", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"GeneralLoreTier0": {
				"name": "GeneralLoreTier0", "fieldName": "generalloretier0", "group": "GeneralLoreTier", "description": "", "variable": "0", "title": "-", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"GeneralLoreTier1": {
				"name": "GeneralLoreTier1", "fieldName": "generalloretier1", "group": "GeneralLoreTier", "description": "", "variable": "1", "title": "Tier 1", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Academics": {
				"name": "Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "Academics", "title": "Academics", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Profession": {
				"name": "Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "Profession", "title": "Profession", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Craftmanship": {
				"name": "Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "Craftmanship", "title": "Craftmanship", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Geography": {
				"name": "Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "Geography", "title": "Geography", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"History": {
				"name": "History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "History", "title": "History", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Culture": {
				"name": "Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "Culture", "title": "Culture", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Religion": {
				"name": "Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "Religion", "title": "Religion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Speak": {
				"name": "Speak", "fieldName": "speak", "group": "ChatType", "description": "", "variable": "ctmsg", "title": "Speak", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Whisper": {
				"name": "Whisper", "fieldName": "whisper", "group": "ChatType", "description": "", "variable": "ctwsp", "title": "Whisper", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Yell": {
				"name": "Yell", "fieldName": "yell", "group": "ChatType", "description": "", "variable": "ctyell", "title": "Yell", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Think": {
				"name": "Think", "fieldName": "think", "group": "ChatType", "description": "", "variable": "ctthk", "title": "Think", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Describe": {
				"name": "Describe", "fieldName": "describe", "group": "ChatType", "description": "", "variable": "ctdesc", "title": "Describe", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Character Creator": {
				"name": "PageSet_Character Creator", "fieldName": "character_creator", "group": "PageSet", "description": "", "variable": "pgs-character_creator{0}", "title": "Character Creator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Core": {
				"name": "PageSet_Core", "fieldName": "core", "group": "PageSet", "description": "", "variable": "pgs-core{0}", "title": "Core", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_TechType": {
				"name": "PageSet_TechType", "fieldName": "techtype", "group": "PageSet", "description": "", "variable": "pgs-techtype{0}", "title": "TechType", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Advancement": {
				"name": "PageSet_Advancement", "fieldName": "advancement", "group": "PageSet", "description": "", "variable": "pgs-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PageSet_Training": {
				"name": "PageSet_Training", "fieldName": "training", "group": "PageSet", "description": "", "variable": "pgs-training{0}", "title": "Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Origin": {
				"name": "Page_Origin", "fieldName": "origin", "group": "Page", "description": "", "variable": "pag-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["This is the Character Creator. You can navigate to the different aspects of character creation by selecting the tabs at the top of the page. ", "Once you have finished character creation, press Finish to populate this character's stats.", "On this page you can set your character's origins including their name, their primary element, and ancestry. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Jobs": {
				"name": "Page_Jobs", "fieldName": "jobs", "group": "Page", "description": "", "variable": "pag-jobs{0}", "title": "Jobs", "subGroup": "", "descriptions": ["Jobs are a unique type of Style which broadly represents a character's role. A job will always grant bonuses to a character's combat or social stats, defenses, and special techniques to determine how the character acts in a conflict. When entering a conflict, only one job may be set at a time. ", "On this page, you can see the number of job points you have available to spend on the left column. Each time you spend a job point you may gain a rank in one job. A job's maximum rank is equal to your Character Rank.", "Gaining a rank in a job often grants new techniques to use when a job's techniques are active.", "You gain a number of job points equal to your Character Rank. You may choose to gain additional job points by spending advancement points on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Skills": {
				"name": "Page_Skills", "fieldName": "skills", "group": "Page", "description": "", "variable": "pag-skills{0}", "title": "Skills", "subGroup": "", "descriptions": ["Skills represent a broad application of techniques and ability. Anytime you do anything complex in Wuxing you will be making a skill check to determine your success. In addition, most techniques will require the use of a skill to function.", "Skills are all tied to one of the six attributes. As a base, a skill modifier is equal to its associated attribute. When you are trained in a skill your modifier increases by 2 + your Character Rank.", "On this page you can see the number of skill points you have available to spend on the left column. Each time you spend a skill point you may become trained in one skill. To train a skill you must check the skill off on the checkbox.", "You begin play with 3 skill points and gain an additional 2 at 2nd, 3rd, and 4th level. You gain an additional skill point whenever you increase in Character Rank. You may choose to gain additional skill points by spending advancement points on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Knowledge": {
				"name": "Page_Knowledge", "fieldName": "knowledge", "group": "Page", "description": "", "variable": "pag-knowledge{0}", "title": "Knowledge", "subGroup": "", "descriptions": ["Knowledge represents information a character knows on a subject. Knowledge can be divided into two categories, languages and lore. ", "Languages are divided by the locations of the world where they are used. Learning a language allows one to speak, read, and write the language. ", "Lore is knowledge of a single broad topic. Whenever you use the Recall Knowledge technique, you will roll with the modifier of an appropriate lore knowledge for the subject you wish to recall knowledge for. When you make a lore check your modifier is equal to your lore's rank + your Character Rank.", "Lore is divided into categories based on the context of their usage. Each category has a General knowledge that can be trained. Normally, you cannot make a lore check without having an associated lore, however having the general knowledge of the subject will allow it. When making a general lore check, your modifier is equal to your Character Rank.", "On this page you can see the number of knowledge points you have available to spend on the left column. Each time you spend a knowledge point you may raise the rank of any lore or learn a language. To raise the rank of a lore, you may change the value of a lore with its dropdown. To learn a language you must check the language off on the checkbox.", "You gain a number of skill points equal to 6 + your Character Rank. You may choose to gain additional knowledge points by spending training points through training on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Attributes": {
				"name": "Page_Attributes", "fieldName": "attributes", "group": "Page", "description": "", "variable": "pag-attributes{0}", "title": "Attributes", "subGroup": "", "descriptions": ["Attributes are the inherent characteristics of your character. Characters have a numerical rating for each attribute, which determines the modifier they grant to skills and affect their derived stats. ", "Attributes range from a +3 bonus to a -1 penalty. Whenever you raise an attribute to a rank you spend an equal number of attribute points.", "By reducing an attribute below 0, you gain an equal number of attribute points. At most, a character can have one attribute at a -1 penalty.", "You gain a number of attribute points equal to 6 + your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Styles": {
				"name": "Page_Styles", "fieldName": "styles", "group": "Page", "description": "", "variable": "pag-styles{0}", "title": "Styles", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_LearnTechniques": {
				"name": "Page_LearnTechniques", "fieldName": "learntechniques", "group": "Page", "description": "", "variable": "pag-learntechniques{0}", "title": "Techniques", "subGroup": "", "descriptions": ["Each technique allows a character to perform a variety of actions including granting bonuses to the character, performing attacks, manipulate others, or maneuvering around the world.", "All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can learn general styles and techniques. This page contains general styles and techniques that are available to all characters as long as they meet the requirements to learn the style or technique.", "When learning a style often the style will grant a set of techniques that are learned as part of the style. These are listed as Free Techniques in the Style's entry.", "You begin play with 4 technique points and gain an additional point at 2nd, 3rd, and 4th level. You gain an additional 3 technique points whenever you increase in Character Rank. You may choose to gain additional technique points by spending advancement points on level up. You may also choose to gain additional technique points by spending training points through training on level up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": []
				,
				"isResource": ""
			},
			"Page_SetStyles": {
				"name": "Page_SetStyles", "fieldName": "setstyles", "group": "Page", "description": "", "variable": "pag-setstyles{0}", "title": "Styles", "subGroup": "", "descriptions": ["All techniques are grouped into Styles. Broadly, a style is simply a group of techniques united by a theme. When entering a conflict, a character is limited in the number of styles they are able to set. When a style is set, the character has access to all techniques associated with that style.", "On this page you can set which styles are currently active on the character, allowing them to be used in the Actions Page. You can set both job styles and general styles. Basic styles are always set. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Character": {
				"name": "Page_Character", "fieldName": "character", "group": "Page", "description": "", "variable": "pag-character{0}", "title": "Character", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Overview": {
				"name": "Page_Overview", "fieldName": "overview", "group": "Page", "description": "", "variable": "pag-overview{0}", "title": "Overview", "subGroup": "", "descriptions": ["The Overview section shows quick information about your character. In addition, this is where you access both Advancement and Training to improve or change your character's build."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Details": {
				"name": "Page_Details", "fieldName": "details", "group": "Page", "description": "", "variable": "pag-details{0}", "title": "Details", "subGroup": "", "descriptions": ["The Details section contains all of your character's vital statistics. You can use this page to see exact numbers of each of their stats."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Chat": {
				"name": "Page_Chat", "fieldName": "chat", "group": "Page", "description": "", "variable": "pag-chat{0}", "title": "Chat", "subGroup": "", "descriptions": ["This is the Chat section. Here you can set your character emotes for the chat's messaging system. You can also use the Chat Post Box to send messages to the chat and select which language you are speaking from the language selection."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Options": {
				"name": "Page_Options", "fieldName": "options", "group": "Page", "description": "", "variable": "pag-options{0}", "title": "Options", "subGroup": "", "descriptions": ["This is the Options section. Here you will find various display options in the character sheet."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Gear": {
				"name": "Page_Gear", "fieldName": "gear", "group": "Page", "description": "", "variable": "pag-gear{0}", "title": "Gear", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Actions": {
				"name": "Page_Actions", "fieldName": "actions", "group": "Page", "description": "", "variable": "pag-actions{0}", "title": "Actions", "subGroup": "", "descriptions": ["This is the Actions section. Here you can use any action available to your character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Training": {
				"name": "Page_Training", "fieldName": "training", "group": "Page", "description": "", "variable": "pag-training{0}", "title": "Training", "subGroup": "", "descriptions": ["Characters can spend time learning new skills in their own free time. In this page you can track your progress learning and potentially gain ranks in knowledge or learn new techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Page_Advancement": {
				"name": "Page_Advancement", "fieldName": "advancement", "group": "Page", "description": "", "variable": "pag-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Origin": {
				"name": "Title_Origin", "fieldName": "origin", "group": "Title", "description": "", "variable": "ttl-origin{0}", "title": "Origin", "subGroup": "", "descriptions": ["These are the origin details of your character. They make no mechanical differences to your character, however may impact how you roleplay your character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginStats": {
				"name": "Title_OriginStats", "fieldName": "originstats", "group": "Title", "description": "", "variable": "ttl-originstats{0}", "title": "Origin Statistics", "subGroup": "", "descriptions": ["These are your characters core statistics that are set at character creation and cannot change. Each stat can affect how your character plays. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginAdvancement": {
				"name": "Title_OriginAdvancement", "fieldName": "originadvancement", "group": "Title", "description": "", "variable": "ttl-originadvancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "Here you can set your character's level. You may also spend any advancement points gained from increasing your character level on additional build points for jobs, skills, or techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_OriginTraining": {
				"name": "Title_OriginTraining", "fieldName": "origintraining", "group": "Title", "description": "", "variable": "ttl-origintraining{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "Here you can set any training points your character may have gained prior to character creation. You may also immediately spend these points on further build points."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Advancement": {
				"name": "Title_Advancement", "fieldName": "advancement", "group": "Title", "description": "", "variable": "ttl-advancement{0}", "title": "Advancement", "subGroup": "", "descriptions": ["As a character adventures, learns, and grows, they become more experienced in the world. Advancement tracks this progress through the character's level and experience. ", "In this section you can see your current level and track their experience. When you are ready, you may also access the advancement menu which will allow you to spend gained build points from leveling up."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_AdvancementConversion": {
				"name": "Title_AdvancementConversion", "fieldName": "advancementconversion", "group": "Title", "description": "", "variable": "ttl-advancementconversion{0}", "title": "Conversion", "subGroup": "", "descriptions": ["Experience Points are used to grant levels to your character. You can convert experience points (XP) into levels by using the convert to levels button below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Training": {
				"name": "Title_Training", "fieldName": "training", "group": "Title", "description": "", "variable": "ttl-training{0}", "title": "Training", "subGroup": "", "descriptions": ["The pursuit of skill and knowledge is an ever flowing river. Training is a system to track your progress in learning knowledge and new techniques apart from Advancement.", "In this section you can see how many training points you have gained along with your current PP values. When you are ready, you may also access the training menu which will calculate your current training points and allow you to spend them to learn new knowledge and techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TrainingConversion": {
				"name": "Title_TrainingConversion", "fieldName": "trainingconversion", "group": "Title", "description": "", "variable": "ttl-trainingconversion{0}", "title": "Conversion", "subGroup": "", "descriptions": ["PP is used to gain Training Points for your character. You can convert PP into Training Points by using the convert to TP button below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_ShowTechnique": {
				"name": "Title_ShowTechnique", "fieldName": "showtechnique", "group": "Title", "description": "", "variable": "ttl-showtechnique{0}", "title": "Show Technique", "subGroup": "", "descriptions": ["Clicking this button will send the technique information to chat, allowing others to see its details.", "Showing the technique in this way does not consume any resources. It is purely for display."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_UseTechnique": {
				"name": "Title_UseTechnique", "fieldName": "usetechnique", "group": "Title", "description": "", "variable": "ttl-usetechnique{0}", "title": "Use Technique", "subGroup": "", "descriptions": ["Clicking this button will use the technique, automatically consuming any resources the technique uses. The technique will be sent to the DM and then targets may be selected."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Chat": {
				"name": "Title_Chat", "fieldName": "chat", "group": "Title", "description": "", "variable": "ttl-chat{0}", "title": "Chat", "subGroup": "", "descriptions": ["This is the chat post box system. Here you can write posts for your character to say and then send the messages to chat.", "To use the post box, first select the type of message you would like to send. You have access to all the standard emote messages of Speak, Whisper, Yell, Think, and Describe.", "You may then write what you wish to be included in your message in the large textarea below. Once your message is complete, you may press one of the emote buttons below to send your message. If you do not see any emote buttons, be sure to select an outfit first.", "If you would rather use the standard keyword system as used in the chat, you may also begin your chat message with !m, !w, and the like. The system will detect your tag and then change the emote message type accordingly."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_LanguageSelect": {
				"name": "Title_LanguageSelect", "fieldName": "languageselect", "group": "Title", "description": "", "variable": "ttl-languageselect{0}", "title": "Language Select", "subGroup": "", "descriptions": ["Select your language from the options below. This will change how your message is displayed in chat and also show what language you are using."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Emotes": {
				"name": "Title_Emotes", "fieldName": "emotes", "group": "Title", "description": "", "variable": "ttl-emotes{0}", "title": "Emotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_Outfits": {
				"name": "Title_Outfits", "fieldName": "outfits", "group": "Title", "description": "", "variable": "ttl-outfits{0}", "title": "Outfits", "subGroup": "", "descriptions": ["You can add in your character art from here to populate your character's emotes.", "Press the Plus (+) button below to add a new instance of an outfit. From there you can populate the outfit data with emotes."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechEffect": {
				"name": "Title_TechEffect", "fieldName": "techeffect", "group": "Title", "description": "", "variable": "ttl-techeffect{0}", "title": "Effects", "subGroup": "", "descriptions": ["This contains the effects that will occur when this technique is used. There is no skill check necessary. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechDC": {
				"name": "Title_TechDC", "fieldName": "techdc", "group": "Title", "description": "", "variable": "ttl-techdc{0}", "title": "DC ", "subGroup": "", "descriptions": ["Your skill check must meet or exceed this value for the following effects to occur. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Title_TechDefense": {
				"name": "Title_TechDefense", "fieldName": "techdefense", "group": "Title", "description": "", "variable": "ttl-techdefense{0}", "title": "vs. ", "subGroup": "", "descriptions": ["Your skill check must meet or exceed the target's Defense value listed. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Type": {
				"name": "Chat_Type", "fieldName": "type", "group": "Chat", "description": "", "variable": "chat-type{0}", "title": "ChatType", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Target": {
				"name": "Chat_Target", "fieldName": "target", "group": "Chat", "description": "", "variable": "chat-target{0}", "title": "ChatTarget", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Message": {
				"name": "Chat_Message", "fieldName": "message", "group": "Chat", "description": "", "variable": "chat-message{0}", "title": "ChatMessage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Language": {
				"name": "Chat_Language", "fieldName": "language", "group": "Chat", "description": "", "variable": "chat-language{0}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_LanguageTag": {
				"name": "Chat_LanguageTag", "fieldName": "languagetag", "group": "Chat", "description": "", "variable": "chat-languagetag{0}", "title": "Language", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostContent": {
				"name": "Chat_PostContent", "fieldName": "postcontent", "group": "Chat", "description": "", "variable": "chat-postcontent{0}", "title": "ChatContent", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RepeatingActiveEmotes": {
				"name": "RepeatingActiveEmotes", "fieldName": "repeatingactiveemotes", "group": "Untyped", "description": "", "variable": "repeating_activeemotes", "title": "RepeatingActiveEmotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_SetId": {
				"name": "Chat_SetId", "fieldName": "setid", "group": "Chat", "description": "", "variable": "chat-emoteset_id{0}", "title": "SetId", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_Emotes": {
				"name": "Chat_Emotes", "fieldName": "emotes", "group": "Chat", "description": "", "variable": "chat-emoteset{0}", "title": "Emotes", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_DefaultEmote": {
				"name": "Chat_DefaultEmote", "fieldName": "defaultemote", "group": "Chat", "description": "", "variable": "chat-default_emote{0}", "title": "DefaultEmote", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostName": {
				"name": "Chat_PostName", "fieldName": "postname", "group": "Chat", "description": "", "variable": "chat-post_name{0}", "title": "PostName", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_PostURL": {
				"name": "Chat_PostURL", "fieldName": "posturl", "group": "Chat", "description": "", "variable": "chat-post_url{0}", "title": "PostURL", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitName": {
				"name": "Chat_OutfitName", "fieldName": "outfitname", "group": "Chat", "description": "", "variable": "chat-outfit_name{0}", "title": "Outfit Name", "subGroup": "", "descriptions": ["This is the name of the outfit or emote set. Give it a name to differentiate it from other emote sets."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitEmotes": {
				"name": "Chat_OutfitEmotes", "fieldName": "outfitemotes", "group": "Chat", "description": "", "variable": "chat-outfit_emotes{0}", "title": "Outfit Emotes", "subGroup": "", "descriptions": ["This is a JSON file of the emote set. This is used to populate chat data. You can either replace the text here with data containing the emote set's data or you may fill in each emote individually below."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_EmoteName": {
				"name": "Chat_EmoteName", "fieldName": "emotename", "group": "Chat", "description": "", "variable": "chat-emote_name{0}", "title": "Emote Name", "subGroup": "", "descriptions": ["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_EmoteURL": {
				"name": "Chat_EmoteURL", "fieldName": "emoteurl", "group": "Chat", "description": "", "variable": "chat-emote_url{0}", "title": "Emote URL", "subGroup": "", "descriptions": ["This is a URL that references the emote's image. This is the image that will be shown when this emote is used."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"RepeatingOutfits": {
				"name": "RepeatingOutfits", "fieldName": "repeatingoutfits", "group": "Untyped", "description": "", "variable": "repeating_emotes", "title": "", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitDefault": {
				"name": "Chat_OutfitDefault", "fieldName": "outfitdefault", "group": "Chat", "description": "", "variable": "chat-outfit_default_name{0}", "title": "Default Emote Name", "subGroup": "", "descriptions": ["This is the name of an individual emote. This is what this emote will be referred to when selecting it from this character's available emotes.", "The default emote name is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Chat_OutfitDefaultURL": {
				"name": "Chat_OutfitDefaultURL", "fieldName": "outfitdefaulturl", "group": "Chat", "description": "", "variable": "chat-outfit_default_url{0}", "title": "Default Emote URL", "subGroup": "", "descriptions": ["This is a URL that references the emote's image. This is the image that will be shown when this emote is used.", "The default emote url is the emote that will be shown whenever the character appears in various UIs where the character is not speaking."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Level": {
				"name": "Level", "fieldName": "level", "group": "Advancement", "description": "", "variable": "adv-level{0}", "title": "Character Level", "subGroup": "", "descriptions": ["A trait that determines a character's general level of experience in the world. It increases as a character receives experience points (XP)."],
				"abbreviation": "Lv", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"CR": {
				"name": "CR", "fieldName": "cr", "group": "Advancement", "description": "", "variable": "adv-cr{0}", "title": "Character Rank", "subGroup": "", "descriptions": ["Your character rank applies to many of the numbers you’ll be recording on your character sheet. This bonus increases as you gain character level.", "Your Character rank begins at 1. \nAt 5th Level it increases to 2.\nAt 15th Level it increases to 3.\nAt 30th Level it increases to 4.\nAt 50th Level it increases to 5."],
				"abbreviation": "CR", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"XP": {
				"name": "XP", "fieldName": "xp", "group": "Advancement", "description": "", "variable": "adv-xp{0}", "title": "Experience", "subGroup": "", "descriptions": ["Experience is a resource that is gained after completing challenges in a plot. When you gain enough experience you level up."],
				"abbreviation": "XP", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 30, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": true
			},
			"AdvancementJob": {
				"name": "AdvancementJob", "fieldName": "advancementjob", "group": "Advancement", "description": "", "variable": "adv-ap_job{0}", "title": "Job Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Job Points. These job points can be used to increase tier in a job. You must spend 2 advancement points to gain 1 job point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AdvancementSkill": {
				"name": "AdvancementSkill", "fieldName": "advancementskill", "group": "Advancement", "description": "", "variable": "adv-ap_skill{0}", "title": "Skill Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Skill Points. These skill points can be used to learn a new skill. You must spend 2 advancement points to gain 1 skill point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"AdvancementTechnique": {
				"name": "AdvancementTechnique", "fieldName": "advancementtechnique", "group": "Advancement", "description": "", "variable": "adv-ap_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend advancement points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 advancement points to gain 1 technique point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTier": {
				"name": "JobTier", "fieldName": "jobtier", "group": "Advancement", "description": "", "variable": "adv-jobtier{0}", "title": "Job Tier", "subGroup": "", "descriptions": ["Your job tier represents your skill in this job. Any tier above 0 allows you to choose this job as a set job style. Each tier will unlock the use of additional techniques as shown below.", "Your maximum job tier in any job is equal to your Character Rank."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"JobTechniques": {
				"name": "JobTechniques", "fieldName": "jobtechniques", "group": "Advancement", "description": "", "variable": "adv-jobtechniques{0}", "title": "Job Techniques", "subGroup": "", "descriptions": ["These techniques are gained when reaching the listed tier in the job. These techniques often help you perform tasks related to your job."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"LearnStyle": {
				"name": "LearnStyle", "fieldName": "learnstyle", "group": "Advancement", "description": "", "variable": "adv-learnstyle{0}", "title": "Learn Style", "subGroup": "", "descriptions": ["In order to learn techniques in a style, the style must first be learned. To learn this style, check the box to the left. This box may be disabled if you lack the requirements necessary to learn this style, as shown in the style's requirements.", "Learning a style always costs one Technique Point. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"StyleTechniques": {
				"name": "StyleTechniques", "fieldName": "styletechniques", "group": "Advancement", "description": "", "variable": "adv-styletechniques{0}", "title": "Technique Requirements", "subGroup": "", "descriptions": ["Most techniques require you to reach certain requirements to learn them. These requirements are listed here above a list of techniques that meet these restrictions. ", "To learn techniques in this category, check the box in the technique's entry. This checkbox may be disabled if you lack the requirements necessary to learn this technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"StyleFreeTechniques": {
				"name": "StyleFreeTechniques", "fieldName": "stylefreetechniques", "group": "Advancement", "description": "", "variable": "adv-stylefreetechniques{0}", "title": "Free Techniques", "subGroup": "", "descriptions": ["These techniques are automatically learned when this style is learned. You do not need to spend Technique Points to learn these techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"TrainingKnowledge": {
				"name": "TrainingKnowledge", "fieldName": "trainingknowledge", "group": "Training", "description": "", "variable": "trn-tp_knowledge{0}", "title": "Knowledge Points", "subGroup": "", "descriptions": ["You can spend training points to gain Knowledge Points. These knowledge points can be used to increase tier in a job. You must spend 1 training points to gain 1 knowledge point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"TrainingTechniques": {
				"name": "TrainingTechniques", "fieldName": "trainingtechniques", "group": "Training", "description": "", "variable": "trn-tp_technique{0}", "title": "Technique Points", "subGroup": "", "descriptions": ["You can spend training points to gain Technique Points. These technique points can be used to learn a new standard style or technique. You must spend 1 training points to gain 1 technique point."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"PP": {
				"name": "PP", "fieldName": "pp", "group": "Training", "description": "", "variable": "trn-pp{0}", "title": "Progression", "subGroup": "", "descriptions": ["PP is gained when a character spends time learning new knowledge, styles, or techniques. This is usually gained by practicing a task during freetime at a rate of 1 per day. You may gain an additional PP if a character devotes an entire day to training. ", "Once a character reaches 60 TP, they may spend their PP to gain a new knowledge or technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 60, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_BOD": {
				"name": "Attr_BOD", "fieldName": "bod", "group": "Attribute", "description": "", "variable": "atr-bod{0}", "title": "Body", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "BOD", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_PRC": {
				"name": "Attr_PRC", "fieldName": "prc", "group": "Attribute", "description": "", "variable": "atr-prc{0}", "title": "Precision", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "PRC", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_QCK": {
				"name": "Attr_QCK", "fieldName": "qck", "group": "Attribute", "description": "", "variable": "atr-qck{0}", "title": "Quickness", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "QCK", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_CNV": {
				"name": "Attr_CNV", "fieldName": "cnv", "group": "Attribute", "description": "", "variable": "atr-cnv{0}", "title": "Conviction", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "CNV", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_INT": {
				"name": "Attr_INT", "fieldName": "int", "group": "Attribute", "description": "", "variable": "atr-int{0}", "title": "Intuition ", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "INT", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Attr_RSN": {
				"name": "Attr_RSN", "fieldName": "rsn", "group": "Attribute", "description": "", "variable": "atr-rsn{0}", "title": "Reason", "subGroup": "Attribute", "descriptions": [""],
				"abbreviation": "RSN", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Brace": {
				"name": "Def_Brace", "fieldName": "brace", "group": "Defense", "description": "", "variable": "def-brace{0}", "title": "Brace", "subGroup": "Combat Defense", "descriptions": ["Brace represents a character's ability to resist a physical force and shrug it off by holding strong and blocking. Common uses of this defense are to prevent a fast attack from harming the character or to resist the effect of many pushing effects."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-brace_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Fortitude": {
				"name": "Def_Fortitude", "fieldName": "fortitude", "group": "Defense", "description": "", "variable": "def-fortitude{0}", "title": "Fortitude", "subGroup": "Defense", "descriptions": ["Fortitude is your body's defense against afflictions that would attack you internally such as poisons or sickness. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-fortitude_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-fortitude_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Disruption": {
				"name": "Def_Disruption", "fieldName": "disruption", "group": "Defense", "description": "", "variable": "def-disruption{0}", "title": "Disruption", "subGroup": "Combat Defense", "descriptions": ["Disruption defense represents an attempt to disrupt an attack's impact by reducing the overall effectiveness of the attack such as via parrying with a weapon or redirecting a projectile. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-disruption_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Hide": {
				"name": "Def_Hide", "fieldName": "hide", "group": "Defense", "description": "", "variable": "def-hide{0}", "title": "Hide", "subGroup": "Defense", "descriptions": ["Hide is your ability to stay quiet and out of sight while you have the hidden status. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-hide_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-hide_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Reflex": {
				"name": "Def_Reflex", "fieldName": "reflex", "group": "Defense", "description": "", "variable": "def-reflex{0}", "title": "Reflex", "subGroup": "Combat Defense", "descriptions": ["Reflex is used when a character could quickly react to a situation with movement. It is usually used to avoid powerful attacks or to get out of the way of harmful effects that only need to touch the character like a fireball."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-reflex_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Evasion": {
				"name": "Def_Evasion", "fieldName": "evasion", "group": "Defense", "description": "", "variable": "def-evasion{0}", "title": "Evasion", "subGroup": "Defense", "descriptions": ["Evasion is your dodging ability. When an attack checks against any defense and fails, it will always then check against evasion. On failure, the attack does not connect and no aspect of its effects occur."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 4, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "def-evasion_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Insight": {
				"name": "Def_Insight", "fieldName": "insight", "group": "Sense", "description": "", "variable": "sen-insight{0}", "title": "Insight", "subGroup": "Social Sense", "descriptions": ["Insight represents a character's ability to sense emotional state and sudden changes in behaviour. It is useful when detecting someone is trying to charm or deceive you. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-insight_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-insight_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Notice": {
				"name": "Def_Notice", "fieldName": "notice", "group": "Sense", "description": "", "variable": "sen-notice{0}", "title": "Notice", "subGroup": "Sense", "descriptions": ["Notice is the ability to see or hear sudden changes in your environment. It is typically used to counter a character's sneak attempts or to passively hear effects from afar. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-int", "definitionName": "Attr_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-notice_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-notice_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Scrutiny": {
				"name": "Def_Scrutiny", "fieldName": "scrutiny", "group": "Sense", "description": "", "variable": "sen-scrutiny{0}", "title": "Scrutiny", "subGroup": "Social Sense", "descriptions": ["Scrutiny represents your ability to find holes in another's logical reasoning. It is often used in defense against another's attempts at lying and from being tripped up against a skilled negotiator. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-scrutiny_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-scrutiny_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Detect": {
				"name": "Def_Detect", "fieldName": "detect", "group": "Sense", "description": "", "variable": "sen-detect{0}", "title": "Detect", "subGroup": "Sense", "descriptions": ["Detect is a character's ability to immediately analyze an effect or location for anything that is out of place or is not behaving normally. It is most often used to defend against illusory effects or to find those obscurred in plain sight."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-detect_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-detect_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Resolve": {
				"name": "Def_Resolve", "fieldName": "resolve", "group": "Sense", "description": "", "variable": "sen-resolve{0}", "title": "Resolve", "subGroup": "Social Sense", "descriptions": ["Resolve is the ability to persevere when your will is attacked. It is used to defend against intimidation and to stay motivated when desperation sets in."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 7, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-resolve_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-resolve_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Def_Freewill": {
				"name": "Def_Freewill", "fieldName": "freewill", "group": "Sense", "description": "", "variable": "sen-freewill{0}", "title": "Freewill", "subGroup": "Sense", "descriptions": ["Freewill is a character's sense of self and being. This sense defends against those that would manipulate your soul or memory through enchantments or possession. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-freewill_expertise", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "sen-freewill_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"CombatDefense": {
				"name": "CombatDefense", "fieldName": "combatdefense", "group": "Special Defense", "description": "", "variable": "combat", "title": "Combat Defense", "subGroup": "Special Defense", "descriptions": ["Combat Defense is a character's ability to use all their defenses available to defend themselves in combat. This defense is equal to the highest defense between a character's Brace, Disruption, and Reflex defenses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"SocialSense": {
				"name": "SocialSense", "fieldName": "socialsense", "group": "Special Defense", "description": "", "variable": "", "title": "Social Sense", "subGroup": "Special Defense", "descriptions": ["Social Sense is your ability to use all of your social senses at once to make a read on a situation. This sense is equal to the highest sese between your Insight, Scrutiny, and Resolve."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"WillBreak": {
				"name": "WillBreak", "fieldName": "willbreak", "group": "Special Defense", "description": "", "variable": "", "title": "Will Break", "subGroup": "", "descriptions": ["When a character's Willpower depletes to zero they suffer from will break. When this condition triggers, the effects listed below occur to the character. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"FullName": {
				"name": "FullName", "fieldName": "fullname", "group": "Origin", "description": "", "variable": "full_name", "title": "Full Name", "subGroup": "", "descriptions": ["A character's full name. This is for self referential use and is not used anywhere except on this character sheet page."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"DisplayName": {
				"name": "DisplayName", "fieldName": "displayname", "group": "Origin", "description": "", "variable": "display_name", "title": "Display Name", "subGroup": "", "descriptions": ["This is the name that is displayed when your character speaks."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Background": {
				"name": "Background", "fieldName": "background", "group": "Origin", "description": "", "variable": "background", "title": "Background", "subGroup": "", "descriptions": ["This is the background story of your character. Add any details on the character's past here."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Age": {
				"name": "Age", "fieldName": "age", "group": "Origin", "description": "", "variable": "age", "title": "Age", "subGroup": "", "descriptions": ["This represents how old the character is in years."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Gender": {
				"name": "Gender", "fieldName": "gender", "group": "Origin", "description": "", "variable": "gender", "title": "Gender", "subGroup": "", "descriptions": ["The gender the character identifies as."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Homeland": {
				"name": "Homeland", "fieldName": "homeland", "group": "Origin", "description": "", "variable": "homeland", "title": "Homeland", "subGroup": "", "descriptions": ["Where this character grew up. This will usually shape their perspectives in the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Affinity": {
				"name": "Affinity", "fieldName": "affinity", "group": "OriginStat", "description": "", "variable": "affinity{0}", "title": "Elemental Affinity", "subGroup": "", "descriptions": ["Characters that are able to cast spells have an elemental affinity that ties them to one of the five primary elements. Some techniques require an elemental affinity before they may be taken.", "Your chosen affinity grants weaknesses and resistances to certain elemental damage types."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateDefense": {
				"name": "InnateDefense", "fieldName": "innatedefense", "group": "OriginStat", "description": "", "variable": "innatefefense{0}", "title": "Innate Defense", "subGroup": "", "descriptions": ["You are especially proficient in a physical attribute when it comes to defending yourself. Check the Attributes page for more details on each of these attributes and what defenses they apply to.", "All defenses that key off of your chosen attribute gains a permanent +2 bonus. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"InnateSense": {
				"name": "InnateSense", "fieldName": "innatesense", "group": "OriginStat", "description": "", "variable": "innatesense{0}", "title": "Innate Sense", "subGroup": "", "descriptions": ["You are especially proficient in a mental attribute when it comes to detecting attacks against you. Check the Attributes page for more details on each of these attributes and what defenses they apply to. ", "All senses that key off of your chosen attribute gains a permanent +2 bonus."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"HP": {
				"name": "HP", "fieldName": "hp", "group": "General", "description": "", "variable": "gen-hp{0}{0}", "title": "Hit Points", "subGroup": "", "descriptions": ["Hit Points (HP) are the number of hits a character can take in combat. Your character’s hit points is a representation of your character maintaining their barrier to take hits, resisting harm with their toughness, and general ability to avoid harm. A character may be taking attacks from multiple sources that can be easily shrugged off, but once they run out of HP to do so is when the big hits make their way through. "],
				"abbreviation": "HP", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 10, "max": 0 },
					{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-hp_tech_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-hp_affinity_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"WILL": {
				"name": "WILL", "fieldName": "will", "group": "General", "description": "", "variable": "gen-will{0}{0}", "title": "Willpower", "subGroup": "", "descriptions": ["Willpower is a character's ability to stay invested in a situation. "],
				"abbreviation": "WILL", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 10, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 5, "max": 0 },
					{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-will_tech_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"EN": {
				"name": "EN", "fieldName": "en", "group": "General", "description": "", "variable": "gen-en{0}{0}", "title": "Energy", "subGroup": "", "descriptions": ["Energy is a resource used to power techniques. "],
				"abbreviation": "EN", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": true
			},
			"Initiative": {
				"name": "Initiative", "fieldName": "initiative", "group": "General", "description": "", "variable": "gen-initiative{0}{0}", "title": "Initiative", "subGroup": "", "descriptions": ["The Initiative skill is used to determine whoever acts first in a conflict. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-qck", "definitionName": "Attr_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-initiative_tech_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-initiative_affinity_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Recall": {
				"name": "Recall", "fieldName": "recall", "group": "General", "description": "", "variable": "gen-recall{0}{0}", "title": "Recall", "subGroup": "", "descriptions": ["Recall is your ability to remember information learned in the past. It is used as a modifier when using Recall Knowledge to gain information. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-rsn", "definitionName": "Attr_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "gen-recall_tech_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Carrying Capacity": {
				"name": "Carrying Capacity", "fieldName": "carrying_capacity", "group": "General", "description": "", "variable": "gen-capacity{0}{0}", "title": "Carrying Capacity", "subGroup": "", "descriptions": ["Carrying capacity is the total amount of Bulk a character can carry without penalty. Going over this amount will force the character to gain the Encumbered condition. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 40, "multiplier": 1, "max": 0 },
					{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 20, "max": 0 },
					{ "variableName": "gen-capacity_tech_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_HV": {
				"name": "Cmb_HV", "fieldName": "hv", "group": "Combat", "description": "", "variable": "cmb-hv{0}", "title": "Heal Value", "subGroup": "", "descriptions": ["This value is a standard amount of HP you recover from some healing abilities."]
				,
				"abbreviation": "HV", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 5, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 4, "max": 0 },
					{ "variableName": "atr-cnv", "definitionName": "Attr_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-hv_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-hv_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_Armor": {
				"name": "Cmb_Armor", "fieldName": "armor", "group": "Combat", "description": "", "variable": "cmb-armor{0}", "title": "Armor", "subGroup": "", "descriptions": ["Armor reduces up to half of incoming HP damage from a single source by an amount equal to its rating. Armor is typically gained from gear, but techniques can grant armor temporarily."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-armor_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Resistance": {
				"name": "Resistance", "fieldName": "resistance", "group": "Untyped", "description": "", "variable": "resistance", "title": "Resistance", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "_tech;_gear;_affinity", "formula": {
					"workers": [{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "resistance", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_ResistanceDesc": {
				"name": "Cmb_ResistanceDesc", "fieldName": "resistancedesc", "group": "Combat", "description": "", "variable": "cmb-resistancedesc{0}", "title": "Resistance", "subGroup": "", "descriptions": ["Resistance reduces damage of specific damage types by a value equal to the resistance's type. The resistance calculation happens after armor is applied."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_WeaknessDesc": {
				"name": "Cmb_WeaknessDesc", "fieldName": "weaknessdesc", "group": "Combat", "description": "", "variable": "cmb-weaknessdesc{0}", "title": "Weakness", "subGroup": "", "descriptions": ["Weakness is the opposite of Resistance, increasing damage against you when hit by specific damage types by a value equal to the weakness' type. The weakness calculation happens after armor is applied."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_Vitality": {
				"name": "Cmb_Vitality", "fieldName": "vitality", "group": "Combat", "description": "", "variable": "cmb-vitality{0}", "title": "Vitality", "subGroup": "", "descriptions": ["Whenever a character is reduced to zero HP, their HP restores to full and they lose one vitality. If the character has no vitality to lose, they instead gain the Downed status. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 2, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-vitality_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"Cmb_Surge": {
				"name": "Cmb_Surge", "fieldName": "surge", "group": "Combat", "description": "", "variable": "cmb-surge{0}", "title": "Healing Surge", "subGroup": "", "descriptions": ["Healing Surge is a resource that allows a character to tap into their resolve to continue a fight. It is most often spent to restore their HP."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 4, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-surge_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-surge_affinity", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": true
			},
			"Cmb_Chakra": {
				"name": "Cmb_Chakra", "fieldName": "chakra", "group": "Combat", "description": "", "variable": "cmb-chakra{0}", "title": "Chakra", "subGroup": "", "descriptions": ["Chakra is a source of ki within one's own body. As a person gains proficiency with martial and magic techniques, they learn to control more of their chakras. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Chakra": {
				"name": "Chakra", "fieldName": "chakra", "group": "", "description": "", "variable": "", "title": "", "subGroup": "", "descriptions": ["While in battle, a character's maximum EN is equal to their Chakra value. Some techniques can consume Chakra, reducing your maximum EN value. Chakra can never be reduced below 1."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_MoveSpd": {
				"name": "Cmb_MoveSpd", "fieldName": "movespd", "group": "Combat", "description": "", "variable": "cmb-movespeed{0}", "title": "Move Speed", "subGroup": "", "descriptions": ["Move Speed is the base number of spaces a character is able to move on their turn when they make a standard move."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movespeed_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movespeed_gear", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_MovePot": {
				"name": "Cmb_MovePot", "fieldName": "movepot", "group": "Combat", "description": "", "variable": "cmb-movepotency{0}", "title": "Move Potency", "subGroup": "", "descriptions": ["At the start of a combat round this value is rolled to determine the number of spaces the character may move. If the value is less than their move speed, the value becomes equal to their move speed. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "", "value": 6, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-movepotency_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_MartialForce": {
				"name": "Cmb_MartialForce", "fieldName": "martialforce", "group": "Combat", "description": "", "variable": "cmb-martialforce{0}", "title": "Martial Force", "subGroup": "", "descriptions": ["Martial Force is used as a damage bonus for some techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-bod", "definitionName": "Attr_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-martialforce_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Cmb_SpellForce": {
				"name": "Cmb_SpellForce", "fieldName": "spellforce", "group": "Combat", "description": "", "variable": "cmb-spellforce{0}", "title": "Spell Force", "subGroup": "", "descriptions": ["Spell Force is used as a damage bonus for some techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "atr-prc", "definitionName": "Attr_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "cmb-spellforce_tech", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Pressure": {
				"name": "Soc_Pressure", "fieldName": "pressure", "group": "Social", "description": "", "variable": "soc-pressure{0}", "title": "Pressure", "subGroup": "", "descriptions": ["Pressure is your character’s stress over the current social situation. Characters in a social conflict can leverage pressure to make your character come to a decision more quickly. ", "When pressure is used for an influence check, you add the target's pressure value to your influence check. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Rapport": {
				"name": "Soc_Rapport", "fieldName": "rapport", "group": "Social", "description": "", "variable": "soc-rapport{0}", "title": "Rapport", "subGroup": "", "descriptions": ["Rapport is how much your social opponent(s) are being likeable to you. Rapport can be leveraged by opponents to create a more favorable decision for them. ", "When rapport is used for an influence check, you add the target's rapport value to your influence check. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Approval": {
				"name": "Soc_Approval", "fieldName": "approval", "group": "Social", "description": "", "variable": "soc-approval{0}", "title": "Approval", "subGroup": "", "descriptions": ["Approval is a character's resistance to place their trust in another. In social conflict it acts similarly to HP, representing a character's threshold before allowing another to have their favor. ", "Approval should be set based on the argument made during an Influence check. ", "5-20. This is a low approval rating. It is very easy to persuade this character with the argument put forth.", "21-35. The character is unwilling to immediately budge on the subject but a little persuasion should work them over.", "36-50. This is a subject the character will be difficult to persuade to change.", "51+. A very difficult ask to make from the character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Soc_Patience": {
				"name": "Soc_Patience", "fieldName": "patience", "group": "Social", "description": "", "variable": "soc-patience{0}", "title": "Patience", "subGroup": "", "descriptions": ["Patience is a measure of how much a character will tolerate another's attempts at socializing before removing themselves.", "This value is unique to NPCs and is adjusted based on a character's hostility towards the party and conviction towards their stance in the argument. Having any patience at all implies the character can be convinced to change their opinion. If a character will not change their stance, their patience should be 0.", "Some guidelines for setting patience.", "3 - 5. Reserved for hostile characters or those that are unlikely to budge from their opinion.", "6-10. Characters that can be persuaded but with some difficulty. One will need to be efficient and effective with their techniques to persuade this person.", "11-20. These characters are willing to hear an argument but will not tolerate stalling. ", "21+ These characters are willing to hear every point made and are unlikely to end a social conflict by running out of patience.", "When a character's patience runs out, that character is no longer willing to participate in a social conflict and can no longer be persuaded. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Burn": {
				"name": "Dmg_Burn", "fieldName": "burn", "group": "DamageType", "description": "", "variable": "dmg-burn{0}", "title": "Burn", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Cold": {
				"name": "Dmg_Cold", "fieldName": "cold", "group": "DamageType", "description": "", "variable": "dmg-cold{0}", "title": "Cold", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Energy": {
				"name": "Dmg_Energy", "fieldName": "energy", "group": "DamageType", "description": "", "variable": "dmg-energy{0}", "title": "Energy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Fire": {
				"name": "Dmg_Fire", "fieldName": "fire", "group": "DamageType", "description": "", "variable": "dmg-fire{0}", "title": "Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Force": {
				"name": "Dmg_Force", "fieldName": "force", "group": "DamageType", "description": "", "variable": "dmg-force{0}", "title": "Force", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Patience": {
				"name": "Dmg_Patience", "fieldName": "patience", "group": "DamageType", "description": "", "variable": "dmg-patience{0}", "title": "Patience", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Piercing": {
				"name": "Dmg_Piercing", "fieldName": "piercing", "group": "DamageType", "description": "", "variable": "dmg-piercing{0}", "title": "Piercing", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Shock": {
				"name": "Dmg_Shock", "fieldName": "shock", "group": "DamageType", "description": "", "variable": "dmg-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Dmg_Tension": {
				"name": "Dmg_Tension", "fieldName": "tension", "group": "DamageType", "description": "", "variable": "dmg-tension{0}", "title": "Tension", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Accurate": {
				"name": "Trait_Accurate", "fieldName": "accurate", "group": "Trait", "description": "", "variable": "trt-accurate{0}", "title": "Accurate", "subGroup": "Technique Trait", "descriptions": ["This technique always targets a combined defense and automatically targets the weaker defense instead of the stronger one. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Affinity": {
				"name": "Trait_Affinity", "fieldName": "affinity", "group": "Trait", "description": "", "variable": "trt-affinity{0}", "title": "Affinity", "subGroup": "Technique Trait", "descriptions": ["This technique's element changes to one of your elemental affinities."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Affinity+": {
				"name": "Trait_Affinity+", "fieldName": "affinity+", "group": "Trait", "description": "", "variable": "trt-affinity+{0}", "title": "Affinity+", "subGroup": "Technique Trait", "descriptions": ["This technique forms ether into a material and stabilizes it. The material is determined by your elemental affinity. If you have access to multiple choose one. Wood creates pine, fire creates glass, earth creates granite, metal creates iron, and water creates ice."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_AP": {
				"name": "Trait_AP", "fieldName": "ap", "group": "Trait", "description": "", "variable": "trt-ap{0}", "title": "AP:X", "subGroup": "Technique Trait", "descriptions": ["This technique pierces through armor. Ignore up to X Armor on the target."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Brutal": {
				"name": "Trait_Brutal", "fieldName": "brutal", "group": "Trait", "description": "", "variable": "trt-brutal{0}", "title": "Brutal", "subGroup": "Technique Trait", "descriptions": ["When this technique deals damage, roll all damage dice twice and take only the highest results."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Evadible": {
				"name": "Trait_Evadible", "fieldName": "evadible", "group": "Trait", "description": "", "variable": "trt-evadible{0}", "title": "Evadible", "subGroup": "Technique Trait", "descriptions": ["When making a check against a target, compare your check results against the target's evasion. On failure, none of the technique's effects take effect. A target may always choose to not evade a technique. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Focus": {
				"name": "Trait_Focus", "fieldName": "focus", "group": "Trait", "description": "", "variable": "trt-focus{0}", "title": "Focus", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. It takes effort to maintain focus. Each time a character uses a technique with the Focus trait, they take stress equal to the number of Focus effects they currently have active. Focus+ effects do not count towards this total. When you take Trauma, all on going Focus effects immediately end. The caster can end a Focus effect at any time."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Focus+": {
				"name": "Trait_Focus+", "fieldName": "focus+", "group": "Trait", "description": "", "variable": "trt-focus+{0}", "title": "Focus+", "subGroup": "Technique Trait", "descriptions": ["Until an end trigger is reached or you stop channeling ki this technique will continue its effects. Unlike Focus effects, a character can only ever maintain one Focus+ effect at a time. When you take Trauma, all on going Focus+ effects immediately end. The caster can end a Focus+ technique at any time."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Material": {
				"name": "Trait_Material", "fieldName": "material", "group": "Trait", "description": "", "variable": "trt-material{0}", "title": "Material", "subGroup": "Technique Trait", "descriptions": ["This technique affects material elemental properties. In order to affect a material with this technique, you must have an affinity to all elements of the material. If you do not, a caster that casts the same spell in the same round on the same material who has access to any missing elements may supplement for the use of this technique."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Simple": {
				"name": "Trait_Simple", "fieldName": "simple", "group": "Trait", "description": "", "variable": "trt-simple{0}", "title": "Simple", "subGroup": "Technique Trait", "descriptions": ["This technique can be used even when under duress such as while under the Downed state. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Volatile": {
				"name": "Trait_Volatile", "fieldName": "volatile", "group": "Trait", "description": "", "variable": "trt-volatile{0}", "title": "Volatile", "subGroup": "Technique Trait", "descriptions": ["This technique uses volatile ether. When this technique hits a character that projects a barrier, the damage is done twice, first only to temporary HP, the second is treated normally."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Vortex": {
				"name": "Trait_Vortex", "fieldName": "vortex", "group": "Trait", "description": "", "variable": "trt-vortex{0}", "title": "Vortex", "subGroup": "Technique Trait", "descriptions": ["This feature is always a part of an area effect. The effect will always attempt to grapple those within its area, using the caster's Conjure skill instead of physique. If it is successful, at the start of the round the vortex will act on the character as determined by the effect. A grappled creature may use the Break Free action against the caster's Conjure DC to escape the vortex. Many vortexes have additional effects that may trigger on a character's escape."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Weapon": {
				"name": "Trait_Weapon", "fieldName": "weapon", "group": "Trait", "description": "", "variable": "trt-weapon{0}", "title": "Weapon", "subGroup": "Technique Trait", "descriptions": ["This technique uses a weapon to attack."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Wall": {
				"name": "Trait_Wall", "fieldName": "wall", "group": "Trait", "description": "", "variable": "trt-wall{0}", "title": "Wall", "subGroup": "Technique Trait", "descriptions": ["This technique causes a wall to manifest at a point within range. Each segment fills a 1x1x1 space. When making the wall, each segment must be contiguous with at least one other segment. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Arcing": {
				"name": "Trait_Arcing", "fieldName": "arcing", "group": "Trait", "description": "", "variable": "trt-arcing{0}", "title": "Arcing", "subGroup": "Item Trait", "descriptions": ["This weapon can be fired over obstacles, usually by lobbing a projectile in an arc. Attacks made with this weapon don’t require line of sight, as long as it’s possible to trace a path to the target; however, they are still affected by cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Shield": {
				"name": "Trait_Shield", "fieldName": "shield", "group": "Trait", "description": "", "variable": "trt-shield{0}", "title": "Shield", "subGroup": "Item Trait", "descriptions": ["This weapon provides additional defenses. While it is equipped, you gain +1 Armor, and -1 Flexibility."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Thrown": {
				"name": "Trait_Thrown", "fieldName": "thrown", "group": "Trait", "description": "", "variable": "trt-thrown{0}", "title": "Thrown", "subGroup": "Item Trait", "descriptions": ["This weapon is made to be thrown with its range value. When throwing in this way, the weapon uses the Thrown skill."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Two-Handed": {
				"name": "Trait_Two-Handed", "fieldName": "two-handed", "group": "Trait", "description": "", "variable": "trt-two-handed{0}", "title": "Two-Handed", "subGroup": "Item Trait", "descriptions": ["This weapon is required to be wielded in two hands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Loud": {
				"name": "Trait_Loud", "fieldName": "loud", "group": "Trait", "description": "", "variable": "trt-loud{0}", "title": "Loud", "subGroup": "Item Trait", "descriptions": ["This weapon creates a loud booming noise, audible to those within 300 feet of the source."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Light": {
				"name": "Trait_Light", "fieldName": "light", "group": "Trait", "description": "", "variable": "trt-light{0}", "title": "Light", "subGroup": "Item Trait", "descriptions": ["A light item is 10 lbs or less and can easily be moved with one hand."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Sharp": {
				"name": "Trait_Sharp", "fieldName": "sharp", "group": "Trait", "description": "", "variable": "trt-sharp{0}", "title": "Sharp", "subGroup": "Item Trait", "descriptions": ["Sharp items have a bladed edge and are durable enough to cut through soft material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Sturdy": {
				"name": "Trait_Sturdy", "fieldName": "sturdy", "group": "Trait", "description": "", "variable": "trt-sturdy{0}", "title": "Sturdy", "subGroup": "Item Trait", "descriptions": ["Sturdy items are especially durable and resilient."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Flammable": {
				"name": "Trait_Flammable", "fieldName": "flammable", "group": "Trait", "description": "", "variable": "trt-flammable{0}", "title": "Flammable", "subGroup": "Material Trait", "descriptions": ["This material will gain the aflame condition when exposed to fire."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Flexible": {
				"name": "Trait_Flexible", "fieldName": "flexible", "group": "Trait", "description": "", "variable": "trt-flexible{0}", "title": "Flexible", "subGroup": "Material Trait", "descriptions": ["Flexible materials are malleable and often are able to fold to the shape of whatever it is on top of or inside of. Flexible material is resistant to force damage."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Frozen": {
				"name": "Trait_Frozen", "fieldName": "frozen", "group": "Trait", "description": "", "variable": "trt-frozen{0}", "title": "Frozen", "subGroup": "Material Trait", "descriptions": ["Frozen items in temperatures between 32°F (0°C) and 70°F (21°C) melt, losing 10 lb. of material within 4 hours - becoming worthless. In temperatures above 70°F they melt within 1 hour."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Trait_Transparent": {
				"name": "Trait_Transparent", "fieldName": "transparent", "group": "Trait", "description": "", "variable": "trt-transparent{0}", "title": "Transparent", "subGroup": "Material Trait", "descriptions": ["A transparent material can be seen through due to its translucency. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Downed": {
				"name": "Stat_Downed", "fieldName": "downed", "group": "Status", "description": "", "variable": "sts-downed{0}", "title": "Downed", "subGroup": "Status", "descriptions": ["A downed character is severely injured. Techniques with skill checks in the Athletics, Combat, Creation, or Manipulate skill groups consume two quick actions if they are quick and cannot be used if they are a full action or reaction. In addition, all of their defenses are reduced by 5 and their Move Speed is reduced to 0. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Dying": {
				"name": "Stat_Dying", "fieldName": "dying", "group": "Status", "description": "", "variable": "sts-dying{0}", "title": "Dying", "subGroup": "Status", "descriptions": ["A dying character loses 10 HP each turn. If a character's HP reduces to 0 while dying, the character instead dies. ", "At the start of each round, a dying creature takes 1 stress."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Engaged": {
				"name": "Stat_Engaged", "fieldName": "engaged", "group": "Status", "description": "", "variable": "sts-engaged{0}", "title": "Engaged", "subGroup": "Status", "descriptions": ["If a character moves adjacent to a hostile character, they both gain the Engaged status for as long as they remain adjacent to one another. Ranged attacks made by an Engaged character receive +1 Disadvantage. Additionally, characters that become Engaged by targets of equal or greater Size during the course of a movement stop moving immediately and lose any unused movement."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Ethereal": {
				"name": "Stat_Ethereal", "fieldName": "ethereal", "group": "Status", "description": "", "variable": "sts-ethereal{0}", "title": "Ethereal", "subGroup": "Status", "descriptions": ["The character is in the spirit realm. If the character has a physical body it is treated as unconscious. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Grappled": {
				"name": "Stat_Grappled", "fieldName": "grappled", "group": "Status", "description": "", "variable": "sts-grappled{0}", "title": "Grappled", "subGroup": "Status", "descriptions": ["While a character is grappled, both characters become Engaged, and can't Dash or take reactions for the duration of the grapple.\nThe character in control of the grapple is the larger creature while the smaller character becomes Immobilized but moves when the controlling party moves, mirroring their movement. If both parties are the same Size, the one that initiated the grapple is in control. Either can make contested Physique checks at the start of their turn: the winner counts as the character in control until this contest is repeated.\n\nA Grapple automatically ends when:\n• either character breaks adjacency, such as if they are knocked back by another effect;\n• the controller chooses to end the grapple as a free action"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Hidden": {
				"name": "Stat_Hidden", "fieldName": "hidden", "group": "Status", "description": "", "variable": "sts-hidden{0}", "title": "Hidden", "subGroup": "Status", "descriptions": ["Hidden characters can’t be targeted by hostile attacks or actions, don’t cause engagement, and enemies only know their approximate location. Attacking, forcing saves, taking reactions, using Dash, and losing cover all remove Hidden after they resolve. Characters can find Hidden characters with Search.\nTo remain hidden, you must not be Engaged and you must either be outside of any enemies’ line of sight, obscured by sufficient cover, or invisible. If you Hide while meeting one of these criteria, you gain the Hidden status.\nHard cover is sufficient to Hide as long as it is large enough to totally conceal you, but soft cover is only sufficient if you are completely inside an area or zone that grants soft cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Invisible": {
				"name": "Stat_Invisible", "fieldName": "invisible", "group": "Status", "description": "", "variable": "sts-invisible{0}", "title": "Invisible", "subGroup": "Status", "descriptions": ["All attacks against Invisible characters, regardless of type, have a 50 percent chance to miss outright, before an attack roll is made. Additionally, Invisible characters can always Hide, even without cover."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Multiact": {
				"name": "Stat_Multiact", "fieldName": "multiact", "group": "Status", "description": "", "variable": "sts-multiact{0}", "title": "Multiact", "subGroup": "Status", "descriptions": ["This character is pushing their limits. Each time a character starts their turn in a round after their first one, they gain a rank of Multiact. All skill checks made by the character gain a penalty equal to their Multiact rank. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Restrained": {
				"name": "Stat_Restrained", "fieldName": "restrained", "group": "Status", "description": "", "variable": "sts-restrained{0}", "title": "Restrained", "subGroup": "Status", "descriptions": ["Restrained characters cannot make any voluntary movements, although involuntary movements are unaffected. Attacks against this creature gain +1 Advantage. Unless it is otherwise stated, a creature can use the Break Free or Escape techniques against a standard DC to end the status on themselves or an adjacent character. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Unconscious": {
				"name": "Stat_Unconscious", "fieldName": "unconscious", "group": "Status", "description": "", "variable": "sts-unconscious{0}", "title": "Unconscious", "subGroup": "Status", "descriptions": ["An unconscious character cannot take actions, can’t move or speak, and is unaware of its surroundings.\nThe character drops whatever it’s holding and falls prone.\nAll of the character's defenses and senses are considered to be 0."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Aflame": {
				"name": "Stat_Aflame", "fieldName": "aflame", "group": "Status", "description": "", "variable": "sts-aflame{0}", "title": "Aflame", "subGroup": "Condition", "descriptions": ["The character is on fire. At the start of each round the character takes 1d6 burn damage."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Angered": {
				"name": "Stat_Angered", "fieldName": "angered", "group": "Status", "description": "", "variable": "sts-angered{0}", "title": "Angered", "subGroup": "Condition", "descriptions": ["The character is furious with another character. When this character makes an attack roll and it does not include the character that is the source of their angered condition, they receive +1 disadvantage on the attack roll. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Chilled": {
				"name": "Stat_Chilled", "fieldName": "chilled", "group": "Status", "description": "", "variable": "sts-chilled{0}", "title": "Chilled", "subGroup": "Condition", "descriptions": ["The character's speed is halved."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Delayed": {
				"name": "Stat_Delayed", "fieldName": "delayed", "group": "Status", "description": "", "variable": "sts-delayed{0}", "title": "Delayed", "subGroup": "Condition", "descriptions": ["The character cannot take their turn on their next phase. This condition automatically ends once any character in their phase takes a turn or if the character is the last character that can act in their phase. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Disgusted": {
				"name": "Stat_Disgusted", "fieldName": "disgusted", "group": "Status", "description": "", "variable": "sts-disgusted{0}", "title": "Disgusted", "subGroup": "Condition", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Empowered": {
				"name": "Stat_Empowered", "fieldName": "empowered", "group": "Status", "description": "", "variable": "sts-empowered{0}", "title": "Empowered", "subGroup": "Condition", "descriptions": ["The next time you deal damage with an attack and the attack adds your power to the damage, you add your power to the damage twice. Once triggered, this condition automatically ends."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Encouraged": {
				"name": "Stat_Encouraged", "fieldName": "encouraged", "group": "Status", "description": "", "variable": "sts-encouraged{0}", "title": "Encouraged", "subGroup": "Condition", "descriptions": ["An encouraged character is motivated to persevere. As a swift action, a character with the encouraged condition may end the condition to end one other condition affecting them. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Encumbered": {
				"name": "Stat_Encumbered", "fieldName": "encumbered", "group": "Status", "description": "", "variable": "sts-encumbered{0}", "title": "Encumbered", "subGroup": "Condition", "descriptions": ["The only movement encumbered characters can make is their standard move, on their own turn they can’t Dash or make any special movement granted by techniques or weapons. A character that gains the Encumbered condition while in the middle of movement may finish their movement granted by the technique normally."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Frightened": {
				"name": "Stat_Frightened", "fieldName": "frightened", "group": "Status", "description": "", "variable": "sts-frightened{0}", "title": "Frightened", "subGroup": "Condition", "descriptions": ["A frightened character has +1 disadvantage on attack rolls against the source of its fear. The character can’t willingly move closer to the source. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Hasted": {
				"name": "Stat_Hasted", "fieldName": "hasted", "group": "Status", "description": "", "variable": "sts-hasted{0}", "title": "Hasted", "subGroup": "Condition", "descriptions": ["When this character ends their turn the character becomes able to act again in the round. The hasted condition then ends. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Immobilized": {
				"name": "Stat_Immobilized", "fieldName": "immobilized", "group": "Status", "description": "", "variable": "sts-immobilized{0}", "title": "Immobilized", "subGroup": "Condition", "descriptions": ["Immobilized characters cannot make any voluntary movements, although involuntary movements are unaffected."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Impaired": {
				"name": "Stat_Impaired", "fieldName": "impaired", "group": "Status", "description": "", "variable": "sts-impaired{0}", "title": "Impaired", "subGroup": "Condition", "descriptions": ["Impaired characters receive +1 Disadvantage on all attacks, saves, and skill checks."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Joyful": {
				"name": "Stat_Joyful", "fieldName": "joyful", "group": "Status", "description": "", "variable": "sts-joyful{0}", "title": "Joyful", "subGroup": "Condition", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Launched": {
				"name": "Stat_Launched", "fieldName": "launched", "group": "Status", "description": "", "variable": "sts-launched{0}", "title": "Launched", "subGroup": "Condition", "descriptions": ["The character is thrown into the air. Attacks against a launched target receive +1 Advantage and the creature is moved one extra space whenever they take forced movement. When a character gains advantage from this status the character loses the Launched condition. The creature also loses the Launched condition when they take their turn and at the start of a round."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Paralyzed": {
				"name": "Stat_Paralyzed", "fieldName": "paralyzed", "group": "Status", "description": "", "variable": "sts-paralyzed{0}", "title": "Paralyzed", "subGroup": "Condition", "descriptions": ["A paralyzed character must choose between performing a standard move, two quick actions, or a full action on their turn. They cannot perform any other combination of actions on their turn."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Prone": {
				"name": "Stat_Prone", "fieldName": "prone", "group": "Status", "description": "", "variable": "sts-prone{0}", "title": "Prone", "subGroup": "Condition", "descriptions": ["Attacks against Prone targets receive +1 Advantage. \nAdditionally, Prone characters count as moving in difficult terrain. Characters can remove Prone by standing up instead of taking their standard move, unless they’re Immobilized or Restrained. Standing up doesn’t count as movement."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Saddened": {
				"name": "Stat_Saddened", "fieldName": "saddened", "group": "Status", "description": "", "variable": "sts-saddened{0}", "title": "Saddened", "subGroup": "Condition", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Sickened": {
				"name": "Stat_Sickened", "fieldName": "sickened", "group": "Status", "description": "", "variable": "sts-sickened{0}", "title": "Sickened", "subGroup": "Condition", "descriptions": ["Sickened characters receive +1 Disadvantage on all attacks and skill checks. You can't willingly ingest anything while Sickened."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Staggered": {
				"name": "Stat_Staggered", "fieldName": "staggered", "group": "Status", "description": "", "variable": "sts-staggered{0}", "title": "Staggered", "subGroup": "Condition", "descriptions": ["Attacks against a staggered target receive +1 Advantage. When a character gains advantage from this status the character loses the Staggered condition. When a round starts, staggered is removed from all characters. Staggered is also required to use some techniques."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Stunned": {
				"name": "Stat_Stunned", "fieldName": "stunned", "group": "Status", "description": "", "variable": "sts-stunned{0}", "title": "Stunned", "subGroup": "Condition", "descriptions": ["A stunned creature can't take actions, can’t move, and can speak only falteringly. The character automatically fails Brace and Reflex saving throws."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Stat_Surprised": {
				"name": "Stat_Surprised", "fieldName": "surprised", "group": "Status", "description": "", "variable": "sts-surprised{0}", "title": "Surprised", "subGroup": "Condition", "descriptions": ["-"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Style_Basic Action": {
				"name": "Style_Basic Action", "fieldName": "style_basic_action", "group": "Style", "description": "", "variable": "sty-basic_action{0}", "title": "Basic Action", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Attack": {
				"name": "Style_Basic Attack", "fieldName": "style_basic_attack", "group": "Style", "description": "", "variable": "sty-basic_attack{0}", "title": "Basic Attack", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Movement": {
				"name": "Style_Basic Movement", "fieldName": "style_basic_movement", "group": "Style", "description": "", "variable": "sty-basic_movement{0}", "title": "Basic Movement", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Social": {
				"name": "Style_Basic Social", "fieldName": "style_basic_social", "group": "Style", "description": "", "variable": "sty-basic_social{0}", "title": "Basic Social", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Basic Support": {
				"name": "Style_Basic Support", "fieldName": "style_basic_support", "group": "Style", "description": "", "variable": "sty-basic_support{0}", "title": "Basic Support", "subGroup": "Basic", "descriptions": ["This is a set of actions anyone can perform"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Charm Unrestrained": {
				"name": "Style_Charm Unrestrained", "fieldName": "style_charm_unrestrained", "group": "Style", "description": "", "variable": "sty-charm_unrestrained{0}", "title": "Charm Unrestrained", "subGroup": "Standard", "descriptions": ["A style focused on using innate charm to flatter and gain rapport."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Swordplay": {
				"name": "Style_Swordplay", "fieldName": "style_swordplay", "group": "Style", "description": "", "variable": "sty-swordplay{0}", "title": "Swordplay", "subGroup": "Standard", "descriptions": ["Swords go brrr"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Style_Ki Extension": {
				"name": "Style_Ki Extension", "fieldName": "style_ki_extension", "group": "Style", "description": "", "variable": "sty-ki_extension{0}", "title": "Ki Extension", "subGroup": "Standard", "descriptions": ["Ki makes things longer"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 3, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "affinity": "", "requirements": "None", "tier": 0
			},
			"Skill_Acrobatics": {
				"name": "Skill_Acrobatics", "fieldName": "acrobatics", "group": "Skill", "description": "", "variable": "skl-acrobatics{0}", "title": "Acrobatics", "subGroup": "Athletics Skill", "descriptions": ["Your Acrobatics check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-acrobatics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Agility": {
				"name": "Skill_Agility", "fieldName": "agility", "group": "Skill", "description": "", "variable": "skl-agility{0}", "title": "Agility", "subGroup": "Athletics Skill", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-agility_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Analyze": {
				"name": "Skill_Analyze", "fieldName": "analyze", "group": "Skill", "description": "", "variable": "skl-analyze{0}", "title": "Analyze", "subGroup": "Sensing Skill", "descriptions": ["When attempting to find clues and make deductions based on those clues, you make an Analyze check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through books in search of a hidden fragment of knowledge might also call for an Analyze check."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-analyze_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Build": {
				"name": "Skill_Build", "fieldName": "build", "group": "Skill", "description": "", "variable": "skl-build{0}", "title": "Build", "subGroup": "Creation Skill", "descriptions": ["Build is the skill to create structures and objects. This skill includes several different forms of artistic impression such as through drawing, sculpting, handcrafting of fine objects, and conveying art and information through images and technique. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-build_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Channel": {
				"name": "Skill_Channel", "fieldName": "channel", "group": "Skill", "description": "", "variable": "skl-channel{0}", "title": "Channel", "subGroup": "Creation Skill", "descriptions": ["Channel is the skill to maintain concentration on ether you have manipulated in order to continue its effects. Magical effects that create a sustained area of effect typically use channel to determine their effectiveness."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-channel_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Charm": {
				"name": "Skill_Charm", "fieldName": "charm", "group": "Skill", "description": "", "variable": "skl-charm{0}", "title": "Charm", "subGroup": "Social Skill", "descriptions": ["Enticing, fascinating, and endearing others to you on a personal basis. It can be used to win someone over emotionally through friendliness, joy, and an ability to read a situation. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-charm_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Command": {
				"name": "Skill_Command", "fieldName": "command", "group": "Skill", "description": "", "variable": "skl-command{0}", "title": "Command", "subGroup": " Skill", "descriptions": ["Command is the ability to use perceived authority or intimidation to control another's perceptions and action. One may use command to inspire a companion, intimidate a foe into backing down, or when making demands of another. "]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-command_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Concoct": {
				"name": "Skill_Concoct", "fieldName": "concoct", "group": "Skill", "description": "", "variable": "skl-concoct{0}", "title": "Concoct", "subGroup": " Skill", "descriptions": ["Concoct is the skill of combining ingredients inorder to create a new product. If you are cooking a meal, making medicine, or otherwise blending items together to form a new item you would use the mix skill."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-concoct_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Cook": {
				"name": "Skill_Cook", "fieldName": "cook", "group": "Skill", "description": "", "variable": "skl-cook{0}", "title": "Cook", "subGroup": "Creation Skill", "descriptions": ["Cook allows one to create food and drinks from ingredients. Food is an important fuel to sustain life but also well made food improves mood and allows one to push themselves."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-cook_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Deception": {
				"name": "Skill_Deception", "fieldName": "deception", "group": "Skill", "description": "", "variable": "skl-deception{0}", "title": "Deception", "subGroup": "Social Skill", "descriptions": ["Deception is the skill of telling convincing lies, as well as feigning emotion, belief, or frame of mind. Deception can encompass everything from misleading others through ambiguity to telling outright lies. This skill is also used to convince others of a disguise. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-deception_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Demoralize": {
				"name": "Skill_Demoralize", "fieldName": "demoralize", "group": "Skill", "description": "", "variable": "skl-demoralize{0}", "title": "Demoralize", "subGroup": "Social Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-demoralize_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Disguise": {
				"name": "Skill_Disguise", "fieldName": "disguise", "group": "Skill", "description": "", "variable": "skl-disguise{0}", "title": "Disguise", "subGroup": "Creation Skill", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-disguise_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Empathy": {
				"name": "Skill_Empathy", "fieldName": "empathy", "group": "Skill", "description": "", "variable": "skl-empathy{0}", "title": "Empathy", "subGroup": "Sensing Skill", "descriptions": ["Empathy is used to sense both feelings in other creatures and any existing mana or ether in the environment. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-empathy_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Enchant": {
				"name": "Skill_Enchant", "fieldName": "enchant", "group": "Skill", "description": "", "variable": "skl-enchant{0}", "title": "Enchant", "subGroup": "Manipulate Skill", "descriptions": ["Enchant is the skill to control ones own ether and impart it into another person or object. This is the basis for techniques like healing and empowerment magic."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-enchant_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Finesse": {
				"name": "Skill_Finesse", "fieldName": "finesse", "group": "Skill", "description": "", "variable": "skl-finesse{0}", "title": "Finesse", "subGroup": "Combat Skill", "descriptions": ["Finesse is used to strike with light and nimble weapons such as daggers, shortswords, and rapiers. Those that use finesse weapons will often fight deftly, exploiting weaknesses in an enemy's defenses. Weapons in this group are typically easy to hide and allow their wielders to exploit a brace vulnerability. Techniques that support this skill will often grant more mobility options to a character."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-finesse_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Flexibility": {
				"name": "Skill_Flexibility", "fieldName": "flexibility", "group": "Skill", "description": "", "variable": "skl-flexibility{0}", "title": "Flexibility", "subGroup": " Skill", "descriptions": ["Your flexibility check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-flexibility_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Grappling": {
				"name": "Skill_Grappling", "fieldName": "grappling", "group": "Skill", "description": "", "variable": "skl-grappling{0}", "title": "Grappling", "subGroup": "Combat Skill", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-grappling_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Heal": {
				"name": "Skill_Heal", "fieldName": "heal", "group": "Skill", "description": "", "variable": "skl-heal{0}", "title": "Heal", "subGroup": " Skill", "descriptions": ["Heal is used to perform medical procedures such as administering drugs, performing first aid, and conducting surgeries. It includes long-term medical support for disease and illness, and the skill can be used to diagnose a character’s medical condition."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-heal_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Inspire": {
				"name": "Skill_Inspire", "fieldName": "inspire", "group": "Skill", "description": "", "variable": "skl-inspire{0}", "title": "Inspire", "subGroup": "Social Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-inspire_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Intimidation": {
				"name": "Skill_Intimidation", "fieldName": "intimidation", "group": "Skill", "description": "", "variable": "skl-intimidation{0}", "title": "Intimidation", "subGroup": " Skill", "descriptions": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make an Intimidation check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision. When intimidating others you target their resolve."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-intimidation_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Leadership": {
				"name": "Skill_Leadership", "fieldName": "leadership", "group": "Skill", "description": "", "variable": "skl-leadership{0}", "title": "Leadership", "subGroup": " Skill", "descriptions": ["Leadership is the ability to direct and motivate others. This skill is especially helpful in situations where the will of a teammate is shaken or someone is being asked to do something uncomfortable."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-leadership_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Maneuver": {
				"name": "Skill_Maneuver", "fieldName": "maneuver", "group": "Skill", "description": "", "variable": "skl-maneuver{0}", "title": "Maneuver", "subGroup": " Skill", "descriptions": ["Maneuvers govern techniques that allow you to move or manipulate another creature into a new position or state."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "skl-maneuver_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Medicine": {
				"name": "Skill_Medicine", "fieldName": "medicine", "group": "Skill", "description": "", "variable": "skl-medicine{0}", "title": "Medicine", "subGroup": "Creation Skill", "descriptions": ["Medicine is the skill to create and administer drugs for yourself and others. Drugs are often used both to quickly provide a temporary boost to another and to administer long term care for another."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-medicine_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Might": {
				"name": "Skill_Might", "fieldName": "might", "group": "Skill", "description": "", "variable": "skl-might{0}", "title": "Might", "subGroup": "Combat Skill", "descriptions": ["This skill allows one to attack with brute strength while wielding heavy and cumbersome weapons. These weapons support large damage values allowing their wielders to smash through their enemies. Weapons in this group often will pierce through armor or exploit a reflex vulnerability. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-might_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Negotiation": {
				"name": "Skill_Negotiation", "fieldName": "negotiation", "group": "Skill", "description": "", "variable": "skl-negotiation{0}", "title": "Negotiation", "subGroup": "Social Skill", "descriptions": ["Negotiation governs a character’s ability to apply their charisma, tactics, and knowledge of situational psychology in order to create a better position when making deals."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_RSN", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-negotiation_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Palming": {
				"name": "Skill_Palming", "fieldName": "palming", "group": "Skill", "description": "", "variable": "skl-palming{0}", "title": "Palming", "subGroup": "Manipulate Skill", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-palming_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Physique": {
				"name": "Skill_Physique", "fieldName": "physique", "group": "Skill", "description": "", "variable": "skl-physique{0}", "title": "Physique", "subGroup": "Athletics Skill", "descriptions": ["The Physique skill represents a character’s raw strength and endurance. It is used when using physical strength to break through objects and restraints or when attempting to lift things beyond your carrying capacity."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-physique_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Pilot": {
				"name": "Skill_Pilot", "fieldName": "pilot", "group": "Skill", "description": "", "variable": "skl-pilot{0}", "title": "Pilot", "subGroup": "Manipulate Skill", "descriptions": ["When attempting to drive a vehicle of any kind, the pilot skill often governs most checks. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_QCK", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-pilot_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Resonance": {
				"name": "Skill_Resonance", "fieldName": "resonance", "group": "Skill", "description": "", "variable": "skl-resonance{0}", "title": "Resonance", "subGroup": "Sensing Skill", "descriptions": ["Resonance is the ability to detect and release ether. It is most often used to detect magical structures and as communication with spirits. Less commonly, it can be used to destroy magical effects and structures made from ether that hasn't been permanently bound."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_CNV", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-resonance_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Search": {
				"name": "Skill_Search", "fieldName": "search", "group": "Skill", "description": "", "variable": "skl-search{0}", "title": "Search", "subGroup": "Sensing Skill", "descriptions": ["This is used to actively search for for clues or anything out of sorts. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_INT", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-search_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Shoot": {
				"name": "Skill_Shoot", "fieldName": "shoot", "group": "Skill", "description": "", "variable": "skl-shoot{0}", "title": "Shoot", "subGroup": "Combat Skill", "descriptions": ["The skill of using a bow or firearm. These weapons have the most variety in weapon ranges allowing one to reliably attack from a distance. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-shoot_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Skirmish": {
				"name": "Skill_Skirmish", "fieldName": "skirmish", "group": "Skill", "description": "", "variable": "skl-skirmish{0}", "title": "Skirmish", "subGroup": "Combat Skill", "descriptions": ["This skill governs most balanced, close range fighting styles such as with longswords, clubs, and polearms. Weapons in this category offer the most variety of technique options to manipulate the battlefield to their favor. Unique to this group are weapons that can exploit both reflex and brace vulnerabilities."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-skirmish_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Sneak": {
				"name": "Skill_Sneak", "fieldName": "sneak", "group": "Skill", "description": "", "variable": "skl-sneak{0}", "title": "Sneak", "subGroup": "Athletics Skill", "descriptions": ["Make a Sneak check when you attempt to conceal yourself from enemies, palm an object, slink past guards, slip away without being noticed, or sneak up on some one without being seen or heard. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-sneak_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Survival": {
				"name": "Skill_Survival", "fieldName": "survival", "group": "Skill", "description": "", "variable": "skl-survival{0}", "title": "Survival", "subGroup": "Sensing Skill", "descriptions": ["Survival is the ability to stay alive in ex- treme environmental conditions for extended periods of time. The skill governs a character’s ability to per- form vital outdoor tasks such as start a fire, build a shel- ter, scrounge for food, etc."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-survival_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Throw": {
				"name": "Skill_Throw", "fieldName": "throw", "group": "Skill", "description": "", "variable": "skl-throw{0}", "title": "Throw", "subGroup": "Manipulate Skill", "descriptions": ["When one strikes at a foe or aims for a location by throwing an object, it is typical to use the throw skill. Many melee weapons will have a range increment. In order to use this range the user will instead use the Throw skill to determine accuracy."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-throw_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Tinker": {
				"name": "Skill_Tinker", "fieldName": "tinker", "group": "Skill", "description": "", "variable": "skl-tinker{0}", "title": "Tinker", "subGroup": "Manipulate Skill", "descriptions": ["This skill covers building, repairing, and disabling mechanical devices such as locks, tools, and machinery."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_PRC", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-tinker_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Skill_Traversal": {
				"name": "Skill_Traversal", "fieldName": "traversal", "group": "Skill", "description": "", "variable": "skl-traversal{0}", "title": "Traversal", "subGroup": "Athletics Skill", "descriptions": ["Your traversal check covers movement through an environment such as when climbing, jumping, or swimming."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "", "definitionName": "Attribute_BOD", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "skl-traversal_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lang_Minere": {
				"name": "Lang_Minere", "fieldName": "lang_minere", "group": "Language", "description": "", "variable": "lng-minere{0}", "title": "Minere", "subGroup": "Walthair", "descriptions": ["The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Junal": {
				"name": "Lang_Junal", "fieldName": "lang_junal", "group": "Language", "description": "", "variable": "lng-junal{0}", "title": "Junal", "subGroup": "Aridsha", "descriptions": ["Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Apollen": {
				"name": "Lang_Apollen", "fieldName": "lang_apollen", "group": "Language", "description": "", "variable": "lng-apollen{0}", "title": "Apollen", "subGroup": "Khem", "descriptions": ["The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Lib": {
				"name": "Lang_Lib", "fieldName": "lang_lib", "group": "Language", "description": "", "variable": "lng-lib{0}", "title": "Lib", "subGroup": "Colswei", "descriptions": ["This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Cert": {
				"name": "Lang_Cert", "fieldName": "lang_cert", "group": "Language", "description": "", "variable": "lng-cert{0}", "title": "Cert", "subGroup": "Ceres", "descriptions": ["The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Common"
			},
			"Lang_Byric": {
				"name": "Lang_Byric", "fieldName": "lang_byric", "group": "Language", "description": "", "variable": "lng-byric{0}", "title": "Byric", "subGroup": "Aridsha", "descriptions": ["The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Baryan Ascent"
			},
			"Lang_Dustell": {
				"name": "Lang_Dustell", "fieldName": "lang_dustell", "group": "Language", "description": "", "variable": "lng-dustell{0}", "title": "Dustell", "subGroup": "Aridsha", "descriptions": ["This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Aridsha"
			},
			"Lang_Muralic": {
				"name": "Lang_Muralic", "fieldName": "lang_muralic", "group": "Language", "description": "", "variable": "lng-muralic{0}", "title": "Muralic", "subGroup": "Aridsha", "descriptions": ["The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Aridsha"
			},
			"Lang_Shira": {
				"name": "Lang_Shira", "fieldName": "lang_shira", "group": "Language", "description": "", "variable": "lng-shira{0}", "title": "Shira", "subGroup": "Aridsha", "descriptions": ["An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Ciel": {
				"name": "Lang_Ciel", "fieldName": "lang_ciel", "group": "Language", "description": "", "variable": "lng-ciel{0}", "title": "Ciel", "subGroup": "Ceres", "descriptions": ["This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Capitol"
			},
			"Lang_Citeq": {
				"name": "Lang_Citeq", "fieldName": "lang_citeq", "group": "Language", "description": "", "variable": "lng-citeq{0}", "title": "Citeq", "subGroup": "Ceres", "descriptions": ["A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "South West Ceres"
			},
			"Lang_Manstan": {
				"name": "Lang_Manstan", "fieldName": "lang_manstan", "group": "Language", "description": "", "variable": "lng-manstan{0}", "title": "Manstan", "subGroup": "Ceres", "descriptions": ["The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Southern Ceres"
			},
			"Lang_Salkan": {
				"name": "Lang_Salkan", "fieldName": "lang_salkan", "group": "Language", "description": "", "variable": "lng-salkan{0}", "title": "Salkan", "subGroup": "Ceres", "descriptions": ["An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "North West Ceres"
			},
			"Lang_Sansic": {
				"name": "Lang_Sansic", "fieldName": "lang_sansic", "group": "Language", "description": "", "variable": "lng-sansic{0}", "title": "Sansic", "subGroup": "Ceres", "descriptions": ["The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Eastern Ceres"
			},
			"Lang_Silq": {
				"name": "Lang_Silq", "fieldName": "lang_silq", "group": "Language", "description": "", "variable": "lng-silq{0}", "title": "Silq", "subGroup": "Ceres", "descriptions": ["The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Western Ceres"
			},
			"Lang_Kleikan": {
				"name": "Lang_Kleikan", "fieldName": "lang_kleikan", "group": "Language", "description": "", "variable": "lng-kleikan{0}", "title": "Kleikan", "subGroup": "Khem", "descriptions": ["This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Klef"
			},
			"Lang_Crinere": {
				"name": "Lang_Crinere", "fieldName": "lang_crinere", "group": "Language", "description": "", "variable": "lng-crinere{0}", "title": "Crinere", "subGroup": "Walthair", "descriptions": ["The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Palmic": {
				"name": "Lang_Palmic", "fieldName": "lang_palmic", "group": "Language", "description": "", "variable": "lng-palmic{0}", "title": "Palmic", "subGroup": "Walthair", "descriptions": ["This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Tropical Seas"
			},
			"Lang_Shorespeak": {
				"name": "Lang_Shorespeak", "fieldName": "lang_shorespeak", "group": "Language", "description": "", "variable": "lng-shorespeak{0}", "title": "Shorespeak", "subGroup": "Walthair", "descriptions": ["A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "East Sea"
			},
			"Lang_Verdeni": {
				"name": "Lang_Verdeni", "fieldName": "lang_verdeni", "group": "Language", "description": "", "variable": "lng-verdeni{0}", "title": "Verdeni", "subGroup": "Walthair", "descriptions": ["The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Verdant Key"
			},
			"Lang_Vulca": {
				"name": "Lang_Vulca", "fieldName": "lang_vulca", "group": "Language", "description": "", "variable": "lng-vulca{0}", "title": "Vulca", "subGroup": "Walthair", "descriptions": ["The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Emotion": {
				"name": "Lang_Emotion", "fieldName": "lang_emotion", "group": "Language", "description": "", "variable": "lng-emotion{0}", "title": "Emotion", "subGroup": "Special", "descriptions": ["The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Spirit"
			},
			"Lang_Empathy": {
				"name": "Lang_Empathy", "fieldName": "lang_empathy", "group": "Language", "description": "", "variable": "lng-empathy{0}", "title": "Empathy", "subGroup": "Special", "descriptions": ["A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient Spirit"
			},
			"Lang_Wolfwarg": {
				"name": "Lang_Wolfwarg", "fieldName": "lang_wolfwarg", "group": "Language", "description": "", "variable": "lng-wolfwarg{0}", "title": "Wolfwarg", "subGroup": "Special", "descriptions": ["The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Cesplangrah"
			},
			"Lang_Jovean": {
				"name": "Lang_Jovean", "fieldName": "lang_jovean", "group": "Language", "description": "", "variable": "lng-jovean{0}", "title": "Jovean", "subGroup": "Special", "descriptions": ["The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"Lang_Mytikan": {
				"name": "Lang_Mytikan", "fieldName": "lang_mytikan", "group": "Language", "description": "", "variable": "lng-mytikan{0}", "title": "Mytikan", "subGroup": "Special", "descriptions": ["The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [] },
				"linkedGroups": [],
				"isResource": "", "location": "Ancient"
			},
			"LoreCat_Academics": {
				"name": "LoreCat_Academics", "fieldName": "academics", "group": "LoreCategory", "description": "", "variable": "lrc-academics{0}", "title": "Academics", "subGroup": "Academics", "descriptions": ["This represents general education for academic study for the purposes of functioning in modern society."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-academics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Health": {
				"name": "Lore_Health", "fieldName": "health", "group": "Lore", "description": "", "variable": "lor-health{0}", "title": "Health", "subGroup": "Academics", "descriptions": ["This covers the study of human physiology and health."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-health_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mana": {
				"name": "Lore_Mana", "fieldName": "mana", "group": "Lore", "description": "", "variable": "lor-mana{0}", "title": "Mana", "subGroup": "Academics", "descriptions": ["The study of ki, ether, and magic. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mana_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mathematics": {
				"name": "Lore_Mathematics", "fieldName": "mathematics", "group": "Lore", "description": "", "variable": "lor-mathematics{0}", "title": "Mathematics", "subGroup": "Academics", "descriptions": ["Mathematics knowledge represents an understanding of math and calculations."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mathematics_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Nature": {
				"name": "Lore_Nature", "fieldName": "nature", "group": "Lore", "description": "", "variable": "lor-nature{0}", "title": "Nature", "subGroup": "Academics", "descriptions": ["Nature knowledge grants an understanding of various types of plant life and their uses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-nature_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_School": {
				"name": "Lore_School", "fieldName": "school", "group": "Lore", "description": "", "variable": "lor-school{0}", "title": "School", "subGroup": "Academics", "descriptions": ["This knowledge represents information related to schools, famous educators, and forms of education used in the lands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-school_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Spirit": {
				"name": "Lore_Spirit", "fieldName": "spirit", "group": "Lore", "description": "", "variable": "lor-spirit{0}", "title": "Spirit", "subGroup": "Academics", "descriptions": ["Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-spirit_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Warfare": {
				"name": "Lore_Warfare", "fieldName": "warfare", "group": "Lore", "description": "", "variable": "lor-warfare{0}", "title": "Warfare", "subGroup": "Academics", "descriptions": ["Warfare knowledge covers various tactics used in war and the management of an army."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-warfare_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Zoology": {
				"name": "Lore_Zoology", "fieldName": "zoology", "group": "Lore", "description": "", "variable": "lor-zoology{0}", "title": "Zoology", "subGroup": "Academics", "descriptions": ["This knowledge represents physiological knowledge of living creatures of the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-zoology_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Profession": {
				"name": "LoreCat_Profession", "fieldName": "profession", "group": "LoreCategory", "description": "", "variable": "lrc-profession{0}", "title": "Profession", "subGroup": "Profession", "descriptions": ["Profession is the general knowledge of any kind of job, what they do, and how it is performed."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-profession_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Farming": {
				"name": "Lore_Farming", "fieldName": "farming", "group": "Lore", "description": "", "variable": "lor-farming{0}", "title": "Farming", "subGroup": "Profession", "descriptions": ["Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food"],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-farming_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Fishing": {
				"name": "Lore_Fishing", "fieldName": "fishing", "group": "Lore", "description": "", "variable": "lor-fishing{0}", "title": "Fishing", "subGroup": "Profession", "descriptions": ["Fishing knowledge covers all aspects of fishing."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-fishing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Hunting": {
				"name": "Lore_Hunting", "fieldName": "hunting", "group": "Lore", "description": "", "variable": "lor-hunting{0}", "title": "Hunting", "subGroup": "Profession", "descriptions": ["Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-hunting_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Legal": {
				"name": "Lore_Legal", "fieldName": "legal", "group": "Lore", "description": "", "variable": "lor-legal{0}", "title": "Legal", "subGroup": "Profession", "descriptions": ["Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-legal_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mercantile": {
				"name": "Lore_Mercantile", "fieldName": "mercantile", "group": "Lore", "description": "", "variable": "lor-mercantile{0}", "title": "Mercantile", "subGroup": "Profession", "descriptions": ["Mercantile knowledge grants wisdom related to the buying and selling of goods."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mercantile_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Mining": {
				"name": "Lore_Mining", "fieldName": "mining", "group": "Lore", "description": "", "variable": "lor-mining{0}", "title": "Mining", "subGroup": "Profession", "descriptions": ["Mining knowledge represents information related to breaking apart rock for material."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-mining_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Craftmanship": {
				"name": "LoreCat_Craftmanship", "fieldName": "craftmanship", "group": "LoreCategory", "description": "", "variable": "lrc-craftmanship{0}", "title": "Craftmanship", "subGroup": "Craftmanship", "descriptions": ["The knowledge of creating items through manipulation of substances and materials. A knowledge check here will help one identify techniques used to create an object but not necessarily how to recreate it."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-craftmanship_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Alchemy": {
				"name": "Lore_Alchemy", "fieldName": "alchemy", "group": "Lore", "description": "", "variable": "lor-alchemy{0}", "title": "Alchemy", "subGroup": "Craftmanship", "descriptions": ["Alchemy is the science of substances and how they can change. When working with chemicals and material that on their own should not be consumed, Alchemy will typically apply. Alchemy is typically used in the creation of drugs and substances."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-alchemy_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Architecture": {
				"name": "Lore_Architecture", "fieldName": "architecture", "group": "Lore", "description": "", "variable": "lor-architecture{0}", "title": "Architecture", "subGroup": "Craftmanship", "descriptions": ["This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-architecture_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Brewing": {
				"name": "Lore_Brewing", "fieldName": "brewing", "group": "Lore", "description": "", "variable": "lor-brewing{0}", "title": "Brewing", "subGroup": "Craftmanship", "descriptions": ["Brewing is the skill that governs any kind of skill the requires the mixing of ingredients into a drink or broth."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-brewing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Cooking": {
				"name": "Lore_Cooking", "fieldName": "cooking", "group": "Lore", "description": "", "variable": "lor-cooking{0}", "title": "Cooking", "subGroup": "Craftmanship", "descriptions": ["Food is important for survival, so making it enjoyable is a craft of great appreciation. Cooking knowledge gives you the knowledge of different cooking techniques to create meals."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-cooking_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Engineering": {
				"name": "Lore_Engineering", "fieldName": "engineering", "group": "Lore", "description": "", "variable": "lor-engineering{0}", "title": "Engineering", "subGroup": "Craftmanship", "descriptions": ["Engineering knowledge represents an understanding of mechanisms and systems to build complex structures and items."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-engineering_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Glassblowing": {
				"name": "Lore_Glassblowing", "fieldName": "glassblowing", "group": "Lore", "description": "", "variable": "lor-glassblowing{0}", "title": "Glassblowing", "subGroup": "Craftmanship", "descriptions": ["When working with and shaping glass, the skill of glassblowing is required."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-glassblowing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Leatherworking": {
				"name": "Lore_Leatherworking", "fieldName": "leatherworking", "group": "Lore", "description": "", "variable": "lor-leatherworking{0}", "title": "Leatherworking", "subGroup": "Craftmanship", "descriptions": ["Leatherworking entails any skills related to skinning and using animal skins for clothing, and items. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-leatherworking_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Sculpting": {
				"name": "Lore_Sculpting", "fieldName": "sculpting", "group": "Lore", "description": "", "variable": "lor-sculpting{0}", "title": "Sculpting", "subGroup": "Craftmanship", "descriptions": ["Sculpting allows one to use soft material like clay and shape it into a desired form."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-sculpting_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Smithing": {
				"name": "Lore_Smithing", "fieldName": "smithing", "group": "Lore", "description": "", "variable": "lor-smithing{0}", "title": "Smithing", "subGroup": "Craftmanship", "descriptions": ["Smithing is the skill that allows you to shape various materials, usually metal, into tools of combat or other larger metalic items. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-smithing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Weaving": {
				"name": "Lore_Weaving", "fieldName": "weaving", "group": "Lore", "description": "", "variable": "lor-weaving{0}", "title": "Weaving", "subGroup": "Craftmanship", "descriptions": ["Weaving is the skill for putting together and shaping fabrics and cloths into useful material and objects."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-weaving_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Geography": {
				"name": "LoreCat_Geography", "fieldName": "geography", "group": "LoreCategory", "description": "", "variable": "lrc-geography{0}", "title": "Geography", "subGroup": "Geography", "descriptions": ["Geography represents general knowledge of terrains and locations within an area."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-geography_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": ""
			},
			"Lore_Aridsha": {
				"name": "Lore_Aridsha", "fieldName": "aridsha", "group": "Lore", "description": "", "variable": "lor-aridsha{0}", "title": "Aridsha", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-aridsha_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ceres": {
				"name": "Lore_Ceres", "fieldName": "ceres", "group": "Lore", "description": "", "variable": "lor-ceres{0}", "title": "Ceres", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ceres_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Colswei": {
				"name": "Lore_Colswei", "fieldName": "colswei", "group": "Lore", "description": "", "variable": "lor-colswei{0}", "title": "Colswei", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-colswei_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Khem": {
				"name": "Lore_Khem", "fieldName": "khem", "group": "Lore", "description": "", "variable": "lor-khem{0}", "title": "Khem", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-khem_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Novus": {
				"name": "Lore_Novus", "fieldName": "novus", "group": "Lore", "description": "", "variable": "lor-novus{0}", "title": "Novus", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-novus_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Walthair": {
				"name": "Lore_Walthair", "fieldName": "walthair", "group": "Lore", "description": "", "variable": "lor-walthair{0}", "title": "Walthair", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-walthair_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Wayling": {
				"name": "Lore_Wayling", "fieldName": "wayling", "group": "Lore", "description": "", "variable": "lor-wayling{0}", "title": "Wayling", "subGroup": "Geography", "descriptions": ["This check represents geographical knowledge of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-wayling_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ethereal Plane": {
				"name": "Lore_Ethereal Plane", "fieldName": "ethereal_plane", "group": "Lore", "description": "", "variable": "lor-ethereal_plane{0}", "title": "Ethereal Plane", "subGroup": "Geography", "descriptions": ["Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ethereal_plane_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_History": {
				"name": "LoreCat_History", "fieldName": "history", "group": "LoreCategory", "description": "", "variable": "lrc-history{0}", "title": "History", "subGroup": "History", "descriptions": ["History knowledges represent known history of civilizations and any legends that may exist."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Aridsha History": {
				"name": "Lore_Aridsha History", "fieldName": "aridsha_history", "group": "Lore", "description": "", "variable": "lor-aridsha_history{0}", "title": "Aridsha History", "subGroup": "History", "descriptions": ["This check represents history of Juno and the Aridsha desert region to the west. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-aridsha_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ceres History": {
				"name": "Lore_Ceres History", "fieldName": "ceres_history", "group": "Lore", "description": "", "variable": "lor-ceres_history{0}", "title": "Ceres History", "subGroup": "History", "descriptions": ["This check represents history of Capitol City and the Ceres plains to the north."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ceres_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Colswei History": {
				"name": "Lore_Colswei History", "fieldName": "colswei_history", "group": "Lore", "description": "", "variable": "lor-colswei_history{0}", "title": "Colswei History", "subGroup": "History", "descriptions": ["This check represents history of Liber and the frozen lands of the Colswei in the south."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-colswei_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Khem History": {
				"name": "Lore_Khem History", "fieldName": "khem_history", "group": "Lore", "description": "", "variable": "lor-khem_history{0}", "title": "Khem History", "subGroup": "History", "descriptions": ["This check represents history of the Kingdom of Apollo and its mountainous region of Khem to the north east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-khem_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Novus History": {
				"name": "Lore_Novus History", "fieldName": "novus_history", "group": "Lore", "description": "", "variable": "lor-novus_history{0}", "title": "Novus History", "subGroup": "History", "descriptions": ["This check represents history of Novus and the Blessed Lands beyond the ocean."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-novus_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Walthair History": {
				"name": "Lore_Walthair History", "fieldName": "walthair_history", "group": "Lore", "description": "", "variable": "lor-walthair_history{0}", "title": "Walthair History", "subGroup": "History", "descriptions": ["This check represents history of Minerva and the grasslands and eastern sea islands of Walthair to the east."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-walthair_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Wayling History": {
				"name": "Lore_Wayling History", "fieldName": "wayling_history", "group": "Lore", "description": "", "variable": "lor-wayling_history{0}", "title": "Wayling History", "subGroup": "History", "descriptions": ["This check represents history of the central grasslands and marsh of Wayling."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-wayling_history_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Culture": {
				"name": "LoreCat_Culture", "fieldName": "culture", "group": "LoreCategory", "description": "", "variable": "lrc-culture{0}", "title": "Culture", "subGroup": "Culture", "descriptions": ["Culture knowledge represents information on societal customs, art, and entertainment options."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-culture_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Art": {
				"name": "Lore_Art", "fieldName": "art", "group": "Lore", "description": "", "variable": "lor-art{0}", "title": "Art", "subGroup": "Culture", "descriptions": ["Art knowledge details information on the world of art and the artists behind famous works of art."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-art_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Etiquette": {
				"name": "Lore_Etiquette", "fieldName": "etiquette", "group": "Lore", "description": "", "variable": "lor-etiquette{0}", "title": "Etiquette", "subGroup": "Culture", "descriptions": ["Etiquette knowledge represents your study of social customs within specific cultures and societies and will help you avoid embarrassing yourself or causing insult."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-etiquette_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Fashion": {
				"name": "Lore_Fashion", "fieldName": "fashion", "group": "Lore", "description": "", "variable": "lor-fashion{0}", "title": "Fashion", "subGroup": "Culture", "descriptions": ["Fashion knowledge focuses on keeping up with clothing and physical beatuy products."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-fashion_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Games": {
				"name": "Lore_Games", "fieldName": "games", "group": "Lore", "description": "", "variable": "lor-games{0}", "title": "Games", "subGroup": "Culture", "descriptions": ["Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-games_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Music": {
				"name": "Lore_Music", "fieldName": "music", "group": "Lore", "description": "", "variable": "lor-music{0}", "title": "Music", "subGroup": "Culture", "descriptions": ["Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-music_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Scribing": {
				"name": "Lore_Scribing", "fieldName": "scribing", "group": "Lore", "description": "", "variable": "lor-scribing{0}", "title": "Scribing", "subGroup": "Culture", "descriptions": ["Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-scribing_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Theater": {
				"name": "Lore_Theater", "fieldName": "theater", "group": "Lore", "description": "", "variable": "lor-theater{0}", "title": "Theater", "subGroup": "Culture", "descriptions": ["Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-theater_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"LoreCat_Religion": {
				"name": "LoreCat_Religion", "fieldName": "religion", "group": "LoreCategory", "description": "", "variable": "lrc-religion{0}", "title": "Religion", "subGroup": "Religion", "descriptions": ["Religion knowledge represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lrc-religion_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Church of Kongkwei": {
				"name": "Lore_Church of Kongkwei", "fieldName": "church_of_kongkwei", "group": "Lore", "description": "", "variable": "lor-church_of_kongkwei{0}", "title": "Church of Kongkwei", "subGroup": "Religion", "descriptions": ["The Church of Kongkwei is tied to the creation of the Kingdom of Apollo. It follows the fire god Guong Kongkwei and attempts to follow their goals of expansion and control."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-church_of_kongkwei_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Guidance": {
				"name": "Lore_Guidance", "fieldName": "guidance", "group": "Lore", "description": "", "variable": "lor-guidance{0}", "title": "Guidance", "subGroup": "Religion", "descriptions": ["The Guidance is one of the oldest religions in the world of Wuxing. They seek to give its people advice in times of hardship through the divinations of spirits."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-guidance_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Life's Circle": {
				"name": "Lore_Life's Circle", "fieldName": "life's_circle", "group": "Lore", "description": "", "variable": "lor-life's_circle{0}", "title": "Life's Circle", "subGroup": "Religion", "descriptions": ["The Life's Circle is the religion of the Novae. It follows the cycle of life and helps determine a person's role in society through reincarnation and destiny."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-life's_circle_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Ocean Court": {
				"name": "Lore_Ocean Court", "fieldName": "ocean_court", "group": "Lore", "description": "", "variable": "lor-ocean_court{0}", "title": "Ocean Court", "subGroup": "Religion", "descriptions": ["The Ocean Court follows the Ocean Queen, Minerra, and her court of gods that ensure her commandments are followed. Those that revere her and her court do so for her protection and luck whether its in her domain at sea or deep in the lands."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-ocean_court_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Sylvan": {
				"name": "Lore_Sylvan", "fieldName": "sylvan", "group": "Lore", "description": "", "variable": "lor-sylvan{0}", "title": "Sylvan", "subGroup": "Religion", "descriptions": ["The Sylvans are a group of powerful spirits that hold dominion over territories across the world. They are creatures of whimsy and chaos, the cause of weather patterns and together, the changing of the seasons."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-sylvan_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Lore_Zushaon": {
				"name": "Lore_Zushaon", "fieldName": "zushaon", "group": "Lore", "description": "", "variable": "lor-zushaon{0}", "title": "Zushaon", "subGroup": "Religion", "descriptions": ["Many Ceresians follow Zushaon, a tradition of ancestor worship. The religion seeks to offer reverence for those that came before and a desire to find ones own place in the world."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "gen-recall", "definitionName": "Recall", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "lor-zushaon_rank", "definitionName": "", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": ""
			},
			"Job_Interceptor": {
				"name": "Job_Interceptor", "fieldName": "job_interceptor", "group": "Job", "description": "", "variable": "job-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Finesse"
			},
			"Job_Guardian": {
				"name": "Job_Guardian", "fieldName": "job_guardian", "group": "Job", "description": "", "variable": "job-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Might"
			},
			"Job_Spellslinger": {
				"name": "Job_Spellslinger", "fieldName": "job_spellslinger", "group": "Job", "description": "", "variable": "job-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Shoot"
			},
			"Job_Warrior": {
				"name": "Job_Warrior", "fieldName": "job_warrior", "group": "Job", "description": "", "variable": "job-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Skirmish"
			},
			"Job_Rogue": {
				"name": "Job_Rogue", "fieldName": "job_rogue", "group": "Job", "description": "", "variable": "job-rogue{0}", "title": "Rogue", "subGroup": "Athletics", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Stealth"
			},
			"Job_Scholar": {
				"name": "Job_Scholar", "fieldName": "job_scholar", "group": "Job", "description": "", "variable": "job-scholar{0}", "title": "Scholar", "subGroup": "Focus", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Analyze"
			},
			"Job_Physician": {
				"name": "Job_Physician", "fieldName": "job_physician", "group": "Job", "description": "", "variable": "job-physician{0}", "title": "Physician", "subGroup": "Technical", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "adv-ap_job", "definitionName": "AdvancementJob", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "requirements": "Heal"
			},
			"JStyle_Interceptor": {
				"name": "JStyle_Interceptor", "fieldName": "jstyle_interceptor", "group": "JobStyle", "description": "", "variable": "jbs-interceptor{0}", "title": "Interceptor", "subGroup": "", "descriptions": ["The interceptor is an expert in disrupting others. Prefering weapons with increased threat, interceptors protect their allies by stopping the movement of advancing enemies."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Finesse"
			},
			"JStyle_Guardian": {
				"name": "JStyle_Guardian", "fieldName": "jstyle_guardian", "group": "JobStyle", "description": "", "variable": "jbs-guardian{0}", "title": "Guardian", "subGroup": "", "descriptions": ["The guardian is always on the lookout for their allies. When danger approaches, guardians specialize at getting their allies out of the line of fire. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Might"
			},
			"JStyle_Spellslinger": {
				"name": "JStyle_Spellslinger", "fieldName": "jstyle_spellslinger", "group": "JobStyle", "description": "", "variable": "jbs-spellslinger{0}", "title": "Spellslinger", "subGroup": "", "descriptions": ["The spellslinger is an expert longshot in both ranged weapons and spells. With their Spellshot technique, they use their ranged weapons to launch explosive spells from safety."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Shoot"
			},
			"JStyle_Warrior": {
				"name": "JStyle_Warrior", "fieldName": "jstyle_warrior", "group": "JobStyle", "description": "", "variable": "jbs-warrior{0}", "title": "Warrior", "subGroup": "", "descriptions": ["The fighter is about survival. This battle hardened warrior will keep himself from falling through many means to self-heal, aid, and even shrug off wounds. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Skirmish"
			},
			"JStyle_Rogue": {
				"name": "JStyle_Rogue", "fieldName": "jstyle_rogue", "group": "JobStyle", "description": "", "variable": "jbs-rogue{0}", "title": "Rogue", "subGroup": "Athletics", "descriptions": ["The rogue is an expert at exploiting distractions. They can exploit enemy weaknesses with their sneak attack, both on their turn and during follow-up attacks. "],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Stealth"
			},
			"JStyle_Scholar": {
				"name": "JStyle_Scholar", "fieldName": "jstyle_scholar", "group": "JobStyle", "description": "", "variable": "jbs-scholar{0}", "title": "Scholar", "subGroup": "Focus", "descriptions": ["The scholar is an expert in history and uses it to always be prepared. In addition to history, scholars are typically knowledgable in a broad array of subjects and will sometimes use it to educate others. In combat, a scholar will use their preparedness to avoid bad situations and help their allies avoid them too."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Analyze"
			},
			"JStyle_Physician": {
				"name": "JStyle_Physician", "fieldName": "jstyle_physician", "group": "JobStyle", "description": "", "variable": "jbs-physician{0}", "title": "Physician", "subGroup": "Technical", "descriptions": ["The physician is a medical practitioner and expert healer. Their Emergency Care allows them to heal allies and provide them with barrier, eventually allowing them to heal wounds. And if faster healing is necessary, their First aid allows them to perform healing as a Quick action."],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": { "workers": [{ "variableName": "", "definitionName": "", "value": 1, "multiplier": 1, "max": 0 }] },
				"linkedGroups": [],
				"isResource": "", "requirements": "Heal"
			},
			"Tech_Hide": {
				"name": "Tech_Hide", "fieldName": "tech_hide", "group": "Technique", "description": "", "variable": "tch-hide{0}", "title": "Hide", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Mount": {
				"name": "Tech_Mount", "fieldName": "tech_mount", "group": "Technique", "description": "", "variable": "tch-mount{0}", "title": "Mount", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Prepare": {
				"name": "Tech_Prepare", "fieldName": "tech_prepare", "group": "Technique", "description": "", "variable": "tch-prepare{0}", "title": "Prepare", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Seach": {
				"name": "Tech_Seach", "fieldName": "tech_seach", "group": "Technique", "description": "", "variable": "tch-seach{0}", "title": "Seach", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skill Check": {
				"name": "Tech_Skill Check", "fieldName": "tech_skill_check", "group": "Technique", "description": "", "variable": "tch-skill_check{0}", "title": "Skill Check", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Grab an Edge": {
				"name": "Tech_Grab an Edge", "fieldName": "tech_grab_an_edge", "group": "Technique", "description": "", "variable": "tch-grab_an_edge{0}", "title": "Grab an Edge", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Interact": {
				"name": "Tech_Interact", "fieldName": "tech_interact", "group": "Technique", "description": "", "variable": "tch-interact{0}", "title": "Interact", "subGroup": "Basic Action", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Break Free": {
				"name": "Tech_Break Free", "fieldName": "tech_break_free", "group": "Technique", "description": "", "variable": "tch-break_free{0}", "title": "Break Free", "subGroup": "Basic Movement", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dash": {
				"name": "Tech_Dash", "fieldName": "tech_dash", "group": "Technique", "description": "", "variable": "tch-dash{0}", "title": "Dash", "subGroup": "Basic Movement", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Escape": {
				"name": "Tech_Escape", "fieldName": "tech_escape", "group": "Technique", "description": "", "variable": "tch-escape{0}", "title": "Escape", "subGroup": "Basic Movement", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reposition": {
				"name": "Tech_Reposition", "fieldName": "tech_reposition", "group": "Technique", "description": "", "variable": "tch-reposition{0}", "title": "Reposition", "subGroup": "Basic Movement", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Aid": {
				"name": "Tech_Aid", "fieldName": "tech_aid", "group": "Technique", "description": "", "variable": "tch-aid{0}", "title": "Aid", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stabilize": {
				"name": "Tech_Stabilize", "fieldName": "tech_stabilize", "group": "Technique", "description": "", "variable": "tch-stabilize{0}", "title": "Stabilize", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Encourage": {
				"name": "Tech_Encourage", "fieldName": "tech_encourage", "group": "Technique", "description": "", "variable": "tch-encourage{0}", "title": "Encourage", "subGroup": "Basic Support", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Grapple": {
				"name": "Tech_Grapple", "fieldName": "tech_grapple", "group": "Technique", "description": "", "variable": "tch-grapple{0}", "title": "Grapple", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Unarmed Strike": {
				"name": "Tech_Unarmed Strike", "fieldName": "tech_unarmed_strike", "group": "Technique", "description": "", "variable": "tch-unarmed_strike{0}", "title": "Unarmed Strike", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Basic Slash": {
				"name": "Tech_Basic Slash", "fieldName": "tech_basic_slash", "group": "Technique", "description": "", "variable": "tch-basic_slash{0}", "title": "Basic Slash", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Throw": {
				"name": "Tech_Throw", "fieldName": "tech_throw", "group": "Technique", "description": "", "variable": "tch-throw{0}", "title": "Throw", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heavy Strike": {
				"name": "Tech_Heavy Strike", "fieldName": "tech_heavy_strike", "group": "Technique", "description": "", "variable": "tch-heavy_strike{0}", "title": "Heavy Strike", "subGroup": "Basic Attack", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Build Rapport": {
				"name": "Tech_Build Rapport", "fieldName": "tech_build_rapport", "group": "Technique", "description": "", "variable": "tch-build_rapport{0}", "title": "Build Rapport", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Build Pressure": {
				"name": "Tech_Build Pressure", "fieldName": "tech_build_pressure", "group": "Technique", "description": "", "variable": "tch-build_pressure{0}", "title": "Build Pressure", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Request": {
				"name": "Tech_Request", "fieldName": "tech_request", "group": "Technique", "description": "", "variable": "tch-request{0}", "title": "Request", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Demand": {
				"name": "Tech_Demand", "fieldName": "tech_demand", "group": "Technique", "description": "", "variable": "tch-demand{0}", "title": "Demand", "subGroup": "Basic Social", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender": {
				"name": "Tech_Defender", "fieldName": "tech_defender", "group": "Technique", "description": "", "variable": "tch-defender{0}", "title": "Defender", "subGroup": "Warrior; Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Defender II": {
				"name": "Tech_Defender II", "fieldName": "tech_defender_ii", "group": "Technique", "description": "", "variable": "tch-defender_ii{0}", "title": "Defender II", "subGroup": "Warrior; Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Athlete": {
				"name": "Tech_Athlete", "fieldName": "tech_athlete", "group": "Technique", "description": "", "variable": "tch-athlete{0}", "title": "Athlete", "subGroup": "Rogue", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Athlete II": {
				"name": "Tech_Athlete II", "fieldName": "tech_athlete_ii", "group": "Technique", "description": "", "variable": "tch-athlete_ii{0}", "title": "Athlete II", "subGroup": "Rogue", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Second Wind": {
				"name": "Tech_Second Wind", "fieldName": "tech_second_wind", "group": "Technique", "description": "", "variable": "tch-second_wind{0}", "title": "Second Wind", "subGroup": "Warrior", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Second Breath": {
				"name": "Tech_Second Breath", "fieldName": "tech_second_breath", "group": "Technique", "description": "", "variable": "tch-second_breath{0}", "title": "Second Breath", "subGroup": "Warrior", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Undaunted": {
				"name": "Tech_Undaunted", "fieldName": "tech_undaunted", "group": "Technique", "description": "", "variable": "tch-undaunted{0}", "title": "Undaunted", "subGroup": "Warrior", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Preemptive Strike": {
				"name": "Tech_Preemptive Strike", "fieldName": "tech_preemptive_strike", "group": "Technique", "description": "", "variable": "tch-preemptive_strike{0}", "title": "Preemptive Strike", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Preemptive Stagger": {
				"name": "Tech_Preemptive Stagger", "fieldName": "tech_preemptive_stagger", "group": "Technique", "description": "", "variable": "tch-preemptive_stagger{0}", "title": "Preemptive Stagger", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Critical Maim": {
				"name": "Tech_Critical Maim", "fieldName": "tech_critical_maim", "group": "Technique", "description": "", "variable": "tch-critical_maim{0}", "title": "Critical Maim", "subGroup": "Interceptor", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Spellshot": {
				"name": "Tech_Spellshot", "fieldName": "tech_spellshot", "group": "Technique", "description": "", "variable": "tch-spellshot{0}", "title": "Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Follow-Up Spellshot": {
				"name": "Tech_Follow-Up Spellshot", "fieldName": "tech_follow-up_spellshot", "group": "Technique", "description": "", "variable": "tch-follow-up_spellshot{0}", "title": "Follow-Up Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Bursting Spellshot": {
				"name": "Tech_Bursting Spellshot", "fieldName": "tech_bursting_spellshot", "group": "Technique", "description": "", "variable": "tch-bursting_spellshot{0}", "title": "Bursting Spellshot", "subGroup": "Spellslinger", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Savior": {
				"name": "Tech_Savior", "fieldName": "tech_savior", "group": "Technique", "description": "", "variable": "tch-savior{0}", "title": "Savior", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Knock Away Savior": {
				"name": "Tech_Knock Away Savior", "fieldName": "tech_knock_away_savior", "group": "Technique", "description": "", "variable": "tch-knock_away_savior{0}", "title": "Knock Away Savior", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Savior's Retaliation": {
				"name": "Tech_Savior's Retaliation", "fieldName": "tech_savior's_retaliation", "group": "Technique", "description": "", "variable": "tch-savior's_retaliation{0}", "title": "Savior's Retaliation", "subGroup": "Guardian", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Spellstrike": {
				"name": "Tech_Spellstrike", "fieldName": "tech_spellstrike", "group": "Technique", "description": "", "variable": "tch-spellstrike{0}", "title": "Spellstrike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Power Skirmish": {
				"name": "Tech_Power Skirmish", "fieldName": "tech_power_skirmish", "group": "Technique", "description": "", "variable": "tch-power_skirmish{0}", "title": "Power Skirmish", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Sneak Attack": {
				"name": "Tech_Sneak Attack", "fieldName": "tech_sneak_attack", "group": "Technique", "description": "", "variable": "tch-sneak_attack{0}", "title": "Sneak Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Sneaky Follow-Up": {
				"name": "Tech_Sneaky Follow-Up", "fieldName": "tech_sneaky_follow-up", "group": "Technique", "description": "", "variable": "tch-sneaky_follow-up{0}", "title": "Sneaky Follow-Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Assassinate": {
				"name": "Tech_Assassinate", "fieldName": "tech_assassinate", "group": "Technique", "description": "", "variable": "tch-assassinate{0}", "title": "Assassinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Emergency Care": {
				"name": "Tech_Emergency Care", "fieldName": "tech_emergency_care", "group": "Technique", "description": "", "variable": "tch-emergency_care{0}", "title": "Emergency Care", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Nightingale": {
				"name": "Tech_Nightingale", "fieldName": "tech_nightingale", "group": "Technique", "description": "", "variable": "tch-nightingale{0}", "title": "Nightingale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Rhapsody": {
				"name": "Tech_Rhapsody", "fieldName": "tech_rhapsody", "group": "Technique", "description": "", "variable": "tch-rhapsody{0}", "title": "Rhapsody", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Metamagic": {
				"name": "Tech_Metamagic", "fieldName": "tech_metamagic", "group": "Technique", "description": "", "variable": "tch-metamagic{0}", "title": "Metamagic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Strategize": {
				"name": "Tech_Strategize", "fieldName": "tech_strategize", "group": "Technique", "description": "", "variable": "tch-strategize{0}", "title": "Strategize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Foresight": {
				"name": "Tech_Foresight", "fieldName": "tech_foresight", "group": "Technique", "description": "", "variable": "tch-foresight{0}", "title": "Foresight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Saw That Coming": {
				"name": "Tech_Saw That Coming", "fieldName": "tech_saw_that_coming", "group": "Technique", "description": "", "variable": "tch-saw_that_coming{0}", "title": "Saw That Coming", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_As You May Recall": {
				"name": "Tech_As You May Recall", "fieldName": "tech_as_you_may_recall", "group": "Technique", "description": "", "variable": "tch-as_you_may_recall{0}", "title": "As You May Recall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Generalist": {
				"name": "Tech_Generalist", "fieldName": "tech_generalist", "group": "Technique", "description": "", "variable": "tch-generalist{0}", "title": "Generalist", "subGroup": "Generalist", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender's Will": {
				"name": "Tech_Defender's Will", "fieldName": "tech_defender's_will", "group": "Technique", "description": "", "variable": "tch-defender's_will{0}", "title": "Defender's Will", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender's Taunt": {
				"name": "Tech_Defender's Taunt", "fieldName": "tech_defender's_taunt", "group": "Technique", "description": "", "variable": "tch-defender's_taunt{0}", "title": "Defender's Taunt", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Defender's Recovery": {
				"name": "Tech_Defender's Recovery", "fieldName": "tech_defender's_recovery", "group": "Technique", "description": "", "variable": "tch-defender's_recovery{0}", "title": "Defender's Recovery", "subGroup": "Defender", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher": {
				"name": "Tech_Skirmisher", "fieldName": "tech_skirmisher", "group": "Technique", "description": "", "variable": "tch-skirmisher{0}", "title": "Skirmisher", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher II": {
				"name": "Tech_Skirmisher II", "fieldName": "tech_skirmisher_ii", "group": "Technique", "description": "", "variable": "tch-skirmisher_ii{0}", "title": "Skirmisher II", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher's Step": {
				"name": "Tech_Skirmisher's Step", "fieldName": "tech_skirmisher's_step", "group": "Technique", "description": "", "variable": "tch-skirmisher's_step{0}", "title": "Skirmisher's Step", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skirmisher's Strike": {
				"name": "Tech_Skirmisher's Strike", "fieldName": "tech_skirmisher's_strike", "group": "Technique", "description": "", "variable": "tch-skirmisher's_strike{0}", "title": "Skirmisher's Strike", "subGroup": "Skirmisher", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman": {
				"name": "Tech_Marksman", "fieldName": "tech_marksman", "group": "Technique", "description": "", "variable": "tch-marksman{0}", "title": "Marksman", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman II": {
				"name": "Tech_Marksman II", "fieldName": "tech_marksman_ii", "group": "Technique", "description": "", "variable": "tch-marksman_ii{0}", "title": "Marksman II", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Longshot": {
				"name": "Tech_Marksman's Longshot", "fieldName": "tech_marksman's_longshot", "group": "Technique", "description": "", "variable": "tch-marksman's_longshot{0}", "title": "Marksman's Longshot", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Sight": {
				"name": "Tech_Marksman's Sight", "fieldName": "tech_marksman's_sight", "group": "Technique", "description": "", "variable": "tch-marksman's_sight{0}", "title": "Marksman's Sight", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Marksman's Strike": {
				"name": "Tech_Marksman's Strike", "fieldName": "tech_marksman's_strike", "group": "Technique", "description": "", "variable": "tch-marksman's_strike{0}", "title": "Marksman's Strike", "subGroup": "Marksman", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Athlete's Sprint": {
				"name": "Tech_Athlete's Sprint", "fieldName": "tech_athlete's_sprint", "group": "Technique", "description": "", "variable": "tch-athlete's_sprint{0}", "title": "Athlete's Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Athlete's Reach": {
				"name": "Tech_Athlete's Reach", "fieldName": "tech_athlete's_reach", "group": "Technique", "description": "", "variable": "tch-athlete's_reach{0}", "title": "Athlete's Reach", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bounding Sprint": {
				"name": "Tech_Bounding Sprint", "fieldName": "tech_bounding_sprint", "group": "Technique", "description": "", "variable": "tch-bounding_sprint{0}", "title": "Bounding Sprint", "subGroup": "Athlete", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skulk Away": {
				"name": "Tech_Skulk Away", "fieldName": "tech_skulk_away", "group": "Technique", "description": "", "variable": "tch-skulk_away{0}", "title": "Skulk Away", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Skulk Then Hide": {
				"name": "Tech_Skulk Then Hide", "fieldName": "tech_skulk_then_hide", "group": "Technique", "description": "", "variable": "tch-skulk_then_hide{0}", "title": "Skulk Then Hide", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_First Aid": {
				"name": "Tech_First Aid", "fieldName": "tech_first_aid", "group": "Technique", "description": "", "variable": "tch-first_aid{0}", "title": "First Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cleansing Aid": {
				"name": "Tech_Cleansing Aid", "fieldName": "tech_cleansing_aid", "group": "Technique", "description": "", "variable": "tch-cleansing_aid{0}", "title": "Cleansing Aid", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Environmental Awareness": {
				"name": "Tech_Environmental Awareness", "fieldName": "tech_environmental_awareness", "group": "Technique", "description": "", "variable": "tch-environmental_awareness{0}", "title": "Environmental Awareness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Eclectic Knowledge": {
				"name": "Tech_Eclectic Knowledge", "fieldName": "tech_eclectic_knowledge", "group": "Technique", "description": "", "variable": "tch-eclectic_knowledge{0}", "title": "Eclectic Knowledge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Point of Clarity": {
				"name": "Tech_Point of Clarity", "fieldName": "tech_point_of_clarity", "group": "Technique", "description": "", "variable": "tch-point_of_clarity{0}", "title": "Point of Clarity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Flatter": {
				"name": "Tech_Flatter", "fieldName": "tech_flatter", "group": "Technique", "description": "", "variable": "tch-flatter{0}", "title": "Flatter", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Captivate": {
				"name": "Tech_Captivate", "fieldName": "tech_captivate", "group": "Technique", "description": "", "variable": "tch-captivate{0}", "title": "Captivate", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 1, "affinity": "", "isFree": false
			},
			"Tech_Magnetic Charm": {
				"name": "Tech_Magnetic Charm", "fieldName": "tech_magnetic_charm", "group": "Technique", "description": "", "variable": "tch-magnetic_charm{0}", "title": "Magnetic Charm", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Disarming Gaze": {
				"name": "Tech_Disarming Gaze", "fieldName": "tech_disarming_gaze", "group": "Technique", "description": "", "variable": "tch-disarming_gaze{0}", "title": "Disarming Gaze", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Pander": {
				"name": "Tech_Pander", "fieldName": "tech_pander", "group": "Technique", "description": "", "variable": "tch-pander{0}", "title": "Pander", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Flatter II": {
				"name": "Tech_Flatter II", "fieldName": "tech_flatter_ii", "group": "Technique", "description": "", "variable": "tch-flatter_ii{0}", "title": "Flatter II", "subGroup": "Charm Unrestrained", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Compliment": {
				"name": "Tech_Compliment", "fieldName": "tech_compliment", "group": "Technique", "description": "", "variable": "tch-compliment{0}", "title": "Compliment", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Pump Up": {
				"name": "Tech_Pump Up", "fieldName": "tech_pump_up", "group": "Technique", "description": "", "variable": "tch-pump_up{0}", "title": "Pump Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Enthusiasm": {
				"name": "Tech_Enthusiasm", "fieldName": "tech_enthusiasm", "group": "Technique", "description": "", "variable": "tch-enthusiasm{0}", "title": "Enthusiasm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reinforce": {
				"name": "Tech_Reinforce", "fieldName": "tech_reinforce", "group": "Technique", "description": "", "variable": "tch-reinforce{0}", "title": "Reinforce", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bravado": {
				"name": "Tech_Bravado", "fieldName": "tech_bravado", "group": "Technique", "description": "", "variable": "tch-bravado{0}", "title": "Bravado", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Zeal": {
				"name": "Tech_Zeal", "fieldName": "tech_zeal", "group": "Technique", "description": "", "variable": "tch-zeal{0}", "title": "Zeal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Motivational Speech": {
				"name": "Tech_Motivational Speech", "fieldName": "tech_motivational_speech", "group": "Technique", "description": "", "variable": "tch-motivational_speech{0}", "title": "Motivational Speech", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Meditate": {
				"name": "Tech_Meditate", "fieldName": "tech_meditate", "group": "Technique", "description": "", "variable": "tch-meditate{0}", "title": "Meditate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Guided Thought": {
				"name": "Tech_Guided Thought", "fieldName": "tech_guided_thought", "group": "Technique", "description": "", "variable": "tch-guided_thought{0}", "title": "Guided Thought", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Casual Conversation": {
				"name": "Tech_Casual Conversation", "fieldName": "tech_casual_conversation", "group": "Technique", "description": "", "variable": "tch-casual_conversation{0}", "title": "Casual Conversation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Deepen Connection": {
				"name": "Tech_Deepen Connection", "fieldName": "tech_deepen_connection", "group": "Technique", "description": "", "variable": "tch-deepen_connection{0}", "title": "Deepen Connection", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Mindfulness": {
				"name": "Tech_Mindfulness", "fieldName": "tech_mindfulness", "group": "Technique", "description": "", "variable": "tch-mindfulness{0}", "title": "Mindfulness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Serenity of Mind": {
				"name": "Tech_Serenity of Mind", "fieldName": "tech_serenity_of_mind", "group": "Technique", "description": "", "variable": "tch-serenity_of_mind{0}", "title": "Serenity of Mind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tranquility": {
				"name": "Tech_Tranquility", "fieldName": "tech_tranquility", "group": "Technique", "description": "", "variable": "tch-tranquility{0}", "title": "Tranquility", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Clemency": {
				"name": "Tech_Clemency", "fieldName": "tech_clemency", "group": "Technique", "description": "", "variable": "tch-clemency{0}", "title": "Clemency", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Emotional Intelligence": {
				"name": "Tech_Emotional Intelligence", "fieldName": "tech_emotional_intelligence", "group": "Technique", "description": "", "variable": "tch-emotional_intelligence{0}", "title": "Emotional Intelligence", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sympathy": {
				"name": "Tech_Sympathy", "fieldName": "tech_sympathy", "group": "Technique", "description": "", "variable": "tch-sympathy{0}", "title": "Sympathy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Threaten": {
				"name": "Tech_Threaten", "fieldName": "tech_threaten", "group": "Technique", "description": "", "variable": "tch-threaten{0}", "title": "Threaten", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Rage": {
				"name": "Tech_Rage", "fieldName": "tech_rage", "group": "Technique", "description": "", "variable": "tch-rage{0}", "title": "Rage", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Veiled Anger": {
				"name": "Tech_Veiled Anger", "fieldName": "tech_veiled_anger", "group": "Technique", "description": "", "variable": "tch-veiled_anger{0}", "title": "Veiled Anger", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gruff": {
				"name": "Tech_Gruff", "fieldName": "tech_gruff", "group": "Technique", "description": "", "variable": "tch-gruff{0}", "title": "Gruff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Oppress": {
				"name": "Tech_Oppress", "fieldName": "tech_oppress", "group": "Technique", "description": "", "variable": "tch-oppress{0}", "title": "Oppress", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tyrannize": {
				"name": "Tech_Tyrannize", "fieldName": "tech_tyrannize", "group": "Technique", "description": "", "variable": "tch-tyrannize{0}", "title": "Tyrannize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bellow": {
				"name": "Tech_Bellow", "fieldName": "tech_bellow", "group": "Technique", "description": "", "variable": "tch-bellow{0}", "title": "Bellow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bulldoze": {
				"name": "Tech_Bulldoze", "fieldName": "tech_bulldoze", "group": "Technique", "description": "", "variable": "tch-bulldoze{0}", "title": "Bulldoze", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Domineer": {
				"name": "Tech_Domineer", "fieldName": "tech_domineer", "group": "Technique", "description": "", "variable": "tch-domineer{0}", "title": "Domineer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Enforcement": {
				"name": "Tech_Enforcement", "fieldName": "tech_enforcement", "group": "Technique", "description": "", "variable": "tch-enforcement{0}", "title": "Enforcement", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Agitation": {
				"name": "Tech_Agitation", "fieldName": "tech_agitation", "group": "Technique", "description": "", "variable": "tch-agitation{0}", "title": "Agitation", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bluster": {
				"name": "Tech_Bluster", "fieldName": "tech_bluster", "group": "Technique", "description": "", "variable": "tch-bluster{0}", "title": "Bluster", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Give No Quarter": {
				"name": "Tech_Give No Quarter", "fieldName": "tech_give_no_quarter", "group": "Technique", "description": "", "variable": "tch-give_no_quarter{0}", "title": "Give No Quarter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Eye on the Prize": {
				"name": "Tech_Eye on the Prize", "fieldName": "tech_eye_on_the_prize", "group": "Technique", "description": "", "variable": "tch-eye_on_the_prize{0}", "title": "Eye on the Prize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Subvert": {
				"name": "Tech_Subvert", "fieldName": "tech_subvert", "group": "Technique", "description": "", "variable": "tch-subvert{0}", "title": "Subvert", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Compromise": {
				"name": "Tech_Compromise", "fieldName": "tech_compromise", "group": "Technique", "description": "", "variable": "tch-compromise{0}", "title": "Compromise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Appeal to Reason": {
				"name": "Tech_Appeal to Reason", "fieldName": "tech_appeal_to_reason", "group": "Technique", "description": "", "variable": "tch-appeal_to_reason{0}", "title": "Appeal to Reason", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Common Ground": {
				"name": "Tech_Common Ground", "fieldName": "tech_common_ground", "group": "Technique", "description": "", "variable": "tch-common_ground{0}", "title": "Common Ground", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Silver Tongue": {
				"name": "Tech_Silver Tongue", "fieldName": "tech_silver_tongue", "group": "Technique", "description": "", "variable": "tch-silver_tongue{0}", "title": "Silver Tongue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dig Deep": {
				"name": "Tech_Dig Deep", "fieldName": "tech_dig_deep", "group": "Technique", "description": "", "variable": "tch-dig_deep{0}", "title": "Dig Deep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Debate": {
				"name": "Tech_Debate", "fieldName": "tech_debate", "group": "Technique", "description": "", "variable": "tch-debate{0}", "title": "Debate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Final Push": {
				"name": "Tech_Final Push", "fieldName": "tech_final_push", "group": "Technique", "description": "", "variable": "tch-final_push{0}", "title": "Final Push", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Diplomacy": {
				"name": "Tech_Diplomacy", "fieldName": "tech_diplomacy", "group": "Technique", "description": "", "variable": "tch-diplomacy{0}", "title": "Diplomacy", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Subtlety": {
				"name": "Tech_Subtlety", "fieldName": "tech_subtlety", "group": "Technique", "description": "", "variable": "tch-subtlety{0}", "title": "Subtlety", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Consideration": {
				"name": "Tech_Consideration", "fieldName": "tech_consideration", "group": "Technique", "description": "", "variable": "tch-consideration{0}", "title": "Consideration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fast Talk": {
				"name": "Tech_Fast Talk", "fieldName": "tech_fast_talk", "group": "Technique", "description": "", "variable": "tch-fast_talk{0}", "title": "Fast Talk", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Swift Rebuttal": {
				"name": "Tech_Swift Rebuttal", "fieldName": "tech_swift_rebuttal", "group": "Technique", "description": "", "variable": "tch-swift_rebuttal{0}", "title": "Swift Rebuttal", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Intrigue": {
				"name": "Tech_Intrigue", "fieldName": "tech_intrigue", "group": "Technique", "description": "", "variable": "tch-intrigue{0}", "title": "Intrigue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Duplicity": {
				"name": "Tech_Duplicity", "fieldName": "tech_duplicity", "group": "Technique", "description": "", "variable": "tch-duplicity{0}", "title": "Duplicity", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Evil Eye": {
				"name": "Tech_Evil Eye", "fieldName": "tech_evil_eye", "group": "Technique", "description": "", "variable": "tch-evil_eye{0}", "title": "Evil Eye", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Invective": {
				"name": "Tech_Invective", "fieldName": "tech_invective", "group": "Technique", "description": "", "variable": "tch-invective{0}", "title": "Invective", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Mean": {
				"name": "Tech_Mean", "fieldName": "tech_mean", "group": "Technique", "description": "", "variable": "tch-mean{0}", "title": "Mean", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Seeds of Doubt": {
				"name": "Tech_Seeds of Doubt", "fieldName": "tech_seeds_of_doubt", "group": "Technique", "description": "", "variable": "tch-seeds_of_doubt{0}", "title": "Seeds of Doubt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_White Lie": {
				"name": "Tech_White Lie", "fieldName": "tech_white_lie", "group": "Technique", "description": "", "variable": "tch-white_lie{0}", "title": "White Lie", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fuel the Fire": {
				"name": "Tech_Fuel the Fire", "fieldName": "tech_fuel_the_fire", "group": "Technique", "description": "", "variable": "tch-fuel_the_fire{0}", "title": "Fuel the Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reel'Em In": {
				"name": "Tech_Reel'Em In", "fieldName": "tech_reel'em_in", "group": "Technique", "description": "", "variable": "tch-reel'em_in{0}", "title": "Reel'Em In", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Close it Out": {
				"name": "Tech_Close it Out", "fieldName": "tech_close_it_out", "group": "Technique", "description": "", "variable": "tch-close_it_out{0}", "title": "Close it Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Hustle": {
				"name": "Tech_Hustle", "fieldName": "tech_hustle", "group": "Technique", "description": "", "variable": "tch-hustle{0}", "title": "Hustle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Beguile": {
				"name": "Tech_Beguile", "fieldName": "tech_beguile", "group": "Technique", "description": "", "variable": "tch-beguile{0}", "title": "Beguile", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Obtuse": {
				"name": "Tech_Obtuse", "fieldName": "tech_obtuse", "group": "Technique", "description": "", "variable": "tch-obtuse{0}", "title": "Obtuse", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Reconsider": {
				"name": "Tech_Reconsider", "fieldName": "tech_reconsider", "group": "Technique", "description": "", "variable": "tch-reconsider{0}", "title": "Reconsider", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Segue": {
				"name": "Tech_Segue", "fieldName": "tech_segue", "group": "Technique", "description": "", "variable": "tch-segue{0}", "title": "Segue", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stammer": {
				"name": "Tech_Stammer", "fieldName": "tech_stammer", "group": "Technique", "description": "", "variable": "tch-stammer{0}", "title": "Stammer", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Unfazed": {
				"name": "Tech_Unfazed", "fieldName": "tech_unfazed", "group": "Technique", "description": "", "variable": "tch-unfazed{0}", "title": "Unfazed", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Pole Vault": {
				"name": "Tech_Pole Vault", "fieldName": "tech_pole_vault", "group": "Technique", "description": "", "variable": "tch-pole_vault{0}", "title": "Pole Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Draw": {
				"name": "Tech_Quick Draw", "fieldName": "tech_quick_draw", "group": "Technique", "description": "", "variable": "tch-quick_draw{0}", "title": "Quick Draw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extension Strike": {
				"name": "Tech_Extension Strike", "fieldName": "tech_extension_strike", "group": "Technique", "description": "", "variable": "tch-extension_strike{0}", "title": "Extension Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Step Extension": {
				"name": "Tech_Step Extension", "fieldName": "tech_step_extension", "group": "Technique", "description": "", "variable": "tch-step_extension{0}", "title": "Step Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lasting Extension": {
				"name": "Tech_Lasting Extension", "fieldName": "tech_lasting_extension", "group": "Technique", "description": "", "variable": "tch-lasting_extension{0}", "title": "Lasting Extension", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Far Strike": {
				"name": "Tech_Far Strike", "fieldName": "tech_far_strike", "group": "Technique", "description": "", "variable": "tch-far_strike{0}", "title": "Far Strike", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extension Strike +": {
				"name": "Tech_Extension Strike +", "fieldName": "tech_extension_strike_+", "group": "Technique", "description": "", "variable": "tch-extension_strike_+{0}", "title": "Extension Strike +", "subGroup": "Ki Extension", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Slash": {
				"name": "Tech_Quick Slash", "fieldName": "tech_quick_slash", "group": "Technique", "description": "", "variable": "tch-quick_slash{0}", "title": "Quick Slash", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Precision Blade": {
				"name": "Tech_Precision Blade", "fieldName": "tech_precision_blade", "group": "Technique", "description": "", "variable": "tch-precision_blade{0}", "title": "Precision Blade", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 2, "affinity": "", "isFree": false
			},
			"Tech_Armor Piercer": {
				"name": "Tech_Armor Piercer", "fieldName": "tech_armor_piercer", "group": "Technique", "description": "", "variable": "tch-armor_piercer{0}", "title": "Armor Piercer", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Quick Slash II": {
				"name": "Tech_Quick Slash II", "fieldName": "tech_quick_slash_ii", "group": "Technique", "description": "", "variable": "tch-quick_slash_ii{0}", "title": "Quick Slash II", "subGroup": "Swordplay", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": 3, "affinity": "", "isFree": false
			},
			"Tech_Cleave": {
				"name": "Tech_Cleave", "fieldName": "tech_cleave", "group": "Technique", "description": "", "variable": "tch-cleave{0}", "title": "Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Crushing Blade": {
				"name": "Tech_Crushing Blade", "fieldName": "tech_crushing_blade", "group": "Technique", "description": "", "variable": "tch-crushing_blade{0}", "title": "Crushing Blade", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Cleave": {
				"name": "Tech_Great Cleave", "fieldName": "tech_great_cleave", "group": "Technique", "description": "", "variable": "tch-great_cleave{0}", "title": "Great Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cleave +": {
				"name": "Tech_Cleave +", "fieldName": "tech_cleave_+", "group": "Technique", "description": "", "variable": "tch-cleave_+{0}", "title": "Cleave +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sudden Cleave": {
				"name": "Tech_Sudden Cleave", "fieldName": "tech_sudden_cleave", "group": "Technique", "description": "", "variable": "tch-sudden_cleave{0}", "title": "Sudden Cleave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Cleave II": {
				"name": "Tech_Great Cleave II", "fieldName": "tech_great_cleave_ii", "group": "Technique", "description": "", "variable": "tch-great_cleave_ii{0}", "title": "Great Cleave II", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Power Flex": {
				"name": "Tech_Power Flex", "fieldName": "tech_power_flex", "group": "Technique", "description": "", "variable": "tch-power_flex{0}", "title": "Power Flex", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Crush Knuckle": {
				"name": "Tech_Crush Knuckle", "fieldName": "tech_crush_knuckle", "group": "Technique", "description": "", "variable": "tch-crush_knuckle{0}", "title": "Crush Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Impact Knuckle": {
				"name": "Tech_Impact Knuckle", "fieldName": "tech_impact_knuckle", "group": "Technique", "description": "", "variable": "tch-impact_knuckle{0}", "title": "Impact Knuckle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knuckle Flurry": {
				"name": "Tech_Knuckle Flurry", "fieldName": "tech_knuckle_flurry", "group": "Technique", "description": "", "variable": "tch-knuckle_flurry{0}", "title": "Knuckle Flurry", "subGroup": "", "descriptions": [""]
				,
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Water Blast": {
				"name": "Tech_Water Blast", "fieldName": "tech_water_blast", "group": "Technique", "description": "", "variable": "tch-water_blast{0}", "title": "Water Blast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Geyser": {
				"name": "Tech_Geyser", "fieldName": "tech_geyser", "group": "Technique", "description": "", "variable": "tch-geyser{0}", "title": "Geyser", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Geyser Line": {
				"name": "Tech_Geyser Line", "fieldName": "tech_geyser_line", "group": "Technique", "description": "", "variable": "tch-geyser_line{0}", "title": "Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surf": {
				"name": "Tech_Surf", "fieldName": "tech_surf", "group": "Technique", "description": "", "variable": "tch-surf{0}", "title": "Surf", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Geyser Line": {
				"name": "Tech_Great Geyser Line", "fieldName": "tech_great_geyser_line", "group": "Technique", "description": "", "variable": "tch-great_geyser_line{0}", "title": "Great Geyser Line", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tidal Wave": {
				"name": "Tech_Tidal Wave", "fieldName": "tech_tidal_wave", "group": "Technique", "description": "", "variable": "tch-tidal_wave{0}", "title": "Tidal Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Surge": {
				"name": "Tech_Sand Surge", "fieldName": "tech_sand_surge", "group": "Technique", "description": "", "variable": "tch-sand_surge{0}", "title": "Sand Surge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Spout": {
				"name": "Tech_Sand Spout", "fieldName": "tech_sand_spout", "group": "Technique", "description": "", "variable": "tch-sand_spout{0}", "title": "Sand Spout", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Wave": {
				"name": "Tech_Sand Wave", "fieldName": "tech_sand_wave", "group": "Technique", "description": "", "variable": "tch-sand_wave{0}", "title": "Sand Wave", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sand Launcher": {
				"name": "Tech_Sand Launcher", "fieldName": "tech_sand_launcher", "group": "Technique", "description": "", "variable": "tch-sand_launcher{0}", "title": "Sand Launcher", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sicken": {
				"name": "Tech_Sicken", "fieldName": "tech_sicken", "group": "Technique", "description": "", "variable": "tch-sicken{0}", "title": "Sicken", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Spores": {
				"name": "Tech_Spores", "fieldName": "tech_spores", "group": "Technique", "description": "", "variable": "tch-spores{0}", "title": "Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sickening Cloud": {
				"name": "Tech_Sickening Cloud", "fieldName": "tech_sickening_cloud", "group": "Technique", "description": "", "variable": "tch-sickening_cloud{0}", "title": "Sickening Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Virulent Spores": {
				"name": "Tech_Virulent Spores", "fieldName": "tech_virulent_spores", "group": "Technique", "description": "", "variable": "tch-virulent_spores{0}", "title": "Virulent Spores", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Firebolt": {
				"name": "Tech_Firebolt", "fieldName": "tech_firebolt", "group": "Technique", "description": "", "variable": "tch-firebolt{0}", "title": "Firebolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Flame Arrow": {
				"name": "Tech_Flame Arrow", "fieldName": "tech_flame_arrow", "group": "Technique", "description": "", "variable": "tch-flame_arrow{0}", "title": "Flame Arrow", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fireball": {
				"name": "Tech_Fireball", "fieldName": "tech_fireball", "group": "Technique", "description": "", "variable": "tch-fireball{0}", "title": "Fireball", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fireblast": {
				"name": "Tech_Fireblast", "fieldName": "tech_fireblast", "group": "Technique", "description": "", "variable": "tch-fireblast{0}", "title": "Fireblast", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ragnarok": {
				"name": "Tech_Ragnarok", "fieldName": "tech_ragnarok", "group": "Technique", "description": "", "variable": "tch-ragnarok{0}", "title": "Ragnarok", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Bonfire": {
				"name": "Tech_Bonfire", "fieldName": "tech_bonfire", "group": "Technique", "description": "", "variable": "tch-bonfire{0}", "title": "Bonfire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wall of Fire": {
				"name": "Tech_Wall of Fire", "fieldName": "tech_wall_of_fire", "group": "Technique", "description": "", "variable": "tch-wall_of_fire{0}", "title": "Wall of Fire", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Field of Flame": {
				"name": "Tech_Field of Flame", "fieldName": "tech_field_of_flame", "group": "Technique", "description": "", "variable": "tch-field_of_flame{0}", "title": "Field of Flame", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lightning Shaft": {
				"name": "Tech_Lightning Shaft", "fieldName": "tech_lightning_shaft", "group": "Technique", "description": "", "variable": "tch-lightning_shaft{0}", "title": "Lightning Shaft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shock": {
				"name": "Tech_Shock", "fieldName": "tech_shock", "group": "Technique", "description": "", "variable": "tch-shock{0}", "title": "Shock", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lightning Bolt": {
				"name": "Tech_Lightning Bolt", "fieldName": "tech_lightning_bolt", "group": "Technique", "description": "", "variable": "tch-lightning_bolt{0}", "title": "Lightning Bolt", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Plasma Arc": {
				"name": "Tech_Plasma Arc", "fieldName": "tech_plasma_arc", "group": "Technique", "description": "", "variable": "tch-plasma_arc{0}", "title": "Plasma Arc", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fulgor": {
				"name": "Tech_Fulgor", "fieldName": "tech_fulgor", "group": "Technique", "description": "", "variable": "tch-fulgor{0}", "title": "Fulgor", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Snap": {
				"name": "Tech_Cold Snap", "fieldName": "tech_cold_snap", "group": "Technique", "description": "", "variable": "tch-cold_snap{0}", "title": "Cold Snap", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Frostbite": {
				"name": "Tech_Frostbite", "fieldName": "tech_frostbite", "group": "Technique", "description": "", "variable": "tch-frostbite{0}", "title": "Frostbite", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Freezebind": {
				"name": "Tech_Freezebind", "fieldName": "tech_freezebind", "group": "Technique", "description": "", "variable": "tch-freezebind{0}", "title": "Freezebind", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Burst": {
				"name": "Tech_Cold Burst", "fieldName": "tech_cold_burst", "group": "Technique", "description": "", "variable": "tch-cold_burst{0}", "title": "Cold Burst", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Front": {
				"name": "Tech_Cold Front", "fieldName": "tech_cold_front", "group": "Technique", "description": "", "variable": "tch-cold_front{0}", "title": "Cold Front", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Diamond Dust": {
				"name": "Tech_Diamond Dust", "fieldName": "tech_diamond_dust", "group": "Technique", "description": "", "variable": "tch-diamond_dust{0}", "title": "Diamond Dust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Bullet": {
				"name": "Tech_Wind Bullet", "fieldName": "tech_wind_bullet", "group": "Technique", "description": "", "variable": "tch-wind_bullet{0}", "title": "Wind Bullet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gust": {
				"name": "Tech_Gust", "fieldName": "tech_gust", "group": "Technique", "description": "", "variable": "tch-gust{0}", "title": "Gust", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Windsweep": {
				"name": "Tech_Windsweep", "fieldName": "tech_windsweep", "group": "Technique", "description": "", "variable": "tch-windsweep{0}", "title": "Windsweep", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gale": {
				"name": "Tech_Gale", "fieldName": "tech_gale", "group": "Technique", "description": "", "variable": "tch-gale{0}", "title": "Gale", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Darkness": {
				"name": "Tech_Darkness", "fieldName": "tech_darkness", "group": "Technique", "description": "", "variable": "tch-darkness{0}", "title": "Darkness", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Wall": {
				"name": "Tech_Shadow Wall", "fieldName": "tech_shadow_wall", "group": "Technique", "description": "", "variable": "tch-shadow_wall{0}", "title": "Shadow Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Nightfall": {
				"name": "Tech_Nightfall", "fieldName": "tech_nightfall", "group": "Technique", "description": "", "variable": "tch-nightfall{0}", "title": "Nightfall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fog Cloud": {
				"name": "Tech_Fog Cloud", "fieldName": "tech_fog_cloud", "group": "Technique", "description": "", "variable": "tch-fog_cloud{0}", "title": "Fog Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sleet": {
				"name": "Tech_Sleet", "fieldName": "tech_sleet", "group": "Technique", "description": "", "variable": "tch-sleet{0}", "title": "Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Freezing Sleet": {
				"name": "Tech_Freezing Sleet", "fieldName": "tech_freezing_sleet", "group": "Technique", "description": "", "variable": "tch-freezing_sleet{0}", "title": "Freezing Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Hail": {
				"name": "Tech_Hail", "fieldName": "tech_hail", "group": "Technique", "description": "", "variable": "tch-hail{0}", "title": "Hail", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Binding Sleet": {
				"name": "Tech_Binding Sleet", "fieldName": "tech_binding_sleet", "group": "Technique", "description": "", "variable": "tch-binding_sleet{0}", "title": "Binding Sleet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ice Storm": {
				"name": "Tech_Ice Storm", "fieldName": "tech_ice_storm", "group": "Technique", "description": "", "variable": "tch-ice_storm{0}", "title": "Ice Storm", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fimbulwinter": {
				"name": "Tech_Fimbulwinter", "fieldName": "tech_fimbulwinter", "group": "Technique", "description": "", "variable": "tch-fimbulwinter{0}", "title": "Fimbulwinter", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Smoke Cloud": {
				"name": "Tech_Smoke Cloud", "fieldName": "tech_smoke_cloud", "group": "Technique", "description": "", "variable": "tch-smoke_cloud{0}", "title": "Smoke Cloud", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burning Smoke": {
				"name": "Tech_Burning Smoke", "fieldName": "tech_burning_smoke", "group": "Technique", "description": "", "variable": "tch-burning_smoke{0}", "title": "Burning Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Choking Smoke": {
				"name": "Tech_Choking Smoke", "fieldName": "tech_choking_smoke", "group": "Technique", "description": "", "variable": "tch-choking_smoke{0}", "title": "Choking Smoke", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Acceleration": {
				"name": "Tech_Acceleration", "fieldName": "tech_acceleration", "group": "Technique", "description": "", "variable": "tch-acceleration{0}", "title": "Acceleration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Power Vault": {
				"name": "Tech_Power Vault", "fieldName": "tech_power_vault", "group": "Technique", "description": "", "variable": "tch-power_vault{0}", "title": "Power Vault", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Expeditious": {
				"name": "Tech_Expeditious", "fieldName": "tech_expeditious", "group": "Technique", "description": "", "variable": "tch-expeditious{0}", "title": "Expeditious", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Climb": {
				"name": "Tech_Quick Climb", "fieldName": "tech_quick_climb", "group": "Technique", "description": "", "variable": "tch-quick_climb{0}", "title": "Quick Climb", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quick Swim": {
				"name": "Tech_Quick Swim", "fieldName": "tech_quick_swim", "group": "Technique", "description": "", "variable": "tch-quick_swim{0}", "title": "Quick Swim", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Poise": {
				"name": "Tech_Poise", "fieldName": "tech_poise", "group": "Technique", "description": "", "variable": "tch-poise{0}", "title": "Poise", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cat Fall": {
				"name": "Tech_Cat Fall", "fieldName": "tech_cat_fall", "group": "Technique", "description": "", "variable": "tch-cat_fall{0}", "title": "Cat Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kip Up": {
				"name": "Tech_Kip Up", "fieldName": "tech_kip_up", "group": "Technique", "description": "", "variable": "tch-kip_up{0}", "title": "Kip Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Silent Stride": {
				"name": "Tech_Silent Stride", "fieldName": "tech_silent_stride", "group": "Technique", "description": "", "variable": "tch-silent_stride{0}", "title": "Silent Stride", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shove": {
				"name": "Tech_Shove", "fieldName": "tech_shove", "group": "Technique", "description": "", "variable": "tch-shove{0}", "title": "Shove", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knockdown": {
				"name": "Tech_Knockdown", "fieldName": "tech_knockdown", "group": "Technique", "description": "", "variable": "tch-knockdown{0}", "title": "Knockdown", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tumble": {
				"name": "Tech_Tumble", "fieldName": "tech_tumble", "group": "Technique", "description": "", "variable": "tch-tumble{0}", "title": "Tumble", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Field Medic": {
				"name": "Tech_Field Medic", "fieldName": "tech_field_medic", "group": "Technique", "description": "", "variable": "tch-field_medic{0}", "title": "Field Medic", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Camoflauge": {
				"name": "Tech_Camoflauge", "fieldName": "tech_camoflauge", "group": "Technique", "description": "", "variable": "tch-camoflauge{0}", "title": "Camoflauge", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Blurred Light": {
				"name": "Tech_Blurred Light", "fieldName": "tech_blurred_light", "group": "Technique", "description": "", "variable": "tch-blurred_light{0}", "title": "Blurred Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Light Refraction": {
				"name": "Tech_Light Refraction", "fieldName": "tech_light_refraction", "group": "Technique", "description": "", "variable": "tch-light_refraction{0}", "title": "Light Refraction", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Steps": {
				"name": "Tech_Shadow Steps", "fieldName": "tech_shadow_steps", "group": "Technique", "description": "", "variable": "tch-shadow_steps{0}", "title": "Shadow Steps", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shadow Walker": {
				"name": "Tech_Shadow Walker", "fieldName": "tech_shadow_walker", "group": "Technique", "description": "", "variable": "tch-shadow_walker{0}", "title": "Shadow Walker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Step": {
				"name": "Tech_Wind Step", "fieldName": "tech_wind_step", "group": "Technique", "description": "", "variable": "tch-wind_step{0}", "title": "Wind Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Updraft": {
				"name": "Tech_Updraft", "fieldName": "tech_updraft", "group": "Technique", "description": "", "variable": "tch-updraft{0}", "title": "Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Clouded Updraft": {
				"name": "Tech_Clouded Updraft", "fieldName": "tech_clouded_updraft", "group": "Technique", "description": "", "variable": "tch-clouded_updraft{0}", "title": "Clouded Updraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wind Fall": {
				"name": "Tech_Wind Fall", "fieldName": "tech_wind_fall", "group": "Technique", "description": "", "variable": "tch-wind_fall{0}", "title": "Wind Fall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Walk on Air": {
				"name": "Tech_Walk on Air", "fieldName": "tech_walk_on_air", "group": "Technique", "description": "", "variable": "tch-walk_on_air{0}", "title": "Walk on Air", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fire Step": {
				"name": "Tech_Fire Step", "fieldName": "tech_fire_step", "group": "Technique", "description": "", "variable": "tch-fire_step{0}", "title": "Fire Step", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Liftoff": {
				"name": "Tech_Liftoff", "fieldName": "tech_liftoff", "group": "Technique", "description": "", "variable": "tch-liftoff{0}", "title": "Liftoff", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Jet": {
				"name": "Tech_Jet", "fieldName": "tech_jet", "group": "Technique", "description": "", "variable": "tch-jet{0}", "title": "Jet", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cunning Action": {
				"name": "Tech_Cunning Action", "fieldName": "tech_cunning_action", "group": "Technique", "description": "", "variable": "tch-cunning_action{0}", "title": "Cunning Action", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Demoralize": {
				"name": "Tech_Demoralize", "fieldName": "tech_demoralize", "group": "Technique", "description": "", "variable": "tch-demoralize{0}", "title": "Demoralize", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Fascinate": {
				"name": "Tech_Fascinate", "fieldName": "tech_fascinate", "group": "Technique", "description": "", "variable": "tch-fascinate{0}", "title": "Fascinate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Impersonator": {
				"name": "Tech_Impersonator", "fieldName": "tech_impersonator", "group": "Technique", "description": "", "variable": "tch-impersonator{0}", "title": "Impersonator", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ether Sense": {
				"name": "Tech_Ether Sense", "fieldName": "tech_ether_sense", "group": "Technique", "description": "", "variable": "tch-ether_sense{0}", "title": "Ether Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Spirit Sense": {
				"name": "Tech_Spirit Sense", "fieldName": "tech_spirit_sense", "group": "Technique", "description": "", "variable": "tch-spirit_sense{0}", "title": "Spirit Sense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Tremorsense": {
				"name": "Tech_Tremorsense", "fieldName": "tech_tremorsense", "group": "Technique", "description": "", "variable": "tch-tremorsense{0}", "title": "Tremorsense", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dustcraft": {
				"name": "Tech_Dustcraft", "fieldName": "tech_dustcraft", "group": "Technique", "description": "", "variable": "tch-dustcraft{0}", "title": "Dustcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shape Material": {
				"name": "Tech_Shape Material", "fieldName": "tech_shape_material", "group": "Technique", "description": "", "variable": "tch-shape_material{0}", "title": "Shape Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Quickcraft": {
				"name": "Tech_Quickcraft", "fieldName": "tech_quickcraft", "group": "Technique", "description": "", "variable": "tch-quickcraft{0}", "title": "Quickcraft", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Shaping": {
				"name": "Tech_Improved Shaping", "fieldName": "tech_improved_shaping", "group": "Technique", "description": "", "variable": "tch-improved_shaping{0}", "title": "Improved Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Greater Shaping": {
				"name": "Tech_Greater Shaping", "fieldName": "tech_greater_shaping", "group": "Technique", "description": "", "variable": "tch-greater_shaping{0}", "title": "Greater Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Legendary Shaping": {
				"name": "Tech_Legendary Shaping", "fieldName": "tech_legendary_shaping", "group": "Technique", "description": "", "variable": "tch-legendary_shaping{0}", "title": "Legendary Shaping", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dust Material": {
				"name": "Tech_Dust Material", "fieldName": "tech_dust_material", "group": "Technique", "description": "", "variable": "tch-dust_material{0}", "title": "Dust Material", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dust Area": {
				"name": "Tech_Dust Area", "fieldName": "tech_dust_area", "group": "Technique", "description": "", "variable": "tch-dust_area{0}", "title": "Dust Area", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Dusting": {
				"name": "Tech_Improved Dusting", "fieldName": "tech_improved_dusting", "group": "Technique", "description": "", "variable": "tch-improved_dusting{0}", "title": "Improved Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Greater Dusting": {
				"name": "Tech_Greater Dusting", "fieldName": "tech_greater_dusting", "group": "Technique", "description": "", "variable": "tch-greater_dusting{0}", "title": "Greater Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Legendary Dusting": {
				"name": "Tech_Legendary Dusting", "fieldName": "tech_legendary_dusting", "group": "Technique", "description": "", "variable": "tch-legendary_dusting{0}", "title": "Legendary Dusting", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Path": {
				"name": "Tech_Form Path", "fieldName": "tech_form_path", "group": "Technique", "description": "", "variable": "tch-form_path{0}", "title": "Form Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Pillar": {
				"name": "Tech_Form Pillar", "fieldName": "tech_form_pillar", "group": "Technique", "description": "", "variable": "tch-form_pillar{0}", "title": "Form Pillar", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stepping Path": {
				"name": "Tech_Stepping Path", "fieldName": "tech_stepping_path", "group": "Technique", "description": "", "variable": "tch-stepping_path{0}", "title": "Stepping Path", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Form Wall": {
				"name": "Tech_Form Wall", "fieldName": "tech_form_wall", "group": "Technique", "description": "", "variable": "tch-form_wall{0}", "title": "Form Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Scattered Pillars": {
				"name": "Tech_Scattered Pillars", "fieldName": "tech_scattered_pillars", "group": "Technique", "description": "", "variable": "tch-scattered_pillars{0}", "title": "Scattered Pillars", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Great Wall": {
				"name": "Tech_Great Wall", "fieldName": "tech_great_wall", "group": "Technique", "description": "", "variable": "tch-great_wall{0}", "title": "Great Wall", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cultivate": {
				"name": "Tech_Cultivate", "fieldName": "tech_cultivate", "group": "Technique", "description": "", "variable": "tch-cultivate{0}", "title": "Cultivate", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Entangle": {
				"name": "Tech_Entangle", "fieldName": "tech_entangle", "group": "Technique", "description": "", "variable": "tch-entangle{0}", "title": "Entangle", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wildwood": {
				"name": "Tech_Wildwood", "fieldName": "tech_wildwood", "group": "Technique", "description": "", "variable": "tch-wildwood{0}", "title": "Wildwood", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Distortion": {
				"name": "Tech_Distortion", "fieldName": "tech_distortion", "group": "Technique", "description": "", "variable": "tch-distortion{0}", "title": "Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Lasting Distortion": {
				"name": "Tech_Lasting Distortion", "fieldName": "tech_lasting_distortion", "group": "Technique", "description": "", "variable": "tch-lasting_distortion{0}", "title": "Lasting Distortion", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heat Field": {
				"name": "Tech_Heat Field", "fieldName": "tech_heat_field", "group": "Technique", "description": "", "variable": "tch-heat_field{0}", "title": "Heat Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burn Guard": {
				"name": "Tech_Burn Guard", "fieldName": "tech_burn_guard", "group": "Technique", "description": "", "variable": "tch-burn_guard{0}", "title": "Burn Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Cold Field": {
				"name": "Tech_Cold Field", "fieldName": "tech_cold_field", "group": "Technique", "description": "", "variable": "tch-cold_field{0}", "title": "Cold Field", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Chill Guard": {
				"name": "Tech_Chill Guard", "fieldName": "tech_chill_guard", "group": "Technique", "description": "", "variable": "tch-chill_guard{0}", "title": "Chill Guard", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinesis": {
				"name": "Tech_Kinesis", "fieldName": "tech_kinesis", "group": "Technique", "description": "", "variable": "tch-kinesis{0}", "title": "Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Distant Kinesis": {
				"name": "Tech_Distant Kinesis", "fieldName": "tech_distant_kinesis", "group": "Technique", "description": "", "variable": "tch-distant_kinesis{0}", "title": "Distant Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinetic Strike": {
				"name": "Tech_Kinetic Strike", "fieldName": "tech_kinetic_strike", "group": "Technique", "description": "", "variable": "tch-kinetic_strike{0}", "title": "Kinetic Strike", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Kinetic Throw": {
				"name": "Tech_Kinetic Throw", "fieldName": "tech_kinetic_throw", "group": "Technique", "description": "", "variable": "tch-kinetic_throw{0}", "title": "Kinetic Throw", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Heavy Kinesis": {
				"name": "Tech_Heavy Kinesis", "fieldName": "tech_heavy_kinesis", "group": "Technique", "description": "", "variable": "tch-heavy_kinesis{0}", "title": "Heavy Kinesis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Burden": {
				"name": "Tech_Burden", "fieldName": "tech_burden", "group": "Technique", "description": "", "variable": "tch-burden{0}", "title": "Burden", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Pressure": {
				"name": "Tech_Pressure", "fieldName": "tech_pressure", "group": "Technique", "description": "", "variable": "tch-pressure{0}", "title": "Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Restrain": {
				"name": "Tech_Restrain", "fieldName": "tech_restrain", "group": "Technique", "description": "", "variable": "tch-restrain{0}", "title": "Restrain", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Wide Pressure": {
				"name": "Tech_Wide Pressure", "fieldName": "tech_wide_pressure", "group": "Technique", "description": "", "variable": "tch-wide_pressure{0}", "title": "Wide Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Prostration": {
				"name": "Tech_Prostration", "fieldName": "tech_prostration", "group": "Technique", "description": "", "variable": "tch-prostration{0}", "title": "Prostration", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Deep Pressure": {
				"name": "Tech_Deep Pressure", "fieldName": "tech_deep_pressure", "group": "Technique", "description": "", "variable": "tch-deep_pressure{0}", "title": "Deep Pressure", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Gravity Well": {
				"name": "Tech_Gravity Well", "fieldName": "tech_gravity_well", "group": "Technique", "description": "", "variable": "tch-gravity_well{0}", "title": "Gravity Well", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Shield Block": {
				"name": "Tech_Shield Block", "fieldName": "tech_shield_block", "group": "Technique", "description": "", "variable": "tch-shield_block{0}", "title": "Shield Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Glancing Block": {
				"name": "Tech_Glancing Block", "fieldName": "tech_glancing_block", "group": "Technique", "description": "", "variable": "tch-glancing_block{0}", "title": "Glancing Block", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Aegis": {
				"name": "Tech_Aegis", "fieldName": "tech_aegis", "group": "Technique", "description": "", "variable": "tch-aegis{0}", "title": "Aegis", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Light": {
				"name": "Tech_Light", "fieldName": "tech_light", "group": "Technique", "description": "", "variable": "tch-light{0}", "title": "Light", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Dancing Lights": {
				"name": "Tech_Dancing Lights", "fieldName": "tech_dancing_lights", "group": "Technique", "description": "", "variable": "tch-dancing_lights{0}", "title": "Dancing Lights", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Flash": {
				"name": "Tech_Flash", "fieldName": "tech_flash", "group": "Technique", "description": "", "variable": "tch-flash{0}", "title": "Flash", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sunlight": {
				"name": "Tech_Sunlight", "fieldName": "tech_sunlight", "group": "Technique", "description": "", "variable": "tch-sunlight{0}", "title": "Sunlight", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release": {
				"name": "Tech_Stress Release", "fieldName": "tech_stress_release", "group": "Technique", "description": "", "variable": "tch-stress_release{0}", "title": "Stress Release", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release +": {
				"name": "Tech_Stress Release +", "fieldName": "tech_stress_release_+", "group": "Technique", "description": "", "variable": "tch-stress_release_+{0}", "title": "Stress Release +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Stress Release ++": {
				"name": "Tech_Stress Release ++", "fieldName": "tech_stress_release_++", "group": "Technique", "description": "", "variable": "tch-stress_release_++{0}", "title": "Stress Release ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sensory Training": {
				"name": "Tech_Sensory Training", "fieldName": "tech_sensory_training", "group": "Technique", "description": "", "variable": "tch-sensory_training{0}", "title": "Sensory Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sensory Training +": {
				"name": "Tech_Sensory Training +", "fieldName": "tech_sensory_training_+", "group": "Technique", "description": "", "variable": "tch-sensory_training_+{0}", "title": "Sensory Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Broad Study": {
				"name": "Tech_Broad Study", "fieldName": "tech_broad_study", "group": "Technique", "description": "", "variable": "tch-broad_study{0}", "title": "Broad Study", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": []
				,
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Experienced Tracker": {
				"name": "Tech_Experienced Tracker", "fieldName": "tech_experienced_tracker", "group": "Technique", "description": "", "variable": "tch-experienced_tracker{0}", "title": "Experienced Tracker", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Multilingual": {
				"name": "Tech_Multilingual", "fieldName": "tech_multilingual", "group": "Technique", "description": "", "variable": "tch-multilingual{0}", "title": "Multilingual", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Multilingual +": {
				"name": "Tech_Multilingual +", "fieldName": "tech_multilingual_+", "group": "Technique", "description": "", "variable": "tch-multilingual_+{0}", "title": "Multilingual +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore": {
				"name": "Tech_Specialized Lore", "fieldName": "tech_specialized_lore", "group": "Technique", "description": "", "variable": "tch-specialized_lore{0}", "title": "Specialized Lore", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore +": {
				"name": "Tech_Specialized Lore +", "fieldName": "tech_specialized_lore_+", "group": "Technique", "description": "", "variable": "tch-specialized_lore_+{0}", "title": "Specialized Lore +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Specialized Lore ++": {
				"name": "Tech_Specialized Lore ++", "fieldName": "tech_specialized_lore_++", "group": "Technique", "description": "", "variable": "tch-specialized_lore_++{0}", "title": "Specialized Lore ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Improved Initiative": {
				"name": "Tech_Improved Initiative", "fieldName": "tech_improved_initiative", "group": "Technique", "description": "", "variable": "tch-improved_initiative{0}", "title": "Improved Initiative", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training": {
				"name": "Tech_Knowledge Training", "fieldName": "tech_knowledge_training", "group": "Technique", "description": "", "variable": "tch-knowledge_training{0}", "title": "Knowledge Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training +": {
				"name": "Tech_Knowledge Training +", "fieldName": "tech_knowledge_training_+", "group": "Technique", "description": "", "variable": "tch-knowledge_training_+{0}", "title": "Knowledge Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Knowledge Training ++": {
				"name": "Tech_Knowledge Training ++", "fieldName": "tech_knowledge_training_++", "group": "Technique", "description": "", "variable": "tch-knowledge_training_++{0}", "title": "Knowledge Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training": {
				"name": "Tech_Social Training", "fieldName": "tech_social_training", "group": "Technique", "description": "", "variable": "tch-social_training{0}", "title": "Social Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training +": {
				"name": "Tech_Social Training +", "fieldName": "tech_social_training_+", "group": "Technique", "description": "", "variable": "tch-social_training_+{0}", "title": "Social Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Social Training ++": {
				"name": "Tech_Social Training ++", "fieldName": "tech_social_training_++", "group": "Technique", "description": "", "variable": "tch-social_training_++{0}", "title": "Social Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Refocus": {
				"name": "Tech_Refocus", "fieldName": "tech_refocus", "group": "Technique", "description": "", "variable": "tch-refocus{0}", "title": "Refocus", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Refocus +": {
				"name": "Tech_Refocus +", "fieldName": "tech_refocus_+", "group": "Technique", "description": "", "variable": "tch-refocus_+{0}", "title": "Refocus +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sustained Channel": {
				"name": "Tech_Sustained Channel", "fieldName": "tech_sustained_channel", "group": "Technique", "description": "", "variable": "tch-sustained_channel{0}", "title": "Sustained Channel", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Sustained Channel +": {
				"name": "Tech_Sustained Channel +", "fieldName": "tech_sustained_channel_+", "group": "Technique", "description": "", "variable": "tch-sustained_channel_+{0}", "title": "Sustained Channel +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control": {
				"name": "Tech_Ki Control", "fieldName": "tech_ki_control", "group": "Technique", "description": "", "variable": "tch-ki_control{0}", "title": "Ki Control", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control +": {
				"name": "Tech_Ki Control +", "fieldName": "tech_ki_control_+", "group": "Technique", "description": "", "variable": "tch-ki_control_+{0}", "title": "Ki Control +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Ki Control ++": {
				"name": "Tech_Ki Control ++", "fieldName": "tech_ki_control_++", "group": "Technique", "description": "", "variable": "tch-ki_control_++{0}", "title": "Ki Control ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surge Value": {
				"name": "Tech_Surge Value", "fieldName": "tech_surge_value", "group": "Technique", "description": "", "variable": "tch-surge_value{0}", "title": "Surge Value", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Surge Value +": {
				"name": "Tech_Surge Value +", "fieldName": "tech_surge_value_+", "group": "Technique", "description": "", "variable": "tch-surge_value_+{0}", "title": "Surge Value +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training": {
				"name": "Tech_Channel Training", "fieldName": "tech_channel_training", "group": "Technique", "description": "", "variable": "tch-channel_training{0}", "title": "Channel Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training +": {
				"name": "Tech_Channel Training +", "fieldName": "tech_channel_training_+", "group": "Technique", "description": "", "variable": "tch-channel_training_+{0}", "title": "Channel Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Channel Training ++": {
				"name": "Tech_Channel Training ++", "fieldName": "tech_channel_training_++", "group": "Technique", "description": "", "variable": "tch-channel_training_++{0}", "title": "Channel Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Physical Training": {
				"name": "Tech_Physical Training", "fieldName": "tech_physical_training", "group": "Technique", "description": "", "variable": "tch-physical_training{0}", "title": "Physical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Physical Training +": {
				"name": "Tech_Physical Training +", "fieldName": "tech_physical_training_+", "group": "Technique", "description": "", "variable": "tch-physical_training_+{0}", "title": "Physical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training": {
				"name": "Tech_Body Training", "fieldName": "tech_body_training", "group": "Technique", "description": "", "variable": "tch-body_training{0}", "title": "Body Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training +": {
				"name": "Tech_Body Training +", "fieldName": "tech_body_training_+", "group": "Technique", "description": "", "variable": "tch-body_training_+{0}", "title": "Body Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Body Training ++": {
				"name": "Tech_Body Training ++", "fieldName": "tech_body_training_++", "group": "Technique", "description": "", "variable": "tch-body_training_++{0}", "title": "Body Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training": {
				"name": "Tech_Technical Training", "fieldName": "tech_technical_training", "group": "Technique", "description": "", "variable": "tch-technical_training{0}", "title": "Technical Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training +": {
				"name": "Tech_Technical Training +", "fieldName": "tech_technical_training_+", "group": "Technique", "description": "", "variable": "tch-technical_training_+{0}", "title": "Technical Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Technical Training ++": {
				"name": "Tech_Technical Training ++", "fieldName": "tech_technical_training_++", "group": "Technique", "description": "", "variable": "tch-technical_training_++{0}", "title": "Technical Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training": {
				"name": "Tech_Martial Training", "fieldName": "tech_martial_training", "group": "Technique", "description": "", "variable": "tch-martial_training{0}", "title": "Martial Training", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training +": {
				"name": "Tech_Martial Training +", "fieldName": "tech_martial_training_+", "group": "Technique", "description": "", "variable": "tch-martial_training_+{0}", "title": "Martial Training +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Martial Training ++": {
				"name": "Tech_Martial Training ++", "fieldName": "tech_martial_training_++", "group": "Technique", "description": "", "variable": "tch-martial_training_++{0}", "title": "Martial Training ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up": {
				"name": "Tech_HP Up", "fieldName": "tech_hp_up", "group": "Technique", "description": "", "variable": "tch-hp_up{0}", "title": "HP Up", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up+": {
				"name": "Tech_HP Up+", "fieldName": "tech_hp_up+", "group": "Technique", "description": "", "variable": "tch-hp_up+{0}", "title": "HP Up+", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_HP Up++": {
				"name": "Tech_HP Up++", "fieldName": "tech_hp_up++", "group": "Technique", "description": "", "variable": "tch-hp_up++{0}", "title": "HP Up++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost": {
				"name": "Tech_Vitality Boost", "fieldName": "tech_vitality_boost", "group": "Technique", "description": "", "variable": "tch-vitality_boost{0}", "title": "Vitality Boost", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost +": {
				"name": "Tech_Vitality Boost +", "fieldName": "tech_vitality_boost_+", "group": "Technique", "description": "", "variable": "tch-vitality_boost_+{0}", "title": "Vitality Boost +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Vitality Boost ++": {
				"name": "Tech_Vitality Boost ++", "fieldName": "tech_vitality_boost_++", "group": "Technique", "description": "", "variable": "tch-vitality_boost_++{0}", "title": "Vitality Boost ++", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Undying": {
				"name": "Tech_Undying", "fieldName": "tech_undying", "group": "Technique", "description": "", "variable": "tch-undying{0}", "title": "Undying", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Undying +": {
				"name": "Tech_Undying +", "fieldName": "tech_undying_+", "group": "Technique", "description": "", "variable": "tch-undying_+{0}", "title": "Undying +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extra Follow-Up Attack": {
				"name": "Tech_Extra Follow-Up Attack", "fieldName": "tech_extra_follow-up_attack", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack{0}", "title": "Extra Follow-Up Attack", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Extra Follow-Up Attack +": {
				"name": "Tech_Extra Follow-Up Attack +", "fieldName": "tech_extra_follow-up_attack_+", "group": "Technique", "description": "", "variable": "tch-extra_follow-up_attack_+{0}", "title": "Extra Follow-Up Attack +", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Change Tech Slots": {
				"name": "Tech_Change Tech Slots", "fieldName": "tech_change_tech_slots", "group": "Technique", "description": "", "variable": "tch-change_tech_slots{0}", "title": "Change Tech Slots", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Hold Out": {
				"name": "Tech_Hold Out", "fieldName": "tech_hold_out", "group": "Technique", "description": "", "variable": "tch-hold_out{0}", "title": "Hold Out", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			},
			"Tech_Overdrive": {
				"name": "Tech_Overdrive", "fieldName": "tech_overdrive", "group": "Technique", "description": "", "variable": "tch-overdrive{0}", "title": "Overdrive", "subGroup": "", "descriptions": [""],
				"abbreviation": "", "baseFormula": "", "modifiers": "", "formula": {
					"workers": [{ "variableName": "adv-level", "definitionName": "Level", "value": 0, "multiplier": 1, "max": 4 },
					{ "variableName": "adv-cr", "definitionName": "CR", "value": 0, "multiplier": 3, "max": 0 },
					{ "variableName": "adv-ap_technique", "definitionName": "AdvancementTechnique", "value": 0, "multiplier": 1, "max": 0 },
					{ "variableName": "trn-tp_technique", "definitionName": "TrainingTechniques", "value": 0, "multiplier": 1, "max": 0 }]
				},
				"linkedGroups": [],
				"isResource": "", "tier": null, "affinity": "", "isFree": true
			}
		},
		sortingGroups = {
			"group": {
				"Type": ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "DamageType", "Trait", "Status", "Condition"], "VariableMod": ["_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error"], "AffinityType": ["Wood", "Fire", "Earth", "Metal", "Water"], "InnateDefenseType": ["BOD", "PRC", "QCK"], "InnateSenseType": ["CNV", "INT", "RSN"], "AttributeValue": ["AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad"], "JobTier": ["JobTier0", "JobTier1", "JobTier2", "JobTier3"], "LoreTier": ["LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3"], "GeneralLoreTier": ["GeneralLoreTier0", "GeneralLoreTier1"], "LoreCategory": ["Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "LoreCat_Academics", "LoreCat_Profession", "LoreCat_Craftmanship", "LoreCat_Geography", "LoreCat_History", "LoreCat_Culture", "LoreCat_Religion"], "ChatType": ["Speak", "Whisper", "Yell", "Think", "Describe"], "PageSet": ["PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training"], "Page": ["Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement"], "Title": ["Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense"], "Chat": ["Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "Chat_OutfitDefault", "Chat_OutfitDefaultURL"], "Untyped": ["RepeatingActiveEmotes", "RepeatingOutfits", "Resistance"], "Advancement": ["Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques"], "Training": ["TrainingKnowledge", "TrainingTechniques", "PP"], "Attribute": ["Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN"], "Defense": ["Def_Brace", "Def_Fortitude", "Def_Disruption", "Def_Hide", "Def_Reflex", "Def_Evasion"], "Sense": ["Def_Insight", "Def_Notice", "Def_Scrutiny", "Def_Detect", "Def_Resolve", "Def_Freewill"], "Special Defense": ["CombatDefense", "SocialSense", "WillBreak"], "Origin": ["FullName", "DisplayName", "Background", "Age", "Gender", "Homeland"], "OriginStat": ["Affinity", "InnateDefense", "InnateSense"], "General": ["HP", "WILL", "EN", "Initiative", "Recall", "Carrying Capacity"], "Combat": ["Cmb_HV", "Cmb_Armor", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Chakra", "Cmb_MoveSpd", "Cmb_MovePot", "Cmb_MartialForce", "Cmb_SpellForce"], "": ["Chakra"], "Social": ["Soc_Pressure", "Soc_Rapport", "Soc_Approval", "Soc_Patience"], "DamageType": ["Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension"], "Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall", "Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy", "Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent"], "Status": ["Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious", "Stat_Aflame", "Stat_Angered", "Stat_Chilled", "Stat_Delayed", "Stat_Disgusted", "Stat_Empowered", "Stat_Encouraged", "Stat_Encumbered", "Stat_Frightened", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Joyful", "Stat_Launched", "Stat_Paralyzed", "Stat_Prone", "Stat_Saddened", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned", "Stat_Surprised"], "Style": ["Style_Basic Action", "Style_Basic Attack", "Style_Basic Movement", "Style_Basic Social", "Style_Basic Support", "Style_Charm Unrestrained", "Style_Swordplay", "Style_Ki Extension"], "Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Analyze", "Skill_Build", "Skill_Channel", "Skill_Charm", "Skill_Command", "Skill_Concoct", "Skill_Cook", "Skill_Deception", "Skill_Demoralize", "Skill_Disguise", "Skill_Empathy", "Skill_Enchant", "Skill_Finesse", "Skill_Flexibility", "Skill_Grappling", "Skill_Heal", "Skill_Inspire", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver", "Skill_Medicine", "Skill_Might", "Skill_Negotiation", "Skill_Palming", "Skill_Physique", "Skill_Pilot", "Skill_Resonance", "Skill_Search", "Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Survival", "Skill_Throw", "Skill_Tinker", "Skill_Traversal"], "Language": ["Lang_Minere", "Lang_Junal", "Lang_Apollen", "Lang_Lib", "Lang_Cert", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq", "Lang_Kleikan", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca", "Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan"], "Lore": ["Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Job": ["Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "JobStyle": ["JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "JStyle_Rogue", "JStyle_Scholar", "JStyle_Physician"]
				, "Technique": ["Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"]
			}, "subGroup": { "": ["Attribute", "Skill", "Job", "JobStyle", "Knowledge", "Language", "LoreCategory", "Lore", "Style", "StyleType", "Technique", "PageSet", "Page", "Title", "Advancement", "Training", "Defense", "Sense", "AffinityType", "InnateDefenseType", "InnateSenseType", "General", "Chat", "Combat", "Social", "DamageType", "Trait", "Status", "Condition", "_max", "_true", "_rank", "_build", "_filter", "_subfilter", "_expand", "_tab", "_page", "_info", "_exit", "_finish", "_origin", "_learn", "_pts", "_tech", "_expertise", "_gear", "_affinity", "_error", "Wood", "Fire", "Earth", "Metal", "Water", "BOD", "PRC", "QCK", "CNV", "INT", "RSN", "AttributeValueMediocre", "AttributeValueGreat", "AttributeValueGood", "AttributeValueAverage", "AttributeValueBad", "JobTier0", "JobTier1", "JobTier2", "JobTier3", "LoreTier0", "LoreTier1", "LoreTier2", "LoreTier3", "GeneralLoreTier0", "GeneralLoreTier1", "Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion", "Speak", "Whisper", "Yell", "Think", "Describe", "PageSet_Character Creator", "PageSet_Core", "PageSet_TechType", "PageSet_Advancement", "PageSet_Training", "Page_Origin", "Page_Jobs", "Page_Skills", "Page_Knowledge", "Page_Attributes", "Page_Styles", "Page_LearnTechniques", "Page_SetStyles", "Page_Character", "Page_Overview", "Page_Details", "Page_Chat", "Page_Options", "Page_Gear", "Page_Actions", "Page_Training", "Page_Advancement", "Title_Origin", "Title_OriginStats", "Title_OriginAdvancement", "Title_OriginTraining", "Title_Advancement", "Title_AdvancementConversion", "Title_Training", "Title_TrainingConversion", "Title_ShowTechnique", "Title_UseTechnique", "Title_Chat", "Title_LanguageSelect", "Title_Emotes", "Title_Outfits", "Title_TechEffect", "Title_TechDC", "Title_TechDefense", "Chat_Type", "Chat_Target", "Chat_Message", "Chat_Language", "Chat_LanguageTag", "Chat_PostContent", "RepeatingActiveEmotes", "Chat_SetId", "Chat_Emotes", "Chat_DefaultEmote", "Chat_PostName", "Chat_PostURL", "Chat_OutfitName", "Chat_OutfitEmotes", "Chat_EmoteName", "Chat_EmoteURL", "RepeatingOutfits", "Chat_OutfitDefault", "Chat_OutfitDefaultURL", "Level", "CR", "XP", "AdvancementJob", "AdvancementSkill", "AdvancementTechnique", "JobTier", "JobTechniques", "LearnStyle", "StyleTechniques", "StyleFreeTechniques", "TrainingKnowledge", "TrainingTechniques", "PP", "WillBreak", "FullName", "DisplayName", "Background", "Age", "Gender", "Homeland", "Affinity", "InnateDefense", "InnateSense", "HP", "WILL", "EN", "Initiative", "Recall", "Carrying Capacity", "Cmb_HV", "Cmb_Armor", "Resistance", "Cmb_ResistanceDesc", "Cmb_WeaknessDesc", "Cmb_Vitality", "Cmb_Surge", "Cmb_Chakra", "Chakra", "Cmb_MoveSpd", "Cmb_MovePot", "Cmb_MartialForce", "Cmb_SpellForce", "Soc_Pressure", "Soc_Rapport", "Soc_Approval", "Soc_Patience", "Dmg_Burn", "Dmg_Cold", "Dmg_Energy", "Dmg_Fire", "Dmg_Force", "Dmg_Patience", "Dmg_Piercing", "Dmg_Shock", "Dmg_Tension", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "JStyle_Interceptor", "JStyle_Guardian", "JStyle_Spellslinger", "JStyle_Warrior", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Attribute": ["Attr_BOD", "Attr_PRC", "Attr_QCK", "Attr_CNV", "Attr_INT", "Attr_RSN"], "Combat Defense": ["Def_Brace", "Def_Disruption", "Def_Reflex"], "Defense": ["Def_Fortitude", "Def_Hide", "Def_Evasion"], "Social Sense": ["Def_Insight", "Def_Scrutiny", "Def_Resolve"], "Sense": ["Def_Notice", "Def_Detect", "Def_Freewill"], "Special Defense": ["CombatDefense", "SocialSense"], "Technique Trait": ["Trait_Accurate", "Trait_Affinity", "Trait_Affinity+", "Trait_AP", "Trait_Brutal", "Trait_Evadible", "Trait_Focus", "Trait_Focus+", "Trait_Material", "Trait_Simple", "Trait_Volatile", "Trait_Vortex", "Trait_Weapon", "Trait_Wall"], "Item Trait": ["Trait_Arcing", "Trait_Shield", "Trait_Thrown", "Trait_Two-Handed", "Trait_Loud", "Trait_Light", "Trait_Sharp", "Trait_Sturdy"], "Material Trait": ["Trait_Flammable", "Trait_Flexible", "Trait_Frozen", "Trait_Transparent"], "Status": ["Stat_Downed", "Stat_Dying", "Stat_Engaged", "Stat_Ethereal", "Stat_Grappled", "Stat_Hidden", "Stat_Invisible", "Stat_Multiact", "Stat_Restrained", "Stat_Unconscious"], "Condition": ["Stat_Aflame", "Stat_Angered", "Stat_Chilled", "Stat_Delayed", "Stat_Disgusted", "Stat_Empowered", "Stat_Encouraged", "Stat_Encumbered", "Stat_Frightened", "Stat_Hasted", "Stat_Immobilized", "Stat_Impaired", "Stat_Joyful", "Stat_Launched", "Stat_Paralyzed", "Stat_Prone", "Stat_Saddened", "Stat_Sickened", "Stat_Staggered", "Stat_Stunned", "Stat_Surprised"], "Basic": ["Style_Basic Action", "Style_Basic Attack", "Style_Basic Movement", "Style_Basic Social", "Style_Basic Support"], "Standard": ["Style_Charm Unrestrained", "Style_Swordplay", "Style_Ki Extension"], "Athletics Skill": ["Skill_Acrobatics", "Skill_Agility", "Skill_Physique", "Skill_Sneak", "Skill_Traversal"], "Sensing Skill": ["Skill_Analyze", "Skill_Empathy", "Skill_Resonance", "Skill_Search", "Skill_Survival"], "Creation Skill": ["Skill_Build", "Skill_Channel", "Skill_Cook", "Skill_Disguise", "Skill_Medicine"], "Social Skill": ["Skill_Charm", "Skill_Deception", "Skill_Demoralize", "Skill_Inspire", "Skill_Negotiation"], " Skill": ["Skill_Command", "Skill_Concoct", "Skill_Flexibility", "Skill_Heal", "Skill_Intimidation", "Skill_Leadership", "Skill_Maneuver"], "Manipulate Skill": ["Skill_Enchant", "Skill_Palming", "Skill_Pilot", "Skill_Throw", "Skill_Tinker"], "Combat Skill": ["Skill_Finesse", "Skill_Grappling", "Skill_Might", "Skill_Shoot", "Skill_Skirmish"], "Walthair": ["Lang_Minere", "Lang_Crinere", "Lang_Palmic", "Lang_Shorespeak", "Lang_Verdeni", "Lang_Vulca"], "Aridsha": ["Lang_Junal", "Lang_Byric", "Lang_Dustell", "Lang_Muralic", "Lang_Shira"], "Khem": ["Lang_Apollen", "Lang_Kleikan"], "Colswei": ["Lang_Lib"], "Ceres": ["Lang_Cert", "Lang_Ciel", "Lang_Citeq", "Lang_Manstan", "Lang_Salkan", "Lang_Sansic", "Lang_Silq"], "Special": ["Lang_Emotion", "Lang_Empathy", "Lang_Wolfwarg", "Lang_Jovean", "Lang_Mytikan"], "Academics": ["LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology"], "Profession": ["LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining"], "Craftmanship": ["LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving"], "Geography": ["LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane"], "History": ["LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History"], "Culture": ["LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater"], "Religion": ["LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"], "Athletics": ["Job_Rogue", "JStyle_Rogue"], "Focus": ["Job_Scholar", "JStyle_Scholar"], "Technical": ["Job_Physician", "JStyle_Physician"], "Basic Action": ["Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact"], "Basic Movement": ["Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition"], "Basic Support": ["Tech_Aid", "Tech_Stabilize", "Tech_Encourage"], "Basic Attack": ["Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike"], "Basic Social": ["Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand"], "Warrior; Guardian": ["Tech_Defender", "Tech_Defender II"], "Rogue": ["Tech_Athlete", "Tech_Athlete II"], "Warrior": ["Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted"], "Interceptor": ["Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim"], "Spellslinger": ["Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot"], "Guardian": ["Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation"], "Generalist": ["Tech_Generalist"], "Defender": ["Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery"], "Skirmisher": ["Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike"], "Marksman": ["Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike"], "Athlete": ["Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint"], "Charm Unrestrained": ["Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II"], "Ki Extension": ["Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +"], "Swordplay": ["Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II"] }, "formulaMods": {
				"CR": ["Attribute", "Skill", "Job", "Technique", "HP", "WILL", "Initiative", "Cmb_HV", "Cmb_Chakra", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician", "Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Level": ["Skill", "Technique", "Advancement", "HP", "WILL", "Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "AdvancementSkill": ["Skill"], "AdvancementJob": ["Job", "Job_Interceptor", "Job_Guardian", "Job_Spellslinger", "Job_Warrior", "Job_Rogue", "Job_Scholar", "Job_Physician"], "TrainingKnowledge": ["Knowledge"], "AdvancementTechnique": ["Technique", "Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "TrainingTechniques": ["Technique", "Tech_Hide", "Tech_Mount", "Tech_Prepare", "Tech_Seach", "Tech_Skill Check", "Tech_Grab an Edge", "Tech_Interact", "Tech_Break Free", "Tech_Dash", "Tech_Escape", "Tech_Reposition", "Tech_Aid", "Tech_Stabilize", "Tech_Encourage", "Tech_Grapple", "Tech_Unarmed Strike", "Tech_Basic Slash", "Tech_Throw", "Tech_Heavy Strike", "Tech_Build Rapport", "Tech_Build Pressure", "Tech_Request", "Tech_Demand", "Tech_Defender", "Tech_Defender II", "Tech_Athlete", "Tech_Athlete II", "Tech_Second Wind", "Tech_Second Breath", "Tech_Undaunted", "Tech_Preemptive Strike", "Tech_Preemptive Stagger", "Tech_Critical Maim", "Tech_Spellshot", "Tech_Follow-Up Spellshot", "Tech_Bursting Spellshot", "Tech_Savior", "Tech_Knock Away Savior", "Tech_Savior's Retaliation", "Tech_Spellstrike", "Tech_Power Skirmish", "Tech_Sneak Attack", "Tech_Sneaky Follow-Up", "Tech_Assassinate", "Tech_Emergency Care", "Tech_Nightingale", "Tech_Rhapsody", "Tech_Metamagic", "Tech_Strategize", "Tech_Foresight", "Tech_Saw That Coming", "Tech_As You May Recall", "Tech_Generalist", "Tech_Defender's Will", "Tech_Defender's Taunt", "Tech_Defender's Recovery", "Tech_Skirmisher", "Tech_Skirmisher II", "Tech_Skirmisher's Step", "Tech_Skirmisher's Strike", "Tech_Marksman", "Tech_Marksman II", "Tech_Marksman's Longshot", "Tech_Marksman's Sight", "Tech_Marksman's Strike", "Tech_Athlete's Sprint", "Tech_Athlete's Reach", "Tech_Bounding Sprint", "Tech_Skulk Away", "Tech_Skulk Then Hide", "Tech_First Aid", "Tech_Cleansing Aid", "Tech_Environmental Awareness", "Tech_Eclectic Knowledge", "Tech_Point of Clarity", "Tech_Flatter", "Tech_Captivate", "Tech_Magnetic Charm", "Tech_Disarming Gaze", "Tech_Pander", "Tech_Flatter II", "Tech_Compliment", "Tech_Pump Up", "Tech_Enthusiasm", "Tech_Reinforce", "Tech_Bravado", "Tech_Zeal", "Tech_Motivational Speech", "Tech_Meditate", "Tech_Guided Thought", "Tech_Casual Conversation", "Tech_Deepen Connection", "Tech_Mindfulness", "Tech_Serenity of Mind", "Tech_Tranquility", "Tech_Clemency", "Tech_Emotional Intelligence", "Tech_Sympathy", "Tech_Threaten", "Tech_Rage", "Tech_Veiled Anger", "Tech_Gruff", "Tech_Oppress", "Tech_Tyrannize", "Tech_Bellow", "Tech_Bulldoze", "Tech_Domineer", "Tech_Enforcement", "Tech_Agitation", "Tech_Bluster", "Tech_Give No Quarter", "Tech_Eye on the Prize", "Tech_Subvert", "Tech_Compromise", "Tech_Appeal to Reason", "Tech_Common Ground", "Tech_Silver Tongue", "Tech_Dig Deep", "Tech_Debate", "Tech_Final Push", "Tech_Diplomacy", "Tech_Subtlety", "Tech_Consideration", "Tech_Fast Talk", "Tech_Swift Rebuttal", "Tech_Intrigue", "Tech_Duplicity", "Tech_Evil Eye", "Tech_Invective", "Tech_Mean", "Tech_Seeds of Doubt", "Tech_White Lie", "Tech_Fuel the Fire", "Tech_Reel'Em In", "Tech_Close it Out", "Tech_Hustle", "Tech_Beguile", "Tech_Obtuse", "Tech_Reconsider", "Tech_Segue", "Tech_Stammer", "Tech_Unfazed", "Tech_Pole Vault", "Tech_Quick Draw", "Tech_Extension Strike", "Tech_Step Extension", "Tech_Lasting Extension", "Tech_Far Strike", "Tech_Extension Strike +", "Tech_Quick Slash", "Tech_Precision Blade", "Tech_Armor Piercer", "Tech_Quick Slash II", "Tech_Cleave", "Tech_Crushing Blade", "Tech_Great Cleave", "Tech_Cleave +", "Tech_Sudden Cleave", "Tech_Great Cleave II", "Tech_Power Flex", "Tech_Crush Knuckle", "Tech_Impact Knuckle", "Tech_Knuckle Flurry", "Tech_Water Blast", "Tech_Geyser", "Tech_Geyser Line", "Tech_Surf", "Tech_Great Geyser Line", "Tech_Tidal Wave", "Tech_Sand Surge", "Tech_Sand Spout", "Tech_Sand Wave", "Tech_Sand Launcher", "Tech_Sicken", "Tech_Spores", "Tech_Sickening Cloud", "Tech_Virulent Spores", "Tech_Firebolt", "Tech_Flame Arrow", "Tech_Fireball", "Tech_Fireblast", "Tech_Ragnarok", "Tech_Bonfire", "Tech_Wall of Fire", "Tech_Field of Flame", "Tech_Lightning Shaft", "Tech_Shock", "Tech_Lightning Bolt", "Tech_Plasma Arc", "Tech_Fulgor", "Tech_Cold Snap", "Tech_Frostbite", "Tech_Freezebind", "Tech_Cold Burst", "Tech_Cold Front", "Tech_Diamond Dust", "Tech_Wind Bullet", "Tech_Gust", "Tech_Windsweep", "Tech_Gale", "Tech_Darkness", "Tech_Shadow Wall", "Tech_Nightfall", "Tech_Fog Cloud", "Tech_Sleet", "Tech_Freezing Sleet", "Tech_Hail", "Tech_Binding Sleet", "Tech_Ice Storm", "Tech_Fimbulwinter", "Tech_Smoke Cloud", "Tech_Burning Smoke", "Tech_Choking Smoke", "Tech_Acceleration", "Tech_Power Vault", "Tech_Expeditious", "Tech_Quick Climb", "Tech_Quick Swim", "Tech_Poise", "Tech_Cat Fall", "Tech_Kip Up", "Tech_Silent Stride", "Tech_Shove", "Tech_Knockdown", "Tech_Tumble", "Tech_Field Medic", "Tech_Camoflauge", "Tech_Blurred Light", "Tech_Light Refraction", "Tech_Shadow Steps", "Tech_Shadow Walker", "Tech_Wind Step", "Tech_Updraft", "Tech_Clouded Updraft", "Tech_Wind Fall", "Tech_Walk on Air", "Tech_Fire Step", "Tech_Liftoff", "Tech_Jet", "Tech_Cunning Action", "Tech_Demoralize", "Tech_Fascinate", "Tech_Impersonator", "Tech_Ether Sense", "Tech_Spirit Sense", "Tech_Tremorsense", "Tech_Dustcraft", "Tech_Shape Material", "Tech_Quickcraft", "Tech_Improved Shaping", "Tech_Greater Shaping", "Tech_Legendary Shaping", "Tech_Dust Material", "Tech_Dust Area", "Tech_Improved Dusting", "Tech_Greater Dusting", "Tech_Legendary Dusting", "Tech_Form Path", "Tech_Form Pillar", "Tech_Stepping Path", "Tech_Form Wall", "Tech_Scattered Pillars", "Tech_Great Wall", "Tech_Cultivate", "Tech_Entangle", "Tech_Wildwood", "Tech_Distortion", "Tech_Lasting Distortion", "Tech_Heat Field", "Tech_Burn Guard", "Tech_Cold Field", "Tech_Chill Guard", "Tech_Kinesis", "Tech_Distant Kinesis", "Tech_Kinetic Strike", "Tech_Kinetic Throw", "Tech_Heavy Kinesis", "Tech_Burden", "Tech_Pressure", "Tech_Restrain", "Tech_Wide Pressure", "Tech_Prostration", "Tech_Deep Pressure", "Tech_Gravity Well", "Tech_Shield Block", "Tech_Glancing Block", "Tech_Aegis", "Tech_Light", "Tech_Dancing Lights", "Tech_Flash", "Tech_Sunlight", "Tech_Stress Release", "Tech_Stress Release +", "Tech_Stress Release ++", "Tech_Sensory Training", "Tech_Sensory Training +", "Tech_Broad Study", "Tech_Experienced Tracker", "Tech_Multilingual", "Tech_Multilingual +", "Tech_Specialized Lore", "Tech_Specialized Lore +", "Tech_Specialized Lore ++", "Tech_Improved Initiative", "Tech_Knowledge Training", "Tech_Knowledge Training +", "Tech_Knowledge Training ++", "Tech_Social Training", "Tech_Social Training +", "Tech_Social Training ++", "Tech_Refocus", "Tech_Refocus +", "Tech_Sustained Channel", "Tech_Sustained Channel +", "Tech_Ki Control", "Tech_Ki Control +", "Tech_Ki Control ++", "Tech_Surge Value", "Tech_Surge Value +", "Tech_Channel Training", "Tech_Channel Training +", "Tech_Channel Training ++", "Tech_Physical Training", "Tech_Physical Training +", "Tech_Body Training", "Tech_Body Training +", "Tech_Body Training ++", "Tech_Technical Training", "Tech_Technical Training +", "Tech_Technical Training ++", "Tech_Martial Training", "Tech_Martial Training +", "Tech_Martial Training ++", "Tech_HP Up", "Tech_HP Up+", "Tech_HP Up++", "Tech_Vitality Boost", "Tech_Vitality Boost +", "Tech_Vitality Boost ++", "Tech_Undying", "Tech_Undying +", "Tech_Extra Follow-Up Attack", "Tech_Extra Follow-Up Attack +", "Tech_Change Tech Slots", "Tech_Hold Out", "Tech_Overdrive"], "Attr_BOD": ["Def_Brace", "Def_Fortitude", "HP", "Carrying Capacity", "Cmb_MartialForce"], "Attr_PRC": ["Def_Disruption", "Def_Hide", "Cmb_SpellForce"], "Attr_QCK": ["Def_Reflex", "Def_Evasion", "Initiative"], "Attr_INT": ["Def_Insight", "Def_Notice"], "Attr_RSN": ["Def_Scrutiny", "Def_Detect", "Recall"], "Attr_CNV": ["Def_Resolve", "Def_Freewill", "WILL", "Cmb_HV"], "Attribute_QCK": ["Skill_Acrobatics", "Skill_Agility", "Skill_Finesse", "Skill_Palming", "Skill_Pilot"], "Attribute_RSN": ["Skill_Analyze", "Skill_Build", "Skill_Deception", "Skill_Medicine", "Skill_Negotiation"], "Attribute_CNV": ["Skill_Channel", "Skill_Demoralize", "Skill_Enchant", "Skill_Inspire", "Skill_Resonance"], "Attribute_INT": ["Skill_Charm", "Skill_Cook", "Skill_Disguise", "Skill_Empathy", "Skill_Search"], "Attribute_BOD": ["Skill_Grappling", "Skill_Might", "Skill_Physique", "Skill_Survival", "Skill_Traversal"], "Attribute_PRC": ["Skill_Shoot", "Skill_Skirmish", "Skill_Sneak", "Skill_Throw", "Skill_Tinker"]
				, "Recall": ["LoreCat_Academics", "Lore_Health", "Lore_Mana", "Lore_Mathematics", "Lore_Nature", "Lore_School", "Lore_Spirit", "Lore_Warfare", "Lore_Zoology", "LoreCat_Profession", "Lore_Farming", "Lore_Fishing", "Lore_Hunting", "Lore_Legal", "Lore_Mercantile", "Lore_Mining", "LoreCat_Craftmanship", "Lore_Alchemy", "Lore_Architecture", "Lore_Brewing", "Lore_Cooking", "Lore_Engineering", "Lore_Glassblowing", "Lore_Leatherworking", "Lore_Sculpting", "Lore_Smithing", "Lore_Weaving", "LoreCat_Geography", "Lore_Aridsha", "Lore_Ceres", "Lore_Colswei", "Lore_Khem", "Lore_Novus", "Lore_Walthair", "Lore_Wayling", "Lore_Ethereal Plane", "LoreCat_History", "Lore_Aridsha History", "Lore_Ceres History", "Lore_Colswei History", "Lore_Khem History", "Lore_Novus History", "Lore_Walthair History", "Lore_Wayling History", "LoreCat_Culture", "Lore_Art", "Lore_Etiquette", "Lore_Fashion", "Lore_Games", "Lore_Music", "Lore_Scribing", "Lore_Theater", "LoreCat_Religion", "Lore_Church of Kongkwei", "Lore_Guidance", "Lore_Life's Circle", "Lore_Ocean Court", "Lore_Sylvan", "Lore_Zushaon"]
			}
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
			if (values[key] == undefined) {
				let definition = new DefinitionData();
				definition.name = `${key} Not Found`;
				return definition;
			}
			switch (values[key]["group"]) {
				case "Technique":
					return new TechniqueDefinitionData(values[key]);
				case "Style":
					return new TechniqueStyleDefinitionData(values[key]);
				case "Language":
					return new LanguageDefinitionData(values[key]);
				case "Job":
					return new JobDefinitionData(values[key]);
				case "Status":
					return new StatusDefinitionData(values[key]);
				default:
					return new DefinitionData(values[key]);
			}
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
				return data.title;
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
