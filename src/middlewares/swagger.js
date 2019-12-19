'use strict'

const swagger = require('swagger-tools')
const asyncHelper = require('../helpers/asyncHelper')

// const env = require('utils/env')

module.exports.generateMiddlewares = function(config, extra = []) {
  return new Promise(resolve => {
    swagger.initializeMiddleware(config.definitions, middleware => {
      const middlewareList = []
      middlewareList.push(middleware.swaggerMetadata())
      extra.forEach(middleware => {
        middlewareList.push(asyncHelper(middleware))
      })
      // turn off validateResponse since our resp don't really follow
      middlewareList.push(middleware.swaggerValidator({ validateResponse: false }))

      middlewareList.push(middleware.swaggerRouter(config.routerConfig))
      // if (env.isDev() || env.isTest()) {
      middlewareList.push(middleware.swaggerUi(config.uiConfig))
      // }
      resolve(middlewareList)
    })
  })
}
