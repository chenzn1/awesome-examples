const clientHandlers = {
  async createUser(req, res) {
    res.json({ h: 1 })
  },
  async loginUser(req, res) {
    res.json({ h: 2 })
  },
}

module.exports = {
  ...clientHandlers,
}
