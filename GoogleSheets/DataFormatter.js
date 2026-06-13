// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection
// noinspection ES6ConvertVarToLetConst

var Debug = Debug || (function () {
    'use strict';
    const log = function (msg) {
            Logger.log(msg);
        },
        logError = function (msg) {
            Logger.log(`ERROR! ${msg}`);
        };

    return {
        Log: log,
        LogError: logError
    };
}());

function SplitLargeEntry(output, splitCharacter) {
    if (splitCharacter == undefined) {
        splitCharacter = "\n";
    }

    let outputArray = [];
    let splitString = "";
    let splitIndex = 0;
    if (output.length > 50000) {
        while (output.length > 0) {
            if (output.length > 50000) {
                splitString = output.substring(0, 50000);

                if (splitCharacter != "") {
                    let foundSplit = false;
                    while (!foundSplit) {
                        splitIndex = splitString.lastIndexOf(splitCharacter) + splitCharacter.length;
                        if (splitIndex > 0) {
                            if (splitString.substring(splitIndex, splitIndex + 1).includes(`"`)) {
                                splitString = splitString.substring(0, splitIndex - 1 - splitCharacter.length);
                            }
                            else {
                                foundSplit = true;
                            }
                        }
                        else {
                            splitIndex = 50000 - splitCharacter.length;
                            foundSplit = true;
                        }
                    }
                    splitString = output.substring(0, splitIndex);
                    output = output.substring(splitIndex);
                }
                else {
                    output = output.substring(50000);
                }
                outputArray.push(splitString);
            }
            else {
                outputArray.push(output.substring(0));
                output = "";
            }
        }
    }
    else
    {
        outputArray[0] = output;
    }
    return outputArray;
}

function ColumnToLetter(col) {
    let letter = "";
    while (col > 0) {
        letter = String.fromCharCode((col - 1) % 26 + 65) + letter;
        col = Math.floor((col - 1) / 26);
    }
    return letter;
}

function Test() {
    return JSON.stringify(WuxDef.Get("Tech_Overhead Chop").jsonData);
    // let data = new DefinitionData(definitionArray[0]);
    // return JSON.stringify(data);
    // return PrintLargeEntry(DisplayTechniquesSheet.PrintTest(SheetsDatabase.CreateStyles(stylesArray), SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString))), "t");
}

function ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    if (arr1 != undefined) {
        arr0 = arr0.concat(arr1);
    }
    if (arr2 != undefined) {
        arr0 = arr0.concat(arr2);
    }
    if (arr3 != undefined) {
        arr0 = arr0.concat(arr3);
    }
    if (arr4 != undefined) {
        arr0 = arr0.concat(arr4);
    }
    if (arr5 != undefined) {
        arr0 = arr0.concat(arr5);
    }
    if (arr6 != undefined) {
        arr0 = arr0.concat(arr6);
    }
    if (arr7 != undefined) {
        arr0 = arr0.concat(arr7);
    }
    if (arr8 != undefined) {
        arr0 = arr0.concat(arr8);
    }
    if (arr9 != undefined) {
        arr0 = arr0.concat(arr9);
    }
    return arr0;
}

var NameDatabase = NameDatabase || (function () {
    const setNameData = function (data) {
        return {
            name: "" + data[0],
            region: "" + data[1],
            type: "" + data[2]
        }
    }

    const dataOdds = function (name, odds) {
        return {name: name, odds: odds};
    }

    const importNameDatabase = function (arr) {
        if (arr == undefined || arr.length == 0) {
            return {};
        }
        let nameDatabase = {};
        for (let i = 0; i < arr.length; i++) {
            let nameData = setNameData(arr[i]);
            if (!nameDatabase.hasOwnProperty(nameData.region)) {
                nameDatabase[nameData.region] = {};
            }
            if (!nameDatabase[nameData.region].hasOwnProperty(nameData.type)) {
                nameDatabase[nameData.region][nameData.type] = [];
            }
            nameDatabase[nameData.region][nameData.type].push(nameData.name);
        }
        return nameDatabase;
    }

    const importRegionDatabase = function (arr) {
        let regionDatabase = {
            region: {},
            ancestry: {}
        };
        if (arr == undefined || arr.length == 0) {
            return regionDatabase;
        }

        // create a list of the races
        let races = {};
        let maxY = 0;
        let racesRow = arr[0];
        for (let i = 1; i < racesRow.length; i++) {
            if (racesRow[i] == "") {
                maxY = i;
                break;
            }
            races[i] = "" + racesRow[i];
        }

        for (let x = 1; x < arr.length; x++) {
            let region = "" + arr[x][0];
            for (let y = 1; y < maxY; y++) {
                let odds = parseInt("" + arr[x][y]);
                if (!isNaN(odds) && odds != 0) {
                    if (!regionDatabase.region.hasOwnProperty(region)) {
                        regionDatabase.region[region] = {options: [], total: 0};
                    }
                    if (!regionDatabase.ancestry.hasOwnProperty(races[y])) {
                        regionDatabase.ancestry[races[y]] = {options: [], total: 0};
                    }
                    regionDatabase.region[region].options.push(new dataOdds(races[y], odds));
                    regionDatabase.region[region].total += odds;
                    regionDatabase.ancestry[races[y]].options.push(new dataOdds(region, odds));
                    regionDatabase.ancestry[races[y]].total += odds;
                }
            }
        }
        return regionDatabase;
    }

    'use strict';

    const create = function (nameArr, regionArr) {
            let dataClass = new JavascriptDataClass();
            let nameDatabase = importNameDatabase(nameArr);
            let regionDatabase = importRegionDatabase(regionArr);

            dataClass.addPublicVariable("nameDatabase", dataClass.formatJsonForDatabase(nameDatabase));
            dataClass.addPublicVariable("regionDatabase", dataClass.formatJsonForDatabase(regionDatabase));

            dataClass.addPublicFunction("getName", getName);
            dataClass.addPublicFunction("getRegionByAncestry", getRegionByAncestry);
            dataClass.addPublicFunction("getAncestryByRegion", getAncestryByRegion);
            return dataClass;
        },

        getName = function (region, type) {
            switch (region) {
                case "East Sea":
                    region = "Walthair";
                    break;
                case "Dowfeng":
                    region = "Aridsha";
                    break;
                case "Wayling":
                    region = "Ceres";
                    break;
            }
            if (type != "Family" && type != "Male" && type != "Female") {
                if (Math.random() > 0.5) {
                    type = "Male";
                }
                else {
                    type = "Female";
                }
            }
            let database = nameDatabase[region][type];
            if (database == undefined || database.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.length);
            return database[index];
        },

        getRegionByAncestry = function (ancestry) {
            let database = regionDatabase.ancestry[ancestry];
            if (database == undefined || database.options.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.total);
            for (let i = 0; i < database.options.length; i++) {
                index -= database.options[i].odds;
                if (index < 0) {
                    return database.options[i].name;
                }
            }
        },

        getAncestryByRegion = function (region) {
            let database = regionDatabase.region[region];
            if (database == undefined || database.options.length == 0) {
                return "";
            }
            let index = Math.floor(Math.random() * database.total);
            for (let i = 0; i < database.options.length; i++) {
                index -= database.options[i].odds;
                if (index < 0) {
                    return database.options[i].name;
                }
            }
        }

    return {
        Create: create,
        GetName: getName
    };
}());

var SheetsDatabase = SheetsDatabase || (function () {
    const createTechniques = function (arr) {
        return new ExtendedTechniqueDatabase(arr);
    };
    const createSkills = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new SkillData(arr)}, ["group", "subGroup"]);
    };
    const createStyles = function (arr) {
        return new ExtendedTechniqueStyleDatabase(arr);
    };
    const createBasicPerks = function (arr) {
        return new WuxDataDatabase(arr, arr => { return new BasicPerk(arr); });
    };
    const createLanguages = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new LanguageData(arr)});
    };
    const createLores = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new LoreData(arr)});
    };
    const createJobs = function (arr) {
        return new WuxDataDatabase(arr, arr => {return new JobData(arr)});
    };
    const createGoods = function (arr) {
        return new Database(arr, ["group"], function (arr) {
            return new GoodsData(arr);
        });
    };
    const createGear = function (arr) {
        return new ExtendedUsableItemDatabase(arr, function (data) {
            let item = new UsableItemData(data);
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            return item;
        });

    };
    const createConsumables = function (arr) {
        return new ExtendedUsableItemDatabase(arr, function (data) {
            let item = new UsableItemData(data);
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            return item;
        });
    };
    'use strict';

    const createDatabaseCollection = function (stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray) {

            let techDb = createTechniques(techniqueArray);
            return {
                techniques: techDb,
                styles: createStyles(stylesArray, techDb),
                skills: createSkills(skillsArray),
                language: createLanguages(languageArray),
                lore: createLores(loreArray),
                job: createJobs(jobsArray),
                goods: createGoods(goodsArray),
                gear: createGear(gearArray),
                consumables: createConsumables(consumablesArray)
            }
        },

        createStatus = function (arr) {
            return new Database(arr, ["group"], function (arr) {
                return new StatusData(arr);
            });
        },

        createDefinitionTypes = function (arr) {
            return new ExtendedDefinitionDatabase(arr);
        }
    ;
    return {
        CreateDatabaseCollection: createDatabaseCollection,
        CreateTechniques: createTechniques,
        CreateStyles: createStyles,
        CreateSkills: createSkills,
        CreateLanguages: createLanguages,
        CreateLores: createLores,
        CreateJobs: createJobs,
        CreateStatus: createStatus,
        CreateGoods: createGoods,
        CreateGear: createGear,
        CreateConsumables: createConsumables,
        CreateDefinitionTypes: createDefinitionTypes,
        CreateBasicPerks: createBasicPerks
    }
}());

class SheetDatabaseObject {
    constructor(ss) {
        this.ss = ss;
        this.filterSheet = this.ss.getSheetByName("Filter");
        this.filterCells = this.filterSheet.getRange("A1");
        this.techniques;
        this.styles;
        this.skills;
        this.language;
        this.lore;
        this.job;
        this.goods;
        this.gear;
        this.consumables;
        this.status;
        this.basicPerks;
    }

    readDatabase(sheetName, startRow) {
        let sheet = this.ss.getSheetByName(sheetName);
        let lastColLetter = ColumnToLetter(sheet.getLastColumn());
        return this.readFilteredThenClear(
            `=FILTER(${sheetName}!A${startRow}:${lastColLetter}, NOT(${sheetName}!A${startRow}:A=""))`, lastColLetter);
    }

    readFilteredThenClear(filter, columnRange) {
        this.filterCells.setFormula(filter);

        // 2. Flush so the formula calculates before reading
        SpreadsheetApp.flush();

        // 3. Get the filtered values
        const lastRow = this.filterSheet.getLastRow();
        const filteredData = this.filterSheet
            .getRange(`A1:${columnRange}${lastRow}`)
            .getValues()
            .filter(row => row.some(cell => cell !== ""));

        // 4. Clear the temporary range (formula + results)
        this.filterSheet.getRange(`A1:${columnRange}${lastRow}`).clearContent();

        return filteredData;
    }
    
    getChangedVersionRows(sheetName, startRow) {
        let sheet = this.ss.getSheetByName(sheetName);
        let lastColLetter = "A";
        let versionColumnLetter = ColumnToLetter(getNamedColumn(sheet, "Version"));
        let filterRow = `${sheetName}!${versionColumnLetter}${startRow}:${versionColumnLetter}`;
        let filter = `=FILTER(ROW(${filterRow}), ${filterRow}="CHANGE")`;
        return this.readFilteredThenClear(filter, lastColLetter);
    }
    
    setTechniques() {
        this.techniques = SheetsDatabase.CreateTechniques(this.readDatabase("Techniques", 2));
    }
    setStyles() {
        this.styles = this.getStyles();
    }
    getStyles() {
        return SheetsDatabase.CreateStyles([]);
    }
    setSkills() {
        this.skills = SheetsDatabase.CreateSkills(this.readDatabase("Skills", 2));
    }
    setLanguage() {
        this.language = SheetsDatabase.CreateLanguages(this.readDatabase("Languages", 2));
    }
    setLore() {
        this.lore = SheetsDatabase.CreateLores(this.readDatabase("Lores", 2));
    }
    setJobs() {
        this.job = SheetsDatabase.CreateJobs(this.readDatabase("Jobs", 2));
    }
    setGear() {
        this.gear = this.getGear();
    }
    getGear() {
        return SheetsDatabase.CreateGear(this.readDatabase("Gear", 2));
    }
    setGoods() {
        this.goods = SheetsDatabase.CreateGoods(this.readDatabase("Goods", 2));
    }
    setConsumables() {
        this.consumables = SheetsDatabase.CreateConsumables(this.readDatabase("Consumables", 2));
    }
    setStatus() {
        this.status = SheetsDatabase.CreateStatus(this.readDatabase("Status", 2));
    }
    setBasicPerks() {
        this.basicPerks = SheetsDatabase.CreateBasicPerks(this.readDatabase("Perks", 2));
    }
}

class JavascriptDataClass {
    constructor() {
        this.variables = new Dictionary();
        this.functions = new Dictionary();
        this.publicData = new Dictionary();
    }

    addVariable(name, data) {
        this.variables.add(name, data);
    }

    addFunction(name, data) {
        this.functions.add(name, data);
    }

    addPublicData(name) {
        this.publicData.add(Format.ToUpperCamelCase(name), name);
    }

    addPublicVariable(name, data) {
        this.addVariable(name, data);
        this.addPublicData(name);
    }

    addPublicFunction(name, data) {
        this.addFunction(name, data);
        this.addPublicData(name);
    }

    createDatabase(customDataNames, customData) {
        let database = {};
        for (let i = 0; i < customData.length; i++) {
            database[customDataNames[i]] = customData[i];
        }
        return database;
    }

    formatJsonForDatabase(data) {
        let json = JSON.stringify(data);
        json = json.replace(/(},|],)/g, '$1\n');
        return json;
    }


    print(className) {
        return `var ${className} = ${className} || (function() {
            'use strict';

            var 
                ${this.printFormatVariables()}
            ;
            return {
                ${this.printFormatPublicData()}
            };
        }());
        `;
    }

    printFormatVariables() {
        let variables = this.printFormatClassData(this.variables, " = ");
        if (this.functions.keys.length > 0) {
            if (variables != "") {
                variables += `,
                
                `;
            }
            variables += this.printFormatClassData(this.functions, " = ");
        }
        return variables;
    }

    printFormatPublicData() {
        return this.printFormatClassData(this.publicData, ": ");
    }

    printFormatClassData(dictionary, delimiter) {
        let key = "";
        let data = "";
        for (let i = 0; i < dictionary.keys.length; i++) {
            key = dictionary.keys[i];
            if (data != "") {
                data += `,
            `;
            }
            data += `${key}${delimiter}${dictionary.get(key)}`;
        }
        return data;
    }
}

var JavascriptDatabase = JavascriptDatabase || (function () {
    const getKeys = function () {
        return keys;
    }
    const getValues = function (keyArray, delimiter, prefix) {
        if (keyArray == undefined || keyArray == "") {
            return [];
        }
        if (typeof keyArray == "string") {
            keyArray = keyArray.split(delimiter);
        }
        if (prefix == undefined) {
            prefix = "";
        }

        let output = [];
        let name = "";
        let keywords = []; 
        let definitionOutput;

        for (let i = 0; i < keyArray.length; i++) {
            name = `${prefix}${keyArray[i].trim()}`;
            keywords = name.split(":");

            definitionOutput = get(keywords[0].trim());
            if (definitionOutput != undefined) {
                if (keywords.length > 1) {
                    let subDefinition = get(keywords[1].trim());
                    if (subDefinition != undefined) {
                        definitionOutput.addSubDefinition(subDefinition);
                    }
                }
                output.push(definitionOutput);
            }
        }

        return output;
    };
    const has = function (key) {
        return keys.includes(key);
    };
    const iterate = function (callback) {
        for (let i = 0; i < keys.length; i++) {
            callback(values[keys[i]]);
        }
    };

    const filter = function (filterData) {
        if (!Array.isArray(filterData)) {
            filterData = [filterData];
        }

        let filteredGroup = getSortedData(filterData[0]);
        for (let i = 1; i < filterData.length; i++) {
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            let nextFilter = getSortedData(filterData[i]);
            if (nextFilter != undefined) {
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        }

        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return getGroupData(filteredGroup);
    }

    const getSortedData = function (filterData) {
        let filterOutput = getSortedGroup(filterData.property, filterData.value[0]);
        for (let i = 1; i < filterData.value.length; i++) {
            let nextFilter = getSortedGroup(filterData.property, filterData.value[i]);
            nextFilter.forEach(item => {
                if (!filterOutput.includes(item)) {
                    filterOutput.push(item);
                }
            });
        }
        return filterOutput;
    }
    
    const getSortedGroup = function (property, propertyValue, debug) {
        if (sortingGroups == undefined) {
            return [];
        }
        if (!sortingGroups.hasOwnProperty(property)) {
            if (debug != undefined) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log(`[${debug}] Tried to find property ${property} but it does not exist in the database. Valid keys: ${keys}`);
            }
            return [];
        }
        if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
            if (debug != undefined) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log(`[${debug}] Tried to find sub property ${propertyValue} but it does not exist in the database. Valid keys: ${keys}`);
            }
            return [];
        }
        return sortingGroups[property][propertyValue].slice();
    };
    const getGroupData = function (group) {
        let output = [];
        for (let i = 0; i < group.length; i++) {
            output.push(get(group[i]));
        }
        return output;
    };
    'use strict';

    const create = function (database, getFunction) {
        var jsClassData = new JavascriptDataClass();
        jsClassData.addVariable("keys", JSON.stringify(database.keys));
        jsClassData.addVariable("values", jsClassData.formatJsonForDatabase(database.values));
        jsClassData.addVariable("sortingGroups", JSON.stringify(database.sortingGroups));
        jsClassData.addFunction("get", getFunction);
        jsClassData.addFunction("getValues", getValues);
        jsClassData.addFunction("getKeys", getKeys);
        jsClassData.addFunction("has", has);
        jsClassData.addFunction("iterate", iterate);
        jsClassData.addFunction("filter", filter);
        jsClassData.addFunction("getSortedData", getSortedData);
        jsClassData.addFunction("getSortedGroup", getSortedGroup);
        jsClassData.addFunction("getGroupData", getGroupData);
        jsClassData.addPublicData("get");
        jsClassData.addPublicData("getValues");
        jsClassData.addPublicData("getKeys");
        jsClassData.addPublicData("has");
        jsClassData.addPublicData("iterate");
        jsClassData.addPublicData("filter");
        jsClassData.addPublicData("getSortedGroup");
        return jsClassData;
    };
    return {
        Create: create
    };
}());

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Assessment')
        .addItem('Assess This', 'AssessThis')
        .addItem('Assess All', 'AssessAll')
        .addItem('Assess All From Here', 'AssessAllFromPosition')
        .addToUi();
}

function onEdit(e) {
    const sheet = e.range.getSheet();
    if (TryTechniqueAssessment(sheet, e)) {
        return;
    }
    if (TryGearAssessment(sheet, e)) {
        return;
    }
    if (TryConsumableAssessment(sheet, e)) {
        return;
    }
    TryDatabaseAssessment(sheet, e);
}

function TryTechniqueAssessment(sheet, e) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        AssessTechniqueAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryGearAssessment(sheet, e) {
    if (sheet.getSheetName() == "Gear") {
        AssessGearAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryConsumableAssessment(sheet, e) {
    if (sheet.getSheetName() == "Consumables") {
        AssessConsumableAtRow(sheet, e.range.getRow());
        return true;
    }
    return false;
}

function TryDatabaseAssessment(sheet) {
    if (sheet.getSheetName() == "Database") {
        SetDatabaseFromPosition(SpreadsheetApp.getActiveSpreadsheet(), sheet);
        return true;
    }
    return false;
}

function AssessAll() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (TryAssessAllTechniques(sheet)) {
        return;
    }
    if (SetStyleEffects(sheet)) {
        return;
    }

    SetDatabase(ss, sheet);
}

function AssessAllFromPosition() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (AssessAllTechniquesFromPosition(sheet)) {
        return;
    }
    if (SetStyleEffectsFromPosition(sheet)) {
        return;
    }

    SetDatabaseFromPosition(ss, sheet);
}

function AssessThis() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    if (AssessTechniquesFromPosition(sheet)) {
        return;
    }
    if (SetStyleEffectFromPosition(sheet)) {
        return;
    }

    SetDatabaseFromPosition(ss, sheet);
}

function TryAssessAllTechniques(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        AssessAllTechniquesByStartRow(sheet, 2);
        return true;
    }
    return false;
}

function AssessTechniquesFromPosition(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        AssessTechniqueAtRow(sheet, row);
        return true;
    }
    return false;
}

function AssessAllTechniquesFromPosition(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        row = AssessTechniqueAtRow(sheet, row);
        AssessAllTechniquesByStartRow(sheet, row);
        return true;
    }
    return false;
}

function AssessTechniqueAtRow(sheet, rowIndex) {
    if (rowIndex == 1) {
        return;
    }
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
    if (techniqueData != undefined) {
        let assessment = new TechniqueAssessment(techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, groupsColumn);
        assessment.printCellValues();
        if (sheet.getSheetName() == "CustomTechniques") {
            assessment.printCellJson(true);
        }
        if (rowIndex != techniqueData.row) {
            assessingCell.setValue("");
        }
        return techniqueData.finalRow;
    } else {
        assessingCell.setValue("");
        return rowIndex + 1;
    }
}

function AssessGearAtRow(sheet, rowIndex) {
    if (rowIndex == 1) {
        return;
    }
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let itemData = GetGearForAssessment(sheet, rowIndex, assessColumn);
    if (itemData != undefined) {
        if (itemData.item.hasTechnique) {
            let techniqueAssessment = new TechniqueAssessment(itemData.item.technique, sheet, itemData.row, versionColumn, assessColumn, groupsColumn);
            techniqueAssessment.printCellValues();
        }
        if (rowIndex != itemData.row) {
            assessingCell.setValue("");
        }
        return itemData.finalRow;
    } else {
        assessingCell.setValue("");
        valueCell.setValue("");
        return rowIndex + 1;
    }
}

function AssessConsumableAtRow(sheet, rowIndex) {
    AssessGearAtRow(sheet, rowIndex);
}

function AssessAllTechniquesByStartRow(sheet, startRow) {
    const lastRow = sheet.getLastRow();
    let versionColumn = getNamedColumn(sheet, "Version");
    let assessColumn = getNamedColumn(sheet, "Assessment");
    let groupsColumn = getNamedColumn(sheet, "Generated Groups");
    let rowIndex = startRow;
    let techniqueData;
    while (rowIndex < lastRow) {
        let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
        assessingCell.setValue("Calculating...")

        techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
        if (techniqueData != undefined) {
            rowIndex = techniqueData.finalRow;
            let assessment = new TechniqueAssessment(
                techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, groupsColumn);
            assessment.printCellValues();
        } else {
            assessingCell.setValue("");
            rowIndex++;
        }
    }
}

function GetTechniqueForAssessment(sheet, row, assessColumn) {
    let baseTechnique;
    let baseRow = row;
    let finalRow = row;
    let maxIterations = 15;
    let newTechnique;
    newTechnique = GetTechniqueFromSheetRow(sheet, row, assessColumn);
    if (newTechnique.name == "") {
        return undefined; // no working on blank cells
    }
    if (newTechnique.action == "") {
        let startName = newTechnique.name;
        // This is a support entry. We must find the base technique
        let techniqueData = [];
        techniqueData.push(newTechnique);
        while (maxIterations > 0) {
            maxIterations--;
            baseRow--;
            newTechnique = GetTechniqueFromSheetRow(sheet, baseRow, assessColumn);
            if (newTechnique.name != startName) {
                return undefined; // Something is wrong with this data
            }

            if (newTechnique.action != "") {
                baseTechnique = newTechnique;
                break;
            } else {
                techniqueData.push(newTechnique);
            }
        }
        if (baseTechnique == undefined) {
            return undefined; // no base technique found
        }

        while (techniqueData.length > 0) {
            baseTechnique.importEffectsFromTechnique(techniqueData.pop());
        }
    } else {
        baseTechnique = newTechnique;
    }

    while (maxIterations > 0) {
        maxIterations--;
        finalRow++;
        newTechnique = GetTechniqueFromSheetRow(sheet, finalRow, assessColumn);
        if (newTechnique.name == baseTechnique.name) {
            baseTechnique.importEffectsFromTechnique(newTechnique);
        } else {
            break;
        }
    }

    return {tech: baseTechnique, row: baseRow, finalRow: finalRow};
}

function GetTechniqueFromSheetRow(sheet, row, assessColumn) {
    let techLine = sheet.getRange(row, 1, 1, assessColumn - 1).getValues()[0];
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        return new TechniqueData(techLine);
    } else if (sheet.getSheetName() == "Items") {
        let itemData = new ItemData(techLine);
        return itemData.technique;
    }
}

function GetGearForAssessment(sheet, row, assessColumn) {
    let baseItem;
    let baseRow = row;
    let finalRow = row;
    let maxIterations = 15;
    let startItem;
    let newItem;
    startItem = GetUsableItemFromSheetRow(sheet, row, assessColumn);
    if (startItem.name == "") {
        return undefined; // no working on blank cells
    }
    if (startItem.technique.action == "") {
        let startName = startItem.name;
        // This is a support entry. We must find the base technique
        let techniqueData = [];
        techniqueData.push(startItem.technique);
        while (maxIterations > 0) {
            maxIterations--;
            baseRow--;
            newItem = GetUsableItemFromSheetRow(sheet, baseRow, assessColumn);
            if (newItem.name != startName) {
                if (startItem.group == "") {
                    return undefined; // no working on title rows
                }
                return {item: startItem, row: row, finalRow: row};
            }

            if (newItem.action != "") {
                baseItem = newItem;
                break;
            } else {
                techniqueData.push(newItem.technique);
            }
        }
        if (baseItem == undefined) {
            if (startItem.group == "") {
                return undefined; // no working on title rows
            }
            return {item: startItem, row: row, finalRow: row};
        }

        while (techniqueData.length > 0) {
            baseItem.technique.importEffectsFromTechnique(techniqueData.pop());
        }
    } else {
        baseItem = startItem;
    }

    while (maxIterations > 0) {
        maxIterations--;
        finalRow++;
        newItem = GetUsableItemFromSheetRow(sheet, finalRow, assessColumn);
        if (newItem.name == baseItem.name) {
            baseItem.technique.importEffectsFromTechnique(newItem.technique);
        } else {
            break;
        }
    }

    return {item: baseItem, row: baseRow, finalRow: finalRow};
}

function GetUsableItemFromSheetRow(sheet, row, assessColumn) {
    let techLine = sheet.getRange(row, 1, 1, assessColumn - 1).getValues()[0];
    return new UsableItemData(techLine);
}

function getNamedColumn(sheet, name) {
    const headerRow = 1; // Row containing column names

    const lastColumn = sheet.getLastColumn();

    if (lastColumn < 1) { // Check if the sheet is empty
        return -1; // Return -1 if no columns are found
    }

    const headerValues = sheet.getRange(headerRow, 1, 1, lastColumn).getValues()[0];

    for (let i = 0; i < headerValues.length; i++) {
        if (headerValues[i] === name) {
            return i + 1; // Column numbers are 1-based, array indices are 0-based
        }
    }

    return -1; // Return -1 if column is not found
}

class GearValueAssessment {
    constructor(item, sheet, row, valueColumn) {
        this.item = item;
        this.sheet = sheet == undefined ? "" : sheet;
        this.row = row == undefined ? 0 : row;
        this.valueColumn = valueColumn == undefined ? 0 : valueColumn;
        this.baseMaterialValue = 15;

        this.materialCost = 0;
        this.componentCost = 0;
        this.materialCostCalc = "";
        this.componentCostCalc = "";
        this.getBaseMaterialValue();
        this.getComponentValues();
        this.assessment = this.smoothCost(this.materialCost + this.componentCost);
    }

    printCellValues() {
        let range = this.sheet.getRange(this.row, this.valueColumn, 1, 1);
        range.setNote(this.printNotes());
        range.setValue(this.assessment);
    }

    printNotes() {
        return `${this.materialCostCalc}\n${this.componentCostCalc}`;
    }

    getBaseMaterialValue() {
        this.materialCost = this.item.bulk * this.item.valMod * this.baseMaterialValue;
        this.materialCostCalc = `${this.item.bulk}[bulk] * ${this.item.valMod}[mod] * ${this.baseMaterialValue}[matVal] = ${this.materialCost}`;
    }

    getComponentValues() {
        if (this.item.components.trim() == "") {
            return;
        }
        let components = this.item.components.split(";");
        this.componentCost = 0;

        components.forEach(componentData => {
            componentData = componentData.trim();
            let firstSpace = componentData.indexOf(" ");
            let count = parseInt(componentData.substring(0, firstSpace).trim());
            let componentTypeName = componentData.substring(firstSpace).trim().split("_");
            let componentType = componentTypeName[0];
            let componentName = componentTypeName[1];

            let component;
            if (componentType == "Goods") {
                component = WuxGoods.Get(componentName);
            } else if (componentType == "GoodsCat") {
                let filteredGoods = WuxGoods.Filter([new DatabaseFilterData("category", name)]);
                component = WuxGoods.Get(filteredGoods[0]);
            } else if (componentType == "Item") {
                component = WuxItems.Get(componentName);
            }

            if (component != undefined && component.group != "") {
                let val = count * component.value;
                this.componentCostCalc += `\n${count}[${component.name}] * ${component.value}[${component.name}] = ${val}`;
                this.componentCost += val;
            }
        });
    }

    smoothCost(num) {
        if (num < 20) {
            return num; // Leave small values unchanged
        } else if (num < 120) {
            return Math.ceil(num / 5) * 5;
        } else if (num < 300) {
            return Math.ceil(num / 10) * 10;
        } else if (num < 500) {
            return Math.ceil(num / 20) * 20;
        } else if (num < 1000) {
            return Math.ceil(num / 25) * 25;
        } else if (num < 2000) {
            return Math.ceil(num / 50) * 50;
        } else if (num < 5000) {
            return Math.ceil(num / 100) * 100;
        } else {
            return Math.ceil(num / 250) * 250;
        }
    }
}

function SetStyleEffects(sheet) {
    if (sheet.getSheetName() == "Styles" || sheet.getSheetName() == "Jobs") {
        SetAllStyleKeywords(sheet, 2);
        return true;
    }
    return  false;
}

function SetStyleEffectFromPosition(sheet) {
    if (sheet.getSheetName() == "Styles" || sheet.getSheetName() == "Jobs") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        SetStyleKeywordAtRow(sheet, row);
        return true;
    }
    return false;
}

function SetStyleEffectsFromPosition(sheet) {
    if (sheet.getSheetName() == "Styles" || sheet.getSheetName() == "Jobs") {
        const range = sheet.getActiveRange();
        let row = range.getRow();
        SetAllStyleKeywords(sheet, row);
        return true;
    }
    return false;
}

function SetAllStyleKeywords(sheet, startRow) {
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    let effectColumn = getNamedColumn(sheet, "Effects");
    let skillColumn = getNamedColumn(sheet, "Skills");
    let affinityColumn = getNamedColumn(sheet, "Affinity");
    let permanentColumn = getNamedColumn(sheet, "IsPermanent");
    let rowIndex = startRow;
    while (rowIndex <= lastRow) {
        let rowData = sheet.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
        if (rowData[0] == "" || rowData[0].startsWith("#")) {
            let effectCell = sheet.getRange(rowIndex, effectColumn, 1, 1);
            effectCell.setValue("");
            rowIndex++;
            continue;
        }

        SetStyleKeywords(sheet, rowIndex, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn);
        rowIndex++;
    }
}

function SetStyleKeywordAtRow(sheet, startRow) {
    const lastCol = sheet.getLastColumn();
    let effectColumn = getNamedColumn(sheet, "Effects");
    let skillColumn = getNamedColumn(sheet, "Skills");
    let affinityColumn = getNamedColumn(sheet, "Affinity");
    let permanentColumn = getNamedColumn(sheet, "IsPermanent");
    let rowData = sheet.getRange(startRow, 1, 1, lastCol).getValues()[0];
    SetStyleKeywords(sheet, startRow, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn);
}

function SetStyleKeywords(sheet, rowIndex, rowData, effectColumn, skillColumn, affinityColumn, permanentColumn) {
    
    let effectCell = sheet.getRange(rowIndex, effectColumn, 1, 1);
    effectCell.setValue("Calculating...")
    let skillCell = sheet.getRange(rowIndex, skillColumn, 1, 1);
    let affinityCell = undefined;
    if (affinityColumn >= 0) {
        affinityCell = sheet.getRange(rowIndex, affinityColumn, 1, 1);
    }
    let permanentCell = undefined;
    if (permanentColumn >= 0) {
        permanentCell = sheet.getRange(rowIndex, permanentColumn, 1, 1);
    }
    
    let style = new TechniqueStyle(rowData);
    let techniqueFilter = WuxTechs.Filter(new DatabaseFilterData("style", style.name));

    if (techniqueFilter.length == 0) {
        effectCell.setValue("");
    } else {
        let styleAssessment = new StyleAssessment(
            style, techniqueFilter, effectCell, skillCell, affinityCell, permanentCell);
        styleAssessment.print();
    }
}

class StyleAssessment {
    
    constructor (style, techniqueFilter, effectCell, skillCell, affinityCell, permanentCell) {
        this.style = style;
        this.baseTechniqueKeywords = {};
        this.effectCell = effectCell;
        this.skillCell = skillCell;
        this.affinityCell = affinityCell;
        this.permanentCell = permanentCell;
        this.skills = [];
        this.affinities = [];
        this.isPermanent = false;
        
        if (style.baseStyle != "") {
            let baseTechniqueFilters = WuxTechs.Filter(new DatabaseFilterData("style", style.baseStyle));
            this.baseTechniqueKeywords = this.getStyleTechniqueKeywords(baseTechniqueFilters);
        }
        this.techniqueKeywords = this.getStyleTechniqueKeywords(techniqueFilter);

        if (this.skillCell != undefined) {
            this.skills = this.getStyleTechniqueSkills(techniqueFilter);
        }

        if (this.affinityCell != undefined) {
            this.affinities = this.getStyleTechniqueAffinities(techniqueFilter);
        }

        if (this.permanentCell != undefined) {
            this.isPermanent = this.getStyleTechniqueIsPermanent(techniqueFilter);
        }
    }

    print() {
        this.effectCell.setValue(this.printKeywords());
        this.skillCell.setValue(this.printSkills());
        if (this.affinityCell != undefined) {
            this.affinityCell.setValue(this.printAffinity());
        }
        this.permanentCell.setValue(this.printIsPermanent())
    }

    printKeywords() {
        let output = "";

        Object.keys(this.techniqueKeywords)
            .sort()
            .forEach(key => {
                if (Object.hasOwn(this.baseTechniqueKeywords, key)) {
                    return;
                }
                if (key == "Trait_Impatience") {
                    return;
                }
                if (output != "") {
                    output += "; ";
                }
                if (this.techniqueKeywords[key] == "") {
                    output += key;
                }
                else {
                    output += `${key}-${this.techniqueKeywords[key]}`
                }
            });
        return output;
    }

    printSkills() {
        let output = "";
        for(let i = 0; i < this.skills.length; i++)
        {
            if (this.skills[i].trim() == "") {
                continue;
            }
            if (output != "") {
                output += "; ";
            }
            output += this.skills[i];
        }
        return output;
    }

    printIsPermanent() {
        return this.isPermanent ? "TRUE" : "";
    }

    printAffinity() {
        let output = "";
        for(let i = 0; i < this.affinities.length; i++)
        {
            if (this.affinities[i].trim() == "") {
                continue;
            }
            if (output != "") {
                output += "; ";
            }
            output += this.affinities[i];
        }
        return output;
    }

    getStyleTechniqueKeywords(techniqueFilters) {
        let keywords = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            let technique = techniqueFilters[i];
            this.addTechniqueCoreDefenseToKeywords(technique, keywords);
            this.addTechniqueImpactTraitsToKeywordsArray(technique, keywords);
        }
        return keywords;
    }
    
    addTechniqueCoreDefenseToKeywords(technique, keywords) {
        if (technique.coreDefense == "") {
            return;
        }
        let impactType = `Trait_A-${technique.coreDefense}`;
        if (keywords[impactType] == undefined || keywords[impactType] == "") {
            keywords[impactType] = "";
        }
    }

    addTechniqueImpactTraitsToKeywordsArray(technique, keywords) {
        let impacts = technique.traits.split(";");
        for (let i = 0; i < impacts.length; i++) {
            let impact = impacts[i].trim().split("-");
            let impactType = impact[0];
            if (keywords[impactType] == undefined || keywords[impactType] == "") {
                if (impact.length > 1) {
                    keywords[impactType] = impact[1];
                }
                else {
                    keywords[impactType] = "";
                }
            }
        }
    }

    getStyleTechniqueSkills(techniqueFilters) {
        let skills = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            if (!skills.includes(techniqueFilters[i].skill)) {
                skills.push(techniqueFilters[i].skill);

            }
        }
        return skills;
    }

    getStyleTechniqueAffinities(techniqueFilters) {
        let affinities = [];
        for (let i = 0; i < techniqueFilters.length; i++) {
            let affinitySplit = techniqueFilters[i].affinity.split(";");
            for (let j = 0; j < affinitySplit.length; j++) {
                let affinity = affinitySplit[j].trim();
                if (!affinities.includes(affinity)) {
                    affinities.push(affinity);
                }
            }
        }
        return affinities;
    }

    getStyleTechniqueIsPermanent(techniqueFilters) {
        if (this.isPermanent) {
            return true;
        }
        for (let i = 0; i < techniqueFilters.length; i++) {
            if (techniqueFilters[i].forms.includes("Permanent")) {
                return true;
            }
        }
        return false;
    }
}

function SetDatabase(ss, sheet) {
    if (sheet.getSheetName() == "Database") {
        let dbAssessment = new DatabaseAssessment(ss, sheet);
        dbAssessment.printAllDatabases();
        return true;
    }
    return  false;
}

function SetDatabaseFromPosition(ss, sheet) {
    if (sheet.getSheetName() == "Database") {
        const range = sheet.getActiveRange();
        let col = range.getColumn();
        
        let dbAssessment = new DatabaseAssessment(ss, sheet);
        dbAssessment.printDataBasedOnColumn(col);
        return true;
    }
    return  false;
}

class DatabaseAssessment {
    constructor(ss, sheet) {
        this.ss = ss;
        this.sheetsDb = new SheetDatabaseObject(ss);
        this.sheet = sheet;
        this.definitionColumn = getNamedColumn(sheet, "Definitions");
        this.techColumn = getNamedColumn(sheet, "Tech");
        this.sheetColumn = getNamedColumn(sheet, "Sheet");
    }
    
    printAllDatabases() {
        this.setSheetDb(true, true, true);
        this.printDefinitionDatabase();
        this.printTechniqueDatabase();
        this.printCharacterSheetBase();
    }
    
    printDataBasedOnColumn(column) {
        if (column == this.definitionColumn) {
            this.setSheetDb(true, false, false);
            this.printDefinitionDatabase();
        }
        else if (column == this.techColumn) {
            this.setSheetDb(false, true, false);
            this.printTechniqueDatabase();
        }
        else if (column == this.sheetColumn) {
            this.setSheetDb(false, false, true);
            this.printCharacterSheetBase();
        }
    }
    
    printDataToColumn(data, splitCharacter, row, column) {
        let arr = SplitLargeEntry(data, splitCharacter);
        let output = [];
        for (let i = 0; i < 150; i++) {
            if (i < arr.length) {
                output.push([arr[i]]);
            }
            else {
                output.push([""]);
            }
        }

        let range = this.sheet.getRange(row, column, 150, 1);
        range.setValues(output);
    }
    
    setSheetDb(setDefinitions, setTech, setCharacterSheet) {

        if (setTech) {
            this.updateChangedTechniques();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setTechniques();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setStyles();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setBasicPerks();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setSkills();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setLanguage();
        }
        if (setDefinitions || setCharacterSheet) {
            this.sheetsDb.setLore();
        }
        if (setDefinitions || setTech || setCharacterSheet) {
            this.sheetsDb.setJobs();
        }
        if (setTech || setCharacterSheet) {
            this.sheetsDb.setGoods();
        }
        if (setCharacterSheet) {
            this.sheetsDb.setGear();
        }
        if (setTech || setCharacterSheet) {
            this.sheetsDb.setConsumables();
        }
        if (setDefinitions) {
            this.sheetsDb.setStatus();
        }
    }
    
    updateChangedTechniques() {
        this.updateChangedTechniqueVersion("Techniques", 2, (name) => {
            return WuxTechs.Get(name);
        });
        this.updateChangedTechniqueVersion("Gear", 2, (name) => {
            let item = WuxItems.Get(name);
            if (item == undefined || !item.hasTechnique) {
                return;
            }
            return item.technique;
        });
        this.updateChangedTechniqueVersion("Consumables", 2, (name) => {
            let item = WuxItems.Get(name);
            if (item == undefined || !item.hasTechnique) {
                return;
            }
            return item.technique;
        });
    }
    
    updateChangedTechniqueVersion(sheetName, startRow, getTechniqueCallback) {
        let sheet = this.ss.getSheetByName(sheetName);
        let versionCol = ColumnToLetter(getNamedColumn(sheet, "Version"));
        let rowIds = this.sheetsDb.getChangedVersionRows(sheetName, startRow);
        
        for (let index = 0; index < rowIds.length; index++) {
            let rowIndex = parseInt(rowIds[index][0]);
            if (isNaN(rowIndex)) {
                continue;
            }
            let nameId = `A${rowIndex}`;
            let nameRange = sheet.getRange(nameId);
            let tech = getTechniqueCallback(nameRange.getValue());
            if (tech != undefined) {
                tech.incrementVersion();
                let versionId = `${versionCol}${rowIndex}`;
                let versionRange = sheet.getRange(versionId);
                versionRange.setValue(tech.version);
            }
        }
    }

    printDefinitionDatabase() {
        let definitionDatabase = SheetsDatabase.CreateDefinitionTypes(
            this.sheetsDb.readDatabase("DefinitionTypes", 2));
        this.importBasicDefinitions(definitionDatabase, "GroupDefinitions");
        this.importBasicDefinitions(definitionDatabase, "Definitions");
        this.importBasicDefinitions(definitionDatabase, "SystemDefinitions");
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.styles, WuxDef.Get("Style"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.basicPerks, WuxDef.Get("Perk"));
        this.importDatabaseDefinitionsWithGroupCheck(definitionDatabase, this.sheetsDb.skills, WuxDef.Get("Skill"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.language, WuxDef.Get("Language"));
        let loreCategoryDef = WuxDef.Get("LoreCategory");
        let loreDef = WuxDef.Get("Lore");
        this.sheetsDb.lore.iterate(function (value) {
            let definition;
            if (value.group == value.name) {
                definition = value.createDefinition(loreCategoryDef);
            } else {
                definition = value.createDefinition(loreDef);
            }
            definitionDatabase.add(definition.name, definition);
        });
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.job, WuxDef.Get("Job"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.job, WuxDef.Get("JobStyle"));
        this.importDatabaseDefinitions(definitionDatabase, this.sheetsDb.status, WuxDef.Get("Status"));

        let definitionClassData = JavascriptDatabase.Create(definitionDatabase, WuxDefinition.GetDefinition);
        definitionClassData.addPublicFunction("getAttribute", WuxDefinition.GetAttribute);
        definitionClassData.addPublicFunction("getVariable", WuxDefinition.GetVariable);
        definitionClassData.addPublicFunction("getUntypedAttribute", WuxDefinition.GetUntypedAttribute);
        definitionClassData.addPublicFunction("getUntypedVariable", WuxDefinition.GetUntypedVariable);
        definitionClassData.addPublicFunction("getAbbreviation", WuxDefinition.GetAbbreviation);
        definitionClassData.addPublicFunction("getVariables", WuxDefinition.GetVariables);
        definitionClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariables);
        definitionClassData.addPublicFunction("getTitle", WuxDefinition.GetTitle);
        definitionClassData.addPublicFunction("getDescription", WuxDefinition.GetDescription);
        definitionClassData.addPublicFunction("getName", WuxDefinition.GetName);
        let variableMods = definitionDatabase.filter(new DatabaseFilterData("group", "VariableMod"));
        for (let i = 0; i < variableMods.length; i++) {
            definitionClassData.addPublicVariable(variableMods[i].variable, `"${variableMods[i].variable}"`);
        }

        let output = "";
        output += definitionClassData.print("WuxDef");

        let nameDatabase = NameDatabase.Create(
            this.sheetsDb.readDatabase("Names", 2),
            this.sheetsDb.readDatabase("RacesByRegion", 2));
        output += "\n" + nameDatabase.print("WuxNames");

        this.printDataToColumn(output, "]", 3, this.definitionColumn);
    }

    printTechniqueDatabase() {
        let output = "";

        let variableNameKeys = {};
        let techniqueClassData = JavascriptDatabase.Create(this.sheetsDb.techniques, WuxDefinition.GetTechnique);
        this.sheetsDb.techniques.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Technique"));
            variableNameKeys[definition.getVariable()] = key;
        });
        techniqueClassData.addVariable("variableNameKeys", JSON.stringify(variableNameKeys));
        techniqueClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        techniqueClassData.addPublicFunction("sortFilteredTechniquesByRequirement", WuxDefinition.SortFilteredTechniquesByRequirement);
        techniqueClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesTechnique);
        output += techniqueClassData.print("WuxTechs") + "\n";

        let styleDb = this.sheetsDb.getStyles();
        variableNameKeys = {};
        styleDb.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Style"));
            variableNameKeys[definition.getVariable()] = key;
        });
        this.sheetsDb.job.iterate(function (job, key) {
            let jobStyle = job.convertToStyle();
            styleDb.add(jobStyle.name, jobStyle);
            let definition = job.createDefinition(WuxDef.Get("Job"));
            variableNameKeys[definition.getVariable()] = key;
        });
        let styleClassData = JavascriptDatabase.Create(styleDb, WuxDefinition.GetStyle);
        styleClassData.addVariable("variableNameKeys", JSON.stringify(variableNameKeys));
        styleClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        styleClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesStyle);
        output += styleClassData.print("WuxStyles") + "\n";

        let perkDb = this.sheetsDb.basicPerks;
        variableNameKeys = {};
        perkDb.iterate(function (value, key) {
            let definition = value.createDefinition(WuxDef.Get("Perk"));
            variableNameKeys[definition.getVariable()] = key;
        });
        let basicPerksClassData = JavascriptDatabase.Create(perkDb, WuxDefinition.GetBasicPerk);
        basicPerksClassData.addPublicFunction("getByVariableName", function (variableName) {
            let key = variableNameKeys[variableName];
            return get(key);
        });
        basicPerksClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariablesStyle);
        output += basicPerksClassData.print("WuxPerks") + "\n";

        let goodsClassData = JavascriptDatabase.Create(this.sheetsDb.goods, WuxDefinition.GetGoods);
        output += goodsClassData.print("WuxGoods") + "\n";

        let itemsDatabase = this.sheetsDb.getGear();
        this.sheetsDb.consumables.iterate(function (item) {
            let valueAssessment = new GearValueAssessment(item);
            item.value = valueAssessment.assessment;
            itemsDatabase.add(item.name, item);
        });
        let itemClassData = JavascriptDatabase.Create(itemsDatabase, WuxDefinition.GetItem);
        output += itemClassData.print("WuxItems") + "\n";

        this.printDataToColumn(output, "}", 3, this.techColumn);
    }

    printCharacterSheetBase() {
        let output = BuildCharacterSheet.PrintBase(this.sheetsDb);
        this.printDataToColumn(output, "\n", 3, this.sheetColumn);
    }
    
    importBasicDefinitions(definitionDatabase, sheetName) {
        definitionDatabase.importSheets(this.sheetsDb.readDatabase(sheetName, 2),
            function (arr) {
                let definition = new DefinitionData(arr);
                let baseDefinition = definitionDatabase.get(definition.group);
                if (baseDefinition != undefined && baseDefinition.group == "Type") {
                    return definition.createDefinition(baseDefinition);
                }
                return definition;
            }
        );
    }

    importDatabaseDefinitions(definitionDatabase, database, baseDefinition) {
        database.iterate(function (value) {
            let definition = value.createDefinition(baseDefinition);
            definitionDatabase.add(definition.name, definition);
        });
    }

    importDatabaseDefinitionsWithGroupCheck(definitionDatabase, database, baseDefinition) {
        database.iterate(function (value) {
            if (value.group != "") {
                let definition = value.createDefinition(baseDefinition);
                definitionDatabase.add(definition.name, definition);
            }
        });
    }
}




