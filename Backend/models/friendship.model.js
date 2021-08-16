const {DataTypes, Model} = require('sequelize')
const sequelize = require('../db/connection')

const Friendship = sequelize.define('Friendships', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_friend : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
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
    accepted : {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },

    
  },{
    timestamps: false,
    createdAt: false,
    updateAt: false
})

module.exports = Friendship;