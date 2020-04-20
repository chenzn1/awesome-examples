require('tsconfig-paths/register')
import fixtures from './fixtures'
import umzug from 'drivers/umzug'

export default async () => {
  console.log('running global setup: clear the database')
  await umzug.umzugUp()
  await fixtures.truncateModel()
  console.log('finish clear the database')
}
