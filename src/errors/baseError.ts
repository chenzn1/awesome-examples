'use strict'
const prettyError = require('pretty-error')
const _ = require('lodash')

const pe = prettyError.start()
pe.withoutColors()

/**
 * Base error class of the payment system, all error should extends from this or you should
 * catch and re-throw to our custom error
 */
export default class BaseError extends Error {
  private statusCode: number
  private code: number
  private data: any
  private details: string
  constructor(
    statusCode: number,
    categoryCode: number,
    errorCode: number,
    message: string,
    err: any,
    data: any = null
  ) {
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
    const errorObj: any = {
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
