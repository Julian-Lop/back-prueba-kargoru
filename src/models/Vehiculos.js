const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('vehiculos',{
        nombre : {
            type: DataTypes.STRING
        }
    })
}