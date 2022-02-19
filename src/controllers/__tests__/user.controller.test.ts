import request from '@/tests/supertest.helper'
import { userService } from 'services'

let app = null
jest.mock('services/user.service')

const mockedUserService = userService as jest.Mocked<typeof userService>
describe('UserController', () => {
  beforeAll(async () => {
    app = await require('@/app').default.createAPIServer()
  })
  const fakeUserResp: any = {
    id: 1,
    username: 'xxx',
  }
  test('Endpoint POST /api/v1.0/user/register', async () => {
    expect(200).toBe(200)
    mockedUserService.registerUser.mockResolvedValueOnce(fakeUserResp)
    const req = {
      username: 'xxxx',
      password: 'password',
    }
    const response: any = await request(app)
      .post('/api/v1.0/user/register')
      .send(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeUserResp)
    expect(mockedUserService.registerUser).toHaveBeenCalledTimes(1)
    expect(mockedUserService.registerUser).toBeCalledWith(req)
  })
})
