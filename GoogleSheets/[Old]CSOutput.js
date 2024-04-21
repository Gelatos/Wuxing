// =================================================
// Quick Access
// =================================================

function CreateQuickAccessSidebar(skillsArray) {
	var output = "";
  
	// add quick access elements
	output += CreateSkillQuickAccess(skillsArray);
  
	output = `<div class="main-Sidebar wuxFloatSidebar">
	  <div class="wuxSheetSidebar">
		${output}
	  </div>
	</div>`;
  
	return PrintLargeEntry(output);
  }
  
  function CreateSkillQuickAccess(skillsArray) {
  
	var skillsData = CreateSkillsGroupDataArray(skillsArray);
	var groupArray = ["Defensive", "Body", "Technical", "Knowledge", "Social"];
	var groupName = "";
	var fieldName = "";
	var skillName = "";
	var group;
	var output = "";
	var skillGroupOutput = "";
  
	for (var i = 0; i < groupArray.length; i++) {
	  groupName = groupArray[i];
	  fieldName = Format.ToCamelCase(groupName);
	  skillGroupOutput = `<div class="wuxInteractiveBlock wuxSizeSmall">
  
				  <div class="wuxInteractiveInnerBlock">
					  <input class="wuxInteractiveContent-flag" type="checkbox" name="attr_character-skillsSidebar-expandButton-${fieldName}">
					  <div class="wuxInteractiveContent">
					  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_character-skillsSidebar-expandButton-${fieldName}">
					  <span class="wuxInteractiveIcon">&#9662;</span>
					  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_character-skillsSidebar-expandButton-${fieldName}">
					  <span class="wuxInteractiveAuxIcon">&#9656;</span>
			
						  <span class="wuxSubheader">${groupName}</span>
					  </div>
				  </div>
  
				  <input class="wuxInteractiveExpandingContent-flag" type="hidden" name="attr_character-skillsSidebar-expandButton-${fieldName}">
				  <div class="wuxInteractiveExpandingContent">
		  `;
	  group = skillsData.getGroup(groupArray[i]);
	  for (var j = 0; j < group.length; j++)
	  {
		skillName = group[j].name;
		skillGroupOutput += `<button class="wuxButton wuxSizePercent" type="roll" value="${skillName} Check"><span>${skillName}</span></button>
		`;
	  }
	  skillGroupOutput += `</div>
			  </div>
	  `;
	  output += skillGroupOutput;
	}
	
	return `<div class="wuxHeader">Skills</div>
	${output}
	`;
  }
  
  // =================================================
  // Character Skill Sections
  // =================================================
  
  function CreateCharacterSkillSections(skillsArray) {
	var skillsData = CreateSkillsGroupDataArray(skillsArray);
	var groupName = "";
	var skillGroups = ["Defensive", "Martial", "Channel", "Body", "Knowledge", "Social", "Technical"];
  
	var output = "";
	for (var i = 0; i < skillGroups.length; i++) {
	  groupName = skillGroups[i];
	  output += CreateCharacterSkillSection(skillsData.getGroup(groupName), groupName, Format.ToCamelCase(groupName));
	}
  
	output = `<div class="segment-skills wuxSegment">
	  <input class="wuxTab-flag" type="checkbox" name="attr_tabSection-Skills" checked="checked">
	  <div class="wuxTabHeader"><span class="wuxInnerHeader">Skills</span></div>
  
	  <div class="wuxTab">
		<div class="tab-skillOptions wuxTab">
		  <div class="statistics-GeneralStats wuxSectionBlock wuxLayoutItem">
			<div class="wuxSectionContent">
			  <div class="wuxHeader">Skill Options</div>
			  <div class="wuxMultiRow">
				<div class="wuxButton">
				  <input type="checkbox" name="attr_character-button-skills">
				  <span>Skill Training</span>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		${output}
	  </div>
	</div>
	`;
  
	return PrintLargeEntry(output);
  }
  
  function CreateCharacterSkillSection(skillGroup, skillGroupName, fieldName) {
  
	// get relevant data
	var skillTable = "";
	var skillTableData = "";
	for (var i = 0; i < skillGroup.length; i++) {
	  skillTableData += CreateCharacterSkill(skillGroup[i].name, `${Format.ToCamelCase(skillGroup[i].name)}`, skillGroup[i].abilityScore);
	  if (i % 2 == 1) {
		skillTable += `<div class="wuxFlexTableItemGroup wuxNoPadding">
		  <div class="wuxFlexTable">
			${skillTableData}
		  </div>
		</div>
		`;
		skillTableData = "";
	  }
	}
	if (skillTableData != "") {
	  skillTable += `<div class="wuxFlexTableItemGroup wuxNoPadding">
		<div class="wuxFlexTable">
		  ${skillTableData}
		</div>
	  </div>
	  `;
	}
  
	var fieldName = Format.ToCamelCase(skillGroupName);
	return `<div class="tab-${fieldName} wuxTab">
	  <div class="statistics-GeneralStats wuxSectionBlock wuxLayoutItem">
		<div class="wuxSectionContent">
		  <div class="wuxHeader">${skillGroupName} Skills</div>
		  <div class="wuxFlexTable">
			<div class="wuxFlexTableItemGroup wuxNoPadding">
			  <div class="wuxFlexTable">
				${skillTable}
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	`;
  }
  
  function CreateCharacterSkill(skillName, fieldName, skillAbilityScore) {
	return `<div class="wuxFlexTableItemGroup">
  
	  <span class="wuxFlexTableItemHeader">${skillName}</span>
	  <div class="wuxFlexTable">
		<div class="wuxFlexTableItemGroup">
		  <span class="wuxFlexTableItemSubheader">Ability</span>
		  <span class="wuxFlexTableItemData">${skillAbilityScore}</span>
		</div>
		<div class="wuxFlexTableItemGroup">
		  <span class="wuxFlexTableItemSubheader">Score</span>
		  <span class="wuxFlexTableItemData" name="attr_skill_${fieldName}">0</span>
		</div>
		<div class="wuxFlexTableItemGroup">
		  <span class="wuxFlexTableItemSubheader">Bonus</span>
		  <input type="number" class="wuxFlexTableItemData wuxSizeSmall" name="attr_skillbonus_${fieldName}" placeholder="0"></span>
		</div>
	  </div>
	</div>
	`;
  }
  
  function CreateCharacterSkillSelector (skillsArray) {
	var skillsData = CreateSkillsGroupDataArray(skillsArray);
  
	var output = "";
	for (var i = 0; i < skillsData.groups.length; i++) {
	  for (var j = 0; j < skillsData.groups[i].length; j++) {
		if (output != "") {
		  output += "\n";
		}
		output += `<option value="${skillsData.groups[i][j].name}">${skillsData.groups[i][j].name} Check</option>
		<option value="${skillsData.groups[i][j].name} DC">${skillsData.groups[i][j].name} DC</option>`;
	  }
	}
	return output;
  }
  
  // =================================================
  // Character Branch Sections
  // =================================================
  
  function CreateCharacterBranchSections(branchesArray) {
	var branchData = CreateBranchesGroupDataArray(branchesArray);
	var groupName = "";
	var branchGroups = ["Wood", "Fire", "Earth", "Metal", "Water"];
  
	var output = "";
	for (var i = 0; i < branchGroups.length; i++) {
	  groupName = branchGroups[i];
	  output += CreateCharacterBranchSection(branchData.getGroup(groupName), groupName);
	}
  
	output = `<div class="wuxFlexTableItemGroup3">
	  <span class="wuxFlexTableItemHeader">Branches</span>
	  <div class="wuxFlexTable">
		<div class="wuxFlexTableItemGroup">
		  <span class="wuxFlexTableItemSubheader">Total Selected</span>
		  <input type="hidden" class="wuxErrorField-flag" name="attr_branchpoints-error" value="0">
		  <span class='wuxFlexTableItemData'>
			<span name='attr_branchpoints' value="0">0</span>
			<span>/ </span>
			<span name='attr_branchpoints_max' value="0">0</span>
		  </span>
		</div>
		<div class="wuxFlexTableItemGroup">
		  <span class="wuxFlexTableItemSubheader">Bonus</span>
		  <input type="number" class="wuxFlexTableItemData wuxSizeSmall" name="attr_branchpoints_bonus" placeholder="0"></span>
		</div>
	  </div>
	  <div class="wuxFlexTable">
		${output}
	  </div>
	</div>
	`;
  
	return PrintLargeEntry(output);
  }
  
  function CreateCharacterBranchSection(branchGroup, branchGroupName) {
  
	// get relevant data
	var branchTable = "";
	for (var i = 0; i < branchGroup.length; i++) {
	  branchTable += CreateCharacterBranch(branchGroup[i].name, `${Format.ToCamelCase(branchGroup[i].name)}`);
	}
  
	return `<div class="wuxFlexTableItemGroup">
	  <div class="wuxFlexTableItemData wuxTextLeft"><span>${branchGroupName}</span></div>
	  <div class="wuxFlexTableItemData wuxTextLeft">
		<div class="wuxInteractiveBlock wuxSizeSmall">
		${branchTable}
		</div>
	  </div>
	</div>
	`;
  }
  
  function CreateCharacterBranch(branchName, fieldName) {
	return `<div class="wuxInteractiveInnerBlock">
	  <input class="wuxInteractiveContent-flag" type="checkbox" name="attr_branch-${fieldName}">
	  <div class="wuxInteractiveContent">
		<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_branch-${fieldName}">
		<span class="wuxInteractiveIcon">&#9635;</span>
		<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_branch-${fieldName}">
		<span class="wuxInteractiveAuxIcon">&#9634;</span>
		<input type="hidden" class="wuxInteractiveIcon-flag" name="attr_branch-${fieldName}">
		<span class="wuxHeader">${branchName}</span>
	  </div>
	</div>
	`;
  }
  
  // =================================================
  // Advancement Classes
  // =================================================
  
  function CreateAdvancementClasses(classesArray, classTechniquesArray, traitsArray) {
  
	var classGroupData = CreateClassGroupDataArray(classesArray);
	var classGroupTechniquesData = FormatTechniques.GetTechniqueGroupData(classTechniquesArray, "Class");
	var classGroups = ["Warfare", "Magic", "Talent", "Acumen"];
	var traitsData = CreateTraitsArray(traitsArray);
  
	var output = "";
	for (var i = 0; i < classGroups.length; i++) {
	  output += CreateAdvancementClassGroupTab(classGroups[i], 
		classGroupData.getGroup(classGroups[i]), 
		classGroupTechniquesData, 
		traitsData);
	}
  
	output = `<div class="advancement-classes">
	  ${output}
	</div>
	<!-- end -->`;
	return PrintLargeEntry(output);
  }
  
  function CreateAdvancementClassGroupTab(classGroupName, classGroupData, classTechniquesData, traitsData) {
  
	var fieldClassName = Format.ToCamelCase(classGroupName);
  
	// get each of the classes
	var output = "";
	for (var i = 0; i < classGroupData.length; i++) {
	  output += CreateAdvancementClass(classGroupData[i], classTechniquesData, traitsData);
	}
  
	return `<div class="advancement-${fieldClassName} wuxSegment">
	  <input class="wuxTab-flag" type="checkbox" name="attr_tabSection-advancement-${fieldClassName}" checked="checked">
	  <div class="wuxTabHeader"><span class="wuxInnerHeader">Disciples of ${classGroupName}</span></div>
  
	  <div class="wuxTab">
		${output}
	  </div>
	</div>
	`;
  }
  
  function CreateAdvancementClass(classData, techniqueGroup, traitsData) {
  
	var className = classData.name;
	var classFieldName = Format.ToCamelCase(className);
	var growthsArray = ConvertAbilityScoresToGrowths(classData.growths);
	var aptitudeArray = ConvertAptitudesToGrowths(classData.aptitudes);
	
	// get the techniques
	var techniques = "";
	techniqueGroup.iterate(function (technique){
	  if (technique.family == classData.name) {
		techniques += FormatFeatureInformationWithStyle(technique, traitsData) + "\n";
	  }
	});
	// get the advancement
	var advancement = `<span class="wuxFlexTableItemData">${classData.jobTechnique}</span>
	`;
	for (var i = 0; i < classData.advancement.length; i++) {
	  advancement += `<span class="wuxFlexTableItemData">${classData.advancement[i].name}</span>
	  `;
	}
  
	return `<div class="advancement-${classFieldName} wuxSectionBlock wuxLayoutItem wuxMinWidth350">
	  <input class="wuxSectionContent-flag" type="checkbox" name="attr_tabSection-advancement-${classFieldName}" style="display: block">
  
	  <div class="wuxSectionHeader"><span class="wuxInnerHeader" name="attr_advancement-name-${classFieldName}" value="${className}">${className} Lv.0</span></div>
	  <div class="wuxSectionHeaderFooter"></div>
  
	  <div class="wuxSectionContent">
		<span class='wuxDescription'>${classData.description}</span>
		
		<div class="wuxRow">&nbsp;</div>
		<div class="wuxDistinctSection">
		  <div class="wuxDistinctField">
			<span class="wuxDistinctTitle">Level</span>
			  <input type="hidden" name='attr_advancement-level-${classFieldName}' value="0">
			  <input type="text" class='wuxDistinctData' name='attr_advancement-level-${classFieldName}_max' value="0">
		  </div>
		</div>
  
		<div class="wuxRow">&nbsp;</div>
		<span class="wuxHeader">Prerequisites</span>
		<span class='wuxDescription'>${classData.prerequisite == "" ? "None" : classData.prerequisite}</span>
  
		<div class="wuxRow">&nbsp;</div>
		<span class="wuxHeader">${className} Growths</span>
		<div class="wuxFlexTable">
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">HP</span>
			<span class="wuxFlexTableItemData">${growthsArray.hp}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">CON</span>
			<span class="wuxFlexTableItemData">${growthsArray.CON}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">DEX</span>
			<span class="wuxFlexTableItemData">${growthsArray.DEX}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">QCK</span>
			<span class="wuxFlexTableItemData">${growthsArray.QCK}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">STR</span>
			<span class="wuxFlexTableItemData">${growthsArray.STR}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">CHA</span>
			<span class="wuxFlexTableItemData">${growthsArray.CHA}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">INT</span>
			<span class="wuxFlexTableItemData">${growthsArray.INT}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">PER</span>
			<span class="wuxFlexTableItemData">${growthsArray.PER}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">WIL</span>
			<span class="wuxFlexTableItemData">${growthsArray.WIL}</span>
		  </div>
		</div>
  
		<div class="wuxRow">&nbsp;</div>
		<div class="wuxFlexTable">
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">Warfare.Apt.</span>
			<span class="wuxFlexTableItemData">${aptitudeArray.warfare}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">Magic.Apt.</span>
			<span class="wuxFlexTableItemData">${aptitudeArray.magic}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">Talent.Apt.</span>
			<span class="wuxFlexTableItemData">${aptitudeArray.talent}</span>
		  </div>
		  <div class="wuxFlexTableItemGroup">
			<span class="wuxFlexTableItemHeader">Acumen.Apt.</span>
			<span class="wuxFlexTableItemData">${aptitudeArray.acumen}</span>
		  </div>
		</div>
		
		<div class="wuxRow">&nbsp;</div>
		<span class="wuxHeader">${className} Advancement</span>
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
  
	return output;
  }
  
  
  