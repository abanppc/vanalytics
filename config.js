module.exports = {

  server_port: process.env.VANALYTICS_PORT || 3000,
  app_path   : process.env.VANALYTICS_PATH || '/analytics',

  host    : process.env.VANALYTICS_MYSQL_DB_HOST || "127.0.0.1",
  database: process.env.VANALYTICS_MYSQL_DB || "vanalytics",
  username: process.env.VANALYTICS_MYSQL_DB_USERNAME || "aban",
  password: process.env.VANALYTICS_MYSQL_DB_PASSWORD || "aban",
  port    : process.env.VANALYTICS_MYSQL_DB_PORT || 3306,
  forceSchema: false,

  mongo: {
    host    : process.env.VANALYTICS_MONGO_HOST || "79.175.174.20",
    db      : process.env.VANALYTICS_MONGO_DB || "syslog",
    username: process.env.VANALYTICS_MONGO_USER || "rlogUser",
    password: process.env.VANALYTICS_MONGO_PASS || "rlogPass"
  }
};