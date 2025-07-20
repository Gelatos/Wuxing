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
// Data
// ======================

function CreateArrayDataObject() {
  return {
    groups: [],
    nameDatabase: [],

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


















