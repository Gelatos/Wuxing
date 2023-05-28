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
	update_mod("dexterity");
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

on("change:strength_save_prof change:strength_save_prof_style change:strength_save_mod change:repeating_acmodifiers:strengthsavemod", function () {
	update_save("strength");
});

on("change:dexterity_save_prof change:dexterity_save_prof_style change:dexterity_save_mod change:repeating_acmodifiers:dexteritysavemod", function () {
	update_save("dexterity");
});

on("change:constitution_save_prof change:constitution_save_prof_style change:constitution_save_mod change:repeating_acmodifiers:constitutionsavemod", function () {
	update_save("constitution");
});

on("change:intelligence_save_prof change:intelligence_save_prof_style change:intelligence_save_mod change:repeating_acmodifiers:intelligencesavemod", function () {
	update_save("intelligence");
});

on("change:wisdom_save_prof change:wisdom_save_prof_style change:wisdom_save_mod change:repeating_acmodifiers:wisdomsavemod", function () {
	update_save("wisdom");
});

on("change:charisma_save_prof change:charisma_save_prof_style change:charisma_save_mod change:repeating_acmodifiers:charismasavemod", function () {
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
	update["characterBase-Base-flag"] = "0";
	update["characterBase-Class-flag"] = "on";
	setAttrs(update, {
		silent: true
	});
});

on("change:characterSetupClass", function () {

	getAttrs(["characterType"], function (v) {
		let update = {};
		update["characterBase-Class-flag"] = "0";
		update["characterBase-AbilityScores-flag"] = "on";

		setAttrs(update, {
			silent: true
		});
	});
});

on("change:characterSetupAbilityScores", function () {

	getAttrs(["characterType"], function (v) {
		let update = {};
		update["characterBase-AbilityScores-flag"] = "0";
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

on("change:characterBeastAncestry", function (eventinfo) {
	update_character_beast_ethnicity(eventinfo.newValue);
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

on("change:ancestryFeatAddButton0 change:ancestryFeatAddButton1 change:ancestryFeatAddButton2 change:ancestryFeatAddButton3 change:ancestryFeatAddButton4 change:ancestryFeatAddButton5", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};
	update_character_base_add_feature("ancestryFeat" + eventinfo.sourceAttribute.substring(eventinfo.sourceAttribute.length - 1) + "Name");
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


on("change:weapon_profrank-axe change:weapon_profmod-axe change:weapon_profrank-blade change:weapon_profmod-blade change:weapon_profrank-bow change:weapon_profmod-bow change:weapon_profrank-brawling change:weapon_profmod-brawling change:weapon_profrank-dart change:weapon_profmod-dart change:weapon_profrank-flail change:weapon_profmod-flail change:weapon_profrank-hammer change:weapon_profmod-hammer change:weapon_profrank-pistol change:weapon_profmod-pistol change:weapon_profrank-polearm change:weapon_profmod-polearm change:weapon_profrank-rifle change:weapon_profmod-rifle", function (eventinfo) {
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

	update_languages("speaking_language");
});

on("change:repeating_skilllanguages:language", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	let repeatingSection = "repeating_skilllanguages";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	update_languages(GetSectionIdName(repeatingSection, id, "language"));
});

on("change:repeating_skilllanguages:isSelected", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	let repeatingSection = "repeating_skilllanguages";
	let id = GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, repeatingSection);
	update_selected_language(GetSectionIdName(repeatingSection, id, "language"));
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

on("clicked:createUnarmedStrike", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	make_unarmed_strike();
});

on("clicked:createSurge", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	make_surge_action();
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

on("change:skillClassBonus change:skillArchetypeBonus change:skillFeatBonus change:skillMiscBonus change:skillBackgroundBonus change:specSkillFeatBonus change:specSkillMiscBonus", function () {
	update_skill_proficiency_points();
});

on("change:knowSkillBackgroundBonus change:knowSkillFeatBonus change:knowSkillMiscBonus", function () {
	update_knowledge_skill_proficiency_points();
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

on("change:repeating_skillKnowledges:skillknowledgeproficiency", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_skills();
	update_knowledge_skill_proficiency_points();
});

// Skills: Languages

on("change:repeating_skillLanguages:language", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_knowledge_language_description(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillLanguages"), eventinfo.newValue);
});

on("change:repeating_skillLanguages:languagebase change:repeating_skillLanguages:languagemod", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_language_skills([GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillLanguages")]);
});

on("change:repeating_skillLanguages:languageproficiency", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_language_skills([GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_skillLanguages")]);
	update_knowledge_skill_proficiency_points();
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

on("change:repeating_customActions:atkTargetStyle change:repeating_customActions:atkTraits change:repeating_customActions:atkActionCost change:repeating_customActions:atkConditionalsflag change:repeating_customActions:atkrange change:repeating_customActions:atkTrigger change:repeating_customActions:atkRequirement change:repeating_customActions:checkflag change:repeating_customActions:checkbase change:repeating_customActions:checkmod change:repeating_customActions:checkdef change:repeating_customActions:checkdefdc change:repeating_customActions:atkflag change:repeating_customActions:atkattr_base change:repeating_customActions:atkmod change:repeating_customActions:atkaskforroll change:repeating_customActions:proficiency_group change:repeating_customActions:proficiency_customrank change:repeating_customActions:dmgflag change:repeating_customActions:dmgbase change:repeating_customActions:dmgattr change:repeating_customActions:dmgmod change:repeating_customActions:dmgtype change:repeating_customActions:dmgelement change:repeating_customActions:dmg2flag change:repeating_customActions:dmg2base change:repeating_customActions:dmg2attr change:repeating_customActions:dmg2mod change:repeating_customActions:dmg2type change:repeating_customActions:dmg2element change:repeating_customActions:atkspellpower change:repeating_customActions:hldmg change:repeating_customActions:atkCritSuccess change:repeating_customActions:atkSuccess change:repeating_customActions:atkFailure change:repeating_customActions:atkCritFailure change:repeating_customActions:spellmana change:repeating_customActions:vitality change:repeating_customActions:ammo change:repeating_customActions:resource change:repeating_customActions:consumable change:repeating_customActions:autoDefense change:repeating_customActions:atk_desc", function (eventinfo) {
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

on("change:hpTrue change:hp_max change:barrierTrue change:barrier_max change:hpBonus change:barrierBonus change:vitalityBonus change:manaEssenceBonus change:spBonus", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_health_barrier();
});

on("change:classBarrierIsSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_spirit("current");
	update_ac();
});

on("change:repeating_spirits:isSelected", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_selected_spirit(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_spirits"));
	update_ac();
});


// Vitals: Defense Modifiers
on("change:repeating_acmodifiers:isSelected", function () {
	update_ac();
	update_weakness_and_resistance();
	update_all_saves();
});

on("change:repeating_acmodifiers:autoOffTurn change:repeating_acmodifiers:autoOffBrief", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_auto_defenses();
});

on("change:repeating_acmodifiers:name", function (eventinfo) {
	if (eventinfo.sourceType && eventinfo.sourceType === "sheetworker") {
		return;
	}
	update_defense_list();
});

on("change:armorAddProficiency-unarmored change:armorAddProficiency-light change:armorAddProficiency-medium change:armorAddProficiency-heavy change:armorMaxMediumDex change:armorBACActiveState change:armorBACWithArmor change:repeating_acmodifiers:actsWithBarrier change:repeating_acmodifiers:acmod change:repeating_acmodifiers:acattr", function (eventinfo) {
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

on("change:repeating_battlesongs:song change:repeating_battlesongs:songdesc", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_battle_jukebox_list();
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

on("change:repeating_chapterselect:StartSessionQuests", function (eventinfo) {
	if (eventinfo.sourceType === "sheetworker") {
		return;
	};

	update_chapter_quests(GetRepeatingSectionIdFromId(eventinfo.sourceAttribute, "repeating_chapterselect"), eventinfo.newValue);
	
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
	return ["axe", "blade", "bow", "brawling", "dart", "flail", "hammer", "pistol", "polearm", "rifle"];
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
		checkAsk: false,
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
		vitality: "",
		ammo: "",
		resource: "",
		consumable: "",
		autoDefense: "",

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
				if (this.checkAsk) {
					output += ` {{checkAsk=1}}{{r1=[[?{Check Roll Result|0}${(this.checkMod != "" ? " + " + this.checkMod : "")}]]}}`;
				}
				else {
					output += ` {{r1=[[${(this.checkRoll ? "1d20" : "0d20") + (this.checkMod != "" ? " + " + this.checkMod : "")}]]}}`;
				}
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

			// add special conditions
			output += this.onCritSuccess != "" ? ` {{oncritsuccess=${this.onCritSuccess}}}` : "";
			output += this.onSuccess != "" ? ` {{onsuccess=${this.onSuccess}}}` : "";
			output += this.onFailure != "" ? ` {{onfailure=${this.onFailure}}}` : "";
			output += this.onCritFailure != "" ? ` {{oncritfailure=${this.onCritFailure}}}` : "";
			output += this.mana != 0 ? ` {{mana=${this.mana}}}` : "";
			output += this.baseLvl != 0 ? ` {{baselevel=${this.baseLvl}}}` : "";
			output += this.castLvl != 0 ? ` {{castlevel=${this.castLvl}}}` : "";
			output += this.vitality != "" ? ` {{vitality=${this.vitality}}}` : "";
			output += this.ammo != "" ? ` {{ammo=${this.ammo}}}` : "";
			output += this.resource != "" ? ` {{resource=${this.resource}}}` : "";
			output += this.consumable != "" ? ` {{consumable=${this.consumable}}}` : "";
			output += this.autoDefense != "" ? ` {{autodefense=${this.autoDefense}}}` : "";
			

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
	update["introduction_nickname"] = name;
	update["introduction_title"] = "-";
	update["nickname"] = "???";
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
							rolls.push(total_rolls(roll_multiple_dice(3, 4)));
						}
					break;
					case "Heroic":
						if (rerolls < 5) {
							for (let i = 0; i < 3; i++) {
								rolls.push(total_rolls(roll_multiple_dice_drop_lowest(4, 4)));
							}
						}
					break;
				}
			break;
			case "Beast":
				switch(rollStyle) {
					case "Common":
						for (let i = 0; i < 6; i++) {
							rolls.push(total_rolls(roll_multiple_dice(3, 4)));
						}
					break;
					case "Heroic":
						if (rerolls < 5) {
							for (let i = 0; i < 6; i++) {
								rolls.push(total_rolls(roll_multiple_dice_drop_lowest(4, 4)));
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

var update_character_beast_ethnicity = function (ethnicity) {
	console.log("UPDATING BEAST TO " + ethnicity);
	let update = {};
	
	let ethnicityInfo = GetBeastAncestryInfo(ethnicity);

	if (ethnicityInfo.name != "") {
		update["ancestryDescription"] = ethnicityInfo.desc;
	}
	update["beastClassRestriction"] = ethnicityInfo.class;
	update["ancestryAbilityScoreBonus"] = ethnicityInfo.score;
	update["characterAncestrySpeed"] = ethnicityInfo.speed;

	for(let i = 0; i <= 5; i++) {
		if (i < ethnicityInfo.features.length) {
			update["ancestryFeat" + i] = ethnicityInfo.features[i].name;
			update["ancestryFeatDesc" + i] = ethnicityInfo.features[i].desc;
			update["ancestryFeat" + i + "Name"] = ethnicityInfo.features[i].featName;
			update["ancestryFeatAddButton" + 1] = "0";
		}
		else {

		}
	}

	setAttrs(update);

	getAttrs(["skin"], function (v) {
		let specupdate = {};
		if (v["skin"] == undefined || v["skin"] == "") {
			specupdate["skin"] = ethnicity;
		}
		setAttrs(specupdate);
	});
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
		case "temperament": featTypeId = "TemperamentFeats"; break;
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
		case "temperament": featTypeId = "TemperamentFeats"; break;
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
			classspecskillPts: 0,
			archskillPts: 0,
			knowledgeProf: "",
			classknowskillPts: 0,
			perceiveBarrier: 0,

			features: [],
			feats: []
		};

		let levelCp = 0;

		let totalLevel = isNaN(parseInt(v["simpleLevelArchetypesLevel"])) ? 1 : parseInt(v["simpleLevelArchetypesLevel"]);
		let totalHP = 0;
		let totalBr = 0;
		let totalSp = 0;

		// grab user data
		levelHpMod = isNaN(parseInt(v["simpleLevelArchetypeHpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeHpBonus"]);
		levelBrMod = isNaN(parseInt(v["simpleLevelArchetypeBrBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeBrBonus"]);
		levelSpMod = isNaN(parseInt(v["simpleLevelArchetypeSpBonus"])) ? 0 : parseInt(v["simpleLevelArchetypeSpBonus"]);

		for (let i = 1; i <= totalLevel; i++) {

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
		update["specSkillClassBonus"] = levelGrowth.classspecskillPts;
		update["knowSkillClassBonus"] = levelGrowth.classknowskillPts;
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
				case "temperament": featTypeId = "TemperamentFeat"; break;
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
			update_knowledge_skill_proficiency_points();
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
		update["classDescription"] = classInfo.desc;
		update["creatureAbilityScoreCaps"] = classInfo.ascap;

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
				update_knowledge_skill_proficiency_points();
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
			update = do_update_classLevels_complex_profs_and_feats(update, idarray, v, levelId, true);

			setAttrs(update, {
				silent: true
			}, function () {
				update_pb();
				finish_update_pb();
				update_all_proficiencies();
				update_weapon_proficiency_points();
				update_armor_proficiency_points();
				update_skill_proficiency_points();
				update_knowledge_skill_proficiency_points();
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
		classweaponPoints: 0,
		archweaponPoints: 0,
		unarmored: isNaN(parseInt(v["armor_profrank-unarmored"])) ? 0 : parseInt(v["armor_profrank-unarmored"]),
		light: isNaN(parseInt(v["armor_profrank-light"])) ? 0 : parseInt(v["armor_profrank-light"]),
		medium: isNaN(parseInt(v["armor_profrank-medium"])) ? 0 : parseInt(v["armor_profrank-medium"]),
		heavy: isNaN(parseInt(v["armor_profrank-heavy"])) ? 0 : parseInt(v["armor_profrank-heavy"]),
		armorProf: "",
		armorTier: isNaN(parseInt(v["armorPointsMaxTier"])) ? 0 : parseInt(v["armorPointsMaxTier"]),
		startingArmor: v["setArmorProf-Class"],
		classarmorPoints: 0,
		archarmorPoints: 0,
		skillProf: "",
		startingSkills: v["setSkillProf-Class"],
		skillTier: isNaN(parseInt(v["skillPointsMaxTier"])) ? 0 : parseInt(v["skillPointsMaxTier"]),
		classskillPts: 0,
		classspecskillPts: 0,
		archskillPts: 0,
		knowledgeProf: "",
		classknowskillPts: 0,
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
			case "temperament": featTypeId = "TemperamentFeat"; break;
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
	update["specSkillClassBonus"] = levelGrowth.classspecskillPts;
	update["knowSkillClassBonus"] = levelGrowth.classknowskillPts;
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
		if (classType.toLowerCase() == "class" || classType.toLowerCase() == "beast" || classType.toLowerCase() == "spirit") {
			levelGrowth.classskillPts += proficiencyPoints;
		}
		else {
			levelGrowth.archskillPts += proficiencyPoints;
		}

		proficiencyPoints = skillProf.init.specializationCount;
		if (classType.toLowerCase() == "class" && classSubType.toLowerCase() == "heroic") {
			proficiencyPoints++;
		}
		levelGrowth.classspecskillPts += proficiencyPoints;

		if (levelGrowth.skillTier < 2) {
			levelGrowth.skillTier = 2;
		}

		// determine growths
		let startingGrowth = `Become ${GetProficiencyRankTitle(skillProf.init.startRank)} in ${skillProf.init.startingCount} skills from ${skillProf.init.startingSkills}.`;
		levelGrowth.startingSkills = "Class\n" + startingGrowth;
		if (skillProf.init.specializationCount > 0) {
			startingGrowth += `\nBecome Trained in ${(skillProf.init.specializationCount)} specializations.`;
		}
		if (classType.toLowerCase() == "class" && classSubType.toLowerCase() == "heroic") {
			levelGrowth.perceiveBarrier = 1;
			startingGrowth += `\nSetting Perceive Barrier specialization to Trained.`;
		}
		levelGrowth.skillProf += (levelGrowth.skillProf != "" ? "\n" : "") + startingGrowth;

		// Knowledge
		levelGrowth.knowledgeProf += `Become Trained in ${(skillProf.init.bonusKnowledge)} knowledge(s) and/or language(s).`;
		levelGrowth.classknowskillPts += parseInt(skillProf.init.bonusKnowledge);

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
			levelGrowth.classknowskillPts++;
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

	let abilityScoreArray = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
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
				update_health_barrier();
				update_weight();
				update_initiative();
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
						subSpCost = 2;
						increaseBonus = 12;
						subIncrementer = 1;
						for (let i = 0; i < qty; i++) {
							while (increaseBonus < totalMod[sourceTyoe]) {
								increaseBonus += 2;
								if (increaseBonus < 16) {
									subIncrementer = 1;
								}
								else if (increaseBonus < 20) {
									subIncrementer = 2;
								}
								else {
									subIncrementer += 1;
								}
								subSpCost += subIncrementer;
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

var update_save = function (attributeArray) {

	// set it to an array
	if (!Array.isArray(attributeArray)) {
		attributeArray = [attributeArray];
	}
	console.log("UPDATING SAVE: " + attributeArray);
	let save_attrs = ["pb"];
	let repeatingSection = "repeating_acmodifiers";
	let attr = "";

	getSectionIDs(repeatingSection, function (idarray) {
		save_attrs = save_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["isSelected"]));
		for (let i = 0; i < attributeArray.length; i++) {
			attr = attributeArray[i];
			save_attrs = save_attrs.concat(GetSectionIdValues(idarray, repeatingSection, [attr + "savemod"]));
			save_attrs = save_attrs.concat([attr + "_mod", attr + "_save_prof", attr + "_save_mod", attr + "_save_prof_style"]);
		}

		getAttrs(save_attrs, function (v) {
			let prof = 0;
			let total = 0;
			let update = {};

			for (let i = 0; i < attributeArray.length; i++) {
				attr = attributeArray[i];

				// calculate the prof bonus
				prof = 0;

				pb = isNaN(parseInt(v["pb"])) ? 2 : parseInt(v["pb"]);
				switch(v[attr + "_save_prof_style"]) {
					case "0":
						prof += pb;
					break;
					case "1":
						prof += pb + Math.floor(pb / 2);
					break;
					case "2":
						prof += pb * 2;
					break;
					case "3":
						prof += 0;
					break;
					default:
						prof += pb;
					break;
				}
				prof += (GetProfRankBonus(v[attr + "_save_prof"], false, 0) * 2);
				prof += isNaN(parseInt(v[attr + "_save_mod"])) ? 0 : parseInt(v[attr + "_save_mod"]);
				total = prof + (isNaN(parseInt(v[attr + "_mod"])) ? 0 : parseInt(v[attr + "_mod"]));

				// add temp modifiers
				_.each(idarray, function (currentID) {
					if (v[GetSectionIdName(repeatingSection, currentID, "isSelected")] == "1") {
						total += isNaN(parseInt(v[GetSectionIdName(repeatingSection, currentID, attr + "savemod")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSection, currentID, attr + "savemod")]);
					}
				});

				// set the updates
				update[attr + "_save"] = total;
				update[attr + "_save_bonus"] = prof;
			}

			setAttrs(update, {
				silent: true
			});
		});
	});
};

var update_all_saves = function () {
	update_save(["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]);
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

var update_languages = function (item_id) {
	console.log("UPDATING LANGUAGE");
	var update = {};
	var attr_fields = [item_id];
	let repeatingSection = "repeating_skilllanguages";

	getSectionIDs(repeatingSection, function (idarray) {
		_.each(idarray, function (id) {
			attr_fields.push(GetSectionIdName(repeatingSection, id, "language"));
		});

		getAttrs(attr_fields, function (v) {

			let languageSet = "";
			_.each(idarray, function (id) {
				languageSet += v[GetSectionIdName(repeatingSection, id, "language")] + ",";
			});
			update["language_allLanguages"] = languageSet;
			setAttrs(update);

		});
	});
}

var update_selected_language = function (item_id) {
	console.log("UPDATING SELECTED LANGUAGE");
	var update = {};
	var attr_fields = [item_id];
	let repeatingSection = "repeating_skilllanguages";

	getSectionIDs(repeatingSection, function (idarray) {

		attr_fields = attr_fields.concat();
		_.each(idarray, function (currentID, i) {
			attr_fields.push("repeating_skilllanguages_" + currentID + "_language");
		});

		getAttrs(attr_fields, function (v) {

			update["speaking_language"] = v[item_id];
			update["speaking_language_tag"] = GetLanguageTag(v[item_id].toLowerCase());

			_.each(idarray, function (id) {

				if (GetSectionIdName(repeatingSection, id, "language") != item_id) {
					update[GetSectionIdName(repeatingSection, id, "isSelected")] = "0";
				}
			});
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
										update["capacityCarryError"] = (wtotal > weightMax) ? "1" : "0";
										update["capacityLiftError"] = (wtotal > weightLift) ? "1" : "0";
										update["capacityDragError"] = (wtotal > weightDrag) ? "1" : "0";

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

var getAttackData = function() {
	return {
		itemname: "",
		itemCategory: "",
		itemGroup: "",
		itemDamage: "",
		itemDamageType: "",
		itemElement: "",
		itemEnhancement: "",
		itemProperties: "",
		featureDesc: ""
	};
}

var make_attack_from_weapon = function(itemId) {
	var repeatingWeapons = "repeating_gearweapons";

	var mod_attrs = GetSectionIdValues([itemId], repeatingWeapons,
		["itemname", "itemCategory", "itemGroup", "itemDamage", "itemDamageType", "itemElement", "itemEnhancement", "itemProperties", "featureDesc"]);

	getAttrs(mod_attrs, function (v) {
		let attackData = getAttackData();
		attackData.itemname = v[GetSectionIdName(repeatingWeapons, itemId, "itemname")];
		attackData.itemCategory = v[GetSectionIdName(repeatingWeapons, itemId, "itemCategory")];
		attackData.itemGroup = v[GetSectionIdName(repeatingWeapons, itemId, "itemGroup")];
		attackData.itemDamage = v[GetSectionIdName(repeatingWeapons, itemId, "itemDamage")];
		attackData.itemDamageType = v[GetSectionIdName(repeatingWeapons, itemId, "itemDamageType")];
		attackData.itemElement = v[GetSectionIdName(repeatingWeapons, itemId, "itemElement")];
		attackData.itemEnhancement = v[GetSectionIdName(repeatingWeapons, itemId, "itemEnhancement")];
		attackData.itemProperties = v[GetSectionIdName(repeatingWeapons, itemId, "itemProperties")];
		attackData.featureDesc = v[GetSectionIdName(repeatingWeapons, itemId, "featureDesc")];

		console.log("CONVERTING WEAPON INTO ACTION: " + attackData.itemname);
		make_attack_from_attack_data(attackData);
	});

}

var make_unarmed_strike = function() {

	let attackData = getAttackData();
	attackData.itemname = "Unarmed Strike";
	attackData.itemCategory = "Simple";
	attackData.itemGroup = "Brawling";
	attackData.itemDamage = "1d4";
	attackData.itemDamageType = "Bludgeoning";
	attackData.itemElement = "";
	attackData.itemEnhancement = "1";
	attackData.itemProperties = "";

	console.log("CREATING UNARMED STRIKE");
	make_attack_from_attack_data(attackData);
}

var make_surge_action = function() {

	var update = {};

	// create a new row in the custom actions section
	var repeatingSection = "repeating_customActions";
	var newrowid = generateRowID();

	// set basics
	update[GetSectionIdName(repeatingSection, newrowid, "options-flag")] = "0";
	update[GetSectionIdName(repeatingSection, newrowid, "atkname")] = "Surge";
	update[GetSectionIdName(repeatingSection, newrowid, "atkTargetStyle")] = "Self";
	update[GetSectionIdName(repeatingSection, newrowid, "atkTraits")] = "Concentrate";
	update[GetSectionIdName(repeatingSection, newrowid, "atkActionCost")] = "2";
	update[GetSectionIdName(repeatingSection, newrowid, "atk_desc")] = `You push your body to its limits to regain Ki. When you surge you take 3 Vitality Damage. If your vitality is above zero and you have not fallen unconscious, you regain Ki equal to your Surge Value.`;
	update[GetSectionIdName(repeatingSection, newrowid, "spellmana")] = "[[0-@{surge_bonus}]]";
	update[GetSectionIdName(repeatingSection, newrowid, "vitality")] = "[[3-@{manaSurgeResistBonus}]]";

	setAttrs(update, {
		silent: true
	}, function () {
		update_actions(newrowid, true);
	});

}

var make_attack_from_attack_data = function (attackData) {

	var update = {};

	// create a new row in the custom actions section
	var repeatingSection = "repeating_customActions";
	var newrowid = generateRowID();

	// variables
	var properties = attackData.itemProperties;
	let isMelee = true;

	// set basics
	update[GetSectionIdName(repeatingSection, newrowid, "options-flag")] = "0";
	update[GetSectionIdName(repeatingSection, newrowid, "atkname")] = attackData.itemname;
	update[GetSectionIdName(repeatingSection, newrowid, "atkTargetStyle")] = "Token";
	update[GetSectionIdName(repeatingSection, newrowid, "atkTraits")] = "Attack";
	update[GetSectionIdName(repeatingSection, newrowid, "atkActionCost")] = "1";
	update[GetSectionIdName(repeatingSection, newrowid, "atkActionsCanChange")] = "1";

	// see if there's a range property
	if (properties.indexOf("Ammo") >= 0) {
		let rangeString = properties.substr(properties.indexOf("Ammo"));
		let rangeStart = rangeString.indexOf("(");
		let rangeEnd = rangeString.indexOf(")");
		isMelee = false;
		update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `${rangeString.substring(rangeStart + 1, rangeEnd)} feet`;
		update[GetSectionIdName(repeatingSection, newrowid, "atkConditionalsflag")] = "1";
	} else if (properties.indexOf("Thrown") >= 0) {
		let rangeString = properties.substr(properties.indexOf("Thrown"));
		let rangeStart = rangeString.indexOf("(");
		let rangeEnd = rangeString.indexOf(")");
		update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `${rangeString.substring(rangeStart + 1, rangeEnd)} feet`;
		update[GetSectionIdName(repeatingSection, newrowid, "atkConditionalsflag")] = "1";
	} else {
		update[GetSectionIdName(repeatingSection, newrowid, "atkrange")] = `5 feet`;
	}

	// set attack data
	update[GetSectionIdName(repeatingSection, newrowid, "checkflag")] = "1";
	update[GetSectionIdName(repeatingSection, newrowid, "atkflag")] = "1";
	if (!isMelee || properties.indexOf("Finesse") >= 0) {
		update[GetSectionIdName(repeatingSection, newrowid, "atkattr_base")] = "dexterity";
	} else {
		update[GetSectionIdName(repeatingSection, newrowid, "atkattr_base")] = "strength";
	}
	update[GetSectionIdName(repeatingSection, newrowid, "atkmod")] = attackData.itemEnhancement;

	// set the best proficiency
	let groupName = attackData.itemGroup.substring(0, 1).toUpperCase() + attackData.itemGroup.substring(1);
	if (groupName != "") {
		update[GetSectionIdName(repeatingSection, newrowid, "proficiency_group")] = groupName;
	} else {
		update[GetSectionIdName(repeatingSection, newrowid, "proficiency_group")] = "0";
	}

	// set damage data
	update[GetSectionIdName(repeatingSection, newrowid, "dmgflag")] = "1";
	update[GetSectionIdName(repeatingSection, newrowid, "dmgbase")] = attackData.itemDamage;
	update[GetSectionIdName(repeatingSection, newrowid, "dmgattr")] = "strength";
	update[GetSectionIdName(repeatingSection, newrowid, "dmgmod")] = attackData.itemEnhancement;
	update[GetSectionIdName(repeatingSection, newrowid, "dmgtype")] = attackData.itemDamageType;
	update[GetSectionIdName(repeatingSection, newrowid, "dmgelement")] = attackData.itemElement;

	setAttrs(update, {
		silent: true
	}, function () {
		update_actions(newrowid, true);
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
	console.log("UPDATING SKILL PROFICIENCY POINT TOTALS");

	let skillProfArray = PrefixAttributeArray("skillproficiency-", GetSkillProficiencyTypes());
	let specProfArray = PrefixAttributeArray("skillspecproficiency-", GetSkillSpecializationTypes());
	let skillMaxProfArray = ["skillAncestryBonus", "skillBackgroundBonus", "skillClassBonus", "skillArchetypeBonus", "skillFeatBonus", "intelligence_mod", "skillMiscBonus"];
	let specMaxProfArray = ["specSkillClassBonus", "specSkillLifeBonus", "specSkillFeatBonus", "specSkillMiscBonus"];

	let prof_attrs = skillProfArray.concat(specProfArray).concat(skillMaxProfArray).concat(specMaxProfArray);
	getAttrs(prof_attrs, function (v) {
		let update = {};
		let skillPoints = 0;
		let specPoints = 0;
		let skillPointMax = 0;
		let specPointMax = 0;

		// get the points
		for (let i = 0; i < skillProfArray.length; i++) {
			skillPoints += isNaN(parseInt(v[skillProfArray[i]])) ? 0 : parseInt(v[skillProfArray[i]]);
		}
		for (let i = 0; i < specProfArray.length; i++) {
			specPoints += isNaN(parseInt(v[specProfArray[i]])) ? 0 : parseInt(v[specProfArray[i]]);
		}

		// get their maximums
		for (let i = 0; i < skillMaxProfArray.length; i++) {
			skillPointMax += isNaN(parseInt(v[skillMaxProfArray[i]])) ? 0 : parseInt(v[skillMaxProfArray[i]]);
		}
		for (let i = 0; i < specMaxProfArray.length; i++) {
			specPointMax += isNaN(parseInt(v[specMaxProfArray[i]])) ? 0 : parseInt(v[specMaxProfArray[i]]);
		}

		// any spec points in excess of the spec point max automatically become skill points
		if (specPoints > specPointMax) {
			skillPoints += (specPoints - specPointMax);
			specPoints = specPointMax;
		}

		update["skillPoints"] = skillPoints;
		update["skillPoints_max"] = skillPointMax;
		update["skillPointsError"] = skillPoints > skillPointMax ? 1 : 0;
		update["specSkillPoints"] = specPoints;
		update["specSkillPoints_max"] = specPointMax;
		update["specSkillPointsError"] = specPoints < specPointMax ? 1 : 0;

		setAttrs(update, {
			silent: true
		});
	});
}

var update_knowledge_skill_proficiency_points = function() {
	console.log("UPDATING KNOWLEDGE SKILL PROFICIENCY POINT TOTALS");
	
	let repeatingKnowledges = "repeating_skillknowledges";
	let repeatingLanguages = "repeating_skilllanguages";

	getSectionIDs(repeatingKnowledges, function (idarray) {
		getSectionIDs(repeatingLanguages, function (idarray2) {

			let profArray = GetSectionIdValues(idarray, repeatingKnowledges, ["skillknowledgeproficiency"]);
			profArray = profArray.concat(GetSectionIdValues(idarray2, repeatingLanguages, ["languageproficiency"]));
			let maxProfArray = ["knowSkillAncestryBonus", "knowSkillBackgroundBonus", "knowSkillClassBonus", "knowSkillLifeBonus", "knowSkillFeatBonus", "knowSkillMiscBonus"];
			update_proficiency_points("knowSkillPoints", profArray, maxProfArray);
		});
	});
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
		"checkflag", "checkbase", "checkmod", "checkdef", "checkdefdc", "atkaskforroll",
		"atkflag", "atkattr_base", "atkmod", "proficiency_group", "proficiency_customrank",
		"dmgflag", "dmgbase", "dmgattr", "dmgmod", "dmgtype", "dmgelement",
		"dmg2flag", "dmg2base", "dmg2attr", "dmg2mod", "dmg2type", "dmg2element",
		"atkspellpower", "hldmg",
		"atkCritSuccess", "atkSuccess", "atkFailure", "atkCritFailure",
		"atkOnCritSuccess", "atkOnSuccess", "atkOnFailure", "atkOnCritFailure",
		"spellmana", "vitality", "ammo", "resource", "consumable", "autoDefense", "atk_desc"
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
				actionData.vitality = v[GetSectionIdName(repeatingSection, id, "vitality")];
				actionData.ammo = v[GetSectionIdName(repeatingSection, id, "ammo")];
				actionData.resource = v[GetSectionIdName(repeatingSection, id, "resource")];
				actionData.consumable = v[GetSectionIdName(repeatingSection, id, "consumable")];
				actionData.autoDefense = v[GetSectionIdName(repeatingSection, id, "autoDefense")];

				// add checks
				if (v[GetSectionIdName(repeatingSection, id, "checkflag")] == "1") {
					console.log ("Check ask: " + v[GetSectionIdName(repeatingSection, id, "atkaskforroll")]);
					actionData.checkAsk = v[GetSectionIdName(repeatingSection, id, "atkaskforroll")] == "1" ? true : false;

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
				update[GetSectionIdName(repeatingSection, id, "atkid")] = id;
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
		let spell_attribs = ["spell_slots_max"];
		spell_attribs = spell_attribs.concat(GetSectionIdValues(idarray, repeatingSection, ["isSelected", "spellslotcost"]));

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

			let spell_slots_max = isNaN(parseInt(v["spell_slots_max"])) ? 0 : parseInt(v["spell_slots_max"]);
			update["spellSlotsError"] = slots > spell_slots_max ? "1" : "0";

			setAttrs(update, {
				silent: true
			}, function () {
				if (spellId != undefined) {
					update_spell_info(spellId);
				}
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
		var prof_attribs = ["pb", "character_name", "spell_power", "spell_effect", "spell_profrank-effect", "spell_prof-effect"];
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

							let profBonus = 0;
							switch(v[GetSectionIdName(repeatingSection, id, "spellbranch")]) {
								case "foundational":
								case "ethereal":
								case "woodfundamental":
								case "firefundamental":
								case "earthfundamental":
								case "metalfundamental":
								case "waterfundamental":
									profBonus = parseInt(p["spell_effect"]);
								default:
									profBonus = parseInt(p["branch_prof-" + v[GetSectionIdName(repeatingSection, id, "spellbranch")]]);
								break;
							}

							if (!isNaN(profBonus) && profBonus != 0) {
								profBonus = GetProfRankBonus(profBonus, true, 0);
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
				update[GetSectionIdName(repeatingSection, id, "spellid")] = id;
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

	let repeatingBarriers = "repeating_spirits";

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

	let mod_attrs = ["pb", "spellcasting_ability", "gearEquippedArmorType", "gearEquippedArmorAc", "gearEquippedShieldRaised", "gearEquippedShieldAc",
		"armor_prof-unarmored", "armor_prof-light", "armor_prof-medium", "armor_prof-heavy",
		"strength_mod", "dexterity_mod", "constitution_mod", "intelligence_mod", "wisdom_mod", "charisma_mod",
		"globalacmod", "armorMaxMediumDex", "armorBACActiveState", "armorBACWithArmor", "maintainsSpirits",
		"armorAddProficiency-unarmored", "armorAddProficiency-light", "armorAddProficiency-medium", "armorAddProficiency-heavy"
	];

	let repeatingSection = "repeating_acmodifiers";
	let repeatingSpirits = "repeating_spirits";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray, repeatingSection, ["acmod", "acattr", "actsWithBarrier", "isSelected"]));

		getSectionIDs(repeatingSpirits, function (idarray2) {
			mod_attrs = mod_attrs.concat(GetSectionIdValues(idarray2, repeatingSpirits, ["barrierAc", "isSelected"]));

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
				if (v["maintainsSpirits"] == "1") {
					_.each(idarray2, function (currentID) {
						if (v[GetSectionIdName(repeatingSpirits, currentID, "isSelected")] == "1") {
							barrierAc = isNaN(parseInt(v[GetSectionIdName(repeatingSpirits, currentID, "barrierAc")])) ? 0 : parseInt(v[GetSectionIdName(repeatingSpirits, currentID, "barrierAc")]);
						}
					});
				}
				else if (v["armorBACActiveState"] == "1" || (acType <= parseInt(v["armorBACWithArmor"]) && v["armorBACActiveState"] == "0")) {
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
				if (v[GetSectionIdName(repeatingSection, currentID, "isSelected")] == "1") {

					if (v[GetSectionIdName(repeatingSection, currentID, "weakness")] != "") {
						weaknesses += (weaknesses != "" ? ", " : "") + v[GetSectionIdName(repeatingSection, currentID, "weakness")];
					}
					if (v[GetSectionIdName(repeatingSection, currentID, "resistance")] != "") {
						resistances += (resistances != "" ? ", " : "") + v[GetSectionIdName(repeatingSection, currentID, "resistance")];
					}
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

var update_defense_list = function () {
	console.log("UPDATING DEFENSES LIST");

	var mod_attrs = [];
	var repeatingSection = "repeating_acmodifiers";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["name"]);

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let data = "";

			_.each(idarray, function (currentID) {
				data += (data != "" ? "@@" : "") + `${v[GetSectionIdName(repeatingSection, currentID, "name")]}$$${currentID}`;
			});

			update["defensesListData"] = data;

			setAttrs(update, {
				silent: true
			});

		});
	});
}

var update_auto_defenses = function () {
	console.log("UPDATING AUTO DEFENSES");

	var mod_attrs = [];
	var repeatingSection = "repeating_acmodifiers";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["autoOffTurn", "autoOffBrief"]);

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let turn = "";
			let brief = "";

			_.each(idarray, function (currentID) {
				if (v[GetSectionIdName(repeatingSection, currentID, "autoOffTurn")] == "1") {
					turn += (turn != "" ? "@@" : "") + currentID;
				}
				if (v[GetSectionIdName(repeatingSection, currentID, "autoOffBrief")] == "1") {
					brief += (brief != "" ? "@@" : "") + currentID;
				}
			});

			update["defAutoOffAtStartOfTurn"] = turn;
			update["defAutoOffOnBriefRest"] = brief;

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
		update[repeatingDataSet + "_" + injuryid + "_injury"] = injuryPreset.name;
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

var update_selected_spirit = function (selectedId) {
	console.log("UPDATING BARRIER to " + selectedId);

	var health_attrs = ["barrier", "classBarrierIsSelected", "classBarrier"];
	var repeatingBarriers = "repeating_spirits";

	getSectionIDs(repeatingBarriers, function (idarray) {
		health_attrs = health_attrs.concat(GetSectionIdValues(idarray, repeatingBarriers,
			["barrier", "isSelected", "barrierElement"]));

		getAttrs(health_attrs, function (v) {
			var update = {};

			if (selectedId == "current") {
				update["classBarrierIsSelected"] = "1";
				update["active_barrier"] = "current";
				update["prime_element"] = "0";
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
					update["prime_element"] = v[GetSectionIdName(repeatingBarriers, currentID, "barrierElement")];
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
			case "History":
				postText = "&{template:historyBox}";
				postText += " {{message=" + v[repeatingSectionId + "_location"] + "\n\n}}";
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

var update_chapter_quests = function(repeatingSectionId, quests) {
	console.log("UPDATING CHAPTER QUESTS");

	var mod_attrs = [];
	var repeatingChapters = "repeating_chapterselect";
	var repeatingQuests = "repeating_mainchaptermissions";

	getSectionIDs(repeatingQuests, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingQuests, ["title"]);

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let data = "";
			let questData = quests.split(",");
			for (let i = 0; i < questData.length; i++) {
				questData[i] = questData[i].trim();
			}

			_.each(idarray, function (currentID) {
				if (questData.includes(v[GetSectionIdName(repeatingQuests, currentID, "title")])) {
					data += (data != "" ? "##" : "") + currentID;
				}
			});

			update[GetSectionIdName(repeatingChapters, repeatingSectionId, "StartSessionQuestIds")] = data;

			setAttrs(update, {
				silent: true
			});
		});
	});

}

var update_missionType = function (updateId) {
	getAttrs(["repeating_mainchaptermissions_" + updateId + "_defaultTypes", "repeating_mainchaptermissions_" + updateId + "_actors", "current_party_members"], function (v) {
		var update = {};
		if (v["repeating_mainchaptermissions_" + updateId + "_defaultTypes"] !== "-") {
			var defaultType = v["repeating_mainchaptermissions_" + updateId + "_defaultTypes"].split("-");
			update["repeating_mainchaptermissions_" + updateId + "_type"] = defaultType[0];
			update["repeating_mainchaptermissions_" + updateId + "_style"] = defaultType[1];
			if (v["repeating_mainchaptermissions_" + updateId + "_actors"] == "") {
				update["repeating_mainchaptermissions_" + updateId + "_actors"] = v["current_party_members"];
			}
			update["repeating_mainchaptermissions_" + updateId + "_missionid"] = updateId;
			update["repeating_mainchaptermissions_" + updateId + "_exp"] = 10;
			update["repeating_mainchaptermissions_" + updateId + "_questCurrency"] = "00";
			update["repeating_mainchaptermissions_" + updateId + "_questCurrencyType"] = "jin";
		}
		setAttrs(update);
	});
}

var update_battle_jukebox_list = function() {
	console.log("UPDATING BATTLE SONGS");

	var mod_attrs = [];
	var repeatingSection = "repeating_battlesongs";

	getSectionIDs(repeatingSection, function (idarray) {
		mod_attrs = GetSectionIdValues(idarray, repeatingSection, ["song", "songdesc"]);

		getAttrs(mod_attrs, function (v) {
			let update = {};
			let data = "";

			_.each(idarray, function (currentID) {
				data += (data != "" ? "@@" : "") + `${v[GetSectionIdName(repeatingSection, currentID, "song")]}${v[GetSectionIdName(repeatingSection, currentID, "songdesc")]}`;
			});

			update["battlesongList"] = data;

			setAttrs(update, {
				silent: true
			});

		});
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


// Sheet Upgrades
var upgrade_to_1_1_9 = function (doneupdating) {
	let update = {};
	update["deathSaveSuccess"] = "0";
	update["deathSaveFailure"] = "0";
	update["fate"] = "0";
	update["resolve"] = "0";
	update["morale"] = "0";
	update["karma"] = "0";
	update["activeinjury_list"] = "";
	setAttrs(update);
	doneupdating();
}
var upgrade_to_1_1_8 = function (doneupdating) {
	getAttrs(["difficultyStyle"], function (v) {
		let update = {};
		update["difficultyStyle"] = isNaN(parseInt(v["difficultyStyle"])) ? 0 : parseInt(v["difficultyStyle"]);
		update["gearEquippedShieldRaised"] = "0";
		setAttrs(update);
		doneupdating();
	});
}
var upgrade_to_1_1_6 = function (doneupdating) {
	update_all_saves();
	doneupdating();
}
var upgrade_to_1_1_5 = function (doneupdating) {
	update_all_known_spells();
	doneupdating();
}

var upgrade_to_1_1_4 = function (doneupdating) {
	
	// the language update
	let repeatingLanguages = "repeating_skilllanguages";

	getSectionIDs(repeatingLanguages, function (idarray) {

		if (Array.isArray(idarray)) {
			let update = {};
			let skill_attrs = [];

			if (idarray.length == 0) {

				let repeatingOldLanguages = "repeating_languages";
				getSectionIDs(repeatingOldLanguages, function (idarray2) {

					if (Array.isArray(idarray2) && idarray2.length > 0) {
						skill_attrs = GetSectionIdValues(idarray2, repeatingOldLanguages, ["language", "isSelected"]);

						getAttrs(skill_attrs, function (v) {
							
							let newrowid = "";
							_.each(idarray2, function (id) {

								if (v[GetSectionIdName(repeatingOldLanguages, id, "language")] != "") {
									newrowid = generateRowID();
									update[GetSectionIdName(repeatingLanguages, newrowid, "options-flag")] = "0";
									update[GetSectionIdName(repeatingLanguages, newrowid, "isSelected")] = v[GetSectionIdName(repeatingOldLanguages, id, "isSelected")];
									update[GetSectionIdName(repeatingLanguages, newrowid, "language")] = v[GetSectionIdName(repeatingOldLanguages, id, "language")];
									update[GetSectionIdName(repeatingLanguages, newrowid, "languageproficiency")] = "3";
									removeRepeatingRow(`${repeatingOldLanguages}_${id}`);
								}
							});

							setAttrs(update);
						});
					}
				});
			}
			else {
				update[GetSectionIdName(repeatingLanguages, idarray[0], "isSelected")] = "1";

				setAttrs(update, {
					silent: true
				}, function () {
					update_selected_language(GetSectionIdName(repeatingLanguages, idarray[0], "language"));
				});
				
			}
		}
		doneupdating();
	});
};

var upgrade_to_1_1_3 = function (doneupdating) {

	let skill_attrs = ["background", "class"];
	getAttrs(skill_attrs, function (v) {
		let update = {};

		let backgroundInfo = GetBackgroundInfo(v["background"]);
		if (backgroundInfo.name != "") {
			update["knowSkillBackgroundBonus"] = backgroundInfo.knowledgePoints;
		}
		setAttrs(update);

		update_class_restrictions(v["class"]);
		update_classLevels_complex_all();
		doneupdating();

	});
	doneupdating();
};

var upgrade_to_1_1_2 = function (doneupdating) {
	update_defense_list();
	doneupdating();
};

var upgrade_to_1_1_1 = function (doneupdating) {
	update_pb();
	finish_update_pb();
	update_centered_spells();
	doneupdating();
};

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
			update["knowSkillBackgroundBonus"] = backgroundInfo.knowledgePoints;
		}
		setAttrs(update);

		update_class_restrictions(v["class"]);
		update_classLevels_complex_all();
		update_branch_proficiency_points();
		update_health_barrier();
		update_caster_points();
		update_all_known_spells();
		update_centered_spells();
		update_defense_list();

		doneupdating();

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

		if (v["version"] === "1.1.9") {
			console.log("Wuxing Sheet modified from 5th Edition OGL by Roll20 v" + v["version"]);
		} else if (v["version"] === "1.1.8") {
			console.log("UPGRADING TO v1.1.9");
			upgrade_to_1_1_9(function () {
				setAttrs({version: "1.1.9"});
				versioning();
			});
		} else if (v["version"] === "1.1.6" || v["version"] === "1.1.7") {
			console.log("UPGRADING TO v1.1.8");
			upgrade_to_1_1_8(function () {
				setAttrs({version: "1.1.8"});
				versioning();
			});
		} else if (v["version"] === "1.1.5") {
			console.log("UPGRADING TO v1.1.6");
			upgrade_to_1_1_6(function () {
				setAttrs({version: "1.1.6"});
				versioning();
			});
		} else if (v["version"] === "1.1.4") {
			console.log("UPGRADING TO v1.1.5");
			upgrade_to_1_1_5(function () {
				setAttrs({version: "1.1.5"});
				versioning();
			});
		} else if (v["version"] === "1.1.3") {
			console.log("UPGRADING TO v1.1.4");
			upgrade_to_1_1_4(function () {
				setAttrs({version: "1.1.4"});
				versioning();
			});
		} else if (v["version"] === "1.1.2") {
			console.log("UPGRADING TO v1.1.3");
			upgrade_to_1_1_3(function () {
				setAttrs({version: "1.1.3"});
				versioning();
			});
		} else if (v["version"] === "1.1.1") {
			console.log("UPGRADING TO v1.1.2");
			upgrade_to_1_1_2(function () {
				setAttrs({version: "1.1.2"});
				versioning();
			});
		} else if (v["version"] === "1.1.0") {
			console.log("UPGRADING TO v1.1.1");
			upgrade_to_1_1_1(function () {
				setAttrs({version: "1.1.1"});
				versioning();
			});
		} else if (v["version"] === "1.0.1" || v["version"] === "1.0.2") {
			console.log("UPGRADING TO v1.1.3");
			upgrade_to_1_1_0(function () {
				 // the 1.1.1, 1.1.2, and 1.1.3 fixes are included in this update, so we skip them
				setAttrs({version: "1.1.3"});
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

var on_sheet_opened = function() {

	versioning();
};