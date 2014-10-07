module.exports = {
    server_port: 3000,

    username: "aban" || process.env.QMERY_MYSQL_DB_USERNAME,
    password: "aban" || process.env.QMERY_MYSQL_DB_PASSWORD,
    database: "test" || process.env.QMERY_APP_NAME,
    host    : "172.16.35.102" || process.env.QMERY_MYSQL_DB_HOST,
    port    : 3306 || process.env.QMERY_MYSQL_DB_PORT,
    forceSchema: false
};