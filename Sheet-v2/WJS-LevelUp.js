// ========== Level Up

function SetLevelUpData (update, startingStatistics, endingStatistics, classUpdates, mainUpdate) {

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
	update[`levelUp-header-main`] = mainUpdate.header;
	update[`levelUp-desc-main`] = mainUpdate.desc;

	// update the growths
	update["levelUp-growth-CON"] = (startingStatistics.stats.CON == endingStatistics.stats.CON 
		? startingStatistics.stats.CON 
		: `${startingStatistics.stats.CON} => ${endingStatistics.stats.CON}`
	);
	update["levelUp-growth-DEX"] = (startingStatistics.stats.DEX == endingStatistics.stats.DEX 
		? startingStatistics.stats.DEX 
		: `${startingStatistics.stats.DEX} => ${endingStatistics.stats.DEX}`
	);
	update["levelUp-growth-QCK"] = (startingStatistics.stats.QCK == endingStatistics.stats.QCK 
		? startingStatistics.stats.QCK 
		: `${startingStatistics.stats.QCK} => ${endingStatistics.stats.QCK}`
	);
	update["levelUp-growth-STR"] = (startingStatistics.stats.STR == endingStatistics.stats.STR 
		? startingStatistics.stats.STR 
		: `${startingStatistics.stats.STR} => ${endingStatistics.stats.STR}`
	);
	update["levelUp-growth-CHA"] = (startingStatistics.stats.CHA == endingStatistics.stats.CHA 
		? startingStatistics.stats.CHA 
		: `${startingStatistics.stats.CHA} => ${endingStatistics.stats.CHA}`
	);
	update["levelUp-growth-INT"] = (startingStatistics.stats.INT == endingStatistics.stats.INT 
		? startingStatistics.stats.INT 
		: `${startingStatistics.stats.INT} => ${endingStatistics.stats.INT}`
	);
	update["levelUp-growth-PER"] = (startingStatistics.stats.PER == endingStatistics.stats.PER 
		? startingStatistics.stats.PER 
		: `${startingStatistics.stats.PER} => ${endingStatistics.stats.PER}`
	);
	update["levelUp-growth-WIL"] = (startingStatistics.stats.WIL == endingStatistics.stats.WIL 
		? startingStatistics.stats.WIL 
		: `${startingStatistics.stats.WIL} => ${endingStatistics.stats.WIL}`
	);
	update["levelUp-growth-HP"] = (startingStatistics.stats.hp == endingStatistics.stats.hp 
		? startingStatistics.stats.hp 
		: `${startingStatistics.stats.hp} => ${endingStatistics.stats.hp}`
	);
	update["levelUp-growth-Vitality"] = (startingStatistics.stats.vitality == endingStatistics.stats.vitality 
		? startingStatistics.stats.vitality 
		: `${startingStatistics.stats.vitality} => ${endingStatistics.stats.vitality}`
	);
	update["levelUp-growth-KiCharge"] = (startingStatistics.stats.kiCharge == endingStatistics.stats.kiCharge 
		? startingStatistics.stats.kiCharge 
		: `${startingStatistics.stats.kiCharge} => ${endingStatistics.stats.kiCharge}`
	);
	update["levelUp-growth-Spellforce"] = (startingStatistics.stats.spellForce == endingStatistics.stats.spellForce 
		? startingStatistics.stats.spellForce 
		: `${startingStatistics.stats.spellForce} => ${endingStatistics.stats.spellForce}`
	);

	return update;
}