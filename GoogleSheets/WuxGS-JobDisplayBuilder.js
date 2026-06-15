class StaticTechniqueDisplayBuilder extends TechniqueRepeaterDisplayBuilderUsable {
    printName() {
        let useVariable = WuxDef.Get("Action_Use").getVariable(this.rootSuffix);
        let contents = `<button class="wuxFeatureHeaderNameButton" type="roll" value="@{${useVariable}}">
            ${this.printSpanActionTypeAttribute("TechName")}
        </button>`;
        return this.printNameField(contents);
    }
}

class JobSelectionBuilder {
    constructor() {
        this.jobDefinitions = WuxDef.Filter([new DatabaseFilterData("group", "Job")]);
        this.jobSelectDefinition = WuxDef.Get("Forme_SelectJob");
    }

    print() {
        return `${WuxSheetMain.Header(this.jobSelectDefinition.getTitle())}
        <div class="wuxJobSelection">
        ${this.buildJobSelectButton()}
        </div>
        <div class="wuxRow">&nbsp;</div>`;
    }
    buildJobSelectButton() {
        let output = "";
        this.iterateJobs(jobDefinition => {
            output += this.printJobSelectButton(jobDefinition);
        });
        return output;
    }
    iterateJobs(callback) {
        for (let jobDefinition of this.jobDefinitions) {
            callback(jobDefinition);
        }
    }
    printJobSelectButton(jobDefinition) {
        let jobName = jobDefinition.getTitle();
        return WuxSheetMain.HiddenSpanField(jobDefinition.getAttribute(),
            `<input type="hidden" class="wuxJobSelection-flag" name="${jobDefinition.getAttribute(WuxDef._learn)}" />
            ${WuxSheetMain.Button(this.jobSelectDefinition.getAttribute(), jobName, "", jobName)}`
        );
    }
}
