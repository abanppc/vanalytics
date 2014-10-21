"use strict";
var OvpClient = (function () {
    var ovp = {};

    var private_key = 'wikak502aidDDLWo5Swl4M2CcvSvkncE4uRmdsalL5M';
    var debug_no_check = true;

    function setup() {
        if( !debug_no_check ) {
            jwplayer.key = ovp.key;
        }
        var instance = jwplayer( ovp.elementId ).setup( ovp.player );
        var analytics = new OVPAnalytics( ovp.uuid );
        analytics.bindToJwp( instance );
    }

    ovp.publicMethod = function(){
    };

    ovp.init = function( options ) {
        options = options || {};
        this.key = options.key || private_key;
        this.elementId = options.elementId || 'player';
        this.uuid = options.uuid;
        this.player = options.player;
        setup();
    };

    return function( options ){
        if( !debug_no_check && jwplayer === undefined ) {
            throw new Error( "jwplayer not found, please add it's javascript files" )
        }
        ovp.init(options);
        return ovp;
    };
}());




//http://support.jwplayer.com/customer/portal/articles/1407438-adding-closed-captions

// my own test bed: http://jsfiddle.net/nF7Mw/1228/


/*
var video = new OVP({
    key: "",
    elementId: "",
    uuid: "541fbe6aaf539656fc000374",
    sources:[
        {"file":"http://qmery_com-pars.tehran.temcdn.ir/25ea3fae-4220-11e4-86da-2c44fd7f1164-1280x720.mp4", "label":"1280p"},
        {"file":"http://qmery_com-pars.tehran.temcdn.ir/25ea3fae-4220-11e4-86da-2c44fd7f1164-704x400.mp4", "label":"704p"},
        {"file":"http://qmery_com-pars.tehran.temcdn.ir/25ea3fae-4220-11e4-86da-2c44fd7f1164-400x224.mp4", "label":"400p"}
    ],
    image: "http://qmery_com-pars.tehran.temcdn.ir/25ea3fae-4220-11e4-86da-2c44fd7f1164-00:01:00.png",
    height: '100%',
    width: '100%'
});*/