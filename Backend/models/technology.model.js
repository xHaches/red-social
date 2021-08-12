const {DataTypes, Model} = require('sequelize')
const sequelize = require('../db/connection')


const Technology = sequelize.define('Technologies', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    
  },{
    timestamps: false,
    createdAt: false,
    updateAt: false
})

module.exports = Technology;