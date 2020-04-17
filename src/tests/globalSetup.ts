require('tsconfig-paths/register')
import fixtures from './fixtures'

export default async () => {
  console.log('running global setup: clear the database')
  await fixtures.truncateModel()
  console.log('finish clear the database')
}
