module.exports.map = function (doc) {
  if (doc.startWatch) {
    var d = new Date(doc.createdAt);
    emit(
        [doc.uuid, d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()],
        1
    );
  }
};

module.exports.reduce = "_count";