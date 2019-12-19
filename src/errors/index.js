const BaseError = require('./baseError')
const GenericError = require('./genericError')
const AuthError = require('./authError')
const ExistError = require('./existError')
const NotFoundError = require('./notFoundError')

module.exports = {
  BaseError,
  ...AuthError,
  ...GenericError,
  ...NotFoundError,
  ...ExistError,
}
