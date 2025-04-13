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
            output += DisplayTechniquesSheet.Print(sheetsDb);
            return `<div class="wuxCharacterSheet">\n${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("Page"), "Origin")}\n${output}\n`;
        },

        buildCharacterSheetBaseHtml = function (sheetsDb) {
            let output = "";
            output += DisplayOriginSheet.Print(sheetsDb);
            output += DisplayTrainingSheet.Print(sheetsDb);
            output += DisplayAdvancementSheet.Print(sheetsDb);
            output += DisplayCoreCharacterSheet.Print(sheetsDb);
            output += DisplayGearSheet.Print(sheetsDb);
            output += DisplayPopups.Print();
            return `${output}\n</div>`;
        },

        buildHiddenFields = function () {
            let output = "";
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("CombatDetails"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Status"));

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
                            let contents = WuxSheetMain.MultiRowGroup([buildOrigin(), buildOriginStats()], WuxSheetMain.Table.FlexTable, 2);
                            contents += influences();
                            contents += WuxSheetMain.MultiRowGroup([buildAdvancement(), buildTraining()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Origin");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildOrigin = function () {
                            let contents = "";
                            contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_Origin"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), WuxDef.GetAttribute("DisplayName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("IntroName"), WuxDef.GetAttribute("IntroName"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
                            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
                            contents += WuxDefinition.BuildTextarea(WuxDef.Get("Background"), WuxDef.GetAttribute("Background"), "wuxInput wuxHeight150");
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
                            let contents = WuxSheetMain.MultiRowGroup([buildConversion(), buildAdvancement()], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Advancement");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildConversion = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_AdvancementConversion");
                            contents += WuxDefinition.InfoHeader(titleDefinition);

                            let xpDefinition = WuxDef.Get("XP");
                            contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.formula.getValue()}`);
                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To Levels`));

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },

                        buildAdvancement = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxDefinition.InfoHeader(titleDefinition);
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
                            contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
                            contents += WuxDefinition.BuildText(WuxDef.Get("Advancement"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), WuxDef.GetAttribute("AdvancementJob"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), WuxDef.GetAttribute("AdvancementSkill"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 1 advancement point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
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
                        build = function (jobsDictionary, techDictionary) {
                            let output = "";
                            let groups = WuxDef.Filter([new DatabaseFilterData("group", "JobGroup")]);
                            for (let i = 0; i < groups.length; i++) {
                                output += buildJobGroup(jobsDictionary.filter([new DatabaseFilterData("group", groups[i].title)]), groups[i], techDictionary);
                            }
                            return output;
                        },

                        buildJobGroup = function (jobs, jobGroup, techDictionary) {
                            let jobData = [];
                            for (let i = 0; i < jobs.length; i++) {
                                jobData.push(buildJob(jobs[i], techDictionary));
                            }

                            let output = WuxSheetMain.MultiRowGroup(jobData, WuxSheetMain.Table.FlexTable, 2);
                            output = WuxSheetMain.TabBlock(output);

                            return WuxSheetMain.CollapsibleTab(jobGroup.getAttribute(WuxDef._tab, WuxDef._expand), `${jobGroup.title}s`, output);

                        },

                        buildJob = function (job, techDictionary) {
                            let jobDef = job.createDefinition(WuxDef.Get("Job"));

                            let contents = `${buildJobHeader(jobDef, job)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(jobDef.getAttribute(WuxDef._expand),
                                WuxSheetMain.SectionBlockContents(buildJobContents(job, jobDef, techDictionary)))}
                            ${buildJobShortDescription(job)}`;

                            return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                        },

                        buildJobHeader = function (jobDef, job) {
                            return WuxSheetMain.Header2(`${WuxSheetMain.InteractionElement.ExpandableBlockIcon(jobDef.getAttribute(WuxDef._expand))}
								${WuxSheetMain.Select(jobDef.getAttribute(WuxDef._rank),
                                WuxDef.Filter([new DatabaseFilterData("group", "JobTier")]), false, "wuxWidth70 wuxMarginRight10")}
								${job.name}`
                            );
                        },

                        buildJobShortDescription = function (job) {
                            return WuxSheetMain.Desc(job.shortDescription);
                        },

                        buildJobContents = function (job, jobDef, techDictionary) {
                            let output = "";

                            output += WuxSheetMain.Header2("Description") + WuxSheetMain.Desc(job.description);
                            output += buildJobContentsLevels(jobDef.getAttribute(WuxDef._rank));
                            output += buildJobContentsTechniques(job, techDictionary, WuxDef.Get("Technique"));

                            return output;
                        },

                        buildJobContentsLevels = function (fieldName) {
                            return WuxDefinition.BuildSelect(WuxDef.Get("JobTier"), fieldName, WuxDef.Filter([new DatabaseFilterData("group", "JobTier")]), false);
                        },

                        buildJobContentsTechniques = function (job, techDictionary, techniqueDefinition) {
                            let definition = WuxDef.Get("JobTechniques");
                            return `${WuxSheetMain.Header(`${job.name} Techniques${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(definition))}`)}
							${buildJobContentsTechniquesData(job, techDictionary, techniqueDefinition)}`;
                        },

                        buildJobContentsTechniquesData = function (job, techDictionary, techniqueDefinition) {
                            let output = "";
                            let displayOptions = getDisplayOptions(techniqueDefinition);
                            let techniques;
                            for (let i = 1; i <= 3; i++) {
                                output += `${WuxSheetMain.Header2(`Tier ${i} Techniques`)}\n`;
                                techniques = techDictionary.filter([new DatabaseFilterData("style", job.name), new DatabaseFilterData("tier", i)]);
                                for (let j = 0; j < techniques.length; j++) {
                                    output += WuxPrintTechnique.Get(techniques[j], displayOptions) + "\n";
                                }
                            }
                            return output;
                        },

                        getDisplayOptions = function (techniqueDefinition) {
                            var displayOptions = WuxPrintTechnique.GetDisplayOptions();

                            displayOptions.techniqueDefinition = techniqueDefinition;
                            displayOptions.autoExpand = true;
                            displayOptions.hasCSS = true;
                            return displayOptions;
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
                            contents += buildEquippedItemsSection();
                            contents += buildWearablesSection();
                            return contents;
                        },

                        buildEquippedItemsSection = function () {
                            let contents = "";

                            contents += WuxSheetMain.MultiRowGroup([equippedWearables(), equippedTools(), equippedConsumables()], WuxSheetMain.Table.FlexTable, 3);

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_GearEquippedGear");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        equippedWearables = function () {
                            let contents = "";

                            let equippedGearDef = WuxDef.Get("Page_GearWearables");
                            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(equippedGearDef.getAttribute(WuxDef._info))}${equippedGearDef.title}`)}`;

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

                        buildWearablesSection = function () {
                            let contents = "";

                            contents += testTechniquePopup();

                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_GearEquippedGear");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        testTechniquePopup = function () {
                            let contents = "";
                            let itemPopupDef = WuxDef.Get("Popup_AddHeadGear");
                            contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(itemPopupDef.getAttribute(), itemPopupDef.getTitle()));

                            return contents;
                        },

                        wearables = function () {
                            let contents = "";
                            let influenceDef = WuxDef.Get("Soc_Influence");
                            let influenceTypeDef = WuxDef.Get("Soc_InfluenceType");
                            let severityDef = WuxDef.Get("Soc_Severity");

                            // wuxFlexTableItemGroup2

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
            output += printTechPopup();
            return printBasePopupSheet(output);
        },
        
        printBasePopupSheet = function (contents) {
            contents = ` <div class="wuxPopupOverlay">
                ${contents}
            </div>`;
            return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Popup_PopupActive"), contents);
        },

        printTechPopup = function () {
            return buildBasePopup(WuxDef.GetAttribute("Popup_InspectPopupActive"), 
                TechPopup.Print(), "Inspection",  WuxDef.GetAttribute("Popup_InspectPopupName")
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

        TechPopup = TechPopup || (function () {
            'use strict';

            var
                print = function () {
                    let contents = "";
                    
                    return contents;
                },
                
                buildTechniqueTemplate = function () {
                    let contents = `<div class="wuxFeature">
                        <input type="hidden" class="wuxFeatureHeader-flag" name="${WuxDef.GetAttribute("Popup_TechActionType")}">
                        <div class="wuxFeatureHeader">
                            <div class="wuxFeatureHeaderDisplayBlock">
                                <span class="wuxFeatureHeaderName" name="${WuxDef.GetAttribute("Popup_TechName")}"></span>
                                <div class="wuxFeatureHeaderInfo" name="${WuxDef.GetAttribute("Popup_TechResourceData")}"></div>
                                <div class="wuxFeatureHeaderInfo" name="${WuxDef.GetAttribute("Popup_TechTargetingData")}"></div>
                                <div class="wuxFeatureHeaderInfo">
                                    <span><strong>Traits: </strong></span>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0")}" value="0" />
                                    <div class="wuxHiddenField">
                                        <span>None</span>
                                    </div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait0")}" value="0" />
                                    <div class="wuxHiddenAuxField">
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait0")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechTrait0")}">-</div>
                                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc0")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc1")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait0Desc2")}"></span>
                                            </div>
                                        </span>
                                    </div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait1")}" value="0" />
                                    <div class="wuxHiddenAuxField">
                                        <span>; </span>
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait1")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechTrait1")}">-</div>
                                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc0")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc1")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait1Desc2")}"></span>
                                            </div>
                                        </span>
                                    </div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait2")}" value="0" />
                                    <div class="wuxHiddenAuxField">
                                        <span>; </span>
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait2")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechTrait2")}">-</div>
                                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc0")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc1")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait2Desc2")}"></span>
                                            </div>
                                        </span>
                                    </div>
                                    <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrait3")}" value="0" />
                                    <div class="wuxHiddenAuxField">
                                        <span>; </span>
                                        <span class="wuxTooltip">
                                            <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechTrait3")}">-</span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechTrait3")}">-</div>
                                                <span class="wuxDescription"><em>Technique Trait</em></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc0")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc1")}"></span>
                                                <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechTrait3Desc2")}"></span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechTrigger")}" value="0" />
                        <div class="wuxHiddenAuxField">
                            <div class="wuxFeatureHeaderInfoReq">
                                <span><strong>Trigger: </strong></span>
                                <span name="${WuxDef.GetAttribute("Popup_TechTrigger")}"></span>
                            </div>
                        </div>
                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechRequirements")}" value="0" />
                        <div class="wuxHiddenAuxField">
                            <div class="wuxFeatureHeaderInfoReq">
                                <span><strong>Requirements: </strong></span>
                                <span name="${WuxDef.GetAttribute("Popup_TechRequirements")}"></span>
                            </div>
                        </div>
                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq0")}" value="0" />
                        <div class="wuxHiddenAuxField">
                            <div class="wuxFeatureHeaderInfoReq">
                                <span><strong>Item Traits: </strong></span>
                                <span class="wuxTooltip">
                                    <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq0")}">-</span>
                                    <div class="wuxTooltipContent">
                                        <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechItemReq0")}">-</div>
                                        <span class="wuxDescription"><em>Item Trait</em></span>
                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc0")}"></span>
                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc1")}"></span>
                                        <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq0Desc2")}"></span>
                                    </div>
                                </span>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq1")}" value="0" />
                                <div class="wuxHiddenAuxField">
                                    <span> and </span>
                                    <span class="wuxTooltip">
                                        <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq1")}">-</span>
                                        <div class="wuxTooltipContent">
                                            <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechItemReq1")}">-</div>
                                            <span class="wuxDescription"><em>Item Trait</em></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc0")}"></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc1")}"></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq1Desc2")}"></span>
                                        </div>
                                    </span>
                                </div>
                                <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechItemReq2")}" value="0" />
                                <div class="wuxHiddenAuxField">
                                    <span> and </span>
                                    <span class="wuxTooltip">
                                        <span class="wuxTooltipText" name="${WuxDef.GetAttribute("Popup_TechItemReq2")}">-</span>
                                        <div class="wuxTooltipContent">
                                            <div class="wuxHeader2" name="${WuxDef.GetAttribute("Popup_TechItemReq2")}">-</div>
                                            <span class="wuxDescription"><em>Item Trait</em></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc0")}"></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc1")}"></span>
                                            <span class="wuxDescription" name="${WuxDef.GetAttribute("Popup_TechItemReq2Desc2")}"></span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        
                        <input type="hidden" class="wuxHiddenField-flag" name="${WuxDef.GetAttribute("Popup_TechFlavorText")}" value="0" />
                        <div class="wuxHiddenAuxField">
                            <div class="wuxFeatureFunctionBlock">
                                <div class="wuxFeatureFunctionBlockFlavorText">
                                    <span name="${WuxDef.GetAttribute("Popup_TechFlavorText")}"></span>
                                </div>
                            </div>
                        </div>
                        <div class="wuxFeatureEffectsBlock">
                                <div class="wuxFeatureCheckHeader">
                                    <span><span class="wuxTooltip">
                                            <span class="wuxTooltipText">
                                                Effects
                                            </span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2">Effects</div><span class="wuxDescription">This contains the effects that will occur when this technique is used. There is no skill check necessary.
                                                </span>
                                            </div>
                                        </span></span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow">You create 6 disks in the targeted spaces.</span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow">Each disk has 10 + [Character Rank x 5] Hit Points.</span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow">If a disk is in adjacent spaces they may connect and will be considered one piece. These disks must be connected to solid ground otherwise they fall.</span>
                                </div>
                                <div class="wuxFeatureCheckHeader">
                                    <span><span class="wuxTooltip">
                                            <span class="wuxTooltipText">
                                                DC 13
                                            </span>
                                            <div class="wuxTooltipContent">
                                                <div class="wuxHeader2">DC 13</div><span class="wuxDescription">Your skill check must meet or exceed this value for the following effects to occur.
                                                </span>
                                            </div>
                                        </span></span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow">Choose 3 more target spaces. </span>
                                </div>
                                <div class="wuxFeatureCheckBlock">
                                    <span class="wuxFeatureCheckBlockRow">You create 3 disks in the targeted spaces.</span>
                                </div>

                            </div>
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

var BuilderBackend = BuilderBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdatePageState();
            output += listenerCharacterCreationFinishButton();
            output += listenerCharacterCreationSetAffinity();
            output += listenerCharacterCreationBonusAttributes();
            output += listenerUpdateTechniqueBuildPoints();
            output += listenerUpdateStyleBuildPoints();
            output += listenerUpdateJobStyleBuildPoints();
            return output;
        },

        listenerUpdatePageState = function () {
            let groupVariableNames = [WuxDef.GetVariable("Page")];
            let output = `WuxWorkerGeneral.UpdatePageState(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerCharacterCreationFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
            let output = `WuxWorkerCharacterCreation.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationSetAffinity = function () {
            let groupVariableNames = [WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("AdvancedBranch")];
            let output = `WuxWorkerCharacterCreation.SetAffinityValue(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCharacterCreationBonusAttributes = function () {
            let groupVariableNames = [WuxDef.GetVariable("BonusAttributePoints")];
            let output = `WuxWorkerCharacterCreation.SetBonusAttributes();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, false);
        },
        listenerUpdateTechniqueBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Technique"));
            let output = `WuxWorkerTechniques.UpdateTechniqueBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateStyleBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"));
            let output = `WuxWorkerTechniques.UpdateStyleBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateJobStyleBuildPoints = function () {
            let output = "";
            let jobs = WuxDef.Filter([new DatabaseFilterData("group", "Job")]);
            for (let i = 0; i < jobs.length; i++) {
                let groupVariableNames = [(jobs[i].getVariable())];
                output += "\n" + WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerTechniques.UpdateJobStyleBuildPoints("${jobs[i].name}", eventinfo)`, true);
            }
            return output;
        }

    return {
        Print: print
    }
}())

var TrainingBackend = TrainingBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";

            output += listenerTrainingGoToPageSet();
            output += listenerTrainingFinishButton();
            output += listenerTrainingExitButton();
            output += listenerConvertPp();
            output += listenerSetTrainingPoints();
            output += listenerSetTrainingPointsUpdate();
            output += listenerUpdateKnowledgeBuildPoints();
            return output;

        },
        listenerTrainingGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
            let output = `WuxWorkerTraining.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._finish)];
            let output = `WuxWorkerTraining.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerTrainingExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._exit)];
            let output = `WuxWorkerTraining.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertPp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_TrainingConversion")];
            let output = `WuxWorkerTraining.ConvertPp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("Training", WuxDef._max)];
            let output = `WuxWorkerTraining.SetTrainingPoints(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetTrainingPointsUpdate = function () {
            let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
            let output = `WuxWorkerTraining.SetTrainingPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateKnowledgeBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "LoreCategory"), WuxDef._rank));
            groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Lore"), WuxDef._rank));
            let output = `WuxWorkerKnowledges.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var AdvancementBackend = AdvancementBackend || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerGoToPageSet();
            output += listenerFinishButton();
            output += listenerExitButton();
            output += listenerConvertXp();
            output += listenerSetLevel();
            output += listenerSetAdvancementPoints();
            output += listenerUpdateJobBuildPoints();
            output += listenerUpdateSkillBuildPoints();
            output += listenerUpdateAttributeBuildPoints();

            return output;
        },
        listenerGoToPageSet = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_Advancement")];
            let output = `WuxWorkerAdvancement.GoToPageSet();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerFinishButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._finish)];
            let output = `WuxWorkerAdvancement.FinishBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerExitButton = function () {
            let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._exit)];
            let output = `WuxWorkerAdvancement.ExitBuild();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerConvertXp = function () {
            let groupVariableNames = [WuxDef.GetVariable("Title_AdvancementConversion")];
            let output = `WuxWorkerAdvancement.ConvertXp();\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetLevel = function () {
            let groupVariableNames = [WuxDef.GetVariable("Level")];
            let output = `WuxWorkerAdvancement.SetLevel(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerSetAdvancementPoints = function () {
            let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
            let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateJobBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._rank);
            let output = `WuxWorkerJobs.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateSkillBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._rank);
            let output = `WuxWorkerSkills.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateAttributeBuildPoints = function () {
            let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Attribute"));
            let output = `WuxWorkerAttributes.UpdateBuildPoints(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}())

var OverviewBuilder = OverviewBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdateDisplayName();
            output += listenerUpdateStatus();
            output += listenerUpdateCR();
            return output;
        },
        listenerUpdateDisplayName = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("DisplayName")}`];
            let output = `WuxWorkerGeneral.UpdateDisplayName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateStatus = function () {
            let output = "";
            let statuses = WuxDef.Filter([new DatabaseFilterData("group", "Status")]);
            for (let i = 0; i < statuses.length; i++) {
                let groupVariableNames = [(statuses[i].getVariable())];
                output += "\n" + WuxSheetBackend.OnChange(groupVariableNames, `WuxWorkerGeneral.UpdateStatus("${statuses[i].name}", eventinfo)`, true);
            }

            return output;
        },
        listenerUpdateCR = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("CR")}`];
            let output = `WuxWorkerGeneral.UpdateCR(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}());

var PopupBuilder = PopupBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerOpenItemInspectPopup();
            output += listenerCloseInspectPopup();
            return output;
        },
        listenerOpenItemInspectPopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_AddHeadGear")}`];
            let output = `WuxWorkerInspectPopup.OpenItemInspection(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerCloseInspectPopup = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Popup_InspectPopupActive")}`];
            let output = `WuxWorkerInspectPopup.ClosePopup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}());

var ChatBuilder = ChatBuilder || (function () {
    'use strict';

    var
        print = function () {
            let output = "";
            output += listenerUpdatePostContent();
            output += listenerUpdatePostType();
            output += listenerUpdateLanguage();
            output += listenerUpdateRepeatingChatSelection();
            output += listenerUpdateRepeatingChatEmoteSetName();
            output += listenerUpdateRepeatingChatEmoteSetInput();
            output += listenerUpdateRepeatingChatEmoteDefaultUrlUpdate();
            output += listenerUpdateRepeatingChatEmoteNameUpdate();
            output += listenerUpdateRepeatingChatEmoteUrlUpdate();
            return output;
        },
        listenerUpdatePostContent = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Message")}`];
            let output = `WuxWorkerChat.UpdatePostContent(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdatePostType = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Type")}`];
            let output = `WuxWorkerChat.UpdatePostType(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },

        listenerUpdateLanguage = function () {
            let groupVariableNames = [`${WuxDef.GetVariable("Chat_Language")}`];
            let output = `WuxWorkerChat.UpdateSelectedLanguage(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatSelection = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn)}`];
            let output = `WuxWorkerChat.SelectOutfit(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetName = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitName")}`];
            let output = `WuxWorkerChat.UpdateNameOutfit(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteSetInput = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitEmotes")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesGroup(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteDefaultUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefaultURL")}`];
            let output = `WuxWorkerChat.UpdateOutfitEmotesDefaultUrl(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteNameUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [`${repeatingSection}:${WuxDef.GetVariable("Chat_OutfitDefault")}`];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteName")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesName(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        },
        listenerUpdateRepeatingChatEmoteUrlUpdate = function () {
            let repeatingSection = WuxDef.GetVariable("RepeatingOutfits");
            let groupVariableNames = [];
            for (let i = 2; i <= 30; i++) {
                groupVariableNames.push(`${repeatingSection}:${WuxDef.GetVariable("Chat_EmoteURL")}${i}`);
            }
            let output = `WuxWorkerChat.UpdateOutfitEmotesUrl(eventinfo)`;

            return WuxSheetBackend.OnChange(groupVariableNames, output, true);
        }
    return {
        Print: print
    }
}());

