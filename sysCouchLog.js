var server = require("./lib/node-listen-udp-syslog");
var config = require( './config' );
var nano = require('nano');

var db = nano(
    'http://'+config.couchdb.host+':' + config.couchdb.port + "/" + config.couchdb.usage_db
);

var filter = new RegExp( "\\.("+ config.sysCouchLog.filter_mime_types.join( '|' ) + ")", "gi" );
server.start( '0.0.0.0', config.sysCouchLog.port, function (msg) {
    var data = msg;
    try {
        if( msg.content.match( filter ) ) {
            data = JSON.parse( msg.content.replace( /[^\{]*\{/, '{' ) );
            data.createdAt = Date.now();
            db.insert( data, function(err, body) {
                console.log( body || err );
            });
        } else {
            console.log( "Message didn't match filter ", filter );
        }
    } catch( e ) {
        console.error( e );
    }
});