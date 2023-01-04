// ======= Base
// =================================================

function OnTriggerInteractTarget(msg, content) {

    // get data
    let contentSplit = content.split("@@");
    let playerTokenId = contentSplit[0];
    let sourceData = "";
    if (playerTokenId != "") {
        sourceData = GetTokenIdTargetData(playerTokenId);
    }
    let targetData = GetTokenIdTargetData(contentSplit[1]);
    
    let checkPrintoutData = GetCheckPrintoutData();
    checkPrintoutData.setBaseData(msg, sourceData, targetData);
    SendCheckIntro(checkPrintoutData);
}

function SendCheckIntro(checkPrintoutData) {
    
    // setup emote data
    checkPrintoutData.setEmoteData();

    // add conditions to output
    let tokenConditionInfo = GetTokenConditionInformation(checkPrintoutData.targetData);
    checkPrintoutData.data += tokenConditionInfo.display();
    checkPrintoutData.sendChat();
}

function GetCheckPrintoutData() {
    return {
        emote: "",
        phrase: "",
        data: "",
        msg: {},
        sourceData: {}, 
        targetData: {},
        
        setBaseData: function(msg, sourceData, targetData) {
            this.msg = msg;
            this.sourceData = sourceData;
            this.targetData = targetData;
        },
        
        setEmoteData: function(style) {
            if (style != undefined) {
                // handle styling
            }
            
            this.emote = getAttrByName(this.targetData.charId, "interaction_keyemote");
            if (this.emote == "") {
                this.emote = "Serious";
            }
            this.phrase = getAttrByName(this.targetData.charId, "interaction_keyphrase");
            if (this.phrase == "") {
                this.phrase = "Hello";
            }
        },
        
        sendChat: function() {
            let output = "";
            
            if (this.emote != "") {
                log (`this.phrase: ${this.phrase} url: ${GetEmoteURL(this.targetData.charId, this.emote)}`);
                output = GetEmoteMessage(this.targetData, "interact", this.phrase, GetEmoteURL(this.targetData.charId, this.emote), true, "");
                output += " {{sub=" + this.data + "}}";
            }
            
            sendChat("Wuxing Manager", `/w ${this.msg.who.split(" ")[0]} ${output}`, 
                null, {noarchive:true}
            );
        }
        
    };
}

function SendInteractionOutput(data, sourceCharId, targetTokenId, targetId, message, emote) {

    // grab the intro message if message is not supplied
    if (message == undefined || message == "") {
        let interactionMessageIds = getAttrByName(targetId, "interactionMessageIds");

        if (interactionMessageIds != undefined && interactionMessageIds != "") {
            interactionMessageIds = interactionMessageIds.split("@@");

            let rngMsg = randomInteger(interactionMessageIds.length) - 1;
            message = getAttrByName(targetId, "repeating_interactionMessages_" + interactionMessageIds[rngMsg] + "_interactIntroMsg");
            if (message == undefined || message == "") {
                message = "Hello";
            }
            emote = getAttrByName(targetId, "repeating_interactionMessages_" + interactionMessageIds[rngMsg] + "_interactIntroEmote");
            if (emote == undefined || emote == "") {
                emote = "Serious";
            }
        }
        else {
            emote = "Serious";
            message = "Hello";
        }
    }

    // setup the output message
    let output = "";
    if (emote == "" || emote.toLowerCase() == "none") {
        // this message has no emote. Show the information variant
    }
    else {
        // this is a message with an emote
        let targetToken = getObj("graphic", targetTokenId);
        if (targetToken == "") return;
        let targetId = targetToken.get("represents");
        let target = FormTargetData(targetId, getObj("character", targetId).get("name"), targetTokenId, targetToken.get("name"));
        output = GetEmoteMessage(target, "interact", message, GetEmoteURL(targetId, emote), true);
        output += " {{sub=" + data + "}}";
    }

    // send the message
    sendChat("Wuxing Manager", "/w " + getObj("character", sourceCharId).get("name") + " " + output, null, {noarchive:true});
}

function GetInteractionIntro(msg, sourceCharId, targetTokenId) {

    // get data
    let targetToken = getObj("graphic", targetTokenId);
    if (targetToken == "") return;
    let targetId = targetToken.get("represents");
    let checkInjuries = getAttrByName(targetId, "interactionShowCheckInjuries");

    // iterate through all of the interaction ids
    let repeatingIds = getAttrByName(targetId, "allInteractionCategories");
    if (repeatingIds != "" || checkInjuries == 1) {
        if (repeatingIds != "") {
            repeatingIds = repeatingIds.split(",");
            if (repeatingIds.length > 1 || checkInjuries == 1) {

                // prepare the interact options
                let interactOptions = "<div class='sheet-interactionTitle'>Interactions</div>";
                interactOptions += "<div class='sheet-subtitle'>Choose an interaction</div>";
                interactOptions += "<div>";

                if (checkInjuries == 1) {
                    interactOptions += "[Check Injuries](!interactopt CheckInjuries@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                }
                _.each(repeatingIds, function(repeatingId) {
                    switch(repeatingId) {
                        case "ShopWeapon":
                            interactOptions += "[Shop - Weapons](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "ShopArmor":
                            interactOptions += "[Shop - Armor](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "ShopDrugs":
                            interactOptions += "[Shop - Drugs](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "ShopMaterials":
                            interactOptions += "[Shop - Dust](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "ShopIngredients":
                            interactOptions += "[Shop - Ingredients](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "ShopGeneral":
                            interactOptions += "[Shop - General](!interactopt " + repeatingId + "@@" + sourceCharId + "@@" + targetTokenId + ")<br />";
                        break;
                        case "Consume":
                            interactOptions += "[Shop - Enjoy](!interactopt " + repeatingId + "@@" + content + ")<br />";
                        break;
                    }
                });
                interactOptions += "</div>";

                // setup the output message
                SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId);
            }
            else if (repeatingIds.length == 1) {
                GetInteractionOptions(msg, repeatingIds[0], sourceCharId, targetTokenId);
            }
            else {
                GetInteractionOptions(msg, "CheckInjuries", sourceCharId, targetTokenId);
            } 
        }
        else {
            GetInteractionOptions(msg, "CheckInjuries", sourceCharId, targetTokenId);
        }
    }
    else {
        sendChat("Wuxing Manager", "/w " + getObj("character", sourceCharId).get("name") + " This token has no interactions", null, {noarchive:true});
    }
}

function GetInteractionOptions(msg, interactionType, sourceCharId, targetTokenId) {

    // split the data if its necessary
    if (sourceCharId == undefined) {
        let contentSplit = interactionType.split("@@");
        interactionType = contentSplit[0];
        sourceCharId = contentSplit[1];
        targetTokenId = contentSplit[2];
    }

    // set data
    let targetToken = getObj("graphic", targetTokenId);
    if (targetToken == "") return;
    let targetId = targetToken.get("represents");

    // grab the interaction data from the character
    let allInteractionCategories = getAttrByName(targetId, "allInteractionCategories");
    allInteractionCategories = allInteractionCategories.split(",");
    let allInteractionIds = getAttrByName(targetId, "allInteractionIds");
    allInteractionIds = allInteractionIds.split("@@");
    let interactionData = "";

    // search through all the intereaction categories for the category we are using so we can get it's data's IDs
    for (var i = 0; i < allInteractionCategories.length; i++) {
        if (allInteractionCategories[i] == interactionType) {
            interactionData = allInteractionIds[i];
            break;
        }
    }

    // determine which function to run
    switch(interactionType) {
        case "ShopWeapon":
            GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData);
        break;
        case "ShopArmor":
            
        break;
        case "ShopDrugs":
            GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData, InteractionShopSingleDrugs, InteractionShopGroupDrugs);
        break;
        case "ShopMaterials":
            GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData, InteractionShopSingleMaterials, InteractionShopGroupMaterials);
        break;
        case "ShopIngredients":
            GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData, InteractionShopSingleIngredients, InteractionShopGroupIngredients);
        break;
        case "ShopGeneral":
            GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData, InteractionShopSingleGeneral, InteractionShopGroupIngredients);
        break;
        case "Consume":
            
        break;
        case "CheckInjuries":
            GetInjuriesOnCharacter(msg, sourceCharId, targetTokenId, targetId);
        break;
        case "HealInjuries":
            
        break;
    }
}

// ======= Shop
// =================================================
function GetInteractionShop(sourceCharId, targetTokenId, targetId, interactionData, specializedCallback, groupCallback) {
    
    // iterate through all of the interaction ids
    if (interactionData != "") {

        // declare variables
        let messages = [];
        let emotes = [];
        let interactCategory = "";
        let interactionCurrency = getAttrByName(targetId, "interactionCurrency");

        // prepare the interact options
        let interactOptions = "<div class='sheet-interactions'>";
        let interactSpecialOptions = "";
        let interactGroupOptions = "";

        // set the currency intro
        let currentCurrency = getAttrByName(sourceCharId, interactionCurrency);
        if (currentCurrency == "") {
            currentCurrency = "0";
        }
        interactOptions += "<p>Your Currency: ";
        switch (interactionCurrency) {
            case "cp":
                interactOptions += currentCurrency + " CP";
            break;
            case "jin":
                interactOptions += currentCurrency + " Jin";
            break;
            case "frt":
                interactOptions += currentCurrency + " Frt";
            break;
            case "syr":
                interactOptions += currentCurrency + " Syr";
            break;
        }
        interactOptions += "</p>";

        // iterate through the interaction ids to grab data
        interactionData = interactionData.split(",");
        _.each(interactionData, function(repeatingId) {
            // determine what we're doing based on what's supplied in the category
            interactCategory = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopCategory");

            if (interactCategory == "Dialogue") {
                // add to the list of optional messages if this is a dialogue category
                let msg = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionMsg");
                let emote = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionEmote");
                if (msg != "") {
                    messages.push(msg);
                    emotes.push(emote);
                }
            }
            else if (interactCategory == "Specific") {
                interactSpecialOptions += specializedCallback(repeatingId, sourceCharId, targetTokenId, targetId, interactionCurrency);
            }
            else {
                interactGroupOptions += groupCallback(interactCategory, repeatingId, sourceCharId, targetTokenId, targetId, interactionCurrency);
            }
        });

        // close out the interact options
        interactOptions += interactSpecialOptions;
        interactOptions += interactGroupOptions;
        interactOptions += "</div>";

        // determine how to display this messsage
        if (messages.length <= 0) {
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId);
        }
        else if (messages.length == 1) {
            log ("sending a message");
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId, messages[0], emotes[0]);
        }
        else {
            let rngMsg = randomInteger(messages.length) - 1;
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId, messages[rngMsg], emotes[rngMsg]);
        }
        
    }
    else {
        sendChat("Wuxing Manager", "/w " + getObj("character", sourceCharId).get("name") + " This token has no interactions", null, {noarchive:true});
    }
}

function GetItemCost(itemData, currency, priceMultiplier) {

    let cost = {
        val: Math.ceil(priceMultiplier * itemData.cost),
        currency: ""
    };
    switch (currency) {
        case "cp":
            cost.currency = "CP";
        break;
        case "jin":
            cost.currency = "Jin";
        break;
        case "frt":
            cost.val = Math.ceil(cost / 2);
            cost.currency = "Frt";
        break;
        case "syr":
            cost.val = Math.ceil(cost / 5);
            cost.currency = "Syr";
        break;
    }

    return cost;
}

// Generic Shop Categories
function InteractionShopSingleDrugs(repeatingId, sourceCharId, targetTokenId, targetId, currency) {

    return GetGenericShopSingleListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, "ShopDrugs");
}

function InteractionShopGroupDrugs(interactCategory, repeatingId, sourceCharId, targetTokenId, targetId, currency) {

    // variables
    let itemDictionary = [];
    let header = "";

    switch (interactCategory) {
        case "Medicine":
            header = "Medicine";
            itemDictionary = GetItemDrugMedicine();
        break;
        case "HQMedicine":
            header = "HQ Medicine";
            itemDictionary = GetItemDrugMedicineHQ();
        break;
        case "Extracts":
            header = "Extracts";
            itemDictionary = GetItemDrugExtract();
        break;
        case "HQExtracts":
            header = "HQ Extracts";
            itemDictionary = GetItemDrugExtractHQ();
        break;
        case "Stimulants":
            header = "Stimulants";
            itemDictionary = GetItemDrugStimulant();
        break;
    }

    return GetGenericShopGroupListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, itemDictionary, header, "ShopDrugs");
}

function InteractionShopSingleMaterials(repeatingId, sourceCharId, targetTokenId, targetId, currency) {
    return GetGenericShopSingleListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, "ShopMaterials");
}

function InteractionShopGroupMaterials(interactCategory, repeatingId, sourceCharId, targetTokenId, targetId, currency) {

    // variables
    let itemDictionary = [];
    let header = "";

    switch (interactCategory) {
        case "CommonMaterials":
            header = "Common Dust";
            itemDictionary = GetAllMaterialCommon();
        break;
        case "UncommonMaterials":
            header = "Uncommon Dust";
            itemDictionary = GetAllMaterialUncommon();
        break;
        case "RareMaterials":
            header = "Rare Dust";
            itemDictionary = GetAllMaterialRare();
        break;
        case "EpicMaterials":
            header = "Epic Dust";
            itemDictionary = GetAllMaterialEpic();
        break;
        case "LegendaryMaterials":
            header = "Legendary Dust";
            itemDictionary = GetAllMaterialLegendary();
        break;
    }

    return GetGenericShopGroupListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, itemDictionary, header, "ShopMaterials");
}

function InteractionShopSingleIngredients(repeatingId, sourceCharId, targetTokenId, targetId, currency) {
    return GetGenericShopSingleListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, "ShopIngredients");
}

function InteractionShopGroupIngredients(interactCategory, repeatingId, sourceCharId, targetTokenId, targetId, currency) {

    // variables
    let itemDictionary = [];
    let header = "";
    
    switch (interactCategory) {
        case "CommonIngredients":
            header = "Common Ingredients";
            itemDictionary = GetAllIngredientsCommon();
        break;
        case "CoastalIngredients":
            header = "Coastal Ingredients";
            itemDictionary = GetAllIngredientsCoastal();
        break;
        case "ColdIngredients":
            header = "Cold Ingredients";
            itemDictionary = GetAllIngredientsCold();
        break;
        case "DesertIngredients":
            header = "Desert Ingredients";
            itemDictionary = GetAllIngredientsDesert();
        break;
        case "GrasslandIngredients":
            header = "Grassland Ingredients";
            itemDictionary = GetAllIngredientsGrassland();
        break;
        case "MountainIngredients":
            header = "Mountain Ingredients";
            itemDictionary = GetAllIngredientsMountain();
        break;
        case "TropicalIngredients":
            header = "Tropical Ingredients";
            itemDictionary = GetAllIngredientsTropical();
        break;
    }

    return GetGenericShopGroupListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, itemDictionary, header, "ShopIngredients");
}

function InteractionShopSingleGeneral(repeatingId, sourceCharId, targetTokenId, targetId, currency) {
    return GetGenericShopSingleListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, "ShopGeneral");
}

function InteractionShopGroupGeneral(interactCategory, repeatingId, sourceCharId, targetTokenId, targetId, currency) {

    // variables
    let itemDictionary = [];
    let header = "";
    
    switch (interactCategory) {
        case "AdventuringGear":
            header = "Adventuring Gear";
            itemDictionary = GetAllMaterialCommon();
        break;
        case "Container":
            header = "Container";
            itemDictionary = GetAllMaterialCommon();
        break;
        case "Clothing":
            header = "Clothing";
            itemDictionary = GetAllMaterialCommon();
        break;
        case "Tools":
            header = "Tools";
            itemDictionary = GetAllGearTools();
        break;
    }

    return GetGenericShopGroupListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, itemDictionary, header, "ShopGeneral");
}

// Generic Shop Listings and Purchase
function GetGenericShopSingleListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, menu) {

    // variables
    let priceMultiplier = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopPriceMod");
    let itemName = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopItem");
    let itemData = GetItemDrug(itemName);
    let content = menu + "@@" + sourceCharId + "@@" + targetTokenId + "@@" + targetId;
    if (itemData.name != "") {
        return GetGenericShopListing(itemData, content, currency, priceMultiplier);
    }
    else {
        itemData.name = itemName;
        itemData.desc = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopItemDesc");
        if (itemData.desc != "") { 
            return GetCustomShopListing(itemData, repeatingId, content, currency);
        }
    }
    return "";
}

function GetGenericShopGroupListings(repeatingId, sourceCharId, targetTokenId, targetId, currency, itemDictionary, header, menu) {

    if (itemDictionary.length > 0) {

        // variables
        let output = "";
        let priceMultiplier = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopPriceMod");

        // iterate through the dictionary and add each entry to the list
        _.each(itemDictionary, function(itemData) {
        
            if (itemData.name != "") {
                let content = menu = "@@" + sourceCharId + "@@" + targetTokenId + "@@" + targetId;
                output += GetGenericShopListing(itemData, content, currency, priceMultiplier);
            }
        });
        return GetFoldingMessaage(header, output);
    }

    return "";
}

function GetGenericShopListing(itemData, content, currencyStyle, priceMultiplier) {

    // set up the output
    let output = "<div class='sheet-shopListing' style='width: 190px;'>";

    // add the data
    let macro = "!interactgenshop " + itemData.name + "@@@?{How many " + itemData.name + " would you like to purchase?|1}@@@" + priceMultiplier + "@@@" + content;
    output += "<div style='display: inline-block;'>";
    output += "[" + itemData.name + "](" + SanitizeSheetRoll(macro) + ")";
    output += "</div>";

    output += "<div style='display: inline-block; float: right;'>";

    // set the currency data
    let costData = GetItemCost(itemData, currencyStyle, priceMultiplier);
    output += costData.val + " " + costData.currency;
    output += "</div>";
    output += "<div style='display: block;'>" + itemData.desc + " </div>";

    // return the item info
    output += "</div><div>&nbsp;</div>";
    return output;
}

function PurchaseGenericShopItem(msg, content) {

    // content data
    let contentSplit = content.split("@@@");
    let itemName = contentSplit[0];
    let itemCount = contentSplit[1];
    let itemPriceMultiplier = contentSplit[2];
    contentSplit = contentSplit[3].split("@@");
    let menu = contentSplit[0];
    let playerId = contentSplit[1];
    let targetTokenId = contentSplit[2];
    let targetId = contentSplit[3];
    let playerName = getObj("character", playerId).get("name");

    // get item data
    let itemData;
    let itemCategory = "";
    switch (menu) {
        case "ShopDrugs":
            itemData = GetItemDrug(itemName);
            itemCategory = "Drug";
        break;
        case "ShopMaterials":
            itemData = GetItemMaterial(itemName);
            itemCategory = "Material";
        break;
        case "ShopIngredients":
            itemData = GetItemIngredient(itemName);
            itemCategory = "Ingredient";
        break;
        case "ShopGeneral":
            itemData = GetItemGear(itemName);
            itemCategory = "General";
        break;
    }

    if (itemData.name != "") {
        
        // grab money data 
        let interactionCurrency = getAttrByName(targetId, "interactionCurrency");
        let playerCurrency = GetCharacterAttribute(playerId, interactionCurrency);
        let costData = GetItemCost(itemData, interactionCurrency, itemPriceMultiplier);
        costData.val *= itemCount;

        // determine if the player can purchase the item
        let newCurrencyVal = parseInt(playerCurrency.get("current")) - parseInt(costData.val);
        if (newCurrencyVal > 0) {

            // prepare the results message
            let resultsMessage = "There was an error with purchasing " + itemCount + " " + itemData.name;

            // search for the item in the user's inventory
            var items = filterObjs(function(obj) {    
                if(obj.get("type") === "attribute" 
                && obj.get("characterid") === playerId 
                && (obj.get("current") + "").toLowerCase() === itemData.name.toLowerCase()
                && obj.get("name").indexOf("repeating_inventory") > -1) return true;    
                else return false;
            });
            if (items[0]) {
                let inventoryCount = GetCharacterAttribute(playerId, items[0].get("name").replace("_itemname","_itemcount"));
                if (inventoryCount != undefined) {

                    // Increment the amount of the item and pay for it
                    inventoryCount.set("current", parseInt(inventoryCount.get("current")) + parseInt(itemCount));
                    playerCurrency.set("current", newCurrencyVal);
                    resultsMessage = playerName + " purchased " + itemCount + " " + itemData.name + "! Increased their current supply. Spent " + parseInt(costData.val) + " " + interactionCurrency;
                }
            }
            else {
                // give them the item
                var newRowRef =  "repeating_inventory_" + generateRowID();
                createObj("attribute", {"name": newRowRef + "_options-flag",
                                        "current": "0",
                                        "_characterid": playerId}
                );
                createObj("attribute", {"name": newRowRef + "_itemname",
                                        "current": itemData.name,
                                        "_characterid": playerId}
                );
                createObj("attribute", {"name": newRowRef + "_itemweight",
                                        "current": itemData.weight,
                                        "_characterid": playerId}
                );
                createObj("attribute", {"name": newRowRef + "_itemcontent",
                                        "current": itemData.desc,
                                        "_characterid": playerId}
                );
                createObj("attribute", {"name": newRowRef + "_itemCategory",
                                        "current": itemCategory,
                                        "_characterid": playerId}
                );
                createObj("attribute", {"name": newRowRef + "_itemcount",
                                        "current": itemCount,
                                        "_characterid": playerId}
                );

                // pay for it
                playerCurrency.set("current", newCurrencyVal);
                resultsMessage = playerName + " purchased " + itemCount + " " + itemData.name + "! Added to their inventory. Spent " + parseInt(costData.val) + " " + interactionCurrency;
            }

            // send the results message
            sendChat("Wuxing Manager", "/w " + playerName + " " + GetFormattedMessage("i", resultsMessage));
            sendChat("Wuxing Manager", "/w GM " + GetFormattedMessage("i", resultsMessage));

            // reopen the menu
            GetInteractionOptions(msg, menu, playerId, targetTokenId);
        }
        else {
            sendChat("Wuxing Manager", "/w " + playerName + " " + playerName + " does not have enough " + costData.currency + " to purchase the item(s)", null, {noarchive:true});
        }
    }
    else {
        sendChat("Wuxing Manager", "/w " + playerName + " There was an error with processing the item being purchased.\nError Data: " + content, null, {noarchive:true});
    }
}

// Custom Shop Listings and Purchase
function GetCustomShopListing(itemData, repeatingId, content, currencyStyle) {

    // data
    itemData.weight = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopItemWeight");
    itemData.cost = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopItemCost");

    // set up the output
    let output = "<div class='sheet-shopListing' style='width: 190px;'>";

    // add the data
    let macro = "!interactcustshop " + itemData.name + "@@@?{How many " + itemData.name + " would you like to purchase?|1}@@@" + content;
    output += "<div style='display: inline-block;'>";
    output += "[" + itemData.name + "](" + SanitizeSheetRoll(macro) + ")";
    output += "</div>";

    output += "<div style='display: inline-block; float: right;'>";

    // set the currency data
    let cost = itemData.cost;
    switch (currencyStyle) {
        case "cp":
            output += cost + " CP";
        break;
        case "jin":
            output += cost + " Jin";
        break;
        case "frt":
            output += Math.ceil(cost / 2) + " Frt";
        break;
        case "syr":
            output += Math.ceil(cost / 5) + " Syr";
        break;
    }
    output += "</div>";
    output += "<div style='display: block;'>" + itemData.desc + " </div>";

    // return the item info
    output += "</div><div>&nbsp;</div>";
    return output;
}

// ======= Healing
// =================================================
function GetInjuriesOnCharacter(msg, sourceCharId, targetTokenId, targetId) {
    log ("[INTERACTIONS] Showing Active Injuries");

    let interactOptions = "<div class='sheet-interactionTitle'>Active Injuries</div>";

    // get injuries
    var injuryList = getAttrByName(targetId, "activeinjury_list");
    if (injuryList == "") {

        interactOptions += "This creature has no injuries.</div>";
        SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId);
        return;
    }
    var injuryListSplit = injuryList.split(",");

    // set up the output
    interactOptions += "<div class='sheet-shopListing' style='width: 190px;'>";

    // variables
    let injuryName = "";
    let injuryHp = 0;
    let injuryType = "";
    let injuryDesc = "";
    let macro = "";

    // iterate through injury data
    for (var i = 0; i < injuryListSplit.length; i++) {
        injuryName = getAttrByName(targetId, "repeating_activeinjuries_" + injuryListSplit[i] + "_injuryName");
        if (injuryName != undefined) {
            injuryHp = getAttrByName(targetId, "repeating_activeinjuries_" + injuryListSplit[i] + "_injuryHP");
            injuryType = getAttrByName(targetId, "repeating_activeinjuries_" + injuryListSplit[i] + "_injuryType");
            injuryDesc = getAttrByName(targetId, "repeating_activeinjuries_" + injuryListSplit[i] + "_description");
            macro = "";

            // add the data
            if (playerIsGM(msg.playerid)) {
                macro = "!thealinj " + injuryListSplit[i];
                macro += "@@" + getObj("character", sourceCharId).get("name");
                macro += "@@" + targetId + "@@" + getObj("character", targetId).get("name");
                macro += "@@?{How much to heal (max " + injuryHp + ")|0}";
            }

            // display the injury data
            interactOptions += "<div class='sheet-title'>";
            if (macro != "") {
                interactOptions += "[" + injuryName + "](" + SanitizeSheetRoll(macro) + ")";
            }
            else {
                interactOptions += injuryName;
            }
            interactOptions += "</div>";

            interactOptions += "<div class='sheet-subtitle' style='float: right;'>-" + injuryHp + " hp</div>";
            interactOptions += "<div class='sheet-subtitle'>" + injuryType + " </div>";
            interactOptions += "<div class='sheet-desc'>" + injuryDesc + " </div>";
            interactOptions += "<div>&nbsp;</div>";
        }
    }

    // close the options and display it
    interactOptions += "</div><div>&nbsp;</div>";
    SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId);
}

function GetInteractionHealOptions(sourceCharId, targetTokenId, targetId, interactionData) {
    
    // iterate through all of the interaction ids
    if (interactionData != "") {

        // declare variables
        let messages = [];
        let emotes = [];
        let interactCategory = "";
        let interactionCurrency = getAttrByName(targetId, "interactionCurrency");

        // prepare the interact options
        let interactOptions = "<div class='sheet-interactions'>";
        let interactSpecialOptions = "";
        let interactGroupOptions = "";

        // set the currency intro
        let currentCurrency = getAttrByName(sourceCharId, interactionCurrency);
        if (currentCurrency == "") {
            currentCurrency = "0";
        }
        interactOptions += "<p>Your Currency: ";
        switch (interactionCurrency) {
            case "cp":
                interactOptions += currentCurrency + " CP";
            break;
            case "jin":
                interactOptions += currentCurrency + " Jin";
            break;
            case "frt":
                interactOptions += currentCurrency + " Frt";
            break;
            case "syr":
                interactOptions += currentCurrency + " Syr";
            break;
        }
        interactOptions += "</p>";

        // iterate through the interaction ids to grab data
        interactionData = interactionData.split(",");
        _.each(interactionData, function(repeatingId) {
            // determine what we're doing based on what's supplied in the category
            interactCategory = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopCategory");

            if (interactCategory == "Dialogue") {
                // add to the list of optional messages if this is a dialogue category
                let msg = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionMsg");
                let emote = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionEmote");
                if (msg != "") {
                    messages.push(msg);
                    emotes.push(emote);
                }
            }
            else {
                interactGroupOptions += GetHealShopListing(interactCategory, repeatingId, targetId, interactionCurrency);
            }
        });

        // close out the interact options
        interactOptions += interactSpecialOptions;
        interactOptions += interactGroupOptions;
        interactOptions += "</div>";

        // determine how to display this messsage
        if (messages.length <= 0) {
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId);
        }
        else if (messages.length == 1) {
            log ("sending a message");
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId, messages[0], emotes[0]);
        }
        else {
            let rngMsg = randomInteger(messages.length) - 1;
            SendInteractionOutput(interactOptions, sourceCharId, targetTokenId, targetId, messages[rngMsg], emotes[rngMsg]);
        }
        
    }
    else {
        sendChat("Wuxing Manager", "/w " + getObj("character", sourceCharId).get("name") + " This token has no interactions", null, {noarchive:true});
    }
}

function GetHealShopListing(interactCategory, repeatingId, targetId, currency) {

    // variables
    let priceMultiplier = getAttrByName(targetId, "repeating_interactions_" + repeatingId + "_interactionShopPriceMod");
    
    // set up the output
    let output = "<div class='sheet-shopListing' style='width: 190px;'>";

    // add the data
    let macro = "!interactheal " + interactCategory + "@@@" + priceMultiplier + "@@@" + content;
    output += "<div style='display: inline-block;'>";
    output += "[" + itemData.name + "](" + SanitizeSheetRoll(macro) + ")";
    output += "</div>";

    output += "<div style='display: inline-block; float: right;'>";

    // set the currency data
    let costData = GetItemCost(itemData, currencyStyle, priceMultiplier);
    output += costData.val + " " + costData.currency;
    output += "</div>";
    output += "<div style='display: block;'>" + itemData.desc + " </div>";

    // return the item info
    output += "</div><div>&nbsp;</div>";
    return output;
}
