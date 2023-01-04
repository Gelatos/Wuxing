function CreateNpc() {

  var baseArtGroup = app.activeDocument.layerSets[1];

  // get layer groups
  var headGroup, bodyGroup, dataGroup;
  for (var i = 0; i < baseArtGroup.layerSets.length; i++) {
    switch (baseArtGroup.layerSets[i].toString().toLowerCase()) {
      case "[layerset head]": headGroup = baseArtGroup.layerSets[i]; break;
      case "[layerset body]": bodyGroup = baseArtGroup.layerSets[i]; break;
      case "[layerset data]": dataGroup = baseArtGroup.layerSets[i]; break;
    }
  }
  var outfitQualities = {};
  var dataLayers = GetDataLayers(dataGroup, outfitQualities);

  // Set Image Visibility
  if (headGroup != undefined) {
    AssessOutfitGroup(headGroup, dataLayers, outfitQualities);
  }
  if (bodyGroup != undefined) {
    AssessOutfitGroup(bodyGroup, dataLayers, outfitQualities);
  }
}

function AssessOutfitGroup(group, dataLayers, outfitQualities) {

  if (group.layerSets.length > 0) {

    // this outfit group has options
    if (group.layers[0].typename == "ArtLayer") {
      var selectedGroup;
      var outfitQualityName = group.layers[0].name.toLowerCase();
      switch (outfitQualityName) {
        case "all":
          // all options within this group should be turned on and run on
          for (var i = 0; i < group.layerSets.length; i++) {
            selectedGroup = group.layerSets[i];
            selectedGroup.visible = true;
            AssessOutfitGroup(selectedGroup, dataLayers, outfitQualities);
          }
        break;
        case "varia":
          // randomize the number of elements to turn on
          var variaCount = Math.ceil(Math.random() * group.layerSets.length);
          var chosenIndexes = [];
          if (variaCount == group.layerSets.length) {
            for (var i = 0; i < group.layerSets.length; i++) {
              chosenIndexes.push(i);
            }
          }
          else {
            var chosenIndex;
            var limiterCount = 0;
            var limiter = 30;
            while (chosenIndexes.length < variaCount && limiterCount < limiter) {
              limiterCount++;
              chosenIndex = Math.floor(Math.random() * group.layerSets.length);
              if (ArrayIndexOf(chosenIndexes, chosenIndex) < 0) {
                chosenIndexes.push(chosenIndex);
              }
            }
          }
          
          // iterate through the layers, turning off unchosen layers and assessing the chosen ones
          for (var i = 0; i < group.layerSets.length; i++) {
            selectedGroup = group.layerSets[i];
            if (ArrayIndexOf(chosenIndexes, i) >= 0) {
              selectedGroup.visible = true;
              AssessOutfitGroup(selectedGroup, dataLayers, outfitQualities);
            }
            else {
              selectedGroup.visible = false;
            }
          }
        break;
        case "head":
          // we are creating a head
          CreateBaseHead(group, dataLayers, outfitQualities);
        break;
        case "body":
          // we are creating a body
          CreateBaseBody(group, dataLayers, outfitQualities);
        break;
        case "hair":

          // if the layer does not exist, we select none
          if (outfitQualities[outfitQualityName] == undefined) {
            group.visible = false;
          }
          else {
            selectedGroup = group.layerSets[SelectGroupByName(group, outfitQualities["haircolor"], true)];
            var qualityIndex = SelectGroupByName(selectedGroup, outfitQualities[outfitQualityName], true);
            if (selectedGroup.layerSets[qualityIndex].toString().toLowerCase() != outfitQualities[outfitQualityName]) {
              group.visible = false;
            }
            else {
              SelectLayerByName(selectedGroup.layerSets[qualityIndex], outfitQualities["hairstyle"], true);
            }
          }
        break;
        default:
          // this is a special grouping
          if (outfitQualities[outfitQualityName] == undefined) {
            outfitQualities[outfitQualityName] = group.layerSets[SelectGroupByName(group, "", true)].toString().toLowerCase();
          }
          selectedGroup = group.layerSets[SelectGroupByName(group, outfitQualities[outfitQualityName], true)];
          AssessOutfitGroup(selectedGroup, dataLayers, outfitQualities[outfitQualityName]);
        break;
      }
    }
    else {
      // randomize which option we select
      AssessOutfitGroup(group.layerSets[RandomizeSelectedGroup(group)], dataLayers, outfitQualities);
    }
  }
  else if (group.layers.length >= 1) {
    // we can randomly select a layer within this group
    RandomizeSelectLayer(group);
  }
}

function CreateBaseHead(selectHead, dataLayers, outfitQualities) {

  // get the groups for different body parts
  var hairGroup, browGroup, noseGroup, eyeGroup, mouthGroup, baseGroup;
  for (var i = 0; i < selectHead.layerSets.length; i++) {
    switch (selectHead.layerSets[i].toString().toLowerCase()) {
      case "[layerset hair]": 
      hairGroup = selectHead.layerSets[i]; break;
      case "[layerset brow]": 
      case "[layerset brows]": 
      browGroup = selectHead.layerSets[i]; break;
      case "[layerset nose]": 
      case "[layerset noses]": 
      noseGroup = selectHead.layerSets[i]; break;
      case "[layerset eye]": 
      case "[layerset eyes]": 
      eyeGroup = selectHead.layerSets[i]; break;
      case "[layerset mouth]": 
      case "[layerset mouths]": 
      mouthGroup = selectHead.layerSets[i]; break;
      case "[layerset base]": 
      baseGroup = selectHead.layerSets[i]; break;
    }
  }

  // choose a hair color variant
  var hairColorVariant = 0;
  if (hairGroup != undefined) {
    hairColorVariant = Math.floor(Math.random() * hairGroup.layerSets.length);
  }
  dataLayers.setHairColor(hairGroup.layerSets[hairColorVariant].toString().toLowerCase());
  outfitQualities["haircolor"] = hairGroup.layerSets[hairColorVariant].toString().toLowerCase();

  // turn on one element in each category
  var selectedGroup, selectedGroupIndex;
  if (hairGroup != undefined) {
    // turn on the hair color category
    SelectGroup(hairGroup, hairColorVariant);

    // select a hair style within that color category
    selectedGroup = hairGroup.layerSets[hairColorVariant].layerSets[RandomizeSelectedGroup(hairGroup.layerSets[hairColorVariant])];
    outfitQualities["hair"] = selectedGroup.toString().toLowerCase();

    // select a hair variant in that group
    outfitQualities["hairstyle"] = selectedGroup.layers[RandomizeSelectLayer(selectedGroup)].name.toLowerCase();
  }
  if (browGroup != undefined) {
    // turn on the hair color category
    SelectGroup(browGroup, hairColorVariant);

    // select a brow style within that color category
    selectedGroupIndex = RandomizeSelectedGroup(browGroup.layerSets[hairColorVariant]);
    selectedGroup = browGroup.layerSets[hairColorVariant].layerSets[selectedGroupIndex];
    dataLayers.setBrowStyle(selectedGroupIndex);

    // choose the neutral expression within that brow style category
    dataLayers.setBrowNeutral(RandomizeEyeNeutralExpression(selectedGroup));
  }
  if (noseGroup != undefined) {
    // select a nose variant in that group
    RandomizeSelectLayer(noseGroup);
  }
  if (eyeGroup != undefined) {
    // select an eye style
    selectedGroupIndex = RandomizeSelectedGroup(eyeGroup);
    selectedGroup = eyeGroup.layerSets[selectedGroupIndex];
    dataLayers.setEyeStyle(selectedGroupIndex);

    // choose the neutral expression within that eye style category
    dataLayers.setEyeNeutral(RandomizeEyeNeutralExpression(selectedGroup));
  }
  if (mouthGroup != undefined) {

    // select the neutral expression 
    dataLayers.setMouthNeutral(SetMouthNeutral(mouthGroup));
  }
  if (baseGroup != undefined) {
    // select a head variant in that group
    RandomizeSelectLayer(baseGroup);
  }
}

function CreateBaseBody(bodyGroup, dataLayers, outfitQualities) {

  // choose a base body variant
  var selectBody = bodyGroup.layerSets[RandomizeSelectedGroup(bodyGroup)];

  // activate all of the base groups
  var group;
  for (var i = 0; i < selectBody.layerSets.length; i++) {
    selectBody.layerSets[i].visible = true;
  }

  // set the left offset
  if (selectBody.layers[0].typename == "ArtLayer") {
    dataLayers.setLeftOffset(selectBody.layers[0].name);
  }

  // assess outfit groups for all non base layer groups
  for (var i = 0; i < selectBody.layerSets.length; i++) {
    AssessOutfitGroup(selectBody.layerSets[i], dataLayers, outfitQualities);
  }
}

function RandomizeEyeNeutralExpression(group) {

  if (Math.floor(Math.random() * 4) == 0) {
    return SetEyesNeutral(group, Math.floor(Math.random() & group.layers.length));
  }
  else {
    return SetEyesNeutral(group);
  }
}


// ====== Run Script
#include "/Users/vincent/Dropbox/Campaigns/Wuxing/Wuxing-Character Sheet/Extend Scripts/[PS]Support.jsx";
CreateNpc();

