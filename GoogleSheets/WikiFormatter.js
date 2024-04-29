// ======================
// Headers
// ======================

function PrintSectionHeader(name, suffix) {
  if (Array.isArray(name)) {
    let newArray = [];
    for(var i = 0; i < name.length; i++) {
      newArray[i] = FormatSectionHeader(name[i], suffix);
    }
    return newArray;
  }
  else {
    return FormatSectionHeader(name, suffix);
  }
}

function FormatSectionHeader(name, suffix) {
  if (suffix == undefined) {
    suffix = "";
  }

  let output = "";
  output += "<h2 class='subheader'><span style='color:#000080; font-weight: bold'>";
  output += name + suffix + "</span></h2>\n";
  output += "<hr />\n";
  return output;
}

function PrintFeatureHeader(name, suffix) {
  if (Array.isArray(name)) {
    let newArray = [];
    for(var i = 0; i < name.length; i++) {
      newArray[i] = FormatFeatureHeader(name[i], suffix);
    }
    return newArray;
  }
  else {
    return FormatFeatureHeader(name, suffix);
  }
}

function FormatFeatureHeader(name, suffix) {

  if (suffix == undefined) {
    suffix = "";
  }

  let output = "";
  output += "<h3 class='subheader'><span style='color:#2f4f4f; display:inline-block; font-weight: bold'>";
  output += name + suffix + "</span>"; 
  output += "</h3>";
  return output;
}

function PrintActionHeader(name, suffix, type) {
  if (Array.isArray(name)) {
    let newArray = [];
    for(var i = 0; i < name.length; i++) {
      newArray[i] = FormatActionHeader(name[i], suffix, type[i]);
    }
    return newArray;
  }
  else {
    return FormatActionHeader(name, suffix, type);
  }
}

function FormatActionHeader(name, suffix, type) {

  // prepare variables
  if (type == undefined) {
    type = "";
  }
  else if (type == "Feature") {
    return FormatFeatureHeader(name, suffix);
  }

  if (suffix == undefined) {
    suffix = "";
  }

  type = "" + type;
  let imgStyle = "style='height: 24px; display:inline-block; padding-left: 15px;'";

  let output = "";
  output += "<h3 class='subheader' style='border-bottom: 1px solid #efefef; width: 500px; padding: 3px 6px 3px 6px'>";
  output += "<span style='color:#231f20; display:inline-block; font-weight: bold'>";
  output += name + suffix + "</span>"; 

  switch(type) {
    case "0":
      output += "<img " + imgStyle + " src='https://i.imgur.com/EirCfmI.png' />";
      break;
    case "1":
      output += "<img " + imgStyle + " src='https://i.imgur.com/oVm5M7Y.png' />";
      break;
    case "2":
      output += "<img " + imgStyle + " src='https://i.imgur.com/71ElCEl.png' />";
      break;
    case "3":
      output += "<img " + imgStyle + " src='https://i.imgur.com/Sqy4Mex.png' />";
      break;
    case "R":
      output += "<img " + imgStyle + " src='https://i.imgur.com/bkD6NXY.png' />";
      break;
    case "Feature":
    default:
      output += "";
      break;

  }
  output += "</h3>";
  return output;
}

function PrintTitle(name, suffix) {
  if (Array.isArray(name)) {
    let newArray = [];
    for(var i = 0; i < name.length; i++) {
      newArray[i] = FormatTitle(name[i], suffix);
    }
    return newArray;
  }
  else {
    return FormatTitle(name, suffix);
  }
}

function FormatTitle(name, suffix) {

  if (suffix == undefined) {
    suffix = "";
  }

  let output = "";
  output += "<h5 class='subheader'><span style='color:#376b6b; display:inline-block; font-weight: bold; font-size: 17px'>";
  output += name + suffix + "</span>"; 
  output += "</h5>";
  return output;
}



// ======================
// Links
// ======================

function PrintLinkAddressName(name, suffix) {
  if (suffix == undefined) {
    suffix = "";
  }

  return Array.isArray(name) ?
      name.map(row => row.map(cell => (cell + suffix).replaceAll(" ", "").replaceAll(",", "").replaceAll("'", "").replaceAll(":", ""))) :
      (name + suffix).replaceAll(" ", "").replaceAll(",", "").replaceAll("'", "").replaceAll(":", "");
}

function PrintLinkAddress(name, suffix, url) {
  if (suffix == undefined) {
    suffix = "";
  }
  if (url == undefined) {
    url = "";
  }

  return Array.isArray(name) ?
      name.map(row => row.map(cell => "<a href='" + url + "#" + PrintLinkAddressName(cell, suffix) + "'>" + cell + suffix + "</a>")) :
      "<a href='" + url + "#" + PrintLinkAddressName(name, suffix) + "'>" + name + suffix + "</a>";
}

function PrintHeaderAnchor(name, suffix) {
  if (suffix == undefined) {
    suffix = "";
  }

  return Array.isArray(name) ?
      name.map(row => row.map(cell => "<p><a class='anchor' name='" + PrintLinkAddressName(cell, suffix) + "' style='min-width: 600px; display: block; clear: both;'>&nbsp;</a></p>\n\n")) :
      "<p><a class='anchor' name='" + PrintLinkAddressName(name, suffix) + "' style='min-width: 600px; display: block; clear: both;'>&nbsp;</a></p>\n\n";
}

function PrintSkinnyHeaderAnchor(name, suffix) {
  if (suffix == undefined) {
    suffix = "";
  }

  return Array.isArray(name) ?
      name.map(row => row.map(cell => "<p><a class='anchor' name='" + PrintLinkAddressName(cell, suffix) + "'>&nbsp;</a></p>\n\n")) :
      "<p><a class='anchor' name='" + PrintLinkAddressName(name, suffix) + "'>&nbsp;</a></p>\n\n";
}

function ReplaceLinks(source, printLink) {

  source = "" + source;

  if (printLink == undefined) {
    printLink = true;
  }

  var looping = true;
  var linkIndex = 0;
  var endLinkIndex = 0;
  var link = "";
  var linkSplit = [];
  while (looping) {
    linkIndex = source.indexOf("{");
    endLinkIndex = source.indexOf("}", linkIndex);
    if (linkIndex >= 0 && endLinkIndex >= 0) {
      link = source.substring(linkIndex + 1, endLinkIndex);
      linkSplit = link.split("=");
      if (printLink) {
        source = source.substring(0, linkIndex) + "<a href='" + linkSplit[0] + "'>" + linkSplit[1] + "</a>" + source.substring(endLinkIndex + 1);
      }
      else {
        source = source.substring(0, linkIndex) + linkSplit[1] + source.substring(endLinkIndex + 1);
      }
    }
    else {
      looping = false;
    }
  }

  return source;
}



// ======================
// Section Blocks
// ======================

function FormatParagraph(source, printLink) {

  source = "" + source;
  source = source.replaceAll("\n\n", "</p><p>").replaceAll("\n", "<br />\n").replaceAll("</p><p>", "</p>\n\n<p>");
  source = ReplaceLinks(source, printLink);
  return `<p>${source}</p>`;
}

function FormatBlock(source, printLink) {

  source = "" + source;
  source = source.replaceAll("\n\n", "<br />").replaceAll("\n", "<br />").replaceAll("<br />", "<br />\n");
  source = ReplaceLinks(source, printLink);
  return source;
}

function FormatTable(headers, tableData, tableStyles, headerStyles) {

  if (tableStyles == undefined) {
    tableStyles = ` style="margin: 0px;"`;
  }

  var headerData = "";
  for (var i = 0; i < headers.length; i++) {
    headerData += `<th${headerStyles != undefined ? ` style="${headerStyles[i]}"` : ""}>${headers[i]}</th>`;
  }

  var formattedTable = "";
  if (Array.isArray(tableData)) {
    for (var i = 0; i < tableData.length; i++) {
      formattedTable += tableData[i];
    }
  }
  else {
    formattedTable = tableData;
  }

  return `<table${tableStyles}><tbody><tr>${headerData}</tr>${formattedTable}</tbody></table>`;
}

function FormatSidebarTable(headers, tableData) {

  return FormatTable(headers, tableData, ` class="right" style="margin: 0px 0px 15px 10px"`);
}

function FormatTableData(rowData, rowStyles) {
  var output = "";

  for (var i = 0; i < rowData.length; i++) {
    output += `<td${rowStyles == undefined ? "" : ` style="${rowStyles[i]}"`}>${rowData[i]}</td>`;
  }
  return `<tr>${output}</tr>`;
}

function CreateTraitsArray(modArray) {
  var output = CreateDictionary();
  var trait = {};
  for (var j = 0; j < modArray.length; j++) {
    trait = CreateTraitsData(modArray[j]);
    output.add(trait.name, trait);
  }

  return output;
}

function CreateTraitsData(modArray) {

  var output = {
    name: "",
    group: "",
    description: ""
  }
  
  if (modArray) {
    output.name = "" + modArray[0];
    output.group = "" + modArray[1];
    output.description = ""  + modArray[2];
  };

  return output;
}

function FormatTraits(traitsString) {

  var output = "";
  var keywordsStyle = "margin-right: 10px; text-decoration: underline dotted;";

  var traits = GetTraitDataFromString(traitsString);
  for(var i = 0; i < traits.length; i++) {
    output += `<a href="rules-traits/#${PrintLinkAddressName(traits[i].keyword)}" style="${keywordsStyle}">${traits[i].name}</a>`;
  }

  return output;
}

function FormatTraitsWithDictionary(traitsString, traitsData) {

  var output = "";

  var traits = GetTraitDataFromString(traitsString);
  for(var i = 0; i < traits.length; i++) {

    output += `<div class="wuxTrait">
      <span class="wuxTraitText">${traits[i].name}</span>
      <span class="wuxTooltiptext">${traitsData.values[traits[i].keyword].description}</span>
    </div>`;
  }

  return output;
}

function GetTraitDataFromString(traits) {

  var output = [];
  var keywordsSplit = "" + traits;
  keywordsSplit = keywordsSplit.split(";");

  var name = "";
  var keyword = "";
  for(var i = 0; i < keywordsSplit.length; i++) {
    name = "" + keywordsSplit[i];
    name = name.trim();

    keyword = name;
    if (keyword.indexOf ("(") >= 0) {
      var regex = /\([^)]*\)/g;

      // Replace content inside parentheses with "X"
      keyword = keyword.replace(regex, "(X)");
    }

    output.push({name: name, keyword: keyword});
  }

  return output;
}

function FormatWikiSideText(info) {

  var output = CreateWikiData();
  var boxStyling = `class="right" style="width: 360px; padding: 5px 10px; margin: 0px 15px 15px 15px; border: 1px solid black; background: #fbf9e5;"`;

  output.printData = `<div ${boxStyling}>${info}</div>`;
  return output;
}



// ======================
// Features
// ======================

function CreateFeatureDataArray(modArray) {
  var output = [];

  for (var j = 0; j < modArray.length; j++) {
    output.push(CreateFeatureData(modArray[j]));
  }

  return output;
}

function CreateFeatureData(featureArray, source) {

  var feature = {
    name: "",
    augmentBase: "",
    techniqueSource: "",
    techniqueGroup: "",
    family: "",
    techniqueType: "",
    action: "",
    traits: "",
    limits: "",
    resourceCost: "",
    flavorText: "",
    description: "",
    onSuccess: "",
    dConditions: "",
    tEffect: "",
    ongDesc: "",
    ongSave: "",
    ongEft: "",
    trigger: "",
    requirement: "",
    item: "",
    prerequisite: {},
    skill: "",
    defense: "",
    range: "",
    rType: "",
    target: "",
    targetCode: "",
    dVal: "",
    dType: "",
    dBonus: "",
    damageType: "",
    element: "",
    augments: []
  };

  if (featureArray != undefined) {
    var i = 0;
    feature.name = "" + featureArray[i]; i++;
    feature.augmentBase = "" + featureArray[i]; i++;
    feature.techniqueGroup = "" + featureArray[i]; i++;
    feature.family = "" + featureArray[i]; i++;
    feature.techniqueType = "" + featureArray[i]; i++;
    feature.action = "" + featureArray[i]; i++;
    feature.traits = "" + featureArray[i]; i++;
    feature.limits = "" + featureArray[i]; i++;
    feature.resourceCost = "" + featureArray[i]; i++;
    feature.flavorText = "" + featureArray[i]; i++;
    feature.description = "" + featureArray[i]; i++;
    feature.onSuccess = "" + featureArray[i]; i++;
    feature.dConditions = "" + featureArray[i]; i++;
    feature.tEffect = "" + featureArray[i]; i++;
    feature.ongDesc = "" + featureArray[i]; i++;
    feature.ongSave = "" + featureArray[i]; i++;
    feature.ongEft = "" + featureArray[i]; i++;
    feature.trigger = "" + featureArray[i]; i++;
    feature.requirement = "" + featureArray[i]; i++;
    feature.item = "" + featureArray[i]; i++;
    feature.prerequisite = CreateFeaturePrerequisite(featureArray, i); i += 8;
    feature.skill = "" + featureArray[i]; i++;
    feature.defense = "" + featureArray[i]; i++;
    feature.range = "" + featureArray[i]; i++;
    feature.rType = "" + featureArray[i]; i++;
    feature.target = "" + featureArray[i]; i++;
    feature.targetCode = "" + featureArray[i]; i++;
    feature.dVal = "" + featureArray[i]; i++;
    feature.dType = "" + featureArray[i]; i++;
    feature.dBonus = "" + featureArray[i]; i++;
    feature.damageType = "" + featureArray[i]; i++;
    feature.element = "" + featureArray[i]; i++;
  }
  if (source != undefined) {
    feature.techniqueSource = source;
  }

  return feature;
}

function CreateFeatureRequirement(featureArray, incrementer) {
  return {
    ot: featureArray[incrementer],
    wpn: featureArray[incrementer + 1],
  }
}

function CreateFeaturePrerequisite(featureArray, incrementer) {
  return {
    lv: featureArray[incrementer],
    wr: featureArray[incrementer + 1],
    tl: featureArray[incrementer + 2],
    ac: featureArray[incrementer + 3],
    mg: featureArray[incrementer + 4],
    br: featureArray[incrementer + 5],
    tr: featureArray[incrementer + 6],
    ot: featureArray[incrementer + 7],
  }
}

function FormatFeatureInformation(featureData, noClass, traitsData, displayOptions) {

  if (displayOptions == undefined) {
    displayOptions = GetFeatureDisplayOptions();
    displayOptions.hasCSS = true;
  }

  // styling
  var blockDiv = `<div${noClass ? "" : ` class="left"`} style="width: 360px; margin: 0px 15px 10px 0px; border: 1px solid black; ">`;
  var augmentDiv = `<div style="border-top: 1px solid black;">`;

  var output = "";
  var featurePrintData = GetFeaturePrintData(featureData, traitsData, displayOptions);
  for (var i = 0; i < featurePrintData.length; i++) {
    if (i == 0) {
      output += featurePrintData[i];
    }
    else {
      output += `${augmentDiv}${featurePrintData[i]}</div>`;
    }
  }
  return `${blockDiv}${output}</div>`;
}

function GetFeatureDisplayOptions() {
  return {
    hasCSS: false,
    hasUseInteraction: false,
    showTrigger: false,
    showKiCharge: false
  }
}

function FormatFeatureInformationWithStyle(featureData, traitsData, displayOptions) {

  if (displayOptions == undefined) {
    displayOptions = GetFeatureDisplayOptions();
    displayOptions.hasCSS = true;
  }
  var output = "";
  var featurePrintData = GetFeaturePrintData(featureData, traitsData, displayOptions);
  for (var i = 0; i < featurePrintData.length; i++) {
    output += `<div ${SetFeatureStyle("wuxFeature", true)}>${featurePrintData[i]}</div>
    `;
  }
  return output;
}

function GetFeaturePrintData(featureData, traitsData, displayOptions) {

  var output = [];
  var feature = FormatFeatureTitleBlock(featureData, traitsData, displayOptions);
  feature += FormatFeatureExpandData(featureData, traitsData, displayOptions);
  output.push(feature);
  
  for (var i = 0; i < featureData.augments.length; i++) {
    feature = FormatFeatureTitleBlock(featureData.augments[i], traitsData, displayOptions);
    feature += FormatFeatureExpandData(featureData.augments[i], traitsData, displayOptions);
    output.push(feature);
  }
  return output;
}

function FormatFeatureTitleBlock(featureData, traitsData, displayOptions) {

  var fieldName = Format.ToCamelCase(featureData.name);
  var output = "";

  // create the tech type slot
  if (featureData.techniqueType != "" && featureData.techniqueGroup != "") {
    output += `<div ${SetFeatureStyle(["wuxFeatureType", `wuxFeatureType-${featureData.techniqueType}`], displayOptions.hasCSS)}>
      <span ${SetFeatureStyle("wuxFeatureTypeHeader", displayOptions.hasCSS)}>${featureData.techniqueType}</span>
      <span ${SetFeatureStyle("wuxFeatureTypeFooter", displayOptions.hasCSS)}>${featureData.techniqueGroup}</span>
    </div>`;
  }
  
  // add the interactions
  if (displayOptions.hasCSS) {
    // add the collapsible field
    output += `<div class="wuxFeatureHeaderInteractBlock">
      <div class="wuxFeatureHeaderInteractInnerBlock">
        <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="attr_technique-expand-${fieldName}">
        <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_technique-expand-${fieldName}">
        <span class="wuxFeatureHeaderInteractiveIcon">&#9662;</span>
        <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_technique-expand-${fieldName}">
        <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9656;</span>
      </div>
    </div>`;

    if (displayOptions.hasUseInteraction) {
      output += `<div class="wuxFeatureHeaderInteractBlock">
        ${CreateUseFeatureData(featureData, traitsData, fieldName)}
      </div>`;
    }
  }

  var subTechCategory = ``;
  if (featureData.augmentBase != "") {
    subTechCategory += `<span ${SetFeatureStyle("wuxFeatureHeaderInfoType", displayOptions.hasCSS)}>${featureData.augmentBase}</span>`;
  }
  else {
    subTechCategory += `<span ${SetFeatureStyle("wuxFeatureHeaderInfoType", displayOptions.hasCSS)}>Base</span>`;
  }

  var subHeaderData = "";
  if (featureData.action != "") {
    subHeaderData += `<span>${featureData.action}</span>
    `;
  }
  if (featureData.limits != "") {
    if (subHeaderData != "") {
      subHeaderData += "; ";
    }
    subHeaderData += `<span>${featureData.limits}</span>
    `;
  }
  if (featureData.resourceCost != "") {
    if (subHeaderData != "") {
      subHeaderData += "; ";
    }
    subHeaderData += `<span>${featureData.resourceCost}</span>
    `;
  }

  var armamentData = "";
  if (displayOptions.hasUseInteraction && (featureData.traits.indexOf("Armament") >= 0 || featureData.traits.indexOf("Arsenal") >= 0)) {
    armamentData = `<div class="wuxFeatureHeaderInfo">
      <select class='wuxFeatureHeaderInfoType' name='attr_technique-equippedWeapon-${fieldName}' value="@{equipment-main}">
        <option value="@{equipment-main}">Main Weapon</option>
        <option value="@{equipment-sub}">Sub Weapon</option>
        <option value="@{equipment-support}">Support Weapon</option>
      </select>
    </div>`;
  }

  output += `<div ${SetFeatureStyle("wuxFeatureHeaderDisplayBlock", displayOptions.hasCSS)}>
    <span ${SetFeatureStyle("wuxFeatureHeaderName", displayOptions.hasCSS)}>${featureData.name}</span>
    <div ${SetFeatureStyle("wuxFeatureHeaderInfo", displayOptions.hasCSS)}>
      ${subTechCategory}
      ${subHeaderData}
    </div>
    ${armamentData}
  </div>`;

  var headerColor = "";
  if (displayOptions.hasUseInteraction || featureData.augmentBase == "") {
    headerColor = featureData.action;
  }
  else {
    headerColor = "Augment";
  }

  output = `<div ${SetFeatureStyle(["wuxFeatureHeader", `wuxFeatureHeader-${headerColor}`], displayOptions.hasCSS)}>
  ${output}
  </div>
  `;

  if (displayOptions.showTrigger && featureData.trigger != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureFunctionBlock", displayOptions.hasCSS)}>
      <div ${SetFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions.hasCSS)}>
        <span><strong>Trigger: </strong></span>
        <span>${featureData.trigger}</span>
      </div>
    </div>
    `;
  }

  return output;
}

function CreateUseFeatureData(featureData, traitsData, fieldName) {
  let output = "";

  output += "{{type-base=1}} ";

	output += `{{Username=@{nickname}}}`;
	output += `{{Name=${featureData.name}}}`;
	output += `{{Type=${featureData.techniqueType}}}`;
	output += `{{type-${featureData.techniqueType}=1}} `;
	output += `{{Group=${featureData.techniqueSource}}}`;

	// create the action line
	let actionLine = "";
	if (featureData.action != "") {
		output += `{{type-${featureData.action}=1}} `;
		actionLine += featureData.action;
	}
	if (featureData.limits != "") {
		if (actionLine != "") {
			actionLine += "; ";
		}
		actionLine += featureData.limits;
	}
	if (featureData.resourceCost != "") {
		if (actionLine != "") {
			actionLine += "; ";
		}
		actionLine += featureData.resourceCost;
	}
	if (actionLine != "") {
		output += `{{ActionLine=${actionLine}}} `;
	}
  let prerequisite = FeatureService.GetPrerequisiteString(featureData);
  let requirement = FeatureService.GetRequirementString(featureData);
	if (featureData.traits != "" || featureData.trigger != "" || requirement != "" || prerequisite != "") {
		output += "{{type-FunctionBlock=1}} ";

		if (featureData.traits != "") {
			var traits = GetTraitDataFromString(featureData.traits);
			for (var i = 0; i < traits.length; i++) {
				output += `{{Trait${i}=${traits[i].name}}} {{Trait${i}Desc=${traitsData.values[traits[i].keyword].description}}} `;
			}
		}
		if (featureData.trigger != "") {
			output += `{{Trigger=${featureData.trigger}}} `;
		}
		if (requirement != "") {
			output += `{{Requirement=${requirement}}} `;
		}
		if (prerequisite != "") {
			output += `{{Prerequisites=${prerequisite}}} `;
		}
	}
	if (featureData.skill != "" || featureData.defense != "" || featureData.range != "" || featureData.target != "" || featureData.damageType != "") {
		output += "{{type-CheckBlock=1}} ";

		if (featureData.range != "" || featureData.target != "") {
			output += "{{type-CheckBlockTarget=1}} ";

			if (featureData.range != "") {
				output += `{{Range=${featureData.range}}} {{RType=${featureData.rType}}} `;
			}
			if (featureData.target != "") {
				output += `{{Target=${featureData.target}}} `;
			}
		}
		if (featureData.skill != "") {
			let skill = "";
			if (featureData.defense != "") {
				if (featureData.defense.indexOf("DC")) {
					skill = featureData.defense;
				}
				else {
					skill = `${featureData.defense} Check`;
				}
			}
			else {
				skill = "DC 15";
			}
			skill = `${featureData.skill} vs. ${skill}`;
			output += `{{SkillString=${skill}}} `;
		}
		if (featureData.damageType != "") {
			output += `{{DamageString=${FeatureService.GetDamageString(featureData)}}} `;
		}
	}
	if (featureData.description != "" || featureData.onSuccess != "") {
		output += "{{type-DescBlock=1}} ";
		if (featureData.description != "") {
			output += `{{Desc=${featureData.description}}} `;
		}
		if (featureData.onSuccess != "") {
			output += `{{OnHit=${featureData.onSuccess}}} `;
		}
	}

	// add technique data for the api
  featureData.username = "@{character_name}";
	let usedTechData = JSON.stringify(featureData);

  if (featureData.traits.indexOf("Armament") >= 0 || featureData.traits.indexOf("Arsenal") >= 0) {
    usedTechData += `##@{technique-equippedWeapon-${fieldName}}`;
  }
  usedTechData = Format.SanitizeSheetRollAction(usedTechData);
  
	output = `<button class="wuxFeatureHeaderInteractiveButton" type="roll" value="&{template:technique} ${output.trim()}">i</button><button class="wuxFeatureHeaderInteractiveButton" type="roll" value="!ctech ${usedTechData}">9</button>`;

  return output;
}
function FormatFeatureExpandData (featureData, traitsData, displayOptions) {
  var feature = "";
  feature += FormatFeatureFunctionBlock(featureData, traitsData, displayOptions);
  feature += FormatFeatureCheckBlock(featureData, displayOptions);
  feature += FormatFeatureDescriptionBlock(featureData, displayOptions);

  if (displayOptions.hasCSS) {
    var fieldName = Format.ToCamelCase(featureData.name);
    return `<input type="hidden" class="wuxFeatureHeaderInteractBlock-flag" name="attr_technique-expand-${fieldName}">
    <div class="wuxFeatureExpandingContent">
      ${feature}
    </div>`;
  }
  else {
    return feature;
  }
}

function FormatFeatureFunctionBlock(featureData, traitsData, displayOptions) {

  var output = "";

  let prerequisite = FeatureService.GetPrerequisiteString(featureData);
  if (prerequisite != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions.hasCSS)}>
      <span><strong>Prerequisites: </strong></span>
      <span>${prerequisite}</span>
    </div>
    `;
  }
  if (featureData.traits != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions.hasCSS)}>
      <span><strong>Traits: </strong></span>
      <span class="wuxShownTraits">${displayOptions.hasCSS ? FormatTraitsWithDictionary(featureData.traits, traitsData) : FormatTraits(featureData.traits)}</span>
    </div>
    `;
  }
  let requirement = FeatureService.GetRequirementString(featureData);
  if (requirement != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions.hasCSS)}>
      <span><strong>Requirement: </strong></span>
      <span>${requirement}</span>
    </div>
    `;
  }
  if (!displayOptions.showTrigger && featureData.trigger != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions.hasCSS)}>
      <span><strong>Trigger: </strong></span>
      <span>${featureData.trigger}</span>
    </div>
    `;
  }

  if (output != "") {
    output = `<div ${SetFeatureStyle("wuxFeatureFunctionBlock", displayOptions.hasCSS)}>
      ${output}
    </div>
    `;
  }
  return output;
}

function FormatFeatureCheckBlock(featureData, displayOptions) {

  var output = "";

  if (featureData.range != "" || featureData.target != "") {
    if (featureData.range != "") {
      output += `<div ${SetFeatureStyle("wuxFeatureCheckBlockRange", displayOptions.hasCSS)}>
        <span><strong>${featureData.rType}: </strong></span>
        <span>${featureData.range}</span>
      </div>`;
    }
    if (featureData.target != "") {
      output += `<div ${SetFeatureStyle("wuxFeatureCheckBlockTarget", displayOptions.hasCSS)}>
        <span><strong>Target: </strong></span>
        <span>${featureData.target}</span>
      </div>`;
    }
    output = `<div ${SetFeatureStyle("wuxFeatureCheckBlockRow", displayOptions.hasCSS)}>
      ${output}
    </div>
    `;
  }

  if (featureData.skill != "") {
    let skillLine = `${featureData.skill}`;
    if (featureData.defense == "") {
      skillLine += ` vs. DC 15`;
    }
    else if (featureData.defense.indexOf("DC") >= 0) {
      skillLine += `vs; ${featureData.defense}`;
    }
    else {
      skillLine += `vs. ${featureData.defense} Check`;
    }

    output += `<div ${SetFeatureStyle("wuxFeatureCheckBlockRow", displayOptions.hasCSS)}>
      <span><strong>Check: </strong></span>
      <span>${skillLine}</span>
    </div>
    `;
  }

  if (featureData.damageType != "") {
    output += `<div ${SetFeatureStyle("wuxFeatureCheckBlockRow", displayOptions.hasCSS)}>
      <span><strong>Damage: </strong></span>
      <span>${FeatureService.GetDamageString(featureData)}</span>
    </div>
    `;
  }

  if (output != "") {
    output = `<div ${SetFeatureStyle("wuxFeatureCheckBlock", displayOptions.hasCSS)}>
      ${output}
    </div>
    `;
  }

  return output;
}

function FormatFeatureDescriptionBlock(featureData, displayOptions) {

  var output = "";

  if (featureData.description != "") {
    output += `<div>
      <span ${SetFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions.hasCSS)}>${FormatBlock(featureData.description)}</span>
    </div>
    `;
  }
  if (featureData.onSuccess != "") {
    output += `<div>
      <strong ${SetFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions.hasCSS)}>On Hit: </strong>
      <span ${SetFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions.hasCSS)}>${FormatBlock(featureData.onSuccess)}</span>
    </div>
    `;
  }

  if (displayOptions.showKiCharge && featureData.tEffect.indexOf("Surge") >= 0) {
    output += `<div>
      <span><strong>Ki Charge: </strong></span>
      <span name="attr_kiCharge_max" value="0">0</span>
    </div>`;
  }
  
  if (output != "") {
    output = `<div ${SetFeatureStyle("wuxFeatureDescriptionBlock", displayOptions.hasCSS)}>
      <div>
        ${output}
      </div>
    </div>
    `;
  }
  return output;
}

function SetFeatureStyle(style, hasCSS) {
  if (hasCSS) {
    if (Array.isArray(style)) {
      let output = "";
      for (var i = 0; i < style.length; i++) {
        if (output != "") {
          output += " ";
        }
        output += style[i];
      }
      return `class="${output}"`;
    }
    else {
      return `class="${style}"`;
    }
  }
  else {if (Array.isArray(style)) {
      let output = "";
      for (var i = 0; i < style.length; i++) {
        if (output != "") {
          output += " ";
        }
        output += GetFeatureStyleSheetStyle(style[i]);
      }
      return `style="${output}"`;
    }
    else {
      return `style="${GetFeatureStyleSheetStyle(style)}"`;
    }
  }
}

function GetFeatureStyleSheetStyle(style) {
  switch(style){
    case "wuxFeature":
      return `position: relative;
        display: inline-block;
        min-width: 300px; 
        max-width: 500px; 
        width: calc(100% - 10px);

        font-size: 12px;

        border: 3px solid black; 
        background: #cacbcf;

        flex: 1;`;
    case "wuxFeatureHeader":
      return `position: relative;
    display: block; 
    width: calc(100% - 10px);
    padding: 0px 0px 5px 10px; 
    background: #c0e7d5;
    border-bottom: 1px solid #efefef; `;
    case "wuxFeatureHeader-Quick":
      return `background-color: #fbe5e5;`;
    case "wuxFeatureHeader-Full":
      return `background-color: #d7a0a0;`;
    case "wuxFeatureHeader-Reaction":
      return `background-color: #e5eafb;`;
    case "wuxFeatureHeader-Free":
      return `background-color: #e5fbf1;`;
    case "wuxFeatureHeader-None":
      return `background-color: #f0e5fb;`;
    case "wuxFeatureHeader-Augment":
      return `background-color: #acacac;`;
    case "wuxFeatureType":
      return `position: absolute;
    display: inline-block;
    right: 0px;
    width: 55px; 
    padding: 5px; 

    vertical-align: top; 
    text-align: center; 
    
    color: #FFF; 
    
    background: #000000;`;
    case "wuxFeatureType-Active":
      return `background-color: #b60003;`;
    case "wuxFeatureType-Passive":
      return `background-color: #4db600;`;
    case "wuxFeatureType-Support":
      return `background-color: #00b0b6;`;
    case "wuxFeatureType-Job":
      return `background-color: #7800b6;`;
    case "wuxFeatureType-Permanent":
      return `background-color: #b66f00;`;
    case "wuxFeatureTypeHeader":
      return `position: relative;
    display: block;

    font-size: 9px; 
    font-weight: bold;`;
    case "wuxFeatureTypeFooter":
      return `position: relative;
    display: block;
    font-size: 7px;`;
    case "wuxFeatureHeaderDisplayBlock":
      return `position: relative;
    display:inline-block; 
    width: calc(100% - 115px);`;
    case "wuxFeatureHeaderName":
      return `position: relative;
    display: block; 

    width: 100%;
    margin-top: 5px; 
    
    font-size: 13px; 
    font-weight: bold;`;
    case "wuxFeatureHeaderInfo":
      return `position: relative;
    display: block; 

    font-size: 11px;`;
    case "wuxFeatureHeaderInfoType":
      return `position: relative;
    font-weight: bold;`;
    case "wuxFeatureExpandingContent":
      return `position: relative;`;
    case "wuxFeatureFunctionBlock":
      return `position: relative;
    display: block;

    width: calc(100% - 22px);
    padding: 5px 10px; 
    
    line-height: 14px; 
    font-size: 11px; 
    
    border-bottom: 1px solid #c6c6c6; 
    background: #fbf9e5;`;
    case "wuxFeatureFunctionBlockRow":
      return `position: relative;
    display: block;`;
    case "wuxFeatureCheckBlock":
      return ``;
    case "wuxFeatureCheckBlockRow":
      return `position: relative;
    display: inline-block;

    width: calc(100% - 22px);`;
    case "wuxFeatureCheckBlockRange":
      return `position: relative;
    display: inline-block;

    padding-right: 10px;`;
    case "wuxFeatureCheckBlockTarget":
      return `position: relative;
    display: inline-block;

    width: calc(65% - 5px);`;
    case "wuxFeatureDescriptionBlock":
      return `position: relative;
    display: block;
    width: calc(100% - 20px);
    padding: 5px 10px; 

    font-size: 11px;`;
    case "wuxFeatureDescriptionBlockDesc":
      return `display: inline-block;
    white-space: pre-line;
    word-break: break-word;`;
    default:
      return "";
  }
}


// ======================
// Data
// ======================

function CreateArrayDataObject() {
  return {
    groups: [],
    names: [],

    createNewGroupEntry: function(group) {
      if (!this.names.includes(group)) {
        this.names.push(group);
        this.groups.push([]); 
        return true;
      }
      return false;
    },
    getGroupIndex: function(group) {
      if (!this.names.includes(group)) {
        this.names.push(group);
        this.groups.push([]); 
        return this.groups.length - 1;
      }
      return this.names.indexOf(group);
    },
    getGroup: function(group) {
      return this.groups[this.getGroupIndex(group)];
    }
  };
}

function SortByName(element1, element2) {
  if(element1.name < element2.name)
    return -1; //Sort element1 before element2
  if(element1.name > element2.name)
    return 1;  //Sort element1 after element2
  return 0;    //Don't change the positions of element1 and element2
}

function GetField(array, index) {

  if (Array.isArray(index)) {
    var newArray = [];
    for(var i = 0; i < index.length; i++) {
      newArray.push (array[index[i] - 1]);
    }
    return newArray;
  }
  else {
    return array[index - 1];
  }
}

function PrintLargeEntry(output, splitCharacter)
{
  if (splitCharacter == undefined) {
    splitCharacter = "\n";
  }

  var splitString = "";
  let splitIndex = 0;
  if (output.length > 50000) {
    var outputArray = [];
    while (output.length > 0) {
      if (output.length > 50000) {
        splitString = output.substring(0, 50000);

        if (splitCharacter != "") {
          splitIndex = splitString.lastIndexOf(splitCharacter);
          if (splitIndex > 0) {
            splitString = output.substring(0, splitIndex + splitCharacter.length);
            output = output.substring(splitIndex + splitCharacter.length);
          } 
          else {
            output = output.substring(50000);
          }
        }
        else {
          output = output.substring(50000);
        }
        outputArray.push(splitString);
      }
      else {
        outputArray.push(output.substring(0));
        output = "";
      }
    }
    return outputArray;
  }
  else
  {
    return output;
  }
}




// ======================
// Ability Scores
// ======================

function CreateAbilityScoreArrayData(abilityScoreArray, startingIndex) {
  var output = {
    CON: 0, DEX: 0,
    QCK: 0, STR: 0,
    CHA: 0, INT: 0,
    PER: 0, WIL: 0
  }
  if (abilityScoreArray != undefined) {
    output.CON = isNaN(parseInt(abilityScoreArray[startingIndex + 0])) ? 0 : parseInt(abilityScoreArray[startingIndex + 0]);
    output.DEX = isNaN(parseInt(abilityScoreArray[startingIndex + 1])) ? 0 : parseInt(abilityScoreArray[startingIndex + 1]);
    output.QCK = isNaN(parseInt(abilityScoreArray[startingIndex + 2])) ? 0 : parseInt(abilityScoreArray[startingIndex + 2]);
    output.STR = isNaN(parseInt(abilityScoreArray[startingIndex + 3])) ? 0 : parseInt(abilityScoreArray[startingIndex + 3]);
    output.CHA = isNaN(parseInt(abilityScoreArray[startingIndex + 4])) ? 0 : parseInt(abilityScoreArray[startingIndex + 4]);
    output.INT = isNaN(parseInt(abilityScoreArray[startingIndex + 5])) ? 0 : parseInt(abilityScoreArray[startingIndex + 5]);
    output.PER = isNaN(parseInt(abilityScoreArray[startingIndex + 6])) ? 0 : parseInt(abilityScoreArray[startingIndex + 6]);
    output.WIL = isNaN(parseInt(abilityScoreArray[startingIndex + 7])) ? 0 : parseInt(abilityScoreArray[startingIndex + 7]);
  }

  return output;
}

function CreateGrowthsArrayData(growthArray, startingIndex) {

  var output = CreateAbilityScoreArrayData(growthArray, startingIndex);
  output.hp = 0;

  if (growthArray != undefined) {
    output.hp = isNaN(parseInt(growthArray[startingIndex + 8])) ? 0 : parseInt(growthArray[startingIndex + 8]);
  }
  
  return output;
}

function CreateAbilityScoreTable(abilityScoreData, dataStyle, headerStyle) {

  var proficiencyTableOutput = CreateWikiData();

  var table = FormatTableData([
    abilityScoreData.hp,
    abilityScoreData.CON, abilityScoreData.DEX,
    abilityScoreData.QCK, abilityScoreData.STR,
    abilityScoreData.CHA, abilityScoreData.INT,
    abilityScoreData.PER, abilityScoreData.WIL
  ]);

  proficiencyTableOutput.printData = FormatTable(["HP", "CON", "DEX", "QCK", "STR", "CHA", "INT", "PER", "WIL"], table, dataStyle, headerStyle);

  return proficiencyTableOutput;
}

function ConvertAbilityScoresToGrowths(growthData) {

  let abilityScoreGrowthRate = 20;
	let hpGrowthRate = 50;
  return {
    CON: `${growthData.CON * abilityScoreGrowthRate}%`,
    DEX: `${growthData.DEX * abilityScoreGrowthRate}%`,
    QCK: `${growthData.QCK * abilityScoreGrowthRate}%`,
    STR: `${growthData.STR * abilityScoreGrowthRate}%`,
    CHA: `${growthData.CHA * abilityScoreGrowthRate}%`,
    INT: `${growthData.INT * abilityScoreGrowthRate}%`,
    PER: `${growthData.PER * abilityScoreGrowthRate}%`,
    WIL: `${growthData.WIL * abilityScoreGrowthRate}%`,
    hp: `${growthData.hp * hpGrowthRate}%`
  }
}




// ======================
// Wiki
// ======================

function CreateWikiEntry(wikiData) {

  // outputs
  var header = "";
  var output = "";

  // sort the array
  for (var i = 0; i < wikiData.length; i++) {
    if (wikiData[i].header != "") {
      if (wikiData[i].header != "") {
        header += "<br />\n";
      }
      header += wikiData[i].header;
    }
    output += wikiData[i].printData;
    
  }

  // Print output data
  output = FormatWikiSidebar(header) + output;
  return PrintLargeEntry(output, "\n");
}

function FormatWikiSidebar(content) {
  return `<div style='position: absolute; left: -27%; top: 380px; background-color: #FFF; width: 25.5%; padding: 10px; box-shadow: 3px 3px 3px #000; border-radius: 5px;'>
  <h4 style='color:#000080;'><strong>Contents</strong></h4>
  <p style='font-size: 14px'>
  ${content}
  </p></div>\n`;

}

function CreateWikiData(header, printData) {
  return {
    header: (header == undefined ? "" : header),
    printData: (printData == undefined ? "" : printData)
  };
}

function ParseEntryTypes(type, desc) {

  var output = CreateWikiData();

  switch(type) {
    case "Header":
      output.header += `<strong>${PrintLinkAddress(desc)}</strong>`;
      output.printData += `${PrintHeaderAnchor(desc)} ${PrintSectionHeader(desc)}`;
      break;
    case "Subheader":
      output.header += `- ${PrintLinkAddress(desc)}`;
      output.printData += `${PrintHeaderAnchor(desc)} ${PrintFeatureHeader(desc)}`;
      break;
    case "SubheaderNA":
      output.printData += `${PrintFeatureHeader(desc)}`;
      break;
    case "Title":
      output.printData += `${PrintTitle(desc)}\n`;
      break;
    case "":
      output.printData += `${FormatParagraph(desc)}`;
      break;
    case "Table":
      output.printData += desc + "\n";
      break;
    case "Footer":
      output.printData += "<p><a class='anchor' style='min-width: 600px; display: block; clear: both;'>&nbsp;</a></p>\n";
      break;
  }

  return output;
}

function CreateWikiPage(rulesArray) {

  var type = "";
  var desc = "";
  var wikiData = [];
  let parsedData = {};
  for (var i = 0; i < rulesArray.length; i++) {

    type = "" + rulesArray[i][0];
    desc = "" + rulesArray[i][1];
    parsedData = ParseEntryTypes(type, desc);
    wikiData.push(parsedData);
  }

  return CreateWikiEntry(wikiData);
}

// ======================
// Database
// ======================

function CreateDatabase(databaseName, customDataNames, customData, defaultData) {

  return `function Get${databaseName}Info(name) {
    switch (name.toLowerCase()) {
    ${CreateDatabaseData(customDataNames, customData, defaultData)}
    }
  }`;
}

function CreateDatabaseData(customDataNames, customData, defaultData) {

  var output = "";

  // create the data contents
  for (var i = 0; i < customData.length; i++) {
    output += `case "${customDataNames[i].toLowerCase()}":
    return ${customData[i]}\n`;
  }

  // create the default values
  output += `default:
    return ${defaultData}\n`;

  return output;
}

function CreateDatabaseList(databaseName, customDataNames) {

  var output = "";
  var secondList = "";

  // create the data contents
  for (var i = 0; i < customDataNames.length; i++) {
    if (output != "") {
      output += ", ";
      secondList += ", ";
    }
    output += `"${customDataNames[i]}"`;
    secondList += `"${Format.ToCamelCase(customDataNames[i])}"`;
  }

  output = `function Get${databaseName}List(isFields) {
    if (isFields) {
      return [${secondList}];
    }
    else {
      return [${output}];
    }
  }`;

  return output;
}

function CreateDatalist(databaseName, customDataNames) {

  var output = "";

  // create the data contents
  for (var i = 0; i < customDataNames.length; i++) {
    output += `<option value="${customDataNames[i]}">${customDataNames[i]}</option>\n`;
  }

  output = `<datalist id="${databaseName}list">
    ${output}
    </datalist>`;

  return output;
}

// ======================
// JS Class
// ======================

function CreateJsClass(className, functions, publicFunctions) {
  return `var ${className} = ${className} || (function () {
    'use strict';
    
    var 
      ${CreateJsClassFunctionList(functions)}
      ;
    return {
      ${CreateJsClassPublicFunctionList(publicFunctions)}
    };
  }());`;
}

function CreateJsClassFunctionList(functions) {
  let output = "";
  for (let i = 0; i < functions.length; i++) {
    if (output != "") {
      output += ",\n\n";
    }
    output += functions[i];
  }
  return output;
}

function CreateJsClassPublicFunctionList(functions) {
  let output = "";
  for (let i = 0; i < functions.length; i++) {
    if (output != "") {
      output += ",\n";
    }
    output += `${Format.ToUpperCamelCase(functions[i])}: ${functions[i]}`;
  }
  return output;
}

function CreateJsClassFunction(functionName, data) {

  return `get${functionName} = function (name) {
    ${data}
  }`;
}

function CreateJsClassDatabase(databaseName, customDataNames, customData, defaultData) {

  return `get${databaseName} = function (name) {
    switch (name.toLowerCase()) {
    ${CreateDatabaseData(customDataNames, customData, defaultData)}
    }
  }`;
}

function FormatJsonForDatabase(data) {
  let json = JSON.stringify(data);
  json = json.replace(/(},|],)/g, '$1\n');
  return json;
}

var FormatJsClass = FormatJsClass || (function() {
    'use strict';

    var 
        print = function(jsClassData, className) {
          let variables = formatClassData(jsClassData.variables, " = ");
          if (jsClassData.functions.keys.length > 0) {
            if (variables != "") {
              variables += `,
              
              `;
            }
            variables += formatClassData(jsClassData.functions, " = ");
          }
          let publicData = formatClassData(jsClassData.publicData, ": ");

          return `var ${className} = ${className} || (function() {
              'use strict';

              var 
                  ${variables}
              ;
              return {
                  ${publicData}
              };
            }());
          `;
        },

        formatClassData = function(dictionary, delimeter) {
          let key = "";
          let data = "";
          for (let i = 0; i < dictionary.keys.length; i++) {
            key = dictionary.keys[i];
            if (data != "") {
              data += `,
              `;
            }
            data += `${key}${delimeter}${dictionary.get(key)}`;
          }
          return data;
        },

        getDataObj = function() {
          return {
            variables: CreateDictionary(),
            functions: CreateDictionary(),
            publicData: CreateDictionary(),

            addVariable: function(name, data) {
              this.variables.add(name, data);
            },

            addFunction: function(name, data) {
              this.functions.add(name, data);
            },

            addPublicData: function(name) {
              this.publicData.add(Format.ToUpperCamelCase(name), name);
            },

            addDatabase: function(customDataNames, customData, defaultData) {

              this.addVariable("database", FormatJsonForDatabase(this.createDatabase(customDataNames, customData)));

              this.addFunction("get", `function(name) {
                  let data = database[name];
                  if (data == undefined) {
                    return ${defaultData};
                  }
                  return data;
                }`
              );
              this.addPublicData("get");
            },

            createDatabase: function(customDataNames, customData) {
              let database = {};
              for(let i = 0; i < customData.length; i++) {
                database[customDataNames[i]] = customData[i];
              }
              return database;
            }
          }
        }

    ;
    return {
        Print: print,
        GetDataObj: getDataObj
    };
}());


















