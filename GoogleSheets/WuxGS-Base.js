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

var DisplayFormeSheet = DisplayFormeSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildFormePageNavigation("Forme") +
                SideBarData.PrintForme() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Forme", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printForme = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
                    contents += WuxSheetSidebar.BuildStatusSection();
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                PrintForme: printForme
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildStyleSection("RepeatingJobStyles", "Page_JobStyles",
                        [{def: "Forme_JobSlot", countAttr:WuxDef.GetAttribute("JobSlots"), max: 3}]);
                    contents += buildStyleSection("RepeatingStyles", "Page_Styles",
                        [{def: "Forme_AdvancedSlot", countAttr:WuxDef.GetAttribute("AdvancedSlots"), max: 3},
                            {def: "Forme_StyleSlot", countAttr:WuxDef.GetAttribute("StyleSlots"), max: 6}]);
                    return WuxSheetMain.Build(contents);
                },

                buildStyleSection = function (repeatingSectionName, sectionDefName, slotDefNames) {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([learnedStyles(repeatingSectionName),
                        addEquippedSection(slotDefNames)], WuxSheetMain.Table.FlexTable, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDefinition = WuxDef.Get(sectionDefName);
                    return WuxSheetMain.CollapsibleTab(sectionDefinition.getAttribute(WuxDef._tab, WuxDef._expand), sectionDefinition.getTitle(), contents);
                },

                learnedStyles = function (repeatingSectionName) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsStyles())}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addRepeaterContentsStyles = function () {
                    let nameDef = WuxDef.Get("Forme_Name");
                    let tierDef = WuxDef.Get("Forme_Tier");
                    let actionDef = WuxDef.Get("Forme_Actions");

                    return WuxSheetMain.MultiRow(`
                        ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsStyles())}
                        <div class="wuxEquipableType"><span class="wuxDescription"><span>Tier </span><span name="${tierDef.getAttribute()}"></span></span></div>
                        <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>`
                    );
                },

                addSubmenuContentsStyles = function () {
                    let typeDef = WuxDef.Get("Forme_IsAdvanced");
                    let equippedDef = WuxDef.Get("Forme_IsEquipped");
                    let seeTechniquesDef = WuxDef.Get("Forme_SeeTechniques");

                    return `${WuxSheetMain.HiddenField(equippedDef.getAttribute(),
                        `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), `<span>${WuxDef.GetTitle("Forme_Unequip")}</span>`)}`)}
                        ${WuxSheetMain.HiddenAuxField(equippedDef.getAttribute(),
                        `${WuxSheetMain.HiddenField(typeDef.getAttribute(),
                            `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), `<span>${WuxDef.GetTitle("Forme_EquipAdvanced")}</span>`)}`)}
                        ${WuxSheetMain.HiddenAuxField(typeDef.getAttribute(),
                            `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), `<span>${WuxDef.GetTitle("Forme_Equip")}</span>`)}`)}`)}
                        ${WuxSheetMain.SubMenuOptionButton(seeTechniquesDef.getAttribute(), `<span>${seeTechniquesDef.getTitle()}</span>`)}
                    `;
                },

                addEquippedSection = function (slotDefNames) {
                    let contents = "";
                    contents += `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_Equipped")}`)}`;
                    let emptyName = WuxDef.GetTitle("Page_SlotEmpty");
                    if (!Array.isArray(slotDefNames)) {
                        slotDefNames = [slotDefNames];
                    }
                    slotDefNames.forEach((slotInfo) => {
                        let slotDef = WuxDef.Get(slotInfo.def);
                        for (let i = 1; i <= slotInfo.max; i++) {
                            contents += WuxSheetMain.HiddenIndexField(slotInfo.countAttr, i, buildEquipSlot(slotDef, i, emptyName));
                        }
                    })
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },
                
                buildEquipSlot = function (definition, index, emptyName) {
                    return `${WuxSheetMain.Header2(`${definition.title} ${index}`)}
                    ${WuxSheetMain.Input("hidden", definition.getAttribute(index + WuxDef._expand), "0")}
                    ${WuxSheetMain.HiddenField(definition.getAttribute(index), `<div class="wuxDescription">
                        ${WuxSheetMain.SubMenuButton(definition.getAttribute(index + WuxDef._expand),
                        addSubmenuContentsEquippedSlots(definition, index))}
                        ${WuxSheetMain.Span(definition.getAttribute(index))}
                    </div>`)}
                    ${WuxSheetMain.HiddenAuxField(definition.getAttribute(index), WuxSheetMain.Desc(`<span>${emptyName}</span>`))}`;
                },

                addSubmenuContentsEquippedSlots = function (definition, index) {
                    return `${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._build), 
                        `<span>${WuxDef.GetTitle("Forme_Unequip")}</span>`)}
                        ${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._info), 
                        `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`)}
                    `;
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

var DisplayGearSheet = DisplayGearSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildGearPageNavigation("Gear") +
                SideBarData.PrintEquipment() +
                MainContentData.Print();
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
                print = function () {
                    let contents = Equipment.Build();
                    return WuxSheetMain.Build(contents);
                },

                Equipment = Equipment || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildEquipment();
                            return contents;
                        },

                        buildEquipment = function () {
                            let contents = "";

                            contents += WuxSheetMain.MultiRowGroup([ownedEquipment(), equippedEquipment()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_GearEquipment");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        ownedEquipment = function () {
                            let repeatingDef = WuxDef.Get("RepeatingEquipment");
                            let nameDef = WuxDef.Get("Gear_ItemName");
                            let actionsDef = WuxDef.Get("Gear_ItemActions");

                            let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                                <div>
								${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsEquipment(actionsDef, nameDef))}
								${WuxSheetMain.Row("&nbsp;")}
								${addPopupEquipment()}
							</div>`;
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                        },

                        addRepeaterContentsEquipment = function (actionDef, nameDef) {
                            return WuxSheetMain.MultiRow(`
                                ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsEquipment())}
                                <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>`
                            );
                        },

                        addSubmenuContentsEquipment = function () {
                            let equippedDef = WuxDef.Get("Gear_ItemIsEquipped");
                            let equipWeaponDef = WuxDef.Get("Gear_EquipWeapon");
                            let deleteDef = WuxDef.Get("Gear_Delete");
                            let inspectDef = WuxDef.Get("Gear_Inspect");

                            return `${buildItemTemplate()}
                                ${WuxSheetMain.HiddenField(equippedDef.getAttribute(),
                                `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), `<span>${WuxDef.GetTitle("Gear_Unequip")}</span>`)}`)}
                                ${WuxSheetMain.HiddenAuxField(equippedDef.getAttribute(),
                                `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), WuxSheetMain.Span(WuxDef.GetAttribute("Gear_ItemEquipMenu")))}
                                    ${WuxSheetMain.SubMenuOptionButton(equipWeaponDef.getAttribute(), `<span>${equipWeaponDef.getTitle()}</span>`)}`)}
                                ${WuxSheetMain.SubMenuOptionButton(deleteDef.getAttribute(), `<span>${deleteDef.getTitle()}</span>`)}
                                ${WuxSheetMain.SubMenuOptionButton(inspectDef.getAttribute(), `<span>${inspectDef.getTitle()}</span>`)}
                            `;
                        },

                        buildItemTemplate = function () {
                            return `
                            <div class="wuxFeature">
                                <div class="wuxFeatureHeader wuxFeatureHeader-Item">
                                    <div class="wuxFeatureHeaderDisplayBlock">
                                        <span class="wuxFeatureHeaderName" name="${WuxDef.GetAttribute("Gear_ItemName")}"></span>
                                        <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Gear_ItemGroup")}"></span></div>
                                        <div class="wuxFeatureHeaderInfo"><span name="${WuxDef.GetAttribute("Gear_ItemStats")}"></span></div>
                                        <div class="wuxFeatureHeaderInfo">
                                            <span><strong>Traits: </strong></span>
                                            <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Gear_ItemTrait", 0)}" value="0" />
                                            <div class="wuxHiddenInlineAuxField">
                                                <span>None</span>
                                            </div>
                                            ${buildTooltipSection("Gear_ItemTrait", 0)}
                                            ${buildTooltipSection("Gear_ItemTrait", 1)}
                                            ${buildTooltipSection("Gear_ItemTrait", 2)}
                                            ${buildTooltipSection("Gear_ItemTrait", 3)}
                                        </div>
                                    </div>
                                </div>
                                
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Gear_ItemDescription")}" value="0" />
                                <div class="wuxHiddenField">
                                    <div class="wuxFeatureFunctionBlock">
                                        <div class="wuxFeatureFunctionBlockFlavorText">
                                            <span name="${WuxDef.GetAttribute("Gear_ItemDescription")}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        },

                        buildTooltipSection = function (baseAttribute, index, delimiter) {
                            return `<input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute(baseAttribute, index)}" value="0" />
                            <div class="wuxHiddenInlineField">
                                ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                                <span class="wuxTooltip">
                                    <span class="wuxTooltipText" name="${WuxDef.GetAttribute(baseAttribute, index)}">-</span>
                                    <div class="wuxTooltipContent">
                                        <div class="wuxHeader2"><span name="${WuxDef.GetAttribute(baseAttribute, index)}">-</span></div>
                                        <span class="wuxDescription"><em>Technique Trait</em></span>
                                        <span class="wuxDescription" name="${WuxDef.GetAttribute(baseAttribute, index + "desc0")}"></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute(baseAttribute, index + "desc1")}" value="0" />
                                        <div class="wuxHiddenField">
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute(baseAttribute, index + "desc1")}"></span>
                                        </div>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute(baseAttribute, index + "desc2")}" value="0" />
                                        <div class="wuxHiddenField">
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute(baseAttribute, index + "desc2")}"></span>
                                        </div>
                                    </div>
                                </span>
                            </div>`;
                        },

                        addPopupEquipment = function () {
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

                        equippedEquipment = function () {
                            let contents = "";
                            contents += `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_Equipped")}`)}`;
                            let emptyName = WuxDef.GetTitle("Page_SlotEmpty");
                            
                            let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
                            contents += buildEquipSlot(weaponSlotDef, 1, emptyName); 
                            
                            let slotDef = WuxDef.Get("Gear_EquipmentSlot");
                            let countAttr = WuxDef.GetAttribute("EquipmentSlots");
                            let maxSlots = 9;
                            
                            for (let i = 1; i <= maxSlots; i++) {
                                contents += WuxSheetMain.HiddenIndexField(countAttr, i, buildEquipSlot(slotDef, i, emptyName));
                            }
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        buildEquipSlot = function (definition, index, emptyName) {
                            return `${WuxSheetMain.Header2(`${definition.title} ${index}`)}
                            ${WuxSheetMain.Input("hidden", definition.getAttribute(index + WuxDef._expand), "0")}
                            ${WuxSheetMain.HiddenField(definition.getAttribute(index), `<div class="wuxDescription">
                                ${WuxSheetMain.SubMenuButton(definition.getAttribute(index + WuxDef._expand),
                                        addSubmenuContentsEquippedSlots(definition, index))}
                                ${WuxSheetMain.Span(definition.getAttribute(index))}
                            </div>`)}
                            ${WuxSheetMain.HiddenAuxField(definition.getAttribute(index), WuxSheetMain.Desc(`<span>${emptyName}</span>`))}`;
                        },

                        addSubmenuContentsEquippedSlots = function (definition, index) {
                            return `${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._build),
                                    `<span>${WuxDef.GetTitle("Forme_Unequip")}</span>`)}
                                ${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._info),
                                    `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`)}
                    `;
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
                Print: print
            }
        }());

    return {
        Print: print
    };
}());

var DisplayActionSheet = DisplayActionSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildActionsPageNavigation("Actions") +
                SideBarData.Print() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Actions", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
                    contents += WuxSheetSidebar.BuildStatusSection();
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return WuxSheetSidebar.Build("", contents);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildActionSection([
                            {repeater: "RepeatingJobTech", slot: "Forme_JobSlot", max: 3, slotMod: 0},
                            {repeater: "RepeatingAdvTech", slot: "Forme_AdvancedSlot", max: 3, slotMod: 0},
                            {repeater: "RepeatingAdvTech", slot: "Forme_StyleSlot", max: 9, slotMod: 3}],
                        "Action_Techniques");
                    return WuxSheetMain.Build(contents);
                },

                buildActionSection = function (repeaterSlotData, sectionDefName) {
                    let contents = "";

                    repeaterSlotData.forEach(function (repeaterData) {
                        contents += repeatingFormeTechniquesSection(repeaterData);
                    });
                    contents += repeatingBasicTechniquesSection("RepeatingGearTech");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicActions");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicRecovery");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicAttack");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicSocial");
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get(sectionDefName);
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents);
                },

                repeatingFormeTechniquesSection = function (repeaterData) {
                    let contents = "";
                    for (let i = 1; i <= repeaterData.max; i++) {
                        let repeatingFieldName = WuxDef.GetVariable(repeaterData.repeater, i + repeaterData.slotMod);
                        let slotFieldName = WuxDef.GetAttribute(repeaterData.slot, i);
                        contents += WuxSheetMain.HiddenField(slotFieldName, 
                            repeatingTechniquesSection(`<span name="${slotFieldName}"></span>`, repeatingFieldName)
                        );
                    }
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                repeatingBasicTechniquesSection = function (repeaterName) {
                    let repeatingDef = WuxDef.Get(repeaterName);

                    let contents = repeatingTechniquesSection(repeatingDef.getTitle(), repeatingDef.getVariable());
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },
                
                repeatingTechniquesSection = function (header, repeaterFieldName) {
                    return `${WuxSheetMain.Header(header)}
                        <div>
                        ${buildRepeater(repeaterFieldName, addRepeaterContentsStyles())}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                },

                addRepeaterContentsStyles = function () {
                    let submenuFieldName = WuxDef.GetAttribute("Action_Actions");

                    return buildListedTechniqueTemplate(submenuFieldName);
                },

                buildListedTechniqueTemplate = function (submenuFieldName) {
                    return `
                    <div class="wuxFeature wuxMinWidth220">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader wuxSubMenuSection">
                            <input type="checkbox" name="${submenuFieldName}">
                            ${buildBaseTechniqueHeaderContents(`<span class="wuxSubMenuText">l&nbsp;</span>`)}
                            <input type="hidden" class="wuxSubMenu-flag" name="${submenuFieldName}" value="0">
                            <div class="wuxSubMenuContent">\n${addSubmenuContentsStyles()}\n</div>
                        </div>
                        ${buildBaseTechniqueRequirements()}
                    </div>`;
                },

                addSubmenuContentsStyles = function () {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let inspectTechniqueDef = WuxDef.Get("Action_Inspect");

                    return `${WuxSheetMain.SubMenuOptionRollButton(useTechniqueDef.getAttribute(), useTechniqueDef.getVariable(), useTechniqueDef.getTitle())}
                        ${WuxSheetMain.SubMenuOptionButton(inspectTechniqueDef.getAttribute(), `<span>${inspectTechniqueDef.getTitle()}</span>`)}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuTechniqueTemplate()}
                    `;
                },

                buildSubmenuTechniqueTemplate = function () {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseTechniqueHeaderContents()}
                        </div>
                        ${buildBaseTechniqueRequirements()}
                        ${buildExtendedTechniqueData()}
                    </div>`;
                        
                },

                getActionAttribute = function(attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },
                
                buildBaseTechniqueHeaderContents = function (headerPrefix) {
                    return `<div class="wuxFeatureHeaderDisplayBlock">
                        <div class="wuxFeatureHeaderName">${headerPrefix != undefined ? headerPrefix : ""}<span name="${getActionAttribute("TechName")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionAttribute("TechResourceData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionAttribute("TechTargetingData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo">
                            <span><strong>Traits: </strong></span>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechTrait", 0)}" value="0" />
                            <div class="wuxHiddenInlineAuxField">
                                <span>None</span>
                            </div>
                            ${buildTooltipSection("TechTrait", 0)}
                            ${buildTooltipSection("TechTrait", 1)}
                            ${buildTooltipSection("TechTrait", 2)}
                            ${buildTooltipSection("TechTrait", 3)}
                            ${buildTooltipSection("TechTrait", 4)}
                        </div>
                    </div>`;
                },
                
                buildBaseTechniqueRequirements = function () {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechTrigger")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoTrigger">
                            <span><strong>Trigger: </strong></span>
                            <span name="${getActionAttribute("TechTrigger")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechRequirements")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoReq">
                            <span><strong>Requirements: </strong></span>
                            <span name="${getActionAttribute("TechRequirements")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechItemReq", 0)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoReq">
                            <span><strong>Item Traits: </strong></span>
                                ${buildTooltipSection("TechItemReq", 0, " and ")}
                                ${buildTooltipSection("TechItemReq", 1, " and ")}
                                ${buildTooltipSection("TechItemReq", 2, " and ")}
                        </div>
                    </div>`;
                },

                buildExtendedTechniqueData = function () {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechFlavorText")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureFunctionBlock">
                            <div class="wuxFeatureFunctionBlockFlavorText">
                                <span name="${getActionAttribute("TechFlavorText")}"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="wuxFeatureEffectsBlock">
                        ${addTechEffect(0)}
                        ${addTechEffect(1)}
                        ${addTechEffect(2)}
                        ${addTechEffect(3)}
                        ${addTechEffect(4)}
                        ${addTechEffect(5)}
                        ${addTechEffect(6)}
                        ${addTechEffect(7)}
                        ${addTechEffect(8)}
                        ${addTechEffect(9)}
                    </div>
                    
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechDef", 0)}" value="0" />
                    <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockRow">
                                        <span><strong>Definitions: </strong></span>
                                        ${buildTooltipSection("TechDef", 0)}
                                        ${buildTooltipSection("TechDef", 1)}
                                        ${buildTooltipSection("TechDef", 2)}
                                        ${buildTooltipSection("TechDef", 3)}
                                    </div>
                                </div>
                            </div>`;
                },

                buildTooltipSection = function (baseAttribute, index, delimiter) {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                        <span class="wuxTooltip">
                            <span class="wuxTooltipText" name="${getActionAttribute(baseAttribute, index)}">-</span>
                            <div class="wuxTooltipContent">
                                <div class="wuxHeader2"><span name="${getActionAttribute(baseAttribute, index)}">-</span></div>
                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                <span class="wuxDescription" name="${getActionAttribute(baseAttribute, index + "desc0")}"></span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute(baseAttribute, index + "desc1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionAttribute(baseAttribute, index + "desc1")}"></span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute(baseAttribute, index + "desc2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionAttribute(baseAttribute, index + "desc2")}"></span>
                                </div>
                            </div>
                        </span>
                    </div>`;
                },

                addTechEffect = function (index) {
                    return `<input type="hidden" name="${getActionAttribute("TechEffect", `${index}desc`)}" value="0" />
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechEffect", `${index}name`)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckHeader">
                            <span class="wuxTooltip">
                                <span class="wuxTooltipText" name="${getActionAttribute("TechEffect", `${index}name`)}">Name</span>
                                <div class="wuxTooltipContent">
                                    <div class="wuxHeader2"><span name="${getActionAttribute("TechEffect", `${index}name`)}">Name</span></div>
                                    <span class="wuxDescription" name="${getActionAttribute("TechEffect", `${index}desc`)}"></span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionAttribute("TechEffect", index)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckBlock">
                            <span class="wuxFeatureCheckBlockRow" name="${getActionAttribute("TechEffect", index)}">Effect</span>
                        </div>
                    </div>`;
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl wuxRepeatingFlexSection">
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

var DisplayPopups = DisplayPopups || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += printInspectionPopup();
            return printBasePopupSheet(output);
        },

        printBasePopupSheet = function (contents) {
            let popupActiveAttr = WuxDef.GetAttribute("Popup_PopupActive");
            contents = `<div class="wuxPopupOverlay">
                <input type="checkbox" class="wuxInput wuxPopupOverlayClose" name="${popupActiveAttr}" value="0" />
                ${contents}
            </div>`;

            return `${WuxSheetMain.HiddenField(popupActiveAttr, contents)}
            ${printSubMenuOverlay()}`;
        },

        printSubMenuOverlay = function () {
            let submenuActiveAttr = WuxDef.GetAttribute("Popup_SubMenuActive");
            return WuxSheetMain.HiddenField(submenuActiveAttr, `<div class="wuxSubMenuOverlay">
            ${WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_SubMenuActiveId"), "")}
            ${WuxSheetMain.Input("checkbox", submenuActiveAttr, "0")}
            </div>`);
        },

        printInspectionPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_InspectPopupActive"),
                InspectionPopup.Print(), "Inspection", WuxDef.GetAttribute("Popup_InspectPopupName")
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
                    contents += buildInspectionPopupContentData(buildAddButton() + buildItemTemplate() + buildTechniqueTemplate());
                    contents += buildInspectionPopupContentData(buildItemRepeater());
                    return `<div class="wuxInspectionPopupContents">${contents}</div>`;
                },

                buildInspectionPopupContentData = function (contents) {
                    return `<div class="wuxInspectionPopupContentData">${contents}</div>`;
                },

                buildItemTemplate = function () {
                    return `
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemName")}">
                    <div class="wuxHiddenField">
                        ${WuxSheetMain.Header("Item Data")}
                        <div class="wuxFeature">
                            <div class="wuxFeatureHeader wuxFeatureHeader-Item">
                                <div class="wuxFeatureHeaderDisplayBlock">
                                    <span class="wuxFeatureHeaderName" name="${getPopupAttribute("ItemName")}"></span>
                                    <div class="wuxFeatureHeaderInfo"><span name="${getPopupAttribute("ItemGroup")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${getPopupAttribute("ItemStats")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Traits: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemTrait", 0)}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        ${buildTooltipSection("ItemTrait", 0)}
                                        ${buildTooltipSection("ItemTrait", 1)}
                                        ${buildTooltipSection("ItemTrait", 2)}
                                        ${buildTooltipSection("ItemTrait", 3)}
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemDescription")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockFlavorText">
                                        <span name="${getPopupAttribute("ItemDescription")}"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemCraftSkill")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <div class="wuxFeatureHeaderInfo"><strong>Crafting Recipe</strong></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${getPopupAttribute("ItemCraftSkill")}"></span></div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemCraftMats")}" value="0" />
                                    <div class="wuxHiddenField">
                                        <div class="wuxFeatureHeaderInfo">
                                            <span><strong>Base Materials:</strong></span>
                                            <span name="${getPopupAttribute("ItemCraftMats")}"></span>
                                        </div>
                                    </div>
                                    
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Components: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("ItemCraft", 0)}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        ${buildTooltipSection("ItemCraft", 0)}
                                        ${buildTooltipSection("ItemCraft", 1)}
                                        ${buildTooltipSection("ItemCraft", 2)}
                                        ${buildTooltipSection("ItemCraft", 3)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },
                
                getPopupAttribute = function(attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Popup");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                buildTechniqueTemplate = function () {
                    return `
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechName")}">
                    <div class="wuxHiddenField">
                        ${WuxSheetMain.Header("Technique")}
                        <div class="wuxFeature">
                            <input type="hidden" class="wuxFeatureHeader-flag" name="${getPopupAttribute("TechActionType")}">
                            <div class="wuxFeatureHeader">
                                <div class="wuxFeatureHeaderDisplayBlock">
                                    <span class="wuxFeatureHeaderName" name="${getPopupAttribute("TechName")}"></span>
                                    <div class="wuxFeatureHeaderInfo"><span name="${getPopupAttribute("TechResourceData")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo"><span name="${getPopupAttribute("TechTargetingData")}"></span></div>
                                    <div class="wuxFeatureHeaderInfo">
                                        <span><strong>Traits: </strong></span>
                                        <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechTrait", 0)}" value="0" />
                                        <div class="wuxHiddenInlineAuxField">
                                            <span>None</span>
                                        </div>
                                        ${buildTooltipSection("TechTrait", 0)}
                                        ${buildTooltipSection("TechTrait", 1)}
                                        ${buildTooltipSection("TechTrait", 2)}
                                        ${buildTooltipSection("TechTrait", 3)}
                                        ${buildTooltipSection("TechTrait", 4)}
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechTrigger")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoTrigger">
                                    <span><strong>Trigger: </strong></span>
                                    <span name="${getPopupAttribute("TechTrigger")}"></span>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechRequirements")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <span><strong>Requirements: </strong></span>
                                    <span name="${getPopupAttribute("TechRequirements")}"></span>
                                </div>
                            </div>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechItemReq", 0)}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureHeaderInfoReq">
                                    <span><strong>Item Traits: </strong></span>
                                        ${buildTooltipSection("TechItemReq", 0, " and ")}
                                        ${buildTooltipSection("TechItemReq", 1, " and ")}
                                        ${buildTooltipSection("TechItemReq", 2, " and ")}
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechFlavorText")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockFlavorText">
                                        <span name="${getPopupAttribute("TechFlavorText")}"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="wuxFeatureEffectsBlock">
                                ${addTechEffect(0)}
                                ${addTechEffect(1)}
                                ${addTechEffect(2)}
                                ${addTechEffect(3)}
                                ${addTechEffect(4)}
                                ${addTechEffect(5)}
                                ${addTechEffect(6)}
                                ${addTechEffect(7)}
                                ${addTechEffect(8)}
                                ${addTechEffect(9)}
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechDef", 0)}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureFunctionBlock">
                                    <div class="wuxFeatureFunctionBlockRow">
                                        <span><strong>Definitions: </strong></span>
                                        ${buildTooltipSection("TechDef", 0)}
                                        ${buildTooltipSection("TechDef", 1)}
                                        ${buildTooltipSection("TechDef", 2)}
                                        ${buildTooltipSection("TechDef", 3)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                },

                buildTooltipSection = function (baseAttribute, index, delimiter) {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                        <span class="wuxTooltip">
                            <span class="wuxTooltipText" name="${getPopupAttribute(baseAttribute, index)}">-</span>
                            <div class="wuxTooltipContent">
                                <div class="wuxHeader2"><span name="${getPopupAttribute(baseAttribute, index)}">-</span></div>
                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                <span class="wuxDescription" name="${getPopupAttribute(baseAttribute, index + "desc0")}"></span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute(baseAttribute, index + "desc1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getPopupAttribute(baseAttribute, index + "desc1")}"></span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute(baseAttribute, index + "desc2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getPopupAttribute(baseAttribute, index + "desc2")}"></span>
                                </div>
                            </div>
                        </span>
                    </div>`;
                },

                addTechEffect = function (index) {
                    return `<input type="hidden" name="${getPopupAttribute("TechEffect", `${index}desc`)}" value="0" />
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechEffect", `${index}name`)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckHeader">
                            <span class="wuxTooltip">
                                <span class="wuxTooltipText" name="${getPopupAttribute("TechEffect", `${index}name`)}">Name</span>
                                <div class="wuxTooltipContent">
                                    <div class="wuxHeader2"><span name="${getPopupAttribute("TechEffect", `${index}name`)}">Name</span></div>
                                    <span class="wuxDescription" name="${getPopupAttribute("TechEffect", `${index}desc`)}"></span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechEffect", index)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckBlock">
                            <span class="wuxFeatureCheckBlockRow" name="${getPopupAttribute("TechEffect", index)}">Effect</span>
                        </div>
                    </div>`;
                },

                buildAddButton = function () {
                    return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                        WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"),
                            `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`));
                },

                buildItemRepeater = function () {
                    let itemSelectNameAttr = WuxDef.GetAttribute("Popup_ItemSelectName");
                    let itemSelectTypeAttr = WuxDef.GetAttribute("Popup_ItemSelectType");
                    let itemSelectDescAttr = WuxDef.GetAttribute("Popup_ItemSelectDesc");
                    let itemSelectIsOnAttr = WuxDef.GetAttribute("Popup_ItemSelectIsOn");
                    let itemData = `${WuxSheetMain.HiddenField(itemSelectTypeAttr,
                        `<input type="hidden" class="wuxInspectionPopupSelectContainer-flag" name="${itemSelectIsOnAttr}">
                        <div class="wuxButton wuxInspectionPopupSelectContainer">
                            <input type="checkbox" name="${itemSelectIsOnAttr}">
                            <span name="${itemSelectNameAttr}"></span>
                        </div>`)}
                        ${WuxSheetMain.HiddenAuxField(itemSelectTypeAttr, `${WuxSheetMain.Header2(WuxSheetMain.Span(itemSelectNameAttr))}
                        ${WuxSheetMain.HiddenField(itemSelectDescAttr, WuxSheetMain.Desc(WuxSheetMain.Span(itemSelectDescAttr)))}`)}
                    `;

                    let groupDef = WuxDef.Get("Popup_InspectSelectGroup")
                    return `${WuxSheetMain.Header(`<span name="${groupDef.getAttribute()}">${groupDef.getTitle()}</span>`)}
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