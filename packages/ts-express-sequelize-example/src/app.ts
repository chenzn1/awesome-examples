import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import * as errors from 'errors'
import errorHandler from 'middlewares/error'
import authRouter from 'middlewares/auth'
import controllerFunc from 'controllers'
logger.token('ip', (req, res): string => {
  //req.headers['x-forwarded-for'] ||
  return req.ip || req.connection.remoteAddress
})

async function loadMainControllers(app) {
  const commonSwaggerMiddlewares = [authRouter]
  const middleware = await controllerFunc(commonSwaggerMiddlewares)
  app.use(middleware)
}

export async function createAPIServer() {
  const app = express()
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  // app.use(logger('dev'))
  app.use(bodyParser.json({}))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    //
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, express-fast-framework-auth-schema'
    )
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS')

    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  })
  await loadMainControllers(app)
  app.use(errorHandler.genericSwaggerErrorHandler)
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(new errors.ResourceNotFoundError(req))
  })
  app.use(errorHandler.generalErrorHandler)
  return app
}
