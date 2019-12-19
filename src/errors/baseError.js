'use strict'
const prettyError = require('pretty-error')
const _ = require('lodash')

const pe = prettyError.start()
pe.withoutColors()

/**
 * Base error class of the payment system, all error should extends from this or you should
 * catch and re-throw to our custom error
 */
class BaseError extends Error {
  constructor(statusCode, categoryCode, errorCode, message, err = '', data = null) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = categoryCode * 100 + errorCode
    this.data = data
    if (err instanceof Error) {
      this.details = pe.render(err)
    } else {
      this.details = err.toString()
    }
  }

  toJson() {
    const errorObj = {
      error: {
        code: this.code,
        name: this.name,
        message: this.message,
        details: this.details,
      },
    }
    if (!_.isNil(this.data)) {
      errorObj.error.data = this.data
    }
    return errorObj
  }

  toString() {
    return `statusCode=${this.statusCode}, errorCode=${this.code}, message=${this.message}, details=${this.details}`
  }
}

module.exports = BaseError
