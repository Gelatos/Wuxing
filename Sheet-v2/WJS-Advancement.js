function GetAdvancementLevelData(totalLevel) {

	if (totalLevel == "" || totalLevel == "0" || totalLevel == undefined) {
		return {
			keys: [],
			values: {}
		};
	}
	else {
		return JSON.parse(totalLevel);
	}
}

function SetAdvancementLevelData(levelData, className, currentLevel, increaseValue) {

	if (!levelData.keys.includes(className)) {
		levelData.keys.push(className);
	}
	levelData.values[className] = {current: currentLevel, increase: increaseValue};

	return levelData;
}

function ResetAdvancementLevel(levelData, updateCurrent) {

	let i = 0;
	while (i < levelData.keys.length) {
		if (updateCurrent) {
			levelData.values[levelData.keys[i]].current = ParseIntValue(levelData.values[levelData.keys[i]].current) 
				+ ParseIntValue(levelData.values[levelData.keys[i]].increase);
		}
		levelData.values[levelData.keys[i]].increase = 0;

		if (levelData.values[levelData.keys[i]].current == 0) {
			delete levelData.values[levelData.keys[i]];
			levelData.keys = levelData.keys.splice(i, 1);
		}
		else {
			i++;
		}
	}

	return levelData;
}



// ======== Back Button

on("change:advancement-button-back", function () {

	update_advancement_back();
});

var update_advancement_back = function () {

	let mod_attrs = [`advancement-previousPage`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update["characterSheetDisplayStyle"] = v["advancement-previousPage"];
		update["advancement-previousPage"] = "";
		update["advancement-button-reset-everything"] = "on";

		setAttrs(update, { silent: true });
	});

}




// ======== Submission

on("change:advancement-button-submit", function () {

	update_advancement_submit();
});

var update_advancement_submit = function () {

	let mod_attrs = ["base_level", "builder-ancestry", "builder-baseAbilityScores", "advancement-level-total", "builder-baseGrowths", "builder-baseGrowthsTotal", "advancement-advancementGrowthsTotal"];
	getAttrs(mod_attrs, function (v) {

		let update = {};

		let baseLevel = AttrParseInt(v, "base_level");
		let totalLevel = baseLevel;
		let classLevelTotal = 0;
		let levelData = GetAdvancementLevelData(v["advancement-level-total"]);

		let baseAbilityScores = AttrParseJSON(v, "builder-baseAbilityScores");
		if (baseAbilityScores == "") {
			baseAbilityScores = CreateAbilityScoreArrayData();
		}
		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		let baseGrowths = AttrParseJSON(v, "builder-baseGrowths");
		if (baseGrowths == "") {
			baseGrowths = CreateGrowthsArrayData();
		}
		let baseGrowthsTotal = AttrParseJSON(v, "builder-baseGrowthsTotal");
		if (baseGrowthsTotal == "") {
			baseGrowthsTotal = CreateGrowthsArrayData();
		}
		let advancementGrowthsTotal = AttrParseJSON(v, "advancement-advancementGrowthsTotal");
		if (advancementGrowthsTotal == "") {
			advancementGrowthsTotal = CreateGrowthsArrayData();
		}

		let startingStatistics = GetCharacterStatGrowths(ancestryData, baseAbilityScores, baseGrowthsTotal, advancementGrowthsTotal);

		var classUpdates = [];
		let classUpdate;
		let pathUpdate = "";

		let classData;
		let classFieldName = "";
		let classLevel;
		let techLevel;
		let techModLevel;
		let advancement = {
			keys: [],
			values: {}
		};
		let tech = {};
		let levelCheck = 0;

		// iterate through the classes and record any advancement changes. Also reset UI from the advancement page
		for (let i = 0; i < levelData.keys.length; i++) {

			classLevel = levelData.values[levelData.keys[i]];
			if (classLevel.increase > 0) {

				// get class and level data
				classData = GetClassesInfo(levelData.keys[i]);
				totalLevel += classLevel.increase;
				advancementGrowthsTotal = AddGrowths(advancementGrowthsTotal, MultiplyGrowths(classData.growths, classLevel.increase));
				classLevelTotal = classLevel.current + classLevel.increase;

				// update the level up update
				classUpdate = {
					header: `${classData.name} Level Up!`,
					desc: `${classData.name} ${classLevel.current} -> ${classLevelTotal}`
				};

				// iterate through the advancement gains
				techLevel = classLevel.current + 1;
				if (techLevel == 1) {
					tech = { name: classData.jobTechnique, type: "T" };
					advancement = AddAdvancementTech(advancement, tech);
					classUpdate.desc += `\n[Level ${techLevel}]`;
					classUpdate.desc += `\nGained the ${tech.name} technique.`;
				}
				while (techLevel <= 20 && techLevel <= classLevelTotal) {

					// only check advancement on even class levels
					if (techLevel % 2 == 0) {
						techModLevel = Math.floor(techLevel / 2) - 1;
						if (techModLevel >= 0) {
							tech = classData.advancement[techModLevel];

							if (tech != undefined) {

								advancement = AddAdvancementTech(advancement, tech);
								classUpdate.desc += `\n[Level ${techLevel}]`;
								classUpdate.desc += `\n${tech.type == "T" ? `Gained the ${tech.name} technique.` : tech.name}`;
							}
						}
					}
					techLevel++;
				}

				// add the updates
				classUpdates.push(classUpdate);

				// update UI
				classFieldName = ToCamelCase(levelData.keys[i]);
				update[`advancement-level-${classFieldName}`] = classLevelTotal;
				update[`advancement-level-${classFieldName}_max`] = classLevelTotal;
				update[`advancement-name-${classFieldName}`] = `${classData.name} Lv.${classLevelTotal}`;
			}
		}

		// iterate through the levels for new path growths
		let mainUpdate = {
			header: `Character Level Increased!`,
			desc: `Character Level ${baseLevel} -> ${totalLevel}`
		};
		for (let i = baseLevel; i < totalLevel; i++) {
			levelCheck = i + 1;
			pathUpdate = "";

			// set level bonuses
			switch (levelCheck) {
				case 1:
					tech = { name: "Gain a Path Technique.", type: "PS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					tech = { name: "Gain 2 Spell Techniques.", type: "SPS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					advancement = AddAdvancementTech(advancement, tech);
					break;

				case 6:
				case 31:
					tech = { name: "Gain an Active Tech Slot.", type: "ATS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					break;

				case 21:
					tech = { name: "Gain an Active Tech Slot.", type: "ATS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					tech = { name: "Gain a Job Tech Slot", type: "JTS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					break;

				case 11:
				case 26:
				case 36:
					tech = { name: "Gain a Passive and Support Tech Slot.", type: "PTS" };
					pathUpdate += `\n${tech.name}`;
					advancement = AddAdvancementTech(advancement, tech);
					break;
			}

			if ((levelCheck % 5) - 2 == 0) {
				tech = { name: "Gain a Skill Technique.", type: "AS" };
				pathUpdate += `\n${tech.name}`;
				advancement = AddAdvancementTech(advancement, tech);
			}
			else if ((levelCheck % 5) - 3 == 0) {
				tech = { name: "Gain a Training Path Technique.", type: "TPS" };
				pathUpdate += `\n${tech.name}`;
				advancement = AddAdvancementTech(advancement, tech);
			}
			else if ((levelCheck % 5) - 4 == 0) {
				tech = { name: "Gain a Path Technique.", type: "APS" };
				pathUpdate += `\n${tech.name}`;
				advancement = AddAdvancementTech(advancement, tech);
			}
			else if ((levelCheck % 5) == 0) {
				tech = { name: "Gain a Spell Technique.", type: "SPS" };
				pathUpdate += `\n${tech.name}`;
				advancement = AddAdvancementTech(advancement, tech);
			}

			if (pathUpdate != "") {
				pathUpdate = `\n[Level ${levelCheck}]${pathUpdate}`;
				mainUpdate.desc += pathUpdate;
			}

		}

		// calculate final growths
		baseGrowthsTotal = AddGrowths(baseGrowthsTotal, MultiplyGrowths(baseGrowths, totalLevel - baseLevel));
		update["builder-baseGrowthsTotal"] = JSON.stringify(baseGrowthsTotal);
		update["advancement-advancementGrowthsTotal"] = JSON.stringify(advancementGrowthsTotal);
		let endingStatistics = GetCharacterStatGrowths(ancestryData, baseAbilityScores, baseGrowthsTotal, advancementGrowthsTotal);
		update = SetCharacterStatGrowths(update, endingStatistics);
		update = SetLevelUpData(update, startingStatistics, endingStatistics, classUpdates, mainUpdate);

		// set updates
		update["base_level"] = totalLevel;
		update["advancement-level-total"] = JSON.stringify(ResetAdvancementLevel(levelData, true));
		update["characterSheetDisplayStyle"] = "LevelUp";
		update["advancement-button-reset-everything"] = "on";

		setAttrs(update, { silent: true });

	});

}

function AddAdvancementTech(advancement, tech) {

	if (!advancement.keys.includes(tech.type)) {
		advancement.keys.push(tech.type);
		advancement.values[tech.type] = (tech.type == "T") ? "" : 0;
	}

	switch (tech.type) {
		case 'T':
			if (advancement.values[tech.type] != "") {
				advancement.values[tech.type] += ";";
			}
			advancement.values[tech.type] += tech.name;
			break;
		default:
			advancement.values[tech.type]++;
			break;
	}

	return advancement;
}




// ======== Reset

on("change:advancement-button-reset", function () {

	update_advancement_reset();
});

var update_advancement_reset = function () {

	let mod_attrs = ["advancement-level-total"];
	getAttrs(mod_attrs, function (v) {

		let update = {};
		let levelData = GetAdvancementLevelData(v["advancement-level-total"]);

		let classData;
		let classLevel;
		let classFieldName;

		// iterate through the classes and record any advancement changes. Also reset UI from the advancement page
		for (let i = 0; i < levelData.keys.length; i++) {

			classLevel = levelData.values[levelData.keys[i]];
			if (classLevel.increase > 0) {

				// update UI
				classData = GetClassesInfo(levelData.keys[i]);
				classFieldName = ToCamelCase(levelData.keys[i]);
				update[`advancement-level-${classFieldName}_max`] = classLevel.current;
				update[`advancement-name-${classFieldName}`] = `${classData.name} Lv.${classLevel.current}`
			}
		}

		// set updates
		update["advancement-level-total"] = JSON.stringify(ResetAdvancementLevel(levelData, false));
		update["advancement-button-reset-everything"] = "on";

		setAttrs(update, { silent: true });

	});

}




// ======== Restart

on("change:advancement-button-restart-confirm", function () {

	update_advancement_restart();
});

var update_advancement_restart = function () {
	console.log(`Restarting Character Build `);

	let mod_attrs = ["advancement-level-total", "builder-baseAbilityScores", "builder-ancestry"];
	getAttrs(mod_attrs, function (v) {
		let update = {};

		let baseAbilityScores = AttrParseJSON(v, "builder-baseAbilityScores");
		if (baseAbilityScores == "") {
			baseAbilityScores = CreateAbilityScoreArrayData();
		}
		let emptyGrowths = CreateGrowthsArrayData();
		let ancestryName = AttrParseString(v, "builder-ancestry", "Human");
		let ancestryData = GetAncestryInfo(ancestryName);

		let levelData = GetAdvancementLevelData(v["advancement-level-total"]);
		let levelObj;
		let classData;
		let classFieldName;

		// iterate through the classes and reset any levels
		for (let i = 0; i < levelData.keys.length; i++) {

			levelObj = levelData.values[levelData.keys[i]];
			if (levelObj != undefined && levelObj.current > 0) {

				// update UI
				classData = GetClassesInfo(levelData.keys[i]);
				classFieldName = ToCamelCase(levelData.keys[i]);
				update[`advancement-level-${classFieldName}`] = "0";
				update[`advancement-level-${classFieldName}_max`] = "0";
				update[`advancement-name-${classFieldName}`] = `${classData.name} Lv.0`
			}
		}

		// set updates
		update["advancement-level-total"] = "0";
		update["advancement-button-reset-everything"] = "on";
		update["base_level"] = 0;
		update["builder-baseGrowthsTotal"] = JSON.stringify(emptyGrowths);
		update["advancement-advancementGrowthsTotal"] = JSON.stringify(emptyGrowths);
		let endingStatistics = GetCharacterStatGrowths(ancestryData, baseAbilityScores, emptyGrowths, emptyGrowths);
		update = SetCharacterStatGrowths(update, endingStatistics);

		setAttrs(update, { silent: true });

	});

}



// Advancement Listeners
// ======== Advancement Listeners
on("change:advancement-level-fighter_max change:advancement-level-interceptor_max change:advancement-level-marksman_max change:advancement-level-rogue_max change:advancement-level-physician_max change:advancement-level-pugilist_max change:advancement-level-scholar_max ", function (eventinfo) {

	var className = eventinfo.sourceAttribute.match(/[^-]*$/)[0];
	if (className.indexOf("_max") >= 0) {
		className = className.substring(0, className.indexOf("_max"));
	}
	update_advancement_class_level(className);
});


var update_advancement_class_level = function (classFieldName) {
	let mod_attrs = ["advancement-level-total", `advancement-level-${classFieldName}`, `advancement-level-${classFieldName}_max`];

	getAttrs(mod_attrs, function (v) {
		let update = {};
		let currentLevel = isNaN(parseInt(v[`advancement-level-${classFieldName}`])) ? 0 : parseInt(v[`advancement-level-${classFieldName}`]);
		let newLevel = isNaN(parseInt(v[`advancement-level-${classFieldName}_max`])) ? currentLevel : parseInt(v[`advancement-level-${classFieldName}_max`]);

		if (currentLevel > newLevel) {
			update[`advancement-level-${classFieldName}_max`] = currentLevel;
		}
		let levelDifference = newLevel - currentLevel;

		var levelData = GetAdvancementLevelData(v["advancement-level-total"]);
		levelData = SetAdvancementLevelData(levelData, classFieldName, currentLevel, levelDifference);

		let classData = GetClassesInfo(classFieldName);
		update[`advancement-name-${classFieldName}`] = `${classData.name} Lv.${currentLevel} ${levelDifference > 0 ? `+${levelDifference}` : ""}`;
		update["advancement-level-total"] = JSON.stringify(levelData);

		setAttrs(update, { silent: true });
	});
}

