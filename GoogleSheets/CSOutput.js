function CreateCharacterSheet(definitionsArray, skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString) {
    let sheetsDb = CreateSheetsDatabase.CreateDatabaseCollection(skillsArray, languageArray, loreArray, jobsArray, rolesArray, definitionsArray, techniqueDatabaseString);
	return PrintLargeEntry(DisplayCharacterSheet.Print(sheetsDb));
}

var DisplayCharacterSheet = DisplayCharacterSheet || (function () {
	'use strict';
	
	var
		print = function (sheetsDb) {
			let output = "";
			output += DisplayOriginSheet.Print(sheetsDb);
			output += DisplayTrainingSheet.Print(sheetsDb);
			output += DisplayAdvancementSheet.Print(sheetsDb);
			// output += DisplayTechniquesSheet.Print(techniqueDatabase);
			return buildSheetContainer(output);
		},

		buildSheetContainer = function (contents) {
			return `<div class="wuxCharacterSheet">
			<input class="wuxCharacterSheetDisplayStyle-Flag" name="attr_characterSheetDisplayStyle" type="hidden" value="0">
			${contents}
			</div>`;
		},

		buildSheetWorkerContainer = function (contents) {
			return `<script type="text/worker">
			on("sheet:opened", function(eventinfo) {
				on_sheet_opened();
			});
			${contents}
			</script>`;
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
			let output = FormatCharacterSheetNavigation.BuildOriginPageNavigation("Origin") +
				SideBarData.Print() +
				MainContentData.Print(sheetsDb.definitions);
			return FormatCharacterSheet.SetDisplayStyle("Builder", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				print = function () {
					return FormatCharacterSheetSidebar.Build("<div>&nbsp;</div>");
				}

			return {
				Print: print
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
				print = function (definitionsDatabase) {
					let output = "";
					output += printBasics(definitionsDatabase);

					return output;
				},

				printBasics = function (definitionsDatabase) {
					let contents = buildBasicsData.Build(definitionsDatabase);
					contents = FormatCharacterSheetMain.CollapsibleTab("origin_origin", "Origin", contents);

					return FormatCharacterSheetMain.Build(contents);
				},

				buildBasicsData = buildBasicsData || (function () {
					'use strict';

					var
						build = function (definitionsDatabase) {
							let output = "";
							output += buildTextInput(definitionsDatabase.get("Full Name"), "attr_full_name");
							output += buildTextInput(definitionsDatabase.get("Display Name"), "attr_nickname");
							output += buildNumberInput(definitionsDatabase.get("Character Level"), "attr_advancement_level");
							output += buildAffinity(definitionsDatabase);
							return FormatCharacterSheetMain.CollapsibleSection("origin_basics", "Basics", output);
						},

						buildTextInput = function (definition, fieldName) {
							return FormatDefinitions.DisplayCollapsibleTitle(definition, fieldName) + "\n" +
								FormatCharacterSheetMain.Input("text", fieldName);
						},

						buildNumberInput = function (definition, fieldName) {
							return FormatDefinitions.DisplayCollapsibleTitle(definition, fieldName) + "\n" +
								FormatCharacterSheetMain.Input("number", fieldName);
						},

						buildAffinity = function (definitionsDatabase) {
							let output = "";
							let definition = definitionsDatabase.get("Affinity");
							output += FormatDefinitions.DisplayCollapsibleTitle(definition, definition.getVariable());
							output += FormatCharacterSheetMain.Select(definition.getVariable(), definitionsDatabase.filter([new DatabaseFilterData("group", "Affinity")]));
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
			output += printKnowledge(sheetsDb);
			return output;
		},

		printKnowledge = function (sheetsDb) {
			let output = FormatCharacterSheetNavigation.BuildTrainingPageNavigation("Knowledge") +
				SideBarData.PrintKnowledge() +
				MainContentData.PrintKnowledge(sheetsDb.language, sheetsDb.lore);
			return FormatCharacterSheet.SetDisplayStyle("Knowledge", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printKnowledge = function () {
					return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_knowledgepoints"));
				},

				buildTechPointsSection = function (fieldName) {
					return FormatCharacterSheetSidebar.BuildPointsSection(fieldName);
				}

			return {
				PrintKnowledge: printKnowledge
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var
				printKnowledge = function (languageDictionary, loreDictionary) {
					let languageContents = buildLanguageData.Build(languageDictionary);
					languageContents = FormatCharacterSheetMain.CollapsibleTab("training_language", "Languages", languageContents);

					let loreContents = buildLoreData.Build(loreDictionary);
					loreContents = FormatCharacterSheetMain.CollapsibleTab("training_lore", "Lore", loreContents);

					return FormatCharacterSheetMain.Build(languageContents + loreContents);
				},

				buildLanguageData = buildLanguageData || (function () {
					'use strict';

					var
						build = function (database) {
							return `<div class="wuxSectionBlock">
								<div class="wuxSectionContent">
									${FormatCharacterSheetMain.MultiRowGroup(buildGroups(database), FormatCharacterSheetMain.Table.FlexTable, 2)}
								</div>
							</div>`;
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

							return FormatCharacterSheetMain.InteractionElement.Build(true, output);
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

							return FormatCharacterSheetMain.InteractionElement.Build(true, output);
						}

					return {
						Build: build
					}
				})(),

				buildLoreData = buildLoreData || (function () {
					'use strict';

					var
						build = function (database) {
							return `<div class="wuxSectionBlock">
								<div class="wuxSectionContent">
									${FormatCharacterSheetMain.MultiRowGroup(buildGroups(database), FormatCharacterSheetMain.Table.FlexTable, 2)}
								</div>
							</div>`;
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
							let fieldName = `attr_lore-training-${Format.ToCamelCase(knowledge.name)}`;
							let expandFieldName = `${fieldName}-expand`;
							let expandContents = `<div class="wuxDescription">${knowledge.description}</div>`;

							let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
					${FormatCharacterSheetMain.InteractionElement.CheckboxBlockIcon(fieldName, interactHeader)}
					${FormatCharacterSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

							return FormatCharacterSheetMain.InteractionElement.Build(true, output);
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
			output += printAttributes();
			return output;
		},

		printJobs = function (sheetsDb) {
			let output = FormatCharacterSheetNavigation.BuildAdvancementPageNavigation("Jobs") +
				SideBarData.PrintJobs() +
				MainContentData.PrintJobs(sheetsDb.job, sheetsDb.role, sheetsDb.techniques);
			return FormatCharacterSheet.SetDisplayStyle("Jobs", output);
		},

		printSkills = function (sheetsDb) {
			let output = FormatCharacterSheetNavigation.BuildAdvancementPageNavigation("Skills") +
				SideBarData.PrintSkills() +
				MainContentData.PrintSkills(sheetsDb.skills);
			return FormatCharacterSheet.SetDisplayStyle("Skills", output);
		},

		printAttributes = function () {

			let output = FormatCharacterSheetNavigation.BuildAdvancementPageNavigation("Attributes") +
				SideBarData.PrintAttributes() +
				MainContentData.PrintAttributes();
			return FormatCharacterSheet.SetDisplayStyle("Attributes", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printJobs = function () {
					return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_jobpoints"));
				},

				printSkills = function () {
					return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_skillpoints"));
				},

				printAttributes = function () {
					return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_attributepoints"));
				},

				buildTechPointsSection = function (fieldName) {
					return FormatCharacterSheetSidebar.BuildPointsSection(fieldName);
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

					contents += buildJobLevels.Build(jobsDictionary);
					contents += buildJobs.Build(jobsDictionary, techDictionary);
					contents += buildRoles.Build(rolesDictionary, techDictionary);

					return FormatCharacterSheetMain.Build(contents);
				},

				printSkills = function (skillDictionary) {
					let contents = buildSkills.Build(skillDictionary);
					contents = FormatCharacterSheetMain.CollapsibleTab("training_skills", "Skills", contents);

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
							let output = FormatCharacterSheetMain.DistinctSection.InputField(job.name, "number", `attr_advancement-level-${fieldName}`, "0");
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
							let technique = {};
							let displayOptions = getDisplayOptions();
							for (let i = 0; i < job.techniques.length; i++) {
								technique = techDictionary.get(job.techniques[i].name);
								if (technique != undefined) {
									output += `${FormatCharacterSheetMain.Header2(`Level ${job.techniques[i].level}`)}
									${DisplayTechniqueHtml.Get(technique, displayOptions)}
									`;
								}
							}
							return output;
						},
		
						getDisplayOptions = function () {
							var displayOptions = DisplayTechniqueHtml.GetDisplayOptions();
							displayOptions.categoryName = "job";
							displayOptions.sectionName = `${displayOptions.categoryName}_techniques`;
							displayOptions.autoExpand = true;
							displayOptions.hasCSS = true;
							return displayOptions;
						}
						;
					return {
						Build: build
					}
				}()),

				buildRoles = buildRoles || (function () {
					'use strict';

					var
						build = function (rolesDictionary, techDictionary) {
							let output = "";
							rolesDictionary.iterate(function (role) {
								output += buildRole(role, techDictionary);
							});
							return FormatCharacterSheetMain.CollapsibleTab("advancement-RoleInfo", "Roles", output);
						},

						buildRole = function (role, techDictionary) {
							let fieldName = Format.ToCamelCase(role.name);
							return FormatCharacterSheetMain.CollapsibleSection(
								`advancement-${fieldName}`, role.name, buildRoleContents(role, techDictionary));
						},

						buildRoleContents = function (role, techDictionary) {
							let output = "";
							output += FormatCharacterSheetMain.Desc(role.description);
							output += buildRoleContentsTechniques(role, techDictionary);

							return output;
						},

						buildRoleContentsTechniques = function (role, techDictionary) {
							return `${FormatCharacterSheetMain.Header(`${role.name} Techniques`)}
							${FormatCharacterSheetMain.Desc(`Role Techniques are learned when reaching the associated level in the role.`)}
							${buildRoleContentsTechniquesData(role, techDictionary)}`;
						},

						buildRoleContentsTechniquesData = function (role, techDictionary) {
							let output = "";
							for (let i = 0; i < role.techniques.length; i++) {
								output += `${FormatCharacterSheetMain.Header2(`Level ${role.techniques[i].level}`)}
							${TechniqueData.DisplayTechnique(role.techniques[i].name, techDictionary)}
							`;
							}
							return output;
						}
						;
					return {
						Build: build
					}
				}()),

				buildSkills = buildSkills || (function () {
					'use strict';

					var
						build = function (database) {
							return `<div class="wuxSectionBlock">
								<div class="wuxSectionContent">
									${FormatCharacterSheetMain.MultiRowGroup(buildGroups(database), FormatCharacterSheetMain.Table.FlexTable, 2)}
								</div>
							</div>`;
						},

						buildGroups = function (database) {
							let output = [];
							let groupName = "";
							let filterSettings = [new DatabaseFilterData("group", "")];
							let filteredData = {};
							let languageGroups = database.getPropertyValues("group");
							languageGroups = languageGroups.sort();
							for (let i = 0; i < languageGroups.length; i++) {
								if (languageGroups[i] == "") {
									continue;
								}
								groupName = languageGroups[i];
								filterSettings[0].value = groupName;
								filteredData = database.filter(filterSettings);
								output.push(buildGroup(groupName, filteredData));
							}
							return output;
						},

						buildGroup = function (groupName, filteredData) {
							return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
						<div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
						<div class="wuxFlexTableItemData wuxTextLeft">
							${buildSkillGroupSkills(filteredData)}
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

							return FormatCharacterSheetMain.InteractionElement.Build(true, output);
						}
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
							output += FormatCharacterSheetMain.Table.FlexTableSubheader("Ancestry Bonus");
							output += FormatCharacterSheetMain.Table.FlexTableData(`<span name='${fieldName}-ancestry' value="0">0</span>`);
							output += FormatCharacterSheetMain.Table.FlexTableSubheader("Job Bonus");
							output += FormatCharacterSheetMain.Table.FlexTableData(`<span name='${fieldName}-job' value="0">0</span>`);
							output += FormatCharacterSheetMain.Table.FlexTableSubheader("Advancement Bonus");
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
		print = function (techniqueDatabase) {
			let dataObj = TechniqueData.Build(techniqueDatabase);

			let output = FormatCharacterSheetNavigation.BuildTechniquesNavigation() +
				SideBarData.Print() +
				MainContentData.Print(dataObj);
			return FormatCharacterSheet.SetDisplayStyle("Techniques", output);
		},

		TechniqueData = TechniqueData || (function () {
			'use strict';

			var
				// initialization
				build = function (techniqueDatabase) {
					let dataObj = getDataObj();
					initializeDisplayOptions(dataObj);
					setTechniqueData(dataObj, techniqueDatabase);
					return dataObj;
				},

				getDataObj = function () {
					return {
						techniqueDisplayData: "",
						groups: ["Item", "Active", "Support", "Standard"],
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
					dataObj = FormatTechniques.IterateOverTechArrays(dataObj, createTechniqueSelectionTechniqueList, techniqueDatabase, dataObj.groups);
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
					dataObj.techniqueDisplayData += `<div class="${technique.augments.length > 0 ? "wuxFeatureGroupWithAugments" : "wuxFeatureGroup"}">\n`;
					buildTechniqueDisplay(dataObj, technique);
					buildAugmentTechDisplayData(dataObj, technique);
					dataObj.techniqueDisplayData += `</div>\n`;
				},

				buildTechniqueDisplay = function (dataObj, technique) {
					let fieldName = `attr_${dataObj.displayOptions.sectionName}-filtered-${Format.ToCamelCase(technique.name)}`;
					dataObj.techniqueDisplayData += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="">`;
					dataObj.techniqueDisplayData += DisplayTechniqueHtml.Get(technique, dataObj.displayOptions);
				},

				buildAugmentTechDisplayData = function (dataObj, technique) {
					let augmentTechnique = {};
					for (var i = 0; i < technique.augments.length; i++) {
						augmentTechnique = FormatTechniques.SetAugmentTechnique(technique.augments[i], technique);
						buildTechniqueDisplay(dataObj, augmentTechnique);
					}
				}

			return {
				Build: build
			}

		}()),

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				print = function () {
					return FormatCharacterSheetSidebar.Build(buildTechPointsSection("attr_techpoints"));
				},

				buildTechPointsSection = function (fieldName) {
					return FormatCharacterSheetSidebar.BuildPointsSection(fieldName);
				}

			return {
				Print: print
			};

		}()),

		MainContentData = MainContentData || (function () {
			'use strict';

			var

				print = function (dataObj) {

					return FormatCharacterSheetMain.Build(buildTechniqueSelectionInformationSection() +
						buildTechniqueSelectionTechniquesSection(dataObj));
				},

				buildTechniqueSelectionInformationSection = function () {
					let output = "";

					return output;
				},

				buildTechniqueSelectionTechniquesSection = function (dataObj) {
					dataObj.techniqueDisplayData = FormatCharacterSheetMain.CollapsibleTab(
						dataObj.displayOptions.sectionName, "Techniques", dataObj.techniqueDisplayData);
					dataObj.techniqueDisplayData = FormatCharacterSheetMain.Tab(dataObj.techniqueDisplayData);

					return dataObj.techniqueDisplayData;
				},

				getDisplayOptions = function (dataObj) {
					dataObj.displayOptions.categoryName = "techniques";
					dataObj.displayOptions.sectionName = `${dataObj.displayOptions.categoryName}_filteredTechniques`;
					dataObj.displayOptions.hasCSS = true;
					dataObj.displayOptions.showSelect = true;
				},

				// set technique data
				setTechniqueData = function (dataObj, techniqueDatabaseData) {
					let techniqueDatabase = FormatTechniques.ParseTechniquesDatabase(techniqueDatabaseData);
					dataObj = FormatTechniques.IterateOverTechArrays(dataObj, createTechniqueSelectionTechniqueList, techniqueDatabase, dataObj.groups);
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
					dataObj.techniqueDisplayData += `<div class="${technique.augments.length > 0 ? "wuxFeatureGroupWithAugments" : "wuxFeatureGroup"}">\n`;
					buildTechniqueDisplay(dataObj, technique);
					buildAugmentTechDisplayData(dataObj, technique);
					dataObj.techniqueDisplayData += `</div>\n`;
				},

				buildTechniqueDisplay = function (dataObj, technique) {
					let fieldName = `attr_${dataObj.displayOptions.sectionName}-filtered-${Format.ToCamelCase(technique.name)}`;
					dataObj.techniqueDisplayData += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="">`;
					dataObj.techniqueDisplayData += DisplayTechniqueHtml.Get(technique, dataObj.displayOptions);
				},

				buildAugmentTechDisplayData = function (dataObj, technique) {
					let augmentTechnique = {};
					for (var i = 0; i < technique.augments.length; i++) {
						augmentTechnique = FormatTechniques.SetAugmentTechnique(technique.augments[i], technique);
						buildTechniqueDisplay(dataObj, augmentTechnique);
					}
				}

			return {
				Print: print
			};
		}())
		;
	return {
		Print: print
	};
}());





















