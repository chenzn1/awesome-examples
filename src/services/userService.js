const { User } = require('../models')

module.exports = {
  async createUser(request) {
    const { username, nickname, password } = request
    const user = await User.create({ username, nickname, password })
    return user
  },
}
