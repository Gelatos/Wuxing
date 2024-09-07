function SetTechniquesDatabaseJson(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    arr0 = ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
    let techniqueDatabase = SheetsDatabase.CreateTechniques(arr0);
    return PrintLargeEntry(JSON.stringify(techniqueDatabase), "t");
}

function SetDefinitionsDatabase(definitionTypesArray, definitionArray, styleArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString) {
    let definitionDatabase = SheetsDatabase.CreateDefinitionTypes(definitionTypesArray);

    definitionDatabase.importSheets(definitionArray, function (arr) {
        let definition = new DefinitionData(arr);
        let baseDefinition = definitionDatabase.get(definition.group);
        if (baseDefinition != undefined && baseDefinition.group == "Type") {
            return definition.createDefinition(baseDefinition);
        }
        return definition;
    });
    definitionDatabase.importSheets(styleArray, function (arr) {
        let style = new TechniqueStyle(arr);
        return style.createDefinition(definitionDatabase.get("Style"));
    });
    definitionDatabase.importSheets(skillsArray, function (arr) {
        let skill = new SkillData(arr);
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
        }
        else {
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
    definitionDatabase.importSheets(rolesArray, function (arr) {
        let role = new RoleData(arr);
        return role.createDefinition(definitionDatabase.get("Role"));
    });
    let techDb = SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString));
    techDb.iterate(function (technique) {
        let techDef = technique.createDefinition(definitionDatabase.get("Technique"));
        definitionDatabase.add(techDef.name, techDef);
    });
    
    let jsClassData = JavascriptDatabase.Create(definitionDatabase, WuxDefinition.Get);
    jsClassData.addPublicFunction("getAttribute", WuxDefinition.GetAttribute);
    jsClassData.addPublicFunction("getVariable", WuxDefinition.GetVariable);
    jsClassData.addPublicFunction("getAbbreviation", WuxDefinition.GetAbbreviation);
    jsClassData.addPublicFunction("getVariables", WuxDefinition.GetVariables);
    jsClassData.addPublicFunction("getGroupVariables", WuxDefinition.GetGroupVariables);
    jsClassData.addPublicFunction("getTitle", WuxDefinition.GetTitle);
    jsClassData.addPublicFunction("getDescription", WuxDefinition.GetDescription);
    let variableMods = definitionDatabase.filter(new DatabaseFilterData("group", "VariableMod"));
    for (let i = 0; i < variableMods.length; i++) {
        jsClassData.addPublicVariable(variableMods[i].variable, `"${variableMods[i].variable}"`);
    }

    return PrintLargeEntry(jsClassData.print("WuxDef"), "]");
}

function SetTechniquesDatabase(techniqueDatabaseString) {
    let techDb = SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString));
    let jsClassData = JavascriptDatabase.Create(techDb, WuxDefinition.Get);
    return PrintLargeEntry(jsClassData.print("WuxTechniqueDb"), "d");
}

function Test(definitionArray) {
    let data = new DefinitionData(definitionArray[0]);
    return JSON.stringify(data);
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

var SheetsDatabase = SheetsDatabase || (function () {
    'use strict';

    var
        createDatabaseCollection = function (stylesArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString) {

            let techDb = createTechniques(JSON.parse(techniqueDatabaseString));
            return {
                techniques: techDb,
                styles: createStyles(stylesArray),
                skills: createSkills(skillsArray),
                language: createLanguages(languageArray),
                lore: createLores(loreArray),
                job: createJobs(jobsArray),
                role: createRoles(rolesArray)
            }
        },

        createTechniques = function (arr) {
            let filters = ["techSet", "linkedTech", "group", "affinity", "tier", "isFree", "action", "skill", "range"];
            return new ExtendedTechniqueDatabase(filters, arr, function (arr) {
                return new TechniqueData(arr);
            });
        },

        createSkills = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new SkillData(arr);
            });
        },
        
        createStyles = function (arr) {
            return new Database(["group", "cr"], arr, function (arr) {
                return new TechniqueStyle(arr);
            });
        },

        createLanguages = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new LanguageData(arr);
            });
        },

        createLores = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new LoreData(arr);
            });
        },

        createJobs = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new JobData(arr);
            });
        },

        createRoles = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new RoleData(arr);
            });
        },

        createDefinitionTypes = function (arr) {
            return new ExtendedDescriptionDatabase(["group", "subGroup", "formulaMods"], arr, function (arr) {
                let definition = new DefinitionData(arr);
                if (definition.group == "Type") {
                    definition.variable += `{0}{1}`;
                }
                return definition;
            });
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
        CreateRoles: createRoles,
        CreateDefinitionTypes: createDefinitionTypes
    }
}());

var WuxPrintTechnique = WuxPrintTechnique || (function () {
    'use strict';

    var
        getDisplayOptions = function () {
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
        },

        setTechniqueDisplayHtml = function (techDisplayData, displayOptions) {
            let contents = "";
            contents += techniqueDisplayHeader.Print(techDisplayData, displayOptions);
            contents += techniqueDisplayContents.Print(techDisplayData, displayOptions);

            return setTechniqueDisplayFeatureDiv(techDisplayData, displayOptions, contents);
        },

        setTechniqueDisplayFeatureDiv = function (techDisplayData, displayOptions, contents) {
            return `<div ${setFeatureStyle("wuxFeature", displayOptions)}>${contents}</div>\n`;
        },

        techniqueDisplayHeader = techniqueDisplayHeader || (function () {
            'use strict';

            var
            print = function (techDisplayData, displayOptions) {
                let output = "";
                output += setTechniqueDisplayHeaderExpandSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderSelectSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderUseSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderNameFields(techDisplayData, displayOptions);

                output = `<div ${setFeatureStyle(["wuxFeatureHeader", `wuxFeatureHeader-${techDisplayData.actionType}`], displayOptions)}>\n${output}\n</div>\n`;
                output += setTechniqueDisplayHeaderExtentFeatures(techDisplayData, displayOptions);
                return output;
            },

            setTechniqueDisplayHeaderExpandSection = function (techDisplayData, displayOptions) {
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
                    </div>`;
                }
                return "";
            },

            setTechniqueDisplayHeaderSelectSection = function (techDisplayData, displayOptions) {
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
            },

            setTechniqueDisplayHeaderUseSection = function (techDisplayData, displayOptions) {

                // add technique data for the api
                techDisplayData.technique.username = "@{character_name}";
                let usedTechData = JSON.stringify(techDisplayData.technique);
                usedTechData = Format.SanitizeSheetRollAction(usedTechData);
                let showDefinition = WuxDef.Get("Title_ShowTechnique");
                let useDefinition = WuxDef.Get("Title_UseTechnique");

                return `
                ${WuxSheetMain.CustomInput("hidden", displayOptions.techniqueDefinition.getAttribute(WuxDef._subfilter), "wuxFeatureInteractionButton-flag", ` value="0"`)}
                <div class="wuxFeatureHeaderInteractBlock">
                    <button class="wuxFeatureHeaderInteractiveButton wuxTooltip" type="roll" value=\`${FeatureService.GetRollTemplate(techDisplayData)}\`>
                        ?
                        <div class="wuxTooltipContent">
                            ${WuxDefinition.TooltipDescription(showDefinition)}
                        </div>
                    </button>
                    <button class="wuxFeatureHeaderInteractiveButton wuxTooltip" type="roll" value=\`!ctech ${usedTechData}\`>
                        9
                        <div class="wuxTooltipContent">
                            ${WuxDefinition.TooltipDescription(useDefinition)}
                        </div>
                    </button>
                </div>
                `;
            },

            setTechniqueDisplayHeaderNameFields = function (techDisplayData, displayOptions) {
                return `<div ${setFeatureStyle("wuxFeatureHeaderDisplayBlock", displayOptions)}>
                <span ${setFeatureStyle("wuxFeatureHeaderName", displayOptions)}>${techDisplayData.name}</span>
                <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.resourceData}</div>
                <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.targetData}</div>
                </div>`;
            },

            setTechniqueDisplayHeaderExtentFeatures = function (techDisplayData, displayOptions) {
                let output = "";
                if (techDisplayData.trigger != "") {
                    output += setFeatureLineWithHeader("wuxFeatureHeaderInfoTrigger", "Trigger", techDisplayData.trigger, displayOptions);
                }
                if (techDisplayData.itemTraits.length > 0) {
                    output += setFeatureLineWithHeader("wuxFeatureHeaderInfoReq", "Item Traits", setTraits(techDisplayData.itemTraits, "<span> or </span>", displayOptions), displayOptions);
                }
                if (techDisplayData.requirements != "") {
                    output += setFeatureLineWithHeader("wuxFeatureHeaderInfoReq", "Requirements", techDisplayData.requirements, displayOptions);
                }
                return output;
            }

            return {
                Print: print
            }
        })(),

        techniqueDisplayContents = techniqueDisplayContents || (function () {
            'use strict';

            var
            print = function (techDisplayData, displayOptions) {
                let output = "";

                output += setTechniqueDisplayFunctionBlock(techDisplayData, displayOptions);
                output += techniqueDisplayContentEffects.PrintEffects(techDisplayData, displayOptions);

                if (displayOptions.hasCSS) {
                    let attributeName = techDisplayData.definition.getAttribute(WuxDef._expand);
                    let isChecked = displayOptions.autoExpand ? ` checked value="on"` : "";

                    return `<input type="hidden" class="wuxFeatureHeaderInteractBlock-flag" name="${attributeName}"${isChecked}>\n<div class="wuxFeatureExpandingContent">\n${output}\n</div>\n`;
                }
                else {
                    return output;
                }
            },

            setTechniqueDisplayFunctionBlock = function (techDisplayData, displayOptions) {

                let output = "";
                output += setTechniqueDisplayFunctionBlockFlavorText(techDisplayData, displayOptions);
                output += setTechniqueDisplayFunctionBlockTraits(techDisplayData, displayOptions);
                output += setTechniqueDisplayFunctionBlockDefinitions(techDisplayData, displayOptions);
                output += techniqueDisplayContentEffects.PrintAuto(techDisplayData, displayOptions);

                if (output != "") {
                    return `<div ${setFeatureStyle("wuxFeatureFunctionBlock", displayOptions)}>\n${output}\n</div>\n`;
                }
                return "";
            },

            setTechniqueDisplayFunctionBlockFlavorText = function (techDisplayData, displayOptions) {
                if (techDisplayData.flavorText != "") {
                    return setFeatureLine("wuxFeatureFunctionBlockFlavorText", techDisplayData.flavorText, displayOptions);
                }
                return "";
            },

            setTechniqueDisplayFunctionBlockTraits = function (techDisplayData, displayOptions) {
                if (techDisplayData.traits.length > 0) {
                    return setFeatureLineWithHeader("wuxFeatureFunctionBlockRow", "Traits", setTraits(techDisplayData.traits, "; ", displayOptions), displayOptions);
                }
                return "";
            },

            setTechniqueDisplayFunctionBlockDefinitions = function (techDisplayData, displayOptions) {
                if (techDisplayData.traits.length > 0) {
                    return setFeatureLineWithHeader("wuxFeatureFunctionBlockRow", "Definitions", setTraits(techDisplayData.definitions, "; ", displayOptions), displayOptions);
                }
                return "";
            },

            techniqueDisplayContentEffects = techniqueDisplayContentEffects || (function () {
                'use strict';

                var 

                printAuto = function (techDisplayData, displayOptions) {
                    let output = "";
                    if (techDisplayData.autoEffects.length > 0) {
                        output += setFeatureLine("wuxFeatureCheckHeader", "Effects", displayOptions);
                        output += setTechniqueDisplayCheckBlock(techDisplayData.autoEffects, displayOptions);
                    }
                    return output;
                },

                printEffects = function (techDisplayData, displayOptions) {
                    let output = "";
                    let defenseDisplay = "";
                    techDisplayData.effects.iterate(function (effectData, key) {
                        if (isNaN(parseInt(key))) {
                            let definition = WuxDef.Get(key);
                            defenseDisplay = WuxSheetMain.Tooltip.Text(`vs. ${definition.title}`, WuxDefinition.TooltipDescription(definition));
                        }
                        else {
                            defenseDisplay = `vs. DC ${key}`;
                        }
                        output += setFeatureLine("wuxFeatureCheckHeader", defenseDisplay, displayOptions);
                        output += setTechniqueDisplayCheckBlock(effectData, displayOptions);
                    });

                    if (output != "") {
                        return `<div ${setFeatureStyle("wuxFeatureEffectsBlock", displayOptions)}>\n${output}\n</div>\n`;
                    }
                    return output;
                },

                setTechniqueDisplayCheckBlock = function (techEffectsArray, displayOptions) {

                    if (techEffectsArray.length > 0) {
                        let effectsOutput = "";
                        for (let i = 0; i < techEffectsArray.length; i++) {
                            if (effectsOutput != "") {
                                effectsOutput += "\n";
                            }
                            effectsOutput += techEffectsArray[i];
                        }

                        return `<div ${setFeatureStyle("wuxFeatureCheckBlock", displayOptions)}>
                        <span ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>${effectsOutput}</span>
                        </div>\n`;
                    }
                    return "";
                }

                return {
                    PrintAuto: printAuto,
                    PrintEffects: printEffects
                };
            })()
            ;
            return {
                Print: print
            }
        })(),

        setFeatureLineWithHeader = function (featureStyle, header, contents, displayOptions) {
            if (contents != "") {
                return `<div ${setFeatureStyle(featureStyle, displayOptions)}>\n<span><strong>${header}: </strong></span>\n<span>${contents}</span>\n</div>\n`;
            }
            return "";
        },

        setFeatureLine = function (featureStyle, contents, displayOptions) {
            if (contents != "") {
                return `<div ${setFeatureStyle(featureStyle, displayOptions)}>\n<span>${contents}</span>\n</div>\n`;
            }
            return "";
        },

        setTraits = function (traits, delimeter, displayOptions) {
            if (traits.length > 0) {
                let output = "";
                let description = "";
                for (var i = 0; i < traits.length; i++) {
                    if (output != "") {
                        output += delimeter;
                    }
                    description = "";
                    for (let j = 0; j < traits[i].descriptions.length; j++) {
                        description += traits[i].descriptions[j] + " ";
                    }
                    if (displayOptions.hasCSS) {
                        output += `<div class="wuxTrait wuxTooltip">\n<span class="wuxTraitText">${traits[i].name}</span>\n<span class="wuxTooltipContent">${description}</span>\n</div>`;
                    }
                    else {
                        output += `<a style="margin-right: 10px; text-decoration: underline dotted;" title="${description}">${traits[i].name}</a>`;
                    }
                }
                return `<span class="wuxShownTraits">\n${output}\n</span>`;
            }
            return "";
        },

        setFeatureStyle = function (style, displayOptions) {
            if (displayOptions.hasCSS) {
                if (Array.isArray(style)) {
                    let output = "";
                    for (var i = 0; i < style.length; i++) {
                        if (output != "") {
                            output += " ";
                        }
                        output += style[i];
                    }
                    return `class="${output}"`;
                }
                else {
                    return `class="${style}"`;
                }
            }
            else {
                if (Array.isArray(style)) {
                    let output = "";
                    for (var i = 0; i < style.length; i++) {
                        if (output != "") {
                            output += " ";
                        }
                        output += getFeatureStyleSheetStyle(style[i]);
                    }
                    return `style="${output}"`;
                }
                else {
                    return `style="${getFeatureStyleSheetStyle(style)}"`;
                }
            }
        },

        getFeatureStyleSheetStyle = function (style) {
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
        }
        ;
    return {
        GetDisplayOptions: getDisplayOptions,
        Get: get
    };
}());

var WuxDefinition = WuxDefinition || (function () {
    'use strict';

    var
        get = function (key) {
            return new DefinitionData(values[key]);
        },
        getAttribute = function (key, mod, mod1) {
            let data = get(key);
            return data.getAttribute(mod, mod1);
        },
        getVariable = function (key, mod, mod1) {
            let data = get(key);
            return data.getVariable(mod, mod1);
        },
        getAbbreviation = function (key) {
            let data = get(key);
            if (data.abbreviation == "") {
                return data.name;
            }
            else {
                return data.abbreviation;
            }
        },
        getVariables = function (key, array, mod1) {
            let output = [];
            let data = get(key);
            for(let i = 0; i < array.length; i++) {
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
            let expandContents = `${WuxSheetMain.Header2(definitionData.title)}\n${definitionContents(definitionData)}`;
            return expandContents;
        },
        definitionContents = function(definitionData) {
            let expandContents = "";
            if(definitionData.subGroup != "") {
                expandContents += WuxSheetMain.Desc(`<em>${definitionData.subGroup}</em>`);
            }
            for (let i = 0; i < definitionData.descriptions.length; i++) {
                expandContents += "\n" + WuxSheetMain.Desc(definitionData.descriptions[i]);
            }
            return expandContents;
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

        buildText = function (definition, textContents) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
                WuxSheetMain.Desc(textContents);
        },

        buildTextInput = function (definition, fieldName) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
                WuxSheetMain.Input("text", fieldName);
        },

        buildTextarea = function (definition, fieldName, className, placeholder) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
                WuxSheetMain.Textarea(fieldName, className, placeholder);
        },

        buildNumberInput = function (definition, fieldName) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
                WuxSheetMain.Input("number", fieldName);
        },

        buildNumberLabelInput = function (definition, fieldName, labelContent) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
            WuxSheetMain.MultiRow(WuxSheetMain.Input("number", fieldName, "", "0") + WuxSheetMain.InputLabel(labelContent));
        },

        buildSelect = function (definition, fieldName, definitionGroup, showEmpty) {
            return WuxSheetMain.Header2(`${definition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`) + "\n" +
                WuxSheetMain.Select(fieldName, definitionGroup, showEmpty);
        }
        ;
    return {
        Get: get,
        GetAttribute: getAttribute,
        GetVariable: getVariable,
        GetAbbreviation: getAbbreviation,
        GetVariables: getVariables,
        GetGroupVariables: getGroupVariables,
        GetTitle: getTitle,
        GetDescription: getDescription,
        DisplayEntry: displayEntry,
        TooltipDescription: tooltipDescription,
        DefinitionContents: definitionContents,
        DisplayCollapsibleTitle: displayCollapsibleTitle,
        InfoHeader: infoHeader,
        BuildText: buildText,
        BuildTextInput: buildTextInput,
        BuildTextarea: buildTextarea,
        BuildNumberInput: buildNumberInput,
        BuildNumberLabelInput: buildNumberLabelInput,
        BuildSelect: buildSelect
    }
}());

var WuxSheetSidebar = WuxSheetSidebar || (function () {
    'use strict';

    var
        build = function (contents) {
            return `<div class="wuxFloatSidebar">${contents}</div>`;
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

        collapsibleHeader = function (categoryName, sectionName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxHeader">${categoryName}</div>`, sectionName, contents, defaultOpen);
        },

        collapsibleSubheader = function (categoryName, sectionName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxSubheader">${categoryName}</div>`, sectionName, contents, defaultOpen);
        },

        collapsibleSection = function (titleContent, sectionName, contents, defaultOpen) {
            return `<div class="wuxInteractiveBlock wuxSizeTiny">
            ${collapsibleSectionTitle(titleContent, sectionName)}
            ${collapsibleSectionContent(contents, sectionName, defaultOpen)}
            </div>`;
        },

        collapsibleSectionTitle = function (titleContent, sectionName) {
            return `<div class="wuxInteractiveInnerBlock">
                <input class="wuxInteractiveContent-flag" type="checkbox" name="attr_${sectionName}-expandButton">
                <div class="wuxInteractiveContent">
                <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_${sectionName}-expandButton">
                <span class="wuxInteractiveIcon">&#9662;</span>
                <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_${sectionName}-expandButton">
                <span class="wuxInteractiveAuxIcon">&#9656;</span>
                
                ${titleContent}
                </div>
            </div>`;
        },

        collapsibleSectionContent = function (contents, sectionName, defaultOpen) {
            return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="attr_${sectionName}-expandButton">
                <div class="${defaultOpen ? "wuxInteractiveExpandingAuxContent" : "wuxInteractiveExpandingContent"}">
                ${contents}
            </div>`;
        },

        buildPointsSection = function (attrName, header) {
            if (header == undefined) {
                header = `Build`;
            }
            let name = `Pts`;
            let output = `<span name='${attrName}' value="0">0</span>\n<span class="wuxFontSize7">/ </span>\n<span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;
            return `<div class="wuxHeader">&nbsp;${header}</div>\n${attributeSectionWithError(name, output, `${attrName}_error`)}`;
        }

        ;
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader,
        BuildPointsSection: buildPointsSection
    };
}());

var WuxSheetMain = WuxSheetMain || (function () {
    'use strict';

    var
        build = function (contents) {
            return `<div class="wuxMainContent">
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
            ${tabHeader(interactionElement.ExpandableBlockIcon(fieldName) + `<span>${title}</span>`)}
            ${tab(contents)}
            </div>`;
        },

        tabBlock = function (contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">\n<div class="wuxTabContent">\n${contents}\n</div>\n</div>`;
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

        sectionBlockHeaderFooter = function () {
            return `<div class="wuxSectionHeaderFooter"></div>`;
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

        span = function (fieldName) {
            return `<span name="${fieldName}"></span>`;
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

        customInput = function (type, fieldName, className, extras) {
            if (extras == undefined) {
                extras = "";
            }
            return `<input type="${type}" class="${className}" name="${fieldName}"${extras} />`
        },

        inputLabel = function(contents) {
            return `<div class="wuxInputLabel">${contents}</div>`;
        },

        textarea = function (fieldName, className, placeholder) {
            if (className == undefined) {
                className = "";
            }
            else {
                className = ` class="${className}"`;
            }
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return `<textarea${className} name="${fieldName}"${placeholder}></textarea>`;
        },

        select = function (fieldName, definitionGroup, showEmpty, className) {
            if (className == undefined) {
                className = "wuxInput";
            }
            else {
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
            }
            else {
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

        info = info || (function () {
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
                <div class="wuxTooltipButton">
                <input type="checkbox" name="${fieldName}">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
            },

            icon = function (contents) {
                return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
            },

            text = function (text, contents) {
                return `<div class="wuxTooltip">
                <div class="wuxTooltipText">\n${text}\n</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>`;
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
                    return `<div class="wuxFlexTableItemGroup${className != undefined ? ` ${className}` : ""}">\n${contents}\n</div>`;
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

        interactionElement = interactionElement || (function () {
            'use strict';
            var
                build = function (isExpanding, contents) {
                    return `<div class="wuxInteractiveBlock${isExpanding ? " wuxInteractiveExpandingBlock" : ""}">\n${contents}\n</div>`;
                },

                buildTooltipCheckboxInput = function (fieldName, contents, tooltipContents) {
                    return `<div class="wuxInteractiveBlock">
                    ${checkboxBlockIcon(fieldName, contents)}
                    ${WuxSheetMain.Tooltip.Icon(tooltipContents)}
                    </div>`;
                },

                buildTooltipRadioInput = function (fieldName, value, contents, tooltipContents) {
                    return `<div class="wuxInteractiveBlock">
                    ${radioBlockIcon(fieldName, value, contents)}
                    ${WuxSheetMain.Tooltip.Icon(tooltipContents)}
                    </div>`;
                },

                buildTooltipSelectInput = function (fieldName, definitionGroup, showEmpty, className, contents, tooltipContents) {
                    return `<div class="wuxInteractiveBlock">
                    ${select(fieldName, definitionGroup, showEmpty, className)}
                    <div class="wuxInteractiveSelectContent">
                    ${contents}
                    ${WuxSheetMain.Tooltip.Icon(tooltipContents)}
                    </div>
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

                innerBlock = function(contents) {
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
        }())

        ;
    return {
        Build: build,
        Tab: tab,
        TabHeader: tabHeader,
        CollapsibleTab: collapsibleTab,
        TabBlock: tabBlock,
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
        Info: info,
        Tooltip: tooltip,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    'use strict';

    var

        buildSection = function (contents, infoContents) {
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
            sideBarButtons += buildTabButton("radio", tabFieldName, "Options", "Options", selectedTab == "Options", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Chat", "Chat", selectedTab == "Chat", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Origin", "Origin", selectedTab == "Origin", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Details", "Details", selectedTab == "Details", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Overview", "Overview", selectedTab == "Overview", "") + "\n";

            let definition = WuxDef.Get("Page_Character");
            return buildSection(mainPageNavigation(definition, WuxDef.GetTitle(`Page_${selectedTab}`), buildStickySideTab(buildTabButtonRow(sideBarButtons))), 
                overviewInfoContents(definition.getAttribute(WuxDef._info), tabFieldName));
        },

        overviewInfoContents = function (fieldName, tabFieldName) {
            let output = "";
            output += WuxSheet.PageDisplayInput(tabFieldName, "Overview");
            output += WuxSheet.PageDisplay("Overview", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Overview")));
            output += WuxSheet.PageDisplay("Details", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Details")));
            output += WuxSheet.PageDisplay("Origin", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Origin")));
            output += WuxSheet.PageDisplay("Chat", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Chat")));
            output += WuxSheet.PageDisplay("Options", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Options")));
            return WuxSheetMain.Info.Contents(fieldName, output);
        },
        
        buildGearPageNavigation = function () {
            let definition = WuxDef.Get("Page_Gear");
            return buildSection(mainPageNavigation(definition, definition.title, ""), WuxSheetMain.Info.DefaultContents(definition));
        },
        
        buildActionsPageNavigation = function () {
            let definition = WuxDef.Get("Page_Actions");
            return buildSection(mainPageNavigation(definition, definition.title, ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        mainPageNavigation = function (definition, subheader, sideBarButtons) {
            let mainContents = "";
            mainContents += buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Actions", "Gear", "Styles", "Character"]);
            mainContents += sideBarButtons;
            mainContents += buildMainSheetHeader(subheader, definition.getAttribute(WuxDef._info));

            return mainContents;
        },

        buildMainSheetHeader = function (subheader, infoFieldName) {
            let header = `<input type="text" name="${WuxDef.GetAttribute("Display Name")}" placeholder="Display Name" />`;
            return buildHeader(header, subheader, infoFieldName);
        },

        buildOriginPageNavigation = function (definition) {
            return buildSection(characterCreationNavigation(definition, definition.title), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTrainingPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Training", trainingPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        trainingPageNavigation = function (definition, subheader) {
            let fieldName = WuxDef.GetAttribute("PageSet_Training");
            let mainContents = "";
            mainContents += buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Techniques", "Knowledge", "Training"]);
            mainContents += buildExitStickyButtons(fieldName, true);
            mainContents += buildHeader("Training", subheader, definition.getAttribute(WuxDef._info));
            return mainContents;
        },

        buildAdvancementPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Advancement", advancementPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        advancementPageNavigation = function (definition, subheader) {
            let fieldName = WuxDef.GetAttribute("PageSet_Advancement");
            let mainContents = buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Techniques", "Attributes", "Skills", "Jobs", "Advancement"]);
            mainContents += buildExitStickyButtons(fieldName, true);
            mainContents += buildHeader("Advancement", subheader, definition.getAttribute(WuxDef._info));
            return mainContents;
        },

        buildTechniquesNavigation = function () {
            let learnDefinition = WuxDef.Get("Page_LearnTechniques");
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let learnSubtitle = WuxDef.GetTitle("Page_LearnTechniques");
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Core", techniquesCorePageNavigation())}`;

            return buildSection(output, techniquesInfoContents(learnDefinition.getAttribute(WuxDef._info), tabFieldName));
        },

        techniquesCorePageNavigation = function () {
            let tabFieldName = WuxDef.GetAttribute("Page");
            let setStyleDefinition = WuxDef.Get("Page_SetStyles");
            let actionsDefinition = WuxDef.Get("Page_Actions");
            return `${WuxSheet.PageDisplayInput(tabFieldName, "Styles")}
            ${WuxSheet.PageDisplay("Styles", mainPageNavigation(setStyleDefinition, setStyleDefinition.title, ""))}
            ${WuxSheet.PageDisplay("Actions", mainPageNavigation(actionsDefinition, actionsDefinition.title, ""))}`;
        },

        techniquesInfoContents = function (infoFieldName, tabFieldName) {
            let output = "";
            output += WuxSheet.PageDisplayInput(tabFieldName, "Overview");
            output += WuxSheet.PageDisplay("Builder", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
            output += WuxSheet.PageDisplay("Training", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
            output += WuxSheet.PageDisplay("Advancement", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
            output += WuxSheet.PageDisplay("Core", WuxDefinition.TooltipDescription(WuxDef.Get("Page_SetStyles")));
            return WuxSheetMain.Info.Contents(infoFieldName, output);
        },

        characterCreationNavigation = function (definition, subheader) {
            let mainContents = buildCharacterCreationTabs(definition.title);
            mainContents += buildExitStickyButtons(WuxDef.GetAttribute("PageSet_Character Creator"), false);
            mainContents += buildHeader("Character Creation", subheader, definition.getAttribute(WuxDef._info));
            return mainContents;
        },

        buildCharacterCreationTabs = function (sheetName) {
            let output = "";
            let tabNames = ["Techniques", "Attributes", "Knowledge", "Skills", "Jobs", "Origin"];

            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio",  WuxDef.GetAttribute("Page"), tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildExitStickyButtons = function (fieldName, showExit) {
            let output = "";
            if (showExit) {
                output += buildTabButton("checkbox", `${fieldName}${WuxDef._exit}`, "Exit", "Exit", false, "") + "\n";
            }
            output += buildTabButton("checkbox", `${fieldName}${WuxDef._finish}`, "Finish", "Finish", false, "") + "\n";
            output = buildTabButtonRow(output);

            return buildStickySideTab(output);
        }
        ;
    return {
        BuildOverviewPageNavigation: buildOverviewPageNavigation,
        BuildGearPageNavigation: buildGearPageNavigation,
        BuildActionsPageNavigation: buildActionsPageNavigation,
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
    };

}());

var WuxSheet = WuxSheet || (function () {
    'use strict';

    var
        pageDispayInput = function (fieldName, value) {
            if (value == undefined) {
                value = "";
            }
            else {
                value = ` value="${value}"`;
            }
            return `<input type="hidden" class="wuxPageDisplay-Flag" name="${fieldName}"${value} />`
        },
        pageDisplay = function (fieldName, contents) {
            return `<div class="wuxPageDisplay-${fieldName}">\n${contents}\n</div>`;
        }
        ;
    return {
        PageDisplayInput: pageDispayInput,
        PageDisplay: pageDisplay
    };
}());

var WuxSheetBackend = WuxSheetBackend || (function () {
    'use strict';

    var
        onChange = function (variables, contents, hasEvents) {
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

    addDatabase(customDataNames, customData, defaultData) {
        this.addVariable("database", FormatJsonForDatabase(this.createDatabase(customDataNames, customData)));

        this.addFunction("get", `function(name) {
            let data = database[name];
            if (data == undefined) {
                return ${defaultData};
            }
            return data;
            }`
        );
        this.addPublicData("get");
    }

    createDatabase(customDataNames, customData) {
        let database = {};
        for(let i = 0; i < customData.length; i++) {
            database[customDataNames[i]] = customData[i];
        }
        return database;
    }

    formatJsonForDatabase(data) {
        let json = JSON.stringify(data);
        json = json.replace(/(},|],)/g, '$1\n');
        return json;
    }
      

    print (className) {
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

    printFormatClassData(dictionary, delimeter) {
        let key = "";
        let data = "";
        for (let i = 0; i < dictionary.keys.length; i++) {
          key = dictionary.keys[i];
          if (data != "") {
            data += `,
            `;
          }
          data += `${key}${delimeter}${dictionary.get(key)}`;
        }
        return data;
    }
}

var JavascriptDatabase = JavascriptDatabase || (function () {
    'use strict';

    var
        create = function(database, getFunction) {
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
            jsClassData.addFunction("getPropertyValues", getPropertyValues);
            jsClassData.addPublicData("get");
            jsClassData.addPublicData("getValues");
            jsClassData.addPublicData("has");
            jsClassData.addPublicData("iterate");
            jsClassData.addPublicData("filter");
            jsClassData.addPublicData("getSortedGroup");
            return jsClassData;
        },
        getValues = function (keyArray, delimeter) {
			if (keyArray == undefined || keyArray == "") {
				return [];
			}
			if (typeof keyArray == "string") {
				keyArray = keyArray.split(delimeter);
			}

			let output = [];
            let name = "";
            let lookup = "";
            let dataInfo;

            for (let i = 0; i < keyArray.length; i++) {
                name = "" + keyArray[i].trim();

                lookup = name;
                if (lookup.indexOf("(") >= 0) {
                    lookup = lookup.replace(/\([^)]*\)/g, "(X)");
                }

                dataInfo = get(lookup);
				if (dataInfo != undefined) {
					dataInfo.name = name;
					output.push(dataInfo);
				}
            }
            
			return output;
		},
        has = function(key) {
            return keys.includes(key);
        },
        iterate = function(callback) {
            for (let i = 0; i < keys.length; i++) {
                callback(values[keys[i]]);
            }
        },
        filter = function(filterData) {
            let filteredGroup;
            if(Array.isArray(filterData)) {
                filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
                let nextFilter = [];
                for (let i = 1; i < filterData.length; i++) {
                    if (filteredGroup == undefined || filteredGroup.length == 0) {
                        return [];
                    }
                    nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            }
            else {
                filteredGroup = getSortedGroup(filterData.property, filterData.value);
            }
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            return getGroupData(filteredGroup);
        },

        getSortedGroup = function(property, propertyValue) {
            return sortingGroups[property][propertyValue];
        },

        getGroupData = function(group) {
            let output = [];
            for (let i = 0; i < group.length; i++) {
                output.push(get(group[i]));
            }
            return output;
        },

        getPropertyValues = function(property) {
            let output = [];
            for (let key in sortingGroups[property]) {
                output.push(key);
            }
            return output;
        }
        ;
    return {
        Create: create
    };
}());








