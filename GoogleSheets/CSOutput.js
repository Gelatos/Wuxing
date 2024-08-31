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
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
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
							return WuxSheetMain.Table.FlextTableGroup(contents);
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
							return WuxSheetMain.Table.FlextTableGroup(contents);
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
							return WuxSheetMain.Table.FlextTableGroup(contents);
						},

						buildTraining = function () {
							let contents = "";
        			        contents +=  WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginTraining"));
							contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Training"), WuxDef.GetAttribute("Training", WuxDef._max));
							contents += WuxSheetMain.Desc(`${WuxSheetMain.Span(WuxDef.GetAttribute("Training"))} / ${WuxSheetMain.Span(WuxDef.GetAttribute("Training", WuxDef._max))}`);
							
							contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingKnowledge"), WuxDef.GetAttribute("TrainingKnowledge"), `cost: 1 training point`);
							contents += WuxDefinition.BuildNumberLabelInput(WuxDef.Get("TrainingTechniques"), WuxDef.GetAttribute("TrainingTechniques"), `cost: 1 training point`);
							return WuxSheetMain.Table.FlextTableGroup(contents);
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
        			        let contents = "";
        			        contents += basics();

        			        contents = WuxSheetMain.TabBlock(contents);

        			        let definition = WuxDef.Get("Page_Training");
        				    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
        			    },
        			    
        			    basics = function () { 
        			        let contents = "";
        			        contents += WuxDefinition.BuildText(WuxDef.Get("Full Name"), WuxSheetMain.Span(WuxDef.GetAttribute("Full Name")));
        			        return contents;
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
							return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
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
							return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
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
			output += printJobs(sheetsDb);
			output += printSkills(sheetsDb);
			output += printAttributes(sheetsDb);
			return output;
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
				PrintJobs: printJobs,
				PrintSkills: printSkills,
				PrintAttributes: printAttributes
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
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
							return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
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
							return WuxSheetMain.Table.FlextTableGroup(output, "wuxMinWidth200");
						}
						;
					return {
						Build: build
					}
				}());

			return {
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
			return WuxSheet.PageDisplay("Styles", output);
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
					let output = ``;
					output += WuxSheetMain.HiddenField(WuxDef.GetAttribute("Technique", WuxDef._filter), buildTechPointsSection(WuxDef.GetAttribute("Technique")));
					output += WuxSheetMain.HiddenAuxField(WuxDef.GetAttribute("Technique", WuxDef._filter), 
						buildTechPointsSection(WuxDef.GetAttribute("JobStyle"), "Job") + buildTechPointsSection(WuxDef.GetAttribute("Style"), "Standard")
					);
					
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
					output += buildJobStyle(jobDatabase, techniqueDatabase, displayOptions);
					output += buildStyle(stylesDatabase, techniqueDatabase, "Standard", displayOptions);
					return output;
				},

				getDisplayOptions = function (techniqueDefinition) {
					let displayOptions = WuxPrintTechnique.GetDisplayOptions();
					displayOptions.techniqueDefinition = techniqueDefinition;
					displayOptions.hasCSS = true;
					displayOptions.showSelect = true;
					return displayOptions;
				},

				buildJobStyle = function (jobDatabase, techniqueDatabase, displayOptions) {
					let groupName = "Job";
					let techStyles = [];
					for (let i = 0; i < jobDatabase.length; i++) {
						techStyles.push(buildTechStyleSection(jobDatabase[i], techniqueDatabase, displayOptions));
					}
					let output = WuxSheetMain.MultiRowGroup(techStyles, WuxSheetMain.Table.FlexTable, 2);
					output = WuxSheetMain.TabBlock(output);
					let definition = WuxDef.Get("StyleType");

					return `${WuxSheetMain.CustomInput("hidden", definition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(definition.getAttribute(groupName, WuxDef._expand), `${groupName} ${definition.title}`, output)}`;
				},

				buildStyle = function (stylesDatabase, techniqueDatabase, groupName, displayOptions) {
					let filters = [new DatabaseFilterData("group", groupName)];

					let filteredData = stylesDatabase.filter(filters);

					let techStyles = [];
					for (let i = 0; i < filteredData.length; i++) {
						techStyles.push(buildTechStyleSection(filteredData[i], techniqueDatabase, displayOptions));
					}
					let output = WuxSheetMain.MultiRowGroup(techStyles, WuxSheetMain.Table.FlexTable, 2);
					output = WuxSheetMain.TabBlock(output);
					let definition = WuxDef.Get("StyleType");

					return `${WuxSheetMain.CustomInput("hidden", definition.getAttribute(groupName, WuxDef._filter), "wuxFilterSegment-flag", ` value="0"`)}
					${WuxSheetMain.CollapsibleTab(definition.getAttribute(groupName, WuxDef._expand), `${groupName} ${definition.title}`, output)}`;
				},

				buildTechStyleSection = function (style, techniqueDatabase, displayOptions) {

					let styleDefinition = WuxDef.Get("Style");
					let styleDef = style.createDefinition(styleDefinition);

					let contents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(styleDef.getAttribute(WuxDef._expand))}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(styleDef.getAttribute(), WuxSheetMain.Header(style.name))}
					${WuxSheetMain.SectionBlockHeaderFooter()}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(styleDef.getAttribute(WuxDef._expand),
						WuxSheetMain.SectionBlockContents(buildStyleContents(style, styleDefinition, techniqueDatabase, displayOptions)))}`;

					return WuxSheetMain.Table.FlextTableGroup(`${WuxSheetMain.CustomInput("hidden", styleDef.getAttribute(WuxDef._filter), "wuxFilterSection-flag", ` value="0"`)}
					${WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents))}`);
				},

				buildStyleContents = function (style, styleDefinition, techniqueDatabase, displayOptions) {
					let contents = "";
					contents += buildStyleDescription(style);
					contents += buildStyleLearn(style, styleDefinition);
					contents += buildTechniques(style, techniqueDatabase, displayOptions);
					return contents;
				},

				buildStyleDescription = function (style) {
					return WuxSheetMain.Header2("Description") + WuxSheetMain.Desc(style.description);
				},

				buildStyleLearn = function (style, styleDefinition) {
					let requirements = "";
					if (style.affinity != "") {
						requirements += `You must have a ${style.affinity} affinity`;
					}
					if (style.cr > 1) {
						if (requirements != "") {
							requirements += "\n";
						}
						requirements += `You must be at least Character Rank ${style.cr}`;
					}
					if (requirements == "") {
						requirements = "None";
					}
					return WuxSheetMain.HiddenField(WuxDef.GetAttribute("Technique", WuxDef._page, WuxDef._learn),
						WuxSheetMain.Header2(WuxSheetMain.InteractionElement.CheckboxBlockIcon(styleDefinition.getAttribute(style.fieldName), "Learn Style"))
						+ WuxSheetMain.Desc(`<strong>Requirements</strong>\n${requirements}`));
				},

				buildTechniques = function (style, techniqueDatabase, displayOptions) {
					let filters = [new DatabaseFilterData("techSet", style.name)];
					let techniques = techniqueDatabase.filter(filters);
					let technique = {};

					let learnedTechs = "";
					let freeTechs = "";
					for (var i = 0; i < techniques.length; i++) {
						technique = new TechniqueData(techniques[i]);
						if (technique.isFree) {
							freeTechs += buildTechnique(technique, displayOptions);
						}
						else {
							learnedTechs += buildTechnique(technique, displayOptions);
						}
					}
					return `${WuxSheetMain.Header2("Free Techniques")}\n${freeTechs == "" ? "None" : freeTechs}
					${WuxSheetMain.Header2("Learnable Techniques")}\n${learnedTechs == "" ? "None" : learnedTechs}\n`;
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
        			        contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `max: <span name="${xpDefinition.getAttribute(WuxDef._max)}"></span>`);
							
							return WuxSheetMain.Table.FlextTableGroup(contents, "wuxMinWidth200");
        			    },
        			    
        			    training = function () {
        			        let contents = "";
							let titleDefinition = WuxDef.Get("Title_Training");
        			        contents +=  WuxDefinition.InfoHeader(titleDefinition);

							contents += WuxSheetMain.MultiRow(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

							let levelDefinition = WuxDef.Get("Training");
        			        contents += WuxDefinition.BuildText(levelDefinition, WuxSheetMain.Span(levelDefinition.getAttribute(WuxDef._max)));

							let xpDefinition = WuxDef.Get("PP");
        			        contents += WuxDefinition.BuildNumberLabelInput(xpDefinition, xpDefinition.getAttribute(), `max: <span name="${xpDefinition.getAttribute(WuxDef._max)}"></span>`);
							
							return WuxSheetMain.Table.FlextTableGroup(contents, "wuxMinWidth200");
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
        				    return contents;
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
        			        let contents = "";
        				    return contents;
        			    }
        			    
        			    return {
        			        Build : build
        			    }
				}()),
				
				printChat = function () {
					let contents = Details.Build();
					return WuxSheetMain.Build(contents);
				},
				Chat = Chat || (function () {
        			'use strict';
        
        			var
        			    build = function () {
        			        let contents = "";
        				    return contents;
        			    }
        			    
        			    return {
        			        Build : build
        			    }
				}()),
				
				printOptions = function () {
					let contents = Details.Build();
					return WuxSheetMain.Build(contents);
				},
				Options = Options || (function () {
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
			output += buildGeneral.BuildClass();
			output += buildGeneral.BuildListeners();
			output += buildCharacterCreation.BuildClass();
			output += buildCharacterCreation.BuildListeners();
			output += buildTechniques.BuildClass();
			output += buildTechniques.BuildListeners();
			return output;

		},

		buildGeneral = buildGeneral || (function () {
			'use strict';

			var
				className = "WuxWorkerGeneral",

				buildClass = function (jobData) {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updatePageState", updatePageState);
					return jsClassData.print(className);
				},
				updatePageState = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					switch(eventinfo.newValue) {
						case "Styles":
							WuxWorkerTechniques.FilterTechniquesForStyleSet(attributeHandler);
							attributeHandler.run();
							break;
						case "Actions":
							WuxWorkerTechniques.FilterTechniquesForActions(attributeHandler);
							attributeHandler.run();
							break;
					}
				},

				buildListeners = function () {
					let output = "";
					
					output += listenerUpdatePageState();

					return output;
				},
				listenerUpdatePageState = function() {
					let groupVariableNames = WuxDef.GetAttribute("Page");
				    let output = `${className}.UpdatePageState(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildCharacterCreation = buildCharacterCreation || (function () {
			'use strict';

			var
				className = "WuxWorkerCharacterCreation",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("finishBuild", finishBuild);
					jsClassData.addFunction("leavePageVariables", leavePageVariables);
					jsClassData.addPublicFunction("setAffinityValue", setAffinityValue);
					jsClassData.addPublicFunction("setInnateDefense", setInnateDefense);
					jsClassData.addPublicFunction("setInnateSense", setInnateSense);
					jsClassData.addFunction("setDefenseVariables", setDefenseVariables);
					jsClassData.addFunction("getDefenseDescription", getDefenseDescription);
					return jsClassData.print(className);
				},

				buildListeners = function () {
					let output = "";
					output += listenerFinishButton();
					output += listenerSetAffinity();
					output += listenerSetInnateDefense();
					output += listenerSetInnateSense();
					return output;
				},

				finishBuild = function() {
					console.log("Finish Character Creation Build");
                	let attributeHandler  = new WorkerAttributeHandler();

				    let pointManagers = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Attribute", "Technique"]);
                	pointManagers.commitChanges(attributeHandler);
					
					let trainingWorker = new WuxTrainingWorkerBuild();
					trainingWorker.commitChanges(attributeHandler);
					
					let advancementWorker = new WuxAdvancementWorkerBuild();
					advancementWorker.commitChanges(attributeHandler);

					WuxWorkerAttributes.UpdateStats(attributeHandler);
					WuxWorkerSkills.UpdateStats(attributeHandler);
					WuxWorkerKnowledges.UpdateStats(attributeHandler);
					WuxWorkerTechniques.UpdateLearnedStats(attributeHandler);

					leavePageVariables(attributeHandler);
					attributeHandler.run();
				},
				leavePageVariables = function(attributeHandler) {
                	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
                	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
                	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
					WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
				},
				setAffinityValue = function() {
					console.log("Setting Affinity");
                	let attributeHandler  = new WorkerAttributeHandler();
					let affinityVariable = WuxDef.GetVariable("Affinity");

					attributeHandler.addMod(affinityVariable);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						attrHandler.addUpdate(WuxDef.GetVariable("Affinity", WuxDef._learn), WuxDef.GetDescription(attrHandler.parseString(affinityVariable)));
					});
					attributeHandler.run();
				},
				setInnateDefense = function() {
					console.log("Setting Innate Defense");
                	let attributeHandler  = new WorkerAttributeHandler();
					let innateDefenseVariable = WuxDef.GetVariable("InnateDefense");

					attributeHandler.addMod(innateDefenseVariable);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Brace", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Fortitude", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Disruption", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Hide", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Reflex", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Defense_Evasion", WuxDef._expertise), 0);

						switch (attrHandler.parseString(innateDefenseVariable)) {
							case "BOD": setDefenseVariables(attrHandler, "Defense", "BOD", "Brace", "Fortitude"); break;
							case "PRC": setDefenseVariables(attrHandler, "Defense", "PRC", "Disruption", "Hide"); break;
							case "QCK": setDefenseVariables(attrHandler, "Defense", "QCK", "Reflex", "Evasion"); break;
							default: attrHandler.addUpdate(WuxDef.GetVariable("InnateDefense", WuxDef._learn), "Choose an attribute"); break;
						}
						
					});
					attributeHandler.run();
				},
				setInnateSense = function() {
					console.log("Setting Innate Sense");
                	let attributeHandler  = new WorkerAttributeHandler();
					let innateSenseVariable = WuxDef.GetVariable("InnateSense");

					attributeHandler.addMod(innateSenseVariable);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Resolve", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Freewill", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Insight", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Notice", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Scrutiny", WuxDef._expertise), 0);
						attrHandler.addUpdate(WuxDef.GetVariable("Sense_Detect", WuxDef._expertise), 0);

						switch (attrHandler.parseString(innateSenseVariable)) {
							case "CNV": setDefenseVariables(attrHandler, "Sense", "CNV", "Resolve", "Freewill"); break;
							case "INT": setDefenseVariables(attrHandler, "Sense", "INT", "Insight", "Notice"); break;
							case "RSN": setDefenseVariables(attrHandler, "Sense", "RSN", "Scrutiny", "Detect"); break;
							default: attrHandler.addUpdate(WuxDef.GetVariable("InnateSense", WuxDef._learn), "Choose an attribute"); break;
						}
					});
					attributeHandler.run();
				},
				setDefenseVariables = function(attrHandler, type, attribute, defense1, defense2) {
					let attrDefinition = WuxDef.Get(`Attribute_${attribute}`);
					let def1Definition = WuxDef.Get(`${type}_${defense1}`);
					let def2Definition = WuxDef.Get(`${type}_${defense2}`);

					attrHandler.addUpdate(WuxDef.GetVariable(`Innate${type}`, WuxDef._learn), getDefenseDescription(type, attrDefinition, def1Definition, def2Definition));
					attrHandler.addUpdate(def1Definition.getVariable(WuxDef._expertise), 2);
					attrHandler.addUpdate(def2Definition.getVariable(WuxDef._expertise), 2);
				},
				getDefenseDescription = function(type, attrDefinition, def1Definition, def2Definition) {
					console.log("Getting Defense Description");

					let output = `${attrDefinition.title} is associated with the following ${type}s:\n\n`;
					output += `${def1Definition.title}: ${def1Definition.getDescription()}\n\n${def2Definition.title}: ${def2Definition.getDescription()}`;
					console.log(output);
					return output;
				},
				
				listenerFinishButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
				    let output = `${className}.FinishBuild();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetAffinity = function() {
					let groupVariableNames = [WuxDef.GetVariable("Affinity")];
				    let output = `${className}.SetAffinityValue();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetInnateDefense = function() {
					let groupVariableNames = [WuxDef.GetVariable("InnateDefense")];
				    let output = `${className}.SetInnateDefense();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetInnateSense = function() {
					let groupVariableNames = [WuxDef.GetVariable("InnateSense")];
				    let output = `${className}.SetInnateSense();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildTechniques = buildTechniques || (function () {
			'use strict';

			var
				className = "WuxWorkerTechniques",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updateBuildPoints", updateBuildPoints);
					jsClassData.addPublicFunction("filterTechniquesForLearn", filterTechniquesForLearn);
					jsClassData.addPublicFunction("filterTechniquesForCore", filterTechniquesForCore);
					jsClassData.addPublicFunction("filterTechniquesForStyleSet", filterTechniquesForStyleSet);
					jsClassData.addPublicFunction("filterTechniquesForActions", filterTechniquesForActions);
					jsClassData.addPublicFunction("updateLearnedStats", updateLearnedStats);
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxWorkerBuildManager("Technique");
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				filterTechniquesForLearn = function(attributeHandler) {
					let styleDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Style"));
					let techDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Technique"));

					let techniqueWorker = new WuxWorkerBuild("Technique");
					attributeHandler.addMod(techniqueWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						techniqueWorker.setBuildStatsFinal(attrHandler);
						techniqueWorker.cleanBuildStats();
						let workerVariableName = "";
						
						for (let i = 0; i < techDefinitions.length; i++) {
							workerVariableName = techDefinitions[i].getVariable();
							if (techniqueWorker.buildStats.has(workerVariableName)) {
								attrHandler.addUpdate(workerVariableName, techniqueWorker.buildStats.get(workerVariableName).value);
							}
							attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._filter), "0");
							attrHandler.addUpdate(techDefinitions[i].getVariable(WuxDef._subfilter), techDefinitions[i].extraData.isFree ? "1" : "0");
						}
						
						for (let i = 0; i < styleDefinitions.length; i++) {
							workerVariableName = styleDefinitions[i].getVariable();
							attrHandler.addUpdate(styleDefinitions[i].getVariable(WuxDef._filter), "0");
							if (techniqueWorker.buildStats.has(workerVariableName)) {
								attrHandler.addUpdate(styleDefinitions[i].getVariable(), techniqueWorker.buildStats.get(workerVariableName).value);
							}
						}
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Job", WuxDef._filter), "1");
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Standard", WuxDef._filter), "0");
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "1");
						attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._filter), "1");
						attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "1");
					});
				},
				filterTechniquesForCore = function(attributeHandler) {
					let styleDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Style"));
					let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

					let styleWorker = new WuxWorkerBuild("Style");
					attributeHandler.addMod(styleWorker.attrBuildFinal);

					let jobWorker = new WuxWorkerBuild("Job");
					attributeHandler.addMod(jobWorker.attrBuildFinal);

					let techniqueWorker = new WuxWorkerBuild("Technique");
					attributeHandler.addMod(techniqueWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						styleWorker.setBuildStatsFinal(attrHandler);
						styleWorker.cleanBuildStats();
						jobWorker.setBuildStatsFinal(attrHandler);
						jobWorker.cleanBuildStats();
						techniqueWorker.setBuildStatsFinal(attrHandler);
						techniqueWorker.cleanBuildStats();
						
						let isVisible = false;
						let workerVariableName = "";
						let techDefinitions;
						for (let i = 0; i < styleDefinitions.length; i++) {
							workerVariableName = styleDefinitions[i].getVariable();
							isVisible = techniqueWorker.buildStats.has(workerVariableName);
							attrHandler.addUpdate(styleDefinitions[i].getVariable(), styleWorker.buildStats.has(workerVariableName) ? "0" : "1");

							if (isVisible) {
								techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", styleDefinitions[i].title)]);
								for (let j = 0; j < techDefinitions.length; j++) {
									workerVariableName = techDefinitions[j].getVariable();
									isVisible = techDefinitions[j].extraData.isFree || techniqueWorker.buildStats.has(workerVariableName);
									attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._filter), isVisible ? "0" : "1");
									attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._subfilter), "1");
									attrHandler.addUpdate(workerVariableName, "0");
								}
							}
						}
						
						for (let i = 0; i < jobDefinitions.length; i++) {
							workerVariableName = jobDefinitions[i].getVariable();
							isVisible = jobWorker.buildStats.has(workerVariableName);
							attrHandler.addUpdate(jobDefinitions[i].getVariable(), styleWorker.buildStats.has(workerVariableName) ? "0" : "1");

							if (isVisible) {
								techDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Technique"), new DatabaseFilterData("subGroup", jobDefinitions[i].title)]);
								for (let j = 0; j < techDefinitions.length; j++) {
									isVisible = techDefinitions[j].extraData.tier <= jobWorker.buildStats.get(workerVariableName).value;
									attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._filter), isVisible ? "0" : "1");
									attrHandler.addUpdate(techDefinitions[j].getVariable(WuxDef._subfilter), "1");
									attrHandler.addUpdate(techDefinitions[j].getVariable(), "0");
								}
							}
						}
						
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Job", WuxDef._filter), "0");
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Standard", WuxDef._filter), "0");
						attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._filter), "0");
					});
				},
				filterTechniquesForStyleSet = function(attributeHandler) {
					let styleDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Style"));
					let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

					let styleWorker = new WuxWorkerBuild("Style");
					attributeHandler.addMod(styleWorker.attrBuildFinal);

					let jobWorker = new WuxWorkerBuild("Job");
					attributeHandler.addMod(jobWorker.attrBuildFinal);

					let techniqueWorker = new WuxWorkerBuild("Technique");
					attributeHandler.addMod(techniqueWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						styleWorker.setBuildStatsFinal(attrHandler);
						styleWorker.cleanBuildStats();
						jobWorker.setBuildStatsFinal(attrHandler);
						jobWorker.cleanBuildStats();
						techniqueWorker.setBuildStatsFinal(attrHandler);
						techniqueWorker.cleanBuildStats();
						
						let isVisible = false;
						for (let i = 0; i < styleDefinitions.length; i++) {
							isVisible = techniqueWorker.buildStats.has(styleDefinitions[i].getVariable());
							attrHandler.addUpdate(styleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
						}
						
						for (let i = 0; i < jobDefinitions.length; i++) {
							isVisible = jobWorker.buildStats.has(jobDefinitions[i].getVariable());
							attrHandler.addUpdate(jobDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
						}
						
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "1");
						attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "1");
					});
				},
				filterTechniquesForActions = function(attributeHandler) {
					let styleDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Style"));
					let jobDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Job"));

					let styleWorker = new WuxWorkerBuild("Style");
					attributeHandler.addMod(styleWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						styleWorker.setBuildStatsFinal(attrHandler);
						styleWorker.cleanBuildStats();
						
						let isVisible = false;
						let workerVariableName = "";
						for (let i = 0; i < styleDefinitions.length; i++) {
							workerVariableName = styleDefinitions[i].getVariable();
							isVisible = styleWorker.buildStats.has(workerVariableName);
							attrHandler.addUpdate(styleDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
						}
						
						for (let i = 0; i < jobDefinitions.length; i++) {
							workerVariableName = jobDefinitions[i].getVariable();
							isVisible = styleWorker.buildStats.has(workerVariableName);
							attrHandler.addUpdate(jobDefinitions[i].getVariable(WuxDef._filter), isVisible ? "0" : "1");
						}
						
						attrHandler.addUpdate(WuxDef.GetVariable("StyleType", "Basic", WuxDef._filter), "1");
						attrHandler.addUpdate(WuxDef.GetVariable("Technique", WuxDef._subfilter), "0");
					});
				},
				updateLearnedStats = function(attributeHandler) {
					let jobStyleWorker = new WuxWorkerBuild("JobStyle");
					attributeHandler.addMod(jobStyleWorker.attrBuildFinal);
					attributeHandler.addMod(jobStyleWorker.attrMax);

					let jobWorker = new WuxWorkerBuild("Job");
					attributeHandler.addMod(jobWorker.attrBuildFinal);

					let styleWorker = new WuxWorkerBuild("Style");
					attributeHandler.addMod(styleWorker.attrBuildFinal);
					attributeHandler.addMod(styleWorker.attrMax);

					let techniqueWorker = new WuxWorkerBuild("Technique");
					attributeHandler.addMod(techniqueWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						jobStyleWorker.setBuildStatsFinal(attrHandler);
						jobWorker.setBuildStatsFinal(attrHandler);
						styleWorker.setBuildStatsFinal(attrHandler);
						techniqueWorker.setBuildStatsFinal(attrHandler);
						
						jobStyleWorker.buildStats.iterate(function (value, key) {
							if(!jobWorker.buildStats.has(key) || !parseInt(jobWorker.buildStats.get(key)) > 0) {
								jobStyleWorker.buildStats.set(key, "0");
							}
						});
						styleWorker.buildStats.iterate(function (value, key) {
							if(!techniqueWorker.buildStats.has(key) || !parseInt(techniqueWorker.buildStats.get(key)) > 0) {
								styleWorker.buildStats.set(key, "0");
							}
						});

						jobStyleWorker.cleanBuildStats(attrHandler);
						jobStyleWorker.updatePoints(attrHandler);
						jobStyleWorker.saveBuildStatsToFinal(attrHandler);
						styleWorker.cleanBuildStats(attrHandler);
						styleWorker.updatePoints(attrHandler);
						styleWorker.saveBuildStatsToFinal(attrHandler);
					});
				},
				updateSetStyles = function(attributeHandler) {
					let jobStyleWorker = new WuxWorkerBuild("JobStyle");
					attributeHandler.addMod(jobStyleWorker.attrBuildFinal);

					let styleWorker = new WuxWorkerBuild("Style");
					attributeHandler.addMod(styleWorker.attrBuildFinal);

					let techniqueWorker = new WuxWorkerBuild("Technique");
					attributeHandler.addMod(techniqueWorker.attrBuildFinal);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						jobStyleWorker.setBuildStatsFinal(attrHandler);
						styleWorker.setBuildStatsFinal(attrHandler);
						techniqueWorker.setBuildStatsFinal(attrHandler);
						
						jobStyleWorker.buildStats.iterate(function (value, key) {
							if(!jobWorker.buildStats.has(key) || !parseInt(jobWorker.buildStats.get(key)) > 0) {
								jobStyleWorker.buildStats.set(key, "0");
							}
						});
						styleWorker.buildStats.iterate(function (value, key) {
							if(!techniqueWorker.buildStats.has(key) || !parseInt(techniqueWorker.buildStats.get(key)) > 0) {
								styleWorker.buildStats.set(key, "0");
							}
						});

						jobStyleWorker.cleanBuildStats(attrHandler);
						jobStyleWorker.saveBuildStatsToFinal(attrHandler);
						styleWorker.cleanBuildStats(attrHandler);
						styleWorker.saveBuildStatsToFinal(attrHandler);
					});
				},

				buildListeners = function () {
					let output = "";
					
					output += listenerUpdateBuildPoints();

					return output;
				},
				listenerUpdateBuildPoints = function() {
				    let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"));
					groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Technique")));
					groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Job")));
				    let output = `${className}.UpdateBuildPoints(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}());


	return {
		Print: print
	}
}())

var TrainingBackend = TrainingBackend || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			
			output += buildTraining.BuildClass();
			output += buildTraining.BuildListeners();
			output += buildKnowledge.BuildClass();
			output += buildKnowledge.BuildListeners();
			return output;

		},

		buildTraining = buildTraining || (function () {
			'use strict';

			var
				className = "WuxWorkerTraining",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("goToPageSet", goToPageSet);
					jsClassData.addPublicFunction("finishBuild", finishBuild);
					jsClassData.addPublicFunction("exitBuild", exitBuild);
					jsClassData.addFunction("leavePageVariables", leavePageVariables);
					jsClassData.addPublicFunction("setTrainingPoints", setTrainingPoints);
					jsClassData.addPublicFunction("setTrainingPointsUpdate", setTrainingPointsUpdate);
					return jsClassData.print(className);
				},

				buildListeners = function () {
					let output = "";
					output += listenerGoToPageSet();
					output += listenerFinishButton();
					output += listenerExitButton();
					output += listenerSetTrainingPoints();
					output += listenerSetTrainingPointsUpdate();
					return output;
				},

				goToPageSet = function() {
                	let attributeHandler  = new WorkerAttributeHandler();
					attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Training");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Training");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training"), "Training");
					WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
					attributeHandler.run();
				},
				finishBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leavePageVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				exitBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leavePageVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				leavePageVariables = function(attributeHandler) {
                	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
                	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
                	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
					WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
				},
				
				setTrainingPoints = function(eventinfo) {
					console.log("Setting Training Points");
                	let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxTrainingWorkerBuild();
					worker.updateTrainingPoints(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				setTrainingPointsUpdate = function(eventinfo) {
					console.log("Setting Training Points");
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxTrainingWorkerBuild();
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},

				listenerGoToPageSet = function() {
					let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
				    let output = `${className}.GoToPageSet();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerFinishButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._finish)];
				    let output = `${className}.FinishBuild();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerExitButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Training", WuxDef._exit)];
				    let output = `${className}.ExitBuild();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetTrainingPoints = function() {
					let groupVariableNames = [WuxDef.GetVariable("Level")];
				    let output = `${className}.SetTrainingPoints(eventinfo);\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetTrainingPointsUpdate = function() {
					let groupVariableNames = [WuxDef.GetVariable("TrainingKnowledge"), WuxDef.GetVariable("TrainingTechniques")];
				    let output = `${className}.SetTrainingPointsUpdate(eventinfo);\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildKnowledge = buildKnowledge || (function () {
			'use strict';

			var
				className = "WuxWorkerKnowledges",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updateBuildPoints", updateBuildPoints);
					jsClassData.addPublicFunction("updateStats", updateStats);
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxWorkerBuildManager("Knowledge");
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				updateStats = function(attributeHandler) {
					let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
					let loreDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Lore"));
					let languageDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Language"));

					for (let i = 0; i < loreCategoryDefinitions.length; i++) {
						attributeHandler.addMod(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
					}
					for (let i = 0; i < loreDefinitions.length; i++) {
						attributeHandler.addMod(loreDefinitions[i].getVariable(WuxDef._rank));
					}
					for (let i = 0; i < languageDefinitions.length; i++) {
						attributeHandler.addMod(languageDefinitions[i].getVariable(WuxDef._rank));
					}

					attributeHandler.addFormulaMods(["CR", "Recall"]);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						let skillPointValue = 0;
						let skillRank = 0;
						let loreCategories = {};
						for (let i = 0; i < loreCategoryDefinitions.length; i++) {
							loreCategories[loreCategoryDefinitions[i].title] = {};

							skillRank = attrHandler.parseInt(loreCategoryDefinitions[i].getVariable(WuxDef._rank));
							if (skillRank > 0) {
								skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
								loreCategories[loreCategoryDefinitions[i].title]["General"] = skillPointValue;
							}
						}
						for (let i = 0; i < loreDefinitions.length; i++) {
							skillRank = attrHandler.parseInt(loreDefinitions[i].getVariable(WuxDef._rank));
							if (skillRank > 0) {
								skillPointValue = skillRank + attrHandler.parseInt(WuxDef.GetVariable("CR")) + attrHandler.parseInt(WuxDef.GetVariable("Recall"));
								loreCategories[loreDefinitions[i].subGroup][loreDefinitions[i].title] = skillPointValue;
							}
						}
						attrHandler.addUpdate(WuxDef.GetVariable("Lore", WuxDef._true), JSON.stringify(loreCategories));

						let languages = [];
						for (let i = 0; i < languageDefinitions.length; i++) {
							skillRank = attrHandler.parseInt(languageDefinitions[i].getVariable(WuxDef._rank));
							if (skillRank > 0) {
								languages.push(languageDefinitions[i].title);
							}
						}
						attrHandler.addUpdate(WuxDef.GetVariable("Language", WuxDef._true), JSON.stringify(languages));
					});
				},

				buildListeners = function () {
					let output = "";
					output += listenerUpdateBuildPoints();

					return output;
				},
				listenerUpdateBuildPoints = function() {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
					groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "LoreCategory"), WuxDef._rank));
					groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Lore"), WuxDef._rank));
				    let output = `console.log("Update Knowledge");\n${className}.UpdateBuildPoints(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}());
	return {
		Print: print
	}
}())

var AdvancementBackend = AdvancementBackend || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			output += buildAdvancement.BuildClass();
			output += buildAdvancement.BuildListeners();
			output += buildJobs.BuildClass();
			output += buildJobs.BuildListeners();
			output += buildSkills.BuildClass();
			output += buildSkills.BuildListeners();
			output += buildAttributes.BuildClass();
			output += buildAttributes.BuildListeners();
			return output;
		},

		buildAdvancement = buildAdvancement || (function () {
			'use strict';

			var
				className = "WuxWorkerAdvancement",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("goToPageSet", goToPageSet);
					jsClassData.addPublicFunction("finishBuild", finishBuild);
					jsClassData.addPublicFunction("exitBuild", exitBuild);
					jsClassData.addFunction("leavePageVariables", leavePageVariables);
					jsClassData.addPublicFunction("setLevel", setLevel);
					jsClassData.addPublicFunction("setAdvancementPointsUpdate", setAdvancementPointsUpdate);
					jsClassData.addPublicFunction("setAffinityStats", setAffinityStats);
					return jsClassData.print(className);
				},

				buildListeners = function () {
					let output = "";
					output += listenerGoToPageSet();
					output += listenerFinishButton();
					output += listenerExitButton();
					output += listenerSetLevel();
					output += listenerSetAdvancementPoints();
					return output;
				},

				goToPageSet = function() {
                	let attributeHandler  = new WorkerAttributeHandler();
					attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Advancement");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Advancement");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Advancement"), "Advancement");
					WuxWorkerTechniques.FilterTechniquesForLearn(attributeHandler);
					attributeHandler.run();
				},
				finishBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leavePageVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				exitBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Skill", "Job", "Attribute", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leavePageVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				leavePageVariables = function(attributeHandler) {
                	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
                	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
                	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
					WuxWorkerTechniques.FilterTechniquesForCore(attributeHandler);
				},
				
				setLevel = function(eventinfo) {
					console.log("Setting Level");
                	let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxAdvancementWorkerBuild();
					worker.updateLevel(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				setAdvancementPointsUpdate = function(eventinfo) {
					console.log("Setting Advancement Points");
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxAdvancementWorkerBuild();
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				setAffinityStats = function(attributeHandler) {
					let affinityVariable = WuxDef.GetVariable("Affinity");
					let crVariable = WuxDef.GetVariable("CR");
					attributeHandler.addMod([affinityVariable, crVariable]);

					attributeHandler.addGetAttrCallback(function (attrHandler) {

						let crValue = attrHandler.parseInt(crVariable);
						let initiativeVar = WuxDef.GetVariable("Initiative", WuxDef._affinity);
						let hvVar = WuxDef.GetVariable("Combat_HV", WuxDef._affinity);
						let surgeVar = WuxDef.GetVariable("Combat_Surge", WuxDef._affinity);
						let armorVar = WuxDef.GetVariable("Combat_Armor", WuxDef._affinity);
						let resistanceVar = WuxDef.GetVariable("Combat_Resistance", WuxDef._affinity);
						let resistance = new ResistanceData();

						attrHandler.addUpdate(initiativeVar, 0);
						attrHandler.addUpdate(hvVar, 0);
						attrHandler.addUpdate(surgeVar, 0);
						attrHandler.addUpdate(armorVar, 0);
						attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));

						switch(attrHandler.get(affinityVariable)) {
							case "Wood":
								attrHandler.addUpdate(initiativeVar, crValue);
								attrHandler.addUpdate(hvVar, crValue * 2);
								resistance.addResistanceValue("Cold", crValue * 2);
								attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
								break;
							case "Fire":
								attrHandler.addUpdate(initiativeVar, crValue);
								resistance.addResistanceValue("Fire", crValue * 2);
								resistance.addResistanceValue("Burn", crValue);
								attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
								break;
							case "Earth":
								resistance.addResistanceValue("Fire", crValue * 2);
								resistance.addResistanceValue("Piercing", crValue);
								resistance.addResistanceValue("Shock", crValue * 2);
								attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
								break;
							case "Metal":
								attrHandler.addUpdate(armorVar, crValue);
								resistance.addResistanceValue("Force", crValue);
								resistance.addResistanceValue("Piercing", crValue);
								attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
								break;
							case "Water":
								attrHandler.addUpdate(surgeVar, 1);
								resistance.addResistanceValue("Cold", crValue * 2);
								resistance.addResistanceValue("Force", crValue);
								attrHandler.addUpdate(resistanceVar, JSON.stringify(resistance));
								break;

						}
					});
				},

				listenerGoToPageSet = function() {
					let groupVariableNames = [WuxDef.GetVariable("Title_Advancement")];
				    let output = `${className}.GoToPageSet();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerFinishButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._finish)];
				    let output = `${className}.FinishBuild();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerExitButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Advancement", WuxDef._exit)];
				    let output = `${className}.ExitBuild();\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetLevel = function() {
					let groupVariableNames = [WuxDef.GetVariable("Level")];
				    let output = `${className}.SetLevel(eventinfo);\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				},
				listenerSetAdvancementPoints = function() {
					let groupVariableNames = [WuxDef.GetVariable("AdvancementJob"), WuxDef.GetVariable("AdvancementSkill"), WuxDef.GetVariable("AdvancementTechnique")];
				    let output = `${className}.SetAdvancementPointsUpdate(eventinfo);\n`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildJobs = buildJobs || (function () {
			'use strict';

			var
				className = "WuxWorkerJobs",

				buildClass = function (jobData) {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updateBuildPoints", updateBuildPoints);
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxWorkerBuildManager("Job");
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},

				buildListeners = function () {
					let output = "";
					let groupName = "Job";
					
					output += listenerUpdateBuildPoints(groupName);

					return output;
				},
				listenerUpdateBuildPoints = function(groupName) {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", groupName), WuxDef._rank);
				    let output = `console.log("Update Jobs");\n${className}.UpdateBuildPoints(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildSkills = buildSkills || (function () {
			'use strict';

			var
				className = "WuxWorkerSkills",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updateBuildPoints", updateBuildPoints);
					jsClassData.addPublicFunction("updateStats", updateStats);
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxWorkerBuildManager("Skill");
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				updateStats = function(attributeHandler) {
					let skillDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));
					for (let i = 0; i < skillDefinitions.length; i++) {
						attributeHandler.addFormulaMods(skillDefinitions[i]);
					}

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						let skillPointValue = 0;
						let skillRank = 0;
						for (let i = 0; i < skillDefinitions.length; i++) {
							skillPointValue = skillDefinitions[i].getFormulaValue(attrHandler);
							skillRank = attrHandler.parseInt(skillDefinitions[i].getVariable(WuxDef._rank));
							if (skillRank > 0) {
								skillPointValue = skillPointValue + attrHandler.parseInt(WuxDef.GetVariable("CR"));
							}
							attrHandler.addUpdate(skillDefinitions[i].getVariable(), skillPointValue);
						}
					});
				},

				buildListeners = function () {
					let output = "";
					let groupName = "Skill";
					output += listenerUpdateBuildPoints(groupName);

					return output;
				},
				listenerUpdateBuildPoints = function(groupName) {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", groupName), WuxDef._rank);
				    let output = `console.log("Update Skills");\n${className}.UpdateBuildPoints(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}()),

		buildAttributes = buildAttributes || (function () {
			'use strict';

			var
				className = "WuxWorkerAttributes",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("updateBuildPoints", updateBuildPoints);
					jsClassData.addPublicFunction("updateStats", updateStats);
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let attributeHandler  = new WorkerAttributeHandler();
					let worker = new WuxWorkerBuildManager("Attribute");
					worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
					attributeHandler.run();
				},
				updateStats = function(attributeHandler) {
					let attributeDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "Attribute"));
					let formulaDefinitions = [];
					for (let i = 0; i < attributeDefinitions.length; i++) {
						formulaDefinitions = formulaDefinitions.concat(WuxDef.Filter(new DatabaseFilterData("formulaMods", attributeDefinitions[i].name)));
					}

					for (let i = 0; i < formulaDefinitions.length; i++) {
						attributeHandler.addFormulaMods(formulaDefinitions[i]);
					}

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						for (let i = 0; i < formulaDefinitions.length; i++) {
							attrHandler.addUpdate(formulaDefinitions[i].getVariable(), formulaDefinitions[i].getFormulaValue(attrHandler));
						}
					});
				},

				buildListeners = function () {
					let output = "";
					let groupName = "Attribute";
					
					output += listenerUpdateBuildPoints(groupName);

					return output;
				},
				listenerUpdateBuildPoints = function(groupName) {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", groupName));
				    let output = `console.log("Update Attributes");
					${className}.UpdateBuildPoints(eventinfo)`;

					return WuxSheetBackend.OnChange(groupVariableNames, output, true);
				}
				;
			return {
				BuildClass: buildClass,
				BuildListeners: buildListeners
			}
		}());
	return {
		Print: print
	}
}())

