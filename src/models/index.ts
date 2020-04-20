import sequelize from '../drivers/sequelize'
import { User, initUser } from './User'

// init model
;[initUser].forEach(initFunc => initFunc(sequelize))

export { sequelize, User }
