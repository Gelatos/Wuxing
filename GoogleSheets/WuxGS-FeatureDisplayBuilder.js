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

    printTooltip (name, tooltipName, descriptions) {
        if (descriptions.length > 0) {
            let descriptionData = `<span class="wuxDescription">${descriptions.join(`</span><br /><span class="wuxDescription">`)}</span>`;
            return this.printTooltipField(name, tooltipName, descriptionData);
        }
        else {
            return this.printSpan(name);
        }
    }
    printTooltipField (name, tooltipName, descriptionData) {
        return `<span class="wuxTooltip">
            <span class="wuxTooltipText"><strong>${name}</strong></span>
            <div class="wuxTooltipContent">
                <div class="wuxHeader2">${tooltipName}</div>
                ${descriptionData}
            </div>
        </span>`;
    }

    printHeaderBlock() {}
    printHeaderBlockField(contents) {
        return `<div class="wuxFeatureHeader">
            <div class="wuxFeatureHeaderDisplayBlock">
                <div class="wuxFeatureHeaderDisplayTitleBlock">
                    ${this.printName()}
                    ${this.printVariants()}
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
            ${this.printEnhancementEffects()}`);
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
        return `<div class="wuxFeatureHeaderDisplayInfoEnCost">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> EN</span></div>`;
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
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits"><strong>${title}.</strong> ${contents}</div>`;
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
    printEnhancementEffectsField(contents) {
        let enhancementDef = WuxDef.Get("Title_TechEnhancement");
        let title = this.printTooltip(enhancementDef.getTitle(), enhancementDef.getTitle(), enhancementDef.descriptions);
        return `<div class="wuxFeatureHeaderInfoEffect-Enhance">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Enhance">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
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
            this.printTooltip(this.displayData.range, "Range", this.displayData.targetDesc));
    }
    printTargetType() {
        if (this.displayData.targetType == "") {
            return "";
        }
        return this.printTargetTypeField(this.printSpan(this.displayData.targetType));
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
            this.printTooltip("Traits", "Traits", this.displayData.traitsDesc),
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
            this.printTooltip("Effects", "Core Effects", this.displayData.coreEffect.effectTypeDesc),
            this.printSpan(this.displayData.getCoreEffects("\n"))
        );
    }
    printOnEnter() {
        if (!this.displayData.isOnEnter) {
            return "";
        }
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return this.printOnEnterField(this.printTooltip("On Enter Effects", "On Enter Effects", onEnterDef.descriptions));
    }

    printCheckEffects() {
        if (this.displayData.checkEffect == "") {
            return "";
        }
        return this.printCheckEffectsField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="${this.displayData.coreDefense}">`,
            this.printTooltip(this.displayData.checkType, "Skill Check Effects", this.displayData.checkEffect.effectTypeDesc),
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
            this.printTooltip("Will Break Effects", "Will Break Effects", this.displayData.willBreakEffect.effectTypeDesc),
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
    printAttributeTooltip (name, tooltipName, fieldName) {
        let descriptionData = `<span class="wuxDescription" name="${fieldName}"></span>`;
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printTooltipField(name, tooltipName, descriptionData),
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
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechActionType")}">`,
            this.printAttributeTooltip(`<span name="${this.getActionTypeAttribute("TechActionName")}"></span>`,
                "Action", this.getActionTypeAttribute("TechActionName", WuxDef._max))
        )
    }
    printRange() {
        let fieldName = this.getActionTypeAttribute("TechRange");
        return WuxSheetMain.HiddenField(fieldName,
            this.printRangeField(
                // Target description is piggybacked onto TechTargetType's max slot.
                this.printAttributeTooltip(`<span name="${fieldName}"></span>`, "Range", this.getActionTypeAttribute("TechTargetType", WuxDef._max))
            )
        );
    }
    printTargetType() {
        let fieldName = this.getActionTypeAttribute("TechTargetType");
        return WuxSheetMain.HiddenField(fieldName, this.printTargetTypeField(this.printSpan(fieldName)));
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
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("TechTraits", WuxDef._max)),
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
                this.printAttributeTooltip("Effects", "Core Effects",
                    this.getActionTypeAttribute("TechCoreEffect", WuxDef._max)),
                this.printSpan(fieldName)
            )
        );
    }
    printOnEnter() {
        let fieldName = this.getActionTypeAttribute("TechOnEnter");
        let onEnterDef = WuxDef.Get("Trait_OnEnter");
        return WuxSheetMain.HiddenField(fieldName,
            this.printOnEnterField(this.printTooltip("On Enter Effects", "On Enter Effects", onEnterDef.descriptions)));
    }

    printCheckEffects() {
        let fieldName = this.getActionTypeAttribute("TechCheckEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCheckEffectsField(
                `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechCoreDefense")}">`,
                // Check title text is piggybacked onto TechCoreDefense's max slot.
                this.printAttributeTooltip(this.printSpanActionTypeAttribute("TechCoreDefense", WuxDef._max), "Skill Check Effects",
                    this.getActionTypeAttribute("TechCheckEffect", WuxDef._max)),
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
                this.printAttributeTooltip("Will Break Effects", "Will Break Effects",
                    this.getActionTypeAttribute("TechWillBreakEffect", WuxDef._max)),
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
    printName() {
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="@{${WuxDef.GetVariable("Action_Use")}}">
            ${this.printSpanActionTypeAttribute("TechName")}
        </button>`
        return this.printNameField(contents);
    }
    printEnhancementEffects() {
        // Enhance effect text is piggybacked onto TechOnEnter's max slot.
        let fieldName = this.getActionTypeAttribute("TechOnEnter", WuxDef._max);

        // Enabled flags are piggybacked onto the rank buttons' own max slots.
        let rankUpField = this.getActionTypeAttribute("TechRankUp");
        let rankUpButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankUp", WuxDef._max),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButton"),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButtonDisabled"));
        let rankDownField = this.getActionTypeAttribute("TechRankDown");
        let rankDownButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankDown", WuxDef._max),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon'>&#8722;</span> Decrease Rank", "wuxFeatureButton"),
            WuxSheetMain.Button(rankDownField, "<span class='wuxFeatureButtonIcon'>&#8722;</span> Decrease Rank", "wuxFeatureButtonDisabled"));
        let contents = `<div class="wuxFeatureHeaderInfoEffect-EnhanceButtons">${rankDownButton}${rankUpButton}</div>`;

        return WuxSheetMain.HiddenField(fieldName,
            `${this.printEnhancementEffectsField(this.printSpan(fieldName))}
            ${contents}`
        );
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
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits"><strong>${title}.</strong> ${contents}</div>`;
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
    printAttributeTooltip (name, tooltipName, fieldName) {
        let descriptionData = `<span class="wuxDescription" name="${fieldName}"></span>`;
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printTooltipField(name, tooltipName, descriptionData),
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
    printActionType () {
        let fieldName = this.getActionTypeAttribute("ItemGroup");
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="Item">`,
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
                // Tooltip text is piggybacked onto ItemTrait's max slot.
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("ItemTrait", WuxDef._max)),
                this.printSpan(fieldName)
            )
        );
    }
    // The item's actual crafting recipe (DC/skill check, time, components - see
    // ItemDisplayData.setCrafting, WAPI-Database.js) is hidden inside a tooltip
    // on the item's category label instead of its own always-visible section -
    // only becomes hoverable when the item actually has crafting data
    // (ItemCraft's base slot). Only that base slot is shown here - ItemCraft's
    // max slot holds the generic crafting RULES text (System_CraftingRecipe/
    // System_CraftSkillCheck/etc plus each component's own description), which
    // is a different concern from this item's specific recipe.
    printCraftingTooltip (categoryContents) {
        let fieldName = this.getActionTypeAttribute("ItemCraft");
        let descriptionData = `<span class="wuxDescription" name="${fieldName}"></span>`;
        return WuxSheetMain.HiddenSpanFieldToggle(fieldName,
            this.printTooltipField(categoryContents, "Crafting", descriptionData),
            categoryContents);
    }
}

