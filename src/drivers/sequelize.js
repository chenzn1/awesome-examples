'use strict'

const Sequelize = require('sequelize')
const config = require('../config').database

module.exports = new Sequelize(config)
