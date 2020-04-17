import data from './data'
import { sequelize, User } from '../../models'
async function truncateModel() {
  const models = [User]
  for (const model of models) {
    await model.destroy({ where: {}, force: true })
  }
}
async function resetAllIds() {
  try {
    await Promise.all([sequelize.query(`ALTER TABLE users AUTO_INCREMENT = 1;`)])
  } catch (error) {
    console.log(`reset auto incerment errors: ${error}`)
  }
}
export default {
  resetAllIds,
  truncateModel,
  async reloadFixtures() {
    await truncateModel()
    const returnData = {}
    if (data['users']) {
      returnData['users'] = await User.bulkCreate(data['users'])
    }
    return returnData
  },
}
