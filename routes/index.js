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
      if (req.params.startDate || req.params.endDate) {
        filter.createdAt = { between: [req.params.startDate, req.params.endDate] };
      }
      db.view('traffic', 'byUser', {
        reduce: true,
        group_level: 2,
        startkey: [filter.uuid, filter.userid ],
        endkey: [filter.uuid, filter.userid, {}]
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
      if (req.params.startDate || req.params.endDate) {
        filter.createdAt = { between: [req.params.startDate, req.params.endDate] }
      }
      db.view('traffic', 'byUser', {
        reduce: true,
        group_level: 2,
        startkey: [filter.uuid ],
        endkey: [filter.uuid, {}]
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
      db.view('watches', 'byUser', {
        reduce: true,
        group_level: 4,
        startkey: [req.params.uuid,req.params.userid],
        endkey: [req.params.uuid, req.params.userid, {}]
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
      db.view('watches', 'byUUID', {
        reduce: true,
        group_level: 4,
        startkey: [req.params.uuid],
        endkey: [req.params.uuid, {}]
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
      usage_db.view('usage', 'byUUID', {
        reduce: true,
        group_level: 4,
        startkey: [req.params.uuid],
        endkey: [req.params.uuid, {}]
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
      usage_db.view('usage', 'byIP', {
        reduce: true,
        group_level: 4,
        startkey: [req.params.ip],
        endkey: [req.params.ip, {}]
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

module.exports = Models;