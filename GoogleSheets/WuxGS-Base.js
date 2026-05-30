// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

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
                            return contents;
                        },

                        buildCharacterSection = function () {
                            let contents = "";
                            contents += WuxSheetMain.MultiRowGroup([basics(), influences()], WuxSheetMain.Table.FlexTable, 2);
                            contents += WuxSheetMain.MultiRowGroup([advancement(), resources()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewCharacter");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        basics = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildText(WuxDef.Get("FullName"), 
                                WuxSheetMain.Span(WuxDef.GetAttribute("FullName")));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), 
                                WuxDef.GetAttribute("DisplayName"));
                            
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
                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.formula.getValue()}`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.formula.getValue()}`))],
                                WuxSheetMain.Table.FlexTable, 2);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                        },

                        resources = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Page_OverviewResources");
                            contents += WuxSheetMain.Header(`${titleDefinition.getTitle()}`);

                            let crDef = WuxDef.Get("CR");
                            let potencyDefinition = WuxDef.Get("SB_MAX");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(crDef, crDef.getAttribute(),
                                        `Max: <span name="${crDef.getAttribute(WuxDef._max)}"></span>`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildText(potencyDefinition, WuxSheetMain.Span(potencyDefinition.getAttribute())))],
                                WuxSheetMain.Table.FlexTable, 2);

                            let vitalityDef = WuxDef.Get("Cmb_Vitality");
                            let surgeDef = WuxDef.Get("Surge");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(vitalityDef, vitalityDef.getAttribute(),
                                        `Max: <span name="${vitalityDef.getAttribute(WuxDef._max)}"></span>`)),
                                    WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildNumberLabelInput(surgeDef, surgeDef.getAttribute(),
                                        `Max: <span name="${surgeDef.getAttribute(WuxDef._max)}"></span>`))],
                                WuxSheetMain.Table.FlexTable, 2);

                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
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

                            let originDefinition = WuxDef.Get("Page_Origin");
                            let backgroundBuilder = new CharacterBackgroundBuilder();
                            let statSummaryDefinition = WuxDef.Get("Title_StatSummary");
                            let statsBuilder = new ExtendedCharacterStatisticsBuilder();
                            
                            return `${WuxSheetMain.CollapsibleTab(statSummaryDefinition.getAttribute(WuxDef._tab, WuxDef._expand), statSummaryDefinition.title,
                                WuxSheetMain.TabBlock(statsBuilder.print()))}
                                ${WuxSheetMain.CollapsibleTab(originDefinition.getAttribute(WuxDef._tab, WuxDef._expand), originDefinition.title,
                                WuxSheetMain.TabBlock(backgroundBuilder.print()))}`;
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

                            contents += WuxSheet.NotePageDisplayInput();
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
                        [{def: "Forme_JobSlot", countAttr: WuxDef.GetAttribute("JobSlots"), max: 3}], true);
                    contents += buildStyleSection("RepeatingStyles", "Page_Styles",
                        [{def: "Forme_AdvancedSlot", countAttr: WuxDef.GetAttribute("AdvancedSlots"), max: 3},
                            {def: "Forme_StyleSlot", countAttr: WuxDef.GetAttribute("StyleSlots"), max: 6}], false);
                    return WuxSheetMain.Build(contents);
                },

                buildStyleSection = function (repeatingSectionName, sectionDefName, slotDefNames, displayTierData) {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([learnedStyles(repeatingSectionName, displayTierData),
                        addEquippedSection(slotDefNames)], WuxSheetMain.Table.FlexTable, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDefinition = WuxDef.Get(sectionDefName);
                    return WuxSheetMain.CollapsibleTab(sectionDefinition.getAttribute(WuxDef._tab, WuxDef._expand), sectionDefinition.getTitle(), contents);
                },

                learnedStyles = function (repeatingSectionName, displayTierData) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addRepeaterContentsStyles(displayTierData))}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addRepeaterContentsStyles = function (displayTierData) {
                    let tierOutput = "";
                    let nameDef = WuxDef.Get("Forme_Name");
                    let actionDef = WuxDef.Get("Forme_Actions");
                    
                    if (displayTierData) {
                        let tierDef = WuxDef.Get("Forme_Tier");
                        let isAdvancedAttr = WuxDef.GetAttribute("Forme_IsAdvanced");

                        let tierData = `<span>Tier </span><span name="${tierDef.getAttribute()}"></span>`;
                        tierOutput = WuxSheetMain.HiddenSpanField(isAdvancedAttr, `${tierData}<span>A</span>`);
                        tierOutput += WuxSheetMain.HiddenAuxSpanField(isAdvancedAttr, tierData);
                        tierOutput = `
                        <div class="wuxEquipableType wuxDescription">${tierOutput}</div>`;
                    }

                    return WuxSheetMain.MultiRow(`
                        ${WuxSheetMain.SubMenuButton(actionDef.getAttribute(), addSubmenuContentsStyles())}${tierOutput}
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
                    // contents += WuxSheetSidebar.BuildLanguageSection();
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("ActionsData", 
                        WuxSheetSidebar.Build("", `${WuxSheetSidebar.BuildChatSection()}
                        ${WuxSheetSidebar.BuildChecksSection()}
                        ${WuxSheetSidebar.BuildBoonSection()}
                        ${WuxSheetSidebar.BuildTechSection()}`))}
                    ${WuxSheet.PageDisplay("StylesData", 
                        WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique"))))}`;
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
                print = function () {
                    let contents = "";
                    contents += buildStylesList();
                    contents += buildFormeActions();
                    return WuxSheetMain.Build(contents);
                },

                buildFormeActions = function () {
                    let contents = "";

                    contents += buildJobSelection();
                    contents += repeatingFormeSection();
                    contents += repeatingCustomTechniquesSection();
                    
                    contents = WuxSheetMain.TabBlock(contents);
                    let sectionDef = WuxDef.Get("Title_Techniques");
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents);
                },
                
                buildJobSelection = function () {
                    let jobSelection = new JobSelectionBuilder();
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("ActionsData", jobSelection.print())}`;
                },
                repeatingFormeSection = function () {
                    let repeaterDefinition = WuxDef.Get("RepeatingFormeTech");
                    let repeatingVariable = repeaterDefinition.getVariable();
                    let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
                    let refreshField = sectionDefinition.getAttribute(WuxDef._refresh);
                    let sortField = sectionDefinition.getAttribute(WuxDef._subfilter);
                    let filterField = sectionDefinition.getAttribute(WuxDef._learn);
                    let removeFilterField = sectionDefinition.getAttribute(WuxDef._filter);

                    let header = getFormeSectionHeader(
                        `<span>${sectionDefinition.getTitle()}</span>`, refreshField, filterField, removeFilterField);
                    
                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("TechIsVisible"), 
                        printFormTechniqueFullActionDisplay());
                    let displayTechniquesContents = buildRepeater(repeatingVariable, actionDisplay);
                    
                    return `${WuxSheetMain.Header(header)}
                    ${displayTechniquesContents}
                    ${WuxSheetMain.Row("&nbsp;")}`;
                },
                repeatingCustomTechniquesSection = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCustomTech");
                    let setDataTechniqueAttr = WuxDef.GetAttribute("Action_SetData");
                    
                    let header = `<span>${repeatingDef.getTitle()}</span>`;

                    let actionDisplay = WuxSheetMain.HiddenFieldToggle(
                        setDataTechniqueAttr,
                        printFormTechniqueFullActionDisplay(), 
                        WuxSheetMain.Input("text", setDataTechniqueAttr));
                    
                    let contents = `<div class="wuxRepeatingFlexSection">
                            <fieldset class="${repeatingDef.getVariable()}">
                            ${actionDisplay}
                            </fieldset>
                        </div>`;

                    return `${WuxSheetMain.Header(header)}
                    ${contents}
                    ${WuxSheetMain.Row("&nbsp;")}`;
                    
                    // return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                getFormeSectionHeader = function (headerName, refreshField, filterField, removeFilterField) {
                    let headerButtons = "";
                    let loadFormeField = WuxDef.GetAttribute("Action_FormeLoadCount");
                    let loadFormeDef = WuxDef.Get("Action_FormeLoad");
                    headerButtons += WuxSheetMain.HiddenField(loadFormeField, WuxSheetMain.Button(loadFormeDef.getAttribute(),
                        `<span class='wuxStyleHeaderButtonIcon'>&#10227;</span>${loadFormeDef.getTitle(`<span name="${loadFormeField}"></span>`)}`, 
                        "wuxStyleHeaderButton"));
                    headerButtons += WuxSheetMain.Button(filterField,
                        "<span class='wuxStyleHeaderButtonIcon'>&#9776;</span> Filter", "wuxStyleHeaderButton");
                    headerButtons += WuxSheetMain.HiddenSpanField(removeFilterField, WuxSheetMain.Button(removeFilterField,
                        "<span class='wuxStyleHeaderButtonIconClear'>&#10008;</span> Remove Filter", "wuxStyleHeaderButton", "0"));

                    headerButtons = `${WuxSheet.MainPageDisplayInput()}
                        ${WuxSheet.PageDisplay("Actions", 
                        `<span class="wuxStyleHeaderButtonContainer">${headerButtons}</span>`)}`;
                    return headerButtons + headerName;
                },

                printFormTechniqueFullActionDisplay = function () {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilderUsable(WuxDef.Get("Action"));

                    return `<input type="hidden" name="${WuxDef.GetAttribute("Action_Use")}" value="" />
                    <input type="hidden" name="${getActionTypeAttribute("TechVersion")}" value="" />
                    ${techniqueDisplayBuilder.print()}`;
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                buildStylesList = function () {
                    let contents = "";
                    contents += WuxSheetMain.MultiRowGroup([
                        buildStyleFilter(),  styleListSection("RepeatingStyles", false)], 
                        WuxSheetMain.Table.FlexTable, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Page_Styles");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetMain.CollapsibleTab(
                            sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                            sectionDef.getTitle(), contents))}`;
                },

                styleListSection = function (repeatingSectionName, displayTierData) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);
                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addStyleListRepeaterContents(displayTierData))}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents);
                },

                addStyleListRepeaterContents = function (displayTierData) {
                    let nameDef = WuxDef.Get("Forme_Name");
                    let inspectDef = WuxDef.Get("Forme_Inspect");
                    let deleteDef = WuxDef.Get("Forme_Delete");
                    let tierOutput = "";

                    if (displayTierData) {
                        let tierDef = WuxDef.Get("Forme_Tier");
                        let isAdvancedAttr = WuxDef.GetAttribute("Forme_IsAdvanced");
                        let tierData = `<span>Tier </span><span name="${tierDef.getAttribute()}"></span>`;
                        tierOutput = WuxSheetMain.HiddenSpanField(isAdvancedAttr, `${tierData}<span>A</span>`);
                        tierOutput += WuxSheetMain.HiddenAuxSpanField(isAdvancedAttr, tierData);
                        tierOutput = `<div class="wuxEquipableType wuxDescription">${tierOutput}</div>`;
                    }

                    return `<div class="wuxMultiRow" style="min-width: 300px;">
                        ${tierOutput}
                        <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>
                        <div class="wuxFloatRight">
                            ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle()}`)}
                            ${WuxSheetMain.Button(deleteDef.getAttribute(), `&#10008; ${deleteDef.getTitle()}`)}
                        </div>
                    </div>`;
                },

                buildRepeater = function (repeaterName, repeaterData) {
                    return `<div class="wuxNoRepControl wuxRepeatingFlexSection">
                        <fieldset class="${repeaterName}">
                            ${repeaterData}
                        </fieldset>
                    </div>`;
                },

                buildStyleFilter = function () {
                    let titleDef = WuxDef.Get("Title_LearnNewStyles");
                    let contents = WuxSheetMain.Header(titleDef.getTitle());
                    contents += buildStyleFilterCheckboxes();
                    contents += WuxSheetMain.Header2(WuxDef.GetTitle("Title_QuickStyleFilter"));
                    contents += buildRecommendedStyleFilterButton();
                    contents += buildStyleAutoFilterButtons();
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                buildStyleFilterCheckboxes = function () {
                    let nonElementDef = WuxDef.Get("Forme_ShowFromNonElement");
                    let levelRestrictedDef = WuxDef.Get("Forme_ShowLevelRestricted");
                    let items = [
                        WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                nonElementDef.getAttribute(),
                                nonElementDef.getAttribute(WuxDef._info),
                                WuxSheetMain.Header(nonElementDef.getTitle()), 
                                WuxDefinition.TooltipDescription(nonElementDef))),
                        WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                levelRestrictedDef.getAttribute(),
                                levelRestrictedDef.getAttribute(WuxDef._info),
                                WuxSheetMain.Header(levelRestrictedDef.getTitle()), 
                                WuxDefinition.TooltipDescription(levelRestrictedDef)))
                    ];
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_StyleFilterOption"))}
                    ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1)}`;
                },

                buildRecommendedStyleFilterButton = function () {
                    let recommendedFilterDef = WuxDef.Get("Forme_RecommendedStyles");
                    let customFilterDef = WuxDef.Get("Forme_CustomStyleFilter");
                    let items = [];
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(recommendedFilterDef.getAttribute(), recommendedFilterDef.getTitle(), "wuxWidth160")
                    ));
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(customFilterDef.getAttribute(), customFilterDef.getTitle(), "wuxWidth160")
                    ));
                    return WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1);
                },

                buildStyleAutoFilterButtons = function () {
                    let baseGroups = WuxDef.Filter([
                        new DatabaseFilterData("group", "TechAutoFilter"),
                        new DatabaseFilterData("subGroup", "BaseGroup")
                    ]);

                    let filterOptions = [];
                    for (let i = 0; i < baseGroups.length; i++) {
                        let groupDef = baseGroups[i];
                        let groupButtons = WuxDef.Filter([
                            new DatabaseFilterData("group", "TechAutoFilter"),
                            new DatabaseFilterData("subGroup", groupDef.getTitle())
                        ]);

                        let items = [];
                        for (let j = 0; j < groupButtons.length; j++) {
                            items.push(WuxSheetMain.Table.FlexTableGroup(
                                WuxSheetMain.Button(groupButtons[j].getAttribute(), groupButtons[j].getTitle(), "wuxWidth160")
                            ));
                        }

                        filterOptions.push(WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.Header2(groupDef.getTitle()) +
                            WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1)));
                    }
                    let output = WuxSheetMain.MultiRowGroup(filterOptions, WuxSheetMain.Table.FlexTable, 2);

                    let expandedStylesDef = WuxDef.Get("Title_ExpandedStyleFilters");
                    let hiddenField = expandedStylesDef.getAttribute(WuxDef._expand);
                    let header = WuxSheetMain.Header(
                        WuxSheetMain.CollapsibleHeader(
                            `<span>${(expandedStylesDef.getTitle())}</span>`, hiddenField));
                    return header + WuxSheetMain.HiddenAuxField(hiddenField, output);
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
            output += printFilterPopup();
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
            return buildBasePopup(WuxDef.GetAttribute("Popup_InspectPopupActive"), InspectionPopup.Print(), InspectionPopup.PrintHeader());
        },

        printFilterPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_FilterPopupActive"), FilterPopup.Print(), FilterPopup.PrintHeader());
        },

        buildBasePopup = function (attribute, popupContents, popupHeaderContents) {
            popupContents = `<div class="wuxPopup">
                <div class="wuxPopupHeader">
                    <span class="wuxPopupInnerHeader" name="${WuxDef.GetAttribute("Popup_PopupName")}">Name</span>
                    ${popupHeaderContents}
                    ${WuxSheetMain.Button(WuxDef.GetAttribute("Popup_PopupActive"), "Exit", "wuxPopupClose")}
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
                    contents += buildInspectionPopupContentData(buildItemTemplate() + buildTechniqueTemplate());
                    contents += buildInspectionPopupContentData(buildItemRepeater());
                    return `<div class="wuxInspectionPopupContents">${contents}</div>`;
                },
                printHeader = function () {
                    return printAddButton();
                },

                buildInspectionPopupContentData = function (contents) {
                    return `<div class="wuxInspectionPopupContentData">${contents}</div>`;
                },

                buildItemTemplate = function () {
                    let popupDef = WuxDef.Get("Popup");
                    let itemRepeaterDisplayBuilder = new ItemRepeaterDisplayBuilder(popupDef);

                    let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("ItemName")}`);
                    return WuxSheetMain.HiddenField(fieldName,
                        `${WuxSheetMain.Header("Item Data")}
                        ${itemRepeaterDisplayBuilder.print()}`);
                },

                buildTechniqueTemplate = function () {
                    let popupDef = WuxDef.Get("Popup");
                    let output = "";
                    for (let i = 0; i < 4; i++) {
                        let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("TechIsVisible")}${i}`);
                        let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(popupDef, i);
                        output += `<div>${WuxSheetMain.HiddenField(fieldName, techniqueDisplayBuilder.print())}</div>`;
                    }

                    let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("TechIsVisible")}0`);
                    return WuxSheetMain.HiddenField(fieldName,
                        `${WuxSheetMain.Header("Technique")}
                        ${output}`);
                },

                printAddButton = function () {
                    return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                        WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"),
                            `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`));
                },

                buildItemRepeater = function () {
                    let itemSelectNameAttr = WuxDef.GetAttribute("Popup_ItemSelectName");
                    let itemSelectTypeAttr = WuxDef.GetAttribute("Popup_ItemSelectType");
                    let itemSelectDisplayAttr = WuxDef.GetAttribute("Popup_ItemSelectDisplay");
                    let itemSelectIsOnAttr = WuxDef.GetAttribute("Popup_ItemSelectIsOn");
                    let itemSelectVisibleAttr = WuxDef.GetAttribute("Popup_ItemSelectVisible");
                    let affinityIcons =
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayNeutral"), `<img class="wuxAffinityIcon wuxAffinityIconNeutral" src="https://i.imgur.com/5hQ5Bun.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayWood"),    `<img class="wuxAffinityIcon wuxAffinityIconWood"    src="https://i.imgur.com/pjMuXYy.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayFire"),    `<img class="wuxAffinityIcon wuxAffinityIconFire"    src="https://i.imgur.com/aD41Ap4.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayEarth"),   `<img class="wuxAffinityIcon wuxAffinityIconEarth"   src="https://i.imgur.com/1efdxRx.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayMetal"),   `<img class="wuxAffinityIcon wuxAffinityIconMetal"   src="https://i.imgur.com/CFQ9LJx.png">`) +
                        WuxSheetMain.HiddenAuxSpanField(WuxDef.GetAttribute("Popup_ItemSelectDisplayWater"),   `<img class="wuxAffinityIcon wuxAffinityIconWater"   src="https://i.imgur.com/KAcJG5h.png">`);
                    let itemData = WuxSheetMain.HiddenField(itemSelectVisibleAttr,
                        WuxSheetMain.HiddenFieldToggle(itemSelectTypeAttr,
                        `${WuxSheetMain.Input("hidden", itemSelectNameAttr)}
                        <input type="hidden" class="wuxInspectionPopupSelectContainer-flag" name="${itemSelectIsOnAttr}">
                        ${WuxSheetMain.Button(itemSelectIsOnAttr, WuxSheetMain.Span(itemSelectDisplayAttr) + affinityIcons, "wuxInspectionPopupSelectContainer")}`,
                        `${WuxSheetMain.Header2(WuxSheetMain.Span(itemSelectDisplayAttr))}
                        ${WuxSheetMain.HiddenField(itemSelectNameAttr, WuxSheetMain.Desc(WuxSheetMain.Span(itemSelectNameAttr)))}`)
                    );

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
                Print: print,
                PrintHeader: printHeader
            }
        }()),

        FilterPopup = FilterPopup || (function () {
            'use strict';
    
            var
                print = function () {
                    let contents = `${printClearFilterButton()}
                    ${buildTechniqueFilters()}
                    ${printApplyFilterButton()}`;
                    return `<div class="wuxFilterPopupContents">${contents}</div>`;
                },
                printHeader = function () {
                    return printApplyFilterButton();
                },
                
                buildTechniqueFilters = function () {
                    let filterDefinitions = new TechniqueFilterDefinitions("TechFilterPopup");
                    let filterDisplay = new FilterDisplayBuilder(filterDefinitions);
                    return `${filterDisplay.print()}`;
                },

                printApplyFilterButton = function () {
                    let applyFilterDef = WuxDef.Get("Popup_ApplyFilter");
                    return WuxSheetMain.Button(applyFilterDef.getAttribute(), `<span">${applyFilterDef.getTitle()}</span>`);
                },

                printClearFilterButton = function () {
                    let clearFilterDef = WuxDef.Get("Popup_ClearFilter");
                    return WuxSheetMain.Button(clearFilterDef.getAttribute(), `<span">${clearFilterDef.getTitle()}</span>`);
                }
    
            return {
                Print: print,
                PrintHeader: printHeader
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