/**
 * Created by behrad on 10/7/14.
 */
// My module
function Models(orm) {

  var config = require( '../config.js' );
  var db = require('nano')( 'http://'+config.couchdb.host+':'+config.couchdb.port + '/' + config.couchdb.db );
  var usage_db = require('nano')( 'http://'+config.couchdb.host+':'+config.couchdb.port + '/' + config.couchdb.usage_db );


  return {
    index: function (req, res) {
      res.json({ ok: true, status: "سلامت و سرافراز" });
    },

    create: function (req, res) {
      /*orm.VView.create({
        ip: getClientAddress(req),
        clientTime: req.body.clientTime,
        position: req.body.position,
        duration: req.body.duration,
        isFlash: req.body.isFlash,
        file: req.body.file,
        type: req.body.type,
        quality: req.body.quality,
        userId: req.body.userId,
        sessionId: req.body.sessionId,
        uuid: req.body.uuid
      }).on('success', function (viewLog) {
//                console.log( "Halle: ", viewLog );
      });*/

      req.body.ip = getClientAddress(req);
      req.body.createdAt = Date.now();
      db.insert( req.body, function(err, body) {
        if (err)
          console.log(err);
      });

      res.json({ok: true, message: "بازم نگاه کن" });
    },

    viewsByPosition: function (req, res) {
      console.log("Query params %o \n========================================== ", req.params);
      var filter = {};
      if (req.params.file) {
        filter.file = req.params.file;
      } else if (req.params.uuid) {
        filter.uuid = req.params.uuid;
        filter.userid = req.params.userid;
      }
      var keys = parseDates( [filter.uuid, filter.userid], req.params );
      db.view('traffic', 'byUser', {
        reduce: true,
        group_level: 2,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        console.log( body || err );
        if (!err) {
          body.rows.forEach(function(doc) {
          });
          return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });

      /*orm.VView.findAndCountAll({
        attributes: [
          [orm.Sequelize.fn('count', orm.Sequelize.col('*')), 'count'],
          ['position', 'position']
        ],
        where: filter,
        group: 'position'
      }).then(function (views) {
        return res.json({ok: true, results: views });
      });*/
    },
    //select avg(p) from (select MAX(position) as p,uuid,ip from VViews where uuid="uuid" group by uuid, ip) as test;


    prpByUUID: function (req, res) {
      console.log("===========================================================\n" +
          "Query params %j and string %j \n" +
          "===========================================================", req.params, req.query);
      var filter = { position: 0 };
      if (req.params.uuid) {
        filter.uuid = req.params.uuid;
      }
      var keys = parseDates( [filter.uuid ], req.params );
      db.view('traffic', 'byUser', {
        reduce: true,
        group_level: 2,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        if (!err) {
          var plays = {};
          var replays = {};
          // TODO reduce traffic/byUser with group_level=2 and aggregate on users
          // TODO to collect total plays, total replays :)
          body.rows.forEach(function(row) {
            for( var p in row.value ) {
              plays[p] = plays[p] || 0;
              plays[p]++;
              if( row.value[p] > 1 ) {
                replays[p] = replays[p] || 0;
                replays[p] += row.value[p] - 1;
              }
            }
          });
          return res.json({ok: true, results: [{ plays: plays, replays: replays }] });
          //return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });

      /*orm.VView.findAndCountAll({
        attributes: [
          [orm.Sequelize.fn('count', orm.Sequelize.col('*')), 'count'],
          ['DATE(createdAt)', 'date']
        ],
        where: filter,
        order: 'createdAt DESC',
        group: 'DATE(createdAt)'
      }).then(function (views) {
        return res.json({ok: true, results: views });
      });*/
    },

    watchesByUser: function(req, res) {
      var keys = parseDates( [req.params.uuid,req.params.userid], req.params );
      db.view('watches', 'byUser', {
        reduce: true,
        group_level: 4,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        console.log( body || err );
        if (!err) {
          body.rows.forEach(function(doc) {
          });
          return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });
    },

    watchesByUUID: function(req, res) {
      var keys = parseDates( [req.params.uuid], req.params );
      db.view('watches', 'byUUID', {
        reduce: true,
        group_level: 4,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        console.log( body || err );
        if (!err) {
          body.rows.forEach(function(doc) {
          });
          return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });
    },

    trafficByUUID: function (req, res) {
      /*var accessLog = require('../models/accessLog-mongo');
      accessLog.findByPath(req.params, function (err, list) {
        return res.json({ok: true, results: list });
      });*/
      var keys = parseDates( [req.params.uuid], req.params );
      usage_db.view('usage', 'byUUID', {
        reduce: true,
        group_level: 4,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        console.log( body || err );
        if (!err) {
          body.rows.forEach(function(doc) {
          });
          return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });
    },

    trafficByIp: function(req, res) {
      var keys = parseDates( [req.params.ip], req.params );
      usage_db.view('usage', 'byIP', {
        reduce: true,
        group_level: 4,
        startkey: keys.startkey,
        endkey: keys.endkey
      }, function(err, body) {
        console.log( body || err );
        if (!err) {
          body.rows.forEach(function(doc) {
          });
          return res.json({ok: true, results: body.rows });
        }
        return res.json({error: true, message: err });
      });
    }
  };
}

var getClientAddress = function (req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
};

var parseDates = function( baseKey, params ) {
  var filter = {};
  if (params.startDate) {
    var start = new Date( params.startDate );
    filter.startkey = baseKey.concat( [start.getFullYear(), start.getMonth()+1, start.getDate()] );
  }
  if (params.endDate) {
    var end = new Date( params.endDate );
    filter.endkey = baseKey.slice().concat( [end.getFullYear(), end.getMonth()+1, end.getDate(), {} ] );
  }
  return filter;
};

module.exports = Models;