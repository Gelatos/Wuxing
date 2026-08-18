// Its own popup, independent of BasePopupAttributeHandler/Popup_PopupActive -
// the shared overlay Inspect/Filter popups use (WuxGS-Base.js's
// printBasePopupSheet). The Manual gets its own always-separate overlay
// (WuxGS-Base.js's printManualPopupOverlay), gated only by its own
// Popup_ManualActive flag, so opening/closing it never reads or writes
// Popup_PopupActive/Popup_InspectPopupActive/Popup_PopupName at all - it just
// layers on top of whatever's already open and, once closed, reveals it
// untouched. (An earlier version tried to remember-and-restore the popup
// underneath through the shared attributes; that kept re-triggering
// WuxGS-Backend.js's listenerClosePopup, which is bound to any change of
// Popup_PopupActive, causing the restore write to immediately close the
// popup it had just restored. Not sharing the attribute at all sidesteps
// that class of bug entirely.)
class ManualPopupAttributeHandler {
    constructor(attrHandler) {
        this.attrHandler = attrHandler;
    }

    show(category) {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualActive"), "on");
        if (category != undefined) {
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualCategory"), category);
        }
    }

    hide() {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualActive"), "0");
    }
}

var WuxWorkerManual = WuxWorkerManual || (function () {
    'use strict';

    var
        // Must match ManualPopup's own moreInfoCategoryValue (GoogleSheets/
        // WuxGS-Base.js) verbatim - generator and worker are separate execution
        // contexts with no shared constant, only this comment pair.
        moreInfoCategoryValue = "MoreInfo",

        // First GuideCat entry (same order WuxGS-Base.js's ManualPopup lists them
        // in the header nav) - not hardcoded, since categories now come entirely
        // from the GuideCat definition group and can be added/reordered without
        // touching this file.
        getDefaultCategory = function () {
            let guideCategories = WuxDef.Filter(new DatabaseFilterData("group", "GuideCat"));
            return guideCategories.length > 0 ? guideCategories[0].name : "";
        },

        // Wipes the GuideMoreInfoValues repeating section back to empty and runs
        // callback once that's done (removeAllIds needs the section's current row
        // ids fetched first - getIds is async, Roll20's own getSectionIDs under
        // it). Every "open the Manual" path below runs this first, per the "this
        // page is cleared unless supplied with new information" rule -
        // OpenManualWithDefinitions is the only path that repopulates it
        // afterward.
        clearMoreInfo = function (callback) {
            let repeater = new WorkerRepeatingSectionHandler("GuideMoreInfoValues");
            repeater.getIds(function (repeater) {
                repeater.removeAllIds();
                if (callback != undefined) {
                    callback();
                }
            });
        },

        // The nav-row "?" button (Popup_ManualOpen) is a momentary trigger, not a
        // toggle - reset back to "0" below so it fires again on every click rather
        // than needing an off-click first. That reset re-triggers this same handler
        // (same attribute), so eventinfo.newValue is checked to ignore that second,
        // self-caused change instead of reopening/resetting in a loop.
        //
        // No new information is ever supplied here, so the More Info page always
        // gets cleared (clearMoreInfo) - and if Popup_ManualCategory was left
        // pointing at it (e.g. the popup was last closed while showing a status
        // effect's More Info page), that's treated the same as "no category set
        // yet" and falls back to the default, same as a brand-new character.
        openManual = function (eventinfo) {
            if (eventinfo != undefined && eventinfo.newValue !== "on") {
                return;
            }
            clearMoreInfo(function () {
                let categoryAttr = WuxDef.GetVariable("Popup_ManualCategory");
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addMod(categoryAttr);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let manualPopup = new ManualPopupAttributeHandler(attrHandler);
                    let currentCategory = attrHandler.parseString(categoryAttr);
                    let category = (currentCategory === "" || currentCategory === moreInfoCategoryValue)
                        ? getDefaultCategory() : undefined;
                    manualPopup.show(category);
                    attrHandler.addUpdate(WuxDef.GetVariable("Popup_ManualOpen"), "0");
                });
                attributeHandler.run();
            });
        },

        // Not wired to any button yet (contextual More Info -> Manual links are
        // follow-up work) - lets a future caller jump straight to a category by
        // name without duplicating the open logic above. Also clears the More
        // Info page first, same as openManual - no new information is supplied
        // here either.
        openManualToCategory = function (category) {
            clearMoreInfo(function () {
                let attributeHandler = new WorkerAttributeHandler();
                let manualPopup = new ManualPopupAttributeHandler(attributeHandler);
                manualPopup.show(category);
                attributeHandler.run();
            });
        },

        // Opens the Manual straight to the reserved "More Info" page, showing
        // exactly the given definitions and nothing else - used by the Character
        // Overview status effect buttons (WuxGS-Backend.js's
        // listenerOpenManualForStatus), one definition name per call today, but
        // takes a list since the page itself (GuideMoreInfoValues, a repeating
        // section) supports printing several at once. Status-group definitions go
        // through StatusData.getDescriptions() rather than their raw descriptions,
        // same as ManualPopup.getDescriptions (GoogleSheets/WuxGS-Base.js) does for
        // the normal Status Effects category page, so the rider-effect sentences
        // ("This Status ends when it is triggered.") show up here too.
        openManualWithDefinitions = function (definitionNames) {
            let repeater = new WorkerRepeatingSectionHandler("GuideMoreInfoValues");
            repeater.getIds(function (repeater) {
                let attributeHandler = new WorkerAttributeHandler();
                let titleVar = WuxDef.GetVariable("Popup_GuideInfoTitle");
                let subGroupVar = WuxDef.GetVariable("Popup_GuideInfoSubGroup");
                let descVar = WuxDef.GetVariable("Popup_GuideInfoDesc");
                definitionNames.forEach(function (name) {
                    let definition = WuxDef.Get(name);
                    if (definition == undefined) {
                        return;
                    }
                    let descriptions = definition.group === "Status"
                        ? new StatusData(definition).getDescriptions()
                        : definition.descriptions;
                    let rowId = repeater.getNextId();
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, titleVar), definition.title);
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, subGroupVar), definition.subGroup);
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, descVar), descriptions.filter(d => d !== "").join("\n\n"));
                });
                repeater.removeAllIdsAfterIteratorIndex();

                let manualPopup = new ManualPopupAttributeHandler(attributeHandler);
                manualPopup.show(moreInfoCategoryValue);
                attributeHandler.run();
            });
        },

        // Same page/mechanism as openManualWithDefinitions, but for content that
        // isn't a flat WuxDef definition lookup - technique tooltips (Range,
        // Traits, Core Effects, Check Effects, Will Break, Enhancement) are
        // already computed per rank/character by TechniqueDisplayData and
        // written into their own repeater/static attributes elsewhere, so the
        // caller hands over the already-built {title, subGroup, description}
        // entries directly instead of a definitionName for this function to
        // resolve itself.
        openManualWithContent = function (entries) {
            let repeater = new WorkerRepeatingSectionHandler("GuideMoreInfoValues");
            repeater.getIds(function (repeater) {
                let attributeHandler = new WorkerAttributeHandler();
                let titleVar = WuxDef.GetVariable("Popup_GuideInfoTitle");
                let subGroupVar = WuxDef.GetVariable("Popup_GuideInfoSubGroup");
                let descVar = WuxDef.GetVariable("Popup_GuideInfoDesc");
                entries.forEach(function (entry) {
                    if (entry == undefined) {
                        return;
                    }
                    let rowId = repeater.getNextId();
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, titleVar), entry.title);
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, subGroupVar), entry.subGroup);
                    attributeHandler.addUpdate(repeater.getFieldName(rowId, descVar), entry.description);
                });
                repeater.removeAllIdsAfterIteratorIndex();

                let manualPopup = new ManualPopupAttributeHandler(attributeHandler);
                manualPopup.show(moreInfoCategoryValue);
                attributeHandler.run();
            });
        },

        // Bound directly to Popup_ManualActive's own change (WuxGS-Backend.js's
        // listenerCloseManual), fired by both the Exit button and the backdrop-click
        // (WuxGS-Base.js's printManualPopupOverlay) - unlike InspectPopup/FilterPopup,
        // there's no shared Popup_PopupActive dispatch involved. That listener only
        // fires this on the "0" transition, but eventinfo is checked here too since
        // hide() itself also writes "0" - harmless once already "0", just avoids ever
        // relying on the caller to have gated correctly.
        close = function (eventinfo) {
            if (eventinfo != undefined && eventinfo.newValue !== "0") {
                return;
            }
            let attributeHandler = new WorkerAttributeHandler();
            new ManualPopupAttributeHandler(attributeHandler).hide();
            attributeHandler.run();
        }

    return {
        OpenManual: openManual,
        OpenManualToCategory: openManualToCategory,
        OpenManualWithDefinitions: openManualWithDefinitions,
        OpenManualWithContent: openManualWithContent,
        Close: close
    };
}());
