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
			output += DisplayActionsSheet.Print(sheetsDb);
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
							let contents = "";
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
							contents += WuxDefinition.BuildTextInput(WuxDef.Get("Display Name"), WuxDef.GetAttribute("Display Name"));
							contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
							contents += buildAffinity();

        			        contents = WuxSheetMain.TabBlock(contents);
							
        			        let definition = WuxDef.Get("Page_Origin");
        				    return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
						},

						buildAffinity = function () {
							let output = "";
							let definition = WuxDef.Get("Affinity");
							output += WuxSheetMain.Tooltip(WuxSheetMain.Header2(definition.title), WuxDefinition.TooltipDescription(definition));
							output += WuxSheetMain.Select(definition.getAttribute(), WuxDef.Filter([new DatabaseFilterData("group", "Affinity")]));
							return output;
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
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Training Points")));
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
        			        contents += WuxDefinition.BuildText(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
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

						buildLore = function (knowledge, interactHeader) {
							let knowledgeDefinition = knowledge.createDefinition(WuxDef.Get("Lore"));
							return WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(knowledgeDefinition.getAttribute(WuxDef._rank),
							interactHeader, WuxDefinition.TooltipDescription(knowledgeDefinition));
						},

						buildMainLore = function (knowledge) {
							return buildLore(knowledge, `<span class="wuxHeader">General ${knowledge.name}</span>`);
						},

						buildSubLore = function (knowledge) {
							return buildLore(knowledge, `<span class="wuxSubheader">${knowledge.name}</span>`);
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
							let fieldName = Format.ToCamelCase(job.name);
							let jobDefinition = WuxDef.Get("Job");

							let contents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(jobDefinition.getAttribute(job.fieldName, WuxDef._expand))}
							${WuxSheetMain.InteractionElement.CheckboxBlockIcon(jobDefinition.getAttribute(job.fieldName), WuxSheetMain.Header(job.name))}
							${WuxSheetMain.SectionBlockHeaderFooter()}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(jobDefinition.getAttribute(job.fieldName, WuxDef._expand),
								WuxSheetMain.SectionBlockContents(buildJobContents(fieldName, job, techDictionary)))}`;

							return WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents));
						},

						buildJobContents = function (fieldName, job, techDictionary) {
							let output = "";

							output += WuxSheetMain.Header2("Description") + WuxSheetMain.Desc(job.description);
							output += buildJobContentsLevels(fieldName);
							output += buildJobContentsRole(job);
							output += buildJobContentsGrowths(job);
							output += buildJobContentsTechniques(job, techDictionary, WuxDef.Get("Technique"));

							return output;
						},

						buildJobContentsLevels = function (fieldName) {
							return `<div class="wuxDistinctSection">
						<div class="wuxDistinctField">
						<span class="wuxDistinctTitle">Level</span>
							<input type="text" class='wuxDistinctData' name='attr_advancement-level-${fieldName}'>
						</div>
					</div>`;
						},

						buildJobContentsRole = function (job) {
							return `${WuxSheetMain.Header(`${job.name} Role`)}
							${WuxSheetMain.Desc(`${job.name} is a ${job.group} and grants one level of ${job.group} whenever this job is taken.`)}`;
						},

						buildJobContentsGrowths = function (job) {
							return `${WuxSheetMain.Header(`${job.name} Growths`)}
							${WuxSheetMain.Table.Build(job.attributes.getAttributeAbrNames(), job.attributes.convertAttributesToArr())}`;
						},

						buildJobContentsTechniques = function (job, techDictionary, techniqueDefinition) {
							return `${WuxSheetMain.Header(`${job.name} Techniques`)}
							${WuxSheetMain.Desc(`Job Techniques are learned when reaching the associated level.`)}
							${buildJobContentsTechniquesData(job, techDictionary, techniqueDefinition)}`;
						},

						buildJobContentsTechniquesData = function (job, techDictionary, techniqueDefinition) {
							let output = "";
							let technique = {};
							let displayOptions = getDisplayOptions(techniqueDefinition);
							for (let i = 0; i < job.techniques.length; i++) {
								technique = techDictionary.get(job.techniques[i].name);
								if (technique != undefined) {
									output += `${WuxSheetMain.Header2(`Level ${job.techniques[i].level}`)}
									${WuxPrintTechnique.Get(technique, displayOptions)}
									`;
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
							let interactHeader = `<span class="wuxHeader">${skill.name} (${skill.abilityScore})</span>`;
							
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
							
							let header = WuxSheetMain.Tooltip(attributeDefinition.title, WuxDefinition.TooltipDescription(attributeDefinition));
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
				MainContentData.Print(sheetsDb.styles, sheetsDb.techniques);
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
					return WuxSheetSidebar.Build(buildTechPointsSection(WuxDef.GetAttribute("Technique")));
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
				print = function (stylesDatabase, techniqueDatabase) {

					return WuxSheetMain.Build(buildTechniquesByGroup(stylesDatabase, techniqueDatabase, WuxDef.Get("Technique")));
				},

				buildTechniquesByGroup = function (stylesDatabase, techniqueDatabase, techniqueDefinition) {
					let displayOptions = getDisplayOptions(techniqueDefinition);
					let output = "";
					output += buildStandardTechniqueGroup(stylesDatabase, techniqueDatabase, "Standard", displayOptions);
					return output;
				},

				getDisplayOptions = function (techniqueDefinition) {
					let displayOptions = WuxPrintTechnique.GetDisplayOptions();
					displayOptions.techniqueDefinition = techniqueDefinition;
					displayOptions.hasCSS = true;
					displayOptions.showSelect = true;
					return displayOptions;
				},

				buildStandardTechniqueGroup = function (stylesDatabase, techniqueDatabase, groupName, displayOptions) {
					let filters = [new DatabaseFilterData("group", groupName)];

					let filteredData = stylesDatabase.filter(filters);

					let techStyles = [];
					for (let i = 0; i < filteredData.length; i++) {
						techStyles.push(buildTechStyleSection(filteredData[i], techniqueDatabase, displayOptions));
					}
					let output = WuxSheetMain.MultiRowGroup(techStyles, WuxSheetMain.Table.FlexTable, 2);
					output = WuxSheetMain.TabBlock(output);
					let definition = WuxDef.Get("Style");

					return WuxSheetMain.CollapsibleTab(definition.getAttribute(`_${groupName}${WuxDef._tab}`, WuxDef._expand), `${groupName} ${definition.title}`, output);
				},

				buildTechStyleSection = function (style, techniqueDatabase, displayOptions) {

					let styleDefinition = WuxDef.Get("Style");

					let contents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(styleDefinition.getAttribute(style.fieldName, WuxDef._expand))}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(styleDefinition.getAttribute(style.fieldName), WuxSheetMain.Header(style.name))}
					${WuxSheetMain.SectionBlockHeaderFooter()}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(styleDefinition.getAttribute(style.fieldName, WuxDef._expand),
						WuxSheetMain.SectionBlockContents(buildStyleContents(style, styleDefinition, techniqueDatabase, displayOptions)))}`;

					return `<input type="hidden" class="wuxFilterSection-flag" name="${styleDefinition.getAttribute(style.fieldName)}" value="">
					${WuxSheetMain.Table.FlextTableGroup(WuxSheetMain.SectionBlock(WuxSheetMain.InteractionElement.Build(true, contents)))}`;
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
					let fieldName = WuxDef.GetAttribute("Technique", technique.fieldName, WuxDef._filter);

					let output = "";
					output += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="">`;
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
        			        contents += WuxDefinition.BuildText(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
        			        return contents;
        			    },
        			    
        			    advancement = function () {
        			        let contents = "";
							let titleDefinition = WuxDef.Get("Title_Advancement");
        			        contents +=  WuxDefinition.InfoHeader(titleDefinition);

							contents += WuxSheetMain.Div(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

							let levelDefinition = WuxDef.Get("Level");
        			        contents += WuxDefinition.BuildText(levelDefinition, levelDefinition.getAttribute());

							let xpDefinition = WuxDef.Get("XP");
        			        contents += WuxDefinition.BuildNumberInput(xpDefinition, xpDefinition.getAttribute());
							
							return WuxSheetMain.Table.FlextTableGroup(contents, "wuxMinWidth200");
        			    },
        			    
        			    training = function () {
        			        let contents = "";
							let titleDefinition = WuxDef.Get("Title_Training");
        			        contents +=  WuxDefinition.InfoHeader(titleDefinition);

							contents += WuxSheetMain.Div(WuxSheetMain.Button(titleDefinition.getAttribute(), `Go to ${titleDefinition.title}`));

							let levelDefinition = WuxDef.Get("Training Points");
        			        contents += WuxDefinition.BuildText(levelDefinition, levelDefinition.getAttribute(WuxDef._max));

							let xpDefinition = WuxDef.Get("PP");
        			        contents += WuxDefinition.BuildNumberInput(xpDefinition, xpDefinition.getAttribute());
							
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

var DisplayActionsSheet = DisplayActionsSheet || (function () {
	'use strict';

	var
		print = function (sheetsDb) {
			let output = "";
			output += printActions(sheetsDb);
			return output;
		},

		printActions = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildActionsPageNavigation("Actions") +
				SideBarData.PrintActions() +
				MainContentData.PrintActions();
			return WuxSheet.PageDisplay("Actions", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printActions = function () {
					return WuxSheetSidebar.Build("<div>&nbsp;</div>");
				}

			return {
				PrintActions: printActions
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
				printActions = function () {
					return "";
				}

			return {
				PrintActions: printActions
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
			output += buildCharacterCreation.BuildClass();
			output += buildCharacterCreation.BuildListeners();
			output += buildTechniques.BuildClass();
			output += buildTechniques.BuildListeners();
			return output;

		},

		buildCharacterCreation = buildCharacterCreation || (function () {
			'use strict';

			var
				className = "WuxWorkerCharacterCreation",

				buildClass = function () {
					let jsClassData = new JavascriptDataClass();
					jsClassData.addPublicFunction("finishBuild", finishBuild);
					return jsClassData.print(className);
				},

				buildListeners = function () {
					let output = "";
					output += listenerFinishButton();
					return output;
				},
				finishBuild = function() {
					console.log("Finish Character Creation Build");
				    let manager = new WuxWorkerBuildManager(["Skill", "Job", "Knowledge", "Technique", "Attribute"]);
                	let attributeHandler  = new WorkerAttributeHandler();
                	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
                	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
                	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);

					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				
				listenerFinishButton = function() {
					let groupVariableNames = [WuxDef.GetVariable("PageSet_Character Creator", WuxDef._finish)];
				    let output = `${className}.FinishBuild();\n`;

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
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let worker = new WuxWorkerBuildManager("Technique");
					worker.onChangeWorkerAttribute(eventinfo.sourceAttribute, eventinfo.newValue);
				},

				buildListeners = function () {
					let output = "";
					
					output += listenerUpdateBuildPoints();

					return output;
				},
				listenerUpdateBuildPoints = function() {
				    let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Style"));
					groupVariableNames = groupVariableNames.concat(WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Technique")));
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
					jsClassData.addPublicFunction("goToTraining", goToTraining);
					jsClassData.addPublicFunction("finishBuild", finishBuild);
					jsClassData.addPublicFunction("exitBuild", exitBuild);
					jsClassData.addFunction("leaveTrainingVariables", leaveTrainingVariables);
					return jsClassData.print(className);
				},

				buildListeners = function () {
					let output = "";
					output += listenerGoToTraining();
					output += listenerFinishButton();
					output += listenerExitButton();
					return output;
				},

				goToTraining = function() {
                	let attributeHandler  = new WorkerAttributeHandler();
					attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Training");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Training");
					attributeHandler.addUpdate(WuxDef.GetVariable("PageSet_Training"), "Training");
					attributeHandler.run();
				},
				finishBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leaveTrainingVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				exitBuild = function() {
				    let manager = new WuxWorkerBuildManager(["Knowledge", "Technique"]);
                	let attributeHandler  = new WorkerAttributeHandler();
					leaveTrainingVariables(attributeHandler);
                
                	manager.setupAttributeHandlerForPointUpdate(attributeHandler);
					attributeHandler.addGetAttrCallback(function (attrHandler) {
						manager.setAttributeHandlerPoints(attrHandler);
					});
					attributeHandler.run();
				},
				leaveTrainingVariables = function(attributeHandler) {
                	attributeHandler.addUpdate(WuxDef.GetVariable("Page"), "Character");
                	attributeHandler.addUpdate(WuxDef.GetVariable("PageSet"), "Core");
                	attributeHandler.addUpdate(WuxDef.GetVariable("Core", WuxDef._tab), "Overview");
				},

				listenerGoToTraining = function() {
					let groupVariableNames = [WuxDef.GetVariable("Title_Training")];
				    let output = `${className}.GoToTraining();\n`;

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
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let worker = new WuxWorkerBuildManager("Knowledge");
					worker.onChangeWorkerAttribute(eventinfo.sourceAttribute, eventinfo.newValue);
				},
				buildListeners = function () {
					let output = "";
					output += listenerUpdateBuildPoints();

					return output;
				},
				listenerUpdateBuildPoints = function() {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", "Language"), WuxDef._rank);
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
			output += buildJobs.BuildClass();
			output += buildJobs.BuildListeners();
			output += buildSkills.BuildClass();
			output += buildSkills.BuildListeners();
			output += buildAttributes.BuildClass();
			output += buildAttributes.BuildListeners();
			return output;
		},

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
					let worker = new WuxWorkerBuildManager("Job");
					worker.onChangeWorkerAttribute(eventinfo.sourceAttribute, eventinfo.newValue);
				},

				buildListeners = function () {
					let output = "";
					let groupName = "Job";
					
					output += listenerUpdateBuildPoints(groupName);

					return output;
				},
				listenerUpdateBuildPoints = function(groupName) {
					let groupVariableNames = WuxDef.GetGroupVariables(new DatabaseFilterData("group", groupName));
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
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let worker = new WuxWorkerBuildManager("Skill");
					worker.onChangeWorkerAttribute(eventinfo.sourceAttribute, eventinfo.newValue);
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
					return jsClassData.print(className);
				},
				updateBuildPoints = function(eventinfo) {
					let worker = new WuxWorkerBuildManager("Attribute");
					worker.onChangeWorkerAttribute(eventinfo.sourceAttribute, eventinfo.newValue);
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

