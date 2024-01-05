import sequelize from '../drivers/sequelize'
import { UserModel, initUserModel } from './user.model'

// init model
;[initUserModel].forEach(initFunc => initFunc(sequelize))

export { sequelize, UserModel }
