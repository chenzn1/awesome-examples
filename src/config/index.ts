import defaultConfig from './config.default'
import devConfig from './config.dev'
import prodConfig from './config.prod'

let config = {}
switch (process.env.HODGEPODGE_ENV) {
  case 'dev':
    config = devConfig
    break
  case 'prod':
    config = prodConfig
    break
}
export default {
  ...defaultConfig,
  ...config,
}
