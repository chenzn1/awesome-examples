import { envParser } from '@/utils'
import logger from 'utils/logger'

const credentials = envParser(__dirname, '../../', '.env')

export default {
  database: {
    database: credentials.DB_DATABASE,
    username: credentials.DB_USER,
    password: credentials.DB_PASSWORD,
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
    port: credentials.DB_PORT,
    host: credentials.DB_HOST,
  },
  umzug: {
    logging: str => {
      logger.info(str)
    },
  },
}
