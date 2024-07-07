function SetTechniquesDatabaseJson(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    arr0 = ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
    let techniqueDatabase = SheetsDatabase.CreateTechniques(arr0);
    return PrintLargeEntry(JSON.stringify(techniqueDatabase), "t");
}

function SetDefinitionsDatabase(definitionArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray) {
    let definitionDatabase = SheetsDatabase.CreateDefinitions(definitionArray);
    definitionDatabase.importSheets(skillsArray, function (arr) {
        let skill = new SkillData(arr);
        return skill.createDefinition();
    });
    definitionDatabase.importSheets(languageArray, function (arr) {
        let language = new LanguageData(arr);
        return language.createDefinition();
    });
    definitionDatabase.importSheets(loreArray, function (arr) {
        let lore = new LoreData(arr);
        return lore.createDefinition();
    });
    definitionDatabase.importSheets(jobsArray, function (arr) {
        let job = new LoreData(arr);
        return job.createDefinition();
    });
    definitionDatabase.importSheets(rolesArray, function (arr) {
        let role = new RoleData(arr);
        return role.createDefinition();
    });
    
    let jsClassData = JavascriptDatabase.Create(definitionDatabase, WuxDefinition.Get);
    jsClassData.addPublicFunction("getAttribute", WuxDefinition.GetAttribute);
    jsClassData.addPublicFunction("getVariable", WuxDefinition.GetVariable);
    jsClassData.addPublicFunction("getAbbreviation", WuxDefinition.GetAbbreviation);
    jsClassData.addPublicVariable("_max", `"_max"`);
    jsClassData.addPublicVariable("_rank", `"_rank"`);
    jsClassData.addPublicVariable("_build", "_build");
    
    jsClassData.addPublicVariable("_filter", `"_filter"`);
    jsClassData.addPublicVariable("_expand", `"_expand"`);
    
    jsClassData.addPublicVariable("_tab", `"_tab"`);
    jsClassData.addPublicVariable("_page", `"_page"`);
    
    jsClassData.addPublicVariable("_read", `"_read"`);
    jsClassData.addPublicVariable("_learn", `"_learn"`);
    jsClassData.addPublicVariable("_pts", `"_pts"`);
    return PrintLargeEntry(jsClassData.print("WuxDef"), "d");
}

function SetTechniquesDatabase(techniqueDatabaseString) {
    let techDb = SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString));
    let jsClassData = JavascriptDatabase.Create(techDb, WuxDefinition.Get);
    return PrintLargeEntry(jsClassData.print("WuxTechniqueDb"), "d");
}

function Test(stylesArray, techniqueDatabaseString) {
    return JSON.stringify(SheetsDatabase.CreateStyles(stylesArray));
	return PrintLargeEntry(DisplayTechniquesSheet.PrintTest(SheetsDatabase.CreateStyles(stylesArray), SheetsDatabase.CreateTechniques(JSON.parse(techniqueDatabaseString))), "t");
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

        createDefinitions = function (arr) {
            return new ExtendedDescriptionDatabase(["group"], arr, function (arr) {
                return new DefinitionData(arr);
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
        CreateDefinitions: createDefinitions
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
                showSelect: false,
                showTrigger: false,
                showKiCharge: false,
                showSelectIfFree: false,
            }
        },

        get = function (technique, displayOptions) {
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

            let prequel = "";
            if (displayOptions.showSelect) {
                prequel = `<input type="hidden" class="wuxFeature-flag" name="${displayOptions.techniqueDefinition.getAttribute(techDisplayData.fieldName)}">`;
            }

            return `${prequel}<div ${setFeatureStyle("wuxFeature", displayOptions)}>${contents}</div>\n`;
        },

        techniqueDisplayHeader = techniqueDisplayHeader || (function () {
            'use strict';

            var
            print = function (techDisplayData, displayOptions) {
                let output = "";
                output += setTechniqueDisplayHeaderSlotBox(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderExpandSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderSelectSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderUseSection(techDisplayData, displayOptions);
                output += setTechniqueDisplayHeaderNameFields(techDisplayData, displayOptions);

                output = `<div ${setFeatureStyle(["wuxFeatureHeader", `wuxFeatureHeader-${techDisplayData.actionType}`], displayOptions)}>\n${output}\n</div>\n`;
                output += setTechniqueDisplayHeaderExtentFeatures(techDisplayData, displayOptions);
                return output;
            },

            setTechniqueDisplayHeaderSlotBox = function (techDisplayData, displayOptions) {
                let techSetStyling = ["wuxFeatureType", `wuxFeatureType-${techDisplayData.techSetDisplay}`];
                return `<div ${setFeatureStyle(techSetStyling, displayOptions)}>
    <span ${setFeatureStyle("wuxFeatureTypeHeader", displayOptions)}>${techDisplayData.techSetTitle}</span>
    <span ${setFeatureStyle("wuxFeatureTypeFooter", displayOptions)}>${techDisplayData.techSetSub}</span>
    <span ${setFeatureStyle("wuxFeatureTypeFooter", displayOptions)}>${techDisplayData.techSetSub2}</span>
    </div>`;
            },

            setTechniqueDisplayHeaderExpandSection = function (techDisplayData, displayOptions) {
                if (displayOptions.hasCSS) {
                    // add the collapsible field
                    let attributeName = WuxDef.GetAttribute("Technique", techDisplayData.fieldName, WuxDef._expand);
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
                if (displayOptions.showSelect && (displayOptions.showSelectIfFree || !techDisplayData.isFree)) {
                    return `
    <div class="wuxFeatureHeaderInteractBlock">
    <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="${displayOptions.techniqueDefinition.getAttribute(techDisplayData.fieldName)}">
    <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${displayOptions.techniqueDefinition.getAttribute(techDisplayData.fieldName)}">
    <span class="wuxFeatureHeaderInteractiveIcon">&#9635;</span>
    <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${displayOptions.techniqueDefinition.getAttribute(techDisplayData.fieldName)}">
    <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9634;</span>
    </div>`;
                }
                return "";
            },

            setTechniqueDisplayHeaderUseSection = function (techDisplayData, displayOptions) {

                if (displayOptions.hasUseInteraction) {
                    // add technique data for the api
                    techDisplayData.technique.username = "@{character_name}";
                    let usedTechData = JSON.stringify(techDisplayData.technique);
                    usedTechData = Format.SanitizeSheetRollAction(usedTechData);

                    return `<div class="wuxFeatureHeaderInteractBlock">
    <button class="wuxFeatureHeaderInteractiveButton" type="roll" value="${FeatureService.GetRollTemplate(techDisplayData)}">i</button><button class="wuxFeatureHeaderInteractiveButton" type="roll" value="!ctech ${usedTechData}">9</button>
    </div>`;
                }

                return "";
            },

            setTechniqueDisplayHeaderNameFields = function (techDisplayData, displayOptions) {
                return `<div ${setFeatureStyle("wuxFeatureHeaderDisplayBlock", displayOptions)}>
    <span ${setFeatureStyle("wuxFeatureHeaderName", displayOptions)}>${techDisplayData.name}</span>
    <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.actionData}</div>
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
                    let attributeName = WuxDef.GetAttribute("Technique", techDisplayData.fieldName, WuxDef._expand);
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
                    if (techDisplayData.autoEffects.auto.length > 0) {
                        output += setFeatureLine("wuxFeatureCheckHeader", "Effects", displayOptions);
                        output += setTechniqueDisplayCheckBlock(techDisplayData.autoEffects.auto, false, displayOptions);
                    }
                    return output;
                },

                printEffects = function (techDisplayData, displayOptions) {
                    let output = "";
                    techDisplayData.effects.iterate(function (effect, key) {
                        output += setFeatureLine("wuxFeatureCheckHeader", `vs. ${isNaN(parseInt(key)) ? WuxDef.GetAbbreviation(key) : `DC ${key}`}`, displayOptions);
                        if(effect.auto.length > 0) {
                            output += setTechniqueDisplayCheckBlock(effect.auto, false, displayOptions);
                        }
                        if(effect.onPass.length > 0) {
                            output += setTechniqueDisplayCheckBlock(effect.onPass, true, displayOptions);
                        }
                    });

                    if (output != "") {
                        return `<div ${setFeatureStyle("wuxFeatureEffectsBlock", displayOptions)}>\n${output}\n</div>\n`;
                    }
                    return output;
                },

                setTechniqueDisplayCheckBlock = function (techEffectsArray, addOnPass, displayOptions) {

                    if (techEffectsArray.length > 0) {
                        let output = "";
                        if (addOnPass) {
                            output += setFeatureLine("wuxFeatureCheckBlockRowHeader", "On Success", displayOptions);
                        }
                        let effectsOutput = "";
                        for (let i = 0; i < techEffectsArray.length; i++) {
                            if (effectsOutput != "") {
                                effectsOutput += "\n";
                            }
                            effectsOutput += techEffectsArray[i];
                        }
                        output += `<span ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>${effectsOutput}</span>\n`;

                        return `<div ${setFeatureStyle("wuxFeatureCheckBlock", displayOptions)}>${output}</div>\n`;
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
                        output += `<div class="wuxTrait">\n<span class="wuxTraitText">${traits[i].name}</span>\n<span class="wuxTooltiptext">${description}</span>\n</div>`;
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

        displayEntry = function (dictionary, key) {
            let output = "";
            let entryData = dictionary.get(key).descriptions;

            output += WuxSheetMain.Header(key);
            for (let i = 0; i < entryData.length; i++) {
                output += "\n" + WuxSheetMain.Desc(entryData[i]);
            }

            return output;
        },

        displayCollapsibleTitle = function (definitionData, fieldName) {
            if (definitionData == undefined) {
                return "";
            }
            let expandContents = "";
            let entryData = definitionData.descriptions;
            if (Array.isArray(entryData)) {
                for (let i = 0; i < entryData.length; i++) {
                    expandContents += "\n" + WuxSheetMain.Desc(entryData[i]);
                }
            }

            let expandFieldName = `${fieldName}-expand`;

            let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
            ${WuxSheetMain.Header(definitionData.name, "span")}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

            return WuxSheetMain.InteractionElement.Build(true, output);
        }
        ;
    return {
        Get: get,
        GetAttribute: getAttribute,
        GetVariable: getVariable,
        GetAbbreviation: getAbbreviation,
        DisplayEntry: displayEntry,
        DisplayCollapsibleTitle: displayCollapsibleTitle
    }
}());

var WuxSheetSidebar = WuxSheetSidebar || (function () {
    'use strict';

    var
        build = function (contents) {
            return `<div class="wuxFloatSidebar">${contents}</div>`;
        },

        attributeSection = function (name, contents) {
            return `<div class="wuxDistinctSection wuxSizeInverse">
  <div class="wuxDistinctField">
  <span class="wuxDistinctSubtitle">${name}</span>
  <span class='wuxDistinctSubdata'>
  ${contents}
  </span>
  </div>
  </div>`;
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
            let output = `<span name='${attrName}' value="0">0</span>
  <span class="wuxFontSize7">/ </span>
  <span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;

            return `<div class="wuxHeader">&nbsp;${header}</div>
  ${WuxSheetSidebar.AttributeSection(name, output)}`;
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

        sectionBlock = function (contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">\n${contents}\n</div>`;
        },

        sectionBlockHeader = function (contents) {
            return `<div class="wuxSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
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

        collapsibleStyleSection = function (sectionName, title, contents) {
            let fieldName = `attr_${sectionName}-expand`;
            return `<div class="wuxSectionBlock wuxLayoutItem">
                <input class="wuxSectionContent-flag" type="hidden" name="${fieldName}" style="display: block">
                <div class="wuxStyleSectionHeader">\n${interactionElement.Build(true, `${interactionElement.ExpandableBlockIcon(fieldName)}${title}`)}\n</div>
                <div class="wuxSectionHeaderFooter"></div>
                <div class="wuxSectionContent">\n${contents}\n</div>
            </div>`;
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

        select = function (fieldName, definitionGroup) {
            let output = `<select class="wuxInput" name="${fieldName}" value="0">`;
            output += `\n<option value="0">-</option>`;

            for (let i = 0; i < definitionGroup.length; i++) {
                output += `\n<option value="${definitionGroup[i].variable}">${definitionGroup[i].name}</option>`;
            }
            output += `\n</select>`;
            return output;
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

        table = table || (function () {
            'use strict';

            var
                build = function (headers, data) {
                    let output = ``;
                    for (let i = 0; i < headers.length; i++) {
                        output += flextTableGroup(`${flexTableHeader(headers[i])}
                        ${flexTableData(data[i])}
                        `);
                    }
                    return flexTable(output);
                },

                flexTable = function (contents) {
                    return `<div class="wuxFlexTable">
                    ${contents}
                    </div>`;
                },

                flextTableGroup = function (contents) {
                    return `<div class="wuxFlexTableItemGroup">
  ${contents}
  </div>`;
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
                FlextTableGroup: flextTableGroup,
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
                }

            return {
                Build: build,
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
        Input: input,
        Select: select,
        MultiRowGroup: multiRowGroup,
        HiddenField: hiddenField,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    'use strict';

    var

        buildSection = function (contents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">
  <div class="wuxSectionBlock wuxLargeLayoutItem">
  ${contents}
  </div>
  </div>`;
        },

        buildCharacterCreationSplit = function (mainContents, characterCreationContents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="attr_finishedCharacterCreation" value="0">
  <div class="wuxHiddenBlockField">
  ${mainContents}
  </div>
  <input type="hidden" class="wuxHiddenField-flag" name="attr_finishedCharacterCreation" value="0">
  <div class="wuxHiddenBlockAuxField">
  ${characterCreationContents}
  </div>`;
        },

        buildStickySideTab = function (contents) {
            return `<div class="wuxStickySideTab">
  ${contents}
  </div>`;
        },

        buildTabButtonRow = function (contents) {
            return `<div class="wuxTabButtonRow">
  ${contents}
  </div>`;
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

        buildHeader = function (header, subheader) {
            return `<div class="wuxHeader2">${subheader}</div>
  <div class="wuxHeader">${header}</div>`;
        },

        buildTechniquesNavigation = function () {
            let sideBarContents = buildTabs("Learn", "attr_tab-techniques", ["Active", "Slot", "Learn"]);
            let mainContents = buildMainPageTabs("Techniques", sideBarContents);
            let characterCreationContents = buildCharacterCreationNavigation("Techniques");
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);

            return buildSection(output);
        },

        buildMainPageTabs = function (sheetName, sideBarButtons) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-characterSheet", ["Gear", "Techniques", "Chat", "Character"]);
            mainContents += sideBarButtons;
            mainContents += buildMainSheetHeader();

            return mainContents;
        },

        buildMainSheetHeader = function () {
            let header = `<input type="text" name="attr_nickname" placeholder="Display Name" />`;
            let subheader = `<span>Lv.</span>
  <span name="attr_base_level">1</span>
  <span style="width: 5px;">&nbsp;</span>
  <span class="wuxFullName" name="attr_full_name" placeholder="Full Name"></span>`;
            return buildHeader(header, subheader);
        },

        buildOriginPageNavigation = function (sheetName) {
            return buildSection(buildCharacterCreationNavigation(sheetName));
        },

        buildTrainingPageNavigation = function (sheetName) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-training", ["Knowledge", "Training"]);
            mainContents += buildExitStickyButtons("attr_tab-training");
            mainContents += buildHeader("Training", sheetName);

            let characterCreationContents = buildCharacterCreationNavigation(sheetName);
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);
            return buildSection(output);
        },

        buildAdvancementPageNavigation = function (sheetName) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-advancement", ["Attributes", "Skills", "Jobs", "Advancement"]);
            mainContents += buildExitStickyButtons("attr_tab-advancement");
            mainContents += buildHeader("Advancement", sheetName);

            let characterCreationContents = buildCharacterCreationNavigation(sheetName);
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);
            return buildSection(output);
        },

        buildCharacterCreationNavigation = function (sheetName) {
            let output = "";
            output += buildCharacterCreationTabs(sheetName);
            output += buildExitStickyButtons("attr_tab-characterCreation");
            output += buildHeader("Character Creation", sheetName);
            return output;
        },

        buildCharacterCreationTabs = function (sheetName) {
            let output = "";
            let fieldName = "attr_page-characterCreation";
            let tabNames = ["Techniques", "Attributes", "Knowledge", "Skills", "Jobs", "Origin"];

            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildExitStickyButtons = function (fieldName) {
            let output = "";
            output += buildTabButton("checkbox", `${fieldName}-exit`, "Exit", "Exit", false, "") + "\n";
            output += buildTabButton("checkbox", `${fieldName}-finish`, "Finish", "Finish", false, "") + "\n";
            output = buildTabButtonRow(output);

            return buildStickySideTab(output);
        }
        ;
    return {
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
    };

}());

var WuxSheet = WuxSheet || (function () {
    'use strict';

    var
        setDisplayStyle = function (sectionName, contents) {
            return `<div class="wuxCharacterSheetDisplayStyle-${sectionName}">
  ${contents}
  </div>`;
        }
        ;
    return {
        SetDisplayStyle: setDisplayStyle
    };
}());

var WuxSheetBackend = WuxSheetBackend || (function () {
    'use strict';

    var
        sheetWorker = function (variables, contents, hasEvents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `change:${variables[i]}`;
            }
            return `on("${output}", function (${hasEvents != undefined ? "eventinfo" : ""}) {
  ${contents}
  });
  `;
        }
        ;
    return {
        SheetWorker: sheetWorker
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
            let filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
            let filters = [];
            for (let i = 1; i < filterData.length; i++) {
                filters = getSortedGroup(filterData[i].property, filterData[i].value);
                filteredGroup = filteredGroup.filter(item => filters.includes(item))
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








