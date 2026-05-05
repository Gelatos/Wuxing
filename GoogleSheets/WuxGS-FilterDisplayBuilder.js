class FilterDisplayBuilder {
    constructor(filterDefinitions) {
        this.filterDefinitions = filterDefinitions;
    }

    print () {
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

        return `${this.printFilterRow(WuxSheetMain.Header(`<span>${baseDefinition.getTitle()}</span>`))}
        ${optionsOutput}`;
    }
    printFilterOption(optionDefinition) {
        return this.printFilterData(WuxSheetMain.InteractionElement.BuildCheckboxInput(
            this.filterDefinitions.getCompoundAttribute(optionDefinition), 
            optionDefinition.getTitle()));
    }

    printFilterRow(contents) {
        return `<div class="wuxFilterPopupContentRow">${contents}</div>
        `;
    }
    printFilterData(contents) {
        return `<div class="wuxFilterPopupContentData">${contents}</div>
        `;
    }
}
