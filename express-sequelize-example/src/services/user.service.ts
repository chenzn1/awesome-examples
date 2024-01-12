import { UserModel } from 'models'
import { RegisterUserRequest, UserResponse } from 'interfaces/user'
import userRegisterValidator from '@/validators/user-register.validator'
import { getUserResponse } from '@/transforms'
import utils from '@/utils'
import randomstring from 'randomstring'

export default {
  async registerUser(request: RegisterUserRequest): Promise<UserResponse> {
    await userRegisterValidator(request).validate()

    const { username, password } = request
    const passwordSalt = randomstring.generate(32)
    const user = await UserModel.create({
      username,
      passwordSalt,
      password: utils.getEncryptedPassword(password, passwordSalt),
    })
    return getUserResponse(user)
  },
}
