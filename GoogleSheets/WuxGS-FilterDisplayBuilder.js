class FilterDisplayBuilder {
    constructor(filterDefinitions) {
        this.filterDefinitions = filterDefinitions;
    }

    print() {
        return `<div class="wuxFilterSection">
            ${this.printContents()}
        </div>
        `;
    }

    printContents() {
        let output = "";
        let keys = this.filterDefinitions.getKeys();
        for (let key of keys) {
            let definitions = this.filterDefinitions.getDefinitions(key);
            if (definitions.length > 0) {
                output += this.printFilterEntry(key, definitions) + "\n";
            }
        }
        return output;
    }

    printFilterEntry(filterName, options) {
        let baseDefinition = WuxDef.Get(filterName);
        let optionsOutput = "";
        for(let i = 0; i < options.length; i++) {
            optionsOutput += this.printFilterOption(options[i]);
        }

        let expandField = baseDefinition.getAttribute(WuxDef._expand);
        let header = WuxSheetMain.Header(
            WuxSheetMain.CollapsibleHeader(`<span>${baseDefinition.getTitle()}</span>`, expandField));
        let content = WuxSheetMain.HiddenAuxField(expandField,
            `${optionsOutput}
            ${WuxSheetMain.Row("&nbsp;")}`);
        return header + content;
    }
    printFilterOption(optionDefinition) {
        return this.printFilterData(WuxSheetMain.InteractionElement.BuildCheckboxInput(
            this.filterDefinitions.getCompoundAttribute(optionDefinition),
            optionDefinition.getTitle()));
    }

    printFilterData(contents) {
        return `<div class="wuxFilterPopupContentData">${contents}</div>
        `;
    }
}
