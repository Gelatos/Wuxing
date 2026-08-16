class ManualPopupAttributeHandler extends BasePopupAttributeHandler {
    show(category) {
        super.show("Popup_ManualName");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualActive"), "on");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "0");
        if (category != undefined) {
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualCategory"), category);
        }
    }

    hide() {
        super.hide();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualActive"), "0");
    }
}

var WuxWorkerManual = WuxWorkerManual || (function () {
    'use strict';

    var
        defaultCategory = "Basics",

        // The nav-row "?" button (Popup_ManualOpen) is a momentary trigger, not a
        // toggle - reset back to "0" below so it fires again on every click rather
        // than needing an off-click first. That reset re-triggers this same handler
        // (same attribute), so eventinfo.newValue is checked to ignore that second,
        // self-caused change instead of reopening/resetting in a loop.
        openManual = function (eventinfo) {
            if (eventinfo != undefined && eventinfo.newValue !== "on") {
                return;
            }
            let categoryAttr = WuxDef.GetVariable("Popup_ManualCategory");
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addMod([categoryAttr]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let manualPopup = new ManualPopupAttributeHandler(attrHandler);
                let category = attrHandler.parseString(categoryAttr) === "" ? defaultCategory : undefined;
                manualPopup.show(category);
                attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualOpen"), "0");
            });
            attributeHandler.run();
        },

        // Not wired to any button yet (contextual More Info -> Manual links are
        // follow-up work) - lets a future caller jump straight to a category by
        // name without duplicating the open logic above.
        openManualToCategory = function (category) {
            let attributeHandler = new WorkerAttributeHandler();
            let manualPopup = new ManualPopupAttributeHandler(attributeHandler);
            manualPopup.show(category);
            attributeHandler.run();
        },

        // Reached via WuxWorkerGeneral.ClosePopup's Popup_PopupName dispatch (fires on
        // every change:popup-popupactive, including Exit/backdrop-click) - same wiring
        // as InspectPopup/FilterPopup's own Close().
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            new ManualPopupAttributeHandler(attributeHandler).hide();
            attributeHandler.run();
        }

    return {
        OpenManual: openManual,
        OpenManualToCategory: openManualToCategory,
        Close: close
    };
}());
