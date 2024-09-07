var WuxWorkerChat = WuxWorkerChat || (function () {
	'use strict';

	var
	selectOutfit = function (eventinfo) {
		console.log(`Selecting outfit`);

		let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");
		outfitRepeatingSection.getIds(function (outfitRepeater) {
			let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
			emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
				emoteButtonRepeater.removeAllIds();
				
				let attributeHandler  = new WorkerAttributeHandler();
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
		console.log(`Updating post content`);
		let attributeHandler  = new WorkerAttributeHandler();
		
		let messageObj = WuxMessage.Parse(eventinfo.newValue);
		if (messageObj.constructor.name == "SimpleMessage") {
			messageObj = new SpeakEmoteMessage(eventinfo.newValue);
		}
		
		attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Type"), messageObj.template);
		attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Message"), messageObj.message);
		if (messageObj instanceof EmoteMessage) {
			messageObj.setTitle("");
			attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Target"), messageObj.title);
		}
		
		attributeHandler.run();
	},

	updateSelectedLanguage = function (eventinfo) {
		console.log(`Updating selected language to ${eventinfo.newValue}`);
		let message = new EmoteMessage("");
		message.setLanguage(eventinfo.newValue);

		let attributeHandler  = new WorkerAttributeHandler();
		attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), message.languageTag);
		console.log(`setting language tag to ${message.languageTag}`);
		attributeHandler.run();
	},

	updateActiveEmoteSet = function (emoteButtonRepeater, attrHandler, outfitEmotes) {
		let emotesVar = WuxDef.GetVariable("Chat_Emotes");
		attrHandler.addUpdate(emotesVar, JSON.stringify(outfitEmotes));

		let newrowid;
		let postNameVar = WuxDef.GetVariable("Chat_PostName");
		let postUrlVar = WuxDef.GetVariable("Chat_PostURL");
		outfitEmotes.iterate(function (emote) {
			newrowid = generateRowID();
			attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newrowid, postNameVar), emote.name);
			attrHandler.addUpdate(emoteButtonRepeater.getFieldName(newrowid, postUrlVar), emote.url);
		});
	},
	updateNameOutfit = function (eventinfo) {
		console.log(`Renaming outfit ${eventinfo.previousValue} to ${eventinfo.newValue}`);
		let attributeHandler  = new WorkerAttributeHandler();
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
		console.log(`Setting outfit emotes through a json submission`);
		let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");

		try {
			JSON.parse(eventinfo.newValue);
		} catch (e) {
			let attributeHandler  = new WorkerAttributeHandler();
			attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid JSON. This field could not be read as a JSON object.");
			attributeHandler.run();
			return;
		}

		let outfitEmotes = new EmoteSetData(JSON.parse(eventinfo.newValue));

		if (outfitEmotes.name == "") {
			let attributeHandler  = new WorkerAttributeHandler();
			attributeHandler.addUpdate(eventinfo.sourceAttribute, "Invalid Data. This field must contain a JSON object with a 'name', 'defaultEmote', and 'emotes' array.");
			attributeHandler.run();
			return;
		}

		let updateId = outfitRepeatingSection.getIdFromFieldName(eventinfo.sourceAttribute);

		let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
		emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {

			let attributeHandler  = new WorkerAttributeHandler();
			let setIdVar = WuxDef.GetVariable("Chat_SetId");
			attributeHandler.addMod(setIdVar);
			
			attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitName")), outfitEmotes.name);
			attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes")), JSON.stringify(outfitEmotes));
			attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitEmotes", WuxDef._true)), JSON.stringify(outfitEmotes));
			console.log(`Setting outfit emotes for ${outfitEmotes.name} to \n${JSON.stringify(outfitEmotes)}`);

			let emoteIndex = 2;
			outfitEmotes.iterate(function (emote) {
				if (emote.url == outfitEmotes.defaultEmote) {
					attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefault")), emote.name);
					attributeHandler.addUpdate(outfitRepeatingSection.getFieldName(updateId, WuxDef.GetVariable("Chat_OutfitDefaultURL")), emote.url);
				}
				else {
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
		console.log(`Setting outfit emotes through a name entry to ${eventinfo.newValue}`);
		setOutfitEmotesIndividualEntry(eventinfo);
	},
	updateOutfitEmotesDefaultUrl = function (eventinfo) {
		console.log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
		setOutfitEmotesIndividualEntry(eventinfo);
	},
	updateOutfitEmotesUrl = function (eventinfo) {
		console.log(`Setting outfit emotes through a url entry to ${eventinfo.newValue}`);
		setOutfitEmotesIndividualEntry(eventinfo);
	},
	setOutfitEmotesIndividualEntry = function (eventinfo) {
		let outfitRepeatingSection = new WuxRepeatingSection("RepeatingOutfits");
		outfitRepeatingSection.getIds(function (outfitRepeater) {
			let emoteButtonRepeaterSection = new WuxRepeatingSection("RepeatingActiveEmotes");
			emoteButtonRepeaterSection.getIds(function (emoteButtonRepeater) {
				emoteButtonRepeater.removeAllIds();
				
				let updateId = outfitRepeater.getIdFromFieldName(eventinfo.sourceAttribute);
				let attributeHandler  = new WorkerAttributeHandler();
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
	}
	return {
		SelectOutfit: selectOutfit,
		UpdatePostContent: updatePostContent,
		UpdateSelectedLanguage: updateSelectedLanguage,
		UpdateNameOutfit: updateNameOutfit,
		UpdateOutfitEmotesGroup: updateOutfitEmotesGroup,
		UpdateOutfitEmotesName: updateOutfitEmotesName,
		UpdateOutfitEmotesDefaultUrl: updateOutfitEmotesDefaultUrl,
		UpdateOutfitEmotesUrl: updateOutfitEmotesUrl
	};
}());