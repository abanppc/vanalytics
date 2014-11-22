/**
 * Created by behrad on 10/7/14.
 */
function OVPAnalytics( userId, sessionId, videoId, postUrl ) {


    this.uuid = videoId;
    this.userId = userId;
    this.sessionId = sessionId;
    this.postUrl = postUrl || '/analytics/vview';
    this.watched = {};
    this.savePoints = { 0: false, 2: false, 20: false, 40: false, 60: false, 80: false, 100: false };

    this.logOnViewedPercent = function( num ) {
        this.savePoints[ num ] = false;
    };

    this.isEmpty = function( obj ) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size <= 1;
    };

    this.closeWatch = function( jwp ) {
      if( !this.isEmpty( this.watched ) ) {
        var min = Math.min.apply( Math, Object.keys( this.watched ) );
        var max = Math.max.apply( Math, Object.keys( this.watched ) );
        console.log( "AJAX %s -> %s", min+1, max );
        this.submitWatchPeriod( jwp, min+1, max );
      }
      this.watched = {};
    };

    this.submitWatchPeriod = function( jwp, start, end ) {
      this.submit( jwp, { watchStart: start, watchEnd: end } );
    };

    this.submit = function( jwp, extraData ) {
      var item = jwp.getPlaylistItem();
      var data = {
        clientTime: Date.now(),
        duration: this.totalDuration,
        isFlash: jwp.getRenderingMode() == "flash",
        file: item.sources[0].file, //TODO currentPlayListItem should be used instead
        type: item.sources[0].type,
        quality: jwp.getCurrentQuality(),
        userId: this.userId,
        sessionId: this.sessionId,
        uuid: this.uuid
      };
      for( var k in extraData ) {
        data[ k ] = extraData[ k ];
      }
      $.ajax({
        type: "POST",
        url: this.postUrl,
        data: JSON.stringify( data ), //TODO refactore to browser compatible post json
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){},
        failure: function(errMsg) {
          console.error("View-e Mara Log namikoni ...kash!???");
        }
      });
    };

    this.bindToJwp = function( jwp ) {
        var self = this;

        jwp.onTime( function( progress ) {
          var posPercent = Math.round((progress.position / progress.duration) * 100);
          self.watched[posPercent] = posPercent;
          self.totalDuration = progress.duration;
          if (self.savePoints[ posPercent ] !== undefined && self.savePoints[ posPercent ] === false) {
            self.savePoints[ posPercent ] = true;
            if( posPercent === 0 ) {
              self.submit( jwp, { startWatch: true } );
            }
            self.closeWatch( jwp );
          }
        });

        jwp.onSeek( function( data ){
          //console.log( "================== SEEK close me to ", jwp.getState() );
          self.closeWatch( jwp );
        });

        jwp.onPlay( function( data ){
          //console.log( "================== PLAY start on this " );
        });

        jwp.onPause( function( data ){
          //console.log( "================== PAUSE close me to " );
          self.closeWatch( jwp );
        });

        jwp.onComplete( function( data ){
          //console.log( "================== COMPLETE " );
        });

      $(window).on("beforeunload", function() {
        jwp.pause();
        return false;
      });

    };


  if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
      throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
  }

}

// Your USAGE: please embed this file in your web app
// and include lines below in your PHP:

// var analytics = new OVPAnalytics( "123456" );
// analytics.logOnViewedPercent( 15 ) // if you need extra view point logs
// analytics.bindToJwp( jwplayer( "player" ) );