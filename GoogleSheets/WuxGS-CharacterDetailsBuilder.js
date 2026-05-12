class CharacterBackgroundBuilder {
    constructor() {
    }
    print() {
        let contents = "";
        contents += this.buildOrigin();
        return contents;
    }

    buildOrigin() {
        let definition = WuxDef.Get("Page_Origin")
        return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, 
            WuxSheetMain.TabBlock(`${this.printBasics()}
            ${this.printGenerator()}`));
    }
    
    printBasics() {
        let definition = WuxDef.Get("Title_Background");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let contents = WuxSheetMain.MultiRowGroup([this.backgroundBasics(), this.backgroundBackstory()], WuxSheetMain.Table.FlexTable, 2);
        let header = WuxSheetMain.CollapsibleHeaderInverse(definition.getTitle(), hiddenField);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenField(hiddenField, contents)}`;
    }

    backgroundBasics() {
        let nameFields = WuxSheetMain.MultiRowGroup([
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("SheetName"), WuxDef.GetAttribute("SheetName"))),
            WuxSheetMain.Table.FlexTableGroup(WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName")))], 
            WuxSheetMain.Table.FlexTable, 2);
        let ancestryField = WuxDefinition.BuildSelect(WuxDef.Get("Ancestry"), WuxDef.GetAttribute("Ancestry"),
            WuxDef.Filter([new DatabaseFilterData("group", "AncestryType")]));
        let ethnicityField = `<input type="hidden" class="wuxAncestrySelection-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="wuxAncestrySelection-Human">\n${WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
            WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true)}\n</div>`;
        let affinityField = WuxDefinition.BuildSelect(WuxDef.Get("Affinity"), WuxDef.GetAttribute("AffinityAspect"),
            [WuxDef.Get("Unaspected")].concat(WuxDef.Filter([new DatabaseFilterData("group", "AffinityType")])), 
            false);
        let quickDescriptionField = WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
            "wuxInput wuxHeight30");
        
        return WuxSheetMain.Table.FlexTableGroup(`${nameFields}
        ${ancestryField}
        ${ethnicityField}
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
    
    printGenerator() {
        let definition = WuxDef.Get("Title_BackgroundGenerator");
        let hiddenField = definition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.CollapsibleHeader(definition.getTitle(), hiddenField);
        return `${WuxSheetMain.Header(header)} 
        ${WuxSheetMain.HiddenAuxField(hiddenField, this.backgroundGenerator())}`;
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
        let contents = "";
        contents += this.createStatGroup("Attribute");
        contents += this.createStatGroup("Defense");
        contents += this.createStatGroup("Sense");
        contents += this.createStatGroup("General");
        contents += this.createStatGroup("Combat");
        contents += this.createStatGroup("Skill");
        return contents;
    }

    createStatGroup(groupName) {
        let definition = WuxDef.Get(groupName);
        return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, this.createStatTable(groupName));
    }

    createStatTable(groupName) {
        let filteredStats = WuxDef.Filter([new DatabaseFilterData("group", groupName)]);
        let output = "";
        for (let i = 0; i < filteredStats.length; i++) {
            output += this.createStatBlock(filteredStats[i]);
        }
        return WuxSheetMain.TabBlock(WuxSheetMain.Table.FlexTable(output));
    }

    createStatBlock(statDefinition) {
        let header = `${statDefinition.title}${WuxSheetMain.Tooltip.Icon(WuxDefinition.TooltipDescription(statDefinition))}`;
        let contents = "";
        if (statDefinition.isResource) {
            // contents += createStatBlockValueWithHeader("Current", statDefinition.getAttribute());
            // contents += createStatBlockValueWithHeader("Max", statDefinition.getAttribute(WuxDef._max));
            contents += this.createStatBlockValue(statDefinition.getAttribute(WuxDef._max));
        } else {
            contents += this.createStatBlockValue(statDefinition.getAttribute());
        }
        contents = WuxSheetMain.Table.FlexTable(contents);

        let output = WuxSheetMain.Table.FlexTableHeader(header);
        output += WuxSheetMain.Table.FlexTableData(contents);
        return WuxSheetMain.Table.FlexTableGroup(output, " wuxMinWidth150");
    }

    createStatBlockValue(fieldName) {
        return WuxSheetMain.Table.FlexTableGroup(`<span class="wuxFlexTableItemData wuxTextCenter" name="${fieldName}">0</span>`, " wuxMinWidth100");
    }
    
}