function CreateCharacterSheet(skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString) {
    let sheetsDb = SheetsDatabase.CreateDatabaseCollection(
		skillsArray, languageArray, loreArray, jobsArray, rolesArray, techniqueDatabaseString
	);
	return PrintLargeEntry(DisplayCharacterSheet.Print(sheetsDb));
}

var DisplayCharacterSheet = DisplayCharacterSheet || (function () {
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
			return `<div class="wuxCharacterSheet">
			<input class="wuxCharacterSheetDisplayStyle-Flag" name="attr_characterSheetDisplayStyle" type="hidden" value="0">
			${output}
			</div>`;
		},
		
		buildHiddenFields = function (sheetsDb) {
			let output = "";

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
			let output = WuxSheetNavigation.BuildOriginPageNavigation("Origin") +
				SideBarData.Print() +
				MainContentData.Print();
			return WuxSheet.SetDisplayStyle("Builder", output);
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
					contents = WuxSheetMain.CollapsibleTab("origin_origin", "Origin", contents);

					return WuxSheetMain.Build(contents);
				},

				buildBasicsData = buildBasicsData || (function () {
					'use strict';

					var
						build = function () {
							let output = "";
							output += buildTextInput(WuxDef.Get("Full Name"), WuxDef.GetAttribute("Full Name"));
							output += buildTextInput(WuxDef.Get("Display Name"), WuxDef.GetAttribute("Display Name"));
							output += buildNumberInput(WuxDef.Get("Character Level"), WuxDef.GetAttribute("Character Level"));
							output += buildAffinity();
							return WuxSheetMain.CollapsibleSection("origin_basics", "Basics", output);
						},

						buildTextInput = function (definition, fieldName) {
							return WuxDefinition.DisplayCollapsibleTitle(definition, fieldName) + "\n" +
								WuxSheetMain.Input("text", fieldName);
						},

						buildNumberInput = function (definition, fieldName) {
							return WuxDefinition.DisplayCollapsibleTitle(definition, fieldName) + "\n" +
								WuxSheetMain.Input("number", fieldName);
						},

						buildAffinity = function () {
							let output = "";
							let definition = WuxDef.Get("Affinity");
							output += WuxDefinition.DisplayCollapsibleTitle(definition, definition.getAttribute());
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
			output += printKnowledge(sheetsDb);
			return output;
		},

		printKnowledge = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildTrainingPageNavigation("Knowledge") +
				SideBarData.PrintKnowledge() +
				MainContentData.PrintKnowledge(sheetsDb.language, sheetsDb.lore);
			return WuxSheet.SetDisplayStyle("Knowledge", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printKnowledge = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection("attr_knowledgepoints"));
				},

				buildTechPointsSection = function (fieldName) {
					return WuxSheetSidebar.BuildPointsSection(fieldName);
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
					languageContents = WuxSheetMain.CollapsibleTab("training_language", "Languages", languageContents);

					let loreContents = buildLoreData.Build(loreDictionary);
					loreContents = WuxSheetMain.CollapsibleTab("training_lore", "Lore", loreContents);

					return WuxSheetMain.Build(languageContents + loreContents);
				},

				buildLanguageData = buildLanguageData || (function () {
					'use strict';

					var
						build = function (database) {
							return `<div class="wuxSectionBlock">
								<div class="wuxSectionContent">
									${WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2)}
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
							let fieldName = Format.ToCamelCase(knowledge.name);

							return `${buildMainLanguage(knowledge, `attr_languages-training-${fieldName}`)}
							${buildSubLanguage(WuxDef.Get("Language").getAttribute(fieldName), "Speak")}
							${buildSubLanguage(WuxDef.Get("Language").getAttribute([fieldName, "Read"]), "Read / Write")}`;
						},

						buildMainLanguage = function (knowledge, fieldName) {
							let expandFieldName = `${fieldName}-expand`;
							let expandContents = `<div class="wuxDescription">${knowledge.description}</div>`;

							let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
							${buildInteractionMainBlock(knowledge)}
							${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

							return WuxSheetMain.InteractionElement.Build(true, output);
						},

						buildInteractionMainBlock = function (knowledge) {
							return `<div class="wuxInteractiveInnerBlock">
								<span class="wuxHeader">${knowledge.name}</span>
								- <span class="wuxSubheader">${knowledge.location}</span>
							</div>`;
						},

						buildSubLanguage = function (fieldName, subGroupName) {

							let output = `${WuxSheetMain.InteractionElement.ExpandableBlockEmptyIcon()}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(fieldName, `<span class="wuxSubheader">${subGroupName}</span>`)}`;

							return WuxSheetMain.InteractionElement.Build(true, output);
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
									${WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2)}
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

						buildLore = function (knowledge, interactHeader, knowledgeDefinition) {
							let fieldName = Format.ToCamelCase(knowledge.name);
							let expandFieldName = `attr_lore-training-${fieldName}-expand`;
							let expandContents = `<div class="wuxDescription">${knowledge.description}</div>`;

							let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
					${WuxSheetMain.InteractionElement.CheckboxBlockIcon(knowledgeDefinition.getAttribute([fieldName, "Rank"]), interactHeader)}
					${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

							return WuxSheetMain.InteractionElement.Build(true, output);
						},

						buildMainLore = function (knowledge) {
							return buildLore(knowledge, `<span class="wuxHeader">General ${knowledge.name}</span>`, WuxDef.Get("Lore"));
						},

						buildSubLore = function (knowledge) {
							return buildLore(knowledge, `<span class="wuxSubheader">${knowledge.name}</span>`, WuxDef.Get("Lore"));
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
			output += printAttributes(sheetsDb);
			return output;
		},

		printJobs = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildAdvancementPageNavigation("Jobs") +
				SideBarData.PrintJobs() +
				MainContentData.PrintJobs(sheetsDb.job, sheetsDb.role, sheetsDb.techniques);
			return WuxSheet.SetDisplayStyle("Jobs", output);
		},

		printSkills = function (sheetsDb) {
			let output = WuxSheetNavigation.BuildAdvancementPageNavigation("Skills") +
				SideBarData.PrintSkills() +
				MainContentData.PrintSkills(sheetsDb.skills);
			return WuxSheet.SetDisplayStyle("Skills", output);
		},

		printAttributes = function (sheetsDb) {

			let output = WuxSheetNavigation.BuildAdvancementPageNavigation("Attributes") +
				SideBarData.PrintAttributes() +
				MainContentData.PrintAttributes();
			return WuxSheet.SetDisplayStyle("Attributes", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				printJobs = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection("attr_jobpoints"));
				},

				printSkills = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection("attr_skillpoints"));
				},

				printAttributes = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection("attr_attributepoints"));
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

					contents += buildJobLevels.Build(jobsDictionary);
					contents += buildJobs.Build(jobsDictionary, techDictionary);
					contents += buildRoles.Build(rolesDictionary, techDictionary);

					return WuxSheetMain.Build(contents);
				},

				printSkills = function (skillDictionary) {
					let contents = buildSkills.Build(skillDictionary);
					contents = WuxSheetMain.CollapsibleTab("training_skills", "Skills", contents);

					return WuxSheetMain.Build(contents);
				},

				printAttributes = function () {
					let contents = buildAttributes.Build();
					return WuxSheetMain.Build(contents);
				},

				buildJobLevels = buildJobLevels || (function () {
					'use strict';

					var
						build = function (jobsDictionary) {
							let output = "";
							output = buildJobLevels(jobsDictionary, WuxDef.Get("Job"));
							return WuxSheetMain.CollapsibleTab(
								`advancement-jobLevels`, "Job Levels", output);
						},

						buildJobLevels = function (jobsDictionary, jobDefinition) {
							let output = "";
							jobsDictionary.iterate(function (job) {
								output += buildJobLevel(job, jobDefinition);
							});
							return `<div class="wuxSectionContent wuxFlexTable">
						  ${output}
						</div>`;
						},

						buildJobLevel = function (job, jobDefinition) {
							let fieldName = Format.ToCamelCase(job.name);
							let output = WuxSheetMain.DistinctSection.InputField(job.name, "number", jobDefinition.getAttribute(fieldName), "0");
							output = WuxSheetMain.DistinctSection.Build(output);
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
							return WuxSheetMain.CollapsibleTab("advancement-JobInfo", "Jobs", output);
						},

						buildJob = function (job, techDictionary) {
							let fieldName = Format.ToCamelCase(job.name);
							return WuxSheetMain.CollapsibleSection(
								`advancement-${fieldName}`, job.name, buildJobContents(fieldName, job, techDictionary));
						},

						buildJobContents = function (fieldName, job, techDictionary) {
							let output = "";
							
							output += WuxSheetMain.Desc(job.description);
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
									${WuxTechnique.Get(technique, displayOptions)}
									`;
								}
							}
							return output;
						},
		
						getDisplayOptions = function (techniqueDefinition) {
							var displayOptions = WuxTechnique.GetDisplayOptions();
							displayOptions.categoryName = "job";
							displayOptions.sectionName = `${displayOptions.categoryName}_techniques`;
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

				buildRoles = buildRoles || (function () {
					'use strict';

					var
						build = function (rolesDictionary, techDictionary) {
							let output = "";
							rolesDictionary.iterate(function (role) {
								output += buildRole(role, techDictionary);
							});
							return WuxSheetMain.CollapsibleTab("advancement-RoleInfo", "Roles", output);
						},

						buildRole = function (role, techDictionary) {
							let fieldName = Format.ToCamelCase(role.name);
							return WuxSheetMain.CollapsibleSection(
								`advancement-${fieldName}`, role.name, buildRoleContents(role, techDictionary, WuxDef.Get("Technique")));
						},

						buildRoleContents = function (role, techDictionary, techniqueDefinition) {
							let output = "";
							output += WuxSheetMain.Desc(role.description);
							output += buildRoleContentsTechniques(role, techDictionary, techniqueDefinition);

							return output;
						},

						buildRoleContentsTechniques = function (role, techDictionary, techniqueDefinition) {
							return `${WuxSheetMain.Header(`${role.name} Techniques`)}
							${WuxSheetMain.Desc(`Role Techniques are learned when reaching the associated level in the role.`)}
							${buildRoleContentsTechniquesData(role, techDictionary, techniqueDefinition)}`;
						},

						buildRoleContentsTechniquesData = function (role, techDictionary, techniqueDefinition) {
							let output = "";
							let technique = {};
							let displayOptions = getDisplayOptions(techniqueDefinition);
							for (let i = 0; i < role.techniques.length; i++) {
								technique = techDictionary.get(role.techniques[i].name);
								if (technique != undefined) {
									output += `${WuxSheetMain.Header2(`Level ${role.techniques[i].level}`)}
									${WuxTechnique.Get(technique, displayOptions)}
									`;
								}
							}
							return output;
						},
		
						getDisplayOptions = function (techniqueDefinition) {
							var displayOptions = WuxTechnique.GetDisplayOptions();
							displayOptions.categoryName = "job";
							displayOptions.sectionName = `${displayOptions.categoryName}_techniques`;
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

				buildSkills = buildSkills || (function () {
					'use strict';

					var
						build = function (database) {
							return `<div class="wuxSectionBlock">
								<div class="wuxSectionContent">
									${WuxSheetMain.MultiRowGroup(buildGroups(database), WuxSheetMain.Table.FlexTable, 2)}
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
							let fieldName = Format.ToCamelCase(skill.name);
							let definition = WuxDef.Get("Skill");

							let expandFieldName = `${definition.getAttribute([fieldName])}-expand`;
							let expandContents = `<div class="wuxDescription">${skill.description}</div>`;
							let interactHeader = `<span class="wuxHeader">${skill.name} (${skill.abilityScore})</span>`;

							let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
								${WuxSheetMain.InteractionElement.CheckboxBlockIcon(definition.getAttribute([fieldName, "Rank"]), interactHeader)}
								${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

							return WuxSheetMain.InteractionElement.Build(true, output);
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
							return WuxSheetMain.CollapsibleTab(
								`advancement-attributes`, "Attributes", output);
						},

						buildAttributes = function () {
							let attributes = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
							let output = "";
							for (let i = 0; i < attributes.length; i++) {
								output += buildAttribute(attributes[i].name, attributes[i].abbreviation);
							}
							return `<div class="wuxSectionContent wuxFlexTable">
						  ${output}
						</div>`;
						},

						buildAttribute = function (attributeName, attributeAbr) {
							let fieldName = `attr_advancement-attributes-${attributeAbr}`;
							let output = WuxSheetMain.Table.FlexTableHeader(attributeName);
							output += WuxSheetMain.Table.FlexTableSubheader("Ancestry Bonus");
							output += WuxSheetMain.Table.FlexTableData(`<span name='${fieldName}-ancestry' value="0">0</span>`);
							output += WuxSheetMain.Table.FlexTableSubheader("Job Bonus");
							output += WuxSheetMain.Table.FlexTableData(`<span name='${fieldName}-job' value="0">0</span>`);
							output += WuxSheetMain.Table.FlexTableSubheader("Advancement Bonus");
							output += WuxSheetMain.Table.FlexTableInput("number", fieldName, "0");
							return WuxSheetMain.Table.FlextTableGroup(output);
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
				MainContentData.Print(sheetsDb.techniques);
			return WuxSheet.SetDisplayStyle("Techniques", output);
		},

		SideBarData = SideBarData || (function () {
			'use strict';

			var
				print = function () {
					return WuxSheetSidebar.Build(buildTechPointsSection("attr_techpoints"));
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

				print = function (techniqueDatabase) {

					return WuxSheetMain.Build(buildTechniquesByGroup(techniqueDatabase, WuxDef.Get("Technique")));
				},

				buildTechniquesByGroup = function (techniqueDatabase, techniqueDefinition) {
					let displayOptions = getDisplayOptions(techniqueDefinition);
					let output = "";
					output += buildStandardTechniqueGroup(techniqueDatabase, "Item", displayOptions);
					output += buildStandardTechniqueGroup(techniqueDatabase, "Active", displayOptions);
					output += buildStandardTechniqueGroup(techniqueDatabase, "Support", displayOptions);
					output += buildStandardTechniqueGroup(techniqueDatabase, "Standard", displayOptions);
					return output;
				},

				getDisplayOptions = function (techniqueDefinition) {
					let displayOptions = WuxTechnique.GetDisplayOptions();
					displayOptions.categoryName = "techniques";
					displayOptions.sectionName = `${displayOptions.categoryName}_filteredTechniques`;
					displayOptions.techniqueDefinition = techniqueDefinition;
					displayOptions.hasCSS = true;
					displayOptions.showSelect = true;
					return displayOptions;
				},

				buildStandardTechniqueGroup = function (techniqueDatabase, groupName, displayOptions) {
					let filters = [new DatabaseFilterData("group", groupName), new DatabaseFilterData("augment", "")];
					let filteredData = techniqueDatabase.filter(filters);

					let output = "";
					for (let i = 0; i < filteredData.length; i++) {
						output += buildTechTreeDisplaySection(filteredData[i], techniqueDatabase, displayOptions);
					}
					return WuxSheetMain.CollapsibleTab(`${displayOptions.sectionName}_${groupName}`, `${groupName} Techniques`, output);
				},

				buildTechTreeDisplaySection = function (technique, techniqueDatabase, displayOptions) {
					let filters = [new DatabaseFilterData("augment", technique.name)];
					let augmentTechniques = techniqueDatabase.filter(filters);

					let output = "";
					output += `<div class="${augmentTechniques.length > 0 ? "wuxFeatureGroupWithAugments" : "wuxFeatureGroup"}">\n`;
					output += buildTechnique(technique, displayOptions);
					output += buildAugmnentTechniques(technique, augmentTechniques, displayOptions);
					output += `</div>\n`;
					return output;
				},

				buildTechnique = function (technique, displayOptions) {
					let fieldName = `attr_${displayOptions.sectionName}-filtered-${Format.ToCamelCase(technique.name)}`;

					let output = "";
					output += `<input type="hidden" class="wuxFilterFeature-flag" name="${fieldName}" value="">`;
					output += WuxTechnique.Get(technique, displayOptions);
					return output;
				},

				buildAugmnentTechniques = function (technique, augmentTechniques, displayOptions) {
					let augmentTechnique = {};
					let output = "";
					for (var i = 0; i < augmentTechniques.length; i++) {
						augmentTechnique = new TechniqueData(augmentTechniques[i]);
						augmentTechnique.setAugmentTechValues(technique);
						output += buildTechnique(augmentTechnique, displayOptions);
					}
					return output;
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


var BuilderBackend = BuilderBackend || (function () {
    'use strict';

	var
	    print = function (sheetsDb) {
	        let output = "";
	        output += buildCharacterCreation.Build(sheetsDb);
	        output += buildBackendTools.Build(sheetsDb);
	        return output;
			
		},
		
		buildCharacterCreation = buildCharacterCreation || (function () {
		    'use strict';
		    
		    var
		    build = function(sheetsDb) {
		        let jsClassData = new JavascriptDataClass();
		        return jsClassData.print("CharacterCreationManager");
		    }
		    ;
		    return {
		        Build: build
		    }
	    }()),
	    
	    buildBackendTools = buildBackendTools || (function () {
		    'use strict';
		    
		    var
		    build = function(sheetsDb) {
		        let jsClassData = new JavascriptDataClass();
		        return jsClassData.print("BackendTools");
		    }
		    
		    
		    ;
		    return {
		        Build: build
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
	        output += buildTraining.Build(sheetsDb);
	        return output;
			
		},
		
		buildTraining = buildTraining || (function () {
		    'use strict';
		    
		    var
		    build = function(sheetsDb) {
		        let jsClassData = new JavascriptDataClass();
		        return jsClassData.print("TrainingManager");
		    },
		    
		    saveChanges = function() {
		        
		    }
		    ;
		    return {
		        Build: build
		    }
	    }()),
	    
	    buildKnowledge = buildKnowledge || (function () {
		    'use strict';
		    
		    var
		    build = function(sheetsDb) {
		        let jsClassData = new JavascriptDataClass();
		        return jsClassData.print("TrainingKnowledgeManager");
		    }
		    ;
		    return {
		        Build: build
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
	        return output;
			
		},
		
		buildJobs = buildJobs || (function () {
		    'use strict';
		    
		    var
		    build = function(sheetsDb) {
		        let jsClassData = new JavascriptDataClass();
		    }
		    ;
		    return {
		        Build: build
		    }
	    }());
	return {
	    Print: print
	}
}())



















