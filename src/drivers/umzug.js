'use strict'

const Umzug = require('umzug')
const sequelize = require('./sequelize')
const config = require('../config').umzug
const path = require('path')

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },

  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor, // DataTypes
      () => {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        )
      },
    ],
    path: path.join(__dirname, '../migrations'),
    pattern: /\.js$/,
  },

  logging: config.logging,
})

module.exports.umzugUp = () => {
  return umzug.up()
}

module.exports.umzugDown = () => {
  return umzug.down({ to: 0 })
}
