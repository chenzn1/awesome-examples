// import { InvalidAuthHeaderError } from 'errors'

export default (req, res, next) => {
  if (!req.swagger) {
    return next()
  }
  return next()
  // const [schema] = req.swagger.path['x-auth-schema']
  // if (schema === AUTH_SCHEMA.PUBLIC) {
  //   return next()
  // }
  // const token = req.headers['express-sequelize-example-auth-token']
  // const userId = req.headers['express-sequelize-example-auth-id']
  // if (!token || !userId) {
  //   throw new InvalidAuthHeaderError()
  // }
  // req.auth = { token, userId }
  // return userVerifier(req, res, next)
}
