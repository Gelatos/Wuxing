// ======= Action Roll Template Handling

function HandleAction(msg, charId, player) {
    log("Handle Action: " + msg.content);

    // prepare output
    let output = "";
    let actionData = PopulateBaseActionDataFromRollTemplate(msg, charId, player);

    // handle resources
    output = HandleResourceCosts(msg, charId, output);

    // determine if this is a target action
    let targetData = GetTargetDataFromRollTemplate(msg, charId);
    if (targetData.isSet) {

        if (targetData.isTarget) {
            // update the action data
            actionData = PopulateCheckActionDataFromRollTemplate(actionData, msg);
            actionData = PopulateDamageActionDataFromRollTemplate(actionData, msg);
            actionData = PopulateResultsActionDataFromRollTemplate(actionData, msg);

            // handle the targetted action and update the output
            output += HandleTargettedAction(actionData, targetData);
        }
        output += GetRetargetButton(actionData);
    }
    else {
        // determine if this is a craft action
        let craftType = GetActionRollTempleteTrait(msg, /{{craft=.*?}}/g, "=");
        if (craftType == "blueprint") {

            // update the action data
            actionData = PopulateCraftActionDataFromRollTemplate(actionData, msg);
            actionData = PopulateCheckActionDataFromRollTemplate(actionData, msg);

            // handle the targetted action and update the output
            output += HandleCraftBlueprintAction(actionData);
        }
    }

    // display any info
    if (output != "") {
        let outputHeader = `<span>[${actionData.charDisplayName}] ${actionData.name}</span><hr />`;
        sendChat(msg.who, GetFormattedMessage("si", outputHeader + output));
    }
}

function HandleHiddenAction(msg, charId, playerid) {

    // prepare output
    let output = "&{template:action} " + msg.content;
    output += ` {{playerid=${playerid}}}`;

    if ((msg.target != undefined && msg.target.toLowerCase() == "gm") || msg.content.indexOf("{{whispered=1}}") >= 0) {
        sendChat("Roll Manager", `/w ${msg.who.split(" ")[0]} Action/Check Sent`);
    }

    if (msg.content.indexOf("{{r1=") >= 0) {
        output = GetHiddenCheckOutput(msg, output);
    } 
    log ("sending " + output);

    if ((msg.target != undefined && msg.target.toLowerCase() == "gm") || msg.content.indexOf("{{whispered=1}}") >= 0) {
        output = "/w GM " + output;
    }
    sendChat(msg.who, output);

    if (msg.content.indexOf("{{surge}}") >= 0) {
        PerformSurgeOutput(msg, charId);
    }

    if (msg.content.indexOf("{{raiseShield}}") >= 0) {
        PerformRaisedShieldOutput(msg, charId);
    }
}

function GetHiddenCheckOutput(msg, output) {

    // get the two rolls
    let check1 = parseInt(msg.content.match(/({{r1=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
    let check2 = parseInt(msg.content.match(/({{r2=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
    check1 = (msg.inlinerolls[check1].results.total != 0) ? parseInt(msg.inlinerolls[check1].results.total) : 0;
    check2 = (msg.inlinerolls[check2].results.total != 0) ? parseInt(msg.inlinerolls[check2].results.total) : 0;

    // modify the main roll
    let mod = GetActionRollTempleteTrait(msg, /{{mod=.*?}}/g, "=");
    output = output.replace(/({{r1=\$\[\[\d+\]\]}})/g, `{{r1=[[${check1}+${mod}]]}}`);
    output = output.replace(/({{r2=\$\[\[\d+\]\]}})/g, `{{r2=[[${check2}+${mod}]]}}`);

    // add all of the sub rolls
    let subrollNames = GetActionRollTempleteTrait(msg, /{{specs=.*?}}/g, "=").split(",");
    let subrollVals = GetActionRollTempleteTrait(msg, /{{specvals=.*?}}/g, "=").split(",");

    let incrementer = 1;
    for (let i = 0; i < subrollNames.length; i++) {

        if (subrollNames[i].trim() != "") {
            output += ` {{check${incrementer}=${subrollNames[i]}}} {{check${incrementer}r1=[[${check1}+${subrollVals[i]}]]}} {{check${incrementer}r2=[[${check2}+${subrollVals[i]}]]}}`;
            incrementer++;
        }
    }

    return output;
}

function PerformSurgeOutput(msg, charId) {

    // get surge value
    let surgeValue = GetActionRollTempleteTrait(msg, /{{surgeValue=.*?}}/g, "=");
    surgeValue = isNaN(parseInt(surgeValue)) ? 0 : parseInt(surgeValue);

    // calculate surge cost
    let surgeCost = GetActionRollTempleteTrait(msg, /{{surgeCost=.*?}}/g, "=");
    surgeCost = isNaN(parseInt(surgeCost)) ? 0 : parseInt(surgeCost);

    // calculate surge resist
    let surgeResist = GetActionRollTempleteTrait(msg, /{{surgeResist=.*?}}/g, "=");
    surgeResist = isNaN(parseInt(surgeResist)) ? 0 : parseInt(surgeResist);
    log (`surgeValue: ${surgeValue} cost: ${surgeCost} resist: ${surgeResist}`);
    surgeCost -= surgeResist;
    if (surgeCost < 1) {
        surgeCost = 1;
    }
    
    let output = "<div>VITALITY COST " + surgeCost + "</div>";
    let vitality = GetCharacterAttribute(charId, "vitality");
    let vitalityValue = parseInt(vitality.get("current"));
    if (surgeCost <= vitalityValue) {
        vitalityValue -= surgeCost;
        output += "<div>" + vitalityValue + " VITALITY REMAINING</div>";
        vitality.set("current", vitalityValue);

        let ki = GetCharacterAttribute(charId, "ki");
        let kiValue = parseInt(ki.get("current"));
        kiValue += surgeValue;
        if (kiValue > parseInt(ki.get("max"))) {
            kiValue = parseInt(ki.get("max"));
        }
        ki.set("current", kiValue);
        output += "<div>REGAINED " + surgeValue + " KI</div>";
        output += "<div>&nbsp;</div>";
        output = HandleResourceCosts(msg, charId, output);

    } else {
        output += "<div style='color:red;'>NOT ENOUGH VITALITY (" + vitalityValue + " VITALITY)</div>";
    }

    let outputHeader = `<span>[${GetActionRollTempleteTrait(msg, /{{username=.*?}}/g, "=")}] Surge</span><hr />`;
    sendChat(msg.who, GetFormattedMessage("si", outputHeader + output));
}

function PerformRaisedShieldOutput(msg, charId) {

    // prepare variables
    let output = "";

    // get shield ac
    let shieldAc = GetActionRollTempleteTrait(msg, /{{shieldAC=.*?}}/g, "=");
    shieldAc = isNaN(parseInt(shieldAc)) ? 0 : parseInt(shieldAc);

    // determine if the character already has the shield raised
    let raisedShieldObj = GetCharacterAttribute(charId, "gearEquippedShieldRaised");
    if (raisedShieldObj == undefined) {
        CreateNormalAttribute("gearEquippedShieldRaised", "0", charId);
        raisedShieldObj = GetCharacterAttribute(charId, "gearEquippedShieldRaised");
    }

    if (raisedShieldObj != undefined && raisedShieldObj.get("current") != "1") {

        // raise the shield
        raisedShieldObj.set("current", "1");

        // add to ac values
        let ac = GetCharacterAttribute(charId, "ac_shatterbarrier");
        let acValue = ac.get("current") + shieldAc;
        ac.set("current", acValue);

        let acBarrier = GetCharacterAttribute(charId, "ac_barrier");
        let acBarrierValue = acBarrier.get("current") + shieldAc;
        acBarrier.set("current", acBarrierValue);

        output = "<div>INCREASING AC BY " + shieldAc + "</div>";
        output += "<div>&nbsp;</div>";
        output = HandleResourceCosts(msg, charId, output);
    }
    else {
        output = "<div style='color:red;'>SHIELD IS ALREADY RAISED</div>";
    }

    let outputHeader = `<span>[${GetActionRollTempleteTrait(msg, /{{username=.*?}}/g, "=")}] Raise Shield</span><hr />`;
    sendChat(msg.who, GetFormattedMessage("si", outputHeader + output));
}

function PopulateBaseActionDataFromRollTemplate(msg, charId, player) {

    // create the action data
    let actionData = GetActionData();

    // populate targetting data
    actionData.charDisplayName = GetActionRollTempleteTrait(msg, /{{username=.*?}}/g, "=");
    actionData.charId = charId;
    actionData.sender = player.get("_displayname");
    actionData.name = GetActionRollTempleteTrait(msg, /{{rname=.*?}}/g, "=");
    actionData.traits = GetActionRollTempleteTrait(msg, /{{traits=.*?}}/g, "=");

    return actionData;
}

function PopulateCheckActionDataFromRollTemplate(actionData, msg) {

    // checks
    actionData.checkName = GetActionRollTempleteTrait(msg, /{{check=.*?}}/g, "=");
    actionData.checkDef = GetActionRollTempleteTrait(msg, /{{checkDef=.*?}}/g, "=");
    actionData.hasAdvantage = GetActionRollTempleteTrait(msg, /{{adv=.*?}}/g, "=");
    if (msg.content.indexOf("{{checkRoll=1}}") >= 0) {
        let check1 = parseInt(msg.content.match(/({{r1=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        let check2 = parseInt(msg.content.match(/({{r2=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.checkRoll = "1";
        actionData.checkflag = "1";
        actionData.check1 = (msg.inlinerolls[check1].results.total != 0) ? parseInt(msg.inlinerolls[check1].results.total) : 0;
        actionData.check2 = (msg.inlinerolls[check2].results.total != 0) ? parseInt(msg.inlinerolls[check2].results.total) : 0;
    } else {
        actionData.checkRoll = "0";
        if (msg.content.indexOf("{{r1=") >= 0) {
            actionData.checkflag = "1";
            let check1 = parseInt(msg.content.match(/({{r1=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
            actionData.check1 = (msg.inlinerolls[check1].results.total != 0) ? parseInt(msg.inlinerolls[check1].results.total) : 0;
        }
    }

    return actionData;
}

function PopulateDamageActionDataFromRollTemplate(actionData, msg) {

    // primary damage
    if (msg.content.indexOf("{{dmg1flag=1}}") >= 0) {
        actionData.dmg1flag = "1";
        let dmg1 = parseInt(msg.content.match(/({{dmg1=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.dmg1 = parseInt(msg.inlinerolls[dmg1].results.total);
        actionData.dmgtype1 = GetActionRollTempleteTrait(msg, /{{dmgtype1=.*?}}/g, "=");
        actionData.elem1 = GetActionRollTempleteTrait(msg, /{{elem1=.*?}}/g, "=");

        let crit1 = parseInt(msg.content.match(/({{crit1=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.crit1 = parseInt(msg.inlinerolls[crit1].results.total);
    }

    // heightened damage
    if (msg.content.indexOf("{{hldmg=") >= 0) {
        let hldmg = parseInt(msg.content.match(/({{hldmg=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.hldmg = parseInt(msg.inlinerolls[hldmg].results.total);
        let hldmgcrit = parseInt(msg.content.match(/({{hldmgcrit=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.hldmgcrit = parseInt(msg.inlinerolls[hldmgcrit].results.total);
    }

    // secondary damage
    if (msg.content.indexOf("{{dmg2flag=1}}") >= 0) {
        actionData.dmg2flag = "1";
        let dmg2 = parseInt(msg.content.match(/({{dmg2=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.dmg2 = parseInt(msg.inlinerolls[dmg2].results.total);
        actionData.dmgtype2 = GetActionRollTempleteTrait(msg, /{{dmgtype2=.*?}}/g, "=");
        actionData.elem2 = GetActionRollTempleteTrait(msg, /{{elem2=.*?}}/g, "=");

        let crit2 = parseInt(msg.content.match(/({{crit2=\$\[\[\d+\]\]}})/g)[0].split("[[")[1].split("]]")[0]);
        actionData.crit2 = parseInt(msg.inlinerolls[crit2].results.total);
    }

    return actionData;
}

function PopulateResultsActionDataFromRollTemplate(actionData, msg) {

    // results
    actionData.onCritSuccess = GetActionRollTempleteTrait(msg, /{{oncritsuccess=.*?}}/g, "=");
    actionData.onSuccess = GetActionRollTempleteTrait(msg, /{{onsuccess=.*?}}/g, "=");
    actionData.onFailure = GetActionRollTempleteTrait(msg, /{{onfailure=.*?}}/g, "=");
    actionData.onCritFailure = GetActionRollTempleteTrait(msg, /{{oncritfailure=.*?}}/g, "=");

    return actionData;
}

function PopulateCraftActionDataFromRollTemplate(actionData, msg) {

    // results
    actionData.craftid = GetActionRollTempleteTrait(msg, /{{craftid=.*?}}/g, "=");
    actionData.craftindex = GetActionRollTempleteTrait(msg, /{{craftindex=.*?}}/g, "=");
    actionData.craftprogress = GetActionRollTempleteTrait(msg, /{{craftprogress=.*?}}/g, "=");
    actionData.craftprogressmax = GetActionRollTempleteTrait(msg, /{{craftprogressmax=.*?}}/g, "=");

    return actionData;
}

function GetActionRollTempleteTrait(msg, searchString, splitter) {
    let output = (msg.content.match(searchString) != null) ? msg.content.match(searchString)[0].split(splitter)[1] : "";
    if (output.endsWith("}}")) {
        output = output.substring(0, output.length - 2);
    }
    return output;
}

function GetTargetDataFromRollTemplate(msg, charId) {

    let targetData = GetActionTargetData();
    let hasTargets = GetActionRollTempleteTrait(msg, /{{hastarget=.*?}}/g, "=");
    if (hasTargets != undefined && hasTargets != "") {

        let targetId = GetActionRollTempleteTrait(msg, /{{tokenId=.*?}}/g, "=");
        if (targetId == undefined || targetId == "") {
            if (hasTargets == "2") {
                // this is a self target
                targetData.createFromCharId(charId);
            }
            else {
                // this didn't target anything
                targetData.createFromNothing();
            }
        } else {
            targetData.createFromToken(targetId);
        }
    }

    return targetData;
}


// ======= Resource consumption

function HandleResourceCosts(msg, charId, output) {

    output += HandleActionCostFromTemplate(msg, charId);
    output += HandleManaCostFromTemplate(msg, charId);
    output += HandleResourceCostFromTemplate(charId, GetActionRollTempleteTrait(msg, /{{ammo=.*?}}/g, "="), "allAmmunition", "repeating_gearAmmunition", "itemname", "itemcount");
    output += HandleResourceCostFromTemplate(charId, GetActionRollTempleteTrait(msg, /{{resource=.*?}}/g, "="), "allResources", "repeating_resources", "resourcename", "resourcecount");
    output += HandleResourceCostFromTemplate(charId, GetActionRollTempleteTrait(msg, /{{consumable=.*?}}/g, "="), "allConsumables", "repeating_gearConsumables", "itemname", "itemcount");

    return output;
}

function HandleActionCostFromTemplate(msg, charId) {
    let actionCost = (msg.content.match(/{{action.*?}}/g) != null) ? msg.content.match(/{{action.*?}}/g)[0].split("=")[0].substring(8) : "";
    
    let output = "";
    let resourceVal = 0;
    switch(actionCost) {
        case "1":
        case "2":
        case "3":
            let actionCountObj = GetCharacterAttribute(charId, "actioncount");
            if (actionCountObj != undefined) {
                log ("current action count: " + actionCountObj.get("current"));
                resourceVal = isNaN(parseInt(actionCountObj.get("current"))) ? 0 : parseInt(actionCountObj.get("current"));
                if (actionCost <= resourceVal) {
                    resourceVal -= actionCost;
                    output += "<div>" + resourceVal + " REMAINING ACTION(S)</div>";
                    actionCountObj.set("current", resourceVal);
                } else {
                    output += "<div style='color:red;'>NOT ENOUGH ACTIONS (" + resourceVal + " ACTIONS)</div>";
                }
            }
        break;
        case "R":
            let reactionCountObj = GetCharacterAttribute(charId, "reactioncount");
            if (reactionCountObj != undefined) {
                resourceVal = isNaN(parseInt(reactionCountObj.get("current"))) ? 0 : parseInt(reactionCountObj.get("current"));
                if (actionCost <= resourceVal) {
                    resourceVal -= actionCost;
                    output += "<div>" + resourceVal + " REMAINING REACTION(S)</div>";
                    reactionCountObj.set("current", resourceVal);
                } else {
                    output += "<div style='color:red;'>NOT ENOUGH REACTIONS (" + resourceVal + " REACTIONS)</div>";
                }
            }
        break;
    }
    return output;
}

function HandleManaCostFromTemplate(msg, charId) {

    let output = "";

    // calculate mana cost
    let manaCost = GetActionRollTempleteTrait(msg, /{{mana=.*?}}/g, "=");
    manaCost = isNaN(parseInt(manaCost)) ? 0 : parseInt(manaCost);

    // add level adjustment
    let castLvl = GetActionRollTempleteTrait(msg, /{{castlevel=.*?}}/g, "=");
    castLvl = isNaN(parseInt(castLvl)) ? 0 : parseInt(castLvl);
    manaCost += castLvl * 100;

    if (manaCost > 0) {

        // the character's plane determines which resource to check
        let plane = getAttrByName(charId, "isSpiritRealm");
        if (plane == "1") {
            output += "<div>IN SPIRIT PLANE</div>";
            output += "<div>ESSENCE COST " + manaCost + "</div>";

            // characters in the spirit plane use essence to cast spells
            let essence = GetCharacterAttribute(charId, "essence");
            let essValue = parseInt(essence.get("current"))
            if (manaCost <= essValue) {
                essValue -= manaCost;
                output += "<div>" + essValue + " ESSENCE REMAINING</div>";
                essence.set("current", essValue);
            } else {
                output += "<div style='color:red;'>NOT ENOUGH ESSENCE (" + essValue + " ESSENCE)</div>";
            }
        } else {
            output += "<div>KI COST " + manaCost + "</div>";

            // characters in the material plane use ki to cast spells
            let ki = GetCharacterAttribute(charId, "ki");
            let kiValue = parseInt(ki.get("current"));
            if (manaCost <= kiValue) {
                kiValue -= manaCost;
                output += "<div>" + kiValue + " KI REMAINING</div>";
                ki.set("current", kiValue);
            } else {
                output += "<div style='color:red;'>NOT ENOUGH KI (" + kiValue + " KI)</div>";
            }
        }
    }

    return output;
}

function HandleResourceCostFromTemplate(charId, resourceType, resourceIdsName, repeatingSection, repeatingType, repeatingCount) {

    let output = "";

    if (resourceType != undefined && resourceType != "") {
        resourceType = resourceType.trim();
        let resourceCost = -1;
        if (resourceType.includes("[")) {
            let resourceSplit = resourceType.split("[");
            resourceType = resourceSplit[0];
            resourceCost = resourceSplit[1].indexOf("]") >= 0 ? resourceSplit[1].substring(0, resourceSplit[1].indexOf("]")) : resourceSplit[1];
            resourceCost = isNaN(parseInt(resourceCost)) ? -1 : parseInt(resourceCost);
        }

        let allIds = getAttrByName(charId, resourceIdsName);
        if (allIds != undefined && allIds != "") {

            allIds = allIds.split(",");
            let repeatingName;
            let foundId = "";
            _.each(allIds, function (id) {
                if (foundId == "") {
                    repeatingName = getAttrByName(charId, `${repeatingSection}_${id}_${repeatingType}`);
                    if (repeatingName != undefined && repeatingName.trim() == resourceType) {
                        foundId = id;
                    }
                }
            });

            let count = 0;
            let resourceCount;
            if (foundId != "") {
                resourceCount = GetCharacterAttribute(charId, `${repeatingSection}_${foundId}_${repeatingCount}`);
                count = resourceCount == undefined || isNaN(parseInt(resourceCount.get("current"))) ? 0 : parseInt(resourceCount.get("current"));
            }

            if (resourceCost > 0) {
                count += resourceCost;
                resourceCount.set("current", count);
                output += "<div>GAINED " + resourceCost + " " + resourceType.toUpperCase() + " (" + count + " CURRENT)</div>";
            } else if (count >= resourceCost) {
                count += resourceCost;
                resourceCount.set("current", count);
                output += "<div>" + count + " " + resourceType.toUpperCase() + " REMAINING</div>";
            } else {
                output += "<div style='color:red;'>NOT ENOUGH " + resourceType.toUpperCase() + "</div>";
            }
        } else {
            output += "<div style='color:red;'>DO NOT HAVE " + resourceType.toUpperCase() + "</div>";
        }
    }

    return output;
}


// ======= Action Data

function GetActionData() {
    return {
        // targetting data
        charDisplayName: "",
        charId: "",
        sender: "",

        // action data
        name: "",
        traits: "",

        // checks
        checkflag: "0",
        checkName: "",
        checkRoll: "0",
        check1: "",
        check2: "",
        checkDef: "",
        hasAdvantage: "0",

        // damage
        dmg1flag: "0",
        dmg1: "",
        hldmg: "",
        dmgtype1: "",
        elem1: "",
        crit1: "",
        hldmgcrit: "",
        dmg2flag: "0",
        dmg2: "",
        dmgtype2: "",
        elem2: "",
        crit2: "",

        // resources
        onCritSuccess: "",
        onSuccess: "",
        onFailure: "",
        onCritFailure: "",

        toString: function () {
            return `${this.charDisplayName}@@${this.charId}@@${this.sender}@@${this.name}@@${this.traits}@@${this.checkflag}@@${this.checkName}@@${this.checkRoll}@@${this.check1}@@${this.check2}@@${this.checkDef}@@${this.hasAdvantage}@@${this.dmg1flag}@@${this.dmg1}@@${this.hldmg}@@${this.dmgtype1}@@${this.elem1}@@${this.crit1}@@${this.hldmgcrit}@@${this.dmg2flag}@@${this.dmg2}@@${this.dmgtype2}@@${this.elem2}@@${this.crit2}@@${this.onCritSuccess}@@${this.onSuccess}@@${this.onFailure}@@${this.onCritFailure}`;
        },
        setData: function (content) {
            let contentSplit = content.split("@@");
            let contentIncrement = 0;
            this.charDisplayName = contentSplit[contentIncrement];
            contentIncrement++;
            this.charId = contentSplit[contentIncrement];
            contentIncrement++;
            this.sender = contentSplit[contentIncrement];
            contentIncrement++;
            this.name = contentSplit[contentIncrement];
            contentIncrement++;
            this.traits = contentSplit[contentIncrement];
            contentIncrement++;
            this.checkflag = contentSplit[contentIncrement];
            contentIncrement++;
            this.checkName = contentSplit[contentIncrement];
            contentIncrement++;
            this.checkRoll = contentSplit[contentIncrement];
            contentIncrement++;
            this.check1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.check2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.checkDef = contentSplit[contentIncrement];
            contentIncrement++;
            this.hasAdvantage = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmg1flag = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmg1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.hldmg = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmgtype1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.elem1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.crit1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.hldmgcrit = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmg2flag = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmg2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.dmgtype2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.elem2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.crit2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.onCritSuccess = contentSplit[contentIncrement];
            contentIncrement++;
            this.onSuccess = contentSplit[contentIncrement];
            contentIncrement++;
            this.onFailure = contentSplit[contentIncrement];
            contentIncrement++;
            this.onCritFailure = contentSplit[contentIncrement];
            contentIncrement++;
        },

        // unsavedvariables
        craftid: "",
        craftindex: "0",
        craftprogress: "0",
        craftprogressmax: "0",
    };
}

function GetActionTargetData() {
    return {
        isSet: false,
        isToken: false,
        isTarget: false,
        displayName: "",
        charId: "",
        tokenId: "",
        hasBarrier: "1",
        element: "",
        token: {},

        createFromNothing: function () {
            this.isSet = true;
        },
        createFromCharId: function (charId) {
            this.isToken = false;
            this.isTarget = true;
            this.charId = charId;
            this.tokenId = "";
            this.displayName = getAttrByName(charId, "nickname");
            if (this.displayName == undefined || this.displayName == "") {
                this.displayName = getAttrByName(charId, "character_name");
            }
            this.element = getAttrByName(charId, "prime_element");

            let barrier = getAttrByName(charId, "barrier");
            barrier = isNaN(parseInt(barrier)) ? 0 : parseInt(barrier);
            this.hasBarrier = barrier > 0 ? "1" : "0";
            this.isSet = true;
        },
        createFromToken: function (tokenId) {
            this.isToken = true;
            this.isTarget = true;
            this.token = getObj('graphic', tokenId);
            this.charId = this.token.get("represents");
            this.tokenId = tokenId;
            this.displayName = this.token.get("name");
            this.element = GetTokenElement(this.token);

            let barrier = this.token.get("bar2_value");
            barrier = isNaN(parseInt(barrier)) ? 0 : parseInt(barrier);
            this.hasBarrier = barrier > 0 ? "1" : "0";
            this.isSet = true;
        }
    };
}

function GetActionResultsData() {
    return {
        resultType: "",
        rname: "",
        traits: "",

        sender: "",
        executor: "",
        executorId: "",
        target: "",
        targetTokenId: "",
        targetCharId: "",

        hasAttack: "0",
        attack1: "",
        attack2: "",
        attackType: "",
        defense1: "",
        defense2: "",
        defenseType: "",
        attackMods: "",

        hasDamage: "0",
        damage1: 0,
        damage1Type: "",
        hasDamage2: "0",
        damage2: 0,
        damage2Type: "",
        damageMods: "",
        coreEffect: "",
        critEffect: "",

        damage1TypeQualities: {},
        damage2TypeQualities: {},

        setActionData: function (content) {
            let contentSplit = content.split("@@");
            let contentIncrement = 0;
            this.resultType = contentSplit[contentIncrement];
            contentIncrement++;
            this.rname = contentSplit[contentIncrement];
            contentIncrement++;
            this.traits = contentSplit[contentIncrement];
            contentIncrement++;

            this.sender = contentSplit[contentIncrement];
            contentIncrement++;
            this.executor = contentSplit[contentIncrement];
            contentIncrement++;
            this.executorId = contentSplit[contentIncrement];
            contentIncrement++;
            this.target = contentSplit[contentIncrement];
            contentIncrement++;
            this.targetTokenId = contentSplit[contentIncrement];
            contentIncrement++;
            this.targetCharId = contentSplit[contentIncrement];
            contentIncrement++;

            this.hasAttack = contentSplit[contentIncrement];
            contentIncrement++;
            this.attack1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.attack2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.attackType = contentSplit[contentIncrement];
            contentIncrement++;
            this.defense1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.defense2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.defenseType = contentSplit[contentIncrement];
            contentIncrement++;
            this.attackMods = contentSplit[contentIncrement];
            contentIncrement++;

            this.hasDamage = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage1 = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage1Type = contentSplit[contentIncrement];
            contentIncrement++;
            this.hasDamage2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage2 = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage2Type = contentSplit[contentIncrement];
            contentIncrement++;
            this.damageMods = contentSplit[contentIncrement];
            contentIncrement++;
            this.damageMods = this.damageMods.replace(/&&/g, "\n");
            this.coreEffect = contentSplit[contentIncrement];
            contentIncrement++;
            this.critEffect = contentSplit[contentIncrement];
            contentIncrement++;

            // set variables
            this.damage1TypeQualities = GetDamageTypeQualities(this.damage1Type);
            this.damage2TypeQualities = GetDamageTypeQualities(this.damage2Type);
        }
    };
}

function GetActionResultsDamageData() {
    return {
        isToken: false,
        displayName: "",
        charId: "",
        tokenId: "",
        token: {},

        hp: 0,
        br: 0,
        hpDamage: 0,
        brDamage: 0,
        hpObj: {},
        barrierObj: {},

        createFromTargetData: function (targetData) {
            this.isToken = targetData.displayName;
            this.displayName = targetData.displayName;
            this.charId = targetData.charId;
            this.tokenId = targetData.tokenId;
            this.token = targetData.token;

            this.br = 0;
            this.hp = 0;
            this.brDamage = 0;
            this.hpDamage = 0;
            this.barrierObj = {};
            this.hpObj = {};
            if (targetData.isToken) {
                this.hp = targetData.token.get("bar1_value");
                this.br = targetData.token.get("bar2_value");
            } else {
                this.hpObj = GetCharacterAttribute(targetData.charId, "hp");
                this.barrierObj = GetCharacterAttribute(targetData.charId, "barrier");
                this.hp = hpObj.get("current");
                this.br = barrierObj.get("current");
            }
            this.br = isNaN(parseInt(this.br)) ? 0 : parseInt(this.br);
            this.hp = isNaN(parseInt(this.hp)) ? 0 : parseInt(this.hp);

        }
    };
}

function GetActionHealData() {
    return {
        rname: "",

        sender: "",
        executor: "",
        executorId: "",
        target: "",
        targetTokenId: "",
        targetCharId: "",

        healing: 0,
        healingMods: "",

        injuryId: "",

        toString: function () {
            // return `${"Mods - Boof (df) "}`;
            return `${this.rname}@@${this.sender}@@${this.executor}@@${this.executorId}@@${this.target}@@${this.targetTokenId}@@${this.targetCharId}@@${this.healing}@@${this.healingMods}@@${this.injuryId}`;
        },
        setActionDataFromActionResults: function (actionResults) {
            this.rname = actionResults.rname;
            this.sender = actionResults.sender;
            this.executor = actionResults.executor;
            this.executorId = actionResults.executorId;
            this.target = actionResults.target;
            this.targetTokenId = actionResults.targetTokenId;
            this.targetCharId = actionResults.targetCharId;
            this.healing = actionResults.damage1;
            this.healingMods = actionResults.damageMods;

            // make ints
            this.healing = isNaN(parseInt(this.healing)) ? 0 : parseInt(this.healing);
            this.healingMods.replace(/&&/g, "\n");
        },
        setActionDataFromString: function (content) {
            let contentSplit = content.split("@@");
            let contentIncrement = 0;
            this.rname = contentSplit[contentIncrement];
            contentIncrement++;
            this.sender = contentSplit[contentIncrement];
            contentIncrement++;
            this.executor = contentSplit[contentIncrement];
            contentIncrement++;
            this.executorId = contentSplit[contentIncrement];
            contentIncrement++;
            this.target = contentSplit[contentIncrement];
            contentIncrement++;
            this.targetTokenId = contentSplit[contentIncrement];
            contentIncrement++;
            this.targetCharId = contentSplit[contentIncrement];
            contentIncrement++;
            this.healing = contentSplit[contentIncrement];
            contentIncrement++;
            this.healingMods = contentSplit[contentIncrement];
            contentIncrement++;
            this.injuryId = contentSplit[contentIncrement];
            contentIncrement++;

            // make ints
            this.healing = isNaN(parseInt(this.healing)) ? 0 : parseInt(this.healing);
            this.healingMods.replace(/&&/g, "\n");
        }
    };
}


// ======= Action Data Handling

function CreateActionOutput(tokenId, content) {

    let actionData = GetActionData();
    actionData.setData(content);
    let targetData = GetActionTargetData();
    targetData.createFromToken(tokenId);

    let output = HandleTargettedAction(actionData, targetData);
    output += GetRetargetButton(actionData);
    sendChat(actionData.sender, GetFormattedMessage("si", output));
}

function HandleTargettedAction(actionData, targetData) {

    log("CREATING TARGETTED ACTION OUTPUT");

    // create a new log for the battle log
    let repeater = "repeating_battleLog";
    let newId = generateRowID();
    let battleLog = FindCharacter("BattleLog");
    let battleLogId = battleLog.get("_id");

    // populate the new log with action data
    CreateRepeatingRowAttribute(repeater, newId, "logSender", actionData.sender, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logExecuterId", actionData.charId, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logActionName", actionData.name, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logExecuterName", actionData.charDisplayName, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTitle", `[${actionData.charDisplayName}] ${actionData.name}`, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTraits", actionData.traits, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logIsAttack", (actionData.traits.toLowerCase().includes("attack") ? "1" : "0"), battleLogId);

    // populate the target's data
    CreateRepeatingRowAttribute(repeater, newId, "logTargetTokenId", targetData.tokenId, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTargetCharId", targetData.charId, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTargetName", targetData.displayName, battleLogId);

    // checks
    CreateRepeatingRowAttribute(repeater, newId, "checkflag", actionData.checkflag, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logAttackType", actionData.checkName, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTargetCheckName", actionData.checkDef, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logExecuterCheckIsRoll", actionData.checkRoll, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logExecuterCheck1", actionData.check1, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logExecuterCheck2", actionData.check2, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logMultiAttackPenalty", "0", battleLogId);

    // prepare the attack string
    let check1 = isNaN(parseInt(actionData.check1)) ? 0 : parseInt(actionData.check1);
    let check2 = isNaN(parseInt(actionData.check2)) ? 0 : parseInt(actionData.check2);
    let attackModsString = "";

    // add weaknesses and resistances
    let weaknesses = getAttrByName(targetData.charId, "weaknesses");
    let resistances = getAttrByName(targetData.charId, "resistances");
    CreateRepeatingRowAttribute(repeater, newId, "logTargetWeaknesses", weaknesses, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logTargetResistances", resistances, battleLogId);

    // determine barrier mods
    CreateRepeatingRowAttribute(repeater, newId, "logHasBarrier", targetData.hasBarrier, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logBarrierElement", targetData.element, battleLogId);
    let pb = getAttrByName(targetData.charId, "pb");
    pb = isNaN(parseInt(pb)) ? 2 : parseInt(pb);
    CreateRepeatingRowAttribute(repeater, newId, "logTargetPb", pb, battleLogId);
    let barrierEffect = GetElementalDamageMultiplier(targetData.element, actionData.elem1, 0, pb);

    // check defense
    let defenseCheck = 0;
    if (actionData.checkDef != "") {
        if (actionData.checkDef.toLowerCase() == "ac") {
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheckIsDC", "1", battleLogId);
            let barrierAc = getAttrByName(targetData.charId, "ac_barrier");
            barrierAc = isNaN(parseInt(barrierAc)) ? 10 : parseInt(barrierAc);
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheck1", barrierAc, battleLogId);

            let shatterAc = getAttrByName(targetData.charId, "ac_shatterbarrier");
            shatterAc = isNaN(parseInt(shatterAc)) ? 10 : parseInt(shatterAc);
            CreateRepeatingRowAttribute(repeater, newId, "logShatterAc", shatterAc, battleLogId);

            defenseCheck = 0;
            if (targetData.hasBarrier == "1") {
                defenseCheck = barrierAc;
                if (barrierEffect.type == "Weakness") {
                    check1 += 2;
                    check2 += 2;
                    attackModsString += (attackModsString == "" ? "" : "\n") + "+2 Elemental Advantage";
                } else if (barrierEffect.type != "Neutral") {
                    check1 -= 2;
                    check2 -= 2;
                    attackModsString += (attackModsString == "" ? "" : "\n") + "-2 Elemental Disadvantage";
                }
            } else {
                defenseCheck = shatterAc;
            }
            CreateRepeatingRowAttribute(repeater, newId, "logDefense1", defenseCheck, battleLogId);
        } else {
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheckIsDC", "0", battleLogId);
            let check = getAttrByName(targetData.charId, GetCheckAttr(actionData.checkDef));
            check = isNaN(parseInt(check)) ? 0 : parseInt(check);
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheck1", check, battleLogId);

            let roll1 = randomInteger(20);
            let roll2 = randomInteger(20);
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheck1Roll", roll1, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logTargetCheck2Roll", roll2, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logDefense1", (check + roll1), battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logDefense2", (check + roll2), battleLogId);
            defenseCheck = (check + roll1);
        }
    }

    // determine result
    if (check1 >= (defenseCheck + 10)) {
        CreateRepeatingRowAttribute(repeater, newId, "logResultForecast", "critsuccess", battleLogId);
    } else if (check1 >= defenseCheck) {
        CreateRepeatingRowAttribute(repeater, newId, "logResultForecast", "success", battleLogId);
    } else if (check1 < (defenseCheck - 10)) {
        CreateRepeatingRowAttribute(repeater, newId, "logResultForecast", "critfailure", battleLogId);
    } else {
        CreateRepeatingRowAttribute(repeater, newId, "logResultForecast", "failure", battleLogId);
    }

    // set the attack string
    CreateRepeatingRowAttribute(repeater, newId, "logAttack1", check1, battleLogId);
    if (actionData.checkRoll == "1") {
        CreateRepeatingRowAttribute(repeater, newId, "logAttack2", check2, battleLogId);
    }
    CreateRepeatingRowAttribute(repeater, newId, "logAttackResultMods", attackModsString, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logAttackResultModsSafe", attackModsString.replace(/\n/g, "&&"), battleLogId);

    // primary damage
    CreateRepeatingRowAttribute(repeater, newId, "dmgflag", actionData.dmg1flag, battleLogId);
    if (actionData.dmg1flag == "1") {

        let baseDamageString = "";
        let critDamageString = "";
        let damageString = "";
        let damageModString = "";
        let critDamageModString = "";
        let damage1Total = isNaN(parseInt(actionData.dmg1)) ? 0 : parseInt(actionData.dmg1);
        let damage1Type = actionData.dmgtype1;
        let damage1CritTotal = isNaN(parseInt(actionData.crit1)) ? 0 : parseInt(actionData.crit1);
        damage1CritTotal += damage1Total;
        baseDamageString = `Base: ${damage1Total} ${damage1Type} (${actionData.elem1})`;
        critDamageString = `Crit: ${damage1CritTotal} ${damage1Type} (${actionData.elem1})`;

        CreateRepeatingRowAttribute(repeater, newId, "logdmg", actionData.dmg1, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logdmgcrit", actionData.crit1, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logdmgtype", actionData.dmgtype1, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logdmgelement", actionData.elem1, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "dmg2flag", actionData.dmg2flag, battleLogId);

        // add heightened damage
        if (actionData.hldmg != "") {
            CreateRepeatingRowAttribute(repeater, newId, "logDamageBonusName1", "Heightened", battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logDamageCheckBonusMod1", actionData.hldmg, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logDamageCheckBonusCrit1", actionData.hldmgcrit, battleLogId);

            let hldmg = isNaN(parseInt(actionData.hldmg)) ? 0 : parseInt(actionData.hldmg);
            damageModString += (damageModString == "" ? "" : "\n") + "+" + hldmg + " Heightened";
            damage1Total += hldmg;
            hldmg += isNaN(parseInt(actionData.hldmgcrit)) ? 0 : parseInt(actionData.hldmgcrit);
            critDamageModString += (critDamageModString == "" ? "" : "\n") + "+" + hldmg + " Heightened";
            damage1CritTotal += hldmg;
        }

        // calculate barrier qualities
        let typeQualities = GetDamageTypeQualities(actionData.dmgtype1);
        if (targetData.hasBarrier == "1" && typeQualities.isMagic) {
            barrierEffect = GetElementalDamageMultiplier(targetData.element, actionData.elem1, damage1Total, pb);
            damage1Total = barrierEffect.damage;

            barrierEffect = GetElementalDamageMultiplier(targetData.element, actionData.elem1, damage1CritTotal, pb);
            damage1CritTotal = barrierEffect.damage;
            log("barrierEffect: " + barrierEffect.type);
            switch (barrierEffect.type) {
                case "Neutral":
                    break;
                case "Resistance":
                    damageModString += (damageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance";
                    critDamageModString += (critDamageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance";
                    break;
                case "Weakness":
                    damageModString += (damageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness";
                    critDamageModString += (critDamageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness";
                    break;
                case "Convalesce":
                    damageModString += (damageModString == "" ? "" : "\n") + "Barrier Convalesces";
                    critDamageModString += (critDamageModString == "" ? "" : "\n") + "Barrier Convalesces";
                    damage1Type = "Convalescing";
                    break;
            }
        }

        // add weakness and resistance
        let drIndex = 0;
        let brackIndex = 0;
        let endBrackIndex = 0;
        let dr = 0;
        if (weaknesses != "") {
            drIndex = weaknesses.toLowerCase().indexOf(actionData.dmgtype1.toLowerCase());
            if (drIndex >= 0) {
                brackIndex = weaknesses.substring(drIndex).indexOf("[");
                endBrackIndex = weaknesses.substring(drIndex).indexOf("]");
                dr = weaknesses.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
                dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
                log (`dr: ${dr} brackIndex: ${brackIndex} endBrackIndex: ${endBrackIndex}`);
                
                if (dr != 0) {
                    damage1Total += dr;
                    damage1CritTotal += dr;
                    damageModString += (damageModString == "" ? "" : "\n") + `+${dr} ${actionData.dmgtype1} Weakness`;
                    critDamageModString += (critDamageModString == "" ? "" : "\n") + `+${dr} ${actionData.dmgtype1} Weakness`;
                }

            }
        }
        if (resistances != "") {
            drIndex = resistances.toLowerCase().indexOf(actionData.dmgtype1.toLowerCase());
            if (drIndex >= 0) {
                brackIndex = resistances.substring(drIndex).indexOf("[");
                endBrackIndex = resistances.substring(drIndex).indexOf("]");
                dr = resistances.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
                dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
                
                if (dr != 0) {
                    damage1Total -= dr;
                    damage1CritTotal -= dr;
                    if (damage1Total <= 0) {
                        damage1Total = 0;
                    }
                    if (damage1CritTotal <= 0) {
                        damage1CritTotal = 0;
                    }
                    damageModString += (damageModString == "" ? "" : "\n") + `-${dr} ${actionData.dmgtype1} Resistance`;
                    critDamageModString += (critDamageModString == "" ? "" : "\n") + `-${dr} ${actionData.dmgtype1} Resistance`;
                }

            }
        }

        damageString = `${damage1Total} ${damage1Type} (${actionData.elem1})`;
        CreateRepeatingRowAttribute(repeater, newId, "logPrimaryDamageTotal", damage1Total, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logPrimaryDamageType", damage1Type, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logPrimaryCritDamageTotal", damage1CritTotal, battleLogId);

        if (actionData.dmg2flag != "0") {
            let damage2Total = isNaN(parseInt(actionData.dmg2)) ? 0 : parseInt(actionData.dmg2);
            let damage2Type = actionData.dmgtype2;
            let damage2CritTotal = isNaN(parseInt(actionData.crit2)) ? 0 : parseInt(actionData.crit2);
            damage2CritTotal += damage2Total;
            baseDamageString += `\n+${damage2Total} ${damage2Type} (${actionData.elem2})`;
            critDamageString += `\n+${damage2CritTotal} ${damage2Type} (${actionData.elem2})`;

            CreateRepeatingRowAttribute(repeater, newId, "logdmg2", actionData.dmg2, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logdmg2crit", actionData.crit2, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logdmg2type", actionData.dmgtype2, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logdmg2element", actionData.elem2, battleLogId);

            // calculate barrier qualities
            typeQualities = GetDamageTypeQualities(actionData.dmgtype2);
            if (targetData.hasBarrier == "1" && typeQualities.isMagic) {
                barrierEffect = GetElementalDamageMultiplier(targetData.element, actionData.elem2, damage2Total, pb);
                damage2Total = barrierEffect.damage;
                barrierEffect = GetElementalDamageMultiplier(targetData.element, actionData.elem2, damage2CritTotal, pb);
                damage2CritTotal = barrierEffect.damage;
                switch (barrierEffect.type) {
                    case "Neutral":
                        break;
                    case "Resistance":
                        damageModString += (damageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance (second)";
                        critDamageModString += (critDamageModString == "" ? "" : "\n") + barrierEffect.mod + " Barrier Resistance (second)";
                        break;
                    case "Weakness":
                        damageModString += (damageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness (second)";
                        critDamageModString += (critDamageModString == "" ? "" : "\n") + "+" + barrierEffect.mod + " Barrier Weakness (second)";
                        break;
                    case "Convalesce":
                        damageModString += (damageModString == "" ? "" : "\n") + "Barrier Convalesces (second)";
                        critDamageModString += (critDamageModString == "" ? "" : "\n") + "Barrier Convalesces (second)";
                        damage2Type = "Convalescing";
                        break;
                }
            }

            // add weakness and resistance
            if (weaknesses != "") {
                drIndex = weaknesses.toLowerCase().indexOf(actionData.dmgtype2.toLowerCase());
                if (drIndex >= 0) {
                    brackIndex = weaknesses.substring(drIndex).indexOf("[");
                    endBrackIndex = weaknesses.substring(drIndex).indexOf("]");
                    dr = weaknesses.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
                    dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
                    
                    if (dr != 0) {
                        damage1Total += dr;
                        damage1CritTotal += dr;
                        damageModString += (damageModString == "" ? "" : "\n") + `+${dr} ${actionData.dmgtype2} Weakness`;
                        critDamageModString += (critDamageModString == "" ? "" : "\n") + `+${dr} ${actionData.dmgtype2} Weakness`;
                    }
    
                }
            }
            if (resistances != "") {
                drIndex = resistances.toLowerCase().indexOf(actionData.dmgtype2.toLowerCase());
                if (drIndex >= 0) {
                    brackIndex = resistances.substring(drIndex).indexOf("[");
                    endBrackIndex = resistances.substring(drIndex).indexOf("]");
                    dr = resistances.substring(drIndex).substring(brackIndex + 1, endBrackIndex);
                    dr = isNaN(parseInt(dr)) ? 0 : parseInt(dr);
                    
                    if (dr != 0) {
                        damage1Total -= dr;
                        damage1CritTotal -= dr;
                        if (damage1Total <= 0) {
                            damage1Total = 0;
                        }
                        if (damage1CritTotal <= 0) {
                            damage1CritTotal = 0;
                        }
                        damageModString += (damageModString == "" ? "" : "\n") + `-${dr} ${actionData.dmgtype2} Resistance`;
                        critDamageModString += (critDamageModString == "" ? "" : "\n") + `-${dr} ${actionData.dmgtype2} Resistance`;
                    }
    
                }
            }

            damageString += `\n+${damage2Total} ${damage2Type} (${actionData.elem2})`;
            CreateRepeatingRowAttribute(repeater, newId, "logSecondaryDamageTotal", damage2Total, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logSecondaryDamageType", damage2Type, battleLogId);
            CreateRepeatingRowAttribute(repeater, newId, "logSecondaryCritDamageTotal", damage2CritTotal, battleLogId);
        }
        CreateRepeatingRowAttribute(repeater, newId, "logDamageResult", damageString, battleLogId);
        damageModString = baseDamageString + "\n" + damageModString;
        CreateRepeatingRowAttribute(repeater, newId, "logDamageResultMods", damageModString, battleLogId);
        CreateRepeatingRowAttribute(repeater, newId, "logDamageResultModsSafe", damageModString.replace(/\n/g, "&&"), battleLogId);
        critDamageModString = critDamageString + "\n" + critDamageModString;
        CreateRepeatingRowAttribute(repeater, newId, "logDamageCritResultModsSafe", critDamageModString.replace(/\n/g, "&&"), battleLogId);
    }

    // set results
    CreateRepeatingRowAttribute(repeater, newId, "logOnCritSuccess", actionData.onCritSuccess, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logOnSuccess", actionData.onSuccess, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logOnFailure", actionData.onFailure, battleLogId);
    CreateRepeatingRowAttribute(repeater, newId, "logOnCritFailure", actionData.onCritFailure, battleLogId);

    return `<div><span>${actionData.charDisplayName} targets </span><span style='color:red;'>${targetData.displayName}</span><span> with ${actionData.name}</span></div>`;
}

function GetRetargetButton(actionData) {
    return `<div>[Choose Another Target](!tatk &#64;{target||token_id}$$$${SanitizeSheetRoll(actionData.toString())})</div>`;
}


// ======= Action Results Handling

function CommandHandleActionResults(content) {

    let actionResults = GetActionResultsData();
    actionResults.setActionData(content);

    let targetData = GetActionTargetData();
    if (actionResults.targetTokenId == "") {
        // this is a self target
        targetData.createFromCharId(actionResults.targetCharId);
    } else {
        targetData.createFromToken(actionResults.targetTokenId);
    }

    if (actionResults.damage1TypeQualities.isHealing) {
        HandleHealingResult(actionResults, targetData);
    } else {
        HandleActionResults(actionResults, targetData);
    }
}

function HandleActionResults(actionResults, targetData) {

    // begin the output
    let output = `&{template:results} {{rname=${actionResults.rname}}}`;
    output += GetActionResultImage(actionResults, true);
    output += ` {{desc=${actionResults.executor} targets ${actionResults.target}}}`;

    // create the results data
    if (actionResults.hasAttack == "1") {
        switch (actionResults.resultType) {
            case "critsuccess":
                output += ` {{result=It's a Critical Success!}}`;
                break;
            case "success":
                output += ` {{result=Action is Successful}}`;
                break;
            case "failure":
                output += ` {{result=Action Failed}}`;
                break;
            case "critfailure":
                output += ` {{result=It's a Critical Failure!}}`;
                break;
        }

        let checkResult = "";
        checkResult += `${actionResults.attackType}: ${actionResults.attack1}`;
        if (actionResults.attack2 != "") {
            checkResult += ` | ${actionResults.attack2}`;
        }
        checkResult += `\nVS. ${actionResults.defense1}`;
        if (actionResults.defense2 != "") {
            checkResult += ` | ${actionResults.defense2}`;
        }
        checkResult += ` ${actionResults.defenseType}`;
        output += ` {{checkResult=${checkResult}}}`;

        if (actionResults.attackMods != "") {
            output += ` {{checkResultDetails=${actionResults.attackMods}}}`;
        }
    }

    // create the damage data
    if (actionResults.hasDamage == "1") {
        let damageResults = GetActionResultsDamageData();
        damageResults.createFromTargetData(targetData);
        damageResults = HandleActionResultDamage(damageResults, actionResults, actionResults.damage1, actionResults.damage1TypeQualities);
        if (actionResults.hasDamage2 == "1") {
            damageResults = HandleActionResultDamage(damageResults, actionResults, actionResults.damage2, actionResults.damage2TypeQualities);
        }

        // perform damage, if any
        let damageType = "Damage";
        let damageString = "";
        let totalDamage = damageResults.brDamage + damageResults.hpDamage;
        let isDying = false;
        if (damageResults.brDamage != 0) {
            if (damageResults.brDamage < 0) {
                let brMax = damageResults.isToken ? damageResults.token.get("bar2_max") : damageResults.barrierObj.get("max");
                brMax = isNaN(parseInt(brMax)) ? 0 : parseInt(brMax);
                if ((damageResults.br - damageResults.brDamage) > brMax) {
                    damageResults.brDamage = (brMax - damageResults.br);
                    damageResults.br = brMax;
                } else {
                    damageResults.br -= damageResults.brDamage;
                    damageResults.brDamage *= -1;
                }
                damageType = "Convalescence";
                damageString += actionResults.target + " healed " + damageResults.brDamage + " barrier";
            } else {
                if ((damageResults.br - damageResults.brDamage) < 0) {
                    damageResults.brDamage = damageResults.br;
                    damageResults.br = 0;
                } else {
                    damageResults.br -= damageResults.brDamage;
                }
                damageString += actionResults.target + " took " + damageResults.brDamage + " barrier damage";
            }

            if (damageResults.br == 0) {
                damageString += "\n" + actionResults.target + "'s barrier shattered!";
            }

            // set the barrier
            if (damageResults.isToken) {
                damageResults.token.set("bar2_value", damageResults.br);
            } else if (damageResults.barrierObj != undefined) {
                damageResults.barrierObj.set("current", damageResults.br);
            }
        }
        if (damageResults.hpDamage > 0) {

            // deal the damage
            damageResults.hp -= damageResults.hpDamage;
            damageString += (damageString == "" ? "" : "\n") + actionResults.target + " took " + damageResults.hpDamage + " HP damage";

            if (damageResults.hp < 0) {
                isDying = true;
                damageString += "\n" + actionResults.target + " is downed and dying";
            }

            // set the hp
            if (damageResults.isToken) {
                damageResults.token.set("bar1_value", damageResults.hp);
            } else if (damageResults.hpObj != undefined) {
                damageResults.hpObj.set("current", damageResults.hp);
            }

            // determine if the target gets injuries (minions do not)
            let difficultyStyle = getAttrByName(actionResults.targetCharId, "difficultyStyle");
            if (difficultyStyle == undefined || difficultyStyle != "3") {

                let newInjury = "";
                let karmaRoll = 1;

                if (damageResults.hpDamage > 0) {
                    if (actionResults.resultType == "critsuccess" && damageResults.hpDamage >= 20) {
                        newInjury = GetMajorInjury(actionResults.damage1Type);
                        karmaRoll = 5;
                        output += ` {{injury=${newInjury.name}}} {{injuryDetails=${newInjury.description}}}`;
                    }
                    else {
                        newInjury = GetBasicInjury(actionResults.damage1Type);
                    }
                }

                if (newInjury != "") {
                    // add the injury to the character
                    damageString += (damageString == "" ? "" : "\n") + actionResults.target + " gained the " + newInjury.name + " injury";
                    let newInjuryData = GetInjuryData();
                    newInjuryData.setData("Active", actionResults.target, actionResults.targetCharId, newInjury.name, damageResults.hpDamage);
                    TargetAddInjury(newInjuryData, false);

                    // grant karma
                    let sceneMessages = TargetSetKarma(actionResults.targetCharId, actionResults.target, GetInspirationRoll(karmaRoll));
                    for (let i = 0; i < sceneMessages.length; i++) {
                        damageString += (damageString == "" ? "" : "\n") + sceneMessages[i];
                    }
                }

                // create an injury
                // // create the output data for the injury
                // var injuryData = `@@${damageResults.hpDamage}@@${actionResults.targetCharId}@@${actionResults.target}@@${actionResults.targetTokenId}`;

                // var injuryMessage = "<div>Select an injury type</div>";
                // injuryMessage += "<hr /><div>If you select a severe injury you will receive a fate point</div>";
                // injuryMessage += `<div>[Major Injury](!linger major${injuryData}) [Severe Injury](!linger severe${injuryData})</div>`;
                // injuryMessage = GetFormattedMessage("si", injuryMessage);

                // // create output message for players
                // if (actionResults.sender != "") {
                //     sendChat("Battle Manager", `/w ${actionResults.sender} ${injuryMessage}`, null, {
                //         noarchive: true
                //     });
                // }
                // sendChat("Battle Manager", `/w GM ${injuryMessage}`, null, {
                //     noarchive: true
                // });

            }
        }

        output += ` {{damage=${damageType}}}`;
        if (damageString != "") {
            output += ` {{damageResult=${damageString}}}`;
        } else {
            output += ` {{damageResult=No damage dealt}}`;
        }
        if (totalDamage > 0 && actionResults.resultType == "failure" && actionResults.traits.includes("Ravage")) {
            actionResults.damageMods += "\nThis is ravage damage and deals half damage on failure";
        }
        output += ` {{damageDetails=${actionResults.damageMods}}}`;
    }

    // add condition data
    if (actionResults.coreEffect != "" || actionResults.critEffect != "") {
        let effectPower = 0;
        let coreEffect = "";
        switch(actionResults.resultType) {
            case "success":
                coreEffect = actionResults.coreEffect;
                effectPower = 2; 
            break;
            case "failure":
                coreEffect = actionResults.coreEffect;
                effectPower = 1; 
            break;
            case "critsuccess":
                if (actionResults.critEffect != "") {
                    coreEffect = actionResults.critEffect;
                }
                else {
                    coreEffect = actionResults.coreEffect;
                }
                effectPower = 3; 
            break;
            case "critfailure":
                if (actionResults.critEffect != "") {
                    coreEffect = actionResults.critEffect;
                }
                else {
                    coreEffect = actionResults.coreEffect;
                }
                effectPower = 0; 
            break;
        }

        // add the effect to the token
        let sourceData = FormTargetData(actionResults.executorId, actionResults.executor, "", actionResults.executor);
        let printoutData = AddTokenCondition(targetData.token, coreEffect, actionResults.rname, sourceData, actionResults.attack1, effectPower);

        log ("setting core effect:" + ` {{condition=Adding Condition}} {{conditionResult=${printoutData.title}}} {{cond-${printoutData.img}=1}} {{conditionDetails=${printoutData.desc}}}`);
        output += ` {{condition=Adding Condition}} {{conditionResult=${printoutData.title}}} {{cond-${printoutData.img.toLowerCase()}=1}} {{conditionDetails=${printoutData.desc}}}`;
    }

    // send the output
    sendChat("Battle Manager", output);
}

function GetActionResultImage(actionResults, isBadForTarget) {
    let imageOutput = "";
    let image = "";
    if (actionResults.resultType == "critsuccess") {
        image = getAttrByName(actionResults.executorId, "emote_activesetcutinimageurl");
        if (image != undefined && image != "" && image != "0") {
            imageOutput += ` {{cutInImg=1}} {{image=${image}}}`;
        }
    }
    if (imageOutput == "") {
        if (actionResults.resultType == "failure" || actionResults.resultType == "critfailure") {
            image = getAttrByName(actionResults.executorId, "emote_activesethurtimageurl");
        } else {
            image = getAttrByName(actionResults.executorId, "emote_activesetfireimageurl");
        }
        if (image == undefined || image == "") {
            image = getAttrByName(actionResults.executorId, "emote_activesetimageurl");
        }
        imageOutput += ` {{image=${image}}}`;
    }

    if (actionResults.targetCharId != "") {
        image = "";
        if (actionResults.resultType == "failure" || actionResults.resultType == "critfailure") {
            image = getAttrByName(actionResults.targetCharId, "emote_activesetfireimageurl");
        } else if (isBadForTarget) {
            image = getAttrByName(actionResults.targetCharId, "emote_activesethurtimageurl");
        }
        if (image == undefined || image == "") {
            image = getAttrByName(actionResults.targetCharId, "emote_activesetimageurl");
        }
        imageOutput += ` {{versusImg=${image}}}`;
    }

    return imageOutput;
}


// ======= Damage 

function HandleActionResultDamage(damageResults, actionResults, value, typeQualities) {

    let baseDamage = isNaN(parseInt(value)) ? 0 : parseInt(value);
    if (baseDamage <= 0) {
        return damageResults;
    }

    // determine how to use the data
    if (typeQualities.isBarrierHealing) {
        damageResults.brDamage -= baseDamage;
    } else {
        // determine any damage modifications based on results
        if (actionResults.resultType == "failure") {
            if (actionResults.traits.includes("Ravage")) {
                baseDamage = Math.floor(baseDamage * 0.5);
            } else {
                baseDamage = 0;
            }
        } else if (actionResults.resultType == "critfailure") {
            baseDamage = 0;
        }

        // if there is damage to deal we can continue
        if (baseDamage > 0) {

            // determine any damage modification
            if (damageResults.br <= 0) {
                damageResults.hpDamage += baseDamage;
            } else if (typeQualities.isRadiation) {
                // radiation damage is always halved and applied to both hp and barrier
                damageResults.brDamage += Math.floor(baseDamage * 0.5);
                damageResults.hpDamage += brDamage;

            } else if (typeQualities.isImpact) {
                // impact damage allows any additional damage to the barrer to apply to hp
                if (baseDamage > damageResults.br) {
                    damageResults.brDamage += damageResults.br;
                    damageResults.hpDamage += baseDamage - damageResults.brDamage;
                }
            } else {
                damageResults.brDamage += baseDamage;
            }
        }
    }

    return damageResults;
}


// ======= Healing 

function HandleHealingResult(actionResults, targetData) {

    // determine if the target has injuries (minions do not)
    let difficultyStyle = getAttrByName(actionResults.targetCharId, "difficultyStyle");
    if (difficultyStyle == undefined || difficultyStyle != "3") {
        CreateHealInjuriesOutput(actionResults);
    } else {
        HandleDirectHealingResult(actionResults, targetData);
    }
}

function CreateHealInjuriesOutput(actionResults) {

    var output = "";

    var injuryList = getAttrByName(actionResults.targetCharId, "activeinjury_list");
    if (injuryList == "") {
        output = "<div>That target creature has no injuries.</div>";
    } else {
        var injuryIds = injuryList.split(",");

        let repeatingSection = "repeating_activeinjuries";
        let injuryName = "";
        let injuryHp = "";
        let injuryType = "";
        let healingResults = {};
        let healingType = actionResults.damage1Type;
        let remainingDamage = 0;

        // grab injury data
        for (let i = 0; i < injuryIds.length; i++) {

            injuryName = getAttrByName(actionResults.targetCharId, GetSectionIdName(repeatingSection, injuryIds[i], "injuryName"));
            injuryHp = getAttrByName(actionResults.targetCharId, GetSectionIdName(repeatingSection, injuryIds[i], "injuryHP"));
            injuryHp = isNaN(parseInt(injuryHp)) ? 0 : parseInt(injuryHp);

            if (injuryName != "" && injuryHp != 0) {
                healingResults = GetActionHealData();
                healingResults.setActionDataFromActionResults(actionResults);
                healingResults.injuryId = injuryIds[i];
                injuryType = getAttrByName(actionResults.targetCharId, GetSectionIdName(repeatingSection, injuryIds[i], "injuryType"));

                // if the healing type matches, the healing is doubled
                if (injuryType == healingType) {
                    healingResults.healing = healingResults.healing * 2;
                }

                // modify healing based on amount of HP on the injury
                if ((injuryHp - healingResults.healing) < 0) {
                    healingResults.healing = (injuryHp);
                }
                remainingDamage = injuryHp - healingResults.healing;

                // create output
                injuryName = `${injuryName.trim()} (Damage: ${injuryHp} -> ${remainingDamage})`;
                log ("healing: " + SanitizeSheetRollAction(healingResults.toString()));
                output += `<div>[${injuryName}](!healinj ${SanitizeSheetRollAction(healingResults.toString())})</div>`;
            }
        }

        if (output != "") {
            output = "<div>Choose an Injury to Heal</div>" + output;
        } else {
            output = "<div>That target creature has no injuries.</div>";
        }
    }

    // create output message for players
    output = GetFormattedMessage("sia", output);
    if (actionResults.sender != "") {
        sendChat("Battle Manager", `/w ${actionResults.sender} ${output}`, null, {
            noarchive: true
        });
    }
    sendChat("Battle Manager", `/w GM ${output}`, null, {
        noarchive: true
    });
}

function CommandTargetHealInjury(content) {

    let healingResults = GetActionHealData();
    healingResults.setActionDataFromString(content);

    // heal the injury
    let healingString = healingResults.target + " healed " + healingResults.healing + " hp";
    healingString += "\n" + TargetHealInjury(healingResults);

    // begin the output
    let output = `&{template:results} {{rname=${healingResults.rname}}}`;
    output += GetActionResultImage(healingResults, false);
    output += ` {{desc=${healingResults.executor} targets ${healingResults.target}}}`;
    output += ` {{damage=Healing}}`;
    output += ` {{damageResult=${healingString}}}`;
    output += ` {{damageDetails=${healingResults.healingMods}}}`;

    log (output);

    // send the output
    sendChat("Battle Manager", output);
}

function HandleDirectHealingResult(actionResults, targetData) {

    // begin the output
    let output = `&{template:results} {{rname=${actionResults.rname}}}`;
    output += GetActionResultImage(actionResults, false);
    output += ` {{desc=${actionResults.executor} targets ${actionResults.target}}}`;

    // store hp values
    let hp = 0;
    let hpMax = 0;
    let hpObj = {};
    let healing = isNaN(parseInt(actionResults.damage1)) ? 0 : parseInt(actionResults.damage1);
    if (targetData.isToken) {
        hp = targetData.token.get("bar1_value");
        hpMax = targetData.token.get("bar1_max");
    } else {
        hpObj = GetCharacterAttribute(targetData.charId, "hp");
        hp = hpObj.get("current");
        hpMax = hpObj.get("max");
    }
    hp = isNaN(parseInt(hp)) ? 0 : parseInt(hp);
    hpMax = isNaN(parseInt(hpMax)) ? 0 : parseInt(hpMax);

    // modify the healing amount if it caps
    if ((hp + healing) > hpMax) {
        healing = (hpMax - hp);
        hp = hpMax;
    } else {
        hp += healing;
    }

    // add healing
    output += ` {{damage=Healing}}`;
    output += ` {{damageResult=${actionResults.target + " healed " + healing + " hp"}}}`;
    output += ` {{damageDetails=${actionResults.damageMods}}}`;

    // send the output
    sendChat("Battle Manager", output);
}


// ======= Injury 

function GetExistingCharacterInjuryData() {
    return {
        charId: "",
        injuryId: "",
        section: "",

        presetObj: {},
        nameObj: {},
        stateObj: {},
        hpObj: {},
        descObj: {},

        setStats: function (targetId, repeatingId, repeatingSection) {
            this.charId = targetId;
            this.injuryId = repeatingId;
            this.section = repeatingSection;

            this.presetObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "injury"));
            this.nameObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "injuryName"));
            this.hpObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "injuryHP"));
            this.stateObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "injuryState"));
            this.descObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "description"));
        },
        deleteInjury: function () {

            if (this.presetObj != undefined && this.presetObj != "") {
                this.presetObj.remove();
            }
            if (this.nameObj != undefined && this.nameObj != "") {
                this.nameObj.remove();
            }
            if (this.hpObj != undefined && this.hpObj != "") {
                this.hpObj.remove();
            }
            if (this.stateObj != undefined && this.stateObj != "") {
                this.stateObj.remove();
            }
            if (this.descObj != undefined && this.descObj != "") {
                this.descObj.remove();
            }

            // grab the other unimportant stats and kill them too
            let injuryObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "options-flag"));
            if (injuryObj != undefined && injuryObj != "") {
                injuryObj.remove();
            }
            injuryObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "injuryType"));
            if (injuryObj != undefined && injuryObj != "") {
                injuryObj.remove();
            }
            injuryObj = GetCharacterAttribute(this.charId, GetSectionIdName(this.section, this.injuryId, "featureDisplay"));
            if (injuryObj != undefined && injuryObj != "") {
                injuryObj.remove();
            }
        }
    };
}

function GetInjuryData() {
    return {
        state: "",
        target: "",
        targetId: "",
        presetName: "",
        damage: "",

        injuryInfo: {},

        toString: function () {
            return `${this.state}@@${this.target}@@${this.targetId}@@${this.presetName}@@${this.damage}`;
        },
        setDataFromString: function (content) {
            let contentSplit = content.split("@@");
            let contentIncrement = 0;
            this.state = contentSplit[contentIncrement];
            contentIncrement++;
            this.target = contentSplit[contentIncrement];
            contentIncrement++;
            this.targetId = contentSplit[contentIncrement];
            contentIncrement++;
            this.presetName = contentSplit[contentIncrement];
            contentIncrement++;
            this.damage = contentSplit[contentIncrement];
            contentIncrement++;

            this.injuryInfo = GetInjury(this.presetName);

        },
        setData: function (injState, name, targId, preset, dmg) {
            this.state = injState;
            this.target = name;
            this.targetId = targId;
            this.presetName = preset;
            this.damage = dmg;

            this.injuryInfo = GetInjury(preset);
        }
    };
}

function TargetHealInjury(healingResults) {

    // setup the output
    let output = "";

    // get base info
    let repeatingSection = "repeating_activeinjuries";
    let injury = GetExistingCharacterInjuryData();
    injury.setStats(healingResults.targetCharId, healingResults.injuryId, repeatingSection);

    // get the information of the injury
    let injuryInfo = GetInjury("");
    if (injury.presetObj != "") {
        injuryInfo = GetInjury(injury.presetObj.get("current"));
    }

    // set the new hp value
    let injuryHp = injury.hpObj.get("current");
    injuryHp = isNaN(parseInt(injuryHp)) ? 0 : parseInt(injuryHp);
    injuryHp -= healingResults.healing;
    if (injuryHp <= 0) {
        injuryHp = 0;
    }
    injury.hpObj.set("current", injuryHp);
    output += `The ${injury.nameObj.get("current")} injury's damage has reduced to ${injuryHp}`;

    // set the state to healed if there's still more HP to heal
    if (injuryHp > 0) {
        injury.stateObj.set("current", "Healed");
        injury.descObj.set("current", injuryInfo.healedDescription);
    } else if (injuryInfo.removal == "Recovery") {
        injury.deleteInjury();
        output += `\nThe ${injury.nameObj.get("current")} injury has been removed`;
    } else {
        // if the injury does not heal on recovery status move the injury to the recovery state
        let newInjuryData = GetInjuryData();
        newInjuryData.setData("Recovery", healingResults.target, healingResults.targetCharId, injury.presetObj.get("current"), injuryHp);
        TargetAddInjury(newInjuryData, false);
        injury.deleteInjury();
        output += `\nThe ${injury.nameObj.get("current")} injury is in recovery`;
    }

    return output;
}

function TargetAddInjury(injuryData, showReport) {
    var newInjurySection = "";
    var injuryDescription = "";
    var isActive = false;
    switch (injuryData.state) {
        case "Active":
            isActive = true;
            newInjurySection = "repeating_activeinjuries";
            injuryDescription = injuryData.injuryInfo.description;
            break;
        case "Healed":
            isActive = true;
            newInjurySection = "repeating_activeinjuries";
            injuryDescription = injuryData.injuryInfo.healedDescription;
            break;
        case "Recovery":
            newInjurySection = "repeating_injuries";
            injuryDescription = injuryData.injuryInfo.recoveryDescription;
            break;
        case "Mitigated":
            newInjurySection = "repeating_injuries";
            injuryDescription = injuryData.injuryInfo.removedDescription;
            break;
    }

    // add the new injury
    var newId = generateRowID();
    let i = 0;
    CreateRepeatingRowAttribute(newInjurySection, newId, "options-flag", "0", injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "injury", injuryData.presetName, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "injuryName", injuryData.injuryInfo.name, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "injuryType", injuryData.injuryInfo.type, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "injuryState", injuryData.state, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "injuryHP", injuryData.damage, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "description", injuryDescription, injuryData.targetId);
    CreateRepeatingRowAttribute(newInjurySection, newId, "featureDisplay", "0", injuryData.targetId);

    // add to the active injuries list
    if (isActive) {
        let injuryList = GetCharacterAttribute(injuryData.targetId, "activeinjury_list");
        if (injuryList != undefined && injuryList != "" && injuryList.get("current") != undefined) {
            let newInjuryList = injuryList.get("current") != undefined ? injuryList.get("current") : "";
            if (newInjuryList != "") {
                newInjuryList += ",";
            }
            newInjuryList += newId;
            injuryList.set("current", newInjuryList);
        }
    }

    // report the injury
    if (showReport) {
        let output = `<div>${injuryData.target} gains the ${injuryData.injuryInfo.name} injury</div>`;
        output += "<hr />";
        output += `<div>${injuryDescription}</div>`;
        output = GetFormattedMessage("si", output);
        sendChat("Battle Manager", output);
    }
}


// ======= Crafting 

function HandleCraftBlueprintAction(actionData) {

    // setup output
    let output = "";

    // determine how much progress is made
    let check = isNaN(parseInt(actionData.check1)) ? 0 : parseInt(actionData.check1);
    let check2 = 0;
    switch (actionData.hasAdvantage) {
        case "1":
            check2 = isNaN(parseInt(actionData.check2)) ? 0 : parseInt(actionData.check2);
            if (check2 > check) {
                check = check2;
            }
        break;
        case "-1":
            check2 = isNaN(parseInt(actionData.check2)) ? 0 : parseInt(actionData.check2);
            if (check2 < check) {
                check = check2;
            }
        break;
    }

    // update the progress
    let progress = isNaN(parseInt(actionData.craftprogress)) ? 0 : parseInt(actionData.craftprogress);
    if (check > 0) {
        progress += check;

        let repeatingSection = "repeating_gearCrafting";
        let craftprogressObj = GetCharacterAttribute(actionData.charId, GetSectionIdName(repeatingSection, actionData.craftid, "craftingcheckprogress" + actionData.craftindex));
        if (craftprogressObj != "") {

            let progressmax = isNaN(parseInt(actionData.craftprogressmax)) ? 0 : parseInt(actionData.craftprogressmax);
            if (progress >= progressmax) {
                progress = progressmax;
                output += `<div>+${check} progress. Check Complete</div>`;

                let craftcompleteObj = GetCharacterAttribute(actionData.charId, GetSectionIdName(repeatingSection, actionData.craftid, "craftingCheckComplete" + actionData.craftindex));
                if (craftcompleteObj != "") {
                    // set the progress to completed
                    craftcompleteObj.set("current", "1");

                    // check to see if all progress checks are done
                    let checkComplete = "1";
                    for (let i = 0; i < 5; i++) {
                        if (i != parseInt(actionData.craftindex)) {
                            checkComplete = getAttrByName(actionData.charId, GetSectionIdName(repeatingSection, actionData.craftid, "craftingCheckComplete" + i));
                            if (checkComplete != "1") {
                                break;
                            }
                        }
                    }
                    if (checkComplete == "1") {
                        let fullcraftcompleteObj = GetCharacterAttribute(actionData.charId, GetSectionIdName(repeatingSection, actionData.craftid, "craftingcomplete"));
                        if (fullcraftcompleteObj != "") {
                            fullcraftcompleteObj.set("current", "1");

                            output += "<div style='color: #35c825;'>Craft Completed!</div>";
                        }
                    }
                }
            }
            else {
                output += `<div>+${check} progress (${progress}/${progressmax})</div>`;
            }
            craftprogressObj.set("current", progress);
        }
    }

    return output;
}