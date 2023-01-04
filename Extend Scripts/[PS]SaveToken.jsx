function SaveToken() {

  var temp = app.activeDocument.activeLayer;
  app.doAction("Token Frame s2", "Sprite Actions");
  
  // save it out
  Save(temp.name, "Token");

  // finish token actions
  Revert();
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
SaveToken();

