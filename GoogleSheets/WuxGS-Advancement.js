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
            return `<div class="wuxCharacterSheet">\n${WuxSheet.MainPageDisplayInput()}\n${output}\n`;
        },

        buildCharacterSheetBaseHtml = function (sheetsDb) {
            let output = "";
            output += DisplayOriginSheet.Print();
            output += DisplayTrainingSheet.Print(sheetsDb);
            output += DisplayAdvancementSheet.Print(sheetsDb);
            output += DisplayStylesSheet.Print(sheetsDb);
            output += DisplayCoreCharacterSheet.Print(sheetsDb);
            output += DisplayFormeSheet.Print(sheetsDb);
            output += DisplayGearSheet.Print(sheetsDb);
            output += DisplayActionSheet.Print(sheetsDb);
            output += DisplayPopups.Print();
            output += DisplayLoadingScreen.Print();
            return `<div class="wuxCharacterSheet">
                ${WuxSheet.MainPageDisplayInput()}
                ${output}
            </div>`;
        },

        buildHiddenFields = function () {
            let output = "";
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("CombatDetails"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("JobSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("AdvancedSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("StyleSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("EquipmentSlots"));
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TargetHV"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TargetFavor"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("XP"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("PP"), 0);
            output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("TeamIndex"), 0);

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
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Advancement"), "Adv. Pts")
                        + buildTechPointsSection(WuxDef.GetAttribute("Training"), "Trn. Pts")
                        + buildTechPointsSection(WuxDef.GetAttribute("Perk"), "Perk Pts")
                    );
                },

                buildTechPointsSection = function (fieldName, headerText) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, headerText);
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
                            let definition = WuxDef.Get("Page_Origin");
                            let backgroundBuilder = new CharacterBackgroundBuilder();
                            contents += `${WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title,
                                WuxSheetMain.TabBlock(backgroundBuilder.print()))}`;
                            contents += new ChatDisplayBuilder().print();
                            return contents;
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
            output += printTraining();
            return output;
        },

        printTraining = function () {
            let definition = WuxDef.Get("Page_Training");
            let output = WuxSheetNavigation.BuildTrainingPageNavigation(definition) +
                SideBarData.PrintTraining() +
                MainContentData.PrintTraining();
            return WuxSheet.PageDisplay("Training", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printTraining = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Training")));
                },

                buildTechPointsSection = function (fieldName) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName);
                }

            return {
                PrintTraining: printTraining
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
                            contents += WuxDefinition.BuildText(WuxDef.Get("Training"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Training"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Training", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberInput(WuxDef.Get("BonusTraining"), WuxDef.GetAttribute("BonusTraining"));

                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingTechniques"), WuxDef.GetAttribute("TrainingTechniques"), `cost: 1 training point`);
                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        }

                    return {
                        Build: build
                    }
                })()

            return {
                PrintTraining: printTraining
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
            output += printAttributes(sheetsDb);
            output += printKnowledge(sheetsDb);
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
                MainContentData.PrintJobs(sheetsDb.job);
            return WuxSheet.PageDisplay("Jobs", output);
        },

        printAttributes = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Attributes");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintAttributes() +
                MainContentData.PrintAttributes(sheetsDb.skills);
            return WuxSheet.PageDisplay("Attributes", output);
        },

        printKnowledge = function (sheetsDb) {
            let definition = WuxDef.Get("Page_Knowledge");
            let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
                SideBarData.PrintKnowledge() +
                MainContentData.PrintKnowledge(sheetsDb.language, sheetsDb.lore);
            return WuxSheet.PageDisplay("Knowledge", output);
        },

        SideBarData = SideBarData || (function () {
            'use strict';

            var
                printAdvancement = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Advancement"), "Adv. Pts")
                        + buildTechPointsSection(WuxDef.GetAttribute("Perk"), "Perk Pts")
                    );
                },

                printJobs = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Job")));
                },

                printAttributes = function () {
                    let contents = `${buildTechPointsSection(WuxDef.GetAttribute("Attribute"), "Attr. Pts")}
                    ${buildTechPointsSection(WuxDef.GetAttribute("Skill"), "Skill Pts")}`;
                    return WuxSheetSidebar.Build("", contents);
                },
                
                printKnowledge = function () {
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Knowledge")));
                },

                buildTechPointsSection = function (fieldName, headerText) {
                    return WuxSheetSidebar.BuildPointsSection(fieldName, headerText);
                }

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintAttributes: printAttributes,
                PrintKnowledge: printKnowledge
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
                            contents += buildPerks();
                            contents += buildPerkTechniqueList();
                            return contents;
                        },

                        buildAdvancementTab = function () {
                            let leftColumn = WuxSheetMain.Table.FlexTableGroup(buildLevelStats() + buildTrainingConversion());
                            let rightColumn = WuxSheetMain.Table.FlexTableGroup(buildAdvancementStats());
                            let contents = WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Advancement");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildLevelStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Level");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            let xpDefinition = WuxDef.Get("XP");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(
                                        `${WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(),
                                            `To Level: ${xpDefinition.formula.getValue()}`)}
                                        ${WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(),
                                            `Convert To Levels`))}`),
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxDefinition.BuildTextInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level")))
                                ],
                                WuxSheetMain.Table.FlexTable, 2);
                            contents += WuxDefinition.BuildText(WuxDef.Get("MaxCR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));

                            return contents;
                        },

                        buildTrainingConversion = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_TrainingConversion");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            let conversionTitleDef = WuxDef.Get("Title_TrainingConversion");
                            let ppDefinition = WuxDef.Get("PP");
                            contents += WuxSheetMain.MultiRowGroup([
                                    WuxSheetMain.Table.FlexTableGroup(
                                        `${WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(),
                                            `To Adv. Point: ${ppDefinition.formula.getValue()}`)}
                                        ${WuxSheetMain.MultiRow(WuxSheetMain.Button(conversionTitleDef.getAttribute(),
                                            `Convert To AP`))}`),
                                    WuxSheetMain.Table.FlexTableGroup(
                                        WuxDefinition.BuildTextInput(WuxDef.Get("BonusTraining"), WuxDef.GetAttribute("BonusTraining")))
                                ],
                                WuxSheetMain.Table.FlexTable, 2);

                            return contents;
                        },

                        buildAdvancementStats = function () {
                            let contents = "";
                            let titleDefinition = WuxDef.Get("Title_Advancement");
                            contents += WuxSheetMain.Header(titleDefinition.getTitle());

                            contents += WuxDefinition.BuildText(WuxDef.Get("Advancement"),
                                `${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement", WuxDef._max))}`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 2 advancement points`);
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingKnowledge"), WuxDef.GetAttribute("TrainingKnowledge"), `cost: 1 advancement point`);

                            return WuxSheetMain.Table.FlexTableGroup(contents);
                        },
                        
                        buildPerks = function () {
                            let contents = "";
                            let perkDef = WuxDef.Get("Perk");
                            let perkPageDef = WuxDef.Get("Page_Perks");
                            contents += WuxSheetMain.Header(`${perkPageDef.getTitle()}`);
                            contents += WuxDefinition.BuildText(perkDef,
                                `${WuxSheetMain.Span(perkDef.getAttribute())} / ${WuxSheetMain.Span(perkDef.getAttribute(WuxDef._max))}`);
                            let advJobDef = WuxDef.Get("AdvancementJob");
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), advJobDef.getAttribute(), `cost: 2 perk points`);
                            contents += WuxSheetMain.MultiRow(`<div class="wuxDescription">${advJobDef.getDescription()}</div>`);
                            let advSkillDef = WuxDef.Get("AdvancementSkill");
                            contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), advSkillDef.getAttribute(), `cost: 1 perk point`);
                            contents += WuxSheetMain.MultiRow(`<div class="wuxDescription">${advSkillDef.getDescription()}</div>`);

                            contents += buildBasicPerkList();
                            contents = WuxSheetMain.TabBlock(contents);
                            return WuxSheetMain.CollapsibleTab(perkPageDef.getAttribute(WuxDef._tab, WuxDef._expand), perkPageDef.title, contents);
                        },

                        buildBasicPerkList = function () {
                            let contents = "";
                            let groups = {};
                            WuxPerks.Iterate(function (perk) {
                                if (perk.group === "Perk Technique") return;
                                if (!groups.hasOwnProperty(perk.group)) {
                                    groups[perk.group] = [];
                                }
                                groups[perk.group].push(perk);
                            });
                            for (let groupName in groups) {
                                let perks = groups[groupName];
                                contents += WuxSheetMain.Header(groupName);
                                let columns = ["", ""];
                                for (let i = 0; i < perks.length; i++) {
                                    if (perks[i] == undefined) {
                                        continue;
                                    }
                                    columns[i % 2] += printBasicPerk(perks[i]);
                                }
                                contents += WuxSheetMain.MultiRowGroup(
                                    [WuxSheetMain.Table.FlexTableGroup(columns[0]),
                                     WuxSheetMain.Table.FlexTableGroup(columns[1])],
                                    WuxSheetMain.Table.FlexTable, 2);
                            }
                            return contents;
                        },

                        printBasicPerk = function (perk) {
                            let desc = (perk.descriptions || []).join("\n");
                            let perkInstance = new PerkData(perk);
                            let perkDef = perkInstance.createDefinition(WuxDef.Get("Perk"));
                            let inputRow = WuxSheetMain.Header2(perk.name);
                            if (perk.group === "Branch Perks") {
                                let label = WuxSheetMain.InputLabel(`Cost: ${perk.cost} perk point`);
                                if (perk.name === "Second Affinity") {
                                    let affinitySelect =
                                        WuxSheetMain.Select(perkDef.getAttribute(WuxDef._affinity),
                                            WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])) +
                                        WuxSheetMain.DescField(perkDef.getAttribute(WuxDef._learn));
                                    inputRow += `<div class="wuxInteractiveBlock">
                                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(perkDef.getAttribute(), label)}
                                        ${WuxSheetMain.InteractionElement.ExpandableBlockContents(perkDef.getAttribute(), affinitySelect)}
                                    </div>`;
                                } else {
                                    inputRow += WuxSheetMain.MultiRow(
                                        WuxSheetMain.InteractionElement.BuildCheckboxInput(perkDef.getAttribute(), label)
                                    );
                                }
                            } else {
                                let label = `Cost: ${perk.cost}${perkInstance.maxRank.hasFormula() ? ` perk point, Max: ${WuxSheetMain.Span(perkDef.getAttribute(WuxDef._max))}` : ""}`;
                                inputRow += WuxSheetMain.MultiRow(
                                    WuxSheetMain.Input("number", perkDef.getAttribute(), "", "0") +
                                    WuxSheetMain.InputLabel(label)
                                );
                            }
                            return inputRow + (desc !== "" ? WuxSheetMain.MultiRow(`<div class="wuxDescription">${desc}</div>`) : "");
                        },

                        buildPerkTechniqueList = function () {
                            let repeatingDef = WuxDef.Get("RepeatingPerks");

                            let nonElementDef = WuxDef.Get("Forme_ShowFromNonElement");
                            let levelRestrictedDef = WuxDef.Get("Forme_ShowLevelRestricted");
                            let filterCheckboxItems = [
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
                            let filterCheckboxes = `${WuxSheetMain.Header2(WuxDef.GetTitle("Title_StyleFilterOption"))}
                                ${WuxSheetMain.MultiRowGroup(filterCheckboxItems, WuxSheetMain.Table.FlexTable, 1)}`;
                            let perkFilterDefs = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
                            let perkFilterButtons = perkFilterDefs.map(def =>
                                WuxSheetMain.Table.FlexTableGroup(
                                    WuxSheetMain.Button(def.getAttribute(), def.getTitle(), "wuxWidth160")));
                            let filterPanel = WuxSheetMain.Table.FlexTableGroup(
                                filterCheckboxes + 
                                WuxSheetMain.Header2(WuxDef.GetTitle("Title_PerkStyleFilter")) + 
                                WuxSheetMain.MultiRowGroup(perkFilterButtons, WuxSheetMain.Table.FlexTable, 1),
                                " wuxMinWidth350 wuxFlexTableItemGroup2");

                            let nameDef = WuxDef.Get("Forme_Name");
                            let inspectDef = WuxDef.Get("Forme_Inspect");
                            let deleteDef = WuxDef.Get("Forme_Delete");
                            let rowContents = `<div class="wuxMultiRow" style="min-width: 300px;">
                                <div class="wuxEquipableName"><span class="wuxDescription" name="${nameDef.getAttribute()}"></span></div>
                                <div class="wuxFloatRight">
                                    ${WuxSheetMain.Button(inspectDef.getAttribute(), `&#9673; ${inspectDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                    ${WuxSheetMain.Button(deleteDef.getAttribute(), `&#10008; ${deleteDef.getTitle()}`, "wuxRepeatingTechActionButton")}
                                </div>
                            </div>`;
                            let repeaterSection = WuxSheetMain.Table.FlexTableGroup(
                                `${WuxSheetMain.Header(repeatingDef.getTitle())}
                                <div>
                                    <div class="wuxNoRepControl wuxRepeatingFlexSection">
                                        <fieldset class="${repeatingDef.getVariable()}">
                                            ${rowContents}
                                        </fieldset>
                                    </div>
                                    ${WuxSheetMain.Row("&nbsp;")}
                                </div>`);

                            let sectionDef = WuxDef.Get("Title_PerkTechniques");
                            let contents = WuxSheetMain.MultiRowGroup([filterPanel, repeaterSection], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);
                            return WuxSheetMain.CollapsibleTab(
                                sectionDef.getAttribute(WuxDef._expand),
                                sectionDef.getTitle(),
                                contents);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printJobs = function (jobsDictionary) {
                    return WuxSheetMain.Build(buildJobs.Build(jobsDictionary));
                },

                buildJobs = buildJobs || (function () {
                    'use strict';

                    var
                        build = function (jobsDictionary) {
                            let output = "";
                            let jobClasses = WuxDef.Filter([new DatabaseFilterData("group", "JobClass")]);
                            for (let i = 0; i < jobClasses.length; i++) {
                                let jobclass = jobClasses[i];
                                output += buildJobClass(
                                    WuxDef.Filter(new DatabaseFilterData("subGroup", jobclass.name)),
                                    jobclass, jobsDictionary);
                            }
                            return output;
                        },

                        buildJobClass = function (archetypes, jobclassDefinition, jobsDictionary) {
                            let output = "";
                            for (let i = 0; i < archetypes.length; i++) {
                                let archetype = archetypes[i];
                                let jobFilter = jobsDictionary.filter(new DatabaseFilterData("group", archetype.title));
                                output += buildArchetype(jobFilter, archetype);
                            }

                            output = WuxSheetMain.TabBlock(output);
                            return WuxSheetMain.CollapsibleTab(jobclassDefinition.getAttribute(WuxDef._tab, WuxDef._expand), jobclassDefinition.title, output);
                        },

                        buildArchetype = function (jobs, archetypeDefinition) {
                            let jobData = [];
                            for (let i = 0; i < jobs.length; i++) {
                                jobData.push(buildJob(jobs[i]));
                            }

                            let output = WuxSheetMain.Desc(archetypeDefinition.getDescription()) +
                                WuxSheetMain.MultiRowGroup(jobData, WuxSheetMain.Table.FlexTable, 2);

                            let hiddenField = archetypeDefinition.getAttribute(WuxDef._expand);
                            let header = WuxSheetMain.Header(
                                WuxSheetMain.CollapsibleHeader(
                                    `<span>${(archetypeDefinition.getTitle())}</span>`, hiddenField));
                            return header + WuxSheetMain.HiddenAuxField(hiddenField, output);
                        },

                        buildJob = function (job) {
                            let jobDefinition = job.createDefinition(WuxDef.Get("Job"));

                            let contents = `${buildJobHeader(job, jobDefinition)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
                            ${buildJobDescription(job)}
                            ${buildTechniquesButton(job, jobDefinition)}`;

                            return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), "Half wuxMinWidth220")}`;
                        },

                        buildJobHeader = function (job, jobDefinition) {
                            let interactHeader = `<span class="wuxHeader">${job.name}</span>`;

                            return WuxSheetMain.InteractionElement.BuildCheckboxInput(
                                jobDefinition.getAttribute(), interactHeader);
                        },

                        buildJobDescription = function (job) {
                            return WuxSheetMain.Desc(`<span>Category: ${job.category}</span>
                            <span>Difficulty: ${Format.PrintIcons(job.difficulty, 3, `★`, `☆`)}</span>
                            <span>Main Skills: ${printTechniqueSkills(job.skills)}</span>
                            <span>&nbsp;</span>
                            <span>${job.getDescription("</span><span>")}</span>`);
                        },

                        printTechniqueSkills = function (skills) {
                            let skillsOutput = "";
                            let skillSplit = skills.split(";");
                            for (let i = 0; i < skillSplit.length; i++) {
                                if (skillsOutput != "") {
                                    skillsOutput += "; ";
                                }
                                let skillData = skillSplit[i].split(":");
                                if (skillData.length > 1 && skillData[1] == "group") {
                                    skillsOutput += `Any ${skillData[0]}`;
                                }
                                else {
                                    skillsOutput += `${skillData[0]}`;
                                }
                            }
                            if (skillsOutput == "") {
                                skillsOutput = "None";
                            }
                            return skillsOutput;
                        },
                        
                        buildTechniquesButton = function (job, jobDefinition) {
                            return WuxSheetMain.Button(jobDefinition.getAttribute(WuxDef._info), 
                                `<span>${WuxDef.GetTitle("Forme_SeeTechniques")}</span>`,
                                "", job.name);
                        }
                    ;
                    return {
                        Build: build
                    }
                }()),

                printAttributes = function (skillsDatabase) {
                    let contents = buildAttributes.Build(skillsDatabase);
                    return WuxSheetMain.Build(contents);
                },

                buildAttributes = buildAttributes || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let contents = buildAttributesSection();
                            contents += buildSkillsSection(database);
                            contents += buildStatSummarySection();
                            return contents;
                        },

                        buildAttributesSection = function () {
                            let contents = WuxSheetMain.MultiRowGroup(buildAttributes(), WuxSheetMain.Table.FlexTable, 3);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Page_Attributes");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildAttributes = function () {
                            let attributes = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
                            let output = [];
                            let attributeValuesFilter = WuxDef.Filter([new DatabaseFilterData("group", "AttributeValue")]);
                            for (let i = 0; i < attributes.length; i++) {
                                output.push(printAttribute(attributes[i], attributeValuesFilter));
                            }
                            return output;
                        },
                        printAttribute = function (attributeDefinition, attributeValuesFilter) {
                            let contents = "";
                            contents += WuxSheetMain.Select(attributeDefinition.getAttribute(), attributeValuesFilter, false);
                            
                            let header = `${attributeDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(attributeDefinition))}`;
                            let output = WuxSheetMain.Table.FlexTableHeader(header);
                            output += WuxSheetMain.Table.FlexTableData(contents);
                            return WuxSheetMain.Table.FlexTableGroup(output, " wuxMinWidth150");
                        },

                        buildSkillsSection = function (database) {
                            let skillGroups = ["ActiveSkills", "SocialSkills", "WorldSkills"];
                            let contents = "";
                            
                            for (let skillGroup of skillGroups) {
                                let definitionName = Format.GetDefinitionName("Page", skillGroup);
                                let definition = WuxDef.Get(definitionName);
                                let subGroups = WuxDef.Filter([new DatabaseFilterData("subGroup", skillGroup)]);

                                contents += `${WuxSheetMain.Header(definition.getTitle())}
                                ${WuxSheetMain.MultiRowGroup(buildSkillSubGroups(database, subGroups), WuxSheetMain.Table.FlexTable, 3)}
                                `;
                            }
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Skill");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildSkillSubGroups = function (database, subGroups) {
                            let output = [];
                            let groupName = "";
                            let filterSettings = new DatabaseFilterData("subGroup", "");
                            subGroups = subGroups.sort();
                            for (let i = 0; i < subGroups.length; i++) {
                                if (subGroups[i].name == "") {
                                    continue;
                                }
                                groupName = subGroups[i].getTitle();
                                filterSettings.value = [groupName];
                                let filteredData = database.filter(filterSettings);
                                output.push(printSkillSubGroup(groupName, filteredData));
                            }
                            return output;
                        },
                        printSkillSubGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxSkillGroup">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
								<div class="wuxFlexTableItemData wuxTextLeft">\n${buildSubSkillGroupSkills(filteredData)}\n</div>
							</div>`;
                        },
                        buildSubSkillGroupSkills = function (skillDataArray) {
                            let output = "";
                            for (let i = 0; i < skillDataArray.length; i++) {
                                output += printSkill(skillDataArray[i]);
                            }
                            return output;
                        },
                        
                        printSkill = function (skill) {
                            let skillDefinition = skill.createDefinition(WuxDef.Get("Skill"));
                            let interactHeader = printInteractiveSkillHeader(skill, skillDefinition);
                            let expertiseHeader = printInteractiveExpertiseHeader(skillDefinition);

                            return WuxSheetMain.HiddenFieldToggle(skillDefinition.getAttribute(WuxDef._learn),
                                    `<div class="wuxIsKeySkill">${interactHeader}</div>`,
                                    `${interactHeader}`) +
                                WuxSheetMain.HiddenField(skillDefinition.getAttribute(WuxDef._rank),
                                    `<div class="wuxMarginLeft50">${expertiseHeader}</div>`);
                        },
                        printInteractiveSkillHeader = function (skill, skillDefinition) {
                            let abilityScores = [WuxDef.GetAbbreviation(skill.abilityScore)];
                            if (skill.abilityScore2 != "") {
                                abilityScores.push(WuxDef.GetAbbreviation(skill.abilityScore2))
                            }
                            let attributesLine = `(${abilityScores.join("/")})`;
                            let interactHeader = `<span class="wuxHeader">${skill.name} ${attributesLine}</span>`;

                            return `<div class="wuxSkill">
                            ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                skillDefinition.getAttribute(WuxDef._rank),
                                skillDefinition.getAttribute(WuxDef._info),
                                interactHeader, WuxDefinition.TooltipDescription(skillDefinition))}
                            ${printSkillStat(skillDefinition, skillDefinition.getAttribute(), skillDefinition.getAttribute(WuxDef._info))}
                            </div>`;
                        },
                        printSkillStat = function(definition, fieldAttr, statCalculationField) {
                            return `<span class="wuxFloatRight">
                                ${WuxSheetMain.Tooltip.Text(WuxSheetMain.Span(fieldAttr),
                                    printStatCalculationTooltipContent(definition, statCalculationField))}
                            </span>`;
                        },
                        printStatCalculationTooltipContent = function(definitionData, statCalculationField) {
                            return `${WuxSheetMain.Header2(definitionData.title)}
                                <span class="wuxDescription" name="${statCalculationField}"></span>`;
                        },
                        printInteractiveExpertiseHeader = function (skillDefinition) {
                            let expertiseDef = WuxDef.Get("SkillExpertise");
                            let interactHeader = `<span class="wuxHeader">${expertiseDef.getTitle()}</span>`;

                            return WuxSheetMain.InteractionElement.Build(false,
                                WuxSheetMain.InteractionElement.CheckboxBlockIcon(
                                    skillDefinition.getAttribute(WuxDef._expertise),
                                    interactHeader)
                            );
                        },

                        buildStatSummarySection = function () {
                            let pageContents = `${buildJobSelection()}
                            ${buildStatSummary()}`;
                            let contents = WuxSheetMain.TabBlock(pageContents);

                            let definition = WuxDef.Get("Page_AffectedStats");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },
                        buildJobSelection = function () {
                            let jobSelection = new JobSelectionBuilder();
                            return jobSelection.print();
                        },
                        buildStatSummary = function () {
                            let statsBuilder = new CharacterStatisticsBuilder();
                            return statsBuilder.print();
                        }
                        
                    ;
                    return {
                        Build: build
                    }
                }()),

                printKnowledge = function (languageDictionary, loreDictionary) {
                    return WuxSheetMain.Build(buildLanguageData.Build(languageDictionary) + buildLoreData.Build(loreDictionary));
                },

                buildLanguageData = buildLanguageData || (function () {
                    'use strict';

                    var
                        build = function (database) {
                            let leftColumn = buildCommonSection(database);
                            let rightColumn = buildGroupsColumn(database);
                            let contents = WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2);
                            contents = WuxSheetMain.TabBlock(contents);

                            let definition = WuxDef.Get("Language");
                            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
                        },

                        buildCommonSection = function (database) {
                            let commonLanguages = database.filter([new DatabaseFilterData("location", "Common")]);
                            if (commonLanguages.length === 0) { return ""; }

                            let definition = WuxDef.Get("Title_LanguageCommon");
                            let header = WuxSheetMain.Header(definition.getTitle());

                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
                                ${header}
                                <div class="wuxFlexTableItemData wuxTextLeft">
                                    ${buildCommonLanguageSkills(commonLanguages)}
                                </div>
                            </div>`;
                        },

                        buildCommonLanguageSkills = function (filteredData) {
                            let output = "";
                            for (let i = 0; i < filteredData.length; i++) {
                                output += buildCommonLanguage(filteredData[i]);
                            }
                            return output;
                        },

                        buildCommonLanguage = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("Language"));
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    buildInteractionMainBlock(knowledge, knowledgeDefinition),
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                                <span class="wuxSubheader"> - ${knowledge.group}</span>
                            </div>`;
                        },

                        buildGroupsColumn = function (database) {
                            let output = "";
                            let filterSettings = [new DatabaseFilterData("group", "")];
                            let languageGroups = database.getPropertyValues("group");
                            for (let i = 0; i < languageGroups.length; i++) {
                                let groupName = languageGroups[i];
                                filterSettings[0].value = [groupName];
                                let filteredData = database.filter(filterSettings);
                                let nonCommon = filteredData.filter(k => k.location !== "Common");
                                if (nonCommon.length > 0) {
                                    output += printGroup(groupName, nonCommon);
                                }
                            }
                            return WuxSheetMain.Table.FlexTableGroup(output);
                        },

                        printGroup = function (groupName, filteredData) {
                            let hiddenField = `attr_Language_${groupName.replace(/\s+/g, "")}_expand`;
                            let header = WuxSheetMain.Header(
                                WuxSheetMain.CollapsibleHeaderInverse(`<span>${groupName} Languages</span>`, hiddenField));
                            let body = WuxSheetMain.HiddenField(hiddenField, buildLanguageGroupSkills(filteredData));
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
                                ${header}${body}
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
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    buildInteractionMainBlock(knowledge, knowledgeDefinition),
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                                <span class="wuxSubheader"> - ${knowledge.location}</span>
                            </div>`;
                        },

                        buildInteractionMainBlock = function (knowledge, knowledgeDefinition) {
                            return `<span class="wuxHeader">${knowledgeDefinition.title}</span>`;
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
                                filterSettings[0].value = [groupName];
                                filteredData = database.filter(filterSettings);
                                output.push(buildGroup(groupName, filteredData));
                            }
                            return output;
                        },

                        buildGroup = function (groupName, filteredData) {
                            return `<div class="wuxFlexTableItemGroup wuxMinWidth150">
								<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Lore</div>
								<div class="wuxFlexTableItemData wuxTextLeft">
									${buildLoreGroupSkills(filteredData, groupName)}
								</div>
							</div>`;
                        },

                        buildLoreGroupSkills = function (knowledgeDataArray, groupName) {
                            let output = "";
                            let subLores = [];
                            for (let i = 0; i < knowledgeDataArray.length; i++) {
                                if (knowledgeDataArray[i].name == knowledgeDataArray[i].group) {
                                    output += buildMainLore(knowledgeDataArray[i]);
                                } else {
                                    subLores.push(knowledgeDataArray[i]);
                                }
                            }
                            output += buildSubLoreRepeater(groupName, subLores);
                            return output;
                        },

                        buildSubLoreRepeater = function (groupName, subLores) {
                            let tierOptions = WuxDef.Filter([new DatabaseFilterData("group", "LoreTier")]);

                            let subTypeSelect = `<select class="wuxInput wuxLoreDescription" name="${WuxDef.GetAttribute("Lore_SubType")}">
                                <option value="0">Choose Lore Type</option>
                                ${subLores.map(k => `<option value="${k.name}">${k.name}</option>`).join("\n                                ")}
                                <option value="1">Custom</option>
                            </select>`;

                            let repeaterContents = WuxSheetMain.MultiRow(
                                WuxSheetMain.Select(WuxDef.GetAttribute("Lore_Tier"), tierOptions, false, "wuxLoreType") +
                                subTypeSelect
                            );

                            repeaterContents += WuxSheetMain.HiddenIndexField(
                                WuxDef.GetAttribute("Lore_SubType"), 1,
                                WuxSheetMain.Input("text", WuxDef.GetAttribute("Lore_Name"), "", WuxDef.GetTitle("Lore_Name")));

                            repeaterContents += WuxSheetMain.Textarea(
                                WuxDef.GetAttribute("Lore_Description"), "wuxInput wuxHeight30", WuxDef.GetTitle("Lore_Description"));

                            let specializedLoreDef = WuxDef.Get("Title_SpecializedLore");
                            return `<div class="wuxMarginLeft50">
                                ${WuxSheetMain.Header2(specializedLoreDef.getTitle(groupName))}
                                <div>
                                    <fieldset class="${WuxDef.GetVariable("Repeater" + groupName)}">
                                        ${repeaterContents}
                                    </fieldset>
                                </div>
                            </div>`;
                        },

                        buildMainLore = function (knowledge) {
                            let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("LoreCategory"));
                            return `<div class="wuxSkill">
                                ${WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(
                                    knowledgeDefinition.getAttribute(WuxDef._rank),
                                    knowledgeDefinition.getAttribute(WuxDef._info),
                                    `<span class="wuxHeader">General ${knowledge.name}</span>`,
                                    WuxDefinition.TooltipDescription(knowledgeDefinition))}
                            </div>`;
                        }

                    return {
                        Build: build
                    }
                })();

            return {
                PrintAdvancement: printAdvancement,
                PrintJobs: printJobs,
                PrintAttributes: printAttributes,
                PrintKnowledge: printKnowledge
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
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique")));
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
                    return "";
                    return  buildStyleGroups(stylesDatabase);
                },

                buildStyleGroups = function (stylesDatabase) {
                    let contents = "";
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        contents += buildStyleGroupContents(filteredData[i], stylesDatabase);
                    }

                    return contents;
                },
                
                buildStyleGroupContents = function (styleCategoryDefinition, stylesDatabase) {
                    let stylesFilter = WuxDef.Filter([
                        new DatabaseFilterData("subGroup", styleCategoryDefinition.getTitle()),
                        new DatabaseFilterData("group", "StyleSubGroup")
                    ]);

                    let styleOutput = "";
                    for (let i = 0; i < stylesFilter.length; i++) {
                        styleOutput += buildSubStyleGroupContents(stylesFilter[i], stylesDatabase);
                    }
                    return buildTechniqueStyleGroupTab(styleOutput, styleCategoryDefinition.name, styleCategoryDefinition.getTitle());
                },
                
                buildSubStyleGroupContents = function (subStyleCategoryDefinition, stylesDatabase) {
                    let hiddenField = subStyleCategoryDefinition.getAttribute(WuxDef._expand);
                    
                    let collapsibleHeaderContents = `<span>${(subStyleCategoryDefinition.getTitle())}</span>`;
                    let headerContents = WuxSheetMain.CollapsibleHeaderInverse(collapsibleHeaderContents, hiddenField);
                    
                    let header = WuxSheetMain.Header(headerContents);
                    let description = WuxSheetMain.Desc(subStyleCategoryDefinition.getDescription());
                    let contents = description + buildStyleGroupBasicEntries(subStyleCategoryDefinition, stylesDatabase);
                    
                    return header + WuxSheetMain.HiddenFieldToggle(hiddenField, contents, description);
                },

                buildStyleGroupBasicEntries = function (subStyleCategoryDefinition, stylesDatabase) {
                    let output = "";
                    let techFilterData = stylesDatabase.filter([
                        new DatabaseFilterData("subGroup", "Style"),
                        new DatabaseFilterData("styleCategory", subStyleCategoryDefinition.getTitle())
                    ]);
                    for (let i = 0; i < techFilterData.length; i++) {
                        let style = techFilterData[i];
                        let styleDef = style.createDefinition(WuxDef.Get("Style"));
                        output += buildStyleEntry(styleDef, style, style);
                        output += buildStyleGroupSubEntries(styleDef, style, stylesDatabase);
                    }
                    return `<div class="wuxMarginLeft50">${output}</div><div>&nbsp;</div>`;
                },
                buildStyleGroupSubEntries = function (styleDef, style, stylesDatabase) {
                    
                    let output = "";
                    let techFilterData = stylesDatabase.filter([new DatabaseFilterData("baseStyle", style.name)]);
                    for (let i = 0; i < techFilterData.length; i++) {
                        let subStyle = techFilterData[i];
                        let subStyleDef = subStyle.createDefinition(WuxDef.Get("Style"));
                        output += buildStyleEntry(subStyleDef, subStyle, styleDef);
                        output += buildStyleGroupSubEntries(subStyleDef, subStyle, stylesDatabase);
                    }
                    if (output == "") {
                        return "";
                    }
                    let description = `<div class="wuxDescription">These are advanced styles that are available once ${styleDef.getTitle()} is learned.</div>
                    <div class="wuxDescription">You must learn at least one technique from ${styleDef.getTitle()} to learn techniques from any of these styles.</div>
                    <div>&nbsp;</div>`;
                    output = description + output;

                    let hiddenField = styleDef.getAttribute(WuxDef._expand);
                    let headerContents = WuxSheetMain.CollapsibleHeaderInverse(`<span>${style.name} Advanced Styles</span>`, hiddenField);
                    let header = WuxSheetMain.Header2(headerContents);
                    
                    return `${header}${WuxSheetMain.HiddenField(hiddenField, `<div class="wuxMarginLeft50">${output}</div>`)}<div>&nbsp;</div>`;
                },
                
                buildStyleEntry = function (styleDef, style, partentStyleDef) {
                    return `<div class="wuxHeader">${style.name}</div>
                            ${buildStyleDescription(styleDef, style)}
                            ${buildStyleTechniquesFlexTable(styleDef, style, partentStyleDef)}`;

                },
                buildStyleDescription = function (styleDef, style) {
                    let output = "";
                    if (style.affinity != "") {
                        output += `<span>Affinity: ${style.affinity}</span>\n`;
                    }
                    output += `<span><em>Main Skills: ${printStyleSkills(style)}</em></span>\n`;
                    
                    if (style.isPermanent) {
                        output += `<span><em>Permanent Style.</em></span>\n<span><em>This style does not need to be equipped. All learned techniques are always available.</em></span>\n`;
                    }
                    let desc = styleDef.getDescription();
                    if (desc != "") {
                        output += `<span>&nbsp;</span>\n<span>${styleDef.getDescription()}</span>`;
                    }
                    return WuxSheetMain.Desc(output);
                },
                printStyleSkills = function (style) {
                    if (style.skills == "") {
                        return "None";
                    }
                    else {
                        let skillsOutput = "";
                        let skillSplit = style.skills.split(";");
                        for (let i = 0; i < skillSplit.length; i++) {
                            if (skillsOutput != "") {
                                skillsOutput += "; ";
                            }
                            let skillData = skillSplit[i].split(":");
                            if (skillData.length > 1 && skillData[1] == "group") {
                                skillsOutput += `Any ${skillData[0]}`;
                            }
                            else {
                                skillsOutput += `${skillData[0]}`;
                            }
                        }
                        return skillsOutput;
                    }
                },

                buildStyleTechniquesFlexTable = function (styleDef, style, partentStyleDef) {
                    let techFilterData = WuxTechs.Filter(new DatabaseFilterData("style", style.name));
                    let techStyles = [];
                    for (let i = 0; i < techFilterData.length; i++) {
                        techStyles.push(buildStyleTechniquesFlexTableEntry(styleDef, techFilterData[i], partentStyleDef));
                    }
                    if (techStyles.length == 0) {
                        return "";
                    }
                    return WuxSheetMain.MultiRowGroup(techStyles, WuxSheetMain.Table.FlexTable, 2);
                },
                buildStyleTechniquesFlexTableEntry = function (styleDef, technique, partentStyleDef) {
                    let contents = buildTechnique(styleDef, technique, partentStyleDef);
                    return `${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(contents), " wuxMinWidth300")}`;
                },
                buildTechnique = function (styleDef, technique, partentStyleDef) {
                    let techDef = technique.createDefinition(WuxDef.Get("Technique"));
                    let infoButton = WuxSheetMain.Info.Button(techDef.getAttribute(WuxDef._info), `value="${technique.name}"`);
                    let interactHeader = `<span class="wuxHeader">${technique.name}</span>`;
                    let prerequisites = technique.getPrerequisites();
                    if (prerequisites != "") {
                        interactHeader = `<span>${interactHeader}<div class="wuxSubheader">[Prereq: ${prerequisites}]</div></span>`;
                    }
                    
                    if (styleDef.subGroup == "Style") {
                        return `<div class="wuxInteractiveBlock">
                        ${infoButton}
                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(techDef.getAttribute(), interactHeader)}
                        </div>`;
                    }
                    
                    return WuxSheetMain.HiddenFieldToggle(partentStyleDef.getAttribute(WuxDef._learn),
                        `<div class="wuxInteractiveBlock">
                        ${infoButton}
                        ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(techDef.getAttribute(), interactHeader)}
                        </div>`,
                    `<div class="wuxInteractiveBlock">${infoButton}
                            <div class="wuxInteractiveInnerBlock">
                                <div class="wuxInteractiveContent">${interactHeader}</div>
                            </div></div>`
                    );
                },
                
                getStyleTraits = function (style) {
                    let output = "";
                    let traits = WuxDef.GetValues(style.effects, ";");
                    for(let i = 0; i < traits.length; i++) {
                        output += printDefinitionTooltip(traits[i]);
                    }
                    if (output == "") {
                        return "None";
                    }
                    return output;
                },
                
                printDefinitionTooltip = function (definition) {
                    let subGroup = "";
                    if (definition.subGroup != "") {
                        subGroup = `<span class="wuxDescription"><em>${definition.subGroup}</em></span>`;
                    }
                    let description = "";
                    for (let j = 0; j < definition.descriptions.length; j++) {
                        description += `<span class="wuxDescription">${definition.descriptions[j]}</span>`;
                    }
                    return `<span class="wuxTooltip">
                        <span class="wuxTooltipText">${definition.getTitle()}</span>
                        <div class="wuxTooltipContent">
                            <div class="wuxHeader2">${definition.getTitle()}</div>
                            ${subGroup}
                            ${description}
                        </div>
                    </span>`;
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
                    return WuxSheetSidebar.Build("", buildTechPointsSection(WuxDef.GetAttribute("Technique")));
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
                    let filteredData = WuxDef.Filter([new DatabaseFilterData("group", "StyleGroup")]);
                    for (let i = 0; i < filteredData.length; i++) {
                        let subFilteredData = WuxDef.Filter([
                            new DatabaseFilterData("subGroup", filteredData[i].getTitle()),
                            new DatabaseFilterData("group", "StyleSubGroup")
                        ]);

                        let styleOutput = "";
                        for (let j = 0; j < subFilteredData.length; j++) {

                            let techFilterData = stylesDatabase.filter([
                                new DatabaseFilterData("group", "Advanced"),
                                new DatabaseFilterData("subGroup", subFilteredData[j].getTitle())
                            ]);
                            let techStyles = [];
                            for (let k = 0; k < techFilterData.length; k++) {
                                techStyles.push(buildStyleGroupFlexTableEntry(techFilterData[k]));
                            }
                            if (techStyles.length == 0) {
                                continue;
                            }
                            styleOutput += WuxSheetMain.Header(subFilteredData[j].getTitle());
                            styleOutput += WuxSheetMain.Table.FlexTable(techStyles);
                        }
                        if (styleOutput != "") {
                            contents += buildTechniqueStyleGroupTab(styleOutput, filteredData[i].name, filteredData[i].getTitle());
                        }
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