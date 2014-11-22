var couchapp = require('couchapp')
    , path = require('path');

ddoc = {
  _id: '_design/traffic'
  , views: {}
  , lists: {}
  , shows: {}
};

module.exports = ddoc;

ddoc.views.byUser = {
  map: require( './byUser').map,
  reduce: require( './byUser').reduce
};

ddoc.views.byUUID = {
  map: function(doc) {
    if( doc.startWatch ) {
      var d = new Date( doc.createdAt );
      emit(
          [doc.uuid, d.getFullYear(), d.getMonth()+1, d.getDate(), d.getHours(), d.getMinutes()],
          1
      );
    }
  },
  reduce: "_stats"
};

couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));