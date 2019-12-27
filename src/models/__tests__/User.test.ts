global.cleanData = true
global.loadFixtures = false
import { UniqueConstraintError } from 'sequelize'
import { User } from '../'
describe('User Model', () => {
  test('create user success', async () => {
    const exampleData = {
      nickname: 'user model test',
      username: 'user1',
      password: 'xxx',
      passwordSalt: 'xxx',
    }

    const result = await User.create(exampleData)
    expect(result.nickname).toEqual(exampleData.nickname)
    expect(result.username).toEqual(exampleData.username)
    expect(result.password).toEqual(exampleData.password)
    expect(result.passwordSalt).toEqual(exampleData.passwordSalt)
  })

  test('create user faild/ UniqueConstraintError', async () => {
    const exampleData = {
      nickname: 'user model test',
      username: 'user1',
      password: 'xxx',
      passwordSalt: 'xxx',
    }
    await expect(User.create(exampleData)).rejects.toThrow(UniqueConstraintError)
  })
})
