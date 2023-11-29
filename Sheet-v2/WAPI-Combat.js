var WuxingCombat = WuxingCombat || (function() {
    'use strict';
    
    var version = "0.1",
        schemaVersion = "0.1",
        activeCharacters = [],

        checkInstall = function() {
            if( ! state.hasOwnProperty('WuxingCombat') || state.WuxingCombat.version !== schemaVersion) {
                state.TurnMarker = {
                    version: schemaVersion,
                    activeCharacters: []
                };
            }
        },
    
        handleInput = function(msg, tag, content) {
            switch (tag) {
                case "!battleAddCharacter":
                    commandAddCharacter(msg);
                    return;
                case "!battleRemoveCharacter":
                    commandRemoveCharacter(msg);
                    return;
            };
        },
        
        commandAddCharacter = function (msg) {
            
            let token;
            let character;
            _.each(msg.selected, function (obj) {
                
                // set token variables
                token = getObj('graphic', obj._id);

                if (token != undefined) {
                    character = getObj('character', token.get("represents"));
                    setDefaultTokenData (character, token);
                    state.WuxingCombat.activeCharacters.push(createTokenData(character.get("nickname"), token));
                }
            });
        },
        
        setDefaultTokenData = function (character, token) {

            // set vitals
            let hp = GetCharacterAttribute(character.get("_id"), "hp");
            hp.set("current", hp.get("max"));
            token.set("bar1_link", hp.get("_id"));
            token.set("showplayers_bar1", true);
            token.set("showplayers_bar1text", "2");
            token.set("bar2_value", character.get("tempHp_max"));
            token.set("bar2_max", "0");
            token.set("showplayers_bar2", true);
            token.set("showplayers_bar2text", "2");

            // set token name
            token.set("name", character.get("nickname"));
            token.set("showname", true);
            token.set("showplayers_name", true);
            token.set("bar_location", "overlap_bottom");

            // set the token element
            token.set(character.get("token_element"), true);

            // set tooltip
            token.set("show_tooltip", true);
            token.set("tooltip", character.get("scan-summary"));
        },
        
        createTokenData = function (name, token, element) {
            return {
                name: name,
                tokenId: token.get("id"),
                charId: token.get("represents"),
                element: element
            }
            
        }
        
    
    ;
    return {
        HandleInput: handleInput,
        CheckInstall: checkInstall
    };

})


on("ready",function(){
    'use strict';

	WuxingCombat.CheckInstall(); 
});