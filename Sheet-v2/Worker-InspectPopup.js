// noinspection ES6ConvertVarToLetConst

// Cap on rows retained in a catalog popup's repeater (ItemPopupValues/
// TechPopupValues) once its popup closes - see InspectionPopup.close below.
const INSPECTION_POPUP_MAX_RETAINED_ROWS = 20;

class InspectionInventoryItem {
    constructor(displayString, databaseName, isTitle, affinity, tier, iconAffinities) {
        this.display = displayString;
        this.name = databaseName;
        this.isTitle = isTitle;
        this.affinity = affinity || "";
        this.tier = tier || 0;
        this.iconAffinities = iconAffinities || [];
    }
}
class InspectionInventoryItemHandler {
    constructor() {
        this.items = [];
    }
    addItem(inspectionInventoryItem) {
        this.items.push(inspectionInventoryItem);
    }
}
class FilteredTechniquesInventoryItemHandler extends InspectionInventoryItemHandler {
    constructor(filters, titleCallback, displayCallback) {
        super();

        let filteredTechniques = this.getFilteredTechniques(filters);
        if (filteredTechniques.length() == 0) {
            return;
        }

        let inventoryItemHandler = this;
        let maxTier = 9;
        for (let tier = 1; tier <= maxTier; tier++) {

            let tierData = filteredTechniques.get(tier);
            tierData.iterate(function (techsByAffinity, affinity) {
                if (techsByAffinity.length == 0) {
                    return;
                }

                // add the title
                if (titleCallback != undefined) {
                    let techHeader = titleCallback(tier, affinity);
                    if (techHeader != undefined) {
                        inventoryItemHandler.addItem(techHeader);
                    }
                }

                // add the techniques
                techsByAffinity.forEach(function (technique) {
                    let display = technique.name;
                    let iconAffinities = [];
                    if (displayCallback != undefined) {
                        let result = displayCallback(technique);
                        if (result !== null && typeof result === "object") {
                            display = result.display;
                            iconAffinities = result.iconAffinities || [];
                        } else {
                            display = result;
                        }
                    }
                    let inventoryItem = new InspectionInventoryItem(display, technique.name, false, undefined, undefined, iconAffinities);
                    inventoryItemHandler.addItem(inventoryItem);
                });
            });
        }
    }
    
    getFilteredTechniques(filters) {
        let filteredTechniques = WuxTechs.Filter(filters);
        return WuxTechs.SortFilteredTechniquesByRequirement(filteredTechniques);
    }
}

const getFilteredBaseStyles = function (filters) {
    let allStyleNames = [...WuxTechs.GetSortedGroup("style", "Style"), "Style"];
    let filteredTechniques = WuxTechs.Filter([...filters, new DatabaseFilterData("style", allStyleNames)]);
    let newFilteredTechniquesList = [];
    let addedFilteredTechniqueNames = [];

    for (let technique of filteredTechniques) {
        if (technique == undefined || addedFilteredTechniqueNames.includes(technique.name)) {
            continue;
        }

        if (technique.techSet == "Style") {
            addedFilteredTechniqueNames.push(technique.name);
            newFilteredTechniquesList.push(technique);
            continue;
        }

        if (addedFilteredTechniqueNames.includes(technique.techSet)) {
            continue;
        }

        let baseTechnique = WuxTechs.Get(technique.techSet);
        if (baseTechnique != undefined && baseTechnique.techSet == "Style") {
            addedFilteredTechniqueNames.push(baseTechnique.name);
            newFilteredTechniquesList.push(baseTechnique);
        }
    }

    return newFilteredTechniquesList;
};

// Same computation performStyleFilterInspection and swapCatalogTechniqueVariant
// both need for affinity-based filtering - Affinity/AdvancedAffinity/Ancestry
// must already be fetched on attrHandler (addMod) before calling this.
const getUserAffinities = function (attrHandler) {
    let advancedAffinities = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")).split(";").map(s => s.trim()).filter(s => s !== "");
    return [
        attrHandler.parseString(WuxDef.GetVariable("Affinity")),
        ...advancedAffinities,
        attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
    ];
};

const getTechHeader = function (affinity) {
    if (affinity === "") return "0";
    let parts = affinity.split(";").map(s => s.trim()).filter(s => s !== "");
    if (parts.length === 0) return "0";
    let list;
    if (parts.length === 1) {
        list = parts[0];
    } else if (parts.length === 2) {
        list = `${parts[0]} or ${parts[1]}`;
    } else {
        list = `${parts.slice(0, -1).join(", ")}, or ${parts[parts.length - 1]}`;
    }
    return `Requires ${list} affinity`;
};

class FilteredItemsInventoryItemHandler extends InspectionInventoryItemHandler {
    constructor(filters) {
        super();
        let filteredItems = WuxItems.Filter(filters);
        for (let item of filteredItems) {
            if (item == undefined) continue;
            this.addItem(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
    }
}

class ItemListInventoryItemHandler extends InspectionInventoryItemHandler {
    constructor(items) {
        super();
        // Caches the already-constructed item objects the caller passed in (see
        // itemCache, performItemFilterInspection) so ItemInspectPopupAttributeHandler.
        // setInventoryItemData doesn't call WuxItems.Get()/WuxGoods.Get() a second
        // time for the same name - WuxItems.Get never caches (WJS-TechDef.js), so
        // every call reconstructs a full item, including its own embedded
        // TechniqueData, from scratch.
        this.itemCache = new Map();
        for (let item of items) {
            if (item == undefined) continue;
            this.itemCache.set(item.name, item);
            this.addItem(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
    }
}

class InspectPopupAttributeHandler extends BasePopupAttributeHandler {
    // repeaterId defaults to the shared "ItemPopupValues" (every popup type except
    // the technique catalog) - TechniqueInspectPopupAttributeHandler overrides this
    // to "TechPopupValues", its own dedicated repeater carrying only technique
    // fields, so its rows never need defensive item-field clearing.
    constructor(attrHandler, repeaterId) {
        super(attrHandler);
        this.repeater = attrHandler.getRepeatingSection(repeaterId ?? "ItemPopupValues");
        this.titleDefinitionName = "";
        this.itemDataAttributeHandler = new ItemDataAttributeHandler(this.attrHandler, "Popup");
        this.techniqueAttributeHandler = new TechniqueDataAttributeHandler(this.attrHandler, "Popup");
    }

    // Split out of show() so TechniqueInspectionPopup can populate everything
    // (including the potentially-slow catalog rows) WITHOUT yet flipping
    // Popup_InspectPopupActive - see show() below and
    // openTechniqueInspectionWithLoadingScreen for why.
    showWithoutReveal(inventoryTitle, inventoryItems, addType) {
        super.show(this.titleDefinitionName);
        this.resetInspectionVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_FilterPopupActive"), "0");

        this.setPopupType(this.titleDefinitionName);
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectGroup"), inventoryTitle);
        // Computed from the raw addType param (available synchronously here) rather
        // than read back from Popup_InspectShowAdd - a plain WuxDef.GetAttribute
        // reference to that global field wouldn't resolve correctly from inside a
        // repeating section's HTML anyway (Roll20 silently rescopes any field name
        // referenced inside a <fieldset class="repeating_x"> to a per-row attribute,
        // even ones meant to be global), so subclasses needing per-row "can this be
        // added" gating (see TechniqueInspectPopupAttributeHandler) read this instead.
        this.canSelectForAdd = Array.isArray(addType) && addType.length > 0;
        this.initializePopup();
        this.iterateAndSetItems(inventoryItems);
        this.setAddType(addType);
    }
    show(inventoryTitle, inventoryItems, addType) {
        this.showWithoutReveal(inventoryTitle, inventoryItems, addType);
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "on");
    }
    hide() {
        super.hide();
        this.resetInspectionVariables();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "0");
    }
    resetInspectionVariables() {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType", WuxDef._max), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType", "2"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType", "2"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd", "2"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
    };
    setPopupType(popupType) {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType"), popupType);

        // Boolean piggybacks on this same field (max slot = technique/style catalog,
        // suffix "2" = item catalog) so the markup (printAddButton/InspectionPopup.print,
        // WuxGS-Base.js) can gate the Style Points widget and the tech/item catalog
        // switch with the plain, already-proven WuxSheetMain.HiddenField toggle
        // (every other element in this popup's header already uses it) instead of a
        // multi-value CSS attribute-selector match against the raw title string.
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType", WuxDef._max),
            popupType === "Popup_TechniqueInspectionName" ? "on" : "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectType", "2"),
            popupType === "Popup_ItemInspectionName" ? "on" : "0");
    }
    setAddType(addTypes) {
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), "");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd", "2"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType", "2"), "");

        if (!Array.isArray(addTypes) || addTypes.length === 0) return;
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd"), "on");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), addTypes[0]);

        if (addTypes.length > 1) {
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectShowAdd", "2"), "on");
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType", "2"), addTypes[1]);
        }
    }

    initializePopup(attrHandler) {}

    hideTechnique(index) {
        this.techniqueAttributeHandler.setBaseSuffix(index);
        this.techniqueAttributeHandler.setVisibilityAttribute(false);
        this.attrHandler.addRepeatingSectionRowUpdate(
            this.techniqueAttributeHandler.repeater?.definitionId,
            this.techniqueAttributeHandler.getVariable("TechHeader"),
            "0"
        );
    }

    // Splits a flat InspectionInventoryItem list (headers + real rows) at the
    // point where maxCount non-header rows have been included - headers don't
    // count toward the cap and always pass through free, EXCEPT if the cutoff
    // would land right after a header with none of its own rows included (i.e.
    // stopping on a fresh group's first row), in which case the cutoff rolls
    // back to before that header so an empty group title never renders. Relies
    // on the caller's ordering guarantee that a header is always immediately
    // followed by its own group's rows (performStyleFilterInspection for
    // techniques, performItemFilterInspection for items). Shared by both
    // TechniqueInspectPopupAttributeHandler and ItemInspectPopupAttributeHandler
    // for their own initial-population cap (16) and each Load More click (10).
    splitAtTechniqueCap(itemData, maxCount) {
        let itemCount = 0;
        let splitIndex = itemData.length;
        let lastHeaderIndex = -1;
        for (let i = 0; i < itemData.length; i++) {
            if (itemData[i].isTitle) {
                lastHeaderIndex = i;
                continue;
            }
            if (itemCount >= maxCount) {
                splitIndex = (lastHeaderIndex == i - 1) ? lastHeaderIndex : i;
                break;
            }
            itemCount++;
        }
        return { visibleItems: itemData.slice(0, splitIndex), remainingItems: itemData.slice(splitIndex) };
    }

    iterateAndSetItems(itemData) {
        if (itemData.length === 0) {
            this.repeater.ids.forEach(id => this.setInventoryItemVisibility(id, false));
            this.onNoItems();
            return;
        }
        let setSelectedItem = false;
        let iterator = 0;
        while (iterator < this.repeater.ids.length) {
            let id = this.repeater.ids[iterator];
            if (iterator < itemData.length) {
                let item = itemData[iterator];
                this.setInventoryItemData(id, item);
                if (!setSelectedItem && !item.isTitle) {
                    this.setSelectedItem(id, item.name);
                    setSelectedItem = true;
                }
            }
            else {
                this.setInventoryItemVisibility(id, false);
            }
            iterator++;
        }
        while (iterator < itemData.length) {
            let id = this.repeater.generateRowId();
            let item = itemData[iterator];
            this.setInventoryItemData(id, item);
            if (!setSelectedItem && !item.isTitle) {
                this.setSelectedItem(id, item.name);
                setSelectedItem = true;
            }
            iterator++;
        }
    }
    onNoItems() {
        let id = this.repeater.ids.length > 0 ? this.repeater.ids[0] : this.repeater.generateRowId();
        this.setInventoryItemData(id, new InspectionInventoryItem("No items available", "", true));
    }
    setInventoryItemVisibility(id, isVisible) {
        let itemSelectVisibleAttr = WuxDef.GetVariable("Popup_ItemSelectVisible");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectVisibleAttr), isVisible ? "on" : "0");

    }
    setInventoryItemData(id, itemData) {
        let itemSelectTypeAttr = WuxDef.GetVariable("Popup_ItemSelectType");
        let itemSelectDisplayAttr = WuxDef.GetVariable("Popup_ItemSelectDisplay");
        let itemSelectNameAttr = WuxDef.GetVariable("Popup_ItemSelectName");
        let itemSelectOnAttr = WuxDef.GetVariable("Popup_ItemSelectIsOn");

        this.setInventoryItemVisibility(id, true);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectTypeAttr), itemData.isTitle ? "0" : "on");
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectDisplayAttr), itemData.display);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectNameAttr), itemData.name);
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, itemSelectOnAttr), "0");
        if (!itemData.isTitle) {
            this.setInventoryItemAffinityIcons(id, itemData.iconAffinities);
        }
    }
    setInventoryItemAffinityIcons(id, iconAffinities) {
        const branchToElement = {
            "Corrosion": "Wood",
            "Light":     "Fire",
            "Shadow":    "Earth",
            "Blood":     "Metal",
            "Time":      "Water"
        };
        const normalizedAffinities = iconAffinities.map(a => branchToElement[a] ?? a);
        const affinityFields = {
            "Neutral": WuxDef.GetVariable("Popup_ItemSelectDisplayNeutral"),
            "Wood":    WuxDef.GetVariable("Popup_ItemSelectDisplayWood"),
            "Fire":    WuxDef.GetVariable("Popup_ItemSelectDisplayFire"),
            "Earth":   WuxDef.GetVariable("Popup_ItemSelectDisplayEarth"),
            "Metal":   WuxDef.GetVariable("Popup_ItemSelectDisplayMetal"),
            "Water":   WuxDef.GetVariable("Popup_ItemSelectDisplayWater")
        };
        for (let affinity in affinityFields) {
            let value = normalizedAffinities.includes(affinity) ? "0" : "on";
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, affinityFields[affinity]), value);
        }
    }

    setSelectedItem(selectedItemId, itemName) {
        this.clearLastSelectedItem(selectedItemId);
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectId"), selectedItemId);
        this.attrHandler.addUpdate(this.repeater.getFieldName(selectedItemId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "on");
        this.setSelectedItemData(itemName);
    }
    clearLastSelectedItem() {
        let currentId = this.attrHandler.parseString(WuxDef.GetVariable("Popup_InspectSelectId"));
        if (currentId != "") {
            this.attrHandler.addUpdate(this.repeater.getFieldName(currentId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
        }
    }
    setSelectedItemData(selectedItemName) {}
}
class TechniqueInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    // Uses its own dedicated "TechPopupValues" repeater (not the shared
    // "ItemPopupValues" every other popup type uses) - a technique-only catalog
    // row never needs item fields at all, so there's nothing to defensively clear
    // between populations (see setInventoryItemData/setInventoryItemVisibility
    // below, which used to also clear an item attribute handler on every row).
    constructor(attributeHandler) {
        super(attributeHandler, "TechPopupValues");
        this.titleDefinitionName = "Popup_TechniqueInspectionName";

        // Catalog rows carry full technique data directly (baseDefinitionName
        // "Action", matching the catalog card display in WuxGS-Base.js) - separate
        // from the inherited "Popup"-based techniqueAttributeHandler above, which
        // backs the old single-preview-slot fields (no longer rendered - see
        // setSelectedItemData below).
        this.catalogTechniqueAttributeHandler = new TechniqueDataAttributeHandler(this.attrHandler, "Action");
        this.catalogTechniqueAttributeHandler.setRepeaterData(this.repeater);
    }

    // Popup_LoadMore's own _max slot doubles as both the queued-but-not-yet-shown
    // items (serialized JSON, InspectionInventoryItem's plain {display, name,
    // isTitle, affinity, tier, iconAffinities} shape) and the button's visibility
    // flag, via the existing .wuxHiddenField-flag:not([value="0"]) CSS rule - "0"
    // means both "no queue" and "hidden", anything else means both "queue
    // present" and "visible", so one write covers both. The suffix "2" slot
    // holds the button's whole label text (the entire button is one bound span -
    // see printCatalogLoadMoreButton, WuxGS-Base.js - rather than a span nested
    // inside a title template, which rendered with a stray gap around the
    // number), built from Popup_LoadMore's own title template so the wording
    // stays spreadsheet-driven instead of duplicated here.
    writeRemainingQueue(remainingItems) {
        let remainingTechniqueCount = remainingItems.filter(item => !item.isTitle).length;
        let queueField = WuxDef.GetVariable("Popup_LoadMore", WuxDef._max);
        if (remainingTechniqueCount === 0) {
            this.attrHandler.addUpdate(queueField, "0");
            return;
        }
        this.attrHandler.addUpdate(queueField, JSON.stringify(remainingItems));
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_LoadMore", "2"),
            WuxDef.Get("Popup_LoadMore").getTitle(Math.min(remainingTechniqueCount, 10)));
    }

    // Caps the initial population at 16 techniques (headers don't count),
    // queueing whatever's left for the Load More button (loadMoreCatalogTechniques
    // below) to pick up 10 at a time.
    iterateAndSetItems(itemData) {
        let { visibleItems, remainingItems } = this.splitAtTechniqueCap(itemData, 16);
        this.writeRemainingQueue(remainingItems);
        super.iterateAndSetItems(visibleItems);
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();

        // Unless the player has "Show Element-Restricted Techniques" on, variant
        // buttons should only offer variants the player can actually use - see
        // setInventoryItemData below, which passes this into setTechniqueVariants'
        // own userAffinities filter (undefined here means "don't filter", matching
        // that method's existing convention). Affinity/AdvancedAffinity/Ancestry/
        // Forme_ShowFromNonElement are fetched by TechniqueInspectionPopup.open.
        let showElementRestricted = this.attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
        this.catalogUserAffinities = showElementRestricted ? undefined : getUserAffinities(this.attrHandler);

        // Nothing is selected by default (see setSelectedItem below) - the style
        // adding system starts from a clean slate every time the popup opens,
        // rather than the old single-preview flow's "auto-select the first item."
        // setAddType (base class, called after this from show()) already resets
        // Popup_InspectAddType to the singular "Add Style" from the addType param.
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectedList"), "0");

        // Snapshot of the build-stats draft as it stands right now, before any
        // selections in this popup session - toggleSelectedItem builds its live
        // points preview on top of THIS instead of attrBuildFinal, since final is
        // only ever updated by the Advancement tab's commit flow and can be
        // stale relative to draft-only changes made elsewhere (e.g. deleting a
        // style, Worker-Styles.js's deleteListStyle, only ever touches draft).
        // Rebuilding the preview from a stale final would silently undo any such
        // pending change the moment this popup's selection buttons are used.
        let worker = new WuxStyleWorkerBuild();
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectDraftSnapshot"),
            this.attrHandler.parseString(worker.attrBuildDraft));
    }

    setInventoryItemData(id, itemData) {
        this.setInventoryItemVisibility(id, true);
        this.catalogTechniqueAttributeHandler.setId(id);

        // Reset every row's selected state on population (base class's original
        // setInventoryItemData did this too) - a row reused from a previous
        // population could otherwise carry over a stale "on" from whatever was
        // selected last time, and the catalog card's selected-state styling
        // (WCSS-Specialized.css) reads this field directly.
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");

        let selectNameField = this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectName"));
        if (itemData.isTitle) {
            this.catalogTechniqueAttributeHandler.setHeaderInfo(itemData.display, itemData.display);
            this.attrHandler.addUpdate(selectNameField, "");
            return;
        }

        let technique = WuxTechs.Get(itemData.name);
        if (technique == undefined) {
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.catalogTechniqueAttributeHandler.setVisibilityAttribute(false);
            this.attrHandler.addUpdate(selectNameField, "");
            return;
        }
        // excludeCurrent drops the technique already on display from its own variant
        // row, and userAffinities (see initializePopup above) drops variants the
        // player can't use unless "Show Element-Restricted Techniques" is on -
        // both are applied inside setTechniqueVariants (WJS-Service.js) before any
        // of the 6 slots get written, so WCSS-Specialized.css's
        // .wuxTechVariantButtons :has() rule (which hides the whole row once every
        // slot is empty) evaluates against the fully-filtered result, not a
        // pre-filter one - a technique whose only siblings are all filtered out
        // correctly shows as having no variants.
        // precomputedCandidates (see TechniqueInspectionPopup.open/variantsByName) lets
        // setTechniqueVariants (WJS-Service.js) skip re-fetching the exact same
        // WuxTechs.Filter(style=technique.name) call performStyleFilterInspection's
        // displayCallback already made moments ago for this same technique -
        // undefined here (e.g. Load More batches, which don't carry a variantsByName)
        // just falls back to its normal fetch-it-yourself behavior.
        this.catalogTechniqueAttributeHandler.setTechniqueCatalogInfo(technique,
            {excludeCurrent: true, userAffinities: this.catalogUserAffinities, precomputedCandidates: this.variantsByName?.get(technique.name)},
            this.canSelectForAdd);
        // Selecting this row still goes through the existing shared select/add
        // mechanism (InspectionPopup.selectItem/addItem, below), which looks
        // the item up by this field regardless of popup type.
        this.attrHandler.addUpdate(selectNameField, itemData.name);
    }

    // Hides/shows the actual catalog card, not just the old select-list flag
    // above (setInventoryItemVisibility, InspectPopupAttributeHandler) - the
    // catalog gates each row on TechActionType's max slot instead (see
    // TechniqueDataAttributeHandler.setVisibilityAttribute, WJS-Service.js, and
    // repeatingCatalogTechSection, WuxGS-Base.js).
    setInventoryItemVisibility(id, isVisible) {
        super.setInventoryItemVisibility(id, isVisible);
        this.catalogTechniqueAttributeHandler.setId(id);
        this.catalogTechniqueAttributeHandler.setVisibilityAttribute(isVisible);
        if (!isVisible) {
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectName")), "");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
        }
    }

    // Catalog cards already show every technique's full stats up front - there's
    // nothing left to populate on select. Selecting just marks which row Add
    // will use (handled by the inherited setSelectedItem, InspectPopupAttributeHandler).
    setSelectedItemData(selectedItemName) {}

    // The base class's setSelectedItem is a single-select toggle (exclusively
    // selects one row, clearing whatever was selected before) - the style adding
    // system supports selecting multiple techniques at once instead, via
    // toggleSelectedItem below (called from TechniqueInspectionPopup.selectItem,
    // which overrides the base class's own selectItem for the same reason). This
    // override also means iterateAndSetItems' "auto-select the first item"
    // behavior becomes a no-op, since it calls this same method - nothing is
    // selected by default when the popup opens.
    setSelectedItem(selectedItemId, itemName) {}

    // currentListRaw is the semicolon-delimited Popup_InspectSelectedList value
    // as it stood before this click, and learnedStyleNames the character's
    // already-learned style names (both fetched by
    // TechniqueInspectionPopup.selectItem, since reading them here would
    // require them to already be fetched onto attrHandler - simpler for the
    // caller, which already fetches per-click data, to pass them in).
    toggleSelectedItem(selectedItemId, itemName, currentListRaw, learnedStyleNames) {
        let selectedNames = currentListRaw.split(";").map(s => s.trim()).filter(s => s !== "" && s !== "0");
        let alreadySelected = selectedNames.includes(itemName);
        if (alreadySelected) {
            selectedNames = selectedNames.filter(name => name !== itemName);
        } else {
            selectedNames.push(itemName);
        }

        this.attrHandler.addUpdate(this.repeater.getFieldName(selectedItemId, WuxDef.GetVariable("Popup_ItemSelectIsOn")), alreadySelected ? "0" : "on");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectedList"), selectedNames.length > 0 ? selectedNames.join(";") : "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectAddType"), selectedNames.length > 1 ? "Add Styles" : "Add Style");

        // Live style-points preview: recompute the draft from the snapshot taken
        // when this popup opened (Popup_InspectDraftSnapshot, initializePopup
        // above) plus every currently-selected, not-yet-learned style, so the
        // popup's Style Points row (and the sidebar's own points widget, which
        // reads the same attribute) reflects what confirming Add right now would
        // actually cost. Built from the snapshot rather than attrBuildFinal,
        // which is only updated by the Advancement tab's commit flow and can be
        // stale relative to other draft-only changes (deleting a style, for
        // instance) - rebuilding from a stale final would silently undo those.
        // Recomputed fresh from the snapshot each time (never incrementally
        // patching the existing draft) so repeated toggles can't double-count -
        // this IS actually spending the points as a draft, not a separate
        // read-only preview (TechniqueInspectionPopup's close() reverts it back
        // to the snapshot if the popup exits without confirming).
        let worker = new WuxStyleWorkerBuild();
        worker.setBuildStats(WuxDef.GetVariable("Popup_InspectDraftSnapshot"), this.attrHandler);
        selectedNames.forEach(name => {
            if (learnedStyleNames.has(name)) {
                return;
            }
            let baseTechnique = WuxTechs.Get(name);
            if (baseTechnique == undefined) {
                return;
            }
            worker.updateBuildStats(this.attrHandler, baseTechnique.name, {value: 1, group: "Style"});
            WuxTechs.Filter(new DatabaseFilterData("style", name)).forEach(technique => {
                worker.updateBuildStats(this.attrHandler, technique.name, {value: 1, group: technique.techSet});
            });
        });
        worker.updatePoints(this.attrHandler);
    }
}
class ItemInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_ItemInspectionName";

        // Catalog rows carry full item data directly (baseDefinitionName "Action",
        // matching the technique catalog's own catalogTechniqueAttributeHandler) -
        // separate from the inherited "Popup"-based itemDataAttributeHandler above,
        // which still backs the old single-preview-slot fields (setSelectedItemData
        // below) until selection/adding is redone for the new full-card catalog.
        this.catalogItemAttributeHandler = new ItemDataAttributeHandler(this.attrHandler, "Action");
        this.catalogItemAttributeHandler.setRepeaterData(this.repeater);

        // Backs the item's associated technique, shown eagerly (no Show/Hide
        // Effects button, unlike the Gear tab's owned-item repeaters) - see
        // setInventoryItemData below.
        this.catalogTechniqueAttributeHandler = new TechniqueDataAttributeHandler(this.attrHandler, "Action");
        this.catalogTechniqueAttributeHandler.setRepeaterData(this.repeater);
    }

    // Same pagination as the technique catalog (TechniqueInspectPopupAttributeHandler
    // below) - suffix "1" throughout (queue/visibility on Popup_LoadMore's "1_max"
    // slot, count text on "12") since Popup_LoadMore is shared between both
    // catalogs' buttons (printCatalogLoadMoreButton, WuxGS-Base.js: suffix
    // undefined for the technique catalog's button, "1" for the item catalog's).
    writeRemainingQueue(remainingItems) {
        let remainingItemCount = remainingItems.filter(item => !item.isTitle).length;
        let queueField = WuxDef.GetVariable("Popup_LoadMore", "1" + WuxDef._max);
        if (remainingItemCount === 0) {
            this.attrHandler.addUpdate(queueField, "0");
            return;
        }
        this.attrHandler.addUpdate(queueField, JSON.stringify(remainingItems));
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_LoadMore", "12"),
            WuxDef.Get("Popup_LoadMore").getTitle(Math.min(remainingItemCount, 10)));
    }

    // Caps the initial population at 16 items (headers don't count), queueing
    // whatever's left for the Load More button (loadMoreCatalogItems below) to
    // pick up 10 at a time.
    iterateAndSetItems(itemData) {
        let { visibleItems, remainingItems } = this.splitAtTechniqueCap(itemData, 16);
        this.writeRemainingQueue(remainingItems);
        super.iterateAndSetItems(visibleItems);
    }

    // Full item card per row, mirroring TechniqueInspectPopupAttributeHandler's
    // setInventoryItemData - selectNameField is still written (Popup_ItemSelectName)
    // even though selection isn't wired up to this new display yet, since it's
    // the same field the old select/add flow already depends on. A group header
    // (performItemFilterInspection, this file, groups items by category) is a
    // divider row, not a real item - marked via Popup_ItemSelectType == "0" and
    // Popup_ItemSelectDisplay carrying the divider's label text, matching the
    // base class's own convention (this is exactly what the inherited
    // setInventoryItemData already did) so printCatalogItemFullDisplay
    // (WuxGS-Base.js) and its pre-existing .wuxItemPopupRepeater CSS
    // (WCSS-Base.css) can toggle between the plain divider and the full card.
    setInventoryItemData(id, itemData) {
        this.setInventoryItemVisibility(id, true);
        this.catalogItemAttributeHandler.setId(id);
        this.catalogTechniqueAttributeHandler.setId(id);

        this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
        // Quantity always resets to 0 on (re)population - a reused row could
        // otherwise carry over a stale count from whatever item it held last
        // (updateItemSelectedQuantity, this file, is the only other writer).
        this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectCount")), "0");

        let itemSelectTypeField = this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectType"));
        let itemSelectDisplayField = this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectDisplay"));
        let selectNameField = this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectName"));
        // Section visibility only (does this item have a technique at all) -
        // piggybacked onto ItemName's (otherwise-unused) max slot. Unlike the
        // Gear tab's owned-item repeaters, the technique itself is populated
        // right here, eagerly, for every row - no Show/Hide Effects button.
        let hasTechniqueField = this.catalogItemAttributeHandler.getVariable("ItemName", WuxDef._max);
        if (itemData.isTitle) {
            this.catalogItemAttributeHandler.clearItemInfo();
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.attrHandler.addUpdate(itemSelectTypeField, "0");
            this.attrHandler.addUpdate(itemSelectDisplayField, itemData.display);
            this.attrHandler.addUpdate(selectNameField, "");
            this.attrHandler.addUpdate(hasTechniqueField, "0");
            return;
        }

        // itemCache (see openItemInspectionWithLoadingScreen) lets the initial
        // population reuse the item object the caller already built while
        // filtering/grouping, instead of paying for a second full reconstruction
        // (including its own embedded TechniqueData) of the same item -
        // undefined for Load More batches (loadMoreCatalogItems, a separate
        // worker invocation with no shared cache), which just falls back to
        // fetching it fresh as before.
        let item = this.itemCache?.get(itemData.name) ?? WuxItems.Get(itemData.name);
        if (item == undefined) {
            this.catalogItemAttributeHandler.clearItemInfo();
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.attrHandler.addUpdate(itemSelectTypeField, "on");
            this.attrHandler.addUpdate(itemSelectDisplayField, "0");
            this.attrHandler.addUpdate(selectNameField, "");
            this.attrHandler.addUpdate(hasTechniqueField, "0");
            return;
        }
        // setItemInfoWithoutTechnique (not setItemInfo) - the technique block
        // below (catalogTechniqueAttributeHandler.setTechniqueInfo) is populated
        // explicitly with excludeCurrent/userAffinities, so letting setItemInfo
        // also do its own internal, unfiltered technique write here would just
        // be discarded work (see setItemInfoWithoutTechnique, WJS-Service.js).
        this.catalogItemAttributeHandler.setItemInfoWithoutTechnique(item);
        this.attrHandler.addUpdate(itemSelectTypeField, "on");
        // Cost display (Popup_ItemSelectDisplay's base slot, otherwise unused for
        // a real row - see updateItemSelectedQuantity) starts at 0, matching the
        // quantity it's reset to above.
        this.attrHandler.addUpdate(itemSelectDisplayField, "0");
        this.attrHandler.addUpdate(selectNameField, itemData.name);

        let technique = (item.itemType == "UsableItem" && item.hasTechnique) ? item.technique
            : (item.getCommonTechniques ? item.getCommonTechniques()[0] : undefined);
        if (technique == undefined) {
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.attrHandler.addUpdate(hasTechniqueField, "0");
            return;
        }
        this.catalogTechniqueAttributeHandler.setTechniqueInfo(technique, false,
            {excludeCurrent: true, userAffinities: this.catalogUserAffinities});
        this.attrHandler.addUpdate(hasTechniqueField, "on");
    }

    // The old single-select mechanism (Popup_ItemSelectIsOn as an exclusive
    // toggle) is superseded by the quantity field's own selected-state write
    // (updateItemSelectedQuantity, this file) - overridden to no-ops so the
    // stale listenerUpdateRepeatingItemInspectPopupItems/selectItem cascade
    // (which still fires whenever Popup_ItemSelectIsOn changes, since that
    // listener has no popup-type gating) can't clobber the grand-total-based
    // Title_InspectionItemCost/Popup_InspectPurchaseAffordable those write, the
    // same reasoning TechniqueInspectPopupAttributeHandler applies to its own
    // multi-select override.
    setSelectedItem(selectedItemId, itemName) {}
    setSelectedItemData(selectedItemName) {}

    // Hides/shows the actual catalog card via ItemIsVisible (a real, dedicated
    // attribute - unlike the technique catalog, which piggybacks onto
    // TechActionType's max slot since every technique field is itself piggybacked
    // onto some other slot already).
    setInventoryItemVisibility(id, isVisible) {
        super.setInventoryItemVisibility(id, isVisible);
        this.catalogItemAttributeHandler.setId(id);
        this.attrHandler.addUpdate(this.catalogItemAttributeHandler.getVariable("ItemIsVisible"), isVisible ? "on" : "0");
        if (!isVisible) {
            this.catalogItemAttributeHandler.clearItemInfo();
            this.catalogTechniqueAttributeHandler.setId(id);
            this.catalogTechniqueAttributeHandler.clearTechniqueInfo();
            this.attrHandler.addUpdate(this.catalogItemAttributeHandler.getVariable("ItemName", WuxDef._max), "0");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectType")), "0");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectName")), "");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectIsOn")), "0");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectCount")), "0");
            this.attrHandler.addUpdate(this.repeater.getFieldName(id, WuxDef.GetVariable("Popup_ItemSelectDisplay")), "0");
        }
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
        // "0 J" (not blank) - matches the format recomputeItemSelection/every
        // other write to this field uses once a real cost exists (`${cost} J`),
        // so the header shows a cost from the moment the popup opens instead of
        // sitting empty until the first quantity change.
        this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), "0 J");
        // Every row's quantity resets to 0 on fresh population (setInventoryItemData
        // below) - reset this too (the Add button's own enabled-state flag,
        // updateItemSelectedQuantity) so a stale "on" from a previous session
        // doesn't leave the Add button enabled before anything's been touched.
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectedList"), "0");

        // Unless "Show Element-Restricted Techniques" is on, each row's eager
        // technique display (setInventoryItemData below) should only offer
        // variants the player can actually use - same convention
        // TechniqueInspectPopupAttributeHandler.initializePopup uses for the
        // technique catalog's own variant filtering.
        let showElementRestricted = this.attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
        this.catalogUserAffinities = showElementRestricted ? undefined : getUserAffinities(this.attrHandler);
    }

    setSelectedItemData(selectedItemName) {
        let item = WuxItems.Get(selectedItemName);
        if (item == undefined) {
            this.itemDataAttributeHandler.clearItemInfo();
            for (let i = 0; i <= 3; i++) {
                this.hideTechnique(i);
            }
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
            this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), "");
            return;
        }

        let cost = parseInt(item.value);
        let jin = this.attrHandler.parseInt(WuxDef.GetVariable("Jin"));
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"),
            (!isNaN(cost) && jin >= cost) ? "on" : "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), !isNaN(cost) ? `${cost} J` : "");

        // Show item stats (name/group/traits).
        this.itemDataAttributeHandler.setItemInfo(item);

        // Build the ordered list of techniques to show: the item's embedded
        // technique first (when present), followed by each common Gear technique
        // and its variants (using the technique name as the style filter).
        // The whole technique panel is gated on slot 0's visibility, so the first
        // available technique must occupy slot 0 or nothing renders.
        let techniques = [];
        if (item.itemType == "UsableItem" && item.hasTechnique) {
            techniques.push(item.technique);
        }
        let commonTechniques = item.getCommonTechniques ? item.getCommonTechniques() : [];
        for (let technique of commonTechniques) {
            techniques.push(technique);
            let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
            for (let variant of variants) {
                techniques.push(variant);
            }
        }

        for (let slot = 0; slot <= 3; slot++) {
            if (slot < techniques.length) {
                let t = techniques[slot];
                this.techniqueAttributeHandler.setBaseSuffix(slot);
                this.techniqueAttributeHandler.setTechniqueInfo(t);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
                this.attrHandler.addRepeatingSectionRowUpdate(
                    this.techniqueAttributeHandler.repeater?.definitionId,
                    this.techniqueAttributeHandler.getVariable("TechHeader"),
                    getTechHeader(t.affinity)
                );
            } else {
                this.hideTechnique(slot);
            }
        }
    }

    onNoItems() {
        super.onNoItems();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), "");
    }
}

class InspectionPopup {
    constructor(attributeHandler) {
        this.attributeHandler = attributeHandler;
        this.inspectPopupAttrHandler = undefined;
        this.inspectPopupInventoryId = "ItemPopupValues";
    }
    open(inventoryTitle, inventoryItems, addType) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        this.attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId")]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.show(inventoryTitle, inventoryItems, addType);
        });
    }
    // Rows in this popup's catalog repeater (ItemPopupValues/TechPopupValues)
    // are only ever reused/hidden as the popup gets repopulated (setInventoryItemVisibility),
    // never deleted - across a character's lifetime of browsing different
    // filters/categories, the repeater's row count only ever grows to whatever
    // the single largest population ever needed, and stays there forever. That
    // permanently inflates both the worker's per-population write volume and
    // the sheet's on-open row count for every popup type sharing this repeater
    // (a fresh character loads fast; a heavily-browsed one doesn't). Trimming
    // down to the first INSPECTION_POPUP_MAX_RETAINED_ROWS rows on close - not
    // on every population, which would break Load More's reuse-existing-rows
    // pagination scheme - keeps that growth bounded without touching the
    // pagination logic at all.
    close() {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.hide();

            let repeater = attrHandler.getRepeatingSection(inspectPopup.inspectPopupInventoryId);
            if (repeater.ids.length > INSPECTION_POPUP_MAX_RETAINED_ROWS) {
                repeater.iteratorIndex = INSPECTION_POPUP_MAX_RETAINED_ROWS;
                repeater.removeAllIdsAfterIteratorIndex();
            }
        });
    }
    selectItem(selectedId) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        let repeater = this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId);
        let inventoryItemNameVar = repeater.getFieldName(selectedId, WuxDef.GetVariable("Popup_ItemSelectName"))
        this.attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId"), inventoryItemNameVar]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.setSelectedItem(selectedId, attrHandler.parseString(inventoryItemNameVar));
        });
    }

    setup(attrHandler) {
        this.inspectPopupAttrHandler = new InspectPopupAttributeHandler(attrHandler);
    }
    
    addItem() {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);

        let itemNameVar = WuxDef.GetVariable("Popup_ItemSelectName");
        let selectedIdVar = WuxDef.GetVariable("Popup_InspectSelectId");
        this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId).addFieldNames([itemNameVar]);
        this.attributeHandler.addMod(selectedIdVar);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);

            let repeater = inspectPopup.attributeHandler.getRepeatingSection(inspectPopup.inspectPopupInventoryId);
            let selectedItemId = attrHandler.parseString(selectedIdVar);
            let itemName = attrHandler.parseString(repeater.getFieldName(selectedItemId, itemNameVar));
            inspectPopup.performAddItem(attrHandler, itemName);
        });
    }

    performAddItem(attrHandler, itemName) {}

    addItem2() {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);

        let itemNameVar = WuxDef.GetVariable("Popup_ItemSelectName");
        let selectedIdVar = WuxDef.GetVariable("Popup_InspectSelectId");
        this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId).addFieldNames([itemNameVar]);
        this.attributeHandler.addMod(selectedIdVar);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);

            let repeater = inspectPopup.attributeHandler.getRepeatingSection(inspectPopup.inspectPopupInventoryId);
            let selectedItemId = attrHandler.parseString(selectedIdVar);
            let itemName = attrHandler.parseString(repeater.getFieldName(selectedItemId, itemNameVar));
            inspectPopup.performAddItem2(attrHandler, itemName);
        });
    }

    performAddItem2(attrHandler, itemName) {}
}
class PerkTechniqueInspectPopupAttributeHandler extends InspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_PerkInspectionName";
    }

    initializePopup() {
        super.initializePopup();
        this.itemDataAttributeHandler.clearItemInfo();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }

    setSelectedItemData(selectedItemName) {
        let technique = WuxTechs.Get(selectedItemName);
        if (technique == undefined) {
            this.hideTechnique(0);
            return;
        }
        this.techniqueAttributeHandler.setBaseSuffix(0);
        this.techniqueAttributeHandler.setTechniqueInfo(technique);
        this.techniqueAttributeHandler.setVisibilityAttribute(true);
        this.attrHandler.addRepeatingSectionRowUpdate(
            this.techniqueAttributeHandler.repeater?.definitionId,
            this.techniqueAttributeHandler.getVariable("TechHeader"),
            getTechHeader(technique.affinity)
        );

        let techniqueVariants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
        for (let i = 0; i < 3; i++) {
            let index = parseInt(i) + 1;
            if (techniqueVariants.length > i) {
                this.techniqueAttributeHandler.setBaseSuffix(index);
                this.techniqueAttributeHandler.setTechniqueInfo(techniqueVariants[i]);
                this.techniqueAttributeHandler.setVisibilityAttribute(true);
                this.attrHandler.addRepeatingSectionRowUpdate(
                    this.techniqueAttributeHandler.repeater?.definitionId,
                    this.techniqueAttributeHandler.getVariable("TechHeader"),
                    getTechHeader(techniqueVariants[i].affinity)
                );
            } else {
                this.hideTechnique(index);
            }
        }
    }

    onNoItems() {
        super.onNoItems();
        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }
}

class PerkTechniqueInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new PerkTechniqueInspectPopupAttributeHandler(attrHandler);
    }

    addItem() {
        let worker = new WuxPerkWorkerBuild();
        this.attributeHandler.addMod([worker.attrMax, worker.attrBuildDraft]);
        this.attributeHandler.addRepeatingSection("RepeatingPerks");
        super.addItem();
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
    }

    performAddItem(attrHandler, itemName) {
        Debug.Log(`Adding Perk Technique ${itemName}`);
        let technique = WuxTechs.Get(itemName);
        if (technique == undefined) return;
        let repeater = attrHandler.getRepeatingSection("RepeatingPerks");
        attrHandler.addUpdate(
            repeater.getFieldName(repeater.generateRowId(), WuxDef.GetVariable("Forme_Name")),
            technique.name);

        let perk = WuxPerks.Get(itemName);
        if (perk == undefined) return;
        let perkAttr = perk.createDefinition(WuxDef.Get("Perk")).getVariable();
        let worker = new WuxPerkWorkerBuild();
        worker.setBuildStatsDraft(attrHandler);
        worker.updateBuildStats(attrHandler, perkAttr, perk.cost);
        worker.updatePoints(attrHandler);
        attrHandler.addUpdate(WuxDef.GetVariable("Action_PerkIsVisible"), "on");
    }
}

class TechniqueInspectionPopup extends InspectionPopup {
    // Its own dedicated repeater ("TechPopupValues", never "ItemPopupValues") -
    // selectItem/addItem/open below all key off this.inspectPopupInventoryId
    // already, so overriding it here is enough to redirect them without touching
    // their bodies.
    constructor(attributeHandler) {
        super(attributeHandler);
        this.inspectPopupInventoryId = "TechPopupValues";
    }

    setup(attrHandler) {
        this.inspectPopupAttrHandler = new TechniqueInspectPopupAttributeHandler(attrHandler);
    }

    // Variant filtering (TechniqueInspectPopupAttributeHandler.initializePopup)
    // needs the same affinity/toggle fields performStyleFilterInspection already
    // gathers for the top-level style list - fetched again here since this
    // popup's own attributeHandler/callback cycle is a separate round-trip from
    // that one's. worker.attrBuildDraft is fetched so initializePopup can
    // snapshot the current draft (Popup_InspectDraftSnapshot) - see
    // toggleSelectedItem, TechniqueInspectPopupAttributeHandler, for why this
    // needs to be the actual current draft rather than attrBuildFinal.
    // Doesn't call super.open() - that registers a callback calling .show(), which
    // flips Popup_InspectPopupActive on immediately alongside the (potentially
    // slow, up-to-16-card) catalog population. Calling .showWithoutReveal()
    // instead defers that flag to openTechniqueInspectionWithLoadingScreen's own
    // later, separate cycle, so the popup can't ever appear before its rows do.
    // variantsByName (optional): Map<techniqueName, TechniqueData[]> the caller
    // already fetched while building inventoryItems - stashed onto the attribute
    // handler so setInventoryItemData (below) can pass it through to
    // setTechniqueVariants and skip an otherwise-identical re-fetch.
    open(inventoryTitle, inventoryItems, addType, variantsByName) {
        let inspectPopup = this;
        let worker = new WuxStyleWorkerBuild();
        this.attributeHandler.addMod([
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("Forme_ShowFromNonElement"),
            worker.attrBuildDraft
        ]);
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        this.attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId")]);
        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            inspectPopup.inspectPopupAttrHandler.variantsByName = variantsByName;
            inspectPopup.inspectPopupAttrHandler.showWithoutReveal(inventoryTitle, inventoryItems, addType);
        });
    }

    // Overrides the base class's single-select selectItem - this popup supports
    // selecting multiple techniques at once (toggleSelectedItem,
    // TechniqueInspectPopupAttributeHandler), so the current selected-list value
    // needs fetching here too (not just the clicked row's own name), plus enough
    // style-points build-stats data for toggleSelectedItem to update the live
    // points preview.
    selectItem(selectedId) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        let repeater = this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId);
        let inventoryItemNameVar = repeater.getFieldName(selectedId, WuxDef.GetVariable("Popup_ItemSelectName"));
        let selectedListVar = WuxDef.GetVariable("Popup_InspectSelectedList");

        let worker = new WuxStyleWorkerBuild();
        let styleRepeaterId = "RepeatingStyles";
        this.attributeHandler.addRepeatingSection(styleRepeaterId);
        let formeNameVar = WuxDef.GetVariable("Forme_Name");
        this.attributeHandler.getRepeatingSection(styleRepeaterId).addFieldNames([formeNameVar]);

        this.attributeHandler.addMod([inventoryItemNameVar, selectedListVar, worker.attrMax, WuxDef.GetVariable("Popup_InspectDraftSnapshot")]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            let styleRepeater = attrHandler.getRepeatingSection(styleRepeaterId);
            let learnedStyleNames = new Set(styleRepeater.ids.map(id =>
                attrHandler.parseString(styleRepeater.getFieldName(id, formeNameVar))));
            inspectPopup.inspectPopupAttrHandler.toggleSelectedItem(selectedId,
                attrHandler.parseString(inventoryItemNameVar), attrHandler.parseString(selectedListVar), learnedStyleNames);
        });
    }

    // Overrides the base class's single-item addItem - processes every technique
    // in Popup_InspectSelectedList instead of just Popup_InspectSelectId, and
    // skips any style the character already has learned (RepeatingStyles' own
    // Forme_Name list) rather than adding a duplicate entry.
    addItem() {
        let inspectPopup = this;
        let worker = new WuxStyleWorkerBuild();
        let styleRepeaterId = "RepeatingStyles";
        this.attributeHandler.addRepeatingSection(styleRepeaterId);
        let formeNameVar = WuxDef.GetVariable("Forme_Name");
        this.attributeHandler.getRepeatingSection(styleRepeaterId).addFieldNames([formeNameVar]);
        this.attributeHandler.addMod([
            worker.attrMax, worker.attrBuildDraft, WuxDef.GetVariable("Popup_InspectSelectedList"),
            // Needed so performAddItem can populate the new full-card display
            // (WuxWorkerStyles.PopulateStyleTechniqueDisplay) with correctly
            // filtered variant buttons, same as the catalog/live tab.
            WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("Forme_ShowFromNonElement")
        ]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);

            let selectedListRaw = attrHandler.parseString(WuxDef.GetVariable("Popup_InspectSelectedList"));
            let selectedNames = selectedListRaw.split(";").map(s => s.trim()).filter(s => s !== "" && s !== "0");

            let styleRepeater = attrHandler.getRepeatingSection(styleRepeaterId);
            let learnedStyleNames = new Set(styleRepeater.ids.map(id =>
                attrHandler.parseString(styleRepeater.getFieldName(id, formeNameVar))));

            selectedNames.forEach(itemName => {
                if (learnedStyleNames.has(itemName)) {
                    Debug.Log(`Skipping ${itemName} - already learned`);
                    return;
                }
                inspectPopup.performAddItem(attrHandler, itemName);
                learnedStyleNames.add(itemName);
            });
        });
        WuxWorkerSkills.UpdateKeySkills(this.attributeHandler);
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
    }

    performAddItem(attrHandler, itemName) {
        Debug.Log(`Adding Style ${itemName}`);

        let baseTechnique = WuxTechs.Get(itemName);
        if (baseTechnique == undefined) {
            return;
        }

        let worker = new WuxStyleWorkerBuild();
        let styleRepeaterId = "RepeatingStyles";

        // only the base technique gets add to the styles list
        let repeater = attrHandler.getRepeatingSection(styleRepeaterId);
        let newRowId = repeater.generateRowId();
        attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Forme_Name")), baseTechnique.name);

        // Populates the row's full technique card (header/effects/variants) -
        // same "Action"-prefixed fields and helper the one-time backfill
        // (WuxWorkerStyles.RefreshStyleListDisplay) uses for pre-existing rows.
        let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
        let advancedAffinities = attrHandler.parseString(WuxDef.GetVariable("AdvancedAffinity")).split(";").map(s => s.trim()).filter(s => s !== "");
        let userAffinities = showElementRestricted ? undefined : [
            attrHandler.parseString(WuxDef.GetVariable("Affinity")),
            ...advancedAffinities,
            attrHandler.parseString(WuxDef.GetVariable("Ancestry"))
        ];
        WuxWorkerStyles.PopulateStyleTechniqueDisplay(attrHandler, repeater, newRowId, baseTechnique.name, userAffinities);

        // add all the techniques to the style worker as this is how we track styles tracked and their level
        worker.setBuildStatsDraft(attrHandler);
        worker.updateBuildStats(attrHandler, baseTechnique.name, {value: 1, group: "Style"});

        let variantTechniques = WuxTechs.Filter(new DatabaseFilterData("style", itemName));
        variantTechniques.forEach(function (technique) {
            worker.updateBuildStats(attrHandler, technique.name, {value: 1, group: technique.techSet});
        });
        worker.updatePoints(attrHandler);
        attrHandler.addUpdate(WuxDef.GetVariable("Action_StyleIsVisible"), "on");
    }
}
class ItemInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new ItemInspectPopupAttributeHandler(attrHandler);
    }

    // Affinity/AdvancedAffinity/Ancestry/Forme_ShowFromNonElement are fetched
    // here so ItemInspectPopupAttributeHandler.initializePopup can compute
    // catalogUserAffinities for the eager technique display each row's
    // setInventoryItemData writes (unlike the technique catalog, the item
    // catalog shows its technique immediately, no Show/Hide Effects button).
    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod([
            WuxDef.GetVariable("Jin"),
            WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("Forme_ShowFromNonElement")
        ]);
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Equipment", WuxDef._build));
        this.attributeHandler.addMod(WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_AutoEquipItems"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_EquipmentSlot", WuxDef._gear));
        this.attributeHandler.addRepeatingSection("RepeatingEquipment");
        this.attributeHandler.getRepeatingSection("RepeatingEquipment").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        this.attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");
        this.attributeHandler.getRepeatingSection("RepeatingSyncedEquipment").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
        this.forEachSelectedItem((attrHandler, itemName, count) => {
            for (let i = 0; i < count; i++) {
                this.performAddItem(attrHandler, itemName);
            }
        });
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addMod(WuxDef.GetVariable("EquipmentSlots"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Equipment", WuxDef._build));
        this.attributeHandler.addMod(WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_AutoEquipItems"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_EquipmentSlot", WuxDef._gear));
        this.attributeHandler.addRepeatingSection("RepeatingEquipment");
        this.attributeHandler.getRepeatingSection("RepeatingEquipment").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        this.attributeHandler.addRepeatingSection("RepeatingSyncedEquipment");
        this.attributeHandler.getRepeatingSection("RepeatingSyncedEquipment").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        WuxWorkerActions.UpdateAllActionsFromMenu(this.attributeHandler);
        this.forEachSelectedItem((attrHandler, itemName, count) => {
            for (let i = 0; i < count; i++) {
                this.performAddItem2(attrHandler, itemName);
            }
        });
    }

    // Multi-quantity replacement for the base class's single-item addItem/addItem2
    // (which read a single Popup_InspectSelectId) - every ItemPopupValues row
    // with Popup_ItemSelectCount > 0 is processed at its own quantity, calling
    // back once per unit (not once per row with a count param) so each unit
    // independently re-checks equip-slot availability via the existing
    // performAddSelectedInspectElementEquipment/CanAutoEquipGear/AutoEquipGear
    // cycle - which already sees each earlier unit's pending writes within this
    // same attrHandler, so looping naturally equips in order until slots fill
    // and leaves the rest in storage, with no extra bookkeeping needed here.
    forEachSelectedItem(callback) {
        let inspectPopup = this;
        this.attributeHandler.addRepeatingSection(this.inspectPopupInventoryId);
        let itemNameVar = WuxDef.GetVariable("Popup_ItemSelectName");
        let itemCountVar = WuxDef.GetVariable("Popup_ItemSelectCount");
        this.attributeHandler.getRepeatingSection(this.inspectPopupInventoryId).addFieldNames([itemNameVar, itemCountVar]);

        this.attributeHandler.addGetAttrCallback(function (attrHandler) {
            inspectPopup.setup(attrHandler);
            let repeater = attrHandler.getRepeatingSection(inspectPopup.inspectPopupInventoryId);
            repeater.ids.forEach(function (id) {
                let itemName = attrHandler.parseString(repeater.getFieldName(id, itemNameVar));
                let count = attrHandler.parseInt(repeater.getFieldName(id, itemCountVar)) || 0;
                if (itemName === "" || count <= 0) {
                    return;
                }
                callback(attrHandler, itemName, count);
            });
        });
    }

    performAddItem(attrHandler, itemName) {
        Debug.Log(`Adding Inspect Element ${itemName}`);
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType"))) {
            case "Add Equipment": {
                let item = WuxItems.Get(itemName);
                if (item == undefined) break;
                this.performAddSelectedInspectElementEquipment(attrHandler, item);
                break;
            }
            case "Add Consumable": {
                let item = WuxItems.Get(itemName);
                if (item == undefined) break;
                this.performAddSelectedInspectElementConsumable(attrHandler, item);
                break;
            }
            case "Add Good": {
                let item = WuxGoods.Get(itemName);
                if (item == undefined) break;
                this.performAddSelectedInspectElementGoods(attrHandler, item);
                break;
            }
        }
    }

    performAddItem2(attrHandler, itemName) {
        Debug.Log(`Purchasing Inspect Element ${itemName}`);
        switch (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2"))) {
            case "Purchase Equipment": {
                let item = WuxItems.Get(itemName);
                if (item == undefined) break;
                this.performAddSelectedInspectElementEquipment(attrHandler, item);
                let cost = parseInt(item.value);
                if (isNaN(cost)) cost = 0;
                let jinVar = WuxDef.GetVariable("Jin");
                attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
                break;
            }
        }
    }

    performAddSelectedInspectElementEquipment(attrHandler, item) {
        let existingRepeater = attrHandler.getRepeatingSection("RepeatingEquipment");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let duplicateId = null;
        existingRepeater.iterate(function (id) {
            if (attrHandler.parseString(existingRepeater.getFieldName(id, itemNameVar)) === item.name) {
                duplicateId = id;
                return true;
            }
        });
        if (duplicateId != null) {
            Debug.Log(`Equipment ${item.name} already owned, incrementing count`);
            let countField = existingRepeater.getFieldName(duplicateId, itemCountVar);
            let currentCount = attrHandler.parseInt(countField) || 1;
            attrHandler.addUpdate(countField, currentCount + 1);
            if (attrHandler.parseString(existingRepeater.getFieldName(duplicateId, this.getGearVariable("ItemIsVisible"))) !== "on") {
                attrHandler.addUpdate(existingRepeater.getFieldName(duplicateId, this.getGearVariable("ItemIsVisible")), "on");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "on");
            }
            return;
        }

        const willAutoEquip = WuxWorkerGear.CanAutoEquipGear(attrHandler, item);
        Debug.Log(`Adding Equipment ${item.name} (autoEquip: ${willAutoEquip})`);

        if (!willAutoEquip) {
            let repeater = new WorkerRepeatingSectionHandler("RepeatingEquipment");
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            // Makes this row visible to existingRepeater's own iterate()/ids for
            // the rest of THIS cycle - needed when this function is called
            // multiple times in a row for the same item (adding several units at
            // once), so the 2nd+ call's duplicate check above actually finds it
            // instead of creating a separate row per unit.
            existingRepeater.ids.push(newRowId);
            attrHandler.addUpdate(WuxDef.GetVariable("Gear_EquipmentIsVisible"), "on");

            let equipBuildVar = WuxDef.GetVariable("Equipment", WuxDef._build);
            let equipBuild = [];
            try { equipBuild = JSON.parse(attrHandler.parseString(equipBuildVar)); } catch (e) {}
            if (!Array.isArray(equipBuild)) equipBuild = [];
            let slotOpenState = equipBuild.length >= attrHandler.parseInt(WuxDef.GetVariable("EquipmentSlots")) ? "on" : "0";
            let slotOpenVar = this.getGearVariable("ItemSlotOpen");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, slotOpenVar), slotOpenState);
            existingRepeater.iterate(function (id) {
                attrHandler.addUpdate(existingRepeater.getFieldName(id, slotOpenVar), slotOpenState);
            });
        }

        // Add to synced repeater. If auto-equipping, make it visible immediately.
        let existingSyncedRepeater = attrHandler.getRepeatingSection("RepeatingSyncedEquipment");
        let syncedAlreadyExistsId = null;
        existingSyncedRepeater.iterate(function (id) {
            if (attrHandler.parseString(existingSyncedRepeater.getFieldName(id, itemNameVar)) === item.name) {
                syncedAlreadyExistsId = id;
                return true;
            }
        });
        if (syncedAlreadyExistsId == null) {
            let syncedRepeater = new WorkerRepeatingSectionHandler("RepeatingSyncedEquipment");
            let syncedRowId = syncedRepeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, syncedRepeater, syncedRowId, item);
            // Same reasoning as existingRepeater.ids.push above - keeps repeated
            // calls for the same item (multiple units) incrementing this same row
            // instead of creating a duplicate.
            existingSyncedRepeater.ids.push(syncedRowId);
            attrHandler.addUpdate(syncedRepeater.getFieldName(syncedRowId, this.getGearVariable("ItemIsVisible")), willAutoEquip ? "on" : "0");
            attrHandler.addUpdate(syncedRepeater.getFieldName(syncedRowId, itemCountVar), willAutoEquip ? 1 : 0);
        } else if (willAutoEquip) {
            let syncedCount = attrHandler.parseInt(existingSyncedRepeater.getFieldName(syncedAlreadyExistsId, itemCountVar)) || 0;
            attrHandler.addUpdate(existingSyncedRepeater.getFieldName(syncedAlreadyExistsId, itemCountVar), syncedCount + 1);
            attrHandler.addUpdate(existingSyncedRepeater.getFieldName(syncedAlreadyExistsId, this.getGearVariable("ItemIsVisible")), "on");
        }

        let equipBuildMaxVar = WuxDef.GetVariable("Equipment", WuxDef._build + WuxDef._max);
        let equipBuildMax = [];
        try { equipBuildMax = JSON.parse(attrHandler.parseString(equipBuildMaxVar)); } catch (e) {}
        if (!Array.isArray(equipBuildMax)) equipBuildMax = [];
        equipBuildMax.push(item.name);
        attrHandler.addUpdate(equipBuildMaxVar, JSON.stringify(equipBuildMax));

        if (willAutoEquip) {
            WuxWorkerGear.AutoEquipGear(attrHandler, item, existingRepeater);
        }
    };
    performAddSelectedInspectElementConsumable(attrHandler, item) {
        Debug.Log(`Adding Consumable ${item.name}`);

        let existingRepeater = attrHandler.getRepeatingSection("RepeatingConsumables");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let duplicateId = null;
        existingRepeater.iterate(function (id) {
            if (attrHandler.parseString(existingRepeater.getFieldName(id, itemNameVar)) === item.name) {
                duplicateId = id;
                return true;
            }
        });
        let itemValue = parseInt(item.value) || 0;
        let buyDef = WuxDef.Get("Gear_Buy");
        let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
        let buyInfoVar = WuxDef.GetVariable("Gear_Buy", WuxDef._info);
        let buyMaxInfoVar = WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info);

        if (duplicateId != null) {
            Debug.Log(`Consumable ${item.name} already owned, incrementing count`);
            let countField = existingRepeater.getFieldName(duplicateId, itemCountVar);
            let currentCount = attrHandler.parseInt(countField) || 1;
            attrHandler.addUpdate(countField, currentCount + 1);
            attrHandler.addUpdate(existingRepeater.getFieldName(duplicateId, buyInfoVar), buyDef.getTitle(`1 (${itemValue}J)`));
            attrHandler.addUpdate(existingRepeater.getFieldName(duplicateId, buyMaxInfoVar), buyBulkDef.getTitle(`10 (${itemValue * 10}J)`));
            if (attrHandler.parseString(existingRepeater.getFieldName(duplicateId, this.getGearVariable("ItemIsVisible"))) !== "on") {
                attrHandler.addUpdate(existingRepeater.getFieldName(duplicateId, this.getGearVariable("ItemIsVisible")), "on");
                attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible"), "on");
            }
            return;
        }

        const willAutoEquip = WuxWorkerGear.CanAutoEquipConsumable(attrHandler);
        Debug.Log(`Adding Consumable ${item.name} (autoEquip: ${willAutoEquip})`);

        let repeater = new WorkerRepeatingSectionHandler("RepeatingConsumables");
        let newRowId = repeater.generateRowId();
        this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
        this.performAddSelectedInspectElementTechnique(attrHandler, repeater, newRowId, item.technique);
        // Makes this row visible to existingRepeater's own iterate()/ids for the
        // rest of THIS cycle - needed when this function is called multiple times
        // in a row for the same item (adding several units at once), so the 2nd+
        // call's duplicate check above actually finds it instead of creating a
        // separate row per unit.
        existingRepeater.ids.push(newRowId);
        attrHandler.addUpdate(repeater.getFieldName(newRowId, buyInfoVar), buyDef.getTitle(`1 (${itemValue}J)`));
        attrHandler.addUpdate(repeater.getFieldName(newRowId, buyMaxInfoVar), buyBulkDef.getTitle(`10 (${itemValue * 10}J)`));

        if (willAutoEquip) {
            attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemIsVisible")), "0");
        } else {
            attrHandler.addUpdate(WuxDef.GetVariable("Gear_ConsumableIsVisible"), "on");

            let consuBuildVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build);
            let consuBuild = [];
            try { consuBuild = JSON.parse(attrHandler.parseString(consuBuildVar)); } catch (e) {}
            if (!Array.isArray(consuBuild)) consuBuild = [];
            let slotOpenState = consuBuild.length >= attrHandler.parseInt(WuxDef.GetVariable("ConsumableSlots")) ? "on" : "0";
            let slotOpenVar = this.getGearVariable("ItemSlotOpen");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, slotOpenVar), slotOpenState);
            existingRepeater.iterate(function (id) {
                attrHandler.addUpdate(existingRepeater.getFieldName(id, slotOpenVar), slotOpenState);
            });
        }

        let consuBuildMaxVar = WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max);
        let consuBuildMax = [];
        try { consuBuildMax = JSON.parse(attrHandler.parseString(consuBuildMaxVar)); } catch (e) {}
        if (!Array.isArray(consuBuildMax)) consuBuildMax = [];
        consuBuildMax.push(item.name);
        attrHandler.addUpdate(consuBuildMaxVar, JSON.stringify(consuBuildMax));

        if (willAutoEquip) {
            WuxWorkerGear.AutoEquipConsumable(attrHandler, item, existingRepeater, this.consuItemCountAttrMap);
        }
    };
    performAddSelectedInspectElementGoods(attrHandler, item) {
        Debug.Log(`Adding Goods ${item.name}`);
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGoods");
        let newRowId = repeater.generateRowId();
        this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
    };
    getGearVariable(variable, suffix) {
        let baseDefinition = WuxDef.Get("Gear");
        return baseDefinition.getVariable(`-${WuxDef.GetVariable(variable, suffix)}`);
    };
    // Populates the full item card (name/group/bulk/value/description/traits(+tooltip)/
    // craft(+tooltip) - ItemDataAttributeHandler.setSharedItemInfo, WJS-Service.js)
    // for a newly-added row in any of the "owned item" repeaters (Equipment,
    // SyncedEquipment, Gear, Consumables, Foods, Goods) - baseDefinition "Gear"
    // (not "Action") matches what these repeaters' rows have always used.
    // setSharedItemInfo (not setItemInfo) deliberately - setItemInfo would also
    // eagerly write the item's own embedded technique under this same "Gear"
    // prefix, which the new Show/Hide Effects display (printCatalogItemTechniqueSection,
    // WuxGS-Base.js) doesn't read - that technique is instead populated lazily,
    // under the universal "Action" prefix, by populateItemAssociatedTechnique
    // only once its row's Show Effects button is clicked.
    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        const field = (name, suffix) => repeater.getFieldName(newRowId, this.getGearVariable(name, suffix));

        attrHandler.addUpdate(field("ItemIsVisible"), "on");
        attrHandler.addUpdate(field("ItemSubGroup"), item.group === "Apparel" ? (item.category || "") : "");

        let itemDataAttributeHandler = new ItemDataAttributeHandler(attrHandler, "Gear");
        itemDataAttributeHandler.setRepeaterData(repeater, newRowId);
        itemDataAttributeHandler.setSharedItemInfo(item);

        // Show/Hide Effects button visibility only - piggybacked onto ItemName's
        // (otherwise-unused) max slot, same convention as the item catalog
        // (ItemInspectPopupAttributeHandler.setInventoryItemData, this file).
        let hasAssociatedTechnique = item.itemType == "UsableItem" &&
            (item.hasTechnique || (item.getCommonTechniques && item.getCommonTechniques().length > 0));
        attrHandler.addUpdate(field("ItemName", WuxDef._max), hasAssociatedTechnique ? "on" : "0");
    };
    performAddSelectedInspectElementTechnique(attrHandler, repeater, newRowId, technique) {
        let techniqueItemAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
        techniqueItemAttributeHandler.setRepeaterData(repeater);
        techniqueItemAttributeHandler.setId(newRowId);
        techniqueItemAttributeHandler.setTechniqueInfo(technique, true);
        techniqueItemAttributeHandler.setVisibilityAttribute(true);
    };
    getEquipMenuText(item) {
        switch (item.group) {
            case "Head Gear":
                return WuxDef.GetTitle("Gear_EquipHead");
            case "Face Gear":
                return WuxDef.GetTitle("Gear_EquipFace");
            case "Chest Gear":
                return WuxDef.GetTitle("Gear_EquipChest");
            case "Arm Gear":
                return WuxDef.GetTitle("Gear_EquipArm");
            case "Leg Gear":
                return WuxDef.GetTitle("Gear_EquipLeg");
            case "Foot Gear":
                return WuxDef.GetTitle("Gear_EquipFoot");
        }

        return WuxDef.GetTitle("Gear_Equip");
    };
}

class ConsumablesInspectPopupAttributeHandler extends ItemInspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_ConsumablesInspectionName";
    }
}

class ConsumablesInspectionPopup extends ItemInspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new ConsumablesInspectPopupAttributeHandler(attrHandler);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_AutoEquipItems"));
        this.consuItemCountAttrMap = WuxWorkerGear.BuildConsuItemCountMap(this.attributeHandler);
        this.attributeHandler.addRepeatingSection("RepeatingConsumables");
        this.attributeHandler.getRepeatingSection("RepeatingConsumables").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addMod(WuxDef.GetVariable("ConsumableSlots"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_ConsumableSlot", WuxDef._build + WuxDef._max));
        this.attributeHandler.addMod(WuxDef.GetVariable("Gear_AutoEquipItems"));
        this.consuItemCountAttrMap = WuxWorkerGear.BuildConsuItemCountMap(this.attributeHandler);
        this.attributeHandler.addRepeatingSection("RepeatingConsumables");
        this.attributeHandler.getRepeatingSection("RepeatingConsumables").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Consumable") return;
        let item = WuxItems.Get(itemName);
        if (item == undefined) return;
        this.performAddSelectedInspectElementConsumable(attrHandler, item);
        let cost = parseInt(item.value);
        if (isNaN(cost)) cost = 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }
}

class GearInspectPopupAttributeHandler extends ItemInspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_GearInspectionName";
    }

    setSelectedItemData(selectedItemName) {
        if (selectedItemName.startsWith("Goods:")) {
            let goodsName = selectedItemName.slice(6);
            let item = WuxGoods.Get(goodsName);
            if (item == undefined) {
                this.itemDataAttributeHandler.clearItemInfo();
                for (let i = 0; i <= 3; i++) { this.hideTechnique(i); }
                this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
                this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), "");
                return;
            }
            let cost = parseInt(item.value);
            let jin = this.attrHandler.parseInt(WuxDef.GetVariable("Jin"));
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"),
                (!isNaN(cost) && jin >= cost) ? "on" : "0");
            this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), !isNaN(cost) ? `${cost} J` : "");
            this.itemDataAttributeHandler.setGoodsInfo(item);
            for (let i = 0; i <= 3; i++) { this.hideTechnique(i); }
            return;
        }
        super.setSelectedItemData(selectedItemName);
    }
}

class GoodsInspectPopupAttributeHandler extends ItemInspectPopupAttributeHandler {
    constructor(attributeHandler) {
        super(attributeHandler);
        this.titleDefinitionName = "Popup_GoodsInspectionName";
    }

    setSelectedItemData(selectedItemName) {
        let item = WuxGoods.Get(selectedItemName);
        if (item == undefined) {
            this.itemDataAttributeHandler.clearItemInfo();
            for (let i = 0; i <= 3; i++) {
                this.hideTechnique(i);
            }
            this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), "0");
            this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), "");
            return;
        }

        let cost = parseInt(item.value);
        let jin = this.attrHandler.parseInt(WuxDef.GetVariable("Jin"));
        this.attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"),
            (!isNaN(cost) && jin >= cost) ? "on" : "0");
        this.attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), !isNaN(cost) ? `${cost} J` : "");

        this.itemDataAttributeHandler.setGoodsInfo(item);

        for (let i = 0; i <= 3; i++) {
            this.hideTechnique(i);
        }
    }
}

class GoodsForGearInspectPopupAttributeHandler extends GoodsInspectPopupAttributeHandler {
    setPopupType(popupType) {
        super.setPopupType("Popup_GoodsForGearInspectionName");
    }
}

class FoodsInspectPopupAttributeHandler extends GearInspectPopupAttributeHandler {
    setPopupType(popupType) {
        super.setPopupType("Popup_FoodsInspectionName");
    }
}

class IngsInspectPopupAttributeHandler extends GoodsInspectPopupAttributeHandler {
    setPopupType(popupType) {
        super.setPopupType("Popup_IngsInspectionName");
    }
}

class GearInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new GearInspectPopupAttributeHandler(attrHandler);
    }

    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addRepeatingSection("RepeatingGear");
        this.attributeHandler.getRepeatingSection("RepeatingGear").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addRepeatingSection("RepeatingGear");
        this.attributeHandler.getRepeatingSection("RepeatingGear").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType")) !== "Add Gear") return;
        this._addGearItem(attrHandler, itemName);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Gear") return;
        let isGoods = itemName.startsWith("Goods:");
        let actualName = isGoods ? itemName.slice(6) : itemName;
        let item = isGoods ? WuxGoods.Get(actualName) : WuxItems.Get(actualName);
        if (item == undefined) return;
        this._addGearItem(attrHandler, itemName, isGoods ? 5 : 1);
        let cost = parseInt(item.value) || 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }

    _addGearItem(attrHandler, itemName, count) {
        let isGoods = itemName.startsWith("Goods:");
        let actualName = isGoods ? itemName.slice(6) : itemName;
        let item = isGoods ? WuxGoods.Get(actualName) : WuxItems.Get(actualName);
        if (item == undefined) return;
        let effectiveCount = count != undefined ? count : 1;
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGear");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let existingRepeater = this.attributeHandler.getRepeatingSection("RepeatingGear");
        let existingRowId = null;
        if (existingRepeater) {
            for (let id of existingRepeater.ids) {
                if (attrHandler.parseString(repeater.getFieldName(id, itemNameVar)) === actualName) {
                    existingRowId = id;
                    break;
                }
            }
        }
        if (existingRowId != null) {
            let countFieldName = repeater.getFieldName(existingRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, attrHandler.parseInt(countFieldName) + effectiveCount);
        } else {
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            let countFieldName = repeater.getFieldName(newRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, effectiveCount);
            attrHandler.addRepeatingSectionRowUpdate(newRowId, countFieldName, effectiveCount);
            let itemValue = parseInt(item.value) || 0;
            let buyDef = WuxDef.Get("Gear_Buy");
            let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Buy", WuxDef._info)), buyDef.getTitle(isGoods ? `5 (${itemValue}J)` : `1 (${itemValue}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info)), buyBulkDef.getTitle(isGoods ? `50 (${itemValue * 10}J)` : `10 (${itemValue * 10}J)`));
            if (isGoods) {
                attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemMainGroup")), "Goods");
            }
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_GearIsVisible"), "on");
    }

    getGearVariable(variable, suffix) {
        return ItemInspectionPopup.prototype.getGearVariable.call(this, variable, suffix);
    }

    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        return ItemInspectionPopup.prototype.performAddSelectedInspectElementItem.call(this, attrHandler, repeater, newRowId, item);
    }
}

class GoodsInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new GoodsInspectPopupAttributeHandler(attrHandler);
    }

    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addRepeatingSection("RepeatingGoods");
        this.attributeHandler.getRepeatingSection("RepeatingGoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addRepeatingSection("RepeatingGoods");
        this.attributeHandler.getRepeatingSection("RepeatingGoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType")) !== "Add Good") return;
        this._addGoodsItem(attrHandler, itemName);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Good") return;
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        this._addGoodsItem(attrHandler, itemName, 5);
        let cost = parseInt(item.value) || 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }

    _addGoodsItem(attrHandler, itemName, count) {
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        let effectiveCount = count != undefined ? count : 1;
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGoods");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let existingRepeater = this.attributeHandler.getRepeatingSection("RepeatingGoods");
        let existingRowId = null;
        if (existingRepeater) {
            for (let id of existingRepeater.ids) {
                if (attrHandler.parseString(repeater.getFieldName(id, itemNameVar)) === itemName) {
                    existingRowId = id;
                    break;
                }
            }
        }
        if (existingRowId != null) {
            let countFieldName = repeater.getFieldName(existingRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, attrHandler.parseInt(countFieldName) + effectiveCount);
        } else {
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            let countFieldName = repeater.getFieldName(newRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, effectiveCount);
            attrHandler.addRepeatingSectionRowUpdate(newRowId, countFieldName, effectiveCount);
            let itemValue = parseInt(item.value) || 0;
            let buyDef = WuxDef.Get("Gear_Buy");
            let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Buy", WuxDef._info)), buyDef.getTitle(`5 (${itemValue}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info)), buyBulkDef.getTitle(`50 (${itemValue * 10}J)`));
        }
    }

    getGearVariable(variable, suffix) {
        return ItemInspectionPopup.prototype.getGearVariable.call(this, variable, suffix);
    }

    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        return ItemInspectionPopup.prototype.performAddSelectedInspectElementItem.call(this, attrHandler, repeater, newRowId, item);
    }
}

class GoodsForGearInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new GoodsForGearInspectPopupAttributeHandler(attrHandler);
    }

    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addRepeatingSection("RepeatingGear");
        this.attributeHandler.getRepeatingSection("RepeatingGear").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addRepeatingSection("RepeatingGear");
        this.attributeHandler.getRepeatingSection("RepeatingGear").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType")) !== "Add Gear") return;
        this._addGoodsForGearItem(attrHandler, itemName);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Gear") return;
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        this._addGoodsForGearItem(attrHandler, itemName, 5);
        let cost = parseInt(item.value) || 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }

    _addGoodsForGearItem(attrHandler, itemName, count) {
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        let effectiveCount = count != undefined ? count : 1;
        let repeater = new WorkerRepeatingSectionHandler("RepeatingGear");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let existingRepeater = this.attributeHandler.getRepeatingSection("RepeatingGear");
        let existingRowId = null;
        if (existingRepeater) {
            for (let id of existingRepeater.ids) {
                if (attrHandler.parseString(repeater.getFieldName(id, itemNameVar)) === itemName) {
                    existingRowId = id;
                    break;
                }
            }
        }
        if (existingRowId != null) {
            let countFieldName = repeater.getFieldName(existingRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, attrHandler.parseInt(countFieldName) + effectiveCount);
        } else {
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            let countFieldName = repeater.getFieldName(newRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, effectiveCount);
            attrHandler.addRepeatingSectionRowUpdate(newRowId, countFieldName, effectiveCount);
            let itemValue = parseInt(item.value) || 0;
            let buyDef = WuxDef.Get("Gear_Buy");
            let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Buy", WuxDef._info)), buyDef.getTitle(`5 (${itemValue}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info)), buyBulkDef.getTitle(`50 (${itemValue * 10}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemMainGroup")), "Goods");
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_GearIsVisible"), "on");
    }

    getGearVariable(variable, suffix) {
        return ItemInspectionPopup.prototype.getGearVariable.call(this, variable, suffix);
    }

    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        return ItemInspectionPopup.prototype.performAddSelectedInspectElementItem.call(this, attrHandler, repeater, newRowId, item);
    }
}

class FoodsInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new FoodsInspectPopupAttributeHandler(attrHandler);
    }

    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addRepeatingSection("RepeatingFoods");
        this.attributeHandler.getRepeatingSection("RepeatingFoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addRepeatingSection("RepeatingFoods");
        this.attributeHandler.getRepeatingSection("RepeatingFoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType")) !== "Add Food") return;
        this._addFoodsItem(attrHandler, itemName);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Food") return;
        let isGoods = itemName.startsWith("Goods:");
        let actualName = isGoods ? itemName.slice(6) : itemName;
        let item = isGoods ? WuxGoods.Get(actualName) : WuxItems.Get(actualName);
        if (item == undefined) return;
        this._addFoodsItem(attrHandler, itemName, isGoods ? 5 : 1);
        let cost = parseInt(item.value) || 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }

    _addFoodsItem(attrHandler, itemName, count) {
        let isGoods = itemName.startsWith("Goods:");
        let actualName = isGoods ? itemName.slice(6) : itemName;
        let item = isGoods ? WuxGoods.Get(actualName) : WuxItems.Get(actualName);
        if (item == undefined) return;
        let effectiveCount = count != undefined ? count : 1;
        let repeater = new WorkerRepeatingSectionHandler("RepeatingFoods");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let existingRepeater = this.attributeHandler.getRepeatingSection("RepeatingFoods");
        let existingRowId = null;
        if (existingRepeater) {
            for (let id of existingRepeater.ids) {
                if (attrHandler.parseString(repeater.getFieldName(id, itemNameVar)) === actualName) {
                    existingRowId = id;
                    break;
                }
            }
        }
        if (existingRowId != null) {
            let countFieldName = repeater.getFieldName(existingRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, attrHandler.parseInt(countFieldName) + effectiveCount);
        } else {
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            let countFieldName = repeater.getFieldName(newRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, effectiveCount);
            attrHandler.addRepeatingSectionRowUpdate(newRowId, countFieldName, effectiveCount);
            let itemValue = parseInt(item.value) || 0;
            let buyDef = WuxDef.Get("Gear_Buy");
            let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Buy", WuxDef._info)), buyDef.getTitle(isGoods ? `5 (${itemValue}J)` : `1 (${itemValue}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info)), buyBulkDef.getTitle(isGoods ? `50 (${itemValue * 10}J)` : `10 (${itemValue * 10}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemMainGroup")), isGoods ? "Goods" : "Item");
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_FoodIsVisible"), "on");
    }

    getGearVariable(variable, suffix) {
        return ItemInspectionPopup.prototype.getGearVariable.call(this, variable, suffix);
    }

    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        return ItemInspectionPopup.prototype.performAddSelectedInspectElementItem.call(this, attrHandler, repeater, newRowId, item);
    }
}

class IngsInspectionPopup extends InspectionPopup {
    setup(attrHandler) {
        this.inspectPopupAttrHandler = new IngsInspectPopupAttributeHandler(attrHandler);
    }

    open(inventoryTitle, inventoryItems, addType) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.open(inventoryTitle, inventoryItems, addType);
    }

    selectItem(selectedId) {
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        super.selectItem(selectedId);
    }

    addItem() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType"));
        this.attributeHandler.addRepeatingSection("RepeatingFoods");
        this.attributeHandler.getRepeatingSection("RepeatingFoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem.call(this);
    }

    addItem2() {
        this.attributeHandler.addMod(WuxDef.GetVariable("Popup_InspectAddType", "2"));
        this.attributeHandler.addMod(WuxDef.GetVariable("Jin"));
        this.attributeHandler.addRepeatingSection("RepeatingFoods");
        this.attributeHandler.getRepeatingSection("RepeatingFoods").addFieldNames([this.getGearVariable("ItemName"), this.getGearVariable("ItemIsVisible"), this.getGearVariable("ItemCount")]);
        InspectionPopup.prototype.addItem2.call(this);
    }

    performAddItem(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType")) !== "Add Ingredient") return;
        this._addIngsItem(attrHandler, itemName);
    }

    performAddItem2(attrHandler, itemName) {
        if (attrHandler.parseString(WuxDef.GetVariable("Popup_InspectAddType", "2")) !== "Purchase Ingredient") return;
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        this._addIngsItem(attrHandler, itemName, 5);
        let cost = parseInt(item.value) || 0;
        let jinVar = WuxDef.GetVariable("Jin");
        attrHandler.addUpdate(jinVar, (attrHandler.parseInt(jinVar) - cost).toString());
    }

    _addIngsItem(attrHandler, itemName, count) {
        let item = WuxGoods.Get(itemName);
        if (item == undefined) return;
        let effectiveCount = count != undefined ? count : 1;
        let repeater = new WorkerRepeatingSectionHandler("RepeatingFoods");
        let itemNameVar = this.getGearVariable("ItemName");
        let itemCountVar = this.getGearVariable("ItemCount");
        let existingRepeater = this.attributeHandler.getRepeatingSection("RepeatingFoods");
        let existingRowId = null;
        if (existingRepeater) {
            for (let id of existingRepeater.ids) {
                if (attrHandler.parseString(repeater.getFieldName(id, itemNameVar)) === itemName) {
                    existingRowId = id;
                    break;
                }
            }
        }
        if (existingRowId != null) {
            let countFieldName = repeater.getFieldName(existingRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, attrHandler.parseInt(countFieldName) + effectiveCount);
        } else {
            let newRowId = repeater.generateRowId();
            this.performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item);
            let countFieldName = repeater.getFieldName(newRowId, itemCountVar);
            attrHandler.addUpdate(countFieldName, effectiveCount);
            attrHandler.addRepeatingSectionRowUpdate(newRowId, countFieldName, effectiveCount);
            let itemValue = parseInt(item.value) || 0;
            let buyDef = WuxDef.Get("Gear_Buy");
            let buyBulkDef = WuxDef.Get("Gear_BuyBulk");
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_Buy", WuxDef._info)), buyDef.getTitle(`5 (${itemValue}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, WuxDef.GetVariable("Gear_BuyBulk", WuxDef._info)), buyBulkDef.getTitle(`50 (${itemValue * 10}J)`));
            attrHandler.addUpdate(repeater.getFieldName(newRowId, this.getGearVariable("ItemMainGroup")), "Goods");
        }
        attrHandler.addUpdate(WuxDef.GetVariable("Gear_FoodIsVisible"), "on");
    }

    getGearVariable(variable, suffix) {
        return ItemInspectionPopup.prototype.getGearVariable.call(this, variable, suffix);
    }

    performAddSelectedInspectElementItem(attrHandler, repeater, newRowId, item) {
        return ItemInspectionPopup.prototype.performAddSelectedInspectElementItem.call(this, attrHandler, repeater, newRowId, item);
    }
}

var WuxWorkerInspectPopup = WuxWorkerInspectPopup || (function () {
    const getOpenInspectionPopup = function (callback) {
        let attributeHandler = new WorkerAttributeHandler();
        let selectTypeVariable = WuxDef.GetVariable("Popup_InspectSelectType");
        attributeHandler.addMod(selectTypeVariable);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let attributeHandler2 = new WorkerAttributeHandler();
            let inspectPopup;
            switch(attrHandler.parseString(selectTypeVariable)) {
                case "Popup_TechniqueInspectionName":
                    inspectPopup = new TechniqueInspectionPopup(attributeHandler2);
                    break;
                case "Popup_PerkInspectionName":
                    inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
                    break;
                case "Popup_ItemInspectionName":
                    inspectPopup = new ItemInspectionPopup(attributeHandler2);
                    break;
                case "Popup_ConsumablesInspectionName":
                    inspectPopup = new ConsumablesInspectionPopup(attributeHandler2);
                    break;
                case "Popup_GearInspectionName":
                    inspectPopup = new GearInspectionPopup(attributeHandler2);
                    break;
                case "Popup_GoodsInspectionName":
                    inspectPopup = new GoodsInspectionPopup(attributeHandler2);
                    break;
                case "Popup_GoodsForGearInspectionName":
                    inspectPopup = new GoodsForGearInspectionPopup(attributeHandler2);
                    break;
                case "Popup_FoodsInspectionName":
                    inspectPopup = new FoodsInspectionPopup(attributeHandler2);
                    break;
                case "Popup_IngsInspectionName":
                    inspectPopup = new IngsInspectionPopup(attributeHandler2);
                    break;
            }
            if (inspectPopup != undefined) {
                callback(inspectPopup);
            }
        });
        attributeHandler.run();
    }
    'use strict';

    const openItemInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
            Debug.Log("Open Item Popup");
            let inspectPopup = new ItemInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType);
        },

        openTechniqueInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
            Debug.Log("Open Technique Popup");
            let inspectPopup = new TechniqueInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType);
        },

        // Every technique-catalog entry point (performStyleFilterInspection,
        // openRecommendedStylesInspection below, plus Worker-Jobs.js's seeTechniques)
        // needs the same "populate through a loading screen, then reveal" choreography - centralized
        // here instead of duplicated at each call site. TechniqueInspectionPopup.open
        // uses showWithoutReveal (not show), so Popup_InspectPopupActive isn't written
        // as part of THIS cycle - loader.run() resolves only once its own
        // attributeHandler.run() (both the regular-attr AND repeating-section-row
        // flushes) and hideLoadingScreen() have completed, so the reveal cycle below
        // is guaranteed to run strictly after the catalog rows are already there.
        // variantsByName (optional): Map<techniqueName, TechniqueData[]> the caller
        // already built while computing the tier-grouped list (performStyleFilterInspection/
        // openRecommendedStylesInspection) - passed through so catalog population can
        // skip re-fetching the same variants (see TechniqueInspectionPopup.open below).
        openTechniqueInspectionWithLoadingScreen = function (inventoryTitle, inventoryItems, addType, variantsByName) {
            let attributeHandler = new WorkerAttributeHandler();
            let inspectPopup = new TechniqueInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType, variantsByName);
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run().then(function () {
                let revealAttributeHandler = new WorkerAttributeHandler();
                revealAttributeHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "on");
                revealAttributeHandler.run();
            });
        },

        // Same "populate through a loading screen, then reveal" choreography as
        // openTechniqueInspectionWithLoadingScreen above, for the item catalog's
        // own entry point (performItemFilterInspection below). Built as its own
        // self-contained flow (repeating section + mods + showWithoutReveal,
        // rather than routing through ItemInspectionPopup.open/show) instead of
        // changing that shared method's behavior, since openItemInspection/
        // OpenItemInspection (this same class's other, plain entry point) has
        // other callers (Worker-Gear.js) that depend on it revealing immediately.
        // itemCache (optional): Map<itemName, ItemData> the caller already built
        // while filtering/grouping (performItemFilterInspection/performItemListInspection,
        // both via a name->item map the caller/handler populated from objects it
        // already constructed) - threaded through so the catalog population step
        // (ItemInspectPopupAttributeHandler.setInventoryItemData) can skip calling
        // WuxItems.Get() a second time for the same name. WuxItems.Get never
        // caches (WJS-TechDef.js), so every call reconstructs a full item -
        // including its own embedded TechniqueData - from scratch; mirrors the
        // technique catalog's own variantsByName precompute-and-thread pattern.
        openItemInspectionWithLoadingScreen = function (inventoryTitle, inventoryItems, addType, itemCache) {
            let attributeHandler = new WorkerAttributeHandler();
            let inspectPopup = new ItemInspectionPopup(attributeHandler);

            attributeHandler.addMod([
                WuxDef.GetVariable("Jin"),
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Forme_ShowFromNonElement")
            ]);
            attributeHandler.addRepeatingSection(inspectPopup.inspectPopupInventoryId);
            attributeHandler.addMod([WuxDef.GetVariable("Popup_InspectSelectId")]);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                inspectPopup.setup(attrHandler);
                inspectPopup.inspectPopupAttrHandler.itemCache = itemCache;
                inspectPopup.inspectPopupAttrHandler.showWithoutReveal(inventoryTitle, inventoryItems, addType);
            });

            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run().then(function () {
                let revealAttributeHandler = new WorkerAttributeHandler();
                revealAttributeHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPopupActive"), "on");
                revealAttributeHandler.run();
            });
        },

        openPerkTechniqueInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
            Debug.Log("Open Perk Technique Popup");
            let inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler);
            inspectPopup.open(inventoryTitle, inventoryItems, addType);
        },
        
        close = function () {
            let attributeHandler = new WorkerAttributeHandler();
            let selectTypeVariable = WuxDef.GetVariable("Popup_InspectSelectType");
            attributeHandler.addMod(selectTypeVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let selectType = attrHandler.parseString(selectTypeVariable);

                // Only the technique/style catalog uses its own dedicated
                // repeater (TechPopupValues, TechniqueInspectionPopup's
                // constructor) instead of the shared ItemPopupValues every
                // other popup type defaults to - picking the right subclass
                // here (instead of always the base InspectionPopup) means
                // close()'s row-trimming (InspectionPopup.close, above) trims
                // whichever repeater this popup actually used, not always
                // ItemPopupValues regardless of which popup was open.
                let attributeHandler2 = new WorkerAttributeHandler();
                let inspectPopup = selectType == "Popup_TechniqueInspectionName"
                    ? new TechniqueInspectionPopup(attributeHandler2)
                    : new InspectionPopup(attributeHandler2);
                inspectPopup.close();
                attributeHandler2.run();

                // The style adding system spends points live as a preview while
                // techniques are selected (toggleSelectedItem,
                // TechniqueInspectPopupAttributeHandler) - if the popup is closing
                // without confirming via Add (that flow uses InspectionPopup.close()
                // directly via addSelectedInspectElement, not this function), discard
                // that unconfirmed draft. This needs its own separate
                // attributeHandler/run() cycle, not nested inside attributeHandler2's
                // own callback - addMod calls made from within an already-running
                // getAttrs pass are registered too late to actually get fetched.
                if (selectType == "Popup_TechniqueInspectionName") {
                    let attributeHandler3 = new WorkerAttributeHandler();
                    let worker = new WuxStyleWorkerBuild();
                    let snapshotVar = WuxDef.GetVariable("Popup_InspectDraftSnapshot");
                    attributeHandler3.addMod([worker.attrMax, snapshotVar]);
                    attributeHandler3.addGetAttrCallback(function (attrHandler) {
                        // Mirrors WuxWorkerBuild.resetChanges exactly, but reverting
                        // draft to the snapshot taken when this popup opened
                        // (initializePopup, TechniqueInspectPopupAttributeHandler)
                        // instead of attrBuildFinal - final is only ever updated by
                        // the Advancement tab's commit flow, so it can be stale
                        // relative to other draft-only changes (deleting a style,
                        // for instance, Worker-Styles.js's deleteListStyle) made
                        // outside this popup - reverting to it would silently undo
                        // those. updatePoints is also called explicitly here since
                        // resetChanges never recomputes the displayed
                        // remaining-points value on its own.
                        worker.setBuildStats(snapshotVar, attrHandler);
                        worker.cleanBuildStats();
                        worker.setBuildStatVariables(attrHandler);
                        worker.revertBuildStatsDraft(attrHandler);
                        worker.updatePoints(attrHandler);
                    });
                    attributeHandler3.run();
                }
            });
            attributeHandler.run();
        },

        selectInspectionItemFromActiveGroup = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let selectTypeVariable = WuxDef.GetVariable("Popup_InspectSelectType");
            attributeHandler.addMod(selectTypeVariable);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let attributeHandler2 = new WorkerAttributeHandler();

                let repeater = new WorkerRepeatingSectionHandler("ItemPopupValues");
                let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);
                
                let inspectPopup;
                switch(attrHandler.parseString(selectTypeVariable)) {
                    case "Popup_TechniqueInspectionName":
                        inspectPopup = new TechniqueInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_PerkInspectionName":
                        inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_ItemInspectionName":
                        inspectPopup = new ItemInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_ConsumablesInspectionName":
                        inspectPopup = new ConsumablesInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_GearInspectionName":
                        inspectPopup = new GearInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_GoodsInspectionName":
                        inspectPopup = new GoodsInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_GoodsForGearInspectionName":
                        inspectPopup = new GoodsForGearInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_FoodsInspectionName":
                        inspectPopup = new FoodsInspectionPopup(attributeHandler2);
                        break;
                    case "Popup_IngsInspectionName":
                        inspectPopup = new IngsInspectionPopup(attributeHandler2);
                        break;
                }
                if (inspectPopup != undefined) {
                    inspectPopup.selectItem(selectedId);
                }
                attributeHandler2.run();
            });
            attributeHandler.run();
        },

        // Swaps a technique card in place to show one of its variants, mirroring
        // Worker-Actions.js's swapTechniqueVariant (the live Actions tab's own
        // variant swap) but without the build-stats rank carry-over that only
        // makes sense for a learned, ranked technique. repeaterId defaults to the
        // technique catalog's "TechPopupValues" (unlearned browsing cards, with the
        // catalog-only Select-button gating); passing "RepeatingStyles" instead
        // reuses this same logic for the Learned Styles section's full-card
        // display, which has no Select button/Popup_InspectShowAdd concept at all,
        // so that branch just calls setTechniqueInfo directly.
        swapCatalogTechniqueVariant = function (eventinfo, repeaterId) {
            if (repeaterId == undefined) {
                repeaterId = "TechPopupValues";
            }
            let attributeHandler = new WorkerAttributeHandler();

            let repeater = new WorkerRepeatingSectionHandler(repeaterId);
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);

            let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attributeHandler, "Action");
            techniqueAttributeHandler.setRepeaterData(repeater, selectedId);

            let selectField = techniqueAttributeHandler.getVariantSelectFieldName();
            let slotFields = [];
            for (let i = 0; i < 6; i++) {
                slotFields.push(techniqueAttributeHandler.getVariantFieldName(i));
            }
            // setTechniqueRankButtons (run via setTechniqueInfo below) needs CR fetched
            // ahead of time too, or it silently falls back to a default of 1 - see
            // Worker-Actions.js's swapTechniqueVariant for the same caution.
            // Popup_InspectShowAdd is read here as a plain worker attribute fetch, not
            // an HTML field reference, so it's unaffected by the repeating-section
            // rescoping issue that ruled out reading it directly in the popup HTML
            // (see printCatalogRequirementSection, WuxGS-Base.js) - the row's own
            // "can select" flag (piggybacked on TechRequirement's base slot) needs to
            // be re-derived here too, since setTechniqueCatalogInfo rewrites it. Same
            // for the affinity/element-restriction fields (see initializePopup,
            // TechniqueInspectPopupAttributeHandler above) - swapping needs to
            // re-apply the same variant filtering the initial population used.
            let isCatalog = repeaterId === "TechPopupValues";
            let mods = [
                selectField, WuxDef.GetVariable("CR"),
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Forme_ShowFromNonElement")
            ].concat(slotFields);
            if (isCatalog) {
                mods.push(WuxDef.GetVariable("Popup_InspectShowAdd"));
            }
            attributeHandler.addMod(mods);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                // Submitted as i+1 (1-6), not the raw 0-5 slot index - see printVariants,
                // WuxGS-FeatureDisplayBuilder.js, for why.
                let slotIndex = attrHandler.parseInt(selectField) - 1;
                if (isNaN(slotIndex) || slotIndex < 0 || slotIndex >= slotFields.length) {
                    return;
                }
                let slotValue = attrHandler.parseString(slotFields[slotIndex]);
                let separatorIndex = slotValue.indexOf(":");
                if (separatorIndex == -1) {
                    return;
                }
                let technique = WuxTechs.Get(slotValue.substring(separatorIndex + 1));
                if (technique == undefined) {
                    return;
                }
                let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
                let userAffinities = showElementRestricted ? undefined : getUserAffinities(attrHandler);
                if (isCatalog) {
                    let canSelectForAdd = attrHandler.parseString(WuxDef.GetVariable("Popup_InspectShowAdd")) == "on";
                    techniqueAttributeHandler.setTechniqueCatalogInfo(technique,
                        {excludeCurrent: true, userAffinities: userAffinities}, canSelectForAdd);
                } else {
                    // Learned Styles' full-card display has no Select button/
                    // Popup_InspectShowAdd concept at all (the style is already
                    // learned) - just re-render the technique itself.
                    techniqueAttributeHandler.setTechniqueInfo(technique, false,
                        {excludeCurrent: true, userAffinities: userAffinities});
                }
            });
            attributeHandler.run();
        },

        // Lazily populates the technique card associated with an item catalog
        // row (Show/Hide Effects button, printCatalogItemFullDisplay,
        // WuxGS-Base.js) - bound to that row's TechShowEffects checkbox toggling,
        // rather than at catalog-load time (ItemInspectPopupAttributeHandler.
        // setInventoryItemData only writes the "has a technique at all" flag
        // gating whether the button shows, never the technique fields
        // themselves). Only fires on the transition to visible - toggling back
        // off doesn't need to touch anything, the fields already written stay
        // put for next time. An item's associated technique is its own embedded
        // UsableItem technique when it has one, else the first of its shared
        // "common" techniques (item.getCommonTechniques - e.g. every bow-type
        // weapon's shared "Bow" technique); mirrors the ordering
        // ItemInspectPopupAttributeHandler's has-technique check uses.
        // repeaterId defaults to the item catalog's "ItemPopupValues" (identifies
        // the item via Popup_ItemSelectName, the catalog-only select-list field);
        // passing one of the "owned item" repeaters (RepeatingEquipment,
        // RepeatingSyncedEquipment, RepeatingGear, RepeatingConsumables,
        // RepeatingFoods) instead reads the item's name directly from that row's
        // own "Gear"-prefixed ItemName field (performAddSelectedInspectElementItem
        // above always populates it) - a Goods-tagged row resolves to undefined
        // here (WuxItems has no goods), which the item==undefined guard below
        // already handles as a no-op, matching goods items never getting an
        // associated-technique flag in the first place.
        populateItemAssociatedTechnique = function (eventinfo, repeaterId) {
            if (eventinfo.newValue !== "on") {
                return;
            }
            if (repeaterId == undefined) {
                repeaterId = "ItemPopupValues";
            }
            let isCatalog = repeaterId === "ItemPopupValues";
            let attributeHandler = new WorkerAttributeHandler();
            let repeater = new WorkerRepeatingSectionHandler(repeaterId);
            let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);

            let itemNameField = repeater.getFieldName(selectedId, isCatalog
                ? WuxDef.GetVariable("Popup_ItemSelectName")
                : WuxDef.Get("Gear").getVariable(`-${WuxDef.GetVariable("ItemName")}`));
            attributeHandler.addMod([
                itemNameField,
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"), WuxDef.GetVariable("Ancestry"),
                WuxDef.GetVariable("Forme_ShowFromNonElement")
            ]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let item = WuxItems.Get(attrHandler.parseString(itemNameField));
                if (item == undefined) {
                    return;
                }
                let technique = (item.itemType == "UsableItem" && item.hasTechnique) ? item.technique
                    : (item.getCommonTechniques ? item.getCommonTechniques()[0] : undefined);
                if (technique == undefined) {
                    return;
                }

                let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
                let userAffinities = showElementRestricted ? undefined : getUserAffinities(attrHandler);

                let techniqueAttributeHandler = new TechniqueDataAttributeHandler(attrHandler, "Action");
                techniqueAttributeHandler.setRepeaterData(repeater, selectedId);
                techniqueAttributeHandler.setTechniqueInfo(technique, false, {excludeCurrent: true, userAffinities: userAffinities});
            });
            attributeHandler.run();
        },

        // Item catalog's quantity field (Popup_ItemSelectCount, printCatalogItemFullDisplay
        // in WuxGS-Base.js) - fires on every edit. Clamps the value to a
        // non-negative integer (writing the corrected value back if the raw
        // input wasn't one - the input's own type="number" min="0" only
        // constrains entry via the browser's native UI, not what a worker
        // actually receives), recomputes this row's own cost display and
        // selected-state flag, then walks every row to recompute the grand
        // total shown in the popup header and whether the Purchase button
        // should be enabled.
        // Shared by updateItemSelectedQuantity (typed edits) and
        // adjustItemSelectedQuantity (+/- stepper buttons) below - given the
        // row's already-clamped newCount, writes its cost/selected-highlight and
        // recomputes the popup-wide grand total and Add/Purchase gating.
        // WorkerAttributeHandler.run() flushes writes with {silent:true}, so a
        // stepper click's own write to the count field would NOT retrigger
        // updateItemSelectedQuantity on its own - both entry points call this
        // directly instead of relying on that.
        recomputeItemSelection = function (attrHandler, repeater, selectedId, newCount) {
            let itemNameVar = WuxDef.GetVariable("Popup_ItemSelectName");
            let itemCountVar = WuxDef.GetVariable("Popup_ItemSelectCount");
            let itemDisplayVar = WuxDef.GetVariable("Popup_ItemSelectDisplay");
            let itemIsOnVar = WuxDef.GetVariable("Popup_ItemSelectIsOn");

            let selectedItem = WuxItems.Get(attrHandler.parseString(repeater.getFieldName(selectedId, itemNameVar)));
            let selectedCost = selectedItem != undefined ? (parseInt(selectedItem.value) || 0) * newCount : 0;
            attrHandler.addUpdate(repeater.getFieldName(selectedId, itemDisplayVar), selectedCost.toString());
            attrHandler.addUpdate(repeater.getFieldName(selectedId, itemIsOnVar), newCount > 0 ? "on" : "0");

            // This row's own field hasn't been flushed to "current" yet this
            // cycle, so use the just-clamped newCount for it specifically and
            // each other row's own stored value for the rest.
            let grandTotal = 0;
            let anySelected = false;
            repeater.ids.forEach(function (id) {
                let rowCount = id === selectedId ? newCount : (attrHandler.parseInt(repeater.getFieldName(id, itemCountVar)) || 0);
                if (rowCount <= 0) {
                    return;
                }
                let rowItem = WuxItems.Get(attrHandler.parseString(repeater.getFieldName(id, itemNameVar)));
                if (rowItem == undefined) {
                    return;
                }
                anySelected = true;
                grandTotal += (parseInt(rowItem.value) || 0) * rowCount;
            });

            attrHandler.addUpdate(WuxDef.GetVariable("Title_InspectionItemCost"), grandTotal > 0 ? `${grandTotal} J` : "");
            let jin = attrHandler.parseInt(WuxDef.GetVariable("Jin"));
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectPurchaseAffordable"), (grandTotal > 0 && jin >= grandTotal) ? "on" : "0");
            // Popup_InspectSelectedList is the technique catalog's own
            // multi-select tracking field, but the "Add" button's
            // HiddenFieldToggle (printAddButton, WuxGS-Base.js) just checks
            // whether it's non-"0" to enable itself - reused here as a plain
            // boolean (no semicolon list needed, since forEachSelectedItem
            // above reads quantities straight from the repeater rows) so the
            // item catalog's Add button enables once anything has a count > 0.
            attrHandler.addUpdate(WuxDef.GetVariable("Popup_InspectSelectedList"), anySelected ? "on" : "0");
        },

        updateItemSelectedQuantity = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("ItemPopupValues");

            let itemCountVar = WuxDef.GetVariable("Popup_ItemSelectCount");
            attributeHandler.getRepeatingSection("ItemPopupValues").addFieldNames([WuxDef.GetVariable("Popup_ItemSelectName"), itemCountVar]);
            attributeHandler.addMod(WuxDef.GetVariable("Jin"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let repeater = attrHandler.getRepeatingSection("ItemPopupValues");
                let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);

                let rawValue = eventinfo.newValue;
                let newCount = parseInt(rawValue);
                if (isNaN(newCount) || newCount < 0) {
                    newCount = 0;
                }
                let countField = repeater.getFieldName(selectedId, itemCountVar);
                if (`${newCount}` !== rawValue) {
                    attrHandler.addUpdate(countField, newCount);
                }

                recomputeItemSelection(attrHandler, repeater, selectedId, newCount);
            });
            attributeHandler.run();
        },

        // +/- stepper buttons (wuxQuantityStepButton, printCatalogItemFullDisplay
        // in WuxGS-Base.js) - piggybacked onto Popup_ItemSelectCount's own max
        // slot (decrement) and "2" suffix (increment), since both are otherwise
        // unused for this field. delta is +1 or -1.
        adjustItemSelectedQuantity = function (eventinfo, delta) {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("ItemPopupValues");

            let itemCountVar = WuxDef.GetVariable("Popup_ItemSelectCount");
            attributeHandler.getRepeatingSection("ItemPopupValues").addFieldNames([WuxDef.GetVariable("Popup_ItemSelectName"), itemCountVar]);
            attributeHandler.addMod(WuxDef.GetVariable("Jin"));

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let repeater = attrHandler.getRepeatingSection("ItemPopupValues");
                let selectedId = repeater.getIdFromFieldName(eventinfo.sourceAttribute);

                let countField = repeater.getFieldName(selectedId, itemCountVar);
                let currentCount = attrHandler.parseInt(countField) || 0;
                let newCount = Math.max(0, currentCount + delta);
                attrHandler.addUpdate(countField, newCount);

                recomputeItemSelection(attrHandler, repeater, selectedId, newCount);
            });
            attributeHandler.run();
        },

        // Loads the next batch (up to 10) of techniques queued by
        // TechniqueInspectPopupAttributeHandler's initial 16-cap
        // (Popup_LoadMore's _max slot - see writeRemainingQueue,
        // splitAtTechniqueCap), appending new rows to the same catalog
        // repeater. Doesn't call initializePopup - that would reset the
        // player's current multi-select, which a Load More click must leave
        // untouched. No popup-type gating, same precedent as
        // swapCatalogTechniqueVariant above - the button is only interactable
        // while the technique catalog is actually showing it.
        loadMoreCatalogTechniques = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("TechPopupValues");

            let queueField = WuxDef.GetVariable("Popup_LoadMore", WuxDef._max);
            let showAddField = WuxDef.GetVariable("Popup_InspectShowAdd");
            attributeHandler.addMod([
                queueField, showAddField,
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"),
                WuxDef.GetVariable("Ancestry"), WuxDef.GetVariable("Forme_ShowFromNonElement")
            ]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let queuedItems = [];
                try {
                    let parsed = JSON.parse(attrHandler.parseString(queueField));
                    if (Array.isArray(parsed)) queuedItems = parsed;
                } catch (e) { /* not JSON (e.g. "0") - nothing queued */ }

                let inspectPopupAttrHandler = new TechniqueInspectPopupAttributeHandler(attrHandler);
                inspectPopupAttrHandler.canSelectForAdd = attrHandler.parseString(showAddField) == "on";
                let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
                inspectPopupAttrHandler.catalogUserAffinities = showElementRestricted ? undefined : getUserAffinities(attrHandler);

                let { visibleItems, remainingItems } = inspectPopupAttrHandler.splitAtTechniqueCap(queuedItems, 10);
                let repeater = attrHandler.getRepeatingSection("TechPopupValues");
                visibleItems.forEach(function (itemData) {
                    let id = repeater.generateRowId();
                    inspectPopupAttrHandler.setInventoryItemData(id, itemData);
                });
                inspectPopupAttrHandler.writeRemainingQueue(remainingItems);
            });
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },

        // Item catalog's own Load More (see loadMoreCatalogTechniques above,
        // which this mirrors) - suffix "1" throughout, matching
        // ItemInspectPopupAttributeHandler.writeRemainingQueue. No canSelectForAdd/
        // Popup_InspectShowAdd gating here - the item catalog has no Select button
        // yet (selection/adding is a later pass, same scoping as when the catalog
        // display itself was first built).
        loadMoreCatalogItems = function () {
            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addRepeatingSection("ItemPopupValues");

            let queueField = WuxDef.GetVariable("Popup_LoadMore", "1" + WuxDef._max);
            attributeHandler.addMod([
                queueField,
                WuxDef.GetVariable("Affinity"), WuxDef.GetVariable("AdvancedAffinity"),
                WuxDef.GetVariable("Ancestry"), WuxDef.GetVariable("Forme_ShowFromNonElement")
            ]);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let queuedItems = [];
                try {
                    let parsed = JSON.parse(attrHandler.parseString(queueField));
                    if (Array.isArray(parsed)) queuedItems = parsed;
                } catch (e) { /* not JSON (e.g. "0") - nothing queued */ }

                let inspectPopupAttrHandler = new ItemInspectPopupAttributeHandler(attrHandler);
                let showElementRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement")) != "0";
                inspectPopupAttrHandler.catalogUserAffinities = showElementRestricted ? undefined : getUserAffinities(attrHandler);

                let { visibleItems, remainingItems } = inspectPopupAttrHandler.splitAtTechniqueCap(queuedItems, 10);
                let repeater = attrHandler.getRepeatingSection("ItemPopupValues");
                visibleItems.forEach(function (itemData) {
                    let id = repeater.generateRowId();
                    inspectPopupAttrHandler.setInventoryItemData(id, itemData);
                });
                inspectPopupAttrHandler.writeRemainingQueue(remainingItems);
            });
            let loader = new LoadingScreenHandler(attributeHandler);
            loader.run();
        },

        addSelectedInspectElement = function () {
            Debug.Log("Add SelectedInspection");
            getOpenInspectionPopup((inspectPopup) => {
                inspectPopup.addItem();
                inspectPopup.close();
                inspectPopup.attributeHandler.run();
            });
        },

        addSelectedInspectElement2 = function () {
            Debug.Log("Add SelectedInspection 2");
            getOpenInspectionPopup((inspectPopup) => {
                inspectPopup.addItem2();
                inspectPopup.close();
                inspectPopup.attributeHandler.run();
            });
        };

    const performItemFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxItems.Filter(filters);
        let groups = {};
        // WuxItems.Filter already constructs a full item (including its own
        // embedded TechniqueData) for every match, just to read .category/.group
        // here - cache those instances so the catalog population step (below,
        // ItemInspectPopupAttributeHandler.setInventoryItemData) doesn't call
        // WuxItems.Get() a second time for the up-to-16 items it actually renders.
        // WuxItems.Get never caches (WJS-TechDef.js), so every call reconstructs
        // a fresh object from scratch - this mirrors the technique catalog's own
        // variantsByName precompute-and-thread pattern (performStyleFilterInspection).
        let itemCache = new Map();
        for (let item of filteredItems) {
            if (item == undefined) continue;
            itemCache.set(item.name, item);
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        openItemInspectionWithLoadingScreen(title, inventoryItems, addType, itemCache);
    };

    const openItemFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Item Filter Inspection");
        performItemFilterInspection(filters, title, addType);
    };

    const openConsumableInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Consumable Popup");
        let inspectPopup = new ConsumablesInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const openConsumableFilterInspection = function (filters, title) {
        Debug.Log("Open Consumable Filter Inspection");
        let inventoryItems = new FilteredItemsInventoryItemHandler(filters);
        let attributeHandler = new WorkerAttributeHandler();
        let inspectPopup = new ConsumablesInspectionPopup(attributeHandler);
        inspectPopup.open(title, inventoryItems.items, ["Add Consumable", "Purchase Consumable"]);
        attributeHandler.run();
    };

    const performItemListInspection = function (items, title, addType) {
        let inventoryItems = new ItemListInventoryItemHandler(items);
        openItemInspectionWithLoadingScreen(title, inventoryItems.items, addType, inventoryItems.itemCache);
    };

    const openItemListInspection = function (items, title, addType) {
        Debug.Log("Open Item List Inspection");
        performItemListInspection(items, title, addType);
    };

    const performStyleFilterInspection = function (filters, title) {
        // Also returns the variants list it already fetched (not just display/
        // iconAffinities) - addTierGroup below collects these into variantsByName
        // so the catalog card population step (TechniqueInspectPopupAttributeHandler.
        // setInventoryItemData -> setTechniqueVariants, WJS-Service.js) doesn't have
        // to call WuxTechs.Filter(style=name) a second time for the same technique
        // moments later. WuxTechs.Get/Filter never cache (WJS-TechDef.js) - every
        // call reconstructs a fresh TechniqueData + effects/formulas, so avoiding a
        // second identical call per rendered card is a real, measurable saving.
        let displayCallback = function (technique) {
            let iconAffinities = technique.getAffinityParts();
            let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));

            for (let i = 0; i < variants.length; i++) {
                let variantTechnique = variants[i];
                let variantParts = variantTechnique.getAffinityParts();
                for (let j = 0; j < variantParts.length; j++) {
                    if (!iconAffinities.includes(variantParts[j])) {
                        iconAffinities.push(variantParts[j]);
                    }
                }
            }
            return { display: technique.name, iconAffinities: iconAffinities, variants: variants };
        };

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addRepeatingSection("RepeatingStyles");
        let formeNameVar = WuxDef.GetVariable("Forme_Name");
        attributeHandler.getRepeatingSection("RepeatingStyles").addFieldNames([formeNameVar]);
        attributeHandler.addMod([
            WuxDef.GetVariable("Forme_ShowFromNonElement"),
            WuxDef.GetVariable("Forme_ShowLevelRestricted"),
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("CR", WuxDef._max)
        ]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let showFromNonElement = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement"));
            let showLevelRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowLevelRestricted"));
            let userAffinities = getUserAffinities(attrHandler);
            let userCr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));

            // Styles the character already has learned should never show up in the
            // catalog at all - previously they were still listed (relying on
            // toggleSelectedItem to skip charging points for them again), which was
            // confusing since selecting one visibly did nothing. Read directly from
            // RepeatingStyles (the same source selectItem/addItem already use for
            // this exact purpose) rather than the "Technique" build-stats draft
            // (WuxStyleWorkerBuild.getStyles()) - that draft is a derived/cached
            // blob that can drift out of sync with the actual learned-style rows
            // (confirmed via diagnostic logging: it read back completely empty on
            // a character with several learned styles still present in
            // RepeatingStyles), so it's not a reliable source for this check.
            let styleRepeater = attrHandler.getRepeatingSection("RepeatingStyles");
            let learnedStyleNames = new Set(styleRepeater.ids.map(id =>
                attrHandler.parseString(styleRepeater.getFieldName(id, formeNameVar))));

            let matchesAffinity = function (style) {
                if (showFromNonElement !== "0") return true;
                if (style.affinity === "") return true;
                let affinityParts = style.affinity.split(";").map(s => s.trim());
                return affinityParts.some(part => userAffinities.includes(part));
            };

            let baseStyles = getFilteredBaseStyles(filters).filter(function (style) {
                return !learnedStyleNames.has(style.name);
            });
            let learnableStyles = baseStyles.filter(function (style) {
                return matchesAffinity(style) && style.tier <= userCr;
            });
            let unlearnableStyles = showLevelRestricted !== "0"
                ? baseStyles.filter(function (style) { return matchesAffinity(style) && style.tier > userCr; })
                : [];

            let inventoryItemHandler = new InspectionInventoryItemHandler();
            let sortedStyles = WuxTechs.SortFilteredTechniquesByRequirement(learnableStyles.concat(unlearnableStyles));
            let maxTier = 9;
            // Populated by displayCallback below (variants list it already fetched
            // per technique) - threaded into openTechniqueInspectionWithLoadingScreen
            // so catalog population can skip re-fetching the same variants.
            let variantsByName = new Map();

            let addTierGroup = function (tier, isLearnable) {
                let tierData = sortedStyles.get(tier);
                tierData.iterate(function (techsByAffinity, affinity) {
                    if (techsByAffinity.length === 0) return;

                    let level = Format.GetLevelPrerequisites(tier);
                    let requirementParts = [];
                    if (level > 0) {
                        requirementParts.push(`Min. Level ${level}`);
                    }
                    if (affinity !== "") {
                        let affinityParts = affinity.split(";").map(s => s.trim()).filter(s => s !== "");
                        let coreElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
                        if (coreElements.every(element => affinityParts.includes(element))) {
                            requirementParts.push("Able to cast magic");
                        } else {
                            requirementParts.push(`${formatListWithOr(affinityParts)} affinity`);
                        }
                    }
                    let requirementText = requirementParts.length > 0 ? requirementParts.join(", ") : "Level 1";
                    let itemTitle = isLearnable
                        ? `Requirements: ${requirementText}`
                        : `*- You do not meet Requirements -* ${requirementText}`;
                    inventoryItemHandler.addItem(new InspectionInventoryItem(itemTitle, "", true, affinity, tier));

                    techsByAffinity.forEach(function (technique) {
                        let result = displayCallback(technique);
                        variantsByName.set(technique.name, result.variants);
                        inventoryItemHandler.addItem(new InspectionInventoryItem(result.display, technique.name, false, undefined, undefined, result.iconAffinities));
                    });
                });
            };

            for (let tier = Math.min(maxTier, userCr); tier >= 1; tier--) {
                addTierGroup(tier, true);
            }
            if (showLevelRestricted !== "0") {
                for (let tier = userCr + 1; tier <= maxTier; tier++) {
                    addTierGroup(tier, false);
                }
            }

            openTechniqueInspectionWithLoadingScreen(title, inventoryItemHandler.items, ["Add Style"], variantsByName);
        });

        attributeHandler.run();
    };

    const openCustomStyleFilterInspection = function (filters, title) {
        Debug.Log("Open Custom Style Filter Inspection");
        performStyleFilterInspection(filters, title);
    };

    const shuffleArray = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    const formatListWithOr = function (items) {
        if (items.length === 1) return items[0];
        if (items.length === 2) return `${items[0]} or ${items[1]}`;
        return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
    };

    // Picks up to maxCount styles: first guaranteeing skill variety (one style per skill,
    // preferring the highest tier learnable), then filling remaining slots with each skill's
    // next-highest-tier style round-robin, then any leftover item-trait-only matches.
    // Ties are broken randomly at every step.
    const selectTopRecommendedStyles = function (recommendedStyles, styleNameToSkills, maxCount) {
        let skillToStyles = new Map();
        let noSkillStyles = [];
        for (let i = 0; i < recommendedStyles.length; i++) {
            let style = recommendedStyles[i];
            let skills = styleNameToSkills.get(style.name);
            if (skills == undefined || skills.size === 0) {
                noSkillStyles.push(style);
                continue;
            }
            skills.forEach(function (skill) {
                if (!skillToStyles.has(skill)) skillToStyles.set(skill, []);
                skillToStyles.get(skill).push(style);
            });
        }

        let sortByTierDesc = function (styles) {
            shuffleArray(styles);
            styles.sort(function (a, b) { return b.tier - a.tier; });
        };
        skillToStyles.forEach(function (styles) { sortByTierDesc(styles); });
        sortByTierDesc(noSkillStyles);

        let skillKeys = shuffleArray([...skillToStyles.keys()]);
        let cursors = {};
        skillKeys.forEach(function (skill) { cursors[skill] = 0; });

        let selected = [];
        let selectedNames = new Set();
        let addedThisRound = true;
        while (selected.length < maxCount && addedThisRound) {
            addedThisRound = false;
            for (let i = 0; i < skillKeys.length && selected.length < maxCount; i++) {
                let skill = skillKeys[i];
                let styles = skillToStyles.get(skill);
                while (cursors[skill] < styles.length && selectedNames.has(styles[cursors[skill]].name)) {
                    cursors[skill]++;
                }
                if (cursors[skill] < styles.length) {
                    let candidate = styles[cursors[skill]];
                    cursors[skill]++;
                    selected.push(candidate);
                    selectedNames.add(candidate.name);
                    addedThisRound = true;
                }
            }
        }

        for (let i = 0; i < noSkillStyles.length && selected.length < maxCount; i++) {
            let candidate = noSkillStyles[i];
            if (selectedNames.has(candidate.name)) continue;
            selected.push(candidate);
            selectedNames.add(candidate.name);
        }

        return selected;
    };

    const openRecommendedStylesInspection = function () {
        Debug.Log("Open Recommended Styles Inspection");

        let skillWorker = new WuxSkillWorkerBuild();
        let jobWorker = new WuxBasicWorkerBuild("Job");
        let styleWorker = new WuxStyleWorkerBuild();

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addRepeatingSection("RepeatingStyles");
        let formeNameVar = WuxDef.GetVariable("Forme_Name");
        attributeHandler.getRepeatingSection("RepeatingStyles").addFieldNames([formeNameVar]);
        attributeHandler.addMod([
            skillWorker.attrBuildDraft,
            jobWorker.attrBuildDraft,
            styleWorker.attrBuildDraft,
            WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max),
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("CR", WuxDef._max),
            WuxDef.GetVariable("Forme_ShowLevelRestricted")
        ]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            skillWorker.setBuildStatsDraft(attrHandler);
            jobWorker.setBuildStatsDraft(attrHandler);
            styleWorker.setBuildStatsDraft(attrHandler);

            // Build set of all relevant skill titles: trained skills + key skills
            let allSkillTitles = new Set();
            let allSkillDefs = WuxDef.Filter(new DatabaseFilterData("group", "Skill"));

            // Trained skills: build a lookup from variable name -> value
            let skillRanksByVar = {};
            skillWorker.iterateBuildStats(function (buildStat) {
                skillRanksByVar[buildStat.name] = buildStat.value;
            });
            for (let i = 0; i < allSkillDefs.length; i++) {
                let rankVar = allSkillDefs[i].getVariable(WuxDef._rank);
                let rank = skillRanksByVar[rankVar];
                if (rank != null && rank !== "0" && rank !== "") {
                    allSkillTitles.add(allSkillDefs[i].title);
                }
            }

            // Key skills from job styles + learned technique skills
            let keySkillTitles = WuxWorkerSkills.GetKeySkillTitles(jobWorker, styleWorker);
            keySkillTitles.forEach(function (skill) { allSkillTitles.add(skill); });

            // Equipped item traits
            let equippedItemTraits = [];
            try {
                let parsed = JSON.parse(attrHandler.parseString(WuxDef.GetVariable("Gear_EquippedItemTraits", WuxDef._max)));
                if (Array.isArray(parsed)) equippedItemTraits = parsed;
            } catch (e) {}

            // If any item traits are equipped, exclude generic weapon skills from the skill filter
            if (equippedItemTraits.length > 0) {
                allSkillTitles.delete("Aim");
                allSkillTitles.delete("Martial");
            }

            // User affinity data for restrictions (always applied)
            let userAffinities = getUserAffinities(attrHandler);
            let userCr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));

            // Learned style names to exclude - read directly from RepeatingStyles
            // (the same source selectItem/addItem already use for this exact
            // purpose) rather than the "Technique" build-stats draft
            // (styleWorker.getStyles()), which is a derived/cached blob that can
            // drift out of sync with the actual learned-style rows (confirmed via
            // diagnostic logging: it read back completely empty on a character
            // with several learned styles still present in RepeatingStyles).
            let styleRepeater = attrHandler.getRepeatingSection("RepeatingStyles");
            let learnedStyleNames = new Set(styleRepeater.ids.map(id =>
                attrHandler.parseString(styleRepeater.getFieldName(id, formeNameVar))));

            // All base style techniques (techSet == "Style")
            let allStyleNames = [...WuxTechs.GetSortedGroup("style", "Style"), "Style"];
            let allStyleTechs = WuxTechs.Filter([new DatabaseFilterData("style", allStyleNames)]);
            let allBaseStyles = allStyleTechs.filter(function (t) { return t.techSet === "Style"; });

            // Skill filter: styles where any technique has a matching plain skill
            let skillMatchedStyleNames = new Set();
            let styleNameToSkills = new Map();
            if (allSkillTitles.size > 0) {
                let skillMatchedTechs = WuxTechs.Filter([
                    new DatabaseFilterData("skill", [...allSkillTitles]),
                    new DatabaseFilterData("style", allStyleNames)
                ]);
                for (let i = 0; i < skillMatchedTechs.length; i++) {
                    let tech = skillMatchedTechs[i];
                    let baseStyleName = undefined;
                    if (tech.techSet === "Style") {
                        baseStyleName = tech.name;
                    } else {
                        let base = WuxTechs.Get(tech.techSet);
                        if (base != undefined && base.techSet === "Style") {
                            baseStyleName = base.name;
                        }
                    }
                    if (baseStyleName == undefined) continue;
                    skillMatchedStyleNames.add(baseStyleName);
                    if (!styleNameToSkills.has(baseStyleName)) {
                        styleNameToSkills.set(baseStyleName, new Set());
                    }
                    styleNameToSkills.get(baseStyleName).add(tech.skill);
                }
            }

            // Item trait filter: styles where any technique requires an equipped trait
            let itemTraitMatchedStyleNames = new Set();
            if (equippedItemTraits.length > 0) {
                for (let i = 0; i < allBaseStyles.length; i++) {
                    let baseStyle = allBaseStyles[i];
                    let styleTechs = WuxTechs.Filter([new DatabaseFilterData("style", baseStyle.name)]);
                    let matched = false;
                    for (let j = 0; j < styleTechs.length && !matched; j++) {
                        let tech = styleTechs[j];
                        if (!tech.itemTraits || tech.itemTraits === "") continue;
                        let traits = tech.itemTraits.split(";").map(function (s) { return s.trim(); }).filter(function (s) { return s !== ""; });
                        if (traits.some(function (traitKey) {
                            let def = WuxDef.Get(traitKey);
                            return def != undefined && equippedItemTraits.includes(def.getTitle());
                        })) {
                            matched = true;
                        }
                    }
                    if (matched) itemTraitMatchedStyleNames.add(baseStyle.name);
                }
            }

            let showLevelRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowLevelRestricted"));

            // Base criteria shared by learnable and unlearnable styles: skill/trait match, not learned, affinity
            let matchesBaseCriteria = function (style) {
                if (!skillMatchedStyleNames.has(style.name) && !itemTraitMatchedStyleNames.has(style.name)) return false;
                if (learnedStyleNames.has(style.name)) return false;
                if (style.affinity !== "") {
                    let affinityParts = style.affinity.split(";").map(function (s) { return s.trim(); });
                    if (!affinityParts.some(function (part) { return userAffinities.includes(part); })) return false;
                }
                return true;
            };

            let learnableStyles = allBaseStyles.filter(function (style) {
                return matchesBaseCriteria(style) && style.tier <= userCr;
            });
            learnableStyles = selectTopRecommendedStyles(learnableStyles, styleNameToSkills, 12);

            let unlearnableStyles = showLevelRestricted !== "0"
                ? allBaseStyles.filter(function (style) { return matchesBaseCriteria(style) && style.tier > userCr; })
                : [];

            // Build inventory items from the pre-filtered sorted list
            let inventoryItemHandler = new InspectionInventoryItemHandler();
            let sortedStyles = WuxTechs.SortFilteredTechniquesByRequirement(learnableStyles.concat(unlearnableStyles));
            let maxTier = 9;
            // Populated below (variants list already fetched per technique) -
            // threaded into openTechniqueInspectionWithLoadingScreen so catalog
            // population doesn't re-fetch the same variants a second time.
            let variantsByName = new Map();

            let addTierGroup = function (tier, isLearnable) {
                let tierData = sortedStyles.get(tier);
                tierData.iterate(function (techsByAffinity, affinity) {
                    if (techsByAffinity.length === 0) return;

                    let level = Format.GetLevelPrerequisites(tier);
                    let requirementParts = [];
                    if (level > 0) {
                        requirementParts.push(`Min. Level ${level}`);
                    }
                    if (affinity !== "") {
                        let affinityParts = affinity.split(";").map(function (s) { return s.trim(); }).filter(function (s) { return s !== ""; });
                        let coreElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
                        if (coreElements.every(function (element) { return affinityParts.includes(element); })) {
                            requirementParts.push("Able to cast magic");
                        } else {
                            requirementParts.push(`${formatListWithOr(affinityParts)} affinity`);
                        }
                    }
                    let requirementText = requirementParts.length > 0 ? requirementParts.join(", ") : "Level 1";
                    let itemTitle = isLearnable
                        ? `Requirements: ${requirementText}`
                        : `*- You do not meet Requirements -* ${requirementText}`;
                    inventoryItemHandler.addItem(new InspectionInventoryItem(itemTitle, "", true, affinity, tier));

                    techsByAffinity.forEach(function (technique) {
                        let iconAffinities = technique.getAffinityParts();
                        let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
                        variantsByName.set(technique.name, variants);
                        for (let i = 0; i < variants.length; i++) {
                            let variantParts = variants[i].getAffinityParts();
                            for (let j = 0; j < variantParts.length; j++) {
                                if (!iconAffinities.includes(variantParts[j])) iconAffinities.push(variantParts[j]);
                            }
                        }
                        inventoryItemHandler.addItem(new InspectionInventoryItem(technique.name, technique.name, false, undefined, undefined, iconAffinities));
                    });
                });
            };

            // Learnable tiers: highest to lowest
            for (let tier = Math.min(maxTier, userCr); tier >= 1; tier--) {
                addTierGroup(tier, true);
            }
            // Unlearnable tiers (only if requested): lowest to highest
            if (showLevelRestricted !== "0") {
                for (let tier = userCr + 1; tier <= maxTier; tier++) {
                    addTierGroup(tier, false);
                }
            }

            openTechniqueInspectionWithLoadingScreen("Recommended Styles", inventoryItemHandler.items, ["Add Style"], variantsByName);
        });

        attributeHandler.run();
    };

    const openStyleFilterTechniqueInspection = function (eventinfo) {
        Debug.Log("Open Style Filter Technique Inspection");

        // Find the TechAutoFilter definition that matches the button that was pressed
        let allAutoFilters = WuxDef.Filter([new DatabaseFilterData("group", "TechAutoFilter")]);
        let pressedDef = null;
        for (let i = 0; i < allAutoFilters.length; i++) {
            if (allAutoFilters[i].getVariable() === eventinfo.sourceAttribute) {
                pressedDef = allAutoFilters[i];
                break;
            }
        }
        if (pressedDef == null) {
            Debug.Log(`No TechAutoFilter definition found for attribute: ${eventinfo.sourceAttribute}`);
            return;
        }

        // Parse filter rules from the definition's description.
        // Format: "key:value1, value2; key2:value3" where:
        //   ","  separates multiple values for one rule (OR'd together)
        //   ";"  separates additional filter rules on the same line (AND'd together)
        //   "\n" (multiple description entries) also separates rules (AND'd together)
        // Keys map directly to ExtendedTechniqueDatabase sorting properties:
        //   "group", "keywords", "affinity", "style", "tier", "action", etc.
        let description = pressedDef.getDescription();
        if (description === "") {
            Debug.Log(`No filter rules defined for "${pressedDef.getTitle()}"`);
            return;
        }

        let filters = [];
        let rules = description.split("\n").flatMap(line => line.split(";"));
        for (let rule of rules) {
            rule = rule.trim();
            if (rule === "") continue;
            let colonIndex = rule.indexOf(":");
            if (colonIndex === -1) continue;
            let key = rule.substring(0, colonIndex).trim();
            let values = rule.substring(colonIndex + 1).split(",").map(v => v.trim()).filter(v => v !== "");
            if (values.length === 0) continue;
            filters.push(new DatabaseFilterData(key, values.length === 1 ? values[0] : values));
        }

        if (filters.length === 0) {
            Debug.Log(`No valid filter rules found for "${pressedDef.getTitle()}"`);
            return;
        }
        Debug.Log(`Filters: ${JSON.stringify(filters)}`);

        performStyleFilterInspection(filters, pressedDef.getTitle());
    };

    const performPerkFilterInspection = function (filters, title) {
        let matchingPerks = WuxPerks.Filter(filters);
        let techniques = [];
        let techniqueIconAffinities = {};
        for (let perk of matchingPerks) {
            Debug.Log(`Found Perk ${perk.name}`);
            let technique = WuxTechs.Get(perk.name);
            if (technique == undefined) continue;
            let iconAffinities = technique.getAffinityParts();
            let variants = WuxTechs.Filter(new DatabaseFilterData("style", technique.name));
            for (let i = 0; i < variants.length; i++) {
                let variantParts = variants[i].getAffinityParts();
                for (let j = 0; j < variantParts.length; j++) {
                    if (!iconAffinities.includes(variantParts[j])) {
                        iconAffinities.push(variantParts[j]);
                    }
                }
            }
            techniqueIconAffinities[technique.name] = iconAffinities;
            techniques.push(technique);
        }

        let attributeHandler = new WorkerAttributeHandler();
        attributeHandler.addMod([
            WuxDef.GetVariable("Forme_ShowFromNonElement"),
            WuxDef.GetVariable("Forme_ShowLevelRestricted"),
            WuxDef.GetVariable("Affinity"),
            WuxDef.GetVariable("AdvancedAffinity"),
            WuxDef.GetVariable("Ancestry"),
            WuxDef.GetVariable("CR", WuxDef._max)
        ]);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let showFromNonElement = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowFromNonElement"));
            let showLevelRestricted = attrHandler.parseString(WuxDef.GetVariable("Forme_ShowLevelRestricted"));
            let userAffinities = getUserAffinities(attrHandler);
            let userCr = attrHandler.parseInt(WuxDef.GetVariable("CR", WuxDef._max));

            let filteredTechniques = techniques.filter(function (technique) {
                if (showFromNonElement === "0") {
                    if (technique.affinity.includes(";")) {
                        let affinityParts = technique.affinity.split(";").map(s => s.trim());
                        if (!affinityParts.some(part => userAffinities.includes(part))) return false;
                    } else if (technique.affinity !== "" && !userAffinities.includes(technique.affinity)) {
                        return false;
                    }
                }
                if (showLevelRestricted === "0") {
                    if (technique.tier > userCr) return false;
                }
                return true;
            });

            let sortedTechniques = WuxTechs.SortFilteredTechniquesByRequirement(filteredTechniques);
            let sortedItems = [];
            for (let tier = 1; tier <= 9; tier++) {
                let tierData = sortedTechniques.get(tier);
                tierData.iterate(function (techsByAffinity, affinity) {
                    if (techsByAffinity.length == 0) return;
                    let level = Format.GetLevelPrerequisites(tier);
                    let itemTitle = level > 0 ? `Level ${level}` : "";
                    if (affinity !== "") {
                        itemTitle = itemTitle !== "" ? `${affinity} - ${itemTitle}` : affinity;
                    }
                    if (itemTitle === "") itemTitle = "Level 1";
                    sortedItems.push(new InspectionInventoryItem(itemTitle, "", true, affinity, tier));
                    techsByAffinity.forEach(function (technique) {
                        let iconAffinities = techniqueIconAffinities[technique.name] || [];
                        sortedItems.push(new InspectionInventoryItem(technique.name, technique.name, false, technique.affinity, technique.tier, iconAffinities));
                    });
                });
            }

            let attributeHandler2 = new WorkerAttributeHandler();
            let inspectPopup = new PerkTechniqueInspectionPopup(attributeHandler2);
            inspectPopup.open(title, sortedItems, ["Add Perk Technique"]);
            attributeHandler2.run();
        });

        attributeHandler.run();
    };

    const openPerkFilterTechniqueInspection = function (eventinfo) {
        Debug.Log("Open Perk Filter Technique Inspection");

        let allPerkFilters = WuxDef.Filter([new DatabaseFilterData("group", "PerkAutoFilter")]);
        let pressedDef = null;
        for (let i = 0; i < allPerkFilters.length; i++) {
            if (allPerkFilters[i].getVariable() === eventinfo.sourceAttribute) {
                pressedDef = allPerkFilters[i];
                break;
            }
        }
        if (pressedDef == null) {
            Debug.Log(`No PerkAutoFilter definition found for attribute: ${eventinfo.sourceAttribute}`);
            return;
        }

        let description = pressedDef.getDescription();
        if (description === "") {
            Debug.Log(`No filter rules defined for "${pressedDef.getTitle()}"`);
            return;
        }

        let filters = [];
        let rules = description.split("\n").flatMap(line => line.split(";"));
        for (let rule of rules) {
            rule = rule.trim();
            if (rule === "") continue;
            let colonIndex = rule.indexOf(":");
            if (colonIndex === -1) continue;
            let key = rule.substring(0, colonIndex).trim();
            let values = rule.substring(colonIndex + 1).split(",").map(v => v.trim()).filter(v => v !== "");
            if (values.length === 0) continue;
            filters.push(new DatabaseFilterData(key, values.length === 1 ? values[0] : values));
        }

        if (filters.length === 0) {
            Debug.Log(`No valid filter rules found for "${pressedDef.getTitle()}"`);
            return;
        }

        performPerkFilterInspection(filters, pressedDef.getTitle());
    };

    const openGearInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Gear Popup");
        let inspectPopup = new GearInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const performGearFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxItems.Filter(filters);
        let groups = {};
        for (let item of filteredItems) {
            if (item == undefined) continue;
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        let attributeHandler = new WorkerAttributeHandler();
        openGearInspection(attributeHandler, title, inventoryItems, addType);
        attributeHandler.run();
    };

    const openGearFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Gear Filter Inspection");
        performGearFilterInspection(filters, title, addType);
    };

    const openGoodsInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Goods Popup");
        let inspectPopup = new GoodsInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const performGoodsFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxGoods.Filter(filters);
        let groups = {};
        for (let item of filteredItems) {
            if (item == undefined) continue;
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        let attributeHandler = new WorkerAttributeHandler();
        openGoodsInspection(attributeHandler, title, inventoryItems, addType);
        attributeHandler.run();
    };

    const openGoodsFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Goods Filter Inspection");
        performGoodsFilterInspection(filters, title, addType);
    };

    const openGoodsForGearInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Goods For Gear Popup");
        let inspectPopup = new GoodsForGearInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const performGoodsForGearFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxGoods.Filter(filters);
        let groups = {};
        for (let item of filteredItems) {
            if (item == undefined) continue;
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        let attributeHandler = new WorkerAttributeHandler();
        openGoodsForGearInspection(attributeHandler, title, inventoryItems, addType);
        attributeHandler.run();
    };

    const openGoodsForGearFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Goods For Gear Filter Inspection");
        performGoodsForGearFilterInspection(filters, title, addType);
    };

    const openFoodsInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Foods Popup");
        let inspectPopup = new FoodsInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const performFoodsFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxItems.Filter(filters);
        let groups = {};
        for (let item of filteredItems) {
            if (item == undefined) continue;
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        let attributeHandler = new WorkerAttributeHandler();
        openFoodsInspection(attributeHandler, title, inventoryItems, addType);
        attributeHandler.run();
    };

    const openFoodsFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Foods Filter Inspection");
        performFoodsFilterInspection(filters, title, addType);
    };

    const openIngsInspection = function (attributeHandler, inventoryTitle, inventoryItems, addType) {
        Debug.Log("Open Ings Popup");
        let inspectPopup = new IngsInspectionPopup(attributeHandler);
        inspectPopup.open(inventoryTitle, inventoryItems, addType);
    };

    const performIngsFilterInspection = function (filters, title, addType) {
        let filteredItems = WuxGoods.Filter(filters);
        let groups = {};
        for (let item of filteredItems) {
            if (item == undefined) continue;
            let subGroupKey = item.category;
            if (!groups[subGroupKey]) {
                let subGroupTitle = item.category !== "" ? `${item.group} (${item.category})` : item.group;
                groups[subGroupKey] = { title: subGroupTitle, items: [] };
            }
            groups[subGroupKey].items.push(new InspectionInventoryItem(item.name, item.name, false, "", 0, []));
        }
        let groupKeys = Object.keys(groups).sort();
        let inventoryItems = [];
        for (let key of groupKeys) {
            inventoryItems.push(new InspectionInventoryItem(groups[key].title, "", true));
            inventoryItems = inventoryItems.concat(groups[key].items);
        }
        let attributeHandler = new WorkerAttributeHandler();
        openIngsInspection(attributeHandler, title, inventoryItems, addType);
        attributeHandler.run();
    };

    const openIngsFilterInspection = function (filters, title, addType) {
        Debug.Log("Open Ings Filter Inspection");
        performIngsFilterInspection(filters, title, addType);
    };

    return {
        OpenItemInspection: openItemInspection,
        OpenItemFilterInspection: openItemFilterInspection,
        OpenItemListInspection: openItemListInspection,
        OpenTechniqueInspection: openTechniqueInspection,
        OpenTechniqueInspectionWithLoadingScreen: openTechniqueInspectionWithLoadingScreen,
        OpenItemInspectionWithLoadingScreen: openItemInspectionWithLoadingScreen,
        OpenPerkTechniqueInspection: openPerkTechniqueInspection,
        OpenStyleFilterTechniqueInspection: openStyleFilterTechniqueInspection,
        OpenPerkFilterTechniqueInspection: openPerkFilterTechniqueInspection,
        OpenCustomStyleFilterInspection: openCustomStyleFilterInspection,
        OpenConsumableInspection: openConsumableInspection,
        OpenConsumableFilterInspection: openConsumableFilterInspection,
        OpenGearInspection: openGearInspection,
        OpenGearFilterInspection: openGearFilterInspection,
        OpenGoodsInspection: openGoodsInspection,
        OpenGoodsFilterInspection: openGoodsFilterInspection,
        OpenGoodsForGearInspection: openGoodsForGearInspection,
        OpenGoodsForGearFilterInspection: openGoodsForGearFilterInspection,
        OpenFoodsInspection: openFoodsInspection,
        OpenFoodsFilterInspection: openFoodsFilterInspection,
        OpenIngsInspection: openIngsInspection,
        OpenIngsFilterInspection: openIngsFilterInspection,
        OpenRecommendedStylesInspection: openRecommendedStylesInspection,
        SelectInspectionItemFromActiveGroup: selectInspectionItemFromActiveGroup,
        SwapCatalogTechniqueVariant: swapCatalogTechniqueVariant,
        PopulateItemAssociatedTechnique: populateItemAssociatedTechnique,
        UpdateItemSelectedQuantity: updateItemSelectedQuantity,
        AdjustItemSelectedQuantity: adjustItemSelectedQuantity,
        LoadMoreCatalogTechniques: loadMoreCatalogTechniques,
        LoadMoreCatalogItems: loadMoreCatalogItems,
        Close: close,
        AddSelectedInspectElement: addSelectedInspectElement,
        AddSelectedInspectElement2: addSelectedInspectElement2
    };
}());

