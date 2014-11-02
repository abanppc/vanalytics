/**
 * Created by behrad on 10/7/14.
 */
function OVPAnalytics( videoId, postUrl ) {

    this.uuid = videoId;
    this.postUrl = postUrl || '/analytics/vview';
    this.savePoints = { 0: false, 15: false, 30: false, 45: false, 60: false, 75: false, 90: false, 100: false };

    this.logOnViewedPercent = function( num ) {
        this.savePoints[ num ] = false;
    };

    this.bindToJwp = function( jwp ) {
        var self = this;
        jwp.onTime( function( progress ) {
            var posPercent = Math.round((progress.position / progress.duration) * 100);
            var duration = progress.position;
            if (self.savePoints[ posPercent ] !== undefined && self.savePoints[ posPercent ] === false) {
                var item = jwp.getPlaylistItem();
                self.savePoints[ posPercent ] = true;
                var data = {
                    clientTime: new Date(),
                    position: posPercent,
                    duration: duration,
                    isFlash: jwp.getRenderingMode() == "flash",
                    file: item.sources[0].file, //TODO currentPlayListItem should be used instead
                    type: item.sources[0].type,
                    quality: jwp.getCurrentQuality(),
                    uuid: self.uuid
                };
                $.ajax({
                    type: "POST",
                    url: self.postUrl,
                    data: JSON.stringify( data ), //TODO refactore to browser compatible post json
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
//                        console.log("Damet Garm");
                    },
                    failure: function(errMsg) {
                        console.error("View-e Mara Log namikoni ...kash!???");
                    }
                });
            }
        });
    }
}

// Your USAGE: please embed this file in your web app
// and include lines below in your PHP:

// var analytics = new OVPAnalytics( "123456" );
// analytics.logOnViewedPercent( 15 ) // if you need extra view point logs
// analytics.bindToJwp( jwplayer( "player" ) );