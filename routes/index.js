/**
 * Created by behrad on 10/7/14.
 */
// My module
function Models(orm) {
//    console.log( "=================== ORM ", orm.VViewTest.create );
  return {
    index: function (req, res) {
      res.json({ ok: true, status: "سلامت و سرافراز" });
    },
    create: function (req, res) {
      orm.VView.create({
        ip: getClientAddress(req),
        clientTime: req.body.clientTime,
        position: req.body.position,
        duration: req.body.duration,
        isFlash: req.body.isFlash,
        file: req.body.file,
        type: req.body.type,
        quality: req.body.quality,
        uuid: req.body.uuid
      }).on('success', function (viewLog) {
//                console.log( "Halle: ", viewLog );
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
      }
      if (req.params.startDate || req.params.endDate) {
        filter.createdAt = { between: [req.params.startDate, req.params.endDate] }
      }
      orm.VView.findAndCountAll({
        attributes: [
          [orm.Sequelize.fn('count', orm.Sequelize.col('*')), 'count'],
          ['position', 'position']
        ],
        where: filter,
        group: 'position'
      }).then(function (views) {
        return res.json({ok: true, results: views });
      });
    },
    //select avg(p) from (select MAX(position) as p,uuid,ip from VViews where uuid="uuid" group by uuid, ip) as test;

    viewsByPath: function (req, res) {
      console.log("===========================================================\n" +
          "Query params %j and string %j \n" +
          "===========================================================", req.params, req.query);
      var filter = { position: 0 };
      if (req.params.file) {
        filter.file = req.params.file;
      } else if (req.params.uuid) {
        filter.uuid = req.params.uuid;
      }
      if (req.params.startDate || req.params.endDate) {
        filter.createdAt = { between: [req.params.startDate, req.params.endDate] }
      }
      orm.VView.findAndCountAll({
        attributes: [
          [orm.Sequelize.fn('count', orm.Sequelize.col('*')), 'count'],
          ['DATE(createdAt)', 'date']
        ],
        where: filter,
        order: 'createdAt DESC',
        group: 'DATE(createdAt)'
      }).then(function (views) {
        return res.json({ok: true, results: views });
      });
    },

    trafficByPath: function (req, res) {
      var accessLog = require('../models/accessLog-mongo');
      accessLog.findByPath(req.params, function (err, list) {
        return res.json({ok: true, results: list });
      });
    }
  };
}

var getClientAddress = function (req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
};

module.exports = Models;