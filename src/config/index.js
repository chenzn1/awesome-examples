const defaultConfig = require('./config.default')
const devConfig = require('./config.dev')
const prodConfig = require('./config.prod')

let config = {}
switch (process.env.HODGEPODGE_ENV) {
  case 'dev':
    config = devConfig
    break
  case 'prod':
    config = prodConfig
    break
}
module.exports = {
  ...defaultConfig,
  ...config,
}
