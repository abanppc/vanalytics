/**
 *  * Created by behrad on 10/7/14.
 *   */
function OVPAnalytics( userId, sessionId, videoId, postUrl ) {


    this.uuid = videoId;
    this.userId = userId;
    this.sessionId = sessionId;
    this.postUrl = postUrl || '/analytics/vview';
    this.watched = {};
    this.submittedStartWatch = false;
    this.recentSavedPoint = null;
    this.savePoints = { 2: true, 20: true, 40: true, 60: true, 80: true, 100: true };



    this.closeWatch = function( jwp ) {
      if( !this.isEmpty( this.watched ) ) {
        var min = Math.min.apply( Math, Object.keys( this.watched ) );
        var max = Math.max.apply( Math, Object.keys( this.watched ) );
        if( min == this.recentSavedPoint ) {
          min++;
        }
        console.log( "============ SEEN %s -> %s", min, max, this.recentSavedPoint );
        this.submit( jwp, { watchStart: min, watchEnd: max } );
      }
      this.recentSavedPoint = max;
      this.watched = {};
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
        data: JSON.stringify( data ), //TODO refactor to browser compatible post json
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
          if( posPercent === 0 && self.submittedStartWatch !== true ) {
            self.submit( jwp, { startWatch: true } );
            self.submittedStartWatch = true;
          } else if ( self.savePoints[ posPercent ] === true && posPercent !== self.recentSavedPoint ) {
            self.closeWatch( jwp );
          }
        });

        jwp.onSeek( function( data ){
          self.closeWatch( jwp );
        });

        jwp.onPlay( function( data ){
        });

        jwp.onPause( function( data ){
          self.closeWatch( jwp );
        });

        jwp.onComplete( function( data ){
          self.watched = {};
        });

      $(window).on("beforeunload", function() {
        jwp.pause();
        return false;
      });

    };



  this.logOnViewedPercent = function( num ) {
    this.savePoints[ num ] = true;
  };

  this.isEmpty = function( obj ) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size <= 1;
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
// // and include lines below in your PHP:
//
// // var analytics = new OVPAnalytics( "123456" );
// // analytics.logOnViewedPercent( 15 ) // if you need extra view point logs
// // analytics.bindToJwp( jwplayer( "player" ) );
