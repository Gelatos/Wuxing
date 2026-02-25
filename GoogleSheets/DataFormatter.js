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
                    splitIndex = splitString.lastIndexOf(splitCharacter);
                    if (splitIndex > 0) {
                        splitString = output.substring(0, splitIndex + splitCharacter.length);
                        output = output.substring(splitIndex + splitCharacter.length);
                    }
                    else {
                        output = output.substring(50000);
                    }
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

function SetDefinitionsDatabase(definitionTypesArray, groupDefinitionArray, definitionArray, systemDefinitionArray,
                                styleArray, skillsArray, languageArray, loreArray, jobsArray, statusArray, namesArray, regionArray) {
    
    let definitionDatabase = SheetsDatabase.CreateDefinitionTypes(definitionTypesArray);
    definitionDatabase.importSheets(groupDefinitionArray, function (arr) {
        let definition = new DefinitionData(arr);
        let baseDefinition = definitionDatabase.get(definition.group);
        if (baseDefinition != undefined && baseDefinition.group == "Type") {
            return definition.createDefinition(baseDefinition);
        }
        return definition;
    });
    definitionDatabase.importSheets(definitionArray, function (arr) {
        let definition = new DefinitionData(arr);
        let baseDefinition = definitionDatabase.get(definition.group);
        if (baseDefinition != undefined && baseDefinition.group == "Type") {
            return definition.createDefinition(baseDefinition);
        }
        return definition;
    });
    definitionDatabase.importSheets(systemDefinitionArray, function (arr) {
        let definition = new DefinitionData(arr);
        let baseDefinition = definitionDatabase.get(definition.group);
        if (baseDefinition != undefined && baseDefinition.group == "Type") {
            return definition.createDefinition(baseDefinition);
        }
        return definition;
    });
    definitionDatabase.importSheets(styleArray, function (arr) {
        let style = new TechniqueStyle(arr);
        if (style.group == "") {
            return undefined;
        }
        return style.createDefinition(definitionDatabase.get("Style"));
    });
    definitionDatabase.importSheets(skillsArray, function (arr) {
        let skill = new SkillData(arr);
        if (skill.group == "") {
            return undefined;
        }
        return skill.createDefinition(definitionDatabase.get("Skill"));
    });
    definitionDatabase.importSheets(languageArray, function (arr) {
        let language = new LanguageData(arr);
        return language.createDefinition(definitionDatabase.get("Language"));
    });
    definitionDatabase.importSheets(loreArray, function (arr) {
        let lore = new LoreData(arr);
        if (lore.group == lore.name) {
            return lore.createDefinition(definitionDatabase.get("LoreCategory"));
        } else {
            return lore.createDefinition(definitionDatabase.get("Lore"));
        }
    });
    definitionDatabase.importSheets(jobsArray, function (arr) {
        let job = new JobData(arr);
        return job.createDefinition(definitionDatabase.get("Job"));
    });
    definitionDatabase.importSheets(jobsArray, function (arr) {
        let job = new JobData(arr);
        return job.createDefinition(definitionDatabase.get("JobStyle"));
    });
    definitionDatabase.importSheets(statusArray, function (arr) {
        let status = new StatusData(arr);
        return status.createDefinition(definitionDatabase.get("Status"));
    });

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

    let nameDatabase = NameDatabase.Create(namesArray, regionArray);
    output += "\n" + nameDatabase.print("WuxNames");

    return PrintLargeEntry(output, "]");
}

function SetItemTechDatabase(styleArray, jobArray, techniqueArray, goodsArray, gearArray, consumablesArray) {
    let output = "";

    let techDb = SheetsDatabase.CreateTechniques(techniqueArray);
    let techniqueClassData = JavascriptDatabase.Create(techDb, WuxDefinition.GetTechnique);
    techniqueClassData.addPublicFunction("filterAndSortTechniquesByRequirement", WuxDefinition.FilterAndSortTechniquesByRequirement);
    output += techniqueClassData.print("WuxTechs") + "\n";

    let styleDb = SheetsDatabase.CreateStyles(styleArray, techDb);
    let variableNameKeys = {};
    styleDb.iterate(function (value, key) {
        let definition = value.createDefinition(WuxDef.Get("Style"));
        variableNameKeys[definition.getVariable()] = key;
    });
    let jobDb = SheetsDatabase.CreateJobs(jobArray);
    jobDb.iterate(function (job, key) {
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
    output += styleClassData.print("WuxStyles") + "\n";

    let goodsClassData = JavascriptDatabase.Create(SheetsDatabase.CreateGoods(goodsArray), WuxDefinition.GetGoods);
    output += goodsClassData.print("WuxGoods") + "\n";

    let itemsDatabase = SheetsDatabase.CreateGear(gearArray);
    itemsDatabase.importSheets(consumablesArray, function (data) {
        let item = new UsableItemData(data);
        let valueAssessment = new GearValueAssessment(item);
        item.value = valueAssessment.assessment;
        return item;
    });
    let itemClassData = JavascriptDatabase.Create(itemsDatabase, WuxDefinition.GetItem);
    output += itemClassData.print("WuxItems") + "\n";

    return PrintLargeEntry(output, "}");
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
        return new Database(arr, ["group", "subGroup"], function (arr) {
            return new SkillData(arr);
        });
    };
    const createStyles = function (arr, techDb) {
        return new ExtendedTechniqueStyleDatabase(arr, techDb);
    };
    const createLanguages = function (arr) {
        return new Database(arr, ["group"], function (arr) {
            return new LanguageData(arr);
        });
    };
    const createLores = function (arr) {
        return new Database(arr, ["group"], function (arr) {
            return new LoreData(arr);
        });
    };
    const createJobs = function (arr) {
        return new Database(arr, ["group"], function (arr) {
            return new JobData(arr);
        });
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
            return new ExtendedDescriptionDatabase(arr);
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
        CreateDefinitionTypes: createDefinitionTypes
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
        if (this.techniques == undefined) {
            return;
        }
        this.styles = this.getStyles();
    }
    getStyles() {
        if (this.techniques == undefined) {
            return;
        }
        return SheetsDatabase.CreateStyles(this.readDatabase("Styles", 2), this.techniques);
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
}

var WuxPrintTechnique = WuxPrintTechnique || (function () {
    const setTechniqueDisplayHtml = function (techDisplayData, displayOptions) {
        let contents = "";
        contents += techniqueDisplayHeader.Print(techDisplayData, displayOptions);
        contents += techniqueDisplayContents.Print(techDisplayData, displayOptions);

        return setTechniqueDisplayFeatureDiv(techDisplayData, displayOptions, contents);
    };
    const setTechniqueDisplayFeatureDiv = function (techDisplayData, displayOptions, contents) {
        return `<div ${setFeatureStyle("wuxFeature", displayOptions)}>${contents}</div>\n`;
    };

    var techniqueDisplayHeader = techniqueDisplayHeader || (function () {
        const setTechniqueDisplayHeaderExpandSection = function (techDisplayData, displayOptions) {
            if (displayOptions.hasCSS) {
                // add the collapsible field
                let attributeName = techDisplayData.definition.getAttribute(WuxDef._expand);
                let isChecked = displayOptions.autoExpand ? `checked value="on"` : "";

                return `<div class="wuxFeatureHeaderInteractBlock">
                <div class="wuxFeatureHeaderInteractInnerBlock">
                <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="${attributeName}" ${isChecked}>
                <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${attributeName}" ${isChecked}>
                <span class="wuxFeatureHeaderInteractiveIcon">&#9662;</span>
                <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${attributeName}" ${isChecked}>
                <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9656;</span>
                </div>
                ${setTechniqueDisplayHeaderUseSection(techDisplayData, displayOptions)}
            </div>`;
            }
            return "";
        };
        const setTechniqueDisplayHeaderSelectSection = function (techDisplayData, displayOptions) {
            if (displayOptions.hasSelect) {
                return `
            ${WuxSheetMain.CustomInput("hidden", techDisplayData.definition.getAttribute(WuxDef._subfilter), "wuxFeatureInteraction-flag", ` value="0"`)}
            <div class="wuxFeatureHeaderInteractBlock">
            <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="${techDisplayData.definition.getAttribute()}">
            <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${techDisplayData.definition.getAttribute()}">
            <span class="wuxFeatureHeaderInteractiveIcon">&#9635;</span>
            <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${techDisplayData.definition.getAttribute()}">
            <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9634;</span>
            </div>`;
            }
            return "";
        };
        const setTechniqueDisplayHeaderUseSection = function (techDisplayData, displayOptions) {

            // add technique data for the api
            techDisplayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
            techDisplayData.technique.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
            techDisplayData.technique.displayname = techDisplayData.displayname;
            let useDefinition = WuxDef.Get("Title_UseTechnique");

            return `
        ${WuxSheetMain.CustomInput("hidden", displayOptions.techniqueDefinition.getAttribute(WuxDef._subfilter), "wuxHiddenField-flag", ` value="0"`)}
        <div class="wuxHiddenAuxField">
            <button class="wuxFeatureHeaderInteractiveButton wuxTooltip" type="roll" value='${techDisplayData.getRollTemplate(true)}'>
                9
                <div class="wuxTooltipContent">
                    ${WuxDefinition.TooltipDescription(useDefinition)}
                </div>
            </button>
        </div>
        `;
        };
        const setTechniqueDisplayHeaderNameFields = function (techDisplayData, displayOptions) {
            let contents = `<div ${setFeatureStyle("wuxFeatureHeaderDisplayBlock", displayOptions)}>
            <span ${setFeatureStyle("wuxFeatureHeaderName", displayOptions)}>${techDisplayData.name}</span>
            <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.resourceData}</div>
            <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.targetData}</div>\n`;
            contents += setTechniqueDisplayHeaderBlockTraits(techDisplayData, displayOptions);
            contents += `\n</div>`;
            return contents;
        };
        const setTechniqueDisplayHeaderBlockTraits = function (techDisplayData, displayOptions) {
            if (techDisplayData.traits.length > 0) {
                return setFeatureLineWithHeader("wuxFeatureHeaderInfo", "Traits", setDefinitions(techDisplayData.traits, "; ", displayOptions), displayOptions);
            }
            return `<div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}><span><strong>Traits:</strong> None</span></div>`;
        };
        const setTechniqueDisplayHeaderExtentFeatures = function (techDisplayData, displayOptions) {
            let output = "";
            if (techDisplayData.trigger != "") {
                output += setFeatureLineWithHeader("wuxFeatureHeaderInfoTrigger", "Trigger", techDisplayData.trigger, displayOptions);
            }
            if (techDisplayData.requirements != "") {
                output += setFeatureLineWithHeader("wuxFeatureHeaderInfoReq", "Requirements", techDisplayData.requirements, displayOptions);
            }
            if (techDisplayData.itemTraits.length > 0) {
                output += setFeatureLineWithHeader("wuxFeatureHeaderInfoReq", "Req. Tool Traits", setDefinitions(techDisplayData.itemTraits, "<span> or </span>", displayOptions), displayOptions);
            }
            return output;
        };
        'use strict';

        const print = function (techDisplayData, displayOptions) {
            let output = "";
            output += setTechniqueDisplayHeaderExpandSection(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderSelectSection(techDisplayData, displayOptions);
            // output += setTechniqueDisplayHeaderUseSection(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderNameFields(techDisplayData, displayOptions);

            output = `<div ${setFeatureStyle(["wuxFeatureHeader", `wuxFeatureHeader-${techDisplayData.actionType}`], displayOptions)}>\n${output}\n</div>\n`;
            output += setTechniqueDisplayHeaderExtentFeatures(techDisplayData, displayOptions);
            return output;
        };

        return {
            Print: print
        }
    })();

    var techniqueDisplayContents = techniqueDisplayContents || (function () {
        const setTechniqueDisplayFunctionBlock = function (techDisplayData, displayOptions) {

            let output = "";
            output += setTechniqueDisplayFunctionBlockFlavorText(techDisplayData, displayOptions);

            if (output != "") {
                return `<div ${setFeatureStyle("wuxFeatureFunctionBlock", displayOptions)}>\n${output}\n</div>\n`;
            }
            return "";
        };
        const setTechniqueDisplayFunctionBlockFlavorText = function (techDisplayData, displayOptions) {
            if (techDisplayData.flavorText != "") {
                return setFeatureLine("wuxFeatureFunctionBlockFlavorText", techDisplayData.flavorText, displayOptions);
            }
            return "";
        };
        const setTechniqueDisplayFunctionBlockDefinitions = function (techDisplayData, displayOptions) {
            if (techDisplayData.definitions.length > 0) {
                return `<div ${setFeatureStyle("wuxFeatureFunctionBlock", displayOptions)}>
            ${setFeatureLineWithHeader("wuxFeatureFunctionBlockRow", "Definitions", setDefinitions(techDisplayData.definitions, "<span>, </span>", displayOptions), displayOptions)}
            </div>\n`;
            }
            return "";
        };
        var techniqueDisplayContentEffects = techniqueDisplayContentEffects || (function () {
            const setTechniqueDisplayCheckBlock = function (effectsOutput, displayOptions) {
                return `<div ${setFeatureStyle("wuxFeatureCheckBlock", displayOptions)}>
        <span ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>${effectsOutput}</span>
        </div>\n`;
            };
            'use strict';

            const printEffects = function (techDisplayData, displayOptions) {
                let output = "";
                let defenseDisplay = "";
                techDisplayData.effects.forEach(function (effectData) {
                    if (effectData.check != undefined) {
                        defenseDisplay = WuxSheetMain.Tooltip.Text(effectData.check, WuxSheetMain.Header2(effectData.check) + WuxSheetMain.Desc(effectData.checkDescription));

                        output += setFeatureLine("wuxFeatureCheckHeader", defenseDisplay, displayOptions);
                        effectData.effects.forEach(function (effect) {
                            output += setTechniqueDisplayCheckBlock(effect, displayOptions);
                        });
                    }
                });

                if (output != "") {
                    return `<div ${setFeatureStyle("wuxFeatureEffectsBlock", displayOptions)}>\n${output}\n</div>\n`;
                }
                return output;
            };

            return {
                PrintEffects: printEffects
            };
        })();
        'use strict';

        const print = function (techDisplayData, displayOptions) {
            let output = "";

            output += setTechniqueDisplayFunctionBlock(techDisplayData, displayOptions);
            output += techniqueDisplayContentEffects.PrintEffects(techDisplayData, displayOptions);
            output += setTechniqueDisplayFunctionBlockDefinitions(techDisplayData, displayOptions);

            if (displayOptions.hasCSS) {
                let attributeName = techDisplayData.definition.getAttribute(WuxDef._expand);
                let isChecked = displayOptions.autoExpand ? ` checked value="on"` : "";

                return `<input type="hidden" class="wuxFeatureHeaderInteractBlock-flag" name="${attributeName}"${isChecked}>\n<div class="wuxFeatureExpandingContent">\n${output}\n</div>\n`;
            } else {
                return output;
            }
        };
        return {
            Print: print
        }
    })();
    const setFeatureLineWithHeader = function (featureStyle, header, contents, displayOptions) {
        if (contents != "") {
            return `<div ${setFeatureStyle(featureStyle, displayOptions)}>\n<span><strong>${header}: </strong></span>\n<span>${contents}</span>\n</div>\n`;
        }
        return "";
    };
    const setFeatureLine = function (featureStyle, contents, displayOptions) {
        if (contents != "") {
            return `<div ${setFeatureStyle(featureStyle, displayOptions)}>\n<span>${contents}</span>\n</div>\n`;
        }
        return "";
    };
    const setDefinitions = function (definitions, delimiter, displayOptions) {
        if (definitions.length > 0) {
            let output = "";
            for (let i = 0; i < definitions.length; i++) {
                if (output != "") {
                    output += delimiter;
                }
                if (displayOptions.hasCSS) {
                    output += WuxSheetMain.Tooltip.Text(definitions[i].title, WuxDefinition.TooltipDescription(definitions[i]));
                } else {
                    output += `<a style="margin-right: 10px; text-decoration: underline dotted;" title="${definitions[i].description}">${definitions[i].name}</a>`;
                }
            }
            return output;
        }
        return "";
    };
    const setFeatureStyle = function (style, displayOptions) {
        if (displayOptions.hasCSS) {
            if (Array.isArray(style)) {
                let output = "";
                for (let i = 0; i < style.length; i++) {
                    if (output != "") {
                        output += " ";
                    }
                    output += style[i];
                }
                return `class="${output}"`;
            } else {
                return `class="${style}"`;
            }
        } else {
            if (Array.isArray(style)) {
                let output = "";
                for (let i = 0; i < style.length; i++) {
                    if (output != "") {
                        output += " ";
                    }
                    output += getFeatureStyleSheetStyle(style[i]);
                }
                return `style="${output}"`;
            } else {
                return `style="${getFeatureStyleSheetStyle(style)}"`;
            }
        }
    };
    const getFeatureStyleSheetStyle = function (style) {
        switch (style) {
            case "wuxFeature":
                return `position: relative;
display: inline-block;
min-width: 300px; 
max-width: 500px; 
width: calc(100% - 10px);

font-size: 12px;

border: 3px solid black; 
background: #cacbcf;

flex: 1;`;
            case "wuxFeatureHeader":
                return `position: relative;
display: block; 
width: calc(100% - 10px);
padding: 0px 0px 5px 10px; 
background: #c0e7d5;
border-bottom: 1px solid #efefef; `;
            case "wuxFeatureHeader-Quick":
                return `background-color: #fbe5e5;`;
            case "wuxFeatureHeader-Full":
                return `background-color: #d7a0a0;`;
            case "wuxFeatureHeader-Reaction":
                return `background-color: #e5eafb;`;
            case "wuxFeatureHeader-Free":
                return `background-color: #e5fbf1;`;
            case "wuxFeatureHeader-None":
                return `background-color: #f0e5fb;`;
            case "wuxFeatureHeader-Augment":
                return `background-color: #acacac;`;
            case "wuxFeatureType":
                return `position: absolute;
display: inline-block;
right: 0px;
width: 55px; 
padding: 5px; 

vertical-align: top; 
text-align: center; 

color: #FFF; 

background: #000000;`;
            case "wuxFeatureType-Active":
                return `background-color: #b60003;`;
            case "wuxFeatureType-Passive":
                return `background-color: #4db600;`;
            case "wuxFeatureType-Support":
                return `background-color: #00b0b6;`;
            case "wuxFeatureType-Job":
                return `background-color: #7800b6;`;
            case "wuxFeatureType-Permanent":
                return `background-color: #b66f00;`;
            case "wuxFeatureTypeHeader":
                return `position: relative;
display: block;

font-size: 9px; 
font-weight: bold;`;
            case "wuxFeatureTypeFooter":
                return `position: relative;
display: block;
font-size: 7px;`;
            case "wuxFeatureHeaderDisplayBlock":
                return `position: relative;
display:inline-block; 
width: calc(100% - 115px);`;
            case "wuxFeatureHeaderName":
                return `position: relative;
display: block; 

width: 100%;
margin-top: 5px; 

font-size: 13px; 
font-weight: bold;`;
            case "wuxFeatureHeaderInfo":
                return `position: relative;
display: block; 

font-size: 11px;`;
            case "wuxFeatureHeaderInfoType":
                return `position: relative;
font-weight: bold;`;
            case "wuxFeatureExpandingContent":
                return `position: relative;`;
            case "wuxFeatureFunctionBlock":
                return `position: relative;
display: block;

width: calc(100% - 22px);
padding: 5px 10px; 

line-height: 14px; 
font-size: 11px; 

border-bottom: 1px solid #c6c6c6; 
background: #fbf9e5;`;
            case "wuxFeatureFunctionBlockRow":
                return `position: relative;
display: block;`;
            case "wuxFeatureCheckBlock":
                return ``;
            case "wuxFeatureCheckBlockRow":
                return `position: relative;
display: inline-block;

width: calc(100% - 22px);`;
            case "wuxFeatureCheckBlockRange":
                return `position: relative;
display: inline-block;

padding-right: 10px;`;
            case "wuxFeatureCheckBlockTarget":
                return `position: relative;
display: inline-block;

width: calc(65% - 5px);`;
            case "wuxFeatureDescriptionBlock":
                return `position: relative;
display: block;
width: calc(100% - 20px);
padding: 5px 10px; 

font-size: 11px;`;
            case "wuxFeatureDescriptionBlockDesc":
                return `display: inline-block;
white-space: pre-line;
word-break: break-word;`;
            default:
                return "";
        }
    };
    'use strict';

    const getDisplayOptions = function () {
            return {

                techniqueDefinition: {},
                autoExpand: false,
                hasCSS: false,
                hasUseInteraction: false,
                showTrigger: false,
                showKiCharge: false
            }
        },

        get = function (technique, displayOptions) {
            if (technique == undefined) {
                return "";
            }
            if (displayOptions == undefined) {
                displayOptions = getDisplayOptions();
                displayOptions.hasCSS = true;
            }
            let techDisplayData = new TechniqueDisplayData(technique);
            return setTechniqueDisplayHtml(techDisplayData, displayOptions);
        };
    return {
        GetDisplayOptions: getDisplayOptions,
        Get: get
    };
}());

var WuxDefinition = WuxDefinition || (function () {
    const definitionContents = function (definitionData) {
        let expandContents = "";
        if (definitionData.subGroup != "") {
            expandContents += WuxSheetMain.Desc(`<em>${definitionData.subGroup}</em>`);
        }
        for (let i = 0; i < definitionData.descriptions.length; i++) {
            expandContents += "\n" + WuxSheetMain.Desc(definitionData.descriptions[i]);
        }
        if (definitionData.formula.hasFormula()) {
            switch (definitionData.group) {
                case "Skill":
                    expandContents += "";
                    break;
                case "LoreCategory":
                    expandContents += "\n" + WuxSheetMain.Desc(`If trained, ${definitionData.title} is calculated as:\n${definitionData.formula.getString()} + [${WuxDef.GetTitle("CR")}]`);
                    break;
                case "Lore":
                    expandContents += "\n" + WuxSheetMain.Desc(`If trained, ${definitionData.title} is calculated as:\n${definitionData.formula.getString()} + this lore's [Tier] + [${WuxDef.GetTitle("CR")}]`);
                    break;
                default:
                    expandContents += "\n" + WuxSheetMain.Desc(`${definitionData.title} is calculated as:\n${definitionData.formula.getString()}`);
            }
        }
        return expandContents;
    };
    const values = {};
    'use strict';

    const get = function () {
            return undefined;
        },
        getDefinition = function (key) {
            if (values[key] == undefined) {
                let definition = new DefinitionData();
                definition.name = `${key} Not Found`;
                return definition;
            }
            switch (values[key]["group"]) {
                case "Technique":
                    return new TechniqueDefinitionData(values[key]);
                case "Style":
                    return new TechniqueStyleDefinitionData(values[key]);
                case "Language":
                    return new LanguageDefinitionData(values[key]);
                case "Job":
                    return new JobDefinitionData(values[key]);
                case "Status":
                    return new StatusDefinitionData(values[key]);
                case "Goods":
                case "Gear":
                case "Consumable":
                    return new ItemDefinitionData(values[key]);
                default:
                    return new DefinitionData(values[key]);
            }
        },
        getStyle = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new TechniqueStyle(values[key]);
        },
        getTechnique = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new TechniqueData(values[key]);
        },
        getItem = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new UsableItemData(values[key]);
        },
        getGoods = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new GoodsData(values[key]);
        },
        getAttribute = function (key, mod, mod1) {
            let data = get(key);
            return data.getAttribute(mod, mod1);
        },
        getVariable = function (key, mod, mod1) {
            let data = get(key);
            return data.getVariable(mod, mod1);
        },
        getUntypedAttribute = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getAttribute(`-${getVariable(key, mod, mod1)}`);
        },
        getUntypedVariable = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getVariable(`-${getVariable(key, mod, mod1)}`);
        },
        getAbbreviation = function (key) {
            let data = get(key);
            if (data.abbreviation == "") {
                return data.title;
            } else {
                return data.abbreviation;
            }
        },
        getVariables = function (key, array, mod1) {
            let output = [];
            let data = get(key);
            for (let i = 0; i < array.length; i++) {
                output.push(data.getVariable(array[i], mod1));
            }
            return output;
        },
        getGroupVariables = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                output.push(data[i].getVariable(mod1, mod2));
            }
            return output;
        },
        getTitle = function (key) {
            let data = get(key);
            return data.title;
        },
        getDescription = function (key) {
            let data = get(key);
            return data.getDescription();
        },
        getName = function (name, baseDefinition) {
            return baseDefinition.isResource ? `${name}` : `${baseDefinition.abbreviation}_${name}`;
        },


        filterAndSortTechniquesByRequirement = function (techniquesFilterData) {
            let techniquesFilter = filter(techniquesFilterData);
            let technique = {};

            let techniquesByRequirements = new Dictionary();
            for (let i = 0; i <= 9; i++) {
                techniquesByRequirements.add(i, new Dictionary());
            }

            for (let i = 0; i < techniquesFilter.length; i++) {
                technique = new TechniqueData(techniquesFilter[i]);
                if (techniquesByRequirements.get(technique.tier) != undefined) {
                    if (!techniquesByRequirements.get(technique.tier).has(technique.affinity)) {
                        techniquesByRequirements.get(technique.tier).add(technique.affinity, []);
                    }
                    techniquesByRequirements.get(technique.tier).get(technique.affinity).push(technique);
                }
            }

            return techniquesByRequirements;
        },
        getByVariable = function (key) {

        },

        displayEntry = function (dictionary, key) {
            let output = "";
            let entryData = dictionary.get(key).descriptions;

            output += WuxSheetMain.Header2(key);
            for (let i = 0; i < entryData.length; i++) {
                output += "\n" + WuxSheetMain.Desc(entryData[i]);
            }

            return output;
        },
        tooltipDescription = function (definitionData) {
            return `${WuxSheetMain.Header2(definitionData.title)}\n${definitionContents(definitionData)}`;
        },
        displayCollapsibleTitle = function (definitionData) {
            if (definitionData == undefined) {
                return "";
            }
            let expandContents = definitionContents(definitionData);
            let expandFieldName = definitionData.getVariable(WuxDef._expand);

            let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
            ${WuxSheetMain.Header(definitionData.name, "span")}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

            return WuxSheetMain.InteractionElement.Build(true, output);
        },
        infoHeader = function (definition) {
            return `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(definition.getAttribute(WuxDef._info))}${definition.title}`)}
            ${WuxSheetMain.Info.DefaultContents(definition)}`;
        },

        buildHeader = function (definition) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`);
        },

        buildText = function (definition, textContents) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Desc(textContents);
        },

        buildTextInput = function (definition, fieldName) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("text", fieldName);
        },

        buildTextarea = function (definition, fieldName, className, placeholder) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Textarea(fieldName, className, placeholder);
        },

        buildNumberInput = function (definition, fieldName, defaultValue) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("number", fieldName, defaultValue);
        },

        buildNumberLabelInput = function (definition, fieldName, labelContent) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.MultiRow(WuxSheetMain.Input("number", fieldName, "", "0") + WuxSheetMain.InputLabel(labelContent));
        },

        buildSelect = function (definition, fieldName, definitionGroup, showEmpty) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Select(fieldName, definitionGroup, showEmpty);
        }
    ;
    return {
        GetDefinition: getDefinition,
        GetStyle: getStyle,
        GetTechnique: getTechnique,
        GetItem: getItem,
        GetGoods: getGoods,
        GetAttribute: getAttribute,
        GetVariable: getVariable,
        GetUntypedAttribute: getUntypedAttribute,
        GetUntypedVariable: getUntypedVariable,
        GetAbbreviation: getAbbreviation,
        GetVariables: getVariables,
        GetGroupVariables: getGroupVariables,
        GetTitle: getTitle,
        GetDescription: getDescription,
        GetName: getName,
        FilterAndSortTechniquesByRequirement: filterAndSortTechniquesByRequirement,
        DisplayEntry: displayEntry,
        TooltipDescription: tooltipDescription,
        DefinitionContents: definitionContents,
        DisplayCollapsibleTitle: displayCollapsibleTitle,
        InfoHeader: infoHeader,
        BuildHeader: buildHeader,
        BuildText: buildText,
        BuildTextInput: buildTextInput,
        BuildTextarea: buildTextarea,
        BuildNumberInput: buildNumberInput,
        BuildNumberLabelInput: buildNumberLabelInput,
        BuildSelect: buildSelect
    }
}());

var WuxSheetSidebar = WuxSheetSidebar || (function () {
    const expandableTab = function (title, contents) {
        return `<div class="wuxSegment">
        ${WuxSheetMain.CustomInput("checkbox", WuxDef.GetAttribute("Page_Sidebar"), "wuxSideBarExtend", ` checked="checked"`)}
        ${tabHeader(`<span>&#10217&#10217 ${title}</span>`)}
        ${WuxSheetMain.Tab(`<div class="wuxFloatSidebarContents">${contents}</div>`)}
        </div>`;
    };
    const tabHeader = function (contents) {
        return `<div class="wuxFloatSidebarHeader">\n${contents}\n</div>`;
    };
    const collapsibleSection = function (header, fieldName, contents, defaultOpen) {
        return `<div class="wuxInteractiveBlock wuxSizeTiny">
        ${collapsibleSectionTitle(header, fieldName)}
        ${collapsibleSectionContent(contents, fieldName, defaultOpen)}
        </div>`;
    };
    const collapsibleSectionTitle = function (titleContent, fieldName) {
        return `<div class="wuxInteractiveInnerBlock">
            <input class="wuxInteractiveContent-flag" type="checkbox" name="${fieldName}">
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveIcon">&#9656;</span>
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveAuxIcon">&#9662;</span>
            
            ${titleContent}
        </div>`;
    };
    const collapsibleSectionContent = function (contents, fieldName, defaultOpen) {
        return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">
            <div class="${defaultOpen ? "wuxInteractiveExpandingAuxContent" : "wuxInteractiveExpandingContent"}">
            ${contents}
        </div>`;
    };
    const buildStatusNames = function (statusDefs) {
        let output = "";
        for (let i = 0; i < statusDefs.length; i++) {
            // output += WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(statusDefs[i].getAttribute(),
            //     statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Header2(statusDefs[i].title), WuxSheetMain.Desc(statusDefs[i].shortDescription));

            // output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
            //     collapsibleSubheader(WuxSheetMain.Header2(statusDefs[i].title), statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Desc(statusDefs[i].shortDescription), false));

            output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
                `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock wuxSizeTiny">
                ${collapsibleSectionTitle(
                    WuxSheetMain.Subheader(WuxSheetMain.InteractionElement.CheckboxBlockIcon(statusDefs[i].getAttribute(), WuxSheetMain.Header2(statusDefs[i].title))),
                    statusDefs[i].getAttribute(WuxDef._info)
                )}
                ${collapsibleSectionContent(WuxSheetMain.Desc(statusDefs[i].shortDescription), statusDefs[i].getAttribute(WuxDef._info), false)}
                </div>`
            );
        }
        return output;
    };
    'use strict';

    const build = function (title, contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxFloatSidebar">
        ${expandableTab(title, contents)}
        </div>`;
        },

        attributeSection = function (name, contents) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <span class="wuxDistinctSubtitle">${name}</span>
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        attributeSectionWithError = function (name, contents, errorFieldName) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <span class="wuxDistinctSubtitle">${name}</span>
            <input type="hidden" class="wuxErrorField-flag" name="${errorFieldName}" value="0">
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        collapsibleHeader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxHeader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        collapsibleSubheader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxSubheader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        buildPointsSection = function (attrName, header) {
            if (header == undefined) {
                header = `Build`;
            }
            let name = `Pts`;
            let output = `<span name='${attrName}' value="0">0</span>\n<span class="wuxFontSize7">/ </span>\n<span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;
            return `<div class="wuxHeader">&nbsp;${header}</div>\n${attributeSectionWithError(name, output, `${attrName}_error`)}`;
        },

        buildChatSection = function () {
            let titleDefinition = WuxDef.Get("Title_Chat");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Chat.Build(), true);
        },

        buildLanguageSection = function () {
            let titleDefinition = WuxDef.Get("Title_LanguageSelect");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Language.Build(), true);
        },

        buildChecksSection = function () {
            let contents = "";
            
            let subGroups = WuxDef.Filter([new DatabaseFilterData("group", "SkillGroup")]);
            let skillGroupText = "";
            for (let i = 0; i < subGroups.length; i++) {
                if (skillGroupText != "") {
                    skillGroupText += "|";
                }
                skillGroupText += subGroups[i].getTitle();
            }
            let showStatValue = `!cshowgroup @{${WuxDef.GetVariable("SheetName")}}@@@?{What will you show?|Defenses|Senses}`;
            let rollSkillValue = `!cskillgroupcheck @{${WuxDef.GetVariable("SheetName")}}@@@?{Choose a Skill Group to Roll|${skillGroupText}|Lore};?{Advantage|0}`;
            contents += `<button class="wuxButton wuxSizePercent" type="roll" value="${showStatValue}"><span>Show Stat</span></button>`;
            contents += `<button class="wuxButton wuxSizePercent" type="roll" value="${rollSkillValue}"><span>Roll Skill</span></button>`;

            let titleDefinition = WuxDef.Get("Check");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        },

        buildBoonSection = function () {
            let boons = [];
            let boonsDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);
            for (let i = 0; i < boonsDefs.length; i++) {
                boons.push(WuxSheetMain.InteractionElement.CheckboxBlockIcon(boonsDefs[i].getAttribute(), WuxSheetMain.Header2(boonsDefs[i].title)));
            }
            let output = WuxSheetMain.MultiRowGroup(boons, WuxSheetMain.Table.FlexTable, 3);

            let titleDefinition = WuxDef.Get("Title_Boon");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), output, true);
        },

        buildTechSection = function () {
            let contents = "";
            let refreshTechDef = WuxDef.Get("RefreshTech");
            contents += WuxSheetMain.Button(refreshTechDef.getAttribute(), refreshTechDef.getTitle(), "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Action_Techniques");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        };
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader,
        BuildPointsSection: buildPointsSection,
        BuildBoonSection: buildBoonSection,
        BuildChatSection: buildChatSection,
        BuildLanguageSection: buildLanguageSection,
        BuildChecksSection: buildChecksSection,
        BuildTechSection: buildTechSection
    };
}());

var WuxSheetMain = WuxSheetMain || (function () {
    const sectionBlockHeaderFooter = function () {
        return `<div class="wuxSectionHeaderFooter"></div>`;
    };
    const customInput = function (type, fieldName, className, extras) {
        if (extras == undefined) {
            extras = "";
        }
        return `<input type="${type}" class="${className}" name="${fieldName}"${extras} />`
    };
    
    var interactionElement = interactionElement || (function () {
        'use strict';
        var
            build = function (isExpanding, contents) {
                return `<div class="wuxInteractiveBlock${isExpanding ? " wuxInteractiveExpandingBlock" : ""}">\n${contents}\n</div>`;
            },

            buildTooltipCheckboxInput = function (fieldName, infoFieldName, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${checkboxBlockIcon(fieldName, contents)}
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;
            },

            buildTooltipRadioInput = function (fieldName, infoFieldName, value, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${radioBlockIcon(fieldName, value, contents)}
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;
            },

            buildTooltipSelectInput = function (fieldName, infoFieldName, definitionGroup, showEmpty, className, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${select(fieldName, definitionGroup, showEmpty, className)}
                <div class="wuxInteractiveSelectContent">
                ${contents}
                </div>
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;

            },

            expandableBlockIcon = function (fieldName) {
                let flagName = "wuxInteractiveExpandIcon-flag";
                return `<div class="wuxInteractiveInnerExpandBlock">\n${customInput("checkbox", fieldName, "wuxInteractiveExpandingContent-flag")}
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandIcon">&#9662;</span>
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
                </div>`;
            },

            expandableBlockEmptyIcon = function () {
                return `<div class="wuxInteractiveInnerExpandBlock">\n<span class="wuxInteractiveExpandIcon">&nbsp;</span>\n</div>`;
            },

            innerBlock = function (contents) {
                return `<div class="wuxInteractiveInnerBlock">\n${contents}\n</div>`;
            },

            expandableBlockContents = function (fieldName, contents) {
                return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">\n<div class="wuxInteractiveExpandingContent">\n${contents}\n</div>`;
            },

            checkboxBlockIcon = function (fieldName, contents) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("checkbox", fieldName, "wuxInteractiveContent-flag")}
                    <div class="wuxInteractiveContent">
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveIcon">&#9635;</span>
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveAuxIcon">&#9634;</span>
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            },

            radioBlockIcon = function (fieldName, value, contents) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("radio", fieldName, "wuxInteractiveContent-flag", ` value="${value}"`)}
                    <div class="wuxInteractiveContent">
                    ${customInput("radio", fieldName, "wuxInput", ` value="${value}"`)}
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            }

        return {
            Build: build,
            BuildTooltipCheckboxInput: buildTooltipCheckboxInput,
            BuildTooltipRadioInput: buildTooltipRadioInput,
            BuildTooltipSelectInput: buildTooltipSelectInput,
            ExpandableBlockIcon: expandableBlockIcon,
            ExpandableBlockEmptyIcon: expandableBlockEmptyIcon,
            InnerBlock: innerBlock,
            ExpandableBlockContents: expandableBlockContents,
            CheckboxBlockIcon: checkboxBlockIcon
        }
    }());
    'use strict';

    const build = function (contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxMainContent">
        ${contents}
        </div>`;
        },

        tab = function (contents) {
            return `<div class="wuxTab">\n${contents}\n</div>`;
        },

        tabHeader = function (contents) {
            return `<div class="wuxTabHeader">\n${contents}\n</div>`;
        },

        collapsibleTab = function (fieldName, title, contents) {
            return `<div class="wuxSegment">
            ${customInput("checkbox", fieldName, "wuxTab-flag", ` checked="checked"`)}
            ${tabHeader(interactionElement.ExpandableBlockIcon(fieldName) + (title.startsWith("<") ? title : `<span>${title}</span>`))}
            ${tab(contents)}
            </div>`;
        },

        tabBlock = function (contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">\n<div class="wuxTabContent">\n${contents}\n</div>\n</div>`;
        },

        collapsibleHeader = function (headerName, hiddenField, additionalButtons) {
            let headerButtons = `<span class="wuxStyleHeaderButtonContainer">
                        ${additionalButtons != undefined ? additionalButtons : ""}
                        ${WuxSheetMain.HiddenSpanFieldToggle(hiddenField,
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8857;</span> Show", "wuxStyleHeaderButton"),
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8853;</span> Hide", "wuxStyleHeaderButton")
            )}
            </span>`;
            return headerButtons + headerName;
        },

        sectionBlock = function (contents) {
            return `<div class="wuxSectionBlock">\n${contents}\n</div>`;
        },

        sectionBlockHeader = function (contents) {
            return `<div class="wuxSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockStyleHeader = function (contents) {
            return `<div class="wuxStyleSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockContents = function (contents) {
            return `<div class="wuxSectionContent">\n${contents}\n</div>`;
        },

        collapsibleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockHeader(interactionElement.ExpandableBlockIcon(fieldName) + `<span>${title}</span>`)}
            ${sectionBlockContents(contents)}`);
        },

        collapsibleStyleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockStyleHeader(interactionElement.ExpandableBlockIcon(fieldName) + title)}
            ${sectionBlockContents(contents)}`);
        },

        // string formatting
        header = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader">${contents}</${htmlType}>`;
        },

        header2 = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader2">${contents}</${htmlType}>`;
        },

        subheader = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxSubheader">${contents}</${htmlType}>`;
        },

        desc = function (contents) {
            return `<span class="wuxDescription">${contents}</span>`;
        },

        descField = function (fieldName) {
            return `<span class="wuxDescription" name="${fieldName}"></span>`;
        },

        span = function (fieldName, contents) {
            if (contents == undefined) {
                contents = "";
            }
            return `<span name="${fieldName}">${contents}</span>`;
        },

        row = function (contents) {
            return `<div class="wuxRow">${contents}</div>`;
        },

        multiRow = function (contents) {
            return `<div class="wuxMultiRow">${contents}</div>`;
        },

        input = function (type, fieldName, value, placeholder) {
            value = value == undefined ? "" : ` value="${value}"`;
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return customInput(type, fieldName, "wuxInput", value + placeholder);
        },

        inputLabel = function (contents) {
            return `<div class="wuxInputLabel">${contents}</div>`;
        },

        textarea = function (fieldName, className, placeholder) {
            if (className == undefined) {
                className = "";
            } else {
                className = ` class="${className}"`;
            }
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return `<textarea${className} name="${fieldName}"${placeholder}></textarea>`;
        },

        select = function (fieldName, definitionGroup, showEmpty, className) {
            if (className == undefined) {
                className = "wuxInput";
            } else {
                className = `wuxInput ${className}`;
            }

            let output = `<select class="${className}" name="${fieldName}" value="0">`;

            if (showEmpty == undefined || showEmpty) {
                output += `\n<option value="0">-</option>`;
            }

            for (let i = 0; i < definitionGroup.length; i++) {
                output += `\n<option value="${definitionGroup[i].variable}">${definitionGroup[i].title}</option>`;
            }
            output += `\n</select>`;
            return output;
        },

        button = function (fieldName, contents, className) {
            if (className == undefined) {
                className = "";
            } else {
                className = " " + className;
            }
            return `<div class="wuxButton${className}">\n<input type="checkbox" name="${fieldName}">\n<span>${contents}</span>\n </div>`;
        },

        multiRowGroup = function (contents, containerCallback, rowSize) {
            let output = "";
            let rowContents = "";
            for (let i = 0; i < contents.length; i++) {
                rowContents += contents[i];
                if (i % rowSize == rowSize - 1) {
                    output += containerCallback(rowContents);
                    rowContents = "";
                }
            }
            if (rowContents != "") {
                output += containerCallback(rowContents);
            }

            return output;
        },

        hiddenField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenField">\n${contents}\n</div>\n`;
        },

        hiddenAuxField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenAuxField">\n${contents}\n</div>\n`;
        },

        hiddenFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenField(fieldName, onContents)}
                ${hiddenAuxField(fieldName, offContents)}`;
        },

        hiddenIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenIndexFieldWithVariable = function (fieldName, indexFieldName, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField" name="${indexFieldName}">\n${contents}\n</div>\n`;
        },

        hiddenUniqueIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenUniqueIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenAncestryField = function (ancestryType, contents) {
            let fieldName = "";
            switch (ancestryType) {
                case "Spirit":
                    fieldName = "wuxHiddenAncestrySpirit";
                    break;
            }
            return `<input type="hidden" class="wuxHiddenAncestry-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="${fieldName}">\n${contents}\n</div>\n`;
        },

        hiddenSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineField">\n${contents}\n</span>\n`;
        },

        hiddenAuxSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineAuxField">\n${contents}\n</span>\n`;
        },

        hiddenSpanFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenSpanField(fieldName, onContents)}
                ${hiddenAuxSpanField(fieldName, offContents)}`;
        },

        subMenuButton = function (fieldName, contents) {
            return `<div class="wuxSubMenuButton">
                <input type="checkbox" name="${fieldName}">
                <span class="wuxSubMenuText">l</span>
                <input type="hidden" class="wuxSubMenu-flag" name="${fieldName}" value="0">
                <div class="wuxSubMenuContent">\n${contents}\n</div>
            </div>`;
        },

        subMenuOptionButton = function (fieldName, contents, checkboxValue) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="checkbox" name="${fieldName}"${checkboxValue != undefined ? ` value="${checkboxValue}"` : ""}>
                ${contents}
            </div>`;
        },

        subMenuOptionRollButton = function (fieldName, contents, value) {
            return `<button class="wuxButton wuxSubMenuOptionButton" type="roll" value="${value}">
                <span>${contents}</span>
            </button>`;
        },

        subMenuOptionRollButtonWithVariableInput = function (fieldName, contents, variableName) {
            return `<input type="hidden" name="${fieldName}" value="0"/>
            <button class="wuxButton wuxSubMenuOptionButton" type="roll" value="@{${variableName}}">
                <span name="${WuxDef.GetAttribute("Chat_PostName")}">${contents}</span>
            </button>`;
        },

        subMenuOptionText = function (fieldName, placeholder) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="text" name="${fieldName}"${placeholder != undefined ? ` placeholder="${placeholder}"` : ""}>
            </div>`;
        };

    var info = info || (function () {
            'use strict';

            var
                button = function (fieldName) {
                    return `<div class="wuxInfoButton"><input type="checkbox" name="${fieldName}"><span>?</span></div>`;
                },

                contents = function (fieldName, contents) {
                    let output = `<div class="wuxInfoContent">\n${contents}\n</div>`;
                    return WuxSheetMain.HiddenField(fieldName, output);
                },

                defaultContents = function (definition) {
                    let output = "";
                    output += WuxDefinition.TooltipDescription(definition);
                    return contents(definition.getAttribute(WuxDef._info), output);
                }

            return {
                Button: button,
                Contents: contents,
                DefaultContents: defaultContents
            };
        }()),

        tooltip = tooltip || (function () {
            'use strict';

            var
                button = function (fieldName, contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <input type="checkbox" name="${fieldName}">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                icon = function (contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                text = function (text, contents) {
                    return `<span class="wuxTooltip">
                <span class="wuxTooltipText">\n${text}\n</span>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </span>`;
                }

            return {
                Button: button,
                Icon: icon,
                Text: text
            };
        }()),

        table = table || (function () {
            'use strict';

            var
                build = function (headers, data) {
                    let output = ``;
                    for (let i = 0; i < headers.length; i++) {
                        output += flexTableGroup(`${flexTableHeader(headers[i])}\n${flexTableData(data[i])}\n`);
                    }
                    return flexTable(output);
                },

                flexTable = function (contents) {
                    return `<div class="wuxFlexTable">\n${contents}\n</div>`;
                },

                flexTableGroup = function (contents, className) {
                    return `<div class="wuxFlexTableItemGroup${className != undefined ? `${className}` : ""}">\n${contents}\n</div>`;
                },

                flexTableHeader = function (data) {
                    return `<span class="wuxFlexTableItemHeader">${data}</span>`;
                },

                flexTableSubheader = function (data) {
                    return `<span class="wuxFlexTableItemSubheader">${data}</span>`;
                },

                flexTableData = function (data) {
                    return `<span class="wuxFlexTableItemData">${data}</span>`;
                },

                flexTableInput = function (type, fieldName, placeholder) {
                    return `<input type="${type}" class="wuxFlexTableItemData wuxSizeSmall" name="${fieldName}" placeholder="${placeholder}">`;
                }

            return {
                Build: build,
                FlexTable: flexTable,
                FlexTableGroup: flexTableGroup,
                FlexTableHeader: flexTableHeader,
                FlexTableSubheader: flexTableSubheader,
                FlexTableData: flexTableData,
                FlexTableInput: flexTableInput
            };
        }()),

        distinctSection = distinctSection || (function () {
            'use strict';
            var
                build = function (contents) {
                    return `<div class="wuxDistinctSection">${contents}</div>`;
                },

                field = function (title, contents) {
                    return `<div class="wuxDistinctField">
                    <span class="wuxDistinctTitle">${title}</span>
                    <span class="wuxDistinctData">${contents}</span>
                    </div>`;
                },

                inputField = function (title, contentType, contentName, placeholder) {
                    return `<div class="wuxDistinctField">
                    <span class="wuxDistinctTitle">${title}</span>
                    <input class="wuxDistinctData" type="${contentType}" name="${contentName}" ${placeholder ? `placeholder="${placeholder}"` : ""}>
                    </div>`;
                }
            return {
                Build: build,
                Field: field,
                InputField: inputField
            };
        }()),

        chat = chat || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";

                    contents += tags();
                    contents += chatType();
                    contents += chatPostTarget();
                    contents += WuxSheetMain.Row("&nbsp;");
                    contents += textArea();
                    
                    let postTargetAttr = WuxDef.GetAttribute("Chat_PostTarget");
                    contents += WuxSheetMain.HiddenAuxField(postTargetAttr, 
                        repeatingEmoteButtons("RepeatingActiveEmotes"));
                    contents += WuxSheetMain.HiddenField(postTargetAttr, 
                        repeatingEmoteButtons("RepeatingActiveEmotesNotes"));

                    return contents;
                },

                tags = function () {
                    return WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Target"));
                },

                chatType = function () {
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_Type"),
                        WuxDef.Filter([new DatabaseFilterData("group", "ChatType")]), false));
                },

                chatPostTarget = function () {
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_PostTarget"),
                        WuxDef.Filter([new DatabaseFilterData("group", "EmotePostType")]), false));
                },

                textArea = function () {
                    return WuxSheetMain.Textarea(WuxDef.GetAttribute("Chat_Message"), "wuxInput wuxHeight150");
                },

                repeatingEmoteButtons = function (groupName) {
                    return `<div class="wuxNoRepControl wuxEmotePostGroup">
                        <fieldset class="${WuxDef.GetVariable(groupName)}">
                            ${groupName == "RepeatingActiveEmotes" ? emotePostButton() : emoteNotePostButton()}
                            <input type="hidden" name="${WuxDef.GetAttribute("Chat_PostURL")}">
                        </fieldset>
                    </div>`;
                },

                emotePostButton = function () {
                    return `<button class="wuxPostButton" type="roll" value="${senderPostMessage()}">
                    <span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>
                    </button>`;
                },

                emoteNotePostButton = function () {
                    return WuxSheetMain.Button(WuxDef.GetAttribute("Chat_PostEmoteNote"), 
                        `<span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>`, "wuxPostButton");
                },

                senderPostMessage = function () {
                    let chatMessage = `&{template:@{${WuxDef.GetVariable("Chat_Type")}}} `;
                    chatMessage += `{{url=@{${WuxDef.GetVariable("Chat_PostURL")}}}} `;
                    chatMessage += `{{emote=@{${WuxDef.GetVariable("Chat_PostName")}}}} `;
                    chatMessage += `{{name=@{${WuxDef.GetVariable("DisplayName")}}}} `;
                    chatMessage += `{{title=@{${WuxDef.GetVariable("DisplayName")}}@{${WuxDef.GetVariable("Chat_Target")}}}} `;
                    chatMessage += `{{language=@{${WuxDef.GetVariable("Chat_Language")}}}} `;
                    chatMessage += `{{message=@{${WuxDef.GetVariable("Chat_Message")}}}} `;
                    chatMessage += `@{${WuxDef.GetVariable("Chat_LanguageTag")}}`;
                    return chatMessage;
                }
            return {
                Build: build
            }
        }()),

        language = language || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

                    let languageAttr = WuxDef.GetAttribute("Chat_Language");
                    let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                    for (let i = 0; i < languageFilters.length; i++) {
                        contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                            WuxSheetMain.InteractionElement.BuildTooltipRadioInput(languageAttr, languageFilters[i].title,
                                languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
                        );
                    }
                    return contents;
                },

                languageTitle = function (languageDef) {
                    return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
                }
            return {
                Build: build
            }

        }())

    ;
    return {
        Build: build,
        Tab: tab,
        TabHeader: tabHeader,
        CollapsibleTab: collapsibleTab,
        TabBlock: tabBlock,
        CollapsibleHeader: collapsibleHeader,
        SectionBlock: sectionBlock,
        SectionBlockHeader: sectionBlockHeader,
        SectionBlockHeaderFooter: sectionBlockHeaderFooter,
        SectionBlockContents: sectionBlockContents,
        CollapsibleSection: collapsibleSection,
        CollapsibleStyleSection: collapsibleStyleSection,
        Header: header,
        Header2: header2,
        Subheader: subheader,
        Desc: desc,
        DescField: descField,
        Span: span,
        Row: row,
        MultiRow: multiRow,
        Input: input,
        CustomInput: customInput,
        InputLabel: inputLabel,
        Textarea: textarea,
        Select: select,
        Button: button,
        MultiRowGroup: multiRowGroup,
        HiddenField: hiddenField,
        HiddenAuxField: hiddenAuxField,
        HiddenFieldToggle: hiddenFieldToggle,
        HiddenIndexField: hiddenIndexField,
        HiddenIndexFieldWithVariable: hiddenIndexFieldWithVariable,
        HiddenUniqueIndexField: hiddenUniqueIndexField,
        HiddenAncestryField: hiddenAncestryField,
        HiddenSpanField: hiddenSpanField,
        HiddenAuxSpanField: hiddenAuxSpanField,
        HiddenSpanFieldToggle: hiddenSpanFieldToggle,
        SubMenuButton: subMenuButton,
        SubMenuOptionButton: subMenuOptionButton,
        SubMenuOptionRollButton: subMenuOptionRollButton,
        SubMenuOptionRollButtonWithVariableInput: subMenuOptionRollButtonWithVariableInput,
        SubMenuOptionText: subMenuOptionText,
        Info: info,
        Tooltip: tooltip,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement,
        Chat: chat,
        Language: language
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    const overviewInfoContents = function (fieldName, tabFieldName) {
        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Overview");
        output += WuxSheet.PageDisplay("Overview", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Overview")));
        output += WuxSheet.PageDisplay("Details", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Details")));
        output += WuxSheet.PageDisplay("Post", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Post")));
        // output += WuxSheet.PageDisplay("Options", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Options")));
        return WuxSheetMain.Info.Contents(fieldName, output);
    };
    const mainPageNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["Actions", "Gear", "Forme", "Character"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    const buildMainSheetHeader = function (subheader, infoFieldName) {
        let header = `<input type="text" name="${WuxDef.GetAttribute("DisplayName")}" placeholder="Display Name" />`;
        return buildHeader(header, subheader, infoFieldName);
    };
    const trainingPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Training");
        let mainContents = "";
        mainContents += buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Knowledge", "Styles", "Training"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Training", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const advancementPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Advancement");
        let mainContents = buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Attributes", "Skills", "Styles", "Jobs", "Advancement"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Advancement", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const techniquesCorePageNavigation = function () {
        let tabFieldName = WuxDef.GetAttribute("Page");
        let learnDefinition = WuxDef.Get("Page_LearnTechniques");
        let setStyleDefinition = WuxDef.Get("Page_SetStyles");
        let actionsDefinition = WuxDef.Get("Page_Actions");
        return `${WuxSheet.PageDisplayInput(tabFieldName, "Styles")}
        ${WuxSheet.PageDisplay("Styles", mainPageNavigation(setStyleDefinition.title, setStyleDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}
        ${WuxSheet.PageDisplay("Actions", mainPageNavigation(actionsDefinition.title, actionsDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}`;
    };
    const techniquesInfoContents = function (infoFieldName, tabFieldName, pageFieldName) {
        let coreOutput = "";
        coreOutput += WuxSheet.PageDisplayInput(pageFieldName, "Styles");
        coreOutput += WuxSheet.PageDisplay("Styles", WuxDefinition.TooltipDescription(WuxDef.Get("Page_SetStyles")));
        coreOutput += WuxSheet.PageDisplay("Actions", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Actions")));

        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Builder");
        output += WuxSheet.PageDisplay("Builder", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Training", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Advancement", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Core", coreOutput);
        return WuxSheetMain.Info.Contents(infoFieldName, output);
    };
    const characterCreationNavigation = function (definition, subheader) {
        let mainContents = buildCharacterCreationTabs(definition.title);
        mainContents += buildExitStickyButtons(WuxDef.GetAttribute("PageSet_Character Creator"), false);
        mainContents += buildHeader("Character Creation", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const buildCharacterCreationTabs = function (sheetName) {
        let output = "";
        let tabNames = ["Attributes", "Knowledge", "Skills", "Styles", "Jobs", "Origin"];

        for (let i = 0; i < tabNames.length; i++) {
            output += buildTabButton("radio", WuxDef.GetAttribute("Page"), tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
        }
        output = buildTabButtonRow(output);

        return output;
    };
    const buildExitStickyButtons = function (fieldName, showExit) {
        let output = "";
        if (showExit) {
            output += buildTabButton("checkbox", `${fieldName}${WuxDef._exit}`, "Exit", "Exit", false, "") + "\n";
        }
        output += buildTabButton("checkbox", `${fieldName}${WuxDef._finish}`, "Finish", "Finish", false, "") + "\n";
        output = buildTabButtonRow(output);

        return buildStickySideTab(output);
    };
    const partyManagerNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["NPC", "Notes"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    'use strict';

    const buildSection = function (contents, infoContents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">\n<div class="wuxSectionBlock wuxLargeLayoutItem">
        ${contents}
        ${infoContents}
        </div>\n</div>`;
        },

        buildCharacterCreationSplit = function (fieldName, mainContents, characterCreationContents) {
            return `${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("PageSet"), "Builder")}
            ${WuxSheet.PageDisplay(fieldName, mainContents)}
            ${WuxSheet.PageDisplay("Builder", characterCreationContents)}`;
        },

        buildStickySideTab = function (contents) {
            return `<div class="wuxStickySideTab">\n${contents}\n</div>`;
        },

        buildTabButtonRow = function (contents) {
            return `<div class="wuxTabButtonRow">\n${contents}\n</div>`;
        },

        buildTabButton = function (type, fieldName, value, name, isSelected, buttonClasses) {
            return `<div class="wuxTabButton ${isSelected ? "wuxTabButtonSelected" : ""}">
            <input type="${type}" class="wuxTabButton ${buttonClasses}" name="${fieldName}" value="${value}"><span>${name}</span>
            </div>`;
        },

        buildTabs = function (sheetName, fieldName, tabNames) {
            let output = "";
            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildHeader = function (header, subheader, infoFieldName) {
            return `<div class="wuxHeader2">${WuxSheetMain.Info.Button(infoFieldName)}${subheader}</div>\n<div class="wuxHeader">${header}</div>`;
        },

        buildOverviewPageNavigation = function (selectedTab) {
            let sideBarButtons = "";
            let tabFieldName = WuxDef.GetAttribute("PageSet_Core", WuxDef._tab);
            // sideBarButtons += buildTabButton("radio", tabFieldName, "Options", "Options", selectedTab == "Options", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Post", "Post", selectedTab == "Post", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Details", "Details", selectedTab == "Details", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Overview", "Overview", selectedTab == "Overview", "") + "\n";

            let definition = WuxDef.Get("Page_Character");
            return buildSection(mainPageNavigation(definition.title, WuxDef.GetTitle(`Page_${selectedTab}`), definition.getAttribute(WuxDef._info), buildStickySideTab(buildTabButtonRow(sideBarButtons))),
                overviewInfoContents(definition.getAttribute(WuxDef._info), tabFieldName));
        },

        buildFormePageNavigation = function () {
            let definition = WuxDef.Get("Page_Forme");
            return buildSection(mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildGearPageNavigation = function () {
            let definition = WuxDef.Get("Page_Gear");
            return buildSection(mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildActionsPageNavigation = function () {
            let definition = WuxDef.Get("Page_Actions");
            return buildSection(mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildNpcPageNavigation = function () {
            let definition = WuxDef.Get("Page_NPC");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildNotesPageNavigation = function () {
            let definition = WuxDef.Get("Page_Notes");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildOriginPageNavigation = function (definition) {
            return buildSection(characterCreationNavigation(definition, definition.title), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTrainingPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Training", trainingPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildAdvancementPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Advancement", advancementPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTechniquesNavigation = function () {
            let learnDefinition = WuxDef.Get("Page_LearnTechniques");
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = learnDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Core", techniquesCorePageNavigation())}`;

            return buildSection(output, techniquesInfoContents(learnDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        },

        buildStylesNavigation = function (styleDefinitionName) {
            let styleDefinition = WuxDef.Get(styleDefinitionName);
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = styleDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(styleDefinition, learnSubtitle))}`;

            return buildSection(output, techniquesInfoContents(styleDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        };
    return {
        BuildOverviewPageNavigation: buildOverviewPageNavigation,
        BuildFormePageNavigation: buildFormePageNavigation,
        BuildGearPageNavigation: buildGearPageNavigation,
        BuildActionsPageNavigation: buildActionsPageNavigation,
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildNpcPageNavigation: buildNpcPageNavigation,
        BuildNotesPageNavigation: buildNotesPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildStylesNavigation: buildStylesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
    };

}());

var WuxSheet = WuxSheet || (function () {
    'use strict';

    const pageDispayInput = function (fieldName, value) {
            if (value == undefined) {
                value = "";
            } else {
                value = ` value="${value}"`;
            }
            return `<input type="hidden" class="wuxPageDisplay-Flag" name="${fieldName}"${value} />`
        },
        pageDisplay = function (fieldName, contents) {
            return `<div class="wuxPageDisplay-${fieldName.replace(/[ .]/g, '')}">\n${contents}\n</div>`;
        }
    ;
    return {
        PageDisplayInput: pageDispayInput,
        PageDisplay: pageDisplay
    };
}());

var WuxSheetBackend = WuxSheetBackend || (function () {
    'use strict';

    const onChange = function (variables, contents, hasEvents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `change:${variables[i]}`;
            }
            return `on("${output}", function (${hasEvents != undefined ? "eventinfo" : ""}) {\n${contents}\n});\n`;
        }
    ;
    return {
        OnChange: onChange
    };
}());


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
        let filteredGroup;
        if (Array.isArray(filterData)) {
            filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
            let nextFilter = [];
            for (let i = 1; i < filterData.length; i++) {
                if (filteredGroup == undefined || filteredGroup.length == 0) {
                    return [];
                }
                nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
                filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
            }
        } else {
            filteredGroup = getSortedGroup(filterData.property, filterData.value);
        }
        if (filteredGroup == undefined || filteredGroup.length == 0) {
            return [];
        }
        return getGroupData(filteredGroup);
    };
    const getSortedGroup = function (property, propertyValue) {
        if (!sortingGroups.hasOwnProperty(property)) {
            let keys = "";
            for (let key in sortingGroups) {
                keys += `${key}, `;
            }
            // Debug.Log(`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
        }
        if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
            let keys = "";
            for (let key in sortingGroups[property]) {
                keys += `${key}, `;
            }
            // Debug.Log(`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
        }
        return sortingGroups[property][propertyValue];
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
        jsClassData.addFunction("has", has);
        jsClassData.addFunction("iterate", iterate);
        jsClassData.addFunction("filter", filter);
        jsClassData.addFunction("getSortedGroup", getSortedGroup);
        jsClassData.addFunction("getGroupData", getGroupData);
        jsClassData.addPublicData("get");
        jsClassData.addPublicData("getValues");
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

function TryAssessAllTechniques(sheet) {
    if (sheet.getSheetName() == "Techniques" || sheet.getSheetName() == "CustomTechniques") {
        AssessAllTechniquesByStartRow(sheet, 2);
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
    let impactsColumn = getNamedColumn(sheet, "Gen Traits");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
    if (techniqueData != undefined) {
        let assessment = new TechniqueAssessment(techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, impactsColumn);
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
    let impactsColumn = getNamedColumn(sheet, "Gen Traits");

    let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
    assessingCell.setValue("Calculating...")

    let itemData = GetGearForAssessment(sheet, rowIndex, assessColumn);
    if (itemData != undefined) {
        if (itemData.item.hasTechnique) {
            let techniqueAssessment = new TechniqueAssessment(itemData.item.technique, sheet, itemData.row, versionColumn, assessColumn, impactsColumn);
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
    let impactsColumn = getNamedColumn(sheet, "Gen Traits");
    let rowIndex = startRow;
    let techniqueData;
    while (rowIndex < lastRow) {
        let assessingCell = sheet.getRange(rowIndex, assessColumn, 1, 1);
        assessingCell.setValue("Calculating...")

        techniqueData = GetTechniqueForAssessment(sheet, rowIndex, assessColumn);
        if (techniqueData != undefined) {
            rowIndex = techniqueData.finalRow;
            let assessment = new TechniqueAssessment(
                techniqueData.tech, sheet, techniqueData.row, versionColumn, assessColumn, impactsColumn);
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

class TechniqueAssessment {
    constructor(technique, sheet, row, versionColumn, assessColumn, impactsColumn) {
        this.sheet = sheet;
        this.row = row;
        this.versionColumn = versionColumn;
        this.assessColumn = assessColumn;
        this.impactsColumn = impactsColumn;

        this.technique = technique;
        this.assessment = "";
        this.averagePoints = 0;
        
        this.impactTraits = {};

        this.target = technique.target;
        this.size = technique.size;
        this.onEnterEffect = false;
        this.statusCount = 0;

        this.basePoints = 8;
        this.points = 0;
        this.pointsCalc = "";
        this.pointsRubric = "";
        this.willbreakPoints = 0;
        this.willbreakPointsRubric = "";
        this.patience = 0;
        this.pointBreakdown = [];

        this.dps = 0;
        this.lowDps = 0;
        this.highDps = 0;
        this.dpsVariance = false;

        this.will = 0;
        this.lowWill = 0;
        this.highWill = 0;
        this.willVariance = false;

        this.structureCount = 0;
        this.structureHP = 0;
        this.structureHeight = 0;

        this.favor = 0;
        this.lowFavor = 0;
        this.highFavor = 0;
        this.favorVariance = false;

        this.request = 0;
        this.lowRequest = 0;
        this.highRequest = 0;
        this.requestVariance = false;

        this.assessTechnique();
    }

    setAssessment(value) {
        if (value == undefined) {
            this.assessment = "???";
        } else if (value < 20) {
            this.assessment = "Too Weak";
        } else if (value < 40) {
            this.assessment = "Weak";
        } else if (value < 60) {
            this.assessment = "Average";
            if (value > 52) {
                this.assessment += " 3";
            } else if (value > 46) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else if (value < 80) {
            this.assessment = "Strong";
            if (value > 72) {
                this.assessment += " 3";
            } else if (value > 66) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else {
            this.assessment = "Too Strong";
        }
    }

    printCellValues() {
        this.printAssessmentNote();
        this.printVersionChange();
        this.printAssessmentPointValues();
        this.printGeneratedImpactTraits();
    }
    printAssessmentNote() {
        let range = this.sheet.getRange(this.row, this.assessColumn, 1, 1);
        range.setNote(this.getAssessmentNote());
    }
    printVersionChange() {
        let range = this.sheet.getRange(this.row, this.versionColumn, 1, 1);
        range.setValue("CHANGE");
    }
    printAssessmentPointValues() {
        let values = [];
        values[0] = [this.assessment, `${this.pointVarianceRange()}\n${this.points}; ${this.pointBreakdown[0].points}`];
        for (let i = 1; i < this.pointBreakdown.length; i++) {
            values.push(["", `${this.pointBreakdown[i].points}; ${this.pointBreakdown[i].rubric}`]);
        }

        let range = this.sheet.getRange(this.row, this.assessColumn, this.pointBreakdown.length, 2);
        range.setValues(values);
    }
    printGeneratedImpactTraits() {
        let range = this.sheet.getRange(this.row, this.impactsColumn, 1, 1);
        range.setValue(this.getImpactTraits());
    }

    printCellJson(isCustom) {
        Debug.Log("Printing JSON for technique");
        let range = this.sheet.getRange(this.row, this.assessColumn + 4, 1, 1);
        this.technique.isCustom = isCustom;
        range.setValue(JSON.stringify(this.technique));
    }

    getAssessmentNote() {
        let output = `Point ${this.pointsCalc != "" ? this.pointsCalc : " (Avg)"}: `;
        output += this.pointVarianceRange();
        output += `\nTotal Points: ${this.points}\n${this.pointsRubric}`;
        if (this.willbreakPoints > 0) {
            output += `\nWill Break: ${this.willbreakPoints}\n${this.willbreakPointsRubric}`;
        }
        output += "\n";

        if (this.dps > 0) {
            output += `\nDPS: ${this.lowDps} => ${this.dps} <= ${this.highDps}`;
            if (this.dpsVariance) {
                output += " (High Variance)";
            }
        }
        if (this.will > 0) {
            output += `\nWill: ${this.lowWill} => ${this.will} <= ${this.highWill}`;
            if (this.willVariance) {
                output += " (High Variance)";
            }
        }
        if (this.favor > 0) {
            output += `\nFavor: ${this.lowFavor} => ${this.favor} <= ${this.highFavor}`;
            if (this.favorVariance) {
                output += " (High Variance)";
            }
        }
        if (this.request > 0) {
            output += `\nRequest: ${this.lowRequest} => ${this.request} <= ${this.highRequest}`;
            if (this.requestVariance) {
                output += " (High Variance)";
            }
        }
        return output;
    }
    
    getImpactTraits() {
        let output = "";
        for(let key in this.impactTraits) {
            if (output != "") {
                output += "; ";
            }
            if (this.impactTraits[key] == "") {
                output += key;
            }
            else {
                output += `${key}-${this.impactTraits[key]}`
            }
        }
        return output;
    }

    pointVarianceRange() {
        let farPts = Math.floor(this.averagePoints * 3 / 10);
        let closePts = Math.floor(this.averagePoints / 10);
        return `${this.averagePoints - farPts} > ${closePts == 0 ? this.averagePoints : `${this.averagePoints - closePts} < ${this.averagePoints + closePts}`} < ${this.averagePoints + farPts}`;
    }

    assessTechnique() {
        let assessor = this;
        let attributeHandler = this.getFakeAttributeHandler();
        
        this.technique.effects.iterate(function (effect) {
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            assessor.assessEffect(effect, attributeHandler);
        });

        if (this.technique.secondEffectConditionName == "TechOnEnter") {
            assessor.onEnterEffect = true;
        }
        if (this.technique.secondaryEffects.length() > 0) {
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            this.technique.secondaryEffects.iterate(function (effect) {
                assessor.pointBreakdown.push({points: 0, rubric: ""});
                assessor.assessEffect(effect, attributeHandler);
            });
        }
        this.getStructureAssessment();
        let customPoints = this.sheet.getRange(this.row, this.assessColumn + 2, 1, 1).getValues()[0];
        customPoints = isNaN(parseInt(customPoints)) ? 0 : parseInt(customPoints);
        if (customPoints != 0) {
            this.addPointsRubric(customPoints, `(Custom)`)
        }

        this.averagePoints = this.getAveragePoint(this.getEnergy(), this.technique);
        this.averagePoints = this.addImpatiencePointMod(this.averagePoints);

        if (this.points == 0) {
            this.setAssessment();
        } else {
            let difference = assessor.points - this.averagePoints;
            let assessmentPercentage = 50 + (difference * 100 / this.averagePoints);
            this.setAssessment(assessmentPercentage);
            this.getVarianceCalculation();
        }
    }

    getFakeAttributeHandler() {
        let attributeHandler = new AttributeHandler();
        attributeHandler.addMod(WuxDef.GetVariable("Attr_BOD"));
        attributeHandler.current[WuxDef.GetVariable("Attr_BOD")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_PRC"));
        attributeHandler.current[WuxDef.GetVariable("Attr_PRC")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_QCK"));
        attributeHandler.current[WuxDef.GetVariable("Attr_QCK")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_CNV"));
        attributeHandler.current[WuxDef.GetVariable("Attr_CNV")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_INT"));
        attributeHandler.current[WuxDef.GetVariable("Attr_INT")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_RSN"));
        attributeHandler.current[WuxDef.GetVariable("Attr_RSN")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("SB_MAX"));
        attributeHandler.current[WuxDef.GetVariable("SB_MAX")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("Recall"));
        attributeHandler.current[WuxDef.GetVariable("Recall")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("CR"));
        attributeHandler.current[WuxDef.GetVariable("CR")] = 1;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_HV"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_HV")] = this.basePoints - 1;
        attributeHandler.addMod(WuxDef.GetVariable("Soc_Favor"));
        attributeHandler.current[WuxDef.GetVariable("Soc_Favor")] = 15;
        attributeHandler.addMod(WuxDef.GetVariable("StrideRoll"));
        attributeHandler.current[WuxDef.GetVariable("StrideRoll")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("MvCharge"));
        attributeHandler.current[WuxDef.GetVariable("MvCharge")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_Mv"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_Mv")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_MvDash"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_MvDash")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("MvPotency"));
        attributeHandler.current[WuxDef.GetVariable("MvPotency")] = 7;

        return attributeHandler;
    }

    getEnergy() {
        let resources = this.technique.resourceCost.split(";");
        for (let i = 0; i < resources.length; i++) {
            let splits = resources[i].split(" ");
            if (splits.length >= 2 && splits[1].trim() == "EN") {
                return parseInt(splits[0]);
            }
        }
        return 0;
    }

    getAveragePoint(energy, technique) {
        let points = this.basePoints + (3 * energy) + (energy * (energy + 1) / 2);
        if (technique.action == "Full") {
            points += 3 + (2 * energy) + this.basePoints;
            this.pointsCalc = "(Full)";
        } else if (technique.action == "Swift") {
            let lookupName = WuxDef.GetAbbreviation("Job") + "_" + technique.techSet;
            let def = WuxDef.Get(lookupName);
            if (WuxDef.GetTitle(lookupName) == "") {
                points = Math.ceil(points * 0.5);
                this.pointsCalc = "(Swift)";
            }
        }

        return points;
    }

    addImpatiencePointMod(points) {
        return Math.floor(points * (1 + (this.patience * 0.1)));
    }

    getVarianceCalculation() {
        let variance = 0;
        if (this.dps > 0) {
            variance = this.dps - this.lowDps;
            if (variance / this.dps > 0.5) {
                this.dpsVariance = true;
                this.assessment += "*";
            }
        }
        if (this.will > 0) {
            variance = this.will - this.lowWill;
            if (variance / this.will > 0.5) {
                this.willVariance = true;
                this.assessment += "*";
            }
        }
        if (this.favor > 0) {
            variance = this.favor - this.lowFavor;
            if (variance / this.favor > 0.5) {
                this.favorVariance = true;
                this.assessment += "*";
            }
        }
    }

    assessEffect(effect, attributeHandler) {
        switch (effect.type) {
            case "HP":
                this.getHPAssessment(effect, attributeHandler);
                break;
            case "WILL":
                this.getWillAssessment(effect, attributeHandler);
                break;
            case "Vitality":
                this.getVitalityAssessment(effect, attributeHandler);
                break;
            case "Impatience":
                this.getImpatienceAssessment(effect, attributeHandler);
                break;
            case "Favor":
                this.getFavorAssessment(effect, attributeHandler);
                break;
            case "Influence":
                this.getInfluenceAssessment(effect);
                break;
            case "Request":
                this.getRequestAssessment(effect, attributeHandler);
                break;
            case "Status":
                this.getStatusAssessment(effect, attributeHandler);
                break;
            case "BreakFocus":
                this.getBreakFocusAssessment(effect, attributeHandler);
                break;
            case "Resistance":
                this.getResistanceAssessment(effect, attributeHandler);
                break;
            case "Terrain":
                this.getTerrainAssessment(effect, attributeHandler);
                break;
            case "Structure":
                this.getStructureAssessmentData(effect, attributeHandler);
                break;
            case "Move":
                this.getMoveAssessment(effect, attributeHandler);
                break;
            case "EN":
                this.getEnAssessment(effect, attributeHandler);
                break;
        }
    }

    getHPAssessment(effect, attributeHandler) {
        
        let output = this.getDiceFormula(effect, attributeHandler);
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];

        let message;
        switch (subType) {
            case "Heal":
                output.value = Math.floor(output.value * 2.5);
                message = `(Heal HP)`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("Trait_Heal");
                break;
            case "Surge":
                message = `(Surge HP)`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("Trait_Heal-Surge");
                break;
            case "Burst Damage":
                output.value = Math.max(Math.floor(output.value * 0.25), 1);
                message = `(Burst)`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("Trait_Atk");
                break;
            case "Status":
                output.value = Math.max(Math.floor(output.value * 0.25), 1);
                message = `(Status)`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("Trait_Atk");
                break;
            case "Special":
                this.addImpactTrait("Trait_Atk");
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.dps += output.value;
                    this.lowDps += output.lowValue;
                    this.highDps += output.highValue;
                }
                message = `(HP)`;

                if (effect.defense == "WillBreak") {
                    this.addImpactTrait(`Trait_Will:Trait_Atk`);
                }
                else {
                    this.addPointsRubric(output.value, message);
                    this.addImpactTrait("Trait_Atk");
                }
                this.addDefensePointsRubric(effect, output.value, message);
                this.addTargetedPointsRubric(effect, output.value);
                break;
        }

        if (effect.traits != "") {
            let effectPts;
            if (effect.traits.includes("Brutal")) {
                effectPts = Math.floor(output.value * 0.33);
                this.addPointsRubric(effectPts, `(Brutal)`);
            }
            if (effect.traits.includes("AP")) {
                effectPts = Math.floor(output.value * 0.33);
                this.addPointsRubric(effectPts, `(AP)`);
            }
        }
    }

    getWillAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);

        let message;
        switch (effect.subType) {
            case "Heal":
                output.value = Math.floor(output.value * 1.5);
                message = `(Heal Will)`;
                this.addImpactTrait("Trait_Heal-Will");
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.will += output.value;
                    this.lowWill += output.lowValue;
                    this.highWill += output.highValue;
                    if (this.dps > 0) {
                        output.value = Math.floor(output.value * 0.5);
                    }
                }
                message = `(Will)`;
                break;
        }

        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getVitalityAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 21;
        let impactTrait = "";
        if (effect.subType != "Heal") {
            output.value = Math.floor(output.value * 1.5);
            this.addImpactTrait("Trait_Heal-Vitality");
        }
        let message = `(${effect.subType != "" ? `${effect.subType} ` : ""}Vit)`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Atk-Vitality`);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getImpatienceAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Heal":
                output.value *= 10;
                this.addPointsRubric(output.value, `(Heal Impatience)`);
                this.addImpactTrait("Trait_Heal-Impatience");
                break;
            default:
                this.patience += output.value;
                this.addImpactTrait(`Trait_Impatience-${this.patience}`);
                break;
        }
    }

    getFavorAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message;
        switch (effect.subType) {
            case "Heal":
                output.value *= 6;
                message = `(Heal Favor)`;
                this.addImpactTrait("Trait_Heal-Favor");
                break;
            default:
                this.favor += output.value;
                this.lowFavor += output.lowValue;
                this.highFavor += output.highValue;
                output.value *= 4;
                message = `(Favor)`;
                break;
        }

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Favor`);
        }
        else {
            this.addPointsRubric(output.value, message);
            this.addImpactTrait("Trait_Favor");
        }
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getInfluenceAssessment(effect) {
        let subTypes = effect.subType.split(":");
        let points = 0;
        switch (subTypes[0]) {
            case "Raise":
            case "Lower":
                if (effect.defense != "WillBreak") {
                    points = 14;
                }
                this.addPointsRubric(points, `(${subTypes[0]} Influence)`);
                this.addImpactTrait("Trait_Influence");
                break;
            case "Adjust":
                if (effect.defense != "WillBreak") {
                    points = 16;
                }
                this.addPointsRubric(points, `(${subTypes[0]} Influence)`);
                this.addImpactTrait("Trait_Influence");
                break;
            case "Reveal":
                if (effect.defense != "WillBreak") {
                    points = 10;
                }
                this.addPointsRubric(points, `(${subTypes[0]} Influence)`);
                this.addImpactTrait("Trait_Assess");
                break;
            case "RevealNeg":
            case "RevealPos":
                if (effect.defense != "WillBreak") {
                    points = 8;
                }
                this.addPointsRubric(points, `(${subTypes[0]} Influence)`);
                this.addImpactTrait("Trait_Assess");
                break;
            case "Add":
                if (subTypes.length > 1) {
                    if (subTypes[1] == "Low") {
                        points = 17;
                    } else if (subTypes[1] == "Moderate") {
                        points = 30;
                    }
                }
                this.addPointsRubric(points, `(Add ${subTypes[1]} Influence)`);
                this.addImpactTrait("Trait_AddInfluence");
                break;
        }
    }

    getRequestAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value += 5;
        this.request += output.value;
        this.lowRequest += output.lowValue;
        this.highRequest += output.highValue;
        let message = `(Request)`;
        this.addPointsRubric(output.value, message);
        this.addImpactTrait("Trait_Request");
    }

    getTerrainAssessment(effect, attributeHandler) {
        let effectDefinition = WuxDef.Get(effect.effect);
        let value = effectDefinition.formula.getValue(attributeHandler);
        let message = "";
        switch (effect.subType) {
            case "Add":
                message = `(Add ${effectDefinition.getTitle()})`;
                break;
            case "Remove":
                value = Math.floor(value * 0.75);
                message = `(Remove ${effectDefinition.getTitle()})`;
                break;
        }

        this.addPointsRubric(value, message);
        this.addTargetedPointsRubric(effect, value);
        this.addImpactTrait(`Trait_Terrain:${effect.effect}`);
    }

    getStructureAssessmentData(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Count":
                this.structureCount += output.value;
                break;
            case "HP":
                this.structureHP += output.value;
                break;
            case "Height":
                this.structureHeight += output.value;
                break;
        }
    }

    getStructureAssessment() {
        if (this.structureCount > 0) {
            let pointMod = Math.ceil(this.structureHP / 4);
            if (this.structureHeight > 0) {
                pointMod += Math.ceil(pointMod * (this.structureHeight - 1) * 0.6);
            }
            let value = this.structureCount * pointMod;
            let message = `(Structure)`;
            this.addPointsRubric(value, message);
        }
    }

    getMoveAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let impactTrait = "";
        switch (effect.subType) {
            case "Teleport":
                output.value = Math.floor(output.value * 2);
                impactTrait = `Trait_Move-${effect.subType}`;
                break;
            case "Fly":
            case "FreeMove":
            case "Invis":
            case "Sneak":
                output.value = Math.floor(output.value * 1.5);
                impactTrait = `Trait_Move-${effect.subType}`;
                break;
            case "ForceMove":
            case "Pushed":
            case "Pulled":
                output.value = Math.floor(output.value * (1 + (output.value * 0.5)));
                impactTrait = `Trait_ForceMove-${effect.subType}`;
                break;
            case "Fall":
                output.value = 2;
                impactTrait = `Trait_ForceMove-${effect.subType}`;
                break;
        }
        let message = `(${effect.subType == "" ? "Move" : effect.subType})`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:${impactTrait}`);
        }
        else {
            this.addPointsRubric(output.value, message);
            this.addImpactTrait(impactTrait);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getEnAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 2;
        let message = `(EN)`;
        this.addPointsRubric(output.value, message);
        this.addImpactTrait(`Trait_EN`);
    }

    getStatusAssessment(effect, attributeHandler) {
        let state = WuxDef.Get(effect.effect);
        let value = 0;
        let message = "";
        switch (effect.subType) {
            case "Set":
            case "Add":
            case "Self":
                value = parseInt(state.points);
                let formula = this.getDiceFormula(effect, attributeHandler);
                if (formula.value > 0) {
                    value *= formula.value;
                }
                message = `(Add ${state.getTitle()})`;

                if (effect.defense == "WillBreak") {
                    this.addImpactTrait(`Trait_Will-Apply:${state.name}`);
                }
                else {
                    this.addPointsRubric(value, message);
                    if (!state.isBeneficial) {
                        this.addDefensePointsRubric(effect, value, message);
                    }
                    this.addTargetedPointsRubric(effect, value);
                    this.addImpactTrait(`Trait_Apply:${state.name}`);

                    if (effect.effect != "Stat_Engaged") {
                        this.statusCount++;
                        if (this.statusCount > 1) {
                            value = Math.floor(this.statusCount * 4);
                            this.addPointsRubric(value, `(MultiStat)`);
                        }
                    }
                }
                break;
            case "Trigger":
                value = Math.floor(parseInt(state.points) * 0.5);
                message = `(Trigger ${state.getTitle()})`;

                this.addPointsRubric(value, message);
                this.addDefensePointsRubric(effect, value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait(`Trait_Trigger:${state.name}`);
                break;
            case "Remove":
                value = Math.floor(parseInt(state.points) * 0.75);
                message = `(Remove ${state.getTitle()})`;

                if (effect.defense == "WillBreak") {
                    this.addImpactTrait(`Trait_Will-Cleanse:${state.name}`);
                }
                else {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait(`Trait_Cleanse:${state.name}`);
                }
                this.addTargetedPointsRubric(effect, value);

                if (effect.effect != "Stat_Engaged") {
                    this.statusCount++;
                    if (this.statusCount > 1) {
                        let subvalue = Math.max(-2, -1 * value);
                        this.addPointsRubric(subvalue, `(MultiStat)`);
                    }
                }
                break;
            case "Choose":
                value = parseInt(state.points) + 2;
                message = `(Choose ${state.getTitle()})`;

                if (effect.defense == "WillBreak") {
                    this.addImpactTrait(`Trait_Will-Apply:${state.name}`);
                }
                else {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait(`Trait_Apply:${state.name}`);
                }
                this.addTargetedPointsRubric(effect, value);
                break;
            case "Remove Any":
                value = 10;
                message = `(Remove Any)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait(`Trait_Cleanse-Any`);
                break;
            case "Remove All":
                value = 20;
                message = `(Remove All)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait(`Trait_Cleanse-All`);
                break;
            case "Remove Will":
                value = 16;
                message = `(Remove Will)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait(`Trait_Cleanse-Will`);
                break;
        }
    }

    getBreakFocusAssessment() {
        let message = `(Break Focus)`;
        this.addPointsRubric(28, message);
        this.addImpactTrait(`Trait_BreakFocus`);
    }

    getResistanceAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message = `(Resist ${effect.effect})`;
        this.addPointsRubric(output.value, message);
    }

    addDefensePointsRubric(effect, points) {
        let pointMod = 0;

        let hasDefenseTypes = ["HP", "WILL", "Favor", "Status", "Move", "EN"];
        if (hasDefenseTypes.some(type => type == effect.type)) {
            switch (effect.defense) {
                case "Def_Evasion":
                    pointMod = Math.ceil(points * 0.25);
                    this.addPointsRubric(pointMod, `(Evasion)`);
                    break;
                case "Def_Fortitude":
                    pointMod = Math.ceil(points * 0.15);
                    this.addPointsRubric(pointMod, `(Fortitude)`);
                    break;
                case "Def_Scrutiny":
                    pointMod = Math.ceil(points * 0.15);
                    this.addPointsRubric(pointMod, `(Scrutiny)`);
                    break;
                case "":
                    if (effect.target != "Self") {
                        pointMod = Math.ceil(points * 0.4);
                        this.addPointsRubric(pointMod, `(No Def)`);
                    }
                    break;
            }
        }
    }

    addTargetedPointsRubric(effect, points) {

        let pointMod = 0;

        switch (this.target) {
            case "Targets":
            case "Targets or Self":
                pointMod = Math.floor(points * (this.size - 1) * 0.65);
                this.addPointsRubric(pointMod, `(${this.size} ${this.target})`);
                break;
            case "Blast":
            case "Blast(2H)":
            case "Blast(3H)":
                pointMod = Math.floor(points * this.getAreaPointMod(0.75, 1));
                this.addPointsRubric(pointMod, `(${this.target} ${this.size})`);
                break;
            case "Radial":
            case "Radial(2H)":
            case "Radial(3H)":
                pointMod = Math.floor(points * this.getAreaPointMod(0.6, 1));
                this.addPointsRubric(pointMod, `(${this.target} ${this.size})`);
                break;
            case "Cone":
            case "Line":
            case "Line(2H)":
            case "Line(3H)":
                pointMod = Math.floor(points * this.getAreaPointMod(0.4, 0.66));
                this.addPointsRubric(pointMod, `(${this.target} ${this.size})`);
                break;
        }

        if (this.onEnterEffect) {
            pointMod = 4;
            this.addPointsRubric(pointMod, `(On Enter)`);
            this.pointsRubric += "\n";
        } else if (pointMod > 0) {
            this.pointsRubric += "\n";
        }
    }

    getAreaPointMod(baseMod, incrementMod) {
        let i = this.size;
        let output = 0;
        while (i > 0) {
            output += baseMod;
            baseMod *= incrementMod;
            i--;
        }
        return output;
    }

    addPointsRubric(points, message) {
        this.points += points;
        this.pointBreakdown[this.pointBreakdown.length - 1].points += points;
        if (this.pointsRubric != "") {
            this.pointsRubric += " + ";
        }
        if (this.pointBreakdown[this.pointBreakdown.length - 1].rubric != "") {
            this.pointBreakdown[this.pointBreakdown.length - 1].rubric += ` + ${points}`;
        }
        this.pointsRubric += `${points}${message}`;
        this.pointBreakdown[this.pointBreakdown.length - 1].rubric += message;
    }

    getDiceFormula(effect, attributeHandler) {
        let value = effect.formula.getValue(attributeHandler);
        let lowValue = value + effect.getLowDiceValue();
        let highValue = value + effect.getHighDiceValue();
        value += effect.getAverageDiceValue();
        return {value: value, lowValue: lowValue, highValue: highValue};
    }

    addImpactTrait(traitName) {
        let traitParts = traitName.split("-");
        let traitBase = traitParts[0];
        let traitType = "";
        if (traitParts.length > 1) {
            traitType = traitParts[1];
        }
        if (this.impactTraits[traitBase] == undefined || this.impactTraits[traitBase] == "") {
            this.impactTraits[traitBase] = traitType;
        }
    }
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

function SetStyleEffectsFromPosition(sheet) {
    if (sheet.getSheetName() == "Styles") {
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
    let rowIndex = startRow;
    while (rowIndex <= lastRow) {
        let effectCell = sheet.getRange(rowIndex, effectColumn, 1, 1);
        effectCell.setValue("Calculating...")
        let skillCell = sheet.getRange(rowIndex, skillColumn, 1, 1);
        let affinityCell = undefined;
        if (affinityColumn >= 0) {
            affinityCell = sheet.getRange(rowIndex, affinityColumn, 1, 1);
        }
        
        let rowData = sheet.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
        if (rowData[0] == "" || rowData[0].startsWith("#")) {
            effectCell.setValue("");
            rowIndex++;
            continue;
        }

        SetStyleKeywords(rowData, effectCell, skillCell, affinityCell)
        rowIndex++;
    }
}

function SetStyleKeywords(rowData, effectCell, skillCell, affinityCell) {
    
    let style = new TechniqueStyle(rowData);
    let techniqueFilter = WuxTechs.Filter(new DatabaseFilterData("style", style.name));

    if (techniqueFilter.length == 0) {
        effectCell.setValue("");
    } else {
        let styleAssessment = new StyleAssessment(
            style, techniqueFilter, effectCell, skillCell, affinityCell);
        styleAssessment.print();
    }
}

class StyleAssessment {
    
    constructor (style, techniqueFilter, effectCell, skillCell, affinityCell) {
        this.baseTechniqueKeywords = {};
        this.effectCell = effectCell;
        this.skillCell = skillCell;
        this.affinityCell = affinityCell;
        this.skills = [];
        this.affinities = [];
        
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
    }

    print() {
        this.effectCell.setValue(this.printKeywords());
        this.skillCell.setValue(this.printSkills());
        if (this.affinityCell != undefined) {
            this.affinityCell.setValue(this.printAffinity());
        }
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
        
        let effectCell = sheet.getRange(3, col, 1, 1);
        effectCell.setValue("Calculating...")
        
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
        for (let i = 0; i < 99; i++) {
            if (i < arr.length) {
                output.push([arr[i]]);
            }
            else {
                output.push([""]);
            }
        }

        let range = this.sheet.getRange(row, column, 99, 1);
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
            if (item == undefined) {
                return;
            }
            return item.technique;
        });
        this.updateChangedTechniqueVersion("Consumables", 2, (name) => {
            let item = WuxItems.Get(name);
            if (item == undefined) {
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
                let version = [0];
                if (tech.version != undefined) {
                    version = tech.version.split(".");
                }

                let value = "";
                for (let i = 0; i < version.length; i++) {
                    if (value != "") {
                        value += ".";
                    }
                    if (i == version.length - 1) {
                        let update = parseInt(version[version.length - 1]);
                        if (isNaN(update)) {
                            update = 0;
                        }
                        update++;
                        value += update;
                    }
                    else {
                        value += version[i];
                    }
                }
                let versionId = `${versionCol}${rowIndex}`;
                Debug.Log(`Setting ${versionId} to ${value}`);
                let versionRange = sheet.getRange(versionId);
                versionRange.setValue(value);
            }
        }
    }

    printDefinitionDatabase() {
        let definitionDatabase = SheetsDatabase.CreateDefinitionTypes(
            this.sheetsDb.readDatabase("DefinitionTypes", 2));
        this.importBasicDefinitions(definitionDatabase, "GroupDefinitions");
        this.importBasicDefinitions(definitionDatabase, "Definitions");
        this.importBasicDefinitions(definitionDatabase, "SystemDefinitions");
        this.importDatabaseDefinitionsWithGroupCheck(definitionDatabase, this.sheetsDb.styles, WuxDef.Get("Style"));
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
        
        

        let techniqueClassData = JavascriptDatabase.Create(this.sheetsDb.techniques, WuxDefinition.GetTechnique);
        techniqueClassData.addPublicFunction("filterAndSortTechniquesByRequirement", WuxDefinition.FilterAndSortTechniquesByRequirement);
        output += techniqueClassData.print("WuxTechs") + "\n";

        let styleDb = this.sheetsDb.getStyles();
        let variableNameKeys = {};
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
        output += styleClassData.print("WuxStyles") + "\n";

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




