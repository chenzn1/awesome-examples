require('tsconfig-paths/register')
import sequelize from 'drivers/sequelize'
export default async function teardown() {
  try {
    await sequelize.close()
    console.log('finish global teardown')
  } catch (error) {
    console.log('global teardown error', error)
  }
}
