// Main: Name
on("change:full_name ", function (eventinfo) {
	update_nickname(eventinfo.newValue);
});


// Core: Ability Scores

on("change:strength_base change:strength_bonus", function () {
	update_mod("strength");
});

on("change:strength", function () {
	update_mod("strength");
	update_weight();
});

on("change:dexterity_base change:dexterity_bonus", function () {
	update_attr("dexterity");
});

on("change:dexterity", function () {
	update_mod("dexterity");
	update_initiative();
});

on("change:constitution_base change:constitution_bonus", function () {
	update_mod("constitution");
});

on("change:constitution", function () {
	update_mod("constitution");
});

on("change:intelligence_base change:intelligence_bonus", function () {
	update_mod("intelligence");
});

on("change:intelligence", function () {
	update_mod("intelligence");
});

on("change:wisdom_base change:wisdom_bonus", function () {
	update_mod("wisdom");
});

on("change:wisdom", function () {
	update_mod("wisdom");
	update_initiative();
});

on("change:charisma_base change:charisma_bonus", function () {
	update_mod("charisma");
});

on("change:charisma", function () {
	update_mod("charisma");
});

on("change:strength_mod", function () {
	update_save("strength");
	update_skills_by_ability_score("strength");
	update_actions("strength");
	update_spell_info("strength");
	update_ac();
});

on("change:dexterity_mod", function () {
	update_save("dexterity");
	update_skills_by_ability_score("dexterity");
	update_actions("dexterity");
	update_spell_info("dexterity");
	update_ac();
});

on("change:constitution_mod", function () {
	update_save("constitution");
	update_skills_by_ability_score("constitution");
	update_actions("constitution");
	update_spell_info("constitution");
});

on("change:intelligence_mod", function () {
	update_save("intelligence");
	update_skills_by_ability_score("intelligence");
	update_actions("intelligence");
	update_spell_info("intelligence");
	update_ac();
	update_class_spellcasting();
});

on("change:wisdom_mod", function () {
	update_save("wisdom");
	update_skills_by_ability_score("wisdom");
	update_actions("wisdom");
	update_spell_info("wisdom");
	update_ac();
	update_class_spellcasting();
	update_initiative();
});

on("change:charisma_mod", function () {
	update_save("charisma");
	update_skills_by_ability_score("charisma");
	update_actions("charisma");
	update_spell_info("charisma");
	update_ac();
	update_class_spellcasting();
});

on("change:strength_save_prof change:strength_save_mod", function () {
	update_save("strength");
});

on("change:dexterity_save_prof change:dexterity_save_mod", function () {
	update_save("dexterity");
});

on("change:constitution_save_prof change:constitution_save_mod", function () {
	update_save("constitution");
});

on("change:intelligence_save_prof change:intelligence_save_mod", function () {
	update_save("intelligence");
});

on("change:wisdom_save_prof change:wisdom_save_mod", function () {
	update_save("wisdom");
});

on("change:charisma_save_prof change:charisma_save_mod", function () {
	update_save("charisma");
});

on("change:globalsavemod", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_all_saves();
});




// Core: Character Base

on("change:characterSetupBase", function () {
	let update = {};
	update["characterBase-Basics-flag"] = "0";
	update["characterBase-AbilityScores-flag"] = "on";
	setAttrs(update, {
		silent: true
	});
});

on("change:characterSetupAbilityScores", function () {

	getAttrs(["characterType"], function (v) {
		let update = {};
		update["characterBase-AbilityScores-flag"] = "0";
		switch(v["characterType"]) {
			case "0":
				update["characterBase-Ancestry-flag"] = "on";
			break;
			case "Spirit":
				update["characterBase-MagicSection-flag"] = "on";
			break;
			case "Beast":
				update["characterBase-Ancestry-flag"] = "on";
			break;
		}

		setAttrs(update, {
			silent: true
		});
	});
});

on("change:characterSetupAncestry", function () {

	getAttrs(["characterType"], function (v) {
		let update = {};
		update["characterBase-Ancestry-flag"] = "0";
		switch(v["characterType"]) {
			case "0":
				update["characterBase-Background-flag"] = "on";
			break;
			case "Spirit":
				update["characterBase-MagicSection-flag"] = "on";
			break;
			case "Beast":
				update["characterBase-MagicSection-flag"] = "on";
			break;
		}

		setAttrs(update, {
			silent: true
		});
	});
});

on("change:characterSetupBackground", function () {

	getAttrs(["characterType"], function (v) {
		let update = {};
		update["characterBase-Background-flag"] = "0";
		switch(v["characterType"]) {
			case "0":
				update["characterBase-MagicSection-flag"] = "on";
			break;
			case "Spirit":
				update["characterBase-MagicSection-flag"] = "on";
			break;
			case "Beast":
				update["characterBase-MagicSection-flag"] = "on";
			break;
		}

		setAttrs(update, {
			silent: true
		});
	});
});

on("change:characterSetupMagicSection", function () {

	let update = {};
	update["characterBase-MagicSection-flag"] = "0";
	update["characterBase-Progression-flag"] = "on";

	setAttrs(update, {
		silent: true
	});
});

on("change:characterSetupProgression", function () {

	let update = {};
	update["characterBase-Progression-flag"] = "0";

	setAttrs(update, {
		silent: true
	});
});


// Core: Ability Score Rolling
on("change:abilityScoreRollStyle", function (eventinfo) {
	update_character_rollstyle(eventinfo.newValue);
});

on("clicked:rerollAll", function () {
	update_character_roll_all();
});

on("clicked:rerollDie1", function (eventinfo) {
	update_character_roll_individual("1");
});

on("clicked:rerollDie2", function (eventinfo) {
	update_character_roll_individual("2");
});

on("clicked:rerollDie3", function (eventinfo) {
	update_character_roll_individual("3");
});

on("clicked:rerollDie4", function (eventinfo) {
	update_character_roll_individual("4");
});

on("clicked:rerollDie5", function (eventinfo) {
	update_character_roll_individual("5");
});

on("clicked:rerollDie6", function (eventinfo) {
	update_character_roll_individual("6");
});




// Core: Ancestry
on("change:characterEthnicity", function (eventinfo) {
	update_character_ethnicity(eventinfo.newValue);
});

on("change:characterAncestry-abilityScores", function (eventinfo) {
	update_character_ethnicity_abilityScores(eventinfo.newValue);
});

on("change:characterAncestry-skill", function (eventinfo) {
	update_character_ethnicity_skills(eventinfo.newValue);
});

on("change:characterAncestry-feat", function (eventinfo) {
	update_character_ethnicity_feats(eventinfo.newValue);
});

on("change:ancestryFeatButton", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_character_base_add_feature("ancestryFeatName");
});

on("change:background", function (eventinfo) {
	update_character_background(eventinfo.newValue);
});

on("change:backgroundFeatButton", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_character_base_add_feature("backgroundFeatName");
});

on("change:spellcasting_ability", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_starting_caster_bonuses();
	update_class_spellcasting();
});

on("change:characterSetupSpell-Kinesis change:characterSetupSpell-Diakopy change:characterSetupSpell-Katapeltis change:characterSetupSpell-Chlorotheurgy change:characterSetupSpell-Pyrotheurgy change:characterSetupSpell-Geotheurgy change:characterSetupSpell-Ferrotheurgy change:characterSetupSpell-Hydrotheurgy", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let buttonNameBase = "characterSetupSpell-";
	var len = buttonNameBase.length;
	update_character_base_add_spell(eventinfo.sourceAttribute.substr(len));
});









// Core: Class Levels
on("change:class", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_class_restrictions(eventinfo.newValue);
	update_classLevels_complex_all();
});

on("change:simplifyLeveling", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_classLevels_complex_all();
});

on("change:simpleLevelArchetypeType change:simpleLevelArchetypesLevel change:simpleLevelArchetypeHpBonus change:simpleLevelArchetypeBrBonus change:simpleLevelArchetypeSpBonus", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_classLevels_simple();
});

on("change:magicSpellforce change:magicAffinityControl change:magicWillpower change:magicKiCapacity", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_caster_points();
});

on("change:simpleLevelUpdate", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_classLevels_simple_push();
});

on("change:repeating_archetypeLevels:levelingStep1", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	update_classLevels_character_type([id]);
	update_classLevels_complex_starting_archetype(id);
});

on("change:repeating_archetypeLevels:levelingStep2", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	let update = {};
	update[GetSectionIdName(repeatingSection, id, "levelingStep1Display")] = "1";
	setAttrs(update, {
		silent: true
	});
});

on("change:repeating_archetypeLevels:levelingStep2Finish", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	let update = {};
	update[GetSectionIdName(repeatingSection, id, "levelingStep1Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep2Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep3Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep4Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep2")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep3")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep4")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep5")] = "1";
	update[GetSectionIdName(repeatingSection, id, "options-flag")] = "1";
	setAttrs(update, {
		silent: true
	});
	update_classLevels_character_type([id]);
	update_classLevels_complex_starting_archetype(id);
	update_classLevels_complex_profs_and_feats(id);
});

on("change:repeating_archetypeLevels:levelingStep3", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	let update = {};
	update[GetSectionIdName(repeatingSection, id, "levelingStep2Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep3Display")] = "1";
	update[GetSectionIdName(repeatingSection, id, "levelingStep4")] = "1";
	setAttrs(update, {
		silent: true
	});
});

on("change:repeating_archetypeLevels:levelingStep4", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	let update = {};
	update[GetSectionIdName(repeatingSection, id, "levelingStep3Display")] = "1";
	setAttrs(update, {
		silent: true
	});
	update_classLevels_complex_profs_and_feats(id);
});

on("change:repeating_archetypeLevels:levelingStep5", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	let repeatingSection = "repeating_archetypeLevels";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute,repeatingSection);
	let update = {};
	update[GetSectionIdName(repeatingSection, id, "levelingStep4Display")] = "1";
	setAttrs(update, {
		silent: true
	});
});

on("change:repeating_archetypeLevels:archetypeType change:repeating_archetypeLevels:archetypeHpBonus change:repeating_archetypeLevels:archetypeBrBonus change:repeating_archetypeLevels:archetypeSpBonus", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	
	update_classLevels_complex_growths(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_archetypeLevels"));
	update_caster_point_totals();
});

on("change:repeating_archetypeLevels:archetypeType", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_classLevels_complex_profs_and_feats(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_archetypeLevels"));
});

on("change:repeating_archetypeLevels:levelingFeatSearch0 change:repeating_archetypeLevels:levelingFeatSearch1 change:repeating_archetypeLevels:levelingFeatSearch2 change:repeating_archetypeLevels:levelingFeatSearch3 change:repeating_archetypeLevels:levelingFeatSearch4 change:repeating_archetypeLevels:levelingFeatSearch5 change:repeating_archetypeLevels:levelingFeatSearch6", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_feature_preview_from_database(eventinfo.newValue, 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_archetypeLevels"), 
		eventinfo.sourceAttribute.substring(eventinfo.sourceAttribute.length - 1));
});

on("change:repeating_archetypeLevels:levelingFeatAddButton0 change:repeating_archetypeLevels:levelingFeatAddButton1 change:repeating_archetypeLevels:levelingFeatAddButton2 change:repeating_archetypeLevels:levelingFeatAddButton3 change:repeating_archetypeLevels:levelingFeatAddButton4 change:repeating_archetypeLevels:levelingFeatAddButton5 change:repeating_archetypeLevels:levelingFeatAddButton6", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_classLevels_add_feature(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_archetypeLevels"), 
		eventinfo.sourceAttribute.substring(eventinfo.sourceAttribute.length - 1));
});

on("change:repeating_archetypeLevels:levelingStep6", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var update = {};
	var repeatingArchetypes = "repeating_archetypeLevels";
	var currentID = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_archetypeLevels");
	update[GetSectionIdName(repeatingArchetypes, currentID, "options-flag")] = "0";
	setAttrs(update, {
		silent: true
	});
});


// Core: Ability Scores

on("change:strength_baseroll change:strength_ancestrybonus change:strength_miscbonus change:dexterity_baseroll change:dexterity_ancestrybonus change:dexterity_miscbonus change:constitution_baseroll change:constitution_ancestrybonus change:constitution_miscbonus change:intelligence_baseroll change:intelligence_ancestrybonus change:intelligence_miscbonus change:wisdom_baseroll change:wisdom_ancestrybonus change:wisdom_miscbonus change:charisma_baseroll change:charisma_ancestrybonus change:charisma_miscbonus change:repeating_abilityscoreincreases", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_ability_score_totals();
});

on("change:repeating_sourcepointprofs", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_source_points();
});





// Core: Proficiencies

on("change:pb", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	finish_update_pb();
});

on("change:isSpiritRealm change:spell_profrank-effect change:spell_profmod-effect change:spirit_profrank-effect change:spirit_profmod-effect change:manaKiBonus change:manaSurgeBonus change:manaEtherBonus change:manaEssenceBonus change:spell_slot_bonus", function () {
	update_class_spellcasting();
});

on("change:branch_profrank-plantation change:branch_profmod-plantation change:branch_profrank-toxin change:branch_profmod-toxin change:branch_profrank-health change:branch_profmod-health change:branch_profrank-wind change:branch_profmod-wind change:branch_profrank-mana change:branch_profmod-mana change:branch_profrank-corrosion change:branch_profmod-corrosion change:branch_profrank-flame change:branch_profmod-flame change:branch_profrank-glass change:branch_profmod-glass change:branch_profrank-light change:branch_profmod-light change:branch_profrank-soul change:branch_profmod-soul change:branch_profrank-smoke change:branch_profmod-smoke change:branch_profrank-radiation change:branch_profmod-radiation change:branch_profrank-rock change:branch_profmod-rock change:branch_profrank-sand change:branch_profmod-sand change:branch_profrank-power change:branch_profmod-power change:branch_profrank-gravity change:branch_profmod-gravity change:branch_profrank-shadow change:branch_profmod-shadow change:branch_profrank-tremor change:branch_profmod-tremor change:branch_profrank-forge change:branch_profmod-forge change:branch_profrank-nimbus change:branch_profmod-nimbus change:branch_profrank-blood change:branch_profmod-blood change:branch_profrank-ether change:branch_profmod-ether change:branch_profrank-reflection change:branch_profmod-reflection change:branch_profrank-force change:branch_profmod-force change:branch_profrank-fluid change:branch_profmod-fluid change:branch_profrank-ice change:branch_profmod-ice change:branch_profrank-restoration change:branch_profmod-restoration change:branch_profrank-time change:branch_profmod-time change:branch_profrank-sound change:branch_profmod-sound change:branch_profrank-storm change:branch_profmod-storm", function (eventinfo) {
	callback = function () {
		update_spell_info(eventinfo.sourceAttribute.substring(eventinfo.sourceAttribute.indexOf("-") + 1));
	}
	update_proficiency([eventinfo.sourceAttribute], callback);
	update_branch_proficiency_points();
});

on("change:branchFeatBonus change:branchMiscBonus", function () {
	update_branch_proficiency_points();
});


on("change:weapon_profrank-blade change:weapon_profmod-blade change:weapon_profrank-bow change:weapon_profmod-bow change:weapon_profrank-brawling change:weapon_profmod-brawling change:weapon_profrank-dart change:weapon_profmod-dart change:weapon_profrank-flail change:weapon_profmod-flail change:weapon_profrank-hammer change:weapon_profmod-hammer change:weapon_profrank-pistol change:weapon_profmod-pistol change:weapon_profrank-polearm change:weapon_profmod-polearm change:weapon_profrank-rifle change:weapon_profmod-rifle", function (eventinfo) {
	callback = function () {
		update_actions(eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1));
	}
	update_proficiency([eventinfo.sourceAttribute], callback);
	update_weapon_proficiency_points();
});

on("change:weaponFeatBonus change:weaponMiscBonus", function () {
	update_weapon_proficiency_points();
});

on("change:armor_profrank-unarmored change:armor_profmod-unarmored change:armor_profrank-light change:armor_profmod-light change:armor_profrank-medium change:armor_profmod-medium change:armor_profrank-heavy change:armor_profmod-heavy change:gearEquippedShieldRaised", function (eventinfo) {
	callback = function () {
		update_ac();
	}
	update_proficiency([eventinfo.sourceAttribute], callback);
	update_armor_proficiency_points();
});

on("change:armorFeatBonus change:armorMiscBonus", function () {
	update_armor_proficiency_points();
});


// Core: Add Spells
on("clicked:addspell-shimmer clicked:addspell-distortion clicked:addspell-dustwood clicked:addspell-dustglass clicked:addspell-dustearth clicked:addspell-dustmetal clicked:addspell-dustice clicked:addspell-dustironwood clicked:addspell-excavate clicked:addspell-dustglacial clicked:addspell-dustfireglass clicked:addspell-dustadamantine clicked:addspell-dustplatinum clicked:addspell-dustviridium clicked:addspell-dustobsidian clicked:addspell-dustmithral clicked:addspell-dustalbryst clicked:addspell-forestguise clicked:addspell-lightblindness clicked:addspell-shadowwalk clicked:addspell-earthguise clicked:addspell-shadowsteps clicked:addspell-waterguise clicked:addspell-cloudofshadow clicked:addspell-shadowstalker clicked:addspell-windwall clicked:addspell-walloffire clicked:addspell-wallofsand clicked:addspell-bladebarrier clicked:addspell-wallofwater clicked:addspell-wallofforce clicked:addspell-fogcloud clicked:addspell-congregateclouds clicked:addspell-mistyterrain clicked:addspell-smokecloud clicked:addspell-sandstorm clicked:addspell-ashencloud clicked:addspell-solidsmoke clicked:addspell-incendiarycloud clicked:addspell-produceheat clicked:addspell-staticshock clicked:addspell-producecold clicked:addspell-petalstorm clicked:addspell-spore clicked:addspell-silence clicked:addspell-sleetstorm clicked:addspell-irradiate clicked:addspell-soundbuffer clicked:addspell-diamonddust clicked:addspell-updraft clicked:addspell-alleviate clicked:addspell-calmair clicked:addspell-downdraft clicked:addspell-pressure clicked:addspell-zerogravity clicked:addspell-reversegravity clicked:addspell-light clicked:addspell-dancinglights clicked:addspell-dancingdarkness clicked:addspell-burninglight clicked:addspell-darkness clicked:addspell-deeperdarkness clicked:addspell-dawn clicked:addspell-entangle clicked:addspell-seism clicked:addspell-icefloor clicked:addspell-eruption clicked:addspell-twister clicked:addspell-quicksand clicked:addspell-whirlpool clicked:addspell-flamewhirl clicked:addspell-tornado clicked:addspell-flamecyclone clicked:addspell-antlionpit clicked:addspell-maelstrom clicked:addspell-blizzard clicked:addspell-nubikinesis clicked:addspell-forcehand clicked:addspell-catapult clicked:addspell-floatingdisk ", function (eventinfo) {
	update_character_branches_add_spell(eventinfo.triggerName);
});
on("clicked:addspell-gustofwind clicked:addspell-partsand clicked:addspell-sandtunnel clicked:addspell-partwater clicked:addspell-tidalsurge clicked:addspell-stormgust clicked:addspell-kinetichaul clicked:addspell-createforgeduplicate clicked:addspell-createglassduplicate clicked:addspell-createiceduplicate clicked:addspell-createplantduplicate clicked:addspell-createrockduplicate clicked:addspell-quickcraftwood clicked:addspell-quickcraftglass clicked:addspell-quickcraftearth clicked:addspell-quickcraftmetal clicked:addspell-quickcraftice clicked:addspell-createpine clicked:addspell-createcloth clicked:addspell-createmaple clicked:addspell-createclay clicked:addspell-createglass clicked:addspell-createstone clicked:addspell-createcrystal clicked:addspell-createiron clicked:addspell-createsteel clicked:addspell-createsnow clicked:addspell-createice clicked:addspell-createironwood clicked:addspell-createglacial clicked:addspell-createfireglass clicked:addspell-createadamantine clicked:addspell-createplatinum clicked:addspell-createviridium clicked:addspell-createobsidian clicked:addspell-createmithral clicked:addspell-createalbryst clicked:addspell-stalagmite clicked:addspell-pinespear clicked:addspell-wildwood clicked:addspell-glacier clicked:addspell-woodshield clicked:addspell-rockcover clicked:addspell-iceblock clicked:addspell-sicken clicked:addspell-restrain clicked:addspell-subdue clicked:addspell-trip clicked:addspell-attenuate clicked:addspell-flash clicked:addspell-ashenveil clicked:addspell-sandman clicked:addspell-earthbind clicked:addspell-encumber clicked:addspell-cloudedeyes clicked:addspell-blindness clicked:addspell-freezebind clicked:addspell-lethargy clicked:addspell-soundboom clicked:addspell-weight clicked:addspell-empowerbarrier clicked:addspell-arcanehealing clicked:addspell-barrierhealer clicked:addspell-windbarrier clicked:addspell-flamebarrier clicked:addspell-etherbarrier clicked:addspell-staticbarrier clicked:addspell-coldbarrier clicked:addspell-barrierrestorer clicked:addspell-sandbarrier clicked:addspell-etherbuffer clicked:addspell-etherealism clicked:addspell-spiritbeacon clicked:addspell-spiritwalk clicked:addspell-expelessence clicked:addspell-arcaneburst ", function (eventinfo) {
update_character_branches_add_spell(eventinfo.triggerName);
});
on("clicked:addspell-windburst clicked:addspell-fireball clicked:addspell-flamepyre clicked:addspell-eruptingearth clicked:addspell-balllightning clicked:addspell-shatter clicked:addspell-geyser clicked:addspell-fireblast clicked:addspell-plasmablast clicked:addspell-causticeruption clicked:addspell-sunburst clicked:addspell-horridwilting clicked:addspell-rockslide clicked:addspell-daggerfall clicked:addspell-hail clicked:addspell-stormofglass clicked:addspell-daggerstorm clicked:addspell-arcanestrike clicked:addspell-woodburst clicked:addspell-fireburst clicked:addspell-glassburst clicked:addspell-quake clicked:addspell-bladeburst clicked:addspell-staticburst clicked:addspell-lightningpulse clicked:addspell-thunderclap clicked:addspell-repellingpulse clicked:addspell-rollingfire clicked:addspell-glasssurge clicked:addspell-defoliate clicked:addspell-lightningbolt clicked:addspell-causticrebuke clicked:addspell-acidspray clicked:addspell-sunbeam clicked:addspell-tidalwave clicked:addspell-diffuse clicked:addspell-calllightning clicked:addspell-wither clicked:addspell-coagulate clicked:addspell-spiritblast clicked:addspell-harm clicked:addspell-atrophy clicked:addspell-chainlightning clicked:addspell-arcanebolt clicked:addspell-windbullet clicked:addspell-repulse clicked:addspell-flamearrow clicked:addspell-rockbullets clicked:addspell-lightningshaft clicked:addspell-icedarts clicked:addspell-rayoffrost clicked:addspell-acidarrow clicked:addspell-fulgor clicked:addspell-acidblast clicked:addspell-brickbarrage clicked:addspell-burninghands clicked:addspell-glassslasher clicked:addspell-sandblast clicked:addspell-stoneshower clicked:addspell-lightningburst clicked:addspell-rainofdaggers clicked:addspell-waterblast clicked:addspell-freezingblast clicked:addspell-thunderwave clicked:addspell-coneofcold clicked:addspell-boomburst clicked:addspell-kinesis clicked:addspell-diakopy clicked:addspell-katapeltis clicked:addspell-chlorotheurgy clicked:addspell-pyrotheurgy clicked:addspell-geotheurgy clicked:addspell-ferrotheurgy clicked:addspell-hydrotheurgy clicked:addspell-healaffliction clicked:addspell-purifyfoodanddrink clicked:addspell-removeradiation clicked:addspell-poisonward clicked:addspell-rejuvenate ", function (eventinfo) {
update_character_branches_add_spell(eventinfo.triggerName);
});
on("clicked:addspell-radiationward clicked:addspell-healinjury clicked:addspell-curelighttrauma clicked:addspell-passivehealing clicked:addspell-cureinjury clicked:addspell-mendlightwounds clicked:addspell-passivemending clicked:addspell-mendinjuries clicked:addspell-curelightwounds clicked:addspell-passiverestoration clicked:addspell-curewounds clicked:addspell-lesserlifeweave clicked:addspell-curefractures clicked:addspell-curesevers clicked:addspell-masscureinjuries clicked:addspell-mend clicked:addspell-masscurewounds clicked:addspell-rhapsody clicked:addspell-heal clicked:addspell-lifeweave clicked:addspell-purify clicked:addspell-nightingale clicked:addspell-truerestoration clicked:addspell-illusion clicked:addspell-mirage clicked:addspell-minorreflection clicked:addspell-mirrorimage clicked:addspell-greaterreflection clicked:addspell-instantfake clicked:addspell-improveability clicked:addspell-heatadaption clicked:addspell-resistance clicked:addspell-unencumbered clicked:addspell-lift clicked:addspell-grasp clicked:addspell-coldadaption clicked:addspell-truestrike clicked:addspell-ashenpath clicked:addspell-unburden clicked:addspell-waterbreathing clicked:addspell-alacrity clicked:addspell-embolden clicked:addspell-overcome clicked:addspell-nimbledodge clicked:addspell-foresight clicked:addspell-improvemovement clicked:addspell-featherfall clicked:addspell-leap clicked:addspell-featherstep clicked:addspell-ascent clicked:addspell-root clicked:addspell-zephyr clicked:addspell-reposition clicked:addspell-levitate clicked:addspell-airwalk clicked:addspell-floatingice clicked:addspell-improvesenses clicked:addspell-detectradiation clicked:addspell-knowweather clicked:addspell-scent clicked:addspell-darkvision clicked:addspell-darksight clicked:addspell-tremorsense clicked:addspell-blindsense clicked:addspell-aquasense clicked:addspell-truesight clicked:addspell-greatertremorsense clicked:addspell-improvespeed clicked:addspell-fleetfooted clicked:addspell-longstrider clicked:addspell-fleetstep clicked:addspell-swiftswim clicked:addspell-soar clicked:addspell-jet clicked:addspell-fastclimb clicked:addspell-groupclimb clicked:addspell-burrow clicked:addspell-sleep clicked:addspell-slumber ", function (eventinfo) {
update_character_branches_add_spell(eventinfo.triggerName);
});
on("clicked:addspell-holdperson clicked:addspell-seize clicked:addspell-cardiacseizure clicked:addspell-calmedsurge clicked:addspell-manarelease clicked:addspell-etherrelease clicked:addspell-duplicateevocation clicked:addspell-counterspell clicked:addspell-innervate clicked:addspell-boostsurge clicked:addspell-manabattery clicked:addspell-manadrain clicked:addspell-sustainedmana clicked:addspell-marktarget clicked:addspell-venom clicked:addspell-bloodmark clicked:addspell-etherealmark clicked:addspell-message clicked:addspell-distantwhisper clicked:addspell-whisper clicked:addspell-message clicked:addspell-ghostsound clicked:addspell-transmission clicked:addspell-whisperingwind clicked:addspell-skywrite clicked:addspell-sculptsound clicked:addspell-telegram clicked:addspell-telepathy clicked:addspell-shapefiber clicked:addspell-shapewood clicked:addspell-shapeclay clicked:addspell-shapeglass clicked:addspell-shapeearth clicked:addspell-shapemetal clicked:addspell-shapeice clicked:addspell-shapeironwood clicked:addspell-shapeglacial clicked:addspell-shapefireglass clicked:addspell-shapeadamantine clicked:addspell-shapeplatinum clicked:addspell-shapeviridium clicked:addspell-shapeobsidian clicked:addspell-shapemithral clicked:addspell-shapealbryst clicked:addspell-cultivate clicked:addspell-torch clicked:addspell-drench clicked:addspell-earthquake clicked:addspell-bleed clicked:addspell-stabilize clicked:addspell-revitalize clicked:addspell-resuscitate clicked:addspell-feigndeath clicked:addspell-ensnaringstrike clicked:addspell-howlingstrike clicked:addspell-searingstrike clicked:addspell-sandimpact clicked:addspell-buffetingwater clicked:addspell-freezingstrike clicked:addspell-thunderoussmite clicked:addspell-heavyblade clicked:addspell-lightningblade clicked:addspell-arcaneblade clicked:addspell-flashingblade clicked:addspell-sandstrike clicked:addspell-boomingstrike clicked:addspell-toxicstrike clicked:addspell-sparkblade clicked:addspell-zephyrstrike clicked:addspell-timestop clicked:addspell-timeleap clicked:addspell-quickstop clicked:addspell-rewindingstep clicked:addspell-blink clicked:addspell-truestop ", function (eventinfo) {
update_character_branches_add_spell(eventinfo.triggerName);
});
	


// Core: Add Feat
on("clicked:addfeat-arcanist clicked:addfeat-type clicked:addfeat-caster clicked:addfeat-cp clicked:addfeat-hp clicked:addfeat-br clicked:addfeat-archetype clicked:addfeat-saves clicked:addfeat-skill clicked:addfeat-weapon clicked:addfeat-armor clicked:addfeat-spell clicked:addfeat-vocation clicked:addfeat-arcanistcorefeatures clicked:addfeat-archetypefeat clicked:addfeat-generalfeat clicked:addfeat-skillfeat clicked:addfeat-spellfeat clicked:addfeat-arcanepoints clicked:addfeat-arcanesurplus clicked:addfeat-empoweringreserves clicked:addfeat-improvedsurge clicked:addfeat-arcanemetamagic clicked:addfeat-abilityscoreincrease clicked:addfeat-thaumaturge clicked:addfeat-thaumaturgecorefeatures clicked:addfeat-ethersense clicked:addfeat-arcanebolt clicked:addfeat-etherealvoice clicked:addfeat-planeswalker clicked:addfeat-wizard clicked:addfeat-wizardcorefeatures clicked:addfeat-ideation clicked:addfeat-calculatedsurge clicked:addfeat-manafont clicked:addfeat-bountifulideas clicked:addfeat-inspiredknowledge clicked:addfeat-wizardsstudies clicked:addfeat-sustainingmagic clicked:addfeat-defender clicked:addfeat-defendercorefeatures clicked:addfeat-shieldblock clicked:addfeat-combatfeat clicked:addfeat-secondwind clicked:addfeat-protectally clicked:addfeat-focusedbreathing clicked:addfeat-blockingexpertise clicked:addfeat-waryfighter clicked:addfeat-safeguard clicked:addfeat-steadybreath clicked:addfeat-spellblade clicked:addfeat-spellbladecorefeatures clicked:addfeat-spellcharge clicked:addfeat-spellstrike clicked:addfeat-deadlyspellstrike clicked:addfeat-spellchargebattery clicked:addfeat-spellshielding clicked:addfeat-spellwardarmor clicked:addfeat-swiftspellstrike clicked:addfeat-warrior clicked:addfeat-warriorcorefeatures clicked:addfeat-etherealmantle clicked:addfeat-unarmoreddefense clicked:addfeat-deflectingmantle clicked:addfeat-fastmovement clicked:addfeat-vitalmantle clicked:addfeat-fighter clicked:addfeat-fightercorefeatures clicked:addfeat-combatsuperiority clicked:addfeat-fightersuperiority clicked:addfeat-powerstrike clicked:addfeat-maneuvermaster clicked:addfeat-deadlymaneuvers clicked:addfeat-superiorprowess clicked:addfeat-swiftpowerstrike clicked:addfeat-investigator ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-investigatorcorefeatures clicked:addfeat-strategize clicked:addfeat-strategicstrike clicked:addfeat-strategicseek clicked:addfeat-assessmotive clicked:addfeat-intuitpresence clicked:addfeat-deadlystrategy clicked:addfeat-ongoingstrategy clicked:addfeat-pugilist clicked:addfeat-pugilistcorefeatures clicked:addfeat-chakra clicked:addfeat-flurryofblows clicked:addfeat-precisionattack clicked:addfeat-martialartist clicked:addfeat-evasivedash clicked:addfeat-patientdefense clicked:addfeat-openchakra clicked:addfeat-unarmoredmovement clicked:addfeat-slowfall clicked:addfeat-deadlyflurry clicked:addfeat-forbiddenrelease clicked:addfeat-rogue clicked:addfeat-roguecorefeatures clicked:addfeat-sneakattack clicked:addfeat-cunningaction clicked:addfeat-deadlysneakattack clicked:addfeat-uncannydodge clicked:addfeat-slystriker clicked:addfeat-commoner clicked:addfeat-commonercorefeatures clicked:addfeat-brawler clicked:addfeat-brawlercorefeatures clicked:addfeat-exemplar clicked:addfeat-exemplarcorefeatures clicked:addfeat-mage clicked:addfeat-magecorefeatures clicked:addfeat-soldier clicked:addfeat-soldiercorefeatures clicked:addfeat-watcher clicked:addfeat-sp clicked:addfeat-watchercorefeatures clicked:addfeat-spiriteffect clicked:addfeat-spiritspellcasting clicked:addfeat-spiritcantrips clicked:addfeat-spiritfeat clicked:addfeat-spiritgrowth clicked:addfeat- clicked:addfeat-creaturemanifest clicked:addfeat-imbuebarrier clicked:addfeat-releasemanifest clicked:addfeat-objectmanifest clicked:addfeat-esperascension clicked:addfeat-esper clicked:addfeat-espercorefeatures clicked:addfeat-esperbranch clicked:addfeat-esperforma clicked:addfeat-ascensionfeat clicked:addfeat-eidolon clicked:addfeat-spirit clicked:addfeat-eidoloncorefeatures clicked:addfeat-eidolonbranch clicked:addfeat-eidolonforma clicked:addfeat-automaton clicked:addfeat-automatoncorefeatures clicked:addfeat-constructcasterpoints clicked:addfeat-constructspellcasting clicked:addfeat-beastgrowth clicked:addfeat-beast clicked:addfeat-beastcorefeatures clicked:addfeat-alert clicked:addfeat-blindfighting clicked:addfeat-criticalcrusher clicked:addfeat-criticalfollowup clicked:addfeat-criticalpiercer clicked:addfeat-criticalslasher ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-dualwielder clicked:addfeat-durable clicked:addfeat-fleet clicked:addfeat-interception clicked:addfeat-improvedinitiative clicked:addfeat-lunge clicked:addfeat-armorflexibility clicked:addfeat-impassablewallstance clicked:addfeat-quickdraw clicked:addfeat-keenshot clicked:addfeat-shieldbash clicked:addfeat-skirmisher clicked:addfeat-takeaim clicked:addfeat-tough clicked:addfeat-unarmedfighting clicked:addfeat-weaponlegend clicked:addfeat-axemastery clicked:addfeat-fellhanded clicked:addfeat-blademastery clicked:addfeat-bladedparry clicked:addfeat-flailmastery clicked:addfeat-shieldsweep clicked:addfeat-hammermastery clicked:addfeat-hammerstep clicked:addfeat-pistolmastery clicked:addfeat-pistolero clicked:addfeat-polearmmastery clicked:addfeat-breakthecharge clicked:addfeat-polearmbunt clicked:addfeat-riflemastery clicked:addfeat-marksmanssnipe clicked:addfeat-ambush clicked:addfeat-brace clicked:addfeat-evasivefootwork clicked:addfeat-parry clicked:addfeat-riposte clicked:addfeat-distractingstrike clicked:addfeat-menacingstrike clicked:addfeat-restrainingstrike clicked:addfeat-inspiringleader clicked:addfeat-alacritousmantle clicked:addfeat-mantleofprotection clicked:addfeat-spellparry clicked:addfeat-partingshot clicked:addfeat-momentofclarity clicked:addfeat-woundedmantle clicked:addfeat-cleave clicked:addfeat-friendlytoss clicked:addfeat-sharedstratagem clicked:addfeat-strategicassessment clicked:addfeat-emergencyward clicked:addfeat-exorcizingstrike clicked:addfeat-stunningfist clicked:addfeat-wallrun clicked:addfeat-waterstep clicked:addfeat-twisttheknife clicked:addfeat-debilitatingattack clicked:addfeat-analyzeweakness clicked:addfeat-extrasuperiority clicked:addfeat-dextrousinitiative clicked:addfeat-exactingstrike clicked:addfeat-suddencharge clicked:addfeat-assistingshot clicked:addfeat-barrelingcharge clicked:addfeat-doubleshot clicked:addfeat-dual-handedassault clicked:addfeat-quickreversal clicked:addfeat-tripleshot clicked:addfeat-disorientingopening clicked:addfeat-incredibleaim clicked:addfeat-mobileshotstance clicked:addfeat-leapingstrike clicked:addfeat-combatreflexes clicked:addfeat-debilitatingshot clicked:addfeat-disruptivestance clicked:addfeat-paragonsguard ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-springattack clicked:addfeat-desperatefinisher clicked:addfeat-shieldwarden clicked:addfeat-reflexiveshield clicked:addfeat-quickshieldblock clicked:addfeat-armormastery clicked:addfeat-determination clicked:addfeat-lucky clicked:addfeat-unlucky clicked:addfeat-moreluck clicked:addfeat-catfall clicked:addfeat-charmingliar clicked:addfeat-concealinglegerdemain clicked:addfeat-courtlygraces clicked:addfeat-experiencedtracker clicked:addfeat-fascinatingperformance clicked:addfeat-groupcoercion clicked:addfeat-groupinfluence clicked:addfeat-impressiveperformance clicked:addfeat-intimidatingglare clicked:addfeat-knowledgetraining clicked:addfeat-lengthydiversion clicked:addfeat-multilingual clicked:addfeat-pickpocket clicked:addfeat-quickcoercion clicked:addfeat-quickjump clicked:addfeat-skilltraining clicked:addfeat-steadybalance clicked:addfeat-streetwise clicked:addfeat-subtletheft clicked:addfeat-upstage clicked:addfeat-goldinfusion clicked:addfeat-armorassist clicked:addfeat-etherchargedathlete clicked:addfeat-knownweaknesses clicked:addfeat-thatsodd clicked:addfeat-nimblecrawl clicked:addfeat-foilsenses clicked:addfeat-influencenature clicked:addfeat-kipup clicked:addfeat-quickclimb clicked:addfeat-quickrecognition clicked:addfeat-recognizespell clicked:addfeat-quickswim clicked:addfeat-quickunlock clicked:addfeat-shamelessrequest clicked:addfeat-armoredstealth clicked:addfeat-backupdisguise clicked:addfeat-confabulator clicked:addfeat-quickdisguise clicked:addfeat-rapidmantel clicked:addfeat-swiftsneak clicked:addfeat-terrifiedretreat clicked:addfeat-walljump clicked:addfeat-carefulspell clicked:addfeat-concealspell clicked:addfeat-distantspell clicked:addfeat-extendedspell clicked:addfeat-memorycasting clicked:addfeat-quickenedspell clicked:addfeat-seekingspell clicked:addfeat-unerringspell clicked:addfeat-recoverspell clicked:addfeat-branchingout clicked:addfeat-signaturespell clicked:addfeat-quicksurge clicked:addfeat-slotsupport clicked:addfeat-dualelementalist clicked:addfeat-spellchargedconcentration clicked:addfeat-murksight clicked:addfeat-extraideations clicked:addfeat-idealspellslots clicked:addfeat-dandy clicked:addfeat-distractingflattery clicked:addfeat-nevertire ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-fabricatedconnections clicked:addfeat-linguist clicked:addfeat-multilingualcipher clicked:addfeat-phonetictraining clicked:addfeat-spottranslate clicked:addfeat-analyzeidiolect clicked:addfeat-crudecommunication clicked:addfeat-loremaster clicked:addfeat-guidingknowledge clicked:addfeat-assuredknowledge clicked:addfeat-pirate clicked:addfeat-roperunner clicked:addfeat-walktheplank clicked:addfeat-ranger clicked:addfeat-acclimatization clicked:addfeat-surefoot clicked:addfeat-terrainmaster clicked:addfeat-tyrant clicked:addfeat-yourenext clicked:addfeat-conqueringpresence clicked:addfeat-subjugation clicked:addfeat-shatterdefenses clicked:addfeat-paralyzingfear clicked:addfeat-fearsomebrute clicked:addfeat-materialsight clicked:addfeat-extendedsight clicked:addfeat-horizonsight clicked:addfeat-spelltrainer clicked:addfeat-essential clicked:addfeat-extrasp clicked:addfeat-darksight clicked:addfeat-terranmovement clicked:addfeat-spiritssnarl clicked:addfeat-enhancedburrow clicked:addfeat-enhancedflight clicked:addfeat-enhancedclimb clicked:addfeat-enhancedswim clicked:addfeat-enhancedarmor clicked:addfeat-toxinshield clicked:addfeat-enhancedscent clicked:addfeat-bestowburrow clicked:addfeat-bestowflight clicked:addfeat-bestowfins clicked:addfeat-bestowhorn clicked:addfeat-remotemanifestation clicked:addfeat-planarbeacon clicked:addfeat-weakenwill clicked:addfeat-spiritstrikes clicked:addfeat-enhancedspiritstrikes clicked:addfeat-greaterspiritstrikes clicked:addfeat-bestowarmor clicked:addfeat-caranuform clicked:addfeat-cashmechongform clicked:addfeat-cesplangform clicked:addfeat-colosshuform clicked:addfeat-dekyingform clicked:addfeat-geltingwaform clicked:addfeat-holjoform clicked:addfeat-hookmaform clicked:addfeat-plumhouform clicked:addfeat-rackshurform clicked:addfeat-serpeluform clicked:addfeat-stinbianform clicked:addfeat-formaarmor clicked:addfeat-formaaquan clicked:addfeat-formaavian clicked:addfeat-formabite clicked:addfeat-formaclaws clicked:addfeat-formafossorian clicked:addfeat-formasense clicked:addfeat-formaspike clicked:addfeat-formaterran clicked:addfeat-formatoxin clicked:addfeat-unnoticed clicked:addfeat-sageknowledge clicked:addfeat-craftsmansadepttraining ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-craftsmanselitetraining clicked:addfeat-craftsmansmastertraining clicked:addfeat-craftsmanslegendarytraining clicked:addfeat-armedrest clicked:addfeat-deathdefiance clicked:addfeat-martialexercise clicked:addfeat-nimbleshieldhand clicked:addfeat-shieldedstride clicked:addfeat-defendersblade clicked:addfeat-gladiator clicked:addfeat-fancymoves clicked:addfeat-playtothecrowd clicked:addfeat-stagefighting clicked:addfeat-callyourshot clicked:addfeat-knight clicked:addfeat-harryingstrike clicked:addfeat-elegantcourtier clicked:addfeat-shouldercatastrophe clicked:addfeat-staveoffcatastrophe clicked:addfeat-zealot clicked:addfeat-zeal clicked:addfeat-devotedfocus clicked:addfeat-zealouspresence clicked:addfeat-surgebeyonddeath clicked:addfeat-extramantle clicked:addfeat-protectiveward clicked:addfeat-guardingspell clicked:addfeat-arcanephysique clicked:addfeat-durablewards clicked:addfeat-undyingsentinel clicked:addfeat-battlemagic clicked:addfeat-abjurant clicked:addfeat-wardingether clicked:addfeat-reactivewarding clicked:addfeat-nullifyingward clicked:addfeat-stormguard clicked:addfeat-lashingguard clicked:addfeat-restoringguard clicked:addfeat-whippingguard clicked:addfeat-unyieldingward clicked:addfeat-doublestrike clicked:addfeat-physicaltraining clicked:addfeat-runningtackle clicked:addfeat-brutalfinish clicked:addfeat-berserker clicked:addfeat-frenzy clicked:addfeat-noescape clicked:addfeat-mindlessrage clicked:addfeat-retaliation clicked:addfeat-duelist clicked:addfeat-fancyfootwork clicked:addfeat-alwaysready clicked:addfeat-duelistsstance clicked:addfeat-duelingparry clicked:addfeat-panache clicked:addfeat-duelingdance clicked:addfeat-masterduelist clicked:addfeat-mauler clicked:addfeat-knockaway clicked:addfeat-cleartheway clicked:addfeat-knockdown clicked:addfeat-avalanchestrike clicked:addfeat-wrestler clicked:addfeat-combatgrab clicked:addfeat-crushinggrab clicked:addfeat-suplex clicked:addfeat-clinchstrike clicked:addfeat-whirlingthrow clicked:addfeat-aerialpiledriver clicked:addfeat-naturalexplorer clicked:addfeat-exploitstrike clicked:addfeat-favoredenemy clicked:addfeat-perceptivetracker clicked:addfeat-precisionshot clicked:addfeat-superiormobility clicked:addfeat-swifttracker ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-camouflage clicked:addfeat-bountyhunter clicked:addfeat-markquarry clicked:addfeat-relentlesspursuit clicked:addfeat-stalker clicked:addfeat-unerringhunt clicked:addfeat-endthehunt clicked:addfeat-lowlandstalker clicked:addfeat-favoredterrain clicked:addfeat-hitandrun clicked:addfeat-speedy clicked:addfeat-wildstride clicked:addfeat-skirmishersstealth clicked:addfeat-suddenstrike clicked:addfeat-spellchargeanalysis clicked:addfeat-knowledgeispower clicked:addfeat-recognizethreat clicked:addfeat-cutthroughresistance clicked:addfeat-battlemage clicked:addfeat-mysticweapon clicked:addfeat-aspectedstrike clicked:addfeat-energyweapon clicked:addfeat-magicstrike clicked:addfeat-elementalfist clicked:addfeat-aspectedblow clicked:addfeat-skystepstance clicked:addfeat-flaringfists clicked:addfeat-skystepstrike clicked:addfeat-etherealblade clicked:addfeat-ghoststrike clicked:addfeat-astralsight clicked:addfeat-hiddencunning clicked:addfeat-consciousprojection clicked:addfeat-etherealassassin clicked:addfeat-improvedastralsight clicked:addfeat-clevergambit clicked:addfeat-catstance clicked:addfeat-climbersstance clicked:addfeat-flightstance clicked:addfeat-gracefulleaper clicked:addfeat-lightstep clicked:addfeat-follow-upstrike clicked:addfeat-flashstrike clicked:addfeat-acrobat clicked:addfeat-contortionist clicked:addfeat-dodgeaway clicked:addfeat-tumblingstrike clicked:addfeat-acrobaticreflexes clicked:addfeat-drunkenmaster clicked:addfeat-tipsysway clicked:addfeat-leaptoyourfeet clicked:addfeat-redirectattack clicked:addfeat-drunkardsluck clicked:addfeat-intoxicatedflurry clicked:addfeat-thief clicked:addfeat-fasthands clicked:addfeat-second-storywork clicked:addfeat-supremesneak clicked:addfeat-thiefsfinesse clicked:addfeat-rally clicked:addfeat-arcanerally clicked:addfeat-motivatingrally clicked:addfeat-tacticalrally clicked:addfeat-rallyresolve clicked:addfeat-marshalstrike clicked:addfeat-rallybattlefocus clicked:addfeat-snapoutofit clicked:addfeat-rallydeathdefiance clicked:addfeat-rallyingcharge clicked:addfeat-backtoback clicked:addfeat-coordinatedcharge clicked:addfeat-bloodrager clicked:addfeat-rallybladethirst clicked:addfeat-deadlybladethirst clicked:addfeat-tactician ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-baitandswitch clicked:addfeat-rallyspeed clicked:addfeat-knowyourenemy clicked:addfeat-improvedcombatsuperiority clicked:addfeat-relentless clicked:addfeat-virtuoso clicked:addfeat-rallycompetence clicked:addfeat-distract clicked:addfeat-rallyresistance clicked:addfeat-peerlessskill clicked:addfeat-scoundrel clicked:addfeat-ambushartist clicked:addfeat-firstawareness clicked:addfeat-surpriseattack clicked:addfeat-fleetingshadow clicked:addfeat-deftstrike clicked:addfeat-opportunistic clicked:addfeat-assassin clicked:addfeat-infiltrationexpertise clicked:addfeat-deathstrike clicked:addfeat-assassinate clicked:addfeat-phantom clicked:addfeat-extendedcloak clicked:addfeat-cloakingexpert clicked:addfeat-unseenstrike clicked:addfeat-weasel clicked:addfeat-lostinthecrowd clicked:addfeat-crowdmastery clicked:addfeat-expeditiousadvance clicked:addfeat-ambushspell clicked:addfeat-tacticalwit clicked:addfeat-magicalambush clicked:addfeat-detective clicked:addfeat-earfordeceit clicked:addfeat-discerningeye clicked:addfeat-unerringeye clicked:addfeat-spellthief clicked:addfeat-stealspell clicked:addfeat-magicthief clicked:addfeat-greaterstealspell clicked:addfeat-whisper clicked:addfeat-quickchange clicked:addfeat-subtlespell clicked:addfeat-cloakingchakra clicked:addfeat-silentmessage clicked:addfeat-naturopath clicked:addfeat-paramedic clicked:addfeat-healthassessor clicked:addfeat-treatcondition clicked:addfeat-dutifulhealer clicked:addfeat-resuscitate clicked:addfeat-supremehealing clicked:addfeat-chirurgeon clicked:addfeat-quickcraftmedicine clicked:addfeat-strategicdiagnosis clicked:addfeat-supportedhealing clicked:addfeat-onsitesupport clicked:addfeat-debilitatingstrike clicked:addfeat-etherealist clicked:addfeat-companionbond clicked:addfeat-animalcompanion clicked:addfeat-managemcasting clicked:addfeat-astralcompanionship clicked:addfeat-tandemaction clicked:addfeat-exorcism clicked:addfeat-spiritshield clicked:addfeat-lifecleric clicked:addfeat-discipleoflife clicked:addfeat-blessedhealer clicked:addfeat-heroicrecovery clicked:addfeat-shieldsage clicked:addfeat-wardingspell clicked:addfeat-barriercover clicked:addfeat-extendedcover clicked:addfeat-negatingcover clicked:addfeat-sage ", function (eventinfo) {
	update_character_feat_list_add_feature(eventinfo.triggerName);
});

on("clicked:addfeat-branchedknowledge clicked:addfeat-incrediblerecollection clicked:addfeat-specializedspells clicked:addfeat-artificer clicked:addfeat-permanentitems clicked:addfeat-freestructure clicked:addfeat-durablestructures clicked:addfeat-warmage clicked:addfeat-sculptspell clicked:addfeat-elementalperfection clicked:addfeat-empoweredevocation clicked:addfeat-overchannelspell clicked:addfeat-sorcerer clicked:addfeat-empoweredspell clicked:addfeat-splitshot clicked:addfeat-steadyspellcasting clicked:addfeat-twinnedspell clicked:addfeat-echoingmagic clicked:addfeat-favoredsoul clicked:addfeat-arcanefavor clicked:addfeat-idealfavor clicked:addfeat-vitalfavor clicked:addfeat-favoredluck clicked:addfeat-bendfate clicked:addfeat-reactivefavor clicked:addfeat-doubledfavor clicked:addfeat-warlock clicked:addfeat-warlockcantrips clicked:addfeat-arcanedestruction clicked:addfeat-eldritchspear clicked:addfeat-eldritchburst clicked:addfeat-seekingbolt clicked:addfeat-eldritchmastery clicked:addfeat-spiritualist clicked:addfeat-emptyvessel clicked:addfeat-phantomshroud clicked:addfeat-accelerationshroud clicked:addfeat-evolutionshroud clicked:addfeat-conduit clicked:addfeat-multiplemanifestations clicked:addfeat-pactslot clicked:addfeat-reactivecompanion clicked:addfeat-synthesist clicked:addfeat-lockedvessel clicked:addfeat-suppressappearance clicked:addfeat-assumecontrol clicked:addfeat-trueformshroud clicked:addfeat-divinegrace clicked:addfeat-restoringveil clicked:addfeat-giftofheaven clicked:addfeat-mercy clicked:addfeat-armamentwall clicked:addfeat-greatermercy clicked:addfeat-spiritualguardian clicked:addfeat-hypnoticstare clicked:addfeat-alluringhypnotism clicked:addfeat-possession clicked:addfeat-hypnoticcharm clicked:addfeat-influencedisaster clicked:addfeat-shadowform clicked:addfeat-distanttether clicked:addfeat-shadowcaster clicked:addfeat-shadowjump clicked:addfeat-manifestshade clicked:addfeat-shadowwalk clicked:addfeat-attunedterrain clicked:addfeat-wildempathy clicked:addfeat-wildshape clicked:addfeat-greenempathy clicked:addfeat-communewithnature clicked:addfeat-bestialrush clicked:addfeat-elementalstrikes clicked:addfeat-hustle clicked:addfeat-spiritrage clicked:addfeat-spiritfrenzy ", function (eventinfo) {
update_character_feat_list_add_feature(eventinfo.triggerName);
});
on("clicked:addfeat-sunderspell clicked:addfeat-aggressivestyle ", function (eventinfo) {
update_character_feat_list_add_feature(eventinfo.triggerName);
});




// Core: Feat Type Adder
on("change:featlist-archetype-Archetype change:featlist-arcanepoints-Archetype change:featlist-arcanepoints-Spell change:featlist-arcanesurplus-Kinetic change:featlist-empoweringreserves-Concentration change:featlist-empoweringreserves-Fortune change:featlist-arcanemetamagic-Archetype change:featlist-arcanemetamagic-Spell change:featlist-ethersense-Archetype change:featlist-ethersense-Spell change:featlist-etherealvoice-Concentration change:featlist-etherealvoice-Extrasensory change:featlist-planeswalker-Archetype change:featlist-planeswalker-Spell change:featlist-ideation-Archetype change:featlist-ideation-Spell change:featlist-calculatedsurge-Concentrate change:featlist-manafont-Concentrate change:featlist-inspiredknowledge-Archetype change:featlist-sustainingmagic-Archetype change:featlist-sustainingmagic-Spell change:featlist-shieldblock-Archetype change:featlist-secondwind-Archetype change:featlist-secondwind-Combat change:featlist-protectally-Archetype change:featlist-waryfighter-Archetype change:featlist-spellcharge-Archetype change:featlist-spellcharge-Spell change:featlist-spellstrike-Archetype change:featlist-spellstrike-Combat change:featlist-spellchargebattery-Cerebrate change:featlist-spellshielding-Archetype change:featlist-etherealmantle-Archetype change:featlist-etherealmantle-Combat change:featlist-deflectingmantle-Archetype change:featlist-fastmovement-Archetype change:featlist-fastmovement-Combat change:featlist-combatsuperiority-Archetype change:featlist-combatsuperiority-Combat change:featlist-fightersuperiority-Maneuver change:featlist-powerstrike-Archetype change:featlist-powerstrike-Combat change:featlist-powerstrike-General change:featlist-strategize-Archetype change:featlist-strategize-General change:featlist-strategize-Combat change:featlist-strategicstrike-Archetype change:featlist-strategicstrike-Combat change:featlist-strategicseek-Archetype change:featlist-assessmotive-Archetype change:featlist-intuitpresence-Archetype change:featlist-intuitpresence-Skill change:featlist-chakra-Archetype change:featlist-chakra-Spell change:featlist-flurryofblows-Archetype change:featlist-flurryofblows-Combat change:featlist-precisionattack-Archetype change:featlist-precisionattack-Combat ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-evasivedash-Archetype change:featlist-patientdefense-Chakra change:featlist-openchakra-Concentration change:featlist-slowfall-Archetype change:featlist-forbiddenrelease-Concentration change:featlist-forbiddenrelease-Round change:featlist-sneakattack-Archetype change:featlist-sneakattack-Combat change:featlist-cunningaction-Archetype change:featlist-uncannydodge-Archetype change:featlist-uncannydodge-Combat change:featlist-creaturemanifest-Concentrate change:featlist-creaturemanifest-Manifest change:featlist-imbuebarrier-Concentrate change:featlist-releasemanifest-Concentrate change:featlist-objectmanifest-Concentrate change:featlist-objectmanifest-Manifest change:featlist-esperascension-Concentrate change:featlist-alert-Beast change:featlist-alert-Combat change:featlist-alert-General change:featlist-blindfighting-Beast change:featlist-blindfighting-Combat change:featlist-blindfighting-General change:featlist-criticalcrusher-Beast change:featlist-criticalcrusher-Combat change:featlist-criticalcrusher-General change:featlist-criticalfollowup-Beast change:featlist-criticalfollowup-Combat change:featlist-criticalfollowup-General change:featlist-criticalpiercer-Beast change:featlist-criticalpiercer-Combat change:featlist-criticalpiercer-General change:featlist-criticalslasher-Beast change:featlist-criticalslasher-Combat change:featlist-criticalslasher-General change:featlist-dualwielder-Combat change:featlist-dualwielder-General change:featlist-durable-Beast change:featlist-durable-Combat change:featlist-durable-General change:featlist-durable-Spirit change:featlist-fleet-Beast change:featlist-fleet-Combat change:featlist-fleet-General change:featlist-fleet-Spirit change:featlist-interception-Beast change:featlist-interception-Combat change:featlist-interception-General change:featlist-improvedinitiative-Beast change:featlist-improvedinitiative-Combat change:featlist-improvedinitiative-General change:featlist-improvedinitiative-Spirit change:featlist-lunge-Beast change:featlist-lunge-Combat change:featlist-lunge-General change:featlist-armorflexibility-Combat change:featlist-armorflexibility-General change:featlist-impassablewallstance-Combat change:featlist-impassablewallstance-General ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-quickdraw-Combat change:featlist-quickdraw-General change:featlist-keenshot-Combat change:featlist-keenshot-General change:featlist-shieldbash-Combat change:featlist-shieldbash-General change:featlist-skirmisher-Beast change:featlist-skirmisher-Combat change:featlist-skirmisher-General change:featlist-takeaim-Combat change:featlist-takeaim-General change:featlist-tough-Beast change:featlist-tough-Combat change:featlist-tough-General change:featlist-unarmedfighting-Combat change:featlist-unarmedfighting-General change:featlist-weaponlegend-Combat change:featlist-weaponlegend-General change:featlist-axemastery-Combat change:featlist-axemastery-General change:featlist-fellhanded-Combat change:featlist-fellhanded-General change:featlist-blademastery-Combat change:featlist-blademastery-General change:featlist-bladedparry-Combat change:featlist-bladedparry-General change:featlist-flailmastery-Combat change:featlist-flailmastery-General change:featlist-shieldsweep-Combat change:featlist-shieldsweep-General change:featlist-hammermastery-Combat change:featlist-hammermastery-General change:featlist-hammerstep-Combat change:featlist-hammerstep-General change:featlist-pistolmastery-Combat change:featlist-pistolmastery-General change:featlist-pistolero-Combat change:featlist-pistolero-General change:featlist-polearmmastery-Combat change:featlist-polearmmastery-General change:featlist-breakthecharge-Combat change:featlist-breakthecharge-General change:featlist-polearmbunt-Combat change:featlist-polearmbunt-General change:featlist-riflemastery-Combat change:featlist-riflemastery-General change:featlist-marksmanssnipe-Combat change:featlist-marksmanssnipe-General change:featlist-ambush-Archetype change:featlist-ambush-Combat change:featlist-ambush-General change:featlist-brace-Archetype change:featlist-brace-Combat change:featlist-brace-General change:featlist-evasivefootwork-Archetype change:featlist-evasivefootwork-Combat change:featlist-evasivefootwork-General change:featlist-parry-Archetype change:featlist-parry-Combat change:featlist-parry-General change:featlist-riposte-Archetype change:featlist-riposte-Combat change:featlist-riposte-General change:featlist-distractingstrike-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-distractingstrike-Combat change:featlist-distractingstrike-General change:featlist-menacingstrike-Archetype change:featlist-menacingstrike-Combat change:featlist-menacingstrike-General change:featlist-restrainingstrike-Archetype change:featlist-restrainingstrike-Combat change:featlist-restrainingstrike-General change:featlist-inspiringleader-Combat change:featlist-inspiringleader-General change:featlist-alacritousmantle-Archetype change:featlist-alacritousmantle-Combat change:featlist-alacritousmantle-General change:featlist-mantleofprotection-Archetype change:featlist-mantleofprotection-Combat change:featlist-mantleofprotection-General change:featlist-spellparry-Archetype change:featlist-spellparry-Combat change:featlist-spellparry-General change:featlist-partingshot-Combat change:featlist-partingshot-General change:featlist-momentofclarity-Archetype change:featlist-momentofclarity-Combat change:featlist-momentofclarity-General change:featlist-woundedmantle-Archetype change:featlist-woundedmantle-Combat change:featlist-woundedmantle-General change:featlist-cleave-Beast change:featlist-cleave-Combat change:featlist-cleave-General change:featlist-friendlytoss-Combat change:featlist-friendlytoss-General change:featlist-sharedstratagem-Archetype change:featlist-sharedstratagem-Combat change:featlist-sharedstratagem-General change:featlist-strategicassessment-Archetype change:featlist-strategicassessment-Combat change:featlist-strategicassessment-General change:featlist-emergencyward-Archetype change:featlist-emergencyward-Combat change:featlist-emergencyward-General change:featlist-exorcizingstrike-Archetype change:featlist-exorcizingstrike-Combat change:featlist-exorcizingstrike-General change:featlist-stunningfist-Archetype change:featlist-stunningfist-Combat change:featlist-stunningfist-General change:featlist-wallrun-Archetype change:featlist-wallrun-Combat change:featlist-wallrun-General change:featlist-waterstep-Archetype change:featlist-waterstep-Combat change:featlist-waterstep-General change:featlist-twisttheknife-Archetype change:featlist-twisttheknife-Combat change:featlist-twisttheknife-General change:featlist-debilitatingattack-Archetype change:featlist-debilitatingattack-Combat ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-debilitatingattack-General change:featlist-analyzeweakness-Archetype change:featlist-analyzeweakness-Combat change:featlist-analyzeweakness-General change:featlist-extrasuperiority-Archetype change:featlist-extrasuperiority-Combat change:featlist-extrasuperiority-General change:featlist-dextrousinitiative-Combat change:featlist-dextrousinitiative-General change:featlist-exactingstrike-Combat change:featlist-exactingstrike-General change:featlist-suddencharge-Combat change:featlist-suddencharge-General change:featlist-assistingshot-Combat change:featlist-assistingshot-General change:featlist-barrelingcharge-Combat change:featlist-barrelingcharge-General change:featlist-doubleshot-Combat change:featlist-doubleshot-General change:featlist-dual-handedassault-Combat change:featlist-dual-handedassault-General change:featlist-quickreversal-Combat change:featlist-quickreversal-General change:featlist-tripleshot-Combat change:featlist-tripleshot-General change:featlist-disorientingopening-Combat change:featlist-disorientingopening-General change:featlist-incredibleaim-Combat change:featlist-incredibleaim-General change:featlist-mobileshotstance-Combat change:featlist-mobileshotstance-General change:featlist-leapingstrike-Combat change:featlist-leapingstrike-General change:featlist-combatreflexes-Combat change:featlist-combatreflexes-General change:featlist-debilitatingshot-Combat change:featlist-debilitatingshot-General change:featlist-disruptivestance-Combat change:featlist-disruptivestance-General change:featlist-paragonsguard-Combat change:featlist-paragonsguard-General change:featlist-springattack-Combat change:featlist-springattack-General change:featlist-desperatefinisher-Combat change:featlist-desperatefinisher-General change:featlist-shieldwarden-Archetype change:featlist-shieldwarden-Combat change:featlist-shieldwarden-General change:featlist-reflexiveshield-Archetype change:featlist-reflexiveshield-Combat change:featlist-reflexiveshield-General change:featlist-quickshieldblock-Archetype change:featlist-quickshieldblock-Combat change:featlist-quickshieldblock-General change:featlist-determination-Combat change:featlist-determination-General change:featlist-lucky-Combat ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-lucky-General change:featlist-unlucky-Combat change:featlist-unlucky-General change:featlist-moreluck-Combat change:featlist-moreluck-General change:featlist-catfall-Beast change:featlist-catfall-General change:featlist-catfall-Skill change:featlist-charmingliar-General change:featlist-charmingliar-Skill change:featlist-charmingliar-Spirit change:featlist-concealinglegerdemain-General change:featlist-concealinglegerdemain-Skill change:featlist-courtlygraces-General change:featlist-courtlygraces-Skill change:featlist-experiencedtracker-General change:featlist-experiencedtracker-Skill change:featlist-experiencedtracker-Spirit change:featlist-fascinatingperformance-General change:featlist-fascinatingperformance-Skill change:featlist-fascinatingperformance-Spirit change:featlist-groupcoercion-General change:featlist-groupcoercion-Skill change:featlist-groupcoercion-Spirit change:featlist-groupinfluence-General change:featlist-groupinfluence-Skill change:featlist-groupinfluence-Spirit change:featlist-impressiveperformance-General change:featlist-impressiveperformance-Skill change:featlist-impressiveperformance-Spirit change:featlist-intimidatingglare-Beast change:featlist-intimidatingglare-General change:featlist-intimidatingglare-Skill change:featlist-lengthydiversion-Beast change:featlist-lengthydiversion-General change:featlist-lengthydiversion-Skill change:featlist-pickpocket-Beast change:featlist-pickpocket-General change:featlist-pickpocket-Skill change:featlist-quickcoercion-General change:featlist-quickcoercion-Skill change:featlist-quickcoercion-Spirit change:featlist-quickjump-Beast change:featlist-quickjump-General change:featlist-quickjump-Skill change:featlist-steadybalance-Beast change:featlist-steadybalance-General change:featlist-steadybalance-Skill change:featlist-streetwise-General change:featlist-streetwise-Skill change:featlist-subtletheft-Beast change:featlist-subtletheft-General change:featlist-subtletheft-Skill change:featlist-upstage-General change:featlist-upstage-Skill change:featlist-upstage-Spirit change:featlist-goldinfusion-General change:featlist-goldinfusion-Skill change:featlist-armorassist-General change:featlist-armorassist-Skill ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-etherchargedathlete-Archetype change:featlist-etherchargedathlete-General change:featlist-etherchargedathlete-Skill change:featlist-knownweaknesses-Archetype change:featlist-knownweaknesses-General change:featlist-knownweaknesses-Skill change:featlist-thatsodd-Archetype change:featlist-thatsodd-General change:featlist-thatsodd-Skill change:featlist-nimblecrawl-Beast change:featlist-nimblecrawl-General change:featlist-nimblecrawl-Skill change:featlist-foilsenses-Beast change:featlist-foilsenses-General change:featlist-foilsenses-Skill change:featlist-influencenature-General change:featlist-influencenature-Skill change:featlist-kipup-General change:featlist-kipup-Skill change:featlist-quickclimb-General change:featlist-quickclimb-Skill change:featlist-quickrecognition-General change:featlist-quickrecognition-Skill change:featlist-recognizespell-General change:featlist-recognizespell-Skill change:featlist-quickswim-Beast change:featlist-quickswim-General change:featlist-quickswim-Skill change:featlist-quickunlock-General change:featlist-quickunlock-Skill change:featlist-shamelessrequest-General change:featlist-shamelessrequest-Skill change:featlist-armoredstealth-General change:featlist-armoredstealth-Skill change:featlist-backupdisguise-General change:featlist-backupdisguise-Skill change:featlist-confabulator-General change:featlist-confabulator-Skill change:featlist-quickdisguise-General change:featlist-quickdisguise-Skill change:featlist-rapidmantel-Beast change:featlist-rapidmantel-General change:featlist-rapidmantel-Skill change:featlist-swiftsneak-Beast change:featlist-swiftsneak-General change:featlist-swiftsneak-Skill change:featlist-terrifiedretreat-Beast change:featlist-terrifiedretreat-General change:featlist-terrifiedretreat-Skill change:featlist-walljump-Beast change:featlist-walljump-General change:featlist-walljump-Skill change:featlist-carefulspell-General change:featlist-carefulspell-Spell change:featlist-carefulspell-Spirit change:featlist-concealspell-General change:featlist-concealspell-Spell change:featlist-distantspell-General change:featlist-distantspell-Spell change:featlist-distantspell-Spirit change:featlist-extendedspell-General change:featlist-extendedspell-Spell ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-extendedspell-Spirit change:featlist-memorycasting-General change:featlist-memorycasting-Spell change:featlist-quickenedspell-General change:featlist-quickenedspell-Spell change:featlist-quickenedspell-Spirit change:featlist-seekingspell-General change:featlist-seekingspell-Spell change:featlist-unerringspell-General change:featlist-unerringspell-Spell change:featlist-recoverspell-General change:featlist-recoverspell-Spell change:featlist-signaturespell-General change:featlist-signaturespell-Spell change:featlist-signaturespell-Spirit change:featlist-quicksurge-General change:featlist-quicksurge-Spell change:featlist-quicksurge-Spirit change:featlist-dualelementalist-General change:featlist-dualelementalist-Spell change:featlist-spellchargedconcentration-Archetype change:featlist-spellchargedconcentration-General change:featlist-spellchargedconcentration-Spell change:featlist-murksight-Archetype change:featlist-murksight-General change:featlist-murksight-Spell change:featlist-extraideations-Archetype change:featlist-extraideations-General change:featlist-extraideations-Spell change:featlist-idealspellslots-Archetype change:featlist-idealspellslots-General change:featlist-idealspellslots-Spell change:featlist-dandy-Archetype change:featlist-dandy-General change:featlist-distractingflattery-Archetype change:featlist-distractingflattery-General change:featlist-nevertire-Archetype change:featlist-nevertire-General change:featlist-fabricatedconnections-Archetype change:featlist-fabricatedconnections-General change:featlist-fabricatedconnections-Skill change:featlist-linguist-Archetype change:featlist-linguist-General change:featlist-multilingualcipher-Archetype change:featlist-multilingualcipher-General change:featlist-multilingualcipher-Skill change:featlist-phonetictraining-Archetype change:featlist-phonetictraining-General change:featlist-phonetictraining-Skill change:featlist-spottranslate-Archetype change:featlist-spottranslate-General change:featlist-analyzeidiolect-Archetype change:featlist-analyzeidiolect-General change:featlist-analyzeidiolect-Skill change:featlist-crudecommunication-Archetype change:featlist-crudecommunication-General change:featlist-loremaster-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-loremaster-General change:featlist-guidingknowledge-Archetype change:featlist-guidingknowledge-General change:featlist-assuredknowledge-Archetype change:featlist-assuredknowledge-General change:featlist-pirate-Archetype change:featlist-pirate-General change:featlist-roperunner-Archetype change:featlist-roperunner-General change:featlist-roperunner-Skill change:featlist-walktheplank-Archetype change:featlist-walktheplank-General change:featlist-ranger-Archetype change:featlist-ranger-General change:featlist-acclimatization-Archetype change:featlist-acclimatization-General change:featlist-surefoot-Archetype change:featlist-surefoot-General change:featlist-surefoot-Skill change:featlist-terrainmaster-Archetype change:featlist-terrainmaster-General change:featlist-tyrant-Archetype change:featlist-tyrant-General change:featlist-yourenext-Archetype change:featlist-yourenext-General change:featlist-conqueringpresence-Archetype change:featlist-conqueringpresence-General change:featlist-subjugation-Archetype change:featlist-subjugation-General change:featlist-shatterdefenses-Archetype change:featlist-shatterdefenses-General change:featlist-paralyzingfear-Archetype change:featlist-paralyzingfear-General change:featlist-fearsomebrute-Archetype change:featlist-fearsomebrute-General change:featlist-materialsight-Spirit change:featlist-extendedsight-Spirit change:featlist-horizonsight-Spirit change:featlist-spelltrainer-Spirit change:featlist-essential-Spirit change:featlist-extrasp-Spirit change:featlist-darksight-Ascension change:featlist-terranmovement-Ascension change:featlist-spiritssnarl-Ascension change:featlist-enhancedburrow-Ascension change:featlist-enhancedflight-Ascension change:featlist-enhancedclimb-Ascension change:featlist-enhancedswim-Ascension change:featlist-enhancedarmor-Ascension change:featlist-toxinshield-Ascension change:featlist-enhancedscent-Ascension change:featlist-bestowburrow-Ascension change:featlist-bestowflight-Ascension change:featlist-bestowfins-Ascension change:featlist-bestowhorn-Ascension change:featlist-remotemanifestation-Ascension change:featlist-planarbeacon-Ascension change:featlist-weakenwill-Ascension change:featlist-spiritstrikes-Ascension ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-enhancedspiritstrikes-Ascension change:featlist-greaterspiritstrikes-Ascension change:featlist-bestowarmor-Ascension change:featlist-caranuform-Forma change:featlist-cashmechongform-Forma change:featlist-cesplangform-Forma change:featlist-colosshuform-Forma change:featlist-dekyingform-Forma change:featlist-geltingwaform-Forma change:featlist-holjoform-Forma change:featlist-hookmaform-Forma change:featlist-plumhouform-Forma change:featlist-rackshurform-Forma change:featlist-serpeluform-Forma change:featlist-stinbianform-Forma change:featlist-formaarmor-Aspect change:featlist-formaaquan-Aspect change:featlist-formaavian-Aspect change:featlist-formabite-Aspect change:featlist-formaclaws-Aspect change:featlist-formafossorian-Aspect change:featlist-formasense-Aspect change:featlist-formaspike-Aspect change:featlist-formaterran-Aspect change:featlist-formatoxin-Aspect change:featlist-unnoticed-Archetype change:featlist-craftsmansadepttraining-Archetype change:featlist-craftsmansadepttraining-Skill change:featlist-craftsmanselitetraining-Archetype change:featlist-craftsmanselitetraining-Skill change:featlist-craftsmansmastertraining-Archetype change:featlist-craftsmansmastertraining-Skill change:featlist-craftsmanslegendarytraining-Archetype change:featlist-craftsmanslegendarytraining-Skill change:featlist-armedrest-Archetype change:featlist-armedrest-Skill change:featlist-deathdefiance-Archetype change:featlist-deathdefiance-Skill change:featlist-martialexercise-Archetype change:featlist-martialexercise-Combat change:featlist-martialexercise-General change:featlist-nimbleshieldhand-Archetype change:featlist-nimbleshieldhand-Combat change:featlist-shieldedstride-Archetype change:featlist-shieldedstride-Combat change:featlist-defendersblade-Archetype change:featlist-defendersblade-Combat change:featlist-gladiator-Archetype change:featlist-fancymoves-Archetype change:featlist-fancymoves-Skill change:featlist-playtothecrowd-Archetype change:featlist-stagefighting-Archetype change:featlist-callyourshot-Archetype change:featlist-knight-Archetype change:featlist-harryingstrike-Archetype change:featlist-elegantcourtier-Archetype change:featlist-elegantcourtier-General change:featlist-elegantcourtier-Skill ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-shouldercatastrophe-Archetype change:featlist-staveoffcatastrophe-Archetype change:featlist-zealot-Archetype change:featlist-zeal-Archetype change:featlist-devotedfocus-Archetype change:featlist-zealouspresence-Archetype change:featlist-surgebeyonddeath-Archetype change:featlist-extramantle-Archetype change:featlist-extramantle-Combat change:featlist-protectiveward-Archetype change:featlist-guardingspell-Archetype change:featlist-guardingspell-Spell change:featlist-arcanephysique-Archetype change:featlist-arcanephysique-General change:featlist-arcanephysique-Skill change:featlist-durablewards-Archetype change:featlist-durablewards-Combat change:featlist-undyingsentinel-Archetype change:featlist-undyingsentinel-Combat change:featlist-battlemagic-Archetype change:featlist-abjurant-Archetype change:featlist-wardingether-Archetype change:featlist-reactivewarding-Archetype change:featlist-nullifyingward-Archetype change:featlist-stormguard-Archetype change:featlist-lashingguard-Archetype change:featlist-restoringguard-Archetype change:featlist-whippingguard-Archetype change:featlist-unyieldingward-Archetype change:featlist-doublestrike-Archetype change:featlist-doublestrike-Combat change:featlist-physicaltraining-Archetype change:featlist-physicaltraining-General change:featlist-physicaltraining-Skill change:featlist-runningtackle-Archetype change:featlist-runningtackle-Combat change:featlist-brutalfinish-Archetype change:featlist-brutalfinish-Combat change:featlist-berserker-Archetype change:featlist-frenzy-Archetype change:featlist-noescape-Archetype change:featlist-mindlessrage-Archetype change:featlist-retaliation-Archetype change:featlist-duelist-Archetype change:featlist-fancyfootwork-Archetype change:featlist-fancyfootwork-Skill change:featlist-alwaysready-Archetype change:featlist-alwaysready-Combat change:featlist-duelistsstance-Archetype change:featlist-duelingparry-Archetype change:featlist-panache-Archetype change:featlist-duelingdance-Archetype change:featlist-masterduelist-Archetype change:featlist-mauler-Archetype change:featlist-knockaway-Archetype change:featlist-cleartheway-Archetype change:featlist-knockdown-Archetype change:featlist-avalanchestrike-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-wrestler-Archetype change:featlist-combatgrab-Archetype change:featlist-crushinggrab-Archetype change:featlist-suplex-Archetype change:featlist-clinchstrike-Archetype change:featlist-whirlingthrow-Archetype change:featlist-aerialpiledriver-Archetype change:featlist-naturalexplorer-Archetype change:featlist-naturalexplorer-General change:featlist-exploitstrike-Archetype change:featlist-exploitstrike-Combat change:featlist-favoredenemy-Archetype change:featlist-favoredenemy-Combat change:featlist-perceptivetracker-Archetype change:featlist-perceptivetracker-General change:featlist-perceptivetracker-Skill change:featlist-precisionshot-Archetype change:featlist-precisionshot-Combat change:featlist-superiormobility-Archetype change:featlist-superiormobility-Combat change:featlist-swifttracker-Archetype change:featlist-swifttracker-Skill change:featlist-camouflage-Archetype change:featlist-camouflage-Skill change:featlist-bountyhunter-Archetype change:featlist-markquarry-Archetype change:featlist-relentlesspursuit-Archetype change:featlist-stalker-Archetype change:featlist-stalker-Skill change:featlist-unerringhunt-Archetype change:featlist-endthehunt-Archetype change:featlist-lowlandstalker-Archetype change:featlist-hitandrun-Archetype change:featlist-speedy-Archetype change:featlist-speedy-Combat change:featlist-wildstride-Archetype change:featlist-wildstride-General change:featlist-skirmishersstealth-Archetype change:featlist-suddenstrike-Archetype change:featlist-spellchargeanalysis-Archetype change:featlist-spellchargeanalysis-Spell change:featlist-knowledgeispower-Archetype change:featlist-knowledgeispower-Skill change:featlist-recognizethreat-Archetype change:featlist-recognizethreat-Skill change:featlist-cutthroughresistance-Archetype change:featlist-cutthroughresistance-Combat change:featlist-battlemage-Archetype change:featlist-mysticweapon-Archetype change:featlist-aspectedstrike-Archetype change:featlist-energyweapon-Archetype change:featlist-magicstrike-Archetype change:featlist-elementalfist-Archetype change:featlist-aspectedblow-Archetype change:featlist-skystepstance-Archetype change:featlist-flaringfists-Archetype change:featlist-skystepstrike-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-etherealblade-Archetype change:featlist-ghoststrike-Archetype change:featlist-astralsight-Archetype change:featlist-astralsight-Spell change:featlist-hiddencunning-Archetype change:featlist-hiddencunning-General change:featlist-hiddencunning-Skill change:featlist-consciousprojection-Archetype change:featlist-etherealassassin-Archetype change:featlist-improvedastralsight-Archetype change:featlist-improvedastralsight-Spell change:featlist-clevergambit-Archetype change:featlist-clevergambit-Skill change:featlist-catstance-Archetype change:featlist-catstance-Combat change:featlist-climbersstance-Archetype change:featlist-climbersstance-Skill change:featlist-flightstance-Archetype change:featlist-flightstance-Skill change:featlist-gracefulleaper-Archetype change:featlist-gracefulleaper-Skill change:featlist-lightstep-Archetype change:featlist-lightstep-Combat change:featlist-follow-upstrike-Archetype change:featlist-flashstrike-Archetype change:featlist-flashstrike-Combat change:featlist-acrobat-Archetype change:featlist-contortionist-Archetype change:featlist-dodgeaway-Archetype change:featlist-tumblingstrike-Archetype change:featlist-acrobaticreflexes-Archetype change:featlist-drunkenmaster-Archetype change:featlist-tipsysway-Archetype change:featlist-leaptoyourfeet-Archetype change:featlist-leaptoyourfeet-Skill change:featlist-redirectattack-Archetype change:featlist-drunkardsluck-Archetype change:featlist-intoxicatedflurry-Archetype change:featlist-thief-Archetype change:featlist-fasthands-Archetype change:featlist-second-storywork-Archetype change:featlist-supremesneak-Archetype change:featlist-supremesneak-Skill change:featlist-thiefsfinesse-Archetype change:featlist-rally-Archetype change:featlist-motivatingrally-Daily change:featlist-rallyresolve-Archetype change:featlist-marshalstrike-Archetype change:featlist-marshalstrike-Combat change:featlist-rallybattlefocus-Archetype change:featlist-rallybattlefocus-Combat change:featlist-snapoutofit-Archetype change:featlist-snapoutofit-Skill change:featlist-rallydeathdefiance-Archetype change:featlist-rallydeathdefiance-Combat change:featlist-rallyingcharge-Archetype change:featlist-rallyingcharge-Combat change:featlist-backtoback-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-backtoback-Combat change:featlist-coordinatedcharge-Archetype change:featlist-coordinatedcharge-Combat change:featlist-bloodrager-Archetype change:featlist-rallybladethirst-Archetype change:featlist-deadlybladethirst-Archetype change:featlist-tactician-Archetype change:featlist-baitandswitch-Archetype change:featlist-rallyspeed-Archetype change:featlist-knowyourenemy-Archetype change:featlist-improvedcombatsuperiority-Archetype change:featlist-relentless-Archetype change:featlist-virtuoso-Archetype change:featlist-rallycompetence-Archetype change:featlist-distract-Archetype change:featlist-rallyresistance-Archetype change:featlist-peerlessskill-Archetype change:featlist-ambushartist-Archetype change:featlist-ambushartist-Skill change:featlist-firstawareness-Archetype change:featlist-firstawareness-Skill change:featlist-surpriseattack-Archetype change:featlist-surpriseattack-Combat change:featlist-fleetingshadow-Archetype change:featlist-deftstrike-Archetype change:featlist-deftstrike-Combat change:featlist-opportunistic-Archetype change:featlist-opportunistic-Combat change:featlist-assassin-Archetype change:featlist-infiltrationexpertise-Archetype change:featlist-deathstrike-Archetype change:featlist-deathstrike-Open change:featlist-assassinate-Archetype change:featlist-assassinate-Renitence change:featlist-phantom-Archetype change:featlist-extendedcloak-Archetype change:featlist-cloakingexpert-Archetype change:featlist-unseenstrike-Archetype change:featlist-weasel-Archetype change:featlist-lostinthecrowd-Archetype change:featlist-crowdmastery-Archetype change:featlist-expeditiousadvance-Archetype change:featlist-ambushspell-Archetype change:featlist-ambushspell-Spell change:featlist-tacticalwit-Archetype change:featlist-tacticalwit-Combat change:featlist-tacticalwit-General change:featlist-magicalambush-Archetype change:featlist-magicalambush-Spell change:featlist-detective-Archetype change:featlist-earfordeceit-Archetype change:featlist-discerningeye-Archetype change:featlist-unerringeye-Archetype change:featlist-spellthief-Archetype change:featlist-stealspell-Archetype change:featlist-magicthief-Archetype change:featlist-magicthief-General change:featlist-magicthief-Skill ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-greaterstealspell-Archetype change:featlist-whisper-Archetype change:featlist-quickchange-Archetype change:featlist-quickchange-Skill change:featlist-subtlespell-Archetype change:featlist-subtlespell-General change:featlist-subtlespell-Spell change:featlist-cloakingchakra-Archetype change:featlist-silentmessage-Archetype change:featlist-paramedic-Archetype change:featlist-paramedic-Skill change:featlist-healthassessor-Archetype change:featlist-healthassessor-General change:featlist-healthassessor-Skill change:featlist-treatcondition-Archetype change:featlist-treatcondition-Skill change:featlist-dutifulhealer-Archetype change:featlist-dutifulhealer-Skill change:featlist-resuscitate-Archetype change:featlist-resuscitate-Skill change:featlist-supremehealing-Archetype change:featlist-supremehealing-Spell change:featlist-chirurgeon-Archetype change:featlist-quickcraftmedicine-Archetype change:featlist-strategicdiagnosis-Archetype change:featlist-supportedhealing-Archetype change:featlist-onsitesupport-Archetype change:featlist-debilitatingstrike-Archetype change:featlist-etherealist-Archetype change:featlist-companionbond-Archetype change:featlist-animalcompanion-Archetype change:featlist-managemcasting-Archetype change:featlist-astralcompanionship-Archetype change:featlist-tandemaction-Archetype change:featlist-exorcism-Archetype change:featlist-spiritshield-Archetype change:featlist-lifecleric-Archetype change:featlist-discipleoflife-Archetype change:featlist-blessedhealer-Archetype change:featlist-heroicrecovery-Archetype change:featlist-shieldsage-Archetype change:featlist-wardingspell-Archetype change:featlist-barriercover-Archetype change:featlist-extendedcover-Archetype change:featlist-negatingcover-Archetype change:featlist-incrediblerecollection-Archetype change:featlist-incrediblerecollection-Skill change:featlist-specializedspells-Archetype change:featlist-specializedspells-Spell change:featlist-artificer-Archetype change:featlist-permanentitems-Archetype change:featlist-freestructure-Archetype change:featlist-durablestructures-Archetype change:featlist-warmage-Archetype change:featlist-sculptspell-Archetype change:featlist-elementalperfection-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-empoweredevocation-Archetype change:featlist-overchannelspell-Archetype change:featlist-empoweredspell-Archetype change:featlist-empoweredspell-Spell change:featlist-splitshot-Archetype change:featlist-splitshot-Spell change:featlist-steadyspellcasting-Archetype change:featlist-steadyspellcasting-Spell change:featlist-twinnedspell-Archetype change:featlist-twinnedspell-Spell change:featlist-echoingmagic-Archetype change:featlist-echoingmagic-Spell change:featlist-favoredsoul-Archetype change:featlist-arcanefavor-Archetype change:featlist-idealfavor-Archetype change:featlist-vitalfavor-Archetype change:featlist-favoredluck-Archetype change:featlist-bendfate-Archetype change:featlist-reactivefavor-Archetype change:featlist-doubledfavor-Archetype change:featlist-warlock-Archetype change:featlist-warlockcantrips-Archetype change:featlist-arcanedestruction-Archetype change:featlist-arcanedestruction-Spell change:featlist-eldritchspear-Archetype change:featlist-eldritchburst-Archetype change:featlist-seekingbolt-Archetype change:featlist-eldritchmastery-Archetype change:featlist-phantomshroud-Archetype change:featlist-phantomshroud-Spell change:featlist-accelerationshroud-Archetype change:featlist-accelerationshroud-Spell change:featlist-evolutionshroud-Archetype change:featlist-evolutionshroud-Spell change:featlist-conduit-Archetype change:featlist-reactivecompanion-Archetype change:featlist-synthesist-Archetype change:featlist-suppressappearance-Archetype change:featlist-assumecontrol-Archetype change:featlist-trueformshroud-Archetype change:featlist-divinegrace-Ascension change:featlist-restoringveil-Ascension change:featlist-giftofheaven-Ascension change:featlist-mercy-Ascension change:featlist-armamentwall-Ascension change:featlist-greatermercy-Ascension change:featlist-spiritualguardian-Ascension change:featlist-hypnoticstare-Ascension change:featlist-alluringhypnotism-Ascension change:featlist-possession-Ascension change:featlist-hypnoticcharm-Ascension change:featlist-influencedisaster-Ascension change:featlist-shadowform-Ascension change:featlist-distanttether-Ascension change:featlist-shadowcaster-Ascension change:featlist-shadowjump-Ascension change:featlist-manifestshade-Ascension ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-shadowwalk-Ascension change:featlist-attunedterrain-Ascension change:featlist-wildempathy-Ascension change:featlist-wildshape-Ascension change:featlist-greenempathy-Ascension change:featlist-communewithnature-Ascension change:featlist-bestialrush-Ascension change:featlist-elementalstrikes-Ascension change:featlist-hustle-Ascension change:featlist-spiritrage-Ascension change:featlist-spiritfrenzy-Ascension change:featlist-sunderspell-Ascension ", function (eventinfo) {
	update_character_feat_types_from_list_checked(eventinfo.triggerName, eventinfo.newValue);
	});
	on("change:featlist-armormastery-Archetype change:featlist-armormastery-Combat change:featlist-armormastery-General change:featlist-knowledgetraining-General change:featlist-knowledgetraining-Skill change:featlist-knowledgetraining-Spirit change:featlist-multilingual-General change:featlist-multilingual-Skill change:featlist-multilingual-Spirit change:featlist-skilltraining-Beast change:featlist-skilltraining-General change:featlist-skilltraining-Skill change:featlist-skilltraining-Spirit change:featlist-branchingout-General change:featlist-branchingout-Spell change:featlist-branchingout-Spirit change:featlist-slotsupport-General change:featlist-slotsupport-Spell change:featlist-slotsupport-Spirit change:featlist-sageknowledge-Archetype change:featlist-sageknowledge-Skill change:featlist-favoredterrain-Archetype change:featlist-favoredterrain-General change:featlist-favoredterrain-Spirit change:featlist-branchedknowledge-Archetype change:featlist-branchedknowledge-Skill change:featlist-pactslot-Archetype ", function (eventinfo) {
	update_character_feat_types_from_list_number(eventinfo.triggerName, eventinfo.previousValue, eventinfo.newValue);
	});
	




// Core: Features

on("change:repeating_features:featurename", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_feature_from_database(eventinfo.newValue, [GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_features")], false);
});

on("change:repeating_features:featureTraits change:repeating_features:featureActionCost change:repeating_features:featureConditionalsflag change:repeating_features:featurerange change:repeating_features:featureTrigger change:repeating_features:featureRequirement change:repeating_features:featureDesc change:repeating_features:featureCritSuccess change:repeating_features:featureSuccess change:repeating_features:featureFailure change:repeating_features:featureCritFailure", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	
	update_feature_action([GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_features")]);
});


on("change:repeating_features:featureCreateAction", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	make_action_from_feature(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_features"));
});





// Chat: Emotes

on("clicked:swapPostStyle", function () {

	var emoteAttrs = ["emoteInputTextStyle"];

	getAttrs(emoteAttrs, function (v) {
		var update = {};
		if (v["emoteInputTextStyle"] == "Input") {
			update["emoteInputTextStyle"] = "TextArea";
			update["emotePostStyleTextarea"] = "on";
			update["emotePostStyleTextInput"] = "on";
		} else {
			update["emoteInputTextStyle"] = "Input";
			update["emotePostStyleTextarea"] = 0;
			update["emotePostStyleTextInput"] = 0;
		}

		setAttrs(update, {
			silent: true
		});
	});
});

on("change:emoteInputTextStyle", function () {
	getAttrs(["emoteInputTextStyle"], function (v) {
		var update = {};
		update["emotePostStyleTextarea"] = (v["emoteInputTextStyle"] == "Input") ? "on" : 0;
		update["emotePostStyleTextInput"] = (v["emoteInputTextStyle"] == "Input") ? "on" : 0;
		setAttrs(update, {
			silent: true
		});
	});
});

on("change:repeating_emoteOutfits:emoteMainImage change:repeating_emoteOutfits:emoteFireImage change:repeating_emoteOutfits:emoteHurtImage change:repeating_emoteOutfits:emoteCutImage change:repeating_emotes:emote_name change:repeating_emotes:url change:repeating_emotes:emote_set", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_emotes();
});

on("change:repeating_emoteOutfits:isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var nameId = "repeating_emoteOutfits_" + item_id + "_name";

	getAttrs([nameId], function (v) {

		if (v[nameId] != undefined && v[nameId] != "") {
			update_active_emoteset(v[nameId]);
		}
	});
});

on("change:repeating_emoteOutfits:emoteMainImage", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var isSelected = "repeating_emoteOutfits_" + item_id + "_isSelected";

	getAttrs([isSelected], function (v) {

		if (v[isSelected] != undefined && v[isSelected] != "") {
			setAttrs({
				emote_activesetimageurl: eventinfo.newValue
			});
		}
	});
});

on("change:repeating_emoteOutfits:emoteFireImage", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var isSelected = "repeating_emoteOutfits_" + item_id + "_isSelected";

	getAttrs([isSelected], function (v) {

		if (v[isSelected] != undefined && v[isSelected] != "") {
			setAttrs({
				emote_activesetfireimageurl: eventinfo.newValue
			});
		}
	});
});

on("change:repeating_emoteOutfits:emoteHurtImage", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var isSelected = "repeating_emoteOutfits_" + item_id + "_isSelected";

	getAttrs([isSelected], function (v) {

		if (v[isSelected] != undefined && v[isSelected] != "") {
			setAttrs({
				emote_activesethurtimageurl: eventinfo.newValue
			});
		}
	});
});

on("change:repeating_emoteOutfits:emoteCutImage", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var isSelected = "repeating_emoteOutfits_" + item_id + "_isSelected";

	getAttrs([isSelected], function (v) {

		if (v[isSelected] != undefined && v[isSelected] != "") {
			setAttrs({
				emote_activesetcutinimageurl: eventinfo.newValue
			});
		}
	});
});

on("change:repeating_emoteOutfits:tempName", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var item_id = eventinfo.sourceAttribute.substring(23, 43);
	var nameId = "repeating_emoteOutfits_" + item_id + "_tempName";

	getAttrs([nameId], function (v) {

		if (v[nameId] != undefined && v[nameId] != "") {
			update_emoteset_name(item_id);
		}
	});
});

on("change:speaking_language", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_language("speaking_language");
});

on("change:repeating_languages:isSelected change:repeating_languages:language", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	var item_id = eventinfo.sourceAttribute.substring(0, 40);
	update_language(item_id + "_language");
});

on("change:emotePostContent", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_emote_post();
});

on("change:repeating_chararecast", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_recast_list();
});






// Life: Downtime

on("change:repeating_downtimeCalendar:week1isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWeekSelection("1", GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_downtimeCalendar"));
});

on("change:repeating_downtimeCalendar:week2isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWeekSelection("2", GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_downtimeCalendar"));
});

on("change:repeating_downtimeCalendar:week3isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWeekSelection("3", GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_downtimeCalendar"));
});

on("change:repeating_downtimeCalendar:week4isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWeekSelection("4", GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_downtimeCalendar"));
});

on("change:calendar_weeklyLog", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWeekLog(eventinfo.newValue);
});

on("change:downtimeLockIn", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeActivityLockIn();
});


on("change:repeating_proficienceTasks:isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var sectionId = eventinfo.sourceAttribute.substring(27, 47);
	update_downtimeSubActivitySelection(sectionId, "repeating_proficienceTasks");
});

on("change:repeating_relaxationactivities:isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var sectionId = eventinfo.sourceAttribute.substring(31, 51);
	update_downtimeSubActivitySelection(sectionId, "repeating_relaxationactivities");
});

on("change:repeating_researchtopics:isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var sectionId = eventinfo.sourceAttribute.substring(25, 45);
	update_downtimeSubActivitySelection(sectionId, "repeating_researchtopics");
});

on("change:downtimeWorkGeneralCategory", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_downtimeWorkCategorySelection(eventinfo.newValue);
});

on("change:repeating_downtimecustomwork:type", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var sectionId = eventinfo.sourceAttribute.substring(29, 49);
	update_downtimeWorkCustomTypeSelection(sectionId, eventinfo.newValue);
});





// Gear: Item Database Look Ups

on("change:repeating_gearConsumables:itemname change:repeating_inventory:itemname change:repeating_gearDust:itemname change:repeating_gearGoods:itemname", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var splits = eventinfo.sourceAttribute.split("_");
	var repeatingSection = splits[0] + "_" + splits[1];

	update_item_from_database(repeatingSection, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection), eventinfo.newValue);
});

on("change:repeating_gearAmmunition:itemType change:repeating_gearWeapons:itemType change:repeating_gearArmor:itemType change:repeating_gearShields:itemType", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var splits = eventinfo.sourceAttribute.split("_");
	var repeatingSection = splits[0] + "_" + splits[1];

	update_craftedItem_materials_from_database(repeatingSection, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection), eventinfo.newValue);
});

on("change:repeating_gearAmmunition:itemMaterial change:repeating_gearWeapons:itemMaterial change:repeating_gearArmor:itemMaterial change:repeating_gearShields:itemMaterial", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	var splits = eventinfo.sourceAttribute.split("_");
	var repeatingSection = splits[0] + "_" + splits[1];

	update_craftedItem_from_database(repeatingSection, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection));
});


// Gear: Weights


on("change:repeating_gearConsumables:itemweight change:repeating_gearConsumables:itemcount change:repeating_gearConsumables:iteminstorage change:repeating_gearAmmunition:itemweight change:repeating_gearAmmunition:itemcount change:repeating_gearAmmunition:iteminstorage change:repeating_gearWeapons:itemweight change:repeating_gearWeapons:itemcount change:repeating_gearWeapons:iteminstorage change:repeating_gearArmor:itemweight change:repeating_gearArmor:itemcount change:repeating_gearArmor:iteminstorage change:repeating_gearShields:itemweight change:repeating_gearShields:itemcount change:repeating_gearShields:iteminstorage change:repeating_inventory:itemweight change:repeating_inventory:itemcount change:repeating_inventory:iteminstorage change:repeating_gearDust:itemweight change:repeating_gearDust:itemcount change:repeating_gearDust:iteminstorage change:repeating_gearGoods:itemweight change:repeating_gearGoods:itemcount change:repeating_gearGoods:iteminstorage", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_weight();
});

on("remove:repeating_gearConsumables remove:repeating_gearAmmunition remove:repeating_gearWeapons remove:repeating_gearArmor remove:repeating_gearShields remove:repeating_inventory remove:repeating_gearDust remove:repeating_gearGoods", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_weight();
});

on("change:jin change:frt change:syr change:gp change:cp change:size change:carrying_capacity_mod", function () {
	update_weight();
});

// Gear: Special Actions

on("change:repeating_gearConsumables:itemType change:repeating_gearConsumables:itemname", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_item_id_list("repeating_gearConsumables", "allConsumables");
});

on("change:repeating_gearAmmunition:itemType change:repeating_gearAmmunition:itemname", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_item_id_list("repeating_gearAmmunition", "allAmmunition");
});


on("change:repeating_gearWeapons:createAction", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	make_attack_from_weapon(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearWeapons"));
});

on("change:gearUnarmoredIsSelected remove:repeating_gearArmor", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	console.log ("selecting Armor: none");
	update_selected_armor("current", "repeating_geararmor");
});

on("change:gearUnshieldedIsSelected remove:repeating_gearShields", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_armor("current", "repeating_gearshields");
});

on("change:repeating_gearArmor:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	console.log ("selecting Armor: " + eventinfo.sourceAttribute);
	update_selected_armor(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_geararmor"), "repeating_geararmor");
});

on("change:repeating_gearShields:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_armor(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearshields"), "repeating_gearshields");
});

on("change:globalArmorFlexibility", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_armor_flexibility();
});

on("change:repeating_gearArmor:itemAC change:repeating_gearArmor:itemSkill change:repeating_gearShields:itemAC change:repeating_gearShields:itemSkill", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_ac();
});

on("change:repeating_inventory:moveToStorage", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	var itemid = eventinfo.sourceAttribute.substring(0, 40);
	move_inventory_gear(itemid, "repeating_inventorystorage");
});

on("change:repeating_inventorystorage:moveToGear", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	var itemid = eventinfo.sourceAttribute.substring(0, 47);
	move_inventory_gear(itemid, "repeating_inventory");
});

// Gear: Blueprints

on("change:repeating_gearCrafting:craftingsearch", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	search_blueprint_from_database(eventinfo.newValue, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingname change:repeating_gearCrafting:craftingcomponentmaterial0 change:repeating_gearCrafting:craftingaddmaterialname", function (eventinfo) {

	update_blueprint_name(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingcomponentmaterial0 change:repeating_gearCrafting:craftingcomponentmaterial1 change:repeating_gearCrafting:craftingcomponentmaterial2 change:repeating_gearCrafting:craftingcomponentmaterial3 change:repeating_gearCrafting:craftingcomponentmaterial4", function (eventinfo) {

	update_blueprint_skill(eventinfo.newValue, 
		eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.length - 1), 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingcomponentsize0 change:repeating_gearCrafting:craftingcomponentsize1 change:repeating_gearCrafting:craftingcomponentsize2 change:repeating_gearCrafting:craftingcomponentsize3 change:repeating_gearCrafting:craftingcomponentsize4", function (eventinfo) {

	update_blueprint_component_motes(eventinfo.newValue, 
		eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.length - 1), 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingcomponentmotes0 change:repeating_gearCrafting:craftingcomponentmotes1 change:repeating_gearCrafting:craftingcomponentmotes2 change:repeating_gearCrafting:craftingcomponentmotes3 change:repeating_gearCrafting:craftingcomponentmotes4", function (eventinfo) {

	update_blueprint_component_size(eventinfo.newValue, 
		eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.length - 1), 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingaspectbutton0 change:repeating_gearCrafting:craftingaspectbutton1 change:repeating_gearCrafting:craftingaspectbutton2 change:repeating_gearCrafting:craftingaspectbutton3 change:repeating_gearCrafting:craftingaspectbutton4", function (eventinfo) {

	update_blueprint_component_aspectList(eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.length - 1), 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingcomponentmaterial0 change:repeating_gearCrafting:craftingcomponentmaterial1 change:repeating_gearCrafting:craftingcomponentmaterial2 change:repeating_gearCrafting:craftingcomponentmaterial3 change:repeating_gearCrafting:craftingcomponentmaterial4 change:repeating_gearCrafting:craftingcomponentskill change:repeating_gearCrafting:craftingcomponentskill1 change:repeating_gearCrafting:craftingcomponentskill2 change:repeating_gearCrafting:craftingcomponentskill3 change:repeating_gearCrafting:craftingcomponentskill4 change:repeating_gearCrafting:craftingcomponentaspects0 change:repeating_gearCrafting:craftingcomponentaspects1 change:repeating_gearCrafting:craftingcomponentaspects2 change:repeating_gearCrafting:craftingcomponentaspects3 change:repeating_gearCrafting:craftingcomponentaspects4", function (eventinfo) {

	update_blueprint_craft_state(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingReset", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	reset_crafting(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingConsumeAll", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	spend_crafting_resources(["0", "1", "2", "3", "4"], GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingConsume0 change:repeating_gearCrafting:craftingConsume1 change:repeating_gearCrafting:craftingConsume2 change:repeating_gearCrafting:craftingConsume3 change:repeating_gearCrafting:craftingConsume4", function (eventinfo) {

	spend_crafting_resources([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.length - 1)], 
		GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});

on("change:repeating_gearCrafting:craftingAddItem", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	add_crafted_object(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_gearCrafting"));
});






// Skills: Skills updates

on("change:skillClassBonus change:skillArchetypeBonus change:skillFeatBonus change:skillMiscBonus", function () {
	update_skill_proficiency_points();
});

on("change:skillproficiency-acrobatics change:skillmod-acrobatics change:skillproficiency-arcana change:skillmod-arcana change:skillproficiency-athletics change:skillmod-athletics change:skillproficiency-deception change:skillmod-deception change:skillproficiency-health change:skillmod-health change:skillproficiency-insight change:skillmod-insight change:skillproficiency-intimidation change:skillmod-intimidation change:skillproficiency-investigation change:skillmod-investigation change:skillproficiency-nature change:skillmod-nature change:skillproficiency-perception change:skillmod-perception change:skillproficiency-performance change:skillmod-performance change:skillproficiency-persuasion change:skillmod-persuasion change:skillproficiency-stealth change:skillmod-stealth change:skillproficiency-survival change:skillmod-survival change:skillproficiency-thievery change:skillmod-thievery change:skillproficiency-alchemy change:skillmod-alchemy change:skillproficiency-artistry change:skillmod-artistry change:skillproficiency-brewing change:skillmod-brewing change:skillproficiency-carving change:skillmod-carving change:skillproficiency-cooking change:skillmod-cooking change:skillproficiency-leatherworking change:skillmod-leatherworking change:skillproficiency-molding change:skillmod-molding change:skillproficiency-smithing change:skillmod-smithing change:skillproficiency-tinkering change:skillmod-tinkering change:skillproficiency-weaving change:skillmod-weaving change:skillproficiency-knowledgeskills change:skillmod-knowledgeskills change:skillproficiency-disabledevice change:skillmod-disabledevice change:skillproficiency-disguise change:skillmod-disguise change:skillproficiency-gathering change:skillmod-gathering change:skillproficiency-medicine change:skillmod-medicine change:skillproficiency-pilot change:skillmod-pilot", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skills([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1)]);
	update_skill_proficiency_points();
});

// Skills: Skills Ability Score updates

on("change:skillabilityscore-acrobatics change:skillabilityscore-arcana change:skillabilityscore-athletics change:skillabilityscore-deception change:skillabilityscore-health change:skillabilityscore-insight change:skillabilityscore-intimidation change:skillabilityscore-investigation change:skillabilityscore-nature change:skillabilityscore-perception change:skillabilityscore-performance change:skillabilityscore-persuasion change:skillabilityscore-stealth change:skillabilityscore-survival change:skillabilityscore-thievery", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skill_base_ability_score(eventinfo.previousValue, eventinfo.newValue, eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1), "base");
});

on("change:skillabilityscore-alchemy change:skillabilityscore-artistry change:skillabilityscore-brewing change:skillabilityscore-carving change:skillabilityscore-cooking change:skillabilityscore-leatherworking change:skillabilityscore-molding change:skillabilityscore-smithing change:skillabilityscore-tinkering change:skillabilityscore-weaving", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skill_base_ability_score(eventinfo.previousValue, eventinfo.newValue, eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1), "crafting");
});

on("change:skillabilityscore-disabledevice change:skillabilityscore-disguise change:skillabilityscore-gathering change:skillabilityscore-medicine change:skillabilityscore-pilot", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_skill_base_ability_score(eventinfo.previousValue, eventinfo.newValue, eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1), "technical");
});

// Skills: specialization updates

on("change:skillspecproficiency-balance change:skillspecmod-balance change:skillspecproficiency-escapeartist change:skillspecmod-escapeartist change:skillspecproficiency-squeeze change:skillspecmod-squeeze change:skillspecproficiency-tumble change:skillspecmod-tumble change:skillspecproficiency-identifymagic change:skillspecmod-identifymagic change:skillspecproficiency-restorebarrier change:skillspecmod-restorebarrier change:skillspecproficiency-climb change:skillspecmod-climb change:skillspecproficiency-breakfree change:skillspecmod-breakfree change:skillspecproficiency-grapple change:skillspecmod-grapple change:skillspecproficiency-highjump change:skillspecmod-highjump change:skillspecproficiency-longjump change:skillspecmod-longjump change:skillspecproficiency-shove change:skillspecmod-shove change:skillspecproficiency-swim change:skillspecmod-swim change:skillspecproficiency-createadiversion change:skillspecmod-createadiversion change:skillspecproficiency-impersonate change:skillspecmod-impersonate change:skillspecproficiency-lie change:skillspecmod-lie change:skillspecproficiency-identifyillness change:skillspecmod-identifyillness change:skillspecproficiency-stabilize change:skillspecmod-stabilize change:skillspecproficiency-discernsecret change:skillspecmod-discernsecret", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1)]);
	update_skill_proficiency_points();
});
on("change:skillspecproficiency-sensemotive change:skillspecmod-sensemotive change:skillspecproficiency-coerce change:skillspecmod-coerce change:skillspecproficiency-demoralize change:skillspecmod-demoralize change:skillspecproficiency-analyze change:skillspecmod-analyze change:skillspecproficiency-appraise change:skillspecmod-appraise change:skillspecproficiency-seek change:skillspecmod-seek change:skillspecproficiency-assesscreature change:skillspecmod-assesscreature change:skillspecproficiency-commandanimal change:skillspecmod-commandanimal change:skillspecproficiency-perceivebarrier change:skillspecmod-perceivebarrier change:skillspecproficiency-sensepresence change:skillspecmod-sensepresence change:skillspecproficiency-act change:skillspecmod-act change:skillspecproficiency-comedy change:skillspecmod-comedy change:skillspecproficiency-dance change:skillspecmod-dance change:skillspecproficiency-oratory change:skillspecmod-oratory change:skillspecproficiency-playinstrument change:skillspecmod-playinstrument change:skillspecproficiency-sing change:skillspecmod-sing change:skillspecproficiency-gatherinformation change:skillspecmod-gatherinformation change:skillspecproficiency-influence change:skillspecmod-influence change:skillspecproficiency-requestfavor change:skillspecmod-requestfavor change:skillspecproficiency-decipherwriting change:skillspecmod-decipherwriting change:skillspecproficiency-concealanobject change:skillspecmod-concealanobject change:skillspecproficiency-hide change:skillspecmod-hide change:skillspecproficiency-sneak change:skillspecmod-sneak change:skillspecproficiency-navigate change:skillspecmod-navigate change:skillspecproficiency-track change:skillspecmod-track change:skillspecproficiency-palm change:skillspecmod-palm change:skillspecproficiency-steal change:skillspecmod-steal", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1)]);
	update_skill_proficiency_points();
});
on("change:skillspecproficiency-balm change:skillspecmod-balm change:skillspecproficiency-inhalent change:skillspecmod-inhalent change:skillspecproficiency-injection change:skillspecmod-injection change:skillspecproficiency-tablet change:skillspecmod-tablet change:skillspecproficiency-painting change:skillspecmod-painting change:skillspecproficiency-penmanship change:skillspecmod-penmanship change:skillspecproficiency-sketching change:skillspecmod-sketching change:skillspecproficiency-blending change:skillspecmod-blending change:skillspecproficiency-fermenting change:skillspecmod-fermenting change:skillspecproficiency-roasting change:skillspecmod-roasting change:skillspecproficiency-steeping change:skillspecmod-steeping change:skillspecproficiency-chiselling change:skillspecmod-chiselling change:skillspecproficiency-cutting change:skillspecmod-cutting change:skillspecproficiency-shapeice change:skillspecmod-shapeice change:skillspecproficiency-shapeplants change:skillspecmod-shapeplants change:skillspecproficiency-baking change:skillspecmod-baking change:skillspecproficiency-grilling change:skillspecmod-grilling change:skillspecproficiency-mixing change:skillspecmod-mixing change:skillspecproficiency-simmering change:skillspecmod-simmering change:skillspecproficiency-steaming change:skillspecmod-steaming change:skillspecproficiency-stewing change:skillspecmod-stewing change:skillspecproficiency-stitching change:skillspecmod-stitching change:skillspecproficiency-tanning change:skillspecmod-tanning change:skillspecproficiency-glassblowing change:skillspecmod-glassblowing change:skillspecproficiency-sculpting change:skillspecmod-sculpting change:skillspecproficiency-shapeearth change:skillspecmod-shapeearth change:skillspecproficiency-shapeglass change:skillspecmod-shapeglass change:skillspecproficiency-forging change:skillspecmod-forging change:skillspecproficiency-shapemetal change:skillspecmod-shapemetal change:skillspecproficiency-engineering change:skillspecmod-engineering change:skillspecproficiency-goldsmithing change:skillspecmod-goldsmithing change:skillspecproficiency-fabriccraft change:skillspecmod-fabriccraft change:skillspecproficiency-sewing change:skillspecmod-sewing", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1)]);
	update_skill_proficiency_points();
});
on("change:skillspecproficiency-openlock change:skillspecmod-openlock change:skillspecproficiency-sabotage change:skillspecmod-sabotage change:skillspecproficiency-guise change:skillspecmod-guise change:skillspecproficiency-farm change:skillspecmod-farm change:skillspecproficiency-fish change:skillspecmod-fish change:skillspecproficiency-forage change:skillspecmod-forage change:skillspecproficiency-mining change:skillspecmod-mining change:skillspecproficiency-coatpoison change:skillspecmod-coatpoison change:skillspecproficiency-dose change:skillspecmod-dose change:skillspecproficiency-firstaid change:skillspecmod-firstaid change:skillspecproficiency-releasepoison change:skillspecmod-releasepoison change:skillspecproficiency-pilotaircraft change:skillspecmod-pilotaircraft change:skillspecproficiency-pilotgroundcraft change:skillspecmod-pilotgroundcraft change:skillspecproficiency-pilotseacraft change:skillspecmod-pilotseacraft", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations([eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1)]);
	update_skill_proficiency_points();
});

// Skills: specialization base skill changes
on("change:skillspecbase-balance change:skillspecbase-escapeartist change:skillspecbase-squeeze change:skillspecbase-tumble change:skillspecbase-identifymagic change:skillspecbase-restorebarrier change:skillspecbase-climb change:skillspecbase-breakfree change:skillspecbase-grapple change:skillspecbase-highjump change:skillspecbase-longjump change:skillspecbase-shove change:skillspecbase-swim change:skillspecbase-createadiversion change:skillspecbase-impersonate change:skillspecbase-lie change:skillspecbase-identifyillness change:skillspecbase-stabilize change:skillspecbase-discernsecret change:skillspecbase-sensemotive change:skillspecbase-coerce change:skillspecbase-demoralize change:skillspecbase-analyze change:skillspecbase-appraise change:skillspecbase-seek change:skillspecbase-assesscreature change:skillspecbase-commandanimal change:skillspecbase-perceivebarrier change:skillspecbase-sensepresence change:skillspecbase-act change:skillspecbase-comedy change:skillspecbase-dance change:skillspecbase-oratory change:skillspecbase-playinstrument change:skillspecbase-sing change:skillspecbase-gatherinformation change:skillspecbase-influence change:skillspecbase-requestfavor change:skillspecbase-decipherwriting change:skillspecbase-concealanobject change:skillspecbase-hide change:skillspecbase-sneak change:skillspecbase-navigate change:skillspecbase-track change:skillspecbase-palm change:skillspecbase-steal", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations_base_skill(eventinfo.previousValue, eventinfo.newValue, eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1));
});
on("change:skillspecbase-balm change:skillspecbase-inhalent change:skillspecbase-injection change:skillspecbase-tablet change:skillspecbase-painting change:skillspecbase-penmanship change:skillspecbase-sketching change:skillspecbase-blending change:skillspecbase-fermenting change:skillspecbase-roasting change:skillspecbase-steeping change:skillspecbase-chiselling change:skillspecbase-cutting change:skillspecbase-shapeice change:skillspecbase-shapeplants change:skillspecbase-baking change:skillspecbase-grilling change:skillspecbase-mixing change:skillspecbase-simmering change:skillspecbase-steaming change:skillspecbase-stewing change:skillspecbase-stitching change:skillspecbase-tanning change:skillspecbase-glassblowing change:skillspecbase-sculpting change:skillspecbase-shapeearth change:skillspecbase-shapeglass change:skillspecbase-forging change:skillspecbase-shapemetal change:skillspecbase-engineering change:skillspecbase-goldsmithing change:skillspecbase-fabriccraft change:skillspecbase-sewing change:skillspecbase-openlock change:skillspecbase-sabotage change:skillspecbase-guise change:skillspecbase-farm change:skillspecbase-fish change:skillspecbase-forage change:skillspecbase-mining change:skillspecbase-coatpoison change:skillspecbase-dose change:skillspecbase-firstaid change:skillspecbase-releasepoison change:skillspecbase-pilotaircraft change:skillspecbase-pilotgroundcraft change:skillspecbase-pilotseacraft", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_specializations_base_skill(eventinfo.previousValue, eventinfo.newValue, eventinfo.sourceAttribute.substr(eventinfo.sourceAttribute.indexOf("-") + 1));
});

// Skills: Knowledges
on("change:repeating_skillKnowledges:skillknowledgecat", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_category(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillKnowledges"), eventinfo.newValue);
});

on("change:repeating_skillKnowledges:skillknowledgepreset", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_skill_preset(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillKnowledges"), eventinfo.newValue);
});

on("change:repeating_skillKnowledges:skillknowledgespeccat", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_skill_specialization_preset(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillKnowledges"), eventinfo.newValue);
});

on("change:repeating_skillKnowledges:skillknowledgebase change:repeating_skillKnowledges:skillknowledgeproficiency change:repeating_skillKnowledges:skillknowledgemod", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_skills();
});

// Skills: Languages

on("change:repeating_skillLanguages:language", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_language_description(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillLanguages"), eventinfo.newValue);
});

on("change:repeating_skillLanguages:languageproficiency change:repeating_skillLanguages:languagebase change:repeating_skillLanguages:languagemod", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_language_skills([GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillLanguages")]);
});


// Actions: Resources

on("change:repeating_resources:resourcecount change:repeating_resources:resourcename change:repeating_resources:recoverstyle", function (eventinfo) {

	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_all_resource_ids();
});

// Actions: Unique Actions

on("change:repeating_customActions:atkname", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_actions(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_customActions"), true);
});

on("change:repeating_customActions:atkTargetStyle change:repeating_customActions:atkTraits change:repeating_customActions:atkActionCost change:repeating_customActions:atkConditionalsflag change:repeating_customActions:atkrange change:repeating_customActions:atkTrigger change:repeating_customActions:atkRequirement change:repeating_customActions:checkflag change:repeating_customActions:checkbase change:repeating_customActions:checkmod change:repeating_customActions:checkdef change:repeating_customActions:checkdefdc change:repeating_customActions:atkflag change:repeating_customActions:atkattr_base change:repeating_customActions:atkmod change:repeating_customActions:proficiency_group change:repeating_customActions:proficiency_customrank change:repeating_customActions:dmgflag change:repeating_customActions:dmgbase change:repeating_customActions:dmgattr change:repeating_customActions:dmgmod change:repeating_customActions:dmgtype change:repeating_customActions:dmgelement change:repeating_customActions:dmg2flag change:repeating_customActions:dmg2base change:repeating_customActions:dmg2attr change:repeating_customActions:dmg2mod change:repeating_customActions:dmg2type change:repeating_customActions:dmg2element change:repeating_customActions:atkspellpower change:repeating_customActions:hldmg change:repeating_customActions:atkCritSuccess change:repeating_customActions:atkSuccess change:repeating_customActions:atkFailure change:repeating_customActions:atkCritFailure change:repeating_customActions:spellmana change:repeating_customActions:ammo change:repeating_customActions:resource change:repeating_customActions:consumable change:repeating_customActions:atk_desc", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_actions(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_customActions"));
});

on("remove:repeating_customActions", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_all_action_ids();
});

// Actions: Spellcasting

on("change:repeating_spells:spellname", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_spell_from_database(eventinfo.newValue, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_spells"));
});

on("change:repeating_spells:spellAspect", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_spell_aspect(eventinfo.newValue, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_spells"));
});

on("change:repeating_spells:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_centered_spells(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_spells"));
});

on("change:repeating_spells:isSelected change:repeating_spells:spellname change:repeating_spells:spellpower change:repeating_spells:spellbranch change:repeating_spells:spellTargetStyle change:repeating_spells:spellTraits change:repeating_spells:spellmanabase change:repeating_spells:spellmanamod change:repeating_spells:spellActionCostNormal change:repeating_spells:spellActionCostCentered change:repeating_spells:spellTrigger change:repeating_spells:spellduration change:repeating_spells:spellrange change:repeating_spells:spellarea change:repeating_spells:spelltargets change:repeating_spells:checkflag change:repeating_spells:checkbase change:repeating_spells:checkmod change:repeating_spells:checkdef change:repeating_spells:checkdefdc change:repeating_spells:spellflag change:repeating_spells:spellattr_base change:repeating_spells:spellmod change:repeating_spells:proficiency_group change:repeating_spells:proficiency_customrank change:repeating_spells:dmgflag change:repeating_spells:dmgbase change:repeating_spells:dmgattr change:repeating_spells:dmgmod change:repeating_spells:dmgtype change:repeating_spells:dmgelement change:repeating_spells:dmg2flag change:repeating_spells:dmg2base change:repeating_spells:dmg2attr change:repeating_spells:dmg2mod change:repeating_spells:dmg2type change:repeating_spells:dmg2element change:repeating_spells:hldmg change:repeating_spells:spellCritSuccess change:repeating_spells:spellSuccess change:repeating_spells:spellFailure change:repeating_spells:spellCritFailure change:repeating_spells:spellCritSuccess change:repeating_spells:spellSuccess change:repeating_spells:spellFailure change:repeating_spells:spellCritFailure change:repeating_spells:spell_desc change:repeating_spells:spellheightendesc", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_spell_info(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_spells"));
});

on("remove:repeating_spells", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_all_spell_ids();
});



// Vitals: Core Statistics

on("change:walk_speed change:climb_speed change:fly_speed change:burrow_speed", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_speed();
});

on("change:hpTrue change:hp_max change:barrierTrue change:barrier_max change:hpBonus change:barrierBonus change:vitalityBonus change:manaEssenceBonus", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_health_barrier();
});

on("change:classBarrierIsSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_barrier("current");
});

on("change:repeating_barriers:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_barrier(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_barriers"));
});


// Vitals: Defense Modifiers
on("change:repeating_acmodifiers:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_ac();
	update_weakness_and_resistance();
});

on("change:armorAddProficiency-unarmored change:armorAddProficiency-light change:armorAddProficiency-medium change:armorAddProficiency-heavy change:armorMaxMediumDex change:armorBACActiveState change:armorBACWithArmor change:repeating_acmodifiers:isSelected change:repeating_acmodifiers:actsWithBarrier change:repeating_acmodifiers:acmod change:repeating_acmodifiers:acattr", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_ac();
});

on("change:repeating_acmodifiers:weakness change:repeating_acmodifiers:resistance", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_weakness_and_resistance();
});


// Vitals: Injuries
on("change:repeating_injuries:injuryName", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	let repeatingSection = "repeating_injuries";
	update_injury_from_preset(repeatingSection, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection), eventinfo.newValue);
});

on("change:repeating_activeinjuries:injuryName", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	let repeatingSection = "repeating_activeinjuries";
	update_injury_from_preset(repeatingSection, GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection), eventinfo.newValue);
});

on("change:repeating_injuries:injuryState", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	var injuryid = eventinfo.sourceAttribute.substring(19, 39);
	update_injury_data("repeating_injuries", injuryid);
});

on("change:repeating_activeinjuries:injuryState", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	var injuryid = eventinfo.sourceAttribute.substring(25, 45);
	update_injury_data("repeating_activeinjuries", injuryid);
});

on("change:repeating_activeinjuries:injuryHP change:repeating_activeinjuries:injuryName remove:repeating_activeinjuries", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_active_injuries();
});










// Records: Lifestyle

on("change:repeating_lifestyleresidences:lifestyle_location change:repeating_lifestyleresidences:residence_type change:repeating_lifestyleresidences:residence_size", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var attr_fields = [];

	// get the name
	var sectionId = eventinfo.sourceAttribute.substring(30, 50);
	var residenceNameId = "repeating_lifestyleresidences_" + sectionId + "_name";
	attr_fields.push(residenceNameId);
	update_residences([sectionId]);
});

on("change:repeating_lifestyleresidences:name", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}

	var sectionId = eventinfo.sourceAttribute.substring(30, 50);
	update_residence_name(sectionId, eventinfo.previousValue, eventinfo.newValue);
});

on("change:repeating_rooms:base_cost change:repeating_rooms:size change:repeating_rooms:weekly_mod change:repeating_rooms:purchased change:repeating_rooms:floor change:repeating_rooms:funds change:repeating_rooms:influence change:repeating_rooms:morale", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var sectionId = eventinfo.sourceAttribute.substring(16, 36);
	var attr_fields = ["repeating_rooms_ " + sectionId + "_residence"];
	getAttrs(attr_fields, function (v) {
		update_residence(v["repeating_rooms_ " + sectionId + "_residence"]);
	});
});

on("change:repeating_rooms:residence", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_residence(eventinfo.previousValue);
	update_residence(eventinfo.newValue);
});

on("change:repeating_lifestyleresidences:isSelected change:repeating_lifestyleexpenses", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_lifestyle();
});

on("change:repeating_rooms:name", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var sectionId = eventinfo.sourceAttribute.substring(16, 36);
	update_room_from_database(sectionId, eventinfo.newValue);
});

on("change:repeating_lifestyleresidences:region", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var sectionId = eventinfo.sourceAttribute.substring(30, 50);
	update_lifestyleRegionSelection(sectionId, eventinfo.newValue);
});

on("change:repeating_lifestyleexpenses:type", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	}
	var sectionId = eventinfo.sourceAttribute.substring(28, 48);
	update_lifestyleOptionTypeSelection(sectionId, eventinfo.newValue);
});


// Settings

on("change:jack_of_all_trades", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_jack_attr();
	update_initiative();
	update_all_skills();
});

on("change:initmod change:initabilityscore", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_initiative();
});

on("change:difficultyStyle", function () {
	update_health_barrier();
});


// Party Manager : NPC

on("clicked:generateNPC", function () {
	update_generated_NPC();
});


// Party Manager : Tools

on("change:repeating_mainchaptermissions:defaultTypes", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	var actionid = eventinfo.sourceAttribute.substring(30, 50);
	console.log("Set Default Type: " + eventinfo.sourceAttribute + " to " + actionid);
	update_missionType(actionid);
});


// Party Manager : Notes

on("change:repeating_preparedmainchapters:type change:repeating_preparedmainchapters:header change:repeating_preparedmainchapters:sub change:repeating_preparedmainchapters:location", function (eventinfo) {
	update_postbox_text(eventinfo.sourceAttribute.substring(0, 51));
});

on("change:repeating_locreferences:type change:repeating_locreferences:header change:repeating_locreferences:sub change:repeating_locreferences:location", function (eventinfo) {
	update_postbox_text(eventinfo.sourceAttribute.substring(0, 44));
});

on("change:repeating_preparedsidechapters:type change:repeating_preparedsidechapters:header change:repeating_preparedsidechapters:sub change:repeating_preparedsidechapters:location", function (eventinfo) {
	update_postbox_text(eventinfo.sourceAttribute.substring(0, 51));
});

on("change:repeating_dmPostingSection:type change:repeating_dmPostingSection:header change:repeating_dmPostingSection:sub change:repeating_dmPostingSection:location", function (eventinfo) {
	update_postbox_text(eventinfo.sourceAttribute.substring(0, 47));
});



// Battle Log : Battle

on("change:repeating_battleLog:logActionName change:repeating_battleLog:logExecuterName", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_update_action_title(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:checkflag change:repeating_battleLog:logExecuterCheckIsRoll change:repeating_battleLog:logExecuterCheck1 change:repeating_battleLog:logExecuterCheck2 change:repeating_battleLog:logExecuterCheckBonusName1 change:repeating_battleLog:logExecuterCheckBonusMod1 change:repeating_battleLog:logExecuterCheckBonusName2 change:repeating_battleLog:logExecuterCheckBonusMod2 change:repeating_battleLog:logExecuterCheckBonusName3 change:repeating_battleLog:logExecuterCheckBonusMod3 change:repeating_battleLog:logExecuterCheckBonusName4 change:repeating_battleLog:logExecuterCheckBonusMod4 change:repeating_battleLog:logExecuterCheckBonusName5 change:repeating_battleLog:logExecuterCheckBonusMod5 change:repeating_battleLog:logTargetCheckName change:repeating_battleLog:logTargetCheckIsDC change:repeating_battleLog:logTargetCheck1 change:repeating_battleLog:logTargetCheck1Roll change:repeating_battleLog:logTargetCheck2Roll change:repeating_battleLog:logMultiAttackPenalty change:repeating_battleLog:logHasBarrier change:repeating_battleLog:logIsFlatFooted change:repeating_battleLog:logdmgelement", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_update_action_check(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logTargetWeaknesses change:repeating_battleLog:logTargetResistances change:repeating_battleLog:dmgflag change:repeating_battleLog:logdmg change:repeating_battleLog:logdmgcrit change:repeating_battleLog:logdmgtype change:repeating_battleLog:logdmgelement change:repeating_battleLog:logDamageBonusName1 change:repeating_battleLog:logDamageCheckBonusMod1 change:repeating_battleLog:logDamageCheckBonusCrit1 change:repeating_battleLog:logDamageBonusName2 change:repeating_battleLog:logDamageCheckBonusMod2 change:repeating_battleLog:logDamageCheckBonusCrit2 change:repeating_battleLog:logDamageBonusName3 change:repeating_battleLog:logDamageCheckBonusMod3 change:repeating_battleLog:logDamageCheckBonusCrit3 change:repeating_battleLog:logDamageBonusName4 change:repeating_battleLog:logDamageCheckBonusMod4 change:repeating_battleLog:logDamageCheckBonusCrit4 change:repeating_battleLog:logDamageBonusName5 change:repeating_battleLog:logDamageCheckBonusMod5 change:repeating_battleLog:logDamageCheckBonusCrit5 change:repeating_battleLog:dmg2flag change:repeating_battleLog:logdmg2 change:repeating_battleLog:logdmg2crit change:repeating_battleLog:logdmg2type change:repeating_battleLog:logdmg2element change:repeating_battleLog:logHasBarrier", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_update_action_damage(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logSetMod", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_set_mod(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logApplyAtk", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_apply_atk_mod(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logApplyDmg1", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_apply_dmg1_mod(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logApplyDmg2", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	battle_log_apply_dmg2_mod(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:repeating_battleLog:logDelete", function (eventinfo) {

	remove_battle_log(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_battleLog"));
});

on("change:clearbattlelog", function (eventinfo) {

	remove_all_battle_logs();
});

on("change:refreshActions", function (eventinfo) {

	update_pb();
	finish_update_pb();
	update_all_features();
});











// Getters, Setters, and helper functions

var get_random_die = function (die) {
	return Math.floor(Math.random() * die) + 1;
}

var GetSectionIdValues = function (idarray, sectionName, variableArray) {
	var output = [];

	_.each(idarray, function (currentID) {
		_.each(variableArray, function (variableName) {
			output.push(GetSectionIdName(sectionName, currentID, variableName));
		});
	});

	return output;
}

var GetRepeatingSectionIdFromId = function (id, repeatingSection) {
	var len = repeatingSection.length + 1;
	return id.substr(len, 20);
}

var update_mod = function (attr) {
	getAttrs([attr], function (v) {
		var finalattr = v[attr] && isNaN(v[attr]) === false ? Math.floor((parseInt(v[attr], 10) - 10) / 2) : 0;
		var update = {};
		update[attr + "_mod"] = finalattr;
		setAttrs(update);
	});
};

var GetTraitsDictionary = function (traits) {

	var splits = traits.split(",");

	var output = [];
	var count = 6;
	for (var i = 0; i < splits.length; i++) {

		var traitInfo = GetTraitInfo(splits[i].trim());
		if (traitInfo.name != "") {
			output.push(traitInfo);
			count--;
			if (count <= 0) {
				break;
			}
		}
	}

	return output;
}

var GetProfRankBonus = function (rank, isSub, pb) {

	// make sure these are integers
	rank = isNaN(parseInt(rank)) ? 0 : parseInt(rank);
	pb = isNaN(parseInt(pb)) ? 0 : parseInt(pb);

	switch (rank) {
		case 0:
			return 0;
		case 1:
			return isSub ? 1 : 1 + pb;
		case 2:
			return isSub ? 2 : 3 + pb;
		case 3:
			return isSub ? 3 : 4 + pb;
		case 4:
			return isSub ? 4 : 6 + pb;
		case 5:
			return isSub ? 5 : 7 + pb;
		case 6:
			return isSub ? 6 : 9 + pb;
	}

	return 0;
}

var GetBranchProficiencyTypes = function() {
	return ["plantation", "toxin", "health", "wind", "mana", "corrosion", "flame", "glass", "light", "soul", "smoke", "radiation", "rock", "sand", "power", "gravity", "shadow", "tremor", "forge", "nimbus", "blood", "ether", "reflection", "force", "fluid", "ice", "restoration", "time", "sound", "storm"];
}

var GetWeaponProficiencyTypes = function() {
	return ["blade", "bow", "brawling", "dart", "flail", "hammer", "pistol", "polearm", "rifle"];
}

var GetArmorProficiencyTypes = function() {
	return ["unarmored", "light", "medium", "heavy"];
}

var GetSkillProficiencyTypes = function() {
	return ["acrobatics", "arcana", "athletics", "deception", "health", "insight", "intimidation", "investigation", "nature", "perception", "performance", "persuasion", "stealth", "survival", "thievery", "alchemy", "artistry", "brewing", "carving", "cooking", "leatherworking", "molding", "smithing", "tinkering", "weaving", "disabledevice", "disguise", "gathering", "medicine", "pilot"];
}

var GetSkillSpecializationTypes = function() {
	return ["balance", "escapeartist", "squeeze", "tumble", "identifymagic", "restorebarrier", "climb", "breakfree", "grapple", "highjump", "longjump", "shove", "swim", "createadiversion", "impersonate", "lie", "identifyillness", "stabilize", "discernsecret", "sensemotive", "coerce", "demoralize", "analyze", "appraise", "seek", "assesscreature", "commandanimal", "perceivebarrier", "sensepresence", "act", "comedy", "dance", "oratory", "playinstrument", "sing", "gatherinformation", "influence", "requestfavor", "concealanobject", "hide", "sneak", "navigate", "track", "palm", "steal",
	"balm", "inhalent", "injection", "tablet", "painting", "penmanship", "sketching", "blending", "fermenting", "roasting", "steeping", "chiselling", "cutting", "shapeice", "shapeplants", "baking", "grilling", "mixing", "simmering", "steaming", "stewing", "stitching", "tanning", "glassblowing", "sculpting", "shapeearth", "shapeglass", "forging", "shapemetal", "engineering", "goldsmithing", "fabriccraft", "sewing",
	"openlock", "sabotage", "guise", "farm", "fish", "forage", "mining", "coatpoison", "dose", "firstaid", "releasepoison", "pilotaircraft", "pilotgroundcraft", "pilotseacraft"
	];
}

var PrefixAttributeArray = function(prefix, attrArray) {
	for (let i = 0; i < attrArray.length; i++) {
		attrArray[i] = prefix + attrArray[i];
	}
	return attrArray;
}

var GetActionData = function () {
	return {
		name: "",
		targetStyle: 0,
		actionCost: "None",
		traits: "",

		// checks {{check=1}}
		checkName: "",
		checkRoll: false,
		checkMod: "",
		checkDef: "",

		// damage {{damage=1}}
		dmg1flag: false,
		dmg1: "",
		hldmg: "",
		dmgtype1: "",
		elem1: "",
		crit1: "",
		hldmgcrit: "",

		dmg2flag: false,
		dmg2: "",
		dmgtype2: "",
		elem2: "",
		crit2: "",

		// conditionals {{conditionals=1}}
		range: "",
		area: "",
		targets: "",
		trigger: "",
		req: "",
		duration: "",

		description: "",

		// results {{results=1}}
		critsuccess: "",
		success: "",
		failure: "",
		critfailure: "",

		// resources
		onCritSuccess: "",
		onSuccess: "",
		onFailure: "",
		onCritFailure: "",
		mana: 0,
		baseLvl: 0,
		castLvl: 0,
		ammo: "",
		resource: "",
		consumable: "",

		toRoll: function (characterName) {

			// Rolls assume that the template call will be input for them. This is to help with interactions with chat as template code works differently when generated from a roll button
			var output = `action} {{charname=${characterName}}} {{username=@{${characterName}|nickname}}} {{image=@{${characterName}|emote_activesetimageurl}}}`;

			// add target data
			switch (this.targetStyle) {
				case "0":
					break;
				case "Self":
					output += ` {{hastarget=2}} {{tokenName=${characterName}}} `;
					break;
				case "Field":
					output += ` {{hastarget=1}} {{tokenName=${characterName}}} `;
					break;
				case "Token":
					output += ` {{hastarget=1}} {{tokenId=@{target||token_id}}} {{tokenName=@{target||token_name}}}`;
					break;
			}

			// set name
			output += ` {{rname=${this.name}}}`;

			// set action cost
			switch (this.actionCost) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "R":
					output += ` {{action${this.actionCost}=1}}`;
					break;
				default:
					output += ` {{action=${this.actionCost}}}`;
					break;
			}

			// add traits
			output += ` {{traits=${this.traits}}}`;
			traitsDb = GetTraitsDictionary(this.traits);
			for (var i = 0; i < traitsDb.length; i++) {
				output += ` {{trait${i}=${traitsDb[i].name}}} {{trait${i}Desc=${traitsDb[i].desc}}}`;
			}

			// add checks
			if (this.checkName != "") {
				output += ` {{check=${this.checkName}}}`;
				output += ` {{checkDef=${this.checkDef}}}`;
				output += this.checkRoll ? " {{checkRoll=1}}" : "";
				output += ` {{r1=[[${(this.checkRoll ? "1d20" : "0d20") + (this.checkMod != "" ? " + " + this.checkMod : "")}]]}}`;
				output += ` {{r2=[[${(this.checkRoll ? "1d20" : "0d20") + (this.checkMod != "" ? " + " + this.checkMod : "")}]]}}`;
			}

			// add damage rolls
			if (this.dmg1flag || this.dmg2flag) {
				output += ` {{damage=1}}`;

				if (this.dmg1flag) {
					output += ` {{dmg1flag=1}}`;
					output += this.dmg1 != "" ? ` {{dmg1=[[${this.dmg1}]]}}` : "";
					output += this.hldmg != "" ? ` {{hldmg=[[${this.hldmg}]]}}` : "";
					output += this.crit1 != "" ? ` {{crit1=[[${this.crit1}]]}}` : "";
					output += this.hldmgcrit != "" ? ` {{hldmgcrit=[[${this.hldmgcrit}]]}}` : "";
					output += ` {{dmgtype1=${this.dmgtype1}}}`;
					output += ` {{elem1=${this.elem1}}}`;
				}
				if (this.dmg2flag) {
					output += ` {{dmg2flag=1}}`;
					output += this.dmg2 != "" ? ` {{dmg2=[[${this.dmg2}]]}}` : "";
					output += this.crit2 != "" ? ` {{crit2=[[${this.crit2}]]}}` : "";
					output += ` {{dmgtype2=${this.dmgtype2}}}`;
					output += ` {{elem2=${this.elem2}}}`;
				}
			}

			// add conditionals
			if (this.range != "" || this.area != "" || this.targets != "" || this.trigger != "" || this.req != "" || this.duration != "") {
				output += ` {{conditionals=1}}`;
				output += this.range != "" && this.range != undefined ? ` {{range=${this.range}}}` : "";
				output += this.area != "" && this.area != undefined ? ` {{area=${this.area}}}` : "";
				output += this.targets != "" && this.targets != undefined ? ` {{targets=${this.targets}}}` : "";
				output += this.trigger != "" && this.trigger != undefined ? ` {{trigger=${this.trigger}}}` : "";
				output += this.req != "" && this.req != undefined ? ` {{req=${this.req}}}` : "";
				output += this.duration != "" && this.duration != undefined ? ` {{duration=${this.duration}}}` : "";
			}

			// add description
			output += this.description != "" ? ` {{description=${this.description}}}` : "";

			// add results
			if (this.critsuccess != "" || this.success != "" || this.failure != "" || this.critfailure != "") {
				output += ` {{results=1}}`;
				output += this.critsuccess != "" ? ` {{critsuccess=${this.critsuccess}}}` : "";
				output += this.success != "" ? ` {{success=${this.success}}}` : "";
				output += this.failure != "" ? ` {{failure=${this.failure}}}` : "";
				output += this.critfailure != "" ? ` {{critfailure=${this.critfailure}}}` : "";
			}

			// add special conditions. These are single bracketted because they shouldn't be read by rolltemplates
			output += this.onCritSuccess != "" ? ` {{oncritsuccess=${this.onCritSuccess}}}` : "";
			output += this.onSuccess != "" ? ` {{onsuccess=${this.onSuccess}}}` : "";
			output += this.onFailure != "" ? ` {{onfailure=${this.onFailure}}}` : "";
			output += this.onCritFailure != "" ? ` {{oncritfailure=${this.onCritFailure}}}` : "";
			output += this.mana != 0 ? ` {{mana=${this.mana}}}` : "";
			output += this.baseLvl != 0 ? ` {{baselevel=${this.baseLvl}}}` : "";
			output += this.castLvl != 0 ? ` {{castlevel=${this.castLvl}}}` : "";
			output += this.ammo != "" ? ` {{ammo=${this.ammo}}}` : "";
			output += this.resource != "" ? ` {{resource=${this.resource}}}` : "";
			output += this.consumable != "" ? ` {{consumable=${this.consumable}}}` : "";

			return output;
		}
	};
}

function BranchHasProf(branch) {

	if (branch == undefined) {
		return false;
	}

	switch (branch.toLowerCase()) {
		case "plantation":
		case "toxin":
		case "health":
		case "wind":
		case "mana":
		case "corrosion":
		case "flame":
		case "glass":
		case "light":
		case "soul":
		case "smoke":
		case "radiation":
		case "rock":
		case "sand":
		case "power":
		case "gravity":
		case "shadow":
		case "tremor":
		case "forge":
		case "nimbus":
		case "blood":
		case "ether":
		case "reflection":
		case "force":
		case "fluid":
		case "ice":
		case "restoration":
		case "time":
		case "sound":
		case "storm":
			return true;
		default:
			return false;
	}
}

function ConvertSkillToValue(skill) {
	return skill.toLowerCase().replaceAll(" ", "").replaceAll(",", "").replaceAll("'", "").replaceAll(":", "");
}


// Main

var update_nickname = function (newName) {
	console.log("CHANGING NICKNAME TO " + newName);
	var update = {};
	var name = newName.split(" ")[0];
	update["nickname"] = name;
	setAttrs(update, {
		silent: true
	});
}





// Core: Base Statistics

var update_character_rollstyle = function (rollStyle) {
	console.log("UPDATING ROLL STYLE TO " + rollStyle);

	if (rollStyle == "0") {
		return;
	}

	var mod_attrs = ["characterType"];
	getAttrs(mod_attrs, function (v) {
		let update = {};

		switch(v["characterType"]) {
			case "0":
				switch(rollStyle) {
					case "Common":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats.
						
						Humans roll 3d6 and get the total for each value.`;
					break;
					case "Heroic":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats. You may also click on the individual values to reroll them specifically. Heroic characters have a maximum number of five rerolls available to them.
						
						Heroic humans roll 4d6, drop the lowest die, then total the rest for each value.`;
					break;
				}
			break;
			case "Spirit":
				switch(rollStyle) {
					case "Common":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats.
						
						Spirits roll 2d6 and get the total for each value.`;
					break;
					case "Heroic":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats. You may also click on the individual values to reroll them specifically. Heroic characters have a maximum number of five rerolls available to them.
						
						Heroic spirits roll 3d6, drop the lowest die, then total the rest for each value.`;
					break;
				}
			break;
			case "Beast":
				switch(rollStyle) {
					case "Common":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats.
						
						Beasts roll 2d6 and get the total for each value.`;
					break;
					case "Heroic":
						update["rollStyleDescription"] = `Click Roll All to get a set of new stats. You may also click on the individual values to reroll them specifically. Heroic characters have a maximum number of five rerolls available to them.
						
						Heroic beasts roll 3d6, drop the lowest die, then total the rest for each value.`;
					break;
				}
			break;
		}

		setAttrs(update, {silent: true});
	});

}

var update_character_roll_all = function () {
	console.log("ROLLING ALL ABILITY SCORES");

	var mod_attrs = ["characterType", "abilityScoreRollStyle", "abilityScoreRollRerolls"];
	getAttrs(mod_attrs, function (v) {
		let update = {};
		let rolls = [];
		let rollStyle = v["abilityScoreRollStyle"];
		let rerolls = isNaN(parseInt(v["abilityScoreRollRerolls"])) ? 0 : parseInt(v["abilityScoreRollRerolls"]);

		switch(v["characterType"]) {
			case "0":
				switch(rollStyle) {
					case "Common":
						for (let i = 0; i < 6; i++) {
							rolls.push(total_rolls(roll_multiple_dice(3, 6)));
						}
					break;
					case "Heroic":
						if (rerolls < 5) {
							for (let i = 0; i < 6; i++) {
								rolls.push(total_rolls(roll_multiple_dice_drop_lowest(4, 6)));
							}
						}
					break;
				}
			break;
			case "Spirit":
				switch(rollStyle) {
					case "Common":
						for (let i = 0; i < 3; i++) {
							rolls.push(total_rolls(roll_multiple_dice(2, 6)));
						}
					break;
					case "Heroic":
						if (rerolls < 5) {
							for (let i = 0; i < 3; i++) {
								rolls.push(total_rolls(roll_multiple_dice_drop_lowest(3, 6)));
							}
						}
					break;
				}
			break;
			case "Beast":
				switch(rollStyle) {
					case "Common":
						for (let i = 0; i < 6; i++) {
							rolls.push(total_rolls(roll_multiple_dice(2, 6)));
						}
					break;
					case "Heroic":
						if (rerolls < 5) {
							for (let i = 0; i < 6; i++) {
								rolls.push(total_rolls(roll_multiple_dice_drop_lowest(3, 6)));
							}
						}
					break;
				}
			break;
		}

		// push the rolls
		if (rolls.length > 0) {
			rerolls++;
			update["abilityScoreRollRerolls"] = rerolls;

			for (let i = 0; i < rolls.length; i++) {
				update[`abilityScoreRollDie${(i + 1)}`] = rolls[i];
			}

			setAttrs(update, {silent: true});
		}
	});

}

var update_character_roll_individual = function (dieIndex) {
	console.log("ROLLING ABILITY SCORES ROLL " + dieIndex);

	var mod_attrs = ["characterType", "abilityScoreRollStyle", "abilityScoreRollRerolls"];
	getAttrs(mod_attrs, function (v) {
		let update = {};
		let roll = 0;
		let rollStyle = v["abilityScoreRollStyle"];
		let rerolls = isNaN(parseInt(v["abilityScoreRollRerolls"])) ? 0 : parseInt(v["abilityScoreRollRerolls"]);

		if (rollStyle == "Heroic" && rerolls < 5) {
			if(v["characterType"] == "0") {
				roll = total_rolls(roll_multiple_dice_drop_lowest(4, 6));
			}
			else {
				roll = total_rolls(roll_multiple_dice_drop_lowest(3, 6));
			}

			// push the rolls
			rerolls++;
			update["abilityScoreRollRerolls"] = rerolls;
			update[`abilityScoreRollDie${dieIndex}`] = roll;

			setAttrs(update, {silent: true});
		}
	});


}

var total_rolls = function(rolls) {
	var result = 0;
	for (let i = 0; i < rolls.length; i++) {
		result += rolls[i];
	}
    return result; 
}

var roll_multiple_dice_drop_lowest = function(quantity, dieType) {

    let rolls = roll_multiple_dice(quantity, dieType);

    // sort the dice
    rolls.sort();
    rolls.reverse();

	let returnedRolls = [];
	let total = quantity - 1;
	for (let i = 0; i < total; i++) {
		returnedRolls.push(rolls[i]);
	}
    return returnedRolls;
}

var roll_multiple_dice = function(quantity, dieType) {

    let rolls = [];

    // get 3 dice
    var k = 0;
    var outputString = "";
    for (k = 0; k < quantity; k++) {
        rolls[k] = Math.ceil(Math.random() * dieType);
        outputString += " + " + rolls[k];
    }

    return rolls;
}

var update_character_ethnicity = function (ethnicity) {
	console.log("UPDATING ETHNITIY TO " + ethnicity);
	let update = {};
	
	let ethnicityInfo = GetHumanEthnicityInfo(ethnicity);
	if (ethnicityInfo.name != "") {
		update["ancestryDescription"] = ethnicityInfo.desc;
	}
	update["characterAncestry-abilityScores"] = ethnicity;
	update["characterAncestry-skill"] = ethnicity;
	update["characterAncestry-feat"] = ethnicity;
	setAttrs(update);

	getAttrs(["skin"], function (v) {
		let specupdate = {};
		if (v["skin"] == undefined || v["skin"] == "") {
			specupdate["skin"] = ethnicity;
		}
		setAttrs(specupdate);
	});
}

var update_character_ethnicity_abilityScores = function (ethnicity) {
	console.log("UPDATING ETHNITIY Ability Score Bonus TO " + ethnicity);
	let update = {};
	
	let ethnicityInfo = GetHumanEthnicityInfo(ethnicity);
	if (ethnicityInfo.name != "") {
		update["ancestryAbilityScoreBonus"] = ethnicityInfo.score;
	}

	setAttrs(update);
}

var update_character_ethnicity_skills = function (ethnicity) {
	console.log("UPDATING ETHNITIY Skill TO " + ethnicity);
	let update = {};
	
	let ethnicityInfo = GetHumanEthnicityInfo(ethnicity);
	if (ethnicityInfo.name != "") {
		update["ethnicitySkillBonus"] = ethnicityInfo.skill;
		update["setSkills-Ancestry"] = "Ancestry\n" + ethnicityInfo.skill;
		update["skillAncestryBonus"] = ethnicityInfo.skillPoints;
	}

	setAttrs(update);
}

var update_character_ethnicity_feats = function (ethnicity) {
	console.log("UPDATING ETHNITIY feat TO " + ethnicity);
	let update = {};
	
	let ethnicityInfo = GetHumanEthnicityInfo(ethnicity);
	if (ethnicityInfo.name != "") {
		update["ancestryFeatBonus"] = ethnicityInfo.feat;
		update["ancestryFeatName"] = ethnicityInfo.featName;
		update["ancestryFeatButton"] = "0";
	}

	setAttrs(update);
}

var update_character_feat_list_add_feature = function (sourceAttr) {
	console.log("ADDING FEATURE FROM " + sourceAttr);
	let featId = "featlist-" + sourceAttr.substring(sourceAttr.indexOf("-") + 1);
	update_character_base_add_feature(featId);
}

var update_character_base_add_feature = function (featureSource) {

	var mod_attrs = [featureSource];
	getAttrs(mod_attrs, function (v) {
		var featureName = v[featureSource];

		if (featureName != undefined) {
			console.log("ADDING FEATURE: " + featureName);
			var newrowid = generateRowID();
			update_feature_from_database(featureName, [newrowid], true);
		}
	});
}

var update_character_feat_types_from_list_checked = function (sourceAttr, newValue) {
	console.log("ADDING FEATURE FROM " + sourceAttr);
	let featTypes = sourceAttr.split("-");
	let featType = featTypes[featTypes.length - 1].toLowerCase();
	let featTypeId = "";

	switch(featType) {
		case "general": featTypeId = "GeneralFeats"; break;
		case "combat": featTypeId = "CombatFeats"; break;
		case "skill": featTypeId = "SkillFeats"; break;
		case "spell": featTypeId = "SpellFeats"; break;
		case "archetype": featTypeId = "ArchetypeFeats"; break;
		case "spirit": featTypeId = "SpiritFeats"; break;
		case "beast": featTypeId = "BeastFeats"; break;
		case "ascension": featTypeId = "AscensionFeats"; break;
	}

	if (featTypeId != "") {
		let mod_attrs = [featTypeId];
		getAttrs(mod_attrs, function (v) {
			let featCount = isNaN(parseInt(v[featTypeId])) ? 0 : parseInt(v[featTypeId]);

			if (newValue == "on") {
				featCount++;
			}
			else {
				featCount--;
			}
			if (featCount < 0) {
				featCount = 0;
			}

			let update = {};
			update[featTypeId] = featCount;
			setAttrs(update);
		});
	}
}

var update_character_feat_types_from_list_number = function (sourceAttr, oldValue, newValue) {
	console.log("ADDING FEATURE FROM " + sourceAttr);
	let featTypes = sourceAttr.split("-");
	let featType = featTypes[featTypes.length - 1].toLowerCase();
	let featTypeId = "";

	switch(featType) {
		case "general": featTypeId = "GeneralFeats"; break;
		case "combat": featTypeId = "CombatFeats"; break;
		case "skill": featTypeId = "SkillFeats"; break;
		case "spell": featTypeId = "SpellFeats"; break;
		case "archetype": featTypeId = "ArchetypeFeats"; break;
		case "spirit": featTypeId = "SpiritFeats"; break;
		case "beast": featTypeId = "BeastFeats"; break;
		case "ascension": featTypeId = "AscensionFeats"; break;
	}

	if (featTypeId != "") {
		let mod_attrs = [featTypeId];
		getAttrs(mod_attrs, function (v) {
			let featCount = isNaN(parseInt(v[featTypeId])) ? 0 : parseInt(v[featTypeId]);
			oldValue = isNaN(parseInt(oldValue)) ? 0 : parseInt(oldValue);
			newValue = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue);
			if (oldValue == newValue) {
				oldValue = 0;
			}
			console.log ("oldValue: " + oldValue + " newValue: " + newValue);
			let diff = newValue - oldValue;
			featCount += diff;

			if (featCount < 0) {
				featCount = 0;
			}

			let update = {};
			update[featTypeId] = featCount;
			setAttrs(update);
		});
	}
}

var update_character_background = function (background) {
	console.log("UPDATING BACKGROUND TO " + background);
	
	let update = {};

	let backgroundInfo = GetBackgroundInfo(background);
	if (backgroundInfo.name != "") {
		update["characterbackgroundIsInDb"] = "1";
		update["backgroundFeatButton"] = "0";
		update["backgroundDescription"] = backgroundInfo.desc;
		update["backgroundSkills"] = backgroundInfo.skill;
		update["setSkills-Background"] = "Background\n" + backgroundInfo.skill;
		update["skillBackgroundBonus"] = backgroundInfo.skillPoints;
		update["backgroundGear"] = backgroundInfo.gear;
		update["backgroundLifestyle"] = backgroundInfo.lifestyle;
		update["backgroundFeatName"] = backgroundInfo.featName;
		update["backgroundFeatDesc"] = backgroundInfo.featDesc;
	}
	else {
		update["characterbackgroundIsInDb"] = "0";
	}
	setAttrs(update);
}

var update_starting_caster_bonuses = function () {

	console.log("UPDATING STARTING CASTER BONUSES");

	var mod_attrs = ["spellcasting_ability", "intelligence_mod", "wisdom_mod", "charisma_mod"];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		// determine spell slots
		let firstSpells = 3 + (parseInt(v["intelligence_mod"]) > 0 ? parseInt(v["intelligence_mod"]) : 0);
		update["characterSetupSpellCount"] = "You learn " + firstSpells + " spells.";

		let otherBonuses = "";
		let firstSlots = 3 + (parseInt(v["wisdom_mod"]) > 0 ? parseInt(v["wisdom_mod"]) * 2 : 0);
		otherBonuses += "You gain " + firstSlots + " spell slots.\n";
		let firstKi = 50 + (parseInt(v["charisma_mod"]) > 0 ? (parseInt(v["charisma_mod"]) * 50) : 0);
		otherBonuses += "You gain " + firstKi + " ki.\n";
		let firstSurge = 30 + (parseInt(v["intelligence_mod"]) > 0 ? (parseInt(v["intelligence_mod"]) * 30) : 0);
		otherBonuses += "You gain " + firstSurge + " surge value.\n";
		if (v["spellcasting_ability"] == "wisdom") {
			otherBonuses += "You gain 50 ether.\n";
		}

		// update the first caster level
		update["characterSetupCasterStats"] = otherBonuses;

		setAttrs(update, {silent: true});
	});
}

var update_character_branches_add_spell = function (sourceAttr) {
	console.log("ADDING SPELL FROM " + sourceAttr);
	let spellId = "spelllist-" + sourceAttr.substring(sourceAttr.indexOf("-") + 1);
	getAttrs([spellId], function (v) {
		update_character_base_add_spell(v[spellId]);
	});
}

var update_character_base_add_spell = function (spellName) {
	console.log("ADDING SPELL: " + spellName);

	var newrowid = generateRowID();
	update_spell_from_database(spellName, newrowid, true);
}

var update_classLevels_simple = function () {
	var mod_attrs = ["class", "constitution_mod", "spellcasting_ability", "intelligence_mod", "wisdom_mod", "charisma_mod",
	"simpleLevelArchetypeType", "simpleLevelArchetypesLevel", "simpleLevelArchetypeHpBonus", "simpleLevelArchetypeBrBonus", "simpleLevelArchetypeSpBonus",
	"simpleLevelArchetypeSpellforcePoints", "simpleLevelArchetypeAffinityControlPoints", "simpleLevelArchetypeWillpowerPoints", "simpleLevelArchetypeKiCapacityPoints"];

	getAttrs(mod_attrs, function (v) {
		console.log("UPDATING CLASS LEVELS - SIMPLIFIED");
		var update = {};

		// grab class and archetype data
		let classData = GetClassInfo(v["class"]);
		let archetypeData = GetClassInfo(v["simpleLevelArchetypeType"]);

		// set proficiencies
		let saves = classData.saves.split(",");
		for (let i = 0; i < saves.length; i++) {
			saves[i] = saves[i].trim().toLowerCase();
		}
		let spellProf = GetSpellProficiencyGrowth(classData.spell);
		let spiritProf = GetSpiritProficiencyGrowth(classData.spirit);
		let weaponProf = GetWeaponProficiencyGrowth(classData.weapon, classData.type);
		let armorProf = GetArmorProficiencyGrowth(classData.armor, classData.type);
		let skillProf = GetSkillsProficiencyGrowth(classData.skill);
		archetypeData.spellProf = GetSpellProficiencyGrowth(archetypeData.spell);
		archetypeData.spiritProf = GetSpellProficiencyGrowth(archetypeData.spirit);
		archetypeData.weaponProf = GetWeaponProficiencyGrowth(archetypeData.weapon, archetypeData.type);
		archetypeData.armorProf = GetArmorProficiencyGrowth(archetypeData.armor, archetypeData.type);
		archetypeData.skillProf = GetSkillsProficiencyGrowth(archetypeData.skill);

		let levelHp = 0;
		let levelBr = 0;
		let levelSp = 0;
		let archHp = 0;
		let archBr = 0;
		let archSp = 0;
		let levelHpMod = 0;
		let levelBrMod = 0;
		let levelSpMod = 0;
		let hpString = "";
		let brString = "";
		let spString = "";
		let usesSp = classData.type == "Spirit" || classData.type == "Beast";

		let levelGrowth = {
			strSave: 0,
			strSaveSource: "",
			dexSave: 0,
			dexSaveSource: "",
			conSave: 0,
			conSaveSource: "",
			intSave: 0,
			intSaveSource: "",
			wisSave: 0,
			wisSaveSource: "",
			chaSave: 0,
			chaSaveSource: "",

			spellEff: 0,
			spellEffSource: "",
			spiritEff: 0,
			spiritEffSource: "",

			weaponBlades: 0,
			weaponPistol: 0,
			weaponAll: 0,
			weaponProf: "",
			weaponTier: 0,
			startingWeapons: "",
			classweaponPoints: 0,
			archweaponPoints: 0,
			unarmored: 0,
			light: 0,
			medium: 0,
			heavy: 0,
			armorProf: "",
			armorTier: 0,
			startingArmor: "",
			classarmorPoints: 0,
			archarmorPoints: 0,
			skillProf: "",
			startingSkills: "",
			skillTier: 0,
			classskillPts: 0,
			archskillPts: 0,
			knowledgeProf: "",
			perceiveBarrier: 0,

			features: [],
			feats: []
		};

		var levelCp = 0;

		var totalLevel = isNaN(parseInt(v["simpleLevelArchetypesLevel"])) ? 1 : parseInt(v["simpleLevelArchetypesLevel"]);
		var totalHP = 0;
		var totalBr = 0;
		var totalSp = 0;

		// grab user data
		levelHpMod = isNaN(parseInt(v["simpleLevelArchetypeHpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeHpBonus"]);
		levelBrMod = isNaN(parseInt(v["simpleLevelArchetypeBrBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeBrBonus"]);
		levelSpMod = isNaN(parseInt(v["simpleLevelArchetypeSpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeSpBonus"]);

		for (var i = 1; i <= totalLevel; i++) {

			// add class data
			if (classData.name != "") {

				// set HP
				levelHp += GetHealthByLevel(classData.hp, classData.type);

				// set Barrier
				levelBr += GetBarrierByLevel(classData.br);

				// set Sp
				if (usesSp) {
					levelSp += GetSpiritPointsByLevel(classData.sp);
				}

				// set CP
				levelCp += GetCasterPointsByLevel(classData.cp, i);

				// get proficiencies
				levelGrowth = do_update_classLevels_complex_proficiencies(levelGrowth, v, classData.name, i, i == 1, classData.type, classData.subtype, saves, spellProf, spiritProf, weaponProf, armorProf, skillProf, classData.feats, classData.features);
			}

			// add archetype data
			if (archetypeData.name != "") {
				// set HP
				archHp += GetHealthByLevel(archetypeData.hp, "Archetype");
	
				// set Barrier
				archBr += GetBarrierByLevel(archetypeData.br);
	
				// set Sp
				if (usesSp) {
					archSp += GetSpiritPointsByLevel(archetypeData.sp);
				}

				// set CP
				levelCp += GetCasterPointsByLevel(archetypeData.cp, i);

				// get proficiencies
				levelGrowth = do_update_classLevels_complex_proficiencies(levelGrowth, v, archetypeData.name, i, false, archetypeData.type, "", [], archetypeData.spellProf, archetypeData.spiritProf, archetypeData.weaponProf, archetypeData.armorProf, archetypeData.skillProf, archetypeData.feats, archetypeData.features);
			}
		}

		// set level strings
		hpString = levelHp.toString() + "+" + archHp.toString();
		brString = levelBr.toString() + "+" + archBr.toString();
		spString = levelSp.toString() + "+" + archSp.toString();
	
		// add class data
		if (classData.name != "") {
			// set Barrier
			if (classData.type == "Class") {
				brString += "+CON";
			}
			else if (classData.type == "Spirit") {
				brString += "+CHA";
			}
		}

		// total vitals
		totalHP = levelHp + archHp + levelHpMod;
		totalBr = levelBr + archBr + levelBrMod;
		totalSp = levelSp + archSp + levelSpMod;
		
		// set vital data
		update["simpleLevelArchetypeHPLevel"] = hpString;
		update["simpleLevelArchetypeBrLevel"] = brString;
		update["simpleLevelArchetypeSpLevel"] = spString;

		// manage cp
		update["casterPoints_max"] = levelCp;

		// set the save increases
		savesString = "";
		if (levelGrowth.strSaveSource != "") {
			update["strength_save_prof"] = levelGrowth.strSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.strSaveSource}] Setting STR save to ${GetProficiencyRankTitle(levelGrowth.strSave)}.`;
		}
		if (levelGrowth.dexSaveSource != "") {
			update["dexterity_save_prof"] = levelGrowth.dexSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.dexSaveSource}] Setting DEX save to ${GetProficiencyRankTitle(levelGrowth.dexSave)}.`;
		}
		if (levelGrowth.conSaveSource != "") {
			update["constitution_save_prof"] = levelGrowth.conSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.conSaveSource}] Setting CON save to ${GetProficiencyRankTitle(levelGrowth.conSave)}.`;
		}
		if (levelGrowth.intSaveSource != "") {
			update["intelligence_save_prof"] = levelGrowth.intSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.intSaveSource}] Setting INT save to ${GetProficiencyRankTitle(levelGrowth.intSave)}.`;
		}
		if (levelGrowth.wisSaveSource != "") {
			update["wisdom_save_prof"] = levelGrowth.wisSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.wisSaveSource}] Setting WIS save to ${GetProficiencyRankTitle(levelGrowth.wisSave)}.`;
		}
		if (levelGrowth.chaSaveSource != "") {
			update["charisma_save_prof"] = levelGrowth.chaSave;
			savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.chaSaveSource}] Setting CHA save to ${GetProficiencyRankTitle(levelGrowth.chaSave)}.`;
		}
		if (savesString != "") {
			update["simpleLevelLevelingSaves"] = savesString;
		}

		// set spell and spirit
		spellcastingString = "";
		if (levelGrowth.spellEffSource != "") {
			update["spell_profrank-effect"] = levelGrowth.spellEff;
			spellcastingString += (spellcastingString != "" ? "\n" : "") + `[${levelGrowth.spellEffSource}] Setting spell effect to ${GetProficiencyRankTitle(levelGrowth.spellEff)}.`;
		}
		if (levelGrowth.spiritEffSource != "") {
			update["spirit_profrank-effect"] = levelGrowth.spiritEff;
			spellcastingString += (spellcastingString != "" ? "\n" : "") + `[${levelGrowth.spiritEffSource}] Setting spirit effect to ${GetProficiencyRankTitle(levelGrowth.spiritEff)}.`;
		}
		if (spellcastingString != "") {
			update["simpleLevelLevelingSpellcasting"] = spellcastingString;
		}

		// these only get set at 1st level
		if (totalLevel == 1) {
			if (levelGrowth.weaponBlades > 0) {
				update["weapon_profrank-blade"] = levelGrowth.weaponBlades;
			}
			if (levelGrowth.weaponPistol > 0) {
				update["weapon_profrank-pistol"] = levelGrowth.weaponPistol;
			}
			if (levelGrowth.weaponAll > 0) {
				update["weapon_profrank-blade"] = levelGrowth.weaponAll;
				update["weapon_profrank-bow"] = levelGrowth.weaponAll;
				update["weapon_profrank-brawling"] = levelGrowth.weaponAll;
				update["weapon_profrank-dart"] = levelGrowth.weaponAll;
				update["weapon_profrank-flail"] = levelGrowth.weaponAll;
				update["weapon_profrank-hammer"] = levelGrowth.weaponAll;
				update["weapon_profrank-pistol"] = levelGrowth.weaponAll;
				update["weapon_profrank-polearm"] = levelGrowth.weaponAll;
				update["weapon_profrank-rifle"] = levelGrowth.weaponAll;
			}
			if (levelGrowth.unarmored > 0) {
				update["armor_profrank-unarmored"] = levelGrowth.unarmored;
			}
			if (levelGrowth.light > 0) {
				update["armor_profrank-light"] = levelGrowth.light;
			}
			if (levelGrowth.medium > 0) {
				update["armor_profrank-medium"] = levelGrowth.medium;
			}
			if (levelGrowth.heavy > 0) {
				update["armor_profrank-heavy"] = levelGrowth.heavy;
			}
			if (levelGrowth.perceiveBarrier > 0) {
				update["skillspecproficiency-perceivebarrier"] = levelGrowth.perceiveBarrier;
			}
		}

		// set the rest of the proficiencies
		if (levelGrowth.weaponProf != "") {
			update["simpleLevelLevelingWeapons"] = levelGrowth.weaponProf;
		}
		if (levelGrowth.armorProf != "") {
			update["simpleLevelLevelingArmor"] = levelGrowth.armorProf;
		}
		if (levelGrowth.skillProf != "") {
			update["simpleLevelLevelingSkills"] = levelGrowth.skillProf;
		}
		if (levelGrowth.knowledgeProf != "") {
			update["simpleLevelLevelingKnowledge"] = levelGrowth.knowledgeProf;
		}
		
		// update proficiency data
		update["setWeaponProf-Class"] = "Class\n" + levelGrowth.startingWeapons;
		update["weaponPointsMaxTier"] = levelGrowth.weaponTier;
		update["weaponProfClassBonus"] = levelGrowth.classweaponPoints;
		update["weaponArchetypeBonus"] = levelGrowth.archweaponPoints;
		update["setArmorProf-Class"] = "Class\n" + levelGrowth.startingArmor;
		update["armorPointsMaxTier"] = levelGrowth.armorTier;
		update["armorProfClassBonus"] = levelGrowth.classarmorPoints;
		update["armorArchetypeBonus"] = levelGrowth.archarmorPoints;
		update["setSkills-Class"] = "Class\n" + levelGrowth.startingSkills;
		update["skillPointsMaxTier"] = levelGrowth.skillTier;
		update["skillClassBonus"] = levelGrowth.classskillPts;
		update["skillArchetypeBonus"] = levelGrowth.archskillPts;

		let featListSplit = [];
		let featListType = "";
		let featListLevelArray = [];
		let featTypeId = "";
		let featLevelCount = 0;
		let featLevelString = "";
		let featLevel = 0;
		for (let i = 0; i < classData.featList.length; i++) {
			if (classData.featList[i] == "" || classData.featList[i] == undefined) {
				continue;
			}

			featListSplit = classData.featList[i].split("-");
			featListType = featListSplit[0].toLowerCase().trim();
			featListLevelArray = featListSplit[1];
			featListLevelArray = featListLevelArray.split(",");
		
			switch(featListType) {
				case "general": featTypeId = "GeneralFeat"; break;
				case "combat": featTypeId = "CombatFeat"; break;
				case "skill": featTypeId = "SkillFeat"; break;
				case "spell": featTypeId = "SpellFeat"; break;
				case "archetype": featTypeId = "ArchetypeFeat"; break;
				case "spirit": featTypeId = "SpiritFeat"; break;
				case "beast": featTypeId = "BeastFeat"; break;
				case "ascension": featTypeId = "AscensionFeat"; break;
			}

			featLevelCount = 0;
			featLevelString = "";
			for (let j = 0; j < featListLevelArray.length; j++) {
				featLevel = parseInt(featListLevelArray[j].trim());
				if (featLevel <= totalLevel) {
					featLevelCount++;
					featLevelString += featListLevelArray[j] + ", ";
				}
				else {
					break;
				}
			}

			update[featTypeId + "s_max"] = featLevelCount;
		}

		setAttrs(update, {
			silent: true
		}, function () {
			update_weapon_proficiency_points();
			update_armor_proficiency_points();
			update_skill_proficiency_points();
		});

	});
}

var update_classLevels_simple_push = function () {
	let repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		console.log("UPDATING SIMPLIFIED CLASS LEVELS");

		// start by deleting each of the existing levels in the array
		_.each(idarray, function (id) {
			removeRepeatingRow(repeatingArchetypes + "_" + id);
		});

		// grab the simplified levels
		var mod_attrs = ["class", "constitution_mod", "spellcasting_ability", "intelligence_mod", "wisdom_mod", "charisma_mod",
		"simpleLevelArchetypeType", "simpleLevelArchetypesLevel", "simpleLevelArchetypeHpBonus", "simpleLevelArchetypeBrBonus", "simpleLevelArchetypeSpBonus",
		"simpleLevelArchetypeSpellforcePoints", "simpleLevelArchetypeAffinityControlPoints", "simpleLevelArchetypeWillpowerPoints", "simpleLevelArchetypeKiCapacityPoints"];
		getAttrs(mod_attrs, function (v) {

			// variables
			let classData = GetClassInfo(v["class"]);
			let archetype = v["simpleLevelArchetypeType"];
			let archetypeData = GetClassInfo(archetype);
			let totalLevel = isNaN(parseInt(v["simpleLevelArchetypesLevel"])) ? 1 : parseInt(v["simpleLevelArchetypesLevel"]);

			let hpBonus = getSimpleLevelVitalStat();
			hpBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeHpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeHpBonus"]);
			hpBonus.avgPoints = Math.ceil(hpBonus.totalPoints / totalLevel);
			let brBonus = getSimpleLevelVitalStat();
			brBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeBrBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeBrBonus"]);
			hpBonus.avgPoints = Math.ceil(brBonus.totalPoints / totalLevel);
			let spBonus = getSimpleLevelVitalStat();
			spBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeSpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeSpBonus"]);
			spBonus.avgPoints = Math.ceil(spBonus.totalPoints / totalLevel);

			let levelCp = 0;
			let spellForceBonus = getSimpleLevelVitalStat();
			spellForceBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeSpellforcePoints"])) ? 0 : parseInt(v["simpleLevelArchetypeSpellforcePoints"]);
			spellForceBonus.avgPoints = Math.ceil(spellForceBonus.totalPoints / totalLevel);
			let affinityBonus = getSimpleLevelVitalStat();
			affinityBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeAffinityControlPoints"])) ? 0 : parseInt(v["simpleLevelArchetypeAffinityControlPoints"]);
			affinityBonus.avgPoints = Math.ceil(affinityBonus.totalPoints / totalLevel);
			let willpowerBonus = getSimpleLevelVitalStat();
			willpowerBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeWillpowerPoints"])) ? 0 : parseInt(v["simpleLevelArchetypeWillpowerPoints"]);
			willpowerBonus.avgPoints = Math.ceil(willpowerBonus.totalPoints / totalLevel);
			let kiCapacityBonus = getSimpleLevelVitalStat();
			kiCapacityBonus.totalPoints = isNaN(parseInt(v["simpleLevelArchetypeKiCapacityPoints"])) ? 0 : parseInt(v["simpleLevelArchetypeKiCapacityPoints"]);
			kiCapacityBonus.avgPoints = Math.ceil(kiCapacityBonus.totalPoints / totalLevel);

			let update = {};
			let newrowid;
			for (let level = 1; level <= totalLevel; level++) {
				newrowid = generateRowID();

				// add archetype and reveal all parts of the level
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeType")] = archetype;
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep1")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep2")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep3")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep4")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep5")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep1Display")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep2Display")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep3Display")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "levelingStep4Display")] = "1";
				update[GetSectionIdName(repeatingArchetypes, newrowid, "options-flag")] = "0";

				// modify vitals bonuses
				hpBonus.spendSimpleLevelVitalsGrowth();
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeHpBonus")] = hpBonus.spent;
				brBonus.spendSimpleLevelVitalsGrowth();
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeBrBonus")] = brBonus.spent;
				spBonus.spendSimpleLevelVitalsGrowth();
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeSpBonus")] = spBonus.spent;

				// calculate total cp for the level
				levelCp = 0;
				if (classData.name != "") {
					levelCp += GetCasterPointsByLevel(classData.cp, level);
				}
				if (archetypeData.name != "") {
					levelCp += GetCasterPointsByLevel(archetypeData.cp, level);
				}

				// modify caster point tracks
				kiCapacityBonus.spendSimpleLevelCasterGrowth(levelCp);
				levelCp = kiCapacityBonus.levelCp;
				willpowerBonus.spendSimpleLevelCasterGrowth(levelCp);
				levelCp = willpowerBonus.levelCp;
				affinityBonus.spendSimpleLevelCasterGrowth(levelCp);
				levelCp = affinityBonus.levelCp;
				spellForceBonus.spendSimpleLevelCasterGrowth(levelCp);
				levelCp = spellForceBonus.levelCp;

				if (levelCp > 0) {
					spellForceBonus.maximizeCasterGrowthSpending(levelCp);
					levelCp = spellForceBonus.levelCp;
					if (levelCp > 0) {
						affinityBonus.maximizeCasterGrowthSpending(levelCp);
						levelCp = affinityBonus.levelCp;
						if (levelCp > 0) {
							willpowerBonus.maximizeCasterGrowthSpending(levelCp);
							levelCp = willpowerBonus.levelCp;
							if (levelCp > 0) {
								kiCapacityBonus.maximizeCasterGrowthSpending(levelCp);
								levelCp = kiCapacityBonus.levelCp;
							}
						}
					}
				}

				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeKiCapacityPoints")] = kiCapacityBonus.spent;
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeWillpowerPoints")] = willpowerBonus.spent;
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeAffinityControlPoints")] = affinityBonus.spent;
				update[GetSectionIdName(repeatingArchetypes, newrowid, "archetypeSpellforcePoints")] = spellForceBonus.spent;
				
			}

			// close the simplify leveling panel
			update["simplifyLeveling"] = "0";
			update["magicSpellforce"] = "1";
			update["magicAffinityControl"] = "1";
			update["magicWillpower"] = "1";
			update["magicKiCapacity"] = "1";

			setAttrs(update, {
				silent: true
			}, function () {
				update_classLevels_complex_all();
			});

		});
	});

}

var getSimpleLevelVitalStat = function () {
	return {
		avgPoints: 0,
		totalPoints: 0,
		spent: 0,
		levelCp: 0,

		spendSimpleLevelVitalsGrowth: function () {

			this.spent = 0;
			if (this.totalPoints > 0) {
				this.spent = this.avgPoints;
				if (this.spent <= this.totalPoints) {
					this.totalPoints -= this.spent;
				}
				else {
					this.spent = this.totalPoints;
					this.totalPoints = 0;
				}
			}
		},

		spendSimpleLevelCasterGrowth: function (cp) {

			this.levelCp = cp;
			this.spent = 0;
			if (this.levelCp > 0 && this.totalPoints > 0) {
				this.spent = this.avgPoints;

				if (this.spent <= this.totalPoints && this.spent <= this.levelCp) {
					this.totalPoints -= this.spent;
					this.levelCp -= this.spent;
				}
				else if (this.spent <= this.levelCp) {
					this.spent = this.totalPoints;
					this.levelCp -= this.spent;
					this.totalPoints = 0;
				}
				else {
					this.spent = this.levelCp;
					this.totalPoints -= this.spent;
					this.levelCp = 0;
				}
			}
		},

		maximizeCasterGrowthSpending: function (cp) {
			if (cp < this.totalPoints) {
				this.spent += cp;
				this.totalPoints -= cp;
				this.levelCp = 0;
			}
			else {
				this.spent += this.totalPoints;
				this.levelCp = cp - this.totalPoints;
				this.totalPoints = 0;
			}
		}
	};
}


// Core: Class Level

var update_class_restrictions = function (newClass) {

	console.log("UPDATING CLASS RESTRICTIONS FOR " + newClass);

	var classInfo = GetClassInfo(newClass);
	if (classInfo.name != "") {
		let update = {};
		update["characterSetupCastTypeRestriction"] = classInfo.castType;
		update["classArchetype"] = classInfo.archetype;

		setAttrs(update, {
			silent: true
		}, function () {
			update_all_classLevels_character_type();
		});
	}
}

var update_classLevels_complex_all = function () {
	console.log("UPDATING CLASS LEVELS - COMPLEX");

	var mod_attrs = ["class", "spellcasting_ability"];
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes,
			["archetypeType", "archetypeHpBonus", "archetypeBrBonus", 
			"archetypeSpellforcePoints", "archetypeAffinityControlPoints", "archetypeWillpowerPoints", "archetypeKiCapacityPoints"]));

		getAttrs(mod_attrs, function (v) {
			let update = {};
			update = do_update_classLevels_complex_growths(update, idarray, v, "", true);
			update = do_update_caster_point_totals(update, idarray, v);
			update = do_update_classLevels_complex_profs_and_feats(update, idarray, v, "", true);

			setAttrs(update, {
				silent: true
			}, function () {
				update_class_spellcasting();
				update_pb();
				finish_update_pb();
				update_all_proficiencies();
				update_weapon_proficiency_points();
				update_armor_proficiency_points();
				update_skill_proficiency_points();
				update_health_barrier();
			});

		});
	});
}

var update_all_classLevels_character_type = function () {
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		if (idarray.length > 0) {
			update_classLevels_character_type(idarray);
		}
	});
}

var update_classLevels_character_type = function (classLevelsArray) {

	var repeatingArchetypes = "repeating_archetypeLevels";

	getAttrs(["classArchetype"], function (v) {
		console.log ("UPDATING CHARACTER TYPE TO " + v["classArchetype"]);
		let update = {};

		_.each(classLevelsArray, function (currentID) {
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingCharacterType")] = v["classArchetype"];
		});

		setAttrs(update, {
			silent: true
		});
	});
}

var update_classLevels_complex_starting_archetype = function(levelId) {
	console.log("UPDATING CLASS LEVELS - STARTING ARCHETYPE");

	var mod_attrs = [];
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes, ["archetypeType"]));

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let priorId = "";
			_.each(idarray, function (currentID) {
				if (currentID == levelId) {
					if (priorId != "") {
						console.log ("found prior level!");
						update[GetSectionIdName(repeatingArchetypes, levelId, "archetypeType")] = v[GetSectionIdName(repeatingArchetypes, priorId, "archetypeType")];
						setAttrs(update, {
							silent: true
						}, function () {
							update_classLevels_complex_profs_and_feats(levelId);
							update_classLevels_complex_growths(levelId);
						});
					}
				}
				else {
					priorId = currentID;
				}
			});
			update_caster_point_totals();

		});
	});

}

// step 2
var update_classLevels_complex_growths = function (levelId) {
	console.log("UPDATING CLASS LEVELS - VITAL GROWTHS");

	let resetAll = false;

	var mod_attrs = ["class"];
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		if (resetAll) {
			mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes,
				["archetypeType", "archetypeHpBonus", "archetypeBrBonus", "archetypeSpBonus"]));
		} else {
			mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes,
				["archetypeType", "archetypeHpTotal", "archetypeBrTotal", "archetypeSpTotal"]));
			mod_attrs.push(GetSectionIdName(repeatingArchetypes, levelId, "archetypeHpBonus"));
			mod_attrs.push(GetSectionIdName(repeatingArchetypes, levelId, "archetypeBrBonus"));
			mod_attrs.push(GetSectionIdName(repeatingArchetypes, levelId, "archetypeSpBonus"));
		}

		getAttrs(mod_attrs, function (v) {
			let update = {};
			update = do_update_classLevels_complex_growths(update, idarray, v, levelId, resetAll);

			setAttrs(update, {
				silent: true
			}, function () {
				update_health_barrier();
			});

		});
	});
}

var do_update_classLevels_complex_growths = function (update, idarray, v, levelId, resetAll) {
	let repeatingArchetypes = "repeating_archetypeLevels";

	var classData = GetClassInfo(v["class"]);
	let archetypes = [];
	let archetypeName = "";

	let levelHp = 0;
	let levelBr = 0;
	let levelSp = 0;
	let archHp = 0;
	let archBr = 0;
	let levelHpMod = 0;
	let levelBrMod = 0;
	let levelSpMod = 0;
	let hpString = "";
	let brString = "";
	let spString = "";

	var totalLevel = 0;
	let totalHP = 0;
	let totalBr = 0;
	let totalSp = 0;

	let usesSp = classData.type == "Spirit" || classData.type == "Beast";

	_.each(idarray, function (currentID) {

		// grab the archetype
		archetypeName = v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeType")];

		// create a new entry for the archetype if it doesn't exist
		if (!(archetypeName in archetypes)) {
			archetypes[archetypeName] = GetClassInfo(archetypeName);
			archetypes[archetypeName].level = 0;
		}

		// set base statistics
		archetypes[archetypeName].level++;
		totalLevel++;

		// set base stats
		if (resetAll || currentID == levelId) {
			levelHp = 0;
			levelBr = 0;
			levelSp = 0;
	
			// add class data
			if (classData.name != "") {
				// set HP
				levelHp += GetHealthByLevel(classData.hp, classData.type);
				hpString = levelHp.toString();

				// set Barrier
				levelBr += GetBarrierByLevel(classData.br);
				brString = levelBr.toString();

				// set Sp
				if (usesSp) {
					let varSP = GetSpiritPointsByLevel(classData.sp, classData.type, totalLevel); 
					levelSp += parseInt(varSP);
					spString = levelSp.toString();
				}
			}
			else {
				hpString = "0";
				brString = "0";
				spString = "0";
			}

			// add archetype data
			if (archetypes[archetypeName].name != "") {
				// set HP
				archHp = GetHealthByLevel(archetypes[archetypeName].hp, "Archetype");
				levelHp += archHp;
				hpString += "+" + archHp.toString();

				// set Barrier
				archBr = GetBarrierByLevel(archetypes[archetypeName].br);
				levelBr += archBr;
				brString += "+" + archBr.toString();

				// set Sp
				if (usesSp) {
					let archSP = GetSpiritPointsByLevel(archetypes[archetypeName].sp, archetypes[archetypeName].classType, archetypes[archetypeName].level);
					console.log("archSp: " + archSP);
					levelSp += archSP;
					spString += "+" + archSP;
				}
			}
	
			// add class data
			if (classData.name != "") {
				// set HP
				if (classData.type == "Class" && totalLevel == 1) {
					hpString += "+CON";
				}

				// set Barrier
				if (classData.type == "Class") {
					brString += "+CON";
				}
				else if (classData.type == "Spirit") {
					brString += "+CHA";
				}
			}
			update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeHPLevel")] = hpString;
			update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeBrLevel")] = brString;

			// grab user data
			levelHpMod = parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeHpBonus")]);
			levelHp += isNaN(levelHpMod) ? 0 : levelHpMod;
			levelBrMod = parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeBrBonus")]);
			levelBr += isNaN(levelBrMod) ? 0 : levelBrMod;

			// update totals
			totalHP += levelHp;
			totalBr += levelBr;
			update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeHpTotal")] = levelHp;
			update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeBrTotal")] = levelBr;

			// update Sp totals
			if (usesSp) {
				update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeUsesSp")] = "1";
				update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeSpLevel")] = spString;
				levelSpMod = parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeSpBonus")]);
				levelSp += isNaN(levelSpMod) ? 0 : levelSpMod;
				totalSp += levelSp;
				update[GetSectionIdName(repeatingArchetypes, currentID, "archetypeSpTotal")] = levelSp;
			}
		}
		else {
			totalHP += isNaN(parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeHpTotal")])) ? 0 : parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeHpTotal")]);
			totalBr += isNaN(parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeBrTotal")])) ? 0 : parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeBrTotal")]);
			totalSp += isNaN(parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeSpTotal")])) ? 0 : parseInt(v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeSpTotal")]);
		}
	});
	
	update["classTotalHpPoints"] = Math.floor(totalHP);
	update["classTotalBrPoints"] = Math.floor(totalBr);
	update["classTotalSpPoints"] = totalSp;

	return update;
}

// step 3
var update_caster_point_totals = function () {
	console.log("UPDATING CLASS LEVELS - CASTER POINTS");

	let resetAll = false;
	if (levelId == undefined) {
		resetAll = true;
	}

	var mod_attrs = ["class", "spellcasting_ability", "intelligence_mod", "wisdom_mod", "charisma_mod", "magicSpellforce", "magicAffinityControl", "magicWillpower", "magicKiCapacity"];
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes, ["archetypeType"]));

		getAttrs(mod_attrs, function (v) {
			let update = {};
			update = do_update_caster_point_totals(update, idarray, v);

			setAttrs(update, {
				silent: true
			}, function () {
				update_class_spellcasting();
			});

		});
	});
}

var do_update_caster_point_totals = function (update, idarray, v) {
	let repeatingArchetypes = "repeating_archetypeLevels";

	var classData = GetClassInfo(v["class"]);
	let archetypes = [];
	let archetypeName = "";

	var levelCp = 0;
	var totalCp = 0;

	var totalLevel = 0;

	_.each(idarray, function (currentID) {

		// grab the archetype
		archetypeName = v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeType")];

		// create a new entry for the archetype if it doesn't exist
		if (!(archetypeName in archetypes)) {
			archetypes[archetypeName] = GetClassInfo(archetypeName);
			archetypes[archetypeName].level = 0;
		}

		// set base statistics
		archetypes[archetypeName].level++;
		totalLevel++;

		// set cp
		levelCp = 0;
	
		// add archetype and class bonuses
		if (classData.name != "") {
			levelCp += GetCasterPointsByLevel(classData.cp, totalLevel);
		}
		if (archetypes[archetypeName].name != "") {
			levelCp += GetCasterPointsByLevel(archetypes[archetypeName].cp, archetypes[archetypeName].level);
		}
		totalCp += levelCp;
	});

	// update caster tracks
	update["casterPoints_max"] = totalCp;

	return update;
}

// step 4 and 5
var update_classLevels_complex_profs_and_feats = function (levelId) {
	console.log("UPDATING CLASS LEVELS - CLASS PROFICIENCIES");

	var mod_attrs = ["class", "intelligence_mod",
		"strength_save_prof", "dexterity_save_prof", "constitution_save_prof", "intelligence_save_prof", "wisdom_save_prof", "charisma_save_prof",
		"spell_profrank-effect", "spirit_profrank-effect", 
		"armor_profrank-unarmored", "armor_profrank-light", "armor_profrank-medium", "armor_profrank-heavy",
		"setWeaponProf-Class", "weaponPointsMaxTier", "weaponProfClassBonus", "weaponArchetypeBonus",
		"setArmorProf-Class", "armorPointsMaxTier", "armorProfClassBonus", "armorArchetypeBonus",
		"setSkillProf-Class", "skillPointsMaxTier", "skillClassBonus", "skillArchetypeBonus"
	];
	var repeatingArchetypes = "repeating_archetypeLevels";

	getSectionIDs(repeatingArchetypes, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingArchetypes, ["archetypeType"]));

		getAttrs(mod_attrs, function (v) {
			let update = {};
			update = do_update_classLevels_complex_profs_and_feats(update, idarray, v, levelId, false);

			setAttrs(update, {
				silent: true
			}, function () {
				update_pb();
				finish_update_pb();
				update_all_proficiencies();
				update_weapon_proficiency_points();
				update_armor_proficiency_points();
				update_skill_proficiency_points();
			});

		});
	});
}

var do_update_classLevels_complex_profs_and_feats = function (update, idarray, v, levelId, resetAll) {
	var repeatingArchetypes = "repeating_archetypeLevels";

	var archetypes = [];
	let archetypeName = "";

	let classData = GetClassInfo(v["class"]);
	let totalLevel = 0;
	let saves = classData.saves.split(",");
	for (let i = 0; i < saves.length; i++) {
		saves[i] = saves[i].trim().toLowerCase();
	}
	let spellProf = GetSpellProficiencyGrowth(classData.spell);
	let spiritProf = GetSpiritProficiencyGrowth(classData.spirit);
	let weaponProf = GetWeaponProficiencyGrowth(classData.weapon, classData.type);
	let armorProf = GetArmorProficiencyGrowth(classData.armor, classData.type);
	let skillProf = GetSkillsProficiencyGrowth(classData.skill);

	let levelGrowth = {
		strSave: isNaN(parseInt(v["strength_save_prof"])) ? 0 : parseInt(v["strength_save_prof"]),
		strSaveSource: "",
		dexSave: isNaN(parseInt(v["dexterity_save_prof"])) ? 0 : parseInt(v["dexterity_save_prof"]),
		dexSaveSource: "",
		conSave: isNaN(parseInt(v["constitution_save_prof"])) ? 0 : parseInt(v["constitution_save_prof"]),
		conSaveSource: "",
		intSave: isNaN(parseInt(v["intelligence_save_prof"])) ? 0 : parseInt(v["intelligence_save_prof"]),
		intSaveSource: "",
		wisSave: isNaN(parseInt(v["wisdom_save_prof"])) ? 0 : parseInt(v["wisdom_save_prof"]),
		wisSaveSource: "",
		chaSave: isNaN(parseInt(v["charisma_save_prof"])) ? 0 : parseInt(v["charisma_save_prof"]),
		chaSaveSource: "",

		spellEff: isNaN(parseInt(v["spell_profrank-effect"])) ? 0 : parseInt(v["spell_profrank-effect"]),
		spellEffSource: "",
		spiritEff: isNaN(parseInt(v["spirit_profrank-effect"])) ? 0 : parseInt(v["spirit_profrank-effect"]),
		spiritEffSource: "",

		weaponBlades: 0,
		weaponPistol: 0,
		weaponAll: 0,
		weaponProf: "",
		weaponTier: isNaN(parseInt(v["weaponPointsMaxTier"])) ? 0 : parseInt(v["weaponPointsMaxTier"]),
		startingWeapons: v["setWeaponProf-Class"],
		classweaponPoints: isNaN(parseInt(v["weaponProfClassBonus"])) ? 0 : parseInt(v["weaponProfClassBonus"]),
		archweaponPoints: isNaN(parseInt(v["weaponArchetypeBonus"])) ? 0 : parseInt(v["weaponArchetypeBonus"]),
		unarmored: isNaN(parseInt(v["armor_profrank-unarmored"])) ? 0 : parseInt(v["armor_profrank-unarmored"]),
		light: isNaN(parseInt(v["armor_profrank-light"])) ? 0 : parseInt(v["armor_profrank-light"]),
		medium: isNaN(parseInt(v["armor_profrank-medium"])) ? 0 : parseInt(v["armor_profrank-medium"]),
		heavy: isNaN(parseInt(v["armor_profrank-heavy"])) ? 0 : parseInt(v["armor_profrank-heavy"]),
		armorProf: "",
		armorTier: isNaN(parseInt(v["armorPointsMaxTier"])) ? 0 : parseInt(v["armorPointsMaxTier"]),
		startingArmor: v["setArmorProf-Class"],
		classarmorPoints: isNaN(parseInt(v["armorProfClassBonus"])) ? 0 : parseInt(v["armorProfClassBonus"]),
		archarmorPoints: isNaN(parseInt(v["armorArchetypeBonus"])) ? 0 : parseInt(v["armorArchetypeBonus"]),
		skillProf: "",
		startingSkills: v["setSkillProf-Class"],
		skillTier: isNaN(parseInt(v["skillPointsMaxTier"])) ? 0 : parseInt(v["skillPointsMaxTier"]),
		classskillPts: isNaN(parseInt(v["skillClassBonus"])) ? 0 : parseInt(v["skillClassBonus"]),
		archskillPts: isNaN(parseInt(v["skillArchetypeBonus"])) ? 0 : parseInt(v["skillArchetypeBonus"]),
		knowledgeProf: "",
		perceiveBarrier: 0,

		features: [],
		feats: []
	};

	_.each(idarray, function (currentID) {

		// grab the archetype
		archetypeName = v[GetSectionIdName(repeatingArchetypes, currentID, "archetypeType")];

		// create a new entry for the archetype if it doesn't exist
		if (!(archetypeName in archetypes)) {
			archetypes[archetypeName] = GetClassInfo(archetypeName);
			archetypes[archetypeName].level = 0;
			archetypes[archetypeName].spellProf = GetSpellProficiencyGrowth(archetypes[archetypeName].spell);
			archetypes[archetypeName].spiritProf = GetSpellProficiencyGrowth(archetypes[archetypeName].spirit);
			archetypes[archetypeName].weaponProf = GetWeaponProficiencyGrowth(archetypes[archetypeName].weapon, archetypes[archetypeName].type);
			archetypes[archetypeName].armorProf = GetArmorProficiencyGrowth(archetypes[archetypeName].armor), archetypes[archetypeName].type;
			archetypes[archetypeName].skillProf = GetSkillsProficiencyGrowth(archetypes[archetypeName].skill);
		}

		// gain a level
		totalLevel++;
		archetypes[archetypeName].level++;

		let savesString = "";
		let spellcastingString = "";
		let featIncrementer = 0;
		let featData = {};
		if (resetAll || levelId == currentID) {

			// set base stats
			update[GetSectionIdName(repeatingArchetypes, currentID, "archetypesLevel")] = archetypes[archetypeName].level;
			
			// get class data
			levelGrowth = do_update_classLevels_complex_proficiencies(levelGrowth, v, classData.name, totalLevel, totalLevel == 1, classData.type, classData.subtype, saves, spellProf, spiritProf, weaponProf, armorProf, skillProf, classData.feats, classData.features);

			// get archetype data
			levelGrowth = do_update_classLevels_complex_proficiencies(levelGrowth, v, archetypes[archetypeName].name, archetypes[archetypeName].level, false, archetypes[archetypeName].type, "", [], archetypes[archetypeName].spellProf, archetypes[archetypeName].spiritProf, archetypes[archetypeName].weaponProf, archetypes[archetypeName].armorProf, archetypes[archetypeName].skillProf, archetypes[archetypeName].feats, archetypes[archetypeName].features);

			// these only get set at 1st level
			if (totalLevel == 1) {
				// reset all of the stats
				update["strength_save_prof"] = 0;
				update["dexterity_save_prof"] = 0;
				update["constitution_save_prof"] = 0;
				update["intelligence_save_prof"] = 0;
				update["wisdom_save_prof"] = 0;
				update["charisma_save_prof"] = 0;

				update["spell_profrank-effect"] = 0;
				update["spirit_profrank-effect"] = 0;

				if (levelGrowth.perceiveBarrier > 0) {
					update["skillspecproficiency-perceivebarrier"] = levelGrowth.perceiveBarrier;
				}
			}

			// set the save increases
			savesString = "";
			if (levelGrowth.strSaveSource != "") {
				update["strength_save_prof"] = levelGrowth.strSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.strSaveSource}] Setting STR save to ${GetProficiencyRankTitle(levelGrowth.strSave)}.`;
			}
			if (levelGrowth.dexSaveSource != "") {
				update["dexterity_save_prof"] = levelGrowth.dexSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.dexSaveSource}] Setting DEX save to ${GetProficiencyRankTitle(levelGrowth.dexSave)}.`;
			}
			if (levelGrowth.conSaveSource != "") {
				update["constitution_save_prof"] = levelGrowth.conSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.conSaveSource}] Setting CON save to ${GetProficiencyRankTitle(levelGrowth.conSave)}.`;
			}
			if (levelGrowth.intSaveSource != "") {
				update["intelligence_save_prof"] = levelGrowth.intSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.intSaveSource}] Setting INT save to ${GetProficiencyRankTitle(levelGrowth.intSave)}.`;
			}
			if (levelGrowth.wisSaveSource != "") {
				update["wisdom_save_prof"] = levelGrowth.wisSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.wisSaveSource}] Setting WIS save to ${GetProficiencyRankTitle(levelGrowth.wisSave)}.`;
			}
			if (levelGrowth.chaSaveSource != "") {
				update["charisma_save_prof"] = levelGrowth.chaSave;
				savesString += (savesString != "" ? "\n" : "") + `[${levelGrowth.chaSaveSource}] Setting CHA save to ${GetProficiencyRankTitle(levelGrowth.chaSave)}.`;
			}
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingSaves")] = savesString;

			// set spell and spirit
			spellcastingString = "";
			if (levelGrowth.spellEffSource != "") {
				update["spell_profrank-effect"] = levelGrowth.spellEff;
				spellcastingString += (spellcastingString != "" ? "\n" : "") + `[${levelGrowth.spellEffSource}] Setting spell effect to ${GetProficiencyRankTitle(levelGrowth.spellEff)}.`;
			}
			if (levelGrowth.spiritEffSource != "") {
				update["spirit_profrank-effect"] = levelGrowth.spiritEff;
				spellcastingString += (spellcastingString != "" ? "\n" : "") + `[${levelGrowth.spiritEffSource}] Setting spirit effect to ${GetProficiencyRankTitle(levelGrowth.spiritEff)}.`;
			}
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingSpellcasting")] = spellcastingString;

			// set the rest of the proficiencies
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingWeapons")] = levelGrowth.weaponProf;
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingArmor")] = levelGrowth.armorProf;
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingSkills")] = levelGrowth.skillProf;
			update[GetSectionIdName(repeatingArchetypes, currentID, "levelingKnowledge")] = levelGrowth.knowledgeProf;

			// iterate through features
			featIncrementer = 0;
			featMax = 6;
			for (let i = 0; i < levelGrowth.features.length; i++) {
				if (featIncrementer > featMax) {
					break;
				}

				// register the feat
				featData = levelGrowth.features[i];
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatType" + featIncrementer)] = 0;

				// determine if its an increase or new feat
				if (featData.type.indexOf("Ability Score Increase") >= 0) {
					if (featData.type.startsWith("@")) {
						featData.type = featData.type.substring(1);
					}
					var featureData = GetFeatureInfo(featData.type);
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeat" + featIncrementer)] = featData.type;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatDesc" + featIncrementer)] = `[${featData.source}] You gain an ${featData.type}.\n${featureData.desc}`;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatAddButton" + featIncrementer)] = 1;

				}
				else if (featData.type.startsWith("@")) {
					featData.type = featData.type.substring(1);
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeat" + featIncrementer)] = featData.type;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatDesc" + featIncrementer)] = `[${featData.source}] ${featData.type} improves.`;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatAddButton" + featIncrementer)] = 1;
				}
				else {
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeat" + featIncrementer)] = featData.type;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatDesc" + featIncrementer)] = `[${featData.source}] Gained the ${featData.type} feature.`;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatAddButton" + featIncrementer)] = 0;
					update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearch" + featIncrementer)] = featData.type;
				}

				// increment the index
				featIncrementer++;
			}

			// iterate through feats
			for (let i = 0; i < levelGrowth.feats.length; i++) {
				if (featIncrementer > featMax) {
					break;
				}

				// register the feat
				featData = levelGrowth.feats[i];
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeat" + featIncrementer)] = featData.type;
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatType" + featIncrementer)] = 1;

				// display the feat gain
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatDesc" + featIncrementer)] = `[${featData.source}] Gained a ${featData.type}.`;

				// reset the search
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatAddButton" + featIncrementer)] = 1;
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearch" + featIncrementer)] = "";
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearchType" + featIncrementer)] = "";
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearchClass" + featIncrementer)] = "";
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearchPrerequisite" + featIncrementer)] = "";
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeatSearchDesc" + featIncrementer)] = "0";

				// increment the index
				featIncrementer++;
			}

			// null out all other feats
			for (let i = featIncrementer; i <= featMax; i++) {
				update[GetSectionIdName(repeatingArchetypes, currentID, "levelingFeat" + i)] = "0";
			}

			// clear the strings and arrays
			levelGrowth.strSaveSource = "";
			levelGrowth.dexSaveSource = "";
			levelGrowth.conSaveSource = "";
			levelGrowth.intSaveSource = "";
			levelGrowth.wisSaveSource = "";
			levelGrowth.chaSaveSource = "";
			levelGrowth.spellEffSource = "";
			levelGrowth.spiritEffSource = "";
			levelGrowth.weaponProf = "";
			levelGrowth.armorProf = "";
			levelGrowth.skillProf = "";
			levelGrowth.knowledgeProf = "";
			levelGrowth.features = [];
			levelGrowth.feats = [];
		}
	});

	let featListSplit = [];
	let featListType = "";
	let featListLevelArray = [];
	let featTypeId = "";
	let featLevelCount = 0;
	let featLevelString = "";
	let featLevel = 0;
	for (let i = 0; i < classData.featList.length; i++) {
		if (classData.featList[i] == "" || classData.featList[i] == undefined) {
			continue;
		}

		featListSplit = classData.featList[i].split("-");
		featListType = featListSplit[0].toLowerCase().trim();
		featListLevelArray = featListSplit[1];
		featListLevelArray = featListLevelArray.split(",");
	
		switch(featListType) {
			case "general": featTypeId = "GeneralFeat"; break;
			case "combat": featTypeId = "CombatFeat"; break;
			case "skill": featTypeId = "SkillFeat"; break;
			case "spell": featTypeId = "SpellFeat"; break;
			case "archetype": featTypeId = "ArchetypeFeat"; break;
			case "spirit": featTypeId = "SpiritFeat"; break;
			case "beast": featTypeId = "BeastFeat"; break;
			case "ascension": featTypeId = "AscensionFeat"; break;
		}

		featLevelCount = 0;
		featLevelString = "";
		for (let j = 0; j < featListLevelArray.length; j++) {
			featLevel = parseInt(featListLevelArray[j].trim());
			if (featLevel <= totalLevel) {
				featLevelCount++;
				featLevelString += featListLevelArray[j] + ", ";
			}
			else {
				break;
			}
		}

		update[featTypeId + "s_max"] = featLevelCount;
	}

	// update proficiency data
	update["setWeaponProf-Class"] = levelGrowth.startingWeapons;
	update["weaponPointsMaxTier"] = levelGrowth.weaponTier;
	update["weaponProfClassBonus"] = levelGrowth.classweaponPoints;
	update["weaponArchetypeBonus"] = levelGrowth.archweaponPoints;
	update["setArmorProf-Class"] = levelGrowth.startingArmor;
	update["armorPointsMaxTier"] = levelGrowth.armorTier;
	update["armorProfClassBonus"] = levelGrowth.classarmorPoints;
	update["armorArchetypeBonus"] = levelGrowth.archarmorPoints;
	update["setSkills-Class"] = levelGrowth.startingSkills;
	update["skillPointsMaxTier"] = levelGrowth.skillTier;
	update["skillClassBonus"] = levelGrowth.classskillPts;
	update["skillArchetypeBonus"] = levelGrowth.archskillPts;

	// set levels
	update["base_level"] = totalLevel;
	update["next_level_exp"] = GetExpToNextLevel(totalLevel);

	return update;
}

var do_update_classLevels_complex_proficiencies = function (levelGrowth, v, source, currentLevel, hasStartingValues, classType, classSubType, saves, spellProf, spiritProf, weaponProf, armorProf, skillProf, feats, features) {

	let sourceName = source + " Lv." + currentLevel;
	let profRank = 0;
	let featLines = "";
	let proficiencyPoints = 0;

	// update auto setting proficiencies
	let majorSaves =[];
	let minorSaves = [];
	let majorSaveStats = [];
	let minorSaveStats = [];

	if (Array.isArray(saves)) {
		if (saves.length >= 1) {
			majorSaveStats.push(saves[0]);
		}
		if (saves.length >= 2) {
			majorSaveStats.push(saves[1]);
		}
		if (saves.length >= 3) {
			minorSaveStats.push(saves[2]);
		}
		if (saves.length >= 4) {
			minorSaveStats.push(saves[3]);
		}
	}
	if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
		majorSaves = GetSavingThrowProficiencyGrowth("major");
		minorSaves = GetSavingThrowProficiencyGrowth("minor");
	}
	if (hasStartingValues) {

		// Saving Throws
		if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {

			levelGrowth.strSave = majorSaveStats.includes("strength") ? majorSaves[1] : 1;
			levelGrowth.dexSave = majorSaveStats.includes("dexterity") ? majorSaves[1] : 1;
			levelGrowth.conSave = majorSaveStats.includes("constitution") ? majorSaves[1] : 1;
			levelGrowth.intSave = majorSaveStats.includes("intelligence") ? majorSaves[1] : 1;
			levelGrowth.wisSave = majorSaveStats.includes("wisdom") ? majorSaves[1] : 1;
			levelGrowth.chaSave = majorSaveStats.includes("charisma") ? majorSaves[1] : 1;
			levelGrowth.strSaveSource = sourceName;
			levelGrowth.dexSaveSource = sourceName;
			levelGrowth.conSaveSource = sourceName;
			levelGrowth.intSaveSource = sourceName;
			levelGrowth.wisSaveSource = sourceName;
			levelGrowth.chaSaveSource = sourceName;
		}

		// Spells
		levelGrowth.spellEff = spellProf.startRank;
		levelGrowth.spellEffSource = sourceName;
		levelGrowth.spiritEff = spiritProf.startRank;
		levelGrowth.spiritEffSource = sourceName;

		// Weapon
		if (weaponProf.init.startingWeaponGroups != "") {
			profRank = weaponProf.init.startRank;
			proficiencyPoints = profRank * weaponProf.init.startingWeaponPoints;

			let startingWeapons = "";
			startingWeapons = `Become ${GetProficiencyRankTitle(profRank)} in ${weaponProf.init.startingWeaponGroups}`;
			levelGrowth.weaponProf += (levelGrowth.weaponProf != "" ? "\n" : "") + `[${sourceName}] ` + startingWeapons;
			levelGrowth.startingWeapons = "Class\n" + startingWeapons;
			if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
				levelGrowth.classweaponPoints += proficiencyPoints;
			}
			else {
				levelGrowth.archweaponPoints += proficiencyPoints;
			}
		}
		if (levelGrowth.weaponTier < 2) {
			levelGrowth.weaponTier = 2;
		}

		// Armor
		profRank = armorProf.init.startRank;
		levelGrowth.unarmored = armorProf.init.unarmored ? armorProf.init.startRank : 0;
		levelGrowth.light = armorProf.init.light ? armorProf.init.startRank : 0;
		levelGrowth.medium = armorProf.init.medium ? armorProf.init.startRank : 0;
		levelGrowth.heavy = armorProf.init.heavy ? armorProf.init.startRank : 0;
		let startingArmor = `Become ${GetProficiencyRankTitle(profRank)} in `;
		if (armorProf.init.heavy) {
			proficiencyPoints = profRank * 4;
			startingArmor += "unarmored, light, medium, and heavy armor";
		}
		else if (armorProf.init.medium) {
			proficiencyPoints = profRank * 3;
			startingArmor += "unarmored, light, and medium armor";
		}
		else if (armorProf.init.light) {
			proficiencyPoints = profRank * 2;
			startingArmor += "unarmored and light armor";
		}
		else if (armorProf.init.unarmored) {
			proficiencyPoints = profRank;
			startingArmor += "unarmored armor";
		}
		levelGrowth.armorProf += (levelGrowth.armorProf != "" ? "\n" : "") + `[${sourceName}] ` + startingArmor;
		levelGrowth.startingArmor = "Class\n" + startingArmor;
		if (levelGrowth.armorTier < 2) {
			levelGrowth.armorTier = 2;
		}
		if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
			levelGrowth.classarmorPoints += proficiencyPoints;
		}
		else {
			levelGrowth.archarmorPoints += proficiencyPoints;
		}

		// Skills
		let extraSkills = parseInt(v["intelligence_mod"]);
		if (isNaN(extraSkills) || extraSkills < 0) {
			extraSkills = 0;
		}

		// determine skill points
		proficiencyPoints = skillProf.init.startRank * skillProf.init.startingCount;
		proficiencyPoints += extraSkills;
		proficiencyPoints += skillProf.init.additionalSkills;
		proficiencyPoints += skillProf.init.specializationCount;
		if (classType.toLowerCase() == "class" && classSubType.toLowerCase() == "heroic") {
			proficiencyPoints++;
		}
		if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
			levelGrowth.classskillPts += proficiencyPoints;
		}
		else {
			levelGrowth.archskillPts += proficiencyPoints;
		}
		if (levelGrowth.skillTier < 2) {
			levelGrowth.skillTier = 2;
		}

		// determine growths
		let startingGrowth = `Become ${GetProficiencyRankTitle(skillProf.init.startRank)} in ${skillProf.init.startingCount} skills from ${skillProf.init.startingSkills}.\n`;
		startingGrowth += `\nBecome Trained in ${(extraSkills + skillProf.init.additionalSkills)} additional skills.`;
		if (skillProf.init.specializationCount > 0) {
			startingGrowth += `\nBecome Trained in ${(skillProf.init.specializationCount)} specializations.`;
		}
		if (classType.toLowerCase() == "class" && classSubType.toLowerCase() == "heroic") {
			levelGrowth.perceiveBarrier = 1;
			startingGrowth += `\nSetting Perceive Barrier specialization to Trained.`;
		}
		levelGrowth.startingSkills = "Class\n" + startingGrowth;
		levelGrowth.skillProf += (levelGrowth.skillProf != "" ? "\n" : "") + startingGrowth;

		// Knowledge
		levelGrowth.knowledgeProf += `Become Trained in ${(skillProf.init.bonusKnowledge)} knowledge(s) and/or language(s).`;

	}
	else {

		// Saving Throws
		if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
			if (majorSaves[currentLevel] != undefined) {
				profRank = majorSaves[currentLevel];
				if (majorSaveStats.includes("strength") && levelGrowth.strSave < profRank) {
					levelGrowth.strSave = profRank;
					levelGrowth.strSaveSource = sourceName;
				}
				if (majorSaveStats.includes("dexterity") && levelGrowth.dexSave < profRank) {
					levelGrowth.dexSave = profRank;
					levelGrowth.dexSaveSource = sourceName;
				}
				if (majorSaveStats.includes("constitution") && levelGrowth.conSave < profRank) {
					levelGrowth.conSave = profRank;
					levelGrowth.conSaveSource = sourceName;
				}
				if (majorSaveStats.includes("intelligence") && levelGrowth.intSave < profRank) {
					levelGrowth.intSave = profRank;
					levelGrowth.intSaveSource = sourceName;
				}
				if (majorSaveStats.includes("wisdom") && levelGrowth.wisSave < profRank) {
					levelGrowth.wisSave = profRank;
					levelGrowth.wisSaveSource = sourceName;
				}
				if (majorSaveStats.includes("charisma") && levelGrowth.chaSave < profRank) {
					levelGrowth.chaSave = profRank;
					levelGrowth.chaSaveSource = sourceName;
				}
			}
			if (minorSaves[currentLevel] != undefined) {
				profRank = minorSaves[currentLevel];
				if (minorSaveStats.includes("strength") && levelGrowth.strSave < profRank) {
					levelGrowth.strSave = profRank;
					levelGrowth.strSaveSource = sourceName;
				}
				if (minorSaveStats.includes("dexterity") && levelGrowth.dexSave < profRank) {
					levelGrowth.dexSave = profRank;
					levelGrowth.dexSaveSource = sourceName;
				}
				if (minorSaveStats.includes("constitution") && levelGrowth.conSave < profRank) {
					levelGrowth.conSave = profRank;
					levelGrowth.conSaveSource = sourceName;
				}
				if (minorSaveStats.includes("intelligence") && levelGrowth.intSave < profRank) {
					levelGrowth.intSave = profRank;
					levelGrowth.intSaveSource = sourceName;
				}
				if (minorSaveStats.includes("wisdom") && levelGrowth.wisSave < profRank) {
					levelGrowth.wisSave = profRank;
					levelGrowth.wisSaveSource = sourceName;
				}
				if (minorSaveStats.includes("charisma") && levelGrowth.chaSave < profRank) {
					levelGrowth.chaSave = profRank;
					levelGrowth.chaSaveSource = sourceName;
				}
			}
		}

		// Spells
		if (spellProf.ranks[currentLevel] != undefined) {
			profRank = spellProf.ranks[currentLevel];
			if (levelGrowth.spellEff < profRank) {
				levelGrowth.spellEff = profRank;
				levelGrowth.spellEffSource = sourceName;
			}
		}

		// Spirit
		if (spiritProf.ranks[currentLevel] != undefined) {
			profRank = spiritProf.ranks[currentLevel];
			if (levelGrowth.spiritEff < profRank) {
				levelGrowth.spiritEff = profRank;
				levelGrowth.spiritEffSource = sourceName;
			}
		}

		// Weapons
		if (weaponProf.increase[currentLevel] != undefined) {
			if (levelGrowth.weaponTier <= weaponProf.increase[currentLevel]) {
				levelGrowth.weaponTier = weaponProf.increase[currentLevel] + 1;
				levelGrowth.weaponProf += (levelGrowth.weaponProf != "" ? "\n" : "") + `[${sourceName}] Weapon Proficiency Tier has raised to ${GetProficiencyRankTitle(levelGrowth.weaponTier)}.`;
			}
			levelGrowth.weaponProf += (levelGrowth.weaponProf != "" ? "\n" : "") + `[${sourceName}] Gain one Weapon Proficiency Point.`;
			if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
				levelGrowth.classweaponPoints++;
			}
			else {
				levelGrowth.archweaponPoints++;
			}
		}

		// Armor
		if (armorProf.increase[currentLevel] != undefined) {
			if (levelGrowth.armorTier <= armorProf.increase[currentLevel]) {
				levelGrowth.armorTier = armorProf.increase[currentLevel] + 1;
				levelGrowth.armorProf += (levelGrowth.armorProf != "" ? "\n" : "") + `[${sourceName}] Armor Proficiency Tier has raised to ${GetProficiencyRankTitle(levelGrowth.armorTier)}.`;
			}
			levelGrowth.armorProf += (levelGrowth.armorProf != "" ? "\n" : "") + `[${sourceName}] Gain one Armor Proficiency Point.`;
			if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
				levelGrowth.classarmorPoints++;
			}
			else {
				levelGrowth.archarmorPoints++;
			}
		}

		// Skill
		if (skillProf.increase[currentLevel] != undefined) {
			if (levelGrowth.skillTier <= skillProf.increase[currentLevel]) {
				levelGrowth.skillTier = skillProf.increase[currentLevel] + 1;
				levelGrowth.skillProf += (levelGrowth.skillProf != "" ? "\n" : "") + `[${sourceName}] Skill Proficiency Tier has raised to ${GetProficiencyRankTitle(levelGrowth.skillTier)}.`;
			}
			levelGrowth.skillProf += (levelGrowth.armorProf != "" ? "\n" : "") + `[${sourceName}] Gain one Skill Proficiency Point.`;
			if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
				levelGrowth.classskillPts++;
			}
			else {
				levelGrowth.archskillPts++;
			}
		}

		// Knowledge Skills
		if (classType.toLowerCase() == "class") {
			levelGrowth.knowledgeProf += (levelGrowth.knowledgeProf != "" ? "\n" : "") + `[${sourceName}] Raise one knowledge or language by one rank or become trained in a new knowledge or language.`;
		}
	}

	// update core features
	console.log ("setting Features");
	if (features[currentLevel] != undefined && features[currentLevel] != "") {
		featLines = features[currentLevel].split(",");
		for (let i = 0; i < featLines.length; i++) {
			levelGrowth.features.push({type: featLines[i], source: sourceName});
		}
	}

	// update feats
	console.log ("setting Feats");
	if (feats[currentLevel] != undefined && feats[currentLevel] != "") {
		featLines = feats[currentLevel].split(",");
		for (let i = 0; i < featLines.length; i++) {
			levelGrowth.feats.push({type: featLines[i], source: sourceName});
		}
	}

	return levelGrowth;
}

var update_feature_preview_from_database = function (featureName, featureId, featIndex) {
	console.log("PREVIEWING FEATURE " + featureName);

	var featureData = GetFeatureInfo(featureName);
	var update = {};
	var repeatingArchetypes = "repeating_archetypeLevels";

	if (featureData.name != "") {
		console.log("FOUND FEATURE " + featureName);
		update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatAddButton" + featIndex)] = 0;
		update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchType" + featIndex)] = `${featureData.featType} feat`;
		if (featureData.level == "~") {
			update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchClass" + featIndex)] = "0";
			update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchPrerequisite" + featIndex)] = `This feat has special prerequisites based on source.`;
		}
		else {
			update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchClass" + featIndex)] = `${featureData.className} Lv.${featureData.level}`;
			if (featureData.prerequisites == "") {
				update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchPrerequisite" + featIndex)] = "0";
			}
			else {
				update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchPrerequisite" + featIndex)] = featureData.prerequisites;
			}
		}
		update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchDesc" + featIndex)] = get_feature_description(
			featureData.desc, featureData.trigger, featureData.requirement,
			featureData.critSuccess, featureData.success, featureData.failure, featureData.critfailure);
	}
	else {
		update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatAddButton" + featIndex)] = 1;
		update[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearchDesc" + featIndex)] = "0";
	}

	setAttrs(update, {
		silent: true
	});
}

var update_classLevels_add_feature = function (featureId, featIndex) {

	var repeatingArchetypes = "repeating_archetypeLevels"; 
	var mod_attrs = [GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearch" + featIndex)];
	getAttrs(mod_attrs, function (v) {
		var featureName = v[GetSectionIdName(repeatingArchetypes, featureId, "levelingFeatSearch" + featIndex)];

		console.log("ADDING FEATURE " + featIndex + ": " + featureName);
		if (featureName != undefined) {
			var newrowid = generateRowID();
			update_feature_from_database(featureName, [newrowid], true);
		}
	});
}



// Core: Ability Score and Source Points

var update_ability_score_totals = function() {
	console.log("UPDATING ABILITY SCORES");

	let abilityScoreArray = ["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"];
	var mod_attrs = ["characterType"];

	_.each(abilityScoreArray, function (attr) {
		mod_attrs.push(attr);
		mod_attrs.push(attr + "_baseroll");
		mod_attrs.push(attr + "_ancestrybonus");
		mod_attrs.push(attr + "_miscbonus");
	});

	var repeatingSection = "repeating_abilityscoreincreases";

	getSectionIDs(repeatingSection, function (idarray) {

		_.each(abilityScoreArray, function (attr) {
			_.each(idarray, function (id) {
				mod_attrs.push(GetSectionIdName(repeatingSection, id, attr + "increase"));
			});
		});

		getAttrs(mod_attrs, function (v) {
			var update = {};

			let totalMod = {};
			let totalIncreaseMod = {};

			_.each(abilityScoreArray, function (attr) {
				totalMod[attr] = 0;
				totalIncreaseMod[attr] = 0;
				totalMod[attr] += isNaN(parseInt(v[attr + "_baseroll"])) ? 0 : parseInt(v[attr + "_baseroll"]);
				totalMod[attr] += isNaN(parseInt(v[attr + "_ancestrybonus"])) ? 0 : parseInt(v[attr + "_ancestrybonus"]);
				update[attr + "_base"] = totalMod[attr];
			});

			if (v["characterType"] == "0") {
				let increaseBonusString = "";
				let increaseBonus = 0;
				_.each(idarray, function (id) {
					increaseBonusString = "";
					_.each(abilityScoreArray, function (attr) {
						if (v[GetSectionIdName(repeatingSection, id, attr + "increase")] == "1") {
							increaseBonus = totalMod[attr] < 18 ? 2 : 1;
							increaseBonusString += (increaseBonusString != "" ? ", " : "") + attr.substring(0, 3).toUpperCase() + " +" + increaseBonus;
							totalMod[attr] += increaseBonus;
							totalIncreaseMod[attr] += increaseBonus;
						}
					});
					update[GetSectionIdName(repeatingSection, id, "increasedescription")] = increaseBonusString;
				});
			}

			// determine which updates need to happen and add misc bonus
			_.each(abilityScoreArray, function (attr) {
				totalMod[attr] += isNaN(parseInt(v[attr + "_miscbonus"])) ? 0 : parseInt(v[attr + "_miscbonus"]);
				if (v["characterType"] == "0") {
					update[attr + "_increasebonus"] = totalIncreaseMod[attr];
				}

				if (totalMod[attr] != parseInt(v[attr])) {
					update[attr] = totalMod[attr];
				}
			});

			setAttrs(update, {}, 
				function () {
				if (v["characterType"] != "0") {
					update_source_points();
				}
			});

		});
	});
}

var update_source_points = function() {
	console.log("UPDATING SOURCE POINTS");

	let abilityScoreArray = ["strength", "dexterity", "constitution", "wisdom", "intelligence", "charisma"];
	var mod_attrs = ["sp_max"];

	_.each(abilityScoreArray, function (attr) {
		mod_attrs.push(attr);
		mod_attrs.push(attr + "_base");
		mod_attrs.push(attr + "_miscbonus");
	});

	var repeatingSection = "repeating_sourcepointprofs";

	getSectionIDs(repeatingSection, function (idarray) {
		
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection,
			["sourcepoint_cost", "sourcepoint_type", "sourcepoint_qty"])
		);
		getAttrs(mod_attrs, function (v) {
			var update = {};

			let totalMod = {};
			let totalIncreaseMod = {};

			_.each(abilityScoreArray, function (attr) {
				totalMod[attr] = 0;
				totalIncreaseMod[attr] = 0;
				totalMod[attr] += isNaN(parseInt(v[attr + "_base"])) ? 0 : parseInt(v[attr + "_base"]);
			});

			// iterate over each type of spending
			let increaseBonus = 0;
			let spCost = 0;
			let totalSp = isNaN(parseInt(v["sp_max"])) ? 0 : parseInt(v["sp_max"]);
			let sourceTyoe = "1";
			let qty = 0;
			let subSpCost = 0;
			let subQty = 0;

			_.each(idarray, function (id) {
				spCost = 0;
				subSpCost = 0;
				qty = isNaN(parseInt(v[GetSectionIdName(repeatingSection, id, "sourcepoint_qty")])) ? 1 : parseInt(v[GetSectionIdName(repeatingSection, id, "sourcepoint_qty")]);

				// determine cp cost by the type
				sourceTyoe = v[GetSectionIdName(repeatingSection, id, "sourcepoint_type")];
				switch (sourceTyoe) {
					case "strength":
					case "dexterity":
					case "constitution":
					case "intelligence":
					case "wisdom":
					case "charisma":
						subSpCost = 1;
						increaseBonus = 12;
						for (let i = 0; i < qty; i++) {
							while (increaseBonus < totalMod[sourceTyoe]) {
								increaseBonus += 2;
								subSpCost += 1;
							}
							totalMod[sourceTyoe]++;
							totalIncreaseMod[sourceTyoe]++;
							spCost += subSpCost;
						}
					break;
					case "Skill-Knowledge":
						spCost = 1 * qty;
					break;
					case "Skill-Trained":
					case "Skill-Adept":
					case "Spell-Branch":
						spCost = 2 * qty;
					break;
					case "Skill-Expert":
						spCost = 3 * qty;
					break;
					case "Skill-Elite":
						spCost = 4 * qty;
					break;
					case "Skill-Master":
						spCost = 5 * qty;
					break;
					case "0":
						spCost = isNaN(parseInt(v[GetSectionIdName(repeatingSection, id, "sourcepoint_cost")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, id, "sourcepoint_cost")]);
						spCost *= qty;

					break;
				}

				// update the cp cost
				update[GetSectionIdName(repeatingSection, id, "sourcepoint_cost")] = spCost;
				totalSp -= spCost;
			});

			// update sp
			update["sp"] = totalSp;


			// determine which updates need to happen and add misc bonus
			_.each(abilityScoreArray, function (attr) {
				totalMod[attr] += isNaN(parseInt(v[attr + "_miscbonus"])) ? 0 : parseInt(v[attr + "_miscbonus"]);
				update[attr + "_increasebonus"] = totalIncreaseMod[attr];

				if (totalMod[attr] != parseInt(v[attr])) {
					update[attr] = totalMod[attr];
				}
			});

			setAttrs(update);

		});

	});
}


// Core: Proficiency Bonuses

var update_pb = function () {
	callbacks = [];
	getAttrs(["base_level", "pb"], function (v) {
		var update = {};

		var pb = "2";
		var lvl = parseInt(v["base_level"], 10);
		if (lvl < 5) {
			pb = "2"
		} else if (lvl < 9) {
			pb = "3"
		} else if (lvl < 13) {
			pb = "4"
		} else if (lvl < 17) {
			pb = "5"
		} else {
			pb = "6"
		}

		// don't update anything if the pb is identical
		if (v["pb"] == pb) {
			return;
		}

		update["pb"] = pb;
		setAttrs(update, {
			silent: true
		}, function () {
			finish_update_pb();
		});
	});
};

var finish_update_pb = function () {

	var allSkillSpecsCallback = function () {
		update_all_skills_specialization_values();
		update_actions("all");
		update_spell_info("all");
	}

	var allSkillCallback = function () {
		update_knowledge_skills();
		update_all_skill_specializations(allSkillSpecsCallback);
	}

	var allProfCallback = function () {
		update_all_skills(allSkillCallback);
	}

	var spellcastingCallback = function () {
		update_all_proficiencies(allProfCallback);
	}

	update_jack_attr();
	update_ac();
	update_initiative();
	update_all_saves();
	update_class_spellcasting(spellcastingCallback);
};

var update_save = function (attr) {
	console.log("UPDATING SAVE: " + attr);
	var save_attrs = [attr + "_mod", attr + "_save_prof", attr + "_save_mod", "pb"];

	getAttrs(save_attrs, function (v) {

		var prof = GetProfRankBonus(v[attr + "_save_prof"], false, v["pb"]);
		prof += GetProfRankBonus(v[attr + "_save_prof"], true, v["pb"]);
		prof += isNaN(parseInt(v[attr + "_save_prof"])) ? 0 : parseInt(v[attr + "_save_prof"]);
		prof += isNaN(parseInt(v[attr + "_save_mod"])) ? 0 : parseInt(v[attr + "_save_mod"]);
		var total = prof + (isNaN(parseInt(v[attr + "_mod"])) ? 0 : parseInt(v[attr + "_mod"]));

		var update = {};
		update[attr + "_save"] = total;
		update[attr + "_save_bonus"] = prof;
		setAttrs(update, {
			silent: true
		});
	});
};

var update_all_saves = function () {
	update_save("strength");
	update_save("dexterity");
	update_save("constitution");
	update_save("intelligence");
	update_save("wisdom");
	update_save("charisma");
};

var update_proficiency = function (profArray, callback) {

	var prof_attrs = ["pb"];
	var profType = "";
	var profName = "";

	_.each(profArray, function (sourceattribute) {
		profType = sourceattribute.substr(0, sourceattribute.indexOf("_prof"));
		profName = sourceattribute.substr(sourceattribute.indexOf("-") + 1);
		prof_attrs.push(profType + "_profrank-" + profName);
		prof_attrs.push(profType + "_profmod-" + profName);
	});

	getAttrs(prof_attrs, function (v) {
		var update = {};
		let prof = 0;
		let isSub = false;

		_.each(profArray, function (sourceattribute) {
			profType = sourceattribute.substr(0, sourceattribute.indexOf("_prof"));
			profName = sourceattribute.substr(sourceattribute.indexOf("-") + 1);
			isSub = false;
			if (profType == "branch") {
				isSub = true;
			}

			// determine proficiency
			console.log("UPDATING PROFICIENCY: " + profName);
			if (profType.startsWith("armor")) {
				prof = GetProfRankBonus(v[profType + "_profrank-" + profName], isSub, 0);
			}
			else {
				prof = GetProfRankBonus(v[profType + "_profrank-" + profName], isSub, v["pb"]);
			}
			prof += parseInt(v[profType + "_profmod-" + profName]);
			update[profType + "_prof-" + profName] = prof;
		});

		if (callback != undefined) {
			setAttrs(update, {
				silent: true
			}, callback);
		} else {
			setAttrs(update, {
				silent: true
			});
		}

	});
}

var update_all_proficiencies = function (callback) {

	profArray = PrefixAttributeArray("branch_prof-", GetBranchProficiencyTypes());
	profArray = profArray.concat(PrefixAttributeArray("weapon_prof-", GetWeaponProficiencyTypes()));
	profArray = profArray.concat(PrefixAttributeArray("armor_prof-", GetArmorProficiencyTypes()));

	update_proficiency(profArray, callback);
}

var update_caster_points = function () {
	console.log("UPDATING CASTER POINTS");

	var mod_attrs = ["casterPoints_max", "base_level", "spellcasting_ability", "magicSpellforce", "magicAffinityControl", "magicWillpower", "magicKiCapacity"];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let totalSpellforce = GetCasterPointsSpentByLevel("spellpower", isNaN(parseInt(v["magicSpellforce"])) ? 0 : parseInt(v["magicSpellforce"]));
		let totalAffinityControl = GetCasterPointsSpentByLevel("affinitycontrol", isNaN(parseInt(v["magicAffinityControl"])) ? 0 : parseInt(v["magicAffinityControl"]));
		let totalWillpower = GetCasterPointsSpentByLevel("willpower", isNaN(parseInt(v["magicWillpower"])) ? 0 : parseInt(v["magicWillpower"]));
		let totalKiCapacity = GetCasterPointsSpentByLevel("kicapacity", isNaN(parseInt(v["magicKiCapacity"])) ? 0 : parseInt(v["magicKiCapacity"]), v["spellcasting_ability"]);

		let cp = 0;
		cp += totalSpellforce.points;
		cp += totalAffinityControl.points;
		cp += totalWillpower.points;
		cp += totalKiCapacity.points;

		let level = isNaN(parseInt(v["base_level"])) ? 1 : parseInt(v["base_level"]);
		let maxCp = isNaN(parseInt(v["casterPoints_max"])) ? 0 : parseInt(v["casterPoints_max"]);
		update["magicSpellforceError"] = totalSpellforce.level > level ? 1 : 0;
		update["magicAffinityControlError"] = totalAffinityControl.level > level ? 1 : 0;
		update["casterPointsError"] = cp > maxCp ? 1 : 0;

		// update caster tracks
		update["magicSpellforcePoints"] = totalSpellforce.nextLevel;
		update["magicSpellforceKi"] = totalSpellforce.ki;
		update["magicSpellforceKiNext"] = totalSpellforce.nextKi;
		update["magicSpellforcePower"] = totalSpellforce.power;
		update["magicSpellforcePowerNext"] = totalSpellforce.nextPower;
		update["magicAffinityControlPoints"] = totalAffinityControl.nextLevel;
		update["magicAffinityControlBranches"] = totalAffinityControl.branch;
		update["magicAffinityControlBranchesNext"] = totalAffinityControl.nextBranch;
		update["magicWillpowerPoints"] = totalWillpower.nextLevel;
		update["magicWillpowerSpellSlots"] = totalWillpower.slots;
		update["magicWillpowerSpellSlotsNext"] = totalWillpower.nextSlots;
		update["magicKiCapacityKi"] = totalKiCapacity.ki;
		update["magicKiCapacityKiNext"] = totalKiCapacity.nextKi;
		update["magicKiCapacitySurge"] = totalKiCapacity.surge;
		update["magicKiCapacitySurgeNext"] = totalKiCapacity.nextSurge;
		update["magicKiCapacityEther"] = totalKiCapacity.ether;
		update["magicKiCapacityEtherNext"] = totalKiCapacity.nextEther;
		update["casterPoints"] = cp;

		setAttrs(update, {
			silent: true
		}, function () {
			update_class_spellcasting();
			update_branch_proficiency_points();
		});

	});
}

var update_proficiency_points = function(pointAttr, profArray, maxProfArray) {
	console.log("UPDATING " + pointAttr + " PROFICIENCY POINT TOTALS");

	var prof_attrs = profArray.concat(maxProfArray);

	getAttrs(prof_attrs, function (v) {
		var update = {};
		let points = 0;
		let pointMax = 0;

		for (let i = 0; i < profArray.length; i++) {
			points += isNaN(parseInt(v[profArray[i]])) ? 0 : parseInt(v[profArray[i]]);
		}
		for (let i = 0; i < maxProfArray.length; i++) {
			pointMax += isNaN(parseInt(v[maxProfArray[i]])) ? 0 : parseInt(v[maxProfArray[i]]);
		}
		update[pointAttr] = points;
		update[pointAttr + "_max"] = pointMax;
		update[pointAttr + "Error"] = points != pointMax ? 1 : 0;

		setAttrs(update, {
			silent: true
		});
	});

}

var update_branch_proficiency_points = function() {
	let profArray = PrefixAttributeArray("branch_profrank-", GetBranchProficiencyTypes());
	let maxProfArray = ["magicAffinityControl", "branchFeatBonus", "branchMiscBonus"];
	update_proficiency_points("branchPoints", profArray, maxProfArray);
}

var update_weapon_proficiency_points = function() {
	let profArray = PrefixAttributeArray("weapon_profrank-", GetWeaponProficiencyTypes());
	let maxProfArray = ["weaponProfClassBonus", "weaponArchetypeBonus", "weaponFeatBonus", "weaponMiscBonus"];
	update_proficiency_points("weaponPoints", profArray, maxProfArray);
}

var update_armor_proficiency_points = function() {
	let profArray = PrefixAttributeArray("armor_profrank-", GetArmorProficiencyTypes());
	let maxProfArray = ["armorProfClassBonus", "armorArchetypeBonus", "armorFeatBonus", "armorMiscBonus"];
	update_proficiency_points("armorPoints", profArray, maxProfArray);
}

// Core: Features

var get_feature_from_search_value = function (searchIndex, featureId, closeFeature) {

	var repeatingFeatures = "repeating_features";

	getAttrs([GetSectionIdName(repeatingFeatures, featureId, "featuresearch" + searchIndex)], function (v) {
		update_feature_from_database(v[GetSectionIdName(repeatingFeatures, [featureId], "featuresearch" + searchIndex)], featureId, closeFeature);
	});
}

var update_all_features = function() {
	var repeatingSection = "repeating_features";
	getSectionIDs(repeatingSection, function (idarray) {
		update_feature_from_database(repeatingSection, idarray, false);
	});

}

var update_feature_from_database = function (featureName, featureIdArray, closeFeature) {

	var featureData;
	var update = {};
	let updateMade = false;
	var repeatingSection = "repeating_features";

	_.each(featureIdArray, function (id) {
		featureData = GetFeatureInfo(featureName);
		if (featureData.name != "" && id != "") {
			console.log("SETTING FEATURE FROM DATABASE " + featureData.name);
			updateMade = true;

			update[GetSectionIdName(repeatingSection, id, "featureName")] = featureData.name;
			update[GetSectionIdName(repeatingSection, id, "featureTraits")] = featureData.traits;
			var traitsDb = GetTraitsDictionary(featureData.traits);
			for (var i = 0; i < 6; i++) {
				if (i < traitsDb.length) {
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i)] = traitsDb[i].name;
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i + "Desc")] = traitsDb[i].desc;
				} else {
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i)] = "";
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i + "Desc")] = "";
				}
			}

			// Action Cost
			switch (featureData.type) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "R":
					update[GetSectionIdName(repeatingSection, id, "featureActionCost")] = featureData.type;
					break;
			}

			// update conditionals
			if (featureData.trigger != "" || featureData.requirement != "") {
				update[GetSectionIdName(repeatingSection, id, "featureConditionalsflag")] = "1";
				update[GetSectionIdName(repeatingSection, id, "featureTrigger")] = featureData.trigger;
				update[GetSectionIdName(repeatingSection, id, "featureRequirement")] = featureData.requirement;
			}

			update[GetSectionIdName(repeatingSection, id, "featureDesc")] = featureData.desc;

			// update results
			update[GetSectionIdName(repeatingSection, id, "featureCritSuccess")] = featureData.critsuccess;
			update[GetSectionIdName(repeatingSection, id, "featureSuccess")] = featureData.success;
			update[GetSectionIdName(repeatingSection, id, "featureFailure")] = featureData.failure;
			update[GetSectionIdName(repeatingSection, id, "featureCritFailure")] = featureData.critfailure;
			
			if (closeFeature == true) {
				update[GetSectionIdName(repeatingSection, id, "options-flag")] = "0";
			}
		}
	});

	if (updateMade == true) {
		// set the update
		setAttrs(update, {
			silent: true
		}, function () {
			update_feature_action(featureIdArray);
		});
	}
	else {
		update_feature_action(featureIdArray);
	}
}

var update_feature_action = function (featureIdArray) {

	
	var repeatingSection = "repeating_features";
	let attack_attribs = ["character_name"]; 
	attack_attribs = attack_attribs.concat(GetSectionIdValues(featureIdArray, repeatingSection, [
		"featureName", "featureTraits", "featureActionCost", "featureConditionalsflag", "featureTrigger", "featureRequirement",
		"featureDesc", "featureCritSuccess", "featureSuccess", "featureFailure", "featureCritFailure"
	]));

	console.log ("UPDATING FEATURE ACTIONS: " + attack_attribs.length);

	getAttrs(attack_attribs, function (v) {

		_.each(featureIdArray, function (id) {
			console.log("SETTING FEATURE " + v[GetSectionIdName(repeatingSection, id, "featureName")]);
			var update = {};
			var actionData = GetActionData();
			actionData.name = v[GetSectionIdName(repeatingSection, id, "featureName")];
			actionData.targetStyle = v[GetSectionIdName(repeatingSection, id, "featureTargetStyle")];
			actionData.actionCost = v[GetSectionIdName(repeatingSection, id, "featureActionCost")];
			actionData.traits = v[GetSectionIdName(repeatingSection, id, "featureTraits")];
			var traitsDb = GetTraitsDictionary(actionData.traits);
			for (var i = 0; i < 6; i++) {
				if (i < traitsDb.length) {
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i)] = traitsDb[i].name;
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i + "Desc")] = traitsDb[i].desc;
				} else {
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i)] = "";
					update[GetSectionIdName(repeatingSection, id, "featureTrait" + i + "Desc")] = "";
				}
			}

			// add desc
			actionData.description = v[GetSectionIdName(repeatingSection, id, "featureDesc")];

			if (v[GetSectionIdName(repeatingSection, id, "featureConditionalsflag")] == "1") {
				actionData.trigger = v[GetSectionIdName(repeatingSection, id, "featureTrigger")];
				actionData.req = v[GetSectionIdName(repeatingSection, id, "featureRequirement")];
			}

			// add results
			actionData.critsuccess = v[GetSectionIdName(repeatingSection, id, "featureCritSuccess")];
			actionData.success = v[GetSectionIdName(repeatingSection, id, "featureSuccess")];
			actionData.failure = v[GetSectionIdName(repeatingSection, id, "featureFailure")];
			actionData.critfailure = v[GetSectionIdName(repeatingSection, id, "featureCritFailure")];
			
			update[GetSectionIdName(repeatingSection, id, "rollbase")] = actionData.toRoll(v["character_name"]);

			setAttrs(update, {
				silent: true
			});
		});
	});

}

var get_feature_description = function (desc, trigger, requirement, critsuccess, success, failure, critfailure) {

	var output = "";

	if ((trigger != undefined && trigger != "") || (requirement != undefined && requirement != "")) {
		if (trigger != undefined && trigger != "") {
			output += (output != "" ? "\n" : "") + `Trigger: ${trigger}`;
		}

		if (requirement != undefined && requirement != "") {
			output += (output != "" ? "\n" : "") + `Requirement: ${requirement}`;
		}
	}

	output += (output != "" ? "\n\n" : "") + desc;

	if ((critsuccess != undefined && critsuccess != "")
	|| (success != undefined && success != "")
	|| (failure != undefined && failure != "")
	|| (critfailure != undefined && critfailure != "")) {
		output += (output != "" ? "\n" : "")
		if (critsuccess != undefined && critsuccess != "") {
			output += (output != "" ? "\n" : "") + `Crit Success: ${critsuccess}`;
		}

		if (success != undefined && success != "") {
			output += (output != "" ? "\n" : "") + `Success: ${success}`;
		}

		if (failure != undefined && failure != "") {
			output += (output != "" ? "\n" : "") + `Failure: ${failure}`;
		}

		if (critfailure != undefined && critfailure != "") {
			output += (output != "" ? "\n" : "") + `Crit Failure: ${critfailure}`;
		}
	}

	return output;
}

var make_action_from_feature = function (featureId) {
	console.log("CONVERTING FEATURE " + featureId + " INTO ACTION");

	var repeatingFeatures = "repeating_features";
	var mod_attrs = ["character_name",
		GetSectionIdName(repeatingFeatures, featureId, "featureName"),
		GetSectionIdName(repeatingFeatures, featureId, "featureTraits"),
		GetSectionIdName(repeatingFeatures, featureId, "featureDesc")
	];

	getAttrs(mod_attrs, function (v) {
		var update = {};

		// create a new row in the custom actions section
		var repeatingSection = "repeating_customActions";
		var newrowid = generateRowID();

		// grab the feature data
		var featureData = GetFeatureInfo(v[GetSectionIdName(repeatingFeatures, featureId, "featureName")]);
		if (featureData.name != "") {

			update[GetSectionIdName(repeatingSection, newrowid, "options-flag")] = "0";

			// Name
			update[GetSectionIdName(repeatingSection, newrowid, "atkname")] = featureData.name;

			// Traits
			update[GetSectionIdName(repeatingSection, newrowid, "atkTraits")] = featureData.traits;

			// Action Cost
			switch (featureData.type) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "R":
					update[GetSectionIdName(repeatingSection, newrowid, "atkActionCost")] = featureData.type;
					break;
			}

			// update conditionals
			if (featureData.trigger != "" || featureData.requirement != "") {
				update[GetSectionIdName(repeatingSection, newrowid, "atkConditionalsflag")] = "1";
				update[GetSectionIdName(repeatingSection, newrowid, "atkTrigger")] = featureData.trigger;
				update[GetSectionIdName(repeatingSection, newrowid, "atkRequirement")] = featureData.requirement;
			}

			// update results
			update[GetSectionIdName(repeatingSection, newrowid, "atkCritSuccess")] = featureData.critsuccess;
			update[GetSectionIdName(repeatingSection, newrowid, "atkSuccess")] = featureData.success;
			update[GetSectionIdName(repeatingSection, newrowid, "atkFailure")] = featureData.failure;
			update[GetSectionIdName(repeatingSection, newrowid, "atkCritFailure")] = featureData.critfailure;

			// update description
			if (featureData.shortdesc != "") {
				update[GetSectionIdName(repeatingSection, newrowid, "atk_desc")] = featureData.shortdesc;
			} else {
				update[GetSectionIdName(repeatingSection, newrowid, "atk_desc")] = featureData.desc;
			}

		} else {
			// if this is not a feature in the database, create a new action with the basics in the feature data
			update[GetSectionIdName(repeatingSection, newrowid, "customActionName")] = v[GetSectionIdName(repeatingFeatures, featureId, "featureName")];
			update[GetSectionIdName(repeatingSection, newrowid, "customActionTraits")] = v[GetSectionIdName(repeatingFeatures, featureId, "featureTraits")];
			update[GetSectionIdName(repeatingSection, newrowid, "customActionDesc")] = v[GetSectionIdName(repeatingFeatures, featureId, "featureDesc")];
		}

		setAttrs(update, {
			silent: true
		}, function () {
			update_actions(newrowid, true);
		});
	});
}





// Chat: Emotes and Language

var update_emote_post = function () {
	console.log("UPDATING EMOTE POST");
	var update = {};
	var attr_fields = ["emotePostContent", "character_name", "nickname"];

	getAttrs(attr_fields, function (v) {

		update = {};
		var message = v["emotePostContent"];

		// get the chat type
		var chatType = "m";
		if (message.indexOf("!m ") == 0) {
			chatType = "m";
			message = message.replace("!m ", "");
		} else if (message.indexOf("!w ") == 0) {
			chatType = "w";
			message = message.replace("!w ", "");
		} else if (message.indexOf("!y ") == 0) {
			chatType = "y";
			message = message.replace("!y ", "");
		} else if (message.indexOf("!t ") == 0) {
			chatType = "t";
			message = message.replace("!t ", "");
		} else if (message.indexOf("!d ") == 0) {
			chatType = "d";
			message = message.replace("!d ", "");
		} else if (message.indexOf("!de ") == 0) {
			chatType = "de";
			message = message.replace("!de ", "");
		}

		// see if there's a target for the message
		var messageTarget = "";
		var messageTargetCheck = message.indexOf("/");
		if (messageTargetCheck != -1) {
			var messageTargetSubStr = message.substr(messageTargetCheck + 1);
			var endOfMessage = messageTargetSubStr.indexOf("/");
			messageTarget = messageTargetSubStr.substr(0, endOfMessage);
			if (messageTarget.toLowerCase().indexOf("to") != 0) {
				messageTarget = "to " + messageTarget;
			}
			messageTarget = " " + messageTarget;
			message = message.substr(messageTargetCheck + endOfMessage + 2).trim();
		}

		// format the output
		var chattemplateTitle = v["nickname"];

		switch (chatType) {
			case "m":
				update["emotePostType"] = "ctmsg";
				chattemplateTitle += " says";
				break;
			case "w":
				update["emotePostType"] = "ctwsp";
				chattemplateTitle += " whispers";
				break;
			case "y":
				update["emotePostType"] = "ctyell";
				chattemplateTitle += " yells";
				break;
			case "t":
				update["emotePostType"] = "ctthk";
				break;
			case "d":
				update["emotePostType"] = "ctdesc";
				message = v["character_name"] + " " + message;
				break;
			case "de":
				update["emotePostType"] = "ctdesc";
				break;
		}
		chattemplateTitle += messageTarget;

		update["emotePostTarget"] = chattemplateTitle;
		update["emotePostMessage"] = message.trim();

		setAttrs(update, {
			silent: true
		});
	});
}

var update_emotes = function () {
	console.log("UPDATING EMOTES");

	var update = {};
	var attr_fields = ["emote_set"];
	let repeatingEmotes = "repeating_emotes";
	let repeatingOutfits = "repeating_emoteOutfits";
	getSectionIDs(repeatingEmotes, function (idarray) {

		attr_fields = attr_fields.concat(GetSectionIdValues(idarray, repeatingEmotes, ["emote_name", "url", "emote_set"]));

		getAttrs(attr_fields, function (v) {
			getSectionIDs(repeatingOutfits, function (idarray2) {
				let attr2_fields = GetSectionIdValues(idarray2, repeatingOutfits, ["name"]);

				getAttrs(attr2_fields, function (varia) {

					// first get a dictionary of the outfits
					var outfits = [];
					_.each(idarray2, function (currentID2) {
						var newItem = {
							name: varia["repeating_emoteOutfits_" + currentID2 + "_name"],
							list: [],
							url: ""
						};
						outfits[newItem.name] = newItem;
					});

					var previousSet = "";
					var thisEmoteSet = "";

					// next iterate through every emote in emote set 1 and match their outfit to the dictionary made above
					_.each(idarray, function (currentID) {
						// get variables
						thisEmoteSet = v["repeating_emotes_" + currentID + "_emote_set"];
						if (thisEmoteSet != undefined && thisEmoteSet != "" || thisEmoteSet != 0) {
							previousSet = thisEmoteSet;

							// make sure the outfit listing exists
							if (outfits[thisEmoteSet] != undefined) {
								// get the name and url
								var thisEmoteName = v["repeating_emotes_" + currentID + "_emote_name"] ? v["repeating_emotes_" + currentID + "_emote_name"] : "";
								var thisEmoteURL = v["repeating_emotes_" + currentID + "_url"] ? v["repeating_emotes_" + currentID + "_url"] : "";

								// set the emote set name for the emote
								update["repeating_emotes_" + currentID + "_emote_set_name"] = outfits[thisEmoteSet].name;

								// grab the url if it's unset
								if (outfits[thisEmoteSet].url == "") {
									outfits[thisEmoteSet].url = thisEmoteURL;
								}

								// and add the list item
								outfits[thisEmoteSet].list.push(thisEmoteName + "@" + thisEmoteURL);
							}
						} else {
							update["repeating_emotes_" + currentID + "_emote_set"] = previousSet;
						}

					});

					// now iterate through the outfits, assigning their values to the sheet variables
					_.each(idarray2, function (currentID2) {
						var newItemId = varia["repeating_emoteOutfits_" + currentID2 + "_name"];

						outfits[newItemId].list.sort();

						var emotes = outfits[newItemId].list[0];
						for (var emoteListIndex = 1; emoteListIndex < outfits[newItemId].list.length; emoteListIndex++) {
							emotes += "," + outfits[newItemId].list[emoteListIndex];
						}
						update["repeating_emoteOutfits_" + currentID2 + "_emoteSet"] = emotes;
						update["repeating_emoteOutfits_" + currentID2 + "_emoteSetURL"] = outfits[newItemId].url;

					});

					setAttrs(update, {
						silent: true
					}, update_active_emoteset(v["emote_set"]));
				});
			});
		});
	});
}

var update_active_emoteset = function (newset) {
	console.log("UPDATING ACTIVE EMOTE SET");

	// first, kill all the emotes in the current listing of active emotes
	getSectionIDs("repeating_emotesSet2", function (idarray) {
		for (var i = 0; i < idarray.length; i++) {
			removeRepeatingRow("repeating_emotesSet2_" + idarray[i]);
		}
	});

	// now search the emotes array for all emotes in this set
	var update = {};
	var attr_fields = [];

	getSectionIDs("repeating_emoteOutfits", function (idarray2) {
		_.each(idarray2, function (currentID2, i) {
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_name");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteSet");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteSetURL");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteMainImage");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteFireImage");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteHurtImage");
			attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_emoteCutImage");
		});

		getAttrs(attr_fields, function (v) {

			// get data
			var emoteSetData = "";

			// set the active emote data
			_.each(idarray2, function (currentID2) {
				if (v["repeating_emoteOutfits_" + currentID2 + "_name"] == newset) {
					emoteSetData = v["repeating_emoteOutfits_" + currentID2 + "_emoteSet"];
					if (v["repeating_emoteOutfits_" + currentID2 + "_emoteMainImage"] != "") {
						update["emote_activesetimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteMainImage"];
					} else {
						update["emote_activesetimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteSetURL"];
					}
					if (v["repeating_emoteOutfits_" + currentID2 + "_emoteFireImage"] != "") {
						update["emote_activesetfireimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteFireImage"];
					} else {
						update["emote_activesetfireimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteSetURL"];
					}
					if (v["repeating_emoteOutfits_" + currentID2 + "_emoteHurtImage"] != "") {
						update["emote_activesethurtimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteHurtImage"];
					} else {
						update["emote_activesethurtimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteSetURL"];
					}
					if (v["repeating_emoteOutfits_" + currentID2 + "_emoteCutImage"] != "") {
						update["emote_activesetcutinimageurl"] = v["repeating_emoteOutfits_" + currentID2 + "_emoteCutImage"];
					} else {
						update["emote_activesetcutinimageurl"] = "0";
					}
					update["emote_activesetemotes"] = emoteSetData;
					update["repeating_emoteOutfits_" + currentID2 + "_isSelected"] = "1";
				} else {
					update["repeating_emoteOutfits_" + currentID2 + "_isSelected"] = "0";
				}
			});
			update["emote_set"] = newset;

			// determine how we are creating the emote buttons
			if (emoteSetData == undefined || emoteSetData == "" || emoteSetData == 0) {

				// the emote set has no data, so grab from the emotes information
				getSectionIDs("repeating_emotes", function (idarray) {
					var emote_fields = [];
					_.each(idarray, function (currentID, i) {
						emote_fields.push("repeating_emotes_" + currentID + "_emote_name");
						emote_fields.push("repeating_emotes_" + currentID + "_emote_set");
						emote_fields.push("repeating_emotes_" + currentID + "_url");
					});

					getAttrs(emote_fields, function (w) {

						_.each(idarray, function (currentID) {

							// if the emote set of the currently iterated emote is a match to the new set, we can work with it
							if (w["repeating_emotes_" + currentID + "_emote_set"] == newset) {

								// add this new emote to the active emotes list for posting from the character sheet
								var newrowid = generateRowID();
								update["repeating_emotesSet2_" + newrowid + "_emote_name"] = w["repeating_emotes_" + currentID + "_emote_name"];
								update["repeating_emotesSet2_" + newrowid + "_url"] = w["repeating_emotes_" + currentID + "_url"];
							}
						});

						// set the data
						setAttrs(update);
					});
				});
			} else {

				// the emote set data has enough information to create buttons from it
				// so split the data and create buttons
				var sets = emoteSetData.split(",");
				_.each(sets, function (newset) {

					// add this new emote to the active emotes list for posting from the character sheet
					var setData = newset.split("@");
					var newrowid = generateRowID();
					update["repeating_emotesSet2_" + newrowid + "_emote_name"] = setData[0];
					update["repeating_emotesSet2_" + newrowid + "_url"] = setData[1];

				});

				setAttrs(update);
			}
		});
	});
}

var update_emoteset_name = function (item_id) {
	console.log("UPDATING EMOTE SET NAME");

	var update = {};
	var attr_fields = ["emote_set", "repeating_emoteOutfits_" + item_id + "_tempName", "repeating_emoteOutfits_" + item_id + "_name"];
	getSectionIDs("repeating_emotes", function (idarray) {
		_.each(idarray, function (currentID, i) {
			attr_fields.push("repeating_emotes_" + currentID + "_emote_set");
		});

		getSectionIDs("repeating_emoteOutfits", function (idarray2) {
			_.each(idarray2, function (currentID2, i) {
				attr_fields.push("repeating_emoteOutfits_" + currentID2 + "_name");
			});

			getAttrs(attr_fields, function (v) {

				var oldset = v["repeating_emoteOutfits_" + item_id + "_name"];
				var newset = v["repeating_emoteOutfits_" + item_id + "_tempName"];
				var canContinue = true;
				var emoteList = "";

				_.each(idarray2, function (currentID2) {
					emoteList += v["repeating_emoteOutfits_" + currentID2 + "_name"] + ",";

					if (v["repeating_emoteOutfits_" + currentID2 + "_name"] == newset) {
						// this new set is the same name of another emote set. Don't go through with these changes
						console.log("This has the same name of another emote set. Stop");
						canContinue = false;
					}
				});

				if (canContinue) {
					console.log("Changing emote name from " + oldset + " to " + newset);
					update["emote_allEmoteOutfits"] = emoteList;

					_.each(idarray, function (currentID) {

						// if the emote set of the currently iterated emote is a match to the new set, we can work with it
						if (v["repeating_emotes_" + currentID + "_emote_set"] == oldset) {
							update["repeating_emotes_" + currentID + "_emote_set"] = newset;
						}
					});

					if (v["emote_set"] == oldset) {
						update["emote_set"] = newset;
					}
					update["repeating_emoteOutfits_" + item_id + "_name"] = newset;

					setAttrs(update);
				}

			});
		});
	});
}

var update_language = function (item_id) {
	console.log("UPDATING LANGUAGE");
	var update = {};
	var attr_fields = [item_id];
	getSectionIDs("repeating_languages", function (idarray) {
		_.each(idarray, function (currentID, i) {
			attr_fields.push("repeating_languages_" + currentID + "_language");
		});

		getAttrs(attr_fields, function (v) {


			update["speaking_language"] = v[item_id];
			update["speaking_language_tag"] = GetLanguageTag(v[item_id].toLowerCase());

			var languageSet = "";
			_.each(idarray, function (currentID) {

				if ("repeating_languages_" + currentID + "_language" == item_id) {
					update["repeating_languages_" + currentID + "_isSelected"] = "1";
				} else {
					update["repeating_languages_" + currentID + "_isSelected"] = "0";
				}

				languageSet += v["repeating_languages_" + currentID + "_language"] + ",";
			});
			update["language_allLanguages"] = languageSet;
			setAttrs(update);

		});
	});
}

var update_recast_list = function () {

	let repeatingSection = "repeating_chararecast";
	getSectionIDs(repeatingSection, function (idarray) {

		let attr_fields = GetSectionIdValues(idarray, repeatingSection, ["recastName"]);
		getAttrs(attr_fields, function (v) {

			let names = "";
			_.each(idarray, function (currentID) {
				names += v[GetSectionIdName(repeatingSection, currentID, "recastName")] + ",";
			});
			var update = {};
			update["recastCharacterNames"] = names;
			setAttrs(update, {
				silent: true
			});
		});
	});
}



// Life: Downtime Calendar

var update_downtimeWeekSelection = function (weekId, selectedId) {

	var repeatingSection = "repeating_downtimeCalendar";
	var mod_attrs = ["selectedCalendarMonthId", "selectedCalendarWeek",
	repeatingSection + "_" + selectedId + "_dtmonth",
	repeatingSection + "_" + selectedId + "_mainActivityDetails" + weekId, 
	repeatingSection + "_" + selectedId + "_minorActivityDetails" + weekId, 
	repeatingSection + "_" + selectedId + "_weekLog" + weekId];

	getSectionIDs(repeatingSection, function (idarray) {

		getAttrs(mod_attrs, function (v) {
			console.log("UPDATING SELECTED WEEK to " + v[repeatingSection + "_" + selectedId + "_dtmonth"] + " week " + weekId);

			var update = {};

			// deselect previous selected week
			if (v["selectedCalendarMonthId"] != undefined && v["selectedCalendarMonthId"] != "") {
				console.log ("deselecting " + repeatingSection + v["selectedCalendarMonthId"] + "_week" + v["selectedCalendarWeek"] + "isSelected");
				update[repeatingSection + "_" + v["selectedCalendarMonthId"] + "_week" + v["selectedCalendarWeek"] + "isSelected"] = "0";
			}

			// update the selected week data
			update["selectedCalendarMonthId"] = selectedId;
			update["selectedCalendarWeek"] = weekId;
			update[repeatingSection + "_" + selectedId + "_week" + weekId + "isSelected"] = "1";
			
			// update the weekly log
			let weeklyLogTitle = "";
			if (v[repeatingSection + "_" + selectedId + "_dtmonth"] != undefined) {
				weeklyLogTitle = v[repeatingSection + "_" + selectedId + "_dtmonth"] + " ";
			}
			switch(weekId) {
				case "1": weeklyLogTitle += "1-7 "; break;
				case "2": weeklyLogTitle += "8-14 "; break;
				case "3": weeklyLogTitle += "15-21 "; break;
				case "4": weeklyLogTitle += "22-28 "; break;
			}
			weeklyLogTitle += "Events";
			let weeklyLog = "";
			if (v[repeatingSection + "_" + selectedId + "_weekLog" + weekId] != undefined) {
				weeklyLog = v[repeatingSection + "_" + selectedId + "_weekLog" + weekId];
			}
			update["calendar_weeklyLogName"] = weeklyLogTitle;
			update["calendar_weeklyLog"] = weeklyLog;

			// default the downtime activity variables
			update["downtimeMainActivityLocked"] = 0;
			update["downtimeMainActivityDetails"] = 0;
			update["downtimeMinorActivityLocked"] = 0;
			update["downtimeMinorActivityDetails"] = 0;
			update["downtimeShowActivityList"] = 0;

			// determine whether the activities are already completed
			let mainActivity = v[repeatingSection + "_" + selectedId + "_mainActivityDetails" + weekId];
			if (mainActivity != undefined && mainActivity != "") {
				update["downtimeMainActivityLocked"] = "on";
				update["downtimeMainActivityDetails"] = mainActivity;
				

				let minorActivity = v[repeatingSection + "_" + selectedId + "_minorActivityDetails" + weekId];
				if (minorActivity != undefined && minorActivity != "") {
					update["downtimeMinorActivityLocked"] = "on";
					update["downtimeShowActivityList"] = "on";
					update["downtimeMinorActivityDetails"] = minorActivity;
				}
			}
			
			setAttrs(update, {
				silent: true
			});
		});
	});
}

var update_downtimeWeekLog = function (content) {
	console.log("UPDATING WEEK NOTES");

	var repeatingSection = "repeating_downtimeCalendar";
	var mod_attrs = ["selectedCalendarMonthId", "selectedCalendarWeek"];

	getAttrs(mod_attrs, function (v) {

		var update = {};
		update[repeatingSection + "_" + v["selectedCalendarMonthId"] + "_weekLog" + v["selectedCalendarWeek"]] = content;

		setAttrs(update, {
			silent: true
		});
	});
}





// Gear: Resources

function getBlueprintCraftRuleInfo (rule) {

	let output = {
		name: "",
		default: "Steel"
	};
	switch (rule) {
		case "Sturdy":
			output.name = "sturdy";
			break;
		case "Sturdy (3)":
			output.name = "sturdy3";
			break;
		case "Piercing":
			output.name = "piercing";
			break;
		case "Sharp":
			output.name = "sharp";
			break;
		case "Flexible":
			output.name = "flexible";
			output.name = "Cotton";
			break;
		case "Transparent":
			output.name = "transparent";
			output.name = "Glass";
			break;
	}

	return output;
}

var update_item_from_database = function (repeatingSection, itemId, itemsearch) {
	console.log("LOOKING UP ITEM " + itemsearch);

	var itemData;
	switch (repeatingSection) {
		case "repeating_gearconsumables":
			itemData = GetItemConsumableInfo(itemsearch);
			break;
		case "repeating_inventory":
			itemData = GetItemGearInfo(itemsearch);
			break;
		case "repeating_geardust":
			itemData = GetItemMaterialInfo(itemsearch);
			break;
		case "repeating_geargoods":
			itemData = GetItemGoodsInfo(itemsearch);
			break;
	}

	if (itemData.name != "") {
		var update = {};

		update[GetSectionIdName(repeatingSection, itemId, "itemname")] = itemData.name;
		update[GetSectionIdName(repeatingSection, itemId, "itemweight")] = itemData.weight;
		update[GetSectionIdName(repeatingSection, itemId, "itemcontent")] = itemData.desc;

		setAttrs(update, {
			silent: true
		}, function () {
			update_weight();
		});
	}
}

var update_craftedItem_materials_from_database = function (repeatingSection, itemId, itemType) {
	console.log("SETTING MATERIALS FOR ITEM " + repeatingSection + "/" + itemType);

	var itemData;
	switch (repeatingSection) {
		case "repeating_gearammunition":
			itemData = GetItemWeaponInfo(itemType);
			break;
		case "repeating_gearweapons":
			itemData = GetItemWeaponInfo(itemType);
			break;
		case "repeating_geararmor":
		case "repeating_gearshields":
			itemData = GetItemArmorInfo(itemType);
			break;
	}

	if (itemData != undefined && itemData.name != "") {
		var update = {};
		let rulesInfo = getBlueprintCraftRuleInfo(itemData.blueprints.components[0].rule);
		update[GetSectionIdName(repeatingSection, itemId, "itemMaterialRule")] = rulesInfo.name;

		setAttrs(update, {
			silent: true
		}, function () {
			update_craftedItem_from_database(repeatingSection, itemId);
		});
	}
}

var update_craftedItem_from_database = function (repeatingSection, itemId) {
	console.log("LOOKING UP ITEM " + itemId);

	var mod_attrs = [GetSectionIdName(repeatingSection, itemId, "itemType"), GetSectionIdName(repeatingSection, itemId, "itemMaterial")];

	getAttrs(mod_attrs, function (v) {
		var itemData;

		switch (repeatingSection) {
			case "repeating_gearammunition":
				itemData = GetItemWeaponInfo(v[GetSectionIdName(repeatingSection, itemId, "itemType")]);
				break;
			case "repeating_gearweapons":
				itemData = GetItemWeaponInfo(v[GetSectionIdName(repeatingSection, itemId, "itemType")]);
				break;
			case "repeating_geararmor":
			case "repeating_gearshields":
				itemData = GetItemArmorInfo(v[GetSectionIdName(repeatingSection, itemId, "itemType")]);
				break;
		}

		var mainMatData = GetItemMaterialInfo(v[GetSectionIdName(repeatingSection, itemId, "itemMaterial")]);

		if (itemData != undefined && itemData.name != "" && mainMatData.name != "") {
			var update = {};

			// create the item to get a proper weight
			let blueprintComponents = itemData.blueprints.components;
			blueprintComponents[0].material = mainMatData.name;
			blueprintComponents = UpdateBlueprintCraftingData(blueprintComponents);
			let craftingSummary = GetCraftingSummary(blueprintComponents);

			// update shared data
			update[GetSectionIdName(repeatingSection, itemId, "itemname")] = mainMatData.name + " " + itemData.name;
			update[GetSectionIdName(repeatingSection, itemId, "itemweight")] = craftingSummary.weight;
			update[GetSectionIdName(repeatingSection, itemId, "itemcontent")] = itemData.desc;

			switch (repeatingSection) {
				case "repeating_gearweapons":
					update[GetSectionIdName(repeatingSection, itemId, "itemCategory")] = itemData.type;
					update[GetSectionIdName(repeatingSection, itemId, "itemGroup")] = itemData.group;
					update[GetSectionIdName(repeatingSection, itemId, "itemDamage")] = itemData.damage;
					update[GetSectionIdName(repeatingSection, itemId, "itemDamageType")] = itemData.damageType;
					update[GetSectionIdName(repeatingSection, itemId, "itemElement")] = mainMatData.element;
					update[GetSectionIdName(repeatingSection, itemId, "itemEnhancement")] = mainMatData.wpnBonus;
					update[GetSectionIdName(repeatingSection, itemId, "itemProperties")] = itemData.properties;
					break;
				case "repeating_geararmor":
				case "repeating_gearshields":
					update[GetSectionIdName(repeatingSection, itemId, "itemCategory")] = itemData.type;
					update[GetSectionIdName(repeatingSection, itemId, "itemAC")] = itemData.ac;
					var flexibility = parseInt(itemData.skill) + parseInt(mainMatData.defBonus);
					if (flexibility > 0) {
						flexibility = 0;
					}
					update[GetSectionIdName(repeatingSection, itemId, "itemSkill")] = flexibility;
					update[GetSectionIdName(repeatingSection, itemId, "itemEnhancement")] = mainMatData.defBonus;
					break;
			}

			setAttrs(update, {
				silent: true
			}, function () {
				update_weight();
			});
		}
	});
}

// Gear: Weight 

var update_weight = function () {
	console.log("UPDATING WEIGHT");
	var update = {};
	var wtotal = 0;
	var weight_attrs = ["jin", "frt", "syr", "gp", "cp", "strength", "size", "carrying_capacity_mod"];
	var repeatingConsumables = "repeating_gearconsumables";
	var repeatingAmmunition = "repeating_gearammunition";
	var repeatingWeapons = "repeating_gearweapons";
	var repeatingArmor = "repeating_geararmor";
	var repeatingShields = "repeating_gearshields";
	var repeatingGear = "repeating_inventory";
	var repeatingDust = "repeating_geardust";
	var repeatingGoods = "repeating_geargoods";

	getSectionIDs(repeatingConsumables, function (consumableArray) {
		getSectionIDs(repeatingAmmunition, function (ammoArray) {
			getSectionIDs(repeatingWeapons, function (weaponArray) {
				getSectionIDs(repeatingArmor, function (armorArray) {
					getSectionIDs(repeatingShields, function (shieldArray) {
						getSectionIDs(repeatingGear, function (gearArray) {
							getSectionIDs(repeatingDust, function (dustArray) {
								getSectionIDs(repeatingGoods, function (goodsArray) {
									weight_attrs = weight_attrs.concat(GetSectionIdValues(consumableArray, repeatingConsumables, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(ammoArray, repeatingAmmunition, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(weaponArray, repeatingWeapons, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(armorArray, repeatingArmor, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(shieldArray, repeatingShields, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(gearArray, repeatingGear, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(dustArray, repeatingDust, ["itemweight", "itemcount", "iteminstorage"]));
									weight_attrs = weight_attrs.concat(GetSectionIdValues(goodsArray, repeatingGoods, ["itemweight", "itemcount", "iteminstorage"]));

									getAttrs(weight_attrs, function (v) {

										// get the weight of currency
										gp = isNaN(parseInt(v.gp, 10)) === false ? parseInt(v.gp, 10) : 0;
										cp = isNaN(parseInt(v.cp, 10)) === false ? parseInt(v.cp, 10) : 0;
										jin = isNaN(parseInt(v.jin, 10)) === false ? parseInt(v.jin, 10) : 0;
										syr = isNaN(parseInt(v.syr, 10)) === false ? parseInt(v.syr, 10) : 0;
										frt = isNaN(parseInt(v.frt, 10)) === false ? parseInt(v.frt, 10) : 0;
										wtotal = wtotal + ((gp + cp) / 50);
										let jinArray = jin + "";
										jinArray = jinArray.split('');
										_.each(jinArray, function (money) {
											wtotal += parseInt(money, 10) * 0.005;
										});
										let frtArray = frt + "";
										frtArray = frtArray.split('');
										_.each(frtArray, function (money) {
											wtotal += parseInt(money, 10) * 0.005;
										});
										let syrArray = syr + "";
										syrArray = syrArray.split('');
										_.each(syrArray, function (money) {
											wtotal += parseInt(money, 10) * 0.05;
										});

										// grab the weight of each item on the character and add it to the currency weight
										wtotal += add_item_section_weight(consumableArray, repeatingConsumables, v);
										wtotal += add_item_section_weight(ammoArray, repeatingAmmunition, v);
										wtotal += add_item_section_weight(weaponArray, repeatingWeapons, v);
										wtotal += add_item_section_weight(armorArray, repeatingArmor, v);
										wtotal += add_item_section_weight(shieldArray, repeatingShields, v);
										wtotal += add_item_section_weight(gearArray, repeatingGear, v);
										wtotal += add_item_section_weight(dustArray, repeatingDust, v);
										wtotal += add_item_section_weight(goodsArray, repeatingGoods, v);

										// round the weight total and update the weight
										update["weighttotal"] = wtotal.toFixed(2);

										// calculate size multiplier for encumbrance
										var str_base = parseInt(v.strength, 10);
										var size_multiplier = 1;
										// if (v["size"] && v["size"] != "") {
										//     if (v["size"].toLowerCase().trim() == "tiny") {
										//         size_multiplier = .5
										//     } else if (v["size"].toLowerCase().trim() == "large") {
										//         size_multiplier = 2
										//     } else if (v["size"].toLowerCase().trim() == "huge") {
										//         size_multiplier = 4
										//     } else if (v["size"].toLowerCase().trim() == "gargantuan") {
										//         size_multiplier = 8
										//     }
										// }

										// add modifiers to strength modifier encumbrance
										var str = str_base * size_multiplier;
										if (v.carrying_capacity_mod) {
											var operator = v.carrying_capacity_mod.substring(0, 1);
											var value = v.carrying_capacity_mod.substring(1);
											if (["*", "x", "+", "-"].indexOf(operator) > -1 && isNaN(parseInt(value, 10)) === false) {
												if (operator == "*" || operator == "x") {
													str = str * parseInt(value, 10);
												} else if (operator == "+") {
													str = str + parseInt(value, 10);
												} else if (operator == "-") {
													str = str - parseInt(value, 10);
												}
											}
										}

										// update encumbrance
										var weightMax = parseInt(50) + parseInt((str - 10) * 10);
										var weightLift = parseInt(weightMax * 1.5);
										var weightDrag = parseInt(weightMax * 2);
										update["weightmaximum"] = weightMax;
										update["weightLift"] = weightLift;
										update["weightDrag"] = weightDrag;
										if (wtotal > weightDrag) {
											update["encumberance"] = "IMMOBILE";
										} else if (wtotal > weightLift) {
											update["encumberance"] = "HEAVILY ENCUMBERED";
										} else if (wtotal > weightMax) {
											update["encumberance"] = "ENCUMBERED";
										} else {
											update["encumberance"] = " ";
										}

										setAttrs(update, {
											silent: true
										});

									});
								});
							});
						});
					});
				});
			});
		});
	});
};

var add_item_section_weight = function (sectionArray, repeatingSection, values) {
	let itemWt = 0;
	let itemQty = 0;
	let wtotal = 0;
	_.each(sectionArray, function (currentID) {
		if (values[GetSectionIdName(repeatingSection, currentID, "iteminstorage")] == "1") {
			itemWt = parseFloat(values[GetSectionIdName(repeatingSection, currentID, "itemweight")]);
			itemQty = parseFloat(values[GetSectionIdName(repeatingSection, currentID, "itemcount")]);

			if (!isNaN(itemWt) && !isNaN(itemQty)) {
				wtotal += itemWt * itemQty;
			}
		}
	});
	return wtotal;
}

// Gear: Special Actions

var update_item_id_list = function (repeatingSection, listId) {
	console.log("UPDATING ID LIST for " + repeatingSection);

	getSectionIDs(repeatingSection, function (idarray) {
		var update = {};
		var all = "";
		_.each(idarray, function (id) {
			all += id + ",";
		});
		all = all == "" ? "" : all.substring(0, all.length - 1);
		update[listId] = all;
		setAttrs(update, {
			silent: true
		});
	});
}

var make_attack_from_weapon = function (itemId) {

	var repeatingWeapons = "repeating_gearweapons";
	var mod_attrs = ["weapon_prof-axe", "weapon_prof-blade", "weapon_prof-bow", "weapon_prof-brawling", "weapon_prof-dart",
		"weapon_prof-flail", "weapon_prof-hammer", "weapon_prof-pistol", "weapon_prof-polearm", "weapon_prof-rifle",
		GetSectionIdName(repeatingWeapons, itemId, "itemname"),
		GetSectionIdName(repeatingWeapons, itemId, "itemCategory"),
		GetSectionIdName(repeatingWeapons, itemId, "itemGroup"),
		GetSectionIdName(repeatingWeapons, itemId, "itemDamage"),
		GetSectionIdName(repeatingWeapons, itemId, "itemDamageType"),
		GetSectionIdName(repeatingWeapons, itemId, "itemElement"),
		GetSectionIdName(repeatingWeapons, itemId, "itemEnhancement"),
		GetSectionIdName(repeatingWeapons, itemId, "itemProperties"),
		GetSectionIdName(repeatingWeapons, itemId, "featureDesc")
	];

	getAttrs(mod_attrs, function (v) {
		console.log("CONVERTING WEAPON INTO ACTION: " + v[GetSectionIdName(repeatingWeapons, itemId, "itemname")]);
		var update = {};

		// create a new row in the custom actions section
		var repeatingSection = "repeating_customActions";
		var newrowid = generateRowID();

		// variables
		var properties = v[GetSectionIdName(repeatingWeapons, itemId, "itemProperties")];

		// set basics
		update[GetSectionIdName(repeatingSection, newrowid, "options-flag")] = "0";
		update[GetSectionIdName(repeatingSection, newrowid, "atkname")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemname")];
		update[GetSectionIdName(repeatingSection, newrowid, "atkTargetStyle")] = "Token";
		update[GetSectionIdName(repeatingSection, newrowid, "atkTraits")] = "Attack";
		update[GetSectionIdName(repeatingSection, newrowid, "atkActionCost")] = "1";
		update[GetSectionIdName(repeatingSection, newrowid, "atkActionsCanChange")] = "1";

		// see if there's a range property
		if (properties.indexOf("Ammo") >= 0) {
			let rangeString = properties.substr(properties.indexOf("Ammo"));
			let rangeStart = rangeString.indexOf("(");
			let rangeEnd = rangeString.indexOf(")");
			update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `${rangeString.substring(rangeStart + 1, rangeEnd)} feet`;
		} else if (properties.indexOf("Thrown") >= 0) {
			let rangeString = properties.substr(properties.indexOf("Thrown"));
			let rangeStart = rangeString.indexOf("(");
			let rangeEnd = rangeString.indexOf(")");
			update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `${rangeString.substring(rangeStart + 1, rangeEnd)} feet`;
		} else {
			update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `5 feet`;
		}

		// set attack data
		update[GetSectionIdName(repeatingSection, newrowid, "checkflag")] = "1";
		update[GetSectionIdName(repeatingSection, newrowid, "atkflag")] = "1";
		if (properties.indexOf("Finesse") >= 0) {
			update[GetSectionIdName(repeatingSection, newrowid, "atkattr_base")] = "dexterity";
		} else {
			update[GetSectionIdName(repeatingSection, newrowid, "atkattr_base")] = "strength";
		}
		update[GetSectionIdName(repeatingSection, newrowid, "atkmod")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemEnhancement")];

		// set the best proficiency
		var groupName = "";
		var groupBonus = 0;
		switch (v[GetSectionIdName(repeatingWeapons, itemId, "itemGroup")].toLowerCase().trim()) {
			case "axe":
				groupBonus = parseInt(v["weapon_prof-axe"]);
				groupName = "Axe";
				break;
			case "blade":
				groupBonus = parseInt(v["weapon_prof-blade"]);
				groupName = "Blade";
				break;
			case "bow":
				groupBonus = parseInt(v["weapon_prof-bow"]);
				groupName = "Bow";
				break;
			case "brawling":
				groupBonus = parseInt(v["weapon_prof-brawling"]);
				groupName = "Brawling";
				break;
			case "dart":
				groupBonus = parseInt(v["weapon_prof-dart"]);
				groupName = "Dart";
				break;
			case "flail":
				groupBonus = parseInt(v["weapon_prof-flail"]);
				groupName = "Flail";
				break;
			case "hammer":
				groupBonus = parseInt(v["weapon_prof-hammer"]);
				groupName = "Hammer";
				break;
			case "pistol":
				groupBonus = parseInt(v["weapon_prof-pistol"]);
				groupName = "Pistol";
				break;
			case "polearm":
				groupBonus = parseInt(v["weapon_prof-polearm"]);
				groupName = "Polearm";
				break;
			case "rifle":
				groupBonus = parseInt(v["weapon_prof-rifle"]);
				groupName = "Rifle";
				break;
		}
		if (groupName != "") {
			update[GetSectionIdName(repeatingSection, newrowid, "proficiency_group")] = groupName;
		} else {
			update[GetSectionIdName(repeatingSection, newrowid, "proficiency_group")] = "0";
		}

		// set damage data
		update[GetSectionIdName(repeatingSection, newrowid, "dmgflag")] = "1";
		update[GetSectionIdName(repeatingSection, newrowid, "dmgbase")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemDamage")];
		update[GetSectionIdName(repeatingSection, newrowid, "dmgattr")] = "strength";
		update[GetSectionIdName(repeatingSection, newrowid, "dmgmod")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemEnhancement")];
		update[GetSectionIdName(repeatingSection, newrowid, "dmgtype")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemDamageType")];
		update[GetSectionIdName(repeatingSection, newrowid, "dmgelement")] = v[GetSectionIdName(repeatingWeapons, itemId, "itemElement")];

		setAttrs(update, {
			silent: true
		}, function () {
			update_actions(newrowid, true);
		});
	});
}

var update_selected_armor = function (selectedId, repeatingSection) {

	var mod_attrs = ["gearUnarmoredIsSelected", "gearUnshieldedIsSelected", "globalArmorFlexibility"];
	let armorType, equppedType, equippedAC, equippedFlex, unequipType = "";
	switch(repeatingSection) {
		case "repeating_geararmor":
			armorType = "ARMOR";
			equppedType = "gearEquippedArmorType";
			equippedAC = "gearEquippedArmorAc";
			equippedFlex = "gearEquippedArmorFlexibility";
			unequipType = "gearUnarmoredIsSelected";
		break;
		case "repeating_gearshields":
			armorType = "SHIELD";
			equppedType = "gearEquippedShieldType";
			equippedAC = "gearEquippedShieldAc";
			equippedFlex = "gearEquippedShieldFlexibility";
			unequipType = "gearUnshieldedIsSelected";
		break;
	}

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["itemName", "itemCategory", "itemAC", "itemSkill", "itemEnhancement", "isSelected"]));

		getAttrs(mod_attrs, function (v) {
			var update = {};

			if (selectedId == "current") {
				console.log(`UPDATING SELECTED ${armorType} to none`);
				update[unequipType] = "1";
				update[equppedType] = "Unarmored";
				update[equippedAC] = "0";
				update[equippedFlex] = "0";
			} else {
				console.log(`UPDATING SELECTED ${armorType} to ${v[GetSectionIdName(repeatingSection, selectedId, "itemName")]}`);
				update[unequipType] = "0";
			}

			_.each(idarray, function (currentID) {

				if (currentID == selectedId) {
					update[GetSectionIdName(repeatingSection, currentID, "isSelected")] = "1";
					update[equppedType] = v[GetSectionIdName(repeatingSection, selectedId, "itemCategory")];
					let ac = isNaN(parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemAC")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemAC")]);
					ac += isNaN(parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemEnhancement")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemEnhancement")]);
					let flexibility = isNaN(parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemSkill")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, selectedId, "itemSkill")]);
					update[equippedAC] = ac;
					update[equippedFlex] = flexibility;

				} else if (v[GetSectionIdName(repeatingSection, currentID, "isSelected")] == "1") {
					update[GetSectionIdName(repeatingSection, currentID, "isSelected")] = "0";
				}

			});

			setAttrs(update, {
				silent: true
			}, function () {
				update_ac();
				update_armor_flexibility();
			});
		});
	});
}

var update_armor_flexibility = function () {
	var skill_attrs = ["globalArmorFlexibility", "gearEquippedArmorFlexibility", "gearEquippedShieldFlexibility"];

	getAttrs(skill_attrs, function (v) {
		var update = {};
		let armorFlexibility = isNaN(parseInt(v["gearEquippedArmorFlexibility"])) ? 0 : parseInt(v["gearEquippedArmorFlexibility"]);
		armorFlexibility += isNaN(parseInt(v["gearEquippedShieldFlexibility"])) ? 0 : parseInt(v["gearEquippedShieldFlexibility"]);
		armorFlexibility += isNaN(parseInt(v["globalArmorFlexibility"])) ? 0 : parseInt(v["globalArmorFlexibility"]);
		if (armorFlexibility > 0) {
			armorFlexibility = 0;
		}
		console.log ("armorFlexibility: " + armorFlexibility);
		update["ac_totalArmorFlexibility"] = armorFlexibility;
		setAttrs(update, {
			silent: true
		}, function () {
			update_skills_by_ability_score("strength");
			update_skills_by_ability_score("dexterity");
		});

	});
}

var move_inventory_gear = function (sourceId, repeatingTarget) {
	var update = {};
	var attr_fields = [sourceId + "_itemcount",
		sourceId + "_itemname",
		sourceId + "_itemweight",
		sourceId + "_itemcontent",
		sourceId + "_itemCategory",
		sourceId + "_itemPrefab",
		sourceId + "_itemclass",
		sourceId + "_itemMainMaterial"
	];

	if (repeatingTarget == "repeating_inventorystorage") {
		attr_fields.push("npc");
	}

	getAttrs(attr_fields, function (v) {

		var newrowid = repeatingTarget + "_" + generateRowID();

		// mandatory fields
		update[newrowid + "_itemcount"] = v[sourceId + "_itemcount"];
		update[newrowid + "_itemname"] = v[sourceId + "_itemname"];
		update[newrowid + "_itemweight"] = v[sourceId + "_itemweight"];
		update[newrowid + "_itemcontent"] = v[sourceId + "_itemcontent"];
		update[newrowid + "_itemCategory"] = v[sourceId + "_itemCategory"];

		// optional fields
		if (v[sourceId + "_itemPrefab"] != "") {
			update[newrowid + "_itemPrefab"] = v[sourceId + "_itemPrefab"];
		}
		if (v[sourceId + "_itemclass"] != "") {
			update[newrowid + "_itemclass"] = v[sourceId + "_itemclass"];
		}
		if (v[sourceId + "_itemMainMaterial"] != "") {
			update[newrowid + "_itemMainMaterial"] = v[sourceId + "_itemMainMaterial"];
		}

		// npc only field
		if (repeatingTarget == "repeating_inventorystorage" && v["npc"] == "1" && !isNaN(parseInt(v[sourceId + "_itemcontent"]))) {
			update[newrowid + "_itemvalue"] = v[sourceId + "_itemcontent"];
		}
		update[newrowid + "_options-flag"] = 0;

		setAttrs(update, {
			silent: true
		}, removeRepeatingRow(sourceId));
	});
}

// Gear: Blueprints

var search_blueprint_from_database = function (blueprintName, blueprintId) {
	var update = {};
	let repeatingSection = "repeating_gearCrafting";

	let blueprintSearch = SearchBlueprintNames(blueprintName);
	if (blueprintSearch.length == 1) {
		update_blueprint_from_database(blueprintSearch[0].name, blueprintSearch[0].source, blueprintId);
	}
	setAttrs(update, {
		silent: true
	});
}

var get_blueprint_from_search_value = function (searchIndex, blueprintId) {

	var repeatingSection = "repeating_gearCrafting";

	getAttrs([GetSectionIdName(repeatingSection, blueprintId, "craftingsearch" + searchIndex), GetSectionIdName(repeatingSection, blueprintId, "craftingsearchtype" + searchIndex)], function (v) {
		update_blueprint_from_database(v[GetSectionIdName(repeatingSection, blueprintId, "craftingsearch" + searchIndex)],
			v[GetSectionIdName(repeatingSection, blueprintId, "craftingsearchtype" + searchIndex)], 
			blueprintId);
	});

}

var update_blueprint_from_database = function (blueprintName, blueprintType, blueprintId) {
	console.log("SETTING BLUEPRINT " + `${blueprintName} (${blueprintType})`);

	var repeatingSection = "repeating_gearCrafting";

	var objectData = {};
	var craftingType = "";
	switch(blueprintType) {
		case "weapon":
			objectData = GetItemWeaponInfo(blueprintName);
			craftingType = "blueprint";
			if (objectData.type == "Ammunition") {
				blueprintType = "ammo";
			}
		break;
		case "armor":
			objectData = GetItemArmorInfo(blueprintName);
			craftingType = "blueprint";
		break;
		case "gear":
			objectData = GetItemGearInfo(blueprintName);
			craftingType = "blueprint";
		break;
		case "consumable":
			objectData = GetItemConsumableInfo(blueprintName);
			craftingType = "recipe";
		break;
	}

	if (objectData.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingname")] = objectData.name;
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingtype")] = craftingType;
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemtype")] = blueprintType;
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemdesc")] = objectData.desc;
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingcount")] = objectData.blueprints.count;

		switch(blueprintType) {
			case "weapon":
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemCategory")] = objectData.type;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemGroup")] = objectData.group;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemDamage")] = objectData.damage;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemDamageType")] = objectData.damageType;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemProperties")] = objectData.properties;
			break;
			case "armor":
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemCategory")] = itemData.type;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemAC")] = itemData.ac;
			break;
		}

		switch (craftingType) {
			case "blueprint":
				let blueprintComponents = objectData.blueprints.components;
				let materialData = {};
				let sizeData = GetCraftingSizes();
				let sizeInfo = {};
				let effort = 0;

				// get the full name
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingaddmaterialname")] = "1";
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingfullname")] = get_blueprint_fullname(objectData.name, blueprintComponents[0].material, "1");

				for (let i = 0; i < 5; i++) {
					if (i < blueprintComponents.length) {
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentname" + i)] = blueprintComponents[i].component;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenttype" + i)] = blueprintComponents[i].type;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial" + i + "Rule")] = getBlueprintCraftRuleInfo(blueprintComponents[i].rule).name;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmotes" + i)] = blueprintComponents[i].quantity;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + i)] = blueprintComponents[i].aspects;

						for (let j = 0; j < sizeData.length; j++) {
							if (blueprintComponents[i].quantity <= sizeData[j].motes) {
								sizeInfo = GetCraftingSizeInfo(sizeData[j].name);
								if (sizeInfo.name != "") {
									update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentsize" + i)] = sizeInfo.name.toLowerCase();
								}
							}
						}

						effort = CalculateBlueprintEffort(isNaN(blueprintComponents[i].quantity) ? 0 : blueprintComponents[i].quantity, blueprintComponents[i].aspects, GetCraftingSizes(), GetCraftingAspects());
						effort = isNaN(effort) ? 0 : effort;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenteffort" + i)] = effort;

						// set material data
						materialData = GetItemMaterialInfo(blueprintComponents[i].material);
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial" + i)] = materialData.name;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskillfull" + i)] = materialData.skills.split(",")[0].trim();
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskill" + i)] = ConvertSkillToValue(materialData.skills.split(",")[0].trim());

						if (i == 0) {
							switch(blueprintType) {
								case "weapon":
									update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemElement")] = materialData.element;
									update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemEnhancement")] = materialData.wpnBonus;
								break;
								case "armor":
									update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemEnhancement")] = materialData.defBonus;
									let flexibility = parseInt(objectData.skill) + parseInt(materialData.defBonus);
									if (flexibility > 0) {
										flexibility = 0;
									}
									update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemSkill")] = flexibility;
								break;
							}
						}
					}
					else {
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentname" + i)] = "";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenttype" + i)] = "M";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial" + i + "Rule")] = "";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmotes" + i)] = "0";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + i)] = "";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenteffort" + i)] = "0";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial" + i)] = "Steel";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskillfull" + i)] = "Shape Metal";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskill" + i)] = "shapemetal";
					}
				}
			break;
		}

		setAttrs(update, {
			silent: true
		}, function() {
			update_blueprint_craft_state(blueprintId);
		});
	}
}

var update_blueprint_name = function(blueprintId) {

	var repeatingSection = "repeating_gearCrafting";

	let mod_attrs = GetSectionIdValues([blueprintId], repeatingSection, ["craftingname", "craftingtype", "craftingcomponentmaterial0", "craftingaddmaterialname"]);

	getAttrs(mod_attrs, function (v) {
		var update = {};
		switch(v[GetSectionIdName(repeatingSection, blueprintId, "craftingtype")]) {
			case "blueprint":
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingfullname")] = get_blueprint_fullname(
					v[GetSectionIdName(repeatingSection, blueprintId, "craftingname")], 
					v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial0")], 
					v[GetSectionIdName(repeatingSection, blueprintId, "craftingaddmaterialname")]);
			break;
			default:
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingfullname")] = v[GetSectionIdName(repeatingSection, blueprintId, "craftingname")];
			break;
		}

		setAttrs(update, {
			silent: true
		});
	});
}

var get_blueprint_fullname = function(base, material, addMaterialToName) {

	if (addMaterialToName != undefined && addMaterialToName == "1") {
		return `${material} ${base}`;
	}

	return base;
}

var update_blueprint_skill = function(material, componentIndex, blueprintId) {
	console.log("SETTING SKILL FOR COMPONENT MATERIAL " + material);

	var repeatingSection = "repeating_gearCrafting";
	var update = {};

	materialData = GetItemMaterialInfo(material);
	update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskillfull" + componentIndex)] = materialData.skills.split(",")[0].trim();
	update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskill" + componentIndex)] = ConvertSkillToValue(materialData.skills.split(",")[0].trim());

	setAttrs(update, {
		silent: true
	});
}

var update_blueprint_component_motes = function (size, componentIndex, blueprintId) {
	console.log("SETTING MOTES FOR COMPONENT SIZE " + size);
	var repeatingSection = "repeating_gearCrafting";
	
	let sizeInfo = GetCraftingSizeInfo(size);
	if (sizeInfo.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmotes" + componentIndex)] = sizeInfo.motes;
		setAttrs(update, {
			silent: true
		}, function() {
			update_blueprint_craft_state(blueprintId);
		});
	}
}

var update_blueprint_component_size = function (motes, componentIndex, blueprintId) {
	console.log("SETTING SIZE FOR COMPONENT MOTES " + motes);
	var repeatingSection = "repeating_gearCrafting";

	let sizeData = GetCraftingSizes();
	let size = "";
    for (let i = 0; i < sizeData.length; i++) {
        if (motes <= sizeData[i].motes) {
			size = sizeData[i].name;
			break;
		}
    }
	
	let sizeInfo = GetCraftingSizeInfo(size);
	if (sizeInfo.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentsize" + componentIndex)] = sizeInfo.name.toLowerCase();
		setAttrs(update, {
			silent: true
		}, function() {
			update_blueprint_craft_state(blueprintId);
		});
	}
}

var update_blueprint_component_aspectList = function (componentIndex, blueprintId) {
	console.log("ADDING ASPECT TO COMPONENT " + componentIndex);
	var repeatingSection = "repeating_gearCrafting";

	let blueprint_attrs = [GetSectionIdName(repeatingSection, blueprintId, "craftingaspectlist" + componentIndex),
		GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + componentIndex)
	];
	
	getAttrs(blueprint_attrs, function (v) {

		let list = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + componentIndex)];
		let aspect = v[GetSectionIdName(repeatingSection, blueprintId, "craftingaspectlist" + componentIndex)];
		if (list.indexOf(aspect) == -1) {
			var update = {};
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + componentIndex)] = list + (list == "" ? "" : ", ") + aspect;
			setAttrs(update);
		}
	});
}

var update_blueprint_craft_state = function (blueprintId) {

	var repeatingSection = "repeating_gearCrafting";

	let mod_attrs = GetSectionIdValues([blueprintId], repeatingSection, ["craftingname"]);
	for (let i = 0; i < 5; i++) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues([blueprintId], repeatingSection,
			[`craftingcomponenttype${i}`, `craftingcomponentmotes${i}`, `craftingcomponentaspects${i}`, `craftingcomponentmaterial${i}`, `craftingcomponentskill${i}`, `craftingcomponentskillfull${i}`]));
	}
	
	getAttrs(mod_attrs, function (v) {
		console.log(`SETTING BLUEPRINT ${v[GetSectionIdName(repeatingSection, blueprintId, "craftingname")]} INFO`);

		var update = {};
		let materialCounts = {};
		let materialCountNames = [];
		let goodsCounts = {};
		let goodsCountNames = [];
		let blueprintComponents = [];
		let blueprintComponent = {};

		// iterate through each component
		let arbitraryLimit = 5;
		let type = "";
		let motes = 0;
		let effort = 0;
		let aspects = "";
		let material = "";
		let check = "";
		let checkfull = "";
		for (let i = 0; i < arbitraryLimit; i++) {
			type = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenttype" + i)];
			motes = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmotes" + i)];
			motes = isNaN(parseInt(motes)) ? 0 : parseInt(motes);
			effort = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenteffort" + i)];
			effort = isNaN(parseInt(effort)) ? 0 : parseInt(effort);
			aspects = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentaspects" + i)];
			material = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial" + i)];
			check = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskill" + i)];
			checkfull = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentskillfull" + i)];
			blueprintComponent = {
				component: "",
				rule: "",
				type: type,
				quantity: motes,
				aspects: aspects,
				material: material,
				skill: check,
				skillName: checkfull
			};

			// add to the material counts
			switch(type) {
				case "M":
					if (!materialCountNames.includes(material)) {
						materialCountNames.push(material);
						materialCounts[material] = {
							name: material,
							count: 0
						};
					}
					materialCounts[material].count += motes;
				break;
				case "I":
					if (!goodsCountNames.includes(material)) {
						goodsCountNames.push(material);
						goodsCounts[material] = {
							name: material,
							count: 0
						};
					}
					goodsCounts[material].count += motes;
					blueprintComponent.skill = "";
				break;
				case "E":
					blueprintComponent.skill = "engineering";
					blueprintComponent.skillName = "Engineering";
				break;
			}

			blueprintComponents.push(blueprintComponent);
		}

		// calculate the item's crafting stats
		blueprintComponents = UpdateBlueprintCraftingData(blueprintComponents);
		let craftingSummary = GetCraftingSummary(blueprintComponents);

		let check_attrs = [];
		for (let i = 0; i < craftingSummary.skills.length; i++) {
			check_attrs.push(craftingSummary.skills[i] + "_mod");
		}
		getAttrs(check_attrs, function (checks) {

			update[GetSectionIdName(repeatingSection, blueprintId, "craftingId")] = blueprintId;
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemweight")] = craftingSummary.weight;
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemvalueResource")] = craftingSummary.baseCost.toLocaleString() + " CP";
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemvalueEffort")] = craftingSummary.effortCost.toLocaleString() + " CP";
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingitemvalueTotal")] = craftingSummary.totalCost.toLocaleString() + " CP";
			
			// create the materials section
			let materialsIncrementer = 0;
			for (let i = 0; i < materialCountNames.length; i++) {
				if (materialCounts[materialCountNames[i]].count > 0) {
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterial" + materialsIncrementer)] = materialCountNames[i];
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialtype" + materialsIncrementer)] = "material";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialresult" + materialsIncrementer)] = "";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialquantity" + materialsIncrementer)] = materialCounts[materialCountNames[i]].count;
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingConsume" + materialsIncrementer)] = 0;
					materialsIncrementer++;
					if (materialsIncrementer >= arbitraryLimit) {
						break;
					}
				}
			}

			if (materialsIncrementer < arbitraryLimit) {
				for (let i = 0; i < goodsCountNames.length; i++) {
					if (goodsCounts[goodsCountNames[i]].count) {
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterial" + materialsIncrementer)] = goodsCountNames[i];
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialtype" + materialsIncrementer)] = "goods";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialresult" + materialsIncrementer)] = "";
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialquantity" + materialsIncrementer)] = goodsCounts[goodsCountNames[i]].count;
						update[GetSectionIdName(repeatingSection, blueprintId, "craftingConsume" + materialsIncrementer)] = 0;
						materialsIncrementer++;
						if (materialsIncrementer >= arbitraryLimit) {
							break;
						}
					}
				}
			}
			while (materialsIncrementer < arbitraryLimit) {
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterial" + materialsIncrementer)] = "";
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialtype" + materialsIncrementer)] = "material";
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialresult" + materialsIncrementer)] = "";
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialquantity" + materialsIncrementer)] = 0;
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingConsume" + materialsIncrementer)] = 0;
				materialsIncrementer++;
			}
			
			// create the checks section
			for (let i = 0; i < arbitraryLimit; i++) {
				if (i < craftingSummary.blueprint.length) {
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenteffort" + i)] = craftingSummary.blueprint[i].totalEffort;
				}
				else {
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponenteffort" + i)] = "0";
				}

				if (i < craftingSummary.skills.length && craftingSummary.skills[i] != "" && craftingSummary.effort[craftingSummary.skills[i]] > 0) {
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheck" + i)] = craftingSummary.skills[i];
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckmod" + i)] = checks[craftingSummary.skills[i] + "_mod"];
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckname" + i)] = craftingSummary.skillNames[i];
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckprogress" + i)] = "0";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckprogressmax" + i)] = craftingSummary.effort[craftingSummary.skills[i]];
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingCheckComplete" + i)] = "0";
				}
				else {
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheck" + i)] = "";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckname" + i)] = "";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckmod" + i)] = "0";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckprogress" + i)] = "0";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckprogressmax" + i)] = "0";
					update[GetSectionIdName(repeatingSection, blueprintId, "craftingCheckComplete" + i)] = "1";
				}
			}

			setAttrs(update, {
				silent: true
			});
		});
	});
}

var reset_crafting = function (blueprintId) {
	var repeatingSection = "repeating_gearCrafting";

	let mod_attrs = [];
	for (let i = 0; i < 5; i++) {
		mod_attrs.push(GetSectionIdName(repeatingSection, blueprintId, "craftingcheck" + i));
	}

	getAttrs(mod_attrs, function (v) {
		var update = {};

		update[GetSectionIdName(repeatingSection, blueprintId, "craftingConsumeAll")] = "0";
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingcomplete")] = "0";
		update[GetSectionIdName(repeatingSection, blueprintId, "craftingAddItem")] = "0";
		for (let i = 0; i < 5; i++) {
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingmaterialresult" + i)] = "";
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingcheckprogress" + i)] = "0";
			update[GetSectionIdName(repeatingSection, blueprintId, "craftingConsume" + i)] = "0";

			if (v[GetSectionIdName(repeatingSection, blueprintId, "craftingcheck" + i)] == "") {
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingCheckComplete" + i)] = "1";
			}
			else {
				update[GetSectionIdName(repeatingSection, blueprintId, "craftingCheckComplete" + i)] = "0";
			}
		}

		setAttrs(update, {
			silent: true
		});
	});
}

var spend_crafting_resources = function (resourceIndices, blueprintId) {
	
	var repeatingCrafting = "repeating_gearCrafting";
	var repeatingDust = "repeating_geardust";
	var repeatingGoods = "repeating_geargoods";

	let mod_attrs = [];
	for (let i = 0; i < resourceIndices.length; i++) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues([blueprintId], repeatingCrafting,
			[`craftingmaterial${resourceIndices[i]}`, `craftingmaterialtype${resourceIndices[i]}`, `craftingmaterialquantity${resourceIndices[i]}`]));
	}

	getSectionIDs(repeatingDust, function (dustIdArray) {
		getSectionIDs(repeatingGoods, function (goodsIdArray) {
			mod_attrs = mod_attrs.concat(GetSectionIdValues(dustIdArray, repeatingDust, ["itemname", "itemcount"]));
			mod_attrs = mod_attrs.concat(GetSectionIdValues(goodsIdArray, repeatingGoods, ["itemname", "itemcount"]));
	
			getAttrs(mod_attrs, function (v) {

				var update = {};

				// create a dictionary of each available dust and good
				let dustDictionary = {};
				_.each(dustIdArray, function (id) {
					dustDictionary[v[GetSectionIdName(repeatingDust, id, "itemname")]] = id;
				});
				let goodsDictionary = {};
				_.each(goodsIdArray, function (id) {
					goodsDictionary[v[GetSectionIdName(repeatingGoods, id, "itemname")]] = id;
				});

				let material = "";
				let type = "";
				let quantity = 0;
				let resourceCount = 0;
				for (let i = 0; i < resourceIndices.length; i++) {
					material = v[GetSectionIdName(repeatingCrafting, blueprintId, `craftingmaterial${resourceIndices[i]}`)];
					type = v[GetSectionIdName(repeatingCrafting, blueprintId, `craftingmaterialtype${resourceIndices[i]}`)];
					quantity = v[GetSectionIdName(repeatingCrafting, blueprintId, `craftingmaterialquantity${resourceIndices[i]}`)];
					quantity = isNaN(parseInt(quantity)) ? 1 : parseInt(quantity);

					console.log(`COMSUMING ${quantity} ${material}`);
					if (material != undefined && material != "") {
						switch(type) {
							case "material":
								if (dustDictionary[material] != undefined) {
									resourceCount = v[GetSectionIdName(repeatingDust, dustDictionary[material], "itemcount")];
									resourceCount = isNaN(parseInt(resourceCount)) ? 1 : parseInt(resourceCount);
									if (resourceCount >= quantity) {
										update[GetSectionIdName(repeatingDust, dustDictionary[material], "itemcount")] = resourceCount - quantity;
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
									}
									else {
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingmaterialresult" + resourceIndices[i])] = `There is not enough ${material} in your Dust.`;
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
									}
								}
								else {
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingmaterialresult" + resourceIndices[i])] = `The material ${material} does not exist in your Dust.`;
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
								}
							break;
							case "goods":
								if (goodsDictionary[material] != undefined) {
									resourceCount = v[GetSectionIdName(repeatingGoods, goodsDictionary[material], "itemcount")];
									resourceCount = isNaN(parseInt(resourceCount)) ? 1 : parseInt(resourceCount);
									if (resourceCount >= quantity) {
										update[GetSectionIdName(repeatingGoods, goodsDictionary[material], "itemcount")] = resourceCount - quantity;
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
									}
									else {
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingmaterialresult" + resourceIndices[i])] = `There is not enough ${material} in your Goods.`;
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
										update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
									}
								}
								else {
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingmaterialresult" + resourceIndices[i])] = `The material ${material} does not exist in your Goods.`;
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsume" + resourceIndices[i])] = "1";
									update[GetSectionIdName(repeatingCrafting, blueprintId, "craftingConsumeAll")] = "1";
								}
							break;
						}
					}
				}

				setAttrs(update, {
					silent: true
				});
			});
		});
	});

}

// Gear: Add Items

var add_crafted_object = function (blueprintId) {

	var repeatingSection = "repeating_gearCrafting";

	let mod_attrs = GetSectionIdValues([blueprintId], repeatingSection, ["craftingfullname", "craftingitemtype", "craftingcount", "craftingitemweight", "craftingitemdesc", "craftingcomponentmaterial0", "craftingitemCategory", "craftingitemEnhancement", "craftingitemGroup", "craftingitemDamage", "craftingitemDamageType", "craftingitemElement", "craftingitemProperties", "craftingitemAC", "craftingitemSkill"]);
	
	getAttrs(mod_attrs, function (v) {
		console.log(`ADDING ITEM ${v[GetSectionIdName(repeatingSection, blueprintId, "craftingfullname")]} TO SHEET`);

		let itemData = GetItemDataObject();
		itemData.name = v[GetSectionIdName(repeatingSection, blueprintId, "craftingfullname")];
		itemData.type = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemtype")];
		itemData.quantity = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcount")];
		itemData.weight = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemweight")];
		itemData.desc = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemdesc")];

		switch (itemData.type) {
			case "weapon":
				itemData.mainMaterial = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial0")];
				itemData.category = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemCategory")];
				itemData.enhancement = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemEnhancement")];

				itemData.group = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemGroup")];
				itemData.damage = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemDamage")];
				itemData.damageType = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemDamageType")];
				itemData.element = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemElement")];
				itemData.properties = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemProperties")];
			break;
			case "armor":
				itemData.mainMaterial = v[GetSectionIdName(repeatingSection, blueprintId, "craftingcomponentmaterial0")];
				itemData.category = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemCategory")];
				itemData.enhancement = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemEnhancement")];

				itemData.armor = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemAC")];
				itemData.skillPenalty = v[GetSectionIdName(repeatingSection, blueprintId, "craftingitemSkill")];
			break;
		}

		add_item_to_sheet(itemData);
	});
}

var add_item_to_sheet = function(itemData) {

	let repeatingSection = "";
	switch(itemData.type) {
		case "weapon": 
			repeatingSection = "repeating_gearweapons"; 
			add_item_to_item_group(repeatingSection, itemData);
		break;
		case "armor": 
			if (itemData.category.toLowerCase() == "shield") {
				repeatingSection = "repeating_gearshields"; 
			}
			else {
				repeatingSection = "repeating_geararmor"; 
			}
			add_item_to_item_group(repeatingSection, itemData);
		break;
		case "ammunition": repeatingSection = "repeating_gearAmmunition"; break;
		case "gear": repeatingSection = "repeating_inventory"; break;
		case "consumable": repeatingSection = "repeating_gearConsumables"; break;
	}

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["itemname", "itemcount", "iteminstorage"]);

		getAttrs(mod_attrs, function (v) {
			var foundData = false;

			_.each(idarray, function (id) {
				// search for the item to see if it exists in the database already. If it does, add to the quantity
				if (!foundData 
					&& v[GetSectionIdName(repeatingSection, id, "itemname")] == itemData.name 
					&& v[GetSectionIdName(repeatingSection, id, "iteminstorage")] == "1") {
					foundData = true;
					let count = v[GetSectionIdName(repeatingSection, id, "itemcount")];
					count = isNaN(parseInt(count)) ? 0 : parseInt(count);
					count += itemData.quantity;

					var update = {};
					update[GetSectionIdName(repeatingSection, id, "itemcount")] = count;
					setAttrs(update, {
						silent: true
					});
				}
			});

			if (!foundData) {
				add_item_to_item_group(repeatingSection, itemData);
			}
		});
	});
}

var add_item_to_item_group = function(repeatingSection, itemData) {
	var update = {};
	
	let newRowId = generateRowID();
	update[GetSectionIdName(repeatingSection, newRowId, "itemname")] = itemData.name;
	update[GetSectionIdName(repeatingSection, newRowId, "itemcount")] = itemData.quantity;
	update[GetSectionIdName(repeatingSection, newRowId, "itemweight")] = itemData.weight;
	update[GetSectionIdName(repeatingSection, newRowId, "itemcontent")] = itemData.desc;
	update[GetSectionIdName(repeatingSection, newRowId, "options-flag")] = "0";

	switch (itemData.type) {
		case "weapon":
			update[GetSectionIdName(repeatingSection, newRowId, "itemEnhancement")] = itemData.enhancement;

			update[GetSectionIdName(repeatingSection, newRowId, "itemCategory")] = itemData.category;
			update[GetSectionIdName(repeatingSection, newRowId, "itemGroup")] = itemData.group;
			update[GetSectionIdName(repeatingSection, newRowId, "itemDamage")] = itemData.damage;
			update[GetSectionIdName(repeatingSection, newRowId, "itemDamageType")] = itemData.damageType;
			update[GetSectionIdName(repeatingSection, newRowId, "itemElement")] = itemData.element;
			update[GetSectionIdName(repeatingSection, newRowId, "itemProperties")] = itemData.properties;
		break;
		case "armor":
			update[GetSectionIdName(repeatingSection, newRowId, "itemEnhancement")] = itemData.enhancement;

			update[GetSectionIdName(repeatingSection, newRowId, "itemCategory")] = itemData.category;
			update[GetSectionIdName(repeatingSection, newRowId, "itemAC")] = itemData.armor;
			update[GetSectionIdName(repeatingSection, newRowId, "itemSkill")] = itemData.skillPenalty;
		break;
	}
	
	setAttrs(update, {
		silent: true
	});
}






// Skills: Base Skills

var update_skills_by_ability_score = function (abilityScore, callback) {

	var skill_attrs = ["skills_base-" + abilityScore, "skills_crafting-" + abilityScore, "skills_technical-" + abilityScore];

	getAttrs(skill_attrs, function (v) {
		var baseSkillsArray = v["skills_base-" + abilityScore].split(",").filter(n => n);
		var craftSkillsArray = v["skills_crafting-" + abilityScore].split(",").filter(n => n);
		var techSkillsArray = v["skills_technical-" + abilityScore].split(",").filter(n => n);

		update_skills(baseSkillsArray.concat(craftSkillsArray).concat(techSkillsArray), callback);
	});

}

var update_all_skills = function (callback) {
	update_skills(GetSkillProficiencyTypes(), callback);
}

var update_skills = function (skillArray, callback) {

	var skill_attrs = ["pb", "strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod", "ac_totalArmorFlexibility"];

	_.each(skillArray, function (skill) {
		skill_attrs.push("skillproficiency-" + skill, "skillabilityscore-" + skill, "skillmod-" + skill, "skillspecs-" + skill);
	});

	getAttrs(skill_attrs, function (v) {
		var update = {};
		let prof = 0;
		let proficiency = 0;
		let abilityScore = 0;
		let specArray = "";
		let armorFlexibility = isNaN(parseInt(v["ac_totalArmorFlexibility"])) ? 0 : parseInt(v["ac_totalArmorFlexibility"]);

		_.each(skillArray, function (skill) {

			// determine proficiency
			console.log("UPDATING SKILL: " + skill);
			proficiency = GetProfRankBonus(v["skillproficiency-" + skill], false, v["pb"]);
			prof = proficiency;
			prof += isNaN(parseInt(v["skillmod-" + skill])) ? 0 : parseInt(v["skillmod-" + skill]);

			abilityScore = v["skillabilityscore-" + skill].toLowerCase();
			prof += isNaN(parseInt(v[abilityScore + "_mod"])) ? 0 : parseInt(v[abilityScore + "_mod"]);
			if (abilityScore == "strength" || abilityScore == "dexterity") {
				prof += armorFlexibility;
			}

			update[skill + "_mod"] = prof;

			specArray += v["skillspecs-" + skill];
		});

		if (callback != undefined) {
			setAttrs(update, {
				silent: true
			}, callback);
		} else {
			setAttrs(update, {
				silent: true
			}, function () {
				update_specializations(specArray.split(",").filter(n => n));
				update_knowledge_skills();
				update_all_language_skills();
			});
		}

	});
}

var update_skill_base_ability_score = function (prevValue, newValue, skill, skillType) {
	console.log("UPDATING BASE ABILITY SCORE FOR " + skill);
	var skill_attrs = ["skills_" + skillType + "-" + prevValue, "skills_" + skillType + "-" + newValue];

	getAttrs(skill_attrs, function (v) {
		var update = {};

		var newPrevValue = v["skills_" + skillType + "-" + prevValue];
		if (newPrevValue.indexOf(skill + ",") >= 0) {
			let index = newPrevValue.indexOf(skill + ",");
			let len = skill.length + 1;
			newPrevValue = newPrevValue.substr(0, index) + newPrevValue.substr(index + len);
			console.log("setting skills_" + skillType + "-" + prevValue + " from " + v["skills_" + skillType + "-" + prevValue] + " to " + newPrevValue);
		} else if (newPrevValue.indexOf(skill) >= 0) {
			let index = newPrevValue.indexOf(skill);
			let len = skill.length;
			newPrevValue = newPrevValue.substr(0, index) + newPrevValue.substr(index + len);
			console.log("setting skills_" + skillType + "-" + prevValue + " from " + v["skills_" + skillType + "-" + prevValue] + " to " + newPrevValue);
		}
		update["skills_" + skillType + "-" + prevValue] = newPrevValue;

		// update the new value
		update["skills_" + skillType + "-" + newValue] = v["skills_" + skillType + "-" + newValue] + skill + ",";
		console.log("setting skills_" + skillType + "-" + newValue + " from " + v["skills_" + skillType + "-" + newValue] + " to " + v["skills_" + skillType + "-" + newValue] + skill + ",");

		setAttrs(update, {
			silent: true
		}, function () {
			update_skills([skill]);
		});
	});
}

var update_all_skill_specializations = function (callback) {
	update_specializations(GetSkillSpecializationTypes(), callback);
}

var update_specializations = function (skillArray, callback) {

	var skill_attrs = [];

	_.each(skillArray, function (skill) {
		skill_attrs.push("skillspecproficiency-" + skill, "skillspecbase-" + skill, "skillspecmod-" + skill);
	});

	getAttrs(skill_attrs, function (v) {

		var prof_attribs = [];
		var profs_added = [];

		_.each(skillArray, function (skill) {

			if (!profs_added.includes(v["skillspecbase-" + skill])) {
				profs_added.push(v["skillspecbase-" + skill]);
				prof_attribs.push(v["skillspecbase-" + skill] + "_mod");
			}
		});

		getAttrs(prof_attribs, function (p) {

			var update = {};
			let prof = 0;
			let baseSkillArray = [];

			_.each(skillArray, function (skill) {

				// determine proficiency
				console.log("UPDATING Specialization: " + skill);
				prof = GetProfRankBonus(v["skillspecproficiency-" + skill], true, 0);
				prof += isNaN(parseInt(v["skillspecmod-" + skill])) ? 0 : parseInt(v["skillspecmod-" + skill]);
				prof += isNaN(parseInt(p[v["skillspecbase-" + skill] + "_mod"])) ? 0 : parseInt(p[v["skillspecbase-" + skill] + "_mod"]);

				update[skill + "_mod"] = prof;

				// add to the base skill array
				if (!baseSkillArray.includes(v["skillspecbase-" + skill])) {
					baseSkillArray.push(v["skillspecbase-" + skill]);
				}
			});

			if (callback != undefined) {
				setAttrs(update, {
					silent: true
				}, callback);
			} else {
				setAttrs(update, {
					silent: true
				}, function () {
					update_skill_specialization_values(baseSkillArray);
					update_actions(skillArray);
					update_spell_info(skillArray);
				});
			}
		});
	});
}

var update_all_skills_specialization_values = function (callback) {
	update_skill_specialization_values(["acrobatics", "arcana", "athletics", "deception", "health", "insight", "intimidation", "investigation", "nature", "perception", "performance", "persuasion", "stealth", "survival", "thievery", "alchemy", "artistry", "brewing", "carving", "cooking", "leatherworking", "molding", "smithing", "tinkering", "weaving", "disabledevice", "disguise", "gathering", "medicine", "pilot"], callback);
}

var update_skill_specialization_values = function (skillArray) {

	let skill_attrs = [];

	_.each(skillArray, function (skill) {
		skill_attrs.push("skillspecs-" + skill);
	});

	getAttrs(skill_attrs, function (v) {
		var update = {};
		let specArray = "";

		_.each(skillArray, function (skill) {
			specArray += v["skillspecs-" + skill];
		});

		specArray = specArray.split(",");

		let spec_attrs = [];
		_.each(specArray, function (spec) {
			if (spec.trim() != "") {
				spec_attrs.push(spec + "_mod", "skillspecname-" + spec);
			}
		});

		getAttrs(spec_attrs, function (v2) {

			let specVals = "";
			let specNames = "";
			let specMod = 0;
			_.each(skillArray, function (skill) {
				console.log("UPDATING SKILL SPEC VALUES: " + skill);
				specVals = "";
				specNames = "";
				specArray = v["skillspecs-" + skill];
				specArray = specArray.split(",");
				_.each(specArray, function (spec) {
					if (spec.trim() != "") {
						specMod = 0;
						specMod = isNaN(parseInt(v2[spec + "_mod"])) ? 0 : parseInt(v2[spec + "_mod"]);
						specVals += `${specMod},`;
						specNames += `${v2["skillspecname-" + spec]},`;
					}
				});
				update["skillspecvals-" + skill] = specVals;
				update["skillspecnames-" + skill] = specNames;
			});
		
			setAttrs(update, {
				silent: true
			});
		});

	});
}

var update_specializations_base_skill = function (prevValue, newValue, skill) {
	console.log("UPDATING BASE SPECIALIZATION FOR " + skill);
	var skill_attrs = ["skillspecs-" + prevValue, "skillspecs-" + newValue];

	getAttrs(skill_attrs, function (v) {
		var update = {};

		var newPrevValue = v["skillspecs-" + prevValue];
		if (newPrevValue.indexOf(skill + ",") >= 0) {
			let index = newPrevValue.indexOf(skill + ",");
			let len = skill.length + 1;
			newPrevValue = newPrevValue.substr(0, index) + newPrevValue.substr(index + len);
			console.log("setting skillspecs-" + prevValue + " from " + v["skillspecs-" + prevValue] + " to " + newPrevValue);
		} else if (newPrevValue.indexOf(skill) >= 0) {
			let index = newPrevValue.indexOf(skill);
			let len = skill.length;
			newPrevValue = newPrevValue.substr(0, index) + newPrevValue.substr(index + len);
			console.log("setting skillspecs-" + prevValue + " from " + v["skillspecs-" + prevValue] + " to " + newPrevValue);
		}
		update["skillspecs-" + prevValue] = newPrevValue;

		// update the new value
		update["skillspecs-" + newValue] = v["skillspecs-" + newValue] + skill + ",";
		console.log("setting skillspecs-" + newValue + " from " + v["skillspecs-" + newValue] + " to " + v["skillspecs-" + newValue] + skill + ",");

		setAttrs(update, {
			silent: true
		}, function () {
			update_specializations([skill]);
		});
	});
}

var update_skill_proficiency_points = function() {
	let profArray = PrefixAttributeArray("skillproficiency-", GetSkillProficiencyTypes());
	profArray = profArray.concat(PrefixAttributeArray("skillspecproficiency-", GetSkillSpecializationTypes()));
	let maxProfArray = ["skillAncestryBonus", "skillBackgroundBonus", "skillClassBonus", "skillArchetypeBonus", "skillFeatBonus", "skillMiscBonus"];
	update_proficiency_points("skillPoints", profArray, maxProfArray);
}

// Skills: Knowledges

var update_knowledge_category = function(skillId, newValue) {
	console.log("UPDATING KNOWLEDGE PRESET");

	var repeatingSection = "repeating_skillKnowledges";
	var mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["skillknowledgepreset", "skillknowledgespeccat"]);

	if (newValue == "0") {
		getAttrs(mod_attrs, function (v) {
			update_knowledge_skill_preset(skillId, v[GetSectionIdName(repeatingSection, skillId, "skillknowledgepreset")]);
		});
	}
	else {
		getAttrs(mod_attrs, function (v) {
			update_knowledge_skill_specialization_preset(skillId, v[GetSectionIdName(repeatingSection, skillId, "skillknowledgespeccat")]);
		});
	}
}

var update_knowledge_skill_preset = function(skillId, newValue) {
	console.log("UPDATING KNOWLEDGE PRESET");

	var repeatingSection = "repeating_skillKnowledges";

	var knowledgeData = GetKnowledgeInfo(newValue);
	if (knowledgeData.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, skillId, "skillknowledgename")] = knowledgeData.name;
		update[GetSectionIdName(repeatingSection, skillId, "skillknowledgedesc")] = knowledgeData.desc;

		setAttrs(update, {
			silent: true
		}, function () {
			update_knowledge_skills();
		});
	}
}

var update_knowledge_skill_specialization_preset = function(skillId, newValue) {
	console.log("UPDATING KNOWLEDGE SPECIALIZATION CATEGORY");

	var repeatingSection = "repeating_skillKnowledges";

	var knowledgeData = GetKnowledgeInfo(newValue);
	if (knowledgeData.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, skillId, "skillknowledgespecdesc")] = knowledgeData.spec;
		update[GetSectionIdName(repeatingSection, skillId, "skillknowledgename")] = "";
		update[GetSectionIdName(repeatingSection, skillId, "skillknowledgedesc")] = knowledgeData.spec;

		setAttrs(update, {
			silent: true
		}, function () {
			update_knowledge_skills();
		});
	}
}
	
var update_knowledge_skills = function () {
	console.log("UPDATING KNOWLEDGES");

	var repeatingSection = "repeating_skillKnowledges";
	var mod_attrs = ["pb", "intelligence_mod", "wisdom_mod", "charisma_mod", "arcana_mod", "health_mod", "nature_mod"];

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["skillknowledgebase",
			"skillknowledgecat", "skillknowledgeproficiency", "skillknowledgemod", "skillknowledgename"
		]));

		getAttrs(mod_attrs, function (v) {
			var update = {};
			var mod = 0;
			var knowledgeSkillNames = "Arcana,Health,Nature,";
			var knowledgeSkillVals = `${v["arcana_mod"]},${v["health_mod"]},${v["nature_mod"]},`;
	
			_.each(idarray, function (id) {
				mod = 0;
	
				// add base skill
				if (v[GetSectionIdName(repeatingSection, id, "skillknowledgebase")]) {
					let skillBonus = parseInt(v[v[GetSectionIdName(repeatingSection, id, "skillknowledgebase")] + "_mod"]);
					console.log("skillBonus: " + skillBonus);
	
					if (!isNaN(skillBonus) && skillBonus != 0) {
						mod += skillBonus;
					}
				}
	
				// add skill modifiers
				let profBonus = GetProfRankBonus(v[GetSectionIdName(repeatingSection, id, "skillknowledgeproficiency")], true, 0);
				if (v[GetSectionIdName(repeatingSection, id, "skillknowledgecat")] == "1") {
					profBonus *= 2;
				}
				mod += profBonus;
				mod += isNaN(parseInt(v["pb"])) ? 2 : parseInt(v["pb"]);
	
				// add mod bonus
				let modBonus = v[GetSectionIdName(repeatingSection, id, "skillknowledgemod")];
				console.log("modBonus: " + modBonus);
				if (!isNaN(modBonus) && modBonus != 0) {
					mod += modBonus;
				}
	
				update[GetSectionIdName(repeatingSection, id, "recallknowledge_mod")] = mod;
				knowledgeSkillNames += v[GetSectionIdName(repeatingSection, id, "skillknowledgename")] + ",";
				knowledgeSkillVals += mod + ",";
			});

			// set the recall knowledge values
			update["subknowledgenames"] = knowledgeSkillNames;
			update["subknowledgevals"] = knowledgeSkillVals;
	
			setAttrs(update, {
				silent: true
			});
		});
	});
	
}

var update_knowledge_language_description = function(skillId, newValue) {
	console.log("UPDATING KNOWLEDGE PRESET");

	var repeatingSection = "repeating_skillLanguages";

	var languageData = GetLanguageInfo(newValue);
	if (languageData.name != "") {
		var update = {};
		update[GetSectionIdName(repeatingSection, skillId, "languagedesc")] = languageData.desc;

		setAttrs(update, {
			silent: true
		});
	}
}

var update_all_language_skills = function () {
	var repeatingSection = "repeating_skillLanguages";

	getSectionIDs(repeatingSection, function (idarray) {
		update_language_skills(idarray);
	});
}
	
var update_language_skills = function (idarray) {
	console.log("UPDATING LANGUAGES");

	var repeatingSection = "repeating_skillLanguages";
	var mod_attrs = ["pb", "intelligence_mod", "wisdom_mod", "charisma_mod"];
	mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["languageproficiency", "languagebase", "languagemod"]));

	getAttrs(mod_attrs, function (v) {
		var update = {};
		var mod = 0;

		_.each(idarray, function (id) {
			mod = 0;

			// add base skill
			if (v[GetSectionIdName(repeatingSection, id, "languagebase")]) {
				let skillBonus = parseInt(v[v[GetSectionIdName(repeatingSection, id, "languagebase")] + "_mod"]);
				console.log("skillBonus: " + skillBonus);

				if (!isNaN(skillBonus) && skillBonus != 0) {
					mod += skillBonus;
				}
			}

			// add skill modifiers
			let profBonus = GetProfRankBonus(v[GetSectionIdName(repeatingSection, id, "languageproficiency")], true, 0);
			mod += profBonus * 2;
			mod += isNaN(parseInt(v["pb"])) ? 2 : parseInt(v["pb"]);

			// add mod bonus
			let modBonus = v[GetSectionIdName(repeatingSection, id, "languagemod")];
			console.log("modBonus: " + modBonus);
			if (!isNaN(modBonus) && modBonus != 0) {
				mod += modBonus;
			}

			update[GetSectionIdName(repeatingSection, id, "language_mod")] = mod;
		});

		setAttrs(update, {
			silent: true
		});
	});
}

var update_jack_attr = function () {
	var update = {};
	getAttrs(["jack_of_all_trades", "jack"], function (v) {
		if (v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0) {
			update["jack_bonus"] = "+" + v["jack"];
			update["jack_attr"] = "+" + v["jack"] + "@{pbd_safe}";
		} else {
			update["jack_bonus"] = "";
			update["jack_attr"] = "";
		}
		setAttrs(update, {
			silent: true
		});
	});
};






// Actions: Resources

var update_all_resource_ids = function () {
	var resourceAttrs = [];
	getSectionIDs("repeating_resources", function (idarray) {
		_.each(idarray, function (id) {
			resourceAttrs.push("repeating_resources_" + id + "_recoverstyle");
		});

		getAttrs(resourceAttrs, function (v) {
			var update = {};
			var all = "";
			var round = "";
			var brief = "";
			var short = "";
			var long = "";
			_.each(idarray, function (id) {
				all += id + ",";
				if (v["repeating_resources_" + id + "_recoverstyle"] == "Round") {
					round += id + ",";
					brief += id + ",";
					short += id + ",";
					long += id + ",";
				}else if (v["repeating_resources_" + id + "_recoverstyle"] == "Brief") {
					brief += id + ",";
					short += id + ",";
					long += id + ",";
				} else if (v["repeating_resources_" + id + "_recoverstyle"] == "Short") {
					short += id + ",";
					long += id + ",";
				} else if (v["repeating_resources_" + id + "_recoverstyle"] == "Long") {
					long += id + ",";
				}
			});
			all = all == "" ? "" : all.substring(0, all.length - 1);
			round = round == "" ? "" : round.substring(0, round.length - 1);
			brief = brief == "" ? "" : brief.substring(0, brief.length - 1);
			short = short == "" ? "" : short.substring(0, short.length - 1);
			long = long == "" ? "" : long.substring(0, long.length - 1);

			update["allResources"] = all;
			update["roundResources"] = round;
			update["briefRestResources"] = brief;
			update["shortRestResources"] = short;
			update["longRestResources"] = long;
			console.log("setting shortRestResources: " + short + " longRestResources: " + long);
			setAttrs(update, {
				silent: true
			});
		});
	});
}

var update_item_from_resource = function (resourceid, itemid) {
	var update = {};
	getAttrs(["repeating_resources_" + resourceid + "_resourcecount", "repeating_resources_" + resourceid + "_resourcename"], function (v) {
		update["repeating_inventory_" + itemid + "_itemcount"] = v["repeating_resources_" + resourceid + "_resourcecount"];
		update["repeating_inventory_" + itemid + "_itemname"] = v["repeating_resources_" + resourceid + "_resourcename"];
		setAttrs(update, {
			silent: true
		}, function () {
			update_weight()
		});
	});
};

var remove_resource = function (id) {
	removeRepeatingRow("repeating_resources_" + id);
};

// Actions: Unique Action Roll Update

var update_actions = function (update_id, updateList) {
	console.log("DOING UPDATE_ATTACKS: " + update_id);

	var repeatingSection = "repeating_customActions";

	if (!Array.isArray(update_id) && update_id.substring(0, 1) === "-" && update_id.length === 20) {
		do_update_action([update_id]);
		if (updateList) {
			// update the list of attack ids
			getSectionIDs(repeatingSection, function (idarray) {
				update_action_ids(idarray);
			});
		}
	} else {
		getSectionIDs(repeatingSection, function (idarray) {

			// update the list of attack ids
			update_action_ids(idarray);

			// determine which ids to add to the attacks update
			if (update_id === "all") {
				do_update_action(idarray);
			} else {
				var attack_attribs = GetSectionIdValues(idarray, repeatingSection, ["atkattr_base", "proficiency_group", "dmgattr", "dmg2attr", "savedc"]);

				getAttrs(attack_attribs, function (v) {

					var attr_attack_ids = [];
					_.each(idarray, function (id) {

						if (Array.isArray(update_id)) {
							_.each(update_id, function (item) {
								if ((v[GetSectionIdName(repeatingSection, id, "atkattr_base")] && v[GetSectionIdName(repeatingSection, id, "atkattr_base")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "proficiency_group")] && v[GetSectionIdName(repeatingSection, id, "proficiency_group")].toLowerCase().indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "dmgattr")] && v[GetSectionIdName(repeatingSection, id, "dmgattr")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "dmg2attr")] && v[GetSectionIdName(repeatingSection, id, "dmg2attr")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "savedc")] && v[GetSectionIdName(repeatingSection, id, "savedc")].indexOf(item) >= 0)
								) {
									attr_attack_ids.push(id);
								}
							});
						} else {
							if ((v[GetSectionIdName(repeatingSection, id, "atkattr_base")] && v[GetSectionIdName(repeatingSection, id, "atkattr_base")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "proficiency_group")] && v[GetSectionIdName(repeatingSection, id, "proficiency_group")].toLowerCase().indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "dmgattr")] && v[GetSectionIdName(repeatingSection, id, "dmgattr")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "dmg2attr")] && v[GetSectionIdName(repeatingSection, id, "dmg2attr")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "savedc")] && v[GetSectionIdName(repeatingSection, id, "savedc")].indexOf(update_id) >= 0)
							) {
								attr_attack_ids.push(id);
							}
						}
					});

					if (attr_attack_ids.length > 0) {
						do_update_action(attr_attack_ids);
					}
				});
			};
		});
	};
};

var do_update_action = function (attackArray) {

	var attack_attribs = ["spellcasting_ability"];

	var repeatingSection = "repeating_customActions";
	attack_attribs = attack_attribs.concat(GetSectionIdValues(attackArray, repeatingSection, [
		"atkname", "atkTargetStyle", "atkTraits", "atkActionCost", "atkConditionalsflag", "atkrange", "atkTrigger", "atkRequirement",
		"checkflag", "checkbase", "checkmod", "checkdef", "checkdefdc",
		"atkflag", "atkattr_base", "atkmod", "proficiency_group", "proficiency_customrank",
		"dmgflag", "dmgbase", "dmgattr", "dmgmod", "dmgtype", "dmgelement",
		"dmg2flag", "dmg2base", "dmg2attr", "dmg2mod", "dmg2type", "dmg2element",
		"atkspellpower", "hldmg",
		"atkCritSuccess", "atkSuccess", "atkFailure", "atkCritFailure",
		"atkOnCritSuccess", "atkOnSuccess", "atkOnFailure", "atkOnCritFailure",
		"spellmana", "ammo", "resource", "consumable", "atk_desc"
	]));

	getAttrs(attack_attribs, function (v) {
		var prof_attribs = ["pb", "character_name", "spell_power", "strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod"];
		var profs_added = ["strength", "dexterity", "constitution", + "intelligence", "wisdom", "charisma"];

		_.each(attackArray, function (id) {
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "atkattr_base")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "atkattr_base")]);
				prof_attribs.push(
					GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "atkattr_base")], v["spellcasting_ability"])
				);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "dmgattr")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "dmgattr")]);
				prof_attribs.push(
					GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "dmgattr")], v["spellcasting_ability"])
				);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "dmg2attr")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "dmg2attr")]);
				prof_attribs.push(
					GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "dmg2attr")], v["spellcasting_ability"])
				);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "proficiency_group")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "proficiency_group")]);
				prof_attribs.push(
					GetProficiencyAttr(v[GetSectionIdName(repeatingSection, id, "proficiency_group")])
				);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "checkbase")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "checkbase")]);
				prof_attribs.push(
					GetCheckAttr(v[GetSectionIdName(repeatingSection, id, "checkbase")])
				);
			}
		});

		getAttrs(prof_attribs, function (p) {

			var update = {};
			_.each(attackArray, function (id) {
				console.log("UPDATING ATTACK: " + v[GetSectionIdName(repeatingSection, id, "atkname")]);

				// variables
				var totalAttack = 0;
				var attackString = "";
				var damageString = "";
				var damage2String = "";
				var actionModString = "";

				// begin the action data
				var actionData = GetActionData();
				actionData.name = v[GetSectionIdName(repeatingSection, id, "atkname")];
				actionData.targetStyle = v[GetSectionIdName(repeatingSection, id, "atkTargetStyle")];
				actionData.actionCost = v[GetSectionIdName(repeatingSection, id, "atkActionCost")];

				actionData.traits = v[GetSectionIdName(repeatingSection, id, "atkTraits")];
				var traitsDb = GetTraitsDictionary(actionData.traits);
				for (var i = 0; i < 6; i++) {
					if (i < traitsDb.length) {
						update[GetSectionIdName(repeatingSection, id, "atkTrait" + i)] = traitsDb[i].name;
						update[GetSectionIdName(repeatingSection, id, "atkTrait" + i + "Desc")] = traitsDb[i].desc;
					} else {
						update[GetSectionIdName(repeatingSection, id, "atkTrait" + i)] = "";
						update[GetSectionIdName(repeatingSection, id, "atkTrait" + i + "Desc")] = "";
					}
				}

				// add desc
				actionData.description = v[GetSectionIdName(repeatingSection, id, "atk_desc")];

				if (v[GetSectionIdName(repeatingSection, id, "atkConditionalsflag")] == "1") {
					actionData.range = v[GetSectionIdName(repeatingSection, id, "atkrange")];
					actionData.trigger = v[GetSectionIdName(repeatingSection, id, "atkTrigger")];
					actionData.req = v[GetSectionIdName(repeatingSection, id, "atkRequirement")];
				}

				// add results
				actionData.critsuccess = v[GetSectionIdName(repeatingSection, id, "atkCritSuccess")];
				actionData.success = v[GetSectionIdName(repeatingSection, id, "atkSuccess")];
				actionData.failure = v[GetSectionIdName(repeatingSection, id, "atkFailure")];
				actionData.critfailure = v[GetSectionIdName(repeatingSection, id, "atkCritFailure")];
				actionData.onCritSuccess = v[GetSectionIdName(repeatingSection, id, "atkOnCritSuccess")];
				actionData.onSuccess = v[GetSectionIdName(repeatingSection, id, "atkOnSuccess")];
				actionData.onFailure = v[GetSectionIdName(repeatingSection, id, "atkOnFailure")];
				actionData.onCritFailure = v[GetSectionIdName(repeatingSection, id, "atkOnCritFailure")];

				// add resources
				actionData.mana = v[GetSectionIdName(repeatingSection, id, "spellmana")];
				actionData.ammo = v[GetSectionIdName(repeatingSection, id, "ammo")];
				actionData.resource = v[GetSectionIdName(repeatingSection, id, "resource")];
				actionData.consumable = v[GetSectionIdName(repeatingSection, id, "consumable")];

				// add checks
				if (v[GetSectionIdName(repeatingSection, id, "checkflag")] == "1") {

					if (v[GetSectionIdName(repeatingSection, id, "atkflag")] == "1") {
						actionModString = "";
						switch (v[GetSectionIdName(repeatingSection, id, "atkattr_base")]) {
							case "strength":
								totalAttack += isNaN(parseInt(p["strength_mod"])) ? 0 : parseInt(p["strength_mod"]);
								actionModString += totalAttack + "[Str]";
								break;
							case "dexterity":
								totalAttack += isNaN(parseInt(p["dexterity_mod"])) ? 0 : parseInt(p["dexterity_mod"]);
								actionModString += totalAttack + "[Dex]";
								break;
							case "constitution":
								totalAttack += isNaN(parseInt(p["constitution_mod"])) ? 0 : parseInt(p["constitution_mod"]);
								actionModString += totalAttack + "[Con]";
								break;
							case "intelligence":
								totalAttack += isNaN(parseInt(p["intelligence_mod"])) ? 0 : parseInt(p["intelligence_mod"]);
								actionModString += totalAttack + "[Int]";
								break;
							case "wisdom":
								totalAttack += isNaN(parseInt(p["wisdom_mod"])) ? 0 : parseInt(p["wisdom_mod"]);
								actionModString += totalAttack + "[Wis]";
								break;
							case "charisma":
								totalAttack += isNaN(parseInt(p["charisma_mod"])) ? 0 : parseInt(p["charisma_mod"]);
								actionModString += totalAttack + "[Cha]";
								break;
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "atkmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "atkmod")]) != 0) {
							let mod = parseInt(v[GetSectionIdName(repeatingSection, id, "atkmod")]);

							if (!isNaN(mod)) {
								if (actionModString != "") {
									actionModString += " + ";
								}
								totalAttack += mod;
								actionModString += mod + "[Mod]";
							}
						}

						// add proficiency
						if (v[GetSectionIdName(repeatingSection, id, "proficiency_group")]) {
							let profBonus = 0;
							if (v[GetSectionIdName(repeatingSection, id, "proficiency_group")] == "0") {
								profBonus = GetProfRankBonus(v[GetSectionIdName(repeatingSection, id, "proficiency_customrank")], false, v["pb"]);
							} else {
								var profGroup = v[GetSectionIdName(repeatingSection, id, "proficiency_group")];
								if (profGroup == undefined) {
									profGroup = 0;
								}
								profBonus = parseInt(p[GetProficiencyAttr(profGroup)]);
							}

							if (!isNaN(profBonus) && profBonus != 0) {
								totalAttack += profBonus;
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += profBonus + "[PB]";
							}
						}

						// set the string
						attackString = totalAttack > 0 ? "+" : "";
						attackString += totalAttack + " vs. AC;";
						attackString += actionData.range != "" ? " Range " + actionData.range : "";

						// set the actionData
						actionData.checkName = "Attack";
						actionData.checkRoll = true;
						actionData.checkMod = actionModString;
						actionData.checkDef = "AC";
					} else {
						actionModString = "";

						// add check
						if (v[GetSectionIdName(repeatingSection, id, "checkbase")]) {
							let checkBonus = parseInt(p[GetCheckAttr(v[GetSectionIdName(repeatingSection, id, "checkbase")])]);

							if (!isNaN(checkBonus) && checkBonus != 0) {
								totalAttack += checkBonus;
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += checkBonus + "[" + v[GetSectionIdName(repeatingSection, id, "checkbase")] + "]";
							}
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "checkmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "checkmod")]) != 0) {
							let mod = parseInt(v[GetSectionIdName(repeatingSection, id, "checkmod")]);

							if (!isNaN(mod)) {
								if (actionModString != "") {
									actionModString += " + ";
								}
								totalAttack += mod;
								actionModString += mod + "[Mod]";
							}
						}

						let checkDef = v[GetSectionIdName(repeatingSection, id, "checkdef")];
						if (checkDef == "0") {
							checkDef = "DC " + v[GetSectionIdName(repeatingSection, id, "checkdefdc")];
						}

						// set the string
						attackString = totalAttack > 0 ? "+" : "";
						attackString += totalAttack + " vs. " + checkDef + ";";
						attackString += actionData.range != "" ? " Range " + actionData.range : "";

						// set the actionData
						actionData.checkName = v[GetSectionIdName(repeatingSection, id, "checkbase")];
						if (v[GetSectionIdName(repeatingSection, id, "checkbase")] != "Save DC") {
							actionData.checkRoll = true;
						}
						actionData.checkMod = actionModString;
						actionData.checkDef = checkDef;
					}
				}

				// add damage
				if (v[GetSectionIdName(repeatingSection, id, "dmgflag")] == "1") {
					actionModString = "";
					let totalDamage = 0;
					let baseRoll = "";

					if (v[GetSectionIdName(repeatingSection, id, "dmgbase")]) {
						baseRoll = v[GetSectionIdName(repeatingSection, id, "dmgbase")];
						actionModString = baseRoll;
					}

					switch (v[GetSectionIdName(repeatingSection, id, "dmgattr")]) {
						case "strength":
							totalDamage += parseInt(p["strength_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Str]";
							break;
						case "dexterity":
							totalDamage += parseInt(p["dexterity_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Dex]";
							break;
						case "constitution":
							totalDamage += parseInt(p["constitution_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Con]";
							break;
						case "intelligence":
							totalDamage += parseInt(p["intelligence_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Int]";
							break;
						case "wisdom":
							totalDamage += parseInt(p["wisdom_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Wis]";
							break;
						case "charisma":
							totalDamage += parseInt(p["charisma_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Cha]";
							break;
					}

					// add mod
					if (v[GetSectionIdName(repeatingSection, id, "dmgmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "dmgmod")]) != 0) {
						if (actionModString != "") {
							actionModString += " + ";
						}
						totalDamage += parseInt(v[GetSectionIdName(repeatingSection, id, "dmgmod")]);
						actionModString += v[GetSectionIdName(repeatingSection, id, "dmgmod")] + "[Mod]";
					}

					actionData.dmg1flag = true;
					actionData.dmg1 = actionModString;
					actionData.crit1 = baseRoll;
					actionData.dmgtype1 = v[GetSectionIdName(repeatingSection, id, "dmgtype")];
					actionData.elem1 = v[GetSectionIdName(repeatingSection, id, "dmgelement")];

					// set the string
					damageString = baseRoll + (baseRoll != "" ? " + " : "") + totalDamage + " " + actionData.dmgtype1 + (actionData.elem1 != "" ? " (" + actionData.elem1 + ")" : "");

					if (v[GetSectionIdName(repeatingSection, id, "dmg2flag")] == "1") {
						actionModString = "";
						let totalDamage = 0;
						let baseRoll = "";

						if (v[GetSectionIdName(repeatingSection, id, "dmg2base")]) {
							baseRoll = v[GetSectionIdName(repeatingSection, id, "dmg2base")];
							actionModString = baseRoll;
						}

						switch (v[GetSectionIdName(repeatingSection, id, "dmg2attr")]) {
							case "strength":
								totalDamage += parseInt(p["strength_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Str]";
								break;
							case "dexterity":
								totalDamage += parseInt(p["dexterity_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Dex]";
								break;
							case "constitution":
								totalDamage += parseInt(p["constitution_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Con]";
								break;
							case "intelligence":
								totalDamage += parseInt(p["intelligence_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Int]";
								break;
							case "wisdom":
								totalDamage += parseInt(p["wisdom_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Wis]";
								break;
							case "charisma":
								totalDamage += parseInt(p["charisma_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Cha]";
								break;
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "dmg2mod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "dmg2mod")]) != 0) {
							if (actionModString != "") {
								actionModString += " + ";
							}
							totalDamage += parseInt(v[GetSectionIdName(repeatingSection, id, "dmg2mod")]);
							actionModString += v[GetSectionIdName(repeatingSection, id, "dmg2mod")] + "[Mod]";
						}

						actionData.dmg2flag = true;
						actionData.dmg2 = actionModString;
						actionData.crit2 = baseRoll;
						actionData.dmgtype2 = v[GetSectionIdName(repeatingSection, id, "dmg2type")];
						actionData.elem2 = v[GetSectionIdName(repeatingSection, id, "dmg2element")];

						// set the string
						damage2String = baseRoll + (baseRoll != "" ? " + " : "") + totalDamage + " " + actionData.dmgtype2 + (actionData.elem2 != "" ? " (" + actionData.elem2 + ")" : "");
					}

					if (v[GetSectionIdName(repeatingSection, id, "hldmg")] != "") {
						let power = parseInt(v[GetSectionIdName(repeatingSection, id, "atkspellpower")]);
						power = isNaN(power) ? 1 : power;
						let spellData = get_spell_power_query(v[GetSectionIdName(repeatingSection, id, "hldmg")], power, p["spell_power"]);
						actionData.hldmg = spellData.dmg;
						actionData.hldmgcrit = spellData.crit;
						actionData.baseLvl = power;
						actionData.castLvl = spellData.level;
					}
				}

				// update the strings
				update[GetSectionIdName(repeatingSection, id, "atkbonus")] = (totalAttack > 0 ? "+" : "") + totalAttack;
				update[GetSectionIdName(repeatingSection, id, "attackString")] = attackString;
				update[GetSectionIdName(repeatingSection, id, "damageString")] = damageString;
				update[GetSectionIdName(repeatingSection, id, "damage2String")] = damage2String;
				update[GetSectionIdName(repeatingSection, id, "rollbase")] = actionData.toRoll(p["character_name"]);
			});

			setAttrs(update, {
				silent: true
			});
		});
	});
};

var update_all_action_ids = function () {
	var repeatingSection = "repeating_customActions";
	getSectionIDs(repeatingSection, function (idarray) {
		update_action_ids(idarray);
	});

}

var update_action_ids = function (attackArray) {

	var update = {};
	var allAttackIds = "";
	_.each(attackArray, function (id) {
		allAttackIds += id + ",";
	});
	update["allAttackIds"] = allAttackIds;

	setAttrs(update, {
		silent: true
	});
}

// Actions: Spells

var update_class_spellcasting = function (callback) {
	console.log("UPDATING CLASS SPELLCASTING");

	var caster_attrs = ["spellcasting_ability", "intelligence_mod", "wisdom_mod", "charisma_mod", "pb",
		"spell_profrank-effect", "spell_profmod-effect",
		"spirit_profrank-effect", "spirit_profmod-effect", 
		"magicSpellforce", "magicWillpower", "magicKiCapacity", "spell_slot_bonus",
		"manaKiBonus", "manaSurgeBonus", "manaEtherBonus", "manaEssenceBonus"
	];

	getAttrs(caster_attrs, function (v) {
		var update = {};
		var spellforce = parseInt(v["magicSpellforce"]);
		var willpower = parseInt(v["magicWillpower"]);
		var kiCapacity = parseInt(v["magicKiCapacity"]);

		// determine spell power
		var spellpower = 1;
		if (spellforce >= 4) {
			spellpower = 2;
			let force = spellforce - 4;
			while (force >= 3) {
				spellpower++;
				force -= 3;
			}
		}
		update["spell_power"] = spellpower;

		// determine spell effect
		var spellProf = GetProfRankBonus(v["spell_profrank-effect"], false, v["pb"]);
		spellProf += isNaN(parseInt(v["spell_profmod-effect"])) ? 0 : parseInt(v["spell_profmod-effect"]);
		var spellTotal = spellProf + parseInt(v[v["spellcasting_ability"] + "_mod"]);
		update["spell_effect"] = spellTotal;
		update["spell_prof-effect"] = spellProf;

		// determine spirit effect
		var spiritProf = GetProfRankBonus(v["spirit_profrank-effect"], false, v["pb"]);
		spiritProf += isNaN(parseInt(v["spirit_profmod-effect"])) ? 0 : parseInt(v["spirit_profmod-effect"]);
		var spiritTotal = spiritProf + parseInt(spellTotal);
		update["spirit_effect"] = spiritTotal;
		update["spirit_prof-effect"] = spiritProf;

		// determine spell slots
		var spellSlots = 3 + (parseInt(v["intelligence_mod"]) > 0 ? (parseInt(v["intelligence_mod"]) * 2) : 0);
		spellSlots += (parseInt(willpower - 1) * 2);
		spellSlots += isNaN(parseInt(v["spell_slot_bonus"])) ? 0 : parseInt(v["spell_slot_bonus"]);
		update["spell_slots_max"] = spellSlots;

		// determine ki, surge, and ether
		var ki = 50 + (parseInt(v["charisma_mod"]) > 0 ? (parseInt(v["charisma_mod"]) * 50) : 0);
		if (spellforce > 1) {
			for(let i = 2; i <= spellforce; i++) {
				ki += i * 15;
			}
		}
		var surge = 30 + (parseInt(v["wisdom_mod"]) > 0 ? parseInt(v["wisdom_mod"]) * 30 : 0);
		var ether = 0;
		switch (v["spellcasting_ability"]) {
			case "intelligence":
				ki += (kiCapacity - 1) * 25;
				surge += (kiCapacity - 1) * 25;
				break;
			case "wisdom":
				ki += (kiCapacity - 1) * 20;
				surge += (kiCapacity - 1) * 10;
				ether = 50;
				if (kiCapacity >= 3) {
					ether += 5;
					let capacity = kiCapacity - 3;
					while (capacity >= 3) {
						ether += 5;
						capacity -= 3;
					}
				}
				break;
			case "charisma":
				ki += (kiCapacity - 1) * 40;
				surge += (kiCapacity - 1) * 10;
				break;
		}

		// add mods
		ki += isNaN(parseInt(v["manaKiBonus"])) ? 0 : parseInt(v["manaKiBonus"]);
		surge += isNaN(parseInt(v["manaSurgeBonus"])) ? 0 : parseInt(v["manaSurgeBonus"]);
		ether += isNaN(parseInt(v["manaEtherBonus"])) ? 0 : parseInt(v["manaEtherBonus"]);

		// add 1/4 ki to surge value as the base surge value
		surge += Math.floor(ki / 4);
		if (surge > ki) {
			surge = ki;
		}

		// determine essence
		var essence = Math.floor(ki / 5);
		essence += isNaN(parseInt(v["manaEssenceBonus"])) ? 0 : parseInt(v["manaEssenceBonus"]);

		// set values
		update["ki_max"] = ki;
		update["surge_bonus"] = surge;
		update["ether_capacity"] = ether;
		update["essence_max"] = essence;

		// set attributes
		if (callback == undefined) {
			setAttrs(update, {
					silent: true
				},
				function () {
					update_spell_info("all");
				}
			);
		} else {
			setAttrs(update, {
					silent: true
				},
				callback
			);
		}
	});
}

var update_all_known_spells = function() {
	var repeatingSection = "repeating_spells";
	getSectionIDs(repeatingSection, function (idarray) {
		var spell_attribs = GetSectionIdValues(idarray, repeatingSection, ["spellname"]);
		getAttrs(spell_attribs, function (v) {
			_.each(idarray, function (id) {
				update_spell_from_database(v[GetSectionIdName(repeatingSection, id, "spellname")], id, false);
			});
		});
	});
	
}

var update_spell_from_database = function (spellName, spellId, autoClose) {
	console.log("SETTING SPELL " + spellName);

	var spellData = GetSpellInformation(spellName);

	if (autoClose == undefined) {
		autoClose = false;
	}

	if (spellData.name != "") {
		getAttrs(["spellcasting_ability"], function (v) {
			var update = {};
			var repeatingSection = "repeating_spells";

			if (autoClose) {
				update[GetSectionIdName(repeatingSection, spellId, "options-flag")] = "0";
			}
			update[GetSectionIdName(repeatingSection, spellId, "spellname")] = spellData.name;
			update[GetSectionIdName(repeatingSection, spellId, "spellpower")] = spellData.power;
			update[GetSectionIdName(repeatingSection, spellId, "spellslotcost")] = spellData.spellslotcost;
			update[GetSectionIdName(repeatingSection, spellId, "spellbranch")] = spellData.branch;
			update[GetSectionIdName(repeatingSection, spellId, "spellTargetStyle")] = spellData.targerCode;
			update[GetSectionIdName(repeatingSection, spellId, "spellTraits")] = spellData.traits;

			update[GetSectionIdName(repeatingSection, spellId, "spellIsAspected")] = spellData.traits.toLowerCase().includes("aspected") ? "1" : "0";

			update[GetSectionIdName(repeatingSection, spellId, "spellmanabase")] = spellData.mana;
			switch (spellData.actionCost) {
				case "0":
					update[GetSectionIdName(repeatingSection, spellId, "spellActionCostNormal")] = "";
					break;
				case "1":
					update[GetSectionIdName(repeatingSection, spellId, "spellActionCostNormal")] = "1 min";
					break;
				case "2":
					update[GetSectionIdName(repeatingSection, spellId, "spellActionCostNormal")] = "3 min";
					break;
				case "3":
					update[GetSectionIdName(repeatingSection, spellId, "spellActionCostNormal")] = "5 min";
					break;
				case "R":
					update[GetSectionIdName(repeatingSection, spellId, "spellActionCostNormal")] = "1 min";
					break;
			}
			update[GetSectionIdName(repeatingSection, spellId, "spellActionCostCentered")] = spellData.actionCost;
			update[GetSectionIdName(repeatingSection, spellId, "spellTrigger")] = spellData.trigger;
			update[GetSectionIdName(repeatingSection, spellId, "spellduration")] = spellData.duration;

			update[GetSectionIdName(repeatingSection, spellId, "spellrange")] = spellData.range;
			update[GetSectionIdName(repeatingSection, spellId, "spellarea")] = spellData.area;
			update[GetSectionIdName(repeatingSection, spellId, "spelltargets")] = spellData.targets;

			switch (spellData.check) {
				case "Attack":
					update[GetSectionIdName(repeatingSection, spellId, "checkflag")] = "1";
					update[GetSectionIdName(repeatingSection, spellId, "atkflag")] = "1";
					update[GetSectionIdName(repeatingSection, spellId, "spellattr_base")] = v["spellcasting_ability"];
					update[GetSectionIdName(repeatingSection, spellId, "proficiency_group")] = "Spell";

					break;
				case "":
					update[GetSectionIdName(repeatingSection, spellId, "checkflag")] = "0";
					update[GetSectionIdName(repeatingSection, spellId, "atkflag")] = "0";
					break;
				case "Strength":
				case "Dexterity":
				case "Constitution":
				case "Intelligence":
				case "Wisdom":
				case "Charisma":
					update[GetSectionIdName(repeatingSection, spellId, "checkflag")] = "1";
					update[GetSectionIdName(repeatingSection, spellId, "atkflag")] = "0";
					update[GetSectionIdName(repeatingSection, spellId, "checkbase")] = "Spell DC";
					update[GetSectionIdName(repeatingSection, spellId, "checkdef")] = spellData.check + " Save";
					break;
				default:
					update[GetSectionIdName(repeatingSection, spellId, "checkflag")] = "1";
					update[GetSectionIdName(repeatingSection, spellId, "atkflag")] = "0";
					update[GetSectionIdName(repeatingSection, spellId, "checkbase")] = spellData.check;
					update[GetSectionIdName(repeatingSection, spellId, "checkdef")] = "";
					break;

			}

			if (spellData.dmg != "") {
				update[GetSectionIdName(repeatingSection, spellId, "dmgflag")] = "1";
				update[GetSectionIdName(repeatingSection, spellId, "dmgbase")] = spellData.dmg;
				if (spellData.addAbilityScore) {
					update[GetSectionIdName(repeatingSection, spellId, "dmgattr")] = v["spellcasting_ability"];
				} else {
					update[GetSectionIdName(repeatingSection, spellId, "dmgattr")] = "0";
				}
				update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = spellData.dmgType;
				update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = spellData.dmgElem;
				update[GetSectionIdName(repeatingSection, spellId, "hldmg")] = spellData.hldmg;

				if (spellData.dmg2 != "") {
					update[GetSectionIdName(repeatingSection, spellId, "dmg2flag")] = "1";
					update[GetSectionIdName(repeatingSection, spellId, "dmg2base")] = spellData.dmg2;
					update[GetSectionIdName(repeatingSection, spellId, "dmg2attr")] = "0";
					update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = spellData.dmg2Type;
					update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = spellData.dmg2Elem;
				} else {
					update[GetSectionIdName(repeatingSection, spellId, "dmg2flag")] = "0";
				}
			} else {
				update[GetSectionIdName(repeatingSection, spellId, "dmgflag")] = "0";
			}

			update[GetSectionIdName(repeatingSection, spellId, "spell_desc")] = spellData.desc;
			update[GetSectionIdName(repeatingSection, spellId, "spellheightendesc")] = spellData.heightenDesc;

			update[GetSectionIdName(repeatingSection, spellId, "spellCritSuccess")] = spellData.critSuccess;
			update[GetSectionIdName(repeatingSection, spellId, "spellSuccess")] = spellData.success;
			update[GetSectionIdName(repeatingSection, spellId, "spellFailure")] = spellData.failure;
			update[GetSectionIdName(repeatingSection, spellId, "spellCritFailure")] = spellData.critFailure;

			update[GetSectionIdName(repeatingSection, spellId, "spellOnCritSuccess")] = spellData.onCritSuccess;
			update[GetSectionIdName(repeatingSection, spellId, "spellOnSuccess")] = spellData.onSuccess;
			update[GetSectionIdName(repeatingSection, spellId, "spellOnFailure")] = spellData.onFailure;
			update[GetSectionIdName(repeatingSection, spellId, "spellOnCritFailure")] = spellData.onCritFailure;

			setAttrs(update, {
				silent: true
			}, function () {
				update_spell_info(spellId);
			});
		});
	}

}

var update_centered_spells = function (spellId) {
	var repeatingSection = "repeating_spells";
	getSectionIDs(repeatingSection, function (idarray) {
		var spell_attribs = GetSectionIdValues(idarray, repeatingSection, ["isSelected", "spellslotcost"]);
		getAttrs(spell_attribs, function (v) {
			var update = {};
			var slots = 0;
			var slotCost = 0;
			_.each(idarray, function (id) {
				slotCost = parseInt(v[GetSectionIdName(repeatingSection, id, "spellslotcost")]);
				if (!isNaN(slotCost)) {
					slots += v[GetSectionIdName(repeatingSection, id, "isSelected")] == "1" ? slotCost : 0;
				}
			});
			update["spell_slots"] = slots;

			setAttrs(update, {
				silent: true
			}, function () {
				update_spell_info(spellId);
			});
		});
	});

}

var update_spell_aspect = function (aspect, spellId) {
	console.log("UPDATING SPELL ASPECT TO " + aspect);

	var update = {};
	var repeatingSection = "repeating_spells";

	switch (aspect) {
		case "":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Rending";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Rending";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "";
		break;
		case "Wood":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Acid";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "Wood";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Acid";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "Wood";
		break;
		case "Fire":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Burn";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "Fire";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Burn";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "Fire";
		break;
		case "Earth":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Force";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "Earth";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Force";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "Earth";
		break;
		case "Metal":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Lightning";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "Metal";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Lightning";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "Metal";
		break;
		case "Water":
			update[GetSectionIdName(repeatingSection, spellId, "dmgtype")] = "Cold";
			update[GetSectionIdName(repeatingSection, spellId, "dmgelement")] = "Water";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2type")] = "Cold";
			update[GetSectionIdName(repeatingSection, spellId, "dmg2element")] = "Water";
		break;
	}

	setAttrs(update, {
		silent: true
	}, function () {
		update_spell_info(spellId);
	});

}

var update_spell_info = function (update_id, updateList) {
	console.log("DOING UPDATE SPELL INFO: " + update_id);

	var repeatingSection = "repeating_spells";

	if (!Array.isArray(update_id) && update_id.substring(0, 1) === "-" && update_id.length === 20) {
		do_update_spell([update_id]);
		if (updateList) {
			// update the list of attack ids
			getSectionIDs(repeatingSection, function (idarray) {
				update_spell_ids(idarray);
			});
		}
	} else {
		getSectionIDs(repeatingSection, function (idarray) {

			// update the list of attack ids
			update_spell_ids(idarray);

			// determine which ids to add to the attacks update
			if (update_id === "all") {
				do_update_spell(idarray);
			} else {
				var attack_attribs = GetSectionIdValues(idarray, repeatingSection, ["spellattr_base", "spellbranch", "dmgattr", "dmg2attr", "savedc"]);

				getAttrs(attack_attribs, function (v) {

					var attr_spell_ids = [];
					_.each(idarray, function (id) {

						if (Array.isArray(update_id)) {
							_.each(update_id, function (item) {
								if ((v[GetSectionIdName(repeatingSection, id, "spellattr_base")] && v[GetSectionIdName(repeatingSection, id, "spellattr_base")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "proficiency_group")] && v[GetSectionIdName(repeatingSection, id, "spellbranch")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "dmgattr")] && v[GetSectionIdName(repeatingSection, id, "dmgattr")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "dmg2attr")] && v[GetSectionIdName(repeatingSection, id, "dmg2attr")].indexOf(item) >= 0) ||
									(v[GetSectionIdName(repeatingSection, id, "savedc")] && v[GetSectionIdName(repeatingSection, id, "savedc")].indexOf(item) >= 0)
								) {
									attr_spell_ids.push(id);
								}
							});
						} else {
							if ((v[GetSectionIdName(repeatingSection, id, "spellattr_base")] && v[GetSectionIdName(repeatingSection, id, "spellattr_base")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "proficiency_group")] && v[GetSectionIdName(repeatingSection, id, "spellbranch")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "dmgattr")] && v[GetSectionIdName(repeatingSection, id, "dmgattr")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "dmg2attr")] && v[GetSectionIdName(repeatingSection, id, "dmg2attr")].indexOf(update_id) >= 0) ||
								(v[GetSectionIdName(repeatingSection, id, "savedc")] && v[GetSectionIdName(repeatingSection, id, "savedc")].indexOf(update_id) >= 0)
							) {
								attr_spell_ids.push(id);
							}
						}
					});
					if (attr_spell_ids.length > 0) {
						do_update_spell(attr_spell_ids);
					}
				});
			};
		});
	};
};

var do_update_spell = function (spellArray) {

	var attack_attribs = ["spellcasting_ability", "ether_capacity", "isSpiritRealm"];

	var repeatingSection = "repeating_spells";
	attack_attribs = attack_attribs.concat(GetSectionIdValues(spellArray, repeatingSection, [
		"spellname", "spellpower", "spellbranch", "spellTargetStyle", "spellTraits",
		"spellmanabase", "spellmanamod", "isSelected", "spellActionCostNormal", "spellActionCostCentered",
		"spellTrigger", "spellduration",
		"spellrange", "spellarea", "spelltargets",
		"checkflag", "checkbase", "checkmod", "checkdef", "checkdefdc",
		"atkflag", "spellattr_base", "spellmod", "proficiency_group", "proficiency_customrank",
		"dmgflag", "dmgbase", "dmgattr", "dmgmod", "dmgtype", "dmgelement", "hldmg",
		"dmg2flag", "dmg2base", "dmg2attr", "dmg2mod", "dmg2type", "dmg2element",
		"spellCritSuccess", "spellSuccess", "spellFailure", "spellCritFailure",
		"spellOnCritSuccess", "spellOnSuccess", "spellOnFailure", "spellOnCritFailure",
		"spell_desc", "spellheightendesc"
	]));

	getAttrs(attack_attribs, function (v) {
		var prof_attribs = ["pb", "character_name", "spell_power", "spell_effect"];
		var profs_added = [];

		_.each(spellArray, function (id) {
			if (BranchHasProf(v[GetSectionIdName(repeatingSection, id, "spellbranch")]) && !profs_added.includes(v[GetSectionIdName(repeatingSection, id, "spellbranch")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "spellbranch")]);
				prof_attribs.push("branch_prof-" + v[GetSectionIdName(repeatingSection, id, "spellbranch")]);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "spellattr_base")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "spellattr_base")]);
				prof_attribs.push(GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "spellattr_base")], v["spellcasting_ability"]));
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "proficiency_group")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "proficiency_group")]);
				prof_attribs.push(
					GetProficiencyAttr(v[GetSectionIdName(repeatingSection, id, "proficiency_group")])
				);
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "dmgattr")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "dmgattr")]);
				prof_attribs.push(GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "dmgattr")], v["spellcasting_ability"]));
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "dmg2attr")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "dmg2attr")]);
				prof_attribs.push(GetAbilityScoreAttr(v[GetSectionIdName(repeatingSection, id, "dmg2attr")], v["spellcasting_ability"]));
			}
			if (!profs_added.includes(v[GetSectionIdName(repeatingSection, id, "checkbase")])) {
				profs_added.push(v[GetSectionIdName(repeatingSection, id, "checkbase")]);
				prof_attribs.push(GetCheckAttr(v[GetSectionIdName(repeatingSection, id, "checkbase")]));
			}
		});

		getAttrs(prof_attribs, function (p) {

			var update = {};
			_.each(spellArray, function (id) {
				console.log("UPDATING SPELL: " + v[GetSectionIdName(repeatingSection, id, "spellname")]);

				// variables
				var totalAttack = 0;
				var damageString = "";
				var damage2String = "";
				var actionModString = "";

				// begin the action data
				var actionData = GetActionData();
				actionData.name = v[GetSectionIdName(repeatingSection, id, "spellname")];
				actionData.targetStyle = v[GetSectionIdName(repeatingSection, id, "spellTargetStyle")];

				// determine which kind of action cost to use
				var actionCost = "";
				if (v[GetSectionIdName(repeatingSection, id, "isSelected")] == "0" || v[GetSectionIdName(repeatingSection, id, "spellActionCostCentered")] == "0") {
					actionCost = v[GetSectionIdName(repeatingSection, id, "spellActionCostNormal")];
				} else {
					actionCost = v[GetSectionIdName(repeatingSection, id, "spellActionCostCentered")];
				}
				update[GetSectionIdName(repeatingSection, id, "spellActionCost")] = actionCost;
				actionData.actionCost = actionCost;

				// add traits
				actionData.traits = v[GetSectionIdName(repeatingSection, id, "spellTraits")];
				var traitsDb = GetTraitsDictionary(actionData.traits);
				for (var i = 0; i < 6; i++) {
					if (i < traitsDb.length) {
						update[GetSectionIdName(repeatingSection, id, "spellTrait" + i)] = traitsDb[i].name;
						update[GetSectionIdName(repeatingSection, id, "spellTrait" + i + "Desc")] = traitsDb[i].desc;
					} else {
						update[GetSectionIdName(repeatingSection, id, "spellTrait" + i)] = "";
						update[GetSectionIdName(repeatingSection, id, "spellTrait" + i + "Desc")] = "";
					}
				}

				// add desc
				let desc = v[GetSectionIdName(repeatingSection, id, "spell_desc")];
				if (v[GetSectionIdName(repeatingSection, id, "spellheightendesc")].trim() != "") {
					desc += "\n\nHEIGHTENED: " + v[GetSectionIdName(repeatingSection, id, "spellheightendesc")];
				}
				actionData.description = desc;

				// calculate mana
				var baseMana = parseInt(v[GetSectionIdName(repeatingSection, id, "spellmanabase")]);
				baseMana += parseInt(v[GetSectionIdName(repeatingSection, id, "spellmanamod")]);
				if (baseMana > 0) {
					let halfCost = Math.ceil(baseMana / 2);
					baseMana -= v["ether_capacity"];
					if (baseMana < halfCost) {
						baseMana = halfCost;
					}

					// while in the spirit realm, all mana costs are made at 1/2th cost
					if (v["isSpiritRealm"] == "1") {
						baseMana = Math.ceil(baseMana / 2);
					}
				}
				update[GetSectionIdName(repeatingSection, id, "spellmana")] = baseMana;
				actionData.mana = baseMana;

				// add results
				actionData.critsuccess = v[GetSectionIdName(repeatingSection, id, "spellCritSuccess")];
				actionData.success = v[GetSectionIdName(repeatingSection, id, "spellSuccess")];
				actionData.failure = v[GetSectionIdName(repeatingSection, id, "spellFailure")];
				actionData.critfailure = v[GetSectionIdName(repeatingSection, id, "spellCritFailure")];
				actionData.onCritSuccess = v[GetSectionIdName(repeatingSection, id, "spellOnCritSuccess")];
				actionData.onSuccess = v[GetSectionIdName(repeatingSection, id, "spellOnSuccess")];
				actionData.onFailure = v[GetSectionIdName(repeatingSection, id, "spellOnFailure")];
				actionData.onCritFailure = v[GetSectionIdName(repeatingSection, id, "spellOnCritFailure")];

				actionData.range = v[GetSectionIdName(repeatingSection, id, "spellrange")];
				actionData.area = v[GetSectionIdName(repeatingSection, id, "spellarea")];
				actionData.targets = v[GetSectionIdName(repeatingSection, id, "spelltargets")];
				actionData.trigger = v[GetSectionIdName(repeatingSection, id, "spellTrigger")];

				// add checks
				if (v[GetSectionIdName(repeatingSection, id, "checkflag")] == "1") {

					if (v[GetSectionIdName(repeatingSection, id, "atkflag")] == "1") {
						actionModString = "";
						switch (v[GetSectionIdName(repeatingSection, id, "spellattr_base")]) {
							case "strength":
								totalAttack += parseInt(p["strength_mod"]);
								actionModString += totalAttack + "[Str]";
								break;
							case "dexterity":
								totalAttack += parseInt(p["dexterity_mod"]);
								actionModString += totalAttack + "[Dex]";
								break;
							case "constitution":
								totalAttack += parseInt(p["constitution_mod"]);
								actionModString += totalAttack + "[Con]";
								break;
							case "intelligence":
								totalAttack += parseInt(p["intelligence_mod"]);
								actionModString += totalAttack + "[Int]";
								break;
							case "wisdom":
								totalAttack += parseInt(p["wisdom_mod"]);
								actionModString += totalAttack + "[Wis]";
								break;
							case "charisma":
								totalAttack += parseInt(p["charisma_mod"]);
								actionModString += totalAttack + "[Cha]";
								break;
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "spellmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "spellmod")]) != 0) {
							let mod = parseInt(v[GetSectionIdName(repeatingSection, id, "spellmod")]);

							if (!isNaN(mod)) {
								if (actionModString != "") {
									actionModString += " + ";
								}
								totalAttack += mod;
								actionModString += mod + "[Mod]";
							}
						}

						// add proficiency
						if (v[GetSectionIdName(repeatingSection, id, "proficiency_group")]) {
							let profBonus = 0;
							if (v[GetSectionIdName(repeatingSection, id, "proficiency_group")] == "0") {
								profBonus = GetProfRankBonus(v[GetSectionIdName(repeatingSection, id, "proficiency_customrank")], false, v["pb"]);
							} else {
								var profGroup = v[GetSectionIdName(repeatingSection, id, "proficiency_group")];
								if (profGroup == undefined) {
									profGroup = 0;
								}
								profBonus = parseInt(p[GetProficiencyAttr(profGroup)]);
							}

							if (!isNaN(profBonus) && profBonus != 0) {
								totalAttack += profBonus;
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += profBonus + "[PB]";
							}
						}

						// add branch proficiency
						if (BranchHasProf(v[GetSectionIdName(repeatingSection, id, "spellbranch")])) {

							let profBonus = parseInt(p["branch_prof-" + v[GetSectionIdName(repeatingSection, id, "spellbranch")]]);

							if (!isNaN(profBonus) && profBonus != 0) {
								totalAttack += profBonus;
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += profBonus + "[" + v[GetSectionIdName(repeatingSection, id, "spellbranch")] + "]";
							}
						}

						// set the actionData
						actionData.checkName = "Attack";
						actionData.checkRoll = true;
						actionData.checkMod = actionModString;
						actionData.checkDef = "AC";
					} else {
						actionModString = "";
						actionData.checkRoll = true;

						// add check
						let checkBonus = 0;
						switch (v[GetSectionIdName(repeatingSection, id, "checkbase")]) {
							case "Spell DC":
								actionData.checkRoll = false;
								checkBonus = parseInt(p["spell_effect"]);
								totalAttack = 10;
								actionModString = "10[Base]";
								break;
							case "Spell Attack":
								checkBonus = parseInt(p["spell_effect"]);
								break;
							default:
								checkBonus = parseInt(p[GetProficiencyAttr(v[GetSectionIdName(repeatingSection, id, "checkbase")])]);
								break;
						}
						if (!isNaN(checkBonus) && checkBonus != 0) {
							totalAttack += checkBonus;
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += checkBonus + "[" + v[GetSectionIdName(repeatingSection, id, "checkbase")] + "]";
						}

						// add branch proficiency
						if (BranchHasProf(v[GetSectionIdName(repeatingSection, id, "spellbranch")])) {

							let profBonus = parseInt(p["branch_prof-" + v[GetSectionIdName(repeatingSection, id, "spellbranch")]]);

							if (!isNaN(profBonus) && profBonus != 0) {
								totalAttack += profBonus;
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += profBonus + "[" + v[GetSectionIdName(repeatingSection, id, "spellbranch")] + "]";
							}
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "checkmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "checkmod")]) != 0) {
							let mod = parseInt(v[GetSectionIdName(repeatingSection, id, "checkmod")]);

							if (!isNaN(mod)) {
								if (actionModString != "") {
									actionModString += " + ";
								}
								totalAttack += mod;
								actionModString += mod + "[Mod]";
							}
						}

						let checkDef = v[GetSectionIdName(repeatingSection, id, "checkdef")];
						if (checkDef == "0") {
							checkDef = "DC " + v[GetSectionIdName(repeatingSection, id, "checkdefdc")];
						}

						// set the actionData
						actionData.checkName = v[GetSectionIdName(repeatingSection, id, "checkbase")];
						actionData.checkMod = actionModString;
						actionData.checkDef = checkDef;
					}
				}

				// add damage
				if (v[GetSectionIdName(repeatingSection, id, "dmgflag")] == "1") {
					actionModString = "";
					let totalDamage = 0;
					let baseRoll = "";

					if (v[GetSectionIdName(repeatingSection, id, "dmgbase")]) {
						baseRoll = v[GetSectionIdName(repeatingSection, id, "dmgbase")];
						actionModString = baseRoll;
					}

					switch (v[GetSectionIdName(repeatingSection, id, "dmgattr")]) {
						case "strength":
							totalDamage += parseInt(p["strength_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Str]";
							break;
						case "dexterity":
							totalDamage += parseInt(p["dexterity_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Dex]";
							break;
						case "constitution":
							totalDamage += parseInt(p["constitution_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Con]";
							break;
						case "intelligence":
							totalDamage += parseInt(p["intelligence_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Int]";
							break;
						case "wisdom":
							totalDamage += parseInt(p["wisdom_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Wis]";
							break;
						case "charisma":
							totalDamage += parseInt(p["charisma_mod"]);
							if (actionModString != "") {
								actionModString += " + ";
							}
							actionModString += totalDamage + "[Cha]";
							break;
					}

					// add mod
					if (v[GetSectionIdName(repeatingSection, id, "dmgmod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "dmgmod")]) != 0) {
						if (actionModString != "") {
							actionModString += " + ";
						}
						totalDamage += parseInt(v[GetSectionIdName(repeatingSection, id, "dmgmod")]);
						actionModString += v[GetSectionIdName(repeatingSection, id, "dmgmod")] + "[Mod]";
					}

					actionData.dmg1flag = true;
					actionData.dmg1 = actionModString;
					actionData.crit1 = baseRoll;
					actionData.dmgtype1 = v[GetSectionIdName(repeatingSection, id, "dmgtype")];
					actionData.elem1 = v[GetSectionIdName(repeatingSection, id, "dmgelement")];

					// set the string
					damageString = baseRoll + (baseRoll != "" ? " + " : "") + totalDamage + " " + actionData.dmgtype1 + (actionData.elem1 != "" ? " (" + actionData.elem1 + ")" : "");

					if (v[GetSectionIdName(repeatingSection, id, "dmg2flag")] == "1") {
						actionModString = "";
						let totalDamage = 0;
						let baseRoll = "";

						if (v[GetSectionIdName(repeatingSection, id, "dmg2base")]) {
							baseRoll = v[GetSectionIdName(repeatingSection, id, "dmg2base")];
							actionModString = baseRoll;
						}

						switch (v[GetSectionIdName(repeatingSection, id, "dmg2attr")]) {
							case "strength":
								totalDamage += parseInt(p["strength_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Str]";
								break;
							case "dexterity":
								totalDamage += parseInt(p["dexterity_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Dex]";
								break;
							case "constitution":
								totalDamage += parseInt(p["constitution_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Con]";
								break;
							case "intelligence":
								totalDamage += parseInt(p["intelligence_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Int]";
								break;
							case "wisdom":
								totalDamage += parseInt(p["wisdom_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Wis]";
								break;
							case "charisma":
								totalDamage += parseInt(p["charisma_mod"]);
								if (actionModString != "") {
									actionModString += " + ";
								}
								actionModString += totalDamage + "[Cha]";
								break;
						}

						// add mod
						if (v[GetSectionIdName(repeatingSection, id, "dmg2mod")] && parseInt(v[GetSectionIdName(repeatingSection, id, "dmg2mod")]) != 0) {
							if (actionModString != "") {
								actionModString += " + ";
							}
							totalDamage += parseInt(v[GetSectionIdName(repeatingSection, id, "dmg2mod")]);
							actionModString += v[GetSectionIdName(repeatingSection, id, "dmg2mod")] + "[Mod]";
						}

						actionData.dmg2flag = true;
						actionData.dmg2 = actionModString;
						actionData.crit2 = baseRoll;
						actionData.dmgtype2 = v[GetSectionIdName(repeatingSection, id, "dmg2type")];
						actionData.elem2 = v[GetSectionIdName(repeatingSection, id, "dmg2element")];

						// set the string
						damage2String = baseRoll + (baseRoll != "" ? " + " : "") + totalDamage + " " + actionData.dmgtype2 + (actionData.elem2 != "" ? " (" + actionData.elem2 + ")" : "");
					}
					if (v[GetSectionIdName(repeatingSection, id, "hldmg")] != "") {
						let power = parseInt(v[GetSectionIdName(repeatingSection, id, "spellpower")]);
						power = isNaN(power) ? 1 : power;
						let spellData = get_spell_power_query(v[GetSectionIdName(repeatingSection, id, "hldmg")], power, p["spell_power"]);
						actionData.hldmg = spellData.dmg;
						actionData.hldmgcrit = spellData.crit;
						actionData.baseLvl = power;
						actionData.castLvl = spellData.level;
					}
				}

				// update the strings
				update[GetSectionIdName(repeatingSection, id, "spellbonus")] = (totalAttack > 0 ? "+" : "") + totalAttack;
				update[GetSectionIdName(repeatingSection, id, "damageString")] = damageString;
				update[GetSectionIdName(repeatingSection, id, "damage2String")] = damage2String;
				update[GetSectionIdName(repeatingSection, id, "rollcontent")] = actionData.toRoll(p["character_name"]);
			});

			setAttrs(update, {
				silent: true
			});
		});
	});
};

var update_all_spell_ids = function () {
	var repeatingSection = "repeating_spells";
	getSectionIDs(repeatingSection, function (idarray) {
		update_action_ids(idarray);
	});

}

var update_spell_ids = function (spellArray) {

	var update = {};
	var allSpellIds = "";
	_.each(spellArray, function (id) {
		allSpellIds += id + ",";
	});
	update["allSpellIds"] = allSpellIds;

	setAttrs(update, {
		silent: true
	});
}

var get_spell_power_query = function (hldmg, basePower, maxPower) {

	var output = {
		dmg: "",
		crit: "",
		level: ""
	};

	if (basePower >= maxPower) {
		return output;
	}

	var splits = hldmg.split("d");
	if (splits.length > 1) {
		var newSplits = splits[1].split("+");

		var hldie = splits[0];
		var hldieType = newSplits[0];
		var hlbonus = (newSplits.length > 1 ? newSplits[1] : "");

		var bonus = "";
		var query = "?{Cast at what level?";
		for (i = 0; i <= (maxPower - basePower); i++) {
			query = query + "|Level " + (i + parseInt(basePower)) + "," + i;
		}
		query = query + "}";
		if (hlbonus != "") {
			bonus = " + (" + hlbonus + "*" + query + ")";
		}

		output.dmg = "(" + hldie + "*" + query + ")d" + hldieType + bonus + "[HL]";
		output.crit = "(" + hldie + "*" + query + ")d" + hldieType + "[HL]";
		output.level = query;

	} else if (basePower != 0) {
		output.dmg = splits[0] + "[HL]";
	}

	return output;
}





// Vitals: Resources

var update_speed = function() {
	console.log("UPDATING SPEED");

	getAttrs(["walk_speed", "climb_speed", "fly_speed", "burrow_speed"], function (v) {
		var update = {};
		var speed = "";
		if (v["walk_speed"] != "" && v["walk_speed"] != "0") {
			speed +=`${v["walk_speed"]} ft.`;
		}
		if (v["climb_speed"] != "" && v["climb_speed"] != "0") {
			speed +=`; climb ${v["climb_speed"]} ft.`;
		}
		if (v["fly_speed"] != "" && v["fly_speed"] != "0") {
			speed +=`; fly ${v["fly_speed"]} ft.`;
		}
		if (v["burrow_speed"] != "" && v["burrow_speed"] != "0") {
			speed +=`; burrow ${v["burrow_speed"]} ft.`;
		}
		if (speed == "") {
			speed = "0 ft.";
		}
		update["speed"] = speed;

		setAttrs(update, {
			silent: true
		});
	});
}

var update_health_barrier = function () {
	console.log("UPDATING HEALTH AND BARRIER");
	let health_attrs = ["class", "base_level", "classTotalHpPoints", "hpBonus", "vitality", "vitality_max", "vitalityBonus", "constitution", "constitution_mod", "charisma_mod",
		"active_barrier", "usesClassBarrier", "classTotalBrPoints", "barrierBonus", "classTotalSpPoints", "spBonus", "characterType"
	];

	let repeatingBarriers = "repeating_barriers";

	getSectionIDs(repeatingBarriers, function (idarray) {
		health_attrs = health_attrs.concat(GetSectionIdValues(idarray, repeatingBarriers,
			["barrier_max", "isSelected"]));

		getAttrs(health_attrs, function (v) {

			let update = {};
			let bonusHp = isNaN(parseInt(v["hpBonus"])) ? 0 : parseInt(v["hpBonus"]);
			let bonusBr = isNaN(parseInt(v["barrierBonus"])) ? 0 : parseInt(v["barrierBonus"]);
			let bonusCon = isNaN(parseInt(v["constitution_mod"])) ? 0 : parseInt(v["constitution_mod"]);
			let bonusCha = isNaN(parseInt(v["charisma_mod"])) ? 0 : parseInt(v["charisma_mod"]);
			let level = parseInt(v["base_level"]);
			let bonusSp = isNaN(parseInt(v["spBonus"])) ? 0 : parseInt(v["spBonus"]);
			let sp = isNaN(parseInt(v["classTotalSpPoints"])) ? 0 : parseInt(v["classTotalSpPoints"]);
			sp += bonusSp;

			let classHp = (isNaN(parseInt(v["classTotalHpPoints"])) ? 0 : parseInt(v["classTotalHpPoints"])) + bonusHp + bonusCon;
			let classBr = v["usesClassBarrier"] == "1" ? (isNaN(parseInt(v["classTotalBrPoints"])) ? 0 : parseInt(v["classTotalBrPoints"])) + bonusBr : bonusBr;
			let totalHp = 0;
			let totalBr = 0;

			// add constitution modifiers
			let classData = GetClassInfo(v["class"]);
			if (classData.type.toLowerCase() == "class") {
				if (v["usesClassBarrier"]) {
					classBr += bonusCon * level;
				}
				if (level == 1) {
					classHp += bonusCon;
				}
			}
			else if (classData.type.toLowerCase() == "spirit") {
				if (v["usesClassBarrier"]) {
					classBr += bonusCha * level;
				}
			}

			// get the true hp and barrier values
			totalHp = classHp;
			if (v["active_barrier"] == "current") {
				totalBr = classBr;
			} else {
				_.each(idarray, function (currentID) {
					if (v[GetSectionIdName(repeatingBarriers, currentID, "isSelected")] == "1") {
						totalBr = parseInt(v[GetSectionIdName(repeatingBarriers, currentID, "barrier_max")]) + bonusBr;
					}
				});
			}
			update["hpTrue"] = totalHp;
			update["barrierTrue"] = totalBr;
			update["classBarrier_max"] = classBr;

			// calculate vitality
			let vitality = isNaN(parseInt(v["vitality"])) ? 0 : parseInt(v["vitality"]);
			let vitalityMax = 10;
			if (vitality > vitalityMax) {
				vitality = vitalityMax;
				update["vitality"] = vitality;
			}

			// modify the max hp based on current vitality stats
			let vitalityBonus = Math.floor((vitality - 10) / 2);
			if (vitalityBonus < 0) {
				totalHp += Math.ceil(totalHp * (vitalityBonus / 5));
			}

			// hp cannot drop below 0 at this point
			if (totalHp < 1) {
				totalHp = 1;
			}

			// update remaining stats
			update["hp_max"] = totalHp;
			update["vitality_max"] = vitalityMax;
			update["barrier_max"] = totalBr;
			update["sp_max"] = sp;

			setAttrs(update, {
				silent: true
			},
			function () {
				if (v["characterType"] != "0") {
					update_source_points();
				}
			});
		});
	});
}

var update_ac = function () {
	console.log("UPDATING AC");

	var mod_attrs = ["pb", "spellcasting_ability", "gearEquippedArmorType", "gearEquippedArmorAc", "gearEquippedShieldRaised", "gearEquippedShieldAc",
		"armor_prof-unarmored", "armor_prof-light", "armor_prof-medium", "armor_prof-heavy",
		"strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod",
		"globalacmod", "armorMaxMediumDex", "armorBACActiveState", "armorBACWithArmor", 
		"armorAddProficiency-unarmored", "armorAddProficiency-light", "armorAddProficiency-medium", "armorAddProficiency-heavy"
	];

	var repeatingSection = "repeating_acmodifiers";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["acmod", "acattr", "actsWithBarrier", "isSelected"]));

		getAttrs(mod_attrs, function (v) {
			var update = {};

			// variables
			let pbBonus = parseInt(v["pb"]);
			let globalacmod = parseInt(v["globalacmod"]);
			var baseAc = 0;
			var barrierAc = 0;
			var acType = 0;

			// calculate AC with the equipped armor 
			baseAc = 10;
			baseAc += (isNaN(parseInt(v["gearEquippedArmorAc"])) ? 0 : parseInt(v["gearEquippedArmorAc"]));
			switch (v["gearEquippedArmorType"]) {
				case "Unarmored":
					acType = 0;
					baseAc += parseInt(v["armor_prof-unarmored"]);
					baseAc += parseInt(v["dexterity_mod"]);

					switch (v["armorAddProficiency-unarmored"]) {
						case "1":
							baseAc += Math.floor(pbBonus / 2);
						break;
						case "2":
							baseAc += pbBonus;
						break;
					}
					break;
				case "Light":
					acType = 1;
					baseAc += parseInt(v["armor_prof-light"]);
					baseAc += parseInt(v["dexterity_mod"]);

					switch (v["armorAddProficiency-light"]) {
						case "1":
							baseAc += Math.floor(pbBonus / 2);
						break;
						case "2":
							baseAc += pbBonus;
						break;
					}
					break;
				case "Medium":
					acType = 2;
					baseAc += parseInt(v["armor_prof-medium"]);
					if (parseInt(v["dexterity_mod"]) > parseInt(v["armorMaxMediumDex"])) {
						baseAc += parseInt(v["armorMaxMediumDex"]);
					} else {
						baseAc += parseInt(v["dexterity_mod"]);
					}

					switch (v["armorAddProficiency-medium"]) {
						case "1":
							baseAc += Math.floor(pbBonus / 2);
						break;
						case "2":
							baseAc += pbBonus;
						break;
					}
					break;
				case "Heavy":
					acType = 3;
					baseAc += parseInt(v["armor_prof-heavy"]);

					switch (v["armorAddProficiency-heavy"]) {
						case "1":
							baseAc += Math.floor(pbBonus / 2);
						break;
						case "2":
							baseAc += pbBonus;
						break;
					}
					break;
			}

			// add shield bonus
			if (v["gearEquippedShieldRaised"] == "1") {
				baseAc += (isNaN(parseInt(v["gearEquippedShieldAc"])) ? 0 : parseInt(v["gearEquippedShieldAc"]));
			}

			if (!isNaN(globalacmod)) {
				baseAc += globalacmod;
			}

			// add defense modifiers
			let bonusAc = 0;
			_.each(idarray, function (currentID) {

				// see if the defense mod is active
				if (v[GetSectionIdName(repeatingSection, currentID, "isSelected")] == "1") {

					bonusAc = 0;
					bonusAc += isNaN(parseInt(v[GetSectionIdName(repeatingSection, currentID, "acmod")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, currentID, "acmod")]);

					if (v[GetSectionIdName(repeatingSection, currentID, "acattr")] != "" && v[GetSectionIdName(repeatingSection, currentID, "acattr")] != "0") {
						bonusAc += v[v[GetSectionIdName(repeatingSection, currentID, "acattr")] + "_mod"];
					}

					// see if it applies to barrier or base Ac
					if (v[GetSectionIdName(repeatingSection, currentID, "actsWithBarrier")] == "1") {
						barrierAc += bonusAc;
					} else {
						baseAc += bonusAc;
					}
					update[GetSectionIdName(repeatingSection, currentID, "acString")] = bonusAc + " AC bonus";
				}
			});

			// see if barrier AC applies
			console.log("armorBACActiveState: " + v["armorBACActiveState"] + " acType: " + acType + " <= " + parseInt(v["armorBACWithArmor"]));
			if (v["armorBACActiveState"] == "1" || (acType <= parseInt(v["armorBACWithArmor"]) && v["armorBACActiveState"] == "0")) {
				let spellMod = 0;
				if (v["spellcasting_ability"].indexOf("intelligence") >= 0) {
					spellMod += parseInt(v["intelligence_mod"]);
				} else if (v["spellcasting_ability"].indexOf("wisdom") >= 0) {
					spellMod += parseInt(v["wisdom_mod"]);
				} else if (v["spellcasting_ability"].indexOf("charisma") >= 0) {
					spellMod += parseInt(v["charisma_mod"]);
				}
				if (spellMod > pbBonus) {
					spellMod = pbBonus;
				}
				barrierAc += spellMod;
			} else {
				barrierAc = 0;
			}

			// update the ac values
			update["ac_shatterbarrier"] = baseAc;
			update["ac_barrier"] = baseAc + barrierAc;

			setAttrs(update, {
				silent: true
			});
		});
	});
};

var update_weakness_and_resistance = function () {
	console.log("UPDATING WEAKNESSES AND RESISTANCES");

	var mod_attrs = [];
	var repeatingSection = "repeating_acmodifiers";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["weakness", "resistance", "isSelected"]);

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let weaknesses = "";
			let resistances = "";

			_.each(idarray, function (currentID) {
				if (v[GetSectionIdName(repeatingSection, currentID, "weakness")] != "") {
					weaknesses += (weaknesses != "" ? ", " : "") + v[GetSectionIdName(repeatingSection, currentID, "weakness")];
				}
				if (v[GetSectionIdName(repeatingSection, currentID, "resistance")] != "") {
					resistances += (resistances != "" ? ", " : "") + v[GetSectionIdName(repeatingSection, currentID, "resistance")];
				}
			});

			update["weaknesses"] = weaknesses;
			update["resistances"] = resistances;

			setAttrs(update, {
				silent: true
			});

		});
	});

}

var update_initiative = function () {
	getAttrs(["initmod", "initabilityscore", "jack_of_all_trades", "jack",
	"strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma",
	"strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod"], function (v) {
		var update = {};
		var totalInitiative = parseInt(v["wisdom_mod"], 10);

		if (v["initmod"] && !isNaN(parseInt(v["initmod"], 10))) {
			totalInitiative = totalInitiative + parseInt(v["initmod"], 10);
		}

		if (v["initabilityscore"] != "" && v["initabilityscore"] != "0") {
			totalInitiative += v[v["initabilityscore"] + "_mod"];
		}

		totalInitiative = totalInitiative + (parseInt(v["wisdom"], 10) / 100);

		if (v["jack_of_all_trades"] && v["jack_of_all_trades"] != 0) {
			if (v["jack"] && !isNaN(parseInt(v["jack"], 10))) {
				totalInitiative = totalInitiative + parseInt(v["jack"], 10);
			}
		}
		if (totalInitiative % 1 != 0) {
			totalInitiative = parseFloat(totalInitiative.toPrecision(2)); // ROUNDING ERROR BUGFIX
		}

		update["initiative_bonus"] = totalInitiative;
		setAttrs(update, {
			silent: true
		});
	});
};

// Vitals: Death and Injuries

var update_injury_from_preset = function (repeatingDataSet, injuryid, injuryName) {
	
	var update = {};
	let injuryPreset = GetInjury(injuryName);

	if (injuryPreset.name != "") {
		update = {};
		update[repeatingDataSet + "_" + injuryid + "_injuryName"] = injuryPreset.name;
		update[repeatingDataSet + "_" + injuryid + "_injuryType"] = injuryPreset.type;
		update[repeatingDataSet + "_" + injuryid + "_injurySubtype"] = injuryPreset.subtype;
		update[repeatingDataSet + "_" + injuryid + "_injuryState"] = "Active";
		update[repeatingDataSet + "_" + injuryid + "_description"] = injuryPreset.description;
		update[repeatingDataSet + "_" + injuryid + "_injuryRemoval"] = injuryPreset.removal;

		setAttrs(update, {
			silent: true
		}, function () {
			update_active_injuries();
		});
	}
}

var update_injury_data = function (repeatingDataSet, injuryid) {
	var update = {};
	var attr_fields = [
		repeatingDataSet + "_" + injuryid + "_injury",
		repeatingDataSet + "_" + injuryid + "_injuryName",
		repeatingDataSet + "_" + injuryid + "_injuryType",
		repeatingDataSet + "_" + injuryid + "_injuryState",
		repeatingDataSet + "_" + injuryid + "_injuryHP",
		repeatingDataSet + "_" + injuryid + "_injuryRemoval",
		repeatingDataSet + "_" + injuryid + "_description"
	];

	getAttrs(attr_fields, function (v) {

		// set the base variables
		update = {};
		var injuryPreset = GetInjury(v[repeatingDataSet + "_" + injuryid + "_injury"]);
		var injuryDescription = "";
		var newInjurySection = repeatingDataSet;
		var rowUpdateId = injuryid;

		// get values for the new state of the injury
		switch (v[repeatingDataSet + "_" + injuryid + "_injuryState"]) {
			case "Active":
				newInjurySection = "repeating_activeinjuries";
				injuryDescription = injuryPreset.description;
				break;
			case "Healed":
				newInjurySection = "repeating_activeinjuries";
				injuryDescription = injuryPreset.healedDescription;
				break;
			case "Recovery":
				newInjurySection = "repeating_injuries";
				injuryDescription = injuryPreset.recoveryDescription;
				break;
			case "Mitigated":
				newInjurySection = "repeating_injuries";
				injuryDescription = injuryPreset.removedDescription;
				break;
		}

		// determine if we need to change the row entry
		if (newInjurySection != repeatingDataSet) {
			rowUpdateId = generateRowID();
			update[newInjurySection + "_" + rowUpdateId + "_injury"] = v[repeatingDataSet + "_" + injuryid + "_injury"];
			update[newInjurySection + "_" + rowUpdateId + "_injuryName"] = v[repeatingDataSet + "_" + injuryid + "_injuryName"];
			update[newInjurySection + "_" + rowUpdateId + "_injuryType"] = v[repeatingDataSet + "_" + injuryid + "_injuryType"];
			update[newInjurySection + "_" + rowUpdateId + "_injuryState"] = v[repeatingDataSet + "_" + injuryid + "_injuryState"];
			update[newInjurySection + "_" + rowUpdateId + "_injuryHP"] = v[repeatingDataSet + "_" + injuryid + "_injuryHP"];
			update[newInjurySection + "_" + rowUpdateId + "_description"] = injuryDescription;
			update[newInjurySection + "_" + rowUpdateId + "_injuryRemoval"] = v[repeatingDataSet + "_" + injuryid + "_injuryRemoval"];

			removeRepeatingRow(repeatingDataSet + "_" + injuryid);
		} else if (injuryDescription != "") {
			update[newInjurySection + "_" + rowUpdateId + "_description"] = injuryDescription;
		}

		setAttrs(update, {
			silent: true
		}, function () {
			update_active_injuries();
		});
	});
}

var update_active_injuries = function () {

	var injuryList = "";
	var attr_fields = ["hp_max"];

	getSectionIDs("repeating_activeinjuries", function (idarray) {
		_.each(idarray, function (currentID, i) {
			if (injuryList != "") {
				injuryList += ",";
			}
			injuryList += currentID;
			attr_fields.push("repeating_activeinjuries_" + currentID + "_injuryHP");
		});

		getAttrs(attr_fields, function (v) {
			var update = {};

			// set hp variables
			var totalHp = isNaN(parseInt(v["hp_max"])) ? 0 : parseInt(v["hp_max"]);
			var hpDamage = 0;

			// decrement hp by valued of injuries
			_.each(idarray, function (currentID) {
				hpDamage = parseInt(v["repeating_activeinjuries_" + currentID + "_injuryHP"]);
				totalHp -= isNaN(hpDamage) ? 0 : hpDamage;
			});

			// set and send variables
			update["hp"] = totalHp;
			update["activeinjury_list"] = injuryList;
			setAttrs(update, {
				silent: true
			});
		});
	});
}

// Vitals: Barriers

var update_selected_barrier = function (selectedId) {
	console.log("UPDATING BARRIER to " + selectedId);

	var health_attrs = ["barrier", "classBarrierIsSelected", "classBarrier"];
	var repeatingBarriers = "repeating_barriers";

	getSectionIDs(repeatingBarriers, function (idarray) {
		health_attrs = health_attrs.concat(GetSectionIdValues(idarray, repeatingBarriers,
			["barrier", "isSelected"]));

		getAttrs(health_attrs, function (v) {
			var update = {};

			if (selectedId == "current") {
				update["classBarrierIsSelected"] = "1";
				update["active_barrier"] = "current";
				if (idarray.length > 0) {
					update["barrier"] = v["classBarrier"];
				}
			} else {
				update["classBarrierIsSelected"] = "0";

				if (v["classBarrierIsSelected"] == "1") {
					update["classBarrier"] = v["barrier"];
				}
			}

			_.each(idarray, function (currentID) {

				if (currentID == selectedId) {
					update[GetSectionIdName(repeatingBarriers, currentID, "isSelected")] = "1";
					update["active_barrier"] = currentID;
					update["barrier"] = v[GetSectionIdName(repeatingBarriers, currentID, "barrier")];
				} else {
					update[GetSectionIdName(repeatingBarriers, currentID, "isSelected")] = "0";

					if (v[GetSectionIdName(repeatingBarriers, currentID, "isSelected")] == "1") {
						update[GetSectionIdName(repeatingBarriers, currentID, "barrier")] = v["barrier"];
					}
				}

			});

			setAttrs(update, {
				silent: true
			}, function () {
				update_health_barrier();
			});
		});
	});
}



// Records: Downtime

var update_downtimeSubActivitySelection = function (sectionId, repeatingSection) {

	var update = {};
	var attr_fields = [];

	getSectionIDs(repeatingSection, function (idarray) {
		_.each(idarray, function (currentID) {
			update[repeatingSection + "_" + currentID + "_isSelected"] = currentID == sectionId ? "1" : "0";
		});

		setAttrs(update);
	});
}

var update_downtimeActivityLockIn = function () {
	console.log("UPDATING DOWNTIME ACTIVITY LOCK IN");

	var attr_fields = [];

	getSectionIDs("repeating_downtime", function (idarray) {
		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_downtime_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (w) {
			var sectionId = "";
			_.each(idarray, function (currentID) {
				if (sectionId == "" && w["repeating_downtime_" + currentID + "_isSelected"] == "1") {
					sectionId = currentID;
				}
			});

			if (sectionId != "") {
				var attr_fields2 = ["repeating_downtime_" + sectionId + "_mainActivityDetails",
					"repeating_downtime_" + sectionId + "_minorActivityDetails",
					"downtimeActivitySelect"
				];

				getAttrs(attr_fields2, function (v) {

					// determine whether this is a major or minor activity
					var isMainActivity = true;
					var isMinorActivity = true;

					if (v["repeating_downtime_" + sectionId + "_mainActivityDetails"] != undefined &&
						v["repeating_downtime_" + sectionId + "_mainActivityDetails"] != "" &&
						v["repeating_downtime_" + sectionId + "_mainActivityDetails"] != 0) {
						isMainActivity = false;

						if (v["repeating_downtime_" + sectionId + "_minorActivityDetails"] != undefined &&
							v["repeating_downtime_" + sectionId + "_minorActivityDetails"] != "" &&
							v["repeating_downtime_" + sectionId + "_minorActivityDetails"] != 0) {
							isMinorActivity = false;
						}
					}

					// if both are false we got here illegally
					if (isMainActivity || isMinorActivity) {
						switch (v["downtimeActivitySelect"]) {
							case "Community Service":
								update_downtimeCommunityService(sectionId, isMainActivity);
								break;
							case "Competition":
								update_downtimeCompetition(sectionId, isMainActivity);
								break;
							case "Crime":
								update_downtimeCrime(sectionId, isMainActivity);
								break;
							case "Gambling":
								update_downtimeGambling(sectionId, isMainActivity);
								break;
							case "None":
								update_downtimeNone(sectionId, isMainActivity);
								break;
							case "Proficience":
								update_downtimeProficience(sectionId, isMainActivity);
								break;
							case "Relaxation":
								update_downtimeRelaxation(sectionId, isMainActivity);
								break;
							case "Research":
								update_downtimeResearch(sectionId, isMainActivity);
								break;
							case "Socializing":
								update_downtimeSocializing(sectionId, isMainActivity);
								break;
							case "Training":
								update_downtimeTraining(sectionId, isMainActivity);
								break;
							case "Work":
								update_downtimeWork(sectionId, isMainActivity);
								break;
						}
					}
				});
			}
		});
	});
}

var update_downtimeCommunityService = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME COMMUNITY SERVICE");

	var update = [];
	var attr_type = ["downtimeCommunityVocation"];

	getAttrs(attr_type, function (w) {
		getSectionIDs("repeating_communitymodifiers", function (idarray) {

			var vocationType = w["downtimeCommunityVocation"];

			var attr_fields = ["morale", "resolve", "karma", "fate",
				"vocationScore-" + vocationType,
				"vocationTier-" + vocationType,
				"vocationProgress-" + vocationType,
				"vocationProgressMax-" + vocationType
			];

			_.each(idarray, function (currentID) {
				attr_fields.push("repeating_communitymodifiers_" + currentID + "_name");
				attr_fields.push("repeating_communitymodifiers_" + currentID + "_cost");
				attr_fields.push("repeating_communitymodifiers_" + currentID + "_mod");
				attr_fields.push("repeating_communitymodifiers_" + currentID + "_advantage");
				attr_fields.push("repeating_communitymodifiers_" + currentID + "_isSelected");
			});

			getAttrs(attr_fields, function (v) {

				// variables
				var tier = v["vocationTier-" + vocationType];
				var detailsOutput = "";
				var morale = isNaN(parseInt(v["morale"], 10)) ? 0 : parseInt(v["morale"], 10);
				var resolve = isNaN(parseInt(v["resolve"], 10)) ? 0 : parseInt(v["resolve"], 10);
				var karma = isNaN(parseInt(v["karma"], 10)) ? 0 : parseInt(v["karma"], 10);
				var fate = isNaN(parseInt(v["fate"], 10)) ? 0 : parseInt(v["fate"], 10);
				var moraleBonus = 0;
				var karmaBonus = 0;
				var progress = 0;
				var progressBonus = 0;
				var progressMax = 0;
				var tierIncreased = false;
				var costModifierBonus = 0;
				var hasAdvantage = false;
				var checkModifierBonus = 0;

				// set the service title
				detailsOutput = "Doing charity as " + vocationType;


				// get modifiers
				_.each(idarray, function (currentID) {
					if (v["repeating_communitymodifiers_" + currentID + "_isSelected"] == "1") {
						var mod = isNaN(parseInt(v["repeating_communitymodifiers_" + currentID + "_mod"], 10)) ? 0 : parseInt(v["repeating_communitymodifiers_" + currentID + "_mod"], 10);

						if (mod > 0) {
							checkModifierBonus += mod;
							detailsOutput += "\nGained +" + mod + " bonus to check from " + v["repeating_communitymodifiers_" + currentID + "_name"];
						}

						if (v["repeating_communitymodifiers_" + currentID + "_advantage"] == "1") {
							hasAdvantage = true;
							detailsOutput += "\nGained Advantage from " + v["repeating_communitymodifiers_" + currentID + "_name"];
						}

						costModifierBonus += isNaN(parseInt(v["repeating_communitymodifiers_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_communitymodifiers_" + currentID + "_cost"], 10);
					}
				});


				// now perform the checks for the service
				var totalCheck = 0;
				var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);
				var checkCount = isMainActivity ? 3 : 1;
				while (checkCount > 0) {
					checkCount--;
					var check = get_random_die(20);
					if (hasAdvantage) {
						var check2 = get_random_die(20);
						check = check2 > check ? check2 : check;
					}
					check += vocationBonus + checkModifierBonus;

					totalCheck += check;
				}
				detailsOutput += "\nMade a " + vocationType + " check (" + totalCheck + ")";


				// calculate the rewards
				var modPoints = Math.floor(totalCheck / 5);
				if (modPoints >= 8) {
					moraleBonus = 15;
				} else {
					moraleBonus = modPoints * 2;
				}
				modPoints -= 5;
				if (modPoints > 0) {
					karmaBonus = modPoints * 2;
				}


				// gain morale
				if (moraleBonus > 0) {
					detailsOutput += "\n Gained " + moraleBonus + " morale";
					morale += moraleBonus;

					// increase resolve if necessary
					var isDoneIncreasingResolve = false;
					var resolveIncreased = false;
					while (!isDoneIncreasingResolve) {
						var nextMoraleValue = 10 + (resolve * 10);
						if (morale >= nextMoraleValue) {
							morale -= nextMoraleValue;
							detailsOutput += "\n Gained a point of resolve!";
							resolve++;
							resolveIncreased = true;
						} else {
							isDoneIncreasingResolve = true;
						}
					}

					// update values
					update["morale"] = morale;
					if (resolveIncreased) {
						update["resolve"] = resolve;
					}
				}

				// gain karma
				if (karmaBonus > 0) {
					detailsOutput += "\n Gained " + karmaBonus + " karma";
					karma += karmaBonus;

					// increase resolve if necessary
					var isDoneIncreasingFate = false;
					var fateIncreased = false;
					while (!isDoneIncreasingFate) {

						if (karma >= 50) {
							karma -= 50;
							detailsOutput += "\n Gained a point of fate!";
							fate++;
							fateIncreased = true;
						} else {
							isDoneIncreasingFate = true;
						}
					}

					// update values
					update["karma"] = karma;
					if (fateIncreased) {
						update["fate"] = fate;
					}
				}

				// now gain the progress from training
				progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
				progressBonus = Math.ceil(vocationBonus / 3);
				if (isMainActivity) {
					progressBonus *= 2;
				}
				progress += progressBonus;

				// display and increase the progress
				detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
				increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

				// update tier and progress data
				if (tierIncreased) {
					update["vocationTier-" + vocationType] = tier;
					update["vocationProgressMax-" + vocationType] = progressMax;
				}
				update["vocationProgress-" + vocationType] = progress;


				// record the amount spent
				if (costModifierBonus > 0) {
					detailsOutput += "\n Spent " + costModifierBonus + "J";
				}

				// set attributes
				setAttrs(update, {
						silent: true
					},
					update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -costModifierBonus, 0, 0));

			});
		});
	});
}

var update_downtimeCrime = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME CRIME");

	var update = {};
	var attr_fields = ["downtimeCrimeTypeMain", "downtimeCrimeDifficulty",
		"stealth_bonus", "disable_device_bonus"
	];

	getSectionIDs("repeating_crimemodifiers", function (idarray) {

		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_name");
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_cost");
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_type");
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_mod");
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_retries");
			attr_fields.push("repeating_crimemodifiers_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (v) {

			var customSkill = v["downtimeCrimeTypeMain"] + "_bonus";

			// get the third skill we'll be using
			getAttrs([customSkill], function (w) {

				// variables
				var detailsOutput = "";
				var crimeType = "";
				var customSkillName = "";
				var dc = 0;
				var reward = 0;
				var retries = 0;
				var successes = 0;
				var customModBonus = 0;
				var disable_deviceModBonus = 0;
				var stealthModBonus = 0;
				var costModifierBonus = 0;

				// get the crime type's true name
				if (!isMainActivity) {
					crimeType = "Pickpocketing Spree";
					customSkillName = "Sleight of Hand";
				} else {
					switch (v["downtimeCrimeTypeMain"]) {
						case "investigation":
							crimeType = "Heist";
							customSkillName = "Investigation";
							break;
						case "deception":
							crimeType = "Swindle";
							customSkillName = "Deception";
							break;
						case "perception":
							crimeType = "Marked Crime";
							customSkillName = "Perception";
							break;
						case "sleight_of_hand":
							crimeType = "Pickpocketing Spree";
							customSkillName = "Sleight of Hand";
							break;
					}
				}

				// pickpocketing is always simple
				if (crimeType == "Pickpocketing Spree") {
					dc = 10;
					reward = 100 + Math.floor(Math.random() * 2500);
					detailsOutput = "Performed a Pickpocketing Spree";
				} else {
					console.log("downtimeCrimeDifficulty: " + v["downtimeCrimeDifficulty"]);
					switch (v["downtimeCrimeDifficulty"]) {
						case "Simple":
							dc = 15;
							reward = 2500 + Math.floor(Math.random() * 2500);
							detailsOutput = "Performed a Simple " + crimeType;
							break;
						case "Advanced":
							dc = 20;
							reward = 5000 + Math.floor(Math.random() * 5000);
							detailsOutput = "Performed an Advanced " + crimeType;
							break;
						case "Challenging":
							dc = 25;
							reward = 7500 + Math.floor(Math.random() * 12500);
							detailsOutput = "Performed a Challenging " + crimeType;
							break;
						case "Dangerous":
							dc = 30;
							reward = 10000 + Math.floor(Math.random() * 40000);
							detailsOutput = "Performed a Dangerous " + crimeType;
							break;
					}
				}


				// get modifiers
				_.each(idarray, function (currentID) {
					if (v["repeating_crimemodifiers_" + currentID + "_isSelected"] == "1") {

						// determine any mods
						var modifierMod = isNaN(parseInt(v["repeating_crimemodifiers_" + currentID + "_mod"], 10)) ? 0 : parseInt(v["repeating_crimemodifiers_" + currentID + "_mod"], 10);
						if (modifierMod != 0) {

							switch (v["repeating_crimemodifiers_" + currentID + "_type"]) {
								case "deception":
									if (customSkillName == "Deception") {
										customModBonus += modifierMod;
									}
									break;
								case "disable_device":
									disable_deviceModBonus += modifierMod;
									break;
								case "investigation":
									if (customSkillName == "Investigation") {
										customModBonus += modifierMod;
									}
									break;
								case "perception":
									if (customSkillName == "Deception") {
										customModBonus += modifierMod;
									}
									break;
								case "sleight_of_hand":
									if (customSkillName == "Sleight of Hand") {
										customModBonus += modifierMod;
									}
									break;
								case "stealth":
									stealthModBonus += modifierMod;
									break;
								case "all":
									customModBonus += modifierMod;
									disable_deviceModBonus += modifierMod;
									stealthModBonus += modifierMod;
									break;
							}
						}

						retries += isNaN(parseInt(v["repeating_crimemodifiers_" + currentID + "_retries"], 10)) ? 0 : parseInt(v["repeating_crimemodifiers_" + currentID + "_retries"], 10);

						costModifierBonus += isNaN(parseInt(v["repeating_crimemodifiers_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_crimemodifiers_" + currentID + "_cost"], 10);
					}
				});

				// now perform the checks
				var done = false;

				// first stealth
				var stealthBonus = isNaN(parseInt(v["stealth_bonus"], 10)) ? 0 : parseInt(v["stealth_bonus"], 10);
				stealthBonus += stealthModBonus;
				done = false;
				while (!done) {
					var stealthCheck = stealthBonus + get_random_die(20);
					if (stealthCheck >= dc) {
						detailsOutput += "\nPassed Stealth Check (" + stealthCheck + ")";
						successes++;
						done = true;
					} else {
						detailsOutput += "\nFailed Stealth Check (" + stealthCheck + ")";
					}

					if (retries > 0) {
						detailsOutput += " Retrying...";
						retries--;
					} else {
						done = true;
					}
				}

				// second disable device
				var disableDeviceBonus = isNaN(parseInt(v["disable_device_bonus"], 10)) ? 0 : parseInt(v["disable_device_bonus"], 10);
				disableDeviceBonus += disable_deviceModBonus;
				done = false;

				while (!done) {
					var disableDeviceCheck = disableDeviceBonus + get_random_die(20);
					if (disableDeviceCheck >= dc) {
						detailsOutput += "\nPassed Disable Device Check (" + disableDeviceCheck + ")";
						successes++;
					} else {
						detailsOutput += "\nFailed Disable Device Check (" + disableDeviceCheck + ")";
					}

					if (retries > 0) {
						detailsOutput += " Retrying...";
						retries--;
					} else {
						done = true;
					}
				}

				// third custom check
				var customBonus = isNaN(parseInt(w[customSkill], 10)) ? 0 : parseInt(w[customSkill], 10);
				customBonus += customModBonus;
				done = false;
				while (!done) {
					var customCheck = customBonus + get_random_die(20);
					if (customCheck >= dc) {
						detailsOutput += "\nPassed " + customSkillName + " Check (" + customCheck + ")";
						successes++;
						done = true;
					} else {
						detailsOutput += "\nFailed " + customSkillName + " Check (" + customCheck + ")";
					}

					if (retries > 0) {
						detailsOutput += " Retrying...";
						retries--;
					} else {
						done = true;
					}
				}

				// now determine results
				var jinBonus = 0;
				jinBonus -= costModifierBonus;
				switch (successes) {
					case 3:
						// gain the full reward
						detailsOutput += "\n Gained a " + reward + "J reward";
						jinBonus = reward;
						break;
					case 2:
						// gain half of the reward
						reward = Math.floor(reward * 0.5);
						detailsOutput += "\n Gained a " + reward + "J reward";
						jinBonus = reward;
						break;
					case 1:
						// gain no reeward
						detailsOutput += "\n Failed the " + crimeType + " but got away safely";
						jinBonus = reward;
						break;
					case 0:
						// gain no reeward
						detailsOutput += " Jailed with a " + reward * 2 + " Jin fine or " + Math.ceil(reward / 5000) + " weeks in prison. Can spend all Fate, Resolve, and Inspiration to cancel.";
						break;
				}

				update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, jinBonus, 0, 0);
			});
		});

	});
}

var update_downtimeGambling = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME GAMBLING");

	var detailsOutput = "No Downtime Activity Performed";
	update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, 0, 0, 0);
}

var update_downtimeNone = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME NONE");

	var detailsOutput = "No Downtime Activity Performed";
	update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, 0, 0, 0);
}

var update_downtimeCompetition = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME COMPETITION");

	var update = {};
	var attr_type = ["downtimeCompetitionVocation"];

	getAttrs(attr_type, function (w) {

		getSectionIDs("repeating_competitionmodifiers", function (idarray) {

			var vocationType = w["downtimeCompetitionVocation"];

			var attr_fields = ["morale", "resolve", "karma", "fate",
				"vocationScore-" + vocationType,
				"vocationTier-" + vocationType,
				"vocationProgress-" + vocationType,
				"vocationProgressMax-" + vocationType
			];

			_.each(idarray, function (currentID) {
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_name");
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_cost");
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_type");
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_mod");
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_advantage");
				attr_fields.push("repeating_competitionmodifiers_" + currentID + "_isSelected");
			});

			getAttrs(attr_fields, function (v) {

				// variables
				var tier = v["vocationTier-" + vocationType];
				var detailsOutput = "";
				var reward = 0;
				var baseDC = 5;
				var baseDCIncrement = 5;
				var progress = 0;
				var progressBonus = 0;
				var progressMax = 0;
				var tierIncreased = false;
				var costModifierBonus = 0;
				var hasAdvantage = false;
				var checkModifierBonus = 0;
				var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);

				// variables
				detailsOutput = "Competed in a " + vocationType + " competition";


				// get modifiers
				_.each(idarray, function (currentID) {
					if (v["repeating_competitionmodifiers_" + currentID + "_isSelected"] == "1") {
						if (v["repeating_competitionmodifiers_" + currentID + "_type"] == "all" || v["repeating_competitionmodifiers_" + currentID + "_type"] == vocationType) {

							var mod = isNaN(parseInt(v["repeating_competitionmodifiers_" + currentID + "_mod"], 10)) ? 0 : parseInt(v["repeating_competitionmodifiers_" + currentID + "_mod"], 10);

							if (mod > 0) {
								checkModifierBonus += mod;
								detailsOutput += "\nGained +" + mod + " bonus to check from " + v["repeating_competitionmodifiers_" + currentID + "_name"];
							}

							if (v["repeating_competitionmodifiers_" + currentID + "_advantage"] == "1") {
								hasAdvantage = true;
								detailsOutput += "\nGained Advantage from " + v["repeating_competitionmodifiers_" + currentID + "_name"];
							}

							costModifierBonus += isNaN(parseInt(v["repeating_competitionmodifiers_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_competitionmodifiers_" + currentID + "_cost"], 10);
						}
					}
				});

				// determine tier modifiers
				switch (tier) {
					case "Novice":
						baseDC = 5;
						baseDCIncrement = 5;
						reward = 1600;
						break;
					case "Adept":
						baseDC = 10;
						baseDCIncrement = 5;
						reward = 3000;
						break;
					case "Professional":
						baseDC = 10;
						baseDCIncrement = 10;
						reward = 6000;
						break;
					case "Expert":
						baseDC = 15;
						baseDCIncrement = 10;
						reward = 12000;
						break;
					case "Master":
						baseDC = 20;
						baseDCIncrement = 10;
						reward = 20000;
						break;
				}

				// calculate our modifiers
				var totalCheck = vocationBonus;
				totalCheck += checkModifierBonus;

				// now perform each check
				var successes = 0;
				var checkCount = 3;
				while (checkCount > 0) {
					checkCount--;
					var randomizer = get_random_die(6) + get_random_die(6) + get_random_die(6);
					var roll = parseInt(get_random_die(20) + totalCheck, 10);
					var dc = baseDC + randomizer;

					if (roll >= dc) {
						successes++;
						detailsOutput += "\nPassed Check (" + roll + " vs. DC" + dc + ")";
						baseDC += baseDCIncrement;
					} else {
						detailsOutput += "\nFailed Check (" + roll + " vs. DC" + dc + ")";
					}
				}

				// calculate the reward
				if (isMainActivity) {
					reward = Math.floor(reward / 2);
				}
				switch (successes) {
					case 2:
						reward = Math.floor(reward / 2);
						break;
					case 1:
						reward = Math.floor(reward / 4);
						break;
					case 0:
						reward = 0;
				}

				// print the reward
				if (reward > 0) {
					detailsOutput += "\n Gained a " + reward + "J reward";
				} else {
					detailsOutput += "\n Lost Your competition. Gained 0J";
				}

				// now gain the progress from training
				progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
				progressBonus = Math.ceil(vocationBonus / 3);
				if (isMainActivity) {
					progressBonus *= 2;
				}
				progress += progressBonus;

				// display and increase the progress
				detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
				increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

				// update tier and progress data
				if (tierIncreased) {
					update["vocationTier-" + vocationType] = tier;
					update["vocationProgressMax-" + vocationType] = progressMax;
				}
				update["vocationProgress-" + vocationType] = progress;

				update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, 0, 0);
			});
		});
	});
}

var update_downtimeProficience = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME PROFICIENCE");

	var update = {};
	var attr_fields = ["downtimeProficienceTrainer", "intelligence_mod"];

	getSectionIDs("repeating_proficienceTasks", function (idarray) {
		getSectionIDs("repeating_proficiencemodifiers", function (idarray2) {

			_.each(idarray, function (currentID) {
				attr_fields.push("repeating_proficienceTasks_" + currentID + "_task");
				attr_fields.push("repeating_proficienceTasks_" + currentID + "_difficulty");
				attr_fields.push("repeating_proficienceTasks_" + currentID + "_progress");
				attr_fields.push("repeating_proficienceTasks_" + currentID + "_isSelected");
			});

			_.each(idarray2, function (currentID) {
				attr_fields.push("repeating_proficiencemodifiers_" + currentID + "_name");
				attr_fields.push("repeating_proficiencemodifiers_" + currentID + "_cost");
				attr_fields.push("repeating_proficiencemodifiers_" + currentID + "_mod");
				attr_fields.push("repeating_proficiencemodifiers_" + currentID + "_isSelected");
			});

			getAttrs(attr_fields, function (v) {

				// variables
				var detailsOutput = "Training ";
				var cost = 0;
				var progress = 0;
				var progressBonus = 0;
				var difficulty = 0;
				var difficultyType = 0;
				var intelligenceMod = 0;
				var progressModifierBonus = 0;
				var costModifierBonus = 0;

				// find the topic id
				var topicId = "";
				_.each(idarray, function (currentID) {
					// if the activity we're looking at is selected then we can use it
					if (topicId == "" && v["repeating_proficienceTasks_" + currentID + "_isSelected"] == "1") {
						topicId = currentID;
					}
				});

				// we can't continue if there is no topic or resource
				if (topicId != "") {

					// get the difficulty info
					difficultyType = v["repeating_proficienceTasks_" + topicId + "_difficulty"];
					switch (difficultyType) {
						case "Artisan Skill":
							difficulty = 30;
							break;
						case "Entertainment Skill":
							difficulty = 30;
							break;
						case "Technical Skill":
							difficulty = 30;
							break;
						case "Skill Specialization":
							difficulty = 30;
							break;
						case "Tier1 Technique":
							difficulty = 15;
							break;
						case "Tier2 Technique":
							difficulty = 30;
							break;
						case "Tier3 Technique":
							difficulty = 45;
							break;
						case "Language":
							difficulty = 60;
							break;
						case "Recipe":
							difficulty = 5;
							break;
						case "Cantrip (0 level)":
							difficulty = 30;
							break;
						case "Spell (1st level)":
							difficulty = 10;
							break;
						case "Spell (2nd level)":
							difficulty = 15;
							break;
						case "Spell (3rd level)":
							difficulty = 20;
							break;
						case "Spell (4th level)":
							difficulty = 25;
							break;
						case "Spell (5th level)":
							difficulty = 30;
							break;
						case "Spell (6th level)":
							difficulty = 40;
							break;
						case "Spell (7th level)":
							difficulty = 50;
							break;
						case "Spell (8th level)":
							difficulty = 60;
							break;
						case "Spell (9th level)":
							difficulty = 70;
							break;
					}

					// add the topic name
					detailsOutput += v["repeating_proficienceTasks_" + topicId + "_task"] + " (" + difficultyType + ")";

					// get modifiers
					_.each(idarray2, function (currentID) {
						if (v["repeating_proficiencemodifiers_" + currentID + "_isSelected"] == "1") {
							var modifierProgress = isNaN(parseInt(v["repeating_proficiencemodifiers_" + currentID + "_mod"], 10)) ? 0 : parseInt(v["repeating_proficiencemodifiers_" + currentID + "_mod"], 10);

							if (modifierProgress > 0) {
								progressModifierBonus += modifierProgress;
								detailsOutput += "\nGained " + modifierProgress + " progress from " + v["repeating_proficiencemodifiers_" + currentID + "_name"];
							}

							costModifierBonus += isNaN(parseInt(v["repeating_proficiencemodifiers_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_proficiencemodifiers_" + currentID + "_cost"], 10);
						}
					});

					// set progress
					progress = isNaN(parseInt(v["repeating_proficienceTasks_" + topicId + "_progress"], 10)) ? 0 : parseInt(v["repeating_proficienceTasks_" + topicId + "_progress"], 10);

					// gain the base progress
					if (isMainActivity) {
						progressBonus += 7;
					} else {
						progressBonus += 3;
					}

					// add the training
					switch (v["downtimeProficienceTrainer"]) {
						case "None":
							break;
						case "Adept":
							progressBonus += 2;
							cost += 1000;
							detailsOutput += "\nTraining with an Adept Trainer.";
							break;
						case "Professional":
							progressBonus += 4;
							cost += 3000;
							detailsOutput += "\nTraining with a Professional Trainer.";
							break;
						case "Expert":
							progressBonus += 8;
							cost += 8000;
							detailsOutput += "\nTraining with an Adept Trainer.";
							break;
						case "Master":
							progressBonus += 20;
							cost += 20000;
							detailsOutput += "\nTraining with a Master Trainer.";
							break;
					}

					// gain the modifier
					console.log("progressModifierBonus: " + progressModifierBonus);
					progressBonus += progressModifierBonus;

					// intelligence check
					intelligenceMod = isNaN(parseInt(v["intelligence_mod"], 10)) ? 0 : parseInt(v["intelligence_mod"], 10);
					if (!isMainActivity) {
						intelligenceMod = Math.ceil(intelligenceMod / 2);
					}
					console.log("intelligenceMod: " + intelligenceMod);
					progressBonus += intelligenceMod;
					console.log("progressBonus: " + progressBonus);

					// total the progress
					progress += progressBonus;

					// display the progress
					detailsOutput += "\n Gained " + progressBonus + " progress";

					// determine if there's enough progress
					if (progress >= difficulty) {
						detailsOutput += "\n Finished training. Learned your task";
					}

					// set cost
					cost += costModifierBonus;
					if (cost > 0) {
						detailsOutput += "\n Spent " + cost + "J";
					}

					// update the progress and its display property
					update["repeating_proficienceTasks_" + topicId + "_progress"] = progress;
					update["repeating_proficienceTasks_" + topicId + "_progressDisplay"] = " [" + progress + "/" + difficulty + "]";

					setAttrs(update, {
							silent: true
						},
						update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -cost, 0, 0));
				} else {
					console.log("The topic (" + topicId + ") was not found.");
				}
			});
		});
	});
}

var update_downtimeRelaxation = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME RELAXATION");

	var update = {};
	var attr_fields = ["morale", "resolve"];

	getSectionIDs("repeating_relaxationactivities", function (idarray) {

		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_title");
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_cost");
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_healing");
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_vitalityHealing");
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_morale");
			attr_fields.push("repeating_relaxationactivities_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (v) {

			// variables
			var detailsOutput = "Relaxed with ";
			var cost = 0;
			var hp = 0;
			var vitality = 0;
			var morale = isNaN(parseInt(v["morale"], 10)) ? 0 : parseInt(v["morale"], 10);
			var resolve = isNaN(parseInt(v["resolve"], 10)) ? 0 : parseInt(v["resolve"], 10);
			var moraleBonus = 0;

			if (isMainActivity) {

				var foundActivity = false;
				_.each(idarray, function (currentID) {

					// if the activity we're looking at is selected then we can 
					if (!foundActivity && v["repeating_relaxationactivities_" + currentID + "_isSelected"] == "1") {

						foundActivity = true;
						detailsOutput += v["repeating_relaxationactivities_" + currentID + "_title"];
						cost += isNaN(parseInt(v["repeating_relaxationactivities_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_relaxationactivities_" + currentID + "_cost"], 10);
						hp += isNaN(parseInt(v["repeating_relaxationactivities_" + currentID + "_healing"], 10)) ? 0 : parseInt(v["repeating_relaxationactivities_" + currentID + "_healing"], 10);
						vitality += isNaN(parseInt(v["repeating_relaxationactivities_" + currentID + "_vitalityHealing"], 10)) ? 0 : parseInt(v["repeating_relaxationactivities_" + currentID + "_vitalityHealing"], 10);
						moraleBonus += isNaN(parseInt(v["repeating_relaxationactivities_" + currentID + "_morale"], 10)) ? 0 : parseInt(v["repeating_relaxationactivities_" + currentID + "_morale"], 10);
					}
				});

				// if nothing is selected, reproduce the free relaxation variables
				if (!foundActivity) {
					detailsOutput += "Free Relaxation";
					hp += 5;
					vitality += 5;
					moraleBonus += 20;
				}
			} else {
				// variables
				detailsOutput += "Free Relaxation (Minor)";
				moraleBonus += 5;
			}

			// add the morale
			morale += moraleBonus;

			// print details
			if (moraleBonus > 0) {
				detailsOutput += "\n Gained " + moraleBonus + " morale";
			}
			if (cost < 0) {
				detailsOutput += "\n Spent " + cost + "J";
			}

			// increase resolve if necessary
			var isDoneIncreasingResolve = false;
			var resolveIncreased = false;
			while (!isDoneIncreasingResolve) {
				var nextMoraleValue = 10 + (resolve * 10);
				if (morale >= nextMoraleValue) {
					morale -= nextMoraleValue;
					detailsOutput += "\n Gained a point of resolve!";
					resolve++;
					resolveIncreased = true;
				} else {
					isDoneIncreasingResolve = true;
				}
			}

			// set resolve if it's changed
			if (resolveIncreased) {
				update["resolve"] = resolve;
			}

			// set morale
			update["morale"] = morale;

			setAttrs(update, {
					silent: true
				},
				update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -cost, hp, vitality));
		});
	});
}

var update_downtimeResearch = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME RESEARCH");

	var update = {};
	var attr_fields = ["intelligence_mod"];

	getSectionIDs("repeating_researchtopics", function (idarray) {
		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_researchtopics_" + currentID + "_topic");
			attr_fields.push("repeating_researchtopics_" + currentID + "_difficulty");
			attr_fields.push("repeating_researchtopics_" + currentID + "_progress");
			attr_fields.push("repeating_researchtopics_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (v) {

			// variables
			var detailsOutput = "Researched ";
			var cost = 0;
			var progress = 0;
			var progressBonus = 0;
			var difficulty = 0;
			var difficultyType = 0;
			var difficultyIncreased = false;
			var progressModifierBonus = 0;
			var costModifierBonus = 0;

			// find the topic id
			var topicId = "";
			_.each(idarray, function (currentID) {
				// if the activity we're looking at is selected then we can use it
				if (topicId == "" && v["repeating_researchtopics_" + currentID + "_isSelected"] == "1") {
					topicId = currentID;
				}
			});

			// we can't continue if there is no topic or resource
			if (topicId != "" && resourceId != "") {

				// get difficulty stats
				switch (parseInt(v["repeating_researchtopics_" + topicId + "_difficulty"], 10)) {
					case 2:
						difficultyType = "Simple";
						difficulty = 2;
						break;
					case 4:
						difficultyType = "Moderate";
						difficulty = 4;
						break;
					case 8:
						difficultyType = "Advanced";
						difficulty = 8;
						break;
					case 14:
						difficultyType = "Challenging";
						difficulty = 14;
						break;
					case 22:
						difficultyType = "Difficult";
						difficulty = 22;
						break;
					case 30:
						difficultyType = "Archaic";
						difficulty = 30;
						break;
					default:
						difficultyType = "Simple";
						difficulty = 2;
						break;
				}

				// add the topic name
				detailsOutput += v["repeating_researchtopics_" + topicId + "_topic"] + " (" + difficultyType + ")";

				// set progress
				progress = isNaN(parseInt(v["repeating_researchtopics_" + topicId + "_progress"], 10)) ? 0 : parseInt(v["repeating_researchtopics_" + topicId + "_progress"], 10);
				if (isMainActivity) {
					progressBonus += 7;
				} else {
					progressBonus += 3;
				}
				progressBonus += progressModifierBonus;
				progress += progressBonus;

				// display the progress
				detailsOutput += "\n Gained " + progressBonus + " progress";

				// determine if there's enough progress
				while (progress >= difficulty) {
					progress -= difficulty;

					detailsOutput += "\n Gained " + difficultyType + " Fact. Ask DM for info";
					difficultyIncreased = true;

					switch (difficulty) {
						case 2:
							difficultyType = "Moderate";
							difficulty = 4;
							break;
						case 4:
							difficultyType = "Advanced";
							difficulty = 8;
							break;
						case 8:
							difficultyType = "Challenging";
							difficulty = 14;
							break;
						case 14:
							difficultyType = "Difficult";
							difficulty = 22;
							break;
						case 22:
							difficultyType = "Archaic";
							difficulty = 30;
							break;
						default:
							difficultyType = "Moderate";
							difficulty = 4;
							break;
					}

					detailsOutput += "\nUpgrading task to " + difficultyType;
				}

				// set cost
				cost += costModifierBonus;
				if (cost > 0) {
					detailsOutput += "\n Spent " + cost + "J";
				}

				// determine if we need to update the difficulty
				if (difficultyIncreased) {
					update["repeating_researchtopics_" + topicId + "_difficulty"] = difficulty;
				}

				// update the progress and its display property
				update["repeating_researchtopics_" + topicId + "_progress"] = progress;

				setAttrs(update, {
						silent: true
					},
					update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -cost, 0, 0));
			} else {
				console.log("Either the topic (" + topicId + ") or resource (" + resourceId + ") were not found.");
			}
		});
	});
}

var update_downtimeSocializing = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME SOCIALIZING");

	var update = {};
	var attr_fields = ["lifestyle_influence", "downtimeSocializingVenue",
		"downtimeSocializingMeetNewPeople", "charisma_mod"
	];

	getSectionIDs("repeating_socializingactivities", function (idarray) {

		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_socializingactivities_" + currentID + "_name");
			attr_fields.push("repeating_socializingactivities_" + currentID + "_favors");
			attr_fields.push("repeating_socializingactivities_" + currentID + "_rapport");
			attr_fields.push("repeating_socializingactivities_" + currentID + "_classCategory");
			attr_fields.push("repeating_socializingactivities_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (v) {

			// variables
			var venue = v["downtimeSocializingVenue"];
			var detailsOutput = "Socializing at a " + venue + " class venue";

			// see if we're meeting new people
			var meetingNewPeople = v["downtimeSocializingMeetNewPeople"] == "1";

			// get ids of people who are being socialized with
			var socialIds = [];
			_.each(idarray, function (currentID) {
				if (v["repeating_socializingactivities_" + currentID + "_isSelected"] == "1") {
					socialIds.push(currentID);
				}
			});

			if (meetingNewPeople || socialIds.length > 0) {

				// get influence
				var influence = isNaN(parseInt(v["lifestyle_influence"], 10)) ? 0 : parseInt(v["lifestyle_influence"], 10);
				var charisma = isNaN(parseInt(v["charisma_mod"], 10)) ? 0 : parseInt(v["charisma_mod"], 10);
				var repeat = isMainActivity ? 2 : 1;
				while (repeat > 0) {
					repeat--;
					influence += charisma + get_random_die(20);
				}
				detailsOutput += "\n Gained " + influence + " influence from socializing";

				// gain influence from venue
				var cost = 0;
				switch (venue) {
					case "Free":
						venue = "Low";
						break;
					case "Low":
						influence += 10;
						cost = 100;
						detailsOutput += "\nSpent " + cost + "J at the enue";
						break;
					case "Medium":
						influence += 30;
						cost = 500;
						detailsOutput += "\nSpent " + cost + "J at the venue";
						break;
					case "High":
						influence += 100;
						cost = 2000;
						detailsOutput += "\nSpent " + cost + "J at the venue";
						break;
				}

				// determine influence for each activity
				var taskCount = meetingNewPeople ? 1 : 0;
				taskCount += socialIds.length;
				var influenceMod = Math.ceil(influence / taskCount);

				// meet some people
				var carousingPoints = influenceMod;
				var character;
				var newCharacterClass = "Low";
				while (carousingPoints > 0) {

					// get a randomized class
					newCharacterClass = CharacterClassGenerator(venue);

					if (newCharacterClass == "Elite") {
						carousingPoints -= 40;
						detailsOutput += "\n Befriended an Elite Character. Ask the DM for details.";
					} else {

						switch (newCharacterClass) {
							case "High":
								carousingPoints -= 30;
								break;
							case "Medium":
								carousingPoints -= 15;
								break;
							case "Low":
							default:
								carousingPoints -= 5;
								break;
						}

						// create a random character of the class we chose
						character = GetBlankCharacter();
						character.nationality = "Minerva";
						character.ancestry = CharacterRaceGenerator(character.nationality);
						character.gender = CharacterGenderGenerator();
						character.name = CharacterNameGenerator(character.nationality, character.ancestry, character.gender);
						character.nature = CharacterNatureGenerator();
						character.classCategory = newCharacterClass;
						character.sector = CharacterSectorGenerator(character.classCategory);
						character.profession = CharacterProfessionGenerator(character.classCategory, character.sector).title;

						// create update data for the character
						var newrowid = generateRowID();
						var rngRapport = get_random_die(20);
						carousingPoints -= rngRapport;
						update["repeating_socializingactivities_" + newrowid + "_name"] = character.name;
						update["repeating_socializingactivities_" + newrowid + "_favors"] = 0;
						update["repeating_socializingactivities_" + newrowid + "_rapport"] = rngRapport;
						update["repeating_socializingactivities_" + newrowid + "_ancestry"] = character.ancestry;
						update["repeating_socializingactivities_" + newrowid + "_gender"] = character.gender;
						update["repeating_socializingactivities_" + newrowid + "_classCategory"] = character.classCategory;
						update["repeating_socializingactivities_" + newrowid + "_profession"] = character.profession;
						update["repeating_socializingactivities_" + newrowid + "_isSelected"] = 0;

						// declare the find
						detailsOutput += "\n Befriended " + character.name + ", a " + character.classCategory + " class " + character.profession;
					}
				}

				// increase rapport with socializing individuals
				var name = "";
				var rapport = 0;
				var rapportGain = 0;
				var favors = 0;
				var classCategory = 0;
				_.each(socialIds, function (id) {

					// get variables
					name = v["repeating_socializingactivities_" + id + "_name"];
					rapport = isNaN(parseInt(v["repeating_socializingactivities_" + id + "_rapport"], 10)) ? 0 : parseInt(v["repeating_socializingactivities_" + id + "_rapport"], 10);
					favors = isNaN(parseInt(v["repeating_socializingactivities_" + id + "_favors"], 10)) ? 0 : parseInt(v["repeating_socializingactivities_" + id + "_favors"], 10);
					classCategory = v["repeating_socializingactivities_" + id + "_classCategory"];


					// increase rapport based on class
					switch (classCategory) {
						case "Low":
							rapportGain = Math.ceil(influenceMod * 1.5);
							break;
						case "High":
							rapportGain = Math.ceil(influenceMod * 0.5);
							break;
						case "Elite":
							rapportGain = Math.ceil(influenceMod * 0.3);
							break;
						case "Medium":
						default:
							rapportGain = influenceMod;
							break;
					}

					// gain the rapport
					rapport += rapportGain;
					detailsOutput += "/n Gained " + rapportGain + " with " + name;

					var isDoneIncreasingFavors = false;
					var favorsIncreased = false;
					while (!isDoneIncreasingFavors) {

						if (rapport >= 100) {
							rapport -= 100;
							detailsOutput += "\n Gained a favor from " + name;
							favors++;
							favorsIncreased = true;
						} else {
							isDoneIncreasingFavors = true;
						}
					}

					// update stats
					if (favorsIncreased) {
						update["repeating_socializingactivities_" + id + "_favors"] = favors;
					}
					update["repeating_socializingactivities_" + id + "_rapport"] = rapport;

				});

				setAttrs(update, {
						silent: true
					},
					update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -cost, 0, 0));
			}
		});
	});
}

var update_downtimeTraining = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME TRAINING");

	var update = {};
	var attr_type = ["downtimeTrainingType"];

	getSectionIDs("repeating_trainingmodifiers", function (idarray) {

		getAttrs(attr_type, function (w) {

			var trainingType = w["downtimeTrainingType"];

			var attr_fields = ["downtimeTrainingTrainer",
				"vocationScore-" + trainingType, "vocationTier-" + trainingType,
				"vocationProgress-" + trainingType, "vocationProgressMax-" + trainingType
			];

			_.each(idarray, function (currentID) {
				attr_fields.push("repeating_trainingmodifiers_" + currentID + "_name");
				attr_fields.push("repeating_trainingmodifiers_" + currentID + "_cost");
				attr_fields.push("repeating_trainingmodifiers_" + currentID + "_type");
				attr_fields.push("repeating_trainingmodifiers_" + currentID + "_mod");
				attr_fields.push("repeating_trainingmodifiers_" + currentID + "_isSelected");
			});

			getAttrs(attr_fields, function (v) {

				// variables
				var tier = v["vocationTier-" + trainingType];
				var detailsOutput = "";
				var cost = 0;
				var progress = 0;
				var progressBonus = 0;
				var progressMax = 0;
				var tierIncreased = false;
				var progressModifierBonus = 0;
				var costModifierBonus = 0;

				if (tier != "Master") {

					// set the message
					detailsOutput = "Training " + trainingType + " (" + tier + ")";

					// get modifiers
					_.each(idarray, function (currentID) {
						if (v["repeating_trainingmodifiers_" + currentID + "_isSelected"] == "1") {
							if (v["repeating_trainingmodifiers_" + currentID + "_type"] == "all" || v["repeating_trainingmodifiers_" + currentID + "_type"] == trainingType) {
								var modifierProgress = isNaN(parseInt(v["repeating_trainingmodifiers_" + currentID + "_mod"], 10)) ? 0 : parseInt(v["repeating_trainingmodifiers_" + currentID + "_mod"], 10);

								if (modifierProgress > 0) {
									progressModifierBonus += modifierProgress;
									detailsOutput += "\nGained " + modifierProgress + " progress from " + v["repeating_trainingmodifiers_" + currentID + "_name"];
								}

								costModifierBonus += isNaN(parseInt(v["repeating_trainingmodifiers_" + currentID + "_cost"], 10)) ? 0 : parseInt(v["repeating_trainingmodifiers_" + currentID + "_cost"], 10);
							}
						}
					});

					// set progress
					progress = isNaN(parseInt(v["vocationProgress-" + trainingType], 10)) ? 0 : parseInt(v["vocationProgress-" + trainingType], 10);
					progress += progressModifierBonus;

					// make main checks
					var totalCheck = 0;
					var check = 0;
					var repeats = isMainActivity ? 2 : 1;
					while (repeats > 0) {
						check = isNaN(parseInt(v["vocationScore-" + trainingType], 10)) ? 0 : parseInt(v["vocationScore-" + trainingType], 10);
						check += get_random_die(20);
						check = Math.floor(check / 3);
						totalCheck += check;
						repeats--;
					}
					progressBonus += totalCheck;

					// add the training from a trainer
					switch (v["downtimeTrainingTrainer"]) {
						case "None":
							break;
						case "Adept":
							progressBonus += 3;
							cost += 1000;
							detailsOutput += "\nTraining with an Adept Trainer.\n Spent 1,000J";
							break;
						case "Professional":
							progressBonus += 6;
							cost += 3000;
							detailsOutput += "\nTraining with a Professional Trainer.\n Spent 3,000J";
							break;
						case "Expert":
							progressBonus *= 2;
							cost += 8000;
							detailsOutput += "\nTraining with an Expert Trainer.\n Spent 8,000J";
							break;
						case "Master":
							progressBonus *= 4;
							cost += 20000;
							detailsOutput += "\nTraining with a Master Trainer.\n Spent 20,000J";
							break;
					}

					// total the progress
					progress += progressBonus;

					// display the progress
					detailsOutput += "\n Gained " + progressBonus + " progress (bonus " + totalCheck + ")";

					// increase progress
					increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

					// set cost
					cost += costModifierBonus;
					if (cost > 0) {
						detailsOutput += "\n Spent " + cost + "J";
					}

					// update tier
					if (tierIncreased) {
						update["vocationTier-" + trainingType] = tier;
						update["vocationProgressMax-" + trainingType] = progressMax;
					}

					// update the progress and its display property
					update["vocationProgress-" + trainingType] = progress;

					setAttrs(update, {
							silent: true
						},
						update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, -cost, 0, 0));
				}
			});
		});
	});
}

var update_downtimeWork = function (sectionId, isMainActivity) {

	var attr_fields = ["downtimeWorkGeneralCategory"];

	getAttrs(attr_fields, function (v) {

		switch (v["downtimeWorkGeneralCategory"]) {
			case "Crafting":
				start_downtimeWorkCrafting(sectionId, isMainActivity);
				break;
			case "Entertainment":
				start_downtimeWorkEntertainment(sectionId, isMainActivity);
				break;
			case "Monster Hunt":
				start_downtimeWorkMonsterHunt(sectionId, isMainActivity);
				break;
			case "Piecework":
				start_downtimeWorkPiecework(sectionId, isMainActivity);
				break;
			case "Service":
				start_downtimeWorkService(sectionId, isMainActivity);
				break;
			case "Custom":
				start_downtimeWorkCustom(sectionId, isMainActivity);
				break;
		}
	});
}

var update_downtimeWorkCategorySelection = function (newValue) {
	console.log("UPDATING SELECTED DOWNTIME WORK CATEGORY " + newValue);

	var update = {};
	update["downtimeWorkTypeCrafting"] = (newValue == "Crafting") ? "on" : 0;
	update["downtimeWorkTypeEntertainment"] = (newValue == "Entertainment") ? "on" : 0;
	update["downtimeWorkTypeMonsterHunt"] = (newValue == "Monster Hunt") ? "on" : 0;
	update["downtimeWorkTypePiecework"] = (newValue == "Piecework") ? "on" : 0;
	update["downtimeWorkTypeService"] = (newValue == "Service") ? "on" : 0;
	update["downtimeWorkTypeCustom"] = (newValue == "Custom") ? "on" : 0;

	setAttrs(update);
}

var start_downtimeWorkCrafting = function (sectionId, isMainActivity) {

	var attr_type = ["downtimeWorkCraftingVocation"];

	getAttrs(attr_type, function (w) {

		var vocationType = w["downtimeWorkCraftingVocation"];

		var attr_fields = ["downtimeWorkCraftingClass",
			"vocationTier-" + vocationType
		];

		getAttrs(attr_fields, function (v) {

			// variables
			var tier = v["vocationTier-" + vocationType];
			var jobClass = v["downtimeWorkCraftingClass"];
			var dc = 0;
			var reward = 0;

			// get the difficulty info and set the job class if it needs to be reset
			switch (tier) {
				case "Novice":
				case "Adept":
					if (jobClass == "High" || jobClass == "Elite") {
						jobClass = "Medium";
					}
					break;
				case "Professional":
					if (jobClass == "Elite") {
						jobClass = "High";
					}
					break;
			}

			// set the dc and reward
			switch (jobClass) {
				case "Low":
					dc = 10;
					reward = 1000 + (get_random_die(20) * 20);
					break;
				case "Medium":
					dc = 20;
					reward = 2200 + (get_random_die(20) * 50);
					break;
				case "High":
					dc = 30;
					reward = 4200 + (get_random_die(20) * 125);
					break;
				case "Elite":
					dc = 40;
					reward = 8000 + (get_random_die(20) * 200);
					break;
			}

			// set the job title
			var jobTitle = v["downtimeWorkCraftingClass"] + " " + vocationType;

			// now perform the work
			update_downtimeWorkCrafting(sectionId, isMainActivity, jobTitle, vocationType, dc, reward);

		});
	});
}

var update_downtimeWorkCrafting = function (sectionId, isMainActivity, jobTitle, vocationType, dc, reward) {
	console.log("UPDATING DOWNTIME WORK CRAFTING");

	var update = {};
	var attr_fields = ["vocationScore-" + vocationType,
		"vocationTier-" + vocationType,
		"vocationProgress-" + vocationType,
		"vocationProgressMax-" + vocationType
	];

	getAttrs(attr_fields, function (v) {

		// variables
		var tier = v["vocationTier-" + vocationType];
		var detailsOutput = "";
		var progress = 0;
		var progressBonus = 0;
		var progressMax = 0;
		var tierIncreased = false;

		// reduce the reward if this is a minor activity
		if (!isMainActivity) {
			reward = Math.floor(reward / 2);
		}

		// set the working title
		detailsOutput = "Working a " + jobTitle + " Crafting Job";

		// now perform the checks for the job
		var successes = 0;
		var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);

		// perform 3 checks
		var checkCount = 3;
		while (checkCount > 0) {
			checkCount--;

			var vocationCheck = vocationBonus + get_random_die(20);
			if (vocationCheck >= dc) {
				detailsOutput += "\nPassed " + vocationType + " Check (" + vocationCheck + ")";
				successes++;
				done = true;
			} else {
				detailsOutput += "\nFailed " + vocationType + " Check (" + vocationCheck + ")";
			}
		}

		// now determine the jin reward based on success
		if (successes >= 2) {
			detailsOutput += "\n Gained full reward of " + reward + "J";
		} else if (successes == 1) {
			reward = Math.floor(reward / 2);
			detailsOutput += "\n Gained half reward of " + reward + "J";
		} else {
			reward = 0;
			detailsOutput += "\n Failed at Job. Gained no payment";
		}

		// now gain the progress from training
		progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
		progressBonus = Math.ceil(vocationBonus / 3);
		if (isMainActivity) {
			progressBonus *= 2;
		}
		progress += progressBonus;

		// display and increase the progress
		detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
		increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

		// update tier and progress data
		if (tierIncreased) {
			update["vocationTier-" + vocationType] = tier;
			update["vocationProgressMax-" + vocationType] = progressMax;
		}
		update["vocationProgress-" + vocationType] = progress;

		// set attributes
		setAttrs(update, {
				silent: true
			},
			update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, 0, 0));

	});
}

var start_downtimeWorkEntertainment = function (sectionId, isMainActivity) {
	var update = {};
	var attr_type = ["downtimeWorkEntertainmentVocation"];

	getAttrs(attr_type, function (w) {

		var vocationType = w["downtimeWorkEntertainmentVocation"];

		var attr_fields = ["vocationScore-" + vocationType,
			"vocationTier-" + vocationType,
			"vocationProgress-" + vocationType,
			"vocationProgressMax-" + vocationType
		];

		getAttrs(attr_fields, function (v) {

			// variables
			var tier = v["vocationTier-" + vocationType];
			var dc = 30;
			var dcMax = 0;
			var reward = 0;
			var rewardMod = 0;

			// set the dc and reward
			switch (tier) {
				case "Novice":
					dcMax = 20;
					reward = 0;
					rewardMod = 40;
					break;
				case "Adept":
					dcMax = 30;
					reward = 500;
					rewardMod = 50;
					break;
				case "Professional":
					dcMax = 40;
					reward = 1000;
					rewardMod = 70;
					break;
				case "Expert":
					dcMax = 50;
					reward = 1500;
					rewardMod = 100;
					break;
				case "Master":
					dcMax = 60;
					reward = 3000;
					rewardMod = 150;
					break;
			}

			// set the job title
			var jobTitle = vocationType;

			// now perform the work
			update_downtimeWorkEntertainment(sectionId, isMainActivity, jobTitle, vocationType, dc, dcMax, reward, rewardMod);

		});
	});
}

var update_downtimeWorkEntertainment = function (sectionId, isMainActivity, jobTitle, vocationType, dc, dcMax, reward, rewardMod) {
	console.log("UPDATING DOWNTIME WORK ENTERTAINMENT");

	var update = [];
	var attr_fields = ["vocationScore-" + vocationType,
		"vocationTier-" + vocationType,
		"vocationProgress-" + vocationType,
		"vocationProgressMax-" + vocationType
	];

	getAttrs(attr_fields, function (v) {

		// variables
		var tier = v["vocationTier-" + vocationType];
		var detailsOutput = "";
		var progress = 0;
		var progressBonus = 0;
		var progressMax = 0;
		var tierIncreased = false;

		// set the working title
		detailsOutput = "Working a(n) " + jobTitle + " Entertainment Job";

		// now perform the checks for the job
		var totalCheck = 0;
		var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);

		// perform 3 checks
		var checkCount = 3;
		while (checkCount > 0) {
			checkCount--;
			totalCheck += vocationBonus + get_random_die(20);
		}

		// determine if the minimum check is passed
		if (totalCheck >= dc) {
			detailsOutput += "\nPassed " + vocationType + " Check (" + totalCheck + ")";

			// add additional jin based on total check
			totalCheck -= dc;
			if (totalCheck > dcMax) {
				totalCheck = dcMax;
			}
			reward += totalCheck * rewardMod;

			// reduce the reward if this is a minor activity
			if (!isMainActivity) {
				reward = Math.floor(reward / 2);
			}

			detailsOutput += "\n Gained a " + reward + "J reward";
		} else {
			reward = 0;
			detailsOutput += "\nFailed " + vocationType + " Check (" + totalCheck + ")\n Gained no payment";
		}

		// now gain the progress from training
		progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
		progressBonus = Math.ceil(vocationBonus / 3);
		if (isMainActivity) {
			progressBonus *= 2;
		}
		progress += progressBonus;

		// display and increase the progress
		detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
		increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

		// update tier and progress data
		if (tierIncreased) {
			update["vocationTier-" + vocationType] = tier;
			update["vocationProgressMax-" + vocationType] = progressMax;
		}
		update["vocationProgress-" + vocationType] = progress;

		// set attributes
		setAttrs(update, {
				silent: true
			},
			update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, 0, 0));

	});
}

var start_downtimeWorkMonsterHunt = function (sectionId, isMainActivity) {
	console.log("UPDATING DOWNTIME WORK MONSTER HUNT");

	var update = {};
	var callbacks = [];
	var attr_fields = ["base_level", "next_level_exp"];

	getAttrs(attr_fields, function (v) {

		// determine how much exp should be gained
		var nextLevelExp = isNaN(parseInt(v["next_level_exp"], 10)) ? 0 : parseInt(v["next_level_exp"], 10);
		var expPercentageGain = 5 + get_random_die(15);
		var expRange = nextLevelExp - GetExpToNextLevel(isNaN(parseInt(v["base_level"], 10)) ? 1 : parseInt(v["base_level"], 10) - 1);
		var expGain = Math.floor(expRange * expPercentageGain / 100);

		// determine the reward
		var reward = 5000;
		reward += get_random_die(20) * 150;

		// set the job title
		var jobTitle = "";

		// now perform the work
		update_downtimeWorkMonsterHunt(sectionId, isMainActivity, jobTitle, reward, expGain, nextLevelExp);

	});
}

var update_downtimeWorkMonsterHunt = function (sectionId, isMainActivity, jobTitle, reward, expGain, nextLevelExp) {
	console.log("UPDATING DOWNTIME WORK MONSTER HUNT");

	var update = {};
	var callbacks = [];
	var attr_fields = ["hp", "hp_max", "experience"];

	getAttrs(attr_fields, function (v) {

		// variables
		var detailsOutput = "Working a " + jobTitle + " Monster Hunt";
		// var hp = isNaN(parseInt(v["hp"], 10)) ? 0 : parseInt(v["hp"], 10);
		var maxHp = isNaN(parseInt(v["hp_max"], 10)) ? 0 : parseInt(v["hp_max"], 10);
		var experience = isNaN(parseInt(v["experience"], 10)) ? 0 : parseInt(v["experience"], 10);

		// remove hp
		var damagePercent = get_random_die(20);
		var damage = Math.floor(maxHp * damagePercent / 20);
		// var startHp = hp;
		// hp -= damage;
		// if (hp < 1) {
		//     hp = 1;
		// }
		// damage = startHp - hp;
		detailsOutput += "\n Took " + damage + " hp damage";
		damage *= -1;


		// determine what injury is gained
		if (damage > 0) {
			var injuryPreset;
			if (damagePercent >= 19 || hp == 1) {
				injuryPreset = GetSevereInjury();
			} else if (damagePercent >= 15 || hp == 1) {
				injuryPreset = GetMajorInjury();
			} else {
				injuryPreset = GetBasicInjury();
			}

			// create the new injury
			var newrowid = generateRowID();
			update["repeating_injuries_" + newrowid + "_injury"] = injuryPreset.name;
			update["repeating_injuries_" + newrowid + "_injuryName"] = injuryPreset.name;
			update["repeating_injuries_" + newrowid + "_injuryType"] = injuryPreset.type;
			update["repeating_injuries_" + newrowid + "_injuryState"] = "Active";
			update["repeating_injuries_" + newrowid + "_injuryHP"] = damage;
			update["repeating_injuries_" + newrowid + "_description"] = injuryPreset.description;
			update["repeating_injuries_" + newrowid + "_injuryRemoval"] = injuryPreset.removal;

			// report the result
			detailsOutput += "\n Gained an injury (" + injuryPreset.name + ")";
			detailsOutput += "\nYou may forfeit all of your jin and exp rewards along with one fate point or all of your karma if you have none to erase this injury";
		}

		// add the exp
		detailsOutput += "\n Gained " + expGain + " exp";
		experience += expGain;
		update["experience"] = experience;

		// check if a level up happened
		if (experience >= nextLevelExp) {
			detailsOutput += "\n Leveled Up!";
		}

		// add the reward
		detailsOutput += "\n Gained a " + reward + "J reward";

		// update the downtime
		callbacks.push(function () {
			update_active_injuries();
			update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, damage, 0);
		});

		// set attributes
		setAttrs(update, {
			silent: true
		}, function () {
			callbacks.forEach(function (callback) {
				callback();
			})
		});

	});
}

var start_downtimeWorkPiecework = function (sectionId, isMainActivity) {
	var update = {};
	var attr_type = ["downtimeWorkPieceworkVocation"];

	getAttrs(attr_type, function (w) {

		var vocationType = w["downtimeWorkPieceworkVocation"];
		var attr_fields = ["vocationTier-" + vocationType];

		getAttrs(attr_fields, function (v) {

			// variables
			var tier = v["vocationTier-" + vocationType];
			var reward = 0;
			var rewardMod = 0;

			// set the dc and reward
			switch (tier) {
				case "Novice":
					rewardMod = 15;
					break;
				case "Adept":
					rewardMod = 30;
					break;
				case "Professional":
					rewardMod = 45;
					break;
				case "Expert":
					rewardMod = 60;
					break;
				case "Master":
					rewardMod = 90;
					break;
			}

			// set the job title
			var jobTitle = vocationType;

			// now perform the work
			update_downtimeWorkPiecework(sectionId, isMainActivity, jobTitle, vocationType, reward, rewardMod);
		});
	});
}

var update_downtimeWorkPiecework = function (sectionId, isMainActivity, jobTitle, vocationType, reward, rewardMod) {
	console.log("UPDATING DOWNTIME WORK PIECEWORK");

	var update = [];
	var attr_fields = ["vocationScore-" + vocationType,
		"vocationTier-" + vocationType,
		"vocationProgress-" + vocationType,
		"vocationProgressMax-" + vocationType
	];

	getAttrs(attr_fields, function (v) {

		// variables
		var tier = v["vocationTier-" + vocationType];
		var detailsOutput = "";
		var progress = 0;
		var progressBonus = 0;
		var progressMax = 0;
		var tierIncreased = false;

		// set the working title
		detailsOutput = "Working " + jobTitle + " Piecework Job";

		// now perform the checks for the job
		var totalCheck = 0;
		var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);

		// perform 3 checks
		var checkCount = isMainActivity ? 3 : 1;
		while (checkCount > 0) {
			checkCount--;
			totalCheck += vocationBonus + get_random_die(20);
		}
		detailsOutput += "\nMade a " + vocationType + " check (" + totalCheck + ")";


		// calculate the reward
		reward += totalCheck * rewardMod;
		detailsOutput += "\n Gained a " + reward + "J payment";

		// now gain the progress from training
		progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
		progressBonus = Math.ceil(vocationBonus / 3);
		if (isMainActivity) {
			progressBonus *= 2;
		}
		progress += progressBonus;

		// display and increase the progress
		detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
		increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

		// update tier and progress data
		if (tierIncreased) {
			update["vocationTier-" + vocationType] = tier;
			update["vocationProgressMax-" + vocationType] = progressMax;
		}
		update["vocationProgress-" + vocationType] = progress;

		// set attributes
		setAttrs(update, {
				silent: true
			},
			update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, 0, 0));

	});
}

var start_downtimeWorkService = function (sectionId, isMainActivity) {

	var attr_type = ["downtimeWorkServiceVocation"];

	getAttrs(attr_type, function (w) {

		var vocationType = w["downtimeWorkServiceVocation"];
		var attr_fields = ["downtimeWorkServiceClass",
			"vocationTier-" + vocationType
		];

		getAttrs(attr_fields, function (v) {

			var tier = v["vocationTier-" + vocationType];
			var jobClass = v["downtimeWorkServiceClass"];
			var dc = 0;
			var reward = 0;

			// get the difficulty info and set the job class if it needs to be reset
			switch (tier) {
				case "Novice":
				case "Adept":
					if (jobClass == "High" || jobClass == "Elite") {
						jobClass = "Medium";
					}
					break;
				case "Professional":
					if (jobClass == "Elite") {
						jobClass = "High";
					}
					break;
			}

			// set the dc and reward
			switch (jobClass) {
				case "Low":
					dc = 10;
					reward = 800 + (get_random_die(20) * 20);
					break;
				case "Medium":
					dc = 20;
					reward = 1800 + (get_random_die(20) * 40);
					break;
				case "High":
					dc = 30;
					reward = 3400 + (get_random_die(20) * 100);
					break;
				case "Elite":
					dc = 40;
					reward = 6000 + (get_random_die(20) * 200);
					break;
			}

			// set the job title
			var jobTitle = jobClass + " " + vocationType;

			// now perform the work
			update_downtimeWorkService(sectionId, isMainActivity, jobTitle, vocationType, dc, reward);

		});
	});
}

var update_downtimeWorkService = function (sectionId, isMainActivity, jobTitle, vocationType, dc, reward) {
	console.log("UPDATING DOWNTIME WORK SERVICE");

	var update = [];
	var attr_fields = ["downtimeWorkCraftingClass",
		"vocationScore-" + vocationType,
		"vocationTier-" + vocationType,
		"vocationProgress-" + vocationType,
		"vocationProgressMax-" + vocationType
	];

	getAttrs(attr_fields, function (v) {

		// variables
		var tier = v["vocationTier-" + vocationType];
		var jobClass = v["downtimeWorkServiceClass"];
		var detailsOutput = "";
		var progress = 0;
		var progressBonus = 0;
		var progressMax = 0;
		var tierIncreased = false;

		// set the working title
		detailsOutput = "Working a " + jobTitle + " Service Job";

		// now perform the checks for the job
		var successes = 0;
		var vocationBonus = isNaN(parseInt(v["vocationScore-" + vocationType], 10)) ? 0 : parseInt(v["vocationScore-" + vocationType], 10);

		// perform 3 checks
		var checkCount = 3;
		while (checkCount > 0) {
			checkCount--;

			var vocationCheck = vocationBonus + get_random_die(20);
			if (vocationCheck >= dc) {
				detailsOutput += "\nPassed " + vocationType + " Check (" + vocationCheck + ")";
				successes++;
			} else {
				detailsOutput += "\nFailed " + vocationType + " Check (" + vocationCheck + ")";
			}
		}

		// reduce the reward if this is a minor activity
		if (!isMainActivity) {
			reward = Math.floor(reward / 2);
		}

		// now determine the jin reward based on success
		var bonusReward = 0;
		switch (successes) {
			case 3:
				bonusReward = Math.floor(reward * 0.2);
				detailsOutput += "\n Gained a " + reward + "J payment plus a " + bonusReward + "J bonus";
				reward += bonusReward;
				break;
			case 2:
				bonusReward = Math.floor(reward * 0.1);
				detailsOutput += "\n Gained a " + reward + "J payment plus a " + bonusReward + "J bonus";
				reward += bonusReward;
				break;
			case 1:
				detailsOutput += "\n Gained a " + reward + "J payment";
				break;
			case 0:
				detailsOutput += "\n Failed at Job. Gained no payment";
				break;
		}

		// now gain the progress from training
		progress = isNaN(parseInt(v["vocationProgress-" + vocationType], 10)) ? 0 : parseInt(v["vocationProgress-" + vocationType], 10);
		progressBonus = Math.ceil(vocationBonus / 3);
		if (isMainActivity) {
			progressBonus *= 2;
		}
		progress += progressBonus;

		// display and increase the progress
		detailsOutput += "\n Gained " + progressBonus + " progress in " + vocationType;
		increase_vocation_progress(progress, progressMax, tier, tierIncreased, detailsOutput);

		// update tier and progress data
		if (tierIncreased) {
			update["vocationTier-" + vocationType] = tier;
			update["vocationProgressMax-" + vocationType] = progressMax;
		}
		update["vocationProgress-" + vocationType] = progress;

		// set attributes
		setAttrs(update, {
				silent: true
			},
			update_finishDowntimeUpdate(sectionId, isMainActivity, detailsOutput, reward, 0, 0));

	});
}

var update_downtimeWorkCustomTypeSelection = function (sectionId, newValue) {
	console.log("UPDATING SELECTED DOWNTIME WORK CUSTOM CATEGORY " + newValue);

	var update = {};
	update["repeating_downtimecustomwork_" + sectionId + "_isCrafting"] = (newValue == "Crafting") ? "on" : 0;
	update["repeating_downtimecustomwork_" + sectionId + "_isEntertainment"] = (newValue == "Entertainment") ? "on" : 0;
	update["repeating_downtimecustomwork_" + sectionId + "_isMonsterHunt"] = (newValue == "Monster Hunt") ? "on" : 0;
	update["repeating_downtimecustomwork_" + sectionId + "_isPiecework"] = (newValue == "Piecework") ? "on" : 0;
	update["repeating_downtimecustomwork_" + sectionId + "_isService"] = (newValue == "Service") ? "on" : 0;

	setAttrs(update);
}

var start_downtimeWorkCustom = function (sectionId, isMainActivity) {

	var update = {};
	var attr_fields = ["nextLevelExp"];

	getSectionIDs("repeating_downtimecustomwork", function (idarray) {

		_.each(idarray, function (currentID) {
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_title");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_type");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_vocation");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_dc");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_dc_max");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_pay");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_payMod");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_exp");
			attr_fields.push("repeating_downtimecustomwork_" + currentID + "_isSelected");
		});

		getAttrs(attr_fields, function (v) {

			var vocationType = "";
			var dc = 0;
			var dcMax = 0;
			var pay = 0;
			var payMod = 0;
			var exp = 0;
			var jobTitle = "";

			var foundActivity = false;
			_.each(idarray, function (currentID) {

				// if the job we're looking at is selected then we can do work with it
				if (!foundActivity && v["repeating_downtimecustomwork_" + currentID + "_isSelected"] == "1") {

					foundActivity = true;

					switch (v["repeating_downtimecustomwork_" + currentID + "_type"]) {
						case "Crafting":
							vocationType = v["repeating_downtimecustomwork_" + currentID + "_vocation"];
							if (vocationType != undefined) {
								jobTitle = v["repeating_downtimecustomwork_" + currentID + "_title"];
								dc = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10);
								pay = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10);

								// now perform the work
								update_downtimeWorkCrafting(sectionId, isMainActivity, jobTitle, vocationType, dc, pay);
							}
							break;
						case "Entertainment":
							vocationType = v["repeating_downtimecustomwork_" + currentID + "_vocation"];
							if (vocationType != undefined) {
								jobTitle = v["repeating_downtimecustomwork_" + currentID + "_title"];
								dc = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10);
								dcMax = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc_max"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc_max"], 10);
								dcMax -= dc;
								pay = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10);
								payMod = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_payMod"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_payMod"], 10);

								// now perform the work
								update_downtimeWorkEntertainment(sectionId, isMainActivity, jobTitle, vocationType, dc, dcMax, pay, payMod);
							}
							break;
						case "Monster Hunt":
							vocationType = v["repeating_downtimecustomwork_" + currentID + "_vocation"];
							if (vocationType != undefined) {
								jobTitle = v["repeating_downtimecustomwork_" + currentID + "_title"];
								pay = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10);
								exp = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_exp"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_exp"], 10);

								// now perform the work
								update_downtimeWorkMonsterHunt(sectionId, isMainActivity, jobTitle, pay, exp, v["nextLevelExp"]);
							}
							break;
						case "Piecework":
							vocationType = v["repeating_downtimecustomwork_" + currentID + "_vocation"];
							if (vocationType != undefined) {
								jobTitle = v["repeating_downtimecustomwork_" + currentID + "_title"];
								dc = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10);
								pay = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10);
								payMod = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_payMod"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_payMod"], 10);

								// now perform the work
								update_downtimeWorkPiecework(sectionId, isMainActivity, jobTitle, vocationType, pay, payMod);
							}
							break;
						case "Service":
							vocationType = v["repeating_downtimecustomwork_" + currentID + "_vocation"];
							if (vocationType != undefined) {
								jobTitle = v["repeating_downtimecustomwork_" + currentID + "_title"];
								dc = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_dc"], 10);
								pay = isNaN(parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10)) ? 0 : parseInt(v["repeating_downtimecustomwork_" + currentID + "_pay"], 10);

								// now perform the work
								update_downtimeWorkService(sectionId, isMainActivity, jobTitle, vocationType, dc, pay);
							}
							break;
					}
				}
			});
		});
	});
}

var update_finishDowntimeUpdate = function (sectionId, isMainActivity, detailMessage, jinMod, hpMod, vitMod) {
	console.log("FINISH UPDATING DOWNTIME ACTIVITY");

	var update = {};
	var callbacks = [];
	var attr_fields = ["jin_storage", "hp", "hp_max", "vitality", "vitality_max", "constitution_mod", "lifestyle_cost", "lifestyle_funds", "lifestyle_influence"];

	getSectionIDs("repeating_lifestyleexpenses", function (idarray) {

		if (isMainActivity) {
			_.each(idarray, function (currentID2) {
				attr_fields.push("repeating_lifestyleexpenses_" + currentID2 + "_type");
				attr_fields.push("repeating_lifestyleexpenses_" + currentID2 + "_weekly_mod");
				attr_fields.push("repeating_lifestyleexpenses_" + currentID2 + "_loan");
				attr_fields.push("repeating_lifestyleexpenses_" + currentID2 + "_interest");
				attr_fields.push("repeating_lifestyleexpenses_" + currentID2 + "_weeks");
			});
		}

		getAttrs(attr_fields, function (v) {

			// update jin in storage
			var jin = 0;
			if (!isNaN(parseInt(v["jin_storage"], 10))) {
				jin = parseInt(v["jin_storage"], 10);
			}

			// add the jin mod
			jin += parseInt(jinMod, 10);

			// update hp
			// var hp = isNaN(parseInt(v["hp"], 10)) ? 0 : parseInt(v["hp"], 10);
			// var startHp = hp;
			// hp += parseInt(hpMod, 10);
			// var maxHp = isNaN(parseInt(v["hp_max"], 10)) ? 0 : parseInt(v["hp_max"], 10);

			// update vitality
			var vitality = isNaN(parseInt(v["vitality"], 10)) ? 0 : parseInt(v["vitality"], 10);
			var startVitality = vitality;
			var maxVitality = isNaN(parseInt(v["vitality_max"], 10)) ? 0 : parseInt(v["vitality_max"], 10);
			vitality += parseInt(vitMod, 10);

			// update activity data
			if (isMainActivity) {

				// update any bank loans
				var updateBanks = false;
				_.each(idarray, function (currentID) {
					if (v["repeating_lifestyleexpenses_" + currentID + "_type"] == "Bank Loans") {
						var payment = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID + "_weekly_mod"], 10)) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID + "_weekly_mod"], 10);
						var loan = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID + "_loan"], 10)) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID + "_loan"], 10);
						var interest = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID + "_interest"], 10)) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID + "_interest"], 10);
						var weeks = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID + "_weeks"], 10)) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID + "_weeks"], 10);

						// decrement the loan by the amount paid then add interest
						loan -= payment;
						var loanInterest = Math.floor(loan * (interest / 100));

						detailMessage += "\n Bank Loan gained " + loanInterest + "J interest";
						loan += loanInterest;
						update["repeating_lifestyleexpenses_" + currentID + "_loan"] = loan;

						// increment weeks
						weeks++;
						update["repeating_lifestyleexpenses_" + currentID + "_weeks"] = weeks;

						// make sure we update lifestyles
						updateBanks = true;
					}
				});

				// update the lifestyles
				if (updateBanks) {
					callbacks.push(function () {
						update_lifestyle();
					});
				}

				// add hp
				// hp += 7;
				// if (hp > maxHp) {
				//     hp = maxHp;
				// }

				// if (hpMod < 0) {
				//     startHp += hpMod;
				// }

				// if (hp > startHp) {
				//     detailMessage += "\n Gained " + (hp - startHp) + " HP from rest";
				//     update["hp"] = hp;
				// }


				// add vitality
				var vitBaseBonus = parseInt(v["constitution_mod"], 10);
				if (vitBaseBonus == undefined || vitBaseBonus < 1) {
					vitBaseBonus = 1;
				}
				vitality += vitBaseBonus;
				if (vitality > maxVitality) {
					vitality = maxVitality;
				}
				if (vitality != startVitality) {
					detailMessage += "\n Gained " + (vitality - startVitality) + " Vitality from rest";
					update["vitality"] = vitality;
				}


				// pay for lifestyle lifestyle cost
				if (!isNaN(parseInt(v["lifestyle_cost"], 10)) && parseInt(v["lifestyle_cost"], 10) > 0) {
					var lifestyleCost = parseInt(v["lifestyle_cost"], 10);

					detailMessage += "\n Spent " + lifestyleCost + "J from Lifestyle Costs";
					jin -= lifestyleCost;
				}


				// add funds from lifestyle
				if (!isNaN(parseInt(v["lifestyle_funds"], 10)) && parseInt(v["lifestyle_funds"], 10) > 0) {

					var fundsBonus = 0;
					var rolls = parseInt(v["lifestyle_funds"], 10);
					for (var i = 0; i < rolls; i++) {
						fundsBonus += get_random_die(7);
					}
					fundsBonus *= 25;
					jin += fundsBonus;

					if (fundsBonus > 0) {
						detailMessage += "\n Gained " + fundsBonus + "J from Lifestyle Funds";
					}
				}


				// update stats
				update["jin_storage"] = jin;
				update["downtimeMainActivityLocked"] = "on";
				update["downtimeMainActivityDetails"] = detailMessage;
				update["repeating_downtime_" + sectionId + "_mainActivityDetails"] = detailMessage;
			} else {
				// if (hp > maxHp) {
				//     hp = maxHp;
				// }
				// if (hp != startHp) {
				//     detailMessage += "\n Gained " + (startHp - hp) + " HP";
				//     update["hp"] = hp;
				// }

				if (vitality != startVitality) {
					detailMessage += "\n Gained " + (startVitality - vitality) + " Vitality";
					update["vitality"] = vitality;
				}

				update["jin_storage"] = jin;
				update["downtimeMinorActivityLocked"] = "on";
				update["downtimeShowActivityList"] = "on";
				update["downtimeMinorActivityDetails"] = detailMessage;
				update["repeating_downtime_" + sectionId + "_minorActivityDetails"] = detailMessage;
			}

			setAttrs(update, {
				silent: true
			}, function () {
				callbacks.forEach(function (callback) {
					callback();
				})
			});
		});

	});
}


// Records: Lifestyle

var get_neighborhood_stats = function (neighborhood) {

	var baseTax = 0;
	var landValue = 0;
	var specType = "";
	var specSize = "";
	var influence = 0;

	switch (neighborhood) {
		case "Io":
			landValue = 10;
			specType = "Apartment";
			specSize = "Medium";
			baseTax = 500;
			influence = 10;
			break;
		case "Europa":
			landValue = 12;
			specType = "House";
			specSize = "Small";
			baseTax = 350;
			influence = 15;
			break;
		case "Calisto":
			landValue = 15;
			specType = "House";
			specSize = "Gargantuan";
			baseTax = 500;
			influence = 25;
			break;
		case "Ganymede":
			landValue = 10;
			specType = "House";
			specSize = "Medium";
			baseTax = 150;
			influence = 5;
			break;
		case "Amalthea":
			landValue = 10;
			specType = "Apartment";
			specSize = "Medium";
			baseTax = 300;
			influence = 5;
			break;
		case "Andrastea":
			landValue = 10;
			specType = "Apartment";
			specSize = "Medium";
			baseTax = 300;
			influence = 5;
			break;
		case "Thebe":
			landValue = 7;
			specType = "Apartment";
			specSize = "Small";
			baseTax = 150;
			break;
		case "Sabine":
			landValue = 10;
			specType = "Apartment";
			specSize = "Small";
			baseTax = 500;
			influence = 10;
			break;
		case "Etrusca":
			landValue = 10;
			specType = "House";
			specSize = "Large";
			baseTax = 500;
			influence = 10;
			break;
		case "Hephaes":
			landValue = 7;
			specType = "Apartment";
			specSize = "Medium";
			baseTax = 150;
			break;
		case "Martius":
			landValue = 7;
			specType = "House";
			specSize = "Small";
			baseTax = 150;
			break;
		case "Lydia":
			landValue = 12;
			specType = "Apartment";
			specSize = "Large";
			baseTax = 500;
			influence = 15;
			break;
		case "Metash":
			landValue = 7;
			specType = "Apartment";
			specSize = "Small";
			baseTax = 50;
			break;
		case "Phoses":
			landValue = 7;
			specType = "House";
			specSize = "Small";
			baseTax = 150;
			break;
		case "Ovid":
			landValue = 7;
			specType = "House";
			specSize = "Large";
			baseTax = 150;
			break;
		case "Pater":
			landValue = 7;
			specType = "Apartment";
			specSize = "Medium";
			baseTax = 350;
			influence = 5;
			break;
		case "Geminus":
			landValue = 10;
			specType = "Apartment";
			specSize = "Large";
			baseTax = 500;
			influence = 10;
			break;
		case "Iunon":
			landValue = 12;
			specType = "House";
			specSize = "Huge";
			baseTax = 500;
			influence = 20;
			break;
		case "Sanctuary":
			landValue = 12;
			specType = "House";
			specSize = "Small";
			baseTax = 350;
			influence = 15;
			break;
		case "Arcena":
			landValue = 7;
			specType = "House";
			specSize = "Small";
			baseTax = 100;
			break;
		case "Solo":
			landValue = 0;
			baseTax = 0;
			break;
	}

	return {
		baseTax: baseTax,
		landValue: landValue,
		specType: specType,
		specSize: specSize,
		influence: influence
	}
}

var get_residence_modifiers = function (size, type) {

	var influence = 0;
	var landValue = 1;
	var landLimit = 0;

	// size modifiers
	switch (size) {
		case "Tiny":
			if (type == "Apartment") {
				landLimit = 10;
			} else if (type == "House") {
				landLimit = 20;
			}
			break;
		case "Small":
			if (type == "Apartment") {
				landLimit = 18;
			} else if (type == "House") {
				landLimit = 36;
			}
			break;
		case "Medium":
			landValue = 0.8;
			if (type == "Apartment") {
				landLimit = 32;
			} else if (type == "House") {
				influence = 5;
				landLimit = 70;
			}
			break;
		case "Large":
			landValue = 0.75;
			if (type == "Apartment") {
				influence = 5;
				landLimit = 64;
			} else if (type == "House") {
				influence = 10;
				landLimit = 120;
			}
			break;
		case "Huge":
			landValue = 0.6;
			if (type == "Apartment") {
				influence = 10;
				landLimit = 96;
			} else if (type == "House") {
				influence = 15;
				landLimit = 200;
			}
			break;
		case "Gargantuan":
			landValue = 0.5;
			if (type == "Apartment") {
				influence = 15;
				landLimit = 140;
			} else if (type == "House") {
				influence = 20;
				landLimit = 360;
			}
			break;
	}

	return {
		influence: influence,
		landValue: landValue,
		landLimit: landLimit
	}
}

var update_residence = function (residenceName) {

	var lifestyle_attrs = [];
	getSectionIDs("repeating_lifestyleresidences", function (idarray2) {

		_.each(idarray2, function (currentID2) {
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_name");
		});

		getAttrs(lifestyle_attrs, function (v) {

			var residenceIds = []

			// go through all of the residences
			_.each(idarray2, function (currentID2) {

				// if the name of the residence matches we can work with it
				if (v["repeating_lifestyleresidences_" + currentID2 + "_name"] == residenceName) {
					residenceIds.push(currentID2);
				}

			});

			update_residences(residenceIds);
		});
	});
}

var update_residences = function (residenceIds) {
	console.log("UPDATING RESIDENCES");

	var lifestyle_attrs = [];
	var update = {};
	var callbacks = [];

	if (residenceIds != undefined && residenceIds.length > 0) {
		_.each(residenceIds, function (currentID2) {
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_name");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_lifestyle_location");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_residence_type");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_residence_size");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_funds");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_influence");
			lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID2 + "_morale");
		});

		getSectionIDs("repeating_rooms", function (idarray) {

			_.each(idarray, function (currentID) {
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_name");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_base_cost");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_residence");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_size");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_room_cost");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_weekly_mod");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_purchased");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_floor");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_funds");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_influence");
				lifestyle_attrs.push("repeating_rooms_" + currentID + "_morale");
			});

			getAttrs(lifestyle_attrs, function (v) {

				// go through all of the residences
				_.each(residenceIds, function (currentID2) {

					residenceName = v["repeating_lifestyleresidences_" + currentID2 + "_name"];

					// character sheet stats
					var residenceType = v["repeating_lifestyleresidences_" + currentID2 + "_residence_type"];
					var residenceSize = v["repeating_lifestyleresidences_" + currentID2 + "_residence_size"];

					// residence variables
					var baseTax = 0;
					var landValue = 0;
					var specType = "";
					var specSize = "";
					var landLimit = 0;

					// earnings calculations variables
					var funds = 0;
					var influence = 0;
					var morale = 0;

					// get neighborhood stats
					var neighborhoodStats = get_neighborhood_stats(v["repeating_lifestyleresidences_" + currentID2 + "_lifestyle_location"]);
					baseTax = neighborhoodStats.baseTax;
					landValue = neighborhoodStats.landValue;
					specType = neighborhoodStats.specType;
					specSize = neighborhoodStats.specSize;
					influence = neighborhoodStats.influence;

					// adjust stats based on living arrangement
					if (residenceType == "") {
						landValue = 0;
						landLimit = 0;
						baseTax = 0;
					}

					// specialization adjustments
					var specialization = "None";
					if (specType != "") {
						specialization = specType + ", " + specSize;
					}
					if (residenceType == specType && residenceSize == specSize) {
						landValue -= 5;
					}


					// adjust stats based on residence choices
					var residenceModifiers = get_residence_modifiers(residenceSize, residenceType);
					landValue = Math.floor(landValue * residenceModifiers.landValue);
					landLimit += residenceModifiers.landLimit;
					influence += residenceModifiers.influence;

					// cost calculation variables
					var tax = baseTax;
					var roomTotalCost = 0;
					var groundSize = 0;

					// grab relevant room data
					_.each(idarray, function (currentID) {

						if (v["repeating_rooms_" + currentID + "_residence"] == residenceName) {

							// get the floor information
							var floor = isNaN(parseInt(v["repeating_rooms_" + currentID + "_floor"], 10)) ? 1 : parseInt(v["repeating_rooms_" + currentID + "_floor"], 10);
							if (floor <= 0) {
								floor = 1;
							}
							var floorMultiplier = 1.0 + (0.5 * (floor - 1));


							// determine the size
							var size = isNaN(parseInt(v["repeating_rooms_" + currentID + "_size"], 10)) ? 1 : parseInt(v["repeating_rooms_" + currentID + "_size"], 10);


							// get the base cost of the room and modify its cost based on whether its purchased
							var cost = isNaN(parseInt(v["repeating_rooms_" + currentID + "_base_cost"], 10)) ? 0 : parseInt(v["repeating_rooms_" + currentID + "_base_cost"], 10);
							if (v["repeating_rooms_" + currentID + "_purchased"] == "Yes") {
								cost = 0;
							}

							// determine the weekly cost of the room for maintenance
							var weeklyMod = isNaN(parseInt(v["repeating_rooms_" + currentID + "_weekly_mod"], 10)) ? 0 : parseInt(v["repeating_rooms_" + currentID + "_weekly_mod"], 10);
							var weeklyCost = (cost * 0.01 * floorMultiplier) + weeklyMod;


							// update the display
							if (weeklyCost > 0) {
								update["repeating_rooms_" + currentID + "_room_cost"] = "-" + weeklyCost + " J";
							} else {
								update["repeating_rooms_" + currentID + "_room_cost"] = weeklyCost + " J";
							}


							// add this cost to the total cost of the lifestyle
							roomTotalCost += weeklyCost;

							// add to the groundfloor size
							if (floor == 1) {
								groundSize += size;
							}

							// add expenses
							funds += isNaN(parseInt(v["repeating_rooms_" + currentID + "_funds"])) ? 0 : parseInt(v["repeating_rooms_" + currentID + "_funds"]);
							influence += isNaN(parseInt(v["repeating_rooms_" + currentID + "_influence"])) ? 0 : parseInt(v["repeating_rooms_" + currentID + "_influence"]);
							morale += isNaN(parseInt(v["repeating_rooms_" + currentID + "_morale"])) ? 0 : parseInt(v["repeating_rooms_" + currentID + "_morale"]);
						}
					});


					// calculate the taxes
					var landTax = landLimit * landValue;
					tax += landTax;
					var totalCost = roomTotalCost + tax;

					// update the lifestyles
					callbacks.push(function () {
						update_lifestyle();
					});

					// update residence data
					update["repeating_lifestyleresidences_" + currentID2 + "_location_specialization"] = specialization;
					update["repeating_lifestyleresidences_" + currentID2 + "_location_landLimit"] = groundSize + " /" + landLimit + " squares";
					update["repeating_lifestyleresidences_" + currentID2 + "_location_landTax"] = baseTax + "J( base) + " + landTax + "J (size)";
					update["repeating_lifestyleresidences_" + currentID2 + "_home_cost"] = roomTotalCost + "J";
					update["repeating_lifestyleresidences_" + currentID2 + "_location_cost"] = totalCost + "J";
					update["repeating_lifestyleresidences_" + currentID2 + "_funds"] = funds;
					update["repeating_lifestyleresidences_" + currentID2 + "_influence"] = influence;
					update["repeating_lifestyleresidences_" + currentID2 + "_morale"] = morale;
				});

				setAttrs(update, {
					silent: true
				}, function () {
					callbacks.forEach(function (callback) {
						callback();
					})
				});

			});
		});
	}
}

var update_residence_name = function (sectionId, previousName, newName) {

	var lifestyle_attrs = [];
	var update = {};

	getSectionIDs("repeating_rooms", function (idarray) {
		_.each(idarray, function (currentID) {
			lifestyle_attrs.push("repeating_rooms_" + currentID + "_name");
		});

		getAttrs(lifestyle_attrs, function (v) {

			_.each(idarray, function (currentID) {

				if (v["repeating_rooms_" + currentID + "_name"] == previousName) {
					update["repeating_rooms_" + currentID + "_name"] = newName;
				}

			});

			setAttrs(update, {
				silent: true
			});

		});
	});

}

var update_lifestyle = function () {
	console.log("UPDATING LIFESTYLE");

	var lifestyle_attrs = ["lifestyle_location", "residence_type", "residence_size"];
	var update = {};

	getSectionIDs("repeating_lifestyleresidences", function (idarray) {
		getSectionIDs("repeating_lifestyleexpenses", function (idarray2) {

			_.each(idarray, function (currentID) {
				lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID + "_isSelected");
				lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID + "_location_cost");
				lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID + "_funds");
				lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID + "_influence");
				lifestyle_attrs.push("repeating_lifestyleresidences_" + currentID + "_morale");
			});

			_.each(idarray2, function (currentID2) {
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_room_cost");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_weekly_mod");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_type");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_funds");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_influence");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_morale");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_loan");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_weeks");
				lifestyle_attrs.push("repeating_lifestyleexpenses_" + currentID2 + "_isSelected");
			});

			getAttrs(lifestyle_attrs, function (v) {

				// cost calculation variables
				var totalCost = 0;

				// earnings calculations variables
				var funds = 0;
				var influence = 0;
				var morale = 0;

				_.each(idarray, function (currentID) {

					if (v["repeating_lifestyleresidences_" + currentID + "_isSelected"] == "1") {

						// add expenses
						totalCost += isNaN(parseInt(v["repeating_lifestyleresidences_" + currentID + "_location_cost"])) ? 0 : parseInt(v["repeating_lifestyleresidences_" + currentID + "_location_cost"]);
						funds += isNaN(parseInt(v["repeating_lifestyleresidences_" + currentID + "_funds"])) ? 0 : parseInt(v["repeating_lifestyleresidences_" + currentID + "_funds"]);
						influence += isNaN(parseInt(v["repeating_lifestyleresidences_" + currentID + "_influence"])) ? 0 : parseInt(v["repeating_lifestyleresidences_" + currentID + "_influence"]);
						morale += isNaN(parseInt(v["repeating_lifestyleresidences_" + currentID + "_morale"])) ? 0 : parseInt(v["repeating_lifestyleresidences_" + currentID + "_morale"]);

					}
				});

				// go through all of the additional expenses
				_.each(idarray2, function (currentID2) {

					// get the cost of the expense
					var weeklyCost = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_weekly_mod"], 10)) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_weekly_mod"], 10);

					// update the display
					if (weeklyCost > 0) {
						update["repeating_lifestyleexpenses_" + currentID2 + "_room_cost"] = "-" + weeklyCost + " J";
					} else {
						update["repeating_lifestyleexpenses_" + currentID2 + "_room_cost"] = weeklyCost + " J";
					}

					if (v["repeating_lifestyleexpenses_" + currentID2 + "_isSelected"] == "1") {

						// add the cost
						totalCost += weeklyCost;

						switch (v["repeating_lifestyleexpenses_" + currentID2 + "_type"]) {
							case "People":
								// add expenses
								funds += isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_funds"])) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_funds"]);
								influence += isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_influence"])) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_influence"]);
								morale += isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_morale"])) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_morale"]);
								break;
							case "Bank Loans":
								// calculate morale modifier
								var loan = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_loan"])) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_loan"]);
								var weeks = isNaN(parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_weeks"])) ? 0 : parseInt(v["repeating_lifestyleexpenses_" + currentID2 + "_weeks"]);

								// modify the morale
								if (loan > 0) {
									var lifeExpenseMoraleMod = Math.floor((loan * -1) / 5000);
									var weeksMod = 1 + (weeks * 0.05);
									lifeExpenseMoraleMod = Math.floor(lifeExpenseMoraleMod * weeksMod);
									update["repeating_lifestyleexpenses_" + currentID2 + "_morale"] = lifeExpenseMoraleMod;
									morale += lifeExpenseMoraleMod;
								}
								break;
						}
					}

				});

				// morale
				morale += Math.floor(influence * 0.5);
				var resolveObj = GetAdjustedResolveAndMorale(0, 0, morale);

				// now update everything
				update["lifestyle_cost"] = totalCost;
				update["lifestyle_funds"] = funds;
				update["lifestyle_influence"] = influence;
				update["lifestyle_morale"] = resolveObj.morale;
				update["lifestyle_resolve"] = resolveObj.resolve;
				setAttrs(update, {
					silent: true
				});
			});
		});
	});
}

var update_room_from_database = function (sectionId, newValue) {

	var roomData = GetRoomData(newValue.trim());
	if (roomData.name != "-") {

		var update = {};

		// update the room data
		update["repeating_rooms_" + sectionId + "_base_cost"] = roomData.cost;
		update["repeating_rooms_" + sectionId + "_size"] = roomData.size;
		update["repeating_rooms_" + sectionId + "_floor"] = 1;
		update["repeating_rooms_" + sectionId + "_funds"] = 0;
		update["repeating_rooms_" + sectionId + "_influence"] = 0;
		update["repeating_rooms_" + sectionId + "_morale"] = roomData.earnings;
		update["repeating_rooms_" + sectionId + "_description"] = roomData.description;

		setAttrs(update, {
			silent: true
		}, update_lifestyle());
	}
}

var update_lifestyleRegionSelection = function (sectionId, newValue) {
	console.log("UPDATING LIFESTYLE REGION SELECTION " + newValue);

	var update = {};
	update["repeating_lifestyleresidences_" + sectionId + "_regionMinerva"] = (newValue == "Minerva") ? "on" : 0;
	update["repeating_lifestyleresidences_" + sectionId + "_regionApollo"] = (newValue == "Apollo") ? "on" : 0;
	update["repeating_lifestyleresidences_" + sectionId + "_regionWilds"] = (newValue == "Wilds") ? "on" : 0;

	setAttrs(update);
}

var update_lifestyleOptionTypeSelection = function (sectionId, newValue) {
	console.log("UPDATING LIFESTYLE OPTION TYPE SELECTION " + newValue);

	var update = {};
	update["repeating_lifestyleexpenses_" + sectionId + "_optionPeople"] = (newValue == "People") ? "on" : 0;
	update["repeating_lifestyleexpenses_" + sectionId + "_optionBank"] = (newValue == "Bank Loans") ? "on" : 0;

	setAttrs(update);
}




// Party Manager: Notes

var update_postbox_text = function (repeatingSectionId) {
	console.log("UPDATING POSTBOX TEXT");

	var post_attrs = [repeatingSectionId + "_type", repeatingSectionId + "_header", repeatingSectionId + "_sub", repeatingSectionId + "_location"];

	getAttrs(post_attrs, function (v) {
		var update = {};

		var postText = "";
		var usesHeader = "0";
		var usesSubheader = "0";
		var dataSplit = [];

		switch (v[repeatingSectionId + "_type"]) {
			case "-":
				postText = v[repeatingSectionId + "_location"];
				break;
			case "Info":
				postText = "&{template:infoBox}";
				postText += " {{message=" + v[repeatingSectionId + "_location"] + "}}";
				break;
			case "Attack":
				postText = "&{template:attackBox}";
				postText += " {{message=" + v[repeatingSectionId + "_location"] + "}}";
				break;
			case "Location":
				postText = "&{template:locationBox}";
				postText += " {{location=" + v[repeatingSectionId + "_header"] + "}}";
				postText += " {{area=" + v[repeatingSectionId + "_sub"] + "}}";
				postText += " {{time=" + v[repeatingSectionId + "_location"] + "}}";
				usesHeader = "1";
				usesSubheader = "1";
				break;
			case "System":
				postText = "&{template:systemBox}";
				postText += " {{message=" + v[repeatingSectionId + "_location"] + "}}";
				break;
			case "Header":
				postText = "&{template:headerBox}";
				postText += " {{head=" + v[repeatingSectionId + "_header"] + "}}";
				postText += " {{sub=" + v[repeatingSectionId + "_sub"] + "}}";
				postText += " {{m=" + v[repeatingSectionId + "_location"] + "}}";
				usesHeader = "1";
				usesSubheader = "1";
				break;
			case "Grid":
				postText = "&{template:graphBox}";
				postText += " {{type=" + v[repeatingSectionId + "_header"] + "}}";

				if (v[repeatingSectionId + "_location"] != undefined && v[repeatingSectionId + "_location"] != null && v[repeatingSectionId + "_location"] != "") {
					dataSplit = v[repeatingSectionId + "_location"].split("/");

					for (var i = 0; i < dataSplit.length; i++) {
						var infoSplit = dataSplit[i].split("@");
						if (infoSplit != undefined && infoSplit.length > 1) {
							postText += " {{m" + i + "=" + infoSplit[0].trim() + "}}";
							postText += " {{d" + i + "=" + infoSplit[1].trim() + "}}";
						}
					}
				}
				usesHeader = "1";
				break;
			case "Start":
				postText = "&{template:startBox}";
				postText += " {{head=" + v[repeatingSectionId + "_header"] + "}}";
				postText += " {{sub=" + v[repeatingSectionId + "_sub"] + "}}";

				if (v[repeatingSectionId + "_location"] != undefined && v[repeatingSectionId + "_location"] != null && v[repeatingSectionId + "_location"] != "") {
					dataSplit = v[repeatingSectionId + "_location"].split("/");
					for (var j = 0; j < dataSplit.length; j++) {
						postText += " {{m" + j + "=" + dataSplit[j].trim() + "}}";
					}
				}
				usesHeader = "1";
				usesSubheader = "1";
				break;
		}

		console.log("setting to: " + postText);

		update[repeatingSectionId + "_postText"] = postText;
		update[repeatingSectionId + "_usesHeader"] = usesHeader;
		update[repeatingSectionId + "_usesSubheader"] = usesSubheader;

		setAttrs(update, {});
	});
};

var update_missionType = function (updateId) {
	getAttrs(["repeating_mainchaptermissions_" + updateId + "_defaultTypes", "current_party_members"], function (v) {
		var update = {};
		if (v["repeating_mainchaptermissions_" + updateId + "_defaultTypes"] !== "-") {
			var defaultType = v["repeating_mainchaptermissions_" + updateId + "_defaultTypes"].split("-");
			update["repeating_mainchaptermissions_" + updateId + "_type"] = defaultType[0];
			update["repeating_mainchaptermissions_" + updateId + "_style"] = defaultType[1];
			update["repeating_mainchaptermissions_" + updateId + "_actors"] = v["current_party_members"];
			update["repeating_mainchaptermissions_" + updateId + "_missionid"] = updateId;
			update["repeating_mainchaptermissions_" + updateId + "_exp"] = 10;
		}
		setAttrs(update);
	});
}


// Party Manager: NPCs

var update_generated_NPC = function () {
	console.log("GENERATING A NEW NPC");

	var attr_fields = ["generatorNewGender", "generatorNewRace", "generatorNewNationality", "generatorNewClass"];
	var update = [];

	getAttrs(attr_fields, function (v) {

		// create a random character 
		var character = GetBlankCharacter();

		// set gender
		character.gender = v["generatorNewGender"];
		if (character.gender == "?") {
			character.gender = CharacterGenderGenerator();
		}

		// set nationality
		character.nationality = v["generatorNewNationality"];
		if (character.nationality == "?") {
			character.nationality = CharacterNationalityGenerator();
		}

		// set race
		character.ancestry = v["generatorNewRace"];
		if (character.ancestry == "?") {
			character.ancestry = CharacterRaceGenerator(character.nationality);
		}

		// set class
		character.classCategory = v["generatorNewClass"];
		if (character.classCategory == "?") {
			character.classCategory = CharacterClassGenerator("Low");
		}

		// set other data
		character.name = CharacterNameGenerator(character.nationality, character.ancestry, character.gender);
		character.sector = CharacterSectorGenerator(character.classCategory);
		character.nature = CharacterNatureGenerator();
		character.profession = CharacterProfessionGenerator(character.classCategory, character.sector).title;

		// output the data
		update["generatorName"] = character.name;
		update["generatorRace"] = character.ancestry;
		update["generatorGender"] = character.gender;
		update["generatorNationality"] = character.nationality;
		update["generatorNatureDisplay"] = character.nature;
		update["generatorClass"] = character.classCategory;
		update["generatorProfession"] = character.profession;

		// and set everything
		setAttrs(update, {
			silent: true
		});
	});
}



// Battle Log: Battle

var battle_log_update_action_title = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - TITLE");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = GetSectionIdValues([repeatingSectionId], repeatingSection, ["logActionName", "logExecuterName"]);

	getAttrs(battle_attrs, function (v) {
		var update = {};
		update["logTitle"] = `[${GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterName")}] ${GetSectionIdName(repeatingSection, repeatingSectionId, "logActionName")}`;

		setAttrs(update, {
			silent: true
		});
	});
}

var battle_log_update_action_check = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - CHECK");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = ["pb"];
	battle_attrs = battle_attrs.concat(GetSectionIdValues([repeatingSectionId], repeatingSection,
		["checkflag", "logTargetPb", "logBarrierElement", "logdmgelement", "logExecuterCheckIsRoll", "logIsAttack", "logExecuterCheck1", "logExecuterCheck2", "logExecuterCheckBonusName1", "logExecuterCheckBonusMod1", "logExecuterCheckBonusName2", "logExecuterCheckBonusMod2", "logExecuterCheckBonusName3", "logExecuterCheckBonusMod3", "logExecuterCheckBonusName4", "logExecuterCheckBonusMod4", "logExecuterCheckBonusName5", "logExecuterCheckBonusMod5", "logTargetCheckName", "logTargetCheckIsDC", "logTargetCheck1", "logTargetCheck1Roll", "logTargetCheck2Roll", "logMultiAttackPenalty", "logHasBarrier", "logIsFlatFooted"]));

	getAttrs(battle_attrs, function (v) {
		var update = {};

		// prepare the attack string
		let check1 = parseInt(v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheck1")]);
		check1 = isNaN(check1) ? 0 : parseInt(check1);
		let check2 = parseInt(v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheck2")]);
		check2 = isNaN(check2) ? 0 : parseInt(check2);
		let attackModsString = "";
	
		// determine barrier mods
		let hasBarrier = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logHasBarrier")];
	
		// check defense
		let defenseCheck = 0;
		if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "checkflag")] == "1") {

			// add core modifier
			if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheckName")].toLowerCase() == "ac") {
				let barrierAc = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheck1")];
				let shatterAc = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logShatterAc")];
	
				defenseCheck = 0;
				if (hasBarrier == "1") {
					defenseCheck += barrierAc;

					let pb = parseInt(v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetPb")]);
					let targetElement = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logBarrierElement")];
					let actionElement1 = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgelement")];
					let barrierEffect = GetElementalDamageMultiplier(targetElement, actionElement1, 0, pb);

					if (barrierEffect.type == "Weakness") {
						check1 += 2;
						check2 += 2;
						attackModsString += (attackModsString == "" ? "" : "\n") + "+2 Elemental Advantage";
					}
					else if (barrierEffect.type != "Neutral") {
						check1 -= 2;
						check2 -= 2;
						attackModsString += (attackModsString == "" ? "" : "\n") + "-2 Elemental Disadvantage";
					}
				}
				else {
					defenseCheck += shatterAc;
				}
			}
			else {
				let check = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheck1")];
				check = isNaN(parseInt(defenseCheck)) ? 0 : parseInt(defenseCheck);
				defenseCheck += check;
			}

			// add multi attack penalty
			if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "logIsAttack")] == "1") {
				let penalty = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logMultiAttackPenalty")];
				penalty = isNaN(parseInt(penalty)) ? 0 : parseInt(penalty);

				if (penalty < 0) {
					check1 += penalty;
					check2 += penalty;
					attackModsString += (attackModsString == "" ? "" : "\n") + `${penalty} Multiattack Penalty`;
				}
			}

			// add flat footed bonus
			let isFlatFooted = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logIsFlatFooted")];
			if (isFlatFooted == "1") {
				check1 += 2;
				check2 += 2;
				attackModsString += (attackModsString == "" ? "" : "\n") + `+2 Target is Flat-Footed`;
			}

			// add conditional modifiers
			let condCheck = "";
			for (let i = 1; i <= 5; i++) {
				condCheck = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckBonusMod" + i)];
				condCheck = isNaN(parseInt(condCheck)) ? 0 : parseInt(condCheck);
				if (condCheck != 0) {
					check1 += condCheck;
					check2 += condCheck;
					attackModsString += (attackModsString == "" ? "" : "\n") + `${(condCheck > 0 ? "+" : "") + condCheck} ${v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckBonusName" + i)]}`;
				}
			}

			// update defense mods
			if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheckIsDC")] == "1") {
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDefense1")] = defenseCheck;
			}
			else {
				let roll1 = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheck1Roll")];
				roll1 = isNaN(parseInt(roll1)) ? 0 : parseInt(roll1);
				let roll2 = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetCheck2Roll")];
				roll2 = isNaN(parseInt(roll2)) ? 0 : parseInt(roll2);
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDefense1")] = roll1 + defenseCheck;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDefense2")] = roll2 + defenseCheck;
			}
		}
	
		// determine result
		if (check1 >= (defenseCheck + 10)) {
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logResultForecast")] = "critsuccess";
		}
		else if (check1 >= defenseCheck) {
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logResultForecast")] = "success";
		}
		else if (check1 < (defenseCheck - 10)) {
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logResultForecast")] = "critfailure";
		}
		else {
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logResultForecast")] = "failure";
		}
	
		// set the attack string
		update[GetSectionIdName(repeatingSection, repeatingSectionId, "logAttack1")] = check1;
		if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckIsRoll")] == "1") {
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logAttack2")] = check2;
		}
		update[GetSectionIdName(repeatingSection, repeatingSectionId, "logAttackResultMods")] = attackModsString;
		update[GetSectionIdName(repeatingSection, repeatingSectionId, "logAttackResultModsSafe")] = attackModsString.replace(/\n/g, "&&");

		setAttrs(update, {
			silent: true
		});
	});
}

var battle_log_update_action_damage = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - DAMAGE");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = GetSectionIdValues([repeatingSectionId], repeatingSection,
		["logTargetWeaknesses", "logTargetResistances", "dmgflag", "logdmg", "logdmgcrit", "logdmgtype", "logdmgelement", "logDamageBonusName1", "logDamageCheckBonusMod1", "logDamageCheckBonusCrit1", "logDamageBonusName2", "logDamageCheckBonusMod2", "logDamageCheckBonusCrit2", "logDamageBonusName3", "logDamageCheckBonusMod3", "logDamageCheckBonusCrit3", "logDamageBonusName4", "logDamageCheckBonusMod4", "logDamageCheckBonusCrit4", "logDamageBonusName5", "logDamageCheckBonusMod5", "logDamageCheckBonusCrit5", "dmg2flag", "logdmg2", "logdmg2crit", "logdmg2type", "logdmg2element", "logHasBarrier"]);

	getAttrs(battle_attrs, function (v) {
		var update = {};

		if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "dmgflag")] == "1") {

			let damage1Total = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg")];
			damage1Total = isNaN(parseInt(damage1Total)) ? 0 : parseInt(damage1Total);
			let damage1CritTotal = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgcrit")];
			damage1CritTotal = isNaN(parseInt(damage1CritTotal)) ? 0 : parseInt(damage1CritTotal);
			damage1CritTotal += damage1Total;
			let damage1Type = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgtype")];
			let damage1Elem = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgelement")];

			let baseDamageString = `Base: ${damage1Total} ${damage1Type} (${damage1Elem})`;
			let critDamageString = `Crit: ${damage1CritTotal} ${damage1Type} (${damage1Elem})`;
			let damageString = "";
			let damageModString = "";
			let critDamageModString = "";

			let hasBarrier = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logHasBarrier")];
			let pb = parseInt(v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetPb")]);
			let targetElement = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logBarrierElement")];
			let barrierEffect;

			let weaknesses = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetWeaknesses")];
			let resistances = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logTargetResistances")];

			// add conditional modifiers
			let condCheck = 0;
			let critCondCheck = 0;
			for (let i = 1; i <= 5; i++) {
				condCheck = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageCheckBonusMod" + i)];
				condCheck = isNaN(parseInt(condCheck)) ? 0 : parseInt(condCheck);

				if (condCheck != 0) {
					damageModString += (damageModString == "" ? "" : "\n") + (condCheck > 0 ? "+" : "") + condCheck;
					damageModString += " " + v[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageBonusName" + i)]; 
					damage1Total += condCheck;

					critCondCheck = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageCheckBonusCrit" + i)];
					critCondCheck = isNaN(parseInt(critCondCheck)) ? 0 : parseInt(critCondCheck);
					critCondCheck += condCheck;
					critDamageModString += (critDamageModString == "" ? "" : "\n") + (critCondCheck > 0 ? "+" : "") + critCondCheck;
					critDamageModString += " " + v[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageBonusName" + i)]; 
					damage1CritTotal += critCondCheck;
				}
			}
	
			// calculate barrier qualities
			let typeQualities = GetDamageTypeQualities(damage1Type);
			if (hasBarrier == "1" && typeQualities.isMagic) {
				barrierEffect = GetElementalDamageMultiplier(targetElement, damage1Elem, damage1Total, pb);
				damage1Total = barrierEffect.damage;
				barrierEffect = GetElementalDamageMultiplier(targetElement, damage1Elem, damage1CritTotal, pb);
				damage1CritTotal = barrierEffect.damage;
				
				switch(barrierEffect.type) {
					case "Neutral":
					break;
					case "Resistance":
						damageModString += (damageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance"; 
						critDamageModString += (critDamageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance"; 
					break;
					case "Weakness":
						damageModString += (damageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness"; 
						critDamageModString += (critDamageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness"; 
					break;
					case "Convalesce":
						damageModString += (damageModString == "" ? "" : "\n") + "Barrier Convalesces"; 
						critDamageModString += (critDamageModString == "" ? "" : "\n") + "Barrier Convalesces"; 
						damage1Type = "Convalescing";
					break;
				}
			}

			// add weakness and resistance
			let drIndex = 0;
			let brackIndex = 0;
			let endBrackIndex = 0;
			let dr = 0;
			if (weaknesses != "") {
				drIndex = weaknesses.toLowerCase().indexOf(damage1Type.toLowerCase());
				if (drIndex >= 0) {
					brackIndex = weaknesses.substring(drIndex).indexOf("[");
					endBrackIndex = weaknesses.substring(drIndex).indexOf("]");
					dr = weaknesses.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
					dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
					
					if (dr != 0) {
						damage1Total += dr;
						damage1CritTotal += dr;
						damageModString += (damageModString == "" ? "" : "\n") + `+${dr} ${damage1Type} Weakness`;
						critDamageModString += (critDamageModString == "" ? "" : "\n") + `+${dr} ${damage1Type} Weakness`;
					}
	
				}
			}
			if (resistances != "") {
				drIndex = resistances.toLowerCase().indexOf(damage1Type.toLowerCase());
				if (drIndex >= 0) {
					brackIndex = resistances.substring(drIndex).indexOf("[");
					endBrackIndex = resistances.substring(drIndex).indexOf("]");
					dr = resistances.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
					dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
					
					if (dr != 0) {
						damage1Total -= dr;
						damage1CritTotal -= dr;
						if (damage1Total <= 0) {
							damage1Total = 0;
						}
						if (damage1CritTotal <= 0) {
							damage1CritTotal = 0;
						}
						damageModString += (damageModString == "" ? "" : "\n") + `-${dr} ${damage1Type} Resistance`;
						critDamageModString += (critDamageModString == "" ? "" : "\n") + `-${dr} ${damage1Type} Resistance`;
					}
	
				}
			}
	
			damageString = `${damage1Total} ${damage1Type} (${damage1Elem})`;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logPrimaryDamageTotal")] = damage1Total;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logPrimaryDamageType")] = damage1Type;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logPrimaryCritDamageTotal")] = damage1CritTotal;
	
			if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "dmg2flag")] == "1") {
				let damage2Total = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2")];
				damage2Total = isNaN(parseInt(damage2Total)) ? 0 : parseInt(damage2Total);
				let damage2CritTotal = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2crit")];
				damage2CritTotal = isNaN(parseInt(damage2CritTotal)) ? 0 : parseInt(damage2CritTotal);
				damage2CritTotal += damage2Total;
				let damage2Type = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2type")];
				let damage2Elem = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2element")];

				baseDamageString += `\n+${damage2Total} ${damage2Type} (${damage2Elem})`;
				critDamageString += `\n+${damage2CritTotal} ${damage2Type} (${damage2Elem})`;
	
				// calculate barrier qualities
				typeQualities = GetDamageTypeQualities(damage2Type);
				if (hasBarrier == "1" && typeQualities.isMagic) {
					barrierEffect = GetElementalDamageMultiplier(targetElement, damage2Elem, damage2Total, pb);
					damage2Total = barrierEffect.damage;
					barrierEffect = GetElementalDamageMultiplier(targetElement, damage2Elem, damage2CritTotal, pb);
					damage2CritTotal = barrierEffect.damage;
					
					switch(barrierEffect.type) {
						case "Neutral":
						break;
						case "Resistance":
							damageModString += (damageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance (second)"; 
							critDamageModString += (critDamageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance (second)"; 
						break;
						case "Weakness":
							damageModString += (damageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness (second)"; 
							critDamageModString += (critDamageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness (second)"; 
						break;
						case "Convalesce":
							damageModString += (damageModString == "" ? "" : "\n") + "Barrier Convalesces (second)"; 
							critDamageModString += (critDamageModString == "" ? "" : "\n") + "Barrier Convalesces (second)"; 
							damage2Type = "Convalescing";
						break;
					}
				}

				if (weaknesses != "") {
					drIndex = weaknesses.toLowerCase().indexOf(damage2Type.toLowerCase());
					if (drIndex >= 0) {
						brackIndex = weaknesses.substring(drIndex).indexOf("[");
						endBrackIndex = weaknesses.substring(drIndex).indexOf("]");
						dr = weaknesses.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
						dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
						
						if (dr != 0) {
							damage1Total += dr;
							damage1CritTotal += dr;
							damageModString += (damageModString == "" ? "" : "\n") + `+${dr} ${damage2Type} Weakness`;
							critDamageModString += (critDamageModString == "" ? "" : "\n") + `+${dr} ${damage2Type} Weakness`;
						}
		
					}
				}
				if (resistances != "") {
					drIndex = resistances.toLowerCase().indexOf(damage2Type.toLowerCase());
					if (drIndex >= 0) {
						brackIndex = resistances.substring(drIndex).indexOf("[");
						endBrackIndex = resistances.substring(drIndex).indexOf("]");
						dr = resistances.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
						dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
						
						if (dr != 0) {
							damage1Total -= dr;
							damage1CritTotal -= dr;
							if (damage1Total <= 0) {
								damage1Total = 0;
							}
							if (damage1CritTotal <= 0) {
								damage1CritTotal = 0;
							}
							damageModString += (damageModString == "" ? "" : "\n") + `-${dr} ${damage2Type} Resistance`;
							critDamageModString += (critDamageModString == "" ? "" : "\n") + `-${dr} ${damage2Type} Resistance`;
						}
		
					}
				}

				damageString += `\n+${damage2Total} ${damage2Type} (${damage2Elem})`;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logSecondaryDamageTotal")] = damage2Total;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logSecondaryDamageType")] = damage2Type;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logSecondaryCritDamageTotal")] = damage2CritTotal;
			}

			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageResult")] = damageString;
			damageModString = baseDamageString + "\n" + damageModString;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageResultMods")] = damageModString;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageResultModsSafe")] = damageModString.replace(/\n/g, "&&");
			critDamageModString = critDamageString + "\n" + critDamageModString;
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageCritResultModsSafe")] = critDamageModString.replace(/\n/g, "&&");
		}

		setAttrs(update, {
			silent: true
		});
	});
}

var battle_log_set_mod = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - SETTING MODS");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = GetSectionIdValues([repeatingSectionId], repeatingSection,
		["logActionName", "logExecuterCheck1", "logdmg", "logdmgcrit", "logdmgtype", "logdmgelement"]);

	getAttrs(battle_attrs, function (v) {
		var update = {};
		update["logAttackName"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logActionName")];
		update["logAttackBonus"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheck1")];
		update["logDamageBonus"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg")];
		update["logDamageCritBonus"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgcrit")];
		update["logDamageType"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgtype")];
		update["logDamageElement"] = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmgelement")];

		setAttrs(update, {
			silent: true
		});
	});

}

var battle_log_apply_atk_mod = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - ATTACK MOD");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = ["logAttackName", "logAttackBonus"];
	battle_attrs = battle_attrs.concat(GetSectionIdValues([repeatingSectionId], repeatingSection,
		["logExecuterCheckBonusName1", "logExecuterCheckBonusName2", "logExecuterCheckBonusName3", "logExecuterCheckBonusName4", "logExecuterCheckBonusName5"]));

	getAttrs(battle_attrs, function (v) {
		var update = {};

		let condCheckName = "";
		let modName = v["logAttackName"];
		for (let i = 1; i <= 5; i++) {
			condCheckName = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckBonusName" + i)];
			if (condCheckName == modName) {
				break;
			}
			if (condCheckName == undefined || condCheckName == "") {
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckBonusName" + i)] = modName;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logExecuterCheckBonusMod" + i)] = v["logAttackBonus"];
				break;
			}
		}

		setAttrs(update, {
			silent: true
		}, function () {
			battle_log_update_action_check(repeatingSectionId);
		});
	});
}

var battle_log_apply_dmg1_mod = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - DAMAGE MOD");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = ["logAttackName", "logDamageBonus", "logDamageCritBonus"];
	battle_attrs = battle_attrs.concat(GetSectionIdValues([repeatingSectionId], repeatingSection,
		["logDamageBonusName1", "logDamageBonusName2", "logDamageBonusName3", "logDamageBonusName4", "logDamageBonusName5"]));

	getAttrs(battle_attrs, function (v) {
		var update = {};

		let condCheckName = "";
		let modName = v["logAttackName"];
		for (let i = 1; i <= 5; i++) {
			condCheckName = v[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageBonusName" + i)];
			if (condCheckName == modName) {
				break;
			}
			if (condCheckName == undefined || condCheckName == "") {
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageBonusName" + i)] = modName;
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageCheckBonusMod" + i)] = v["logDamageBonus"];
				update[GetSectionIdName(repeatingSection, repeatingSectionId, "logDamageCheckBonusCrit" + i)] = v["logDamageCritBonus"];
				break;
			}
		}

		setAttrs(update, {
			silent: true
		}, function () {
			battle_log_update_action_damage(repeatingSectionId);
		});
	});

}

var battle_log_apply_dmg2_mod = function(repeatingSectionId) {
	console.log("UPDATING BATTLE ACTION - DAMAGE MOD 2");

	var repeatingSection = "repeating_battleLog";
	var battle_attrs = ["logDamageBonus", "logDamageCritBonus", "logDamageType", "logDamageElement"];
	battle_attrs = battle_attrs.concat(GetSectionIdValues([repeatingSectionId], repeatingSection, ["logdmg2"]));

	getAttrs(battle_attrs, function (v) {
		var update = {};

		if (v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2")] == undefined 
		|| v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2")] == "" 
		|| v[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2")] == "0") {

			update[GetSectionIdName(repeatingSection, repeatingSectionId, "dmg2flag")] = "1";
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2")] = v["logDamageBonus"];
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2crit")] = v["logDamageCritBonus"];
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2type")] = v["logDamageType"];
			update[GetSectionIdName(repeatingSection, repeatingSectionId, "logdmg2element")] = v["logDamageElement"];
		}

		setAttrs(update, {
			silent: true
		}, function () {
			battle_log_update_action_damage(repeatingSectionId);
		});
	});

}

var remove_battle_log = function (repeatingSectionId) {

	let repeatingSection = "repeating_battleLog";
	removeRepeatingRow(`${repeatingSection}_${repeatingSectionId}`);
}

var remove_all_battle_logs = function () {

	getSectionIDs("repeating_battleLog", function (idarray) {
		_.each(idarray, function (currentID) {
			remove_battle_log(currentID);
		});
	});
}



// Sheet Upgrades
var upgrade_to_1_1_0 = function (doneupdating) {

	let skill_attrs = ["characterAncestry-skill", "background", "class"];
	getAttrs(skill_attrs, function (v) {
		let update = {};

		let ethnicityInfo = GetHumanEthnicityInfo(v["characterAncestry-skill"]);
		if (ethnicityInfo.name != "") {
			update["setSkills-Ancestry"] = "Ancestry\n" + ethnicityInfo.skill;
			update["skillAncestryBonus"] = ethnicityInfo.skillPoints;
		}

		let backgroundInfo = GetBackgroundInfo(v["background"]);
		if (backgroundInfo.name != "") {
			update["setSkills-Background"] = "Background\n" + backgroundInfo.skill;
			update["skillBackgroundBonus"] = backgroundInfo.skillPoints;
		}
		setAttrs(update);

		update_classLevels_complex_all();
		update_branch_proficiency_points();
		update_health_barrier();
		update_caster_points();
		update_all_known_spells();

		// doneupdating();

	});
};
var upgrade_to_1_0_1 = function (doneupdating) {
	update_pb();
	finish_update_pb();
	update_all_features();
	doneupdating();
};

var upgrade_to_1_0 = function (doneupdating) {
	doneupdating();
};

var versioning = function () {
	getAttrs(["version"], function (v) {
		console.log("Checking version " + v["version"]);

		if (v["version"] === "1.1.0") {
			console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
		} else if (v["version"] === "1.0.1" || v["version"] === "1.0.2") {
			console.log("UPGRADING TO v1.1.0");
			upgrade_to_1_1_0(function () {
				setAttrs({version: "1.1.0"});
				versioning();
			});
		} else if (v["version"] === "1.0") {
			console.log("UPGRADING TO v1.0.1");
			upgrade_to_1_0_1(function () {
				setAttrs({version: "1.0.1"});
				versioning();
			});
		} else {
			console.log("UPGRADING TO v1.0");
			upgrade_to_1_0(function () {
				setAttrs({
					version: "1.0"
				});
				versioning();
			});
		};
	});
};

// ======= Basics DB Section

function GetCastingTrackObj() {
	return {
		level: 0,
		points: 0,
		nextLevel: 0,
		ki: 0,
		nextKi: 0,
		surge: 0,
		nextSurge: 0,
		ether: 0,
		nextEther: 0,
		power: 0,
		nextPower: 0,
		branch: 0,
		nextBranch: 0,
		slots: 0,
		nextSlots: 0
	};
}

function GetCasterPointsSpentByLevel(track, level, spellcasting_ability) {
	let pointObj = GetCastingTrackObj();
	pointObj.level = level;
	
	for (let i = 1; i <= level; i++) {
		pointObj.points += pointObj.nextLevel;
		switch(track.toLowerCase()) {
			case "spellpower": 
				pointObj.nextLevel = i + 1; 
			break;
			case "affinitycontrol": 
				pointObj.nextLevel = Math.ceil((i + 1) / 2); 
			break;
			case "willpower": 
				pointObj.nextLevel = Math.ceil((i + 1) / 3); 
			break;
			case "kicapacity": 
				pointObj.nextLevel = 1; 
			break;
		}
	}
	switch(track.toLowerCase()) {
		case "spellpower": 
			pointObj = GetSpellPowerBonuses(pointObj); 
		break;
		case "affinitycontrol": 
			pointObj = GetAffinityControlBonuses(pointObj); 
		break;
		case "willpower": 
			pointObj = GetWillpowerBonuses(pointObj); 
		break;
		case "kicapacity": 
			pointObj = GetKiCapacityBonuses(pointObj, spellcasting_ability); 
		break;
	}

	return pointObj;
}

function GetSpellPowerBonuses(pointObj) {
	let output = "";

	let ki = 0;
	let spellpower = 0;
	let levelingBonus = 0;
	for(let i = 1; i <= pointObj.level; i++) {
		ki += i * 15;
	}

	if (pointObj.level >= 4) {
		spellpower = 0;
		levelingBonus = 0;
		while (levelingBonus <= pointObj.level) {
			levelingBonus++;
			if ((levelingBonus - 4) % 3 == 0) {
				spellpower++;
			}
		}
	}
	pointObj.ki = ki;
	pointObj.power = spellpower;

	// next level
	spellpower = 0;
	ki = (pointObj.level + 1) * 15;
	if (pointObj.level >= 3) {
		levelingBonus = pointObj.level + 1;
		if ((levelingBonus-4) % 3 == 0) {
			spellpower++;
		}
	}
	pointObj.nextKi = ki;
	pointObj.nextPower = spellpower;
		
	return pointObj;
}

function GetAffinityControlBonuses(pointObj) {
	pointObj.nextBranch = 1;
	for(let i = 1; i <= pointObj.level; i++) {
		pointObj.branch += 1;
	}
	return pointObj;
}

function GetWillpowerBonuses(pointObj) {
	pointObj.nextSlots = 2;
	for(let i = 1; i <= pointObj.level; i++) {
		pointObj.slots += 2;
	}
	return pointObj;
}

function GetKiCapacityBonuses(pointObj, spellcasting_ability) {

	let levelingBonus = 0;
	switch (spellcasting_ability) {
		case "intelligence":
			pointObj.ki += (pointObj.level - 1) * 25;
			pointObj.nextKi += 25;

			pointObj.surge += (pointObj.level - 1) * 25;
			pointObj.nextSurge += 25;
			break;
		case "wisdom":
			pointObj.ki += (pointObj.level - 1) * 20;
			pointObj.nextKi += 20;

			pointObj.surge += pointObj.level * 10;
			pointObj.nextSurge += 10;

			if (pointObj.level >= 3) {
				levelingBonus = parseInt(pointObj.level);
				if (((levelingBonus + 1) % 3) == 0) {
					pointObj.nextEther = 5;
				}
				while (levelingBonus >= 3) {
					levelingBonus -= 3;
					pointObj.ether += 5;
				}
			}
			break;
		case "charisma":
			pointObj.ki += (pointObj.level - 1) * 40;
			pointObj.nextKi += 40;

			pointObj.surge += (pointObj.level - 1) * 10;
			pointObj.nextSurge += 10;
			break;
	}
	return pointObj;
}

// Base Sheet
function GetKnowledgeInfo(knowledge) {
	switch (knowledge.toLowerCase()) {
	case "":
	return {
	name: ""
	};
	case "academia": 
	return {
	name: "Academia",
	spec: `Academia specializations target specific schools and represents knowledge in how that school runs, its educators, and how subjects are taught.`,
	desc: `This knowledge represents information related to schools, famous educators, and forms of education used in the lands.`
	};
	case "apolloculture": 
	return {
	name: "Apollo Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "apollohistory": 
	return {
	name: "Apollo History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "apolloregion": 
	return {
	name: "Apollo Region",
	spec: ``,
	desc: `Region knowledges represents known geography and points of interest within the civilization.`
	};
	case "aquaticcreatures": 
	return {
	name: "Aquatic Creatures",
	spec: ``,
	desc: `This knowledge represents any life that dwells in the water.`
	};
	case "aquaticterrain": 
	return {
	name: "Aquatic Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "architecture": 
	return {
	name: "Architecture",
	spec: ``,
	desc: `This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses.`
	};
	case "arcticterrain": 
	return {
	name: "Arctic Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "art": 
	return {
	name: "Art",
	spec: `Art specializations target specific artist or artistic scenes and the works created from them.`,
	desc: `Art knowledge details information on the world of art and the artists behind famous works of art.`
	};
	case "aviancreatures": 
	return {
	name: "Avian Creatures",
	spec: ``,
	desc: `This knowledge represents any life that flies.`
	};
	case "ceresculture": 
	return {
	name: "Ceres Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "cereshistory": 
	return {
	name: "Ceres History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "ceresregion": 
	return {
	name: "Ceres Region",
	spec: ``,
	desc: `Region knowledges represents known geography and points of interest within the civilization.`
	};
	case "concept": 
	return {
	name: "Concept",
	spec: `Concept specializations represent knowledge in a specific topic that is otherwise intangible. These can be understanding of accounting or geometry from mathematics or the concept of the ethereal well or pocket realities from ethereal plane knowledge.`,
	desc: ``
	};
	case "creature": 
	return {
	name: "Creature",
	spec: `Specializations in creature knowledge target a specific type of creature and its permutations. This knowledge can then be used to identify information about that creature such as anatomy, special qualities, weaknesses, and common behaviors.`,
	desc: ``
	};
	case "cuisine": 
	return {
	name: "Cuisine",
	spec: `Cuisine specializations target a culture or class of people's foods and techniques used in that society. One might gain a knowledge in Minervan aristocrating cuisine or the food of a sailor.`,
	desc: `Cuisine knowledge represents an understand of food preparation, recipes, and cooking techniques.`
	};
	case "desertterrain": 
	return {
	name: "Desert Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "engineering": 
	return {
	name: "Engineering",
	spec: `Engineering specializations target specific types of engineering projects such as bridges or weaponry.`,
	desc: `Engineering knowledge represents an understanding of mechanics and systems to build complex structures and items.`
	};
	case "etherealplane": 
	return {
	name: "Ethereal Plane",
	spec: `Ethereal Plane specializations target concepts and points of interest related to the spirit plane.`,
	desc: `Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane.`
	};
	case "event": 
	return {
	name: "Event",
	spec: `Event specializations target a specific event. This can be a specific festival within a civilization, a major situation form the past like a war or monumental change in society, or a story told through legend.`,
	desc: ``
	};
	case "farming": 
	return {
	name: "Farming",
	spec: ``,
	desc: `Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food`
	};
	case "fashion": 
	return {
	name: "Fashion",
	spec: `Fashion specializations target a culture or class of people's clothing and popular appearances in that society.`,
	desc: `Fashion knowledge focuses on keeping up with clothing and physical beatuy products.`
	};
	case "fishing": 
	return {
	name: "Fishing",
	spec: ``,
	desc: `Fishing knowledge covers all aspects of fishing.`
	};
	case "forestterrain": 
	return {
	name: "Forest Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "fossoriancreatures": 
	return {
	name: "Fossorian Creatures",
	spec: ``,
	desc: `This knowledge represents any life that burrows.`
	};
	case "games": 
	return {
	name: "Games",
	spec: `Games specializations target specific games of chance and skill.`,
	desc: `Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance.`
	};
	case "guidancereligion": 
	return {
	name: "Guidance Religion",
	spec: ``,
	desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
	};
	case "herbalism": 
	return {
	name: "Herbalism",
	spec: `Herbalism specializations target categories of herbs such as spices for foods, medicinal remedies, and poisons.`,
	desc: `Herbalism knowledge grants an understanding of various types of small plant life and their uses.`
	};
	case "history": 
	return {
	name: "History",
	spec: `History specializations target a small known collective area within the world such as a specific society, forest, or other body of land. This knowledge can then be used to recall knowledge related to historical events of that area and how major events may have impacted the area.`,
	desc: ``
	};
	case "hunting": 
	return {
	name: "Hunting",
	spec: `Hiunting specializations target classes of creatures. Choose from Aquatic, Avian, Fossorian, Humanoid, Terran, or Saurian.`,
	desc: `Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures.`
	};
	case "junoculture": 
	return {
	name: "Juno Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "junohistory": 
	return {
	name: "Juno History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "junoregion": 
	return {
	name: "Juno Region",
	spec: ``,
	desc: `Region knowledges represents known geography and points of interest within the civilization.`
	};
	case "kongkweireligion": 
	return {
	name: "Kongkwei Religion",
	spec: ``,
	desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
	};
	case "legal": 
	return {
	name: "Legal",
	spec: `Legal specializations target civilizations of the world and their specific laws.`,
	desc: `Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them.`
	};
	case "liberculture": 
	return {
	name: "Liber Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "liberhistory": 
	return {
	name: "Liber History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "liberregion": 
	return {
	name: "Liber Region",
	spec: ``,
	desc: `Region knowledges represents known geography and points of interest within the civilization.`
	};
	case "mathematics": 
	return {
	name: "Mathematics",
	spec: `Mathematics specializations target specific mathematical concepts such as geometry or arithmetic.`,
	desc: `Mathematics knowledge represents an understanding of math and calculations.`
	};
	case "mercantile": 
	return {
	name: "Mercantile",
	spec: ``,
	desc: `Mercantile knowledge grants wisdom related to the buying and selling of goods.`
	};
	case "minervaculture": 
	return {
	name: "Minerva Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "minervahistory": 
	return {
	name: "Minerva History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "minervaregion": 
	return {
	name: "Minerva Region",
	spec: ``,
	desc: `Landscape knowledges represents known geography and points of interest within the civilization.`
	};
	case "mining": 
	return {
	name: "Mining",
	spec: ``,
	desc: `Mining knowledge represents information related to breaking apart rock for material.`
	};
	case "mountainterrain": 
	return {
	name: "Mountain Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "music": 
	return {
	name: "Music",
	spec: `Music specializations target types of music and those that perform in these genres.`,
	desc: `Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry.`
	};
	case "novusculture": 
	return {
	name: "Novus Culture",
	spec: ``,
	desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
	};
	case "novushistory": 
	return {
	name: "Novus History",
	spec: ``,
	desc: `History knowledges represent known history of a civilization and any legends that may exist.`
	};
	case "novusregion": 
	return {
	name: "Novus Region",
	spec: ``,
	desc: `Region knowledges represents known geography and points of interest within the civilization.`
	};
	case "oceancourtreligion": 
	return {
	name: "Ocean Court Religion",
	spec: ``,
	desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
	};
	case "organization": 
	return {
	name: "Organization",
	spec: `Organization specializations target a specific group of people or cause. This knowledge is used for information related to the organization, its causes, and what it may have done.`,
	desc: ``
	};
	case "plainsterrain": 
	return {
	name: "Plains Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "person": 
	return {
	name: "Person",
	spec: `Person specializations target a specific individual. This knowledge is used to bring up any information known about the person in specific.`,
	desc: ``
	};
	case "region": 
	return {
	name: "Region",
	spec: `Region specializations target a small known collective area within the world such as a specific town, forest, or other body of land. These knowledges are used for geography in the area, any secrets or shortcuts within the landscape, and survival in the area.`,
	desc: ``
	};
	case "religion": 
	return {
	name: "Religion",
	spec: `Religion specializations come in a few forms. They can represent specific rituals or hierarchies within a religion. They can also be used to represent either a specific subset of a religion or any smaller religions formed independent of any other globally known religion.`,
	desc: ``
	};
	case "sauriancreatures": 
	return {
	name: "Saurian Creatures",
	spec: ``,
	desc: `This knowledge represents the creatures known as saurians - life of earth.`
	};
	case "sailing": 
	return {
	name: "Sailing",
	spec: ``,
	desc: `Sailing knowledge imparts a knowledge of seafaring, the dangers of the sea, and an understanding of potential pitfalls at sea.`
	};
	case "scribing": 
	return {
	name: "Scribing",
	spec: ``,
	desc: `Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write.`
	};
	case "society": 
	return {
	name: "Society",
	spec: `Society specializations target a collection of people such as a small culture, a region of a nation, or a class of people within a civilization. This knowledge is used to represent societal customs, behaviors, and etiquette within the society.`,
	desc: ``
	};
	case "spirits": 
	return {
	name: "Spirits",
	spec: ``,
	desc: `Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane.`
	};
	case "swampterrain": 
	return {
	name: "Swamp Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "sylvanreligion": 
	return {
	name: "Sylvan Religion",
	spec: ``,
	desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
	};
	case "tanning": 
	return {
	name: "Tanning",
	spec: ``,
	desc: `Tanning knowledge imparts an understanding of techniques used to properly cure and work with leather.`
	};
	case "terrancreatures": 
	return {
	name: "Terran Creatures",
	spec: ``,
	desc: `This knowledge represents any creatures that live on and are bound by the earth.`
	};
	case "theater": 
	return {
	name: "Theater",
	spec: `Theater specializations target specific plays and their adaptations.`,
	desc: `Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays.`
	};
	case "undergroundterrain": 
	return {
	name: "Underground Terrain",
	spec: ``,
	desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
	};
	case "warfare": 
	return {
	name: "Warfare",
	spec: ``,
	desc: `Warfare knowledge covers various tactics used in war and the management of an army.`
	};
	case "zushaonreligion": 
	return {
	name: "Zushaon Religion",
	spec: ``,
	desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
	};
	}
	return {
	name: "",
	};
}
function GetLanguageInfo(language) {
switch (language.toLowerCase()) {
case "":
return {
name: ""
};
case "apollen / mons": 
return {
name: "Apollen / Mons",
category: "Common",
region: "",
desc: `The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen.`
};
case "cert": 
return {
name: "Cert",
category: "Common",
region: "",
desc: `The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan.`
};
case "junal": 
return {
name: "Junal",
category: "Common",
region: "",
desc: `Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society.`
};
case "lib": 
return {
name: "Lib",
category: "Common",
region: "",
desc: `This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents.`
};
case "minere": 
return {
name: "Minere",
category: "Common",
region: "",
desc: `The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area.`
};
case "byric": 
return {
name: "Byric",
category: "Regional",
region: "Baryan Ascent",
desc: `The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell.`
};
case "ciel": 
return {
name: "Ciel",
category: "Regional",
region: "Ceres",
desc: `This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres.`
};
case "citeq": 
return {
name: "Citeq",
category: "Regional",
region: "South West Ceres",
desc: `A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. `
};
case "dustell": 
return {
name: "Dustell",
category: "Regional",
region: "Aridsha Desert",
desc: `This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language.`
};
case "kleikan": 
return {
name: "Kleikan",
category: "Regional",
region: "Klef and Kremgao regions",
desc: `This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive.`
};
case "manstan": 
return {
name: "Manstan",
category: "Regional",
region: "Southern Ceres",
desc: `The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language.`
};
case "muralic": 
return {
name: "Muralic",
category: "Regional",
region: "Aridsha Desert",
desc: `The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal.`
};
case "palmic": 
return {
name: "Palmic",
category: "Regional",
region: "Tropical Seas",
desc: `This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism.`
};
case "salkan": 
return {
name: "Salkan",
category: "Regional",
region: "North West Ceres",
desc: `An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han.`
};
case "sansic": 
return {
name: "Sansic",
category: "Regional",
region: "Eastern Ceres",
desc: `The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language.`
};
case "shorespeak": 
return {
name: "Shorespeak",
category: "Regional",
region: "East Sea",
desc: `A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless.`
};
case "silq": 
return {
name: "Silq",
category: "Regional",
region: "Western Ceres",
desc: `The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times.`
};
case "verdeni": 
return {
name: "Verdeni",
category: "Regional",
region: "Verdant Key",
desc: `The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times.`
};
case "wolfwarg": 
return {
name: "Wolfwarg",
category: "Regional",
region: "Cesplangrah Societies",
desc: `The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls.`
};
case "crinere": 
return {
name: "Crinere",
category: "Ancient",
region: "",
desc: `The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere.`
};
case "shira": 
return {
name: "Shira",
category: "Ancient",
region: "",
desc: `An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics.`
};
case "vulca": 
return {
name: "Vulca",
category: "Ancient",
region: "",
desc: `The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts.`
};
case "emotion": 
return {
name: "Emotion",
category: "Special",
region: "Spirit",
desc: `The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions.`
};
case "empathy": 
return {
name: "Empathy",
category: "Special",
region: "Spirit",
desc: `A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand.`
};
case "novan / jovean": 
return {
name: "Novan / Jovean",
category: "Special",
region: "Ancient",
desc: `The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use.`
};
case "mytikan": 
return {
name: "Mytikan",
category: "Special",
region: "Ancient",
desc: `The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society.`
};
}
return {
name: "",
};
}
function GetHumanEthnicityInfo(ethnicity) {
switch (ethnicity.toLowerCase()) {
case "":
return {
name: ""
};
case "coastborne": 
return {
name: "Coastborne",
desc: `Coastborne originated along the east coast and islands of Wuxing but have moved in land occupying the plains and hills of the Khem and Walthai regions. The coastborne are known to be a clever people who are quick to find solutions to whatever problem that harries them.`,
score: `Increase any two ability scores by one, then increase Constitution or Intelligence by one.`,
skill: `Become trained in the Perception or Investigation skill.`,
skillPoints: 1,
feat: "Coastborne gain the Specialized Training feat to represent their varied skills and ingenuity.",
featName: "Specialized Training"
};
case "suntouched": 
return {
name: "Suntouched",
desc: `Suntounched can most commonly be found in the northern Khembalung mountain range. They are bulky and tall race known for their strength and imposing nature.`,
score: `Increase any two ability scores by one, then increase Strength or Charisma by one.`,
skill: `Become trained in the Athletics or Intimidation skill.`,
skillPoints: 1,
feat: "Suntouched gain the Relentless Endurance feat to represent their strength and determination.",
featName: "Relentless Endurance"
};
case "sandfolk": 
return {
name: "Sandfolk",
desc: `Sandfolk origins place them in the western Aridsha desert but much like many ethnicities in modern times they can be found all over the world. These people tend to have keen senses, able to react faster than the average person. `,
score: `Increase any two ability scores by one, then increase Dexterity or Wisdom by one.`,
skill: `Become trained in the Insight or Survival skill.`,
skillPoints: 1,
feat: "Sandfolk gain the Keen Instinct feat to represent their alert nature.",
featName: "Keen Instinct"
};
case "plains-kin": 
return {
name: "Plains-kin",
desc: `Plains-kin are found all over the world due to their exploratory nature but originated in the flat lands to the north. They are lithe and quick on their feet, able to pounce at a moment's notice.`,
score: `Increase any two ability scores by one, then increase Dexterity or Charisma by one.`,
skill: `Become trained in the Acrobatics or Investigation skill.`,
skillPoints: 1,
feat: "Plains-kin gain the Pounce feat to represent their finesse and speed.",
featName: "Pounce"
};
case "frostcloaked": 
return {
name: "Frostcloaked",
desc: `Frostcloaked are an isolated race that originate in the frozen tundras of the south. While their bodies are pale and thin, they are known to be a very hardy people with thick skin and a high tolerance for both temperature and pain.`,
score: `Increase any two ability scores by one, then increase Constitution or Wisdom by one.`,
skill: `Become trained in the Perception or Stealth skill.`,
skillPoints: 1,
feat: "Frostcloaked gain the Thick Skin feat to represent their durability.",
featName: "Thick Skin"
};
case "earthblood": 
return {
name: "Earthblood",
desc: `Earthblood are a race not seen on the main land of Wuxing but rather hail from the land of Novus across the East Sea. They are known to be equal parts clever and strong and a people devoted to self improvement.`,
score: `Increase any two ability scores by one, then increase Strength or Intelligence by one.`,
skill: `Become trained in the Arcana or Athletics skill.`,
skillPoints: 1,
feat: "Earthblood gain the Ki Battery feat as they all are able to generate ki with ease.",
featName: "Ki Battery"
};
}
return {
name: "",
};
}
function GetBeastAncestryInfo(beast) {
switch (beast.toLowerCase()) {
case "":
return {
name: ""
};
case "soma": 
return {
name: "Soma",
desc: `The soma, derrived from the ancient Shira word for body, are automatons that are developed in Juno as a method to provide spirits a way to interact with the living world without possessing a living being. What began as an experiment with Managem grew into an expansive project involving the nature of chakras, ki, and control over magic itself. The soma are now the first constructed beings able to house a spirit and perform magic as well as any other. `,
score: `Soma are made to be strong and durable. They gain a +4 bonus to Strength, a +2 bonus to Dexterity, a +6 bonus to Constitution, and a +2 bonus to Intelligence.`,
speed: `All soma start with a 25 foot land speed.`,
class: `All Soma are of the Automaton class. `,
features: [
{
name: "Soma Armor",
desc: `All soma have a hard plating made from sturdy material to help protect their interior components. The plating is kept light to allow mobility in the soma and to avoid interference with barriers.

When creating a soma, choose a sturdy material. The soma's natural armor bonus is equal to 1 + the armor bonus of the chosen material. When a soma is unarmored they add their natural armor bonus to their AC. This does not block barrier AC from applying to a soma.`,
featName: "Soma Armor",
},
{
name: "Clumsy",
desc: `This creature lacks nimbleness to perform precision actions. They suffer a -2 penalty to acrobatics, disable device, and thievery checks.`,
featName: "Clumsy",
} 
]
};
}
return {
name: "",
};
}
function GetBackgroundInfo(background) {
switch (background.toLowerCase()) {
case "":
return {
name: ""
};
case "acolyte": 
return {
name: "Acolyte",
desc: `You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine.`,
gear: `A holy symbol of your religion, vestments, a set of common clothes, and a wallet containing 6,000 CP.`,
skill: `Become Adept in two skills from Arcana, Insight, Medicne, or Persuasion. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `You gain a vocation based on a position within your religion. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `As an acolyte you command the respect of those who share your faith, and you can perform the religious ceremonies of your religion. When performing the Community Service downtime activity with the vocation gained from your lifestyle bonus, you have advantage on your checks.`,
featName: "Spiritual Guidance"
};
case "aristocrat": 
return {
name: "Aristocrat",
desc: `You understand wealth, power, and privilege. This background represents a person in a powerful position with a powerful name which may include nobility. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevating themselves to fortunes, or a disinherited scoundrel with a disproportionate sense of entitlement.

Work with your DM to come up with an appropriate position of power and determine how much authority that title carries. A title doesn’t stand on its own—it’s connected to an entire family, and whatever title you hold, you will pass it down to your own children. Not only do you need to determine your title, but you should also work with the DM to describe your family and their influence on you.

Due to the nature of adventuring while living in a powerful city, you may be starting with significantly fewer funds than this background may suggest. Work with your DM to determine a reason for your lack of funds.`,
gear: `A set of fine clothes, a signet ring, and a wallet containing 10,000 CP.`,
skill: `Become Adept in one skill from Deception, Insight, or Persuasion. 
Become Adept in two knowledges based on your background.
Become Expert in one language.`,
skillPoints: 2,
lifestyle: `You may immediately own a residence. The residence must fall within these restrictions:
Base Value is maximized to 300,000 CP.
You can only take rooms in the Living Space, Storage Rooms, Building Components, or Room Augmentation categories. Other rooms may be taken at the DM’s discretion.`,
featDesc: `You have the service of three retainers loyal to your family. These retainers can be attendants or messengers, and one might be a majordomo. Your retainers are commoners who can perform mundane tasks for you, but they do not fight for you and will leave if they are frequently endangered or abused.

You may lose access to a retainer to gain 3,000 Jin per week. This 3,000 Jin may only be spent on travel, clothing, food, and lodging expenses. You may gain an extra 3,000 Jin for each retainer you do not maintain. This Jin is lost at the end of each week.`,
featName: "Retainers"
};
case "artisan": 
return {
name: "Artisan",
desc: `You are skilled in a particular field and closely associated with other artisans. You are a well-established part of the mercantile world, freed by talent and wealth. You may have learned your skills as an apprentice to a master artisan, under the sponsorship of a guild, or by your own natural talent.`,
gear: `A set of artisan’s tools (your choice), A set of fine clothes, and a wallet containing 8,000 CP.`,
skill: `Become Adept in any three crafting skills.
Become Adept in two knowledges based on your background.`,
skillPoints: 6,
lifestyle: `There are many types of artisans in existence, from cobblers to chefs. Work with your GM to determine your type of craftsmanship. You may select your craft from the table to the left or roll randomly from the table.

You gain a vocation based on your artistic talents. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You are well versed in the making of a specific kind of structure or consumable. Choose one item related to your chosen craft from your lifestyle. When making this item you reduce all crafting time by half.`,
featName: "Practiced Craftsman"
};
case "charlatan": 
return {
name: "Charlatan",
desc: `You have always had a way with people. You know what makes them tick, you can tease out their hearts’ desires after a few minutes of conversation, and with a few leading questions you can read them like they were children’s books. It’s a useful talent, and one that you’re perfectly willing to use for your advantage.`,
gear: `A set of fine clothes, a disguise kit, and a wallet containing 6,000 CP.`,
skill: `Become Adept in two skill from Deception, Disguise, Perception, or Thievery. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `You gain a vocation based on your type of deception. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. `,
featName: "False Identity"
};
case "criminal": 
return {
name: "Criminal",
desc: `You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld. You’re far closer than most people to the world of murder, theft, and violence that pervades the underbelly of civilization, and you have survived up to this point by flouting the rules and regulations of society.`,
gear: `A crowbar, a set of dark common clothes including a hood, and a wallet containing 6,000 CP.`,
skill: `Become Adept in two skill from Deception, Disable Device, Stealth, or Thievery. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `There are many kinds of criminals, and within a thieves’ guild or similar criminal organization, individual members have particular specialties. Even criminals who operate outside of such organizations have strong preferences for certain kinds of crimes over others. Choose the role you played in your criminal life, or roll on the table.

You gain a vocation based on your type of criminal activity. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `Having been a criminal for most of your life, you have grown accustomed to many of the complications that can occur while on criminal activity. When using the Crime Downtime activity, you gain one retry when failing a skill check. `,
featName: "Life of Crime"
};
case "entertainer": 
return {
name: "Entertainer",
desc: `You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger. Your music raises their spirits or captures their sorrow. Your dance steps captivate, your humor cuts to the quick. Whatever techniques you use, your art is your life.`,
gear: `A musical instrument (one of your choice), the favor of an admirer (love letter, lock of hair, or trinket), a costume, and a wallet containing 6,000 CP.`,
skill: `Become Adept in two skill from Acrobatics, Athletics, Disguise, or Performance
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `A good entertainer is versatile, spicing up every performance with a variety of different routines. Choose one to three routines or roll on the table below to define your expertise as an entertainer.

You gain a vocation based on your type of entertainment. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble’s court. Your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.`,
featName: "By Popular Demand"
};
case "mercenary": 
return {
name: "Mercenary",
desc: `As a sell-sword who fought battles for coin, you’re well acquainted with risking life and limb for a chance at a share of treasure. Now, you look forward to fighting foes and reaping even greater rewards as an adventurer. Your experience makes you familiar with the ins and outs of mercenary life, and you likely have harrowing stories of events on the battlefield. You might have served with a large outfit such as the Zhentarim or the soldiers of Mint- arn, or a smaller band of sell-swords, maybe even more than one. (See the “Mercenaries of the North” sidebar for a collection of possibilities.)`,
gear: `A uniform of your company (traveler’s clothes in quality), an insignia of your rank, and a wallet containing 8,000 CP.`,
skill: `Become Adept in two skill from Athletics, Perception, Persuasion, or Pilot. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `You gain a vocation based on your type of mercenary work. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You are able to identify mercenary companies by their emblems, and you know a little about any such company, such as the names and reputations of its commanders and leaders.

You become Expert in the Mercenary Companies general knowledge.`,
featName: "Mercenary Life"
};
case "merchant": 
return {
name: "Merchant",
desc: `You are a member of a guild of traders, caravan masters, or shopkeepers. You don’t craft items yourself but earn a living by buying and selling the works of others (or the raw materials artisans need to practice their craft). Your guild might be a large merchant consortium (or family) with interests across the region. Perhaps you transported goods from one place to another, by ship, wagon, or caravan, or bought them from traveling traders and sold them in your own little shop. In some ways, the traveling merchant’s life lends itself to adventure.`,
gear: `A set of navigator’s tools and a wheeled cart, A set of fine clothes, and a wallet containing 8,000 CP.`,
skill: `Become Adept in two skill from Insight, Performance, Persuasion, or Survival.
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `There are many types of merchants in the world, however most specialized in a type of item to sell. Work with your GM to determine your ware specialization. You may select your specialization from the table to the left or roll randomly from the table.

You gain a vocation based on your mercantile specialization. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `Due to business relationships with a variety of different businesspeople, the merchant can draw on these connections to obtain discounts on goods and services and acquire knowledge of local events and personages.`,
featName: "Networking"
};
case "outlander": 
return {
name: "Outlander",
desc: `You grew up in the wilds, far from civilization and the comforts of town and technology. You’ve witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction. The wilds are in your blood, whether you were a nomad, an explorer, a recluse, a hunter-gatherer, or even a marauder. Even in places where you don’t know the specific features of the terrain, you know the ways of the wild.`,
gear: `A hunting trap, a trophy from an animal you killed, a set of traveler’s clothes, and a wallet containing 5,000 CP.`,
skill: `Become Adept in two skill from Athletics, Gathering, Nature, or Survival.
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `You’ve been to strange places and seen things that others cannot begin to fathom. Consider some of the distant lands you have visited, and how they impacted you. You can roll on the following table to determine your occupation during your time in the wild, or choose one that best fits your character.

You gain a vocation based on your origin. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. `,
featName: "Wanderer"
};
case "sailor": 
return {
name: "Sailor",
desc: `You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths. Your first love is the distant line of the horizon, but the time has come to try your hand at something new.`,
gear: `50 feet of silk rope, a set of common clothes, and a wallet containing 6,000 CP.`,
skill: `Become Adept in two skill from Athletics, Nature, Perception, or Pilot. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `You gain a vocation based on your type of sailing work. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you’re calling in a favor, you can’t be certain of a schedule or route that will meet your every need. Your Dungeon Master will determine how long it takes to get where you need to go. In return for your free passage, you and your companions are expected to assist the crew during the voyage.`,
featName: "Ship’s Passage"
};
case "scholar": 
return {
name: "Scholar",
desc: `You have a knack for learning, and sequestered yourself from the outside world to learn all you could. You read about so many wondrous places and things in your books, and always dreamed about one day seeing the real things. Eventually, that curiosity led you to leave your studies and become an adventurer.`,
gear: `A bottle of black ink, a quill, a small knife, a set of common clothes, and a wallet containing 5,000 CP.`,
skill: `Become Adept in one skill from Arcana, Health, or Nature.
Become Adept in five knowledges.
Become Expert in one language.`,
skillPoints: 2,
lifestyle: `Most scholars are placed in a position where they may have learned their scholarly pursuits. Work with your GM to determine your source. You may select your source from the table to the left or roll randomly from the table.

You gain a vocation based on your source. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `Due to years of researching various subjects, you've learned ways to accelerate your study. Whenever performing the Research downtime activity, you always gain one additional skill increase.`,
featName: "Fast Research"
};
case "soldier": 
return {
name: "Soldier",
desc: `Guarding has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield. You might have been part of a standing national army or perhaps a member of a local militia who rose to prominence during a recent war.`,
gear: `An insignia of rank, a set of bone dice or deck of cards, a set of common clothes, and a wallet containing 5,000 CP.`,
skill: `Become Adept in two skill from Athletics, Insight, Intimidation, or Pilot. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `During your time as a soldier, you had a specific role to play in your unit or army. Roll a d8 or choose from the options in the table to determine your role.

You gain a vocation based on your rank. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You have an officer rank from your career as a guard. Guards loyal to your former organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other guards and requisition simple equipment for temporary use. You can also usually gain access to friendly guard encampments and fortresses where your rank is recognized.`,
featName: "Officer Rank"
};
case "urchin": 
return {
name: "Urchin",
desc: `You grew up on the streets alone, orphaned, and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself. You fought fiercely over food and kept a constant watch out for other desperate souls who might steal from you. You slept on rooftops and in alleyways, exposed to the elements, and endured sickness without the advantage of medicine or a place to recuperate. You’ve survived despite all odds, and did so through cunning, strength, speed, or some combination of each.`,
gear: `A map of the city you grew up in, a token to remember your parents by, a set of common clothes, and a wallet containing 4,000 CP.`,
skill: `Become Adept in two skill from Athletics, Gathering, Stealth, or Thievery. 
Become Adept in two knowledges based on your background.`,
skillPoints: 4,
lifestyle: `Having grown up in a life of poverty you are well suited to roughing it outside. You gain no morale penalty when not sleeping in propper lodgings and having no home as a lifestyle.

In addition, you gain a vocation based on your history of living the streets. The vocation's core skill must be the skill you chose from this background.`,
featDesc: `You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.`,
featName: "City Secrets"
};
}
return {
name: "",
};
}
