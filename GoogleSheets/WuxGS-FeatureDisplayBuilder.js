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
        let countInput = this.countAttribute
            ? `<span class="wuxFeatureHeaderNameCount" name="${this.countAttribute}">0</span>`
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
    printActionType () {
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" name="${this.getActionTypeAttribute("TechActionType")}">`,
            this.printAttributeTooltip(`<span name="${this.getActionTypeAttribute("TechActionName")}"></span>`,
                "Action", this.getActionTypeAttribute("TechActionTooltip"))
        )
    }
    printRange() {
        let fieldName = this.getActionTypeAttribute("TechRange");
        return WuxSheetMain.HiddenField(fieldName,
            this.printRangeField(
                this.printAttributeTooltip(`<span name="${fieldName}"></span>`, "Range", this.getActionTypeAttribute("TechTargetDesc"))
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
        let fieldName = this.getActionTypeAttribute("TechWillCost");
        return WuxSheetMain.HiddenField(fieldName, this.printWillCostField(this.printSpan(fieldName)));
    }
    printTrigger() {
        let fieldName = this.getActionTypeAttribute("TechTrigger");
        return WuxSheetMain.HiddenField(fieldName, this.printTriggerField(this.printSpan(fieldName)));
    }
    printTraits() {
        let fieldName = this.getActionTypeAttribute("TechTraits");
        return WuxSheetMain.HiddenField(fieldName,
            this.printTraitsField(
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("TechTraitsDesc")),
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
                    this.getActionTypeAttribute("TechCoreEffect", WuxDef._info)),
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
                this.printAttributeTooltip(this.printSpanActionTypeAttribute("TechCheckTitle"), "Skill Check Effects",
                    this.getActionTypeAttribute("TechCheckEffect", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printEndEffects() {
        let fieldName = this.getActionTypeAttribute("TechEndEffect");
        return WuxSheetMain.HiddenField(fieldName, this.printEndEffectsField(this.printSpan(fieldName)));
    }
    printWillBreakEffects() {
        let fieldName = this.getActionTypeAttribute("TechWillBreakEffect");
        return WuxSheetMain.HiddenField(fieldName,
            this.printWillBreakEffectsField(
                this.printAttributeTooltip("Will Break Effects", "Will Break Effects",
                    this.getActionTypeAttribute("TechWillBreakEffect", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printEnhancementEffects() {
        let fieldName = this.getActionTypeAttribute("TechEnhanceEffect");
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
        let fieldName = this.getActionTypeAttribute("TechEnhanceEffect");

        let rankUpField = this.getActionTypeAttribute("TechRankUp");
        let rankUpButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankUp", WuxDef._info),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButton"),
            WuxSheetMain.Button(rankUpField, "<span class='wuxFeatureButtonIcon'>&#43;</span> Increase Rank", "wuxFeatureButtonDisabled"));
        let rankDownField = this.getActionTypeAttribute("TechRankDown");
        let rankDownButton = WuxSheetMain.HiddenSpanFieldToggle(this.getActionTypeAttribute("TechRankDown", WuxDef._info),
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

    printHeaderBlock() {
        return this.printHeaderBlockField(
            `<div class="wuxFeatureHeaderDisplayInfoBlock">
            ${this.printBulk()}
            ${this.printBaseValue()}
        </div>`);
    }

    printInfoBlock() {
        return this.printInfoBlockField(
            `${this.printFlavorText()}
            ${this.printTraits()}
            ${this.printCrafting()}`);
    }

    printBulk() {}
    printBulkField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoBulk">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> Bulk</span></div>`;
    }
    printBaseValue() {}
    printBaseValueField (contents) {
        return `<div class="wuxFeatureHeaderDisplayInfoCoin">${contents}<span class="wuxFeatureHeaderDisplayInfoSubtitle"> J</span></div>`;
    }

    printFlavorText() {}
    printFlavorTextField (contents) {
        return `<div class="wuxFeatureHeaderInfoFlavor">${contents}</div>`;
    }

    printTraits() {}
    printTraitsField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoTraits"><strong>${title}.</strong> ${contents}</div>`;
    }

    printCrafting() {}
    printCraftingField (title, contents) {
        return `<div class="wuxFeatureHeaderInfoEffect-Core">
            <input type="hidden" class="wuxFeatureHeader-flag" value="Core">
            <div class="wuxFeatureHeaderInfoEffectTitle"><span class="wuxFeatureHeaderInfoEffectTitleHeader">${title}</span></div>
            <div class="wuxFeatureHeaderInfoContents">${contents}</div>
        </div>`;
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

    printName() {
        let contents = this.printSpanActionTypeAttribute("ItemName");
        return this.printNameField(contents);
    }
    printActionType () {
        let fieldName = this.getActionTypeAttribute("ItemGroup");
        return this.printActionTypeField(
            `<input type="hidden" class="wuxFeatureHeader-flag" value="Item">`,
            this.printSpan(fieldName));
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
                this.printAttributeTooltip("Traits", "Traits", this.getActionTypeAttribute("ItemTrait", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
    printCrafting() {
        let fieldName = this.getActionTypeAttribute("ItemCraft");
        return WuxSheetMain.HiddenField(fieldName,
            this.printCraftingField(
                this.printAttributeTooltip("Crafting", "Crafting",
                    this.getActionTypeAttribute("ItemCraft", WuxDef._info)),
                this.printSpan(fieldName)
            )
        );
    }
}

