module.exports = {

  server_port: process.env.VANALYTICS_PORT || 3000,
  app_path   : process.env.VANALYTICS_PATH || '/analytics',

  sysCouchLog: {
    port: process.env.SYSCOUCHLOG_PORT || 1514,
    filter_mime_types: [ 'mp4', 'flv', 'webm', 'ts' ]
  },

  host    : process.env.VANALYTICS_MYSQL_DB_HOST || "127.0.0.1",
  database: process.env.VANALYTICS_MYSQL_DB || "vanalytics",
  username: process.env.VANALYTICS_MYSQL_DB_USERNAME || "aban",
  password: process.env.VANALYTICS_MYSQL_DB_PASSWORD || "aban",
  port    : process.env.VANALYTICS_MYSQL_DB_PORT || 3306,
  forceSchema: false,

  couchdb: {
    host    : process.env.VANALYTICS_COUCH_HOST || "127.0.0.1",
    port    : process.env.VANALYTICS_COUCH_PORT || 5984,
    db      : process.env.VANALYTICS_COUCH_DB || "vanalytics", // database which video player client logs will be pushed to
    usage_db: process.env.VANALYTICS_COUCH_DB_USAGE || "access_log", // database which syslog access logs will be pushed to
    username: process.env.VANALYTICS_COUCH_USER || "aban",
    password: process.env.VANALYTICS_COUCH_PASS || "aban"
  },

  mongo: {
    host    : process.env.VANALYTICS_MONGO_HOST || "79.175.174.20",
    db      : process.env.VANALYTICS_MONGO_DB || "syslog",
    username: process.env.VANALYTICS_MONGO_USER || "rlogUser",
    password: process.env.VANALYTICS_MONGO_PASS || "rlogPass"
  }
};