const Sequelize = require('sequelize');


const sequelize = new Sequelize('Red_Social', null, null, {
    dialect: 'mssql',
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      authentication: {
        type: 'default',
        options: {
          encrypt: true,
          userName: process.env.DB_USER,
          password: process.env.DB_PASS
        }
      },
    }
});
  
module.exports = sequelize;