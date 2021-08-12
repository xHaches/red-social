const {DataTypes, Model} = require('sequelize')
const sequelize = require('../db/connection')


const User = sequelize.define('Users', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    studies: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    languages: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    linkedin: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    hobbies: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
       
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
       
    },
  },{
    timestamps: false,
    createdAt: false,
    updateAt: false
})

module.exports = User;