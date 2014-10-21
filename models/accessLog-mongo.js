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

module.exports.findByPath = function( params, cb ) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://'+config.mongo.username+':'+config.mongo.password+'@'+config.mongo.host+'/'+config.mongo.db, function(err, db) {
        var collection = db.collection('date_access_log_mimetype');
        var filter = {
            "uuid": params.uuid
        };
        if( params.startDate && params.endDate ) {
            filter["timestamp"] = {
                '$gte':Number(new Date(params.startDate).getTime()),
                '$lte':Number(new Date(params.endDate).getTime())
            };
        }
        collection.find( filter,{'limit':2000}).toArray(function(err, docs) {
            cb && cb( err, docs );
//            console.log( "################## ", docs || err );
//            process.exit();
        });
    });
};