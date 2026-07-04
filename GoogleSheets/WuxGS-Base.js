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
                            contents += WuxSheetMain.MultiRowGroup([basics(), WuxCharacterSheetBuilders.BuildInfluences()], WuxSheetMain.Table.FlexTable, 2);
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
            let output = WuxSheetNavigation.BuildGearPageNavigation("Gear") +
                SideBarData.PrintEquipment() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Gear", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printEquipment = function () {
                    let coreContents = `${WuxSheetSidebar.BuildChatSection()}
                        ${WuxSheetSidebar.BuildChecksSection()}
                        ${WuxSheetSidebar.BuildBoonSection()}
                        ${WuxSheetSidebar.BuildGearDebugSection()}`;
                    let builderContents = WuxSheetSidebar.BuildGearDebugSection();
                    let contents = `${WuxSheet.PageSetPageDisplayInput()}
                        ${WuxSheet.PageDisplay("Core", coreContents)}
                        ${WuxSheet.PageDisplay("Builder", builderContents)}`;
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
                    contents += buildEquipment();
                    contents += buildConsumables();
                    contents += buildGearItems();
                    return WuxSheetMain.Build(contents);
                },

                buildConsumables = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([slottedConsumables(), ownedConsumables()], WuxSheetMain.Table.FlexTableReverse, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearConsumables");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                ownedConsumables = function () {
                    let repeatingDef = WuxDef.Get("RepeatingConsumables");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_EqipmentIsVisible");
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
                    let items = [];
                    for (let i = 0; i < consuTypes.length; i++) {
                        items.push(WuxSheetMain.Table.FlexTableGroup(
                            WuxSheetMain.Button(consuTypes[i].getAttribute(), searchButtonDef.getTitle(consuTypes[i].getTitle()), "wuxWidth120"),
                            "wuxMaxWidth220"));
                    }
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddConsumable"))}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsConsumables = function () {
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(equipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${equipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                slottedConsumables = function () {
                    let syncedDef = WuxDef.Get("Title_EquippedInstantConsumables");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");

                    let consuTypes = WuxDef.Filter([new DatabaseFilterData("group", "ConsuType")]);
                    let rows = "";
                    for (let i = 0; i < consuTypes.length; i++) {
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                        for (let j = 0; j < itemKeys.length; j++) {
                            let item = itemKeys[j];
                            if (item == undefined) { continue; }
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
                                    <div class="wuxEquipableName">
                                        <span class="wuxDescription" name="${countAttribute}" value="0">${item.name}</span>
                                        <span class="wuxDescription">${item.name}</span>
                                    </div>
                                    <div class="wuxEquipableButtonRow">
                                        <button class="wuxRepeatingTechActionButton" type="roll" value="${displayData.getSheetRollTemplate(true)}"><span style="color:#4caf50;">&#9654;</span><span> Use</span></button>
                                        ${WuxSheetMain.Button(unequipDef.getAttribute(countMod), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                        ${WuxSheetMain.Button(inspectDef.getAttribute(countMod), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    </div>
                                </div>
                            </div>`);
                            rows += WuxSheetMain.HiddenField(countAttribute, rowContents);
                        }
                    }

                    let slotDisplay = WuxSheetMain.SlotDisplay("Slots", "attr_gear-consumableslotstate", WuxDef.GetAttribute("Gear_ConsumableSlot"), WuxDef.GetAttribute("ConsumableSlots"));

                    let unequipAllDef = WuxDef.Get("Gear_UnequipAll");
                    let contents = `${slotDisplay}
                        ${WuxSheetMain.Header(`${syncedDef.getTitle()}`)}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Gear_ConsumableSlot"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute("consumable"), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        <div>
                            ${rows}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
                },

                buildGearItems = function () {
                    let contents = WuxSheetMain.MultiRowGroup([storedGear(), storedFoods()], WuxSheetMain.Table.FlexTable, 2);
                    contents = WuxSheetMain.TabBlock(contents);
                    let definition = WuxDef.Get("Page_GearItems");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                storedGear = function () {
                    let repeatingDef = WuxDef.Get("RepeatingGear");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater("repeating_gear",
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${repeaterContent}
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
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddGear"))}
                        ${WuxSheetMain.MultiRowGroup(gearItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                storedFoods = function () {
                    let repeatingDef = WuxDef.Get("RepeatingFoods");
                    let buyDef = WuxDef.Get("Gear_Buy");
                    let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(buyDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(buyBulkDef.getAttribute(), `<span style="color:#5bc0de;">&#9670;</span> <span name="${buyBulkDef.getAttribute(WuxDef._info)}"></span>`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    let repeaterContent = buildRepeater(repeatingDef.getVariable(),
                        `<input type="hidden" name="${getGearAttribute("ItemMainGroup")}" value="0">` +
                        WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents));

                    let contents = `${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        <div>
                            ${repeaterContent}
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
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddConsumable"))}
                        ${WuxSheetMain.MultiRowGroup(foodItems, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                buildEquipment = function () {
                    let contents = "";

                    contents += WuxSheetMain.MultiRowGroup([equippedEquipment(), ownedEquipment()], WuxSheetMain.Table.FlexTableReverse, 2);

                    contents = WuxSheetMain.TabBlock(contents);

                    let definition = WuxDef.Get("Page_GearEquipment");
                    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                },

                ownedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingEquipment");
                    let eqipmentIsVisibleAttr = WuxDef.GetAttribute("Gear_EqipmentIsVisible");
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
                    return `${WuxSheetMain.Header(WuxDef.GetTitle("Title_AddEquipment"))}
                        ${WuxSheetMain.MultiRowGroup(items, WuxSheetMain.Table.FlexTable, 3)}`;
                },

                addRepeaterContentsEquipment = function () {
                    let equipDef = WuxDef.Get("Gear_Equip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");
                    let deleteDef = WuxDef.Get("Gear_Delete");
                    let subGroupAttr = getGearAttribute("ItemSubGroup");
                    let equipButtonContent = '<span style="color:#c8a020;">&#9881;</span> ' + equipDef.getTitle('<span name="' + subGroupAttr + '"></span>');

                    let rowContents = WuxSheetMain.MultiRow(`
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableCountCol">
                                <input type="number" name="${getGearAttribute("ItemCount")}" value="1" min="0">
                            </div>
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName">
                                    <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                    <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                                </div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(equipDef.getAttribute(), equipButtonContent, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
                        </div>`);

                    return WuxSheetMain.HiddenField(getGearAttribute("ItemIsVisible"), rowContents);
                },

                equippedEquipment = function () {
                    let repeatingDef = WuxDef.Get("RepeatingSyncedEquipment");
                    let unequipDef = WuxDef.Get("Gear_Unequip");
                    let inspectDef = WuxDef.Get("Gear_Inspect");

                    let rowContents = WuxSheetMain.MultiRow(`
                    <div class="wuxEquipableRow">
                        <div class="wuxEquipableBody">
                            <div class="wuxEquipableName">
                                <span class="wuxDescription" name="${getGearAttribute("ItemName")}"></span>
                                <span class="wuxSubHeader" name="${getGearAttribute("ItemGroup")}"></span>
                            </div>
                            <div class="wuxEquipableButtonRow">
                                ${WuxSheetMain.Button(unequipDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
                                ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle("")}`, "wuxRepeatingTechActionButton")}
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
                        ${slotDisplay}
                        ${traitsDisplay}
                        ${WuxSheetMain.Header(`${repeatingDef.getTitle()}`)}
                        ${WuxSheetMain.HiddenField(WuxDef.GetAttribute("Equipment"), `<div style="float:right;">${WuxSheetMain.Button(unequipAllDef.getAttribute(), `<span style="color:#c8a020;">&#9881;</span> ${unequipAllDef.getTitle()}`, "wuxRepeatingTechActionButton")}</div>`)}
                        <div>
                            ${repeaterContent}
                        </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
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
                        ${WuxSheetSidebar.BuildTechDebugSection()}`))}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique"))))}`;
                },

                buildTechPointsSection = function (fieldName, header) {
                    return `${WuxSheetSidebar.BuildPointsSection(fieldName, header)}
                    ${WuxSheetSidebar.BuildTechDebugSection()}`;
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
                                sectionDef.getTitle(), contents)))}`;
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
                        `${sectionDef.getTitle()}`, contents);
                },
                
                buildBaseFilterButtons = function () {
                    let titleDef = WuxDef.Get("TechBaseFilter");
                    let baseFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechBaseFilter")]);
                    let items = [];
                    for (let i = 0; i < baseFilters.length; i++) {
                        items.push(WuxSheetMain.Button(baseFilters[i].getAttribute(), baseFilters[i].getTitle(), "wuxWidth120"));
                    }
                    return WuxSheetMain.Header(titleDef.getTitle()) + WuxSheetMain.MultiRow(items.join(""));
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
                    if (technique == undefined) { return ""; }
                    let displayData = new TechniqueDisplayData(technique);
                    displayData.displayname = `@{${WuxDef.GetVariable("DisplayName")}}`;
                    displayData.technique.displayname = displayData.displayname;
                    displayData.sheetname = `@{${WuxDef.GetVariable("SheetName")}}`;
                    let techDisplayDataBuilder = new TechniqueDisplayBuilderUsable(displayData);
                    techDisplayDataBuilder.setFeatureBonusClasses("wuxActionFeature");
                    return techDisplayDataBuilder.print();
                },

                buildItemTechniqueDisplay = function (item) {
                    if (item == undefined || !item.hasTechnique) { return ""; }
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
                        let itemKeys = WuxItems.Filter(new DatabaseFilterData("group", consuTypes[i].getTitle()));
                        for (let j = 0; j < itemKeys.length; j++) {
                            output += buildItemTechniqueDisplay(itemKeys[j]);
                        }
                    }
                    if (output == "") { return ""; }
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
                        styleListSection("RepeatingStyles"), buildStyleFilter()],
                        WuxSheetMain.Table.FlexTableReverse, 2);
                    contents = WuxSheetMain.TabBlock(contents);

                    let sectionDef = WuxDef.Get("Page_Styles");
                    return `${WuxSheet.MainPageDisplayInput()}
                    ${WuxSheet.PageDisplay("StylesData",
                        WuxSheetMain.CollapsibleTab(
                            sectionDef.getAttribute(WuxDef._tab, WuxDef._expand),
                            sectionDef.getTitle(), contents))}`;
                },

                styleListSection = function (repeatingSectionName) {
                    let repeatingDef = WuxDef.Get(repeatingSectionName);
                    let contents = `${WuxSheetMain.Header(repeatingDef.getTitle())}
                        <div>
                        ${buildRepeater(repeatingDef.getVariable(), addStyleListRepeaterContents())}
                        ${WuxSheetMain.Row("&nbsp;")}
                    </div>`;
                    return WuxSheetMain.Table.FlexTableGroup(contents);
                },

                addStyleListRepeaterContents = function () {
                    let nameDef = WuxDef.Get("Forme_Name");
                    let inspectDef = WuxDef.Get("Forme_Inspect");
                    let deleteDef = WuxDef.Get("Forme_Delete");
                    let tierOutput = "";

                    return `<div class="wuxMultiRow" style="min-width: 300px;">
                        ${tierOutput}
                        <div class="wuxEquipableRow">
                            <div class="wuxEquipableBody">
                                <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>
                                <div class="wuxEquipableButtonRow">
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `<span style="color:#cc3333;">&#10008;</span> ${deleteDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>
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
                        let techHeaderAttr = popupDef.getAttribute(`-${WuxDef.GetVariable("TechHeader")}${i}`);
                        let techniqueDisplayBuilder = new TechniqueRepeaterDisplayBuilder(popupDef, i);
                        output += `<div>${WuxSheetMain.HiddenField(fieldName,
                            WuxSheetMain.HiddenField(techHeaderAttr, WuxSheetMain.Header2(WuxSheetMain.Span(techHeaderAttr))) +
                            techniqueDisplayBuilder.print())}</div>`;
                    }

                    let fieldName = popupDef.getAttribute(`-${WuxDef.GetVariable("TechIsVisible")}0`);
                    return WuxSheetMain.HiddenField(fieldName,
                        `${WuxSheetMain.Header("Technique")}
                        ${output}`);
                },

                printAddButton = function () {
                    let addType2Attr = WuxDef.GetAttribute("Popup_InspectAddType", "2");
                    let disabledPurchaseButton = `<div class="wuxButton wuxButtonDisabled"><span name="${addType2Attr}"></span></div>`;

                    let costDef = WuxDef.Get("Title_InspectionItemCost");
                    let jinAndCost = `<div style="display:flex;flex-direction:column;">` +
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${WuxDef.GetTitle("Title_YourJin")}</span><span class="wuxSlotData"><span name="${WuxDef.GetAttribute("Jin")}"></span><span> J</span></span></div>` +
                        `<div class="wuxSlotSection"><span class="wuxSlotLabel">${costDef.getTitle()}</span><span class="wuxSlotData"><span name="${costDef.getAttribute()}"></span></span></div>` +
                        `</div>`;
                    let buttons = `<div style="display:flex;flex-direction:column;gap:4px;">` +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                            WuxSheetMain.HiddenFieldToggle(WuxDef.GetAttribute("Popup_InspectPurchaseAffordable"),
                                WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick", "2"),
                                    `<span name="${addType2Attr}"></span>`),
                                disabledPurchaseButton)) +
                        WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd"),
                            WuxSheetMain.Button(WuxDef.GetAttribute("Popup_InspectAddClick"),
                                `<span name="${WuxDef.GetAttribute("Popup_InspectAddType")}">Add</span>`)) +
                        `</div>`;
                    return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_InspectShowAdd", "2"),
                        jinAndCost) + buttons;
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