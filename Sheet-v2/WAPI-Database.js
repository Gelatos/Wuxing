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

function GetFieldNameAttribute(fieldName) {
    if (fieldName.indexOf("_") >= 0) {
		fieldName = fieldName.match(/_([^_]*)$/)[1];
	}
    if (fieldName.indexOf("-") >= 0) {
		fieldName = fieldName.match(/-(?!.*-)(.*)$/)[1];
	}
    return fieldName;
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

