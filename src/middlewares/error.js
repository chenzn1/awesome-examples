const logger = require('../helpers/logger')
const errors = require('../errors')

const _ = require('lodash')
const fastRedact = require('fast-redact')
const Sequelize = require('sequelize')

const swaggerHelper = require('../helpers/swaggerHelper')

const redact = fastRedact({
  paths: ['*.userPIN'],
  serialize: false,
})

function getReqParams(req) {
  return redact(
    _(req)
      .chain()
      .get('swagger.params', {})
      .cloneDeep()
      .mapValues(val => val.value)
      .value()
  )
}

module.exports = {
  getReqParams, // export for easier test case
  generalErrorHandler(err, req, res, next) {
    // Wrap sequelize validation errors
    if (err instanceof Sequelize.ValidationError) {
      err = new errors.ValidationError(err.message)
    }

    let e = null
    if (err && err instanceof errors.BaseError) {
      logger.info(
        'known errors - %s|user:%j|params:%j',
        err,
        req.users || req.user,
        getReqParams(req)
      )
      e = err
    } else {
      e = new errors.UnknownServerError(err)
      logger.error(
        'unknown errors - %s|details:%s|user:%j|params:%j',
        err,
        e.details,
        req.users || req.user,
        getReqParams(req)
      )
    }
    res.status(e.statusCode).json(e.toJson())
  },
  genericSwaggerErrorHandler(err, req, res, next) {
    if (err.failedValidation) {
      const { message, details } = swaggerHelper.errorExtractor(err)
      return next(new errors.SwaggerValidationError(message, details))
    }
    if (res.statusCode === 405) {
      return next(new errors.MethodNotAllowedError(err))
    }

    return next(err)
  },
}
