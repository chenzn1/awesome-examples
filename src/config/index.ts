import defaultConfig from './config.default'
import developmentConfig from './config.development'
import productionConfig from './config.production'

let config = {}
switch (process.env.EFF_NODE_CONFIG_ENV) {
  case 'development':
    config = developmentConfig
    break
  case 'production':
    config = productionConfig
    break
}
export default {
  ...defaultConfig,
  ...config,
}
