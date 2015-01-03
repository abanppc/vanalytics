var couchapp = require('couchapp')
    , path = require('path');

ddoc = {
  _id: '_design/usage',
  language: 'javascript'
  , views: {}
  , lists: {}
  , shows: {}
};

module.exports = ddoc;

ddoc.views.byUUID = {
  map: require( './byUUID').map,
  reduce: require( './byUUID').reduce
};


ddoc.views.byIP = {
  map: require( './byIP').map,
  reduce: require( './byIP').reduce
};

//couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));