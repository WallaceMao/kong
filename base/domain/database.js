const Sequelize = require('sequelize')
const config = require('config')

const dataSource = config.get('dataSource')

const database = new Sequelize(
  dataSource.database,
  dataSource.username,
  dataSource.password,
  {
    host: dataSource.host,
    dialect: dataSource.dialect,
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci'
      }
      },
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  });

module.exports = database