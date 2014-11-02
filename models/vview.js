/**
 * Created by behrad on 10/7/14.
 */

module.exports = function(sequelize, DataTypes) {

    return sequelize.define("VView", {

        uuid: DataTypes.STRING,
        file: DataTypes.STRING,
        ip: DataTypes.STRING,
        clientTime: DataTypes.DATE,
        position: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
        countryCode: DataTypes.STRING,
        city: DataTypes.STRING,
        region: DataTypes.STRING,
        quality: DataTypes.STRING,
        isFlash: DataTypes.BOOLEAN

    })

};