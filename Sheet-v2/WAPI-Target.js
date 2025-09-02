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
            } else if (data.charId != undefined) {
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
        }, {caseInsensitive: true});
        if (characters.length > 0) {
            return characters[0];
        }

        characters = findObjs({_type: 'character'});
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
        let teamIndexVar = WuxDef.GetVariable("TeamIndex");
        attributeHandler.addMod([displayNameVar, affinityVar, teamIndexVar]);
        attributeHandler.addFinishCallback(function (attrHandler) {
            let targetDisplayName = attrHandler.parseString(displayNameVar);
            if (targetDisplayName.trim() != "") {
                targetData.displayName = targetDisplayName;
            }
            targetData.elem = targetData.getElementStatus(attrHandler.parseString(affinityVar));
        });
        attributeHandler.run();
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
        } else {
            this.baseConstructor(token);
        }
    }

    createEmpty() {
        super.createEmpty();
        this.token = undefined;
        this.combatDetails = undefined;
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

    isCharacter() {
        return this.isBarLinked(1);
    }
    validateToken() {
        if (this.token == undefined) {
            Debug.LogError(`[TokenTargetData] No token data exists for ${this.charName}`);
            return false;
        }
        return true;
    }

    // token bar
    initToken() {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set("bar_location", "overlap_bottom");
        return true;
    }

    setBar(barIndex, variableObj, showBar, showText) {
        if (!this.validateToken()) {
            return false;
        }
        if (variableObj == undefined) {
            this.token.set(`bar${barIndex}_link`, "");
            this.token.set(`bar${barIndex}_value`, "");
            this.token.set(`bar${barIndex}_max`, "");
        } else {
            this.token.set(`bar${barIndex}_link`, variableObj.get("_id"));
            this.token.set(`bar${barIndex}_value`, variableObj.get("current"));
            this.token.set(`bar${barIndex}_max`, variableObj.get("max"));
        }
        this.token.set(`showplayers_bar${barIndex}`, showBar);
        this.token.set(`showplayers_bar${barIndex}text`, showText ? "2" : "0");
    }

    unlinkBar(barIndex) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set(`bar${barIndex}_link`, "");
    }

    isBarLinked(barIndex) {
        if (!this.validateToken()) {
            return false;
        }
        let barLink = this.token.get(`bar${barIndex}_link`);
        return barLink != undefined && barLink != "";
    }

    setBarValue(barIndex, value) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set(`bar${barIndex}_value`, value);
    }

    // nameplate
    showTokenName(isShown) {
        if (!this.validateToken()) {
            return false;
        }
        if (isShown) {
            this.token.set("name", this.displayName);
            this.token.set("showname", true);
            this.token.set("showplayers_name", true);
        } else {
            this.token.set("showname", false);
        }
    }

    // tooltip
    showTooltip(isShown) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set("show_tooltip", isShown);
        if (!isShown) {
            this.setTooltip("");
        }
    }

    setTooltip(value) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set("tooltip", value);
    }

    getTokenNote() {
        if (!this.validateToken()) {
            return false;
        }
        return this.token.get("gmnotes");
    }
    setTokenNote(value) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set("gmnotes", value);
    }

    // icon settings
    setEnergyIcon(value) {
        this.setIcon(this.elem, value);
    }
    setTurnIcon(value) {
        this.setIcon("status_yellow", value);
    }

    getIcon(iconName) {
        if (!this.validateToken()) {
            return false;
        }
        let value = this.token.get(iconName);
        if (value == undefined || value == "") {
            return 0;
        }
        return value;
    }
    setIcon(iconName, value) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set(iconName, value);
    }

    getDowned() {
        if (!this.validateToken()) {
            return false;
        }
        return this.token.get("status_dead");
    }
    setDowned(value) {
        if (!this.validateToken()) {
            return false;
        }
        this.token.set("status_dead", value);
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

    addMod(modDefinitionName, attributeHandler, value, finishCallback) {
        finishCallback = finishCallback == undefined ? function (results, attrHandler, attributeVar) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
        } : finishCallback;
        
        this.modifyResourceAttribute(attributeHandler,
            modDefinitionName,
            value,
            this.addModifierToAttribute,
            finishCallback
        );
    }
    addModNoCap(modDefinitionName, attributeHandler, value) {
        this.modifyResourceAttribute(attributeHandler,
            modDefinitionName,
            value,
            this.addModifierToAttributeNoCap,
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

    // Combat Details
    refreshCombatDetails(attributeHandler) {
        this.combatDetails = new CombatDetailsHandler(attributeHandler);
        this.refreshStatus(attributeHandler);
    }

    setCombatDetails(attrHandler, tokenNoteReference) {
        if (this.combatDetails == undefined) {
            Debug.LogError(`[TokenTargetData] No combat details exist for ${this.charName}`);
            return;
        }

        this.combatDetails.setData(attrHandler);

        if (this.combatDetails.hasDisplayStyle()) {
            if (this.isCharacter()) {
                let statusObj = new StatusHandler(attrHandler.parseJSON(WuxDef.GetVariable("Status")));
                this.combatDetails.onUpdateStatus(attrHandler, statusObj);
            } else {
                if (tokenNoteReference == undefined) {
                    tokenNoteReference = new TokenNoteReference(this.getTokenNote());
                }
                this.combatDetails.onUpdateNoteStats(attrHandler, tokenNoteReference);
                this.combatDetails.onUpdateStatus(attrHandler, tokenNoteReference.statusHandler);
            }
            this.setTooltip(this.combatDetails.printTooltip(attrHandler, this.displayName));
            this.showTooltip(true);
        } else {
            this.setTooltip("");
            this.showTooltip(false);
        }
    }

    // Note Reference
    importTokenNoteReferenceData(attributeHandler) {
        let tokenTargetData = this;
        let surgeDef = WuxDef.GetVariable("Surge");
        let vitalityDef = WuxDef.GetVariable("Cmb_Vitality");
        attributeHandler.addAttribute(surgeDef, vitalityDef);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let tokenNoteRef = new TokenNoteReference();
            tokenNoteRef.surges.current = attrHandler.parseInt(surgeDef, 0, true);
            tokenNoteRef.surges.max = tokenNoteRef.surges.current;
            tokenNoteRef.vitality.current = attrHandler.parseInt(vitalityDef, 0, true);
            tokenNoteRef.vitality.max = tokenNoteRef.vitality.current;
            Debug.Log(`Importing token note reference data for ${tokenTargetData.displayName} with values ${tokenNoteRef.surges.current}/${tokenNoteRef.surges.max} and ${tokenNoteRef.vitality.current}/${tokenNoteRef.vitality.max}`);
            tokenTargetData.setTokenNote(JSON.stringify(tokenNoteRef));
        });
    }
    
    getTeamIndex(tokenNoteReference) {
        if (tokenNoteReference == undefined) {
            tokenNoteReference = new TokenNoteReference(this.getTokenNote());
        }
        
        return tokenNoteReference.teamIndex;
    }
    setTeamIndex(index, tokenNoteReference) {
        if (tokenNoteReference == undefined) {
            tokenNoteReference = new TokenNoteReference(this.getTokenNote());
        }
        
        tokenNoteReference.teamIndex = index;
        this.setTokenNote(JSON.stringify(tokenNoteReference));
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

    // HP
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

    // Will
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

    // Energy
    addEnergy(attributeHandler, value, resultsCallback) {
        resultsCallback = resultsCallback == undefined ? this.applyResultsToEnergy : resultsCallback;

        if (this.isCharacter()) {
            this.modifyResourceAttribute(attributeHandler, "EN", value,
                this.addModifierToAttribute, resultsCallback);
        } else {
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

        if (this.isCharacter()) {
            this.modifyResourceAttribute(attributeHandler, "EN", startEnVar,
                this.setModifierToAttribute, resultsCallback);
        } else {
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

        if (this.isCharacter()) {
            this.modifyResourceAttribute(attributeHandler, "EN", roundEnVar,
                this.addModifierToAttribute, resultsCallback);
        } else {
            this.modifyIconAttribute(attributeHandler, this.elem, roundEnVar,
                function (results, value, attributeHandler, tokenTargetData) {
                    results.max = 9;
                    return tokenTargetData.addModifierToAttribute(results, value, attributeHandler, tokenTargetData);
                }, resultsCallback);
        }
    }

    applyResultsToEnergy(results, attrHandler, attributeVar, tokenTargetData) {
        if (tokenTargetData.isBarLinked(1)) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
        }
        tokenTargetData.setEnergyIcon(results.newValue);
        return results;
    }

    // Move Charge
    addMoveCharge(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsMoveCharge : resultsCallback;

        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", value,
                tokenTargetData.addModifierToAttributeNoCap, resultsCallback);
        } else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", value,
                tokenTargetData.addModifierToAttributeNoCap, resultsCallback);
        }
    }

    setMoveCharge(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsMoveCharge : resultsCallback;

        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", value,
                tokenTargetData.setModifierToAttribute, resultsCallback);
        } else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", value,
                tokenTargetData.setModifierToAttribute, resultsCallback);
        }
    }

    setDash(attributeHandler, resultsCallback) {
        this.addDashModifiers(attributeHandler);
        resultsCallback = resultsCallback == undefined ? this.applyResultsMoveCharge : resultsCallback;

        if (this.isCharacter()) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        } else {
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

        if (this.isCharacter()) {
            this.modifyResourceAttribute(attributeHandler, "MvCharge", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = results.current + tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        } else {
            this.modifyIconAttribute(attributeHandler, "status_yellow", 0,
                function (results, value, attrHandler, tokenTargetData) {
                    results.newValue = results.current + tokenTargetData.performDash(attrHandler);
                },
                resultsCallback);
        }
    }

    addDashModifiers(attributeHandler) {
        attributeHandler.addMod([WuxDef.GetVariable("Cmb_Mv"), WuxDef.GetVariable("Cmb_MvPotency")]);
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

    // Surge
    addSurge(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsSurge : resultsCallback;
        tokenTargetData.refreshCombatDetails(attributeHandler);

        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "Surge", value,
                tokenTargetData.addModifierToAttribute, resultsCallback);
        } else {
            this.modifyNoteAttribute(attributeHandler, "surges", value,
                tokenTargetData.addModifierToAttribute, resultsCallback);
        }
    }

    applyResultsSurge(results, attrHandler, attributeVar, tokenTargetData) {
        if (tokenTargetData.isBarLinked(1)) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
            tokenTargetData.combatDetails.onUpdateSurges(attrHandler, results.newValue);
            tokenTargetData.setCombatDetails(attrHandler);
        } else {
            Debug.Log(`Updating vitality in token note to ${results.newValue}`);
            let tokenNoteReference = new TokenNoteReference(tokenTargetData.getTokenNote());
            tokenNoteReference.surges.current = results.newValue;
            tokenTargetData.setTokenNote(JSON.stringify(tokenNoteReference));
            tokenTargetData.setCombatDetails(attrHandler, tokenNoteReference);
        }
    }

    // Vitality
    addVitality(attributeHandler, value, resultsCallback) {
        let tokenTargetData = this
        value = parseInt(value);
        resultsCallback = resultsCallback == undefined ? tokenTargetData.applyResultsVitality : resultsCallback;
        tokenTargetData.refreshCombatDetails(attributeHandler);

        if (tokenTargetData.isBarLinked(1)) {
            this.modifyResourceAttribute(attributeHandler, "Cmb_Vitality", value,
                tokenTargetData.addModifierToAttribute, resultsCallback);
        } else {
            this.modifyNoteAttribute(attributeHandler, "vitality", value,
                tokenTargetData.addModifierToAttribute, resultsCallback);
        }
    }

    applyResultsVitality(results, attrHandler, attributeVar, tokenTargetData) {
        if (tokenTargetData.isBarLinked(1)) {
            attrHandler.addUpdate(attributeVar, results.newValue, false);
            tokenTargetData.combatDetails.onUpdateVitality(attrHandler, results.newValue);
            tokenTargetData.setCombatDetails(attrHandler);
        } else {
            let tokenNoteReference = new TokenNoteReference(tokenTargetData.getTokenNote());
            tokenNoteReference.vitality.current = results.newValue;
            tokenTargetData.setTokenNote(JSON.stringify(tokenNoteReference));
            tokenTargetData.setCombatDetails(attrHandler, tokenNoteReference);
        }

        return results;
    }

    // Status
    addStatus(attributeHandler, statusDefinitionName) {
        this.modifyStatus(attributeHandler, statusDefinitionName, true);
    }

    removeStatus(attributeHandler, statusDefinitionName) {
        this.modifyStatus(attributeHandler, statusDefinitionName, false);
    }

    refreshStatus(attributeHandler) {
        let statusVar = WuxDef.GetVariable("Status");
        attributeHandler.addAttribute(statusVar);
    }

    modifyStatus(attributeHandler, statusDefinitionName, isAdded) {
        let tokenTargetData = this;
        tokenTargetData.refreshCombatDetails(attributeHandler);
        let statusVar = WuxDef.GetVariable("Status");
        attributeHandler.addAttribute(statusVar);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            if (tokenTargetData.isBarLinked(1)) {
                let statusObj = new StatusHandler(attrHandler.parseJSON(statusVar));
                if (isAdded) {
                    statusObj.addStatus(statusDefinitionName);
                } else {
                    statusObj.removeStatus(statusDefinitionName);
                }
                statusObj.saveStatusesToCharacterSheet(attrHandler);
                tokenTargetData.setCombatDetails(attrHandler);
            } else {
                let tokenNoteReference = new TokenNoteReference(tokenTargetData.getTokenNote());
                if (isAdded) {
                    tokenNoteReference.statusHandler.addStatus(statusDefinitionName);
                } else {
                    tokenNoteReference.statusHandler.removeStatus(statusDefinitionName);
                }
                tokenTargetData.setTokenNote(JSON.stringify(tokenNoteReference));
                tokenTargetData.setCombatDetails(attrHandler, tokenNoteReference);
            }
        });
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
            results.current = parseInt(tokenTargetData.token.get(`bar${barIndex}_value`));
            results.max = parseInt(tokenTargetData.token.get(`bar${barIndex}_max`));
            modCallback(results, value, attrHandler, tokenTargetData);
            finishCallback(results, attrHandler, "", tokenTargetData);
        });
    }

    modifyIconAttribute(attributeHandler, iconName, value, modCallback, finishCallback) {
        let tokenTargetData = this;
        let results = tokenTargetData.getModifyResults(iconName);

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            results.current = parseInt(tokenTargetData.getIcon(iconName));
            results.max = 99;
            modCallback(results, value, attrHandler, tokenTargetData);
            finishCallback(results, attrHandler, "", tokenTargetData);
        });
    }

    modifyNoteAttribute(attributeHandler, attrName, value, modCallback, finishCallback) {
        let tokenTargetData = this;
        let results = tokenTargetData.getModifyResults(attrName);
        let tokenNoteReference = new TokenNoteReference(tokenTargetData.getTokenNote());

        attributeHandler.addGetAttrCallback(function (attrHandler) {
            results.current = parseInt(tokenNoteReference[attrName].current);
            results.max = parseInt(tokenNoteReference[attrName].max);
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
        } else if (results.newValue > results.max) {
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
        this.spentSurge = false;
        this.removeStatusType = "";
    }

    addMessage(message) {
        if (message != undefined && message != "") {
            this.effectMessages.push(message);
        }
    }

    addDamageRoll(damageRoll) {
        for (let i = 0; i < this.damageRolls.length; i++) {
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
            switch (damageRoll.damageType) {
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

    setSpendSurge() {
        this.spentSurge = true;
    }

    spendSurge(attributeHandler) {
        this.spentSurge = true;

        let targetEffect = this;
        this.tokenTargetData.addSurge(attributeHandler, -1,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                targetEffect.effectMessages.push(`${tokenTargetData.displayName} spends a Surge.`);
                tokenTargetData.applyResultsSurge(results, attrHandler, attributeVar, tokenTargetData);
            });
    }

    setRemoveStatusType(statusType) {
        this.removeStatusType = statusType;
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
        this.tokenTargetData.addVitality(attributeHandler, -1 * damage,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                if (results.newValue <= 0) {
                    tokenTargetData.setDowned(true);
                }
                tokenTargetData.applyResultsVitality(results, attrHandler, attributeVar, tokenTargetData);
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

        let surgeVar = WuxDef.GetVariable("Surge");
        let surgeResults = this.tokenTargetData.getModifyResults(surgeVar);
        this.tokenTargetData.refreshCombatDetails(attributeHandler);
        let tokenNoteReference = {};
        if (targetEffect.tokenTargetData.isCharacter()) {
            attributeHandler.addAttribute(surgeVar);
        } else {
            tokenNoteReference = new TokenNoteReference(this.tokenTargetData.getTokenNote());
        }

        this.tokenTargetData.addWill(attributeHandler, -1 * damageRoll.total,
            function (results, attrHandler, attributeVar, tokenTargetData) {
                tokenTargetData.applyResultsToWill(results, attrHandler, attributeVar, tokenTargetData);
                tokenTargetData.applyResultsSurge(surgeResults, attrHandler, surgeVar, tokenTargetData);
            },
            function (results, value, attrHandler) {
                if (targetEffect.tokenTargetData.isCharacter()) {
                    surgeResults.current = attrHandler.parseInt(surgeVar, 0, false);
                    surgeResults.max = attrHandler.parseInt(surgeVar, 0, true);
                } else {
                    surgeResults.current = parseInt(tokenNoteReference["surges"].current);
                    surgeResults.max = parseInt(tokenNoteReference["surges"].max);
                    Debug.Log(`Current surges for ${targetEffect.tokenTargetData.displayName} is ${surgeResults.current}/${surgeResults.max}`);
                }

                if (surgeResults.current > 0) {
                    surgeResults.newValue = surgeResults.current - 1;
                    results.newValue = results.max + value;
                    if (results.newValue <= 0) {
                        results.newValue = 1; // we do not allow multiple will Breaks to occur. Willpower always restores to at least 1
                    }
                    targetEffect.effectMessages.push(`${targetEffect.tokenTargetData.displayName} consumes a Surge. ` +
                        `${targetEffect.tokenTargetData.displayName} fully heals Will ` +
                        `then takes ${Format.ShowTooltip(damageRoll.total, damageRoll.message)} damage.`);
                } else {
                    surgeResults.newValue = 0;
                    results.newValue = 0;
                    targetEffect.effectMessages.push(`${targetEffect.tokenTargetData.displayName} has no Surges remaining. Will remains at zero.`);
                }

                // set the will to max first
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

class TokenNoteReference {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (typeof data == "string") {
                this.importStringifiedJson(data);
            } else {
                this.importJson(data);
            }
        }
    }

    importStringifiedJson(stringifiedJSON) {
        if (stringifiedJSON == undefined || stringifiedJSON == "") {
            return;
        }
        try {
            let json = JSON.parse(stringifiedJSON);
            this.importJson(json);
        } catch {
            Debug.LogError("[TokenNoteReference] Unable to parse token note JSON");
        }
    }

    createEmpty() {
        this.statusHandler = {};
        this.surges = {current: 0, max: 0};
        this.vitality = {current: 0, max: 0};
        this.teamIndex = 0;
        
    }

    importJson(json) {
        if (json.statusHandler == undefined) {
            this.statusHandler = new StatusHandler();
        } else {
            this.statusHandler = new StatusHandler(json.statusHandler);
        }
        this.surges = json.surges == undefined ? {current: 0, max: 0} : json.surges;
        this.vitality = json.vitality == undefined ? {current: 0, max: 0} : json.vitality;
        this.teamIndex = json.teamIndex;
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
                case "!actcheck":
                    commandCheckActiveTargets(msg);
                    break;
                case "!actadd":
                    commandAddCharacter(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!actrem":
                    commandRemoveCharacter(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!actclr":
                    commandClearActiveTargets();
                    break;
                case "!tokenoptions":
                    commandShowTokenOptions(msg);
                    break;
                case "!partyoptions":
                    commandShowPartyOptions(msg);
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
                case "!tmovereset":
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
                case "!pfullheal":
                    content = getTeamTargets(content);
                    commandFullHeal(msg, content.targets);
                    break;
                case "!thealsurge":
                    commandHealSurge(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!phealsurge":
                    content = getTeamTargets(content);
                    commandHealSurge(msg, content.targets, content.content);
                    break;
                case "!thealvit":
                    commandHealVitality(msg, TokenReference.GetTokenTargetDataArray(msg), content);
                    break;
                case "!phealvit":
                    content = getTeamTargets(content);
                    commandHealVitality(msg, content.targets, content.content);
                    break;
                case "!tresetSocial":
                    commandResetSocial(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tdetails":
                    commandUpdateCombatDetails(msg, TokenReference.GetTokenTargetDataArray(msg));
                    break;
                case "!tharddetails":
                    commandUpdateCombatDetailsHard(msg, TokenReference.GetTokenTargetDataArray(msg));
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

        commandCheckActiveTargets = function (msg) {
            if (state.WuxConflictManager == undefined || state.WuxConflictManager.teams == undefined) {
                let messageObject = new SystemInfoMessage("No active conflict.");
                messageObject.setSender("System");
                WuxMessage.SendToSenderAndGM(messageObject, msg);
                return;
            }

            if (state.TargetReference.activeCharacters.length == 0) {
                let messageObject = new SystemInfoMessage("No active characters.");
                messageObject.setSender("System");
                WuxMessage.SendToSenderAndGM(messageObject, msg);
                return;
            }

            let allyTeam = getActiveTargetsOnTeam(0);
            let enemyTeam = getActiveTargetsOnTeam(1);
            let outputMessage = [];
            outputMessage.push(`Ally Team: ${getTargetListNames(allyTeam, true)}`);
            outputMessage.push(`Enemy Team: ${getTargetListNames(enemyTeam, true)}`);

            let messageObject = new SystemInfoMessage(outputMessage);
            messageObject.setSender("System");
            WuxMessage.SendToSenderAndGM(messageObject, msg);
        },

        commandAddCharacter = function (msg, targets, teamIndex) {
            _.each(targets, function (tokenTargetData) {
                tokenTargetData.setTeamIndex(teamIndex);
                addToActiveCharacters(tokenTargetData);
            });

            sendTokenUpdateMessage(msg, targets, ` added as ${state.WuxConflictManager.teams[teamIndex].name} unit(s)`);
        },

        commandRemoveCharacter = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                removeActiveTargetData(tokenTargetData.tokenId);
            });
            sendTokenUpdateMessage(msg, targets, " removed from active characters");
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

        getTeamTargets = function (content) {
            let output = {
                content: "",
                targets: []
            }
            let contentSplit = content.split("@@@");
            output.content = contentSplit[1];

            let target = getActiveTargetsOnTeam(contentSplit[0]);
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
                output += tokenOptionButton("Hard Update", "tharddetails");
                output += tokenOptionButton("Gen Name", "tgenname");
                output += tokenOptionButton("Reset Token", "treset");
                output += tokenOptionButton("Remove From Conflict", "actrem");
            }

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Combat Stat Options");
            if (!playerIsGM(msg.playerid)) {
                output += tokenOptionButton("Prep4 Battle", `tconflictstate Battle@0`);
            } else {
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
            } else {
                output += tokenOptionButton("Prep4 Social", `tconflictstate Social@?{Set team index|0}`);
                output += tokenOptionButton("Reset Social", "tresetSocial");
                output += tokenOptionButton("Request Threshold", "tss ?{Set the difficulty of the request|" +
                    "Simple DC 15|Inconvenient DC 30|Disruptive DC 40|Serious DC 50|Life-Changing DC 60}");
            }

            let senderMessage = new SystemInfoMessage(output);
            senderMessage.setSender(sender);
            WuxMessage.Send(senderMessage, sender);
        },

        commandShowPartyOptions = function (msg) {
            let sender = msg.who;

            let output = "";
            output += tokenOptionTitle("Party State");
            output += tokenOptionButton("Check", "actcheck");
            output += tokenOptionButton("Clear All", "actclr");

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Conflict Options");
            output += tokenOptionButton("Start Battle", "cmbstartbattle");
            output += tokenOptionButton("Start Social", "cmbstartsocial");
            output += tokenOptionButton("Round", "startround");
            output += tokenOptionSpacer();
            output += tokenOptionButton("Conflict XP", "conflictxp");
            output += tokenOptionButton("End", "endcombat");

            output += tokenOptionSpacer();
            output += tokenOptionTitle("Combat Stat Options");
            output += tokenOptionButton("Full Heal", "pfullheal ?{Team index|0}@@@");
            output += tokenOptionButton("Add Surge", "phealsurge ?{Team index|0}@@@?{How much surge to add?|1}");
            output += tokenOptionButton("Add Vitality", "phealvit ?{Team index|0}@@@?{How much vitality to add?|1}");

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

            sendTokenUpdateMessage(msg, targets, `: ${content} EN`);
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
                tokenTargetData.addSurge(attributeHandler, content);
                attributeHandler.run();
            });

            sendTokenUpdateMessage(msg, targets, `: ${content} Surge`);
        },

        commandHealVitality = function (msg, targets, content) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.addVitality(attributeHandler, content);
                attributeHandler.run();
            });

            sendTokenUpdateMessage(msg, targets, `: ${content} Vitality`);
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
                tokenTargetData.refreshCombatDetails(attributeHandler);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    tokenTargetData.setCombatDetails(attrHandler);
                });
                attributeHandler.run();
            });

            sendTokenUpdateMessage(msg, targets, `: tooltip updated`);
        },

        commandUpdateCombatDetailsHard = function (msg, targets) {
            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
                tokenTargetData.refreshCombatDetails(attributeHandler);

                let crVar = WuxDef.GetVariable("CR");
                let jobVar = WuxDef.GetVariable("Forme_JobSlot", 1);
                let surgeVar = WuxDef.GetVariable("Surge");
                let vitalityVar = WuxDef.GetVariable("Cmb_Vitality");
                let hvVar = WuxDef.GetVariable("Cmb_HV");
                let armorVar = WuxDef.GetVariable("Cmb_Armor");
                attributeHandler.addAttribute([crVar, jobVar, surgeVar, vitalityVar, hvVar, armorVar]);
                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    tokenTargetData.combatDetails.onUpdateCR(attrHandler, attrHandler.parseInt(crVar, 0, false));
                    tokenTargetData.combatDetails.onUpdateJob(attrHandler, attrHandler.parseString(jobVar, 0, false));
                    tokenTargetData.combatDetails.onUpdateSurges(attrHandler, attrHandler.parseInt(surgeVar, 0, false));
                    tokenTargetData.combatDetails.onUpdateMaxSurges(attrHandler, attrHandler.parseInt(surgeVar, 0, true));
                    tokenTargetData.combatDetails.onUpdateVitality(attrHandler, attrHandler.parseInt(vitalityVar, 0, false));
                    tokenTargetData.combatDetails.onUpdateMaxVitality(attrHandler, attrHandler.parseInt(vitalityVar, 0, true));
                    tokenTargetData.combatDetails.onUpdateHealValue(attrHandler, attrHandler.parseInt(hvVar, 0, false));
                    tokenTargetData.combatDetails.onUpdateArmorValue(attrHandler, attrHandler.parseInt(armorVar, 0, false));
                    tokenTargetData.setCombatDetails(attrHandler);
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
                case "Defenses":
                    group = "Defense";
                    tableName = "Defenses";
                    break;
                case "Senses":
                    group = "Sense";
                    tableName = "Senses";
                    break;
                default:
                    tableName = content;
                    break;
            }

            let groupArray = WuxDef.Filter(new DatabaseFilterData("group", group));
            if (groupArray.length == 0) {
                Debug.LogError(`[commandShowGroup] The group (${group}) is empty!`);
            } else {
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
            } else {
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
            let sheetNameVar = WuxDef.GetVariable("SheetName");
            let outputMessage = [];

            _.each(targets, function (tokenTargetData) {
                let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);

                attributeHandler.addMod([raceVar, genderVar, homeRegionVar, sheetNameVar]);
                attributeHandler.addFinishCallback(function (attrHandler) {
                    let generator = new WuxingHumanCharacterGenerator();
                    generator.character.ancestry = attrHandler.parseString(raceVar);
                    generator.character.gender = attrHandler.parseString(genderVar);
                    generator.character.homeRegion = attrHandler.parseString(homeRegionVar);
                    generator.generateCharacter();
                    tokenTargetData.token.set("name", generator.character.firstName);
                    tokenTargetData.displayName = generator.character.firstName;

                    outputMessage.push(`${attrHandler.parseString(sheetNameVar)} Name: ${generator.character.fullName}. ` +
                        `\They have a ${generator.character.motivation} Motivation and a ${generator.character.personality} Personality.`);
                });
                attributeHandler.run();

                let messageObject = new SystemInfoMessage(outputMessage);
                messageObject.setSender("System");
                WuxMessage.Send(messageObject, "GM");
            });

        },

        sendTokenUpdateMessage = function (msg, targets, message) {
            let outputMessage = `${getTargetListNames(targets)} ${message}`;
            let messageObject = new SystemInfoMessage(outputMessage);
            messageObject.setSender("System");
            WuxMessage.SendToSenderAndGM(messageObject, msg);
        },
        
        getTargetListNames = function(targets, includeSheetName) {
            let targetNames = "";
            for (let i = 0; i < targets.length; i++) {
                if (targets.length > 1) {
                    if (i == targets.length - 1) {
                        targetNames += " and ";
                    } else if (targetNames != "") {
                        targetNames += ", ";
                    }
                }
                targetNames += `${targets[i].displayName}`;
                if (includeSheetName && targets[i].charName != targets[i].displayName) {
                    targetNames += `[${targets[i].charName}]`;
                }
            }
            return targetNames;
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
                    } else if (parts[0] == "lrc") {
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
                    } else {
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

        hasActiveTargets = function () {
            return Object.keys(state.TargetReference.activeCharacters.targetData).length > 0;
        },

        getActiveTargetsOnTeam = function (teamIndex) {
            let tokenTargetDataArray = [];
            iterateOverActiveTargetData(function (tokenTargetData) {
                if (tokenTargetData.getTeamIndex() == teamIndex) {
                    tokenTargetDataArray.push(tokenTargetData);
                }
            });
            return tokenTargetDataArray;
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
            } else {
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
        GetActiveTargetsOnTeam: getActiveTargetsOnTeam,
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
            } else {
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
            } else {
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
            } else {
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
            if (tokenTargetData.initToken()) {
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
            let hpVar = WuxDef.GetVariable("HP");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let enVar = WuxDef.GetVariable("EN");
            let fullNameVar = WuxDef.GetVariable("FullName");
            attributeHandler.addAttribute([hpVar, willpowerVar, enVar, fullNameVar]);
            tokenTargetData.importTokenNoteReferenceData(attributeHandler);
            tokenTargetData.refreshCombatDetails(attributeHandler);

            attributeHandler.addGetAttrCallback(function (attrHandler) {
                tokenTargetData.setBar(1, attrHandler.getAttribute(hpVar), true, true);
                tokenTargetData.setBar(2, attrHandler.getAttribute(willpowerVar), true, true);

                if (attrHandler.parseString(fullNameVar) == "GenericOverride") {
                    tokenTargetData.unlinkBar(1);
                    tokenTargetData.unlinkBar(2);
                }

                tokenTargetData.setEnergyIcon(attrHandler.parseInt(enVar, 0, false));
                tokenTargetData.combatDetails.onUpdateDisplayStyle(attrHandler, "Battle");
                tokenTargetData.setCombatDetails(attrHandler);
            });
        },
        setTokenForSocialBattle = function (tokenTargetData, attributeHandler) {
            let patienceVar = WuxDef.GetVariable("Soc_Impatience");
            let willpowerVar = WuxDef.GetVariable("WILL");
            let favorVar = WuxDef.GetVariable("Soc_Favor");
            let enVar = WuxDef.GetVariable("EN");
            let fullNameVar = WuxDef.GetVariable("FullName");
            attributeHandler.addAttribute([patienceVar, willpowerVar, favorVar, enVar, fullNameVar]);
            tokenTargetData.importTokenNoteReferenceData(attributeHandler);
            tokenTargetData.refreshCombatDetails(attributeHandler);

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
                tokenTargetData.combatDetails.onUpdateDisplayStyle(attrHandler, "Social");
                tokenTargetData.setCombatDetails(attrHandler);
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
            tokenTargetData.setDowned(false);

            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            tokenTargetData.refreshCombatDetails(attributeHandler);
            attributeHandler.addFinishCallback(function (attrHandler) {
                tokenTargetData.combatDetails.onUpdateDisplayStyle(attrHandler, "");
                tokenTargetData.setCombatDetails(attrHandler);
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


