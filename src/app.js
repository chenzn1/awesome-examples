const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/error')
const authRouter = require('./middlewares/auth')
const errors = require('./errors')
const payController = require('./controllers/payController')
const xmlparser = require('express-xml-bodyparser')

logger.token('ip', function(req, res) {
  return req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress
})

async function loadMainControllers(app) {
  const commonSwaggerMiddlewares = [authRouter]
  const middleware = await require('./controllers')(commonSwaggerMiddlewares)
  app.use(middleware)
}

module.exports = {
  async createApiServer() {
    const app = express()
    // uncomment after placing your favicon in /public
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
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, hodgepodge-auth-token, hodgepodge-auth-id'
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
  },
}
