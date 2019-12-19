const { AUTH_SCHEMA } = require('../../enums/schemas')
const userVerifier = require('./user')
const { InvalidAuthHeaderError } = require('../../errors')

module.exports = (req, res, next) => {
  if (!req.swagger) {
    return next()
  }
  const [schema] = req.swagger.path['x-auth-schema']
  if (schema === AUTH_SCHEMA.PUBLIC) {
    return next()
  }
  const token = req.headers['hodgepodge-auth-token']
  const userId = req.headers['hodgepodge-auth-id']
  if (!token || !userId) {
    throw new InvalidAuthHeaderError()
  }
  req.auth = { token, userId }
  return userVerifier(req, res, next)
}
