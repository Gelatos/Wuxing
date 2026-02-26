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
            output += printPost();
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

        printPost = function () {
            let output = WuxSheetNavigation.BuildOverviewPageNavigation("Post") +
                SideBarData.PrintSidebar() +
                MainContentData.PrintPost();
            return WuxSheet.PageDisplay("Post", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printSidebar = function () {
                    let contents = "";
                    contents += WuxSheetSidebar.BuildChatSection();
                    contents += WuxSheetSidebar.BuildChecksSection();
                    contents += WuxSheetSidebar.BuildBoonSection();
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
                            return contents;
                        },

                        buildCharacterSection = function () {
                            let contents = "";
                            contents += WuxSheetMain.MultiRowGroup([basics(), influences()], WuxSheetMain.Table.FlexTable, 2);
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

                        basics = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildText(WuxDef.Get("FullName"), 
                                WuxSheetMain.Span(WuxDef.GetAttribute("FullName")));
                            
                            let hiddenAttr = WuxDef.GetAttribute("AffinityAspect");
                            let affinityFilter = [WuxDef.Get("Unaspected")].concat(
                                WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])
                            );
                            contents += WuxSheetMain.HiddenFieldToggle(hiddenAttr,
                                WuxDefinition.BuildText(WuxDef.Get("Affinity"),
                                    WuxSheetMain.Span(WuxDef.GetAttribute("Affinity"))),
                                WuxDefinition.BuildSelect(WuxDef.Get("AffinityAspect"), 
                                    WuxDef.GetAttribute("Affinity"), affinityFilter, false)
                            );
                            
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        influences = function () {
                            let contents = "";
                            let influenceDef = WuxDef.Get("Soc_Influence");
                            let usingInfluences = WuxDef.Get("Title_UsingInfluences");

                            let influenceInfo = WuxDefinition.TooltipDescription(influenceDef);
                            influenceInfo += WuxDefinition.TooltipDescription(usingInfluences);
                            influenceInfo = WuxSheetMain.Info.Contents(influenceDef.getAttribute(WuxDef._info), influenceInfo);

                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(influenceDef.getAttribute(WuxDef._info))}${influenceDef.title}`)}
							${influenceInfo}`;

                            let influenceContents = WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(
                                    WuxDef.GetAttribute("Soc_Severity"),
                                    WuxDef.Filter([new DatabaseFilterData("group", "SeverityRank")]),
                                    false,
                                    "wuxInfluenceType") +
                                WuxSheetMain.CustomInput(
                                    "text",
                                    influenceDef.getAttribute(),
                                    "wuxInput wuxInfluenceDescription",
                                    ` placeholder="Influence"`)
                            );
                            influenceContents += WuxSheetMain.Textarea(WuxDef.GetAttribute("Soc_InfluenceDesc"),
                                "wuxInput wuxHeight30", WuxDef.GetTitle("Soc_InfluenceDesc"));

                            contents += `<div>
								<fieldset class="${WuxDef.GetVariable("RepeatingInfluences")}">
									${influenceContents}
								</fieldset>
							</div>`;
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        advancement = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`, "wuxWidth160"));

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

                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`, "wuxWidth160"));

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
                            contents += WuxDefinition.BuildNumberLabelInput(crDef, crDef.getAttribute(), 
                                `Max: <span name="${crDef.getAttribute(WuxDef._max)}"></span>`);

                            let potencyDefinition = WuxDef.Get("SB_MAX");
                            contents += WuxDefinition.BuildText(potencyDefinition, WuxSheetMain.Span(potencyDefinition.getAttribute()));
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
                            contents += buildOrigin();
                            contents += createStatGroup("Attribute");
                            contents += createStatGroup("Defense");
                            contents += createStatGroup("Sense");
                            contents += createStatGroup("General");
                            contents += createStatGroup("Combat");
                            contents += createStatGroup("Skill");
                            return contents;
                        },

                        buildOrigin = function () {
                            let contents = "";
                            contents += WuxSheetMain.Header("Basics");
                            contents += `${WuxSheetMain.MultiRowGroup([backgroundBasics(), backgroundBackstory()], WuxSheetMain.Table.FlexTable, 2)}`;
                            contents += WuxSheetMain.Header("Background Generator");
                            contents += backgroundGenerator();

                            let definition = WuxDef.Get("Page_Origin")
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, WuxSheetMain.TabBlock(contents));
                        },

                        backgroundBasics = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), WuxDef.GetAttribute("DisplayName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"),
                                WuxDef.Filter([new DatabaseFilterData("group", "GenderType")]), true);
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("Ancestry"), WuxDef.GetAttribute("Ancestry"),
                                WuxDef.Filter([new DatabaseFilterData("group", "AncestryType")]));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
                                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
                                WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true);
                            // contents += WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("Affinity"),
                            //         WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]));
                            contents = WuxSheetMain.Table.FlexTableGroup(contents);
                            return contents;
                        },

                        backgroundBackstory = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
                                "wuxInput wuxHeight30");
                            contents += WuxDefinition.BuildTextarea(WuxDef.Get("Backstory"), WuxDef.GetAttribute("Backstory"),
                                "wuxInput wuxHeight150");
                            contents = WuxSheetMain.Table.FlexTableGroup(contents);
                            return contents;
                        },

                        backgroundGenerator = function () {
                            let leftColmun = "";
                            leftColmun += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenName"), WuxDef.GetAttribute("Note_GenName"));
                            leftColmun += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenFullName"), WuxDef.GetAttribute("Note_GenFullName"));
                            leftColmun += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenGender"), WuxDef.GetAttribute("Note_GenGender"));
                            leftColmun += WuxDefinition.BuildSelect(WuxDef.Get("Note_GenHomeRegion"), WuxDef.GetAttribute("Note_GenHomeRegion"),
                                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
                            leftColmun += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenRace"), WuxDef.GetAttribute("Note_GenRace"));
                            leftColmun = WuxSheetMain.Table.FlexTableGroup(leftColmun);

                            let rightColumn = "";
                            let generatorDefinition = WuxDef.Get("Note_GenerateCharacter");
                            let useDefinition = WuxDef.Get("Note_UseGeneration");
                            let clearDefinition = WuxDef.Get("Note_ClearBackground");
                            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenPersonality"), WuxDef.GetAttribute("Note_GenPersonality"));
                            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenMotivation"), WuxDef.GetAttribute("Note_GenMotivation"));
                            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(generatorDefinition.getAttribute(), generatorDefinition.getTitle()));
                            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(useDefinition.getAttribute(), useDefinition.getTitle()));
                            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(clearDefinition.getAttribute(), clearDefinition.getTitle()));
                            rightColumn = WuxSheetMain.Table.FlexTableGroup(rightColumn);

                            return `${WuxSheetMain.MultiRowGroup([leftColmun, rightColumn], WuxSheetMain.Table.FlexTable, 2)}`;
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

                printPost = function () {
                    let contents = Post.Build();
                    return WuxSheetMain.Build(contents);
                },
                Post = Post || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += createChatDisplay();
                            contents += createNotebookDisplay();
                            return contents;
                        },

                        createChatDisplay = function () {
                            let contents = WuxSheetMain.MultiRowGroup([outfitCollection(), languageSelect()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Title_Emotes");
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
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostName"));
                            contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostURL"));

                            let outfitNameDef = WuxDef.Get("Chat_OutfitName");
                            let emoteContents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(outfitNameDef.getAttribute(WuxDef._expand))}
							${WuxSheetMain.InteractionElement.CheckboxBlockIcon(outfitNameDef.getAttribute(WuxDef._learn),
                                WuxSheetMain.Header(WuxSheetMain.Span(outfitNameDef.getAttribute(), "New Outfit")))}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(outfitNameDef.getAttribute(WuxDef._expand),
                                WuxSheetMain.SectionBlockContents(buildOutfitContents()))}`;

                            emoteContents = `<div class="wuxSectionBlock wuxMinWidth200 wuxMaxWidth220">
                                ${WuxSheetMain.InteractionElement.Build(true, emoteContents)}
                            </div>`;

                            contents += `<div class="wuxRepeatingFlexSection">
								<fieldset class="${WuxDef.GetVariable("RepeatingOutfits")}">
									${emoteContents}
								</fieldset>
							</div>`;
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
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
                        },
                        

                        createNotebookDisplay = function () {
                            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
                            let contents = WuxSheetMain.MultiRowGroup([notebookSelect(notebookCount), notebookPages(notebookCount)], 
                                WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Title_Notebook");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        notebookSelect = function (notebookCount) {
                            let staticNotebooks = "";
                            for (let i = 0; i < notebookCount; i++) {
                                staticNotebooks += addStaticNotebooks(i);
                                staticNotebooks += WuxSheetMain.Row("&nbsp;");
                            }
                            let repeatingDef = WuxDef.Get("Notebooks");
                            let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                            <div>
                                ${staticNotebooks}
                                ${WuxSheetMain.Row("&nbsp;")}
                            </div>`;

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },
                        addStaticNotebooks = function (count) {
                            let nameDef = WuxDef.Get("Note_NotebookName");
                            let actionDef = WuxDef.Get("Note_NotebookActions");

                            return `
                            <div class="wuxEquipableSubMenu">
                                ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(count), addSubmenuContentsStaticNotebooks(count))}
                            </div>
                            ${WuxSheetMain.CustomInput("text", nameDef.getAttribute(count), 
                                "wuxInput wuxWidth160", ` placeholder="Notebook ${count + 1}"`)}`;
                        },
                        addSubmenuContentsStaticNotebooks = function (count) {
                            let openDef = WuxDef.Get("Note_NotebookOpen");

                            return `
                                ${WuxSheetMain.SubMenuOptionButton(openDef.getAttribute(count), `<span>${openDef.getTitle()}</span>`)}
                            `;
                        },

                        notebookPages = function (notebookCount) {
                            let contents = "";
                            contents += addStaticNotebookPagesDisplay(notebookCount);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
                        },
                        addStaticNotebookPagesDisplay = function (notebookCount) {
                            let repeatingDef = WuxDef.Get("NotebookPages");
                            let staticNotebookPages = "";
                            for (let i = 0; i < notebookCount; i++) {
                                staticNotebookPages += WuxSheetMain.HiddenUniqueIndexField(WuxDef.GetAttribute("Note_OpenNotebook"), i, 
                                    `${WuxSheetMain.Header(WuxSheetMain.Span(WuxDef.GetAttribute("Note_NotebookName", i)) + "<span> Pages</span>")}
                                ${buildRepeater(repeatingDef.getVariable(i), addRepeaterContentsNotebookPages())}
                                ${WuxSheetMain.Row("&nbsp;")}`)
                            }
                            return `
                            <div>
                                ${staticNotebookPages}
                            </div>`;
                        },
                        addRepeaterContentsNotebookPages = function () {
                            let contents = "";
                            contents += addNotebookPageHeader();
                            contents += addNotebookPageContents();
                            contents += WuxSheetMain.Row("&nbsp;");
                            return contents;
                        },
                        addNotebookPageHeader = function () {
                            let deleteDef = WuxDef.Get("Note_PageDelete");
                            let templateDataDef = WuxDef.Get("Note_PageTemplateData");

                            return WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(
                                    WuxDef.GetAttribute("Note_PageType"),
                                    WuxDef.Filter([new DatabaseFilterData("group", "PostType")]),
                                    false,
                                    "wuxInfluenceType") +
                                addPostButton() +
                                WuxSheetMain.Button(deleteDef.getAttribute(), deleteDef.getTitle(), "wuxSmallButton wuxNotebookButton") +
                                WuxSheetMain.CustomInput(
                                    "text",
                                    templateDataDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth50",
                                    `onfocus="this.select();" placeholder="${templateDataDef.getTitle()}"`)
                            );
                        },

                        addPostButton = function () {
                            let postDef = WuxDef.Get("Note_PagePost");
                            let templateDataDef = WuxDef.Get("Note_PageTemplateData");
                            return `<button class="wuxSmallButton wuxNotebookButton" type="roll" value="@{${templateDataDef.getVariable()}}">
                                <span>${postDef.getTitle()}</span>
                            </button>`;
                        },

                        addNotebookPageContents = function () {
                            let contents = "";
                            let displayDef = WuxDef.Get("Note_PageDisplay");

                            contents += WuxSheet.PageDisplayInput(displayDef.getAttribute(), "0");
                            contents += WuxSheet.PageDisplay("0", addNotebookPageBasic());
                            contents += WuxSheet.PageDisplay("Character", addNotebookPageCharacter());
                            contents += WuxSheet.PageDisplay("Location", addNotebookPageLocation());
                            contents += WuxSheet.PageDisplay("Chapter", addNotebookPageChapter());
                            return contents;
                        },

                        addNotebookPageBasic = function () {
                            let contentsDef = WuxDef.Get("Note_PageContents");
                            return `${WuxSheetMain.Textarea(contentsDef.getAttribute(), "wuxInput wuxHeight30", contentsDef.getTitle())}`;
                        },

                        addNotebookPageCharacter = function () {
                            let charNameDef = WuxDef.Get("Note_PageCharName");
                            let charEmoteDef = WuxDef.Get("Note_PageCharEmote");
                            let charURLDef = WuxDef.Get("Note_PageCharURL");
                            let charLanguageDef = WuxDef.Get("Note_PageCharLanguage");
                            let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                            for (let i = 0; i < languageFilters.length; i++) {
                                languageFilters[i].variable = languageFilters[i].title;
                            }

                            let contentsDef = WuxDef.Get("Note_PageContents");

                            return `${WuxSheetMain.MultiRow(
                                `${WuxSheetMain.CustomInput("text", charNameDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth120", `placeholder="${charNameDef.getTitle()}"`)}
                                    ${WuxSheetMain.CustomInput("text", charEmoteDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${charEmoteDef.getTitle()}"`)}
                                    ${WuxSheetMain.CustomInput("text", charURLDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth50", `placeholder="${charURLDef.getTitle()}"`)}
                                    ${WuxSheetMain.Select(charLanguageDef.getAttribute(), languageFilters, false, "wuxInput wuxInlineBlock wuxWidth120")}
                                `)}
                                ${WuxSheetMain.Textarea(contentsDef.getAttribute(), "wuxInput wuxHeight30", contentsDef.getTitle())}`;
                        },

                        addNotebookPageLocation = function () {
                            let locationDef = WuxDef.Get("Note_PageLocation");
                            let areaDef = WuxDef.Get("Note_PageArea");
                            let dateDef = WuxDef.Get("Note_PageDate");
                            let timeDef = WuxDef.Get("Note_PageTime");
                            let timeFilters = WuxDef.Filter([new DatabaseFilterData("group", "TimeType")]);

                            return `${WuxSheetMain.Input("text", locationDef.getAttribute(), "", locationDef.getTitle())}
                            ${WuxSheetMain.Input("text", areaDef.getAttribute(), "", areaDef.getTitle())}
                            ${WuxSheetMain.MultiRow(
                                `${WuxSheetMain.CustomInput("text", dateDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth120", `placeholder="${dateDef.getTitle()}"`)}
                                    ${WuxSheetMain.Select(timeDef.getAttribute(), timeFilters, false, "wuxInput wuxInlineBlock wuxWidth120")}
                                `)}`;
                        },

                        addNotebookPageChapter = function () {
                            let questNameDef = WuxDef.Get("Note_PageQuestName");
                            let chapterDef = WuxDef.Get("Note_PageChapter");
                            let partDef = WuxDef.Get("Note_PagePart");

                            return `${WuxSheetMain.Input("text", questNameDef.getAttribute(), "", questNameDef.getTitle())}
                            ${WuxSheetMain.MultiRow(
                                `<span class="wuxDescription wuxMarginRight5">${chapterDef.getTitle()}</span>
                                    ${WuxSheetMain.CustomInput("number", chapterDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${chapterDef.getTitle()}"`)}
                                    <span class="wuxDescription wuxMarginLeft5 wuxMarginRight5">${partDef.getTitle()}</span>
                                    ${WuxSheetMain.CustomInput("number", partDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${partDef.getTitle()}"`)}
                                `)}`;
                        },

                        buildRepeater = function (repeaterName, repeaterData, classes) {
                            return `<div${classes != undefined ? ` class="${classes}"` : ""}>
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
                PrintOverview: printOverview,
                PrintDetails: printDetails,
                PrintPost: printPost
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
                        [{def: "Forme_JobSlot", countAttr: WuxDef.GetAttribute("JobSlots"), max: 3}]);
                    contents += buildStyleSection("RepeatingStyles", "Page_Styles",
                        [{def: "Forme_AdvancedSlot", countAttr: WuxDef.GetAttribute("AdvancedSlots"), max: 3},
                            {def: "Forme_StyleSlot", countAttr: WuxDef.GetAttribute("StyleSlots"), max: 6}]);
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
                    let isAdvancedAttr = WuxDef.GetAttribute("Forme_IsAdvanced");
                    let actionDef = WuxDef.Get("Forme_Actions");

                    let tierData = `<span>Tier </span><span name="${tierDef.getAttribute()}"></span>`;
                    let tierOutput = WuxSheetMain.HiddenSpanField(isAdvancedAttr, `${tierData}<span>A</span>`);
                    tierOutput += WuxSheetMain.HiddenAuxSpanField(isAdvancedAttr, tierData);

                    return WuxSheetMain.MultiRow(`
                                ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsStyles())}
                                <div class="wuxEquipableType wuxDescription">${tierOutput}</div>
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
                    ${WuxSheetMain.Input("hidden", definition.getAttribute(index + WuxDef._submenu), "0")}
                    ${WuxSheetMain.HiddenField(definition.getAttribute(index), `<div class="wuxDescription">
                        ${WuxSheetMain.SubMenuButton(definition.getAttribute(index + WuxDef._submenu),
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
                    let contents = "";
                    contents += buildCurrency();
                    contents += buildEquipment();
                    contents += buildItems();
                    return WuxSheetMain.Build(contents);
                },

                buildCurrency = function () {
                    let contents = "";
                    contents += WuxSheetMain.MultiRowGroup(currencyContent(), WuxSheetMain.Table.FlexTable, 3);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearCurrency");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                currencyContent = function () {
                    let output = [];
                    let resourceDefs = WuxDef.Filter([new DatabaseFilterData("group", "Currency")]);

                    for (let i = 0; i < resourceDefs.length; i++) {
                        let contents = WuxDefinition.BuildHeader(resourceDefs[i]) +
                            WuxSheetMain.CustomInput("number", resourceDefs[i].getAttribute(), "wuxInput wuxMinWidth100");
                        output.push(WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150"));
                    }
                    return output;
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

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsEquipment())}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addEquipmentButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addRepeaterContentsEquipment = function () {
                    let nameFieldName = getGearAttribute("ItemName");
                    let actionFieldName = getGearAttribute("ItemAction");
                    return WuxSheetMain.MultiRow(`
                        ${WuxSheetMain.SubMenuButton(actionFieldName, addSubmenuContentsEquipment())}
                        <div class="wuxEquipableName"><span class="wuxDescription" name="${nameFieldName}"></span></div>`
                    );
                },

                addRepeaterContentsItem = function () {
                    let nameFieldName = getGearAttribute("ItemName");
                    let actionFieldName = getGearAttribute("ItemAction");
                    let countFieldName = getGearAttribute("ItemCount");
                    return `
                        <div class="wuxEquipableSubMenu">${WuxSheetMain.SubMenuButton(actionFieldName, addSubmenuContentsItem())}</div>
                        ${WuxSheetMain.CustomInput("number", countFieldName, "wuxInput wuxWidth25")}
                        <div class="wuxEquipableName"><span class="wuxDescription" name="${nameFieldName}"></span></div>`
                        ;
                },

                addSubmenuContentsEquipment = function () {
                    let equippedDef = WuxDef.Get("Gear_ItemIsEquipped");
                    let equipWeaponDef = WuxDef.Get("Gear_EquipWeapon");

                    return `${buildItemTemplate()}
                        ${WuxSheetMain.HiddenField(equippedDef.getAttribute(),
                        `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), `<span>${WuxDef.GetTitle("Gear_Unequip")}</span>`)}`)}
                        ${WuxSheetMain.HiddenAuxField(equippedDef.getAttribute(),
                        `${WuxSheetMain.SubMenuOptionButton(equippedDef.getAttribute(), WuxSheetMain.Span(WuxDef.GetAttribute("Gear_ItemEquipMenu")))}
                            ${WuxSheetMain.SubMenuOptionButton(equipWeaponDef.getAttribute(), `<span>${equipWeaponDef.getTitle()}</span>`)}`)}
                        ${addSubmenuContents()}
                    `;
                },

                addSubmenuContentsItem = function () {
                    return `${buildItemTemplate()}
                        ${addSubmenuContents()}
                    `;
                },

                addSubmenuContents = function () {
                    let purchaseeDef = WuxDef.Get("Gear_Purchase");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let inspectDef = WuxDef.Get("Gear_Inspect");

                    return `
                        ${WuxSheetMain.SubMenuOptionButton(purchaseeDef.getAttribute(), WuxSheetMain.Span(purchaseeDef.getAttribute(WuxDef._tab), "Purchase"))}
                        ${WuxSheetMain.SubMenuOptionButton(deleteDef.getAttribute(), `<span>${deleteDef.getTitle()}</span>`)}
                        ${WuxSheetMain.SubMenuOptionButton(inspectDef.getAttribute(), `<span>${inspectDef.getTitle()}</span>`)}
                    `;
                },

                buildItemTemplate = function () {
                    return `
                    <div class="wuxFeature">
                        <div class="wuxFeatureHeader wuxFeatureHeader-Item">
                            <div class="wuxFeatureHeaderDisplayBlock">
                                <span class="wuxFeatureHeaderName" name="${getGearAttribute("ItemName")}"></span>
                                <div class="wuxFeatureHeaderInfo"><span name="${getGearAttribute("ItemGroup")}"></span></div>
                                <div class="wuxFeatureHeaderInfo"><span name="${getGearAttribute("ItemStats")}"></span></div>
                                <div class="wuxFeatureHeaderInfo">
                                    <span><strong>Traits: </strong></span>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${getGearAttribute("ItemTrait", 0)}" value="0" />
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
                        
                        <input type="hidden" class="wuxHiddenField-flag" name="${getGearAttribute("ItemDescription")}" value="0" />
                        <div class="wuxHiddenField">
                            <div class="wuxFeatureFunctionBlock">
                                <div class="wuxFeatureFunctionBlockFlavorText">
                                    <span name="${getGearAttribute("ItemDescription")}"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                },

                buildTooltipSection = function (baseAttribute, index, delimiter) {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getGearAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                        <span class="wuxTooltip">
                            <span class="wuxTooltipText" name="${getGearAttribute(baseAttribute, index)}">-</span>
                            <div class="wuxTooltipContent">
                                <div class="wuxHeader2"><span name="${getGearAttribute(baseAttribute, index)}">-</span></div>
                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                <span class="wuxDescription" name="${getGearAttribute(baseAttribute, index + "desc0")}"></span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getGearAttribute(baseAttribute, index + "desc1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getGearAttribute(baseAttribute, index + "desc1")}"></span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getGearAttribute(baseAttribute, index + "desc2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getGearAttribute(baseAttribute, index + "desc2")}"></span>
                                </div>
                            </div>
                        </span>
                    </div>`;
                },

                addEquipmentButtons = function () {
                    let weaponsPopupDef = WuxDef.Get("Page_AddMeleeWeapon");
                    let rangedPopupDef = WuxDef.Get("Page_AddRangedWeapon");
                    let toolPopupDef = WuxDef.Get("Page_AddTool");
                    let commsPopupDef = WuxDef.Get("Page_AddCommsTool");
                    let lightPopupDef = WuxDef.Get("Page_AddLightTool");
                    let bindingsPopupDef = WuxDef.Get("Page_AddBindingsTool");
                    let miscPopupDef = WuxDef.Get("Page_AddMiscTool");
                    let headPopupDef = WuxDef.Get("Page_AddHeadGear");
                    let facePopupDef = WuxDef.Get("Page_AddFaceGear");
                    let chestPopupDef = WuxDef.Get("Page_AddChestGear");
                    let armPopupDef = WuxDef.Get("Page_AddArmGear");
                    let legPopupDef = WuxDef.Get("Page_AddLegGear");
                    let footPopupDef = WuxDef.Get("Page_AddFootGear");
                    let miscGearPopupDef = WuxDef.Get("Page_AddMiscGear");
                    return addItemGenerationButtons([
                        weaponsPopupDef, rangedPopupDef, toolPopupDef,
                        // commsPopupDef, lightPopupDef, bindingsPopupDef, miscPopupDef, 
                        headPopupDef, facePopupDef, chestPopupDef, armPopupDef, legPopupDef,
                        footPopupDef, miscGearPopupDef
                    ], 3);
                },

                equippedEquipment = function () {
                    let contents = "";
                    contents += `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_Equipped")}`)}`;
                    let emptyName = WuxDef.GetTitle("Page_SlotEmpty");

                    let weaponSlotDef = WuxDef.Get("Gear_WeaponSlot");
                    contents += buildEquipSlot(weaponSlotDef, 1, emptyName);
                    contents += buildWeaponDamage();

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

                buildWeaponDamage = function () {
                    let damageDefField = WuxDef.GetAttribute("WeaponDamage");
                    let damageValField = WuxDef.GetAttribute("WeaponDamageVal");
                    return `${WuxSheetMain.Input("Hidden", damageDefField, "0")}
                    ${WuxSheetMain.Input("Hidden", damageValField, "0")}
                    ${WuxSheetMain.HiddenField(damageDefField, `<div class="wuxDescription">
                        ${WuxSheetMain.Span(damageValField)}
                    </div>`)}
                    ${WuxSheetMain.HiddenAuxField(damageDefField, `<div class="wuxDescription">
                        <span>Force Damage</span>
                    </div>`)}`;
                },

                addSubmenuContentsEquippedSlots = function (definition, index) {
                    return `${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._build),
                        `<span>${WuxDef.GetTitle("Forme_Unequip")}</span>`)}
                        ${WuxSheetMain.SubMenuOptionButton(definition.getAttribute(index + WuxDef._info),
                        `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`)}
            `;
                },

                buildItems = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([ownedConsumables(), ownedGoods()], WuxSheetMain.Table.FlexTable, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearItems");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                ownedConsumables = function () {
                    let repeatingDef = WuxDef.Get("RepeatingConsumables");

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsItem())}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addConsumablesButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                ownedGoods = function () {
                    let repeatingDef = WuxDef.Get("RepeatingGoods");

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsItem())}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addGoodsButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addConsumablesButtons = function () {
                    return addItemGenerationButtons([
                        WuxDef.Get("Page_AddRecoveryItem"),
                        WuxDef.Get("Page_AddTonicItem"),
                        WuxDef.Get("Page_AddBombItem"),
                        WuxDef.Get("Page_AddBeverageItem")
                    ], 2);
                },

                addGoodsButtons = function () {
                    return addItemGenerationButtons([
                        WuxDef.Get("Page_AddMaterial"), WuxDef.Get("Page_AddCompound"),
                        WuxDef.Get("Page_AddSupplement"), WuxDef.Get("Page_AddAnimalGood"),
                        WuxDef.Get("Page_AddFruit"), WuxDef.Get("Page_AddVegetable"), WuxDef.Get("Page_AddStarch")
                    ], 2);
                },

                addItemGenerationButtons = function (definitions, rowSize) {
                    let contents = [];
                    for (let i = 0; i < definitions.length; i++) {
                        contents.push(WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(definitions[i].getAttribute(), definitions[i].getTitle(), "wuxWidth120")));
                    }

                    return `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_AddItem")}`)}
                    ${WuxSheetMain.MultiRowGroup(
                        contents, WuxSheetMain.Table.FlexTable, rowSize)}`;
                },

                getGearAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Gear");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
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
                    contents += WuxSheetSidebar.BuildTechSection();
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
                    contents += buildFormeActions();
                    contents += buildGearActions();
                    contents += buildBasicActions();
                    return WuxSheetMain.Build(contents);
                },

                buildFormeActions = function () {
                    let contents = "";
                    // let jobSlotCount = parseInt(WuxDef.Get("Forme_JobSlotCount").formula.getValue());
                    // let advancedSlotCount = parseInt(WuxDef.Get("Forme_AdvancedSlotCount").formula.getValue());
                    // let styleSlotCount = parseInt(WuxDef.Get("Forme_StyleSlotCount").formula.getValue());
                    //
                    // let repeaterSlotData = [
                    //     {repeater: "RepeatingJobTech", slot: "Forme_JobSlot", max: jobSlotCount, slotMod: 0},
                    //     {repeater: "RepeatingAdvTech", slot: "Forme_AdvancedSlot", max: advancedSlotCount, slotMod: 0},
                    //     {repeater: "RepeatingAdvTech", slot: "Forme_StyleSlot", max: (styleSlotCount + advancedSlotCount), slotMod: advancedSlotCount}];
                    //
                    // repeaterSlotData.forEach(function (repeaterData) {
                    //     contents += repeatingFormeTechniquesSection(repeaterData);
                    // });


                    contents += repeatingFormeSection();
                    contents += repeatingCustomTechniquesSection();
                    
                    contents = WuxSheetMain.TabBlock(contents);
                    let sectionDef = WuxDef.Get("StyleCategory_Forme");
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents);
                },
                
                buildGearActions = function () {
                    let contents = "";
                    contents += repeatingBasicTechniquesSection("RepeatingGearTech", "GearTech", true);
                    contents += repeatingBasicTechniquesSection("RepeatingConsumables", "", true);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("StyleCategory_Gear");
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents);
                },
                
                buildBasicActions = function () {
                    let contents = "";
                    contents += printBasicActionGroup(WuxDef.Get("StyleCategory_Basic"));
                    contents += printBasicActionGroup(WuxDef.Get("StyleCategory_Combat"));
                    contents += printBasicActionGroup(WuxDef.Get("StyleCategory_Social"));
                    return contents;
                },
                printBasicActionGroup = function (styleCategoryDefinition) {
                    let contents = "";
                    let basicStyleFilters = WuxDef.Filter([new DatabaseFilterData("subGroup", styleCategoryDefinition.name)]);
                    for (let i = 0; i < basicStyleFilters.length; i++) {
                        contents += setBasicTechniquesSection(basicStyleFilters[i]);
                    }
                    contents = WuxSheetMain.TabBlock(contents);

                    return WuxSheetMain.CollapsibleTab(styleCategoryDefinition.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${styleCategoryDefinition.getTitle()}`, contents);
                },

                repeatingFormeSection = function () {
                    let repeaterDefinition = WuxDef.Get("RepeatingFormeTech");
                    let repeatingVariable = repeaterDefinition.getVariable();
                    let hiddenField = repeaterDefinition.getAttribute(WuxDef._expand);
                    let refreshField = repeaterDefinition.getAttribute(WuxDef._refresh);

                    let header = getStyleHeader(`<span>${repeaterDefinition.getTitle()}</span>`, hiddenField, refreshField);
                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("TechIsVisible"), 
                        printFormTechniqueSimplifiedActionDisplay());
                    
                    return `${WuxSheetMain.Header(header)}
                        ${WuxSheetMain.HiddenFieldToggle(hiddenField,
                        `<div class="wuxDescription">Contents Hidden</div>`,
                        `${buildRepeater(repeatingVariable, actionDisplay)}
                        ${WuxSheetMain.Row("&nbsp;")}`
                    )}`;
                },
                
                repeatingFormeTechniquesSection = function (repeaterData) {
                    let contents = "";
                    for (let i = 1; i <= repeaterData.max; i++) {
                        let repeatingFieldName = WuxDef.GetVariable(repeaterData.repeater, i + repeaterData.slotMod);
                        let slotFieldName = WuxDef.GetAttribute(repeaterData.slot, i);
                        let hiddenField = slotFieldName + WuxDef._expand;
                        let header = getStyleHeader(`<span name="${slotFieldName}"></span>`, hiddenField, slotFieldName + WuxDef._refresh);
                        contents += WuxSheetMain.HiddenField(slotFieldName,
                            repeatingTechniquesSection(header, hiddenField, repeatingFieldName, false)
                        );
                    }
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                repeatingBasicTechniquesSection = function (repeaterName, refreshName, alwaysShow) {
                    if (alwaysShow == undefined) {
                        alwaysShow = false;
                    }
                    let repeatingDef = WuxDef.Get(repeaterName);

                    let hiddenField = WuxDef.GetAttribute(refreshName, WuxDef._expand);
                    let header = getStyleHeader(`<span>${repeatingDef.getTitle()}</span>`, hiddenField, WuxDef.GetAttribute(refreshName, WuxDef._refresh));
                    let contents = repeatingTechniquesSection(header, hiddenField, repeatingDef.getVariable(), alwaysShow);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                setBasicTechniquesSection = function (styleGroupDef) {
                    let slotFieldName = styleGroupDef.getAttribute();
                    let hiddenField = slotFieldName + WuxDef._expand;
                    let header = getStyleHeader(`<span>${styleGroupDef.getTitle()}</span>`, hiddenField);
                    let contents = setTechniquesSection(header, hiddenField, styleGroupDef);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                repeatingCustomTechniquesSection = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCustomTech");
                    let hiddenField = WuxDef.GetAttribute("CustomTech", WuxDef._expand);
                    let header = getStyleHeader(`<span>${repeatingDef.getTitle()}</span>`, hiddenField);
                    let contents = `<div class="wuxRepeatingFlexSection">
                            <fieldset class="${repeatingDef.getVariable()}">
                            ${addRepeaterContentsTechniqueDisplay(true, true)}
                            </fieldset>
                        </div>`;
                    contents = printTechniquesSection(header, hiddenField, contents);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },
                
                getStyleHeader = function (styleName, hiddenField, refreshField) {
                    let headerButtons = "";
                    if (refreshField != undefined) {
                        headerButtons = WuxSheetMain.Button(refreshField,
                            "<span class='wuxStyleHeaderButtonIcon'>&#8635;</span> Update", "wuxStyleHeaderButton");
                    }
                    return WuxSheetMain.CollapsibleHeader(styleName, hiddenField, headerButtons);
                },

                repeatingTechniquesSection = function (header, hiddenField, repeaterFieldName, alwaysShow) {
                    return `${WuxSheetMain.Header(header)}
                        ${WuxSheetMain.HiddenFieldToggle(hiddenField,
                        `<div class="wuxDescription">Contents Hidden</div>`,
                        `${buildRepeater(repeaterFieldName, addRepeaterContentsTechniqueDisplay(false, alwaysShow))}
                        ${WuxSheetMain.Row("&nbsp;")}`
                    )}`;
                },

                setTechniquesSection = function (header, hiddenField, styleGroupDef) {
                    let techniquesFilterData = WuxTechs.Filter([new DatabaseFilterData("style", styleGroupDef.getTitle())]);
                    return printTechniquesSection (header, hiddenField, addTechniquesByFilter(techniquesFilterData));
                },

                printTechniquesSection = function (header, hiddenField, contents) {
                    return `${WuxSheetMain.Header(header)}
                        ${WuxSheetMain.HiddenFieldToggle(hiddenField,
                        `<div class="wuxDescription">Contents Hidden</div>`,
                        `<div class="wuxRepeatingFlexSection">${contents}</div>
                        ${WuxSheetMain.Row("&nbsp;")}`
                    )}`;
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },
                getSpanActionTypeAttribute = function (attribute, suffix) {
                    return `<span name="${getActionTypeAttribute(attribute, suffix)}"></span>`;
                },

                addRepeaterContentsTechniqueDisplay = function (isCustom, alwaysShow) {
                    let submenuText = isCustom ? printCustomTechniqueDisplaySubmenuButton() : printRepeatingTechniqueDisplaySubmenuButton();
                    let actionDisplay = printFormTechniqueActionDisplay(submenuText);
                    if (alwaysShow) {
                        return  actionDisplay;
                    }
                    return WuxSheetMain.HiddenField(getActionTypeAttribute("TechIsVisible"), actionDisplay);
                },
                
                addTechniquesByFilter = function (techniques) {
                    let output = "";
                    for (let i = 0; i < techniques.length; i++) {
                        let displayData = new TechniqueDisplayData(techniques[i]);
                        displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                        displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                        
                        let techniqueDef = techniques[i].createDefinition(WuxDef.Get("Technique"));
                        let submenuText = printSetTechniqueDisplaySubmenuButton(techniqueDef, displayData);
                        output += printSetTechniqueActionDisplay(techniqueDef, displayData, submenuText);
                    }
                    return output;
                },

                printRepeatingTechniqueDisplaySubmenuButton = function () {
                    let submenuFieldName = WuxDef.GetAttribute("Action_Actions");
                    let contents = addSubmenuContentsStyles();
                    return printTechniqueDisplaySubmenu(submenuFieldName, contents);
                },

                printSetTechniqueDisplaySubmenuButton = function (techniqueDef, displayData) {
                    let submenuFieldName = techniqueDef.getAttribute(WuxDef._submenu);
                    let contents = addSetSubmenuContentsStyles(techniqueDef, displayData);
                    return printTechniqueDisplaySubmenu(submenuFieldName, contents);
                },

                printCustomTechniqueDisplaySubmenuButton = function () {
                    let submenuFieldName = WuxDef.GetAttribute("Action_Actions");
                    let contents = addCustomSubmenuContentsStyles();
                    return printTechniqueDisplaySubmenu(submenuFieldName, contents);
                },

                printTechniqueDisplaySubmenu = function (submenuFieldName, contents) {
                    return `<div class="wuxInlineBlock">
                            ${printTechniqueDisplaySubmenuButton(submenuFieldName)}
                            <input type="hidden" class="wuxSubMenu-flag" name="${submenuFieldName}" value="0">
                            <div class="wuxSubMenuContent">\n${contents}\n</div>
                    </div>`;
                },

                printTechniqueDisplaySubmenuButton = function (submenuFieldName) {
                    return `<input type="checkbox" name="${submenuFieldName}">
                            <span class="wuxSubMenuText">l&nbsp;</span>`;
                },

                addSubmenuContentsStyles = function () {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let inspectTechniqueDef = WuxDef.Get("Action_Inspect");

                    return `${WuxSheetMain.SubMenuOptionRollButtonWithVariableInput(useTechniqueDef.getAttribute(), useTechniqueDef.getTitle(), useTechniqueDef.getVariable())}
                        ${WuxSheetMain.SubMenuOptionButton(inspectTechniqueDef.getAttribute(), `<span>${inspectTechniqueDef.getTitle()}</span>`)}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuTechniqueTemplate()}
                    `;
                },

                addSetSubmenuContentsStyles = function (techniqueDef, displayData) {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let rollInput = displayData.getSheetRollTemplate(true);

                    return `${WuxSheetMain.SubMenuOptionRollButton(techniqueDef.getAttribute(WuxDef._build), useTechniqueDef.getTitle(), rollInput)}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuSetTechniqueTemplate(techniqueDef, displayData)}
                    `;
                },

                addCustomSubmenuContentsStyles = function () {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let setDataTechniqueDef = WuxDef.Get("Action_SetData");

                    return `${WuxSheetMain.SubMenuOptionRollButtonWithVariableInput(useTechniqueDef.getAttribute(), useTechniqueDef.getTitle(), useTechniqueDef.getVariable())}
                        ${WuxSheetMain.SubMenuOptionText(setDataTechniqueDef.getAttribute(), setDataTechniqueDef.getTitle())}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuTechniqueTemplate()}
                    `;
                },

                printFormTechniqueActionDisplay = function (submenuText) {
                    return `
                    <div class="wuxFeature wuxMinWidth220">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader wuxSubMenuSection">
                            ${buildBaseFormTechniqueHeaderFullContents(submenuText)}
                        </div>
                        ${buildFormBaseTechniqueRequirements()}
                    </div>`;
                },
                printFormTechniqueSimplifiedActionDisplay = function () {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseFormTechniqueHeaderFullContents(
                                printTechniqueDisplaySubmenuButton(WuxDef.GetAttribute("Action_Actions", 1)), 1)}
                        </div>
                        ${buildFormBaseTechniqueRequirements()}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Action_Actions", 2),
                        `<div class="wuxFeatureHeader">
                            ${buildBaseFormTechniqueHeaderFullContents(
                            printTechniqueDisplaySubmenuButton(WuxDef.GetAttribute("Action_Actions", 2)), 2)}
                        </div>`)}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Action_Actions", 3),
                        `<div class="wuxFeatureHeader">
                            ${buildBaseFormTechniqueHeaderFullContents(
                            printTechniqueDisplaySubmenuButton(WuxDef.GetAttribute("Action_Actions", 3)), 3)}
                        </div>`)}
                    </div>`;
                },
                printSetTechniqueActionDisplay = function (techniqueDef, displayData, submenuText) {
                    return `
                    <div class="wuxFeature wuxMinWidth220">
                        <input type="hidden" class="wuxFeatureHeader-flag" value="${displayData.actionType}">
                        <div class="wuxFeatureHeader wuxSubMenuSection">
                            ${buildBaseSetTechniqueHeaderContents(techniqueDef, displayData, submenuText)}
                        </div>
                        ${buildSetBaseTechniqueRequirements(displayData)}
                    </div>`;
                },

                buildSubmenuTechniqueTemplate = function () {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseFormTechniqueHeaderFullContents()}
                        </div>
                        ${buildFormBaseTechniqueRequirements()}
                        ${buildFormExtendedTechniqueData()}
                    </div>`;

                },
                buildSubmenuSetTechniqueTemplate = function (techniqueDef, displayData) {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${displayData.actionType}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseSetTechniqueHeaderContents(techniqueDef, displayData)}
                        </div>
                        ${buildSetBaseTechniqueRequirements(displayData)}
                        ${buildSetExtendedTechniqueData(displayData)}
                    </div>`;

                },

                buildBaseFormTechniqueHeaderFullContents = function (headerPrefix, tierIndex) {
                    return `${buildBaseFormTechniqueHeaderContents(headerPrefix, tierIndex, 
                        `${printFormTechniqueTraits("Keywords", "TechForm", 5, "Keyword")}
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechResourceData", tierIndex)}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechTargetingData")}"></span></div>
                        ${printFormTechniqueTraits("Traits", "TechTrait", 5, "Impact Trait")}`)}
                    <input type="hidden" class="wuxFeatureDefenseIcon-flag" name="${getActionTypeAttribute("TechCoreDefense")}" value="" />
                    <div class="wuxFeatureDefenseIcon"></div>`;
                },
                buildBaseFormTechniqueHeaderSubTechContents = function (headerPrefix, tierIndex) {
                    return buildBaseFormTechniqueHeaderContents(headerPrefix, tierIndex,
                        `<div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechResourceData", tierIndex)}"></span></div>`);
                },
                buildBaseFormTechniqueHeaderContents = function (headerPrefix, tierIndex, contents) {
                    let headerText = headerPrefix == undefined ?
                        printFormTechniqueHeaderDiv(tierIndex) : printFormTechniqueHeaderButton(headerPrefix, tierIndex);

                    return `<div class="wuxFeatureHeaderDisplayBlock">
                        <input type="hidden" name="${getActionTypeAttribute("TechVersion", tierIndex)}" value="" />
                        <input type="hidden" name="${getActionTypeAttribute("TechAffinity", tierIndex)}" value="" />
                        <input type="hidden" name="${getActionTypeAttribute("TechTier", tierIndex)}" value="0" />
                        ${headerText}
                        ${contents}
                    </div>`;
                },
                buildBaseSetTechniqueHeaderContents = function (techniqueDef, displayData, headerPrefix) {
                    let headerText = headerPrefix == undefined ?
                        printSetTechniqueHeaderDiv(displayData) : printSetTechniqueHeaderButton(displayData, techniqueDef, headerPrefix);

                    return `<div class="wuxFeatureHeaderDisplayBlock">
                        ${headerText}
                        ${printSetTechniqueTraits("Keywords", displayData.forms)}
                        <div class="wuxFeatureHeaderInfo">${printSpan(displayData.resourceData)}</span></div>
                        <div class="wuxFeatureHeaderInfo">${printSpan(displayData.targetData)}</span></div>
                        ${printSetTechniqueTraits("Traits", displayData.traits)}
                    </div>
                    <input type="hidden" class="wuxFeatureDefenseIcon-flag" value="${displayData.coreDefense}" />
                    <div class="wuxFeatureDefenseIcon"></div>`;
                },

                printSpan = function (contents) {
                    return `<span>${contents}</span>`;
                },
                printFormTechniqueHeaderButton = function (headerPrefix, tierIndex) {
                    return `<div class="wuxFeatureHeaderName">
                        ${headerPrefix == undefined ? "" : headerPrefix}
                        <button class="wuxFeatureHeaderNameButton" type="roll" value="@{${WuxDef.GetVariable("Action_Use", tierIndex)}}">
                            ${getSpanActionTypeAttribute("TechName", tierIndex)}
                        </button>
                    </div>`;
                },
                printSetTechniqueHeaderButton = function (displayData, techniqueDef, headerPrefix) {
                    return `<div class="wuxFeatureHeaderName">
                        ${headerPrefix == undefined ? "" : headerPrefix}
                        <button class="wuxFeatureHeaderNameButton" type="roll" value="${displayData.getSheetRollTemplate(true)}">
                            ${printSpan(displayData.name)}
                        </button>
                    </div>`;
                },
                printFormTechniqueHeaderDiv = function (tierIndex) {
                    return printTechniqueHeaderDiv(getSpanActionTypeAttribute("TechName", tierIndex));
                },
                printSetTechniqueHeaderDiv = function (displayData) {
                    return printTechniqueHeaderDiv(printSpan(displayData.name));
                },
                printTechniqueHeaderDiv = function (contents) {
                    return `<div class="wuxFeatureHeaderName">${contents}</div>`;
                },

                printFormTechniqueTraits = function (title, baseAttribute, maxCount, subType) {
                    let traitData = "";
                    for (let i = 0; i < maxCount; i++) {
                        if (traitData != "") {
                            traitData += "\n";
                        }
                        traitData += buildFormTooltipSection(baseAttribute, i, subType);
                    }
                    return WuxSheetMain.HiddenField(getActionTypeAttribute(baseAttribute, 0),
                        `<div class="wuxFeatureHeaderInfo">
                            <span><strong>${title}: </strong></span>
                            ${traitData}
                        </div>`);
                    
                    // return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechForm", 0)}" value="0" />
                    //     <div class="wuxHiddenField wuxFeatureHeaderInfo">
                    //         <span><strong>${title}: </strong></span>
                    //         ${buildFormTooltipSection("TechForm", 0, "Keyword")}
                    //         ${buildFormTooltipSection("TechForm", 1, "Keyword")}
                    //         ${buildFormTooltipSection("TechForm", 2, "Keyword")}
                    //         ${buildFormTooltipSection("TechForm", 3, "Keyword")}
                    //         ${buildFormTooltipSection("TechForm", 4, "Keyword")}
                    //     </div>`;
                },
                printSetTechniqueTraits = function (title, traits) {
                    if (traits.length > 0) {
                        let keywords = "";
                        for (let i = 0; i < traits.length; i++) {
                            keywords += `\n${buildSetTooltipSection(traits[i])}`;
                        }
                        return `<div class="wuxFeatureHeaderInfo">
                            <span><strong>${title}: </strong></span>
                            ${keywords}
                        </div>`;
                    }
                    return "";
                },

                buildFormBaseTechniqueRequirements = function () {
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechTrigger")}" value="0" />
                    <div class="wuxHiddenField">
                        ${printTrigger(getSpanActionTypeAttribute("TechTrigger"))}
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechRequirements")}" value="0" />
                    <div class="wuxHiddenField">
                        ${printRequirement("Requirements", getSpanActionTypeAttribute("TechRequirements"))}
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechItemReq", 0)}" value="0" />
                    <div class="wuxHiddenField">
                        ${printFormRequirementItemTraits()}
                    </div>`;
                },
                buildSetBaseTechniqueRequirements = function (displayData) {
                    let trigger = "";
                    let requirements = "";
                    let itemTraits = "";
                    if (displayData.trigger != "") {
                        trigger = printTrigger(printSpan(displayData.trigger));
                    }
                    if (displayData.requirements != "") {
                        trigger = printRequirement("Requirements", printSpan(displayData.requirements));
                    }
                    if (displayData.itemTraits.length > 0) {
                        itemTraits = printSetRequirementItemTraits(displayData);
                    }
                    return `${trigger}
                    ${requirements}
                    ${itemTraits}`;
                },
                printTrigger = function (contents) {
                    return `<div class="wuxFeatureHeaderInfoTrigger">
                        <span><strong>Trigger: </strong></span>
                        ${contents}
                    </div>`;
                },
                printFormRequirementItemTraits = function () {
                    let traits = "";
                    for (let i = 0; i < 3; i++) {
                        if (traits != "") {
                            traits += "\n";
                        }
                        traits += buildFormTooltipSection("TechItemReq", i, "Item Trait");
                    }
                    return printRequirement("Item Traits", traits);
                },
                printSetRequirementItemTraits = function (displayData) {
                    let traits = "";
                    for (let i = 0; i < displayData.itemTraits.length; i++) {
                        if (traits != "") {
                            traits += "\n";
                        }
                        traits += buildSetTooltipSection(displayData.itemTraits[i]);
                    }
                    return printRequirement("Item Traits", traits);
                },
                printRequirement = function (title, contents) {
                    return `<div class="wuxFeatureHeaderInfoReq">
                        <span><strong>${title}: </strong></span>
                        ${contents}
                    </div>`;
                },

                buildFormExtendedTechniqueData = function () {
                    return `${WuxSheetMain.HiddenField(getActionTypeAttribute("TechFlavorText"),
                        printFlavorText(getSpanActionTypeAttribute("TechFlavorText")))}

                    ${printMainEffects(addFormTechEffects("TechEffect"))}
                    
                    ${WuxSheetMain.HiddenField(getActionTypeAttribute("TechSEffectTitle", "name"),
                        printFormSecondaryEffects())}
                    
                    ${WuxSheetMain.HiddenField(getActionTypeAttribute("TechEEffectTitle", "name"),
                        printFormEndEffects())}
                   
                    ${WuxSheetMain.HiddenField(getActionTypeAttribute("TechDef", 0),
                        printFormDefinitions())}
                    `;
                },
                buildSetExtendedTechniqueData = function (displayData) {
                    return `${printFlavorText(printSpan(displayData.flavorText))}
                    ${printMainEffects(addSetMainEffects(displayData.effects))}
                    ${printSetSecondaryEffects(displayData)}
                    ${printSetEndEffects(displayData)}
                    ${printSetDefinitions(displayData)}
                    `;
                },
                printFlavorText = function (contents) {
                    return `<div class="wuxFeatureFunctionBlock">
                        <div class="wuxFeatureFunctionBlockFlavorText">
                            ${contents}
                        </div>
                    </div>
                    `;
                },
                printMainEffects = function (contents) {
                    return `<div class="wuxFeatureEffectsBlock">${contents}</div>`;
                },
                printFormSecondaryEffects = function () {
                    return printSecondaryEffects(`${addFormTechEffect("TechSEffectTitle", "", "wuxFeatureMajorEffectHeader", "wuxFeatureMajorEffectBlock")}
                            ${addFormTechEffects("TechSEffect")}`);
                },
                printSetSecondaryEffects = function (displayData) {
                    if (displayData.secondaryEffectName.trim() != "") {
                        let output = "";
                        let defName = Format.GetDefinitionName("Title", displayData.secondaryEffectName);
                        let def = WuxDef.Get(defName);
                        output += printSetTechEffectHeader(def.getTitle(), def.getDescription(), "wuxFeatureMajorEffectHeader");
                        if (displayData.secondaryEffectDesc != "") {
                            output += "\n" + printTechEffectBlock(displayData.secondaryEffectDesc, "wuxFeatureMajorEffectBlock");
                        }
                        output += "\n" + addSetMainEffects(displayData.secondaryEffects);

                        return printSecondaryEffects(output);
                    }
                    return "";
                },
                printSecondaryEffects = function (contents) {
                    return `<div class="wuxFeatureSecondaryEffectsBlock">${contents}</div>`;
                },
                printFormEndEffects = function () {
                    return printEndEffects(addFormTechEffect("TechEEffectTitle", "", "wuxFeatureMajorEffectHeader", "wuxFeatureMajorEffectBlock"));
                },
                printSetEndEffects = function (displayData) {
                    if (displayData.endEffectName.trim() != "") {
                        let output = "";
                        let defName = Format.GetDefinitionName("Title", displayData.endEffectName);
                        let def = WuxDef.Get(defName);
                        output += printSetTechEffectHeader(def.getTitle(), def.getDescription(), "wuxFeatureMajorEffectHeader");
                        if (displayData.endEffectDesc != "") {
                            output += "\n" + printTechEffectBlock(displayData.endEffectDesc, "wuxFeatureMajorEffectBlock");
                        }

                        return printEndEffects(output);
                    }
                    return "";
                },
                printEndEffects = function (contents) {
                    return `<div class="wuxFeatureEndEffectsBlock">${contents}</div>`;
                },
                addFormTechEffects = function (baseAttribute) {
                    let effects = [];
                    for (let i = 0; i < 10; i++) {
                        effects.push(addFormTechEffect(baseAttribute, i));
                    }
                    return effects.join("\n");
                },
                addSetMainEffects = function (effects) {
                    if (effects.length > 0) {
                        let output = "";
                        effects.forEach(function (effect) {
                            if (effect.check != undefined) {
                                output += `\n${printSetTechEffectHeader(effect.check, effect.checkDescription)}`;

                                if (effect.effects != undefined) {
                                    effect.effects.forEach(function (desc) {
                                        output += `\n${printTechEffectBlock(desc)}`;
                                    });
                                }
                            }
                        });
                        return output;
                    }
                    return "";
                },
                addFormTechEffect = function (attrName, index, headerName, blockName) {
                    return `<input type="hidden" name="${getActionTypeAttribute(attrName, `${index}desc`)}" value="0" />
                    ${WuxSheetMain.HiddenField(getActionTypeAttribute(attrName, `${index}name`),
                        printFormTechEffectHeader(attrName, index, headerName))}
                    ${WuxSheetMain.HiddenField(getActionTypeAttribute(attrName, index),
                        printTechEffectBlock(getSpanActionTypeAttribute(attrName, index), blockName))}
                    `;
                },
                printFormTechEffectHeader = function (baseAttribute, index, headerName) {
                    let name = getSpanActionTypeAttribute(baseAttribute, index);
                    let descriptionData = `<span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc")}"></span>`;
                    return printTechEffectHeader(buildTooltipSection(name, "", descriptionData), headerName);
                },
                printSetTechEffectHeader = function (name, description, headerName) {
                    name = printSpan(name);
                    let descriptionData = `<span class="wuxDescription">${description}</span>`;
                    return printTechEffectHeader(buildTooltipSection(name, "", descriptionData), headerName);
                },
                printTechEffectHeader = function (contents, headerName) {
                    if (headerName === undefined) {
                        headerName = "wuxFeatureCheckHeader";
                    }
                    return `<div class="${headerName}">
                        ${contents}
                    </div>
                    `;
                },
                printTechEffectBlock = function (contents, blockName) {
                    if (blockName === undefined) {
                        blockName = "wuxFeatureCheckBlock";
                    }
                    return `<div class="${blockName}">
                        <span class="wuxFeatureCheckBlockRow">${contents}</span>
                    </div>
                    `;
                },
                printFormDefinitions = function () {
                    let contents = "";
                    for (let i = 0; i < 4; i++) {
                        if (contents != "") {
                            contents += "\n";
                        }
                        contents += buildFormTooltipSection("TechDef", i);
                    }
                    return printDefinitions(contents);
                },
                printSetDefinitions = function (displayData) {
                    if (displayData.definitions.length > 0) {
                        let contents = "";
                        for (let i = 0; i < displayData.definitions.length; i++) {
                            contents += `\n${buildSetTooltipSection(displayData.definitions[i])}`;
                        }
                        return printDefinitions(contents);
                    }
                    return "";
                },
                printDefinitions = function (contents) {
                    return `<div class="wuxFeatureFunctionBlock">
                        <div class="wuxFeatureFunctionBlockRow">
                            <span><strong>Definitions: </strong></span>
                            ${contents}
                        </div>
                    </div>
                    `;
                },

                buildFormTooltipSection = function (baseAttribute, index, subType) {
                    if (subType == undefined) {
                        subType = "";
                    }
                    let name = getSpanActionTypeAttribute(baseAttribute, index);
                    let descriptionData = "";
                    for (let i = 0; i < 4; i++) {
                        if (descriptionData != "") {
                            descriptionData += "\n";
                        }
                        descriptionData += `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index + "desc" + i)}" value="0" />
                        <div class="wuxHiddenField">
                            <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc" + i)}"></span>
                        </div>`;
                    }
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>; </span>`}
                        ${buildTooltipSection(name, subType, descriptionData)}
                    </div>`;
                },
                buildSetTooltipSection = function (definitionData) {
                    let descriptionData = "";
                    for (let i = 0; i < definitionData.descriptions.length; i++) {
                        if (descriptionData != "") {
                            descriptionData += "\n";
                        }
                        descriptionData += `<span class="wuxDescription">${definitionData.descriptions[i]}</span>`;
                    }
                    return buildTooltipSection(definitionData.getTitle(), definitionData.subGroup, descriptionData);
                },
                buildTooltipSection = function (name, subType, descriptionData) {
                    let subTypeSpan = subType == "" ? "" : `<span class="wuxDescription"><em>${subType}</em></span>`;
                    return `<span class="wuxTooltip">
                        <span class="wuxTooltipText">${name}</span>
                        <div class="wuxTooltipContent">
                            <div class="wuxHeader2">${name}</div>
                            ${subTypeSpan}
                            ${descriptionData}
                        </div>
                    </span>`;
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

                getPopupAttribute = function (attribute, suffix) {
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
                            <input type="hidden" name="${getPopupAttribute("TechVersion")}" value="" />
                            <input type="hidden" name="${getPopupAttribute("TechAffinity")}" value="" />
                            <input type="hidden" name="${getPopupAttribute("TechTier")}" value="0" />
                            <div class="wuxFeatureHeader">
                                <div class="wuxFeatureHeaderDisplayBlock">
                                    <span class="wuxFeatureHeaderName" name="${getPopupAttribute("TechName")}"></span>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechForm", 0)}" value="0" />
                                    <div class="wuxHiddenField wuxFeatureHeaderInfo">
                                        <span><strong>Keywords: </strong></span>
                                        ${buildTooltipSection("TechForm", 0)}
                                        ${buildTooltipSection("TechForm", 1)}
                                        ${buildTooltipSection("TechForm", 2)}
                                        ${buildTooltipSection("TechForm", 3)}
                                        ${buildTooltipSection("TechForm", 4)}
                                    </div>
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
                                <input type="hidden" class="wuxFeatureDefenseIcon-flag" name="${getPopupAttribute("TechCoreDefense")}" value="" />
                                <div class="wuxFeatureDefenseIcon"></div>
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
                                ${addTechEffects()}
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechSEffectTitle", "name")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureSecondaryEffectsBlock">
                                    ${addTechEffect("TechSEffectTitle", "", "wuxFeatureMajorEffectHeader", "wuxFeatureMajorEffectBlock")}
                                    ${addSecondaryTechEffects()}
                                </div>
                            </div>
                            
                            <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute("TechEEffectTitle", "name")}" value="0" />
                            <div class="wuxHiddenField">
                                <div class="wuxFeatureEndEffectsBlock">
                                    ${addTechEffect("TechEEffectTitle", "", "wuxFeatureMajorEffectHeader", "wuxFeatureMajorEffectBlock")}
                                </div>
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

                addTechEffects = function () {
                    let effects = [];
                    for (let i = 0; i < 10; i++) {
                        effects.push(addTechEffect("TechEffect", i));
                    }
                    return effects.join("\n");
                },

                addSecondaryTechEffects = function () {
                    let effects = [];
                    for (let i = 0; i < 10; i++) {
                        effects.push(addTechEffect("TechSEffect", i));
                    }
                    return effects.join("\n");
                },

                addTechEffect = function (attrName, index, headerName, blockName) {
                    if (headerName == undefined) {
                        headerName = "wuxFeatureCheckHeader";
                    }
                    if (blockName == undefined) {
                        blockName = "wuxFeatureCheckBlock";
                    }
                    return `<input type="hidden" name="${getPopupAttribute(attrName, `${index}desc`)}" value="0" />
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute(attrName, `${index}name`)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="${headerName}">
                            <span class="wuxTooltip">
                                <span class="wuxTooltipText" name="${getPopupAttribute(attrName, `${index}name`)}">Name</span>
                                <div class="wuxTooltipContent">
                                    <div class="wuxHeader2"><span name="${getPopupAttribute(attrName, `${index}name`)}">Name</span></div>
                                    <span class="wuxDescription" name="${getPopupAttribute(attrName, `${index}desc`)}"></span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getPopupAttribute(attrName, index)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="${blockName}">
                            <span class="wuxFeatureCheckBlockRow" name="${getPopupAttribute(attrName, index)}">Effect</span>
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

var DisplayLoadingScreen = DisplayLoadingScreen || (function () {
    'use strict';

    var
        print = function () {
            return printLoadingScreen();
        },

        printLoadingScreen = function () {
            let popupActiveAttr = WuxDef.GetAttribute("Loading");
            let contents = `<div class="wuxPopupOverlay">
                <div class="wuxLoading">
                    Loading&nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" height="100px" width="100px">
                </div>
            </div>`;

            return `${WuxSheetMain.HiddenField(popupActiveAttr, contents)}`;
        }

    return {
        Print: print
    };
}());