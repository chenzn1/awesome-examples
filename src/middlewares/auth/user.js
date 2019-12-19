const { adminService } = require('../../services')
const { VerificationError } = require('../../errors')
module.exports = async (req, res, next) => {
  const { userId, token } = req.auth
  const admin = await adminService.getAdminById(userId)
  if (token !== admin.token) {
    throw new VerificationError()
  }
  req.admin = admin
  return next()
}
