const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('usuarios',{
        nombre : {
            type: DataTypes.STRING
        },
        email : {
            type: DataTypes.STRING
        },
        celular : {
            type: DataTypes.STRING
        }
    })
}