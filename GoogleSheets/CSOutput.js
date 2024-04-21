  // Character Technique: Page
  // =================================================
  
  function CreateTechniquesSheetSection (techniqueDatabase) {
	let output = "";
	output += DisplayTechniquesSheet.Print(techniqueDatabase);
	return PrintLargeEntry(output);
  }
  
  var DisplayTechniquesSheet = DisplayTechniquesSheet || (function() {
	  'use strict';
  
	  var 
		  print = function(techniqueDatabase) {
			let dataObj = initializeTechniqueData();
			setTechniqueData(dataObj, techniqueDatabase);
  
			return createTechniqueSelectionSection(dataObj);
		  },
  
		  // initialization
		  initializeTechniqueData = function() {
			let dataObj = getDataObj();
			initializeDisplayOptions(dataObj);
			return dataObj;
		  },
  
		  getDataObj = function() {
			return {
			  techniqueDisplayData: "",
			  techFilterData: FormatTechniques.CreateTechniqueFilterData(),
			  displayOptions: DisplayTechniqueHtml.GetDisplayOptions()
			}
		  },
  
		  initializeDisplayOptions = function(dataObj) {
			dataObj.displayOptions.categoryName = "techniques";
			dataObj.displayOptions.sectionName = `${dataObj.displayOptions.categoryName}_filteredTechniques`;
			dataObj.displayOptions.hasCSS = true;
			dataObj.displayOptions.showSelect = true;
		  },
  
		  // set technique data
		  setTechniqueData = function(dataObj, techniqueDatabaseData) {
			let techniqueDatabase = FormatTechniques.ParseTechniquesDatabase(techniqueDatabaseData);
			dataObj = FormatTechniques.IterateOverTechArrays(dataObj, createTechniqueSelectionTechniqueList, techniqueDatabase, 
			  ["Standard", "Hero", "Creature", "Combat", "Social", "Talent", "Acumen", "Job"]);
		  },
  
		  // create technique display section
		  createTechniqueSelectionTechniqueList = function (dataObj, techData) {
  
			techData.iterate(function(technique) {
			  dataObj.techFilterData.add(technique);
			  buildTechTreeDisplaySection(dataObj, technique);
			});
  
			return dataObj;
		  },
  
		  buildTechTreeDisplaySection = function(dataObj, technique) {
			buildTechniqueDisplay(dataObj, technique);
			buildAugmentTechDisplayData(dataObj, technique);
		  },
  
		  buildTechniqueDisplay = function(dataObj, technique) {
			dataObj.techniqueDisplayData += `<input type="hidden" class="wuxFilterFeature-flag" name="attr_${dataObj.displayOptions.sectionName}-filtered-${Format.ToCamelCase(technique.name)}" value="">`;
			dataObj.techniqueDisplayData += DisplayTechniqueHtml.Get(technique, dataObj.displayOptions);
		  },
  
		  buildAugmentTechDisplayData = function(dataObj, technique) {
			let augmentTechnique = {};
			for (var i = 0; i < technique.augments.length; i++) {
			  augmentTechnique = FormatTechniques.SetAugmentTechnique(technique.augments[i], technique);
			  buildTechniqueDisplay(dataObj, augmentTechnique);
			}
		  },
  
		  // section creation
		  createTechniqueSelectionSection = function(dataObj) {
			return createSideBar(dataObj) + createMainContent(dataObj);
		  },
  
		  createSideBar = function(dataObj) {
			let output = "";
			output += buildAptitudesSection(dataObj.displayOptions);
			output += buildTechPointsSection(dataObj.displayOptions);
  
			return FormatCharacterSheetSidebar.Build(output);
		  },
  
		  buildAptitudesSection = function(displayOptions) {
			let output = buildAptitudeSectionData("Warfare");
			output += buildAptitudeSectionData("Magic");
			output += buildAptitudeSectionData("Talent");
			output += buildAptitudeSectionData("Acumen");
  
			return FormatCharacterSheetSidebar.CollapsibleHeader("Aptitudes", `${displayOptions.categoryName}_aptitudes`, output);
		  },
  
		  buildAptitudeSectionData = function(name) {
			let id = Format.ToCamelCase(name); 
			return FormatCharacterSheetSidebar.AttributeSection(name, `<span name='attr_aptitude-${id}' value="0">0</span>`);
		  },
  
		  buildTechPointsSection = function(displayOptions) {
			return `<div class="wuxHeader">&nbsp;Build</div>
			  ${buildTechPointsSectionData("Base")}
			  ${buildTechPointsSectionData("Augment")}`;
		  },
  
		  buildTechPointsSectionData = function(name) {
			let id = Format.ToCamelCase(name);
			let output = `<span name='attr_techpoints-${id}' value="0">0</span>
			  <span>/ </span>
			  <span name='attr_techpoints-${id}_max' value="0">0</span>`;
			return FormatCharacterSheetSidebar.AttributeSection(name, output);
		  },
  
		  // main content creation
		  createMainContent = function(dataObj) {
			
			return FormatCharacterSheetMain.Build(buildTechniqueSelectionInformationSection() 
			  + buildTechniqueSelectionTechniquesSection(dataObj));
		  },
  
		  buildTechniqueSelectionInformationSection = function() {
			let output = "";
  
			return output;
		  },
  
		  buildTechniqueSelectionTechniquesSection = function(dataObj) {
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
  
  
  // Character Training: Skills
  // =================================================
  
  function CreateTrainingSheetSection (skillsArray) {
	let output = "";
	output += DisplayTrainingSkillsSheet.Print(skillsArray);
	return PrintLargeEntry(output);
  }
  
  var DisplayTrainingSkillsSheet = DisplayTrainingSkillsSheet || (function() {
	  'use strict';
  
	  var
		print = function(skillsArray) {
		  let skillDictionary = FormatSkills.CreateSkillsDictionary(skillsArray);
		  return createSkillSelectionSection(skillDictionary);
		},
  
		createSkillSelectionSection = function(skillDictionary) {
		  return createSideBar() + createMainContent(skillDictionary);
		},
  
		buildSkillGroupSections = function(skillDictionary) {
		  let groups = FormatSkills.GetSkillGroupList();
		  let output = "";
		  for (let i = 0; i < groups.length; i++) {
			if (i % 2 == 0) {
			  output += `<div class="wuxFlexTable">\n`;
			}
			output += buildSkillGroup(groups[i], skillDictionary);
			if (i % 2 == 1) {
			  output += `</div>\n`;
			}
		  }
		  return output;
		},
  
		buildSkillGroup = function(groupName, skillDictionary) {
		  return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
			  <div class="wuxFlexTableItemHeader wuxTextLeft">${groupName}</div>
			  <div class="wuxFlexTableItemData wuxTextLeft">
			  ${buildSkillGroupSkills(skillDictionary.get(groupName))}
			  </div>
			</div>`;
		},
  
		buildSkillGroupSkills = function(skillDataArray) {
		  let output = "";
		  for (let i = 0; i < skillDataArray.length; i++) {
			output += buildSkill(skillDataArray[i]);
		  }
		  return output;
		},
  
		buildSkill = function(skill) {
		  let fieldName = Format.ToCamelCase(skill.name);
		  return `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock">
			  <div class="wuxInteractiveInnerExpandBlock">
				<input class="wuxInteractiveExpandingContent-flag" type="checkbox" name="attr_skills-trainingDetails-${fieldName}">
				<input type="hidden" class="wuxInteractiveExpandIcon-flag" name="attr_skills-trainingDetails-${fieldName}">
				<span class="wuxInteractiveExpandIcon">&#9662;</span>
				<input type="hidden" class="wuxInteractiveExpandIcon-flag" name="attr_skills-trainingDetails-${fieldName}">
				<span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
			  </div>
  
			  <div class="wuxInteractiveInnerBlock">
				<input class="wuxInteractiveContent-flag" type="checkbox" name="attr_skills-training-${fieldName}">
				<div class="wuxInteractiveContent">
				  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_skills-training-${fieldName}">
				  <span class="wuxInteractiveIcon">&#9635;</span>
				  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_skills-training-${fieldName}">
				  <span class="wuxInteractiveAuxIcon">&#9634;</span>
				  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_skills-training-${fieldName}">
				  <span class="wuxHeader">${skill.name} (${skill.abilityScore})</span>
				</div>
			  </div>
  
			  <input class="wuxInteractiveExpandingContent-flag" type="hidden" name="attr_skills-trainingDetails-${fieldName}">
			  <div class="wuxInteractiveExpandingContent">
				<div class="wuxDescription">${skill.description}</div>
			  </div>
			</div>
		  `;
		},
  
		buildSkillTab = function(contents) {
		  let output = FormatCharacterSheetMain.CollapsibleSection("training_skills", "Skills", contents); 
		  return FormatCharacterSheetMain.Tab(output);
		},
  
		createMainContent = function(skillDictionary) {
		  let contents = buildSkillGroupSections(skillDictionary);
		  contents = buildSkillTab(contents);
  
		  return FormatCharacterSheetMain.Build(contents);
		},
  
		createSideBar = function() {
		  return FormatCharacterSheetSidebar.Build(buildTechPointsSection());
		},
  
		buildTechPointsSection = function() {
		  return `<div class="wuxHeader">&nbsp;Build</div>
			${buildTechPointsSectionData()}`;
		},
  
		buildTechPointsSectionData = function() {
		  let name = `Points`; 
		  let output = `<span name='attr_skillpoints' value="0">0</span>
			<span class="wuxFontSize7">/ </span>
			<span class="wuxFontSize7" name='attr_skillpoints_max' value="0">0</span>`;
		  return FormatCharacterSheetSidebar.AttributeSection(name, output);
		}
	  ;
	  return {
		Print: print
	  };
  }());
  
  
  // Character Training: Knowledge
  // =================================================
  
  function CreateTrainingKnowledgeSection (languageArray, loreArray) {
	let output = "";
	output += DisplayTrainingKnowledgeSheet.Print(languageArray, loreArray);
	return PrintLargeEntry(output);
  }
  
  var DisplayTrainingKnowledgeSheet = DisplayTrainingKnowledgeSheet || (function() {
	  'use strict';
  
	  var
		print = function(languageArray, loreArray) {
		  let languageDictionary = FormatKnowledge.CreateLanguageDictionary(languageArray);
		  let loreDictionary = FormatKnowledge.CreateLoreDictionary(loreArray);
		  return createSideBar() + createMainContent(languageDictionary, loreDictionary);
		},
  
		createSideBar = function() {
		  return FormatCharacterSheetSidebar.Build(buildTechPointsSection());
		},
  
		buildTechPointsSection = function() {
		  return `<div class="wuxHeader">&nbsp;Build</div>
			${buildTechPointsSectionData()}`;
		},
  
		buildTechPointsSectionData = function() {
		  let name = `Points`; 
		  let output = `<span name='attr_knowledgepoints' value="0">0</span>
			<span class="wuxFontSize7">/ </span>
			<span class="wuxFontSize7" name='attr_knowledgepoints_max' value="0">0</span>`;
		  return FormatCharacterSheetSidebar.AttributeSection(name, output);
		},
  
		createMainContent = function(languageDictionary, loreDictionary) {
		  let languageContents = buildKnowledgeGroupSections(languageDictionary, FormatKnowledge.GetLanguageGroupList(), "Languages");
		  languageContents = buildLanguageTab(languageContents);
		  
		  let loreContents = buildKnowledgeGroupSections(loreDictionary, FormatKnowledge.GetLoreGroupList(), "Lore");
		  loreContents = buildLoreTab(loreContents);
  
		  return FormatCharacterSheetMain.Build(languageContents + loreContents);
		},
  
		buildKnowledgeGroupSections = function(dictionary, groupList, knowledgeType) {
		  let output = "";
		  for (let i = 0; i < groupList.length; i++) {
			if (i % 2 == 0) {
			  output += `<div class="wuxFlexTable">\n`;
			}
			output += buildKnowledgeGroup(groupList[i], dictionary, knowledgeType);
			if (i % 2 == 1) {
			  output += `</div>\n`;
			}
		  }
		  if (groupList.length % 2 == 1) {
			  output += `</div>\n`;
		  }
		  return output;
		},
  
		buildKnowledgeGroup = function(groupName, dictionary, knowledgeType) {
		  return `<div class="wuxFlexTableItemGroup wuxMinWidth200">
			  <div class="wuxFlexTableItemHeader wuxTextLeft">${groupName} ${knowledgeType}</div>
			  <div class="wuxFlexTableItemData wuxTextLeft">
			  ${buildKnowledgeGroupData(dictionary, groupName, knowledgeType)}
			  </div>
			</div>`;
		},
  
		buildKnowledgeGroupData = function(dictionary, groupName, knowledgeType) {
		  switch (knowledgeType) {
			case "Languages": return buildKnowledgeGroupLanguage(dictionary.get(groupName));
			case "Lore": return buildKnowledgeGroupLore(dictionary.get(groupName));
		  }
		},
  
		buildKnowledgeGroupLanguage = function(skillDataArray) {
		  let output = "";
		  for (let i = 0; i < skillDataArray.length; i++) {
			output += buildMainLanguage(skillDataArray[i]);
			output += buildSubLanguage(skillDataArray[i], "Speak");
			output += buildSubLanguage(skillDataArray[i], "Read Write");
		  }
		  return output;
		},
  
		buildMainLanguage = function(knowledge) {
		  let fieldName = Format.ToCamelCase(knowledge.name);
		  return `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock">
			  ${buildKnowledgeExpandArrowBlock(fieldName)}
			  ${buildLanguageInteractionMainBlock(knowledge)}
			  ${buildKnowledgeExpansionBlock(knowledge, fieldName)}
			</div>
		  `;
		},
  
		buildSubLanguage = function(knowledge, subGroupName) {
		  let fieldName = Format.ToCamelCase(`${knowledge.name}_${subGroupName}`) + "";
		  return `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock">
			  ${buildKnowledgeExpandEmptyBlock()}
			  ${buildLanguageInteractionSubBlock(subGroupName, fieldName)}
			</div>
		  `;
		},
  
		buildKnowledgeGroupLore = function(skillDataArray) {
		  let output = "";
		  for (let i = 0; i < skillDataArray.length; i++) {
			if (skillDataArray[i].name == skillDataArray[i].group) {
			  output += buildMainLore(skillDataArray[i]);
			}
			else {
			  output += buildSubLore(skillDataArray[i]);
			}
		  }
		  return output;
		},
  
		buildMainLore = function(knowledge) {
		  let fieldName = Format.ToCamelCase(knowledge.name);
		  return `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock">
			  ${buildKnowledgeExpandArrowBlock(fieldName)}
			  ${buildLoreInteractionMainBlock(fieldName)}
			  ${buildKnowledgeExpansionBlock(knowledge, fieldName)}
			</div>
		  `;
		},
  
		buildSubLore = function(knowledge) {
		  let fieldName = Format.ToCamelCase(knowledge.name);
		  return `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock">
			  ${buildKnowledgeExpandArrowBlock(fieldName)}
			  ${buildLoreInteractionSubBlock(knowledge, fieldName)}
			  ${buildKnowledgeExpansionBlock(knowledge, fieldName)}
			</div>
		  `;
		},
  
		buildLanguageInteractionMainBlock = function(knowledge) {
		  return `<div class="wuxInteractiveInnerBlock">
			  <span class="wuxHeader">${knowledge.name}</span>
			  - <span class="wuxSubheader">${knowledge.location}</span>
			</div>`;
		},
  
		buildLanguageInteractionSubBlock = function(subGroupName, fieldName) {
		  let contents = `<span class="wuxSubheader">${subGroupName}</span>`;
		  contents = buildKnowledgeInteractionBlock(fieldName, contents);
		  return contents;
		},
  
		buildLoreInteractionMainBlock = function(fieldName) {
		  let contents = `<span class="wuxHeader">General Knowledge</span>`;
		  contents = buildKnowledgeInteractionBlock(fieldName, contents);
		  return contents;
		},
  
		buildLoreInteractionSubBlock = function(knowledge, fieldName) {
		  let contents = `<span class="wuxSubheader">${knowledge.name}</span>`;
		  contents = buildKnowledgeInteractionBlock(fieldName, contents);
		  return contents;
		},
  
		buildKnowledgeExpandArrowBlock = function(fieldName) {
		  return `<div class="wuxInteractiveInnerExpandBlock">
			  <input class="wuxInteractiveExpandingContent-flag" type="checkbox" name="attr_knowledge-trainingDetails-${fieldName}">
			  <input type="hidden" class="wuxInteractiveExpandIcon-flag" name="attr_knowledge-trainingDetails-${fieldName}">
			  <span class="wuxInteractiveExpandIcon">&#9662;</span>
			  <input type="hidden" class="wuxInteractiveExpandIcon-flag" name="attr_knowledge-trainingDetails-${fieldName}">
			  <span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
			</div>`;
		},
  
		buildKnowledgeExpandEmptyBlock = function() {
		  return `<div class="wuxInteractiveInnerExpandBlock">
			  <span class="wuxInteractiveExpandIcon">&nbsp;</span>
			</div>`;
		},
  
		buildKnowledgeInteractionBlock = function(fieldName, contents) {
		  return `<div class="wuxInteractiveInnerBlock">
			  <input class="wuxInteractiveContent-flag" type="checkbox" name="attr_knowledge-training-${fieldName}">
			  <div class="wuxInteractiveContent">
				<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_knowledge-training-${fieldName}">
				<span class="wuxInteractiveIcon">&#9635;</span>
				<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_knowledge-training-${fieldName}">
				<span class="wuxInteractiveAuxIcon">&#9634;</span>
				<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_knowledge-training-${fieldName}">
				${contents}
			  </div>
			</div>`;
		},
  
		buildKnowledgeExpansionBlock = function(knowledge, fieldName) {
		  return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="attr_knowledge-trainingDetails-${fieldName}">
			<div class="wuxInteractiveExpandingContent">
			  <div class="wuxInteractiveInnerBlock wuxDescription">${knowledge.description}</div>
			</div>`;
		},
  
		buildLanguageTab = function(contents) {
		  let output = FormatCharacterSheetMain.CollapsibleSection("training_language", "Languages", contents); 
		  return FormatCharacterSheetMain.Tab(output);
		},
  
		buildLoreTab = function(contents) {
		  let output = FormatCharacterSheetMain.CollapsibleSection("training_lore", "Lore", contents); 
		  return FormatCharacterSheetMain.Tab(output);
		}
	  ;
	  return {
		Print: print
	  };
  }());
  
  
  // Character Advancement: Job
  // =================================================
  
  function CreateAdvancementJobsSection (jobsArray, techniqueDatabaseData) {
	let output = "";
	output += DisplayAdvancementJobSheet.Print(jobsArray, techniqueDatabaseData);
	return PrintLargeEntry(output);
  }
  
  var DisplayAdvancementJobSheet = DisplayAdvancementJobSheet || (function() {
	  'use strict';
  
	  var
		print = function(jobsArray, techniqueDatabaseData) {
		  let jobsDictionary = FormatJobs.CreateDictionary(jobsArray);
		  let techDictionary = CreateDictionary();
		  setTechniqueData(techDictionary, techniqueDatabaseData);
		  return createSideBar() + createMainContent(jobsDictionary, techDictionary);
		},
  
		// set technique data
		setTechniqueData = function(techDictionary, techniqueDatabaseData) {
		  let techniqueDatabase = FormatTechniques.ParseTechniquesDatabase(techniqueDatabaseData);
		  FormatTechniques.IterateOverTechArrays(techDictionary, createTechniqueDatabaseByJob, techniqueDatabase, 
			["Job"]);
		},
		createTechniqueDatabaseByJob = function (techDictionary, techData) {
		  techData.iterate(function(technique) {
			if (!techDictionary.has(technique.family)) {
			  techDictionary.add(technique.family, CreateDictionary());
			}
			techDictionary.get(technique.family).add(technique.name, technique);
		  });
		},
  
		// side bar
		createSideBar = function() {
		  return FormatCharacterSheetSidebar.Build(buildTechPointsSection());
		},
		buildTechPointsSection = function() {
		  return `<div class="wuxHeader">&nbsp;Build</div>
			${buildTechPointsSectionData()}`;
		},
		buildTechPointsSectionData = function() {
		  let name = `Points`; 
		  let output = `<span name='attr_jobpoints' value="0">0</span>
			<span class="wuxFontSize7">/ </span>
			<span class="wuxFontSize7" name='attr_jobpoints_max' value="0">0</span>`;
		  return FormatCharacterSheetSidebar.AttributeSection(name, output);
		},
  
		createMainContent = function(jobsDictionary, techDictionary) {
		  let languageContents = buildJobSection(jobsDictionary, techDictionary);
		  languageContents = buildLanguageTab(languageContents);
  
		  return FormatCharacterSheetMain.Build(languageContents);
		},
  
		buildJobSection = function(jobsDictionary, techDictionary) {
		  let categories = FormatJobs.GetGroupList();
		  for(let i = 0; i < categories.length; i++) {
			buildJobCategory(jobsDictionary, techDictionary, categories[i]);
		  }
		},
  
		buildJobCategory = function(jobsDictionary, techDictionary, category) {
		  let output = buildJobsByCategory(jobsDictionary, techDictionary, category);
		  output = FormatCharacterSheetMain.CollapsibleSection(`advancement_${category}`, `Disciples of ${category}`, output); 
		  return FormatCharacterSheetMain.Tab(output);
		},
  
		buildJobsByCategory = function(jobsDictionary, techDictionary, category) {
		  let output = "";
		  for(let i = 0; i < jobsDictionary.get(category).length; i++) {
			output += buildJob(jobsDictionary.get(category)[i], techDictionary.get(category));
		  }
		  return output;
		},
  
		buildJob = function(job, techDictionary) {
		  let fieldName = Format.ToCamelCase(job.name);
  
		  return `<div class="advancement-${fieldName} wuxSectionBlock wuxLayoutItem wuxMinWidth350">
			<input class="wuxSectionContent-flag" type="checkbox" name="attr_tabSection-advancement-${fieldName}" style="display: block">
  
			<div class="wuxSectionHeader">${job.name}</div>
			<div class="wuxSectionHeaderFooter"></div>
  
			<div class="wuxSectionContent">
			  <span class='wuxDescription'>${job.description}</span>
			  
			  <div class="wuxRow">&nbsp;</div>
			  <div class="wuxDistinctSection">
				<div class="wuxDistinctField">
				  <span class="wuxDistinctTitle">Level</span>
					<input type="text" class='wuxDistinctData' name='attr_advancement-level-${fieldName}'>
				</div>
			  </div>
  
			  <div class="wuxRow">&nbsp;</div>
			  ${FormatCharacterSheetMain.Header(`${job.name} Growths`)}
			  ${FormatCharacterSheetMain.Table(FormatStatBlock.GetAttributeAbrNames(), job.growthsArray)}
			  
			  <div class="wuxRow">&nbsp;</div>
			  ${FormatCharacterSheetMain.Header(`${job.name} Techniques`)}
			  <div class="wuxFlexTableNoWrap">
				<div class="wuxFlexTableItemGroup">
				  <span class="wuxFlexTableItemHeader">Lv.</span>
				  <span class="wuxFlexTableItemData">1</span>
				  <span class="wuxFlexTableItemData">2</span>
				  <span class="wuxFlexTableItemData">4</span>
				  <span class="wuxFlexTableItemData">6</span>
				  <span class="wuxFlexTableItemData">8</span>
				  <span class="wuxFlexTableItemData">10</span>
				  <span class="wuxFlexTableItemData">12</span>
				  <span class="wuxFlexTableItemData">14</span>
				  <span class="wuxFlexTableItemData">16</span>
				  <span class="wuxFlexTableItemData">18</span>
				  <span class="wuxFlexTableItemData">20</span>
				</div>
				<div class="wuxFlexTableItemGroup8">
				  <span class="wuxFlexTableItemHeader">Feature</span>
				  ${advancement}
				</div>
			  </div>
			  
			  <div class="wuxRow">&nbsp;</div>
			  <span class="wuxHeader">${className} Techniques</span>
			  ${techniques}
			</div>
			<div class="wuxSectionContentCollapsed"></div>
		  </div>
		`;
		}
	  ;
	  return {
		Print: print
	  };
  }());
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  