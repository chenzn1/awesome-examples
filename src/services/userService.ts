import { User } from 'models'
import { RegisterUserRequest, UserResponse } from 'interfaces/user'
import userRegisterValidator from 'validators/userRegisterValidator'
import { getUserResponse } from 'transformers/user'
import helpers from '@/helpers'
import randomstring from 'randomstring'

export default {
  async registerUser(request: RegisterUserRequest): Promise<UserResponse> {
    await userRegisterValidator(request).validate()

    const { username, password } = request
    const passwordSalt = randomstring.generate(32)
    const user = await User.create({
      username,
      passwordSalt,
      password: helpers.getEncryptedPassword(password, passwordSalt),
    })
    return getUserResponse(user)
  },
}
