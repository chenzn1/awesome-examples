const logger = require('../helpers/logger')
const env = require('../../env.json')

module.exports = {
  database: {
    database: env.database.database,
    username: env.database.username,
    password: env.database.password,
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
    },
    dialect: 'mysql',
    port: env.database.port,
    host: env.database.host,
    operatorsAliases: false,
  },
  umzug: {
    logging: str => {
      logger.info(str)
    },
  },
}
