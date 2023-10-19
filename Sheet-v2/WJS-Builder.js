// Sheet Lisenters
on("change:builder-path", function (eventinfo) {

	update_builder_path_info(eventinfo.newValue);
});

on("change:builder-ancestry", function (eventinfo) {

	update_builder_ancestry_info(eventinfo.newValue);
});

// Sheet Functions
var update_builder_path_info = function(newValue) {

	let update = {};
	let pathData = GetPathInfo(newValue);
	update["builder-pathDesc"] = pathData.description;
	setAttrs(update, {silent: true});
}

// Sheet Functions
var update_builder_ancestry_info = function(newValue) {

	// get database info
	let ancestryData = GetAncestryInfo(newValue);
	let ancestryTechniques = GetTechniqueDataArray("Ancestry", ancestryData.techniques);

	// create update data
	let update = {};
	update["builder-ancestryDesc"] = ancestryData.description;
	update["builder-starting-HP"] = ancestryData.hp;
	update["builder-starting-Barrier"] = ancestryData.barrier;
	update["builder-starting-Speed"] = ancestryData.speed;
	update = SetAbilityScoreUpdate(update, "builder-starting-", ancestryData.startingScores);
	update = SetAbilityScoreUpdate(update, "builder-growth-", ancestryData.growths);
	update["builder-growth-HP"] = ancestryData.growths.hp;
	update["builder-growth-Vitality"] = ancestryData.growths.vitality;
	update["builder-growth-KiCharge"] = ancestryData.growths.kiCharge;
	update["builder-growth-Spellforce"] = ancestryData.growths.spellForce;

	// create the techniques
	update = SetTechniqueDataList(update, "repeating_ancestrytechniques", ancestryTechniques);
	
	setAttrs(update, {silent: true});
}

