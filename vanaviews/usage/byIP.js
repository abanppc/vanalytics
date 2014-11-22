module.exports.map = function (doc) {
  if( doc.request ) {
    //TODO fix this afterwhile Alireza fixed doc.time_local formatted strings
    //var d = new Date(doc.createdAt);
    var d = new Date();
    emit(
      [ doc.remote_addr, d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes() ],
      Number(doc.body_bytes_sent)
    );
  }
};

module.exports.reduce = "_stats";