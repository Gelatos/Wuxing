function GetAdvancementLevelData (totalLevel) {
    
    if (totalLevel == "" || totalLevel == undefined) {
        return {
            keys: [],
            values: {}
        };
    }
    else {
        return JSON.parse(totalLevel);
    }
}

function SetAdvancementLevelData (levelData, className, currentLevel, level) {
    
    if (!levelData.keys.includes(className)) {
        levelData.keys.push(className);
    }
    levelData.values[className] = {current: currentLevel, increase: level};
    
}

function SetAdvancementBaseGrowths (update, baseGrowths, ancestryGrowths) {
    
    let growthArray = CreateGrowthsArrayData();
    growthArray.CON = baseGrowths.CON + ancestryGrowths.CON;
    
    update["advancement-baseGrowths"] = JSON.stringify(growthArray);
    return update;
}

function CapitalizeAndRemoveSpaces(inputString) {

  // Capitalize every word in the string
  var capitalizedString = inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Remove spaces using a regular expression
  var stringWithoutSpaces = capitalizedString.replace(/\s/g, '');

  return stringWithoutSpaces;
}

function CreateAbilityScoreArrayData() {
  var output = {
    CON: 0, DEX: 0,
    QCK: 0, STR: 0,
    CHA: 0, INT: 0,
    PER: 0, WIL: 0
  }
  
  return output;
}

function CreateGrowthsArrayData() {

  var output = CreateAbilityScoreArrayData();
  output.hp = 0;
  output.vitality = 0;
  output.kiCharge = 0;
  output.spellForce = 0;
  
  return output;
}

function ConvertAbilityScoresToGrowths(growthData) {

  abilityScoreGrowthRate = 0.2;
  hpGrowthRate = 0.5;
  vitalityGrowthRate = 0.05;
  kiChargeGrowthRate = 0.05;
  spellForceGrowthRate = 0.06;
  return {
    CON: (growthData.CON * abilityScoreGrowthRate),
    DEX: (growthData.DEX * abilityScoreGrowthRate),
    QCK: (growthData.QCK * abilityScoreGrowthRate),
    STR: (growthData.STR * abilityScoreGrowthRate),
    CHA: (growthData.CHA * abilityScoreGrowthRate),
    INT: (growthData.INT * abilityScoreGrowthRate),
    PER: (growthData.PER * abilityScoreGrowthRate),
    WIL: (growthData.WIL * abilityScoreGrowthRate),
    hp: (growthData.hp * hpGrowthRate),
    vitality: (growthData.vitality * vitalityGrowthRate),
    kiCharge: (growthData.kiCharge * kiChargeGrowthRate),
    spellForce: (growthData.spellForce * spellForceGrowthRate)
  }
}

function AddGrowths (array1, array2) {
    
    return {
    CON: (array1.CON + array2.CON),
    DEX: (array1.DEX + array2.DEX),
    QCK: (array1.QCK + array2.QCK),
    STR: (array1.STR + array2.STR),
    CHA: (array1.CHA + array2.CHA),
    INT: (array1.INT + array2.INT),
    PER: (array1.PER + array2.PER),
    WIL: (array1.WIL + array2.WIL),
    hp: (array1.hp + array2.hp),
    vitality: (array1.vitality + array2.vitality),
    kiCharge: (array1.kiCharge + array2.kiCharge),
    spellForce: (array1.spellForce + array2.spellForce)
  }
}

function MultiplyGrowths (array1, val) {
    
    return {
    CON: (array1.CON * val),
    DEX: (array1.DEX * val),
    QCK: (array1.QCK * val),
    STR: (array1.STR * val),
    CHA: (array1.CHA * val),
    INT: (array1.INT * val),
    PER: (array1.PER * val),
    WIL: (array1.WIL * val),
    hp: (array1.hp * val),
    vitality: (array1.vitality * val),
    kiCharge: (array1.kiCharge * val),
    spellForce: (array1.spellForce * val)
  }
}

on("change:advancement-button-back", function () {

	update_advancement_back();
});

var update_advancement_back = function () {

	let mod_attrs = [`advancement-previousPage`];

	getAttrs(mod_attrs, function (v) {
		let update = {};

		update["characterSheetDisplayStyle"] = v["advancement-previousPage"];
		update["advancement-previousPage"] = "";

		setAttrs(update, { silent: true });
	});

}

on("change:advancement-button-submit", function () {

	update_advancement_submit();
});

var update_advancement_submit = function () {
    
    let mod_attrs = ["base_level", "advancement-level-total", "advancement-baseGrowths", "advancement-currentGrowths"];
	getAttrs(mod_attrs, function (v) {
	    
	    let update = {};
	    
	    let baseLevel = isNaN(parseInt(v["base_level"])) ? 0 : parseInt(v["base_level"]);
	    let levelData = GetAdvancementLevelData(v["advancement-level-total"]);
	    let baseGrowths = JSON.parse(v["advancement-baseGrowths"]);
	    let currentGrowths = JSON.parse(v["advancement-currentGrowths"]);
	    
	    let totalGrowths = CreateGrowthsArrayData();
	    totalGrowths = AddGrowths(totalGrowths, baseGrowths);
	    let totalLevel = 0;
	    Let classLevelTotal = 0;
	    let classUpdates = [];
	    let classUpdate;
	    let pathUpdate = "";
	    
	    let classData;
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
    	        totalGrowths = AddGrowths(totalGrowths, MultiplyGrowths(classData.growths, classLevel.increase));
    	        classLevelTotal = classLevel.current + classLevel.increase;
    	        
    	        // update the level up update
    	        classUpdate = {
    	            header: `${classData.name} Level Up!`,
    	            desc: `${classData.name} ${classLevel.current} -> ${classLevelTotal}`
    	        };
    	        
    	        // iterate through the advancement gains
    	        techLevel = classLevel.current + 1;
    	        if (techLevel == 1) {
    	            tech = {name: clasData.jobTechnique, type: "T"};
    	            advancement = AddAdvancementTech(advancement, tech);
    	            classUpdate.desc += `\n[Level ${techLevel}]`;
    	            classUpdate.desc += `\nGained the ${tech.name} technique.`;
    	        }
    	        while (techLevel <= 20 && techLevel <= classLevelTotal) {
    	            
    	            // only check advancement on even class levels
    	            if (techLevel % 2 == 0) {
    	                techModLevel = Math.floor(techLevel / 2) - 1;
    	                if (techModLevel >= 0) {
        	                tech = clasData.advancement[techModLevel];
        	                
        	                if (tech != undefined) {
        	                    
        	                    advancement = AddAdvancementTech (advancement, tech);
        	                    classUpdate.desc += `\n[Level ${techLevel}]`;
        	                    classUpdate.desc += `\n${tech.type == "T" ? `Gained the ${tech.name} technique.` : tech.name}`;
        	                }
    	                }
    	            }
    	            techLevel++;
    	        }
    	        
    	        // add the updates
    	        classUpdates.push[classUpdates];
    	        
    	        // update UI
    	        update[`advancement-level-${classFieldName}`] = classLevelTotal;
    	        update[`advancement-name-${classFieldName}`] = classData.name};
	        }
	    }
	    
	    classUpdate = {
            header: `Character Level Increased!`,
            desc: `Character Level ${baseLevel} -> ${baseLevel + totalLevel}`
        };
	    
	    // iterate through the levels for new path growths
	    for (let i = 1; i <= totalLevel; i++) {
	        levelCheck = baseLevel + i;
	        pathUpdate = "";
	        
	        // set level bonuses
	        switch(levelCheck) {
	           case 1:
	                tech = {name: "Gain a Path Technique.", type: "PS"};
	                pathUpdate += `\n${tech.name}`;
	                advancement = AddAdvancementTech(advancement, tech);
                    tech = {name: "Gain 2 Spell Techniques.", type: "SPS"};
                    pathUpdate += `\n${tech.name}`;
                    advancement = AddAdvancementTech(advancement, tech);
                    advancement = AddAdvancementTech(advancement, tech);
	                break;
	            
	           case 6:
               case 31: 
	                tech = {name: "Gain an Active Tech Slot.", type: "ATS"};
	                pathUpdate += `\n${tech.name}`;
	                advancement = AddAdvancementTech(advancement, tech);
	                break;
	                
               case 21:
	                tech = {name: "Gain an Active Tech Slot.", type: "ATS"};
	                pathUpdate += `\n${tech.name}`;
	                advancement = AddAdvancementTech(advancement, tech);
	                tech = {name: "Gain a Job Tech Slot", type: "JTS"};
	                pathUpdate += `\n${tech.name}`;
	                advancement = AddAdvancementTech(advancement, tech);
	                break;
	            
	           case 11:
               case 26:
               case 36: 
	                tech = {name: "Gain a Passive and Support Tech Slot.", type: "PTS"};
	                pathUpdate += `\n${tech.name}`;
	                advancement = AddAdvancementTech(advancement, tech);
	                break;
	        }
	        
	        if ((levelCheck % 5) - 2 == 0) {
                tech = {name: "Gain a Skill Technique.", type: "AS"};
                pathUpdate += `\n${tech.name}`;
                advancement = AddAdvancementTech(advancement, tech);
	        }
	        else if ((levelCheck % 5) - 3 == 0) {
                tech = {name: "Gain a Training Path Technique.", type: "TPS"};
                pathUpdate += `\n${tech.name}`;
                advancement = AddAdvancementTech(advancement, tech);
	        }
	        else if ((levelCheck % 5) - 4 == 0) {
                tech = {name: "Gain a Path Technique.", type: "APS"};
                pathUpdate += `\n${tech.name}`;
                advancement = AddAdvancementTech(advancement, tech);
	        }
	        else if ((levelCheck % 5) == 0) {
                tech = {name: "Gain a Spell Technique.", type: "SPS"};
                pathUpdate += `\n${tech.name}`;
                advancement = AddAdvancementTech(advancement, tech);
	        }
	        
	        if (pathUpdate != "") {
	            pathUpdate = `[Level ${levelCheck}]${pathUpdate}`;
	            classUpdate.desc += pathUpdate;
	        }
	        
	    }
	    
	    // calculate final growths
        totalGrowths = AddGrowths(totalGrowths, MultiplyGrowths(baseGrowths, totalLevel));
        
    	
    	update["characterSheetDisplayStyle"] = "Character";
    
    	setAttrs(update, { silent: true });
       	
	});

}

function AddAdvancementTech (advancement, tech) {
    
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



// Advancement Listeners
on("change:advancement-level-Fighter_max change:advancement-level-Interceptor_max change:advancement-level-Marksman_max change:advancement-level-Rogue_max change:advancement-level-Physician_max change:advancement-level-Pugilist_max change:advancement-level-Scholar_max ", function (eventinfo) {

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
		
		let classData = GetClassesInfo(classFieldName);
		update[`advancement-name-${classFieldName}`] = `${classData.name} ${levelDifference > 0 ? `+${levelDifference}` : ""}`;
		
		var levelData = GetAdvancementLevelData(v["advancement-level-total"]);
		SetAdvancementLevelData(levelData, classFieldName, currentLevel, levelDifference);
		update["advancement-level-total"] = JSON.stringify(levelData);
		
		setAttrs(update, { silent: true });
	});
}


