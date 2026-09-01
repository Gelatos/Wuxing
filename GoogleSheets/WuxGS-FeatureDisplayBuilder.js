class BaseFeatureDisplayBuilder {
    constructor() {
        this.featureBonusClasses = "";
    }
    
    setFeatureBonusClasses(featureBonusClasses) {
        this.featureBonusClasses = featureBonusClasses;
    }

    print () {
        return `<div class="wuxFeature${this.featureBonusClasses != "" ? ` ${this.featureBonusClasses}` : ""}">
            ${this.printHeaderBlock()}
            ${this.printInfoBlock()}
        </div>
        `;
    }

    // WuxSheetMain.Button's <div>-based markup - same one RankUp/RankDown/the
    // status More Info button already use with no issues. An earlier attempt
    // to wrap this in a <span> instead (on the theory that a nested <div>
    // inside <strong>/<span> breaks parsing) turned out to be solving the
    // wrong problem - HTML doesn't actually auto-correct that nesting, and
    // the <span> version broke the trigger checkbox's own hiding (a stray
    // white box appeared behind the button text). The Field methods that
    // embed this (printTraitsField, etc.) are responsible for not nesting it
    // inside an inline-only wrapper themselves.
    // "wuxManualButton", not "wuxTooltipButton" - that name is already a
    // large, unrelated pre-existing class (a roll-template chat-message
    // hover-tooltip-button system, WCSS-Specialized.css) with its own
    // hover/color/content-reveal rules, which this was silently inheriting
    // and fighting against (that's what caused the orange hover color and
    // other styling that no override seemed to fully fix). Shared by both
    // technique and item display builders - every hover tooltip in both
    // families has been converted to one of these, opening the Manual
    // popup with the tooltip's content instead of showing it on hover.
    printMoreInfoButton (name, moreInfoFieldName) {
        return WuxSheetMain.Button(moreInfoFieldName, name, "wuxManualButton");
    }

    printHeaderBlock() {}
    printHeaderBlockField(contents) {
        return `<div class="wuxFeatureHeader">
            <div class="wuxFeatureHeaderDisplayBlock">
                <div class="wuxFeatureHeaderDisplayTitleBlock">
                    ${this.printName()}
                    ${this.printVariants()}
                    ${this.printRankButtons()}
                    ${this.printActionType()}
                </div>
                ${contents}
            </div>
        </div>`;

    }

    printName() {}
    printNameField (contents) {
        return `<div class="wuxFeatureHeaderName">${contents}</div>`;
    }

    printVariants() {}

    // Increase/Decrease Rank - only TechniqueRepeaterDisplayBuilderUsable
    // overrides this (RepeatingFormeTech is the only repeater with a rank to
    // change). Explicit "" (not the bare no-return stub printVariants() uses
    // above, which prints literally as the string "undefined" unless every
    // other subclass remembers to override it back to "" - see
    // BaseTechniqueDisplayBuilder's own printVariants() comment) since every
    // other caller here (items, static/non-repeater technique displays) has
    // nothing to print for this.
    printRankButtons() {
        return "";
    }

    printActionType() {}
    printActionTypeField (input, contents) {
        return `${input}
        <div class="wuxFeatureHeaderDisplayInfoActionType">${contents}</div>`;
    }

    printInfoBlock() {
        return `<div class="wuxFeatureInfoDisplayBlock">
            ${this.printTrigger()}
            ${this.printTraits()}
            ${this.printFlavorText()}
            ${this.printCoreEffects()}
            ${this.printOnEnter()}
            ${this.printCheckEffects()}
            ${this.printEndEffects()}
            ${this.printWillBreakEffects()}
        </div>`;
    }
    printInfoBlockField(contents) {
        return `<div class="wuxFeatureInfoDisplayBlock">
            ${contents}
        </div>`;
    }

}

class BaseTechniqueDisplayBuilder extends BaseFeatureDisplayBuilder {
    constructor() {
        super();
    }

    // BaseFeatureDisplayBuilder's own printVariants() stub returns undefined
    // (no return statement), which prints literally as the string "undefined" -
    // TechniqueRepeaterDisplayBuilder (real variant-switcher buttons) overrides
    // this with actual content, but every static/non-repeater technique builder
    // (TechniqueDisplayBuilder and its subclasses) never did, matching the same
    // bug already fixed for BaseItemDisplayBuilder.
    printVariants() {
        return "";
    }

    // Technique-scoped override of BaseFeatureDisplayBuilder.printTooltip -
    // moreInfoFieldName is a per-technique-instance, per-section trigger
    // attribute (see TechniqueDisplayBuilder's call sites, which mint one via
    // this.displayData.definition.getAttribute("_moreinfo_<section>") - an
    // arbitrary suffix string, not a pre-registered WuxDef modifier, same
    // mechanism WuxDef._moreinfo itself already relies on). Static technique
    // content is fixed at generation time, so the listener that opens the
    // Manual (WuxGS-Backend.js) embeds this exact title/description as
    // literals rather than reading a live attribute - no round-trip needed.
    printTooltip (name, tooltipName, descriptions, moreInfoFieldName) {
        if (descriptions.length > 0) {
            return this.printMoreInfoButton(name, moreInfoFieldName);
        }
        else {
            return this.printSpan(name);
        }
    }

    printHeaderBlock() {
        return this.printHeaderBlockField(
            `<div class="wuxFeatureHeaderDisplayInfoBlock">
            ${this.printRange()}
            ${this.printTargetType()}
        </div>
        <div class="wuxFeatureHeaderDisplayCostBlock">
            ${this.printEnCost()}
            ${this.printWillCost()}
        </div>`);
    }

    printInfoBlock() {
        return this.printInfoBlockField(
            `${this.printTrigger()}
            ${this.printTraits()}
            ${this.printFlavorText()}
            ${this.printCoreEffects()}
            ${this.printOnEnter()}
            ${this.printCheckEffects()}
            ${this.printEndEffects()}
            ${this.printWillBreakEffects()}
            ${this.printEnhancementEffects()}
            ${this.printFilterEditButtons()}`);
    }

    printRange() {}
    printRangeField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoRange">${contents}</div>`
    }

    printTargetType() {}
    printTargetTypeField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoTargetType">${contents}</div>`;
    }

    printEnCost() {}
    printEnCostField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoEnCost">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> ${WuxDef.GetAbbreviation("EN")}</span></div>`;
    }
    printWillCost() {}
    printWillCostField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoWillCost">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> Will</span></div>`;
    }

    printTrigger() {}
    printTriggerField (contents) {
        return `<div class="wuxFeatureHeaderInfoTrigger"><strong>Trigger.</strong> ${contents}</div>`;
    }

    printTraits() {}
    // title used to always be plain text ("Traits"), rendered bold+the
    // trailing "." via a <strong> wrapper ("Traits. {contents}"). Now that
    // title is usually a whole More Info button (a <div>, via
    // WuxSheetMain.Button), it's placed directly instead - a <div> nested
    // inside <strong> is semantically off even though browsers render it
    // fine, and the "." would've glued onto the end of a button rather than
    // a word. Bold is now applied via .wuxFeatureHeaderInfoTraits's own CSS
    // (WCSS-Specialized.css), matching how every other section header here
    // (Core/Check/Will Break/Action) gets its bold from its own container
    // class rather than a native <strong> tag.
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits">${title} ${contents}</div>`;
    }

    printFlavorText() {}
    printFlavorTextField (contents) {
        return `<div class="wuxFeatureHeaderInfoFlavor">${contents}</div>`;
    }

    printCoreEffects() {}
    printCoreEffectsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Core">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Core">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printOnEnter() {}
    printOnEnterField(contents) {
        return `<div class="wuxFeatureHeaderInfoEffectOnEnter"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${contents}</span></div>`;
    }

    printCheckEffects() {}
    printCheckEffectsField (input, title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Check">
            ${input}
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printEndEffects() {}
    printEndEffectsField(contents) {
        return `<div class="wuxFeatureHeaderInfoEffect"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${contents}</span></div>`;
    }

    printWillBreakEffects() {}
    printWillBreakEffectsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-WillBreak">
            <input type="hidden" class="wuxFeatureHeader-flag" value="WillBreak">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    printEnhancementEffects() {}
    // Title_TechEnhancement is a fixed, technique-independent definition (the
    // same writeup for every technique's Enhancement section) - reuses the
    // existing status-effect More Info mechanism directly
    // (WuxWorkerManual.OpenManualWithDefinitions via the definition's own
    // _moreinfo attribute) instead of the per-technique embedded-content path,
    // since there's nothing per-technique to embed.
    printEnhancementEffectsField(contents) {
        let enhancementDef = WuxDef.Get("Title_TechEnhancement");
        let title = this.printMoreInfoButton(enhancementDef.getTitle(), enhancementDef.getAttribute(WuxDef._moreinfo));
        return `<div class="wuxFeatureHeaderInfoEffect-Enhance">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Enhance">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
    }

    // Custom-filter edit mode's per-technique Hide/Show pair - only
    // TechniqueRepeaterDisplayBuilderUsable overrides this (RepeatingFormeTech
    // is the only repeater that's ever in edit mode), same stub-then-override
    // shape as every other printX() here. Explicit "" (not a bare no-return
    // stub, which prints literally as the string "undefined" - see
    // printVariants'/printRankButtons' own comments above) since every other
    // caller (items, static/non-repeater technique displays, the Technique
    // Inspection popup's catalog cards) has nothing to print for this.
    printFilterEditButtons() {
        return "";
    }
}

class TechniqueDisplayBuilder extends BaseTechniqueDisplayBuilder {
    constructor(displayData) {
        super();
        this.displayData = displayData;
    }
    printSpan (contents) {
        return `<span>${contents}</span>`;
    }

    printName() {
        return this.printNameField(this.printSpan(this.displayData.name));
    }
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="${this.displayData.actionType}">`,
            this.printSpan(this.displayData.actionName));
    }
    printRange() {
        return this.printRangeField(
            this.printTooltip(this.displayData.range, "Range", this.displayData.targetDesc,
                this.displayData.definition.getAttribute("_moreinfo_range")));
    }
    printTargetType() {
        if (this.displayData.targetType == "") {
            return "";
        }
        // Same trigger/descriptions as printRange's own button - clicking
        // either opens the exact same Manual entry, since Range and Target
        // Type are two different spots on the card describing the same
        // underlying concept.
        return this.printTargetTypeField(
            this.printTooltip(this.displayData.targetType, "Range", this.displayData.targetDesc,
                this.displayData.definition.getAttribute("_moreinfo_range")));
    }
    printEnCost() {
        if (this.displayData.enCost == "") {
            return "";
        }
        return this.printEnCostField(this.printSpan(this.displayData.enCost));
    }
    printWillCost() {
        if (this.displayData.willCost == "") {
            return "";
        }
        return this.printWillCostField(this.printSpan(this.displayData.willCost));
    }
    printTrigger() {
        if (this.displayData.trigger == "") {
            return "";
        }
        return this.printTriggerField(this.printSpan(this.displayData.trigger));
    }
    printTraits() {
        if (this.displayData.traits == "") {
            return "";
        }
        return this.printTraitsField(
            this.printTooltip("Traits", "Traits", this.displayData.traitsDesc,
                this.displayData.definition.getAttribute("_moreinfo_traits")),
            this.printSpan(this.displayData.traits));
    }
    printFlavorText() {
        if (this.displayData.flavorText == "") {
            return "";
        }
        return this.printFlavorTextField(this.printSpan(this.displayData.flavorText));
    }
    printCoreEffects() {
        if (this.displayData.coreEffect == "") {
            return "";
        }
        return this.printCoreEffectsField(
            this.printTooltip("Effects", "Core Effects", this.displayData.coreEffect.effectTypeDesc,
                this.displayData.definition.getAttribute("_moreinfo_core")),
            this.printSpan(this.displayData.getCoreEffects("\n"))
        );
    }
    // Trait_OnEnter is a fixed, technique-independent definition (same
    // writeup regardless of which technique it's shown on) - reuses the
    // status-effect More Info mechanism directly (definition's own _moreinfo
    // attribute) instead of the per-technique embedded-content path.
    printOnEnter() {
        if (!this.displayData.isOnEnter) {
            return "";
        }
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return this.printOnEnterField(this.printMoreInfoButton("On Enter Effects", onEnterDef.getAttribute(WuxDef._moreinfo)));
    }

    printCheckEffects() {
        if (this.displayData.checkEffect == "") {
            return "";
        }
        return this.printCheckEffectsField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="${this.displayData.coreDefense}">`,
            this.printTooltip(this.displayData.checkType, "Skill Check Effects", this.displayData.checkEffect.effectTypeDesc,
                this.displayData.definition.getAttribute("_moreinfo_check")),
            this.printSpan(this.displayData.getCheckEffects("\n"))
        );
    }
    printEndEffects() {
        if (!this.displayData.endEffectDesc) {
            return "";
        }
        return this.printEndEffectsField(this.printSpan(this.displayData.endEffectDesc));
    }
    printWillBreakEffects() {
        if (this.displayData.willBreakEffect == "") {
            return "";
        }
        return this.printWillBreakEffectsField(
            this.printTooltip("Will Break Effects", "Will Break Effects", this.displayData.willBreakEffect.effectTypeDesc,
                this.displayData.definition.getAttribute("_moreinfo_willbreak")),
            this.printSpan(this.displayData.getWillBreakEffects("\n"))
        );
    }
    printEnhancementEffects() {
        if (this.displayData.enhanceEffect == "") {
            return "";
        }
        return this.printEnhancementEffectsField(
            this.printSpan(this.displayData.getEnhanceEffects("\n"))
        );
    }
}

class TechniqueDisplayBuilderUsable extends TechniqueDisplayBuilder {
    printName() {
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="${this.displayData.getSheetRollTemplate(true)}">
            ${this.printSpan(this.displayData.name)}
        </button>`
        return this.printNameField(contents);
    }
}

class TechniqueDisplayBuilderUsableWithCount extends TechniqueDisplayBuilderUsable {
    setCountAttribute(countAttribute) {
        this.countAttribute = countAttribute;
    }
    printName() {
        // wuxHiddenSingleCount-flag mirrors the count attribute's own value so
        // the adjacent-sibling CSS rule (WCSS-Footer.css) can hide the count
        // span specifically when it's exactly "1" - "1 Longbow"/"1 Heal Gel"
        // is redundant, only 2+ needs the prefix.
        let countInput = this.countAttribute
            ? `<input type="hidden" class="wuxHiddenSingleCount-flag" name="${this.countAttribute}" value="0">
               <span class="wuxFeatureHeaderNameCount" name="${this.countAttribute}">0</span>`
            : "";
        let contents = `${countInput}<button class="wuxFeatureHeaderNameButton" type="roll" value="${this.displayData.getSheetRollTemplate(true)}">
            ${this.printSpan(this.displayData.name)}
        </button>`
        return this.printNameField(contents);
    }
}

class TechniqueRepeaterDisplayBuilder extends BaseTechniqueDisplayBuilder {
    constructor(baseDefinition, rootSuffix) {
        super();
        this.baseDefinition = baseDefinition;
        this.rootSuffix = rootSuffix;
    }

    getActionTypeAttribute (attribute, suffix) {
        if (this.rootSuffix != undefined) {
            suffix = `${suffix != undefined ? suffix : ""}${this.rootSuffix}`;
        }
        return this.baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
    }
    printSpan (fieldName) {
        return `<span name="${fieldName}"></span>`;
    }
    printSpanActionTypeAttribute (attribute, suffix) {
        return `<span name="${this.getActionTypeAttribute(attribute, suffix)}"></span>`;
    }
    // name: the button's own visible label (sometimes itself a live
    // <span name="..."> for a value that changes per-technique, e.g. the
    // check line's "Body vs. Evasion" text). fieldName: the row's own
    // already-computed content attribute (e.g. TechTraits_max) - still used
    // to gate button-vs-plain-text (HiddenSpanFieldToggle), same as when this
    // held an inline tooltip, even though the content itself is no longer
    // rendered here. moreInfoFieldName: the new per-row trigger attribute the
    // button is bound to - clicking it fires a shared listener
    // (WuxGS-Backend.js) that reads fieldName's current value and forwards it
    // to the Manual popup (WuxWorkerManual.OpenManualWithContent,
    // Worker-Manual.js) instead of showing a hover tooltip.
    printAttributeTooltip (name, fieldName, moreInfoFieldName) {
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printMoreInfoButton(name, moreInfoFieldName),
            `${name}`);
    }

    printName() {
        let contents = this.printSpanActionTypeAttribute("TechName");
        return `<input type="hidden" name="${this.getActionTypeAttribute("TechTrueName")}">
        ${this.printNameField(contents)}`;
    }
    printVariants() {
        // 6 slots (2 per attribute pair, base+max - see WJS-Service.js) each hold
        // "ElementName:TechniqueName". CSS matches the ElementName prefix to pick each
        // button's icon (WCSS-Specialized.css). Clicking a button submits its own slot
        // index to the shared select field (pair 3), which Worker-Actions.js /
        // Worker-InspectPopup.js read to find that slot's TechniqueName and swap the
        // display to it. Submitted as i+1 (1-6), not the raw 0-5 index - slot 0's
        // button would otherwise submit "0", the same sentinel this codebase uses
        // everywhere for "off/unset", so if the field's current value was already
        // "0" (its normal resting state), clicking that one button was a no-op:
        // Roll20 only fires change on an actual value transition. Both swap handlers
        // subtract 1 back off before indexing into their own 0-based slot arrays.
        let selectField = this.getActionTypeAttribute("TechVariant", "3");
        let buttons = "";
        for (let i = 0; i < 6; i++) {
            let pairIndex = Math.floor(i / 2);
            let pairSuffix = pairIndex == 0 ? "" : `${pairIndex}`;
            let fieldName = i % 2 == 1
                ? this.getActionTypeAttribute("TechVariant", `${pairSuffix}${WuxDef._max}`)
                : this.getActionTypeAttribute("TechVariant", pairSuffix);
            buttons += `<input type="hidden" class="wuxTechVariant-flag" name="${fieldName}" value="0">
            ${WuxSheetMain.Button(selectField, "", "wuxTechVariantButton", `${i + 1}`)}`;
        }
        // Each slot is a fixed element index (see WJS-Service.js), not sequentially
        // packed, so no single slot reliably indicates "nothing to show" - the whole
        // row hides in CSS instead, based on whether any of the 6 flags is non-empty.
        return `<div class="wuxTechVariantButtons"><span class="wuxTechVariantButtonsLabel">Variants: </span>${buttons}</div>`;
    }
    // The hidden flag input and the visible span both bind to TechActionName -
    // its value is always the action type name optionally followed by
    // " - <limit>" (TechniqueDisplayData.setActionName, WAPI-Database.js), so
    // the flag's live-synced "value" attribute lets CSS pick styling with a
    // prefix match (WCSS-Specialized.css) instead of needing a second,
    // type-only attribute (TechActionType) written just for that.
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechActionName")}">`,
            this.printAttributeTooltip(`<span name="${this.getActionTypeAttribute("TechActionName")}"></span>`,
                this.getActionTypeAttribute("TechActionName", WuxDef._max),
                this.getActionTypeAttribute("TechActionName", WuxDef._moreinfo))
        )
    }
    printRange() {
        let fieldName = this.getActionTypeAttribute("TechRange");
        return WuxSheetMain.HiddenField(fieldName,
            this.printRangeField(
                // Target description is piggybacked onto TechTargetType's max slot.
                this.printAttributeTooltip(`<span name="${fieldName}"></span>`,
                    this.getActionTypeAttribute("TechTargetType", WuxDef._max),
                    this.getActionTypeAttribute("TechTargetType", WuxDef._moreinfo))
            )
        );
    }
    printTargetType() {
        let fieldName = this.getActionTypeAttribute("TechTargetType");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTargetTypeField(
                // Same trigger as Range's own button (both read TechTargetType's
                // max slot/_moreinfo) - clicking either opens the exact same
                // Manual entry, since Range and Target Type are two different
                // spots on the card describing the same underlying concept.
                this.printAttributeTooltip(this.printSpan(fieldName),
                    this.getActionTypeAttribute("TechTargetType", WuxDef._max),
                    this.getActionTypeAttribute("TechTargetType", WuxDef._moreinfo))
            )
        );
    }
    printEnCost() {
        let fieldName = this.getActionTypeAttribute("TechEnCost");
        return WuxSheetMain.HiddenField(fieldName, this.printEnCostField(this.printSpan(fieldName)));
    }
    printWillCost() {
        // Piggybacks on TechEnCost's max slot instead of its own attribute - see WJS-Service.js.
        let fieldName = this.getActionTypeAttribute("TechEnCost", WuxDef._max);
        return WuxSheetMain.HiddenField(fieldName, this.printWillCostField(this.printSpan(fieldName)));
    }
    printTrigger() {
        // Trigger text is piggybacked onto TechRange's max slot.
        let fieldName = this.getActionTypeAttribute("TechRange", WuxDef._max);
        return WuxSheetMain.HiddenField(fieldName, this.printTriggerField(this.printSpan(fieldName)));
    }
    printTraits() {
        let fieldName = this.getActionTypeAttribute("TechTraits");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTraitsField(
                this.printAttributeTooltip("Traits", this.getActionTypeAttribute("TechTraits", WuxDef._max),
                    this.getActionTypeAttribute("TechTraits", WuxDef._moreinfo)),
                this.printSpan(fieldName)
            )
        );
    }
    printFlavorText() {
        let fieldName = this.getActionTypeAttribute("TechFlavorText");
        return WuxSheetMain.HiddenField(fieldName, this.printFlavorTextField(this.printSpan(fieldName)));
    }
    printCoreEffects() {
        let fieldName = this.getActionTypeAttribute("TechCoreEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCoreEffectsField(
                this.printAttributeTooltip("Effects",
                    this.getActionTypeAttribute("TechCoreEffect", WuxDef._max),
                    this.getActionTypeAttribute("TechCoreEffect", WuxDef._moreinfo)),
                this.printSpan(fieldName)
            )
        );
    }
    // Trait_OnEnter is a fixed, technique-independent definition (same
    // writeup regardless of which technique it's shown on) - reuses the
    // status-effect More Info mechanism directly (definition's own _moreinfo
    // attribute) instead of the per-technique embedded-content path.
    printOnEnter() {
        let fieldName = this.getActionTypeAttribute("TechOnEnter");
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return WuxSheetMain.HiddenField(fieldName,
            this.printOnEnterField(this.printMoreInfoButton("On Enter Effects", onEnterDef.getAttribute(WuxDef._moreinfo))));
    }

    // The hidden flag input and the visible title span both bind to
    // TechCoreDefense's max slot (the check title text - "{skill} vs.
    // {defense}", or "DC {n} {skill}" for a flat DC - TechniqueDisplayData,
    // WAPI-Database.js) instead of the flag using the base slot for a
    // separate, type-only value. WCSS-Specialized.css matches the defense
    // name as a substring (" vs. Brace" etc.) since it sits mid-string, and
    // the flat-DC case as a "DC " prefix, rather than needing a second
    // attribute written just for styling.
    printCheckEffects() {
        let fieldName = this.getActionTypeAttribute("TechCheckEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCheckEffectsField(
                `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechCoreDefense", WuxDef._max)}">`,
                this.printAttributeTooltip(this.printSpanActionTypeAttribute("TechCoreDefense", WuxDef._max),
                    this.getActionTypeAttribute("TechCheckEffect", WuxDef._max),
                    this.getActionTypeAttribute("TechCheckEffect", WuxDef._moreinfo)),
                this.printSpan(fieldName)
            )
        );
    }
    printEndEffects() {
        // End effect text is piggybacked onto TechFlavorText's max slot.
        let fieldName = this.getActionTypeAttribute("TechFlavorText", WuxDef._max);
        return WuxSheetMain.HiddenField(fieldName, this.printEndEffectsField(this.printSpan(fieldName)));
    }
    printWillBreakEffects() {
        let fieldName = this.getActionTypeAttribute("TechWillBreakEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printWillBreakEffectsField(
                this.printAttributeTooltip("Will Break Effects",
                    this.getActionTypeAttribute("TechWillBreakEffect", WuxDef._max),
                    this.getActionTypeAttribute("TechWillBreakEffect", WuxDef._moreinfo)),
                this.printSpan(fieldName)
            )
        );
    }
    printEnhancementEffects() {
        // Enhance effect text is piggybacked onto TechOnEnter's max slot.
        let fieldName = this.getActionTypeAttribute("TechOnEnter", WuxDef._max);
        return WuxSheetMain.HiddenField(fieldName,
            this.printEnhancementEffectsField(
                this.printSpan(fieldName)
            )
        );
    }
}

class TechniqueRepeaterDisplayBuilderUsable extends TechniqueRepeaterDisplayBuilder {
    // Filter Edit Mode's own "would this be visible if the filter being
    // edited were applied right now?" indicator - same border+glow the
    // Technique Catalog's selected-card state already uses
    // (wuxCatalogCard-selected-flag, WCSS-Specialized.css). Reads a single
    // combined flag (Forme_Show's max slot, Worker-Actions.js's
    // setFilterEditMode/setTechniqueInFilter) rather than chaining two
    // separate ones in CSS, since it needs to be an immediate sibling of
    // .wuxFeature for the selector to match - that has to happen here, in
    // print() itself, rather than nested inside printInfoBlock like
    // everything else on this class.
    print() {
        let isVisibleFlag = this.getActionTypeAttribute("Forme_Show", WuxDef._max);
        return `<input type="hidden" class="wuxFilterEditVisible-flag" name="${isVisibleFlag}" value="0">
            ${super.print()}`;
    }
    printName() {
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="@{${WuxDef.GetVariable("Action_Use")}}">
            ${this.printSpanActionTypeAttribute("TechName")}
        </button>`
        return this.printNameField(contents);
    }
    printEnhancementEffects() {
        // Enhance effect text is piggybacked onto TechOnEnter's max slot.
        let fieldName = this.getActionTypeAttribute("TechOnEnter", WuxDef._max);
        let enhancementBlock = WuxSheetMain.HiddenField(fieldName, this.printEnhancementEffectsField(this.printSpan(fieldName)));

        // Hidden outright while editing a custom filter - printFilterEditButtons
        // (below) takes over as this technique's action row instead. Every
        // technique gets that in edit mode, not just ones with an enhance
        // effect, so it can't just nest inside this fieldName-gated block -
        // this wraps the WHOLE thing in a second, outer toggle instead.
        // HiddenAuxField shows its content when the flag is "0" (not editing,
        // the default) and hides it otherwise - the mirror image of
        // printFilterEditButtons' own HiddenField below.
        let editModeRowFlag = this.getActionTypeAttribute("Forme_EditFilter", WuxDef._max);
        return WuxSheetMain.HiddenAuxField(editModeRowFlag, enhancementBlock);
    }

    printRankButtons() {
        let rankUpField = this.getActionTypeAttribute("TechRankUp");
        // wuxRankButtonIcon-Up/-Down are empty spans - the triangle itself is
        // drawn in pure CSS (WCSS-Specialized.css), not a text character, so
        // it can't overflow the button's box the way an arrow glyph did.
        let rankUpButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankUp", WuxDef._max),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon wuxRankButtonIcon-Up'></span>", "wuxFeatureButton"),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon wuxRankButtonIcon-Up'></span>", "wuxFeatureButtonDisabled"));
        let rankDownField = this.getActionTypeAttribute("TechRankDown");
        let rankDownButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankDown", WuxDef._max),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon wuxRankButtonIcon-Down'></span>", "wuxFeatureButton"),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon wuxRankButtonIcon-Down'></span>", "wuxFeatureButtonDisabled"));
        let contents = `<div class="wuxTechRankButtons"><span class="wuxTechRankButtonsLabel">Change Rank: </span>${rankDownButton}${rankUpButton}</div>`;

        // Only techniques with an enhancement effect can have their rank
        // increased at all - same gate printEnhancementEffects' own text
        // used to apply to this whole block back when the buttons lived
        // there (TechOnEnter's max slot is empty for a technique with no
        // enhancement effect, so HiddenField hides this row entirely for
        // those instead of showing a permanently-disabled pair of arrows).
        let fieldName = this.getActionTypeAttribute("TechOnEnter", WuxDef._max);
        let rankButtonsBlock = WuxSheetMain.HiddenField(fieldName, contents);

        let editModeRowFlag = this.getActionTypeAttribute("Forme_EditFilter", WuxDef._max);
        return WuxSheetMain.HiddenAuxField(editModeRowFlag, rankButtonsBlock);
    }

    // Show/Hide Effects toggle - same button/format the Gear tab's owned-item
    // technique section and the Learned Styles list already use
    // (printCatalogItemTechniqueSection/addStyleListRepeaterContents,
    // WuxGS-Base.js: wuxShowEffectsButton class, TechShowEffects attribute,
    // HiddenFieldToggle). Name/Variants/Rank buttons (printRankButtons above)
    // and the header's Action Type/Range/Cost row (printHeaderBlockField
    // below) stay visible regardless of this toggle - only printInfoBlock's
    // effects gate on it.
    //
    // Deliberately inverted from what the attribute name suggests: "0"
    // (every never-before-set attribute's own reliable starting value - see
    // every other HiddenFieldToggle in this app) means effects ARE shown;
    // non-"0" means the user explicitly collapsed them. An earlier attempt
    // gave HiddenField's own copy of the flag a "1" default (trying to make
    // shown the default) while HiddenAuxField's own copy stayed hardcoded at
    // "0" (it has no defaultValue parameter to override) - each button's own
    // CSS condition matched its own literal starting value independently, so
    // both showed at once instead of one hiding the other. Building this
    // from the standard, unmodified HiddenFieldToggle - both branches
    // sharing the one default they always agree on - avoids that entirely.
    printShowEffectsToggle() {
        let showEffectsAttr = this.getActionTypeAttribute("TechShowEffects");
        return WuxSheetMain.HiddenFieldToggle(showEffectsAttr,
            WuxSheetMain.Button(showEffectsAttr, "&#9662; Show Effects", "wuxShowEffectsButton"),
            WuxSheetMain.Button(showEffectsAttr, "&#9656; Hide Effects", "wuxShowEffectsButton"));
    }

    // Overrides BaseFeatureDisplayBuilder's own version only to add the
    // toggle button's own row below the header - Name/Variants/Rank
    // buttons/Action Type/Range/Target/Cost (everything printHeaderBlockField
    // already prints) stay visible either way, matching the header of every
    // other technique display in the app; only printInfoBlock's effects
    // (below) collapse.
    printHeaderBlockField(contents) {
        return `${super.printHeaderBlockField(contents)}
            <div class="wuxCatalogSelectSection">
                ${this.printShowEffectsToggle()}
            </div>`;
    }

    // Overrides BaseTechniqueDisplayBuilder's own version to gate everything
    // it normally prints behind TechShowEffects too - except
    // printFilterEditButtons, which stays unwrapped so Hide/Show (custom
    // filter edit mode) still works on a collapsed technique instead of
    // requiring it to be expanded first.
    printInfoBlock() {
        let showEffectsAttr = this.getActionTypeAttribute("TechShowEffects");
        let effectsContent = `${this.printTrigger()}
            ${this.printTraits()}
            ${this.printFlavorText()}
            ${this.printCoreEffects()}
            ${this.printOnEnter()}
            ${this.printCheckEffects()}
            ${this.printEndEffects()}
            ${this.printWillBreakEffects()}
            ${this.printEnhancementEffects()}`;
        // HiddenAuxField (the "0"/default branch), not HiddenField - see
        // printShowEffectsToggle's own comment on why "0" means shown here.
        return this.printInfoBlockField(
            `${WuxSheetMain.HiddenAuxField(showEffectsAttr, effectsContent)}
            ${this.printFilterEditButtons()}`);
    }

    // Custom-filter edit mode's per-technique Hide/Show pair - shown for
    // every technique while editing (Worker-Actions.js's
    // FormeTechniqueDatabaseBase.setFilterEditMode writes editModeRowFlag/
    // inFilterFlag to every row in one pass on entering/exiting edit mode or
    // toggling a technique), regardless of whether that technique also has
    // an enhance effect - see printEnhancementEffects' own edit-mode gate
    // above for why these can't share one block.
    printFilterEditButtons() {
        let editModeRowFlag = this.getActionTypeAttribute("Forme_EditFilter", WuxDef._max);
        let hideField = this.getActionTypeAttribute("Forme_Hide");
        let showField = this.getActionTypeAttribute("Forme_Show");
        // Whether this technique is currently included in the filter being
        // edited - piggybacked onto Forme_Hide's own max slot, same
        // "enabled flag lives on the clickable field's own max slot"
        // convention the rank buttons use above.
        let inFilterFlag = this.getActionTypeAttribute("Forme_Hide", WuxDef._max);
        let hideButton = WuxSheetMain.Button(hideField, "<span class='wuxFeatureButtonIcon'>&#8722;</span> Hide", "wuxFeatureButton");
        let showButton = WuxSheetMain.Button(showField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Show", "wuxFeatureButton");
        let contents = `<div class="wuxFeatureHeaderInfoEffect-EnhanceButtons">${WuxSheetMain.HiddenSpanFieldToggle(inFilterFlag, hideButton, showButton)}</div>`;

        return WuxSheetMain.HiddenField(editModeRowFlag, contents);
    }
}

class BaseItemDisplayBuilder extends BaseFeatureDisplayBuilder {
    constructor() {
        super();
    }

    // Items have no variants concept - overrides the inherited stub (which
    // returns undefined, printed literally as the string "undefined" by
    // printHeaderBlockField's template) with an explicit empty string.
    printVariants() {
        return "";
    }

    printHeaderBlock() {
        return this.printHeaderBlockField(
            `<div class="wuxFeatureHeaderDisplayInfoBlock">
            ${this.printBulk()}
            ${this.printBaseValue()}
        </div>`);
    }

    printInfoBlock() {
        return this.printInfoBlockField(
            `${this.printTraits()}
            ${this.printFlavorText()}`);
    }

    printBulk() {}
    printBulkField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoBulk">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> Bulk</span>${WuxSheetMain.HiddenSpanField(this.getActionTypeAttribute("ItemPerFive"), `<sub class="wuxFeatureHeaderDisplayInfoSubtitle">${WuxDef.GetTitle("ItemPerFive")}</sub>`)}</div>`;
    }
    printBaseValue() {}
    printBaseValueField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoCoin">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> J</span>${WuxSheetMain.HiddenSpanField(this.getActionTypeAttribute("ItemPerFive"), `<sub class="wuxFeatureHeaderDisplayInfoSubtitle">${WuxDef.GetTitle("ItemPerFive")}</sub>`)}</div>`;
    }

    printFlavorText() {}
    printFlavorTextField (contents) {
        return `<div class="wuxFeatureHeaderInfoFlavor">${contents}</div>`;
    }

    printTraits() {}
    // title used to always be plain text ("Traits"), rendered bold+the
    // trailing "." via a <strong> wrapper ("Traits. {contents}"). Now that
    // title is a More Info button (a <div>, via WuxSheetMain.Button), it's
    // placed directly instead - a <div> nested inside <strong> is
    // semantically off even though browsers render it fine, and the "."
    // would've glued onto the end of a button rather than a word. Bold is
    // now applied via .wuxFeatureHeaderInfoTraits's own CSS
    // (WCSS-Specialized.css) - same fix already applied to the technique
    // version of this method.
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits">${title} ${contents}</div>`;
    }
}

class ItemRepeaterDisplayBuilder extends BaseItemDisplayBuilder {
    constructor(baseDefinition, rootSuffix) {
        super();
        this.baseDefinition = baseDefinition;
        this.rootSuffix = rootSuffix;
    }

    getActionTypeAttribute (attribute, suffix) {
        if (this.rootSuffix != undefined) {
            suffix = `${suffix != undefined ? suffix : ""}${this.rootSuffix}`;
        }
        return this.baseDefinition.getAttribute(`-${WuxDef.GetVariable(attribute, suffix)}`);
    }
    printSpan (fieldName) {
        return `<span name="${fieldName}"></span>`;
    }
    printSpanActionTypeAttribute (attribute, suffix) {
        return `<span name="${this.getActionTypeAttribute(attribute, suffix)}"></span>`;
    }
    // name: the button's own visible label (fixed text - items have nothing
    // per-instance like techniques' live effect text to show here instead).
    // fieldName: the row's own already-computed content attribute - still
    // used to gate button-vs-plain-text (HiddenSpanFieldToggle), same as
    // when this held an inline tooltip. moreInfoFieldName: the per-row
    // trigger attribute the button is bound to - clicking it fires a shared
    // listener (WuxGS-Backend.js) that reads fieldName's current value and
    // forwards it to the Manual popup (WuxWorkerManual.OpenManualWithContent,
    // Worker-Gear.js) instead of showing a hover tooltip.
    printAttributeTooltip (name, fieldName, moreInfoFieldName) {
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printMoreInfoButton(name, moreInfoFieldName),
            `${name}`);
    }

    // Optional - folds a quantity prefix into the item's own name (e.g. "2
    // Pistol"), matching TechniqueDisplayBuilderUsableWithCount's identical
    // convention for equipped consumables - only equippedEquipment
    // (WuxGS-Base.js) sets this, since the Gear tab's stored-item repeaters
    // already show their own count via a separate, editable input column.
    setCountAttribute(countAttribute) {
        this.countAttribute = countAttribute;
    }
    printName() {
        // wuxHiddenSingleCount-flag mirrors the count attribute's own value so
        // the adjacent-sibling CSS rule (WCSS-Footer.css) can hide the count
        // span specifically when it's exactly "1" - "1 Longbow"/"1 Heal Gel"
        // is redundant, only 2+ needs the prefix.
        let countInput = this.countAttribute
            ? `<input type="hidden" class="wuxHiddenSingleCount-flag" name="${this.countAttribute}" value="0">
               <span class="wuxFeatureHeaderNameCount" name="${this.countAttribute}">0</span>`
            : "";
        let contents = `${countInput}${this.printSpanActionTypeAttribute("ItemName")}`;
        return this.printNameField(contents);
    }
    // The hidden flag input binds to ItemGroup directly (same field the visible
    // badge already reads) instead of a hardcoded "Item" literal - its value is
    // the item's own group name, optionally followed by " (<category>)"
    // (ItemDisplayData.importItem, WAPI-Database.js), so CSS can style each
    // item type (gear/consumable/goods group) with a prefix match
    // (WCSS-Specialized.css) instead of every item sharing one generic style.
    printActionType () {
        let fieldName = this.getActionTypeAttribute("ItemGroup");
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" name="${fieldName}">`,
            this.printCraftingTooltip(this.printSpan(fieldName)));
    }
    printBulk() {
        let fieldName = this.getActionTypeAttribute("ItemBulk");
        return WuxSheetMain.HiddenField(fieldName, this.printBulkField(this.printSpan(fieldName)));
    }
    printBaseValue() {
        let fieldName = this.getActionTypeAttribute("ItemBaseValue");
        return WuxSheetMain.HiddenField(fieldName, this.printBaseValueField(this.printSpan(fieldName)));
    }
    printFlavorText() {
        let fieldName = this.getActionTypeAttribute("ItemDescription");
        return WuxSheetMain.HiddenField(fieldName, this.printFlavorTextField(this.printSpan(fieldName)));
    }
    printTraits() {
        let fieldName = this.getActionTypeAttribute("ItemTrait");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTraitsField(
                this.printAttributeTooltip("Traits", fieldName, this.getActionTypeAttribute("ItemTrait", WuxDef._moreinfo)),
                this.printSpan(fieldName)
            )
        );
    }
    // The item's actual crafting recipe (DC/skill check, time, components - see
    // ItemDisplayData.setCrafting, WAPI-Database.js) is hidden behind a button
    // on the item's category label instead of its own always-visible section -
    // only becomes clickable when the item actually has crafting data
    // (ItemCraft's base slot). Only that base slot is shown here - ItemCraft's
    // max slot holds the generic crafting RULES text (System_CraftingRecipe/
    // System_CraftSkillCheck/etc plus each component's own description), which
    // is a different concern from this item's specific recipe (unused today,
    // same as before this button conversion).
    printCraftingTooltip (categoryContents) {
        let fieldName = this.getActionTypeAttribute("ItemCraft");
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printMoreInfoButton(categoryContents, this.getActionTypeAttribute("ItemCraft", WuxDef._moreinfo)),
            categoryContents);
    }
}

