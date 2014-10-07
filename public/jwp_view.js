/**
 * Created by behrad on 10/7/14.
 */
function OVPAnalytics( videoId ) {
    this.uuid = videoId;
    this.savePoints = { 0: false, 20: false, 40: false, 60: false, 80: false, 100: false };

    this.logOnViewedPercent = function( num ) {
        this.savePoints[ num ] = false;
    };

    this.bindToJwp = function( jwp ) {
        var self = this;
        jwp.onTime( function( progress ) {
            var posPercent = Math.round((progress.position / progress.duration) * 100);
            if (self.savePoints[ posPercent ] !== undefined && self.savePoints[ posPercent ] === false) {
                var item = jwp.getPlaylistItem();

                console.log("time ", Math.floor(posPercent), item.title);

                self.savePoints[ posPercent ] = true;
                var data = {
                    clientTime: new Date(),
                    position: posPercent,
                    isFlash: jwp.getRenderingMode() == "flash",
                    file: item.sources[0].file,
                    type: item.sources[0].type,
                    quality: jwp.getCurrentQuality(),
                    vUUID: self.uuid
                };
                $.post('/analytics/vview', data, $.noop, 'json').done(function () {
                    console.log("Damet Garm");
                }).fail(function () {
                    console.error("View-e Mara Log namikoni ...kash!???");
                });
            }
        });
    }
}

// Your USAGE: please embed this file in your web app
// and include lines below in your PHP:
// var analytics = new OVPAnalytics( "123456" )
// logOnViewedPercent( 15 ) // if you need extra view point logs
// analytics.bindToJwp( jwp );



// my own test bed: http://jsfiddle.net/nF7Mw/1228/