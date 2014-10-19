var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var config = require( '../config');

mongoose.connect('mongodb://rlogUser:rlogPass@185.49.84.58/syslog');

var flatSchema = new Schema({
    _id: {
        request: String,
        year: String,
        month: String,
        day: String
    }
}, { collection: 'date_access_log_mimetype'});

module.exports = AccessLog = mongoose.model('AccessLog', flatSchema);

//AccessLog.find({ "_id.request": "/013b3b97-9f8e-4a55-b45e-febaa056dfae_300.mp4" })
//    .where('_id.month').gt("07").lt("09")
//    .select( 'value' )
//    .exec( function( err, logs ){
////    console.log( "===================== ", err || logs );
////    process.exit();
//});

module.exports.findByPath = function( path, cb ) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://'+config.mongo.username+':'+config.mongo.password+'@'+config.mongo.host+'/'+config.mongo.db, function(err, db) {
        var collection = db.collection('date_access_log_mimetype');
        collection.find({
            "_id.request": path
//            "_id.request": "/013b3b97-9f8e-4a55-b45e-febaa056dfae_300.mp4",
//        "_id.year": {'$gt':"2014", '$lte':"2014"},
//        "_id.month": {'$gt':"08", '$lte':"09"},
//        "_id.day": {'$gt':"1", '$lte':"31"}
        },{'limit':2000}).toArray(function(err, docs) {
            cb && cb( err, docs );
//            console.log( "################## ", docs || err );
//            process.exit();
        });
    });
};