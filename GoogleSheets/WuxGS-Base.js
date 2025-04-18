// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

function CreateCharacterSheetTech(stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray) {
    let sheetsDb = SheetsDatabase.CreateDatabaseCollection(
        stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray
    );
    return PrintLargeEntry(BuildCharacterSheet.PrintTech(sheetsDb));
}

function CreateCharacterSheetBase(stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray) {
    let sheetsDb = SheetsDatabase.CreateDatabaseCollection(
        stylesArray, skillsArray, languageArray, loreArray, jobsArray, techniqueArray, goodsArray, gearArray, consumablesArray
    );
    return PrintLargeEntry(BuildCharacterSheet.PrintBase(sheetsDb));
}

var DisplayTechniquesSheet = DisplayTechniquesSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = WuxSheetNavigation.BuildTechniquesNavigation() +
                SideBarData.Print() +
                MainContentData.Print(sheetsDb.styles, sheetsDb.job, sheetsDb.techniques, sheetsDb.gear, sheetsDb.consumables);
            return WuxSheet.PageDisplay("Technique", output);
        },

        printTest = function (stylesDatabase) {
            let filters = [new DatabaseFilterData("group", "Advanced")];
            let filteredData = stylesDatabase.filter(filters);

            let output = "";
            for (let i = 0; i < filteredData.length; i++) {
                output += `${filteredData[i].name}, `;
            }
            return output;
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    let tabFieldName = WuxDef.GetAttribute("Page");
                    let actionSidebar = "";
                    actionSidebar += WuxSheetSidebar.BuildChatSection();
                    actionSidebar += WuxSheetSidebar.BuildChecksSection();
                    actionSidebar += WuxSheetSidebar.BuildBoonSection();
                    actionSidebar += WuxSheetSidebar.BuildStatusSection();
                    let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
					${WuxSheet.PageDisplay("Techniques", buildTechPointsSection(WuxDef.GetAttribute("Technique")))}
					${WuxSheet.PageDisplay("Styles", buildTechPointsSection(WuxDef.GetAttribute("JobStyle"), "Job") + buildTechPointsSection(WuxDef.GetAttribute("Style"), "Standard") + actionSidebar)}
					${WuxSheet.PageDisplay("Actions", actionSidebar)}`;

                    return WuxSheetSidebar.Build("", output);
                },

                buildTechPointsSection = function (fieldName, header) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, header);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function (stylesDatabase, jobDatabase, techniqueDatabase, gearDatabase, consumableDatabase) {

                    return WuxSheetMain.Build(buildTechniquesByGroup(stylesDatabase, jobDatabase, techniqueDatabase, gearDatabase, consumableDatabase));
                },

                buildTechniquesByGroup = function (stylesDatabase, jobDatabase, techniqueDatabase, gearDatabase, consumableDatabase) {
                    let techniqueDefinition = WuxDef.Get("Technique");
                    let displayOptions = getDisplayOptions(techniqueDefinition);
                    let output = "";
                    displayOptions.hasSelect = false;
                    output += buildGearStyle(gearDatabase, displayOptions);
                    output += buildJobStyle(jobDatabase, techniqueDatabase, displayOptions);
                    displayOptions.hasSelect = true;
                    output += buildAdvancedStyleGroup(stylesDatabase, techniqueDatabase, displayOptions);
                    output += buildSpecialStyleGroup(stylesDatabase, techniqueDatabase, displayOptions);
                    displayOptions.hasSelect = false;
                    output += buildBasicStyleGroup(stylesDatabase, techniqueDatabase, displayOptions);
                    return output;
                },

                getDisplayOptions = function (techniqueDefinition) {
                    let displayOptions = WuxPrintTechnique.GetDisplayOptions();
                    displayOptions.techniqueDefinition = techniqueDefinition;
                    displayOptions.hasCSS = true;
                    return displayOptions;
                },

                buildGearStyle = function (gearDatabase, displayOptions) {
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "GearGroup")]);
                    let techStyles = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        techStyles.push(buildUsableItemGroupFlexTableEntry(filteredData[i], gearDatabase, displayOptions));
                    }

                    return buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), "EqGear", "Equipped Gear Techniques");
                },

                buildConsumablesStyle = function (consumablesDatabase, displayOptions) {
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "ConsumableGroup")]);
                    let techStyles = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        techStyles.push(buildUsableItemGroupFlexTableEntry(filteredData[i], consumablesDatabase, displayOptions));
                    }

                    return buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), "EqConsumables", "Packed Consumables");
                },

                buildJobStyle = function (jobDatabase, techniqueDatabase, displayOptions) {
                    let techStyles = [];
                    jobDatabase.iterate(function (value) {
                        if (value != undefined) {
                            techStyles.push(buildJobGroupFlexTableEntry(value, techniqueDatabase, displayOptions));
                        }
                    });

                    return buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), "Job", "Job Techniques");
                },

                buildAdvancedStyleGroup = function (stylesDatabase, techniqueDatabase, displayOptions) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        let techFilterData = stylesDatabase.filter([new DatabaseFilterData("subGroup", filteredData[i].getTitle())]);
                        let techStyles = [];
                        for (let i = 0; i < techFilterData.length; i++) {
                            techStyles.push(buildStyleGroupFlexTableEntry(techFilterData[i], techniqueDatabase, displayOptions));
                        }
                        contents += WuxDefinition.InfoHeader(filteredData[i]) + WuxSheetMain.Table.FlexTable(techStyles);
                    }

                    return buildTechniqueStyleGroupTab(contents, "Advanced", "Advanced Techniques");
                },

                buildSpecialStyleGroup = function (stylesDatabase, techniqueDatabase, displayOptions) {
                    let filters = [new DatabaseFilterData("group", "Branched")];
                    let filteredData = stylesDatabase.filter(filters);

                    let techStyles = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        techStyles.push(buildStyleGroupFlexTableEntry(filteredData[i], techniqueDatabase, displayOptions));
                    }

                    return buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), "Branched", "Branched Techniques");
                },

                buildBasicStyleGroup = function (stylesDatabase, techniqueDatabase, displayOptions) {
                    let filters = [new DatabaseFilterData("group", "Basic")];
                    let filteredData = stylesDatabase.filter(filters);

                    let techStyles = [];
                    for (let i = 0; i < filteredData.length; i++) {
                        techStyles.push(buildStyleGroupFlexTableEntry(filteredData[i], techniqueDatabase, displayOptions));
                    }

                    return buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), "Basic", "Basic Techniques");
                },

                buildStyleGroupFlexTableEntry = function (style, techniqueDatabase, displayOptions) {
                    let styleDef = style.createDefinition(WuxDef.Get("Style"));
                    let groupContents = buildStyleInformation(styleDef);
                    groupContents += buildTechDatabaseTechniquesByStyleDefinition(styleDef, techniqueDatabase, displayOptions);
                    return buildTechniqueGroupFlexTableEntry(styleDef, groupContents, "Half wuxMinWidth220");
                },

                buildUsableItemGroupFlexTableEntry = function (itemDef, usableItemDatabase, displayOptions) {
                    let groupContents = buildUsableItemDatabaseTechniquesByGearGroup(itemDef, usableItemDatabase, displayOptions);
                    return buildTechniqueGroupFlexTableEntry(itemDef, groupContents, "Half wuxMinWidth220");
                },

                buildJobGroupFlexTableEntry = function (job, techniqueDatabase, displayOptions) {
                    let jobDef = job.createDefinition(WuxDef.Get("Job"));
                    let groupContents = buildTechDatabaseTechniquesByStyleDefinition(jobDef, techniqueDatabase, displayOptions);
                    return buildTechniqueGroupFlexTableEntry(jobDef, groupContents, "");
                },

                buildTechniqueGroupFlexTableEntry = function (groupDefinition, groupContents, flexTableStyling) {
                    let tabFieldName = WuxDef.GetAttribute("Page");
                    let interactionHeader = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(groupDefinition.getAttribute(WuxDef._expand))}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(groupDefinition.getAttribute(), WuxSheetMain.Header(groupDefinition.getTitle()))}`;
                    let normalHeader = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(groupDefinition.getAttribute(WuxDef._expand))} ${WuxSheetMain.Header(groupDefinition.getTitle())}`;

                    let contents = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
					${WuxSheet.PageDisplay("Techniques", normalHeader)}
					${WuxSheet.PageDisplay("Styles", interactionHeader)}
					${WuxSheet.PageDisplay("Actions", normalHeader)}
					${WuxSheetMain.SectionBlockHeaderFooter()}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(groupDefinition.getAttribute(WuxDef._expand),
                        WuxSheetMain.SectionBlockContents(groupContents))}`;

                    return `${WuxSheetMain.CustomInput("hidden", groupDefinition.getAttribute(WuxDef._filter), "wuxFlexTableItemGroup-flag", ` value="0"`)}
					${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents)), flexTableStyling)}`;
                },

                buildStyleInformation = function (styleDef) {
                    return buildStyleLearn(styleDef) + buildStyleDescription(styleDef);
                },

                buildStyleLearn = function (styleDef) {
                    let filterFieldName = styleDef.getAttribute(WuxDef._subfilter);
                    let tooltipDesc = WuxDefinition.TooltipDescription(WuxDef.Get("LearnStyle"));
                    let tooltip = WuxSheetMain.Tooltip.Icon(tooltipDesc);

                    let learnStyle = WuxSheetMain.HiddenAuxField(filterFieldName,
                            WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(styleDef.getAttribute(), styleDef.getAttribute(WuxDef._info),
                                WuxSheetMain.Header2("Learn Style"), tooltipDesc))
                        + WuxSheetMain.HiddenField(filterFieldName, WuxSheetMain.Header2("Learn Style") + tooltip)
                        + WuxSheetMain.Desc(`<strong>Requirements</strong>\n${styleDef.requirements}`);

                    let tabFieldName = WuxDef.GetAttribute("Page");
                    return `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
						${WuxSheet.PageDisplay("Techniques", learnStyle)}`;
                },

                buildStyleDescription = function (styleDef) {
                    return `${WuxSheetMain.Header2(`Description`)}
					${WuxSheetMain.Desc(styleDef.getDescription())}`;
                },

                buildTechDatabaseTechniquesByStyleDefinition = function (styleDef, techniqueDatabase, displayOptions) {
                    let output = WuxSheetMain.Header(`<span>Techniques</span>`);

                    let filters = [new DatabaseFilterData("style", styleDef.title)];
                    let filterFieldName = WuxDef.GetAttribute("Technique", WuxDef._filter);
                    let learnedTechs = createTechniquesByRequirements(techniqueDatabase.filter(filters), displayOptions);
                    let freeTechs = learnedTechs.get("Free");
                    let techHeader = WuxSheetMain.Row(WuxSheetMain.Header2(`Free Techniques`) + WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(WuxDef.Get("StyleFreeTechniques"))));
                    if (freeTechs.length > 0) {
                        output += WuxSheetMain.HiddenField(filterFieldName, techHeader);
                        for (let i = 0; i < freeTechs.length; i++) {
                            output += `\n${freeTechs[i]}`;
                        }
                    } else {
                        output += `${WuxSheetMain.HiddenField(filterFieldName, techHeader + WuxSheetMain.Desc("None"))}\n`;
                    }

                    let tierData = {};
                    for (let tier = 0; tier <= 9; tier++) {
                        tierData = learnedTechs.get(tier);
                        tierData.iterate(function (affinityData, affinity) {
                            techHeader = "";
                            if (tier != 0) {
                                techHeader += `Character Rank ${tier}`;
                            }
                            if (affinity != "") {
                                techHeader += (techHeader == "" ? "" : "; ") + `${affinity} Affinity`;
                            }
                            if (techHeader == "") {
                                techHeader = "Nothing";
                            }
                            output += `${WuxSheetMain.HiddenField(filterFieldName, WuxSheetMain.Row(WuxSheetMain.Header2(techHeader) + WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(WuxDef.Get("StyleTechniques")))))}`;
                            for (let i = 0; i < affinityData.length; i++) {
                                output += `\n${affinityData[i]}`;
                            }
                        });
                    }
                    return `${output}\n`;
                },

                createTechniquesByRequirements = function (techniques, displayOptions) {
                    let technique = {};
                    let techniqueDefinition;

                    let techniquesByRequrements = new Dictionary();
                    techniquesByRequrements.add("Free", []);
                    for (let i = 0; i <= 9; i++) {
                        techniquesByRequrements.add(i, new Dictionary());
                    }

                    for (let i = 0; i < techniques.length; i++) {
                        technique = new TechniqueData(techniques[i]);
                        if (technique.isFree) {
                            techniquesByRequrements.get("Free").push(buildTechnique(technique, displayOptions));
                        } else {
                            techniqueDefinition = technique.createDefinition(WuxDef.Get("Technique"));
                            let techniqueTierArray = techniquesByRequrements.get(techniqueDefinition.tier);
                            if (techniqueTierArray == undefined) {

                            } else {
                                if (!techniqueTierArray.has(techniqueDefinition.affinity)) {
                                    techniqueTierArray.add(techniqueDefinition.affinity, []);
                                }
                                techniqueTierArray.get(techniqueDefinition.affinity).push(buildTechnique(technique, displayOptions));
                            }
                        }
                    }

                    return techniquesByRequrements;
                },

                buildUsableItemDatabaseTechniquesByGearGroup = function (itemDef, usableItemDatabase, displayOptions) {
                    let output = WuxSheetMain.Header(`<span>Equipped Techniques</span>`);

                    let filters = [new DatabaseFilterData("group", itemDef.title)];
                    let filteredGear = usableItemDatabase.filter(filters);
                    let item;

                    for (let i = 0; i < filteredGear.length; i++) {
                        item = new UsableItemData(filteredGear[i]);
                        if (item.hasTechnique) {
                            output += `\n${buildTechnique(item.technique, displayOptions)}`;
                        }
                    }
                    return `${output}\n`;
                },

                buildTechnique = function (technique, displayOptions) {
                    let techDef = technique.createDefinition(WuxDef.Get("Technique"));
                    let fieldName = techDef.getAttribute(WuxDef._filter);

                    let output = "";
                    output += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="1">`;
                    output += WuxPrintTechnique.Get(technique, displayOptions);
                    return output;
                },

                buildTechniqueStyleGroupTab = function (contents, groupName, title) {
                    let styleDefinition = WuxDef.Get("StyleType");

                    return `${WuxSheetMain.CustomInput("hidden", styleDefinition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(styleDefinition.getAttribute(groupName, WuxDef._expand), title, WuxSheetMain.TabBlock(contents))}`;
                }

            return {
                Print: print
            };
        }())
    ;
    return {
        Print: print,
        PrintTest: printTest
    };
}());

var DisplayCoreCharacterSheet = DisplayCoreCharacterSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += WuxSheet.PageDisplayInput(WuxDef.GetAttribute("PageSet_Core", WuxDef._tab));
            output += printOverview(sheetsDb);
            output += printDetails(sheetsDb);
            output += printOrigin();
            output += printChat();
            output += printOptions();
            return WuxSheet.PageDisplay("Character", output);
        },

        printOverview = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Overview") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintOverview();
            return WuxSheet.PageDisplay("Overview", output);
        },

        printDetails = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Details") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintDetails();
            return WuxSheet.PageDisplay("Details", output);
        },

        printOrigin = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Origin") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintOrigin();
            return WuxSheet.PageDisplay("Origin", output);
        },

        printChat = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Chat") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintChat();
            return WuxSheet.PageDisplay("Chat", output);
        },

        printOptions = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Options") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintOptions();
            return WuxSheet.PageDisplay("Options", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printSidebar = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
                    contents += WuxSheetSidebar.BuildStatusSection();
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                PrintSidebar: printSidebar
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var

                printOverview = function () {
                    let contents = Overview.Build();
                    return WuxSheetMain.Build(contents);
                },
                Overview = Overview || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildCharacterSection();
                            contents += buildResourcesSection();
                            contents += buildStatusSection();
                            return contents;
                        },

                        buildCharacterSection = function () {
                            let contents = "";
                            contents += basics();
                            contents += influences();
                            contents += WuxSheetMain.MultiRowGroup([advancement(), training()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewCharacter");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildResourcesSection = function () {
                            let contents = "";
                            let contentData = [];
                            contentData.push(boons());
                            contentData = contentData.concat(resources());
                            contents += WuxSheetMain.MultiRowGroup(contentData, WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewResources");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildStatusSection = function () {
                            let contents = "";
                            contents += statuses();

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewStatus");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        basics = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildText(WuxDef.Get("FullName"), WuxSheetMain.Span(WuxDef.GetAttribute("FullName")));
                            return contents;
                        },

                        influences = function () {
                            let contents = "";
                            let influenceDef = WuxDef.Get("Soc_Influence");
                            let influenceTypeDef = WuxDef.Get("Soc_InfluenceType");
                            let severityDef = WuxDef.Get("Soc_Severity");

                            let influenceInfo = WuxDefinition.TooltipDescription(influenceDef);
                            influenceInfo += WuxDefinition.TooltipDescription(severityDef);
                            influenceInfo += WuxDefinition.TooltipDescription(WuxDef.Get("Svr_LowSeverity"));
                            influenceInfo += WuxDefinition.TooltipDescription(WuxDef.Get("Svr_ModerateSeverity"));
                            influenceInfo += WuxDefinition.TooltipDescription(WuxDef.Get("Svr_HighSeverity"));
                            influenceInfo = WuxSheetMain.Info.Contents(influenceDef.getAttribute(WuxDef._info), influenceInfo);

                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(influenceDef.getAttribute(WuxDef._info))}${influenceDef.title}`)}
							${influenceInfo}`;

                            let influenceContents = WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(influenceTypeDef.getAttribute(), WuxDef.Filter([new DatabaseFilterData("group", "InfluenceType")]), false, "wuxInfluenceType") +
                                WuxSheetMain.Select(severityDef.getAttribute(), WuxDef.Filter([new DatabaseFilterData("group", "SeverityRank")]), false, "wuxInfluenceType") +
                                WuxSheetMain.CustomInput("text", influenceDef.getAttribute(), "wuxInput wuxInfluenceDescription", ` placeholder="Influence Description"`)
                            );
                            let influenceHeaders = WuxSheetMain.Header2(`<div class="wuxInfluenceType">Type</div><div class="wuxInfluenceType">Severity</div><div class="wuxInfluenceType">Description</div>`);

                            contents += `<div>
								${influenceHeaders}
								<fieldset class="${WuxDef.GetVariable("RepeatingInfluences")}">
									${influenceContents}
								</fieldset>
							</div>`;
                            return contents;
                        },

                        advancement = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

                            let levelDefinition = WuxDef.Get("Level");
                            contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute()));

                            let xpDefinition = WuxDef.Get("XP");
                            contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.formula.getValue()}`);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        training = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Training");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

                            let levelDefinition = WuxDef.Get("Training");
                            contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute(WuxDef._max)));

                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.formula.getValue()}`);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        boons = function () {
                            let contents = "";
                            let boonDef = WuxDef.Get("Title_Boon");
                            let boonsDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);

                            let boonInfo = WuxDefinition.TooltipDescription(boonDef);
                            boonInfo = WuxSheetMain.Info.Contents(boonDef.getAttribute(WuxDef._info), boonInfo);

                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(boonDef.getAttribute(WuxDef._info))}${boonDef.title}`)}
							${boonInfo}`;

                            for (let i = 0; i < boonsDefs.length; i++) {
                                contents += WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(boonsDefs[i].getAttribute(), boonsDefs[i].getAttribute(WuxDef._info),
                                    WuxSheetMain.Header(boonsDefs[i].title), WuxDefinition.TooltipDescription(boonsDefs[i]));
                            }
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        resources = function () {
                            let output = [];

                            // add CR
                            let crDef = WuxDef.Get("CR");
                            let contents = `${WuxSheetMain.Header(`${crDef.title}`)}`;
                            contents += WuxDefinition.BuildNumberLabelInput(crDef, crDef.getAttribute(), `Max: <span name="${crDef.getAttribute(WuxDef._max)}"></span>`);
                            output.push(WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150"));

                            let groups = ["General", "Combat", "Social"];
                            for (let i = 0; i < groups.length; i++) {
                                let resourcesDef = WuxDef.Get(groups[i]);
                                let resourceDefs = WuxDef.Filter([new DatabaseFilterData("group", groups[i]), new DatabaseFilterData("hasMax", "true")]);

                                contents = `${WuxSheetMain.Header(`${resourcesDef.title}`)}`;
                                for (let j = 0; j < resourceDefs.length; j++) {
                                    contents += WuxDefinition.BuildNumberLabelInput(resourceDefs[j], resourceDefs[j].getAttribute(), `Max: <span name="${resourceDefs[j].getAttribute(WuxDef._max)}"></span>`);
                                }
                                output.push(WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150"));
                            }
                            return output;
                        },

                        statuses = function () {
                            let contents = "";
                            let statusDef = WuxDef.Get("Status");

                            let statusInfo = WuxDefinition.TooltipDescription(statusDef);
                            statusInfo = WuxSheetMain.Info.Contents(statusDef.getAttribute(WuxDef._info), statusInfo);
                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(statusDef.getAttribute(WuxDef._info))}${statusDef.title}`)}
							${statusInfo}`;

                            contents += statusNames(WuxDef.Get("Status"), WuxDef.Filter([new DatabaseFilterData("subGroup", "Status")]));
                            contents += statusNames(WuxDef.Get("Condition"), WuxDef.Filter([new DatabaseFilterData("subGroup", "Condition")]));
                            contents += statusNames(WuxDef.Get("Emotion"), WuxDef.Filter([new DatabaseFilterData("subGroup", "Emotion")]));

                            return contents;
                        },

                        statusNames = function (titleDef, statusDefs) {
                            let states = [];
                            for (let i = 0; i < statusDefs.length; i++) {
                                states.push(`<div class="wuxFlexTableItemGroup wuxMinWidth150">${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(statusDefs[i].getAttribute(), statusDefs[i].getAttribute(WuxDef._info),
                                    WuxSheetMain.Header(statusDefs[i].title), WuxDefinition.TooltipDescription(statusDefs[i]))}</div>`);
                            }
                            return WuxSheetMain.Header2(titleDef.title) + WuxSheetMain.MultiRowGroup(states, WuxSheetMain.Table.FlexTable, 3);
                        }

                    return {
                        Build: build
                    }
                }()),

                printDetails = function () {
                    let contents = Details.Build();
                    return WuxSheetMain.Build(contents);
                },
                Details = Details || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += createStatGroup("Attribute");
                            contents += createStatGroup("Defense");
                            contents += createStatGroup("Sense");
                            contents += createStatGroup("General");
                            contents += createStatGroup("Combat");
                            contents += createStatGroup("Skill");
                            return contents;
                        },

                        createStatGroup = function (groupName) {
                            let definition = WuxDef.Get(groupName);
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, createStatTable(groupName));
                        },

                        createStatTable = function (groupName) {
                            let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", groupName)]);
                            let output = "";
                            for (let i = 0; i < filteredStats.length; i++) {
                                output += createStatBlock(filteredStats[i]);
                            }
                            return WuxSheetMain.TabBlock(WuxSheetMain.Table.FlexTable(output));
                        },

                        createStatBlock = function (statDefinition) {
                            let header = `${statDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(statDefinition))}`;
                            let contents = "";
                            if (statDefinition.isResource) {
                                // contents += createStatBlockValueWithHeader("Current", statDefinition.getAttribute());
                                // contents += createStatBlockValueWithHeader("Max", statDefinition.getAttribute(WuxDef._max));
                                contents += createStatBlockValue(statDefinition.getAttribute(WuxDef._max));
                            } else {
                                contents += createStatBlockValue(statDefinition.getAttribute());
                            }
                            contents = WuxSheetMain.Table.FlexTable(contents);

                            let output = WuxSheetMain.Table.FlexTableHeader(header);
                            output += WuxSheetMain.Table.FlexTableData(contents);
                            return WuxSheetMain.Table.FlexTableGroup(output, " wuxMinWidth150");
                        },

                        createStatBlockValue = function (fieldName) {
                            return WuxSheetMain.Table.FlexTableGroup(`<span class="wuxFlexTableItemData wuxTextCenter" name="${fieldName}">0</span>`, " wuxMinWidth100");
                        }

                    return {
                        Build: build
                    }
                }()),

                printOrigin = function () {
                    let contents = Origin.Build();
                    return WuxSheetMain.Build(contents);
                },
                Origin = Origin || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = WuxSheetMain.MultiRowGroup([buildOrigin(), buildOriginStats()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Origin");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildOrigin = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_Origin"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("IntroName"), WuxDef.GetAttribute("IntroName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
                            contents += WuxDefinition.BuildTextarea(WuxDef.Get("Background"), WuxDef.GetAttribute("Background"), "wuxInput wuxHeight150");
                            contents = WuxSheetMain.Table.FlexTableGroup(contents);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildOriginStats = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginStats"));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("Affinity"), WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]));
                            contents += WuxSheetMain.DescField(WuxDef.GetAttribute("Affinity", WuxDef._learn));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("AdvancedAffinity"), WuxDef.GetAttribute("AdvancedAffinity"), WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]).concat(WuxDef.Filter([new DatabaseFilterData("group", "BranchType")])), true);
                            contents += WuxSheetMain.DescField(WuxDef.GetAttribute("AdvancedAffinity", WuxDef._learn));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("AdvancedBranch"), WuxDef.GetAttribute("AdvancedBranch"), WuxDef.Filter([new DatabaseFilterData("group", "BranchType")]), true);
                            contents += WuxSheetMain.DescField(WuxDef.GetAttribute("AdvancedBranch", WuxDef._learn));
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Cmb_Vitality"), WuxDef.GetAttribute("Cmb_Vitality", WuxDef._max), 1);
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("BonusAttributePoints"), WuxDef.GetAttribute("BonusAttributePoints"), 0);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        }

                    return {
                        Build: build
                    }
                }()),

                printChat = function () {
                    let contents = Chat.Build();
                    return WuxSheetMain.Build(contents);
                },
                Chat = Chat || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += createChatDisplay();
                            return contents;
                        },

                        createChatDisplay = function () {
                            let contents = WuxSheetMain.MultiRowGroup([outfitCollection(), languageSelect()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Chat");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        languageSelect = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_LanguageSelect");
                            contents += WuxDefinition.InfoHeader(titleDefinition);
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

                            let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                            for (let i = 0; i < languageFilters.length; i++) {
                                contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                                    WuxSheetMain.InteractionElement.BuildTooltipRadioInput(WuxDef.GetAttribute("Chat_Language"), WuxDef.GetAttribute("Chat_Language", WuxDef._info),
                                        languageFilters[i].title,
                                        languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
                                );
                            }

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        languageTitle = function (languageDef) {
                            return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
                        },

                        outfitCollection = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Outfits");
                            contents += WuxDefinition.InfoHeader(titleDefinition);
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_SetId"));
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Emotes"));
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_DefaultEmote"));

                            let outfitNameDef = WuxDef.Get("Chat_OutfitName");
                            let emoteContents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(outfitNameDef.getAttribute(WuxDef._expand))}
							${WuxSheetMain.InteractionElement.CheckboxBlockIcon(outfitNameDef.getAttribute(WuxDef._learn),
                                WuxSheetMain.Header(WuxSheetMain.Span(outfitNameDef.getAttribute(), "New Outfit")))}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(outfitNameDef.getAttribute(WuxDef._expand),
                                WuxSheetMain.SectionBlockContents(buildOutfitContents()))}`;

                            emoteContents = `<div class="wuxSectionBlock wuxMaxWidth220">\n${WuxSheetMain.InteractionElement.Build(true, emoteContents)}\n</div>`;

                            contents += `<div class="wuxRepeatingFlexSection">
								<fieldset class="${WuxDef.GetVariable("RepeatingOutfits")}">
									${emoteContents}
								</fieldset>
							</div>`;
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        buildOutfitContents = function () {
                            let contents = "";
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_OutfitEmotes", WuxDef._true));

                            let outfitNameDefinition = WuxDef.Get("Chat_OutfitName");
                            contents += WuxSheetMain.Header2(outfitNameDefinition.title) + "\n" +
                                WuxSheetMain.Input("text", outfitNameDefinition.getAttribute(), "New Outfit");

                            let outfitEmotesDef = WuxDef.Get("Chat_OutfitEmotes");
                            contents += WuxSheetMain.Header2(`${outfitEmotesDef.title}`) + "\n" +
                                WuxSheetMain.Textarea(outfitEmotesDef.getAttribute(), "wuxInput wuxHeight60");

                            contents += WuxSheetMain.Row("&nbsp;");

                            let defaultNameDefinition = WuxDef.Get("Chat_OutfitDefault");
                            let defaultURLDefinition = WuxDef.Get("Chat_OutfitDefaultURL");
                            contents += WuxSheetMain.Header2(defaultNameDefinition.title) + "\n" +
                                WuxSheetMain.Input("text", defaultNameDefinition.getAttribute());
                            contents += WuxSheetMain.Header2(defaultURLDefinition.title) + "\n" +
                                WuxSheetMain.Input("text", defaultURLDefinition.getAttribute(), "");
                            contents += WuxSheetMain.Row("&nbsp;");

                            let nameDefinition = WuxDef.Get("Chat_EmoteName");
                            let urlDefinition = WuxDef.Get("Chat_EmoteURL");
                            for (let i = 2; i <= 30; i++) {
                                contents += WuxSheetMain.Header2(`${nameDefinition.title} ${i}`) + "\n" +
                                    WuxSheetMain.Input("text", nameDefinition.getAttribute() + i);
                                contents += WuxSheetMain.Header2(`${urlDefinition.title} ${i}`) + "\n" +
                                    WuxSheetMain.Input("text", urlDefinition.getAttribute() + i);
                            }

                            return contents;
                        }


                    return {
                        Build: build
                    }
                }()),

                printOptions = function () {
                    let contents = Options.Build();
                    return WuxSheetMain.Build(contents);
                },
                Options = Options || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";

                            let definition = WuxDef.Get("Page_Options");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        }

                    return {
                        Build: build
                    }
                }())

            return {
                PrintOverview: printOverview,
                PrintDetails: printDetails,
                PrintOrigin: printOrigin,
                PrintChat: printChat,
                PrintOptions: printOptions
            }
        }());

    return {
        Print: print
    };
}());

var DisplayGearSheet = DisplayGearSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += printEquipment();
            return output;
        },

        printEquipment = function () {
            let output = WuxSheetNavigation.BuildGearPageNavigation("Gear") +
                SideBarData.PrintEquipment() +
                MainContentData.PrintEquipment();
            return WuxSheet.PageDisplay("Gear", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printEquipment = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
                    contents += WuxSheetSidebar.BuildStatusSection();
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                PrintEquipment: printEquipment
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                printEquipment = function () {
                    let contents = Equipment.Build();
                    return WuxSheetMain.Build(contents);
                },

                Equipment = Equipment || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildWearablesSection();
                            return contents;
                        },

                        buildWearablesSection = function () {
                            let contents = "";

                            contents += WuxSheetMain.MultiRowGroup([ownedWearables(), equippedWearables()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_GearWearables");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        ownedWearables = function () {
                            let repeatingDef = WuxDef.Get("RepeatingWearables");
                            let nameDef = WuxDef.Get("Gear_WearableName");
                            let actionsDef = WuxDef.Get("Gear_WearablesActions");
                            let bulkDef = WuxDef.Get("Gear_WearablesBulk");
                            
                            let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                                <div>
								${addRepeaterHeaderWearables(actionsDef, bulkDef, nameDef)}
								${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsWearables(actionsDef, bulkDef, nameDef))}
								${WuxSheetMain.Row("&nbsp;")}
								${addPopupWearables()}
							</div>`;
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                        },
                        
                        addRepeaterContentsWearables = function (actionDef, bulkDef, nameDef) {
                            let equipDef = WuxDef.Get("Gear_WearableIsEquipped");
                            let subMenuContents = "";
                            
                            return WuxSheetMain.MultiRow(`
                                <div class="wuxGearType">${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), subMenuContents)}</div>
                                <div class="wuxGearType"><span class="wuxDescription" name="${bulkDef.getAttribute()}">0</span></div>
                                <div class="wuxGearName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>`
                            );
                        },
                        
                        addRepeaterHeaderWearables = function (actionsDef, bulkDef, nameDef) {
                            return `<div class="wuxHeader2">
                                <div class="wuxGearType">${actionsDef.getTitle()}</div>
                                <div class="wuxGearType">${bulkDef.getTitle()}</div>
                                <div class="wuxGearName">${nameDef.getTitle()}</div>
                            </div>`;
                        },
                        
                        addPopupWearables = function () {
                            let headPopupDef = WuxDef.Get("Page_AddHeadGear");
                            let facePopupDef = WuxDef.Get("Page_AddFaceGear");
                            let chestPopupDef = WuxDef.Get("Page_AddChestGear");
                            let armPopupDef = WuxDef.Get("Page_AddArmGear");
                            let legPopupDef = WuxDef.Get("Page_AddLegGear");
                            let footPopupDef = WuxDef.Get("Page_AddFootGear");
                            
                            return `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_AddItem")}`)}
                            ${WuxSheetMain.MultiRowGroup([
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(headPopupDef.getAttribute(), headPopupDef.getTitle())),
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(facePopupDef.getAttribute(), facePopupDef.getTitle())),
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(chestPopupDef.getAttribute(), chestPopupDef.getTitle())),
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(armPopupDef.getAttribute(), armPopupDef.getTitle())),
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(legPopupDef.getAttribute(), legPopupDef.getTitle())),
                                WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(footPopupDef.getAttribute(), footPopupDef.getTitle()))], 
                                WuxSheetMain.Table.FlexTable, 3)}`;
                            
                        },

                        equippedWearables = function () {
                            let contents = "";

                            let equippedGearDef = WuxDef.Get("Page_GearEquippedGear");
                            contents += `${WuxSheetMain.Header(`${equippedGearDef.title}`)}`;

                            let filterData = WuxDef.Filter([new DatabaseFilterData("group", "GearGroup")]);
                            let emptyName = WuxDef.GetTitle("Page_GearEmpty");
                            for (let i = 0; i < filterData.length; i++) {
                                contents += WuxDefinition.BuildText(filterData[i], WuxSheetMain.Span(filterData[i].getAttribute()));
                                contents += WuxSheetMain.Input("hidden", filterData[i].getAttribute(), emptyName);
                            }
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        equippedTools = function () {
                            let contents = "";

                            let equippedGearDef = WuxDef.Get("Page_GearTools");
                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(equippedGearDef.getAttribute(WuxDef._info))}${equippedGearDef.title}`)}`;

                            let definition = WuxDef.Get("ToolSlot");
                            let emptyName = WuxDef.GetTitle("Page_GearEmpty");
                            for (let i = 1; i <= 6; i++) {
                                contents += WuxSheetMain.Header2(`${definition.title} ${i}`) + "\n" +
                                    WuxSheetMain.Desc(WuxSheetMain.Span(definition.getAttribute(i)));
                                contents += WuxSheetMain.Input("hidden", definition.getAttribute(i), emptyName);
                            }
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        equippedConsumables = function () {
                            let contents = "";

                            let equippedGearDef = WuxDef.Get("Page_GearConsumables");
                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(equippedGearDef.getAttribute(WuxDef._info))}${equippedGearDef.title}`)}`;

                            let definition = WuxDef.Get("ConsumableSlot");
                            let emptyName = WuxDef.GetTitle("Page_GearEmpty");
                            for (let i = 1; i <= 6; i++) {
                                contents += WuxSheetMain.Header2(`${definition.title} ${i}`) + "\n" +
                                    WuxSheetMain.Desc(WuxSheetMain.Span(definition.getAttribute(i)));
                                contents += WuxSheetMain.Input("hidden", definition.getAttribute(i), emptyName);
                            }
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },
        
                        buildRepeater = function (repeaterName, repeaterData) {
                            return `<div class="wuxNoRepControl">
                                <fieldset class="${repeaterName}">
                                    ${repeaterData}
                                </fieldset>
                            </div>`;
                        }

                    return {
                        Build: build
                    }
                }())

            return {
                PrintEquipment: printEquipment
            }
        }());

    return {
        Print: print
    };
}());

var DisplayPopups = DisplayPopups || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += printInspectionPopup();
            return printBasePopupSheet(output);
        },

        printBasePopupSheet = function (contents) {
            contents = ` <div class="wuxPopupOverlay">
                ${contents}
            </div>`;
            return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_PopupActive"), contents);
        },

        printInspectionPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_InspectPopupActive"),
                InspectionPopup.Print(), "Inspection",  WuxDef.GetAttribute("Popup_InspectPopupName")
            );
        },

        buildBasePopup = function (attribute, popupContents, popupHeader, popupHeaderName) {
            popupContents = `<div class="wuxPopup">
                <div class="wuxPopupHeader">
                    <span class="wuxPopupInnerHeader"${popupHeaderName != undefined ? ` name="${popupHeaderName}"` : ""}>${popupHeader}</span>
                    ${WuxSheetMain.Button(attribute, "Exit")}
                </div>
                ${popupContents}
            </div>`;
            return WuxSheetMain.HiddenField(attribute, popupContents);
        },

        InspectionPopup = InspectionPopup || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectType"), "") + "\n";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectId"), "") + "\n";
                    contents += buildInspectionPopupContentData(buildItemTemplate() + buildTechniqueTemplate() + buildAddButton());
                    contents += buildInspectionPopupContentData(buildItemRepeater());
                    return `<div class="wuxInspectionPopupContents">${contents}</div>`;
                },

                buildInspectionPopupContentData = function (contents) {
                    return `<div class="wuxInspectionPopupContentData">${contents}</div>`;
                },

                buildItemTemplate = function () {
                    return `
                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemName")}">
                    <div class="wuxHiddenField">
                        ${WuxSheetMain.Header("Item Data")}
                        <div class="wuxFeature">
                            <div class="wuxFeatureHeader wuxFeatureHeader-Item">
                                <div class="wuxFeatureHeaderDisplayBlock">
                                    <span class="wuxFeatureHeaderName" name="${WuxDef.GetAttribute("Popup_ItemName")}"></span>
                                    <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Popup_ItemGroup")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Popup_ItemStats")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Traits: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait0")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait0")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemTrait0")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemTrait0")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait0Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait0Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait0Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait0Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait0Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait1")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemTrait1")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemTrait1")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait1Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait1Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait1Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait1Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait1Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait2")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemTrait2")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemTrait2")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait2Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait2Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait2Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait2Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait2Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait3")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemTrait3")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemTrait3")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait3Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait3Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait3Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemTrait3Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemTrait3Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemDescription")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockFlavorText">
                                        <span name="${WuxDef.GetAttribute("Popup_ItemDescription")}"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraftSkill")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <div class="wuxFeatureHeaderInfo"><strong>Crafting Recipe</strong></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Popup_ItemCraftSkill")}"></span></div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraftStats")}" value="0" />
                                    <div class="wuxHiddenField">
                                        <div class="wuxFeatureHeaderInfo">
                                            <span><strong>Base Materials:</strong></span>
                                            <span name="${WuxDef.GetAttribute("Popup_ItemCraftStats")}"></span>
                                        </div>
                                    </div>
                                    
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Components: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraft0")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraft0")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemCraft0")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemCraft0")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemCraft0Desc")}"></span>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraft1")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemCraft1")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemCraft1")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemCraft1Desc")}"></span>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraft2")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemCraft2")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemCraft2")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemCraft2Desc")}"></span>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_ItemCraft3")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_ItemCraft3")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_ItemCraft3")}">-</span></div>
                                                    <span class="wuxDescription"><em>Item</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_ItemCraft3Desc")}"></span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },

                buildTechniqueTemplate = function () {
                    return `
                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechName")}">
                    <div class="wuxHiddenField">
                        ${WuxSheetMain.Header("Technique")}
                        <div class="wuxFeature">
                            <input type="hidden" class="wuxFeatureHeader-flag" name="${WuxDef.GetAttribute("Popup_TechActionType")}">
                            <div class="wuxFeatureHeader">
                                <div class="wuxFeatureHeaderDisplayBlock">
                                    <span class="wuxFeatureHeaderName" name="${WuxDef.GetAttribute("Popup_TechName")}"></span>
                                    <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Popup_TechResourceData")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Popup_TechTargetingData")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Traits: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait0")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechTrait0")}">-</span></div>
                                                    <span class="wuxDescription"><em>Technique Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait1")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait1")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechTrait1")}">-</span></div>
                                                    <span class="wuxDescription"><em>Technique Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait2")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait2")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechTrait2")}">-</span></div>
                                                    <span class="wuxDescription"><em>Technique Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait3")}" value="0" />
                                        <div class="wuxHiddenInlineField">
                                            <span>; </span>
                                            <span class="wuxTooltip">
                                                <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait3")}">-</span>
                                                <div class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechTrait3")}">-</span></div>
                                                    <span class="wuxDescription"><em>Technique Trait</em></span>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc0")}"></span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc2")}"></span>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrigger")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <span><strong>Trigger: </strong></span>
                                    <span name="${WuxDef.GetAttribute("Popup_TechTrigger")}"></span>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechRequirements")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <span><strong>Requirements: </strong></span>
                                    <span name="${WuxDef.GetAttribute("Popup_TechRequirements")}"></span>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq0")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <span><strong>Item Traits: </strong></span>
                                    <span class="wuxTooltip">
                                        <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq0")}">-</span>
                                        <div class="wuxTooltipContent">
                                            <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechItemReq0")}">-</span></div>
                                            <span class="wuxDescription"><em>Item Trait</em></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc0")}"></span>
                                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc1")}" value="0" />
                                            <div class="wuxHiddenField">
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc1")}"></span>
                                            </div>
                                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc2")}" value="0" />
                                            <div class="wuxHiddenField">
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc2")}"></span>
                                            </div>
                                        </div>
                                    </span>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq1")}" value="0" />
                                    <div class="wuxHiddenInlineField">
                                        <span> and </span>
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq1")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechItemReq1")}">-</span></div>
                                                <span class="wuxDescription"><em>Item Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc0")}"></span>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc1")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc1")}"></span>
                                                </div>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc2")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc2")}"></span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq2")}" value="0" />
                                    <div class="wuxHiddenInlineField">
                                        <span> and </span>
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq2")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechItemReq2")}">-</span></div>
                                                <span class="wuxDescription"><em>Item Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc0")}"></span>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc1")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc1")}"></span>
                                                </div>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc2")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc2")}"></span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechFlavorText")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockFlavorText">
                                        <span name="${WuxDef.GetAttribute("Popup_TechFlavorText")}"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="wuxFeatureEffectsBlock">
                                <div class="wuxFeatureCheckHeader">
                                    <span class="wuxTooltip">
                                        <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect0Name")}">Name</span>
                                        <div class="wuxTooltipContent">
                                            <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect0Name")}">Name</div>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect0Desc")}">Desc</span>
                                        </div>
                                    </span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect0")}">Effect</span>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect1Name")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckHeader">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect1Name")}">Name</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect1Name")}">Name</div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect1Desc")}">Desc</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckBlock">
                                        <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect1")}">Effect</span>
                                    </div>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect2Name")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckHeader">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect2Name")}">Name</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect2Name")}">Name</div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect2Desc")}">Desc</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckBlock">
                                        <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect2")}">Effect</span>
                                    </div>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect3Name")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckHeader">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect3Name")}">Name</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect3Name")}">Name</div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect3Desc")}">Desc</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect3")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckBlock">
                                        <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect3")}">Effect</span>
                                    </div>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect4Name")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckHeader">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect4Name")}">Name</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect4Name")}">Name</div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect4Desc")}">Desc</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect4")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckBlock">
                                        <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect4")}">Effect</span>
                                    </div>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect5Name")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckHeader">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechEffect5Name")}">Name</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechEffect5Name")}">Name</div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechEffect5Desc")}">Desc</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechEffect5")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureCheckBlock">
                                        <span class="wuxFeatureCheckBlockRow" name="${WuxDef.GetAttribute("Popup_TechEffect5")}">Effect</span>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef0")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockRow">
                                        <span><strong>Definitions: </strong></span>
                                        <span class="wuxTooltip"><span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechDef0")}">Name</span>
                                            <span class="wuxTooltipContent">
                                                <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechDef0")}">Name</span></div>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef0Desc0")}">Desc0</span>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef0Desc1")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef0Desc1")}"></span>
                                                </div>
                                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef0Desc2")}" value="0" />
                                                <div class="wuxHiddenField">
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef0Desc2")}"></span>
                                                </div>
                                            </span>
                                        </span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef1")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span class="wuxTooltip"><span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechDef1")}">Name</span>
                                                <span class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechDef1")}">Name</span></div>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef1Desc0")}">Desc0</span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef1Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef1Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef1Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef1Desc2")}"></span>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef2")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span class="wuxTooltip"><span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechDef2")}">Name</span>
                                                <span class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechDef2")}">Name</span></div>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef2Desc0")}">Desc0</span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef2Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef2Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef2Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef2Desc2")}"></span>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef3")}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span class="wuxTooltip"><span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechDef3")}">Name</span>
                                                <span class="wuxTooltipContent">
                                                    <div class="wuxHeader2"><span name="${WuxDef.GetAttribute("Popup_TechDef3")}">Name</span></div>
                                                    <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef3Desc0")}">Desc0</span>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef3Desc1")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef3Desc1")}"></span>
                                                    </div>
                                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechDef3Desc2")}" value="0" />
                                                    <div class="wuxHiddenField">
                                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechDef3Desc2")}"></span>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                },
                
                buildAddButton = function () {
                    return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"), 
                        WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"), `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`));
                },

                buildItemRepeater = function () {
                    let itemData = `<input type="hidden" class="wuxInspectionPopupSelectContainer-flag" name="${WuxDef.GetAttribute("Popup_ItemSelectIsOn")}">

                    <div class="wuxButton wuxInspectionPopupSelectContainer">
                        <input type="checkbox" name="${WuxDef.GetAttribute("Popup_ItemSelectIsOn")}">
                        <span name="${WuxDef.GetAttribute("Popup_ItemSelectName")}"></span>
                        <input type="hidden" name="${WuxDef.GetAttribute("Popup_ItemSelectType")}">
                    </div>`;

                    return `${WuxSheetMain.Header("Items in Group")}
                    ${buildRepeater(WuxDef.GetVariable("ItemPopupValues"), itemData)}`;
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl">
                        <fieldset class="${repeaterName}">
                            ${repeaterData}
                        </fieldset>
                    </div>`;
                }

            return {
                Print: print
            }
        }());

    return {
        Print: print
    };
}());