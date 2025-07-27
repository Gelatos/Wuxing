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
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
                            contents += WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
                                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
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
                            let contents = WuxSheetMain.MultiRowGroup([notebookSelect(), notebookPages()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Title_Notebook");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        notebookSelect = function () {
                            let repeatingDef = WuxDef.Get("Notebooks");
                            let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                            <div>
                                ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsNotebooks())}
                                ${WuxSheetMain.Row("&nbsp;")}
                            </div>`;

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        addRepeaterContentsNotebooks = function () {
                            let nameDef = WuxDef.Get("Note_NotebookName");
                            let actionDef = WuxDef.Get("Note_NotebookActions");

                            return `
                            <div class="wuxEquipableSubMenu">
                                ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsNotebooks())}
                            </div>
                            ${WuxSheetMain.CustomInput("text", nameDef.getAttribute(), "wuxInput wuxWidth160")}`;
                        },

                        addSubmenuContentsNotebooks = function () {
                            let openDef = WuxDef.Get("Note_NotebookOpen");
                            let deleteDef = WuxDef.Get("Note_NotebookDelete");
                            let contentsDef = WuxDef.Get("Note_NotebookContents");

                            return `
                                ${WuxSheetMain.SubMenuOptionButton(openDef.getAttribute(), `<span>${openDef.getTitle()}</span>`)}
                                ${WuxSheetMain.SubMenuOptionButton(deleteDef.getAttribute(), `<span>${deleteDef.getTitle()}</span>`)}
                                ${WuxSheetMain.SubMenuOptionText(contentsDef.getAttribute(), `Contents Empty`)}
                            `;
                        },

                        notebookPages = function () {
                            let contents = "";
                            contents += addNotebookDisplay();
                            contents += addNotebookPagesDisplay();

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
                        },
                        
                        addNotebookDisplay = function () {
                            let nameDef = WuxDef.Get("Note_OpenNotebook");
                            let actionDef = WuxDef.Get("Note_OpenNotebookActions");
                            
                            return `${WuxSheetMain.Header(`${nameDef.getTitle()}`)}
                            <div class="wuxEquipableSubMenu">
                                ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsOpenedNotebook())}
                            </div>
                            ${WuxSheetMain.CustomInput("text", nameDef.getAttribute(), "wuxInput wuxWidth160")}`;
                        },

                        addSubmenuContentsOpenedNotebook = function () {
                            let saveDef = WuxDef.Get("Note_NotebookSave");
                            let closeDef = WuxDef.Get("Note_NotebookClose");
                            let reloadDef = WuxDef.Get("Note_NotebookReload");

                            return `
                                ${WuxSheetMain.SubMenuOptionButton(saveDef.getAttribute(), `<span>${saveDef.getTitle()}</span>`)}
                                ${WuxSheetMain.SubMenuOptionButton(closeDef.getAttribute(), `<span>${closeDef.getTitle()}</span>`)}
                                ${WuxSheetMain.SubMenuOptionButton(reloadDef.getAttribute(), `<span>${reloadDef.getTitle()}</span>`)}
                            `;
                        },
                        
                        addNotebookPagesDisplay = function () {
                            let repeatingDef = WuxDef.Get("NotebookPages");
                            return `
                            ${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                            <div>
                                ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsNotebookPages())}
                                ${WuxSheetMain.Row("&nbsp;")}
                            </div>`;
                        },

                        addRepeaterContentsNotebookPages = function () {
                            let contents = "";
                            contents += addNotebookPageHeader();
                            contents += addNotebookPageContents();
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
                                WuxSheetMain.Button(deleteDef.getAttribute(), deleteDef.getTitle(), "wuxSmallButton") + 
                                WuxSheetMain.CustomInput(
                                    "text",
                                    templateDataDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70",
                                    `onfocus="this.select();" placeholder="${templateDataDef.getTitle()}"`)
                            );
                        },

                        addPostButton = function () {
                            let postDef = WuxDef.Get("Note_PagePost");
                            let templateDataDef = WuxDef.Get("Note_PageTemplateData");
                            return `<button class="wuxSmallButton" type="roll" value="@{${templateDataDef.getVariable()}}">
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
                                `<span class="wuxDescription">Chapter</span>${WuxSheetMain.CustomInput("number", chapterDef.getAttribute(),
                                    "wuxInput wuxInlineBlock wuxWidth70", `placeholder="${chapterDef.getTitle()}"`)}
                                    <span class="wuxDescription">Part</span>${WuxSheetMain.CustomInput("number", partDef.getAttribute(),
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
                        contents.push(WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Button(definitions[i].getAttribute(), definitions[i].getTitle())));
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
                    contents += repeatingBasicTechniquesSection("RepeatingConsumables");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicActions");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicRecovery");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicAttack");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicSocial");
                    contents += WuxSheetMain.HiddenAncestryField("Spirit", 
                        repeatingBasicTechniquesSection("RepeatingBasicSpirit"));
                    contents += repeatingCustomTechniquesSection();
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

                repeatingCustomTechniquesSection = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCustomTech");

                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        <div>
                            <div class="wuxRepeatingFlexSection">
                                <fieldset class="${repeatingDef.getVariable()}">
                                ${addRepeaterContentsStyles(true)}
                                </fieldset>
                            </div>
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                repeatingTechniquesSection = function (header, repeaterFieldName) {
                    return `${WuxSheetMain.Header(header)}
                        <div>
                        ${buildRepeater(repeaterFieldName, addRepeaterContentsStyles(false))}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },
                
                addRepeaterContentsStyles = function (isCustom) {
                    let submenuFieldName = WuxDef.GetAttribute("Action_Actions");
                    
                    return `
                    <div class="wuxFeature wuxMinWidth220">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader wuxSubMenuSection">
                            <input type="checkbox" name="${submenuFieldName}">
                            ${buildBaseTechniqueHeaderContents(`<span class="wuxSubMenuText">l&nbsp;</span>`)}
                            <input type="hidden" class="wuxSubMenu-flag" name="${submenuFieldName}" value="0">
                            <div class="wuxSubMenuContent">\n${isCustom ? addCustomSubmenuContentsStyles() : addSubmenuContentsStyles()}\n</div>
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

                addCustomSubmenuContentsStyles = function () {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let setDataTechniqueDef = WuxDef.Get("Action_SetData");

                    return `${WuxSheetMain.SubMenuOptionRollButton(useTechniqueDef.getAttribute(), useTechniqueDef.getVariable(), useTechniqueDef.getTitle())}
                        ${WuxSheetMain.SubMenuOptionText(setDataTechniqueDef.getAttribute(), setDataTechniqueDef.getTitle())}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuTechniqueTemplate()}
                    `;
                },

                buildSubmenuTechniqueTemplate = function () {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseTechniqueHeaderContents()}
                        </div>
                        ${buildBaseTechniqueRequirements()}
                        ${buildExtendedTechniqueData()}
                    </div>`;

                },

                buildBaseTechniqueHeaderContents = function (headerPrefix) {
                    return `<div class="wuxFeatureHeaderDisplayBlock">
                        <div class="wuxFeatureHeaderName">${headerPrefix != undefined ? headerPrefix : ""}<span name="${getActionTypeAttribute("TechName")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechResourceData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechTargetingData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo">
                            <span><strong>Traits: </strong></span>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechTrait", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechTrigger")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoTrigger">
                            <span><strong>Trigger: </strong></span>
                            <span name="${getActionTypeAttribute("TechTrigger")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechRequirements")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoReq">
                            <span><strong>Requirements: </strong></span>
                            <span name="${getActionTypeAttribute("TechRequirements")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechItemReq", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechFlavorText")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureFunctionBlock">
                            <div class="wuxFeatureFunctionBlockFlavorText">
                                <span name="${getActionTypeAttribute("TechFlavorText")}"></span>
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
                    
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechDef", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                        <span class="wuxTooltip">
                            <span class="wuxTooltipText" name="${getActionTypeAttribute(baseAttribute, index)}">-</span>
                            <div class="wuxTooltipContent">
                                <div class="wuxHeader2"><span name="${getActionTypeAttribute(baseAttribute, index)}">-</span></div>
                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc0")}"></span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index + "desc1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc1")}"></span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index + "desc2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc2")}"></span>
                                </div>
                            </div>
                        </span>
                    </div>`;
                },

                addTechEffect = function (index) {
                    return `<input type="hidden" name="${getActionTypeAttribute("TechEffect", `${index}desc`)}" value="0" />
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechEffect", `${index}name`)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckHeader">
                            <span class="wuxTooltip">
                                <span class="wuxTooltipText" name="${getActionTypeAttribute("TechEffect", `${index}name`)}">Name</span>
                                <div class="wuxTooltipContent">
                                    <div class="wuxHeader2"><span name="${getActionTypeAttribute("TechEffect", `${index}name`)}">Name</span></div>
                                    <span class="wuxDescription" name="${getActionTypeAttribute("TechEffect", `${index}desc`)}"></span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechEffect", index)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckBlock">
                            <span class="wuxFeatureCheckBlockRow" name="${getActionTypeAttribute("TechEffect", index)}">Effect</span>
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

var DisplayNpcSheet = DisplayNpcSheet || (function () {
    'use strict';

    var
        print = function () {
            let output = WuxSheetNavigation.BuildNpcPageNavigation() +
                SideBarData.Print() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("NPC", output);
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
                    contents += repeatingBasicTechniquesSection("RepeatingConsumables");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicActions");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicRecovery");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicAttack");
                    contents += repeatingBasicTechniquesSection("RepeatingBasicSocial");
                    contents += WuxSheetMain.HiddenAncestryField("Spirit",
                        repeatingBasicTechniquesSection("RepeatingBasicSpirit"));
                    contents += repeatingCustomTechniquesSection();
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

                repeatingCustomTechniquesSection = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCustomTech");

                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        <div>
                            <div class="wuxRepeatingFlexSection">
                                <fieldset class="${repeatingDef.getVariable()}">
                                ${addRepeaterContentsStyles(true)}
                                </fieldset>
                            </div>
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                repeatingTechniquesSection = function (header, repeaterFieldName) {
                    return `${WuxSheetMain.Header(header)}
                        <div>
                        ${buildRepeater(repeaterFieldName, addRepeaterContentsStyles(false))}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                addRepeaterContentsStyles = function (isCustom) {
                    let submenuFieldName = WuxDef.GetAttribute("Action_Actions");

                    return `
                    <div class="wuxFeature wuxMinWidth220">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader wuxSubMenuSection">
                            <input type="checkbox" name="${submenuFieldName}">
                            ${buildBaseTechniqueHeaderContents(`<span class="wuxSubMenuText">l&nbsp;</span>`)}
                            <input type="hidden" class="wuxSubMenu-flag" name="${submenuFieldName}" value="0">
                            <div class="wuxSubMenuContent">\n${isCustom ? addCustomSubmenuContentsStyles() : addSubmenuContentsStyles()}\n</div>
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

                addCustomSubmenuContentsStyles = function () {
                    let useTechniqueDef = WuxDef.Get("Action_Use");
                    let setDataTechniqueDef = WuxDef.Get("Action_SetData");

                    return `${WuxSheetMain.SubMenuOptionRollButton(useTechniqueDef.getAttribute(), useTechniqueDef.getVariable(), useTechniqueDef.getTitle())}
                        ${WuxSheetMain.SubMenuOptionText(setDataTechniqueDef.getAttribute(), setDataTechniqueDef.getTitle())}
                        ${WuxSheetMain.Header2("Full Technique Details")}
                        ${buildSubmenuTechniqueTemplate()}
                    `;
                },

                buildSubmenuTechniqueTemplate = function () {
                    return `
                    <div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${getActionTypeAttribute("TechActionType")}">
                        <div class="wuxFeatureHeader">
                            ${buildBaseTechniqueHeaderContents()}
                        </div>
                        ${buildBaseTechniqueRequirements()}
                        ${buildExtendedTechniqueData()}
                    </div>`;

                },

                buildBaseTechniqueHeaderContents = function (headerPrefix) {
                    return `<div class="wuxFeatureHeaderDisplayBlock">
                        <div class="wuxFeatureHeaderName">${headerPrefix != undefined ? headerPrefix : ""}<span name="${getActionTypeAttribute("TechName")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechResourceData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo"><span name="${getActionTypeAttribute("TechTargetingData")}"></span></div>
                        <div class="wuxFeatureHeaderInfo">
                            <span><strong>Traits: </strong></span>
                            <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechTrait", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechTrigger")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoTrigger">
                            <span><strong>Trigger: </strong></span>
                            <span name="${getActionTypeAttribute("TechTrigger")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechRequirements")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureHeaderInfoReq">
                            <span><strong>Requirements: </strong></span>
                            <span name="${getActionTypeAttribute("TechRequirements")}"></span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechItemReq", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechFlavorText")}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureFunctionBlock">
                            <div class="wuxFeatureFunctionBlockFlavorText">
                                <span name="${getActionTypeAttribute("TechFlavorText")}"></span>
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
                    
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechDef", 0)}" value="0" />
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
                    return `<input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index)}" value="0" />
                    <div class="wuxHiddenInlineField">
                        ${index == 0 ? "" : `<span>${delimiter == undefined ? "; " : delimiter}</span>`}
                        <span class="wuxTooltip">
                            <span class="wuxTooltipText" name="${getActionTypeAttribute(baseAttribute, index)}">-</span>
                            <div class="wuxTooltipContent">
                                <div class="wuxHeader2"><span name="${getActionTypeAttribute(baseAttribute, index)}">-</span></div>
                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc0")}"></span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index + "desc1")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc1")}"></span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute(baseAttribute, index + "desc2")}" value="0" />
                                <div class="wuxHiddenField">
                                    <span class="wuxDescription" name="${getActionTypeAttribute(baseAttribute, index + "desc2")}"></span>
                                </div>
                            </div>
                        </span>
                    </div>`;
                },

                addTechEffect = function (index) {
                    return `<input type="hidden" name="${getActionTypeAttribute("TechEffect", `${index}desc`)}" value="0" />
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechEffect", `${index}name`)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckHeader">
                            <span class="wuxTooltip">
                                <span class="wuxTooltipText" name="${getActionTypeAttribute("TechEffect", `${index}name`)}">Name</span>
                                <div class="wuxTooltipContent">
                                    <div class="wuxHeader2"><span name="${getActionTypeAttribute("TechEffect", `${index}name`)}">Name</span></div>
                                    <span class="wuxDescription" name="${getActionTypeAttribute("TechEffect", `${index}desc`)}"></span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <input type="hidden" class="wuxHiddenField-flag" name="${getActionTypeAttribute("TechEffect", index)}" value="0" />
                    <div class="wuxHiddenField">
                        <div class="wuxFeatureCheckBlock">
                            <span class="wuxFeatureCheckBlockRow" name="${getActionTypeAttribute("TechEffect", index)}">Effect</span>
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