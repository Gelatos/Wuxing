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
        let sheetNameField = `${WuxSheet.MainPageDisplayInput()}
                ${WuxSheet.PageDisplay("OriginData", WuxDefinition.BuildTextInput(WuxDef.Get("CharSheetName"), WuxDef.GetAttribute("CharSheetName")))}
                ${WuxSheet.PageDisplay("CoreData", WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName")))}`;
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
        
        return WuxSheetMain.Table.FlexTableGroup(`${nameFields}
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
        contents += WuxDefinition.InfoHeader(WuxDef.Get("Title_OriginAdvancement"));
        contents += WuxDefinition.BuildNumberInput(WuxDef.Get("Level"), WuxDef.GetAttribute("Level"));
        contents += WuxDefinition.BuildText(WuxDef.Get("CR"), WuxSheetMain.Span(WuxDef.GetAttribute("CR", WuxDef._max)));
        contents += WuxDefinition.BuildText(WuxDef.Get("Potency"), WuxSheetMain.Span(WuxDef.GetAttribute("Potency")));

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
        let recallDef = WuxDef.Get("Recall");
        let recallField = `<div class="wuxRow">${this.printStat(recallDef, recallDef.getTitle(), recallDef.getAttribute())}</div>`;

        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", "CoreResource")]);
        let resourceContents = "";
        for (let definition of filteredStats) {
            resourceContents += `<div class="wuxRow">
            ${this.printStat(definition, definition.abbreviation,
                definition.getAttribute(WuxDef._max), definition.getAttribute(WuxDef._info))}
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
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", ["Defense", "Sense"])]);
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
                definition.getAttribute(), definition.getAttribute(WuxDef._info));
        }
        return contents;
    }
    
    printExpandedStats() {
        let contents = this.printHeader(WuxDef.GetTitle("Title_Conflict"));
        contents += this.printFilteredSubGroupStats("EnStat");
        contents += this.printFilteredSubGroupStats("MoveStat");
        contents += this.printFilteredSubGroupStats("CombatStat");
        return contents;
    }
    printFilteredSubGroupStats(subGroupName) {
        let contents = "";
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("subGroup", subGroupName)]);
        for (let definition of filteredStats) {
            contents += this.printStat(definition, definition.getTitle(),
                definition.getAttribute(), definition.getAttribute(WuxDef._info));
        }
        return `${contents}
        `;
    }
    
    printHeader(header) {
        return WuxSheetMain.Header(header);
    }
    printSetValue(definition, fieldAttr) {
        return `<div class="wuxFlexTableItemGroup">
            <strong>${WuxSheetMain.Tooltip.Text(definition.title,
            this.printDefinitionTooltipContents(definition))}</strong>
            ${WuxSheetMain.Span(fieldAttr)}
        </div>`;
    }

    printSetStat(definition, title, fieldAttr) {
        return `<div class="wuxFlexTableItemGroup">
            <strong>${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}</strong>
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Span(fieldAttr)}
            </div>
        </div>`;
    }
    printDefinitionTooltipContents(definitionData) {
        return `${WuxSheetMain.Header2(definitionData.title)}
        <span class="wuxDescription">${definitionData.getDescription(`</span><span class="wuxDescription">`)}</span>`;
    }
    
    printStat(definition, title, fieldAttr, statCalculationField) {
        return `<div class="wuxFlexTableItemGroup">
            ${WuxSheetMain.Tooltip.Text(title,
            this.printDefinitionTooltipContents(definition))}
            <div class="wuxCharacterStatisticsStat">
                ${WuxSheetMain.Tooltip.Text(WuxSheetMain.Span(fieldAttr),
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
        </div>`;
        
        return WuxSheetMain.MultiRowGroup(
            [WuxSheetMain.Table.FlexTableGroup(leftColumn), WuxSheetMain.Table.FlexTableGroup(rightColumn)],
            WuxSheetMain.Table.FlexTable, 2);
    }
    
    printAttributes() {
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", "Attribute")]);
        let contents = this.printHeader(WuxDef.GetTitle("Attribute"));
        for (let definition of filteredStats) {
            contents += this.printSetStat(definition, definition.getTitle(), definition.getAttribute());
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
                    contents += this.printStat(definition, definition.getTitle(), definition.getAttribute(), definition.getAttribute(WuxDef._info));
                }
            }
        }
        return contents;
    }

}

class ChatDisplayBuilder {
    print() {
        let contents = WuxSheetMain.MultiRowGroup([this.outfitCollection(), this.languageSelect()], WuxSheetMain.Table.FlexTable, 2);
        contents = WuxSheetMain.TabBlock(contents);

        let definition = WuxDef.Get("Title_Emotes");
        return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, contents);
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

