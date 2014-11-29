module.exports.map = function (doc) {
  if( doc.request ) {
    var url = doc.request.match( /\/(.*)\.(mp4|webm|flv)/i );
    //var url = doc.request.match( /.*\s\/(.+)\s.*/ );
    if ( url && url.length == 3 ) {
      var d = new Date( doc.timestamp );
      emit(
        [ url[1], d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes() ],
        Math.round( Number(doc.body_bytes_sent)/1024 )
      );
    }
  }
};

module.exports.reduce = "_stats";