import swaggerCombine from 'swagger-combine'
import _ from 'lodash'
import asyncHelper from './async.helper'
import swaggerErrorExtractor from './swagger-error.extractor'

async function _generateSwaggerConfig(basePath, swaggerYAML, wrappedRoutes) {
  const definitions = await swaggerCombine(swaggerYAML)
  // replace basePath
  definitions.basePath = basePath
  delete definitions.host

  return {
    definitions,
    routerConfig: {
      controllers: wrappedRoutes,
    },
    uiConfig: {
      apiDocs: `${basePath}/api-docs`,
    },
  }
}

async function generateSwaggerConfig(basePath, swaggerYAMLPath, routes, options = {}) {
  const wrappedRoutes = {}
  _.forEach(routes, (ctrlRoutes, ctrlName) => {
    _.forEach(ctrlRoutes, (handler, handlerName) => {
      const compositeKey = `${ctrlName}_${handlerName}`
      wrappedRoutes[compositeKey] = asyncHelper(handler)
    })
  })
  // generate swagger config
  return _generateSwaggerConfig(basePath, swaggerYAMLPath, wrappedRoutes)
}

export default {
  generateSwaggerConfig,
  errorExtractor: swaggerErrorExtractor,
}
