'use strict'
import swagger from 'swagger-tools'

// const env = require('utils/env')
export default {
  generateMiddlewares(config, extra = []) {
    return new Promise(resolve => {
      swagger.initializeMiddleware(config.definitions, middleware => {
        const middlewareList = [middleware.swaggerMetadata(), ...extra]
        // turn off validateResponse since our resp don't really follow
        middlewareList.push(middleware.swaggerValidator({ validateResponse: false }))

        middlewareList.push(middleware.swaggerRouter(config.routerConfig))
        // if (env.isDev() || env.isTest()) {
        middlewareList.push(middleware.swaggerUi(config.uiConfig))
        // }
        resolve(middlewareList)
      })
    })
  },
}
