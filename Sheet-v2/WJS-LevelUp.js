// ========== Level Up

function SetLevelUpData (update, startingStatistics, endingStatistics, classUpdates, mainUpdate) {

	console.log(`classUpdates: ${JSON.stringify(startingStatistics)}`);
	// setup the class update
	let i = 0;
	let max = 3;
	while (i < max) {
		if (i < classUpdates.length) {

			if (i == 2 && classUpdates.length > 3) {
				// we only have three visible class slot updates. Combine the rest of the update into one big update.
				let levelDescription = "";
				let j = i;
				while (j < classUpdates.length) {
					if (levelDescription != "") {
						levelDescription += "\n\n";
					}
					levelDescription += `${classUpdates[j].header}\n${classUpdates[j].desc}`;
					j++;
				}
				update[`levelUp-header-${i}`] = "Other Class Updates";
				update[`levelUp-desc-${i}`] = levelDescription;
			}
			else {
				update[`levelUp-header-${i}`] = classUpdates[i].header;
				update[`levelUp-desc-${i}`] = classUpdates[i].desc;
			}
		}
		else {
			// this hides the update
			update[`levelUp-header-${i}`] = "0";
		}
		i++;
	}

	// update the growths
	update["levelUp-growth-CON"] = (startingStatistics.scores["CON"] == endingStatistics.scores["CON"]
		? startingStatistics.scores["CON"]
		: `${startingStatistics.scores["CON"]} => ${endingStatistics.scores["CON"]}`
	);
	update["levelUp-growth-DEX"] = (startingStatistics.scores["DEX"] == endingStatistics.scores["DEX"]
		? startingStatistics.scores["DEX"]
		: `${startingStatistics.scores["DEX"]} => ${endingStatistics.scores["DEX"]}`
	);
	update["levelUp-growth-QCK"] = (startingStatistics.scores["QCK"] == endingStatistics.scores["QCK"]
		? startingStatistics.scores["QCK"]
		: `${startingStatistics.scores["QCK"]} => ${endingStatistics.scores["QCK"]}`
	);
	update["levelUp-growth-STR"] = (startingStatistics.scores["STR"] == endingStatistics.scores["STR"]
		? startingStatistics.scores["STR"]
		: `${startingStatistics.scores["STR"]} => ${endingStatistics.scores["STR"]}`
	);
	update["levelUp-growth-CHA"] = (startingStatistics.scores["CHA"] == endingStatistics.scores["CHA"]
		? startingStatistics.scores["CHA"]
		: `${startingStatistics.scores["CHA"]} => ${endingStatistics.scores["CHA"]}`
	);
	update["levelUp-growth-INT"] = (startingStatistics.scores["INT"] == endingStatistics.scores["INT"]
		? startingStatistics.scores["INT"]
		: `${startingStatistics.scores["INT"]} => ${endingStatistics.scores["INT"]}`
	);
	update["levelUp-growth-PER"] = (startingStatistics.scores["PER"] == endingStatistics.scores["PER"]
		? startingStatistics.scores["PER"]
		: `${startingStatistics.scores["PER"]} => ${endingStatistics.scores["PER"]}`
	);
	update["levelUp-growth-WIL"] = (startingStatistics.scores["WIL"] == endingStatistics.scores["WIL"]
		? startingStatistics.scores["WIL"]
		: `${startingStatistics.scores["WIL"]} => ${endingStatistics.scores["WIL"]}`
	);
	update["levelUp-growth-HP"] = (startingStatistics.scores["hp"] == endingStatistics.scores["hp"]
		? startingStatistics.scores["hp"]
		: `${startingStatistics.scores["hp"]} => ${endingStatistics.scores["hp"]}`
	);
	update["levelUp-growth-Vitality"] = (startingStatistics.scores["vitality"] == endingStatistics.scores["vitality"]
		? startingStatistics.scores["vitality"]
		: `${startingStatistics.scores["vitality"]} => ${endingStatistics.scores["vitality"]}`
	);
	update["levelUp-growth-KiCharge"] = (startingStatistics.scores["kiCharge"] == endingStatistics.scores["kiCharge"]
		? startingStatistics.scores["kiCharge"]
		: `${startingStatistics.scores["kiCharge"]} => ${endingStatistics.scores["kiCharge"]}`
	);

	if (startingStatistics.scores["spellForce"] == endingStatistics.scores["spellForce"]) {
		update["levelUp-growth-Spellforce"] = startingStatistics.scores["spellForce"];
	}
	else {
		update["levelUp-growth-Spellforce"] = `${startingStatistics.scores["spellForce"]} => ${endingStatistics.scores["spellForce"]}`;

		if (endingStatistics.scores["spellForce"] % 2 == 0) {
			// the player gained a branch
			mainUpdate.desc += "\nGained a new branch";
		}
	}

	update[`levelUp-header-main`] = mainUpdate.header;
	update[`levelUp-desc-main`] = mainUpdate.desc;

	return update;
}