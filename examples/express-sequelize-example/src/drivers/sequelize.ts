import { Sequelize } from 'sequelize'
import config from '../config'
import _ from 'lodash'

const options: any = config.database
const sequelize = new Sequelize(options)
export default sequelize
