module.exports.map = function (doc) {
  var filename = 'unknown';
  if( doc.request ) {
    //var url = doc.request.match( /\/(.*)\.(mp4|webm|flv|ts)/i );
    var url = doc.request.match( /\/([^/]+)\.ts\sHTTP/i );
    if( url && url.length == 2 ) {
      filename = url[1].replace( /-[^-]+$/, '' ).replace( /-[^-]+$/, '' );
    } else { // not a ts file
      url = doc.request.match( /\/([^/]+)\..+\sHTTP/i );
      if( url && url.length == 2) {
        filename = url[1].replace( /-[^-]+$/, '' );
      }
    }
    if ( filename ) {
      var d = new Date( doc.timestamp );
      emit(
        [ filename, d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes() ],
        Math.round( Number(doc.body_bytes_sent)/1024 )
      );
    }
  }
};

module.exports.reduce = "_stats";