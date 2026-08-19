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
            return WuxSheet.PageDisplay("Overview", MainContentData.PrintOverview());
        },

        printDetails = function () {
            return WuxSheet.PageDisplay("Details", MainContentData.PrintDetails());
        },

        printPost = function () {
            return WuxSheet.PageDisplay("Post", MainContentData.PrintPost());
        },

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
                            contents += WuxSheetMain.MultiRowGroup([basics(), WuxCharacterSheetBuilders.BuildInfluences()], WuxSheetMain.Table.FlexTable, 2);
                            contents += WuxSheetMain.MultiRowGroup([advancement(), resources()], WuxSheetMain.Table.FlexTable, 2);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_OverviewCharacter");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents, definition);
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

                            contents += WuxSheetMain.Header2("Checks");
                            contents += WuxSheetSidebar.BuildRollSkillButtonBare();

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

                        // Opens the Manual straight to its reserved "More Info" page
                        // (Worker-Manual.js's OpenManualWithDefinitions, via the
                        // WuxGS-Backend.js listener bound to this same attribute),
                        // showing ONLY this one status's own writeup - sidebar-free,
                        // nothing else on the page to scroll past. Reuses the
                        // definition's own _moreinfo attribute rather than a new one -
                        // still a single momentary per-definition trigger, just wired to
                        // a different action.
                        //
                        // This replaced an earlier attempt to jump to
                        // GuideCat_StatusEffects and land on the specific entry via a
                        // same-page fragment anchor - confirmed in practice that browsers
                        // only ever run ONE of "follow href" or "activate the other
                        // nested/associated control" per click, never both, regardless of
                        // which one is nested inside which, and a pure :target-driven CSS
                        // reveal isn't tied to Popup_PopupActive so Exit could never
                        // clear it. Showing just the requested definition(s) on their own
                        // page sidesteps the whole scrolling problem instead of solving
                        // it.
                        openManualButton = function (definition) {
                            return `<div class="wuxButton wuxRepeatingTechActionButton wuxMoreInfoButton">
                            <input type="checkbox" name="${definition.getAttribute(WuxDef._moreinfo)}">
                            <span>More Info...</span>
                            </div>`;
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

                            let presetStatusDefs = WuxDef.Filter([new DatabaseFilterData("group", "Status")]).filter(def => def.presetStatus);
                            if (presetStatusDefs.length > 0) {
                                let statusSectionDef = WuxDef.Get("Page_OverviewStatus");
                                contents += WuxSheetMain.Header(statusSectionDef.getTitle());
                                let statusItems = presetStatusDefs.map(def => {
                                    if (def.hasRanks) {
                                        return WuxSheetMain.Table.FlexTableGroup(
                                            WuxDefinition.BuildNumberLabelInput(def, def.getAttribute(), def.shortDescription));
                                    }
                                    // Ends on round start/trigger notes dropped from here -
                                    // now covered by the Manual's own richer description
                                    // (ManualPopup.getTopics, GoogleSheets/WuxGS-Base.js),
                                    // which uses StatusData.getDescriptions() to include
                                    // that same "ends when..." sentence automatically.
                                    return WuxSheetMain.Table.FlexTableGroup(
                                        WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                            def.getAttribute(), WuxSheetMain.Header2(def.getTitle())) +
                                        openManualButton(def));
                                });
                                contents += WuxSheetMain.MultiRowGroup(statusItems, WuxSheetMain.Table.FlexTable, 2);
                            }

                            let boonDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);
                            if (boonDefs.length > 0) {
                                let boonSectionDef = WuxDef.Get("Title_Boon");
                                contents += WuxSheetMain.Header(boonSectionDef.getTitle());
                                let boonItems = boonDefs.map(def =>
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                            def.getAttribute(), WuxSheetMain.Header2(def.getTitle())) +
                                        openManualButton(def)));
                                contents += WuxSheetMain.MultiRowGroup(boonItems, WuxSheetMain.Table.FlexTable, 2);
                            }

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

                            let originDefinition = WuxDef.Get("Title_Origin");
                            let backgroundBuilder = new CharacterBackgroundBuilder();
                            let statSummaryDefinition = WuxDef.Get("Title_StatSummary");
                            let statsBuilder = new ExtendedCharacterStatisticsBuilder();

                            return `${WuxSheetMain.CollapsibleTab(statSummaryDefinition.getAttribute(WuxDef._tab, WuxDef._expand), statSummaryDefinition.title,
                                WuxSheetMain.TabBlock(statsBuilder.print()), statSummaryDefinition)}
                                ${WuxSheetMain.CollapsibleTab(originDefinition.getAttribute(WuxDef._tab, WuxDef._expand), originDefinition.title,
                                WuxSheetMain.TabBlock(backgroundBuilder.print()), originDefinition)}`;
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
                            contents += new ChatDisplayBuilder().print();
                            contents += createNotebookDisplay();
                            return contents;
                        },


                        createNotebookDisplay = function () {
                            let notebookCount = parseInt(WuxDef.Get("Note_NotebookCount").formula.getValue());
                            let contents = WuxSheetMain.MultiRowGroup([notebookSelect(notebookCount), notebookPages(notebookCount)],
                                WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Title_Notebook");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents, definition);
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
                            let openDef = WuxDef.Get("Note_NotebookOpen");

                            return `
                            ${WuxSheetMain.CustomInput("text", nameDef.getAttribute(count),
                                "wuxInput wuxWidth160", ` placeholder="Notebook ${count + 1}"`)}
                            ${WuxSheetMain.Button(openDef.getAttribute(count), openDef.getTitle(), "wuxSmallButton")}`;
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

var DisplayGearSheet = DisplayGearSheet || (function () {
    'use strict';

    var
        print = function () {
            return WuxSheet.PageDisplay("Gear", MainContentData.Print());
        },

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildEquipment();
                    contents += buildConsumables();
                    return WuxSheetMain.Build(contents);
                },

                buildConsumables = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([slottedConsumables(), ownedConsumables()], WuxSheetMain.Table.FlexTableReverse, 2);
                    contents += WuxSheetMain.MultiRowGroup([storedFoods(), cookingEvents()], WuxSheetMain.Table.FlexTable, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearConsumables");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents, definition);
                },

                ownedConsumables = function () {
                    let repeatingDef = WuxDef.Get("RepeatingConsumables");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_ConsumableIsVisible");
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addRepeaterContentsConsumables());

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                    <div>
                        ${WuxSheetMain.HiddenFieldToggle(eqipmentIsVisibleAttr, repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addConsumableFilterButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addConsumableFilterButtons = function () {
                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let autoEquipDef = WuxDef.Get("Gear_AutoEquipItems");
                    let autoEquip = [WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.InteractionElement.BuildCheckboxInput(
                            autoEquipDef.getAttribute(),
                            WuxSheetMain.Header(autoEquipDef.getTitle())) +
                        WuxSheetMain.MoreInfo(autoEquipDef))];

                    let items = [];
                    for (let i = 0; i < consuTypes.length; i++) {
                        items.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(consuTypes[i].getAttribute(), searchButtonDef.getTitle(consuTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_AddConsumable"))}
                        ${WuxSheetMain.MultiRowGroup(autoEquip, WuxSheetMain.Table.FlexTable, 1)}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsConsumables = function () {
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let buttons = `${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(equipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${equipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                ${buildOwnedItemCard()}
                                <div class="wuxEquipableButtonRow">
                                    ${buttons}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                slottedConsumables = function () {
                    let syncedDef = WuxDef.Get("Title_EquippedInstantConsumables");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let equippedIsVisibleAttr = WuxDef.GetAttribute("Gear_ConsumableIsVisible", WuxDef._gear);

                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let rows = "";
                    for (let i = 0; i < consuTypes.length; i++) {
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].descriptions[0].split(":")[1]));
                        for (let j = 0; j < itemKeys.length; j++) {
                            let item = itemKeys[j];
                            if (item == undefined) {
                                continue;
                            }
                            let countMod = item.technique.fieldName.replace(/_/g, "");
                            let countAttribute = WuxDef.GetAttribute("ItemCount", countMod);
                            let displayData = new TechniqueDisplayData(item.technique);
                            displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                            displayData.technique.displayname = displayData.displayname;
                            displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                            displayData.itemName = item.name;

                            let rowContents = WuxSheetMain.MultiRow(`
                            <div class="wuxEquipableRow">
                                <div class="wuxEquipableBody">
                                    ${buildStaticConsumableCard(item, countMod, displayData)}
                                    <div class="wuxEquipableButtonRow">
                                        <button class="wuxRepeatingTechActionButton" type="roll" value="${displayData.getSheetRollTemplate(true)}"><span style="color:#4caf50;">&#9654;</span><span> Use</span></button>
                                        ${WuxSheetMain.Button(buyDef.getAttribute(countMod), `<span style="color:#5bc0de;">&#9670;</span> ${buyDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                        ${WuxSheetMain.Button(unequipDef.getAttribute(countMod), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    </div>
                                </div>
                            </div>`);
                            rows += WuxSheetMain.HiddenField(countAttribute, rowContents);
                        }
                    }

                    let slotDisplay = WuxSheetMain.SlotDisplay("Slots", "attr_gear-consumableslotstate", WuxDef.GetAttribute("Gear_ConsumableSlot"), WuxDef.GetAttribute("ConsumableSlots"));

                    let unequipAllDef = WuxDef.Get("Gear_UnequipAll");
                    let contents = `${WuxSheetMain.Header(`${syncedDef.getTitle()}`)}
                        ${slotDisplay}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Gear_ConsumableSlot"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute("consumable"), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        ${WuxSheetMain.HiddenFieldToggle(equippedIsVisibleAttr, `<div>${rows}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`;

                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },

                storedGear = function () {
                    let repeatingDef = WuxDef.Get("RepeatingGear");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let buttons = `${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                ${buildOwnedItemCard()}
                                <div class="wuxEquipableButtonRow">
                                    ${buttons}
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater("repeating_gear",
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Gear_GearIsVisible"), repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                            ${WuxSheetMain.Row("&nbsp;")}
                            ${addGearFilterButtons()}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addGearFilterButtons = function () {
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let gearTypes = WuxDef.Filter([new DatabaseFilterData("group", "GearType")]);
                    let gearItems = [];
                    for (let i = 0; i < gearTypes.length; i++) {
                        gearItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(gearTypes[i].getAttribute(), searchButtonDef.getTitle(gearTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    let goodsTypes = WuxDef.Filter([new DatabaseFilterData("group", "GoodsType")]);
                    for (let i = 0; i < goodsTypes.length; i++) {
                        gearItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(goodsTypes[i].getAttribute(), searchButtonDef.getTitle(goodsTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_AddGear"))}
                        ${WuxSheetMain.MultiRowGroup(gearItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                storedFoods = function () {
                    let repeatingDef = WuxDef.Get("RepeatingFoods");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let cookDef = WuxDef.Get("Gear_Cook");

                    let gearDef = WuxDef.Get("Gear");
                    let itemNameVar = gearDef.getVariable(`-${WuxDef.GetVariable("ItemName")}`);
                    let itemCountVar = gearDef.getVariable(`-${WuxDef.GetVariable("ItemCount")}`);
                    let cookButtonValue = `!addingredient @{${itemNameVar}}|||@{${itemCountVar}}|||@{character_name}`;

                    let buttons = `${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                        <button class="wuxRepeatingTechActionButton" type="roll" value="${cookButtonValue}"><span style="color:#4caf50;">&#9874;</span> <span>${cookDef.getTitle("")}</span></button>`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <input type="hidden" name="${getGearAttribute("ItemName")}">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                ${buildOwnedItemCard()}
                                <div class="wuxEquipableButtonRow">
                                    ${buttons}
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Gear_FoodIsVisible"), repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                            ${WuxSheetMain.Row("&nbsp;")}
                            ${addFoodsFilterButtons()}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                addFoodsFilterButtons = function () {
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let foodTypes = WuxDef.Filter([new DatabaseFilterData("group", "FoodType")]);
                    let foodItems = [];
                    for (let i = 0; i < foodTypes.length; i++) {
                        foodItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(foodTypes[i].getAttribute(), searchButtonDef.getTitle(foodTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    let ingTypes = WuxDef.Filter([new DatabaseFilterData("group", "IngType")]);
                    for (let i = 0; i < ingTypes.length; i++) {
                        foodItems.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(ingTypes[i].getAttribute(), searchButtonDef.getTitle(ingTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_AddFoodReageant"))}
                        ${WuxSheetMain.MultiRowGroup(foodItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                cookingEvents = function () {
                    let cookingEventDef = WuxDef.Get("Gear_CookingEvent");
                    let activeRecipeDef = WuxDef.Get("Gear_ActiveRecipe");
                    let activeIngredientListDef = WuxDef.Get("Gear_ActiveIngredientList");
                    let mealCountDef = WuxDef.Get("Gear_MealCount");
                    let cookingScoreDef = WuxDef.Get("Gear_CookingScore");
                    let updateCookingDef = WuxDef.Get("Gear_UpdateCooking");
                    let updateCookingButtonValue = `!cook @{character_name}`;
                    let consumeDef = WuxDef.Get("Gear_ConsumeIngredients");

                    let contents = `${WuxSheetMain.Header(cookingEventDef.getTitle())}
                        ${WuxSheetMain.Row(WuxSheetMain.DescField(activeRecipeDef.getAttribute()))}
                        ${WuxSheetMain.Row(WuxSheetMain.DescField(activeRecipeDef.getAttribute(WuxDef._info)))}
                        ${storedCooking()}
                        ${WuxSheetMain.Header2(activeIngredientListDef.getTitle())}
                        ${WuxSheetMain.Row(WuxSheetMain.DescField(activeIngredientListDef.getAttribute()))}
                        ${WuxSheetMain.Header2(mealCountDef.getTitle())}
                        ${WuxSheetMain.Row(WuxSheetMain.DescField(mealCountDef.getAttribute()))}
                        ${WuxSheetMain.Header2(cookingScoreDef.getTitle())}
                        ${WuxSheetMain.Row(WuxSheetMain.DescField(cookingScoreDef.getAttribute()))}
                        ${WuxSheetMain.HiddenAuxField(WuxDef.GetAttribute("Gear_CookingIsVisible"), WuxSheetMain.Button(consumeDef.getAttribute(), consumeDef.getTitle(""), "wuxWidth120"))}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Gear_CookingIsVisible"), `<button class="wuxButton wuxWidth120" type="roll" value="${updateCookingButtonValue}"><span>${updateCookingDef.getTitle("")}</span></button>`)}`;

                    return WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.HiddenField(activeRecipeDef.getAttribute(), contents), " wuxMinWidth150");
                },

                storedCooking = function () {
                    let repeatingDef = WuxDef.Get("RepeatingCooking");
                    let removeDef = WuxDef.Get("Gear_Remove");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let gearDef = WuxDef.Get("Gear");
                    let itemNameVar = gearDef.getVariable(`-${WuxDef.GetVariable("ItemName")}`);
                    let removeButtonValue = `!removeingredient @{${itemNameVar}}|||@{character_name}`;
                    let deleteButtonValue = `!deleteingredient @{${itemNameVar}}|||@{character_name}`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <input type="hidden" name="${getGearAttribute("ItemName")}">
                            <div class="wuxEquipableCountCol">
                                <span class="wuxEquipableCount" name="${getGearAttribute("ItemCount")}"></span>
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    <button class="wuxRepeatingTechActionButton" type="roll" value="${deleteButtonValue}"><span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}</button>
                                    <button class="wuxRepeatingTechActionButton" type="roll" value="${removeButtonValue}"><span style="color:#e08a3c;">&#8854;</span> ${removeDef.getTitle("")}</button>
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    return WuxSheetMain.HiddenAuxField(WuxDef.GetAttribute("Gear_CookingIsVisible"), `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${repeaterContent}
                        </div>`);
                },

                buildEquipment = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([equippedEquipment(), ownedEquipment(), storedGear()], WuxSheetMain.Table.FlexTableReverse, 3);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearEquipment");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents, definition);
                },

                ownedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingEquipment");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_EquipmentIsVisible");
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addRepeaterContentsEquipment());

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                    <div>
                        ${WuxSheetMain.HiddenFieldToggle(eqipmentIsVisibleAttr, repeaterContent, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${addEquipmentFilterButtons()}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350 wuxFlexTableItemGroup2");
                },

                buildCurrency = function () {
                    let jinDef = WuxDef.Get("Jin");
                    return `${WuxSheetMain.Header(`${WuxDef.GetTitle("Page_GearCurrency")}`)}
                    <div class="wuxWidth160">
                        ${WuxDefinition.BuildHeader(jinDef)}
                        ${WuxSheetMain.CustomInput("number", jinDef.getAttribute(), "wuxInput wuxMinWidth100")}
                    </div>`;
                },

                addEquipmentFilterButtons = function () {
                    let equipmentTypes = WuxDef.Filter([new DatabaseFilterData("group", "EquipmentType")]);
                    let findByFilterDef = WuxDef.Get("Popup_FindItemsByFilter");
                    let findByTechniqueDef = WuxDef.Get("Popup_FindItemsByTechnique");
                    let searchButtonDef = WuxDef.Get("Popup_SearchButton");
                    let autoEquipDef = WuxDef.Get("Gear_AutoEquipItems");
                    let autoEquip = [WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.InteractionElement.BuildCheckboxInput(
                            autoEquipDef.getAttribute(),
                            WuxSheetMain.Header(autoEquipDef.getTitle())) +
                        WuxSheetMain.MoreInfo(autoEquipDef))];
                    let items = [];
                    for (let i = 0; i < equipmentTypes.length; i++) {
                        items.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(equipmentTypes[i].getAttribute(), searchButtonDef.getTitle(equipmentTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(findByFilterDef.getAttribute(), findByFilterDef.getTitle(), "wuxWidth120"),
                        "wuxMaxWidth220"));
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(findByTechniqueDef.getAttribute(), findByTechniqueDef.getTitle(), "wuxWidth120"),
                        "wuxMaxWidth220"));
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_AddEquipment"))}
                        ${WuxSheetMain.MultiRowGroup(autoEquip, WuxSheetMain.Table.FlexTable, 1)}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsEquipment = function () {
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let subGroupAttr = getGearAttribute("ItemSubGroup");
                    let equipButtonContent = '<span style="color:#c8a020;">&#9881;</span> ' + equipDef.getTitle('<span name="' + subGroupAttr + '"></span>');

                    let buttons = `${WuxSheetMain.Button(equipDef.getAttribute(), equipButtonContent, "wuxRepeatingTechActionButton")}
                        ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}`;

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                ${buildOwnedItemCard()}
                                <div class="wuxEquipableButtonRow">
                                    ${buttons}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                equippedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingSyncedEquipment");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let equippedIsVisibleAttr = WuxDef.GetAttribute("Gear_EquipmentIsVisible", WuxDef._gear);

                    let buttons = WuxSheetMain.Button(unequipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton");

                    let rowContents = WuxSheetMain.MultiRow(`
                    <div class="wuxEquipableRow">
                        <div class="wuxEquipableBody">
                                ${buildOwnedItemCard(getGearAttribute("ItemCount"))}
                            <div class="wuxEquipableButtonRow">
                                ${buttons}
                            </div>
                        </div>
                    </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let slotDisplay = WuxSheetMain.SlotDisplay("Slots", "attr_gear-equipmentslotstate", WuxDef.GetAttribute("Equipment"), WuxDef.GetAttribute("EquipmentSlots"));

                    let traitsDisplay = WuxDefinition.BuildText(
                        WuxDef.Get("Gear_EquippedItemTraits"),
                        `<span name="${WuxDef.GetAttribute("Gear_EquippedItemTraits")}"></span>`);

                    let unequipAllDef = WuxDef.Get("Gear_UnequipAll");
                    let contents = `${buildCurrency()}
                        ${WuxSheetMain.Row("&nbsp;")}
                        ${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        ${slotDisplay}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Equipment"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        ${WuxSheetMain.HiddenFieldToggle(equippedIsVisibleAttr, `<div>${repeaterContent}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}
                        ${traitsDisplay}`;

                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },

                getGearAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Gear");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                // Full item card (name/bulk/value/category+craft tooltip/traits/flavor,
                // plus the lazy Show/Hide Effects technique reveal) for a row in any of
                // the Gear tab's "owned item" repeaters - same display the Inspect
                // Popup's item catalog uses (ItemRepeaterDisplayBuilder,
                // WuxGS-FeatureDisplayBuilder.js), but baseDefinition "Gear" (these
                // repeaters' own established item-field prefix) instead of "Action".
                // countAttribute (optional): folds a quantity prefix into the item's
                // own name (equippedEquipment only - the stored-item repeaters already
                // show their own count via a separate, editable input column).
                buildOwnedItemCard = function (countAttribute) {
                    let itemDisplayBuilder = new ItemRepeaterDisplayBuilder(WuxDef.Get("Gear"));
                    if (countAttribute) {
                        itemDisplayBuilder.setCountAttribute(countAttribute);
                    }
                    return `<div class="wuxFeature">
                        ${itemDisplayBuilder.printHeaderBlock()}
                        ${itemDisplayBuilder.printInfoBlock()}
                        ${DisplayActionSheet.PrintCatalogItemTechniqueSection("Gear")}
                    </div>`;
                },

                // Equipped Consumables (slottedConsumables) has no backing repeater -
                // it iterates a fixed catalog list at HTML-generation time, keyed by a
                // per-item static suffix (countMod, derived from the item's own
                // technique field name) rather than a repeater row id. Shows the item's
                // technique only (no item name/bulk/cost/traits/flavor, no Show/Hide
                // Effects toggle) - matches the Actions tab's own Instant Consumables
                // display (buildItemTechniqueDisplay, this file) exactly: same
                // TechniqueDisplayBuilderUsableWithCount + wuxActionFeature styling,
                // with the item's count folded into the technique's own name
                // (TechniqueDisplayBuilderUsableWithCount.printName, WuxGS-
                // FeatureDisplayBuilder.js) instead of a separate line above the card.
                buildStaticConsumableCard = function (item, countMod, techniqueDisplayData) {
                    let countAttribute = WuxDef.GetAttribute("ItemCount", countMod);
                    let techniqueDisplayBuilder = new TechniqueDisplayBuilderUsableWithCount(techniqueDisplayData);
                    techniqueDisplayBuilder.setFeatureBonusClasses("wuxActionFeature");
                    techniqueDisplayBuilder.setCountAttribute(countAttribute);
                    return techniqueDisplayBuilder.print();
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
            return WuxSheet.PageDisplay("Actions", MainContentData.Print());
        },

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    contents += buildStylesList();
                    contents += buildEquipTech();
                    contents += buildFormeActions();
                    return WuxSheetMain.Build(contents);
                },

                buildEquipTech = function () {
                    let contents = WuxSheetMain.MultiRowGroup(
                        [buildJobSelection(), buildSpiritChangeSection()],
                        WuxSheetMain.Table.FlexTable, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Title_TechniqueChange");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("ActionsData",
                        WuxSheetMain.HiddenField(sectionDef.getAttribute(WuxDef._build),
                            WuxSheetMain.CollapsibleTab(
                                sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                                sectionDef.getTitle(), contents, sectionDef)))}`;
                },

                buildFormeActions = function () {
                    let contents = "";

                    contents += buildBaseFilterButtons();
                    contents += repeatingFormeSection();
                    contents += buildInstantConsumablesSection();
                    contents += repeatingCustomTechniquesSection();

                    contents = WuxSheetMain.TabBlock(contents);
                    let sectionDef = WuxDef.Get("Title_Techniques");
                    return WuxSheetMain.CollapsibleTab(sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                        `${sectionDef.getTitle()}`, contents, sectionDef);
                },

                buildBaseFilterButtons = function () {
                    let titleDef = WuxDef.Get("TechBaseFilter");
                    let clearAllDef = WuxDef.Get("Action_ClearFilter");
                    let customFilterDef = WuxDef.Get("Action_CustomFilter");
                    let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
                    let filterField = sectionDefinition.getAttribute(WuxDef._learn);
                    let baseGroups = WuxDef.Filter([
                        new DatabaseFilterData("group", "TechBaseFilter"),
                        new DatabaseFilterData("subGroup", "BaseGroup")
                    ]);

                    let filterOptions = [];
                    for (let i = 0; i < baseGroups.length; i++) {
                        let groupDef = baseGroups[i];
                        let groupButtons = WuxDef.Filter([
                            new DatabaseFilterData("group", "TechBaseFilter"),
                            new DatabaseFilterData("subGroup", groupDef.getTitle())
                        ]);

                        let items = [];
                        for (let j = 0; j < groupButtons.length; j++) {
                            items.push(WuxSheetMain.Table.FlexTableGroup(
                                WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                    groupButtons[j].getAttribute(), groupButtons[j].getTitle()),
                                " wuxTechBaseFilterButtonGroup"));
                        }

                        let expandField = groupDef.getAttribute(WuxDef._expand);
                        let categoryHeader = WuxSheetMain.Header2(
                            WuxSheetMain.CollapsibleHeader(`<span>${groupDef.getTitle()}</span>`, expandField));
                        let categoryContent = WuxSheetMain.HiddenAuxField(expandField,
                            WuxSheetMain.Table.FlexTable(items.join("")));

                        filterOptions.push(WuxSheetMain.Table.FlexTableGroup(categoryHeader + categoryContent));
                    }

                    let clearAllButton = WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(clearAllDef.getAttribute(), clearAllDef.getTitle(), "wuxWidth120"),
                        " wuxTechBaseFilterButtonGroup");

                    let customFilterButton = WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(filterField, customFilterDef.getTitle(), "wuxWidth120"),
                        " wuxTechBaseFilterButtonGroup");

                    let sectionExpandField = titleDef.getAttribute(WuxDef._expand);
                    let sectionHeader = WuxSheetMain.Header(
                        WuxSheetMain.CollapsibleHeader(`<span>${titleDef.getTitle()}</span>`, sectionExpandField));
                    let sectionContent = WuxSheetMain.HiddenAuxField(sectionExpandField,
                        WuxSheetMain.Table.FlexTable(clearAllButton + customFilterButton) +
                        WuxSheetMain.MultiRowGroup(filterOptions, WuxSheetMain.Table.FlexTable, 1));

                    return sectionHeader + sectionContent;
                },

                buildJobSelection = function () {
                    let jobSelection = new JobSelectionBuilder();
                    let specialTechs = buildStaticTechniqueDisplay("Job Change");
                    let contents = WuxSheetMain.HiddenField(WuxDef.Get("AdvancementJob").getAttribute(),
                        jobSelection.print() + specialTechs);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxFlexTableItemGroup");
                },
                buildSpiritChangeSection = function () {
                    let affinityFilter = [WuxDef.Get("Unaspected")].concat(
                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])
                    );
                    let affinitySelect = WuxSheetMain.Select(WuxDef.GetAttribute("Affinity"), affinityFilter, false);
                    let content = `${WuxSheetMain.Header(WuxDef.GetTitle("Title_ChangeAffinity"))}
                        ${affinitySelect}
                        <div class="wuxRow">&nbsp;</div>
                        ${buildStaticTechniqueDisplay("Spirit Change")}`;
                    let contents = WuxSheetMain.HiddenField(WuxDef.Get("Perk_Spirit Conduit").getAttribute(), content);
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxFlexTableItemGroup");
                },
                buildStaticTechniqueDisplay = function (techniqueName) {
                    let technique = WuxTechs.Get(techniqueName);
                    if (technique == undefined) {
                        return "";
                    }
                    let displayData = new TechniqueDisplayData(technique);
                    displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                    displayData.technique.displayname = displayData.displayname;
                    displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                    let techDisplayDataBuilder = new TechniqueDisplayBuilderUsable(displayData);
                    techDisplayDataBuilder.setFeatureBonusClasses("wuxActionFeature");
                    return techDisplayDataBuilder.print();
                },

                buildItemTechniqueDisplay = function (item) {
                    if (item == undefined || !item.hasTechnique) {
                        return "";
                    }
                    let displayData = new TechniqueDisplayData(item.technique);
                    displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                    displayData.technique.displayname = displayData.displayname;
                    displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                    displayData.itemName = item.name;
                    let countMod = item.technique.fieldName.replace(/_/g, "");
                    let countAttribute = WuxDef.GetAttribute("ItemCount", countMod);
                    let techDisplayDataBuilder = new TechniqueDisplayBuilderUsableWithCount(displayData);
                    techDisplayDataBuilder.setFeatureBonusClasses("wuxActionFeature");
                    techDisplayDataBuilder.setCountAttribute(countAttribute);
                    return WuxSheetMain.HiddenField(countAttribute, techDisplayDataBuilder.print());
                },

                buildInstantConsumablesSection = function () {
                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let output = "";
                    for (let i = 0; i < consuTypes.length; i++) {
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].descriptions[0].split(":")[1]));
                        for (let j = 0; j < itemKeys.length; j++) {
                            output += buildItemTechniqueDisplay(itemKeys[j]);
                        }
                    }
                    if (output == "") {
                        return "";
                    }
                    let sectionDef = WuxDef.Get("Title_InstantConsumables");
                    return `${WuxSheetMain.Header(sectionDef.getTitle())}
                    <div class="wuxFlexTable">${output}</div>
                    ${WuxSheetMain.Row("&nbsp;")}`;
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

                    // IsVisible is piggybacked onto TechActionType's max slot.
                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("TechActionType", WuxDef._max),
                        printFormTechniqueFullActionDisplay());
                    let displayTechniquesContents = buildRepeater(repeatingVariable, actionDisplay, "wuxFormeTechRepeater");

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
                    // headerButtons += WuxSheetMain.Button(filterField,
                    //     "<span class='wuxStyleHeaderButtonIcon'>&#9776;</span> Filter", "wuxStyleHeaderButton");
                    // headerButtons += WuxSheetMain.HiddenSpanField(removeFilterField, WuxSheetMain.Button(removeFilterField,
                    //     "<span class='wuxStyleHeaderButtonIconClear'>&#10008;</span> Remove Filter", "wuxStyleHeaderButton", "0"));

                    headerButtons = `${WuxSheet.MainPageDisplayInput()}
                        ${WuxSheet.PageDisplay("Actions",
                        `<span class="wuxStyleHeaderButtonContainer">${headerButtons}</span>`)}`;
                    return headerButtons + headerName;
                },

                printFormTechniqueFullActionDisplay = function () {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilderUsable(WuxDef.Get("Action"));
                    // Display-type header flag is piggybacked onto TechTrueName's max slot.
                    let techDisplayTypeField = getActionTypeAttribute("TechTrueName", WuxDef._max);
                    let headerContent = `<div class="wuxFeatureSectionHeader">
                        ${WuxSheetMain.Header2(`<span name="${getActionTypeAttribute("TechName")}"></span>`)}
                    </div>`;

                    return `<input type="hidden" name="${WuxDef.GetAttribute("Action_Use")}" value="" />
                    <input type="hidden" name="${getActionTypeAttribute("TechName", WuxDef._max)}" value="" />
                    ${WuxSheetMain.HiddenFieldToggle(techDisplayTypeField, headerContent, techniqueDisplayBuilder.print())}`;
                },

                // Technique catalog for the Inspect Popup's "browse and add a style"
                // flow. Mirrors repeatingFormeSection/printFormTechniqueFullActionDisplay
                // above but: (1) uses its own dedicated "TechPopupValues" repeater
                // (never fused with item data, unlike the item catalog below, which
                // still shares "ItemPopupValues" with the popup's old select-list flow -
                // see TechniqueInspectPopupAttributeHandler, Worker-InspectPopup.js), (2)
                // uses the plain (non-clickable, no rank buttons) TechniqueRepeaterDisplayBuilder
                // instead of the "Usable" clickable subclass, (3) adds a new requirements
                // + select-button section above each card.
                repeatingCatalogTechSection = function () {
                    let repeaterDefinition = WuxDef.Get("TechPopupValues");
                    let repeatingVariable = repeaterDefinition.getVariable();

                    // IsVisible is piggybacked onto TechActionType's max slot, same
                    // mechanism as the live Actions tab.
                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("TechActionType", WuxDef._max),
                        printCatalogTechniqueFullDisplay());
                    // wuxCatalogRepeater adds catalog-only spacing (WCSS-Base.css) on top
                    // of wuxFormeTechRepeater's shared 240px card grid, without touching
                    // the live Actions tab's own use of that class.
                    let displayTechniquesContents = buildRepeater(repeatingVariable, actionDisplay, "wuxFormeTechRepeater wuxCatalogRepeater");

                    return `${displayTechniquesContents}
                    ${printCatalogLoadMoreButton()}
                    ${WuxSheetMain.Row("&nbsp;")}`;
                },
                printCatalogTechniqueFullDisplay = function () {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(WuxDef.Get("Action"));
                    // Display-type header flag is piggybacked onto TechTrueName's max slot.
                    let techDisplayTypeField = getActionTypeAttribute("TechTrueName", WuxDef._max);
                    let headerContent = `<div class="wuxFeatureSectionHeader">
                        ${WuxSheetMain.Header2(`<span name="${getActionTypeAttribute("TechName")}"></span>`)}
                    </div>`;

                    // Selected-state styling (WCSS-Specialized.css) reads this flag via a
                    // sibling selector on the wuxFeature frame below - the same field the
                    // existing select/add mechanism already toggles
                    // (InspectPopupAttributeHandler.setSelectedItem/clearLastSelectedItem,
                    // Worker-InspectPopup.js), no new wiring needed here. Built manually
                    // instead of techniqueDisplayBuilder.print() so the Select button can
                    // sit inside the frame, below the technique's own content, instead of
                    // as its own section above it.
                    // No Action_Use field here - catalog techniques never get a roll
                    // template set (setTechniqueCatalogInfo calls setTechniqueInfo with
                    // setUse=false), so there's nothing for it to hold.
                    let cardContent = `<input type="hidden" class="wuxCatalogCard-selected-flag" name="${WuxDef.GetAttribute("Popup_ItemSelectIsOn")}" value="0">
                    <div class="wuxFeature">
                        ${techniqueDisplayBuilder.printHeaderBlock()}
                        ${techniqueDisplayBuilder.printInfoBlock()}
                        ${printCatalogSelectSection()}
                    </div>`;

                    return `<input type="hidden" name="${getActionTypeAttribute("TechName", WuxDef._max)}" value="" />
                    ${WuxSheetMain.HiddenFieldToggle(techDisplayTypeField, headerContent, cardContent)}`;
                },
                // Sits at the bottom of the card, inside the wuxFeature frame (see
                // printCatalogTechniqueFullDisplay above). Requirement text itself
                // isn't shown per-card - the tier-group header above each group of
                // cards (performStyleFilterInspection, Worker-InspectPopup.js) already
                // states it once per group, so a second copy per card would just be
                // redundant - this section is just the Select button now.
                printCatalogSelectSection = function () {
                    let selectField = getActionTypeAttribute("TechRequirement", WuxDef._max);
                    // The select button only makes sense while browsing to add a new
                    // style. Can't gate this on Popup_InspectShowAdd directly - Roll20
                    // silently rescopes any field name referenced inside a <fieldset
                    // class="repeating_x"> to a per-row attribute, even ones meant to be
                    // global, so a bare global reference here never reflects the real
                    // value. TechRequirement's base slot carries a row-scoped "can
                    // select" flag instead, computed once outside the HTML and written
                    // per row (setTechniqueRequirement, WJS-Service.js).
                    let canSelectField = getActionTypeAttribute("TechRequirement");
                    let selectButton = WuxSheetMain.HiddenField(canSelectField,
                        WuxSheetMain.Button(selectField, "Select", "wuxCatalogSelectButton"));
                    return `<div class="wuxCatalogSelectSection">
                        ${selectButton}
                    </div>`;
                },

                // Load More button (Popup_LoadMore) for a catalog repeater. Visibility
                // is piggybacked onto its own max slot so it can be hidden once no
                // items remain queued - suffix distinguishes the technique catalog's
                // button (no suffix) from the item catalog's (suffix "1") since both
                // reuse the same Popup_LoadMore definition. That same max slot (with
                // the same suffix) also holds the queued-items JSON blob for whichever
                // catalog it belongs to (writeRemainingQueue,
                // ItemInspectPopupAttributeHandler/TechniqueInspectPopupAttributeHandler,
                // Worker-InspectPopup.js). The button's entire label is one bound span
                // (suffix + "2") that the worker overwrites with the full text each time
                // it loads a batch - a span nested inside the title template
                // (substituted at build time) rendered with a stray gap around the
                // number, so the whole label is written live instead.
                printCatalogLoadMoreButton = function (suffix) {
                    let loadMoreField = WuxDef.GetAttribute("Popup_LoadMore", suffix);
                    let loadMoreVisibleField = WuxDef.GetAttribute("Popup_LoadMore", `${suffix != undefined ? suffix : ""}${WuxDef._max}`);
                    let countField = WuxDef.GetAttribute("Popup_LoadMore", `${suffix != undefined ? suffix : ""}2`);
                    let buttonText = `<span name="${countField}">${WuxDef.Get("Popup_LoadMore").getTitle("10")}</span>`;
                    return WuxSheetMain.HiddenField(loadMoreVisibleField,
                        WuxSheetMain.Row(WuxSheetMain.Button(loadMoreField, buttonText, "wuxCatalogLoadMoreButton")));
                },

                // Item catalog for the Inspect Popup's "browse and add an item" flow.
                // Mirrors repeatingCatalogTechSection above but: (1) uses the shared
                // "ItemPopupValues" repeater (see ItemInspectPopupAttributeHandler,
                // Worker-InspectPopup.js), (2) gates each card's visibility on the real
                // ItemIsVisible attribute instead of a piggybacked slot, since items have
                // no other field that already needed piggybacking, (3) no tier-group
                // headers or Select button yet - selection/adding for the new full-card
                // display is a later pass (see printCatalogItemFullDisplay below).
                repeatingCatalogItemSection = function () {
                    let repeaterDefinition = WuxDef.Get("ItemPopupValues");
                    let repeatingVariable = repeaterDefinition.getVariable();

                    let actionDisplay = WuxSheetMain.HiddenField(getActionTypeAttribute("ItemIsVisible"), printCatalogItemFullDisplay());
                    // wuxItemPopupRepeater (not wuxFormeTechRepeater) - its own pre-built
                    // 240px card grid + full-width group-divider rule already exists
                    // (WCSS-Base.css), keyed to Popup_ItemSelectType's value - see
                    // printCatalogItemFullDisplay below.
                    let displayItemsContents = buildRepeater(repeatingVariable, actionDisplay, "wuxItemPopupRepeater wuxCatalogRepeater");

                    return `${displayItemsContents}
                    ${printCatalogLoadMoreButton("1")}
                    ${WuxSheetMain.Row("&nbsp;")}`;
                },
                printCatalogItemFullDisplay = function () {
                    let itemDisplayBuilder = new ItemRepeaterDisplayBuilder(WuxDef.Get("Action"));
                    // Group-divider rows are marked via Popup_ItemSelectType == "0" - the
                    // shared inventory-popup convention every InspectPopupAttributeHandler
                    // subclass's base setInventoryItemData already writes (isTitle ? "0" :
                    // "on") - and Popup_ItemSelectDisplay carries the divider's label text
                    // (also already written by that same base method). Matches the
                    // existing .wuxItemPopupRepeater CSS (WCSS-Base.css) built for this
                    // exact toggle, instead of inventing a new piggyback field.
                    let itemSelectTypeField = WuxDef.GetAttribute("Popup_ItemSelectType");
                    let headerContent = `<div class="wuxFeatureSectionHeader">
                        ${WuxSheetMain.Header2(`<span name="${WuxDef.GetAttribute("Popup_ItemSelectDisplay")}"></span>`)}
                    </div>`;
                    // Selected-state styling (WCSS-Specialized.css) reads this flag via a
                    // sibling selector, same as the technique catalog's own card
                    // (printCatalogTechniqueFullDisplay) - set by updateItemSelectedQuantity
                    // (Worker-InspectPopup.js) whenever the quantity field below goes
                    // above/back to 0.
                    let selectedFlag = `<input type="hidden" class="wuxCatalogCard-selected-flag" name="${WuxDef.GetAttribute("Popup_ItemSelectIsOn")}" value="0">`;
                    // Quantity stepper - a labeled, bordered number input flanked by
                    // -/+ buttons (piggybacked onto Popup_ItemSelectCount's "3" and "2"
                    // suffixes, both otherwise unused for this field - see
                    // adjustItemSelectedQuantity, Worker-InspectPopup.js). Deliberately
                    // NOT the field's own max slot - that's Roll20's native max-value
                    // slot for this same attribute, and piggybacking it while the base
                    // slot is a live, user-typed number input caused typed values to
                    // come back off by one (Roll20 appears to treat any attribute with
                    // an active max slot as bar-like). Plain numeric suffixes have no
                    // such native meaning. So it reads as an editable control instead
                    // of plain text. The cost badge reuses
                    // .wuxFeatureHeaderDisplayInfoCoin - the exact same styling as this
                    // item's own value badge above - right-aligned opposite the
                    // stepper. Its value (this item's cost at the current quantity) is
                    // computed and written by updateItemSelectedQuantity/
                    // adjustItemSelectedQuantity into Popup_ItemSelectDisplay's base
                    // slot - unused for a real item row otherwise (only title/divider
                    // rows write it, and a row is always either a divider or a real
                    // item, never both, so there's no collision reusing it here).
                    let quantitySection = `<div class="wuxCatalogSelectSection wuxQuantityRow">
                        <div class="wuxQuantityStepper">
                            <span class="wuxQuantityLabel">Qty</span>
                            <div class="wuxQuantityControls">
                                ${WuxSheetMain.Button(WuxDef.GetAttribute("Popup_ItemSelectCount", "3"), "&minus;", "wuxQuantityStepButton")}
                                <input type="number" min="0" step="1" class="wuxQuantityInput" name="${WuxDef.GetAttribute("Popup_ItemSelectCount")}" value="0">
                                ${WuxSheetMain.Button(WuxDef.GetAttribute("Popup_ItemSelectCount", "2"), "&plus;", "wuxQuantityStepButton")}
                            </div>
                        </div>
                        <div class="wuxFeatureHeaderDisplayInfoCoin wuxQuantityCost">
                            <span name="${WuxDef.GetAttribute("Popup_ItemSelectDisplay")}">0</span><span class="wuxFeatureHeaderDisplayInfoSubtitle"> J</span>
                        </div>
                    </div>`;
                    let cardContent = `${selectedFlag}
                    <div class="wuxFeature">
                        ${itemDisplayBuilder.printHeaderBlock()}
                        ${itemDisplayBuilder.printInfoBlock()}
                        ${quantitySection}
                        ${printCatalogItemTechniqueSection(undefined, true)}
                    </div>`;
                    // HiddenFieldToggle shows param2 when the field is non-"0" ("on" for a
                    // real item) and param3 when "0" (a divider row).
                    return WuxSheetMain.HiddenFieldToggle(itemSelectTypeField, cardContent, headerContent);
                },
                // Show/Hide Effects button - same button used for Learned Styles
                // (addStyleListRepeaterContents). For the Gear tab's owned-item
                // repeaters (showEager falsy/omitted - their existing behavior,
                // unchanged), the underlying data isn't populated up front: the
                // item's own population step only writes whether it HAS an
                // associated technique at all (piggybacked onto ItemName's max slot
                // under itemBaseDefName - see performAddSelectedInspectElementItem,
                // Worker-InspectPopup.js) - the technique's own fields stay empty
                // until this button is clicked, at which point
                // listenerPopulateItemAssociatedTechnique (WuxGS-Backend.js) fetches
                // and writes them for the first time. The item catalog instead
                // passes showEager=true - its own population step
                // (ItemInspectPopupAttributeHandler.setInventoryItemData,
                // Worker-InspectPopup.js) writes the technique fields directly for
                // every row up front, so there's no button/toggle here at all, just
                // the content, gated only on whether this item has a technique.
                // Variant buttons (inside techniqueDisplayBuilder.printHeaderBlock)
                // are wired to listenerSwapItemTechniqueVariant either way.
                // itemBaseDefName defaults to "Action" (the item catalog's own item
                // fields); the Gear tab's owned-item repeaters pass "Gear" instead,
                // matching their own item fields' baseDefinition - the technique
                // fields themselves always stay "Action"-prefixed regardless (the
                // universal technique-display convention every other context in
                // this codebase already uses).
                printCatalogItemTechniqueSection = function (itemBaseDefName, showEager) {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(WuxDef.Get("Action"));
                    let hasTechniqueField = WuxDef.Get(itemBaseDefName ?? "Action").getAttribute(`-${WuxDef.GetVariable("ItemName", WuxDef._max)}`);

                    // Divider between the item's own info and its associated technique -
                    // part of techniqueContent (not a separate always-visible element)
                    // so that in lazy/button mode (showEager falsy - every Gear tab
                    // repeater: stored equipment/gear/consumables/food, plus equipped
                    // items) it only appears once Show Effects is actually toggled on,
                    // inside that same hidden div, rather than sitting above the button
                    // regardless of whether the technique is shown. Eager mode (the item
                    // catalog) shows it immediately either way, since hasTechniqueField
                    // already gates techniqueContent as a whole there.
                    let divider = `<div class="wuxItemTechniqueDivider">This item grants the following technique</div>`;

                    let techniqueContent = `<div class="wuxFeatureInfoDisplayBlock">
                        ${divider}
                        ${techniqueDisplayBuilder.printHeaderBlock()}
                        ${techniqueDisplayBuilder.printInfoBlock()}
                    </div>`;

                    if (showEager) {
                        return WuxSheetMain.HiddenField(hasTechniqueField, techniqueContent);
                    }

                    let showEffectsAttr = techniqueDisplayBuilder.getActionTypeAttribute("TechShowEffects");
                    let toggleButton = WuxSheetMain.HiddenFieldToggle(showEffectsAttr,
                        WuxSheetMain.Button(showEffectsAttr, "&#9656; Hide Effects", "wuxShowEffectsButton"),
                        WuxSheetMain.Button(showEffectsAttr, "&#9662; Show Effects", "wuxShowEffectsButton"));

                    return WuxSheetMain.HiddenField(hasTechniqueField,
                        `<div class="wuxCatalogSelectSection">${toggleButton}</div>
                        ${WuxSheetMain.HiddenField(showEffectsAttr, techniqueContent)}`);
                },

                getActionTypeAttribute = function (attribute, suffix) {
                    let baseDefinition = WuxDef.Get("Action");
                    return baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
                },

                buildStylesList = function () {
                    let contents = "";
                    contents += WuxSheetMain.MultiRowGroup([
                            styleListSection("RepeatingStyles"), buildStyleFilter()],
                        WuxSheetMain.Table.FlexTableReverse, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Page_Styles");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetMain.CollapsibleTab(
                            sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                            sectionDef.getTitle(), contents, sectionDef))}`;
                },

                styleListSection = function (repeatingSectionName) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);
                    let styleIsVisibleAttr = WuxDef.GetAttribute("Action_StyleIsVisible");
                    // wuxFormeTechRepeater is the same 240px card grid the live Actions
                    // tab and technique catalog already use, since each row is now a
                    // full technique card instead of a plain name+buttons row.
                    let repeaterContent = buildRepeater(repeatingDef.getVariable(), addStyleListRepeaterContents(), "wuxFormeTechRepeater");
                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        ${WuxSheetMain.HiddenFieldToggle(styleIsVisibleAttr, `<div>${repeaterContent}${WuxSheetMain.Row("&nbsp;")}</div>`, WuxSheetMain.Row(WuxSheetMain.Desc("None")))}`;
                    return WuxSheetMain.Table.FlexTableGroup(contents);
                },

                // Full technique card for each learned style, mirroring the technique
                // catalog's card (printCatalogTechniqueFullDisplay) but: (1) built
                // directly rather than the catalog's HiddenFieldToggle header/action-type
                // gate, since every RepeatingStyles row is always a technique (no header
                // rows, no item-catalog fusion); (2) effects (everything below flavor
                // text - Core/OnEnter/Check/End/WillBreak/Enhancement effects) start
                // hidden behind a TechShowEffects toggle instead of always showing, since
                // a full page of already-learned styles would otherwise be very long;
                // (3) no Select button (there's nothing to select - it's already
                // learned) - Delete replaces the old Inspect button, moved below the
                // effects section. Variant buttons work the same as the catalog
                // (listenerSwapStyleListTechniqueVariant, WuxGS-Backend.js).
                // TechniqueDataAttributeHandler.setTechniqueInfo populates every field
                // read here (performAddItem, Worker-InspectPopup.js, for newly-learned
                // styles; WuxWorkerStyles.RefreshStyleListDisplay backfills existing
                // rows) - Roll20 auto-scopes them to "RepeatingStyles" from the
                // surrounding fieldset, same as the catalog's own fields do for
                // "TechPopupValues".
                addStyleListRepeaterContents = function () {
                    let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(WuxDef.Get("Action"));
                    let showEffectsAttr = techniqueDisplayBuilder.getActionTypeAttribute("TechShowEffects");
                    let deleteDef = WuxDef.Get("Forme_Delete");

                    let effectsContent = `${techniqueDisplayBuilder.printCoreEffects()}
                        ${techniqueDisplayBuilder.printOnEnter()}
                        ${techniqueDisplayBuilder.printCheckEffects()}
                        ${techniqueDisplayBuilder.printEndEffects()}
                        ${techniqueDisplayBuilder.printWillBreakEffects()}
                        ${techniqueDisplayBuilder.printEnhancementEffects()}`;

                    let toggleButton = WuxSheetMain.HiddenFieldToggle(showEffectsAttr,
                        WuxSheetMain.Button(showEffectsAttr, "&#9656; Hide Effects", "wuxShowEffectsButton"),
                        WuxSheetMain.Button(showEffectsAttr, "&#9662; Show Effects", "wuxShowEffectsButton"));

                    let deleteButton = WuxSheetMain.Button(deleteDef.getAttribute(),
                        `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle()}`, "wuxCatalogSelectButton");

                    return `<div class="wuxFeature">
                        ${techniqueDisplayBuilder.printHeaderBlock()}
                        <div class="wuxFeatureInfoDisplayBlock">
                            ${techniqueDisplayBuilder.printTrigger()}
                            ${techniqueDisplayBuilder.printTraits()}
                            ${techniqueDisplayBuilder.printFlavorText()}
                        </div>
                        <div class="wuxCatalogSelectSection">
                            ${toggleButton}
                        </div>
                        ${WuxSheetMain.HiddenField(showEffectsAttr, `<div class="wuxFeatureInfoDisplayBlock">${effectsContent}</div>`)}
                        <div class="wuxCatalogSelectSection">
                            ${deleteButton}
                        </div>
                    </div>`;
                },

                buildRepeater = function (repeaterName, repeaterData, extraClass) {
                    return `<div class="wuxNoRepControl wuxRepeatingFlexSection${extraClass != undefined ? ` ${extraClass}` : ""}">
                        <fieldset class="${repeaterName}">
                            ${repeaterData}
                        </fieldset>
                    </div>`;
                },

                buildStyleFilter = function () {
                    let titleDef = WuxDef.Get("Title_LearnNewStyles");
                    let contents = WuxSheetMain.SlotDisplay("Style Pts", WuxDef.GetAttribute("Technique", WuxDef._error), WuxDef.GetAttribute("Technique"), WuxDef.GetAttribute("Technique", WuxDef._max));
                    contents += WuxSheetMain.Header(titleDef.getTitle());
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
                            WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                nonElementDef.getAttribute(),
                                WuxSheetMain.Header(nonElementDef.getTitle())) +
                            WuxSheetMain.MoreInfo(nonElementDef)),
                        WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                levelRestrictedDef.getAttribute(),
                                WuxSheetMain.Header(levelRestrictedDef.getTitle())) +
                            WuxSheetMain.MoreInfo(levelRestrictedDef))
                    ];
                    return `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_StyleFilterOption"))}
                    ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 1)}`;
                },

                buildRecommendedStyleFilterButton = function () {
                    let recommendedFilterDef = WuxDef.Get("Forme_RecommendedStyles");
                    let customFilterDef = WuxDef.Get("Forme_CustomStyleFilter");
                    let items = [];
                    items.push(WuxSheetMain.Table.FlexTableGroup(
                        WuxSheetMain.Button(recommendedFilterDef.getAttribute(), recommendedFilterDef.getTitle(), "wuxWidth160 wuxFocusButton")
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
                                WuxSheetMain.Button(groupButtons[j].getAttribute(), groupButtons[j].getTitle(), "wuxWidth90"),
                                " wuxTechBaseFilterButtonGroup"));
                        }

                        let expandField = groupDef.getAttribute(WuxDef._expand);
                        let categoryHeader = WuxSheetMain.Header2(
                            WuxSheetMain.CollapsibleHeaderInverse(`<span>${groupDef.getTitle()}</span>`, expandField));
                        let categoryContent = WuxSheetMain.HiddenField(expandField,
                            WuxSheetMain.Table.FlexTable(items.join("")));

                        filterOptions.push(WuxSheetMain.Table.FlexTableGroup(categoryHeader + categoryContent));
                    }
                    return WuxSheetMain.MultiRowGroup(filterOptions, WuxSheetMain.Table.FlexTable, 1);
                }

            return {
                Print: print,
                RepeatingCatalogTechSection: repeatingCatalogTechSection,
                RepeatingCatalogItemSection: repeatingCatalogItemSection,
                PrintCatalogItemTechniqueSection: printCatalogItemTechniqueSection
            }
        }());

    return {
        Print: print,
        RepeatingCatalogTechSection: MainContentData.RepeatingCatalogTechSection,
        RepeatingCatalogItemSection: MainContentData.RepeatingCatalogItemSection,
        PrintCatalogItemTechniqueSection: MainContentData.PrintCatalogItemTechniqueSection
    };
}());

var DisplayPopups = DisplayPopups || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += printInspectionPopup();
            output += printFilterPopup();
            return printBasePopupSheet(output) + printManualPopupOverlay();
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

        // The Manual is its own independent overlay, not nested inside the shared
        // Popup_PopupActive wrapper printBasePopupSheet builds for the Inspect/Filter
        // popups - its own colocated wuxPopupOverlay/backdrop-click, gated by its own
        // Popup_ManualActive flag alone. Opening it (e.g. a technique's More Info
        // button while an Inspection Popup is open) never has to touch
        // Popup_PopupActive/Popup_InspectPopupActive, and closing it can't cascade
        // into closing whatever's underneath - it just layers on top and, once
        // closed, reveals whatever was already there untouched. WCSS-Footer.css gives
        // wuxManualPopupOverlay/wuxManualPopup a higher z-index than the shared
        // overlay so it renders above Inspect/Filter when both happen to be open.
        // Title is a static string (WuxDef.GetTitle, not a bound span) since unlike
        // Popup_PopupName - shared across several differently-titled popup types -
        // the Manual's own header text never changes.
        printManualPopupOverlay = function () {
            let manualActiveAttr = WuxDef.GetAttribute("Popup_ManualActive");
            let contents = `<div class="wuxPopupOverlay wuxManualPopupOverlay">
                <input type="checkbox" class="wuxInput wuxPopupOverlayClose" name="${manualActiveAttr}" value="0" />
                <div class="wuxPopup wuxManualPopup">
                    <div class="wuxPopupHeader">
                        <span class="wuxPopupInnerHeader">${WuxDef.GetTitle("Popup_ManualName")}</span>
                        ${ManualPopup.PrintHeader()}
                        ${WuxSheetMain.Button(manualActiveAttr, "Back", "wuxPopupClose")}
                    </div>
                    ${ManualPopup.Print()}
                </div>
            </div>`;
            return WuxSheetMain.HiddenField(manualActiveAttr, contents);
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
                // The old select-then-preview item/technique display (buildItemTemplate,
                // buildTechniqueTemplate, buildItemRepeater's select list) has been
                // removed - superseded by the new fused item+technique catalog. Only the
                // technique catalog is wired in so far (item catalog is a later pass) -
                // see DisplayActionSheet.RepeatingCatalogTechSection, which lives in a
                // different top-level module (DisplayActionSheet's MainContentData) and
                // is re-exposed through that module's own public interface to be
                // reachable here.
                print = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectType"), "") + "\n";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Popup_InspectSelectId"), "") + "\n";
                    // .wuxInspectionPopupContentData isn't just a layout wrapper - WCSS-Footer.css
                    // has popup-specific overrides (header color/border, width) keyed off this
                    // class, so catalog content needs it too, same as the old display did.
                    // Only the catalog matching the popup currently open renders - gated on
                    // the boolean piggybacks setPopupType (Worker-InspectPopup.js) writes onto
                    // Popup_InspectSelectType's own max/"2" slots, via the same
                    // WuxSheetMain.HiddenField toggle already used throughout this popup
                    // (Jin/Cost, Style Points, the Add buttons below).
                    contents += `<div class="wuxInspectionPopupContentData">
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectSelectType", WuxDef._max), DisplayActionSheet.RepeatingCatalogTechSection())}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectSelectType", "2"), DisplayActionSheet.RepeatingCatalogItemSection())}
                    </div>`;
                    return `<div class="wuxInspectionPopupContents">${contents}</div>`;
                },
                printHeader = function () {
                    return printAddButton();
                },

                printAddButton = function () {
                    let addType2Attr = WuxDef.GetAttribute("Popup_InspectAddType", "2");
                    let disabledPurchaseButton = `<div class="wuxButton wuxButtonDisabled"><span name="${addType2Attr}"></span></div>`;

                    let costDef = WuxDef.Get("Title_InspectionItemCost");
                    let jinAndCost = WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${WuxDef.GetTitle("Title_YourJin")}</span><span class="wuxSlotData"><span name="${WuxDef.GetAttribute("Jin")}"></span><span> J</span></span></div>` +
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${costDef.getTitle()}</span><span class="wuxSlotData"><span name="${costDef.getAttribute()}"></span></span></div>`);

                    // Style Points - same wealth-display section as Jin/Cost above, but
                    // for the style adding system (performStyleFilterInspection,
                    // Worker-InspectPopup.js, always opens with the base add-type slot).
                    // Reuses the "Technique" WuxDef the sidebar's own points widget
                    // already tracks (WuxWorkerBuild.updatePoints, WJS-Service.js), via
                    // the same SlotDisplay widget used for Advancement/Perk points and
                    // gear slots (WuxGS-Advancement.js, WuxGS-Base.js) - its
                    // wuxSlotStateFlag reads _error's existing -1/0/1 over/exact/under
                    // value and colors wuxSlotData's background accordingly
                    // (WCSS-Specialized.css), matching that same pattern exactly.
                    let stylePointsDef = WuxDef.Get("Technique");
                    let stylePoints = WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                        WuxSheetMain.SlotDisplay("Style Points", stylePointsDef.getAttribute(WuxDef._error),
                            stylePointsDef.getAttribute(), stylePointsDef.getAttribute(WuxDef._max)));

                    // Only the style/technique catalog spends style points - the item
                    // catalog also opens with Popup_InspectShowAdd "on" (its own
                    // Add Equipment/Add Consumable addType), so gating on that flag alone
                    // isn't enough. Gated on Popup_InspectSelectType's own suffix "4"
                    // instead (set by setPopupType, Worker-InspectPopup.js) - the max
                    // slot now also covers the Perk Technique catalog (both render
                    // TechPopupValues cards), so Style Points needs its own dedicated
                    // flag to stay limited to the actual style catalog.
                    let stylePointsSection = WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectSelectType", "4"), stylePoints);

                    // Perk Points - same pattern as Style Points above, but for the
                    // Perk Technique catalog (performAllPerkTechniqueInspection,
                    // Worker-InspectPopup.js), which spends Perk Points instead of
                    // Style Points. That popup renders the same TechPopupValues cards
                    // as the style catalog (suffix "_max" on Popup_InspectSelectType
                    // covers both), so it needs its own dedicated flag - suffix "3",
                    // set "on" only for "Popup_PerkInspectionName" - to show Perk
                    // Points without also showing it for the style catalog.
                    let perkPointsDef = WuxDef.Get("Perk");
                    let perkPoints = WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                        WuxSheetMain.SlotDisplay("Perk Pts", perkPointsDef.getAttribute(WuxDef._error),
                            perkPointsDef.getAttribute(), perkPointsDef.getAttribute(WuxDef._max)));
                    let perkPointsSection = WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectSelectType", "3"), perkPoints);

                    // wuxPopupWealthSection (not an inline flex style) - .wuxHiddenField's
                    // shared CSS sets "display: inherit" when shown, so nested inside a
                    // plain flex-column div it becomes a flex container itself (default
                    // row direction), sitting Jin/Cost side by side instead of stacked.
                    // The dedicated class forces .wuxHiddenField back to block here
                    // (WCSS-Footer.css) without touching that generic rule everywhere
                    // else it's used.
                    let wealthSection = `<div class="wuxPopupWealthSection">${jinAndCost}${stylePointsSection}${perkPointsSection}</div>`;

                    // Base add-type slot's button is only clickable once at least one
                    // item is selected (Popup_InspectSelectedList, toggled per row by
                    // TechniqueInspectPopupAttributeHandler.toggleSelectedItem) - nothing
                    // is selected by default anymore, so the button starts disabled.
                    let disabledAddButton = `<div class="wuxButton wuxButtonDisabled"><span name="${WuxDef.GetAttribute("Popup_InspectAddType")}"></span></div>`;
                    let buttons = `<div style="display:flex;flex-direction:column;gap:4px;">` +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                            WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Popup_InspectPurchaseAffordable"),
                                WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick", "2"),
                                    `<span name="${addType2Attr}"></span>`, "wuxPopupActionButton"),
                                disabledPurchaseButton)) +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                            WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Popup_InspectSelectedList"),
                                WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"),
                                    `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`, "wuxPopupActionButton"),
                                disabledAddButton)) +
                        `</div>`;
                    return wealthSection + buttons;
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
                    let filterPopupDisplayTypeAttr = WuxDef.GetAttribute("Popup_FilterPopupDisplayType");
                    let contents = `${printClearFilterButton()}
                    ${WuxSheet.PageDisplayInput(filterPopupDisplayTypeAttr)}
                    ${WuxSheet.PageDisplay("FilterTechnique", buildTechniqueFilters())}
                    ${WuxSheet.PageDisplay("FilterItem", buildItemFilters())}
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

                buildItemFilters = function () {
                    let filterDefinitions = new EquipmentFilterDefinitions("Popup_FindItemsByFilter");
                    let filterDisplay = new FilterDisplayBuilder(filterDefinitions);
                    return `${filterDisplay.print()}`;
                },

                printApplyFilterButton = function () {
                    let applyFilterDef = WuxDef.Get("Popup_ApplyFilter");
                    return WuxSheetMain.Button(applyFilterDef.getAttribute(), `<span">${applyFilterDef.getTitle()}</span>`, "wuxPopupActionButton");
                },

                printClearFilterButton = function () {
                    let clearFilterDef = WuxDef.Get("Popup_ClearFilter");
                    return WuxSheetMain.Button(clearFilterDef.getAttribute(), `<span">${clearFilterDef.getTitle()}</span>`, "wuxPopupActionButton");
                }

            return {
                Print: print,
                PrintHeader: printHeader
            }
        }()),

        ManualPopup = ManualPopup || (function () {
            'use strict';

            var
                cachedCategories,

                // Reserved Popup_ManualCategory value for the "More Info" pseudo-page
                // (moreInfoContent below) - never a real GuideCat definition name, so
                // it deliberately never appears in getCategories()'s array and can't be
                // reached via the header nav/dropdown. Worker-Manual.js's
                // OpenManualWithDefinitions sets Popup_ManualCategory to this exact
                // string, so it has to match here verbatim - the two files have no
                // shared constant to enforce that (generator vs. worker are separate
                // execution contexts), only this comment pair.
                moreInfoCategoryValue = "MoreInfo",

                getCategories = function () {
                    if (cachedCategories == undefined) {
                        let guideCategories = WuxDef.Filter(new DatabaseFilterData("group", "GuideCat"));
                        cachedCategories = guideCategories.map(function (guideCat) {
                            return {
                                value: guideCat.name,
                                title: guideCat.title,
                                topics: getTopics(guideCat)
                            };
                        });
                    }
                    return cachedCategories;
                },

                getTopics = function (guideCat) {
                    let explicitList = guideCat.getDescription("");
                    let topicDefinitions;
                    if (explicitList !== "") {
                        // Order is deliberate here (e.g. Character Creation's Origin
                        // -> Jobs -> Attributes -> ... flow) - left exactly as listed,
                        // never sorted.
                        topicDefinitions = explicitList.split(";")
                            .map(name => name.trim())
                            .filter(name => name !== "")
                            .map(name => WuxDef.Get(name));
                    } else if (guideCat.subGroup !== "") {
                        // A subGroup pull covers several categories (Basics, Encounters,
                        // Status Effects, ...), each with its own dictionary order that's
                        // meaningful for everything except Status - only Status Effects'
                        // whole "Status" group has no curated order to preserve, so
                        // alphabetizing by title is scoped to that one subGroup
                        // specifically, not applied to every subGroup pull. Feeds both
                        // consumers of category.topics (getCategories): categoryContent
                        // (main page) and sidebarCategory (TOC).
                        topicDefinitions = WuxDef.Filter(new DatabaseFilterData("group", guideCat.subGroup));
                        if (guideCat.subGroup === "Status") {
                            topicDefinitions = topicDefinitions.sort((a, b) => a.title.localeCompare(b.title));
                        }
                    } else {
                        topicDefinitions = [];
                    }
                    return topicDefinitions.map(function (definition) {
                        return {
                            slug: definition.fieldName,
                            title: definition.title,
                            subGroup: definition.subGroup,
                            descriptions: getDescriptions(definition)
                        };
                    });
                },

                // Status effects specifically go through StatusData.getDescriptions()
                // (WAPI-Database.js) rather than the plain definition's own
                // descriptions - StatusDefinitionData (what WuxDef.Get/Filter
                // actually returns) carries the same raw descriptions array and the
                // endsOnRoundStart/endsOnTrigger flags, but never runs them through
                // getDescriptions() itself, so the auto-generated "This Status ends
                // when it is triggered." rider sentence never made it into the
                // definition - only StatusData (re-wrapping the same fields) knows
                // how to add it. Every other group just uses its own descriptions
                // array directly, same as before.
                getDescriptions = function (definition) {
                    let descriptions = definition.group === "Status"
                        ? new StatusData(definition).getDescriptions()
                        : definition.descriptions;
                    return descriptions.filter(d => d !== "");
                },

                anchorId = function (category, topic) {
                    return `manual-anchor-${category.value}-${topic.slug}`;
                },

                print = function () {
                    let categories = getCategories();
                    let categoryAttr = WuxDef.GetAttribute("Popup_ManualCategory");
                    let sidebarToggleAttr = WuxDef.GetAttribute("Popup_ManualSidebar");
                    let sidebar = `<div class="wuxManualSidebar">${categories.map(category => sidebarCategory(category)).join("")}</div>`;
                    let content = `<div class="wuxManualContent">${categories.map(category => categoryContent(category)).join("")}${moreInfoContent()}</div>`;

                    // Colocated flag for the sidebar column itself (not just its
                    // per-category contents, which sidebarCategory already gates) -
                    // lets .wuxManualContent claim the full width while the More Info
                    // page is active instead of leaving the empty sidebar column's
                    // space reserved.
                    return `${WuxSheetMain.CustomInput("hidden", sidebarToggleAttr, "wuxManualSidebarToggle-flag", ` value="0"`)}
                    <div class="wuxManualBody">
                        ${WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag", ` value="0"`)}${sidebar}
                        ${content}
                    </div>`;
                },

                printHeader = function () {
                    let categories = getCategories();
                    let categoryAttr = WuxDef.GetAttribute("Popup_ManualCategory");
                    let sidebarToggleAttr = WuxDef.GetAttribute("Popup_ManualSidebar");
                    let buttonRow = categories.map(category => categoryButton(categoryAttr, category)).join("") + moreInfoCategoryButton(categoryAttr);
                    let options = categories.map(category => `<option value="${category.value}">${category.title}</option>`).join("") + moreInfoCategoryOption();

                    // The one true default for a brand-new character with this
                    // attribute never set - has to be the FIRST element anywhere in
                    // the popup carrying this name, same role .wuxPageDisplay-Flag
                    // plays as the very first element in .wuxCharacterSheet for
                    // attr_pag. Every other copy of this flag (categoryButton's
                    // radios, the dropdown, each colocated content/sidebar flag)
                    // just needs to stay in sync with whatever the real value ends
                    // up being, not carry a default of its own.
                    let defaultFlag = WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag",
                        ` value="${categories.length > 0 ? categories[0].value : ""}"`);

                    return `${defaultFlag}
                    <div class="wuxManualSidebarToggle">
                        <input type="checkbox" name="${sidebarToggleAttr}"><span>&#9776;</span>
                    </div>
                    <div class="wuxManualNav">
                        <div class="wuxManualNavButtonRow">${buttonRow}</div>
                        <select class="wuxInput wuxManualNavDropdown" name="${categoryAttr}">${options}</select>
                    </div>`;
                },

                // No "wuxInput" class on this radio (unlike a plain form field) -
                // .wuxInput sets its own width/height/padding/margin that this
                // rule's absolute-positioning override (below) never touches, since
                // it only overrides the properties it actually cares about. With
                // both applied together, .wuxInput's leftover box-model values
                // distorted this button's rendered size - same reason
                // WuxSheetMain.Button's own checkboxes never carry that class either.
                // Not part of getCategories()'s array (moreInfoCategoryValue is a
                // reserved value, never a real GuideCat), so it's appended
                // separately in printHeader rather than folding into that map -
                // never selectable as a starting point (WuxWorkerManual never lets
                // a user manually navigate to it, only OpenManualWithDefinitions
                // sets it), so unlike the real category buttons this one is
                // hidden by default and only shown while it's already the active
                // category (WCSS-Footer.css) - a "you are here" indicator, not a
                // nav target. Own colocated flag, same convention as every other
                // per-target flag in this popup.
                moreInfoCategoryButton = function (categoryAttr) {
                    return `${WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag", ` value="0"`)}<div class="wuxButton wuxManualCategoryButton wuxManualMoreInfoCategoryButton">
                        ${WuxSheetMain.CustomInput("radio", categoryAttr, "", ` value="${moreInfoCategoryValue}"`)}<span>More Info</span>
                    </div>`;
                },

                // Narrow-screen dropdown equivalent of moreInfoCategoryButton above -
                // same hidden-unless-active treatment, but <option> can only be a
                // child of <select>, so it can't carry its own colocated flag input
                // the way every other target in this popup does. Reaches off
                // printHeader's own defaultFlag instead (general-sibling + descendant
                // into .wuxManualNav select, WCSS-Footer.css) - same established
                // pattern the narrow-screen sidebar overlay toggle already uses here,
                // and defaultFlag is kept in sync with the real value like every
                // other instance of this attribute, so it's a valid read of the
                // current category despite not being adjacent.
                moreInfoCategoryOption = function () {
                    return `<option class="wuxManualMoreInfoCategoryOption" value="${moreInfoCategoryValue}">More Info</option>`;
                },

                categoryButton = function (categoryAttr, category) {
                    return `<div class="wuxButton wuxManualCategoryButton">
                        ${WuxSheetMain.CustomInput("radio", categoryAttr, "", ` value="${category.value}"`)}<span>${category.title}</span>
                    </div>`;
                },

                // Each target gets its OWN flag instance immediately in front of it -
                // not one shared flag reaching in via general-sibling + descendant
                // combinators - matching .wuxPageDisplay-Flag's proven convention
                // (WCSS-Specialized.css/WCS-Sheet.html: 53 separate colocated
                // instances, never one flag reaching across a wrapper into deeply
                // nested descendants). All copies share the same attribute name, so
                // Roll20 keeps them in sync regardless of which one is physically
                // closest to what changed it.
                sidebarCategory = function (category) {
                    let categoryAttr = WuxDef.GetAttribute("Popup_ManualCategory");
                    let links = category.topics.map(topic => `<a class="wuxManualSidebarLink" href="#${anchorId(category, topic)}">${topic.title}</a>`).join("");
                    return `${WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag", ` value="0"`)}<div class="wuxManualSidebarCategory-${category.value}">${links}</div>`;
                },

                categoryContent = function (category) {
                    let categoryAttr = WuxDef.GetAttribute("Popup_ManualCategory");
                    let entries = category.topics.map(topic => entry(category, topic)).join("");
                    return `${WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag", ` value="0"`)}<div class="wuxManualCategory-${category.value}">${entries}</div>`;
                },

                entry = function (category, topic) {
                    let subheader = topic.subGroup !== "" ? WuxSheetMain.Subheader(topic.subGroup) : "";
                    let descriptions = topic.descriptions.map(description => `<div class="wuxDescription">${description}</div>`).join("");
                    return `<div class="wuxHeader2" id="${anchorId(category, topic)}">${topic.title}</div>${subheader}${descriptions}`;
                },

                // The "More Info" page (moreInfoCategoryValue above) - a reserved
                // pseudo-category outside the GuideCat-driven set, gated by the exact
                // same colocated-flag mechanism as categoryContent's real categories,
                // but with no matching sidebarCategory()/wuxManualSidebarCategory-*
                // entry anywhere, so .wuxManualSidebar renders nothing while it's
                // active (per-value flag mismatch = nothing shown, same reason a
                // brand-new GuideCat value with no sidebar div would also show blank -
                // no extra CSS needed to enforce "never add a sidebar for this").
                // Unlike every other category, its content isn't known until runtime -
                // Worker-Manual.js's OpenManualWithDefinitions writes it into the
                // GuideMoreInfoValues repeating section right before switching
                // Popup_ManualCategory to this value - so this just prints that
                // repeater's single row template (moreInfoEntry), which Roll20 repeats
                // for however many rows the worker created. Inlined instead of reusing
                // one of this file's other buildRepeater helpers - those are private
                // vars scoped to different IIFEs (InspectionPopup's, etc.) and aren't
                // reachable from here.
                moreInfoContent = function () {
                    let categoryAttr = WuxDef.GetAttribute("Popup_ManualCategory");
                    let repeatingVariable = WuxDef.Get("GuideMoreInfoValues").getVariable();
                    let repeaterHtml = `<div class="wuxNoRepControl wuxRepeatingFlexSection wuxManualMoreInfoRepeater">
                        <fieldset class="${repeatingVariable}">
                            ${moreInfoEntry()}
                        </fieldset>
                    </div>`;
                    return `${WuxSheetMain.CustomInput("hidden", categoryAttr, "wuxManualCategory-Flag", ` value="0"`)}<div class="wuxManualCategory-${moreInfoCategoryValue}">${repeaterHtml}</div>`;
                },

                // Row template for GuideMoreInfoValues - Roll20 rescopes these bare
                // field references to whichever row is currently rendering (same
                // <fieldset class="repeating_x"> rescoping every other catalog
                // repeater in this file relies on). GuideInfoDesc holds every
                // description the worker joined with "\n\n" (getDescriptions/StatusData
                // rider sentences included, same source entry() uses for the normal
                // topic view) rendered as one bound span rather than entry()'s separate
                // wuxDescription divs per description - span.wuxDescription already has
                // white-space:pre-line (WCSS-Base.css), so the "\n\n" breaks still read
                // as separate paragraphs without needing a fixed number of bound slots
                // for a per-definition description count that's only known at runtime.
                moreInfoEntry = function () {
                    let titleAttr = WuxDef.GetAttribute("Popup_GuideInfoTitle");
                    let subGroupAttr = WuxDef.GetAttribute("Popup_GuideInfoSubGroup");
                    let descAttr = WuxDef.GetAttribute("Popup_GuideInfoDesc");
                    return `<div class="wuxHeader2"><span name="${titleAttr}"></span></div>
                    <div class="wuxSubheader"><span name="${subGroupAttr}"></span></div>
                    <span class="wuxDescription" name="${descAttr}"></span>`;
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