global.cleanData = true
global.loadFixtures = false
import { UniqueConstraintError } from 'sequelize'
import { UserModel } from '..'
describe('User Model', () => {
  test('create user success', async () => {
    const exampleData = {
      username: 'user1',
      password: 'xxx',
      passwordSalt: 'xxxx',
    }

    const result = await UserModel.create(exampleData)
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
    await expect(UserModel.create(exampleData)).rejects.toThrow(UniqueConstraintError)
  })
})
