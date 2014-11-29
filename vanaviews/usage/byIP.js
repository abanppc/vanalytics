module.exports.map = function (doc) {
  if( doc.request && doc.remote_addr) {
    var d = new Date( doc.timestamp );
    emit(
      [ doc.remote_addr, d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes() ],
      Math.round( Number(doc.body_bytes_sent)/1024 )
    );
  }
};

module.exports.reduce = "_stats";