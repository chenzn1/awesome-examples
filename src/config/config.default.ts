import { envParser } from '@/utils'
import logger from 'utils/logger'

const credentials = envParser(__dirname, '../../', '.env')

export default {
  database: {
    database: credentials.DB_DATABASE || 'express_fast_frameword',
    username: credentials.DB_USER || 'general-user',
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
    port: credentials.DB_PORT || '3306',
    host: credentials.DB_HOST || '127.0.0.1',
  },
  umzug: {
    logging: str => {
      logger.info(str)
    },
  },
}
