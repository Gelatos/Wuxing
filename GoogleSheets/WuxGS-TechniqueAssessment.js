class TechniqueAssessment {
    constructor(technique, sheet, row, versionColumn, assessColumn, generatedGroupsColumn) {
        this.sheet = sheet;
        this.row = row;
        this.versionColumn = versionColumn;
        this.assessColumn = assessColumn;
        this.generatedGroupsColumn = generatedGroupsColumn;

        this.technique = technique;
        this.assessment = "";
        this.averagePoints = 0;
        this.assessmentPercentage = 0;
        this.isInvalid = false;
        this.invalidReason = "";

        this.impactTraits = {};
        this.utilitySet = false;

        this.target = technique.target;
        this.size = technique.size;
        this.onEnterEffect = false;
        this.statusCount = 0;

        this.basePoints = 8;
        this.points = 0;
        this.defenseModifier = 0;
        this.defenseModName = "";
        this.setDefenseModifier();
        this.pointsCalc = "";
        this.pointsRubric = "";
        this.willbreakPoints = 0;
        this.willbreakPointsRubric = "";
        this.patience = 0;
        this.pointBreakdown = [];

        this.dps = 0;
        this.lowDps = 0;
        this.highDps = 0;
        this.dpsVariance = false;

        this.will = 0;
        this.lowWill = 0;
        this.highWill = 0;
        this.willVariance = false;

        this.structureCount = 0;
        this.structureHP = 0;
        this.structureArmor = 0;

        this.favor = 0;
        this.lowFavor = 0;
        this.highFavor = 0;
        this.favorVariance = false;

        this.request = 0;
        this.lowRequest = 0;
        this.highRequest = 0;
        this.requestVariance = false;

        this.isCombat = false;
        this.isSocial = false;

        this.assessTechnique();
    }

    setDefenseModifier() {
        let modNames = [];
        let defenseValue = parseInt(this.technique.coreDefense);
        if (this.technique.coreDefense == "") {
            this.defenseModifier += 0.65;
            modNames.push("Unavoidable");
        }
        else if (!isNaN(defenseValue)) {
            defenseValue -= this.technique.tier + 4;
            if (defenseValue <= 5) {
                this.defenseModifier += 0.5;
                modNames.push("Easy DC");
            }
            else if (defenseValue >= 9) {
                this.defenseModifier -= 0.2;
                modNames.push("Hard DC");
            }
        }
        else {
            let accurateDefenses = ["Evasion", "Insight"];
            if (accurateDefenses.some(type => type == this.technique.coreDefense)) {
                this.defenseModifier += 0.25;
                modNames.push("Effective");
            }
        }
        if (this.technique.impacts.includes("Truehit")) {
            this.defenseModifier += 0.4;
            modNames.push("Truehit");
        }
        if (this.technique.impacts.includes("Accurate")) {
            this.defenseModifier += 0.2;
            modNames.push("Accurate");
        }
        this.defenseModName = modNames.join(", ");
    }

    setAssessment() {
        if (this.technique.en > this.getEnergyRestriction()) {
            this.isInvalid = true;
            this.invalidReason = "Too much EN expenditure for this action type";
        }
        if (this.isInvalid) {
            this.assessment = "INVALID";
            return;
        }
        if (this.assessmentPercentage == undefined) {
            this.assessment = "???";
            return;
        }

        if (this.assessmentPercentage < 20) {
            this.assessment = "Too Weak";
        } else if (this.assessmentPercentage < 40) {
            this.assessment = "Weak";
            if (this.assessmentPercentage > 32) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 26) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else if (this.assessmentPercentage < 60) {
            this.assessment = "Average";
            if (this.assessmentPercentage > 52) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 46) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else if (this.assessmentPercentage < 80) {
            this.assessment = "Strong";
            if (this.assessmentPercentage > 72) {
                this.assessment += " 3";
            } else if (this.assessmentPercentage > 66) {
                this.assessment += " 2";
            } else {
                this.assessment += " 1";
            }
        } else {
            this.assessment = "Too Strong";
        }
    }

    printCellValues() {
        this.printAssessmentNote();
        this.printAssessmentPointValues();
        this.printVersionChange();
        this.printSortingValues();
    }
    printAssessmentNote() {
        let range = this.sheet.getRange(this.row, this.assessColumn, 1, 1);
        if (this.isInvalid) {
            range.setNote(this.invalidReason);
            return;
        }
        range.setNote(this.getAssessmentNote());
    }
    printAssessmentPointValues() {
        let values = [];
        values[0] = [this.assessment, `${this.pointVarianceRange()}\n${this.points}; ${this.pointBreakdown[0].points}`];
        for (let i = 1; i < this.pointBreakdown.length; i++) {
            values.push(["", `${this.pointBreakdown[i].points}; ${this.pointBreakdown[i].rubric}`]);
        }

        let range = this.sheet.getRange(this.row, this.assessColumn, this.pointBreakdown.length, 2);
        range.setValues(values);
    }
    printVersionChange() {
        let range = this.sheet.getRange(this.row, this.versionColumn, 1, 1);
        range.setValue("CHANGE");
    }
    printSortingValues() {
        let range = this.sheet.getRange(this.row, this.generatedGroupsColumn, 1, 1);
        range.setValue(this.printImpactTraits());
    }

    printCellJson(isCustom) {
        Debug.Log("Printing JSON for technique");
        let range = this.sheet.getRange(this.row, this.assessColumn + 4, 1, 1);
        this.technique.isCustom = isCustom;
        range.setValue(JSON.stringify(this.technique));
    }

    getAssessmentNote() {
        let output = `Point ${this.pointsCalc != "" ? this.pointsCalc : " (Avg)"}: `;
        output += this.pointVarianceRange();
        output += `\nTotal Points: ${this.points}\n${this.pointsRubric}`;
        if (this.willbreakPoints > 0) {
            output += `\nWill Break: ${this.willbreakPoints}\n${this.willbreakPointsRubric}`;
        }
        output += "\n";

        if (this.dps > 0) {
            output += `\nDPS: ${this.lowDps} => ${this.dps} <= ${this.highDps}`;
            if (this.dpsVariance) {
                output += " (High Variance)";
            }
        }
        if (this.will > 0) {
            output += `\nWill: ${this.lowWill} => ${this.will} <= ${this.highWill}`;
            if (this.willVariance) {
                output += " (High Variance)";
            }
        }
        if (this.favor > 0) {
            output += `\nFavor: ${this.lowFavor} => ${this.favor} <= ${this.highFavor}`;
            if (this.favorVariance) {
                output += " (High Variance)";
            }
        }
        if (this.request > 0) {
            output += `\nRequest: ${this.lowRequest} => ${this.request} <= ${this.highRequest}`;
            if (this.requestVariance) {
                output += " (High Variance)";
            }
        }
        return output;
    }

    printImpactTraits() {
        let output = "";
        if (this.isCombat) {
            this.addImpactTrait("TechFilterType_Combat");
        }
        else if (this.isSocial) {
            this.addImpactTrait("TechFilterType_Social")
        }
        for(let key in this.impactTraits) {
            if (output != "") {
                output += "; ";
            }
            if (this.impactTraits[key] == "") {
                output += key;
            }
            else {
                output += `${key}-${this.impactTraits[key]}`
            }
        }
        return output;
    }

    pointVarianceRange() {
        if (this.technique.action == "Passive") {
            return "0 < 15 < 30";
        }

        let output = "";
        let lowestPts, lowPts, medPts, hiPts, highestPts;
        if (this.assessmentPercentage < 50) {
            lowestPts = this.averagePoints + Math.floor(this.averagePoints * (20 - 50)/ 100);
            lowPts = this.averagePoints + Math.floor(this.averagePoints * (26 - 50)/ 100);
            medPts = this.averagePoints + Math.floor(this.averagePoints * (32 - 50)/ 100);
            hiPts = this.averagePoints + Math.floor(this.averagePoints * (46 - 50)/ 100);
            highestPts = `${this.averagePoints}.`;
        }
        else {
            lowestPts = `${this.averagePoints}.`;
            lowPts = this.averagePoints + Math.floor(this.averagePoints * (60 - 50)/ 100);
            medPts = this.averagePoints + Math.floor(this.averagePoints * (66 - 50)/ 100);
            hiPts = this.averagePoints + Math.floor(this.averagePoints * (72 - 50)/ 100);
            highestPts = this.averagePoints + Math.floor(this.averagePoints * (80 - 50)/ 100);
        }
        output += lowestPts;
        if (lowPts != lowestPts) {
            output += ` <${lowPts}`;
        }
        if (medPts != lowPts) {
            output += ` <${medPts}`;
        }
        if (hiPts != medPts) {
            output += ` <${hiPts}`;
        }
        output += ` <${highestPts}`;
        return output;
    }

    assessTechnique() {
        let assessor = this;
        let attributeHandler = this.getFakeAttributeHandler();

        if (this.technique.forms.includes("OnEnter")) {
            assessor.onEnterEffect = true;
        }

        this.technique.effects.iterate(function (effect) {
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            assessor.assessEffect(effect, attributeHandler);
        });

        for (const key in this.technique.enhancementEffects) {
            let effect = this.technique.enhancementEffects[key];
            assessor.pointBreakdown.push({points: 0, rubric: ""});
            assessor.assessEffect(effect, attributeHandler);
        }

        this.getStructureAssessment();
        let customPoints = this.sheet.getRange(this.row, this.assessColumn + 2, 1, 1).getValues()[0];
        customPoints = isNaN(parseInt(customPoints)) ? 0 : parseInt(customPoints);
        if (customPoints != 0) {
            this.addPointsRubric(customPoints, `(Custom)`)
        }

        this.setAveragePoint(this.getEnergy(), this.technique);

        if (this.points == 0) {
            this.assessmentPercentage = undefined;
            this.setAssessment();
        } else {
            if (this.technique.action == "Passive") {
                this.assessmentPercentage = 20 + (assessor.points * 2);
            }
            else {
                let difference = assessor.points - this.averagePoints;
                this.assessmentPercentage = 50 + (difference * 100 / this.averagePoints);
            }
            this.setAssessment();
            this.getVarianceCalculation();
        }
    }

    getFakeAttributeHandler() {
        let attributeHandler = new AttributeHandler();
        attributeHandler.addMod(WuxDef.GetVariable("Attr_BOD"));
        attributeHandler.current[WuxDef.GetVariable("Attr_BOD")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_PRC"));
        attributeHandler.current[WuxDef.GetVariable("Attr_PRC")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_QCK"));
        attributeHandler.current[WuxDef.GetVariable("Attr_QCK")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_CNV"));
        attributeHandler.current[WuxDef.GetVariable("Attr_CNV")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_INT"));
        attributeHandler.current[WuxDef.GetVariable("Attr_INT")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("Attr_RSN"));
        attributeHandler.current[WuxDef.GetVariable("Attr_RSN")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("SB_MAX"));
        attributeHandler.current[WuxDef.GetVariable("SB_MAX")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("Potency"));
        attributeHandler.current[WuxDef.GetVariable("Potency")] = 0;
        attributeHandler.addMod(WuxDef.GetVariable("SB_ExcellentDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_ExcellentDef")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("SB_GreatDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_GreatDef")] = 4;
        attributeHandler.addMod(WuxDef.GetVariable("SB_GoodDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_GoodDef")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("SB_MedDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_MedDef")] = 2;
        attributeHandler.addMod(WuxDef.GetVariable("SB_LowDef"));
        attributeHandler.current[WuxDef.GetVariable("SB_LowDef")] = 1;
        attributeHandler.addMod(WuxDef.GetVariable("TargetFavor"));
        attributeHandler.current[WuxDef.GetVariable("TargetFavor")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Recall"));
        attributeHandler.current[WuxDef.GetVariable("Recall")] = 3;
        attributeHandler.addMod(WuxDef.GetVariable("CR"));
        attributeHandler.current[WuxDef.GetVariable("CR")] = 1;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_HV"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_HV")] = this.basePoints - 1;
        attributeHandler.addMod(WuxDef.GetVariable("TargetHV"));
        attributeHandler.current[WuxDef.GetVariable("TargetHV")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Soc_Favor"));
        attributeHandler.current[WuxDef.GetVariable("Soc_Favor")] = 15;
        attributeHandler.addMod(WuxDef.GetVariable("StrideRoll"));
        attributeHandler.current[WuxDef.GetVariable("StrideRoll")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_Mv"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_Mv")] = 5;
        attributeHandler.addMod(WuxDef.GetVariable("Cmb_MvDash"));
        attributeHandler.current[WuxDef.GetVariable("Cmb_MvDash")] = 4;
        attributeHandler.addMod(WuxDef.GetVariable("MvPotency"));
        attributeHandler.current[WuxDef.GetVariable("MvPotency")] = 7;

        return attributeHandler;
    }

    getEnergy() {
        return isNaN(parseInt(this.technique.en)) ? 0 : parseInt(this.technique.en);
    }
    getEnergyRestriction() {
        let restTypes = ["Brief", "Short", "Long"];
        if (restTypes.includes(this.technique.action)) {
            return 9;
        }
        return this.technique.tier + 1;
    }

    setAveragePoint(energy, technique) {
        let techniquePointsCalc = this.getAveragePoints(energy, technique);

        this.averagePoints = techniquePointsCalc.points;
        this.pointsCalc = `(${techniquePointsCalc.pointCalc.join(",")})`;
    }

    getAveragePoints(energy, technique) {
        let output = {
            points: 0,
            pointCalc: []
        }

        let energyValue = [8,11,16,22,30,39,50,62,76,91];

        output.points = energyValue[energy];
        if (technique.action == "Full") {
            output.points += this.basePoints + 6;
            output.pointCalc.push("Full");
        }
        else if (technique.action == "Assist") {
            output.points += 1;
            output.pointCalc.push("Assist");
        }
        else if (technique.action == "Swift") {
            let lookupName = WuxDef.GetAbbreviation("Job") + "_" + technique.techSet.split(";")[0].trim();
            if (WuxDef.GetTitle(lookupName) == "") {
                output.points = Math.ceil(output.points * 0.5);
                output.pointCalc.push("Swift Job");
            }
        }

        if (technique.willPower > 0) {
            output.points += Math.ceil(technique.willPower / 5);
            output.pointCalc.push("Magic");
        }
        
        if (technique.boon > 0) {
            output.points += 5;
            output.pointCalc.push("Magic");
        }

        return output;
    }

    getEnhancementPoints() {
        let points = this.getAveragePoints(this.getEnergy(), this.technique);
        let enhancePoints = this.getAveragePoints(this.getEnergy() + 1, this.technique);
        if (this.technique.action == "Full") {
            enhancePoints.points++;
        }
        return enhancePoints.points - points.points;
    }

    getVarianceCalculation() {
        let variance = 0;
        return;
        if (this.dps > 0) {
            variance = this.dps - this.lowDps;
            if (variance / this.dps > 0.5) {
                this.dpsVariance = true;
                this.assessment += "*";
            }
        }
        if (this.will > 0) {
            variance = this.will - this.lowWill;
            if (variance / this.will > 0.5) {
                this.willVariance = true;
                this.assessment += "*";
            }
        }
        if (this.favor > 0) {
            variance = this.favor - this.lowFavor;
            if (variance / this.favor > 0.5) {
                this.favorVariance = true;
                this.assessment += "*";
            }
        }
    }

    assessEffect(effect, attributeHandler) {
        switch (effect.type) {
            case "Boost":
                this.getBoostAssessment(effect, attributeHandler);
                break;
            case "Damage":
                this.getDamageAssessment(effect, attributeHandler);
                break;
            case "Break":
                this.getBreakAssessment(effect, attributeHandler);
                break;
            case "HP":
                this.getHPAssessment(effect, attributeHandler);
                break;
            case "WILL":
                this.getWillAssessment(effect, attributeHandler);
                break;
            case "Vitality":
                this.getVitalityAssessment(effect, attributeHandler);
                break;
            case "Surge":
                this.getSurgeAssessment(effect, attributeHandler);
                break;
            case "Impatience":
                this.getImpatienceAssessment(effect, attributeHandler);
                break;
            case "Favor":
                this.getFavorAssessment(effect, attributeHandler);
                break;
            case "Influence":
                this.getInfluenceAssessment(effect);
                break;
            case "Request":
                this.getRequestAssessment(effect, attributeHandler);
                break;
            case "Status":
                this.getStatusAssessment(effect, attributeHandler);
                break;
            case "BreakFocus":
                this.getBreakFocusAssessment(effect, attributeHandler);
                break;
            case "CallAssist":
                this.getCallAssistAssessment();
                break;
            case "Terrain":
                this.getTerrainAssessment(effect, attributeHandler);
                break;
            case "Structure":
                this.getStructureAssessmentData(effect, attributeHandler);
                break;
            case "Move":
                this.getMoveAssessment(effect, attributeHandler);
                break;
            case "EN":
                this.getEnAssessment(effect, attributeHandler);
                break;
            case "FreeFocus":
                this.getFreeFocusAssessment(effect, attributeHandler);
                break;
            default:
                if (effect.subType != "") {
                    this.addImpactTrait(`TechFilterType_${effect.subType}`);
                }
        }
    }

    getBoostAssessment(effect, attributeHandler) {
        attributeHandler.current[WuxDef.GetVariable("CR")] = 2;
        let output = this.getDiceFormula(effect, attributeHandler);
        attributeHandler.current[WuxDef.GetVariable("CR")] = 1;
        let def = WuxDef.Get(effect.effect);
        let message = `(${def.getTitle()})`;
        switch (effect.effect) {
            case "HP":
            case "WILL":
                output.value = Math.ceil(output.value * 0.075);
                break;
            case "Cmb_HV":
                output.value = Math.ceil(output.value * 0.2);
                break;
            case "Def_Brace":
            case "Def_Warding":
            case "Def_Logic":
            case "Def_Resolve":
                // 2 = 2, 3 = 4, 4 = 6, 5 = 8
                output.value = Math.ceil(Math.abs(output.value) + Math.max(Math.ceil(Math.abs(output.value) * 0.75 - 1.5), 0)) * (effect.subType == "Penalty" ? -1 : 1);
                break;
            case "Def_Evasion":
            case "Def_Insight":
                output.value = (effect.subType == "Penalty" ? 0 : 1) + Math.ceil(Math.abs(output.value) + Math.max(Math.ceil(Math.abs(output.value) * 0.75 - 1.5), 0)) * (effect.subType == "Penalty" ? -1 : 1);
                break;
            case "StartEN":
            case "RoundEN":
                output.value = Math.ceil(output.value * 2);
                break;
            case "Cmb_Mv":
            case "Cmb_MvDash":
                output.value = Math.ceil(output.value * 2);
                break;
            case "Cmb_Armor":
            case "Cmb_BurnResist":
            case "Cmb_ColdResist":
            case "Cmb_EnergyResist":
            case "Cmb_ForceResist":
            case "Cmb_PiercingResist":
            case "Cmb_PsycheResist":
                break;
            case "ConsumableSlots":
                output.value = Math.ceil(output.value * 2);
                break;
        }

        this.addPointsRubric(output.value, message);
    }

    getDamageAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];

        let message;
        if (subType == "Burst Damage") {
            output.value = Math.max(Math.floor(output.value * 0.25), 1);
            message = `(Burst)`;

            if (effect.defense != "WillBreak") {
                this.addPointsRubric(output.value, message);
            }
            this.addTargetedPointsRubric(effect, output.value);
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (subType == "Status") {
            message = `(Status)`;

            if (effect.defense != "WillBreak") {
                this.addPointsRubric(output.value, message);
            }
            this.addTargetedPointsRubric(effect, output.value);
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (subType == "Special") {
            this.isCombat = true;
            this.addImpactTrait(effect.effect);
        }
        else if (effect.effect == "Dmg_Psyche") {
            if (effect.target == "Self") {
                output.value = Math.floor(output.value * -0.5);
            } else {
                this.will += output.value;
                this.lowWill += output.lowValue;
                this.highWill += output.highValue;
                if (this.dps > 0) {
                    output.value = Math.floor(output.value * 0.5);
                }
                else {
                    output.value = Math.ceil(output.value * (1.5 - (this.patience * (this.technique.action != "Full" ? 0.5 : 0.25))));
                }
            }
            message = `(Psyche)`;
            if (effect.defense == "Enhance") {
                this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                return;
            }
            else {
                this.addPointsRubric(output.value, message);
                this.addDefensePointsRubric(effect, output.value, message);
                this.addTargetedPointsRubric(effect, output.value);
                this.isSocial = true;
                this.addImpactTrait(effect.effect);
            }
        }
        else {
            let points = output.value;
            message = `(HP)`;

            if (effect.defense == "Enhance") {
                let enhancePoints = this.getTargetPointsRubric(effect, output.value);
                if (this.technique.impacts.indexOf("Brutal") >= 0) {
                    points += Math.floor(output.value * 0.33);
                }
                if (this.technique.impacts.indexOf("AP") >= 0) {
                    points += Math.floor(output.value * 0.33);
                }
                this.addPointsRubric(0, `${enhancePoints.points + points} (max ${this.getEnhancementPoints()})`);
                return;
            }
            else {
                if (effect.target == "Self") {
                    points = Math.floor(output.value * -0.5);
                } else {
                    if (this.dps > 0) {
                        points = Math.floor(output.value * 0.9);
                    }
                    this.dps += output.value;
                    this.lowDps += output.lowValue;
                    this.highDps += output.highValue;
                }
                this.addPointsRubric(points, message);
                this.isCombat = true;
                this.addImpactTrait(effect.effect);
            }
            this.addDefensePointsRubric(effect, output.value, message);
            this.addTargetedPointsRubric(effect, output.value);
        }

        let effectPts;
        if (this.technique.impacts.indexOf("Brutal") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(Brutal)`);
        }
        if (this.technique.impacts.indexOf("AP") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(AP)`);
        }
    }

    getBreakAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message;

        output.value = Math.floor(output.value * 0.5);
        message = `(Break)`;
        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);

        this.isCombat = true;
        this.addImpactTrait("Trait_Break");
    }

    getHPAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let subTypeParts = effect.subType.split(":");
        let subType = subTypeParts[0];

        let message;
        switch (subType) {
            case "Heal":
                output.value = Math.floor(output.value * 2.5);
                message = `(Heal HP)`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                    return;
                }
                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Heal");
                break;
            case "Surge":
                message = `(Surge HP)`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
                    return;
                }

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(output.value, message);
                }
                this.addTargetedPointsRubric(effect, output.value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Heal");
                break;
            case "Special":
                this.isCombat = true;
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.dps += output.value;
                    this.lowDps += output.lowValue;
                    this.highDps += output.highValue;
                }
                message = `(HP)`;

                if (effect.defense == "WillBreak") {
                }
                else {
                    this.addPointsRubric(output.value, message);
                    this.isCombat = true;
                }
                this.addDefensePointsRubric(effect, output.value, message);
                this.addTargetedPointsRubric(effect, output.value);
                break;
        }

        let effectPts;
        if (this.technique.impacts.indexOf("Brutal") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(Brutal)`);
        }
        if (this.technique.impacts.indexOf("AP") >= 0) {
            effectPts = Math.floor(output.value * 0.33);
            this.addPointsRubric(effectPts, `(AP)`);
        }
    }

    getWillAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);

        let message;
        switch (effect.subType) {
            case "Heal":
                output.value = Math.floor(output.value * 1.5);
                message = `(Heal Will)`;
                break;
            default:
                if (effect.target == "Self") {
                    output.value = Math.floor(output.value * -0.5);
                } else {
                    this.will += output.value;
                    this.lowWill += output.lowValue;
                    this.highWill += output.highValue;
                    if (this.dps > 0) {
                        output.value = Math.floor(output.value * 0.5);
                    }
                }
                message = `(Will)`;
                break;
        }

        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getVitalityAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 21;
        if (effect.subType == "Heal") {
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Heal");
        }
        else {
            output.value = Math.floor(output.value * 1.5);
            this.isCombat = true;
        }
        let message = `(${effect.subType != "" ? `${effect.subType} ` : ""}Vit)`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Atk-Vitality`);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getSurgeAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value *= 10;
        if (effect.subType == "Heal") {
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Heal");
        }
        else {
            output.value = Math.floor(output.value * 1.5);
            this.isCombat = true;
        }
        let message = `(${effect.subType != "" ? `${effect.subType} ` : ""}Surge)`;

        if (effect.defense == "WillBreak") {
            this.addImpactTrait(`Trait_Will:Trait_Atk-Surge`);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.addTargetedPointsRubric(effect, output.value);
    }

    getImpatienceAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Heal":
                if (effect.defense == "WillBreak") {
                    output.value *= 5;
                    this.addPointsRubric(0, `${output.value} (Heal Impatience)`);
                }
                else {
                    output.value *= 10;
                    this.addPointsRubric(output.value, `(Heal Impatience)`);
                }
                break;
            default:
                this.patience += output.value;
                break;
        }
        this.isSocial = true;
    }

    getFavorAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        let message;
        switch (effect.subType) {
            case "Heal":
                if (effect.defense != "WillBreak") {
                    output.value *= 6;
                }
                message = `(Heal Favor)`;
                break;
            default:
                this.favor += output.value;
                this.lowFavor += output.lowValue;
                this.highFavor += output.highValue;
                if (effect.defense != "WillBreak") {
                    output.value *= (10 - (this.patience * (this.technique.action != "Full" ? 4 : 2)));
                }
                message = `(Favor)`;
                break;
        }

        if (effect.defense == "WillBreak") {
            message = `${output.value} (Favor)`;
            this.addPointsRubric(0, message);
        }
        else {
            this.addPointsRubric(output.value, message);
        }
        this.isSocial = true;
        this.addImpactTrait("Trait_Favor");
        this.addDefensePointsRubric(effect, output.value, message);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getInfluenceAssessment(effect) {
        let subTypes = effect.subType.split(":");
        let points = 0;
        let message = "";
        switch (subTypes[0]) {
            case "Raise":
            case "Lower":
                if (effect.defense != "WillBreak") {
                    points = 14;
                }
                message = `(${subTypes[0]} Influence)`;
                break;
            case "Adjust":
                if (effect.defense != "WillBreak") {
                    points = 16;
                }
                message = `(${subTypes[0]} Influence)`;
                break;
            case "Add":
                if (subTypes.length > 1) {
                    if (subTypes[1] == "Low") {
                        points = 17;
                    } else if (subTypes[1] == "Moderate") {
                        points = 30;
                    }
                }
                message = `(${subTypes[0]} Influence)`;
                break;
        }

        this.isSocial = true;
        this.addImpactTrait("Trait_Influence");
        if (effect.defense == "WillBreak") {
            message = `${points} ${message}`;
            this.addPointsRubric(0, message);
        }
        else {
            this.addPointsRubric(points, message);
        }
    }

    getRequestAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value = Math.ceil(output.value * (2 - (this.patience * (this.technique.action != "Full" ? 0.5 : 0.25))));

        if (effect.subType == "Bargain") {
            output.value += 3;
        }

        if (effect.defense == "Enhance") {
            this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
            return;
        }

        this.request += output.value;
        this.lowRequest += output.lowValue;
        this.highRequest += output.highValue;
        let message = `(Request)`;
        this.addPointsRubric(output.value, message);
        this.addDefensePointsRubric(effect, output.value);
        this.isSocial = true;
        this.addImpactTrait("Trait_Request");
    }

    getTerrainAssessment(effect, attributeHandler) {
        let effectDefinition = WuxDef.Get(effect.effect);
        let value = effectDefinition.formula.getValue(attributeHandler);
        let message = "";
        switch (effect.subType) {
            case "Add":
                message = `(Add ${effectDefinition.getTitle()})`;
                break;
            case "Remove":
                value = Math.floor(value * 0.75);
                message = `(Remove ${effectDefinition.getTitle()})`;
                break;
        }

        this.addPointsRubric(value, message);
        this.addTargetedPointsRubric(effect, value);
        this.addImpactTrait("TechFilterType_Utility");
        this.addImpactTrait("Trait_Terrain");
    }

    getStructureAssessmentData(effect, attributeHandler) {
        if (effect.defense == "Enhance") {
            let pointMod = this.getDiceFormula(effect, attributeHandler).value * this.getStructureValueMod();
            this.addPointsRubric(0, `${pointMod} (max ${this.getEnhancementPoints()})`);
            return;
        }
        let output = this.getDiceFormula(effect, attributeHandler);
        switch (effect.subType) {
            case "Count":
                this.structureCount += output.value;
                break;
            case "HP":
                this.structureHP += output.value;
                break;
            case "Armor":
                this.structureArmor += output.value;
                break;
            case "Dimensions":
                break;
        }
    }

    getStructureAssessment() {
        if (this.structureCount > 0) {
            let value = this.structureCount * this.getStructureValueMod();
            let message = `(Structure)`;
            this.addPointsRubric(value, message);
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait("Trait_Structure");
        }
    }
    
    getStructureValueMod() {
        return Math.ceil(this.structureHP / 2) + Math.ceil(this.structureArmor);
    }

    getMoveAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);

        if (effect.defense == "Enhance") {
            switch (effect.subType) {
                case "Teleport":
                    output.value = Math.floor(output.value * 2);
                    break;
                case "Fly":
                case "FreeMove":
                    output.value = Math.floor(output.value * 1.5);
                    break;
                case "Invis":
                case "Sneak":
                    output.value = Math.floor(output.value * 2);
                    break;
                case "ForceMove":
                case "Pushed":
                case "Pulled":
                    output.value = Math.floor(output.value * (1 + (output.value * 0.5)));
                    break;
                case "Jump": {
                    let jumpHeight = parseInt(effect.effect);
                    output.value += (isNaN(jumpHeight) ? 0 : jumpHeight) * 2;
                    break;
                }
                case "Temporal":
                    output.value *= 3;
                    break;
            }
            this.addPointsRubric(0, `${output.value} (max ${this.getEnhancementPoints()})`);
            return;
        }

        let impactTrait = `Trait_Move`;
        switch (effect.subType) {
            case "Teleport":
                output.value = Math.floor(output.value * 2);
                impactTrait = `Trait_Move-Special`;
                break;
            case "Fly":
            case "FreeMove":
                output.value = Math.floor(output.value * 1.5);
                impactTrait = `Trait_Move-Special`;
                break;
            case "Invis":
            case "Sneak":
                output.value = Math.floor(output.value * 2);
                impactTrait = `Trait_Move-Sneak`;
                break;
            case "ForceMove":
            case "Pushed":
            case "Pulled":
                output.value = Math.floor(output.value * (1 + (output.value * 0.5)));
                impactTrait = `Trait_ForceMove`;
                break;
            case "Fall":
                output.value = 2;
                impactTrait = `Trait_ForceMove`;
                break;
            case "Jump": {
                let height = parseInt(effect.effect);
                output.value += (isNaN(height) ? 0 : height) * 2;
                break;
            }
            case "Temporal":
                output.value *= 3;
                break;
        }
        let message = `(${effect.subType == "" ? "Move" : effect.subType})`;

        this.addPointsRubric(output.value, message);
        if (impactTrait != "") {
            this.isCombat = true;
            this.addImpactTrait("TechFilterType_Utility");
            this.addImpactTrait(impactTrait);
        }
        this.addDefensePointsRubric(effect, output.value);
        this.addTargetedPointsRubric(effect, output.value);
    }

    getEnAssessment(effect, attributeHandler) {
        let output = this.getDiceFormula(effect, attributeHandler);
        output.value -= 1;
        output.value *= 2;
        let message = `(EN)`;
        this.addPointsRubric(output.value, message);
        this.addImpactTrait("TechFilterType_Utility");
        this.addImpactTrait(`Trait_EN`);
    }

    getFreeFocusAssessment() {
        this.addImpactTrait("TechFilterType_Utility");
        this.addPointsRubric(10, "(Free Focus)");
    }

    getStatusAssessment(effect, attributeHandler) {
        let state = WuxDef.Get(effect.effect);
        let value = 0;
        let message = "";
        switch (effect.subType) {
            case "Set":
            case "Add":
            case "Enhancing":
            case "Focus":
            case "Self":
                let onlySingleTarget = ["Paralyzed", "Frozen"];
                if (this.technique.target != "Target" && onlySingleTarget.includes(state.getTitle())) {
                    this.isInvalid = true;
                    this.invalidReason = `${state.getTitle()} can only target a single target`;
                    return;
                }

                value = parseInt(state.points);
                let formula = this.getDiceFormula(effect, attributeHandler);
                if (formula.value > 0) {
                    value *= formula.value;
                }
                message = `(Add ${state.getTitle()})`;

                if (effect.defense == "Enhance") {
                    this.addPointsRubric(0, `${value} (max ${this.getEnhancementPoints()})`);
                    return;
                }
                if (effect.defense == "WillBreak") {
                    message = `${value} (Add ${state.getTitle()})`;
                    this.addPointsRubric(0, message);
                }
                else {
                    let onlySingleTargetWillbreak = ["Jolted", "Blinded"];
                    if (this.technique.target != "Target" && onlySingleTargetWillbreak.includes(state.getTitle())) {
                        this.isInvalid = true;
                        this.invalidReason = `${state.getTitle()} can only target a single target`;
                        return;
                    }

                    this.addPointsRubric(value, message);
                    if (!state.isBeneficial) {
                        this.addDefensePointsRubric(effect, value, message);
                    }
                    this.addTargetedPointsRubric(effect, value);

                    if (effect.effect != "Stat_Engaged") {
                        this.statusCount++;
                        if (this.statusCount > 1) {
                            value = Math.floor(this.statusCount * 4);
                            this.addPointsRubric(value, `(MultiStat)`);
                        }
                    }
                }
                if (state.isBeneficial || !this.isCombat) {
                    this.addImpactTrait("TechFilterType_Utility");
                }
                if (state.type == "Emotion") {
                    this.addImpactTrait("TechFilterType_Emotion");
                }
                if (state.canBeFiltered) {
                    this.addImpactTrait(state.name);
                }
                break;
            case "Trigger":
                value = Math.floor(parseInt(state.points) * 0.5);
                message = `(Trigger ${state.getTitle()})`;

                this.addPointsRubric(value, message);
                this.addDefensePointsRubric(effect, value, message);
                this.addTargetedPointsRubric(effect, value);
                break;
            case "Remove":
                value = Math.floor(parseInt(state.points) * 0.75);
                message = `(Remove ${state.getTitle()})`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait(`Trait_Cleanse:${state.name}`);
                }
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");

                if (effect.effect != "Stat_Engaged") {
                    this.statusCount++;
                    if (this.statusCount > 1) {
                        let subvalue = Math.max(-2, -1 * value);
                        this.addPointsRubric(subvalue, `(MultiStat)`);
                    }
                }
                break;
            case "Choose":
                value = parseInt(state.points) + 2;
                message = `(Choose ${state.getTitle()})`;

                if (effect.defense != "WillBreak") {
                    this.addPointsRubric(value, message);
                    this.addImpactTrait("TechFilterType_Utility");
                }
                this.addTargetedPointsRubric(effect, value);
                break;
            case "Remove Any":
                value = 10;
                message = `(Remove Any)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
            case "Remove All":
                value = 20;
                message = `(Remove All)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
            case "Remove Will":
                value = 14;
                message = `(Remove Will)`;

                this.addPointsRubric(value, message);
                this.addTargetedPointsRubric(effect, value);
                this.addImpactTrait("TechFilterType_Utility");
                this.addImpactTrait("Trait_Cleanse");
                break;
        }
    }

    getBreakFocusAssessment() {
        let message = `(Break Focus)`;
        this.addPointsRubric(28, message);
        this.addImpactTrait("TechFilterType_Utility");
    }

    getCallAssistAssessment() {
        let message = `(Assist)`;
        this.addPointsRubric(5, message);
        this.addImpactTrait("TechFilterType_Utility");
    }

    addDefensePointsRubric(effect, points) {
        if (effect.defense == "Core") {
            let pointTotal = Math.ceil(points * this.defenseModifier);
            if (pointTotal != 0) {
                this.addPointsRubric(pointTotal, `(${this.defenseModName})`);
            }
        } else if (effect.defense == "") {
            let pointTotal = Math.ceil(points * 0.65);
            this.addPointsRubric(pointTotal, `(Unavoidable)`);
        }
    }

    addTargetedPointsRubric(effect, points) {
        if (effect.target == "Self") {
            return;
        }
        let output = this.getTargetPointsRubric(effect, points);
        if (output.points == 0) {
            return;
        }
        this.addPointsRubric(output.points, `(${output.name})`);
        this.pointsRubric += "\n";
    }

    getTargetPointsRubric(effect, points) {
        let output = {
            points: 0,
            name: 0
        }

        switch (this.target) {
            case "Targets":
            case "Spaces":
            case "Objects":
                output.points = Math.floor(points * (this.size - 1) * 0.65);
                output.name = `${this.size} ${this.target}`;
                break;
            case "Blast":
            case "Blast(3H)":
            case "Blast(5H)":
                output.points = Math.floor(points * this.getAreaPointMod(0.75, 1));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Radial":
                output.points = Math.floor(points * this.getAreaPointMod(0.6, 1));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Cone":
            case "Line":
                output.points = Math.floor(points * this.getAreaPointMod(0.4, 0.66));
                output.name = `${this.target} ${this.size}`;
                break;
            case "Wide Line":
                output.points = Math.floor(points * this.getAreaPointMod(0.6, 0.66));
                output.name = `${this.target} ${this.size}`;
                break;
        }

        if (this.onEnterEffect && effect.type != "Terrain") {
            output.points += 4;
            output.name += `${output.name != "" ? "; " : ""}On Enter`;
        }

        return output;
    }

    getAreaPointMod(baseMod, incrementMod) {
        let i = this.size;
        let output = 0;
        while (i > 0) {
            output += baseMod;
            baseMod *= incrementMod;
            i--;
        }
        return output;
    }

    addPointsRubric(points, message) {
        this.points += points;
        this.pointBreakdown[this.pointBreakdown.length - 1].points += points;
        if (this.pointsRubric != "") {
            this.pointsRubric += " + ";
        }
        if (this.pointBreakdown[this.pointBreakdown.length - 1].rubric != "") {
            this.pointBreakdown[this.pointBreakdown.length - 1].rubric += ` + ${points}`;
        }
        this.pointsRubric += `${points}${message}`;
        this.pointBreakdown[this.pointBreakdown.length - 1].rubric += message;
    }

    getDiceFormula(effect, attributeHandler) {
        let value = effect.formula.getValue(attributeHandler);
        let lowValue = value + effect.getLowDiceValue();
        let highValue = value + effect.getHighDiceValue();
        value += effect.getAverageDiceValue();
        return {value: value, lowValue: lowValue, highValue: highValue};
    }

    addImpactTrait(traitName) {
        let traitParts = traitName.split("-");
        let traitBase = traitParts[0];
        let traitType = "";
        if (traitParts.length > 1) {
            traitType = traitParts[1];
        }
        if (this.impactTraits[traitBase] == undefined || this.impactTraits[traitBase] == "") {
            this.impactTraits[traitBase] = traitType;
        }
    }
}

