"use strict";
var OvpClient = (function (jwplayer) {
  var ovp = {};

  var private_key = 'wikak502aidDDLWo5Swl4M2CcvSvkncE4uRmdsalL5M';
  var debug_no_check = false;

  ovp.setup = function() {
    if( !debug_no_check ) {
      jwplayer.key = ovp.key;
    }
    console.log( "Building JWP with ", ovp.player );
    var instance = jwplayer( ovp.elementId ).setup( ovp.player );
    var analytics = new OVPAnalytics( ovp.uuid, ovp.analytics.postUrl );
    analytics.bindToJwp( instance );
  };

  ovp.addSource = function( source, label ){
    this.player.playlist[0].sources = this.player.playlist[0].sources || [];
    this.player.playlist[0].sources.push({
      "file": source,
      "label": label
    });
  };

  ovp.addTrack = function( source, label, isDefault ) {
    this.player.playlist[0].tracks = this.player.playlist[0].tracks || [];
    this.player.playlist[0].tracks.push({
      file: source,
      label: label,
      kind: "captions",
      "default": isDefault
    });
  };

  ovp.setTextOverlay = function( body, className, style ) {
    ovp.player.plugins['/overlay.js'] = {
      text: body,
      className: className,
      style: style
    };
  };

  var init = function( options ) {
    options = options || {};
    ovp.analytics = options.analytics;
    ovp.key = options.key || private_key;
    ovp.elementId = options.elementId || 'player';
    ovp.uuid = options.uuid;
    ovp.player = options.player || {
      height: '100%',
      width: '100%',
      abouttext: "Aban PPC",
      aboutlink: "http://abanppc.com"
    };
    ovp.player.playlist = ovp.player.playlist || [{}];
    (options.image) && (ovp.player.playlist[0].image = options.image);
    (options.height) && (ovp.player.height = options.height);
    (options.width) && (ovp.player.width = options.width);
    (options.logo) && (ovp.player.logo = options.logo);
    ovp.player.plugins = ovp.player.plugins || {};
    if( options.overlay ) {
      ovp.setTextOverlay( options.overlay.content, options.overlay.className, options.overlay.style );
    }

//    revive adserver tag url

//    http://adserver.abanppc.com/adserver/www/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll0-0%3D20&nz=1&source=&r=R0.023106331005692482&block=1&format=vast&charset=UTF-8

//    setup();
  };

  return function( uuid, options ){
    if( !debug_no_check && jwplayer === undefined ) {
      throw new Error( "jwplayer not found, please add it's javascript files" )
    }
    init(options);
    return ovp;
  };
}(jwplayer));




//http://support.jwplayer.com/customer/portal/articles/1407438-adding-closed-captions

// my own test bed: http://jsfiddle.net/nF7Mw/1228/ AND http://qmery.com/v/1V3vZQpXe5


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