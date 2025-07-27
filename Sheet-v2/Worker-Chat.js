var WuxWorkerChat = WuxWorkerChat || (function () {
    const updateActiveEmoteSet = function (emoteButtonRepeater, attrHandler, outfitEmotes) {
        let emotesVar = WuxDef.GetVariable("Chat_Emotes");
        attrHandler.addUpdate(emotesVar, JSON.stringify(outfitEmotes));

        let newRowId;
        let postNameVar = WuxDef.GetVariable("Chat_PostName");
        let postUrlVar = WuxDef.GetVariable("Chat_PostURL");
        outfitEmotes.iterate(function (emote) {
            newRowId = generateRowID();
            attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newRowId, postNameVar), emote.name);
            attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newRowId, postUrlVar), emote.url);
        });
    };
    const setOutfitEmotesIndividualEntry = function (eventinfo) {
        let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
        outfitRepeatingSection.getIds(function (outfitRepeater) {
            let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
            emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
                emoteButtonRepeater.removeAllIds();

                let updateId = outfitRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
                let attributeHandler = new WorkerAttributeHandler();
                let setIdVar = WuxDef.GetVariable("Chat_SetId");
                let setNameVar = WuxDef.GetVariable("Chat_OutfitName");
                let defaultNameVar = WuxDef.GetVariable("Chat_OutfitDefault");
                let defaultUrlVar = WuxDef.GetVariable("Chat_OutfitDefaultURL");
                let emoteNameVar = WuxDef.GetVariable("Chat_EmoteName");
                let emoteUrlVar = WuxDef.GetVariable("Chat_EmoteURL");
                let outfitEmotesVar = WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true);
                attributeHandler.addMod(setIdVar);
                attributeHandler.addMod(outfitRepeater.getFieldName(updateId, setNameVar));
                attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultNameVar));
                attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultNameVar));
                attributeHandler.addMod(outfitRepeater.getFieldName(updateId, defaultUrlVar));
                attributeHandler.addMod(outfitRepeater.getFieldName(updateId, outfitEmotesVar));
                for (let i = 2; i <= 30; i++) {
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, `${emoteNameVar}${i}`));
                    attributeHandler.addMod(outfitRepeater.getFieldName(updateId, `${emoteUrlVar}${i}`));
                }

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let setId = attrHandler.parseString(setIdVar);

                    let outfitEmotes = new EmoteSetData();
                    outfitEmotes.name = attrHandler.parseString(outfitRepeater.getFieldName(updateId, setNameVar));
                    outfitEmotes.defaultEmote = attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultUrlVar));
                    outfitEmotes.addEmote(attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultNameVar)),
                        attrHandler.parseString(outfitRepeater.getFieldName(updateId, defaultUrlVar)));

                    let emoteName = "";

                    for (let i = 2; i <= 30; i++) {
                        emoteName = attrHandler.parseString(outfitRepeater.getFieldName(updateId, `${emoteNameVar}${i}`));
                        if (emoteName != "") {
                            outfitEmotes.addEmote(emoteName, attrHandler.parseString(outfitRepeater.getFieldName(updateId, `${emoteUrlVar}${i}`)));
                        }
                    }
                    attrHandler.addUpdate(outfitRepeater.getFieldName(updateId, outfitEmotesVar), JSON.stringify(outfitEmotes));
                    attrHandler.addUpdate(outfitRepeater.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));

                    if (setId == updateId) {
                        emoteButtonRepeater.removeAllIds();
                        updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                    }
                });
                attributeHandler.run();

            });

        });
    };
    const updateNotebookPageTemplateData = function (attributeHandler, repeatingSection, updateId) {
        let pageTypeVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageType"));
        let pageContentsVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageContents"));
        let pageLocationVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageLocation"));
        let pageAreaVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageArea"));
        let pageDateVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageDate"));
        let pageTimeVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageTime"));
        let pageCharNameVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharName"));
        let pageCharURLVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharURL"));
        let pageCharEmoteVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharEmote"));
        let pageCharLanguageVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharLanguage"));
        let pageQuestNameVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageQuestName"));
        let pageChapterVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageChapter"));
        let pagePartVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PagePart"));
        let pageTemplateDataVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageTemplateData"));
        
        attributeHandler.addMod([pageTypeVar, pageContentsVar, 
            pageLocationVar, pageAreaVar, pageDateVar, pageTimeVar, 
            pageCharNameVar, pageCharURLVar, pageCharEmoteVar, pageCharLanguageVar, 
            pageQuestNameVar, pageChapterVar, pagePartVar]);
        
        attributeHandler.addGetAttrCallback(function (attrHandler) {
            let templateData = ``;
            switch(attrHandler.parseString(pageTypeVar)) {
                case "0": 
                    break;
                case "infoBox":
                    templateData = new InfoMessage(attrHandler.parseString(pageContentsVar)).printRollTemplate();
                    break;
                case "systemInfoBox":
                    templateData = new SystemInfoMessage(attrHandler.parseString(pageContentsVar)).printRollTemplate();
                    break;
                case "historyBox":
                    templateData = new HistoryMessage(attrHandler.parseString(pageContentsVar)).printRollTemplate();
                    break;
                case "ctmsg":
                    let speakMessage = new SpeakEmoteMessage(attrHandler.parseString(pageContentsVar));
                    speakMessage.setTitle(attrHandler.parseString(pageCharNameVar));
                    speakMessage.setName(attrHandler.parseString(pageCharNameVar));
                    speakMessage.setEmote(attrHandler.parseString(pageCharEmoteVar));
                    speakMessage.setUrl(attrHandler.parseString(pageCharURLVar));
                    speakMessage.setLanguage(attrHandler.parseString(pageCharLanguageVar));
                    templateData = speakMessage.printRollTemplate();
                    break;
                case "ctwsp":
                    let whisperMessage = new WhisperEmoteMessage(attrHandler.parseString(pageContentsVar));
                    whisperMessage.setTitle(attrHandler.parseString(pageCharNameVar));
                    whisperMessage.setName(attrHandler.parseString(pageCharNameVar));
                    whisperMessage.setEmote(attrHandler.parseString(pageCharEmoteVar));
                    whisperMessage.setUrl(attrHandler.parseString(pageCharURLVar));
                    whisperMessage.setLanguage(attrHandler.parseString(pageCharLanguageVar));
                    templateData = whisperMessage.printRollTemplate();
                    break;
                case "ctyell":
                    let yellMessage = new YellEmoteMessage(attrHandler.parseString(pageContentsVar));
                    yellMessage.setTitle(attrHandler.parseString(pageCharNameVar));
                    yellMessage.setName(attrHandler.parseString(pageCharNameVar));
                    yellMessage.setEmote(attrHandler.parseString(pageCharEmoteVar));
                    yellMessage.setUrl(attrHandler.parseString(pageCharURLVar));
                    yellMessage.setLanguage(attrHandler.parseString(pageCharLanguageVar));
                    templateData = yellMessage.printRollTemplate();
                    break;
                case "ctthk":
                    let thinkMessage = new ThinkEmoteMessage(attrHandler.parseString(pageContentsVar));
                    thinkMessage.setTitle(attrHandler.parseString(pageCharNameVar));
                    thinkMessage.setName(attrHandler.parseString(pageCharNameVar));
                    thinkMessage.setEmote(attrHandler.parseString(pageCharEmoteVar));
                    thinkMessage.setUrl(attrHandler.parseString(pageCharURLVar));
                    thinkMessage.setLanguage(attrHandler.parseString(pageCharLanguageVar));
                    templateData = thinkMessage.printRollTemplate();
                    break;
                case "ctdesc":
                    let describeMessage = new DescEmoteMessage(attrHandler.parseString(pageContentsVar));
                    describeMessage.setTitle(attrHandler.parseString(pageCharNameVar));
                    describeMessage.setName(attrHandler.parseString(pageCharNameVar));
                    describeMessage.setEmote(attrHandler.parseString(pageCharEmoteVar));
                    describeMessage.setUrl(attrHandler.parseString(pageCharURLVar));
                    describeMessage.setLanguage(attrHandler.parseString(pageCharLanguageVar));
                    templateData = describeMessage.printRollTemplate();
                    break;
                case "locationBox":
                    let locationMessage = new LocationMessage();  
                    locationMessage.setLocation(attrHandler.parseString(pageLocationVar));
                    locationMessage.setArea(attrHandler.parseString(pageAreaVar));
                    locationMessage.setDate(attrHandler.parseString(pageDateVar));
                    locationMessage.setTime(attrHandler.parseString(pageTimeVar));
                    templateData = locationMessage.printRollTemplate();
                    break;
                case "chapter":
                    let chapterMessage = new ChapterMessage();
                    chapterMessage.setChapterName(attrHandler.parseString(pageQuestNameVar));
                    chapterMessage.setSubtitle(attrHandler.parseString(pageChapterVar), attrHandler.parseString(pagePartVar));
                    templateData = chapterMessage.printRollTemplate();
                    break;
            }
            attrHandler.addUpdate(pageTemplateDataVar, templateData);
        });
    };
    const getTemplateData = function (templateInfo, name) {
        if (templateInfo[name] == undefined) {
            return "";
        }
        return templateInfo[name];
    };
    'use strict';

    const selectOutfit = function (eventinfo) {
            Debug.Log(`Selecting outfit`);

            let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
            outfitRepeatingSection.getIds(function (outfitRepeater) {
                let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
                emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
                    emoteButtonRepeater.removeAllIds();

                    let attributeHandler = new WorkerAttributeHandler();
                    let setIdVar = WuxDef.GetVariable("Chat_SetId");
                    let outfitEmotesVar = WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true);
                    let outfitSelectVar = WuxDef.GetVariable("Chat_OutfitName", WuxDef._learn);
                    attributeHandler.addMod(setIdVar);
                    outfitRepeater.addAttributeMods(attributeHandler, [outfitEmotesVar]);

                    attributeHandler.addGetAttrCallback(function (attrHandler) {
                        let setId = attrHandler.parseString(setIdVar);
                        let newSelectionId = outfitRepeater.getIdFromFieldName(eventinfo.sourceAttribute);

                        outfitRepeater.iterate(function (id) {
                            if (setId == id) {
                                attrHandler.addUpdate(outfitRepeater.getFieldName(id, outfitSelectVar), "0");
                            }
                        });
                        attrHandler.addUpdate(outfitRepeater.getFieldName(newSelectionId, outfitSelectVar), "on");
                        attrHandler.addUpdate(setIdVar, newSelectionId);
                        let emotesString = attrHandler.parseString(outfitRepeater.getFieldName(newSelectionId, outfitEmotesVar));
                        let outfitEmotes = new EmoteSetData(JSON.parse(emotesString));
                        updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                    });
                    attributeHandler.run();
                });
            });
        },

        updatePostContent = function (eventinfo) {
            Debug.Log(`Updating post content`);

            let messageObj = WuxMessage.ParseInput(eventinfo.newValue);

            if (messageObj != undefined) {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Message"), messageObj.message);
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Type"), messageObj.template);
                if (messageObj instanceof EmoteMessage) {
                    messageObj.setTitle("");
                    attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Target"), messageObj.title);
                }
                attributeHandler.run();
            }


        },

        updatePostType = function (eventinfo) {

            let attributeHandler = new WorkerAttributeHandler();
            let messageObj = WuxMessage.ParseType(eventinfo.newValue);
            if (messageObj == undefined) {
                messageObj = new SpeakEmoteMessage("");
            }
            if (messageObj instanceof EmoteMessage) {
                messageObj.setTitle("");
                attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Target"), messageObj.title);
            }
            attributeHandler.run();
        },

        updateSelectedLanguage = function (eventinfo) {
            Debug.Log(`Updating selected language to ${eventinfo.newValue}`);
            let message = new EmoteMessage("");
            message.setLanguage(eventinfo.newValue);

            let attributeHandler = new WorkerAttributeHandler();
            attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), message.languageTag);
            Debug.Log(`setting language tag to ${message.languageTag}`);
            attributeHandler.run();
        },
        updateNameOutfit = function (eventinfo) {
            Debug.Log(`Renaming outfit ${eventinfo.previousValue} to ${eventinfo.newValue}`);
            let attributeHandler = new WorkerAttributeHandler();
            let setIdVar = WuxDef.GetVariable("Chat_SetId");
            let updateId = outfitRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            attributeHandler.addMod(setIdVar);
            attributeHandler.addGetAttrCallback(function (attrHandler) {
                let setId = attrHandler.parseString(setIdVar);
                if (setId == updateId) {
                    attrHandler.addUpdate(setIdVar, eventinfo.newValue);
                }
            });
            attributeHandler.run();
        },
        updateOutfitEmotesGroup = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a json submission`);
            let outfitRepeatingSection = new WorkerRepeatingSectionHandler("RepeatingOutfits");
            let jsonData = "";

            try {
                jsonData = JSON.parse(eventinfo.newValue);
            } catch (e) {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid JSON. This field could not be read as a JSON object.");
                attributeHandler.run();
                return;
            }

            let outfitEmotes = new EmoteSetData(jsonData);

            if (outfitEmotes.name == "") {
                let attributeHandler = new WorkerAttributeHandler();
                attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid Data. This field must contain a JSON object with a 'name', 'defaultEmote', and 'emotes' array.");
                attributeHandler.run();
                return;
            }

            let updateId = outfitRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            let emoteButtonRepeaterSection = new WorkerRepeatingSectionHandler("RepeatingActiveEmotes");
            emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {

                let attributeHandler = new WorkerAttributeHandler();
                let setIdVar = WuxDef.GetVariable("Chat_SetId");
                attributeHandler.addMod(setIdVar);

                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitName")), outfitEmotes.name);
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));
                attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true)), JSON.stringify(outfitEmotes));
                Debug.Log(`Setting outfit emotes for ${outfitEmotes.name} to \n${JSON.stringify(outfitEmotes)}`);

                let emoteIndex = 2;
                outfitEmotes.iterate(function (emote) {
                    if (emote.url == outfitEmotes.defaultEmote) {
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefault")), emote.name);
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefaultURL")), emote.url);
                    } else {
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteName")}${emoteIndex}`), emote.name);
                        attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteURL")}${emoteIndex}`), emote.url);
                        emoteIndex++;
                    }
                });

                while (emoteIndex <= 30) {
                    attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteName")}${emoteIndex}`), "");
                    attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, `${WuxDef.GetVariable("Chat_EmoteURL")}${emoteIndex}`), "");
                    emoteIndex++;
                }

                attributeHandler.addGetAttrCallback(function (attrHandler) {
                    let setId = attrHandler.parseString(setIdVar);
                    if (setId == updateId) {
                        emoteButtonRepeater.removeAllIds();
                        updateActiveEmoteSet(emoteButtonRepeater, attrHandler, outfitEmotes);
                    }
                });
                attributeHandler.run();
            });

        },
        updateOutfitEmotesName = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a name entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesDefaultUrl = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },
        updateOutfitEmotesUrl = function (eventinfo) {
            Debug.Log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
            setOutfitEmotesIndividualEntry(eventinfo);
        },

        setNotebookPageType = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let repeatingSection = new WorkerRepeatingSectionHandler("NotebookPages");
            let updateId = repeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);
            let pageDisplayVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageDisplay"));

            switch (eventinfo.newValue) {
                case "0":
                case "infoBox":
                case "systemInfoBox":
                case "historyBox":
                    attributeHandler.addUpdate(pageDisplayVar, "0");
                    break;
                case "ctmsg":
                case "ctwsp":
                case "ctyell":
                case "ctthk":
                case "ctdesc":
                    attributeHandler.addUpdate(pageDisplayVar, "Character");
                    break;
                case "locationBox":
                    attributeHandler.addUpdate(pageDisplayVar, "Location");
                    break;
                case "chapter":
                    attributeHandler.addUpdate(pageDisplayVar, "Chapter");
                    break;
            }
            updateNotebookPageTemplateData(attributeHandler, repeatingSection, updateId);
            attributeHandler.run();
        },
        setNotebookPageData = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let repeatingSection = new WorkerRepeatingSectionHandler("NotebookPages");
            let updateId = repeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            updateNotebookPageTemplateData(attributeHandler, repeatingSection, updateId);
            attributeHandler.run();
        },
        setNotebookPageDelete = function (eventinfo) {
            let repeatingSection = new WorkerRepeatingSectionHandler("NotebookPages");
            let updateId = repeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);
            repeatingSection.removeId(updateId);
        },
        setNotebookPageTemplateData = function (eventinfo) {
            let attributeHandler = new WorkerAttributeHandler();
            let repeatingSection = new WorkerRepeatingSectionHandler("NotebookPages");
            let updateId = repeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

            let pageTypeVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageType"));
            let pageContentsVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageContents"));
            let pageDisplayVar = repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageDisplay"));
            
            let templateDataParts = eventinfo.newValue.split("}}");
            
            if (templateDataParts.length <= 1) {
                attributeHandler.addUpdate(pageTypeVar, "0");
                attributeHandler.addUpdate(pageDisplayVar, "0");
                attributeHandler.addUpdate(pageContentsVar, templateDataParts[0]);
            }
            else {
                let templateTypeParts = templateDataParts[0].split("} ");
                templateDataParts[0] = templateTypeParts[1].trim();
                let templateType = templateTypeParts[0].replace("&{template:", "").trim();
                
                let templateParts = {};
                for (let i = 0; i < templateDataParts.length; i++) {
                    let templateAttr = templateDataParts[i].replace("{{", "").trim();
                    if (templateAttr.includes("=")) {
                        let splitParts = templateAttr.split("=");
                        templateParts[splitParts[0].trim()] = splitParts[1].trim();
                    }
                }

                attributeHandler.addUpdate(pageTypeVar, templateType);
                switch (templateType) {
                    case "i":
                    case "s":
                    case "history":
                        attributeHandler.addUpdate(pageDisplayVar, "0");
                        attributeHandler.addUpdate(pageContentsVar, getTemplateData(templateParts, "message"));
                        break;
                    case "ctmsg":
                    case "ctwsp":
                    case "ctyell":
                    case "ctthink":
                    case "ctdesc":
                        attributeHandler.addUpdate(pageDisplayVar, "Character");
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharName")), getTemplateData(templateParts, "name"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharURL")), getTemplateData(templateParts, "url"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharEmote")), getTemplateData(templateParts, "emote"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageCharLanguage")), getTemplateData(templateParts, "language"));
                        attributeHandler.addUpdate(pageContentsVar, getTemplateData(templateParts, "message"));
                        break;
                    case "locationBox":
                        attributeHandler.addUpdate(pageDisplayVar, "Location");
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageLocation")), getTemplateData(templateParts, "location"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageArea")), getTemplateData(templateParts, "area"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageDate")), getTemplateData(templateParts, "date"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageTime")), getTemplateData(templateParts, "time"));
                        break;
                    case "quest":
                        if (templateParts.hasOwnProperty("chapter")) {
                            attributeHandler.addUpdate(pageTypeVar, "chapter");
                            attributeHandler.addUpdate(pageDisplayVar, "Chapter");
                        }
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageQuestName")), getTemplateData(templateParts, "questName"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PageChapter")), getTemplateData(templateParts, "chapter"));
                        attributeHandler.addUpdate(repeatingSection.getFieldName(updateId, WuxDef.GetVariable("Note_PagePart")), getTemplateData(templateParts, "part"));
                        break;
                }
            }
            
            attributeHandler.run();
        };
    return {
        SelectOutfit: selectOutfit,
        UpdatePostContent: updatePostContent,
        UpdatePostType: updatePostType,
        UpdateSelectedLanguage: updateSelectedLanguage,
        UpdateNameOutfit: updateNameOutfit,
        UpdateOutfitEmotesGroup: updateOutfitEmotesGroup,
        UpdateOutfitEmotesName: updateOutfitEmotesName,
        UpdateOutfitEmotesDefaultUrl: updateOutfitEmotesDefaultUrl,
        UpdateOutfitEmotesUrl: updateOutfitEmotesUrl,
        SetNotebookPageType: setNotebookPageType,
        SetNotebookPageData: setNotebookPageData,
        SetNotebookPageDelete: setNotebookPageDelete,
        SetNotebookPageTemplateData: setNotebookPageTemplateData
    };
}());

