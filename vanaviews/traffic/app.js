var couchapp = require('couchapp')
    , path = require('path');

ddoc = {
  _id: '_design/traffic'
  , language: 'javascript'
  , views: {}
  , lists: {}
  , shows: {}
};

module.exports = ddoc;

ddoc.views.byUser = {
  map: require( './byUser').map,
  reduce: require( './byUser').reduce
};

//couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));