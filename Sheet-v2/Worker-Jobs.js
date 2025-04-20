

var WuxWorkerJobs = WuxWorkerJobs || (function () {
    
    const populateJobInspectionTechniques = function (attrHandler, itemPopupRepeater, job) {
        
        attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), `${job} Techniques`);
        
        let selectedElement = null;
        let jobTechniques = WuxTechs.Filter(new DatabaseFilterData("techSet", job));
        jobTechniques.forEach(function (jobTechnique) {
            let newRowId = itemPopupRepeater.generateRowId();
            attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectName")), jobTechnique.name);
            attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectType")), "Tech");

            if (selectedElement == null) {
                selectedElement = {
                    item: jobTechnique,
                    id: newRowId
                }
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
            } else {
                attrHandler.addUpdate(itemPopupRepeater.getFieldName(newRowId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), 0);
            }
        });

        return selectedElement;
    };
    'use strict';

    const updateBuildPoints = function (eventinfo) {
            Debug.Log("Update Jobs");
            let attributeHandler = new WorkerAttributeHandler();
            let worker = new WuxWorkerBuildManager("Job");
            worker.onChangeWorkerAttribute(attributeHandler, eventinfo.sourceAttribute, eventinfo.newValue);
            attributeHandler.run();
        },

        seeTechniques = function (eventinfo) {
            Debug.Log("See Techniques");
            WuxWorkerInspectPopup.OpenTechniqueInspection(function () {
                },
                function (attrHandler, itemPopupRepeater) {
                    let job = eventinfo.newValue;
                    
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_SubMenuActive"), "0");
                    attrHandler.addUpdate(eventinfo.sourceAttribute, "0");
                    attrHandler.addUpdate(WuxDef.GetVariable(WuxDef.GetName(job, WuxDef.Get("Job")), WuxDef._expand), "0");

                    return populateJobInspectionTechniques(attrHandler, itemPopupRepeater, job);
                }
            );
        };

    return {
        UpdateBuildPoints: updateBuildPoints,
        SeeTechniques: seeTechniques
    };
}());

