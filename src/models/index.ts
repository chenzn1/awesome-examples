import sequelize from '../drivers/sequelize'
import User from './User'

User.init2(sequelize)
export { sequelize, User }
