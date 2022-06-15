const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('lugares',{
        nombre : {
            type: DataTypes.STRING
        }
    },
    {timestamps:false})
}