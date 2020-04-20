import request from 'tests/supertestHelper'
import { userService } from 'services'

let app = null
jest.mock('services/userService')

beforeAll(async () => {
  app = await require('app').default.createApiServer()
})

const mockedUserService = userService as jest.Mocked<typeof userService>
describe('UserController', () => {
  const fakeUserResp: any = {
    id: 1,
    username: 'xxx',
  }
  test('Endpoint GET /api/v1.0/client/user/register', async () => {
    mockedUserService.registerUser.mockResolvedValueOnce(fakeUserResp)
    const req = {
      username: 'xxxx',
      password: 'password',
    }
    const response: any = await request(app)
      .post('/api/v1.0/client/user/register')
      .send(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeUserResp)
    expect(mockedUserService.registerUser).toHaveBeenCalledTimes(1)
    expect(mockedUserService.registerUser).toBeCalledWith(req)
  })
})
