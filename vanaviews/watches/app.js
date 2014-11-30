var couchapp = require('couchapp')
    , path = require('path');

ddoc = {
  _id: '_design/watches'
  , views: {}
  , lists: {}
  , shows: {}
};

module.exports = ddoc;

ddoc.views.byUUID = {
  map: require( './byUUID').map,
  reduce: require( './byUUID').reduce
};

ddoc.views.byUser = {
  map: require( './byUser').map,
  reduce: require( './byUser').reduce
};

//couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));