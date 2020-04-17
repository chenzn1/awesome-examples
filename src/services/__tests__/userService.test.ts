global.cleanData = true
import { RegisterUserRequest } from 'interfaces/user'
import { userService } from 'services'
import { UserExistError } from '@/errors'

describe('UserService', () => {
  describe('Register User', () => {
    test('register user success', async () => {
      const request: RegisterUserRequest = {
        username: 'user1',
        password: '123456',
      }
      const user = await userService.registerUser(request)
      expect(user.username).toEqual(request.username)
    })

    test('register user failed', async () => {
      const request: RegisterUserRequest = {
        username: 'user1',
        password: '123456',
      }
      await expect(userService.registerUser(request)).rejects.toThrowError(UserExistError)
    })
  })
})
