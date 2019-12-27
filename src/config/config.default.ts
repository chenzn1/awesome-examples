import logger from 'helpers/logger'
import env from '../../env.json'

export default {
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
  },
  umzug: {
    logging: str => {
      logger.info(str)
    },
  },
}
