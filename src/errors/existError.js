const BaseError = require('./baseError')

class ExistError extends BaseError {
  constructor(errorCode, message, err = '') {
    super(400, 104, errorCode, message, err)
  }
}

class UserExistError extends ExistError {
  constructor(username) {
    super(2, `用户（${username}）已存在`)
  }
}

module.exports = {
  UserExistError,
}
