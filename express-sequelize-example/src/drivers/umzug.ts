'use strict'
import Umzug from 'umzug'
import path from 'path'
import sequelize from './sequelize'
import config from '../config'
import _ from 'lodash'

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      () => {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        )
      },
    ],
    path: path.join(__dirname, '../migrations'),
    pattern: /\.js$/,
  },
  logging: config.umzug.logging,
})

export default {
  umzugUp() {
    return umzug.up()
  },
  umzugDown() {
    return umzug.down({ to: 0 })
  },
}
