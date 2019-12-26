import { BaseError } from './baseError'

// class 300: NotFound Error
class NotFoundError extends BaseError {
  constructor(errorCode, message, err = '') {
    super(400, 103, errorCode, message, err)
  }
}

class UserNotFoundError extends NotFoundError {
  constructor(id) {
    super(1, `找不到管理员（${id}）`)
  }
}

export { UserNotFoundError }
