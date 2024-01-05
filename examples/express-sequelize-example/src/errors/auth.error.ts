import { BaseError } from './base.error'
class AuthError extends BaseError {
  constructor(statusCode, errorCode, message, err = '', data = null) {
    super(statusCode, 101, errorCode, message, err, data)
  }
}

class InvalidAuthHeaderError extends AuthError {
  constructor() {
    super(401, 1, 'Invalid header')
  }
}

class VerificationError extends AuthError {
  constructor() {
    super(401, 2, '登陆失效，请重新登陆')
  }
}

class AccessError extends AuthError {
  constructor() {
    super(401, 3, `您没有权限访问`)
  }
}

class AdminUsernameOrPasswordError extends AuthError {
  constructor() {
    super(401, 4, `账号或者密码错误`)
  }
}

class UnRegisterError extends AuthError {
  constructor() {
    super(401, 5, `您还没注册，请先注册`)
  }
}

export {
  InvalidAuthHeaderError,
  VerificationError,
  AccessError,
  AdminUsernameOrPasswordError,
  UnRegisterError,
}
