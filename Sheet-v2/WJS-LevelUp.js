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
	update["levelUp-growth-CON"] = (startingStatistics.CON == endingStatistics.CON 
		? startingStatistics.CON 
		: `${startingStatistics.CON} => ${endingStatistics.CON}`
	);
	update["levelUp-growth-DEX"] = (startingStatistics.DEX == endingStatistics.DEX 
		? startingStatistics.DEX 
		: `${startingStatistics.DEX} => ${endingStatistics.DEX}`
	);
	update["levelUp-growth-QCK"] = (startingStatistics.QCK == endingStatistics.QCK 
		? startingStatistics.QCK 
		: `${startingStatistics.QCK} => ${endingStatistics.QCK}`
	);
	update["levelUp-growth-STR"] = (startingStatistics.STR == endingStatistics.STR 
		? startingStatistics.STR 
		: `${startingStatistics.STR} => ${endingStatistics.STR}`
	);
	update["levelUp-growth-CHA"] = (startingStatistics.CHA == endingStatistics.CHA 
		? startingStatistics.CHA 
		: `${startingStatistics.CHA} => ${endingStatistics.CHA}`
	);
	update["levelUp-growth-INT"] = (startingStatistics.INT == endingStatistics.INT 
		? startingStatistics.INT 
		: `${startingStatistics.INT} => ${endingStatistics.INT}`
	);
	update["levelUp-growth-PER"] = (startingStatistics.PER == endingStatistics.PER 
		? startingStatistics.PER 
		: `${startingStatistics.PER} => ${endingStatistics.PER}`
	);
	update["levelUp-growth-WIL"] = (startingStatistics.WIL == endingStatistics.WIL 
		? startingStatistics.WIL 
		: `${startingStatistics.WIL} => ${endingStatistics.WIL}`
	);
	update["levelUp-growth-HP"] = (startingStatistics.hp == endingStatistics.hp 
		? startingStatistics.hp 
		: `${startingStatistics.hp} => ${endingStatistics.hp}`
	);
	update["levelUp-growth-Vitality"] = (startingStatistics.vitality == endingStatistics.vitality 
		? startingStatistics.vitality 
		: `${startingStatistics.vitality} => ${endingStatistics.vitality}`
	);
	update["levelUp-growth-KiCharge"] = (startingStatistics.kiCharge == endingStatistics.kiCharge 
		? startingStatistics.kiCharge 
		: `${startingStatistics.kiCharge} => ${endingStatistics.kiCharge}`
	);
	update["levelUp-growth-Spellforce"] = (startingStatistics.spellForce == endingStatistics.spellForce 
		? startingStatistics.spellForce 
		: `${startingStatistics.spellForce} => ${endingStatistics.spellForce}`
	);

	return update;
}