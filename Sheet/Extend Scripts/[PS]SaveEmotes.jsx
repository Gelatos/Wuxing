function SaveEmotes() {

  var outfitLayer = app.activeDocument.activeLayer;
  if (outfitLayer.typename == "LayerSet") {

    // get the parent of the outfitLayer. This is the name of the character
    var characterLayer = outfitLayer.parent;
    var emotesLayer, overlayLayer, overlayEmotes;
    for (var i = 0; i < characterLayer.layerSets.length; i++) {
      switch (characterLayer.layerSets[i].toString().toLowerCase()) {
        case "[layerset emotes]": emotesLayer = characterLayer.layerSets[i]; break;
        case "[layerset overlay]": 
          for (var j = 0; j < characterLayer.layerSets[i].layers.length; j++) {
            if (characterLayer.layerSets[i].layers[j].toString().toLowerCase() == "[layerset poses]") {
              overlayLayer = characterLayer.layerSets[i].layers[j];
              for (var k = 0; k < overlayLayer.layers.length; k++) {
                if (overlayLayer.layers[k].toString().toLowerCase() == "[layerset emotes]") {
                  overlayEmotes = overlayLayer.layers[k];
                }
              }
            }
          }
          break;
      }
    }

    // determine document name for saving
    var charName = characterLayer.toString().substring(10);
    charName = charName.substring(0, charName.length - 1);
    var outfitName = outfitLayer.toString().substring(10);
    outfitName = outfitName.substring(0, outfitName.length - 1);
    var docName = charName + " (" + outfitName + ")";

    // save the document before we make changes
    app.activeDocument.save();

    // only save out emotes if there are emotes to create
    if (emotesLayer != undefined) {

      // iterate through poses
      var poseIndexes = new Array();
      var emotes, outfitLayerName;
      for (var i = 0; i < outfitLayer.layers.length; i++) {
        if (outfitLayer.layers[i].typename == "ArtLayer") {
          outfitLayerName = "[layerset " + outfitLayer.layers[i].name.toLowerCase() + "]";

          // iterate through the emotes layer and find a matching pose folder
          for (var j = 0; j < emotesLayer.layerSets.length; j++) {

            // ensure only this pose is visible
            SelectLayer(outfitLayer, i);

            if (emotesLayer.layerSets[j].toString().toLowerCase() == outfitLayerName) {
              SelectGroup(emotesLayer, j);

              // turn on a matching overlay
              if (overlayLayer != undefined) {

                // hide all the layers
                HideAllSubGroups(overlayLayer);
                  SelectGroupByName(overlayLayer, emotesLayer.layerSets[j].toString().toLowerCase(), false);
              }

              // iterate through the pose's emotes and save them out
              emotes = emotesLayer.layerSets[j];
              SelectLayerAll(emotes);
              app.activeDocument.trim();
              for (var k = 0; k < emotes.layers.length; k++) {
                if (emotes.layers[k].typename == "ArtLayer") {
                  SelectArtLayer(emotes, k);
                  if (overlayEmotes != undefined) {
                    SelectLayerByName(overlayEmotes, emotes.layers[k].name.toLowerCase(), false);
                  }
                  Save(docName, emotes.layers[k].name);
                }
              }
              Revert();
            }
          }
        }
      }

      // revert changes
      Revert();

    }

    // create a copy of the currently visible character. This is for token creation later
    if (app.activeDocument.layerSets.length >= 2) {
      var baseArtGroup = app.activeDocument.layerSets[1];
      if (baseArtGroup != undefined) {
        var newCharacterEntryLayer = CreateDefaultArt(baseArtGroup, docName);
        characterLayer.visible = false;
        CreateToken(newCharacterEntryLayer);
      }
    }

  }
  else {
    alert("You must select the base folder of the outfit you wish to export to save out emotes.");
  }
}

function CreateToken(newCharacterEntryLayer) {

  // hide and show vaid layers
  newCharacterEntryLayer.visible = true;

  // get bounds of the layer
  var bounds = newCharacterEntryLayer.bounds;
  var deltaX, deltaY = 0;

  // translate the layer
  deltaY = 60 - bounds[1].value;
  newCharacterEntryLayer.translate(deltaX, deltaY);

  // perform token actions
  app.doAction("Token Frame s1", "Sprite Actions");
}

function CreateDefaultArt(baseArtGroup, docName) {
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.copy(true);
    app.activeDocument.activeLayer = baseArtGroup;
    app.activeDocument.paste();

    // now that the new character image is made, hide it
    var newCharacterEntryLayer = app.activeDocument.activeLayer;
    newCharacterEntryLayer.name = docName;
    newCharacterEntryLayer.visible = false;
    return newCharacterEntryLayer;
}

function Save(documentName, emote) {
  var outFolder = app.activeDocument; // psd name
  var outPath = outFolder.path;
  var f = new Folder(outPath + "/" + documentName);
  if ( ! f.exists ) {
    f.create();
  }
  var saveFile = new File(outPath + "/" + documentName +"/" + documentName + "-" +  emote + ".png");
  pngSaveOptions = new PNGSaveOptions();
  pngSaveOptions.interlaced = false;
  app.activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

function Revert(){
   var idRvrt = charIDToTypeID( "Rvrt" );
   executeAction( idRvrt, undefined, DialogModes.NO );
}

// ====== Run Script
#include "/Users/vincent/Dropbox/Campaigns/Wuxing/Wuxing-Character Sheet/Extend Scripts/[PS]Support.jsx";
SaveEmotes();

