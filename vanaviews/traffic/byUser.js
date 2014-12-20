module.exports.map = function (doc) {
  if (doc.watchStart && doc.watchEnd) {
    var d = new Date(doc.createdAt);
    emit(
        [doc.uuid, doc.userId, d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()],
        [doc.watchStart, doc.watchEnd]
    );
  }
};

module.exports.reduce = function (key, values, rereduce) {
  var result = {};
  if (!rereduce) {
    for (var j = 0; j < values.length; j++) {
      for (var i = values[j][0]; i <= values[j][1]; i++) {
        result[i] = result[i] || 0;
        result[i] += 1;
      }
    }
  } else {
    for (var key in values) {
      for (var i in values[key]) {
        result[i] = result[i] || 0;
        result[i] += values[key][i];
      }
    }
  }
  return result;
};