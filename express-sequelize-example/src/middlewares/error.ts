import logger from 'utils/logger'
import * as errors from 'errors'
import _ from 'lodash'
import fastRedact from 'fast-redact'
import { ValidationError } from 'sequelize'
import swaggerHelper from '@/utils/swagger.helper'

const redact = fastRedact({
  paths: ['*.userPIN'],
  serialize: false,
})

function getRequestParams(req) {
  const params = _.get(req, 'swagger.params', {})
  return redact(
    _(params)
      .chain()
      // @ts-ignore
      .cloneDeep()
      .mapValues(val => val.value)
      .value()
  )
}

export default {
  getRequestParams, // export for easier test case
  generalErrorHandler(err, req, res, next) {
    // Wrap sequelize validation errors
    if (err instanceof ValidationError) {
      err = new errors.ValidationError(err.message)
    }

    let e = null
    if (err && err instanceof errors.BaseError) {
      logger.info(
        'known errors - %s|user:%j|params:%j',
        err,
        req.users || req.user,
        getRequestParams(req)
      )
      e = err
    } else {
      e = new errors.UnknownServerError(err)
      logger.error(
        'unknown errors - %s|details:%s|user:%j|params:%j',
        err,
        e.details,
        req.users || req.user,
        getRequestParams(req)
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
