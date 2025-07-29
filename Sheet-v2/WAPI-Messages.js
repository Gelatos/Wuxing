var WuxMessage = WuxMessage || (function () {
    'use strict';

    var
        parse = function (messageType, textMessage) {
            switch (messageType) {
                case "!m": return new SpeakEmoteMessage(textMessage);
                case "!w": return new WhisperEmoteMessage(textMessage);
                case "!y": return new YellEmoteMessage(textMessage);
                case "!t": return new ThinkEmoteMessage(textMessage);
                case "!d":
                case "!de": return new DescEmoteMessage(textMessage);
                case "!a": return new AttackMessage(textMessage);
                case "!r": return new ResponseMessage(textMessage);
                case "!ry": return new ResponseYellMessage(textMessage);
                case "!i": return new InfoMessage(textMessage);
                case "!s": return new SystemInfoMessage(textMessage);
                case "!sa": return new SystemInfoAuxMessage(textMessage);
                case "!history": return new HistoryMessage(textMessage);
                case "!loc": return new LocationMessage(textMessage);
                case "!chapter": return new ChapterMessage(textMessage);
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

        parseType = function (type, textMessage) {
            if (textMessage == undefined) {
                textMessage = "";
            }
            switch (type) {
                case "ctmsg": return new SpeakEmoteMessage(textMessage);
                case "ctwsp": return new WhisperEmoteMessage(textMessage);
                case "ctyell": return new YellEmoteMessage(textMessage);
                case "ctthk": return new ThinkEmoteMessage(textMessage);
                case "ctdesc": return new DescEmoteMessage(textMessage);
                case "ctintro": return new IntroEmoteMessage(textMessage);
                case "attackBox": return new AttackMessage(textMessage);
                case "responseBox": return new ResponseMessage(textMessage);
                case "responseYellBox": return new ResponseYellMessage(textMessage);
                case "infoBox": return new InfoMessage(textMessage);
                case "systemInfoBox": return new SystemInfoMessage(textMessage);
                case "systemInfoAuxBox": return new SystemInfoAuxMessage(textMessage);
            }
            return undefined;
        },

        handleMessageInput = function (msg, tag, content) {
            let messageObject = parse(tag, content);
            if (messageObject != undefined) {
                if (messageObject instanceof EmoteMessage) {
                    let targetData = new TargetData(msg);
                    if (tag == "!d") {
                        messageObject.message = `${targetData.displayName} ${messageObject.message}`;
                    }
                    createEmoteOptions(msg.who, targetData, messageObject);
                }
                else {
                    messageObject.setSender(msg.who);
                    send(messageObject, undefined, true);
                }
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
            attributeHandler.addFinishCallback(function (attrHandler) {
                messageObject.setTitle(targetData.displayName);
                messageObject.setLanguageByTarget(targetData);
                messageObject.setAffinity(attrHandler.parseString(affinityVar));

                let output = "<div style='font-weight: bold'>Emotes</div>";
                let outfitEmoteSetData = new EmoteSetData(attrHandler.parseJSON(emotesVar));
                outfitEmoteSetData.iterate(function (emoteData) {
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
                messageObject.setSender("Emote Manager");

                send(messageObject, sender.split(" ")[0]);
            });
            attributeHandler.run();
        },

        createImagePreview = function (url) {
            return `<div class="sheet-wuxTooltipButton"><div class="sheet-wuxTooltipText">i</div><img class="sheet-wuxTooltipImagePreview" src="${url}" alt="Emote"/></div>`;
        },

        send = function (messageObject, targets, archive) {
            if (targets == undefined || targets == "") {
                sendToChat(messageObject.sender, messageObject.printRollTemplate(), archive);
                return;
            }

            let message = messageObject.printRollTemplate();

            if (Array.isArray(targets)) {
                if (targets.length > 0) {
                    for (let i = 0; i < targets.length; i++) {
                        sendToChat(messageObject.sender, `/w ${targets[i]} ${message}`, archive);
                    }
                }
            }
            else {
                sendToChat(messageObject.sender, `/w ${targets} ${message}`, archive);
            }
        },

        sendToChat = function (sender, message, archive) {
            if (archive) {
                sendChat(sender, message);
            }
            else {
                sendChat(sender, message, null, { noarchive: true });
            }
        }

    return {
        Parse: parse,
        ParseInput: parseInput,
        ParseType: parseType,
        HandleMessageInput: handleMessageInput,
        Send: send
    };
}());

class setLanguageObj {
    constructor(data) {
        this.createEmpty();
        if (data != undefined) {
            if (data instanceof TargetData) {
                this.importTargetData(data);
            }
            else if (typeof (data == "string")) {
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
        sendChat("Emote Manager", message, null, { noarchive: true });
    }
}

class TableMessage {
    constructor(headers) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(row) {
        this.rows.push(row);
    }

    print() {
        let tableHeader = "";
        for (let i = 0; i < this.headers.length; i++) {
            if (i == 0) {
                tableHeader += `<th>${this.headers[i]}</th>`;
            }
            else {
                tableHeader += `<th style="margin-left: 15px; text-align: right">${this.headers[i]}</th>`;
            }
        }

        let tableRow = "";
        let tableRows = "";
        for (let i = 0; i < this.rows.length; i++) {
            tableRow = "";
            for (let j = 0; j < this.rows[i].length; j++) {
                if (j == 0) {
                    tableRow += `<td>${this.rows[i][j]}</td>`;
                }
                else {
                    tableRow += `<td style="text-align: right">${this.rows[i][j]}</td>`;
                }
            }
            tableRows += `<tr>${tableRow}</tr>`;
        }

        return `<table class="sheet-wuxFlexTable"><tr>${tableHeader}</tr>${tableRows}</table>`;
    }

    addTargetModifierTable(tokenTargetDataArray, variableName) {

        let data = [];
        tokenTargetDataArray.forEach(tokenTargetData => {
            let attributeHandler = new SandboxAttributeHandler(tokenTargetData.charId);
            let results;
            attributeHandler.addMod(variableName);

            attributeHandler.addFinishCallback(function (attrHandler) {
                let value = attrHandler.parseInt(variableName, 0, false);
                results = new DieRoll();
                results.rollSkillCheck(0, value);
            });
            attributeHandler.run();
            results.tokenTargetData = tokenTargetData;
            data.push(results);
        });
        data.sort((a, b) => b.total - a.total);
        data.forEach(results => {
            this.addRow([results.tokenTargetData.displayName, `${Format.ShowTooltip(`${results.total}`, results.message)}`]);
        });
        return data;
    }
}

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
        this.emotes.push(new EmoteData({ name: name, url: url }));
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
            this.setMessage(msg);
        }
    }
    createEmpty() {
        this.sender = "";
        this.message = "";
    }
    
    setMessage(msg) {
        this.message = msg;
    }

    setSender(sender) {
        this.sender = sender;
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
        return `&{template:${this.template}} ${this.printTemplateData()}`;
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
        this.message2 = "";
        this.message3 = "";
        this.message4 = "";
    }
    
    setMessage(msg) {
        let msgArray = msg.split("\\");
        this.message = msgArray[0].trim();
        if (msgArray.length > 1) {
            this.message2 = msgArray[1].trim();
        } else {
            this.message2 = "";
        }
        if (msgArray.length > 2) {
            this.message3 = msgArray[2].trim();
        } else {
            this.message3 = "";
        }
        if (msgArray.length > 3) {
            this.message4 = "";
            for (let i = 3; i < msgArray.length; i++) {
                if (this.message4 != "") {
                    this.message4 += " ";
                }
                this.message4 += msgArray[i].trim();
            }
        } else {
            this.message4 = "";
        }
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

    printTemplateData() {
        let options = this.message2 != "" ? ` {{message2=${this.message2}}}` : "";
        options += this.message3 != "" ? ` {{message3=${this.message3}}}` : "";
        options += this.message4 != "" ? ` {{message4=${this.message4}}}` : "";
        
        return `{{message=${this.message}}}${options}`;
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

class HistoryMessage extends InfoMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "historyBox";
    }
}

class EmoteMessage extends ChatMessage {
    createEmpty() {
        super.createEmpty();
        this.template = "";
        this.title = "";
        this.name = "";
        this.emote = "";
        this.url = "";
        this.language = "";
        this.affinity = "";
        this.languageTag = "";
        this.sub = "";
    }

    printTemplateData() {
        let template = `{{url=${this.url}}} {{emote=${this.emote}}} {{name=${this.name}}} {{message=${this.message}}} {{title=${this.title}}}`;
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
    
    setName(name) {
        this.name = name;
        if (this.title == "") {
            this.title = name;
        }
    }
    
    setEmote(emote) {
        this.emote = emote;
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

class LocationMessage extends ChatMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "locationBox";
        this.location = "";
        this.area = "";
        this.date = "";
        this.time = "";
    }

    printTemplateData() {
        return `{{location=${this.location}}} {{area=${this.area}}} {{date=${this.date}}} {{time=${this.time}}}`;
    }

    printHtml() {
        return `<div class="sheet-rolltemplate-${this.template}">
        <div>&nbsp;</div>
        <div class="formattedTextbox">
            <div class="inner-border">
                <div class="sheet-wuxTemplateHeader">
                    <span>${this.location}</span>
                </div>
                <div class="sheet-wuxHeader">
                    <span>${this.area}</span>
                </div>
                <div class="sheet-wuxSubheader">${this.date} ${this.time}</div>
            </div>
        </div>
    </div>`;
    }
    
    setLocation(location) {
        this.location = location;
    }
    
    setArea(area) {
        this.area = area;
    }
    
    setDate(date) {
        this.date = date;
    }
    
    setTime(time) {
        this.time = time;
    }
}

class QuestMessage extends ChatMessage {

    createEmpty() {
        super.createEmpty();
        this.template = "quest";
        this.type = "";
        this.isComplete = false;
        this.questHeader = "";
        this.questName = "";
        this.subtitle = "";
        this.questRewards = "";
    }

    printTemplateData() {
        let options = this.questRewards ? ` {{questRewards=${this.questRewards}}}` : "";
        options += this.isComplete ? " {{complete=1}}" : "";
        options += this.questHeader != "" ? ` {{questHeader=${this.questHeader}}}` : "";
        return `{{${this.type}=1}} {{questName=${this.questName}}} {{subtitle=${this.subtitle}}}${options}`;
    }
}

class ChapterMessage extends QuestMessage {
    createEmpty() {
        super.createEmpty();
        this.type = "chapter";
        this.chapter = 0;
        this.part = 0;
    }
    
    setChapterName(name) {
        this.questName = name;
    }

    setSubtitle(chapter, part) {
        this.chapter = chapter;
        this.part = part;
        this.subtitle = `Chapter ${chapter} - Part ${part}`;
    }

    printTemplateData() {
        let baseData = super.printTemplateData();
        baseData += ` {{chapter=${this.chapter}}} {{part=${this.part}}}`;
        return baseData;
    }
}