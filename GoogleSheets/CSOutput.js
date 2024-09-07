function CreateCharacterSheet(stylesArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString) {
	let sheetsDb = SheetsDatabase.CreateDatabaseCollection(
		stylesArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString
	);
	return PrintLargeEntry(BuildCharacterSheet.Print(sheetsDb));
}

var BuildCharacterSheet = BuildCharacterSheet || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			output += buildCharacterSheetHtml(sheetsDb);
			output += buildHiddenFields(sheetsDb);
			output += buildSheetWorkerContainer(sheetsDb);
			return output;
		},

		buildCharacterSheetHtml = function (sheetsDb) {
			let output = "";
			output += DisplayOriginSheet.Print(sheetsDb);
			output += DisplayTrainingSheet.Print(sheetsDb);
			output += DisplayAdvancementSheet.Print(sheetsDb);
			output += DisplayTechniquesSheet.Print(sheetsDb);
			output += DisplayCoreCharacterSheet.Print(sheetsDb);
			output += DisplayGearSheet.Print(sheetsDb);
			return `<div class="wuxCharacterSheet">\n${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("Page"), "Origin")}\n${output}\n</div>`;
		},

		buildHiddenFields = function (sheetsDb) {
			let output = "";
			output += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn));

			return `<div class="wuxHiddenFields">
			${output}
			</div>`;
		},

		buildSheetWorkerContainer = function (sheetsDb) {
			let output = "";
			output += BuilderBackend.Print(sheetsDb);
			output += TrainingBackend.Print(sheetsDb);
			output += AdvancementBackend.Print(sheetsDb);
			return `<script type="text/worker">
			on("sheet:opened", function(eventinfo) {
				on_sheet_opened();
			});
			${output}
			`;
		}
		;
	return {
		Print: print
	};
}());

var DisplayOriginSheet = DisplayOriginSheet || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
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
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Advancement"))
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
        			        let contents = WuxSheetMain.MultiRowGroup([buildOrigin(), buildOriginStats(), buildAdvancement(), buildTraining()], WuxSheetMain.Table.FlexTable, 2);
        			        contents = WuxSheetMain.TabBlock(contents);
							
        			        let definition = WuxDef.Get("Page_Origin");
        				    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
						},

						buildOrigin = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_Origin"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Display Name"), WuxDef.GetAttribute("Display Name"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
							contents += WuxDefinition.BuildTextarea(WuxDef.Get("Background"), WuxDef.GetAttribute("Background"), "wuxInput wuxHeight150");
							return WuxSheetMain.Table.FlexTableGroup(contents);
						},

						buildOriginStats = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginStats"));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("Affinity"), WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("Affinity", WuxDef._learn));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("InnateDefense"), WuxDef.GetAttribute("InnateDefense"), WuxDef.Filter([new DatabaseFilterData("group", "InnateDefenseType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("InnateDefense", WuxDef._learn));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("InnateSense"), WuxDef.GetAttribute("InnateSense"), WuxDef.Filter([new DatabaseFilterData("group", "InnateSenseType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("InnateSense", WuxDef._learn));
							return WuxSheetMain.Table.FlexTableGroup(contents);
						},

						buildAdvancement = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginAdvancement"));
							contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
							contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR")));
							contents += WuxDefinition.BuildText(WuxDef.Get("Advancement"), 
								`${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Advancement", WuxDef._max))}`);
							contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementJob"), WuxDef.GetAttribute("AdvancementJob"), `cost: 2 advancement points`);
							contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementSkill"), WuxDef.GetAttribute("AdvancementSkill"), `cost: 2 advancement points`);
							contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("AdvancementTechnique"), WuxDef.GetAttribute("AdvancementTechnique"), `cost: 1 advancement point`);
							return WuxSheetMain.Table.FlexTableGroup(contents);
						},

						buildTraining = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
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
	;
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

		printTraining = function (sheetsDb) {
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
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Training")));
				},
				printKnowledge = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Knowledge")));
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

						buildConversion = function() {
							let contents = "";
							let titleDefinition = WuxDef.Get("Title_TrainingConversion");
							contents +=  WuxDefinition.InfoHeader(titleDefinition);

							let ppDefinition = WuxDef.Get("PP");
							contents += WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.getFormulaValue()}</span>`);
							contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To TP`));

							return WuxSheetMain.Table.FlexTableGroup(contents);
						},

						buildTraining = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
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
					return WuxSheetMain.Build(buildLoreData.Build(loreDictionary) + buildLanguageData.Build(languageDictionary));
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
							return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(knowledgeDefinition.getAttribute(WuxDef._rank),
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
								}
								else {
									output += buildSubLore(knowledgeDataArray[i]);
								}
							}
							return output;
						},

						buildLore = function (knowledgeDefinition, groupName, interactHeader) {
							return WuxSheetMain.InteractionElement.BuildTooltipSelectInput(knowledgeDefinition.getAttribute(WuxDef._rank),
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
	;
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

		printAdvancement = function (sheetsDb) {
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
				MainContentData.PrintJobs(sheetsDb.job, sheetsDb.role, sheetsDb.techniques);
			return WuxSheet.PageDisplay("Jobs", output);
		},

		printSkills = function (sheetsDb) {
			let definition = WuxDef.Get("Page_Skills");
			let output = WuxSheetNavigation.BuildAdvancementPageNavigation(definition) +
				SideBarData.PrintSkills() +
				MainContentData.PrintSkills(sheetsDb.skills);
			return WuxSheet.PageDisplay("Skills", output);
		},

		printAttributes = function (sheetsDb) {
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
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Advancement")));
				},

				printJobs = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Job")));
				},

				printSkills = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Skill")));
				},

				printAttributes = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Attribute")));
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

					buildConversion = function() {
						let contents = "";
						let titleDefinition = WuxDef.Get("Title_AdvancementConversion");
						contents +=  WuxDefinition.InfoHeader(titleDefinition);

						let xpDefinition = WuxDef.Get("XP");
						contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.getFormulaValue()}</span>`);
						contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Convert To Levels`));

						return WuxSheetMain.Table.FlexTableGroup(contents);
					},

					buildAdvancement = function () {
						let contents = "";
						let titleDefinition = WuxDef.Get("Title_Advancement");
						contents +=  WuxDefinition.InfoHeader(titleDefinition);
						contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
						contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR")));
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

				printJobs = function (jobsDictionary, rolesDictionary, techDictionary) {
					let contents = "";

					contents += buildJobs.Build(jobsDictionary, techDictionary);

					return WuxSheetMain.Build(contents);
				},

				buildJobs = buildJobs || (function () {
					'use strict';

					var
						build = function (jobsDictionary, techDictionary) {
							let jobs = [];
							jobsDictionary.iterate(function (job) {
								jobs.push(buildJob(job, techDictionary));
							});
							let output = WuxSheetMain.MultiRowGroup(jobs, WuxSheetMain.Table.FlexTable, 2);
							output = WuxSheetMain.TabBlock(output);

							let definition = WuxDef.Get("Job");
							return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, output);
						},

						buildJob = function (job, techDictionary) {
							let jobDefinition = WuxDef.Get("Job");
							let jobDef = job.createDefinition(jobDefinition);

							let contents = `${buildJobHeader(jobDef, job)}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(jobDef.getAttribute(WuxDef._expand),
								WuxSheetMain.SectionBlockContents(buildJobContents(job, jobDef, techDictionary)))}`;

							return WuxSheetMain.SectionBlock(contents);
						},

						buildJobHeader = function (jobDef, job) {
							return WuxSheetMain.Header2(`${WuxSheetMain.InteractionElement.ExpandableBlockIcon(jobDef.getAttribute(WuxDef._expand))}
								${WuxSheetMain.Select(jobDef.getAttribute(WuxDef._rank), 
								WuxDef.Filter([new DatabaseFilterData("group", "JobTier")]), false, "wuxWidth70 wuxMarginRight10")}
								${job.name}`
							);
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
								techniques = techDictionary.filter([new DatabaseFilterData("techSet", job.name), new DatabaseFilterData("tier", i)]);
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
					let contents = buildSkills.Build(skillDictionary);
					return WuxSheetMain.Build(contents);
				},

				buildSkills = buildSkills || (function () {
					'use strict';

					var
						build = function (database) {
        			        let contents = WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2);
        			        contents = WuxSheetMain.TabBlock(contents);
        			        
        			        let definition = WuxDef.Get("Page_Skills");
        				    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
						},

						buildGroups = function (database) {
							let output = [];
							let groupName = "";
							let filterSettings = [new DatabaseFilterData("group", "")];
							let filteredData = {};
							let skillGroups = database.getPropertyValues("group");
							skillGroups = skillGroups.sort();
							for (let i = 0; i < skillGroups.length; i++) {
								if (skillGroups[i] == "") {
									continue;
								}
								groupName = skillGroups[i];
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
							
							return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(skillDefinition.getAttribute(WuxDef._rank),
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
							    expandContents += WuxSheetMain.Header2(formulaDefinitions[i].title, "span");
								expandContents += "<br />";
								expandContents += WuxDefinition.DefinitionContents(formulaDefinitions[i]);
							}
							let expandFieldName = attributeDefinition.getAttribute(WuxDef._expand);
							contents += WuxSheetMain.InteractionElement.Build(true, `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
							${WuxSheetMain.Header("Affected Stats")}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`);
							
							let header = `${attributeDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(attributeDefinition))}`;
							let output = WuxSheetMain.Table.FlexTableHeader(header);
							output += WuxSheetMain.Table.FlexTableData(contents);
							return WuxSheetMain.Table.FlexTableGroup(output, "wuxMinWidth150");
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
				MainContentData.Print(sheetsDb.styles, sheetsDb.job, sheetsDb.techniques);
			return WuxSheet.PageDisplay("Technique", output);
		},

		printTest = function (stylesDatabase, techniqueDatabase) {
			let filters = [new DatabaseFilterData("group", "Standard")];
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
					let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
					${WuxSheet.PageDisplay("Techniques", buildTechPointsSection(WuxDef.GetAttribute("Technique")))}
					${WuxSheet.PageDisplay("Styles", buildTechPointsSection(WuxDef.GetAttribute("JobStyle"), "Job") + buildTechPointsSection(WuxDef.GetAttribute("Style"), "Standard"))}
					${WuxSheet.PageDisplay("Actions", "<div>&nbsp;</div>")}`;
					
					return WuxSheetSidebar.Build(output);
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
				print = function (stylesDatabase, jobDatabase, techniqueDatabase) {

					return WuxSheetMain.Build(buildTechniquesByGroup(stylesDatabase, jobDatabase, techniqueDatabase, WuxDef.Get("Technique")));
				},

				buildTechniquesByGroup = function (stylesDatabase, jobDatabase, techniqueDatabase, techniqueDefinition) {
					let displayOptions = getDisplayOptions(techniqueDefinition);
					let output = "";
					displayOptions.hasSelect = false;
					output += buildJobStyle(jobDatabase, techniqueDatabase, displayOptions);
					displayOptions.hasSelect = true;
					output += buildStyle(stylesDatabase, techniqueDatabase, "Standard", displayOptions);
					displayOptions.hasSelect = false;
					output += buildStyle(stylesDatabase, techniqueDatabase, "Basic", displayOptions);
					return output;
				},

				getDisplayOptions = function (techniqueDefinition) {
					let displayOptions = WuxPrintTechnique.GetDisplayOptions();
					displayOptions.techniqueDefinition = techniqueDefinition;
					displayOptions.hasCSS = true;
					return displayOptions;
				},

				buildJobStyle = function (jobDatabase, techniqueDatabase, displayOptions) {
					let groupName = "Job";
					let techStyles = [];
					jobDatabase.iterate(function (value) {
						if (value != undefined) {
							techStyles.push(buildJobStyleSection(value, techniqueDatabase, displayOptions));
						}
					});
					let output = WuxSheetMain.Table.FlexTable(techStyles);
					output = WuxSheetMain.TabBlock(output);
					let definition = WuxDef.Get("StyleType");

					return `${WuxSheetMain.CustomInput("hidden", definition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(definition.getAttribute(groupName, WuxDef._expand), `${groupName} ${definition.title}`, output)}`;
				},

				buildJobStyleSection = function (job, techniqueDatabase, displayOptions) {
					let jobDef = job.createDefinition(WuxDef.Get("Job"));

					let contents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(jobDef.getAttribute(WuxDef._expand))}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(jobDef.getAttribute(), WuxSheetMain.Header(job.name))}
					${WuxSheetMain.SectionBlockHeaderFooter()}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(jobDef.getAttribute(WuxDef._expand),
						WuxSheetMain.SectionBlockContents(buildStyleContents(jobDef, techniqueDatabase, displayOptions)))}`;

					return `${WuxSheetMain.CustomInput("hidden", jobDef.getAttribute(WuxDef._filter), "wuxFlexTableItemGroup-flag", ` value="0"`)}
					${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents)))}`;
				},

				buildStyle = function (stylesDatabase, techniqueDatabase, groupName, displayOptions) {
					let filters = [new DatabaseFilterData("group", groupName)];
					let filteredData = stylesDatabase.filter(filters);

					let techStyles = [];
					for (let i = 0; i < filteredData.length; i++) {
						techStyles.push(buildTechStyleSection(filteredData[i], techniqueDatabase, displayOptions));
					}
					let output = WuxSheetMain.Table.FlexTable(techStyles);
					output = WuxSheetMain.TabBlock(output);
					let definition = WuxDef.Get("StyleType");

					return `${WuxSheetMain.CustomInput("hidden", definition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(definition.getAttribute(groupName, WuxDef._expand), `${groupName} ${definition.title}`, output)}`;
				},

				buildTechStyleSection = function (style, techniqueDatabase, displayOptions) {
					let styleDef = style.createDefinition(WuxDef.Get("Style"));
					let tabFieldName = WuxDef.GetAttribute("Page");

					let interactionHeader = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(styleDef.getAttribute(WuxDef._expand))}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(styleDef.getAttribute(), WuxSheetMain.Header(style.name))}`;
					let normalHeader = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(styleDef.getAttribute(WuxDef._expand))} ${WuxSheetMain.Header(style.name)}`;

					let contents = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
					${WuxSheet.PageDisplay("Techniques", normalHeader)}
					${WuxSheet.PageDisplay("Styles", interactionHeader)}
					${WuxSheet.PageDisplay("Actions", normalHeader)}
					${WuxSheetMain.SectionBlockHeaderFooter()}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(styleDef.getAttribute(WuxDef._expand),
						WuxSheetMain.SectionBlockContents(buildStyleContents(styleDef, techniqueDatabase, displayOptions)))}`;

					return `${WuxSheetMain.CustomInput("hidden", styleDef.getAttribute(WuxDef._filter), "wuxFlexTableItemGroup-flag", ` value="0"`)}
					${WuxSheetMain.Table.FlexTableGroup(WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents)))}`;
				},

				buildStyleContents = function (styleDef, techniqueDatabase, displayOptions) {
					let contents = "";
					contents += buildStyleLearn(styleDef);
					contents += buildStyleDescription(styleDef);
					contents += buildTechniques(styleDef, techniqueDatabase, displayOptions);
					return contents;
				},

				buildStyleDescription = function (styleDef) {
					return `${WuxSheetMain.Header2(`Description`)}
					${WuxSheetMain.Desc(styleDef.getDescription())}`;
				},

				buildStyleLearn = function (styleDef) {
					let filterFieldName = styleDef.getAttribute(WuxDef._subfilter);
					let tooltip = WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(WuxDef.Get("LearnStyle")));

					let learnStyle = WuxSheetMain.HiddenAuxField(filterFieldName,
						WuxSheetMain.Header2(WuxSheetMain.InteractionElement.CheckboxBlockIcon(styleDef.getAttribute(), "Learn Style") + tooltip))
						+ WuxSheetMain.HiddenField(filterFieldName, WuxSheetMain.Header2("Learn Style" + tooltip))
						+ WuxSheetMain.Desc(`<strong>Requirements</strong>\n${styleDef.extraData.requirements}`);
					
					let tabFieldName = WuxDef.GetAttribute("Page");
					return `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
						${WuxSheet.PageDisplay("Techniques", learnStyle)}`;
				},

				buildTechniques = function (styleDef, techniqueDatabase, displayOptions) {
					let output = WuxSheetMain.Header(`<span>Techniques</span>`);

					let filters = [new DatabaseFilterData("techSet", styleDef.title)];
					let filterFieldName = WuxDef.GetAttribute("Technique", WuxDef._filter);
					let learnedTechs = createTechniquesByRequirements(techniqueDatabase.filter(filters), displayOptions);
					let freeTechs = learnedTechs.get("Free");
					let techHeader = WuxSheetMain.Header2(`Free Techniques ${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(WuxDef.Get("StyleFreeTechniques")))}`);
					if (freeTechs.length > 0) {
						output += WuxSheetMain.HiddenField(filterFieldName, techHeader);
						for (let i = 0; i < freeTechs.length; i++) {
							output += `\n${freeTechs[i]}`;
						}
					}
					else {
						output += `${WuxSheetMain.HiddenField(filterFieldName, techHeader + WuxSheetMain.Desc("None"))}\n`;
					}

					let tierData = {};
					for (let tier = 0; tier <= 5; tier++) {
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
							output += `${WuxSheetMain.HiddenField(filterFieldName, WuxSheetMain.Header2(`${techHeader} ${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(WuxDef.Get("StyleTechniques")))}`))}`;
							for (let i = 0; i < affinityData.length; i++) {
								output += `\n${affinityData[i]}`;
							}
						});
					}
					return `${output}\n`;
				},

				createTechniquesByRequirements = function (techniques, displayOptions) {
					let technique = {};
					let techDef;

					let techniquesByRequrements = new Dictionary();
					techniquesByRequrements.add("Free", []);
					for (var i = 0; i <= 5; i++) {
						techniquesByRequrements.add(i, new Dictionary());
					}
					
					for (var i = 0; i < techniques.length; i++) {
						technique = new TechniqueData(techniques[i]);
						if (technique.isFree) {
							techniquesByRequrements.get("Free").push(buildTechnique(technique, displayOptions));
						}
						else {
							techDef = technique.createDefinition(WuxDef.Get("Technique"));
							if (!techniquesByRequrements.get(techDef.extraData.tier).has(techDef.extraData.affinity)) {
								techniquesByRequrements.get(techDef.extraData.tier).add(techDef.extraData.affinity, []);
							}
							techniquesByRequrements.get(techDef.extraData.tier).get(techDef.extraData.affinity).push(buildTechnique(technique, displayOptions));
						}
					}

					return techniquesByRequrements;
				},

				buildTechnique = function (technique, displayOptions) {
					let techDef = technique.createDefinition(WuxDef.Get("Technique"));
					let fieldName = techDef.getAttribute(WuxDef._filter);

					let output = "";
					output += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="0">`;
					output += WuxPrintTechnique.Get(technique, displayOptions);
					return output;
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
			output += printOrigin(sheetsDb);
			output += printChat(sheetsDb);
			output += printOptions(sheetsDb);
			return WuxSheet.PageDisplay("Character", output);
		},

		printOverview = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildOverviewPageNavigation("Overview") +
				SideBarData.PrintOverview() +
				MainContentData.PrintOverview();
			return WuxSheet.PageDisplay("Overview", output);
		},

		printDetails = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildOverviewPageNavigation("Details") +
				SideBarData.PrintDetails() +
				MainContentData.PrintDetails();
			return WuxSheet.PageDisplay("Details", output);
		},

		printOrigin = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildOverviewPageNavigation("Origin") +
				SideBarData.PrintOrigin() +
				MainContentData.PrintOrigin();
			return WuxSheet.PageDisplay("Origin", output);
		},

		printChat = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildOverviewPageNavigation("Chat") +
				SideBarData.PrintChat() +
				MainContentData.PrintChat();
			return WuxSheet.PageDisplay("Chat", output);
		},

		printOptions = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildOverviewPageNavigation("Options") +
				SideBarData.PrintOptions() +
				MainContentData.PrintOptions();
			return WuxSheet.PageDisplay("Options", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printOverview = function () {
					
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				},
				printDetails = function () {
					
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				},
				printOrigin = function () {
					
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				},
				printChat = function () {
					
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				},
				printOptions = function () {
					
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				}

			return {
				PrintOverview: printOverview,
				PrintDetails: printDetails,
				PrintOrigin: printOrigin,
				PrintChat: printChat,
				PrintOptions: printOptions
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
        			        contents += basics();
							contents += WuxSheetMain.MultiRowGroup([advancement(), training()], WuxSheetMain.Table.FlexTable, 2);
        			        
        			        contents = WuxSheetMain.TabBlock(contents);
        			        
        			        let definition = WuxDef.Get("Page_Overview");
        				    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
        			    },
        			    
        			    basics = function () {
        			        let contents = "";
        			        contents += WuxDefinition.BuildText(WuxDef.Get("Full Name"), WuxSheetMain.Span(WuxDef.GetAttribute("Full Name")));
        			        return contents;
        			    },
        			    
        			    advancement = function () {
        			        let contents = "";
							let titleDefinition = WuxDef.Get("Title_Advancement");
        			        contents +=  WuxDefinition.InfoHeader(titleDefinition);

							contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

							let levelDefinition = WuxDef.Get("Level");
        			        contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute()));

							let xpDefinition = WuxDef.Get("XP");
        			        contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `To Level: ${xpDefinition.getFormulaValue()}</span>`);
							
							return WuxSheetMain.Table.FlexTableGroup(contents, "wuxMinWidth150");
        			    },
        			    
        			    training = function () {
        			        let contents = "";
							let titleDefinition = WuxDef.Get("Title_Training");
        			        contents +=  WuxDefinition.InfoHeader(titleDefinition);

							contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

							let levelDefinition = WuxDef.Get("Training");
        			        contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute(WuxDef._max)));

							let ppDefinition = WuxDef.Get("PP");
        			        contents += WuxDefinition.BuildNumberLabelInput(ppDefinition, ppDefinition.getAttribute(), `To Training Point: ${ppDefinition.getFormulaValue()}</span>`);
							
							return WuxSheetMain.Table.FlexTableGroup(contents, "wuxMinWidth150");
        			    }
        			    
        			    return {
        			        Build : build
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
							contents += createStatGroup("Social");
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
							}
							else {
								contents += createStatBlockValue(statDefinition.getAttribute());
							}
							contents = WuxSheetMain.Table.FlexTable(contents);

							let output = WuxSheetMain.Table.FlexTableHeader(header);
							output += WuxSheetMain.Table.FlexTableData(contents);
							return WuxSheetMain.Table.FlexTableGroup(output, "wuxMinWidth150");
						},

						createStatBlockValue = function (fieldName) {
							return WuxSheetMain.Table.FlexTableGroup(`<span class="wuxFlexTableItemData wuxTextCenter" name="${fieldName}">0</span>`, "wuxMinWidth100");
						},

						createStatBlockValueWithHeader = function (name, fieldName) {
							return WuxSheetMain.Table.FlexTableGroup(`${WuxSheetMain.Table.FlexTableSubheader(name)}
							<span class="wuxFlexTableItemData wuxTextCenter" name="${fieldName}">0</span>`, "wuxMinWidth100");
						}
        			    
        			    return {
        			        Build : build
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
							
							return contents;
						},

						buildOrigin = function () {
							let contents = "";
							contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_Origin"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"));
							contents += WuxDefinition.BuildTextarea(WuxDef.Get("Background"), WuxDef.GetAttribute("Background"), "wuxInput wuxHeight150");
							contents = WuxSheetMain.Table.FlexTableGroup(contents);
							
							let definition = WuxDef.Get("Page_Origin");
							return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
						},

						buildOriginStats = function () {
							let contents = "";
							contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginStats"));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("Affinity"), WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("Affinity", WuxDef._learn));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("InnateDefense"), WuxDef.GetAttribute("InnateDefense"), WuxDef.Filter([new DatabaseFilterData("group", "InnateDefenseType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("InnateDefense", WuxDef._learn));
							contents += WuxDefinition.BuildSelect(WuxDef.Get("InnateSense"), WuxDef.GetAttribute("InnateSense"), WuxDef.Filter([new DatabaseFilterData("group", "InnateSenseType")]));
							contents += WuxSheetMain.DescField(WuxDef.GetAttribute("InnateSense", WuxDef._learn));
							return WuxSheetMain.Table.FlexTableGroup(contents);
						}
        			    
        			    return {
        			        Build : build
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

							let definition = WuxDef.Get("Page_Chat");
							return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
        			    },

						createChatDisplay = function () {

						}
        			    
        			    return {
        			        Build : build
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
        			        Build : build
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
	;
	return {
		Print: print
	};
}());

var DisplayGearSheet = DisplayGearSheet || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			output += printEquipment(sheetsDb);
			return output;
		},

		printEquipment = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildGearPageNavigation("Gear") +
				SideBarData.PrintEquipment() +
				MainContentData.PrintEquipment();
			return WuxSheet.PageDisplay("Gear", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printEquipment = function () {
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
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
        				    return contents;
        			    }
        			    
        			    return {
        			        Build : build
        			    }
				}())

			return {
				PrintEquipment: printEquipment
			}
		}());
	;
	return {
		Print: print
	};
}());


var BuilderBackend = BuilderBackend || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			output += listenerUpdatePageState();
			output += listenerCharacterCreationFinishButton();
			output += listenerCharacterCreationSetAffinity();
			output += listenerSetInnateDefense();
			output += listenerSetInnateSense();
			output += listenerUpdateTechniqueBuildPoints();
			output += listenerUpdateStyleBuildPoints();
			output += listenerUpdateJobStyleBuildPoints();
			return output;

		},

		listenerUpdatePageState = function() {
			let groupVariableNames = [WuxDef.GetVariable("Page")];
			let output = `WuxWorkerGeneral.UpdatePageState(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
				
		listenerCharacterCreationFinishButton = function() {
			let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
			let output = `WuxWorkerCharacterCreation.FinishBuild();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerCharacterCreationSetAffinity = function() {
			let groupVariableNames = [WuxDef.GetVariable("Affinity")];
			let output = `WuxWorkerCharacterCreation.SetAffinityValue();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetInnateDefense = function() {
			let groupVariableNames = [WuxDef.GetVariable("InnateDefense")];
			let output = `WuxWorkerCharacterCreation.SetInnateDefense();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetInnateSense = function() {
			let groupVariableNames = [WuxDef.GetVariable("InnateSense")];
			let output = `WuxWorkerCharacterCreation.SetInnateSense();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateTechniqueBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Technique"));
			let output = `WuxWorkerTechniques.UpdateTechniqueBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateStyleBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"));
			let output = `WuxWorkerTechniques.UpdateStyleBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateJobStyleBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"));
			let output = `WuxWorkerTechniques.UpdateJobStyleBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		}

	return {
		Print: print
	}
}())

var TrainingBackend = TrainingBackend || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
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
		listenerTrainingGoToPageSet = function() {
			let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
			let output = `WuxWorkerTraining.GoToPageSet();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerTrainingFinishButton = function() {
			let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._finish)];
			let output = `WuxWorkerTraining.FinishBuild();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerTrainingExitButton = function() {
			let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._exit)];
			let output = `WuxWorkerTraining.ExitBuild();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerConvertPp = function() {
			let groupVariableNames = [WuxDef.GetVariable("Title_TrainingConversion")];
			let output = `WuxWorkerTraining.ConvertPp();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetTrainingPoints = function() {
			let groupVariableNames = [WuxDef.GetVariable("Training", WuxDef._max)];
			let output = `WuxWorkerTraining.SetTrainingPoints(eventinfo);\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetTrainingPointsUpdate = function() {
			let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
			let output = `WuxWorkerTraining.SetTrainingPointsUpdate(eventinfo);\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateKnowledgeBuildPoints = function() {
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
		print = function (sheetsDb) {
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
		listenerGoToPageSet = function() {
			let groupVariableNames = [WuxDef.GetVariable("Title_Advancement")];
			let output = `WuxWorkerAdvancement.GoToPageSet();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerFinishButton = function() {
			let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._finish)];
			let output = `WuxWorkerAdvancement.FinishBuild();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerExitButton = function() {
			let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._exit)];
			let output = `WuxWorkerAdvancement.ExitBuild();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerConvertXp = function() {
			let groupVariableNames = [WuxDef.GetVariable("Title_AdvancementConversion")];
			let output = `WuxWorkerAdvancement.ConvertXp();\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetLevel = function() {
			let groupVariableNames = [WuxDef.GetVariable("Level")];
			let output = `WuxWorkerAdvancement.SetLevel(eventinfo);\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerSetAdvancementPoints = function() {
			let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
			let output = `WuxWorkerAdvancement.SetAdvancementPointsUpdate(eventinfo);\n`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},

		listenerUpdateJobBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job"), WuxDef._rank);
			let output = `WuxWorkerJobs.UpdateBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateSkillBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Skill"), WuxDef._rank);
			let output = `WuxWorkerSkills.UpdateBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		},
		listenerUpdateAttributeBuildPoints = function() {
			let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Attribute"));
			let output = `WuxWorkerAttributes.UpdateBuildPoints(eventinfo)`;

			return WuxSheetBackend.OnChange(groupVariableNames, output, true);
		}
	return {
		Print: print
	}
}())

