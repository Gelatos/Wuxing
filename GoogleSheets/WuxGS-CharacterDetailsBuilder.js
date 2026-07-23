class CharacterBackgroundBuilder {
    constructor() {
    }
    print() {
        return `${this.printBasics()}
            ${this.printOriginStats()}
            ${this.printGenerator()}`;
    }
    
    printBasics() {
        let definition = WuxDef.Get("Title_Background");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.CollapsibleHeader(definition.getTitle(), hiddenField);
        let contents = WuxSheetMain.MultiRowGroup(
            [this.backgroundBasics(), this.backgroundBackstory()], 
            WuxSheetMain.Table.FlexTable, 2);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenAuxField(hiddenField, contents)}`;
    }

    backgroundBasics() {
        let isPlayerField = `${WuxSheet.MainPageDisplayInput()}
            ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildSelect(WuxDef.Get("Title_IsPlayer"), WuxDef.GetAttribute("Title_IsPlayer"),
                WuxDef.Filter([new DatabaseFilterData("group", "IsPlayer")]), false))}`;


        let sheetNameField = `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildTextInput(WuxDef.Get("CharSheetName"), WuxDef.GetAttribute("CharSheetName")))}
                ${WuxSheet.PageDisplay("CharacterData", WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName")))}`;
        let nameFields = WuxSheetMain.MultiRowGroup([
                WuxSheetMain.Table.FlexTableGroup(sheetNameField),
                WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName")), " wuxFlexTableItemGroup2")],
            WuxSheetMain.Table.FlexTable, 2);
        
        let ancestryField = WuxDefinition.BuildSelect(WuxDef.Get("Ancestry"), WuxDef.GetAttribute("Ancestry"),
            WuxDef.Filter([new DatabaseFilterData("group", "AncestryType")]));
        let ethnicityField = `<input type="hidden" class="wuxAncestrySelection-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="wuxAncestrySelection-Human">\n${WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
            WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true)}\n</div>`;
        let ancestryFields = WuxSheetMain.MultiRowGroup(
            [WuxSheetMain.Table.FlexTableGroup(ancestryField), WuxSheetMain.Table.FlexTableGroup(ethnicityField, " wuxFlexTableItemGroup2")],
            WuxSheetMain.Table.FlexTable, 2);
        
        let affinityField = WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("AffinityAspect"),
            [WuxDef.Get("Unaspected")].concat(WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])), 
            false);
        
        let quickDescriptionField = WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
            "wuxInput wuxHeight30");

        return WuxSheetMain.Table.FlexTableGroup(`${isPlayerField}
        ${nameFields}
        ${ancestryFields}
        ${affinityField}
        ${quickDescriptionField}`);
    }

    backgroundBackstory() {
        let titleField = WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
        let ageGenderFields = WuxSheetMain.MultiRowGroup([
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"))),
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildSelect(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"),
                WuxDef.Filter([new DatabaseFilterData("group", "GenderType")]), true))
        ], WuxSheetMain.Table.FlexTable, 2);
        let homeRegionField = WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
            WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
        let backgroundField = WuxDefinition.BuildTextarea(WuxDef.Get("Backstory"), WuxDef.GetAttribute("Backstory"),
            "wuxInput wuxHeight150");
        return WuxSheetMain.Table.FlexTableGroup(`${titleField}
        ${ageGenderFields}
        ${homeRegionField}
        ${backgroundField}`);
    }
    
    printOriginStats() {
        let contents = WuxSheetMain.MultiRowGroup([this.buildAdvancementData(), WuxCharacterSheetBuilders.BuildInfluences()],
            WuxSheetMain.Table.FlexTable, 2);
        return `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", contents)}`;
    }
    
    buildAdvancementData() {
        let contents = "";
        contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_StartingData"));
        contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
        contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
        contents += WuxDefinition.BuildText(WuxDef.Get("Potency"), WuxSheetMain.Span(WuxDef.GetAttribute("Potency")));
        contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title_StartingJin"), WuxDef.GetAttribute("Jin"));

        return WuxSheetMain.Table.FlexTableGroup(contents);
    }
    
    printGenerator() {
        let definition = WuxDef.Get("Title_BackgroundGenerator");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.CollapsibleHeaderInverse(definition.getTitle(), hiddenField);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenField(hiddenField, this.backgroundGenerator())}`;
    }

    backgroundGenerator() {
        let leftColumn = "";
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenName"), WuxDef.GetAttribute("Note_GenName"));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenFullName"), WuxDef.GetAttribute("Note_GenFullName"));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenGender"), WuxDef.GetAttribute("Note_GenGender"));
        leftColumn += WuxDefinition.BuildSelect(WuxDef.Get("Note_GenHomeRegion"), WuxDef.GetAttribute("Note_GenHomeRegion"),
            WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
        leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenRace"), WuxDef.GetAttribute("Note_GenRace"));
        leftColumn = WuxSheetMain.Table.FlexTableGroup(leftColumn);

        let rightColumn = "";
        let generatorDefinition = WuxDef.Get("Note_GenerateCharacter");
        let useDefinition = WuxDef.Get("Note_UseGeneration");
        let clearDefinition = WuxDef.Get("Note_ClearBackground");
        rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenPersonality"), WuxDef.GetAttribute("Note_GenPersonality"));
        rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenMotivation"), WuxDef.GetAttribute("Note_GenMotivation"));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(generatorDefinition.getAttribute(), generatorDefinition.getTitle()));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(useDefinition.getAttribute(), useDefinition.getTitle()));
        rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(clearDefinition.getAttribute(), clearDefinition.getTitle()));
        rightColumn = WuxSheetMain.Table.FlexTableGroup(rightColumn);

        return `${WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2)}`;
    }
}

class CharacterStatisticsBuilder {
    constructor() {
    }
    print() {
        return `<div class="wuxCharacterStatistics">
            ${this.printBasics()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printDefenses()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printExpandedStats()}
        </div>`;
    }
    
    printBasics() {
        let fullNameDef = WuxDef.Get("FullName");
        let levelDef = WuxDef.Get("Level");
        let jobDef = WuxDef.Get("Forme_JobSlot");
        let crDef = WuxDef.Get("CR");

        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", "CoreResource")]);
        let resourceContents = "";
        for (let definition of filteredStats) {
            resourceContents += `<div class="wuxRow">
            ${this.printStat(definition, definition.abbreviation,
                definition.getAttribute(WuxDef._max), definition.getAttribute(WuxDef._info), true)}
            </div>`;
        }
        
        return `${WuxSheetMain.Header(WuxSheetMain.Span(fullNameDef.getAttribute()))}
            <div class="wuxRow">
                <span>[</span><span>${crDef.getTitle()}</span><span> </span>${WuxSheetMain.Span(crDef.getAttribute())}<span>]</span>
                <span> </span>
                <span>${levelDef.abbreviation}</span>${WuxSheetMain.Span(levelDef.getAttribute())}
                <span> </span>
                ${WuxSheetMain.Span(jobDef.getAttribute())}
            </div>
            ${resourceContents}`;
    }
    printDefenses() {
        let defenseOrder = ["Def_Brace", "Def_Resolve", "Def_Warding", "Def_Logic", "Def_Evasion", "Def_Insight"];
        let filteredStats = defenseOrder.map(name => WuxDef.Get(name));
        let contents = this.printHeader(WuxDef.GetTitle("Defense"));
        for (let definition of filteredStats) {
            let abilityScores = [];
            let defenseDefinitionNames = definition.formula.getDefinitions();
            for (let defenseDefinitionName of defenseDefinitionNames) {
                if (defenseDefinitionName == "CR") {
                    continue;
                }
                let defenseDefinition = WuxDef.Get(defenseDefinitionName);
                abilityScores.push(defenseDefinition.abbreviation);
            }
            let attributesLine = "";
            if (abilityScores.length > 0) {
                attributesLine = `(${abilityScores.join("/")})`;
            }
            
            contents += this.printStat(definition, `${definition.getTitle()} ${attributesLine}`,
                definition.getAttribute(), definition.getAttribute(WuxDef._info), true);
        }
        return contents;
    }

    printExpandedStats() {
        let contents = this.printHeader(WuxDef.GetTitle("Title_Conflict"));
        contents += this.printFilteredSubGroupStats("EnStat", true);
        contents += this.printFilteredSubGroupStats("MoveStat", true);
        contents += this.printFilteredSubGroupStats("CombatStat", true);
        return contents;
    }
    printFilteredSubGroupStats(subGroupName, useEvaluation) {
        let contents = "";
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", subGroupName)]);
        for (let definition of filteredStats) {
            contents += this.printStat(definition, definition.getTitle(),
                definition.getAttribute(), definition.getAttribute(WuxDef._info), useEvaluation);
        }
        return `${contents}
        `;
    }
    
    printHeader(header) {
        return WuxSheetMain.Header(header);
    }

    printSetStat(definition, title, fieldAttr, useEvaluation) {
        let valueDisplay = useEvaluation
            ? WuxSheetMain.EvaluatedSpan(fieldAttr, definition.getAttribute(WuxDef._evaluation))
            : WuxSheetMain.Span(fieldAttr);
        return `<div class="wuxFlexTableItemGroup">
            <strong>${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}</strong>
            <div class="wuxCharacterStatisticsStat">
                ${valueDisplay}
            </div>
        </div>`;
    }
    printDefinitionTooltipContents(definitionData) {
        return `${WuxSheetMain.Header2(definitionData.title)}
        <span class="wuxDescription">${definitionData.getDescription(`</span><span class="wuxDescription">`)}</span>`;
    }

    printStat(definition, title, fieldAttr, statCalculationField, useEvaluation) {
        let valueDisplay = useEvaluation
            ? WuxSheetMain.EvaluatedSpan(fieldAttr, definition.getAttribute(WuxDef._evaluation))
            : WuxSheetMain.Span(fieldAttr);
        return `<div class="wuxFlexTableItemGroup">
            ${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Tooltip.Text(valueDisplay,
            this.printStatCalculationTooltipContent(definition, statCalculationField))}
            </div>
        </div>`;
    }
    printStatCalculationTooltipContent(definitionData, statCalculationField) {
        return `${WuxSheetMain.Header2(definitionData.title)}
        <span class="wuxDescription" name="${statCalculationField}"></span>`;
    }
    
}

class ExtendedCharacterStatisticsBuilder extends CharacterStatisticsBuilder {

    print() {
        let leftColumn = `<div class="wuxCharacterStatistics">
            ${this.printBasics()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printAttributes()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printDefenses()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printExpandedStats()}
        </div>`;
        let rightColumn = `<div class="wuxCharacterStatistics">
            ${this.printSkills()}
            <span class="wuxRow">&nbsp;</span>
            ${this.printKnowledges()}
        </div>`;

        return WuxSheetMain.MultiRowGroup(
            [WuxSheetMain.Table.FlexTableGroup(leftColumn), WuxSheetMain.Table.FlexTableGroup(rightColumn)],
            WuxSheetMain.Table.FlexTable, 2);
    }
    
    printAttributes() {
        let attributeOrder = ["Attr_BOD", "Attr_CNV", "Attr_PRC", "Attr_RSN", "Attr_QCK", "Attr_INT"];
        let filteredStats = attributeOrder.map(name => WuxDef.Get(name));
        let contents = this.printHeader(WuxDef.GetTitle("Attribute"));
        for (let definition of filteredStats) {
            contents += this.printSetStat(definition, definition.getTitle(), definition.getAttribute(), true);
        }
        return contents;
    }

    printLoreStat(nameAttr, descAttr, statAttr) {
        return `<div class="wuxFlexTableItemGroup">
            ${WuxSheetMain.Tooltip.Text(
                `<span name="${nameAttr}"></span>`,
                `${WuxSheetMain.Header2(`<span name="${nameAttr}"></span>`)}<span class="wuxDescription" name="${descAttr}"></span>`
            )}
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Span(statAttr)}
            </div>
        </div>`;
    }

    printKnowledges() {
        const loreRepeaterIds = [
            "RepeaterAcademic", "RepeaterProfession", "RepeaterCraftmanship",
            "RepeaterGeography", "RepeaterHistory", "RepeaterCulture", "RepeaterReligion"
        ];
        let loreCategoryDefinitions = WuxDef.Filter(new DatabaseFilterData("group", "LoreCategory"));
        let recallDef = WuxDef.Get("Recall");
        let generalLoreTitle = WuxDef.GetTitle("Title_GeneralLore");
        let loreCategoryDef = WuxDef.Get("Title_LoreCategory");
        let contents = this.printHeader(WuxDef.GetTitle("Page_Knowledge"));
        contents += WuxSheetMain.Row(this.printStat(recallDef, recallDef.getTitle(), recallDef.getAttribute(), recallDef.getAttribute(WuxDef._info)));

        for (let i = 0; i < loreCategoryDefinitions.length; i++) {
            let categoryDef = loreCategoryDefinitions[i];
            let repeaterDef = WuxDef.Get(loreRepeaterIds[i]);

            let categoryHeader = WuxSheetMain.Header2(loreCategoryDef.getTitle(categoryDef.getTitle()));

            let categoryContents = WuxSheetMain.HiddenField(categoryDef.getAttribute(WuxDef._rank),
                `<div class="wuxFlexTableItemGroup">${WuxSheetMain.Tooltip.Text(generalLoreTitle, this.printDefinitionTooltipContents(categoryDef))}</div>`);

            categoryContents += `<div class="wuxNoRepControl"><fieldset class="${repeaterDef.getVariable()}">
                ${this.printLoreStat(
                    WuxDef.GetAttribute("Lore_SubType"),
                    WuxDef.GetAttribute("Lore_Description"),
                    WuxDef.GetAttribute("Lore_Tier")
                )}
            </fieldset></div>`;

            contents += `<input type="hidden" class="wuxHiddenField-flag" name="${categoryDef.getAttribute("_display")}" value="0">
            <div class="wuxHiddenBlockField">
                ${categoryHeader}
                <div class="wuxFlexTable">
                    ${categoryContents}
                </div>
            </div>`;
        }
        return contents;
    }

    printSkills() {
        let contents = "";
        this.printHeader(WuxDef.GetTitle("Skill"));

        let skillGroups = ["ActiveSkills", "SocialSkills", "WorldSkills"];
        for (let skillGroup of skillGroups) {

            let subSkillGroups = WuxDef.Filter([new DatabaseFilterData("subGroup", skillGroup)]);
            for (let subSkillGroup of subSkillGroups) {
                contents += this.printHeader(`${subSkillGroup.getTitle()} Skills`);

                let skillDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Skill"),
                    new DatabaseFilterData("subGroup", subSkillGroup.getTitle())]);
                for (let definition of skillDefinitions) {
                    contents += this.printStat(definition, definition.getTitle(), definition.getAttribute(), definition.getAttribute(WuxDef._info), true);
                }
            }
        }
        return contents;
    }

}

class ChatDisplayBuilder {
    constructor(showLanguageSelect = true) {
        this.showLanguageSelect = showLanguageSelect;
    }
    print() {
        let sections = [this.outfitCollection()];
        if (this.showLanguageSelect) sections.push(this.languageSelect());
        let contents = WuxSheetMain.MultiRowGroup(sections, WuxSheetMain.Table.FlexTable, 2);
        contents = WuxSheetMain.TabBlock(contents);

        let definition = WuxDef.Get("Title_Emotes");
        return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents, definition);
    }

    languageSelect() {
        let contents = "";
        let titleDefinition = WuxDef.Get("Title_LanguageSelect");
        contents += WuxDefinition.InfoHeader(titleDefinition);
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

        let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
        for (let i = 0; i < languageFilters.length; i++) {
            contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                WuxSheetMain.InteractionElement.BuildTooltipRadioInput(WuxDef.GetAttribute("Chat_Language"), WuxDef.GetAttribute("Chat_Language", WuxDef._info),
                    languageFilters[i].title,
                    this.languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
            );
        }

        return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150");
    }

    languageTitle(languageDef) {
        return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
    }

    outfitCollection() {
        let contents = "";
        let titleDefinition = WuxDef.Get("Title_Outfits");
        contents += WuxDefinition.InfoHeader(titleDefinition);
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_SetId"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Emotes"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostName"));
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_PostURL"));

        let outfitNameDef = WuxDef.Get("Chat_OutfitName");
        let emoteContents = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(outfitNameDef.getAttribute(WuxDef._expand))}
            ${WuxSheetMain.InteractionElement.CheckboxBlockIcon(outfitNameDef.getAttribute(WuxDef._learn),
                WuxSheetMain.Header(WuxSheetMain.Span(outfitNameDef.getAttribute(), "New Outfit")))}
            ${WuxSheetMain.SectionBlockHeaderFooter()}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(outfitNameDef.getAttribute(WuxDef._expand),
                WuxSheetMain.SectionBlockContents(this.buildOutfitContents()))}`;

        emoteContents = `<div class="wuxSectionBlock wuxMinWidth200 wuxMaxWidth220">
            ${WuxSheetMain.InteractionElement.Build(true, emoteContents)}
        </div>`;

        contents += `<div class="wuxRepeatingFlexSection">
            <fieldset class="${WuxDef.GetVariable("RepeatingOutfits")}">
                ${emoteContents}
            </fieldset>
        </div>`;
        return WuxSheetMain.Table.FlexTableGroup(contents, " wuxMinWidth150 wuxFlexTableItemGroup2");
    }

    buildOutfitContents() {
        let contents = "";
        contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_OutfitEmotes", WuxDef._true));

        let outfitNameDefinition = WuxDef.Get("Chat_OutfitName");
        contents += WuxSheetMain.Header2(outfitNameDefinition.title) + "\n" +
            WuxSheetMain.Input("text", outfitNameDefinition.getAttribute(), "New Outfit");

        let outfitEmotesDef = WuxDef.Get("Chat_OutfitEmotes");
        contents += WuxSheetMain.Header2(`${outfitEmotesDef.title}`) + "\n" +
            WuxSheetMain.Textarea(outfitEmotesDef.getAttribute(), "wuxInput wuxHeight60");

        contents += WuxSheetMain.Row("&nbsp;");

        let defaultNameDefinition = WuxDef.Get("Chat_OutfitDefault");
        let defaultURLDefinition = WuxDef.Get("Chat_OutfitDefaultURL");
        contents += WuxSheetMain.Header2(defaultNameDefinition.title) + "\n" +
            WuxSheetMain.Input("text", defaultNameDefinition.getAttribute());
        contents += WuxSheetMain.Header2(defaultURLDefinition.title) + "\n" +
            WuxSheetMain.Input("text", defaultURLDefinition.getAttribute(), "");
        contents += WuxSheetMain.Row("&nbsp;");

        let nameDefinition = WuxDef.Get("Chat_EmoteName");
        let urlDefinition = WuxDef.Get("Chat_EmoteURL");
        for (let i = 2; i <= 30; i++) {
            contents += WuxSheetMain.Header2(`${nameDefinition.title} ${i}`) + "\n" +
                WuxSheetMain.Input("text", nameDefinition.getAttribute() + i);
            contents += WuxSheetMain.Header2(`${urlDefinition.title} ${i}`) + "\n" +
                WuxSheetMain.Input("text", urlDefinition.getAttribute() + i);
        }

        return contents;
    }
}

