var WuxingBattleController = WuxingBattleController || (function() {
    'use strict';
    
    var version = "0.1",
        schemaVersion = "0.1",
        activeCharacters = [],

        checkInstall = function() {
            if( ! state.hasOwnProperty('WuxingBattleController') || state.WuxingBattleController.version !== schemaVersion) {
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
                    setTokenData (character, token);
                    state.WuxingBattleController.activeCharacters.push(createTokenData(character.get("nickname"), token));
                }
            });
        },
        
        setTokenData = function (character, token) {
        
        }
        
        createTokenData = function (name, token) {
            return {
                name: name,
                tokenId: token.get("id"),
                charId: token.get("represents")
            }
            
        },
        
    
    ;
    return {
        HandleInput: handleInput
    };

})