// noinspection JSUnusedGlobalSymbols,HtmlUnknownAttribute,ES6ConvertVarToLetConst,JSUnresolvedReference,SpellCheckingInspection

var BuildCharacterSheet = BuildCharacterSheet || (function () {
    'use strict';

    var
        printTech = function (sheetsDb) {
            let output = "";
            output += buildCharacterSheetTechHtml(sheetsDb);
            return output;
        },

        printBase = function (sheetsDb) {
            let output = "";
            output += buildCharacterSheetBaseHtml(sheetsDb);
            output += buildHiddenFields();
            output += buildSheetWorkerContainer(sheetsDb);
            return output;
        },

        buildCharacterSheetTechHtml = function (sheetsDb) {
            let output = "";
            // output += DisplayTechniquesSheet.Print(sheetsDb);
            return `<div class="wuxCharacterSheet">\n${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("Page"), "Origin")}\n${output}\n`;
        },

        buildCharacterSheetBaseHtml = function (sheetsDb) {
            let output = "";
            output += DisplayOriginSheet.Print(sheetsDb);
            output += DisplayTrainingSheet.Print(sheetsDb);
            output += DisplayAdvancementSheet.Print(sheetsDb);
            output += DisplayStylesSheet.Print(sheetsDb);
            output += DisplayAdvancedSheet.Print(sheetsDb);
            output += DisplayCoreCharacterSheet.Print(sheetsDb);
            output += DisplayFormeSheet.Print(sheetsDb);
            output += DisplayGearSheet.Print(sheetsDb);
            output += DisplayActionSheet.Print(sheetsDb);
            output += DisplayPopups.Print();
            return `<div class="wuxCharacterSheet">\n${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("Page"), "Origin")}\n${output}\n</div>`;
        },

        buildHiddenFields = function () {
            let output = "";
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("CombatDetails"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Status"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("JobSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("AdvancedSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("StyleSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("EquipmentSlots"));

            let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", "Social")]);
            for (let i = 0; i < filteredStats.length; i++) {
                output += WuxSheetMain.Input("hidden", filteredStats[i].getAttribute());
            }

            return `<div class="wuxHiddenFields">
			${output}
			</div>`;
        },

        buildSheetWorkerContainer = function (sheetsDb) {
            let output = "";
            output += BuilderBackend.Print(sheetsDb);
            output += TrainingBackend.Print(sheetsDb);
            output += AdvancementBackend.Print(sheetsDb);
            output += OverviewBuilder.Print();
            output += FormeBuilder.Print();
            output += GearBuilder.Print();
            output += ActionBuilder.Print();
            output += PopupBuilder.Print();
            output += ChatBuilder.Print();
            return `<script type="text/worker">
			on("sheet:opened", function(eventinfo) {
				on_sheet_opened();
			});
			${output}
			`;
        }
    ;
    return {
        PrintBase: printBase,
        PrintTech: printTech
    };
}());

var DisplayOriginSheet = DisplayOriginSheet || (function () {
    'use strict';

    var
        print = function () {
            let definition = WuxDef.Get("Page_Origin");
            let output = WuxSheetNavigation.BuildOriginPageNavigation(definition) +
                SideBarData.Print() +
                MainContentData.Print();
            return WuxSheet.PageDisplay("Origin", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                print = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Advancement"))
                        + buildTechPointsSection(WuxDef.GetAttribute("Training")));
                },

                buildTechPointsSection = function (fieldName) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName);
                }

            return {
                Print: print
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                print = function () {
                    let output = "";
                    output += printBasics();

                    return output;
                },

                printBasics = function () {
                    let contents = buildBasicsData.Build();

                    return WuxSheetMain.Build(contents);
                },

                buildBasicsData = buildBasicsData || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildOrigin();
                            contents += influences();
                            contents += WuxSheetMain.MultiRowGroup([buildAdvancement(), buildTraining()], WuxSheetMain.Table.FlexTable, 2);
                            contents += buildPerks();
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Origin");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildOrigin = function () {
                            let contents = "";
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), WuxDef.GetAttribute("DisplayName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("IntroName"), WuxDef.GetAttribute("IntroName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
                            contents = WuxSheetMain.Table.FlexTableGroup(contents);

                            let backgroundContents = "";
                            backgroundContents += WuxDefinition.BuildTextarea(WuxDef.Get("Background"), WuxDef.GetAttribute("Background"),
                                "wuxInput wuxHeight150");
                            backgroundContents = WuxSheetMain.Table.FlexTableGroup(backgroundContents)

                            return `${WuxDefinition.InfoHeader(WuxDef.Get("Title_Origin"))}
                            ${WuxSheetMain.MultiRowGroup([contents, backgroundContents], WuxSheetMain.Table.FlexTable, 2)}`;
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

                        buildAdvancement = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginAdvancement"));
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
                            contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
                            contents += WuxDefinition.BuildText(WuxDef.Get("Advancement"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), WuxDef.GetAttribute("AdvancementJob"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), WuxDef.GetAttribute("AdvancementSkill"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 1 advancement point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildTraining = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Training"), WuxDef.GetAttribute("Training", WuxDef._max));
                            contents += WuxSheetMain.Desc(`${WuxSheetMain.Span(WuxDef.GetAttribute("Training"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Training", WuxDef._max))}`);

                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingKnowledge"), WuxDef.GetAttribute("TrainingKnowledge"), `cost: 1 training point`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingTechniques"), WuxDef.GetAttribute("TrainingTechniques"), `cost: 1 training point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildPerks = function () {
                            let contents = "";
                            let perkDef = WuxDef.Get("Perk");
                            let perkPageDef = WuxDef.Get("Page_Perks");
                            contents += WuxSheetMain.Header(`${perkPageDef.getTitle()}`);
                            contents += WuxDefinition.BuildText(perkDef,
                                `${WuxSheetMain.Span(perkDef.getAttribute())} / ${WuxSheetMain.Span(perkDef.getAttribute(WuxDef._max))}`);

                            contents += WuxSheetMain.MultiRowGroup(addPerkData(), WuxSheetMain.Table.FlexTable, 2);
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350");
                        },

                        addPerkData = function () {
                            let perkTechniques = WuxTechs.Filter(new DatabaseFilterData("techSet", "Perk"));
                            
                            let perkTables = ["", ""];
                            for (let i = 0; i < perkTechniques.length; i++) {
                                let perkDef = perkTechniques[i].createDefinition(WuxDef.Get("Technique"));
                                perkTables[i%2] += printPerkTechnique(perkDef, perkTechniques[i]);
                            }
                            return [WuxSheetMain.Table.FlexTableGroup(perkTables[0], " wuxMinWidth350"),
                                WuxSheetMain.Table.FlexTableGroup(perkTables[1], " wuxMinWidth350")];
                        },

                        printPerkTechnique = function (perkDef, technique) {
                            let headerContents = `<div class="wuxInteractiveBlock">
                                ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(perkDef.getAttribute(WuxDef._rank),
                                `<span class="wuxHeader">${technique.name}</span>
                                    <span class="wuxSubheader">[Cost ${technique.resourceCost} Perk Point]</span>`
                            )}
                            </div>`;
                            let descContents = `<div class="wuxDescription wuxMarginLeft50">${technique.flavorText}</div>`;

                            if (technique.name == "Affinity") {
                                descContents += WuxSheetMain.HiddenField(perkDef.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft50">
                                        ${WuxSheetMain.Select(WuxDef.GetAttribute("Affinity"),
                                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]))}
                                        ${WuxSheetMain.DescField(WuxDef.GetAttribute("Affinity", WuxDef._learn))}
                                    </div>`);
                            }
                            if (technique.name == "Second Affinity") {
                                descContents += WuxSheetMain.HiddenField(perkDef.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft50">
                                        ${WuxSheetMain.Select(WuxDef.GetAttribute("AdvancedAffinity"),
                                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]))}
                                        ${WuxSheetMain.DescField(WuxDef.GetAttribute("AdvancedAffinity", WuxDef._learn))}
                                    </div>`);
                            }

                            return WuxSheetMain.MultiRow(headerContents) + WuxSheetMain.MultiRow(descContents);
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

var DisplayTrainingSheet = DisplayTrainingSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += printTraining(sheetsDb);
            output += printKnowledge(sheetsDb);
            return output;
        },

        printTraining = function () {
            let definition = WuxDef.Get("Page_Training");
            let output = WuxSheetNavigation.BuildTrainingPageNavigation(definition) +
                SideBarData.PrintTraining() +
                MainContentData.PrintTraining();
            return WuxSheet.PageDisplay("Training", output);
        },

        printKnowledge = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Knowledge");
            let output = WuxSheetNavigation.BuildTrainingPageNavigation(definition) +
                SideBarData.PrintKnowledge() +
                MainContentData.PrintKnowledge(sheetsDb.language, sheetsDb.lore);
            return WuxSheet.PageDisplay("Knowledge", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printTraining = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Training")));
                },
                printKnowledge = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Knowledge")));
                },

                buildTechPointsSection = function (fieldName) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName);
                }

            return {
                PrintTraining: printTraining,
                PrintKnowledge: printKnowledge
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                printTraining = function () {
                    return WuxSheetMain.Build(training.Build());
                },

                training = training || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = WuxSheetMain.MultiRowGroup([buildConversion(), buildTraining()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Training");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildConversion = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_TrainingConversion");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.formula.getValue()}`);
                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To TP`));

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildTraining = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Training"), WuxDef.GetAttribute("Training", WuxDef._max));
                            contents += WuxSheetMain.Desc(`${WuxSheetMain.Span(WuxDef.GetAttribute("Training"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Training", WuxDef._max))}`);

                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingKnowledge"), WuxDef.GetAttribute("TrainingKnowledge"), `cost: 1 training point`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingTechniques"), WuxDef.GetAttribute("TrainingTechniques"), `cost: 1 training point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        }

                    return {
                        Build: build
                    }
                })(),

                printKnowledge = function (languageDictionary, loreDictionary) {
                    return WuxSheetMain.Build(buildLanguageData.Build(languageDictionary) + buildLoreData.Build(loreDictionary));
                },

                buildLanguageData = buildLanguageData || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Language");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildGroups = function (database) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = [new DatabaseFilterData("group", "")];
                            let filteredData = {};
                            let languageGroups = database.getPropertyValues("group");
                            for (let i = 0; i < languageGroups.length; i++) {
                                groupName = languageGroups[i];
                                filterSettings[0].value = groupName;
                                filteredData = database.filter(filterSettings);
                                output.push(buildGroup(groupName, filteredData));
                            }
                            return output;
                        },

                        buildGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Languages</div>
								<div class="wuxFlexTableItemData wuxTextLeft">
									${buildLanguageGroupSkills(filteredData)}
								</div>
							</div>`;
                        },

                        buildLanguageGroupSkills = function (filteredData) {
                            let output = "";
                            for (let i = 0; i < filteredData.length; i++) {
                                output += buildLanguage(filteredData[i]);
                            }
                            return output;
                        },

                        buildLanguage = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("Language"));
                            return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(knowledgeDefinition.getAttribute(WuxDef._rank), knowledgeDefinition.getAttribute(WuxDef._info),
                                buildInteractionMainBlock(knowledge, knowledgeDefinition), WuxDefinition.TooltipDescription(knowledgeDefinition));
                        },

                        buildInteractionMainBlock = function (knowledge, knowledgeDefinition) {
                            return `<span class="wuxHeader">${knowledgeDefinition.title}</span><span class="wuxSubheader"> - ${knowledge.location}</span>`;
                        }

                    return {
                        Build: build
                    }
                })(),

                buildLoreData = buildLoreData || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Lore");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildGroups = function (database) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = [new DatabaseFilterData("group", "")];
                            let filteredData = {};
                            let languageGroups = database.getPropertyValues("group");
                            for (let i = 0; i < languageGroups.length; i++) {
                                groupName = languageGroups[i];
                                filterSettings[0].value = groupName;
                                filteredData = database.filter(filterSettings);
                                output.push(buildGroup(groupName, filteredData));
                            }
                            return output;
                        },

                        buildGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Lore</div>
								<div class="wuxFlexTableItemData wuxTextLeft">
									${buildLoreGroupSkills(filteredData)}
								</div>
							</div>`;
                        },

                        buildLoreGroupSkills = function (knowledgeDataArray) {
                            let output = "";
                            for (let i = 0; i < knowledgeDataArray.length; i++) {
                                if (knowledgeDataArray[i].name == knowledgeDataArray[i].group) {
                                    output += buildMainLore(knowledgeDataArray[i]);
                                } else {
                                    output += buildSubLore(knowledgeDataArray[i]);
                                }
                            }
                            return output;
                        },

                        buildLore = function (knowledgeDefinition, groupName, interactHeader) {
                            return WuxSheetMain.InteractionElement.BuildTooltipSelectInput(knowledgeDefinition.getAttribute(WuxDef._rank), knowledgeDefinition.getAttribute(WuxDef._info),
                                WuxDef.Filter([new DatabaseFilterData("group", groupName)]), false, "wuxWidth70 wuxMarginRight10",
                                interactHeader, WuxDefinition.TooltipDescription(knowledgeDefinition));
                        },

                        buildMainLore = function (knowledge) {
                            return buildLore(knowledge.createDefinition(WuxDef.Get("LoreCategory")), "GeneralLoreTier", `<span class="wuxHeader">General ${knowledge.name}</span>`);
                        },

                        buildSubLore = function (knowledge) {
                            return buildLore(knowledge.createDefinition(WuxDef.Get("Lore")), "LoreTier", `<span class="wuxSubheader">${knowledge.name}</span>`);
                        }

                    return {
                        Build: build
                    }
                })();

            return {
                PrintTraining: printTraining,
                PrintKnowledge: printKnowledge
            }
        }());

    return {
        Print: print
    };
}());

var DisplayAdvancementSheet = DisplayAdvancementSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = "";
            output += printAdvancement(sheetsDb);
            output += printJobs(sheetsDb);
            output += printSkills(sheetsDb);
            output += printAttributes(sheetsDb);
            return output;
        },

        printAdvancement = function () {
            let definition = WuxDef.Get("Page_Advancement");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintAdvancement() +
                MainContentData.PrintAdvancement();
            return WuxSheet.PageDisplay("Advancement", output);
        },

        printJobs = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Jobs");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintJobs() +
                MainContentData.PrintJobs(sheetsDb.job, sheetsDb.techniques);
            return WuxSheet.PageDisplay("Jobs", output);
        },

        printSkills = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Skills");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintSkills() +
                MainContentData.PrintSkills(sheetsDb.skills);
            return WuxSheet.PageDisplay("Skills", output);
        },

        printAttributes = function () {
            let definition = WuxDef.Get("Page_Attributes");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintAttributes() +
                MainContentData.PrintAttributes();
            return WuxSheet.PageDisplay("Attributes", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printAdvancement = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Advancement")));
                },

                printJobs = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Job")));
                },

                printSkills = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Skill")));
                },

                printAttributes = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Attribute")));
                },

                buildTechPointsSection = function (fieldName) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName);
                }

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintSkills: printSkills,
                PrintAttributes: printAttributes
            };

        }()),

        MainContentData = MainContentData || (function () {
            'use strict';

            var
                printAdvancement = function () {
                    let contents = "";

                    contents += buildAdvancement.Build();

                    return WuxSheetMain.Build(contents);
                },

                buildAdvancement = buildAdvancement || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = "";
                            contents += buildAdvancementTab();
                            contents += buildPerksTab();
                            return contents;
                        },

                        buildAdvancementTab = function () {
                            let contents = WuxSheetMain.MultiRowGroup([buildConversionStats(), buildAdvancementStats()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Advancement");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildPerksTab = function () {
                            let contents = WuxSheetMain.MultiRowGroup([buildPerks()], WuxSheetMain.Table.FlexTable, 1);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Perks");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildConversionStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_AdvancementConversion");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            let xpDefinition = WuxDef.Get("XP");
                            contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.formula.getValue()}`);
                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To Levels`));

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildAdvancementStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxDefinition.InfoHeader(titleDefinition);
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
                            contents += WuxDefinition.BuildText(WuxDef.Get("MaxCR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
                            contents += WuxDefinition.BuildText(WuxDef.Get("Advancement"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), WuxDef.GetAttribute("AdvancementJob"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), WuxDef.GetAttribute("AdvancementSkill"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 1 advancement point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildPerks = function () {
                            let contents = "";
                            let perkDef = WuxDef.Get("Perk");
                            let perkPageDef = WuxDef.Get("Page_Perks");
                            contents += WuxSheetMain.Header(`${perkPageDef.getTitle()}`);
                            contents += WuxDefinition.BuildText(perkDef,
                                `${WuxSheetMain.Span(perkDef.getAttribute())} / ${WuxSheetMain.Span(perkDef.getAttribute(WuxDef._max))}`);

                            contents += WuxSheetMain.MultiRowGroup(addPerkData(), WuxSheetMain.Table.FlexTable, 2);
                            return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth350");
                        },

                        addPerkData = function () {
                            let perkTechniques = WuxTechs.Filter(new DatabaseFilterData("techSet", "Perk"));

                            let perkTables = ["", ""];
                            for (let i = 0; i < perkTechniques.length; i++) {
                                Debug.Log(`Perk Technique: ${perkTechniques[i].name}`);
                                let perkDef = perkTechniques[i].createDefinition(WuxDef.Get("Technique"));
                                perkTables[i%2] += printPerkTechnique(perkDef, perkTechniques[i]);
                            }
                            return [WuxSheetMain.Table.FlexTableGroup(perkTables[0], " wuxMinWidth350"),
                                WuxSheetMain.Table.FlexTableGroup(perkTables[1], " wuxMinWidth350")];
                        },

                        printPerkTechnique = function (perkDef, technique) {
                            let headerContents = `<div class="wuxInteractiveBlock">
                                ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(perkDef.getAttribute(WuxDef._rank),
                                `<span class="wuxHeader">${technique.name}</span>
                                    <span class="wuxSubheader">[Cost ${technique.resourceCost} Perk Point]</span>`
                                )}
                            </div>`;
                            let descContents = `<div class="wuxDescription wuxMarginLeft50">${technique.flavorText}</div>`;
                            
                            if (technique.name == "Affinity") {
                                descContents += WuxSheetMain.HiddenField(perkDef.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft50">
                                        ${WuxSheetMain.Select(WuxDef.GetAttribute("Affinity"), 
                                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]))}
                                        ${WuxSheetMain.DescField(WuxDef.GetAttribute("Affinity", WuxDef._learn))}
                                    </div>`);
                            }
                            if (technique.name == "Second Affinity") {
                                descContents += WuxSheetMain.HiddenField(perkDef.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft50">
                                        ${WuxSheetMain.Select(WuxDef.GetAttribute("AdvancedAffinity"), 
                                        WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]))}
                                        ${WuxSheetMain.DescField(WuxDef.GetAttribute("AdvancedAffinity", WuxDef._learn))}
                                    </div>`);
                            }
                            
                            return WuxSheetMain.MultiRow(headerContents) + WuxSheetMain.MultiRow(descContents);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printJobs = function (jobsDictionary, techDictionary) {
                    return WuxSheetMain.Build(buildJobs.Build(jobsDictionary, techDictionary));
                },

                buildJobs = buildJobs || (function () {
                    'use strict';

                    var
                        build = function (jobsDictionary) {
                            let output = "";
                            let groups = WuxDef.Filter([new DatabaseFilterData("group", "JobGroup")]);
                            for (let i = 0; i < groups.length; i++) {
                                output += buildJobGroup(jobsDictionary.filter([new DatabaseFilterData("group", groups[i].title)]), groups[i]);
                            }
                            return output;
                        },

                        buildJobGroup = function (jobs, jobGroup) {
                            let jobData = [];
                            for (let i = 0; i < jobs.length; i++) {
                                jobData.push(buildJob(jobs[i]));
                            }

                            let output = WuxSheetMain.MultiRowGroup(jobData, WuxSheetMain.Table.FlexTable, 2);
                            output = WuxSheetMain.TabBlock(output);

                            return WuxSheetMain.CollapsibleTab(jobGroup.getAttribute(WuxDef._tab, WuxDef._expand), `${jobGroup.title}s`, output);

                        },

                        buildJob = function (job) {
                            let jobDef = job.createDefinition(WuxDef.Get("Job"));

                            let contents = `${buildJobHeader(jobDef, job)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
                            ${buildTierSelect(jobDef)}
                            ${buildJobShortDescription(job)}`;

                            return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                        },

                        buildJobHeader = function (jobDef, job) {
                            return WuxSheetMain.Header2(`${WuxSheetMain.SubMenuButton(jobDef.getAttribute(WuxDef._expand), addSubmenuContents(jobDef, job))}
								${job.name}`
                            );
                        },

                        buildTierSelect = function (jobDef) {
                            return WuxSheetMain.Select(jobDef.getAttribute(),
                                WuxDef.Filter([new DatabaseFilterData("group", "JobTier")]), false);
                        },

                        addSubmenuContents = function (jobDef, job) {
                            return `${WuxSheetMain.Header2("Description")}
                                ${WuxSheetMain.Span("", job.description)}
                                ${WuxSheetMain.SubMenuOptionButton(jobDef.getAttribute(WuxDef._info), `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`, job.name)}
                            `;
                        },

                        buildJobShortDescription = function (job) {
                            return WuxSheetMain.Desc(job.shortDescription);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printSkills = function (skillDictionary) {
                    return WuxSheetMain.Build(buildSkills.Build(skillDictionary));
                },

                buildSkills = buildSkills || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = buildSkillGroup(database, "ActiveSkills");
                            contents += buildSkillGroup(database, "SocialSkills");
                            contents += buildSkillGroup(database, "TechnicalSkills");
                            return contents;
                        },

                        buildSkillGroup = function (database, group) {
                            let subGroups = WuxDef.Filter([new DatabaseFilterData("group", group)]);

                            let contents = WuxSheetMain.MultiRowGroup(buildSubGroups(database, subGroups), WuxSheetMain.Table.FlexTable, 3);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definitionName = `Page_${group}`;
                            let definition = WuxDef.Get(definitionName);
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);

                        },

                        buildSubGroups = function (database, subGroups) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = [new DatabaseFilterData("subGroup", "")];
                            let filteredData = {};
                            subGroups = subGroups.sort();
                            for (let i = 0; i < subGroups.length; i++) {
                                if (subGroups[i].name == "") {
                                    continue;
                                }
                                groupName = subGroups[i].name;
                                filterSettings[0].value = groupName;
                                filteredData = database.filter(filterSettings);
                                output.push(buildGroup(groupName, filteredData));
                            }
                            return output;
                        },

                        buildGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
								<div class="wuxFlexTableItemData wuxTextLeft">\n${buildSkillGroupSkills(filteredData)}\n</div>
							</div>`;
                        },

                        buildSkillGroupSkills = function (skillDataArray) {
                            let output = "";
                            for (let i = 0; i < skillDataArray.length; i++) {
                                output += buildSkill(skillDataArray[i]);
                            }
                            return output;
                        },

                        buildSkill = function (skill) {
                            let skillDefinition = skill.createDefinition(WuxDef.Get("Skill"));
                            let interactHeader = `<span class="wuxHeader">${skill.name} (${WuxDef.GetAbbreviation(skill.abilityScore)})</span>`;

                            return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(skillDefinition.getAttribute(WuxDef._rank), skillDefinition.getAttribute(WuxDef._info),
                                interactHeader, WuxDefinition.TooltipDescription(skillDefinition));
                        }
                    return {
                        Build: build
                    }
                }()),

                printAttributes = function () {
                    let contents = buildAttributes.Build();
                    return WuxSheetMain.Build(contents);
                },

                buildAttributes = buildAttributes || (function () {
                    'use strict';

                    var
                        build = function () {
                            let contents = buildAttributes();
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Attributes");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildAttributes = function () {
                            let attributes = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
                            let output = [];
                            let attributeValuesFilter = WuxDef.Filter([new DatabaseFilterData("group", "AttributeValue")]);
                            for (let i = 0; i < attributes.length; i++) {
                                output.push(buildAttribute(attributes[i], attributeValuesFilter));
                            }
                            return WuxSheetMain.MultiRowGroup(output, WuxSheetMain.Table.FlexTable, 3);
                        },

                        buildAttribute = function (attributeDefinition, attributeValuesFilter) {
                            let contents = "";
                            contents += WuxSheetMain.Select(attributeDefinition.getAttribute(), attributeValuesFilter, false);

                            let expandContents = "";
                            let formulaDefinitions = WuxDef.Filter(new DatabaseFilterData("formulaMods", attributeDefinition.name));
                            for (let i = 0; i < formulaDefinitions.length; i++) {
                                if (formulaDefinitions[i].group != "Skill") {
                                    expandContents += WuxSheetMain.Header2(formulaDefinitions[i].title, "span");
                                    expandContents += "<br />";
                                    expandContents += WuxDefinition.DefinitionContents(formulaDefinitions[i]);
                                }
                            }
                            let expandFieldName = attributeDefinition.getAttribute(WuxDef._expand);
                            contents += WuxSheetMain.InteractionElement.Build(true, `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
							${WuxSheetMain.Header("Affected Stats")}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`);

                            let header = `${attributeDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(attributeDefinition))}`;
                            let output = WuxSheetMain.Table.FlexTableHeader(header);
                            output += WuxSheetMain.Table.FlexTableData(contents);
                            return WuxSheetMain.Table.FlexTableGroup(output, " wuxMinWidth150");
                        }
                    ;
                    return {
                        Build: build
                    }
                }());

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintSkills: printSkills,
                PrintAttributes: printAttributes
            }
        }())

    return {
        Print: print
    };
}());

var DisplayStylesSheet = DisplayStylesSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = WuxSheetNavigation.BuildStylesNavigation("Page_LearnTechniques") +
                SideBarData.Print() +
                MainContentData.Print(sheetsDb.styles);
            return WuxSheet.PageDisplay("Styles", output);
        },

        printTest = function (stylesDatabase) {
            let filters = [new DatabaseFilterData("group", "Style")];
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
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Style")));
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

                print = function (stylesDatabase) {
                    return WuxSheetMain.Build(build(stylesDatabase));
                },

                build = function (stylesDatabase) {
                    let contents = buildStyleGroups(stylesDatabase);
                    return contents;
                },

                buildStyleGroups = function (stylesDatabase) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        let techFilterData = stylesDatabase.filter([new DatabaseFilterData("subGroup", filteredData[i].getTitle())]);
                        let techStyles = [];
                        for (let i = 0; i < techFilterData.length; i++) {
                            techStyles.push(buildStyleGroupFlexTableEntry(techFilterData[i]));
                        }
                        contents += buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), filteredData[i].name, filteredData[i].getTitle());
                    }

                    return contents;
                },

                buildStyleGroupFlexTableEntry = function (style) {
                    let styleDef = style.createDefinition(WuxDef.Get("Style"));

                    let contents = `${buildStyleHeader(styleDef, style)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
                            ${buildTierSelect(styleDef, style)}
                            ${buildStyleDescription(styleDef)}`;

                    return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                },

                buildStyleHeader = function (styleDef, style) {
                    return WuxSheetMain.Header2(`${WuxSheetMain.SubMenuButton(styleDef.getAttribute(WuxDef._expand), addSubmenuContents(styleDef, style))}
                        ${style.name}`
                    );
                },

                buildTierSelect = function (styleDef, style) {
                    let tierValues = [];
                    let def = new DefinitionData();
                    def.title = "Unranked";
                    def.variable = 0;
                    tierValues.push(def);
                    for (let i = 1; i <= style.maxTier; i++) {
                        def = new DefinitionData();
                        def.title = `Tier ${i}`;
                        def.variable = i;
                        tierValues.push(def);
                    }

                    return WuxSheetMain.Select(styleDef.getAttribute(), tierValues, false);
                },

                addSubmenuContents = function (styleDef, style) {
                    return `${WuxSheetMain.SubMenuOptionButton(styleDef.getAttribute(WuxDef._info), `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`, style.name)}
                    `;
                },

                buildStyleDescription = function (styleDef) {
                    return WuxSheetMain.Desc(styleDef.getDescription());
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

var DisplayAdvancedSheet = DisplayAdvancedSheet || (function () {
    'use strict';

    var
        print = function (sheetsDb) {
            let output = WuxSheetNavigation.BuildStylesNavigation("Page_AdvancedStyles") +
                SideBarData.Print() +
                MainContentData.Print(sheetsDb.styles);
            return WuxSheet.PageDisplay("Adv. Styles", output);
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
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Style")));
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

                print = function (stylesDatabase) {
                    return WuxSheetMain.Build(build(stylesDatabase));
                },

                build = function (stylesDatabase) {
                    return buildStyleGroups(stylesDatabase);
                },

                buildStyleGroups = function (stylesDatabase) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "AdvancedGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        let techFilterData = stylesDatabase.filter([new DatabaseFilterData("subGroup", filteredData[i].getTitle())]);
                        let techStyles = [];
                        for (let i = 0; i < techFilterData.length; i++) {
                            techStyles.push(buildStyleGroupFlexTableEntry(techFilterData[i]));
                        }
                        contents += buildTechniqueStyleGroupTab(WuxSheetMain.Table.FlexTable(techStyles), filteredData[i].name, filteredData[i].getTitle());
                    }

                    return contents;
                },

                buildStyleGroupFlexTableEntry = function (style) {
                    let styleDef = style.createDefinition(WuxDef.Get("Style"));

                    let contents = `${buildStyleHeader(styleDef, style)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${buildTierSelect(styleDef, style)}
                            ${buildStyleDescription(styleDef)}`;

                    return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                },

                buildStyleHeader = function (styleDef, style) {
                    return WuxSheetMain.Header2(`${WuxSheetMain.SubMenuButton(styleDef.getAttribute(WuxDef._expand), addSubmenuContents(styleDef, style))}
                        ${style.name}`
                    );
                },

                buildTierSelect = function (styleDef, style) {
                    let tierValues = [];
                    let def = new DefinitionData();
                    def.title = "Unranked";
                    def.variable = 0;
                    tierValues.push(def);
                    for (let i = 1; i <= style.maxTier; i++) {
                        def = new DefinitionData();
                        def.title = `Tier ${i}`;
                        def.variable = i;
                        tierValues.push(def);
                    }

                    return WuxSheetMain.Select(styleDef.getAttribute(), tierValues, false);
                },

                addSubmenuContents = function (styleDef, style) {
                    return `${WuxSheetMain.SubMenuOptionButton(styleDef.getAttribute(WuxDef._info), `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`, style.name)}
                    `;
                },

                buildStyleDescription = function (styleDef) {
                    return WuxSheetMain.Desc(styleDef.getDescription());
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