function GenerateEmotes() {

  // get layer groups
  var baseArtGroup = app.activeDocument.layerSets[1];
  var headGroup, bodyGroup, dataGroup, completeGroup;
  for (var i = 0; i < baseArtGroup.layerSets.length; i++) {
    switch (baseArtGroup.layerSets[i].toString().toLowerCase()) {
      case "[layerset head]": headGroup = baseArtGroup.layerSets[i]; break;
      case "[layerset body]": bodyGroup = baseArtGroup.layerSets[i]; break;
      case "[layerset data]": dataGroup = baseArtGroup.layerSets[i]; break;
      case "[layerset complete]": completeGroup = baseArtGroup.layerSets[i]; break;
    }
  }
  var outfitQualities = {};
  var dataLayers = GetDataLayers(dataGroup, outfitQualities);
  
  // get the document name for saving
  var documentName = dataLayers.getFilename();
  if (documentName == "") {
    documentName = app.activeDocument.name.substring(6);
    documentName = documentName.substring(0, documentName.indexOf("."));
  }
  var imageIndex = dataLayers.getCharIndex();

  // first create a copy of the currently visible character
  var newCharacterEntryLayer;
  if (completeGroup != undefined) {
    newCharacterEntryLayer = CreateDefaultArt(completeGroup, GetFileName(documentName, imageIndex));
  }

  // Create the emotes
  app.activeDocument.trim();
  CreateEmotes(FindHeadGroup(headGroup), dataLayers, documentName, imageIndex);
  Revert();

  // make sure only the new image is visible so that it can be made into a token
  if (newCharacterEntryLayer != undefined) {
    CreateToken(newCharacterEntryLayer, headGroup, bodyGroup, documentName, imageIndex, dataLayers);
    Revert();
  }
  IncrementImageIndex(imageIndex, dataLayers);

}

function CreateDefaultArt(completeGroup, imageName) {
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.copy(true);
    app.activeDocument.activeLayer = completeGroup;
    app.activeDocument.paste();

    // now that the new character image is made, hide it
    var newCharacterEntryLayer = app.activeDocument.activeLayer;
    newCharacterEntryLayer.name = imageName;
    newCharacterEntryLayer.visible = false;
    app.activeDocument.save();
    return newCharacterEntryLayer;
}

function FindHeadGroup(group) {

  if (group.layerSets.length > 0 && group.layers[0].typename == "ArtLayer" && group.layers[0].name.toLowerCase() == "head") {
    // we found the head 
    return group;
  }
  else {
    return FindHeadGroup(group.layerSets[GetSelectedGroup(group)]);
  }

}

function CreateEmotes(headGroup, dataLayers, documentName, imageIndex) {

  // get the groups for different body parts
  var browGroup, eyeGroup, mouthGroup;
  for (var i = 0; i < headGroup.layerSets.length; i++) {
    switch (headGroup.layerSets[i].toString().toLowerCase()) {
      case "[layerset brow]": 
      case "[layerset brows]": 
      browGroup = headGroup.layerSets[i]; break;
      case "[layerset eye]": 
      case "[layerset eyes]": 
      eyeGroup = headGroup.layerSets[i]; break;
      case "[layerset mouth]": 
      case "[layerset mouths]": 
      mouthGroup = headGroup.layerSets[i]; break;
    }
  }

  // setup data
  var emotesAdded = new Array();
  var browColorIndex = SelectGroupByName(browGroup, dataLayers.getHairColor(), false);
  var groupData = {
    brow: browGroup.layerSets[browColorIndex].layerSets[dataLayers.getBrowStyle()],
    browIndex: dataLayers.getBrowNeutral(),
    eye: eyeGroup.layerSets[dataLayers.getEyeStyle()],
    eyeIndex: dataLayers.getEyeNeutral(),
    mouth: mouthGroup,
    mouthIndex: dataLayers.getMouthNeutral()
  };

  // The default is already serious so we just save it
  Save(documentName, imageIndex, "Serious");

  // create the grin image
  SetMouthGrin(mouthGroup);
  Save(documentName, imageIndex, "Grin");

  // one discerning 
  emotesAdded = SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, "Concern",
    ["Concern", "Think", "Ponder", "Worry"]);

  // one iritable 
  emotesAdded = SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, "Irate",
    ["Irate", "Bored", "Angry", "Annoyed"]);

  // one surprised 
  emotesAdded = SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, "Surprised",
    ["Surprised", "Startled"]);

  // two random from the full set
  emotesAdded = SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, "",
    ["Happy", "Elated", "Sneer", "Think", "Concern", "Ponder", "Worry", "Irate", "Bored", "Angry", "Annoyed", "Surprised", "Startled"]);
  emotesAdded = SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, "",
    ["Happy", "Elated", "Sneer", "Think", "Concern", "Ponder", "Worry", "Irate", "Bored", "Angry", "Annoyed", "Surprised", "Startled"]);
}

function CreateToken(newCharacterEntryLayer, headGroup, bodyGroup, documentName, imageIndex, dataLayers) {

  // hide and show vaid layers
  newCharacterEntryLayer.visible = true;
  headGroup.visible = false;
  bodyGroup.visible = false;

  // get bounds of the layer
  var bounds = newCharacterEntryLayer.bounds;
  var deltaX, deltaY = 0;

  // horizontal centering
  // var width = bounds[2].value - bounds[0].value;
  // var docCenterW = app.activeDocument.width.as("px") / 2;
  // deltaX = Math.round(docCenterW - (bounds[0].value + width / 2));

  // translate the layer
  deltaX = 60 - bounds[0].value + dataLayers.getLeftOffset();
  deltaY = 60 - bounds[1].value;
  newCharacterEntryLayer.translate(deltaX, deltaY);

  // perform token actions
  app.doAction("Token Frame s1", "Sprite Actions");
  app.doAction("Token Frame s2", "Sprite Actions");
  
  // save it out
  Save(documentName, imageIndex, "Token");

  // finish token actions
  app.doAction("Token Frame s3", "Sprite Actions");
}

// ====== Emotes

function SelectRandomEmote(emotesAdded, groupData, documentName, imageIndex, defaultEmote, emoteList) {

  // setup variables
  var emoteAddedThisSet = "";
  var maxEmoteIndex = emoteList.length;
  var currentEmoteIndex = 0;
  var startEmoteIndex = Math.floor(Math.random() * maxEmoteIndex);
  var emote = "";

  for (var i = 0; i < maxEmoteIndex; i++) {
    currentEmoteIndex = (startEmoteIndex + i) % maxEmoteIndex;
    emote = emoteList[currentEmoteIndex];
    
    if (ArrayIndexOf(emotesAdded, emote) < 0) {
      emotesAdded.push(emote);
      
      if (CheckEmoteAvailability(groupData, emote)) {
        emoteAddedThisSet = emote;
        break;
      }
    }
  }
  if (emoteAddedThisSet == "" && defaultEmote != "") {
    CheckEmoteAvailability(groupData, defaultEmote);
    emoteAddedThisSet = defaultEmote;
  }

  if (emoteAddedThisSet != "") {
    Save(documentName, imageIndex, emoteAddedThisSet);
  }

  return emotesAdded;
}

function CheckEmoteAvailability(groupData, emote) {

  switch(emote) {
    case "Think":
      SetEyesNeutral(groupData.brow, groupData.browIndex);
      SetMouthNeutral(groupData.mouth, groupData.mouthIndex);
      return SetEyesClosed(groupData.eye, groupData.eyeIndex) >= 0;
    break;
    case "Concern":
      SetEyesNeutral(groupData.brow, groupData.browIndex);
      SetMouthFrown(groupData.mouth, groupData.mouthIndex) >= 0;
      return SetEyesConcern(groupData.eye, groupData.eyeIndex);
    break;
    case "Worry":
      SetEyesNeutral(groupData.eye, groupData.eyeIndex);
      SetMouthFrown(groupData.mouth, groupData.mouthIndex) >= 0;
      return SetEyesConcern(groupData.brow, groupData.browIndex); 
    break;
    case "Ponder":
      SetEyesNeutral(groupData.brow, groupData.browIndex);
      return (SetEyesPonder(groupData.eye) >= 0) 
        && (SetMouthPurse(groupData.mouth, groupData.mouthIndex) >= 0);
    break;
    case "Elated":
      SetEyesNeutral(groupData.brow, groupData.browIndex);
      return (SetEyesElated(groupData.eye, groupData.eyeIndex) >= 0) 
        && (SetMouthSmile(groupData.mouth, groupData.mouthIndex) >= 0);
    break;
    case "Happy":
      SetEyesNeutral(groupData.brow, groupData.browIndex);
      SetEyesNeutral(groupData.eye, groupData.eyeIndex);
      return SetMouthSmile(groupData.mouth, groupData.mouthIndex) >= 0;
    break;
    case "Sneer":
      SetEyesAngry(groupData.eye, groupData.eyeIndex);
      return (SetEyesAngry(groupData.brow, groupData.browIndex) >= 0) 
        && (SetMouthSmile(groupData.mouth, groupData.mouthIndex) >= 0);
    break;
    case "Irate":
      SetEyesAngry(groupData.eye, groupData.eyeIndex);
      SetMouthFrown(groupData.mouth, groupData.mouthIndex);
      return SetEyesAngry(groupData.brow, groupData.browIndex) >= 0;
    break;
    case "Annoyed":
      SetEyesAngry(groupData.brow, groupData.browIndex);
      SetEyesBored(groupData.eye, groupData.eyeIndex);
      return SetMouthFrown(groupData.mouth, groupData.mouthIndex) >= 0;
    break;
    case "Bored":
      SetEyesBored(groupData.brow, groupData.browIndex);
      SetMouthFrown(groupData.mouth, groupData.mouthIndex);
      return SetEyesBored(groupData.eye, groupData.eyeIndex) >= 0;
    break;
    case "Angry":
      SetEyesAngry(groupData.eye, groupData.eyeIndex);
      return (SetEyesAngry(groupData.brow, groupData.browIndex) >= 0)
        && (SetMouthClench(groupData.mouth, groupData.mouthIndex) >= 0);
    break;
    case "Surprised":
      SetEyesSurprised(groupData.eye, groupData.eyeIndex);
      SetMouthOpen(groupData.mouth, groupData.mouthIndex);
      return (SetEyesRaised(groupData.brow, groupData.browIndex) >= 0);
    break;
    case "Startled":
      SetEyesNeutral(groupData.eye, groupData.eyeIndex);
      SetEyesRaised(groupData.brow, groupData.browIndex);
      return SetMouthOpen(groupData.mouth, groupData.mouthIndex) >= 0;
    break;
  }

  return false;
}

// ====== Image Saving
function GetImageIndex(dataGroup) {
  var imageIndex = 0;
  if (dataGroup != undefined) { 
    for (var i = 0; i < dataGroup.layerSets.length; i++) {
      if (dataGroup.layerSets[i].toString().toLowerCase() == "[layerset charindex]") {
        imageIndex = dataGroup.layerSets[i].layers[0].name;
      }
    }
  }
  return imageIndex;
}

function IncrementImageIndex(imageIndex, dataLayers) {
  imageIndex++;
  dataLayers.setCharIndex(imageIndex);
}

function Save(documentName, imageIndex, emote) {
  var outFolder = app.activeDocument; // psd name
  var outPath = outFolder.path;
  var f = new Folder(outPath + "/" + documentName);
  if ( ! f.exists ) {
    f.create();
  }
  var saveFile = new File(outPath + "/" + documentName +"/" + GetFileName(documentName, imageIndex) + "-" +  emote + ".png");
  pngSaveOptions = new PNGSaveOptions();
  pngSaveOptions.interlaced = false;
  app.activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

function GetFileName(documentName, imageIndex) {
  return documentName + "(" + imageIndex + ")";
}

function Revert(){
   var idRvrt = charIDToTypeID( "Rvrt" );
   executeAction( idRvrt, undefined, DialogModes.NO );
}

// ====== Run Script
#include "/Users/vincent/Projects/Wuxing/Sheet/Extend Scripts/[PS]Support.jsx";
GenerateEmotes();

