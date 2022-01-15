import { BaseError } from './base.error'

// class 100: Generic error
class GenericError extends BaseError {
  constructor(statusCode, errorCode, message, err = '') {
    super(statusCode, 100, errorCode, message, err)
  }
}

class UnknownServerError extends GenericError {
  constructor(err) {
    super(500, 0, '服务器未知错误', err)
  }
}

class ValidationError extends GenericError {
  constructor(err) {
    super(400, 1, '请求验证错误', err)
  }
}

class MethodNotAllowedError extends GenericError {
  constructor(err) {
    super(405, 2, '请求方式不允许', err)
  }
}

class ResourceNotFoundError extends GenericError {
  constructor(req) {
    super(404, 3, `找不到资源:${req.method}:${req.path}`)
  }
}

class APINotImplementedError extends GenericError {
  constructor(path) {
    super(501, 4, `This endpoint exist but not implemented:${path}`)
  }
}

class NotImplementedError extends GenericError {
  constructor() {
    super(501, 5, `Not implemented!`)
  }
}

class SwaggerValidationError extends GenericError {
  constructor(message, details = '') {
    super(400, 6, message, details)
  }
}

export {
  UnknownServerError,
  ValidationError,
  MethodNotAllowedError,
  ResourceNotFoundError,
  APINotImplementedError,
  NotImplementedError,
  SwaggerValidationError,
}
