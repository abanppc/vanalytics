var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('./../config.js'),
    sequelize = new Sequelize(config.database, config.username, config.password, {
        dialect: 'mysql',
        host: config.host,
        port: config.port
    }),
    db = {},
    lodash = require('lodash');

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  })

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);