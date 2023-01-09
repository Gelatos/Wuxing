

// ====== Group determination

function GetDataLayers(dataGroup, outfitQualities) {
  var dataLayers = {
    charindex: "",

    // generation data
    filename: "",
    leftOffsetLayer: "",
    group1DataLayer: "",
    group2DataLayer: "",
    group3DataLayer: "",
    browDataLayer: "",
    neutralBrowDataLayer: "",
    colorDataLayer: "",
    eyeDataLayer: "",
    neutralEyeDataLayer: "",
    neutralMouthDataLayer: "",

    get: function (dataLayer) {
      return dataLayer != "" ? dataLayer.name : "";
    },
    getinteger: function (dataLayer) {
      return dataLayer == "" || isNaN(parseInt(dataLayer.name)) ? 0 : parseInt(dataLayer.name);
    },
    set: function (dataLayer, value) {
      if (dataLayer != "") {
        dataLayer.name = value;
      }
    },

    getCharIndex: function () { return this.getinteger(this.charindex);},
    setCharIndex: function (value) { this.set(this.charindex, value);},
    getFilename: function () { return this.get(this.filename);},
    getLeftOffset: function () { return this.getinteger(this.leftOffsetLayer);},
    setLeftOffset: function (value) { this.set(this.leftOffsetLayer, value);},
    getGroup1: function () { return this.get(this.group1DataLayer);},
    setGroup1: function (value) { this.set(this.group1DataLayer, value);},
    getGroup2: function () { return this.get(this.group2DataLayer);},
    setGroup2: function (value) { this.set(this.group2DataLayer, value);},
    getGroup3: function () { return this.get(this.group3DataLayer);},
    setGroup3: function (value) { this.set(this.group3DataLayer, value);},
    getBrowStyle: function () { return this.get(this.browDataLayer);},
    setBrowStyle: function (value) { this.set(this.browDataLayer, value);},
    getBrowNeutral: function () { return this.get(this.neutralBrowDataLayer);},
    setBrowNeutral: function (value) { this.set(this.neutralBrowDataLayer, value);},
    getHairColor: function () { return this.get(this.colorDataLayer);},
    setHairColor: function (value) { this.set(this.colorDataLayer, value);},
    getEyeStyle: function () { return this.get(this.eyeDataLayer);},
    setEyeStyle: function (value) { this.set(this.eyeDataLayer, value);},
    getEyeNeutral: function () { return this.get(this.neutralEyeDataLayer);},
    setEyeNeutral: function (value) { this.set(this.neutralEyeDataLayer, value);},
    getMouthNeutral: function () { return this.get(this.neutralMouthDataLayer);},
    setMouthNeutral: function (value) { this.set(this.neutralMouthDataLayer, value);}
  };

  for (var i = 0; i < dataGroup.layerSets.length; i++) {
    switch (dataGroup.layerSets[i].toString().toLowerCase()) {
      case "[layerset charindex]": 
      dataLayers.charindex = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset filename]": 
      dataLayers.filename = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset leftoffset]": 
      dataLayers.leftOffsetLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset group1]": 
      dataLayers.group1DataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset group2]": 
      dataLayers.group2DataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset group3]": 
      dataLayers.group3DataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset brow]": 
      dataLayers.browDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset neutralbrow]": 
      dataLayers.neutralBrowDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset color]": 
      dataLayers.colorDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset eye]": 
      dataLayers.eyeDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset neutraleye]": 
      dataLayers.neutralEyeDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset neutralmouth]": 
      dataLayers.neutralMouthDataLayer = dataGroup.layerSets[i].layers[0]; break;
      case "[layerset presets]": 
        for (var j = 0; j < dataGroup.layerSets[i].layers.length; j++) {
          if (dataGroup.layerSets[i].layers[j].visible) {
            outfitQualities[dataGroup.layerSets[i].layers[j].layers[0].name.toLowerCase()] = dataGroup.layerSets[i].layers[j].layers[1].toString().toLowerCase();
          }
        }
        break;
    }
  }

  return dataLayers;
}

// ====== Selection Detection
function GetSelectedGroup(group) {
  var selection = -1;
  for (var i = 0; i < group.layerSets.length; i++) {
    if (group.layerSets[i].visible) {
      selection = i;
      break;
    }
  }

  return selection;
}

// ====== Array Expansion
function ArrayIndexOf(array, indexOf) {

  for (var i = 0; i < array.length; i++) {
    if (array[i] == indexOf) {
      return i;
    }
  }
  return -1;
}

// ====== Group Selection
function RandomizeSelectedGroup(group) {

  var selectedIndex =  Math.floor(Math.random() * group.layerSets.length);
  SelectGroup(group, selectedIndex);
  return selectedIndex;
}

function SelectGroup(group, selectedIndex) {
  
  // ensure the group is visible
  group.visible = true;
  
  // set all subgroups to hidden
  HideAllSubGroups(group);

  // make the chosen group visible
  if (selectedIndex > -1) {
    group.layerSets[selectedIndex].visible = true;
  }
}

function SelectGroupByName(group, quality, randomize) {

  var selectedIndex = -1;
  if (quality != "" && group != undefined && group.layerSets.length > 0) {
    for (var i = 0; i < group.layerSets.length; i++) {
      if (group.layerSets[i].toString().toLowerCase() == quality) {
        selectedIndex = i;
      }
    }
  }

  // if no group is selected, then select a random one
  if (selectedIndex == -1 && randomize) {
    selectedIndex = Math.floor(Math.random() * group.layerSets.length);
  }

  if (selectedIndex >= 0) {
    SelectGroup(group, selectedIndex);
  }
  return selectedIndex;
}

function HideAllSubGroups(group) {
  
  // set all subgroups to hidden
  for (var i = 0; i < group.layerSets.length; i++) {
    group.layerSets[i].visible = false;
  }
}


// ====== Layer Selection
function RandomizeSelectLayer(group) {

  // make the chosen group visible
  var selectedIndex =  Math.floor(Math.random() * group.layers.length);
  SelectLayer(group, selectedIndex);
  return selectedIndex;
}

function SelectLayer(group, selectedIndex) {
  
  // ensure the group is visible
  group.visible = true;
  
  // set all subgroups to hidden
  for (var i = 0; i < group.layers.length; i++) {
    group.layers[i].visible = false;
  }

  // make the chosen group visible
  if (selectedIndex > -1) {
    group.layers[selectedIndex].visible = true;
  }
}

function SelectLayerAll(group) {
  
  // ensure the group is visible
  group.visible = true;
  
  // set all subgroups to hidden
  for (var i = 0; i < group.layers.length; i++) {
    group.layers[i].visible = true;
  }
}

function SelectLayerByName(group, name, randomize) {

  var selectedIndex = -1;
  if (name != "") {
    for (var i = 0; i < group.layers.length; i++) {
      if (group.layers[i].name.toLowerCase() == name) {
        selectedIndex = i;
      }
    }
  }

  // if no group is selected, then select a random one
  if (selectedIndex == -1 && randomize) {
    selectedIndex = Math.floor(Math.random() * group.layers.length);
  }

  SelectLayer(group, selectedIndex);
  return selectedIndex;
}

function SelectArtLayer(group, selectedIndex) {
  
  // ensure the group is visible
  group.visible = true;
  
  // set all subgroups to hidden
  for (var i = 0; i < group.layers.length; i++) {
    if (group.layers[i].typename == "ArtLayer") {
      group.layers[i].visible = false;
    }
  }

  // make the chosen group visible
  group.layers[selectedIndex].visible = true;
}


// ====== Brow and Eye Expressions
function SetEyesNeutral(group, selectedExpressionIndex) {

  if (selectedExpressionIndex == undefined) {
    selectedExpressionIndex = GetEyeExpression(group, "neutral");
  }
  if (selectedExpressionIndex < 0) {
    selectedExpressionIndex = 0;
  }
  SelectLayer(group, selectedExpressionIndex);
  return selectedExpressionIndex;
}

function SetEyesConcern(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "concern", defaultIndex);
}

function SetEyesAngry(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "angry", defaultIndex);
}

function SetEyesRaised(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "raised", defaultIndex);
}

function SetEyesSurprised(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "surprised", defaultIndex);
}

function SetEyesPonder(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "ponder", defaultIndex);
}

function SetEyesBored(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "bored", defaultIndex);
}

function SetEyesClosed(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "closed", defaultIndex);
}

function SetEyesElated(mouthGroup, defaultIndex) {
  return SetEyeExpression(mouthGroup, "elated", defaultIndex);
}

function SetEyeExpression(group, expression, defaultIndex) {
  var selectedExpressionIndex = GetEyeExpression(group, expression);
  if (selectedExpressionIndex < 0) {
    SetEyesNeutral(group, defaultIndex);
    return -1;
  }
  else {
    SelectLayer(group, selectedExpressionIndex);
    return selectedExpressionIndex;
  }
}

function GetEyeExpression(group, expression) {
  var selectedExpressionIndex = -1;
  for (var i = 0; i < group.layers.length; i++) {
    if (group.layers[i].name.toLowerCase() == expression) {
      selectedExpressionIndex = i;
      break;
    }
  }

  return selectedExpressionIndex;
}

// ====== Mouth Expressions
function SetMouthNeutral(mouthGroup, selectedExpressionIndex) {
  var selectedExpressionGroup = GetMouthExpression(mouthGroup, "[layerset neutral]");
  if (selectedExpressionGroup < 0) {
    selectedExpressionGroup = 0;
  }

  SelectGroup(mouthGroup, selectedExpressionGroup);
  if (selectedExpressionIndex == undefined) {
    selectedExpressionIndex = Math.floor(Math.random() * mouthGroup.layerSets[selectedExpressionGroup].layers.length);
  }
  SelectLayer(mouthGroup.layerSets[selectedExpressionGroup], selectedExpressionIndex);
  return selectedExpressionIndex;
}

function SetMouthGrin(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset grin]", defaultIndex);
}

function SetMouthFrown(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset frown]", defaultIndex);
}

function SetMouthPurse(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset purse]", defaultIndex);
}

function SetMouthSmile(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset smile]", defaultIndex);
}

function SetMouthOpen(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset open]", defaultIndex);
}

function SetMouthClench(mouthGroup, defaultIndex) {
  return SetMouthExpression(mouthGroup, "[layerset clench]", defaultIndex);
}

function SetMouthExpression(mouthGroup, expression, defaultIndex) {
  var selectedExpressionGroup = GetMouthExpression(mouthGroup, expression);
  if (selectedExpressionGroup >= 0) {

    SelectGroup(mouthGroup, selectedExpressionGroup);
    var selectedExpressionIndex = Math.floor(Math.random() * mouthGroup.layerSets[selectedExpressionGroup].layers.length);
    SelectLayer(mouthGroup.layerSets[selectedExpressionGroup], selectedExpressionIndex);
    return selectedExpressionIndex;
  }
  else {
    SetMouthNeutral(mouthGroup, defaultIndex);
    return -1;
  }
}

function GetMouthExpression(mouthGroup, expression) {
  var selectedExpressionGroup = -1;
  for (var i = 0; i < mouthGroup.layerSets.length; i++) {
    if (mouthGroup.layerSets[i].toString().toLowerCase() == expression) {
      selectedExpressionGroup = i;
      break;
    }
  }

  return selectedExpressionGroup;
}