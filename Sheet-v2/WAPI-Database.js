var TechniqueHandler = TechniqueHandler || (function () {
    'use strict';

    var 
        getRollTemplate = function(technique) {
        
            let output = "";
        
            // if this is an augment, incorporate the base into the rolltemplate
            if (technique.augmentBase != "") {
                if (technique.augmentTech != undefined) {
                    technique = SetAugmentTechnique(technique, technique.augmentTech);
                }
            }
            else {
                output += "{{type-base=1}} ";
            }
        
            output += `{{Username=${technique.username}}}`;
            output += `{{Name=${technique.name}}}`;
            output += `{{Type=${technique.techniqueType}}}`;
            output += `{{type-${technique.techniqueType}=1}} `;
            output += `{{Group=${technique.techniqueSubGroup == "" ? technique.techniqueGroup : technique.techniqueSubGroup}}}`;
        
            // create the action line
            let actionLine = "";
            if (technique.action != "") {
                output += `{{type-${technique.action}=1}} `;
                actionLine += technique.action;
            }
            if (technique.limits != "") {
                if (actionLine != "") {
                    actionLine += "; ";
                }
                actionLine += technique.limits;
            }
            if (technique.resourceCost != "") {
                if (actionLine != "") {
                    actionLine += "; ";
                }
                actionLine += technique.resourceCost;
            }
            if (actionLine != "") {
                output += `{{ActionLine=${actionLine}}} `;
            }
            if (technique.traits != "" || technique.trigger != "" || technique.requirement != "" || technique.prerequisite != "") {
                output += "{{type-FunctionBlock=1}} ";
        
                if (technique.traits != "") {
                    var traitsDb = GetTraitsDictionary(technique.traits, "technique");
                    for (var i = 0; i < traitsDb.length; i++) {
                        output += `{{Trait${i}=${traitsDb[i].name}}} {{Trait${i}Desc=${traitsDb[i].description}}} `;
                    }
                }
                if (technique.trigger != "") {
                    output += `{{Trigger=${technique.trigger}}} `;
                }
                if (technique.requirement != "") {
                    output += `{{Requirement=${technique.requirement}}} `;
                }
                if (technique.prerequisite != "") {
                    output += `{{Prerequisites=${technique.prerequisite}}} `;
                }
            }
            if (technique.skill != "" || technique.defense != "" || technique.range != "" || technique.target != "" || (technique.dVal != "" && technique.dVal != 0) || technique.damageType != "") {
                output += "{{type-AttackBlock=1}} ";
        
                if (technique.range != "" || technique.target != "") {
                    output += "{{type-AttackBlockTarget=1}} ";
        
                    if (technique.range != "") {
                        output += `{{Range=${technique.range}}} {{RType=${technique.rType}}} `;
                    }
                    if (technique.target != "") {
                        output += `{{Target=${technique.target}}} `;
                    }
                }
                if (technique.skill != "") {
                    let skill = "";
                    if (technique.defense != "") {
                        if (technique.defense.indexOf("DC")) {
                            skill = technique.defense;
                        }
                        else {
                            skill = `${technique.defense} Check`;
                        }
                    }
                    else {
                        skill = "DC 15";
                    }
                    skill = `${technique.skill} vs. ${skill}`;
                    output += `{{SkillString=${skill}}} `;
                }
                if ((technique.dVal != "" && technique.dVal > 0) || technique.damageType != "") {
                    output += `{{DamageString=${FormatDamageString(technique)}}} `;
                }
            }
            if (technique.description != "" || technique.onSuccess != "") {
                output += "{{type-DescBlock=1}} ";
                if (technique.description != "") {
                    output += `{{Desc=${technique.description}}} `;
                }
                if (technique.onSuccess != "") {
                    output += `{{OnHit=${technique.onSuccess}}} `;
                }
            }
        
            
        
            output = `&{template:technique} ${output.trim()}`;
            return output;
        },
        
        getConsumeUsePost = function(technique) {
        
            // add technique data for the api
            technique.username = "@{character_name}";
            let usedTechData = JSON.stringify(technique);
        
            // add the equopped action at the end
            if (technique.traits != "" && (technique.traits.indexOf("Armament") >= 0 || technique.traits.indexOf("Arsenal") >= 0)) {
                usedTechData += "##@{technique-equippedWeapon}";
            }
        
            return `!ctech ${usedTechData}`;
        }

    ;
    return {
        GetRollTemplate: getRollTemplate,
        GetConsumeUsePost: getConsumeUsePost
    };

}());

var ItemHandler = ItemHandler || (function() {
    'use strict';

    var 
        getTechniqueWeaponRollTemplate = function(itemData) {
            let output = "";
            output += `{{WpnName=${itemData.name}}} `;

            var traitsDb = GetTraitsDictionary(itemData.traits, "item");
            for (var i = 0; i < traitsDb.length; i++) {
                output += `{{WpnTrait${i}=${traitsDb[i].name}}} {{WpnTrait${i}Desc=${traitsDb[i].description}}} `;
            }

            traitsDb = GetTraitsDictionary(itemData.abilities, "ability");
            for (var i = 0; i < traitsDb.length; i++) {
                output += `{{WpnAbil${i}=${traitsDb[i].name}}} {{WpnAbil${i}Desc=${traitsDb[i].description}}} `;
            }

            if (itemData.range != "") {
                output += `{{WpnRange=${itemData.range}}} `;
            }
            if (itemData.threat != "") {
                output += `{{WpnThreat=${itemData.threat}}} `;
            }
            output += `{{WpnDamage=${itemData.damageString}}} `;
            output += `{{WpnSkill=${itemData.skill}}} `;

            return output;
        }

    ;
    return {
        GetTechniqueWeaponRollTemplate: getTechniqueWeaponRollTemplate
    };
}());


function GetTraitsDictionary (traits, traitType) {

    let output = [];
    if (traits != undefined) {
        let keywordsSplit = traits.split(";");

        let name = "";
        let lookup = "";
        let traitInfo;

        for (let i = 0; i < keywordsSplit.length; i++) {
            name = "" + keywordsSplit[i].trim();

            if (name.includes("Impact") || name.includes("Explosive")) {
                name = ReplaceDamageDice(name);
            }

            lookup = name;
            if (lookup.indexOf("(") >= 0) {
                lookup = lookup.replace(/\([^)]*\)/g, "(X)");
            }

            switch (traitType.toLowerCase()) {
                case "technique": traitInfo = GetTechniqueTraitsInfo(lookup); break;
                case "item": traitInfo = GetItemTraitsInfo(lookup); break;
                case "ability": traitInfo = GetAbilityTraitsInfo(lookup); break;
                case "material": traitInfo = GetMaterialTraitsInfo(lookup); break;
            }
            traitInfo.name = name;
            output.push(traitInfo);
        }
    }

    return output;
}


// ====== Section Ids

function GetSectionIdName(sectionName, currentID, variableName) {

    if (variableName.startsWith("attr")) {
        variableName = variableName.substr(4);
    }

    if (currentID != "") {
        if (!variableName.startsWith("_")) {
            variableName = "_" + variableName;
        }
        if (!sectionName.endsWith("_")) {
            sectionName += "_";
        }
    }
    return sectionName + currentID + variableName;
}

function GetSectionIdNameFromArray(sectionName, currentID, variableNames) {
    let output = [];
    for (let i = 0; i < variableNames.length; i++) {
        output.push(GetSectionIdName(sectionName, currentID, variableNames[i]));
    }
    return output;
}

function GetFieldNameAttribute(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
		fieldName = fieldName.match(/_([^_]*)$/)[1];
	}
    if (fieldName.indexOf("-") >= 0) {
		fieldName = fieldName.match(/-(?!.*-)(.*)$/)[1];
	}
    return fieldName;
}

function GetRepeatingSectionFromFieldName(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
		fieldName = fieldName.substring(fieldName.indexOf("_") + 1);
        if (fieldName.indexOf("_") >= 0) {
            fieldName = "repeating_" + fieldName.substring(0, fieldName.indexOf("_"));
        }
	}
    return fieldName;
}

function GetRepeatingSectionIdFromId(id, repeatingSection) {
	var len = repeatingSection.length + 1;
	return id.substr(len, 20);
}

// ====== Formatters

function CreateDictionary() {
    return {
        keys: [],
        values: {},

        add: function(key, value) {
            if (!this.keys.includes(key)) {
                this.keys.push(key);
            }
            this.values[key] = value;
        },
        has: function(key) {
            return this.keys.includes(key);
        }
    }
}

function ToCamelCase(inputString) {

    if (inputString == "") {
        return inputString;
    }

    // Split the input string by spaces and iterate through the words
    let words = inputString.split(' ');
    words[0] = words[0][0].toLowerCase() + words[0].slice(1);
    for (let i = 1; i < words.length; i++) {
        // Capitalize the first letter of each word (except the first word)
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join('');
}

// ====== Language

function GetLanguageName(language) {

    switch (language.toLowerCase()) {
        case "minere":
        case "min":
        case "m":
            return "Minere";
        case "apollen":
        case "apo":
        case "apol":
        case "a":
            return "Apollen";
        case "junal":
        case "jun":
        case "j":
            return "Junal";
        case "cert":
        case "cer":
        case "c":
            return "Cert";
        case "lib":
        case "l":
            return "Lib";
        case "jovean":
        case "novan":
            return "Jovean";

        case "byric":
            return "Byric";
        case "ciel":
            return "Ciel";
        case "citeq":
            return "Citeq";
        case "crinere":
            return "Crinere";
        case "dustell":
            return "Dustell";
        case "kleikan":
            return "Kleikan";
        case "manstan":
            return "Manstan";
        case "muralic":
            return "Muralic";
        case "mytikan":
            return "Mytikan";
        case "palmic":
            return "Palmic";
        case "salkan":
            return "Salkan";
        case "sansic":
            return "Sansic";
        case "shira":
            return "Shira";
        case "shorespeak":
            return "Shorespeak";
        case "silq":
            return "Silq";
        case "spirit":
            return "Spirit";
        case "verdeni":
            return "Verdeni";
        case "vulca":
            return "Vulca";
        case "wolfwarg":
            return "Wolfwarg";
        case "beast":
            return "Beast";
        case "emotion":
            return "Emotion";
        case "empathy":
            return "Empathy";

        default:
            return "";
    }
}

function GetLanguageTag(language) {

    if (language == undefined) {
        return "{{language-default=1}}";
    }

    switch (language.toLowerCase()) {
        case "minere":
            return "{{language-coastal=1}}";
        case "apollen":
            return "{{language-mountain=1}}";
        case "junal":
            return "{{language-desert=1}}";
        case "cert":
            return "{{language-plains=1}}";
        case "lib":
            return "{{language-rare=1}}";


        case "palmic":
        case "shorespeak":
        case "verdeni":
            return "{{language-coastal=1}}{{language-regional=1}}";
        case "crinere":
        case "vulca":
            return "{{language-coastal=1}}{{language-ancient=1}}";

        case "kleikan":
            return "{{language-mountain=1}}{{language-regional=1}}";

        case "byric":
        case "dustell":
        case "muralic":
            return "{{language-desert=1}}{{language-regional=1}}";
        case "shira":
            return "{{language-desert=1}}{{language-ancient=1}}";

        case "ciel":
        case "citeq":
        case "manstan":
        case "salkan":
        case "sansic":
        case "silq":
            return "{{language-plains=1}}{{language-regional=1}}";

        case "jovean":
            return "{{language-rare=1}}{{language-regional=1}}";
        case "mytikan":
            return "{{language-rare=1}}{{language-ancient=1}}";

        case "wolfwarg":
        case "beast":
        case "empathy":
        case "emotion":
        case "spirit":
            return "{{language-special=1}}";

        default:
            return "{{language-default=1}}";
    }
}

// ===== Generators
// =================================================

function GetBlankCharacter() {
    return {
        name: "",
        nationality: "",
        nature: "",
        ancestry: "",
        gender: "",
        classCategory: "",
        sector: "",
        profession: "",
        rapport: 0,
        favors: 0
    };
}

function CharacterNationalityGenerator() {
    var rnd = Math.floor(Math.random() * 5);
    switch (rnd) {
        case 0:
            return "Minerva";
        case 1:
            return "Apollo";
        case 2:
            return "Juno";
        case 3:
            return "Ceres";
        case 4:
            return "Liber";
        default:
            return "Minerva";
    }
}

function CharacterRaceGenerator(nationality) {
    var races = [];

    // change the odds based on nationality
    switch (nationality) {
        case "Minerva":
            races = GetRaceList(60, 12, 10, 17, 1);
            break;
        case "Apollo":
            races = GetRaceList(3, 85, 2, 10, 0);
            break;
        case "Juno":
            races = GetRaceList(3, 2, 80, 10, 5);
            break;
        case "Ceres":
            races = GetRaceList(10, 30, 4, 55, 1);
            break;
        case "Liber":
            races = GetRaceList(1, 0, 2, 2, 95);
            break;
        default:
            races = GetRaceList(20, 20, 20, 20, 20);
            break;
    }

    // roll on the randomizer
    var rnd = Math.floor(Math.random() * 100);

    for (var i = 0; i < races.length; i++) {
        if (rnd < races[i].odds) {
            return races[i].race;
        }
        rnd -= races[i].odds;
    }

    return "Coastborne";
}

function CharacterGenderGenerator() {
    var rnd = Math.floor(Math.random() * 2);
    if (rnd == 0) {
        return "Male";
    } else {
        return "Female";
    }
}

function CharacterNameGenerator(nationality, race, gender) {
    var firstNameList = [""];
    var lastNameList = [""];
    var firstName = "";
    var lastName = "";
    var rnd = 0;

    // Choose whether to select a name based on race or nationality. 
    rnd = Math.random() * 100;

    // The logic here is that race has less of an effect than nationality on first names
    if (rnd < 70) {
        firstNameList = GetNameList(nationality, gender);
    } else {
        firstNameList = GetNameList(race, gender);
    }

    // The logic here is that race has more of an effect than nationality on last names
    if (rnd < 15) {
        lastNameList = GetNameList(nationality, "last");
    } else {
        lastNameList = GetNameList(race, "last");
    }

    // choose the names
    firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];

    if (lastName != "") {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

function CharacterNatureGenerator() {
    var natures = GetNatureList();

    var rnd = Math.floor(Math.random() * natures.length);

    return natures[rnd];
}

function CharacterClassGenerator(venueClass) {
    // set up variables
    var maxRoll = 0;
    var eliteRoll = 0;
    var highRoll = 0;
    var mediumRoll = 0;
    var lowRoll = 0;


    // these represent ratios or chances each class might show up
    var eliteMod = 1;
    var highMod = 9;
    var mediumMod = 60;
    var lowMod = 120;


    // first we need to determine the maxRoll value which represents the highest possible roll
    maxRoll += eliteMod;
    eliteRoll = maxRoll;
    maxRoll += highMod;
    highRoll = maxRoll;


    // add the other sets if the class is potentially lower
    if (venueClass != "High") {
        maxRoll += mediumMod;
        mediumRoll = maxRoll;
    }
    if (venueClass != "High" && venueClass != "Medium") {
        maxRoll += lowMod;
        lowRoll = maxRoll;
    }


    // select a random number within the Max Range
    var rnd = Math.floor(Math.random() * maxRoll);


    // return a class
    if (rnd <= eliteRoll) {
        return "Elite";
    } else if (rnd <= highRoll) {
        return "High";
    } else if (rnd <= mediumRoll) {
        return "Medium";
    } else {
        return "Low";
    }
}

function CharacterSectorGenerator(classCategory) {
    var sectors = GetSectorProbabilityList(classCategory);
    var i = 0;

    // determine the number of odds
    var maxRnd = 0;
    for (i = 0; i < sectors.length; i++) {
        maxRnd += sectors[i].odds;
    }

    // select a random sector
    var rnd = Math.floor(Math.random() * maxRnd);
    for (i = 0; i < sectors.length; i++) {
        if (rnd < sectors[i].odds) {
            return sectors[i].sector;
        }
        rnd -= sectors[i].odds;
    }

    return "";
}

function CharacterProfessionGenerator(classCategory, sector) {
    var professions = GetProfessionList(sector);
    var professionsList = [];

    switch (classCategory) {
        case "Elite":
            professionsList = professions.elite;
            break;
        case "High":
            professionsList = professions.high;
            break;
        case "Medium":
            professionsList = professions.medium;
            break;
        case "Low":
        default:
            professionsList = professions.low;
            break;
    }

    // select a random number within the list
    var rnd = Math.floor(Math.random() * professionsList.length);

    return professionsList[rnd];
}

