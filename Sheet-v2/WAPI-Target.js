class TargetData {
    constructor(data) {
        this.baseConstructor(data);
    }

    baseConstructor(data) {
        this.createEmpty();
        if (data != undefined) {
            let dataType = data.type;
            if (dataType == undefined) {
                dataType = data.get("_type");
            }
            if (dataType != undefined) {
                if (dataType == "api") {
                    this.importMessage(data);
                }
                if (dataType == "graphic") {
                    this.importTokenData(data);
                }
            }
            else if (data.charId != undefined) {
                this.importJSON(data);
            }
        }
    }

    createEmpty() {
        this.charId = "";
        this.charName = "";
        this.tokenId = "";
        this.displayName = "";
        this.owner = "";
        this.elem = "";
        this.teamIndex = 0;
    }

    importJSON(json) {
        this.charId = json.charId;
        this.charName = json.charName;
        this.tokenId = json.tokenId;
        this.displayName = json.displayName;
        this.owner = json.owner;
        this.elem = json.elem;
        this.teamIndex = json.teamIndex;
    }

    importMessage(msg) {
        if (msg.selected && msg.selected.length > 0) {
            this.importTokenData(TokenReference.GetToken(msg.selected[0]._id));
        }
    }

    importTokenData(token) {
        if (token == undefined) {
            Debug.LogError(`[TargetData] No token exists.`);
            return;
        }

        this.charId = token.get('represents');
        if (this.charId == undefined || this.charId == "") {
            Debug.LogError(`[TargetData] (${token.name}) has no representative character.`);
            return;
        }
        this.tokenId = token.get("_id");
        this.displayName = token.get("name");
        Debug.Log(`[TargetData] Importing token data for ${this.displayName} (${this.charId})`);

        let character = getObj('character', this.charId);
        this.charName = character.get("name");
        this.setOwner(character);
        this.setCharacterData();
    }

    getElementStatus(affinity) {
        switch (affinity) {
            case "Wood":
                return "status_green";
            case "Fire":
                return "status_red";
            case "Earth":
                return "status_brown";
            case "Metal":
                return "status_purple";
            case "Water":
                return "status_blue";
            default:
                return "status_pink";
        }
    }

    findCharacterByName(characterName) {
        let characters = findObjs({
            _type: 'character',
            name: characterName
        }, { caseInsensitive: true });
        if (characters.length > 0) {
            return characters[0];
        }

        characters = findObjs({ _type: 'character' });
        characters.forEach(function (chr) {
            if (chr.get('name') == characterName) {
                return chr;
            }
        });
        return undefined;
    }

    importCharacterByName(characterName) {
        let character = this.findCharacterByName(characterName);
        if (character == undefined) {
            Debug.LogError(`[importCharacterByName] Error. Character ${characterName} could not be found.`);
            return;
        }

        this.charId = character.get("_id");
        this.charName = character.get("name");
        this.setOwner(character);
        this.setCharacterData();
    }

    setOwner(character) {
        let ownerId = character.get("controlledby").split(",")[0];
        if (ownerId != "") {
            this.owner = getObj("player", ownerId).get("_displayname");
        }
    }
    setCharacterData() {
        let attributeHandler = new SandboxAttributeHandler(this.charId);
        let targetData = this;
        let displayNameVar = WuxDef.GetVariable("DisplayName");
        let affinityVar = WuxDef.GetVariable("Affinity");
        attributeHandler.addMod(displayNameVar);
        attributeHandler.addMod(affinityVar);
        attributeHandler.addFinishCallback(function (attrHandler) {
            let targetDisplayName = attrHandler.parseString(displayNameVar);
            if (targetDisplayName.trim() != "") {
                targetData.displayName = targetDisplayName;
            }
            targetData.elem = targetData.getElementStatus(attrHandler.parseString(affinityVar));
        });
        attributeHandler.run();
    }

    setTeamIndex(index) {
        this.teamIndex = index;
    }
}
class TokenTargetData extends TargetData {
    constructor(token, targetData) {
        super(undefined);
        if (token == undefined) {
            return;
        }

        if (targetData != undefined) {
            this.importJSON(targetData);
            this.token = token;
        }
        else {
            this.baseConstructor(token);
        }
    }
    createEmpty() {
        super.createEmpty();
        this.token = undefined;
    }
    importTokenData(token) {
        this.token = token;
        super.importTokenData(token);
    }

    importTokenDataOnPlayerPage() {
        var tokens = findObjs({
            _pageid: Campaign().get("playerpageid"),
            _type: "graphic",
            represents: this.charId
        });
        if (tokens.length == 0) {
            return;
        }
        this.token = tokens[0];
        this.tokenId = this.token.get("_id");
    }

    // token bar
    initToken() {
        if (this.token == undefined) {
            Debug.Log (`[TokenTargetData] No token data exists for ${this.charName}`);
            return false;
        }
        this.token.set("bar_location", "overlap_bottom");
        return true;
    }
    setBar(barIndex, variableObj, showBar, showText) {
        if (variableObj == undefined) {
            this.token.set(`bar${barIndex}_link`, "");
            this.token.set(`bar${barIndex}_value`, "");
            this.token.set(`bar${barIndex}_max`, "");
        }
        else {
            this.token.set(`bar${barIndex}_link`, variableObj.get("_id"));
            this.token.set(`bar${barIndex}_value`, variableObj.get("current"));
            this.token.set(`bar${barIndex}_max`, variableObj.get("max"));
        }
        this.token.set(`showplayers_bar${barIndex}`, showBar);
        this.token.set(`showplayers_bar${barIndex}text`, showText ? "2" : "0");
    }
    unlinkBar(barIndex) {
        if (this.token == undefined) {
            Debug.LogError(`[TokenTargetData] No token data exists for ${this.charName}`);
            return;
        }
        this.token.set(`bar${barIndex}_link`, "");
    }
    isBarLinked(barIndex) {
        if (this.token == undefined) {
            Debug.LogError(`[TokenTargetData] No token data exists for ${this.charName}`);
            return false;
        }
        let barLink = this.token.get(`bar${barIndex}_link`);
        return barLink != undefined && barLink != "";
    }
    setBarValue(barIndex, value) {
        this.token.set(`bar${barIndex}_value`, value);
    }

    // nameplate
    showTokenName(isShown) {
        if (isShown) {
            this.token.set("name", this.displayName);
            this.token.set("showname", true);
            this.token.set("showplayers_name", true);
        }
        else {
            this.token.set("showname", false);
        }
    }

    // tooltip
    showTooltip(isShown) {
        this.token.set("show_tooltip", isShown);
        if (!isShown) {
            this.setTooltip("");
        }
    }
    setTooltip(value) {
        this.token.set("tooltip", value);
    }

    // status settings
    setEnergyIcon(value) {
        this.setIcon(this.elem, value);
    }
    setTurnIcon(value) {
        this.setIcon("status_yellow", value);
    }
    setIcon(iconName, value) {
        if (this.token == undefined) {
            Debug.LogError(`[TokenTargetData] No token data exists for ${this.charName}`);
            return;
        }
        this.token.set(iconName, value);
    }
    getIcon(iconName) {
        if (this.token == undefined) {
            Debug.LogError(`[TokenTargetData] No token data exists for ${this.charName}`);
            return "";
        }
        let value = this.token.get(iconName);
        if (value == undefined || value == "") {
            return 0;
        }
        return value;
    }

    // Modifiers
    setDisplayName() {
        let attributeHandler = new SandboxAttributeHandler(this.charId);
        let tokenData = this;
        let displayNameVar = WuxDef.GetVariable("DisplayName");
        attributeHandler.addMod(displayNameVar);
        attributeHandler.addFinishCallback(function (attrHandler) {

            let targetDisplayName = attrHandler.parseString(displayNameVar);
            if (targetDisplayName.trim() != "") {
                tokenData.displayName = targetDisplayName;
            }
        });
        attributeHandler.run();
    }
    addMod(modDefinitionName, attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler,
            modDefinitionName,
            value,
            this.addModifierToAttribute,
            function (results, attrHandler, attributeVar) {
                attrHandler.addUpdate(attributeVar, results.newValue, false);
            }
        );
    }
    setMod(modDefinitionName, attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler,
            modDefinitionName,
            value,
            this.setModifierToAttribute,
            function (results, attrHandler, attributeVar) {
                attrHandler.addUpdate(attributeVar, results.newValue, false);
            }
        );
    }

    // Social Modifiers
    addImpatience(attributeHandler, value, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToImpatience : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 1, value,
            this.addModifierToAttribute, resultsCallback);
    }
    emptyImpatience(attributeHandler, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToImpatience : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 1, 0,
            this.setModifierToAttribute, resultsCallback);
    }
    applyResultsToImpatience(results, attrHandler, attributeVar, tokenTargetData) {
        tokenTargetData.setBarValue(1, results.newValue);
        return results;
    }
    setMaxFavor(attributeHandler, value) {
        this.token.set(`bar3_max`, value);
    }
    addFavor(attributeHandler, value, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToFavor : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 3, value,
            this.addModifierToAttributeNoCap, resultsCallback);
    }
    emptyFavor(attributeHandler, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToFavor : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 3, 0,
            this.setModifierToAttribute, resultsCallback);
    }
    applyResultsToFavor(results, attrHandler, attributeVar, tokenTargetData) {
        tokenTargetData.setBarValue(3, results.newValue);
        return results;
    }
    
    // Combat Modifiers
    addHp(attributeHandler, value, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToHp : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 1, value,
            this.addModifierToAttribute, resultsCallback);
    }
    setHpToFull(attributeHandler, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToHp : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 1, "max",
            this.setModifierToAttribute, resultsCallback);
    }
    applyResultsToHp(results, attrHandler, attributeVar, tokenTargetData) {
        tokenTargetData.setBarValue(1, results.newValue);
        return results;
    }
    addWill(attributeHandler, value, resultsCallback, modifyCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToWill : resultsCallback;
        modifyCallback = modifyCallback == undefined ? this.addModifierToAttribute : modifyCallback;
        this.modifyBarAttribute(attributeHandler, 2, value,
            modifyCallback, resultsCallback);
    }
    setWillToFull(attributeHandler, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToWill : resultsCallback;
        this.modifyBarAttribute(attributeHandler, 2, "max",
            this.setModifierToAttribute, resultsCallback);
    }
    applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData) {
        tokenTargetData.setBarValue(2, results.newValue);
        return results;
    }
    addEnergy(attributeHandler, value, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToEnergy : resultsCallback;
        
        if (this.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "EN", value,
                this.addModifierToAttribute, resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, this.elem, value, 
                function (results, value, attributeHandler, tokenTargetData) {
                    results.max = 9;
                    return tokenTargetData.addModifierToAttribute(results, value, attributeHandler, tokenTargetData);
                }, resultsCallback);
        }
    }
    setEnergyToStart(attributeHandler, resultsCallback) {
        let startEnVar = WuxDef.GetVariable("StartEN");
        attributeHandler.addMod(startEnVar);
        resultsCallback = resultsCallback == undefined ? this.applyResultsToEnergy : resultsCallback;

        if (this.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "EN", startEnVar,
                this.setModifierToAttribute, resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, this.elem, startEnVar,
                function (results, value, attributeHandler, tokenTargetData) {
                    results.max = 9;
                    return tokenTargetData.setModifierToAttribute(results, value, attributeHandler);
                }, resultsCallback);
        }
    }
    addStartRoundEnergy(attributeHandler, resultsCallback) {
        let roundEnVar = WuxDef.GetVariable("RoundEN");
        attributeHandler.addMod(roundEnVar);
        resultsCallback = resultsCallback == undefined ? this.applyResultsToEnergy : resultsCallback;

        if (this.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "EN", roundEnVar,
                this.addModifierToAttribute, resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, this.elem, roundEnVar,
                function (results, value, attributeHandler, tokenTargetData) {
                    results.max = 9;
                    return tokenTargetData.addModifierToAttribute(results, value, attributeHandler, tokenTargetData);
                }, resultsCallback);
        }
    }
    applyResultsToEnergy(results, attrHandler, attributeVar, tokenTargetData) {
        Debug.Log(`[TokenTargetData] Applying results to energy: ${results.newValue}`);
        if (tokenTargetData.isBarLinked(1)) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
        }
        tokenTargetData.setEnergyIcon(results.newValue);
        return results;
    }
    addMoveCharge(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsMoveCharge : resultsCallback;
        
        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", value,
                tokenTargetData.addModifierToAttributeNoCap, resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", value,
                tokenTargetData.addModifierToAttribute, resultsCallback);
        }
    }
    setMoveCharge(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsMoveCharge : resultsCallback;
        
        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", value,
                tokenTargetData.setModifierToAttribute, resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", value,
                tokenTargetData.setModifierToAttribute, resultsCallback);
        }
    }
    setDash(attributeHandler, resultsCallback) {
        this.addDashModifiers(attributeHandler);
        resultsCallback = resultsCallback == undefined ? this.applyResultsMoveCharge : resultsCallback;

        if (this.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        }
    }
    addDash(attributeHandler, resultsCallback) {
        this.addDashModifiers(attributeHandler);
        resultsCallback = resultsCallback == undefined ? this.applyResultsMoveCharge : resultsCallback;

        if (this.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = results.current + tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        }
        else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = results.current + tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        }
    }
    addDashModifiers(attributeHandler) {
        attributeHandler.addMod([ WuxDef.GetVariable("Cmb_Mv"), WuxDef.GetVariable("Cmb_MvPotency")]);
    }
    performDash(attrHandler) {
        let baseMoveSpeed = attrHandler.parseInt(WuxDef.GetVariable("Cmb_Mv"), 0, false);
        let maxMoveSpeed = attrHandler.parseInt(WuxDef.GetVariable("Cmb_MvPotency"), 0, false);
        if (baseMoveSpeed > maxMoveSpeed) {
            baseMoveSpeed = maxMoveSpeed;
        }
        let dieRoll = new DieRoll();
        dieRoll.rollDice(1, maxMoveSpeed);
        return Math.max(dieRoll.total, baseMoveSpeed)
    }
    applyResultsMoveCharge(results, attrHandler, attributeVar, tokenTargetData) {
        if (tokenTargetData.isBarLinked(1)) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
        }
        tokenTargetData.setTurnIcon(results.newValue);
        return results;
    }
    
    getModifyResults(name) {
        return {
            name: name,
            current: 0,
            max: 0,
            newValue: 0,
            remainder: 0
        };
    }
    modifyBarAttribute(attributeHandler, barIndex, value, modCallback, finishCallback) {
        let tokenTargetData = this;
        let results = tokenTargetData.getModifyResults(barIndex);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            results.current = tokenTargetData.token.get(`bar${barIndex}_value`);
            results.max = tokenTargetData.token.get(`bar${barIndex}_max`);
            modCallback(results, value, attrHandler, tokenTargetData);
            finishCallback(results, attrHandler, "", tokenTargetData);
        });
    }
    modifyIconAttribute(attributeHandler, iconName, value, modCallback, finishCallback) {
        let tokenTargetData = this;
        let results = tokenTargetData.getModifyResults(iconName);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            results.current = tokenTargetData.getIcon(iconName);
            results.max = 99;
            modCallback(results, value, attrHandler, tokenTargetData);
            finishCallback(results, attrHandler, "", tokenTargetData);
        });
    }
    modifyResourceAttribute(attributeHandler, attributeName, value, modCallback, finishCallback) {
        let tokenTargetData = this;
        let results = tokenTargetData.getModifyResults(attributeName);
        
        let attributeVar = WuxDef.GetVariable(attributeName);
        attributeHandler.addAttribute(attributeVar);
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            results.current = attrHandler.parseInt(attributeVar, 0, false);
            results.max = attrHandler.parseInt(attributeVar, 0, true);
            modCallback(results, value, attrHandler, tokenTargetData);
            finishCallback(results, attrHandler, attributeVar, tokenTargetData);
        });
    }
    addModifierToAttribute(results, value, attrHandler, tokenTargetData) {
        tokenTargetData.addModifierToAttributeNoCap(results, value, attrHandler, tokenTargetData);
        if (results.newValue > results.max) {
            results.remainder = results.newValue - results.max;
            results.newValue = results.max;
        }
        return results;
    }
    addModifierToAttributeNoCap(results, value, attrHandler) {
        if (value == "max") {
            results.newValue = results.max;
            return;
        }

        let newValue = parseInt(value);
        if (isNaN(newValue)) {
            // likely a variable. Look it up
            newValue = attrHandler.parseInt(value, 0, false);
        }

        results.newValue = results.current + newValue;
        if (results.newValue < 0) {
            results.remainder = results.newValue;
            results.newValue = 0;
        }
    }
    setModifierToAttribute(results, value, attrHandler) {
        if (value == "max") {
            results.newValue = results.max;
            return;
        }
        results.newValue = parseInt(value);
        if (isNaN(results.newValue)) {
            // likely a variable. Look it up
            results.newValue = attrHandler.parseInt(value, 0, false);
        }
        
        if (results.newValue < 0) {
            results.remainder = results.newValue;
            results.newValue = 0;
        }
        else if (results.newValue > results.max) {
            results.remainder = results.newValue - results.max;
            results.newValue = results.max;
        }
    }
}

class TokenTargetEffectsData {
    constructor(tokenTargetData) {
        this.tokenTargetData = tokenTargetData;
        this.effectMessages = [];
        this.damageRolls = [];
        this.storedDieRolls = {};
        this.spentSurge = false;
        this.isArmorPiercing = false;
    }
    
    addMessage(message) {
        if (message != undefined && message != "") {
            this.effectMessages.push(message);
        }
    }
    
    addDamageRoll(damageRoll) {
        for(let i = 0; i < this.damageRolls.length; i++) {
            if (this.damageRolls[i].isSame(damageRoll)) {
                this.damageRolls[i].addDieRoll(damageRoll);
                return;
            }
        }
        
        this.damageRolls.push(damageRoll);
    }
    performDamageRolls(attrGetter, attrSetter, willBreakEffect) {
        let tokenTargetEffect = this;
        this.damageRolls.forEach(function (damageRoll) {
            switch(damageRoll.damageType) {
                case "HP Heal":
                    tokenTargetEffect.takeHpHealing(attrSetter, damageRoll);
                    break;
                case "Will":
                    tokenTargetEffect.takeWillDamage(attrSetter, damageRoll, willBreakEffect);
                    break;
                case "Will Overflow":
                    tokenTargetEffect.takeWillOverflowDamage(attrSetter, damageRoll);
                    break;
                case "Will Heal":
                    tokenTargetEffect.takeWillHealing(attrSetter, damageRoll);
                    break;
                case "Will Full Heal":
                    tokenTargetEffect.takeWillFullHealing(attrSetter);
                    break;
                default:
                    if (damageRoll.traits != "AP") {
                        let armorTotal = attrGetter.parseInt(WuxDef.GetVariable("Cmb_Armor"));
                        if (armorTotal > damageRoll.total / 2) {
                            armorTotal = Math.floor(damageRoll.total / 2);
                        }
                        damageRoll.addModToRoll(-1 * armorTotal, "Armor");
                    }
                    tokenTargetEffect.takeHpDamage(attrSetter, damageRoll);
            }
        });
    }
    
    
    hasSurged() {
        return this.spentSurge;
    }
    
    spendSurge() {
        this.spentSurge = true;
    }
    
    takeHpDamage(attributeHandler, damageRoll) {
        let targetEffect = this;
        
        this.tokenTargetData.addHp(attributeHandler, -1 * damageRoll.total, 
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} takes ${Format.ShowTooltip(damageRoll.total, damageRoll.message)} ${damageRoll.damageType} damage.`);
                if (results.remainder < 0) {
                    let vitalityDamage = 0;
                    while (results.remainder < 0) {
                        vitalityDamage++;
                        results.remainder += results.max;
                    }
                    let newAttributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                    targetEffect.takeVitalityDamage(targetEffect, newAttributeHandler, vitalityDamage);
                    newAttributeHandler.run();
                    results.newValue = results.remainder;
                }
                tokenTargetData.applyResultsToHp(results, attrHandler, attributeVar, tokenTargetData);
        });
    }
    
    takeHpHealing(attributeHandler, healRoll) {
        let targetEffect = this;
        
        this.tokenTargetData.addHp(attributeHandler, healRoll.total,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} heals ${Format.ShowTooltip(healRoll.total, healRoll.message)} HP.`);
                tokenTargetData.applyResultsToHp(results, attrHandler, attributeVar, tokenTargetData);
        });
    }
    
    takeVitalityDamage(targetEffect, attributeHandler, damage) {
        targetEffect.effectMessages.push(`${targetEffect.tokenTargetData.displayName} loses ${damage} Vitality.`);
        
        let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
        targetEffect.tokenTargetData.modifyResourceAttribute(attributeHandler, "Cmb_Vitality", damage, targetEffect.tokenTargetData.addModifierToAttribute,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                attrHandler.addUpdate(attributeVar, results.newValue, false);
                combatDetailsHandler.onUpdateVitality(attrHandler, results.newValue);
                if (combatDetailsHandler.hasDisplayStyle()) {
                    tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
                }
            });
    }

    takeWillDamage(attributeHandler, damageRoll, willBreakEffect) {
        let targetEffect = this;

        this.tokenTargetData.addWill(attributeHandler, -1 * damageRoll.total,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} takes ${Format.ShowTooltip(damageRoll.total, damageRoll.message)} will damage.`);
                if (results.remainder < 0) {
                    // the target can take a will break
                    willBreakEffect.addWillResetEffect(results.remainder * -1);
                    targetEffect.effectMessages.push(`<span class="sheet-wuxInlineRow">[Use Will Break Effect](${willBreakEffect.printWillBreakString()})</span> `)
                }
                tokenTargetData.applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData);
            });
    }

    takeWillOverflowDamage(attributeHandler, damageRoll) {
        let targetEffect = this;

        this.tokenTargetData.addWill(attributeHandler, -1 * damageRoll.total,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} fully heals Will then takes ${Format.ShowTooltip(damageRoll.total, damageRoll.message)} damage.`);
                tokenTargetData.applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData);
            }, function (results, value) {
                // set the will to max first
                results.newValue = results.max + value;
                return results;
            });

    }
    
    takeWillHealing(attributeHandler, healRoll) {
        let targetEffect = this;

        this.tokenTargetData.addWill(attributeHandler, healRoll.total,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} heals ${Format.ShowTooltip(healRoll.total, healRoll.message)} Will.`);
                tokenTargetData.applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData);
            });
    }

    takeWillFullHealing(attributeHandler) {
        let targetEffect = this;

        this.tokenTargetData.setWillToFull(attributeHandler, 
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} has their Will fully healed.`);
                tokenTargetData.applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData);
            });
    }
}

var TargetReference = TargetReference || (function () {
    'use strict';

    var schemaVersion = "0.1.4",

        checkInstall = function () {
            if (!state.hasOwnProperty('TargetReference') || state.TargetReference.version != schemaVersion) {
                log(`Setting Wuxing Target version to v${schemaVersion}`);
                state.TargetReference = {
                    version: schemaVersion,
                    activeCharacters: getDefaultActiveCharacters()
                };
            }
        },

        // Input Commands
        // ---------------------------

        handleInput = function (msg, tag, content) {
            switch (tag) {
                case "!actadd":
                    commandAddCharacter(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!actrem":
                    commandRemoveCharacter(msg);
                    break;
                case "!actclr":
                    commandClearActiveTargets();
                    break;
                case "!tokenoptions":
                    commandShowTokenOptions(msg);
                    break;
                case "!tconflictstate":
                    commandSetConflictState(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!tss":
                    commandSetRequestCheck(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!ten":
                    commandAddEnergy(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "tmovereset":
                    commandResetMoveCharge(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tmove":
                    commandAddMoveCharge(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!tdash":
                    commandAddDash(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tfullheal":
                    commandFullHeal(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!thealsurge":
                    commandHealSurge(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!thealvit":
                    commandHealVitality(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!tresetSocial":
                    commandResetSocial(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tdetails":
                    commandUpdateCombatDetails(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!treset":
                    commandResetToken(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tshowgroup":
                    commandShowGroup(msg.who, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!cshowgroup":
                    content = getCharacterSheetTarget(content);
                    commandShowGroup(msg.who, content.targets, content.content);
                    break;
                case "!tskillgroupcheck":
                    commandRollSkillGroupCheck(msg.who, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!cskillgroupcheck":
                    content = getCharacterSheetTarget(content);
                    commandRollSkillGroupCheck(msg.who, content.targets, content.content);
                    break;
                case "!intro":
                    commandIntroduce(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tgenname":
                    commandGenerateName(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
            }
        },

        commandAddCharacter = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                tokenTargetData.setTeamIndex(content);
                addToActiveCharacters(tokenTargetData);
            });

            sendTokenUpdateMessage(msg, targets, ` added as ${state.WuxConflictManager.teams[content].name} unit(s)`);
        },

        commandRemoveCharacter = function (msg) {
            TokenReference.IterateOverSelectedTokens(msg, function (tokenTargetData) {
                removeActiveTargetData(tokenTargetData.tokenId);
            });
        },

        commandClearActiveTargets = function () {
            clearActiveTargetData();
        },

        getCharacterSheetTarget = function (content) {
            let output = {
                content: "",
                targets: []
            }
            let contentSplit = content.split("@@@");
            output.content = contentSplit[1];

            let target = getTargetDataByName(contentSplit[0]);
            if (target != undefined) {
                output.targets.push(target);
            }

            return output;
        },

        commandShowTokenOptions = function (msg) {
            let sender = msg.who;

            let output = "";
            output += tokenOptionTitle("Token State");
            output += tokenOptionButton("Update Tooltip", "tdetails");
            if (playerIsGM(msg.playerid)) {
                output += tokenOptionButton("Gen Name", "tgenname");
                output += tokenOptionButton("Reset Token", "treset");
            }

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Combat Stat Options");
            if (!playerIsGM(msg.playerid)) {
                output += tokenOptionButton("Prep4 Battle", `tconflictstate Battle@0`);
            }
            else {
                output += tokenOptionButton("Prep4 Battle", `tconflictstate Battle@?{Set team index|0}`);
                output += tokenOptionButton("Full Heal", "tfullheal");
            }
            output += tokenOptionButton("Add Energy", "ten ?{How much energy to add?|1}");
            output += tokenOptionButton("Add Surge", "thealsurge ?{How much surge to add?|1}");
            output += tokenOptionButton("Add Vitality", "thealvit ?{How much vitality to add?|1}");

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Combat Move Options");
            output += tokenOptionButton("Reset Move", "tmovereset");
            output += tokenOptionButton("Add Move Charge", "tmove ?{How much move charge to add?|1}");
            output += tokenOptionButton("Add Dash", "tdash");

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Social Stat Options");
            if (!playerIsGM(msg.playerid)) {
                output += tokenOptionButton("Prep4 Social", `tconflictstate Social@0`);
            }
            else {
                output += tokenOptionButton("Prep4 Social", `tconflictstate Social@?{Set team index|0}`);
                output += tokenOptionButton("Reset Social", "tresetSocial");
                output += tokenOptionButton("Request Threshold", "tss ?{Set the difficulty of the request|" +
                    "Simple DC 15|Inconvenient DC 30|Disruptive DC 40|Serious DC 50|Life-Changing DC 60}");
            }
            
            let senderMessage = new SystemInfoMessage(output);
            senderMessage.setSender(sender);
            WuxMessage.Send(senderMessage, sender);
        },

        tokenOptionTitle = function (title) {
            return `<div style='font-weight: bold'>${title}</div>`;
        },

        tokenOptionSpacer = function () {
            return `<div>&nbsp</div>`;
        },
        
        tokenOptionButton = function (name, message) {
             return `<span class="sheet-wuxInlineRow">[${name}](!${message})</span> `;
        },

        commandSetConflictState = function (msg, targets, content) {
            let contentSplit = content.split("@");
            let conflictState = contentSplit[0];
            let teamIndex = contentSplit.length > 1 && !isNaN(parseInt(contentSplit[1])) ? parseInt(contentSplit[1]) : 0;
            
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setTeamIndex(teamIndex);
                addToActiveCharacters(tokenTargetData);
                TokenReference.SetTokenForConflict(conflictState, tokenTargetData, attributeHandler);
                attributeHandler.run();
            });

            sendTokenUpdateMessage(msg, targets, ` set to ${conflictState} state as ${state.WuxConflictManager.teams[teamIndex].name} unit(s)`);
        },

        commandSetRequestCheck = function (msg, targets, content) {
            let sender = msg.who;
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                switch (content) {
                    case "Simple DC 15":
                        tokenTargetData.setMaxFavor(attributeHandler, 7);
                        break;
                    case "Inconvenient DC 30":
                        tokenTargetData.setMaxFavor(attributeHandler, 15);
                        break;
                    case "Disruptive DC 40":
                        tokenTargetData.setMaxFavor(attributeHandler, 20);
                        break;
                    case "Serious DC 50":
                        tokenTargetData.setMaxFavor(attributeHandler, 25);
                        break;
                    case "Life-Changing DC 60":
                        tokenTargetData.setMaxFavor(attributeHandler, 30);
                        break;
                }
                let senderMessage = new SystemInfoMessage(`This request has been set as ${content}.`);
                senderMessage.setSender(sender);
                WuxMessage.Send(senderMessage);
                
                attributeHandler.run();
            });
        },

        commandAddEnergy = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addEnergy(attributeHandler, content);
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, ` ${content} EN`);
        },

        commandResetMoveCharge = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setMoveCharge(attributeHandler, 0);
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: Move Charge reset`);
        },

        commandAddMoveCharge = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addMoveCharge(attributeHandler, content);
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: ${content} Move Charge`);
        },

        commandAddDash = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addDash(attributeHandler, function (results, attrHandler, attributeVar) {
                    attrHandler.addUpdate(attributeVar, results.newValue, false);
                    tokenTargetData.setTurnIcon(results.newValue);
                    sendTokenUpdateMessage(msg, [tokenTargetData], ` dashes for ${results.newValue}`);
                });
                attributeHandler.run();
            });
        },

        commandFullHeal = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.setHpToFull(attributeHandler);
                tokenTargetData.setWillToFull(attributeHandler);
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: fully healed`);
        },

        commandHealSurge = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
                tokenTargetData.modifyResourceAttribute(attributeHandler, "Cmb_Surge", content, tokenTargetData.addModifierToAttribute,
                    function (results, attrHandler, attributeVar) {
                        attrHandler.addUpdate(attributeVar, results.newValue, false);
                        combatDetailsHandler.onUpdateSurges(attrHandler, results.newValue);
                        if (combatDetailsHandler.hasDisplayStyle()) {
                            tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
                        }
                    });
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: ${content} Surge`);
        },

        commandHealVitality = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
                tokenTargetData.modifyResourceAttribute(attributeHandler, "Cmb_Vitality", content, tokenTargetData.addModifierToAttribute,
                    function (results, attrHandler, attributeVar) {
                        attrHandler.addUpdate(attributeVar, results.newValue, false);
                        combatDetailsHandler.onUpdateVitality(attrHandler, results.newValue);
                        if (combatDetailsHandler.hasDisplayStyle()) {
                            tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
                        }
                    });
                attributeHandler.run();
            });

            sendTokenUpdateMessage(msg, targets,`: ${content} Vitality`);
        },

        commandResetSocial = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.emptyFavor(attributeHandler);
                tokenTargetData.setWillToFull(attributeHandler);
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: social data reset`);
        },

        commandUpdateCombatDetails = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
                });
                attributeHandler.run();
            });
            
            sendTokenUpdateMessage(msg, targets, `: tooltip updated`);
        },

        commandResetToken = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                TokenReference.ResetTokenDisplay(tokenTargetData);
            });

            sendTokenUpdateMessage(msg, targets, `: token reset`);
        },

        commandShowGroup = function (sender, targets, content) {
            content = content.split(";");
            let group = content[0];
            let advantage = content.length > 1 ? content[1] : 0;
            let tableName = "";
            switch (group) {
                case "Defenses": group = "Defense"; tableName = "Defenses"; break;
                case "Senses": group = "Sense"; tableName = "Senses"; break;
                default: tableName = content; break;
            }

            let groupArray = WuxDef.Filter(new DatabaseFilterData("group", group));
            if (groupArray.length == 0) {
                Debug.LogError(`[commandShowGroup] The group (${group}) is empty!`);
            }
            else {
                _.each(targets, function (tokenTargetData) {
                    checkModifiers(sender, tableName, tokenTargetData, groupArray, false, advantage);
                });
            }
        },

        commandRollSkillGroupCheck = function (sender, targets, content) {
            content = content.split(";");
            let subGroup = content[0];
            let advantage = content.length > 1 ? content[1] : 0;
            let tableName = `${content}`;

            if (subGroup == "Lore") {
                _.each(targets, function (tokenTargetData) {
                    checkLore(sender, tokenTargetData, advantage);
                });
            }
            else {
                let groupArray = WuxDef.Filter(new DatabaseFilterData("subGroup", subGroup));
                _.each(targets, function (tokenTargetData) {
                    checkModifiers(sender, tableName, tokenTargetData, groupArray, true, advantage);
                });
            }
        },
        
        commandIntroduce = function (msg, targets) {
            let characters, charObj = {};
            let sender = msg.who;
            let introNameVar = WuxDef.GetVariable("FullName");
            let emotesVar = WuxDef.GetVariable("Chat_Emotes");
            let titleVar = WuxDef.GetVariable("Title");
            let ageVar = WuxDef.GetVariable("Age");
            let genderVar = WuxDef.GetVariable("Gender");
            let quickDescVar = WuxDef.GetVariable("QuickDescription");

            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
    
                attributeHandler.addMod([introNameVar, emotesVar, titleVar, ageVar, genderVar, quickDescVar]);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
                    let messageObject = new IntroEmoteMessage(sender, msg);
                    messageObject.setTitle(attrHandler.parseString(introNameVar));
                    messageObject.message = `${attrHandler.parseString(titleVar)}\nAge ${attrHandler.parseString(ageVar)}; ${attrHandler.parseString(genderVar)}`;
                    messageObject.url = outfitEmoteSetData.defaultEmote;
                    messageObject.setSender(sender);
                    WuxMessage.Send(messageObject);
    
                    // set character data
                    characters = findObjs({
                        _id: tokenTargetData.charId,
                        _type: "character"
                    }, {caseInsensitive: true});
    
                    if (characters.length > 0) {
                        charObj = characters[0];
                        let bio = `<p><b>${attrHandler.parseString(introNameVar)}</b><br><i>${attrHandler.parseString(titleVar)}</i></p>`;
                        bio += `<p>Age ${attrHandler.parseString(ageVar)}; ${attrHandler.parseString(genderVar)}</p>`;
                        bio += `<p>${attrHandler.parseString(quickDescVar)}</p>`;
                        charObj.set("bio", bio);
                        charObj.set("inplayerjournals", "all");
                    }
                });
                attributeHandler.run();
            });

        },

        commandGenerateName = function (msg, targets) {
            let raceVar = WuxDef.GetVariable("Ethnicity");
            let genderVar = WuxDef.GetVariable("Gender");
            let homeRegionVar = WuxDef.GetVariable("HomeRegion");

            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);

                attributeHandler.addMod([raceVar, genderVar, homeRegionVar]);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let generator = new WuxingHumanCharacterGenerator();
                    generator.character.ancestry = attrHandler.parseString(raceVar);
                    generator.character.gender = attrHandler.parseString(genderVar);
                    generator.character.homeRegion = attrHandler.parseString(homeRegionVar);
                    generator.generateCharacter();
                    tokenTargetData.token.set("name", generator.character.firstName);
                    tokenTargetData.displayName = generator.character.firstName;
                    
                    let outputMessage = `Generated Name: ${generator.character.fullName}. ` + 
                        `\They have a ${generator.character.motivation} Motivation and a ${generator.character.personality} Personality.`;
                    let messageObject = new SystemInfoMessage(outputMessage);
                    messageObject.setSender("System");
                    WuxMessage.Send(messageObject, "GM");
                });
                attributeHandler.run();
            });
        
        },
        
        sendTokenUpdateMessage = function (msg, targets, message) {
            let targetNames = "";
            for (let i = 0; i < targets.length; i++) {
                if (targets.length > 1) {
                    if (i == targets.length - 1) {
                        targetNames += " and ";
                    }
                    else if (targetNames != "") {
                        targetNames += ", ";
                    }
                }
                targetNames += `${targets[i].displayName}`;
            }
        
            let messageObject = new SystemInfoMessage(targetNames + message);
            messageObject.setSender("System");
            WuxMessage.SendToSenderAndGM(messageObject, msg);
        },

        // Data Checkers

        checkLore = function (sender, tokenTargetData, advantage) {
            let tableData = new TableMessage([tokenTargetData.displayName, `Lore,${advantage}`]);
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);

            let recallVar = WuxDef.GetVariable("Recall");
            let knowledgeBuildVar = WuxDef.GetVariable("Knowledge", WuxDef._build);
            attributeHandler.addMod([recallVar, knowledgeBuildVar]);
            
            let dieRoll = new DieRoll();
            dieRoll.rollCheck(advantage);
            let recallResults = new DieRoll(dieRoll);

            attributeHandler.addFinishCallback(function (attrHandler) {
                let recallValue = attrHandler.parseString(recallVar, 0, false);
                recallResults.addModToRoll(recallValue);
                tableData.addRow(["Recall", `${Format.ShowTooltip(`${recallResults.total}`, recallResults.message)}`]);

                let knowledges = new WorkerBuildStats();
                knowledges.import(attrHandler.parseJSON(knowledgeBuildVar));
                
                knowledges.iterate(function (buildStat) {
                    let parts = buildStat.name.split("-");
                    let title = parts[1].split("_")[0];
                    if (parts[0] == "lor") {
                        let results = new DieRoll(dieRoll);
                        let value = parseInt(buildStat.value) + recallValue;
                        results.addModToRoll(value);
                        tableData.addRow([title, `${Format.ShowTooltip(`${results.total}`, results.message)}`]);
                    }
                    else if (parts[0] == "lrc") {
                        tableData.addRow([title, `${Format.ShowTooltip(`${recallResults.total}`, recallResults.message)}`]);
                    }
                });
            });
            attributeHandler.run();

            let senderMessage = new SystemInfoMessage(`You've made a Lore check. Results were sent to GM.`);
            senderMessage.setSender(sender);
            WuxMessage.Send(senderMessage, sender.split(" ")[0]);

            let message = tableData.print();
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender(sender);
            WuxMessage.Send(systemMessage, "GM");
        },

        checkModifiers = function (sender, tableName, tokenTargetData, definitions, addSkillCheck, advantage) {
            let tableData = new TableMessage([tokenTargetData.displayName, tableName]);
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            let dieRoll = new DieRoll();
            dieRoll.rollCheck(advantage);

            _.each(definitions, function (modDefinition) {
                let variable = modDefinition.getVariable();
                attributeHandler.addMod(variable);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let value = attrHandler.parseString(variable, 0, false);
                    if (addSkillCheck) {
                        let results = new DieRoll(dieRoll);
                        results.addModToRoll(value);
                        tableData.addRow([modDefinition.title, `${Format.ShowTooltip(`${results.total}`, results.message)}`]);
                    }
                    else {
                        tableData.addRow([modDefinition.title, value]);
                    }
                });
            });
            attributeHandler.run();

            let message = tableData.print();
            let systemMessage = new SystemInfoMessage(message);
            systemMessage.setSender(sender);
            WuxMessage.Send(systemMessage);
        },

        // Active Characters

        getDefaultActiveCharacters = function () {
            return {
                targetData: {},
                nameDatabase: {}
            };
        },

        hasActiveTargets = function() {
            return Object.keys(state.TargetReference.activeCharacters.targetData).length > 0;
        },

        iterateOverActiveTargetData = function (callback) {
            for (let targetData in state.TargetReference.activeCharacters.targetData) {
                let tokenTargetData = TokenReference.GetTokenData(targetData);
                if (tokenTargetData != undefined && tokenTargetData.token != undefined) {
                    callback(tokenTargetData);
                }
            }
        },

        addToActiveCharacters = function (tokenTargetData) {
            if (tokenTargetData == undefined) {
                Debug.LogError(`[TargetReference][addToActiveCharacters] No target data exists.`);
                return;
            }
            if (state.TargetReference.activeCharacters.targetData.hasOwnProperty(tokenTargetData.tokenId)) {
                state.TargetReference.activeCharacters.targetData[tokenTargetData.tokenId] = tokenTargetData;
            }
            else {
                state.TargetReference.activeCharacters.targetData[tokenTargetData.tokenId] = tokenTargetData;
                state.TargetReference.activeCharacters.nameDatabase[tokenTargetData.charName] = tokenTargetData.tokenId;
            }
        },

        removeActiveTargetData = function (tokenId) {
            if (state.TargetReference.activeCharacters.targetData[tokenId] != undefined) {
                let targetData = state.TargetReference.activeCharacters.targetData[tokenId];
                delete state.TargetReference.activeCharacters.nameDatabase[targetData.charName];
                delete state.TargetReference.activeCharacters.targetData[tokenId];
            }
        },

        clearActiveTargetData = function () {
            state.TargetReference.activeCharacters = getDefaultActiveCharacters();
            let systemMessage = new SystemInfoMessage("Cleared Active Targets");
            systemMessage.setSender("System");
            WuxMessage.Send(systemMessage, "GM");
        },

        getTokenTargetData = function (tokenId) {
            if (state.TargetReference.activeCharacters.targetData[tokenId] == undefined) {
                return TokenReference.GetTokenData(tokenId);
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[tokenId]);
        },

        getTokenTargetDataByName = function (characterName) {
            if (state.TargetReference.activeCharacters.nameDatabase[characterName] == undefined) {
                let tokenTargetData = new TokenTargetData();
                tokenTargetData.importCharacterByName(characterName);
                if (tokenTargetData.charId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No target data exists for ${characterName}`);
                    return undefined;
                }
                tokenTargetData.importTokenDataOnPlayerPage();
                if (tokenTargetData.tokenId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No token data exists for ${characterName}`);
                    return undefined;
                }
                return tokenTargetData;
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[state.TargetReference.activeCharacters.nameDatabase[characterName]]);
        },

        getTargetDataByName = function (characterName) {
            if (state.TargetReference.activeCharacters.nameDatabase[characterName] == undefined) {
                let targetData = new TargetData();
                targetData.importCharacterByName(characterName);
                if (targetData.charId == "") {
                    Debug.LogError(`[TargetReference][getTargetDataByName] No target data exists for ${characterName}`);
                    return undefined;
                }
                return targetData;
            }
            return TokenReference.GetTokenData(state.TargetReference.activeCharacters.targetData[state.TargetReference.activeCharacters.nameDatabase[characterName]]);
        }
        ;
    return {
        CheckInstall: checkInstall,
        HandleInput: handleInput,
        HasActiveTargets: hasActiveTargets,
        IterateOverActiveTargetData: iterateOverActiveTargetData,
        ClearActiveTargetData: clearActiveTargetData,
        GetTokenTargetData: getTokenTargetData,
        GetTokenTargetDataByName: getTokenTargetDataByName,
        GetTargetDataByName: getTargetDataByName
    };

}());

var TokenReference = TokenReference || (function () {
    'use strict';

    var schemaVersion = "0.1.1",

        checkInstall = function () {
            if (!state.hasOwnProperty('TokenReference') || state.TokenReference.version !== schemaVersion) {
                state.TokenReference = {
                    version: schemaVersion,
                    tokens: {}
                };
            }
            state.TokenReference.tokens = {};
        },

        // State Token Getters
        // ---------------------------

        getToken = function (tokenId) {
            let token = getObj('graphic', tokenId);
            if (token == undefined) {
                return undefined;
            }
            return token;
        },

        getTokenData = function (data) {
            if (data.tokenId != undefined) {
                return getTokenDataFromTargetData(data);
            }
            else {
                return getTokenDataFromId(data);
            }
        },
        
        getTokenDataFromTargetData = function (targetData) {
            if (state.TokenReference.tokens[targetData.tokenId] == undefined) {
                let token = getToken(targetData.tokenId);
                if (token == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Token for ${targetData.charName} not found`);
                    return undefined;
                }
                let tokenData = new TokenTargetData(token, targetData);
                if (tokenData == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Tokendata for ${targetData.charName} could not be created`);
                    return undefined;
                }
                tokenData.setDisplayName();
                addToken(tokenData, targetData.tokenId);
                return tokenData;
            }
            else {
                let tokenData = state.TokenReference.tokens[targetData.tokenId];
                if (tokenData == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Something went wrong. Tokendata for ${targetData.charName} is undefined`);
                    return undefined;
                }
                if (tokenData.token == undefined) {
                    let token = getToken(targetData.tokenId);
                    tokenData = new TokenTargetData(token, targetData);
                }
                tokenData.setDisplayName();
                return tokenData;
            }
        },
        
        getTokenDataFromId = function (tokenId) {
            if (state.TokenReference.tokens[tokenId] == undefined) {
                let token = getToken(tokenId);
                if (token == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Token for id ${tokenId} not found`);
                    return undefined;
                }
                let tokenData = new TokenTargetData(token);
                if (tokenData == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Tokendata for id ${tokenId} could not be created`);
                    return undefined;
                }
                tokenData.setDisplayName();
                addToken(tokenData, tokenId);
                return tokenData;
            }
            else {
                let tokenData = state.TokenReference.tokens[tokenId];
                if (tokenData == undefined) {
                    Debug.LogError(`[TokenReference][getToken] Something went wrong. Tokendata for ${tokenId} is undefined`);
                    return undefined;
                }
                if (tokenData.token == undefined) {
                    let token = getToken(tokenId.tokenId);
                    tokenData = new TokenTargetData(token, tokenId);
                }
                tokenData.setDisplayName();
                return tokenData;
            }
        
        },

        addToken = function (tokenData, tokenId) {
            state.TokenReference.tokens[tokenId] = tokenData;
        },

        // Data Helper
        // ---------------------------

        iterateOverSelectedTokens = function (msg, callback) {
            _.each(msg.selected, function (obj) {
                let tokenTargetData = getTokenData(obj._id);

                if (tokenTargetData != undefined) {
                    callback(tokenTargetData);
                }
            });
        },

        getFirstSelectedToken = function (msg) {
            if (msg.selected.length == 0) {
                Debug.Log(`[TokenReference][commandShowDefenses] No token selected`);
                return undefined;
            }
            let tokenId = msg.selected[0]._id;
            if (tokenId == undefined) {
                Debug.Log(`[TokenReference][commandShowDefenses] No token selected`);
                return undefined;
            }
            return getTokenData(msg.selected[0]);
        },

        getTokenTargetDataArray = function (msg) {
            let tokenTargetDataArray = [];
            iterateOverSelectedTokens(msg, function (tokenTargetData) {
                tokenTargetDataArray.push(tokenTargetData);
            });
            return tokenTargetDataArray;
        },

        // Token States
        // ---------------------------

        setTokenForConflict = function (conflictType, tokenTargetData, attributeHandler) {
            if(tokenTargetData.initToken()) {
                tokenTargetData.showTokenName(true);
                tokenTargetData.showTooltip(true);

                switch (conflictType) {
                    case "Battle":
                        setTokenForBattle(tokenTargetData, attributeHandler);
                        break;
                    case "Social":
                        setTokenForSocialBattle(tokenTargetData, attributeHandler);
                        break;
                }
            }
        },
        setTokenForBattle = function (tokenTargetData, attributeHandler) {
            Debug.Log(`[TokenReference][setTokenForBattle] Setting token for battle: ${tokenTargetData.charName}`);
            let hpVar = WuxDef.GetVariable("HP");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let enVar = WuxDef.GetVariable("EN");
            let fullNameVar = WuxDef.GetVariable("FullName");
            attributeHandler.addAttribute([hpVar, willpowerVar, enVar, fullNameVar]);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                Debug.Log(`[TokenReference][setTokenForBattle] Setting token for battle: ${tokenTargetData.charName}`);
                tokenTargetData.setBar(1, attrHandler.getAttribute(hpVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                
                if (attrHandler.parseString(fullNameVar) == "GenericOverride") {
                    tokenTargetData.unlinkBar(1);
                    tokenTargetData.unlinkBar(2);
                }
                
                tokenTargetData.setEnergyIcon(attrHandler.parseInt(enVar, 0, false));
                combatDetailsHandler.onUpdateDisplayStyle(attrHandler, "Battle");
                tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
            });
        },
        setTokenForSocialBattle = function (tokenTargetData, attributeHandler) {
            let patienceVar = WuxDef.GetVariable("Soc_Impatience");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let favorVar = WuxDef.GetVariable("Soc_Favor");
            let enVar = WuxDef.GetVariable("EN");
            let fullNameVar = WuxDef.GetVariable("FullName");
            attributeHandler.addAttribute([patienceVar, willpowerVar, favorVar, enVar, fullNameVar]);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);

            attributeHandler.addFinishCallback(function (attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(patienceVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);
                tokenTargetData.setBar(3, attrHandler.getAttribute(favorVar), true, true);
                
                if (attrHandler.parseString(fullNameVar) == "GenericOverride") {
                    tokenTargetData.unlinkBar(1);
                    tokenTargetData.unlinkBar(2);
                    tokenTargetData.unlinkBar(3);
                }
                
                tokenTargetData.setEnergyIcon(attrHandler.parseInt(enVar, 0, false));
                combatDetailsHandler.onUpdateDisplayStyle(attrHandler, "Social");
                tokenTargetData.setTooltip(combatDetailsHandler.printTooltip(attrHandler, tokenTargetData.displayName));
            });
        },
        resetTokenDisplay = function (tokenTargetData) {
            tokenTargetData.setBar(1, undefined, true, true);
            tokenTargetData.setBar(2, undefined, true, true);
            tokenTargetData.setBar(3, undefined, true, true);
            tokenTargetData.showTokenName(false);
            tokenTargetData.showTooltip(false);
            tokenTargetData.setEnergyIcon(false);
            tokenTargetData.setTurnIcon(false);

            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            let combatDetailsHandler = new CombatDetailsHandler(attributeHandler);
            attributeHandler.addFinishCallback(function (attrHandler) {
                combatDetailsHandler.onUpdateDisplayStyle(attrHandler, "");
            });
            attributeHandler.run();
        }

        ;
    return {
        CheckInstall: checkInstall,
        IterateOverSelectedTokens: iterateOverSelectedTokens,
        GetTokenTargetDataArray: getTokenTargetDataArray,
        GetToken: getToken,
        GetTokenData: getTokenData,
        AddToken: addToken,
        SetTokenForConflict: setTokenForConflict,
        ResetTokenDisplay: resetTokenDisplay
    };

}());

on("ready", function () {
    'use strict';

    TargetReference.CheckInstall();
    TokenReference.CheckInstall();
});















// ======= Base
// =================================================
function CommandCharacterFunction(msg) {

    var content = "";
    let targets = GetMessageTargetData(msg);
    let sendTargets = "";

    // get the content rules and determine if this is a whispered message
    if (msg.content.indexOf("!cw ") == 0) {
        content = msg.content.replace("!cw ", "");
        sendTargets = "GM";
    }
    else if (msg.content.indexOf("!cp ") == 0) {
        content = msg.content.replace("!cp ", "");
        sendTargets = "GM";
    }
    else if (msg.content.indexOf("!cps ") == 0) {
        content = msg.content.replace("!cps ", "");
    }
    else {
        content = msg.content.replace("!c ", "");
    }

    // get the action and modifiers
    var actionEnd = content.trim().indexOf(" ");
    var action = "";
    var modifiers = "";
    if (actionEnd == -1) {
        action = content;
        modifiers = "";
    } else {
        action = content.substring(0, actionEnd);
        modifiers = content.substring(actionEnd).trim();
    }

    TargetOptions(msg, action, modifiers, sendTargets, targets);
}

function CommandTokenFunction(msg) {

    var content = "";
    let sendTargets = "";

    // get the content rules and determine if this is a whispered message
    if (msg.content.indexOf("!tokenw ") == 0) {
        content = msg.content.replace("!tokenw ", "");
        sendTargets = "GM";
    } else {
        content = msg.content.replace("!token ", "");
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetTokenIdListTargetData(contentSplit[0]);

    if (targets.length > 0) {

        // get the action and modifiers
        var actionEnd = contentSplit[1].trim().indexOf(" ");
        var action = "";
        var modifiers = "";
        if (actionEnd == -1) {
            action = contentSplit[1];
            modifiers = "";
        } else {
            action = contentSplit[1].substring(0, actionEnd);
            modifiers = contentSplit[1].substring(actionEnd).trim();
        }

        TargetOptions(msg, action, modifiers, sendTargets, targets);
    }
}

function CommandTargetFunction(msg) {

    var content = "";
    let sendTargets = "";

    if (msg.content.indexOf("!target ") !== -1) {
        content = msg.content.replace("!target ", "").trim();
    }
    else if (msg.content.indexOf("!targetw ") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!targetw ", "").trim();
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetIdListTargetData(contentSplit[0]);
    GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets);
}

function CommandTargetNameFunction(msg) {

    var content = "";
    let sendTargets = "";

    if (msg.content.indexOf("!targetname ") !== -1) {
        content = msg.content.replace("!targetname ", "").trim();
    }
    else if (msg.content.indexOf("!targetnamew ") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!targetnamew ", "").trim();
    }

    // split the content
    var contentSplit = content.split("@@@");
    let targets = GetActorTargetData(contentSplit[0]);
    GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets);
}

function GetTargetOptionsFromTargetList(msg, sendTargets, contentSplit, targets) {
    if (targets.length > 0) {

        // get the action and modifiers
        var actionEnd = contentSplit[1].trim().indexOf(" ");
        var action = "";
        var modifiers = "";
        if (actionEnd == -1) {
            action = contentSplit[1];
            modifiers = "";
        } else {
            action = contentSplit[1].substring(0, actionEnd);
            modifiers = contentSplit[1].substring(actionEnd).trim();
        }

        TargetOptions(msg, action, modifiers, sendTargets, targets);
    }
}

function CommandTargetPartyFunction(msg) {
    // this calls a character target function if there are targets selected,
    // otherwise, calls a party target function

    if (msg.selected == undefined) {
        CommandPartyFunction(msg);
    }
    else {
        CommandCharacterFunction(msg);
    }
}

function CommandPartyFunction(msg) {

    // get variables
    var content = "";
    var partyManager = FindCharacter("PartyManager");
    let targets = GetActorTargetData(getAttrByName(partyManager.id, "current_party_members"));
    let sendTargets = "";


    if (msg.content.indexOf("!p") !== -1) {
        if (msg.content.indexOf("!ps ") !== -1) {
            content = msg.content.replace("!ps ", "");
        } else {
            sendTargets = "GM";
            content = msg.content.replace("!p ", "");
        }
    }
    else if (msg.content.indexOf("!cps") !== -1) {
        content = msg.content.replace("!cps ", "");
    }
    else if (msg.content.indexOf("!cp") !== -1) {
        sendTargets = "GM";
        content = msg.content.replace("!cp ", "");
    }

    // get the action and modifiers
    var actionEnd = content.trim().indexOf(" ");
    var action = "";
    var modifiers = "";
    if (actionEnd == -1) {
        action = content;
        modifiers = "";
    } else {
        action = content.substr(0, actionEnd);
        modifiers = content.substr(actionEnd).trim();
    }

    TargetOptions(msg, action, modifiers, sendTargets, targets);
}

function TargetOptions(msg, action, modifiers, sendTargets, targets) {

    let sendingPlayerName = "GM";
    let player = getObj('player', msg.playerid);
    if (player != undefined) {
        sendingPlayerName = player.get("_displayname").split(" ")[0];
    }

    if (playerIsGM(msg.playerid)) {
        switch (action.toLowerCase()) {
            // TURN
            case "startturn":

            // EXPERIENCE
            case "xp":
                TargetAddExp(sendTargets, targets, modifiers);
                return;
            case "setlevelxp":
                TargetSetBaseLevelExp(sendTargets, targets);
                return;

            // INSPIRATION
            case "gainmorale":
                TargetsGainMorale(sendTargets, targets, modifiers);
                return;
            case "gainkarma":
                TargetsGainKarma(sendTargets, targets, modifiers);
                return;

            // SOCIAL
            case "addsocial":
                TargetAddSocializingCharacter(sendTargets, targets, modifiers);
                return;

            // REST
            case "brief":
                TargetSetBriefRested(sendTargets, targets);
                return;
            case "short":
                TargetSetShortRested(sendTargets, targets);
                return;
            case "long":
                TargetSetLongRested(sendTargets, targets, modifiers);
                return;

            // DOWNTIME
            case "addweek":
                TargetAddWeek(targets, modifiers);
                return;
            case "clone":
                _.each(targets, function (target) {
                    SetCloneManagerClone(target.charId);
                });
                return;

        }
    }

    switch (action.toLowerCase()) {
        // CHAT 
        case "name":
            TargetSetValue(sendingPlayerName, targets, "name", "nickname", modifiers);
            break;
        case "lang":
            TargetSetValue(sendingPlayerName, targets, "language", "speaking_language", modifiers);
            break;

        // INSPIRATION 
        case "insp":
            TargetSpendInspiration(sendTargets, targets);
            break;
        case "morale":
            TargetRequestMorale(targets);
            break;
        case "resolve":
            TargetSpendResolve(sendTargets, targets);
            break;
        case "karma":
            TargetRequestKarma(targets);
            break;
        case "fate":
            TargetSpendFate(sendTargets, targets);
            break;

        // SKILLS
        case "rollinit":
            TargetGetCompareChart(sendTargets, targets, "Initiative", "initiative_bonus");
            break;
        case "sensepresence":
            TargetGetCompareChart(sendTargets, targets, "Sense Presence", "sensepresence_mod");
            break;
        case "sensemotive":
            TargetGetCompareChart(sendTargets, targets, "Sense Motive", "sensemotive_mod");
            break;

        // MONEY
        case "jin":
            TargetModifyValue(sendTargets, targets, "Jin", false, "jin", modifiers);
            break;
        case "jins":
            TargetModifyValue(sendTargets, targets, "Jin", true, "jin_storage", modifiers);
            break;
        case "frt":
            TargetModifyValue(sendTargets, targets, "Forta", false, "frt", modifiers);
            break;
        case "frts":
            TargetModifyValue(sendTargets, targets, "Forta", true, "frt_storage", modifiers);
            break;
        case "syr":
            TargetModifyValue(sendTargets, targets, "Syre", false, "syr", modifiers);
            break;
        case "syrs":
            TargetModifyValue(sendTargets, targets, "Syre", true, "syr_storage", modifiers);
            break;
        case "gp":
            TargetModifyValue(sendTargets, targets, "Gold", false, "gp", modifiers);
            break;
        case "gps":
            TargetModifyValue(sendTargets, targets, "Gold", true, "gp_storage", modifiers);
            break;
        case "cp":
            TargetModifyValue(sendTargets, targets, "CP", false, "cp", modifiers);
            break;
        case "cps":
            TargetModifyValue(sendTargets, targets, "CP", true, "cp_storage", modifiers);
            break;

        // CHARACTER OPTION
        case "inspoptions":
            if (playerIsGM(msg.playerid)) {
                TargetInspirationOptions(targets, "GM");
            }
            else {
                TargetInspirationOptions(targets, sendingPlayerName);
            }
            break;
        default:
            sendChat("Wuxing Manager", "/w " + sendingPlayerName + ` You have entered an invalid command: ${action}`, null, {
                noarchive: true
            });
            break;
    }
}


// ======= Exp
// =================================================
function TargetAddExp(sendTargets, targets, xp) {

    // declare variables
    var sceneMessages = [];
    let xpObj, xpMod, newXp, val, level, nextLevelExp, currentlevelExp, percent;
    let expBar;
    let subtargets = [];

    // iterate through targets
    _.each(targets, function (mainTarget) {
        xpShare = getAttrByName(mainTarget.charId, "shareExp");
        subtargets = [];
        subtargets.push(mainTarget);
        if (xpShare != undefined && xpShare != "") {
            subtargets = subtargets.concat(GetActorTargetData(xpShare));
        }

        _.each(subtargets, function (target) {
            xpObj = GetCharacterAttribute(target.charId, "experience");
            xpMod = parseInt(getAttrByName(target.charId, "expMultiplier"));
            xpMod = (isNaN(xpMod) || xpMod == 0) ? "1" : xpMod;

            if (xpObj != undefined) {
                newXp = Math.floor(xp * xpMod);
                val = parseInt(xpObj.get("current")) + parseInt(newXp);
                xpObj.set("current", val);
                sceneMessages.push(target.displayName + " earned " + newXp + " exp");

                // get level data
                level = isNaN(parseInt(getAttrByName(target.charId, "base_level"))) ? 1 : parseInt(getAttrByName(target.charId, "base_level"));
                currentlevelExp = parseInt(GetExpToNextLevel(level - 1));
                nextLevelExp = parseInt(GetExpToNextLevel(level));
                expBar = `${val}/${nextLevelExp}`;
                nextLevelExp -= currentlevelExp;
                val -= currentlevelExp;
                if (val > nextLevelExp) {
                    val = nextLevelExp;
                }
                if (val < 0) {
                    val = 0;
                }
                percent = parseInt(val * 100 / nextLevelExp);
                sceneMessages.push(`<div class="sheet-experienceBox"><div class="sheet-experienceBoxInner" style="width:${percent}%">&nbsp;</div><div class="sheet-experienceBoxExp">${expBar}</div></div>`);

                if (val >= nextLevelExp) {
                    sceneMessages.push("<span style='color:red'>" + target.displayName + " has leveled up!</span>");
                }
            }
        });
    });

    // Send the system message
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetBaseLevelExp(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    let xpObj, level, xpMod, newXp, val;

    // iterate through targets
    _.each(targets, function (target) {
        xpObj = GetCharacterAttribute(target.charId, "experience");
        level = parseInt(getAttrByName(target.charId, "level"));

        if (xpObj != undefined && !isNaN(level)) {
            newXp = GetExpToNextLevel(level - 1);
            xpObj.set("current", newXp);
        }
    });

    // Send the system message
    SendSystemMessage(sceneMessages, sendTargets);
}


// ======= Core statistics
// =================================================
function TargetGetCompareChart(sendTargets, targets, title, attrs) {

    // modify variables
    attrs = attrs.split(",");

    // declare variables
    let sceneMessages = [];
    let totalmod = 0;
    let mod, roll, rolltwo, rollLine;

    // iterate through targets
    _.each(targets, function (target) {

        // calculate the total mod
        totalmod = 0;
        _.each(attrs, function (attr) {
            if (attr != "") {
                mod = parseInt(getAttrByName(target.charId, attr.trim()));
                totalmod += isNaN(mod) ? 0 : mod;
            }
        });

        // roll the check
        roll = randomInteger(20) + totalmod;
        rolltwo = randomInteger(20) + totalmod;

        // format the roll
        rollLine = "";
        if (roll < 10) {
            rollLine += "0";
        }
        rollLine += roll + " | ";

        if (rolltwo < 10) {
            rollLine += "0";
        }
        rollLine += rolltwo + "@" + target.displayName;
        sceneMessages.push(rollLine);
    });

    // sort the lines 
    let output = "";
    sceneMessages.sort();
    sceneMessages.reverse();
    _.each(sceneMessages, function (sceneMessage) {
        output += sceneMessage + "/";
    });

    SendChatMessageToTargets(GetFormattedMessage("g", title + "/" + output), sendTargets);
}

function TargetSetValue(sendTargets, targets, title, attr, newValue) {

    // begin message
    let subMessage = ` has ${title} set to ${newValue}`;

    // declare variables
    let sceneMessages = [];
    let attrObj;

    // iterate through targets
    _.each(targets, function (target) {

        attrObj = GetCharacterAttribute(target.charId, attr);
        if (attrObj != undefined) {
            attrObj.set("current", newValue);

            // add to messages
            sceneMessages.push(target.displayName + subMessage);
        }
    });

    // Send the system messages
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetModifyValue(sendTargets, targets, title, isStorage, attr, count) {

    // modify couunt
    count = parseInt(count.trim());
    if (isNaN(count)) return;

    // begin message
    let subMessage = "";
    if (count > 0) {
        subMessage = " has gained " + count + " " + title;
    } else if (count < 0) {
        subMessage = " has lost " + Math.abs(count) + " " + title;
    }
    if (isStorage) {
        subMessage += " (placed into storage)";
    }

    // declare variables
    let sceneMessages = [];
    let gmSceneMessage = ["<strong>Current " + title + " values</strong>"];
    let currencyObj, val;

    // iterate through targets
    _.each(targets, function (target) {

        currencyObj = GetCharacterAttribute(target.charId, attr);
        if (currencyObj != undefined) {
            val = parseInt(currencyObj.get("current")) + count;
            currencyObj.set("current", val);

            // add to messagesv
            sceneMessages.push(target.displayName + subMessage);
            gmSceneMessage.push(target.displayName + " is at " + val + " " + title);
        }
    });

    // Send the system messages
    SendSystemMessage(gmSceneMessage, "/w GM ");
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetBriefRested(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var briefrestResources, briefrestResource;
    let repeatingSection = "repeating_resources";

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier

        // restore their short rest recovery values
        briefrestResources = getAttrByName(target.charId, "briefRestResources");
        if (briefrestResources != "") {
            briefrestResources = briefrestResources.split(",");
            _.each(briefrestResources, function (id) {
                briefrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
                if (briefrestResource != undefined) {
                    briefrestResource.set("current", briefrestResource.get("max"));
                }
            });
        }

        // turn off any auto off defenses
        let autoOffDefenses = getAttrByName(target.charId, "defAutoOffOnBriefRest");
        if (autoOffDefenses != undefined && autoOffDefenses != "") {

            // create an array of each id
            if (autoOffDefenses.indexOf("@@") >= 0) {
                autoOffDefenses = autoOffDefenses.split("@@");
            }
            else {
                autoOffDefenses = [autoOffDefenses];
            }

            // iterate through each id
            for (let i = 0; i < autoOffDefenses.length; i++) {
                DeactivateDefense(target.charId, autoOffDefenses[i]);
            }
        }
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a brief rest.");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a brief rest.");
    }
    sceneMessages.push("\nAll barrier has been fully recovered.");
    SendSystemMessage(sceneMessages, sendTargets);

}

function TargetSetShortRested(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var barrierObj, kiObj, shortrestResources, shortrestResource;
    let repeatingSection = "repeating_resources";

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier
        barrierObj = GetCharacterAttribute(target.charId, "barrier");
        if (barrierObj != undefined) {
            barrierObj.set("current", barrierObj.get("max"));
        }

        // recover their ki
        kiObj = GetCharacterAttribute(target.charId, "ki");
        if (kiObj != undefined) {
            kiObj.set("current", kiObj.get("max"));
        }

        // restore their short rest recovery values
        shortrestResources = getAttrByName(target.charId, "shortRestResources");
        if (shortrestResources != "") {
            shortrestResources = shortrestResources.split(",");
            _.each(shortrestResources, function (id) {
                shortrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
                if (shortrestResource != undefined) {
                    shortrestResource.set("current", shortrestResource.get("max"));
                }
            });
        }
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a short rest.");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a short rest.");
    }
    sceneMessages.push("\nAll barrier and ki have been fully recovered.");
    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSetLongRested(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];
    var lodgingName = "";
    var lodgingResolve = 0;
    var lodgingMorale = 0;
    var morale = 0;
    var resolve = 0;
    var barrierObj, kiObj, vitObj, moraleObj, resolveObj, longrestResources, longrestResource;
    let repeatingSection = "repeating_resources";

    // set up lodging  
    if (modifiers != "") {
        let splits = modifiers.split("@@@");
        lodgingName = splits[0];
        lodgingMorale = isNaN(parseInt(splits[1])) ? 0 : parseInt(splits[1]);
        resolveObj = GetAdjustedResolveAndMorale(0, 0, lodgingMorale);
        lodgingResolve = resolveObj.resolve;
        lodgingMorale = resolveObj.morale;
    }
    else {
        // the character is lodging at home
        lodgingName = "at Home";
    }

    // punctuation
    if (!lodgingName.startsWith(",") && !lodgingName.startsWith(" ")) {
        lodgingName = " " + lodgingName;
    }
    if (!lodgingName.endsWith(".") && !lodgingName.endsWith("!") && !lodgingName.endsWith("?")) {
        lodgingName = lodgingName + ".";
    }

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have finished a long rest" + lodgingName);
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has finished a long rest" + lodgingName);
    }
    sceneMessages.push("\nSome vitality, and all barrier and ki have been recovered.");
    SendSystemMessage(sceneMessages, sendTargets);

    // iterate through targets
    _.each(targets, function (target) {

        // recover their barrier
        barrierObj = GetCharacterAttribute(target.charId, "barrier");
        if (barrierObj != undefined) {
            barrierObj.set("current", barrierObj.get("max"));
        }

        // recover their ki
        kiObj = GetCharacterAttribute(target.charId, "ki");
        if (kiObj != undefined) {
            kiObj.set("current", kiObj.get("max"));
        }

        // recover their vitality
        vitObj = GetCharacterAttribute(target.charId, "vitality");
        if (vitObj != undefined) {
            let vitalityBonus = Number(getAttrByName(target.charId, "constitution_mod"));
            if (vitalityBonus < 1) {
                vitalityBonus = 1;
            }
            let val = Number(vitObj.get("current")) + vitalityBonus;
            if (Number(val) > vitObj.get("max")) {
                val = vitObj.get("max");
            }
            vitObj.set("current", val);
        }

        // restore their long rest recovery values
        longrestResources = getAttrByName(target.charId, "longRestResources");
        if (longrestResources != "") {
            longrestResources = longrestResources.split(",");
            _.each(longrestResources, function (id) {
                longrestResource = GetCharacterAttribute(target.charId, RowId.BuildId(repeatingSection, id, "resourcecount"));
                if (longrestResource != undefined) {
                    longrestResource.set("current", longrestResource.get("max"));
                }
            });
        }

        // set lodging rewards for the target if they're at home
        if (modifiers == "") {
            lodgingResolve = getAttrByName(target.charId, "lifestyle_resolve");
            if (lodgingResolve == null) {
                lodgingResolve = 0;
            }
            lodgingMorale = getAttrByName(target.charId, "lifestyle_morale");
            if (lodgingMorale == null) {
                lodgingMorale = 0;
            }
        }

        // set morale and resolve
        moraleObj = GetCharacterAttribute(target.charId, "morale");
        if (moraleObj != undefined) {
            var resolveObj = GetCharacterAttribute(target.charId, "resolve");
            if (resolveObj != undefined) {
                resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
                morale = isNaN(parseInt(moraleObj.get("current"))) ? 0 : parseInt(moraleObj.get("current"));
                if (lodgingResolve > resolve || (lodgingResolve == resolve && lodgingMorale > morale)) {

                    resolveObj.set("current", lodgingResolve);
                    moraleObj.set("current", lodgingMorale);

                    SendChatMessageToTargets(target.displayName + " has " + lodgingResolve + " resolve and " + lodgingMorale + " morale.",
                        GetCharacter(target.charId).get('controlledby'));
                }
            }
        }
    });
}

// ======= Lifestyles
// =================================================
function TargetAddWeek(targets, modifiers) {

    // declare variables
    var sceneMessages = [];
    let weekName, weekSpecial = 0;
    let splits = modifiers.split("@@@");
    weekName = splits[0];
    if (splits.length > 1) {
        weekSpecial = splits[1];
    }
    let newId;
    sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " added " + weekName);

    // iterate through targets
    _.each(targets, function (target) {
        newId = GenerateRowID();
        createObj("attribute", {
            "name": "repeating_downtime_" + newId + "_week",
            "current": weekName,
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_downtime_" + newId + "_special",
            "current": weekSpecial,
            "_characterid": target.charId
        });
    });

    SendSystemMessage(sceneMessages, "GM");
}

function TargetAddSocializingCharacter(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // !c addsocial Name@Race@Gender@Class@Profession@Rapport@favors
    var nameId = 0;
    var raceId = 1;
    var genderId = 2;
    var classId = 3;
    var professionId = 4;
    var rapportId = 5;
    var favorsId = 6;
    var newId;
    var settings = modifiers.split("@");

    // iterate through targets
    _.each(targets, function (target) {
        newId = GenerateRowID();
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_name",
            "current": settings[nameId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_race",
            "current": settings[raceId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_gender",
            "current": settings[genderId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_classCategory",
            "current": settings[classId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_profession",
            "current": settings[professionId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_rapport",
            "current": settings[rapportId],
            "_characterid": target.charId
        });
        createObj("attribute", {
            "name": "repeating_socializingactivities_" + newId + "_favors",
            "current": settings[favorsId],
            "_characterid": target.charId
        });
    });

    // format the scene message
    if (targets.length > 1) {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " have gained the friendship of " + settings[nameId] + "!");
    }
    else {
        sceneMessages.push(GetCharactersListFromTargetsMessage(targets) + " has gained the friendship of " + settings[nameId] + "!");
    }
    sceneMessages.push(settings[nameId] + " can now be selected in the socializing menu.");
    SendSystemMessage(sceneMessages, sendTargets);
}

// ======= Inspiration Functions
// =================================================

// Inspiration
function TargetSpendInspiration(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var resourceObj, charImage;

    // iterate through targets
    _.each(targets, function (target) {
        resourceObj = GetCharacterAttribute(target.charId, "inspiration");
        if (resourceObj != undefined && resourceObj.get("current") == "on") {
            resourceObj.set("current", 0);
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Inspiration", "Reroll their last check and take the higher result."), sendTargets);

        } else {
            SendChatMessageToTargets(target.displayName + " has no inspiration.", sendTargets);
        }
    });
}

// Resolve and Morale
function TargetRequestMorale(targets) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages.push(target.displayName + " is requesting Morale.");
        sceneMessages.push(GetRequestMoraleLine(target.charName, target.charId));
        sceneMessages.push(GetRequestKarmaLine(target.charName, target.charId));
        sceneMessages.push("[No](!gainmorale 0@" + target.charName + ")");
    });

    // Send the system message
    SendDmAlertMessage(sceneMessages);
}

function TargetGainMorale(modifiers) {

    // get modifiers
    let mods = modifiers.split("@");
    let roll = mods[0];
    let charName = mods[1].trim();
    let charId = mods[2].trim();

    if (parseInt(roll) == 0) {
        SendChatMessageToTargets(" No, you do not gain morale for " + charName, charName);
    } else {
        // declare variables
        let sceneMessages = TargetSetMorale(charId, charName, GetInspirationRoll(roll));
        SendSystemMessage(sceneMessages, "");
    }
}

function TargetsGainMorale(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages = sceneMessages.concat(TargetSetMorale(target.charId, target.displayName, GetInspirationRoll(modifiers)));
    });

    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSpendResolve(sendTargets, targets) {

    // declare variables
    let sceneMessages = [];
    let resolve, dieRoll, message;

    // iterate through targets
    _.each(targets, function (target) {
        resolve = parseInt(getAttrByName(target.charId, "resolve"));
        if (!isNaN(resolve) && resolve > 0) {

            // determine the die roll to add
            dieRoll = "";
            if (resolve == 2) {
                dieRoll = "1d4";
            }
            else if (resolve == 3) {
                dieRoll = "1d6";
            }
            else if (resolve >= 4) {
                resolve = 4;
                dieRoll = "2d4";
            }

            // adjust morale and resolve
            TargetSetMorale(target.charId, target.displayName, 0, -1);

            // send message
            message = "Gain advantage on your last roll. ";
            if (dieRoll != "") {
                message += "<br />Add [[" + dieRoll + "]] to the highest result of your roll.";
            }
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Resolve", message), sendTargets);


        } else {
            SendChatMessageToTargets(target.displayName + " has no resolve.", sendTargets);
        }
    });
}

// Fate and Karma
function TargetRequestKarma(targets) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages.push(target.displayName + " is requesting Karma.");
        sceneMessages.push(GetRequestKarmaLine(target.charName, target.charId));
        sceneMessages.push(GetRequestMoraleLine(target.charName, target.charId));
        sceneMessages.push("[No](!gainkarma 0@" + target.charName + ")");
    });

    // Send the system message
    SendDmAlertMessage(sceneMessages);
}

function TargetGainKarma(modifiers) {

    // get modifiers
    let mods = modifiers.split("@");
    let roll = mods[0];
    let charName = mods[1].trim();
    let charId = mods[2].trim();

    if (parseInt(roll) == 0) {
        SendChatMessageToTargets(" No, you do not gain karma for " + charName, charName);
    } else {
        // declare variables
        let sceneMessages = TargetSetKarma(charId, charName, GetInspirationRoll(roll));
        SendSystemMessage(sceneMessages, "");
    }
}

function TargetsGainKarma(sendTargets, targets, modifiers) {

    // declare variables
    var sceneMessages = [];

    // iterate through targets
    _.each(targets, function (target) {
        sceneMessages = sceneMessages.concat(TargetSetKarma(target.charId, target.displayName, GetInspirationRoll(modifiers)));
    });

    SendSystemMessage(sceneMessages, sendTargets);
}

function TargetSpendFate(sendTargets, targets) {

    // declare variables
    var sceneMessages = [];
    var resourceObj;

    // iterate through targets
    _.each(targets, function (target) {
        resourceObj = GetCharacterAttribute(target.charId, "fate");
        if (resourceObj != undefined && !isNaN(parseInt(resourceObj.get("current"))) && parseInt(resourceObj.get("current")) > 0) {

            // reduce fate
            resourceObj.set("current", parseInt(resourceObj.get("current")) - 1);

            // send the message
            message = "(a) Choose to automatically succeed on your last check; or";
            message += "<br />(b) If dying, immediately gain 1 Hit Point.";
            SendChatMessageToTargets(GetCutInMessage(target.displayName, target.charId, "Fate", message), sendTargets);

        } else {
            SendChatMessageToTargets(target.displayName + " has no fate.", sendTargets);
        }
    });
}

// Rolls
function GetInspirationRoll(type) {
    switch (parseInt(type)) {
        case 1:
            return randomInteger(5);
        case 5:
            return 5 + randomInteger(5);
        case 10:
            return 10 + randomInteger(10);
        case 25:
            return 25 + randomInteger(15);
    }
    return isNaN(parseInt(type)) ? 0 : parseInt(type);
}

function GetRequestMoraleLine(charName, charId) {
    message = "";
    message += "[1M](!gainmorale 1@" + charName + "@" + charId + ") ";
    message += "[5M](!gainmorale 5@" + charName + "@" + charId + ") ";
    message += "[10M](!gainmorale 10@" + charName + "@" + charId + ") ";
    message += "[25M](!gainmorale 25@" + charName + "@" + charId + ") ";
    return message;
}

function GetRequestKarmaLine(charName, charId) {
    message = "";
    message += "[1K](!gainkarma 1@" + charName + "@" + charId + ") ";
    message += "[5K](!gainkarma 5@" + charName + "@" + charId + ") ";
    message += "[10K](!gainkarma 10@" + charName + "@" + charId + ") ";
    message += "[25K](!gainkarma 25@" + charName + "@" + charId + ") ";
    return message;
}

function TargetSetMorale(charId, displayName, modMorale, modResolve) {
    if (modResolve == undefined) {
        modResolve = 0;
    }

    let sceneMessages = [];

    // get the morale object
    let moraleObj = GetCharacterAttribute(charId, "morale");
    if (moraleObj != undefined) {
        let morale = isNaN(parseInt(moraleObj.get("current"))) ? 0 : parseInt(moraleObj.get("current"));

        sceneMessages.push(displayName + " has gained " + modMorale + " Morale.");
        var resolveObj = GetCharacterAttribute(charId, "resolve");
        if (resolveObj != undefined) {
            let resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
            let adjustedResolveObj = GetAdjustedResolveAndMorale(resolve, morale, modMorale, modResolve);

            // set resolve if it's changed
            if (adjustedResolveObj.resolve != resolve) {
                sceneMessages.push("Gained " + (parseInt(adjustedResolveObj.resolve) - resolve) + " Resolve.");
                resolveObj.set("current", adjustedResolveObj.resolve);
            }

            // set morale
            moraleObj.set("current", adjustedResolveObj.morale);
        }
        else {
            moraleObj.set("current", morale + parseInt(modMorale));
        }
    }

    return sceneMessages;
}

function TargetSetKarma(charId, displayName, value) {

    let sceneMessages = [];
    if (value != 0) {

        // get the karma object
        let karmaObj = GetCharacterAttribute(charId, "karma");
        if (karmaObj != undefined) {
            let karma = isNaN(parseInt(karmaObj.get("current"))) ? 0 : parseInt(karmaObj.get("current"));

            sceneMessages.push(displayName + " has gained " + value + " Karma.");
            var fateObj = GetCharacterAttribute(charId, "fate");
            if (fateObj != undefined) {
                let fate = isNaN(parseInt(fateObj.get("current"))) ? 0 : parseInt(fateObj.get("current"));
                let adjustedFateObj = GetAdjustedFateAndKarma(fate, karma, value);

                // set fate if it's changed
                if (adjustedFateObj.fate != fate) {
                    sceneMessages.push("Gained " + (parseInt(adjustedFateObj.fate) - fate) + " Fate.");
                    fateObj.set("current", adjustedFateObj.fate);
                }

                // set karma
                karmaObj.set("current", adjustedFateObj.karma);
            }
            else {
                karmaObj.set("current", karma + parseInt(value));
            }

        }
    }

    return sceneMessages;
}

// ======= Sheet Options Functions
// =================================================
function TargetInspirationOptions(targets, sendingPlayerName) {

    // declare variables
    let token;

    // iterate through targets
    for (let i = 0; i < targets.length; i++) {
        token = getObj('graphic', targets[i].tokenId);
        SendInspirationOptions(token.get('name'), getAttrByName(targets[i].charId, "emote_activesetimageurl"), targets[i].charId, sendingPlayerName);
    }
}

function TargetShowActiveQuests(targets, sendingPlayerName) {

}

// Create Options
function SendInspirationOptions(name, image, charId, sendTarget) {

    let sceneMessages = [];
    let title, content;
    if (name.substr(name.length - 1) != "s") {
        title = name + "'s Inspired";
    }
    else {
        title = name + "' Inspired";
    }

    var inspiration = GetCharacterAttribute(charId, "inspiration");
    if (inspiration != undefined && inspiration.get("current") == "on") {
        sceneMessages.push("<p>[Use Inspiration](!target " + charId + "@@@insp" + ")</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no inspiration.</p>");
    }

    var resolveObj = GetCharacterAttribute(charId, "resolve");
    var resolve = 0;
    if (resolveObj != undefined) {
        resolve = isNaN(parseInt(resolveObj.get("current"))) ? 0 : parseInt(resolveObj.get("current"));
    }
    if (resolve > 0) {
        sceneMessages.push("<p>[Use Resolve](!target " + charId + "@@@resolve" + ") (" + resolve + " remaining)</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no resolve.</p>");
    }

    var fateObj = GetCharacterAttribute(charId, "fate");
    var fate = 0;
    if (fateObj != undefined) {
        fate = isNaN(parseInt(fateObj.get("current"))) ? 0 : parseInt(fateObj.get("current"));
    }
    if (fate > 0) {
        sceneMessages.push("<p>[Use Fate](!target " + charId + "@@@fate" + ") (" + fate + " remaining)</p>");
    }
    else {
        sceneMessages.push("<p>" + name + " has no fate.</p>");
    }

    var moraleObj = GetCharacterAttribute(charId, "morale");
    var morale = 0;
    var nextMoraleValue = 10 + (resolve * 10);
    if (moraleObj != undefined) {
        morale = parseInt(moraleObj.get("current"));
    }
    var toNextMorale = nextMoraleValue - morale;

    var karmaObj = GetCharacterAttribute(charId, "karma");
    var karma = 0;
    if (karmaObj != undefined) {
        karma = parseInt(karmaObj.get("current"));
    }
    var toNextKarma = 50 - karma;

    // add request statements
    if (sendTarget == "GM") {
        sceneMessages.push("<p>Give Morale: " + GetRequestMoraleLine(name, charId) + "</p>");
        sceneMessages.push("<p>Give Karma: " + GetRequestKarmaLine(name, charId) + "</p>");
    }
    else {
        sceneMessages.push("<p>[Request Morale](!target " + charId + "@@@morale" + ")<br />For when you're feeling great.<br />(" + toNextMorale + " morale to next Resolve)</p>");
        sceneMessages.push("<p>[Request Karma](!target " + charId + "@@@karma" + ")<br />For when the world could be more fair.<br />(" + toNextKarma + " karma to next Fate)</p>");
    }

    content = "";
    _.each(sceneMessages, function (message) {
        if (message != "") {
            content += message;
        }
    });

    SendCombatTrackerMessage(title, image, content, sendTarget);
}


// ======= Condition Functions
// =================================================

function AddTokenCondition(token, conditionList, sourceName, sourceData, conditionSaveDc, conditionPower) {

    if (sourceName == undefined) sourceName = "Condition";
    if (conditionSaveDc == undefined) conditionSaveDc = 10;
    conditionSaveDc = isNaN(parseInt(conditionSaveDc)) ? 10 : parseInt(conditionSaveDc);
    if (conditionPower == undefined) conditionPower = 0;
    conditionPower = isNaN(parseInt(conditionPower)) ? 0 : parseInt(conditionPower);

    let resultsConditionMessages = {
        title: sourceName,
        desc: "",
        img: ""
    };

    // get token information
    let tokenStatusMarkers = token.get("statusmarkers");
    let conditionSource = GetTokenSourceConditionData();
    conditionSource.setSourceConditionData(sourceName, sourceData, conditionSaveDc, conditionPower);

    // sanitize all of the results
    let conditions = conditionList.replace(/\]/g, "").split("[");
    let conditionSourceConditions = [];
    let primaryCondition = "";
    let conditionData, printData;
    for (let i = 0; i < conditions.length; i++) {
        log("conditions[" + i + "]: " + conditions[i]);

        if (conditions[i] != "") {
            // determine what to print based on the condition type
            conditionData = GetTokenConditionData();
            conditionData.setConditionData(conditions[i], sourceName, sourceData, conditionSaveDc);
            log("conditionData: " + conditionData.getConditionDataString());
            if (primaryCondition == "") {
                if (conditionData.isSpec) {
                    primaryCondition = "0";
                }
                else {
                    primaryCondition = conditionData.name;
                }
            }
            printData = conditionData.getPrintoutData();
            resultsConditionMessages.desc += (resultsConditionMessages.desc == "" ? "" : "\n") + printData.desc;
            if (conditionData.isTemp) {
                // add whatever condition this is to the token markers
                if (!TokenHasStatusMarker(token, conditionData.name) && GetTokenStatusMarkerData(conditionData.name).name != "") {
                    tokenStatusMarkers += GetTokenStatusMarkerName(conditionSource.name);
                }
            }
            else {
                // this is a condition that's remaining on the token and is part of the source effect
                conditionSourceConditions.push(conditionData);
            }
        }
    }

    // if there are conditions to add, create condition source data to add to the token
    if (conditionSourceConditions != "") {
        conditionSource.conditions = conditionSourceConditions;

        // check the current sources on the token for any sources that are identical to the one we just created
        let currentConditions = SanitizeTokenConditions(token);
        let setCondition, setIncrementer = false;
        let newConditionIndex = 1;
        for (let i = 0; i < currentConditions.length; i++) {
            log(`currentConditions[${i}]: ${currentConditions[i].getSourceConditionDataString()}`);

            // determine if this condition matches our current condition
            if (currentConditions[i].sourceName == sourceName) {
                setCondition = true;
                if (currentConditions[i].sourcePower > conditionPower || (currentConditions[i].sourcePower == conditionPower && currentConditions[i].sourceDC > conditionSaveDc)) {
                    resultsConditionMessages.desc = "Superior version of condition already exists on target. Keeping original.";
                }
                else {
                    conditionSource.conditionIndex = currentConditions[i].conditionIndex;
                    conditionSource.sourceImage = currentConditions[i].sourceImage;
                    currentConditions[i] = conditionSource;
                }
                break;
            }

            // set incrementer data
            if (!setIncrementer && currentConditions[i].conditionIndex != 0) {
                if (newConditionIndex != currentConditions[i].conditionIndex) {
                    setIncrementer = true;
                }
                else {
                    newConditionIndex++;
                }
            }
        }

        // if the condition hasn't been set, then add it to the list and add a condition marker on the target
        if (!setCondition) {
            if (TokenHasStatusMarker(token, primaryCondition)) {
                conditionSource.conditionIndex = newConditionIndex;
                conditionSource.sourceImage = `${newConditionIndex}`;
            }
            else {
                conditionSource.conditionIndex = 0;
                conditionSource.sourceImage = primaryCondition;
            }
            tokenStatusMarkers += GetTokenStatusMarkerName(conditionSource.sourceImage);
            currentConditions.push(conditionSource);
        }
        resultsConditionMessages.img = conditionSource.sourceImage;
        SetTokenConditionSources(token, currentConditions);
    }

    // set the token data
    token.set("statusmarkers", tokenStatusMarkers);

    return resultsConditionMessages;
}

function GetTokenActiveConditionsPrintout(token) {
    let currentConditions = SanitizeTokenConditions(token);

    let printData = [];
    for (let i = 0; i < currentConditions.length; i++) {
        printData.push(currentConditions[i].getPrintoutData());
    }
    return printData;
}

function SanitizeTokenConditions(token, setTokenConditions) {

    if (setTokenConditions == undefined) setTokenConditions = false;

    // iterate through the conditions on the token
    let currentConditions = GetTokenConditionSources(token);
    let finalConditionList = [];
    for (let i = 0; i < currentConditions.length; i++) {
        if (TokenHasStatusMarker(token, currentConditions[i].sourceImage)) {
            finalConditionList.push(currentConditions[i]);
        }
    }

    if (setTokenConditions && currentConditions.length != finalConditionList.length) {
        SetTokenConditionSources(token, finalConditionList);
    }
    return finalConditionList;
}

// Data Objects
function GetTokenSourceConditionData() {
    return {
        conditionIndex: 0,
        sourceName: "",
        sourceCharId: ``,
        sourceCharName: ``,
        sourceDC: 0,
        sourcePower: 0,
        sourceImage: "",
        rounds: 0,
        isSpec: false,
        conditions: [],

        setSourceConditionData: function (sourceName, sourceData, sourceDC, sourcePower) {
            this.sourceName = sourceName;
            this.sourceCharId = sourceData.charId;
            this.sourceCharName = sourceData.displayName;
            this.sourceDC = sourceDC;
            this.sourcePower = sourcePower;
        },

        setSourceConditionDataFromString: function (content) {
            let contentData = content.split("|");
            this.conditionIndex = contentData[0].trim();

            let data, dataType = "";
            for (let i = 0; i < contentData.length; i++) {
                data = contentData[i];
                dataType = "";
                if (data.indexOf(">") > 0) {
                    dataType = data.substring(0, data.indexOf(">")).toLowerCase().trim();
                    data = data.substring(data.indexOf(">") + 1);
                }
                switch (dataType) {
                    case "n":
                        this.sourceName = data.trim();
                        break;
                    case "sid":
                        this.sourceCharId = data.trim();
                        break;
                    case "scn":
                        this.sourceCharName = data.trim();
                        break;
                    case "sdc":
                        this.sourceDC = data.trim();
                        break;
                    case "sp":
                        this.sourcePower = data.trim();
                        break;
                    case "si":
                        this.sourceImage = data.trim();
                        break;
                    case "r":
                        this.rounds = data.trim();
                        break;
                    case "cd":
                        let conditions = data.trim().replace(/\]/g, "").split("[");
                        let conditionData = [];
                        let sourceData = FormTargetData(this.sourceCharId, this.sourceCharName, "", this.sourceCharName);
                        for (let i = 0; i < conditions.length; i++) {
                            if (conditions[i] != "") {

                                // determine what to print based on the condition type
                                conditionData = GetTokenConditionData();
                                conditionData.setConditionData(conditions[i], this.sourceName, sourceData, this.sourceDC);
                                if (conditionData.isSpec) {
                                    this.isSpec = true;
                                }
                                log(`Creating condition ${i}: ${conditionData.getConditionDataString()} from: ${conditions[i]}`);
                                this.conditions.push(conditionData);
                            }
                        }
                        break;
                }
            }
        },

        getSourceConditionDataString: function () {
            let output = `${this.conditionIndex}|n>${this.sourceName}|sid>${this.sourceCharId}|scn>${this.sourceCharName}|sdc>${this.sourceDC}|sp>${this.sourcePower}|si>${this.sourceImage}|r>${this.rounds}|cd>`;
            for (let i = 0; i < this.conditions.length; i++) {
                output += this.conditions[i].getConditionDataString();
            }
            return `{${output}}`;
        },

        getPrintoutData: function () {
            let output = {
                title: this.sourceName,
                source: this.sourceCharName,
                rounds: this.rounds,
                desc: "",
                img: this.sourceImage,

                getStatusMarkerImage: function () {
                    return GetTokenStatusMarkerData(this.img).img
                }
            };

            let conditionPrint = "";
            for (let i = 0; i < this.conditions.length; i++) {
                conditionPrint = this.conditions[i].getPrintoutData();
                output.desc += (output.desc == "" ? "" : "\n") + conditionPrint.desc;
            }

            return output;
        }
    };
}

function GetTokenConditionData() {
    return {
        name: ``,
        desc: ``,
        sourceName: ``,
        sourceCharId: ``,
        sourceCharName: ``,
        endConditions: ``,
        isTemp: true,
        isSpec: false,

        setConditionData: function (content, sourceName, targetData, conditionSaveDc) {
            content = content.replace(/\[/g, "");
            content = content.replace(/\]/g, "");

            let contentData = content.split("@");
            this.name = contentData[0].trim();
            if (this.name.toLowerCase() == "spec") {
                this.isSpec = true;
                this.name = sourceName;
            }
            this.sourceName = sourceName;
            this.sourceCharId = targetData.charId;
            this.sourceCharName = targetData.displayName;

            let data = "";
            let dataType = "";
            let desc = "";
            for (let i = 0; i < contentData.length; i++) {
                data = contentData[i];
                dataType = "";
                if (data.indexOf(">") > 0) {
                    dataType = data.substring(0, data.indexOf(">")).toLowerCase().trim();
                    data = data.substring(data.indexOf(">") + 1);
                }
                switch (dataType) {
                    case "d":
                        desc = data.trim();
                        if (desc.indexOf("{DC}") >= 0) {
                            desc = desc.replace(/\{DC\}/g, `DC ${conditionSaveDc}`);
                        }
                        if (desc.indexOf("{Name}") >= 0) {
                            desc = desc.replace(/\{Name\}/g, `DC ${targetData.displayName}`);
                        }
                        this.desc = desc;

                        break;
                    case "e":
                        desc = data.trim();
                        if (desc.indexOf("{DC}") >= 0) {
                            desc = desc.replace(/\{DC\}/g, `DC ${conditionSaveDc}`);
                        }
                        if (desc.indexOf("{Name}") >= 0) {
                            desc = desc.replace(/\{Name\}/g, `DC ${targetData.displayName}`);
                        }
                        this.endConditions = desc;
                        this.isTemp = false;
                        break;
                    case "sn":
                        this.sourceName = data.trim();
                        break;
                }
            }
        },

        getConditionDataString: function () {
            return `[${this.name}@d>${this.desc}@e>${this.endConditions}]`;
        },

        getPrintoutData: function () {
            let output = {
                title: this.name,
                desc: this.desc
            };

            if (this.name.toLowerCase() == "pushed") {
                output.desc = `Target is pushed ${this.desc}.`;
            }

            if (this.name.toLowerCase() == "prone") {
                output.desc = `Target is knocked prone.`;
            }
            else {
                let conditionData = GetCondition(this.name);
                if (conditionData.name != "") {
                    output.desc += (output.desc == "" ? "" : "\n") + `[${conditionData.name}] ${conditionData.short}`;
                }
            }

            if (this.endConditions != "") {
                output.desc += `\n<strong>End Conditions:</strong> ${this.endConditions}`;
            }
            return output;
        }
    };
}

// token source condition access
function GetTokenConditionSources(token) {

    let tokenGmNotes = token.get("gmnotes");
    if (tokenGmNotes == undefined || tokenGmNotes == "") {
        return [];
    }

    tokenGmNotes = tokenGmNotes.replace(/\}/g, "");
    let sources = tokenGmNotes.split("{").sort();
    let source;
    let output = [];
    for (let i = 0; i < sources.length; i++) {
        log(`[GetTokenConditionSources] ${i}: ${sources[i]}`);
        if (sources[i].trim() != "") {
            source = GetTokenSourceConditionData();
            source.setSourceConditionDataFromString(sources[i]);
            output.push(source);
        }
    }
    return output;
}

function SetTokenConditionSources(token, sources) {

    let currentConditions = "";
    for (let i = 0; i < sources.length; i++) {
        currentConditions += sources[i].getSourceConditionDataString();
    }
    token.set("gmnotes", currentConditions);
    return currentConditions;
}

// token status markers
function GetTokenStatusMarkerData(status) {

    switch (String(status).toLowerCase()) {
        case "marked":
            return {
                name: "marked",
                id: 1376671,
                img: "https://i.imgur.com/o1wvgVy.png"
            }
        case "checkmarked":
            return {
                name: "checkmarked",
                id: 1376826,
                img: "https://i.imgur.com/B78hAtj.png"
            }
        case "crossmarked":
            return {
                name: "crossmarked",
                id: 1376828,
                img: "https://i.imgur.com/MoXIyZh.png"
            }
        case "blinded":
            return {
                name: "blinded",
                id: 1376831,
                img: "https://i.imgur.com/5tszb9V.png"
            }
        case "charmed":
            return {
                name: "charmed",
                id: 1376833,
                img: "https://i.imgur.com/KM2HYP2.png"
            }
        case "deafened":
            return {
                name: "deafened",
                id: 1376834,
                img: "https://i.imgur.com/6c93LTQ.png"
            }
        case "frightened":
            return {
                name: "frightened",
                id: 1376836,
                img: "https://i.imgur.com/NvgItHK.png"
            }
        case "grappled":
            return {
                name: "grappled",
                id: 1376839,
                img: "https://i.imgur.com/LCiOfYL.png"
            }
        case "incapacitated":
            return {
                name: "incapacitated",
                id: 1376840,
                img: "https://i.imgur.com/NMCM4c9.png"
            }
        case "invisible":
            return {
                name: "invisible",
                id: 1376842,
                img: "https://i.imgur.com/X1LLTzw.png"
            }
        case "paralyzed":
            return {
                name: "paralyzed",
                id: 1376844,
                img: "https://i.imgur.com/qRZPpAi.png"
            }
        case "poisoned":
            return {
                name: "poisoned",
                id: 1376846,
                img: "https://i.imgur.com/xupjfHJ.png"
            }
        case "prone":
            return {
                name: "prone",
                id: 1376848,
                img: "https://i.imgur.com/Rc4nxMs.png"
            }
        case "restrained":
            return {
                name: "restrained",
                id: 1376850,
                img: "https://i.imgur.com/Zz53JZx.png"
            }
        case "staggered":
            return {
                name: "staggered",
                id: 1376852,
                img: "https://i.imgur.com/w9jd98k.png"
            }
        case "stunned":
            return {
                name: " stunned",
                id: 1376854,
                img: "https://i.imgur.com/9K6aLQk.png"
            }
        case "1":
            return {
                name: "1",
                id: 1376861,
                img: "https://i.imgur.com/0ybAAep.png"
            }
        case "2":
            return {
                name: "2",
                id: 1376862,
                img: "https://i.imgur.com/XYw7bDF.png"
            }
        case "3":
            return {
                name: "3",
                id: 1376863,
                img: "https://i.imgur.com/vEn0TUm.png"
            }
        case "4":
            return {
                name: "4",
                id: 1376864,
                img: "https://i.imgur.com/CrggiqP.png"
            }
        case "5":
            return {
                name: "5",
                id: 1376865,
                img: "https://i.imgur.com/vShVhyH.png"
            }
        case "6":
            return {
                name: "6",
                id: 1376868,
                img: "https://i.imgur.com/epUbuX1.png"
            }
        case "7":
            return {
                name: "7",
                id: 1376868,
                img: "https://i.imgur.com/LK4xXjj.png"
            }
        case "8":
            return {
                name: "8",
                id: 1376868,
                img: "https://i.imgur.com/mViHBTk.png"
            }
        case "concentration":
            return {
                name: "concentration",
                id: 4171912,
                img: ""
            }
    }

    return {
        name: "",
        id: 0
    }
}

function GetTokenStatusMarkerName(status) {
    var data = GetTokenStatusMarkerData(status);
    if (data.name == "") {
        return "";
    }
    else {
        return data.name + "::" + data.id;
    }
}

function TokenHasStatusMarker(token, condition) {
    return token.get("statusmarkers").indexOf(GetTokenStatusMarkerName(condition)) > -1;
}
