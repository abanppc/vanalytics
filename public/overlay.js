(function( jwplayer ) {

  var overlay = function( player, config, div ) {

    var setupOverlay = function() {
        div.innerHTML = config.text;
    };

    var showOverlay = function() {
        console.log( "show ", player, config, div );
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
        position: 'absolute',
//        top: '90%',
        margin: '0',
        padding: '10px 15px 10px',
        background: 'rgba( 0, 0, 0, .7 )',
        color: 'white',
        fontSize: '12px',
        width: '90%'
//        width: '100%'
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