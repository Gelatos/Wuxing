var WuxMessage = WuxMessage || (function () {
    'use strict';

    var
    parse = function (messageType, textMessage) {
        switch (messageType) {
            case "!m": return new SpeakEmoteMessage(textMessage);
            case "!w": return new WhisperEmoteMessage(textMessage);
            case "!y": return new YellEmoteMessage(textMessage);
            case "!t": return new ThinkEmoteMessage(textMessage);
            case "!d": return new DescEmoteMessage(textMessage);
            case "!intro": return new IntroEmoteMessage(textMessage);
            case "!a": return new AttackMessage(textMessage);
            case "!r": return new ResponseMessage(textMessage);
            case "!ry": return new ResponseYellMessage(textMessage);
            case "!i": return new InfoMessage(textMessage);
            case "!s": return new SystemInfoMessage(textMessage);
            case "!sa": return new SystemInfoAuxMessage(textMessage);
        }
        return undefined;
    },

    parseInput = function (msgContent) {
        let contentIndex = msgContent.indexOf(" ");
        if (contentIndex > 0) {
            return parse(msgContent.substring(0, contentIndex), msgContent.substring(contentIndex + 1));
        }
        return undefined;
    },

    handleMessageInput = function (msg, tag, content) {
        let messageObject = parse(tag, content);
        if (messageObject != undefined) {
            let targetData = new TargetData(msg);
            createEmoteOptions(msg.who, targetData, messageObject);
        }
        else {
            switch (tag) {
                case "!setlang": 
                    let languageObj = new setLanguageObj(content);
                    languageObj.setCharacterLanguage(msg.who);
                break;
            }
        }
    },

    createEmoteOptions = function (sender, targetData, messageObject) {
        let attributeHandler = new SandboxAttributeHandler(targetData.charId);
		let emotesVar = WuxDef.GetVariable("Chat_Emotes");
        let languageVar = WuxDef.GetVariable("Language", WuxDef._true);
        let affinityVar = WuxDef.GetVariable("Affinity");

        attributeHandler.addMod([emotesVar, languageVar, affinityVar]);
        attributeHandler.addFinishCallback(function(attrHandler) {
            messageObject.setTitle(targetData.displayName);
            messageObject.setLanguageByTarget(targetData);
            messageObject.setAffinity(attrHandler.parseString(affinityVar));

            let output = "<div style='font-weight: bold'>Emotes</div>";
            let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
            outfitEmoteSetData.iterate(function(emoteData) {
                if (emoteData.url != "") {
                    messageObject.setUrl(emoteData.url);
                    output += `<span class="sheet-wuxInlineRow">[${emoteData.name}](!&#13;${Format.SanitizeMacroRollTemplate(messageObject.printMacro())})${createImagePreview(emoteData.url)}</span> `;
                }
            });

            let languageList = attrHandler.parseJSON(languageVar);
            if (languageList != "" && languageList.length > 0) {
                output += `<div style='font-weight: bold'>Languages</div>`;

                let languageObj = new setLanguageObj(targetData);
                let objdata = "";
                for (let i = 0; i < languageList.length; i++) {
                    languageList[i] = languageList[i].trim();
                    languageObj.language = languageList[i];
                    objdata = languageObj.stringify();
                    output += `[${languageList[i]}](!setlang ${objdata}) `;
                }
            }

            messageObject.setSub(output);
            messageObject.url = outfitEmoteSetData.defaultEmote;

            let message = `/w ${sender.split(" ")[0]} ${messageObject.printRollTemplate()}`;
            sendChat("Emote Manager", message, null, {noarchive:true});
        });
        attributeHandler.run();
    },

    createImagePreview = function (url) {
        return `<div class="sheet-wuxTooltipButton"><div class="sheet-wuxTooltipText">i</div><img class="sheet-wuxTooltipImagePreview" src="${url}"/></div>`;
    },

    setLanguageObj = class {
        constructor(data) {
            this.createEmpty();
            if (data != undefined) {
                if (data instanceof TargetData) {
                    this.importTargetData(data);
                }
                else if (typeof(data == "string")) {
                    this.importJson(Format.ParseMacroJSON(data));
                }
                else {
                    this.importJson(data);
                }
            }
        }
        createEmpty() {
            this.charId = "";
            this.charName = "";
            this.language = "";
        }
        importTargetData(data) {
            this.charId = data.charId;
            this.charName = data.charName;
        }
        importJson(json) {
            this.charId = json.charId;
            this.charName = json.charName;
            this.language = json.language;
        }

        stringify() {
            return Format.SanitizeMacroJSON(JSON.stringify(this));
        }

        setCharacterLanguage(sender) {
            let messageObject = new EmoteMessage();
            messageObject.setLanguage(this.language);
    
            let attributeHandler = new SandboxAttributeHandler(this.charId);
            attributeHandler.addUpdate(WuxDef.GetVariable("Chat_Language"), messageObject.language);
            attributeHandler.addUpdate(WuxDef.GetVariable("Chat_LanguageTag"), messageObject.languageTag);
            attributeHandler.run();
                
            let message = `/w ${sender.split(" ")[0]} Set ${this.charName}'s language to ${this.language}`;
            sendChat("Emote Manager", message, null, {noarchive:true});
        }
    }
    
    return {
        Parse: parse,
        ParseInput: parseInput,
        HandleMessageInput: handleMessageInput
    };
}());

class EmoteSetData {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    importJson(json) {
        if (json.name == undefined) {
            console.log("EmoteSetData: No name found in json");
            return;
        }
        if (json.defaultEmote == undefined) {
            console.log("EmoteSetData: No defaultEmote found in json");
            return;
        }
        if (json.emotes == undefined) {
            console.log("EmoteSetData: No emotes found in json");
            return;
        }
        this.name = json.name;
        this.defaultEmote = json.defaultEmote;
        this.emotes = json.emotes;
    }

    createEmpty() {
        this.name = "";
        this.defaultEmote = "";
        this.emotes = [];
    }

    addEmote(name, url) {
        this.emotes.push(new EmoteData({name: name, url: url}));
    }

    iterate(callback) {
        for (let i = 0; i < this.emotes.length; i++) {
            callback(this.emotes[i]);
        }
    }
}

class EmoteData {
    constructor(json) {
        this.createEmpty();
        if (json != undefined) {
            this.importJson(json);
        }
    }

    importJson(json) {
        this.name = json.name;
        this.url = json.url;
    }

    createEmpty() {
        this.name = "";
        this.url = "";
    }   
}

class ChatMessage {
    constructor(msg) {
        this.createEmpty();
        if (msg != undefined) {
            this.message = msg;
        }
    }
    createEmpty() {
        this.message = "";
    }

    printRollTemplate() {
        return `&{template:${this.template}} ${this.printTemplateData()}`;
    }

    printMacro() {
        return `#${this.template} ${this.printTemplateData()}`;
    }

    printTemplateData() {
        return "";
    }

    printHtml() {
        return "";
    }
}

class SimpleMessage extends ChatMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "";
    }

    printRollTemplate() {
        return `{template:${this.template}} ${this.printTemplateData()}`;
    }

    printMacro() {
        return `#${this.template} ${this.printTemplateData()}`;
    }

    printTemplateData() {
        return `{{message=${this.message}}}`;
    }

    printHtml() {
        return `<div class="sheet-rolltemplate-${this.template}">
        <div>&nbsp;</div>
        <div class="sheet-formattedTextbox">${this.message}</div>
    </div>`;
    }
}

class AttackMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "attackBox";
    }
}

class ResponseMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "responseBox";
    }
}

class ResponseYellMessage extends SimpleMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "responseYellBox";
    }
}

class InfoMessage extends SimpleMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "infoBox";
    }

    printHtml() {
        return `<div class="sheet-rolltemplate-${this.template}">
        <div>&nbsp;</div>
        <div class="sheet-formattedTextbox">
            <div class="sheet-inner-border">
                <div class="sheet-wuxTitle">${this.message}</div>
            </div>
        </div>
    </div>`;
    }
}

class SystemInfoMessage extends InfoMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "systemInfoBox";
    }
}

class SystemInfoAuxMessage extends InfoMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "systemInfoAuxBox";
    }
}

class EmoteMessage extends ChatMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "";
        this.title = "";
        this.url = "";
        this.language = "";
        this.affinity = "";
        this.languageTag = "";
        this.sub = "";
    }

    printTemplateData() {
        let template = `{{url=${this.url}}} {{message=${this.message}}} {{title=${this.title}}}`;
        if (this.language) {
            template += ` {{language=${this.language}}}`;
            if (this.languageTag) {
                template += ` ${this.languageTag}`;
            }
        }
        if (this.affinity) {
            template += ` {{${this.affinity}}}`;
        }
        if (this.sub) {
            template += ` {{sub=${this.sub}}}`;
        }
        return template;
    }

    setTitle(title) {
        this.title = title;
    }

    setLanguage(language) {
        this.language = language;

        if (language == undefined) {
            this.languageTag = "{{language-default=1}}";
        }
    
        switch (language.toLowerCase()) {
            case "minere":
                this.languageTag = "{{language-coastal=1}}";
                break;
            case "apollen":
                this.languageTag = "{{language-mountain=1}}";
                break;
            case "junal":
                this.languageTag = "{{language-desert=1}}";
                break;
            case "cert":
                this.languageTag = "{{language-plains=1}}";
                break;
            case "lib":
                this.languageTag = "{{language-rare=1}}";
                break;
    
    
            case "palmic":
            case "shorespeak":
            case "verdeni":
                this.languageTag = "{{language-coastal=1}}{{language-regional=1}}";
                break;
            case "crinere":
            case "vulca":
                this.languageTag = "{{language-coastal=1}}{{language-ancient=1}}";
                break;
    
            case "kleikan":
                this.languageTag = "{{language-mountain=1}}{{language-regional=1}}";
                break;
    
            case "byric":
            case "dustell":
            case "muralic":
                this.languageTag = "{{language-desert=1}}{{language-regional=1}}";
                break;
            case "shira":
                this.languageTag = "{{language-desert=1}}{{language-ancient=1}}";
                break;
    
            case "ciel":
            case "citeq":
            case "manstan":
            case "salkan":
            case "sansic":
            case "silq":
                this.languageTag = "{{language-plains=1}}{{language-regional=1}}";
                break;
    
            case "jovean":
                this.languageTag = "{{language-rare=1}}{{language-regional=1}}";
                break;
            case "mytikan":
                this.languageTag = "{{language-rare=1}}{{language-ancient=1}}";
                break;
    
            case "wolfwarg":
            case "beast":
            case "empathy":
            case "emotion":
            case "spirit":
                this.languageTag = "{{language-special=1}}";
                break;
    
            default:
                this.languageTag = "{{language-default=1}}";
        }
    }

    setLanguageByTarget(targetData) {
        this.language = `@{${targetData.charName}|chat-language}`;
        this.languageTag = `@{${targetData.charName}|chat-languagetag}`;
    }

    setUrl(url) {
        this.url = url;
    }

    setAffinity(affinity) {
        this.affinity = affinity.toLowerCase();
    }

    setSub(sub) {
        this.sub = sub;
    }
}

class SpeakEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctmsg";
    }

    setTitle(title) {
        super.setTitle(title + " says");
    }
}

class WhisperEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctwsp";
    }

    setTitle(title) {
        super.setTitle(title + " whispers");
    }
}

class YellEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctyell";
    }

    setTitle(title) {
        super.setTitle(title + " yells");
    }
}

class ThinkEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctthk";
    }

    setTitle(title) {
        super.setTitle(title + " thinks");
    }
}

class DescEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctdesc";
    }
}

class IntroEmoteMessage extends EmoteMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "ctintro";
    }
}