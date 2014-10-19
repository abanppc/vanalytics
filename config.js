module.exports = {
    server_port: 3000,

    username: "aban" || process.env.QMERY_MYSQL_DB_USERNAME,
    password: "aban" || process.env.QMERY_MYSQL_DB_PASSWORD,
    database: "vanalytics" || process.env.QMERY_APP_NAME,
    host    : "127.0.0.1" || process.env.QMERY_MYSQL_DB_HOST,
    port    : 3306 || process.env.QMERY_MYSQL_DB_PORT,
    forceSchema: false,

    mongo: {
        host: "185.49.84.58",
        username: "rlogUser",
        password: "rlogPass",
        db: "syslog"
    }
};