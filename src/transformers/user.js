const _ = require('lodash')
module.exports = {
  getUserResponse(user, isShowToken = false) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      token: isShowToken && user.token ? user.token : null,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }
  },
}
