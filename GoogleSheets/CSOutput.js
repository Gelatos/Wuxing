// Character Technique: Page
// =================================================

function CreateTechniquesSheetSection(techniqueDatabase) {
	let output = "";
	output += DisplayTechniquesSheet.Print(techniqueDatabase);
	return PrintLargeEntry(output);
}

var DisplayTechniquesSheet = DisplayTechniquesSheet || (function () {
	'use strict';

	var
		print = function (techniqueDatabase) {
			let dataObj = initializeTechniqueData();
			setTechniqueData(dataObj, techniqueDatabase);

			return createTechniqueSelectionSection(dataObj);
		},

		// initialization
		initializeTechniqueData = function () {
			let dataObj = getDataObj();
			initializeDisplayOptions(dataObj);
			return dataObj;
		},

		getDataObj = function () {
			return {
				techniqueDisplayData: "",
				techFilterData: FormatTechniques.CreateTechniqueFilterData(),
				displayOptions: DisplayTechniqueHtml.GetDisplayOptions()
			}
		},

		initializeDisplayOptions = function (dataObj) {
			dataObj.displayOptions.categoryName = "techniques";
			dataObj.displayOptions.sectionName = `${dataObj.displayOptions.categoryName}_filteredTechniques`;
			dataObj.displayOptions.hasCSS = true;
			dataObj.displayOptions.showSelect = true;
		},

		// set technique data
		setTechniqueData = function (dataObj, techniqueDatabaseData) {
			let techniqueDatabase = FormatTechniques.ParseTechniquesDatabase(techniqueDatabaseData);
			dataObj = FormatTechniques.IterateOverTechArrays(dataObj, createTechniqueSelectionTechniqueList, techniqueDatabase,
				["Standard", "Hero", "Creature", "Job", "Role", "Item", "Active", "Support"]);
		},

		// create technique display section
		createTechniqueSelectionTechniqueList = function (dataObj, techData) {

			techData.iterate(function (technique) {
				dataObj.techFilterData.add(technique);
				buildTechTreeDisplaySection(dataObj, technique);
			});

			return dataObj;
		},

		buildTechTreeDisplaySection = function (dataObj, technique) {
			buildTechniqueDisplay(dataObj, technique);
			buildAugmentTechDisplayData(dataObj, technique);
		},

		buildTechniqueDisplay = function (dataObj, technique) {
			dataObj.techniqueDisplayData += `<input type="hidden" class="wuxFilterFeature-flag" name="attr_${dataObj.displayOptions.sectionName}-filtered-${Format.ToCamelCase(technique.name)}" value="">`;
			dataObj.techniqueDisplayData += DisplayTechniqueHtml.Get(technique, dataObj.displayOptions);
		},

		buildAugmentTechDisplayData = function (dataObj, technique) {
			let augmentTechnique = {};
			for (var i = 0; i < technique.augments.length; i++) {
				augmentTechnique = FormatTechniques.SetAugmentTechnique(technique.augments[i], technique);
				buildTechniqueDisplay(dataObj, augmentTechnique);
			}
		},

		// section creation
		createTechniqueSelectionSection = function (dataObj) {
			return createSideBar() + createMainContent(dataObj);
		},

		createSideBar = function () {
			let output = "";
			output += buildTechPointsSection();

			return FormatCharacterSheetSidebar.Build(output);
		},

		buildTechPointsSection = function () {
			return `<div class="wuxHeader">&nbsp;Build</div>
			  ${buildTechPointsSectionData("Base")}
			  ${buildTechPointsSectionData("Augment")}`;
		},

		buildTechPointsSectionData = function (name) {
			let id = Format.ToCamelCase(name);
			let output = `<span name='attr_techpoints-${id}' value="0">0</span>
			  <span>/ </span>
			  <span name='attr_techpoints-${id}_max' value="0">0</span>`;
			return FormatCharacterSheetSidebar.AttributeSection(name, output);
		},

		// main content creation
		createMainContent = function (dataObj) {

			return FormatCharacterSheetMain.Build(buildTechniqueSelectionInformationSection()
				+ buildTechniqueSelectionTechniquesSection(dataObj));
		},

		buildTechniqueSelectionInformationSection = function () {
			let output = "";

			return output;
		},

		buildTechniqueSelectionTechniquesSection = function (dataObj) {
			dataObj.techniqueDisplayData = FormatCharacterSheetMain.CollapsibleSection(
				dataObj.displayOptions.sectionName, "Techniques", dataObj.techniqueDisplayData);
			dataObj.techniqueDisplayData = FormatCharacterSheetMain.Tab(dataObj.techniqueDisplayData);

			return dataObj.techniqueDisplayData;
		}

		;
	return {
		Print: print
	};
}());


// Training
// =================================================

function CreateTrainingSheetSection(skillsArray, languageArray, loreArray) {
	let output = DisplayTrainingSheet.Print(skillsArray, languageArray, loreArray);
	return PrintLargeEntry(output);
}

var DisplayTrainingSheet = DisplayTrainingSheet || (function () {
	'use strict';

	var
		print = function (skillsArray, languageArray, loreArray) {
			let output = printSkills(skillsArray);
			output += printKnowledge(languageArray, loreArray);
			return output;
		},

		printSkills = function (skillsArray) {
			let skillDictionary = FormatSkills.CreateSkillsDictionary(skillsArray);
			
			let output = FormatCharacterSheetNavigation.BuildTrainingPageNavigation("Skills") + 
				SideBarData.PrintSkills() + 
				MainContentData.PrintSkills(skillDictionary);
			return FormatCharacterSheet.SetDisplayStyle("Skills", output);
		},

		printKnowledge = function (languageArray, loreArray) {
			let languageDictionary = FormatKnowledge.CreateLanguageDictionary(languageArray);
			let loreDictionary = FormatKnowledge.CreateLoreDictionary(loreArray);

			let output = FormatCharacterSheetNavigation.BuildTrainingPageNavigation("Knowledge") + 
				SideBarData.PrintKnowledge() + 
				MainContentData.PrintKnowledge(languageDictionary, loreDictionary);
			return FormatCharacterSheet.SetDisplayStyle("Knowledge", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
			printSkills = function () {
				return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_skillpoints"));
			},
			printKnowledge = function () {
				return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_knowledgepoints"));
			},

			buildTechPointsSection = function (fieldName) {
				return FormatCharacterSheetSidebar.BuildPointsSection(fieldName);
			}

			return {
				PrintSkills: printSkills,
				PrintKnowledge: printKnowledge
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
			printSkills = function (skillDictionary) {
				let contents = buildElementsTableData(FormatSkills.GetSkillGroupList(), skillDictionary, buildSkillsData.Build);
				contents = FormatCharacterSheetMain.CollapsibleTab("training_skills", "Skills", contents);

				return FormatCharacterSheetMain.Build(contents);
			},

			printKnowledge = function (languageDictionary, loreDictionary) {
				let languageContents = buildElementsTableData(FormatKnowledge.GetLanguageGroupList(), languageDictionary, buildLanguageData.Build);
				languageContents = FormatCharacterSheetMain.CollapsibleTab("training_language", "Languages", languageContents);

				let loreContents = buildElementsTableData(FormatKnowledge.GetLoreGroupList(), loreDictionary, buildLoreData.Build);
				loreContents = FormatCharacterSheetMain.CollapsibleTab("training_lore", "Lore", loreContents);

				return FormatCharacterSheetMain.Build(languageContents + loreContents);
			},

			buildElementsTableData = function (groups, dataDictionary, callback) {
				let output = "";
				for (let i = 0; i < groups.length; i++) {
					if (i % 2 == 0) {
						output += `<div class="wuxFlexTable">\n`;
					}
					output += callback(groups[i], dataDictionary);
					if (i % 2 == 1) {
						output += `</div>\n`;
					}
				}
				if (groups.length % 2 == 1) {
					output += `</div>\n`;
				}
				
				return `<div class="wuxSectionBlock">
					<div class="wuxSectionContent">
						${output}
					</div>
				</div>`;
			},

			buildSkillsData = buildSkillsData || (function () {
				'use strict';

				var
				build = function (groupName, skillDictionary) {
					return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
						<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
						<div class="wuxFlexTableItemData wuxTextLeft">
							${buildSkillGroupSkills(skillDictionary.get(groupName))}
						</div>
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
					let fieldName = `attr_skills-training-${Format.ToCamelCase(skill.name)}`;

					let expandFieldName = `${fieldName}-expand`;
					let expandContents = `<div class="wuxDescription">${skill.description}</div>`;
					let interactHeader = `<span class="wuxHeader">${skill.name} (${skill.abilityScore})</span>`;

					let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
					${FormatCharacterSheetMain.InteractionElement.CheckboxBlockIcon(fieldName, interactHeader)}
					${FormatCharacterSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

					return FormatCharacterSheetMain.InteractionElement.Build(true, true, output);
				}
				return {
					Build: build
				}
			}()),

			buildLanguageData = buildLanguageData || (function () {
				'use strict';

				var
				build = function (groupName, skillDictionary) {
					return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
						<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Languages</div>
						<div class="wuxFlexTableItemData wuxTextLeft">
							${buildLanguageGroupSkills(skillDictionary.get(groupName))}
						</div>
					</div>`;
				},

				buildLanguageGroupSkills = function (skillDataArray) {
					let output = "";
					for (let i = 0; i < skillDataArray.length; i++) {
						output += buildLanguage(skillDataArray[i]);
					}
					return output;
				},

				buildLanguage = function (knowledge) {
					let fieldName = `attr_languages-training-${Format.ToCamelCase(knowledge.name)}`;

					return `${buildMainLanguage(knowledge, fieldName)}
					${buildSubLanguage(fieldName + "_speak", "Speak")}
					${buildSubLanguage(fieldName + "_readwrite", "Read / Write")}`;
				}, 

				buildMainLanguage = function (knowledge, fieldName) {
					let expandFieldName = `${fieldName}-expand`;
					let expandContents = `<div class="wuxDescription">${knowledge.description}</div>`;

					let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
					${buildInteractionMainBlock(knowledge)}
					${FormatCharacterSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

					return FormatCharacterSheetMain.InteractionElement.Build(true, true, output);
				},

				buildInteractionMainBlock = function (knowledge) {
					return `<div class="wuxInteractiveInnerBlock">
						<span class="wuxHeader">${knowledge.name}</span>
						- <span class="wuxSubheader">${knowledge.location}</span>
					</div>`;
				},
		
				buildSubLanguage = function (fieldName, subGroupName) {

					let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockEmptyIcon()}
					${FormatCharacterSheetMain.InteractionElement.CheckboxBlockIcon(fieldName, `<span class="wuxSubheader">${subGroupName}</span>`)}`;

					return FormatCharacterSheetMain.InteractionElement.Build(true, true, output);
				}

				return {
					Build: build
				}
			})(),

			buildLoreData = buildLoreData || (function () {
				'use strict';

				var
				build = function (groupName, skillDictionary) {
					return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
						<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} Lore</div>
						<div class="wuxFlexTableItemData wuxTextLeft">
							${buildLoreGroupSkills(skillDictionary.get(groupName))}
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
					let fieldName = `attr_lore-training-${Format.ToCamelCase(knowledge.name)}`;
					let expandFieldName = `${fieldName}-expand`;
					let expandContents = `<div class="wuxDescription">${knowledge.description}</div>`;

					let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
					${FormatCharacterSheetMain.InteractionElement.CheckboxBlockIcon(fieldName, interactHeader)}
					${FormatCharacterSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

					return FormatCharacterSheetMain.InteractionElement.Build(true, true, output);
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
				PrintSkills: printSkills,
				PrintKnowledge: printKnowledge
			}
		}());
		;
	return {
		Print: print
	};
}());


// Advancement
// =================================================

function CreateAdvancementSection(jobsArray, techniqueDatabaseData) {
	let output = "";
	output += DisplayAdvancementSheet.Print(jobsArray, techniqueDatabaseData);
	return PrintLargeEntry(output);
}

var DisplayAdvancementSheet = DisplayAdvancementSheet || (function () {
	'use strict';

	var
		print = function (jobsArray, techniqueDatabaseData) {
			let output = "";
			output += printJobs(jobsArray, techniqueDatabaseData);
			output += printAttributes();
			return output;
		},

		printJobs = function (jobsArray, techniqueDatabaseData) {
			let jobsDictionary = FormatJobs.CreateDictionary(jobsArray);
			let jobTechDictionary = CreateDictionary();
			let roleTechDictionary = CreateDictionary();
			TechniqueData.SetDictionaries(jobTechDictionary, roleTechDictionary, techniqueDatabaseData);

			let output = FormatCharacterSheetNavigation.BuildAdvancementPageNavigation("Jobs") + 
				SideBarData.PrintJobs() + 
				MainContentData.PrintJobs(jobsDictionary, jobTechDictionary, roleTechDictionary);
			return FormatCharacterSheet.SetDisplayStyle("Jobs", output);
		},

		printAttributes = function () {

			let output = FormatCharacterSheetNavigation.BuildAdvancementPageNavigation("Attributes") + 
				SideBarData.PrintAttributes() + 
				MainContentData.PrintAttributes();
			return FormatCharacterSheet.SetDisplayStyle("Attributes", output);
		},

		TechniqueData = TechniqueData || (function () {
			'use strict';

			var
				setDictionaries = function (jobTechDictionary, roleTechDictionary, techniqueDatabaseData) {
					let techniqueDatabase = FormatTechniques.ParseTechniquesDatabase(techniqueDatabaseData);
					FormatTechniques.IterateOverTechArrays(jobTechDictionary, createTechniqueDatabaseByJob, techniqueDatabase,
						["Job"]);
					FormatTechniques.IterateOverTechArrays(roleTechDictionary, createTechniqueDatabaseByRole, techniqueDatabase,
						["Role"]);
				},

				createTechniqueDatabaseByJob = function (jobTechDictionary, techData) {
					techData.iterate(function (technique) {
						jobTechDictionary.add(technique.name, technique);
					});
				},

				createTechniqueDatabaseByRole = function (roleTechDictionary, techData) {
					techData.iterate(function (technique) {
						if (!roleTechDictionary.has(technique.group)) {
							roleTechDictionary.add(technique.group, CreateDictionary());
						}
						roleTechDictionary.get(technique.group).add(technique.name, technique);
					});
				},
				
				displayTechnique = function (techniqueName, techDictionary) {
				  let technique = techDictionary.get(techniqueName);
				  if (technique != undefined) {
				  	return DisplayTechniqueHtml.Get(technique, getDisplayOptions());
				  }
				  return techniqueName;
				},

				getDisplayOptions = function () {
					var displayOptions = DisplayTechniqueHtml.GetDisplayOptions();
					displayOptions.categoryName = "job";
					displayOptions.sectionName = `${displayOptions.categoryName}_techniques`;
					displayOptions.autoExpand = true;
					displayOptions.hasCSS = true;
					return displayOptions;
				}

			return {
				SetDictionaries: setDictionaries,
				DisplayTechnique: displayTechnique
			};

		}()),

		SideBarData = SideBarData || (function () {
			'use strict';

			var
			printJobs = function () {
				return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_jobpoints"));
			},

			printAttributes = function () {
				return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_attributepoints"));
			},

			buildTechPointsSection = function (fieldName) {
				return FormatCharacterSheetSidebar.BuildPointsSection(fieldName);
			}

			return {
				PrintJobs: printJobs,
				PrintAttributes: printAttributes
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
				printJobs = function (jobsDictionary, jobTechDictionary, roleTechDictionary) {
					let contents = "";

					contents += buildJobLevels.Build(jobsDictionary);
					contents += buildJobs.Build(jobsDictionary, jobTechDictionary);

					return FormatCharacterSheetMain.Build(contents);
				},

				printAttributes = function () {
					let contents = buildAttributes.Build();
					return FormatCharacterSheetMain.Build(contents);
				},
				
				buildJobLevels = buildJobLevels || (function () {
					'use strict';

					var
					build = function (jobsDictionary) {
						let output = "";
						output = buildJobLevels(jobsDictionary);
						return FormatCharacterSheetMain.CollapsibleTab(
							`advancement-jobLevels`, "Job Levels", output);
					},

					buildJobLevels = function (jobsDictionary) {
						let output = "";
						jobsDictionary.iterate(function (job) {
							output += buildJobLevel(job);
						});
						return `<div class="wuxSectionContent wuxFlexTable">
						  ${output}
						</div>`;
					},

					buildJobLevel = function (job) {
						let fieldName = Format.ToCamelCase(job.name);
						let output = FormatCharacterSheetMain.DistinctSection.InputField(job.name, "number", `attr_advancement-level-${fieldName}`);
						output = FormatCharacterSheetMain.DistinctSection.Build(output);
						output = `<div class="wuxFlexTableItemGroup wuxMinWidth200">${output}</div>`;
						return output;
					}
					;
					return {
						Build: build
					}
				}()),

				buildJobs = buildJobs || (function () {
					'use strict';
		
					var
					build = function (jobsDictionary, techDictionary) {
						let output = "";
						jobsDictionary.iterate(function (job) {
							output += buildJob(job, techDictionary);
						});
						return FormatCharacterSheetMain.CollapsibleTab("advancement-JobInfo", "Jobs", output);
					},

					buildJob = function (job, techDictionary) {
						let fieldName = Format.ToCamelCase(job.name);
						return FormatCharacterSheetMain.CollapsibleSection(
							`advancement-${fieldName}`, job.name, buildJobContents(fieldName, job, techDictionary));
					},
	
					buildJobContents = function (fieldName, job, techDictionary) {
						let output = "";
						output += FormatCharacterSheetMain.Desc(job.description);
						output += buildJobContentsLevels(fieldName);
						output += buildJobContentsRole(job);
						output += buildJobContentsGrowths(job);
						output += buildJobContentsTechniques(job, techDictionary);
	
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
						return `${FormatCharacterSheetMain.Header(`${job.name} Role`)}
							${FormatCharacterSheetMain.Desc(`${job.name} is a ${job.group} and grants one level of ${job.group} whenever this job is taken.`)}`;
					},
	
					buildJobContentsGrowths = function (job) {
						return `${FormatCharacterSheetMain.Header(`${job.name} Growths`)}
							${FormatCharacterSheetMain.Table.Build(FormatStatBlock.GetAttributeAbrNames(), FormatStatBlock.ConvertAttributesToArr(job.attributes))}`;
					},
	
					buildJobContentsTechniques = function (job, techDictionary) {
						return `${FormatCharacterSheetMain.Header(`${job.name} Techniques`)}
							${FormatCharacterSheetMain.Desc(`Job Techniques are learned when reaching the associated level.`)}
							${buildJobContentsTechniquesData(job, techDictionary)}`;
					},
	
					buildJobContentsTechniquesData = function (job, techDictionary) {
						let output = "";
						for (let i = 0; i < job.techniques.length; i++) {
							output += `${FormatCharacterSheetMain.Header2(`Level ${job.techniques[i].level}`)}
							${TechniqueData.DisplayTechnique(job.techniques[i].name, techDictionary)}
							`;
						}
						return output;
					}
					;
					return {
						Build: build
					}
				}()),

				buildAttributes = buildAttributes || (function () {
					'use strict';

					var
					build = function () {
						let output = "";
						output = buildAttributes();
						return FormatCharacterSheetMain.CollapsibleTab(
							`advancement-attributes`, "Attributes", output);
					},

					buildAttributes = function () {
						let attributeNames = FormatStatBlock.GetAttributeNames();
						let attributes = FormatStatBlock.GetAttributeAbrNames();
						let output = "";
						for (let i = 0; i < attributeNames.length; i++) {
							output += buildAttribute(attributeNames[i], attributes[i]);
						}
						return `<div class="wuxSectionContent wuxFlexTable">
						  ${output}
						</div>`;
					},

					buildAttribute = function (attributeName, attributeAbr) {
						let fieldName = `attr_advancement-attributes-${attributeAbr}`;
						let output = FormatCharacterSheetMain.Table.FlexTableHeader(attributeName);
						output+= FormatCharacterSheetMain.Table.FlexTableSubheader("Ancestry Bonus");
						output += FormatCharacterSheetMain.Table.FlexTableData(`<span name='${fieldName}-ancestry' value="0">0</span>`);
						output+= FormatCharacterSheetMain.Table.FlexTableSubheader("Job Bonus");
						output += FormatCharacterSheetMain.Table.FlexTableData(`<span name='${fieldName}-job' value="0">0</span>`);
						output+= FormatCharacterSheetMain.Table.FlexTableSubheader("Advancement Bonus");
						output += FormatCharacterSheetMain.Table.FlexTableInput("number", fieldName, "0");
						return FormatCharacterSheetMain.Table.FlextTableGroup(output);
					}
					;
					return {
						Build: build
					}
				}());

			return {
				PrintJobs: printJobs,
				PrintAttributes: printAttributes
			}
		}())

	return {
		Print: print
	};
}());
























