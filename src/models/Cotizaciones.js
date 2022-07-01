const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('cotizaciones',{
        origenId :{
            type: DataTypes.INTEGER
        },
        destinoId :{
            type: DataTypes.INTEGER
        },
        fechaSalida : {
            type: DataTypes.DATEONLY
        },
        costo : {
            type: DataTypes.INTEGER
        },
        detalleCarga : {
            type: DataTypes.STRING
        }
    },
    {timestamps:false})
}