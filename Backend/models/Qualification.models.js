const {DataTypes, Model} = require('sequelize')
const sequelize = require('../db/conexion')


const Qualification = sequelize.define('Qualification', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stars: {
        type: DataTypes.DECIMAL(1,1),
        allowNull: false,
    },
    id_technology : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Technologies',
            key: 'id'
        },
        allowNull: false,
    },
    id_user : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false,
    },
    
  },{
    timestamps: false,
    createdAt: false,
    updateAt: false
})

module.exports = Qualification;