function PrintTechData(modArray) {

	// var data = CreateTraitsArray(modArray);
	var out = [];
  
	let filterBaseTechniques = function(techniques, filters) {
	  if (techniques == []) {
		techniques = getFilteredTechniquesList(filterData.source, this.filterData.source);
	  }
	  else {
		getFilteredTechniques(techniques, filters.source, this.filterData.uniqueSource);
	  }
	  getFilteredTechniques(techniques, filters.group, this.filterData.uniqueGroup);
	  getFilteredTechniques(techniques, filters.type, this.filterData.uniqueType);
	  getFilteredTechniques(techniques, filters.action, this.filterData.uniqueAction);
	  getFilteredTechniques(techniques, filters.traits, this.filterData.uniqueTraits);
	  getFilteredTechniques(techniques, filters.reqWeapon, this.filterData.uniqueReqWeapon);
	  getFilteredTechniques(techniques, filters.branch, this.filterData.uniqueBranch);
	  getFilteredTechniques(techniques, filters.skill, this.filterData.uniqueSkill);
	  getFilteredTechniques(techniques, filters.defense, this.filterData.uniqueDefense);
	  getFilteredTechniques(techniques, filters.range, this.filterData.uniqueRange);
	  return techniques;
	};
  
	out.push(filterBaseTechniques.toString());
  
	// for (var i = 0; i < data.names.length; i++) {
	//   out.push(data.getGroup(data.names[i])[0].name);
	// }
	return out;
  }
  
  function CreateClassGroupDataArray(modArray) {
	var output = CreateArrayDataObject();
	var charClass = {};
	var index = 0;
	for (var j = 0; j < modArray.length; j++) {
	  charClass = CreateClassData(modArray[j]);
	  index = output.getGroupIndex(charClass.category);
	  output.groups[index].push(charClass);
	}
  
	return output;
  }
  
  
  function CreateClassData(modArray) {
	
	var output = {
	  name: "",
	  category: "",
	  description: "",
	  growths: [],
	  aptitudes: [],
	  prerequisite: "",
	  jobTechnique: "",
	  advancement: []
	};
  
	if (modArray != undefined) {
	  var i = 0;
	  output.name = "" + modArray[i]; i++;
	  output.category = "" + modArray[i]; i++;
	  output.description = "" + modArray[i]; i++;
	  output.growths = CreateGrowthsArrayData(modArray, i); i += 10;
	  output.prerequisite = "" + modArray[i]; i++;
	  output.jobTechnique = "" + modArray[i]; i++;
	  output.advancement = CreateClassAdvancementArray(modArray, i);
	}
	return output;
  }
  
  function CreateClassAdvancementArray(modArray, startingIndex) {
  
	var output = [];
  
	for (var i = startingIndex; i < modArray.length; i += 2) {
	  output.push({
		name: "" + modArray[i],
		type: "" + modArray[i + 1]
	  });
	}
  
	return output;
  }
  
  function ConvertAptitudesToGrowths(growthData) {
  
	let aptitudeGrowthRate = 10;
	return {
	  warfare: `${growthData.warfare * aptitudeGrowthRate}%`,
	  magic: `${growthData.magic * aptitudeGrowthRate}%`,
	  talent: `${growthData.talent * aptitudeGrowthRate}%`,
	  acumen: `${growthData.acumen * aptitudeGrowthRate}%`
	}
  }
  
  
  
  function CreateSkillsGroupDataArray(modArray) {
	var output = CreateArrayDataObject();
	var skill = {};
	var index = 0;
	for (var j = 0; j < modArray.length; j++) {
	  skill = CreateSkillsData(modArray[j]);
	  index = output.getGroupIndex(skill.group);
	  output.groups[index].push(skill);
	}
  
	return output;
  }
  
  function CreateSkillsData(modArray) {
  
	var output = {
	  name: "",
	  description: "",
	  group: "",
	  subGroup: "",
	  abilityScore: ""
	};
	
	if (modArray != undefined) {
	  output.name = "" + modArray[0];
	  output.description = ""  + modArray[1];
	  output.group = ""  + modArray[2];
	  output.abilityScore = ""  + modArray[3];
	  output.subGroup = ""  + modArray[4];
	};
  
	return output;
  }
  
  function CreateTraitsGroupDataArray(modArray) {
	var output = CreateArrayDataObject();
	var trait = {};
	var index = 0;
	for (var j = 0; j < modArray.length; j++) {
	  trait = CreateTraitsData(modArray[j]);
	  index = output.getGroupIndex(trait.group);
	  output.groups[index].push(trait);
	}
  
	return output;
  }
  
  function CreateBranchesGroupDataArray(modArray) {
	var output = CreateArrayDataObject();
	var branch = {};
	var index = 0;
	for (var j = 0; j < modArray.length; j++) {
	  branch = CreateBranchData(modArray[j]);
	  index = output.getGroupIndex(branch.group);
	  output.groups[index].push(branch);
	}
  
	return output;
  }
  
  function CreateBranchData(modArray) {
  
	var output = {
	  name: "",
	  group: "",
	  isSpecial: "",
	  description: ""
	};
	
	if (modArray != undefined) {
	  output.name = "" + modArray[0];
	  output.group = ""  + modArray[1];
	  output.isSpecial = ""  + modArray[2];
	  output.description = ""  + modArray[3];
	};
  
	return output;
  }
  
  
  