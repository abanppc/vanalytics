(function( jwplayer ) {

  var overlay = function( player, config, div ) {

    var setupOverlay = function() {
      div.innerHTML = config.text;
      div.className = config.className + " ovp_jwp6_overlay";
      config.style && setStyle( config.style );
    };

    var showOverlay = function() {
      setStyle({
        opacity: 1
      });
    };

    var hideOverlay = function() {
      setStyle({
        opacity: 0
      });
    };

    var setStyle = function( object ) {
      for(var style in object) {
        div.style[ style ] = object[ style ];
      }
    };

    // Matches our text container to the size of the player instance
    this.resize = function( width, height ) {
      setStyle({
        /*position: 'absolute',
        margin: '0',
        width: '90%',
        padding: '10px 15px 10px'*/
      });
    };

    // Bind player events
    player.onReady( setupOverlay );
    player.onPlay( hideOverlay );
    player.onPause( showOverlay );
    player.onComplete( showOverlay );
  };

  jwplayer().registerPlugin( 'overlay', '6.0', overlay );

})( jwplayer );