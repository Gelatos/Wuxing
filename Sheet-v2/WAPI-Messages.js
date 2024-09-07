var WuxMessage = WuxMessage || (function () {
    'use strict';

    var
    parse = function (msgContent) {
        let contentIndex = msgContent.indexOf(" ");
        if (contentIndex > 0) {
            let messageType = msgContent.substring(0, contentIndex);
            let textMessage = msgContent.substring(contentIndex + 1);

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
        }
        return new SimpleMessage(msgContent);
    }
    
    return {
        Parse: parse
    };
}());


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
        return `&{template:${this.template}} {{message=${this.message}}}`;
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
    }

    printRollTemplate() {
        let template = `&{template:${this.template}} {{url=${this.url}}} {{message=${this.message}}}`;
        if (this.language) {
            template += ` {{language=${this.language}}}`;
        }
        if (this.affinity) {
            template += ` {{${this.affinity}}}`;
        }
        if (this.languageTag) {
            template += ` ${this.languageTag}`;
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