on("add:pathv2", function(obj) {
    if (obj.get("layer") === "objects") { // "objects" = token layer
        toBack(obj);
    }
});

on("chat:message", function (msg) {
    if (msg.type == "api" && msg.content != null) {

        let firstSpace = msg.content.indexOf(" ");
        if (firstSpace == -1) {
            firstSpace = msg.content.length;
        }
        let tag = msg.content.substring(0, firstSpace).toLowerCase().trim();
        let content = "";
        if (firstSpace < msg.content.length) {
            content = msg.content.substring(firstSpace).trim();
        }

        WuxConflictManager.HandleInput(msg, tag, content);
        WuxTechniqueResolver.HandleInput(msg, tag, content);
        WuxMessage.HandleMessageInput(msg, tag, content);
        TargetReference.HandleInput(msg, tag, content);
    }
});

var Debug = Debug || (function () {
    'use strict';
    var
        logMessage = function (msg) {
            log(msg);
        },
        logShout = function (msg, logMessage) {
            log(logMessage);
            
            if (!playerIsGM(msg.playerid)) {
                sendChat("System", `/w ${msg.who.split(" ")[0]} ${logMessage}`, null, { noarchive: true });
            }
            sendChat("System", `/w GM ${logMessage}`, null, { noarchive: true });
        },
        logError = function (msg) {
            log(`Error! ${msg}`);
            sendChat("System Error", `/w GM ${msg}`, null, { noarchive: true });
        }

    return {
        Log: logMessage,
        LogShout: logShout,
        LogError: logError
    };
}());

