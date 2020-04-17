import { RegisterUserRequest } from 'interfaces/user'
import { User } from 'models'
import { UserExistError, ValidationError } from '@/errors'

class UserRegisterValidator {
  public request: RegisterUserRequest
  constructor(request: RegisterUserRequest) {
    this.request = request
  }
  public async username() {
    const { username } = this.request
    const user = await User.findOne({ where: { username } })
    if (user) {
      throw new UserExistError(username)
    }
  }
  public password(): UserRegisterValidator {
    const { password } = this.request

    if (password.length < 6) {
      throw new ValidationError('密码字符长度要大于5')
    }
    return this
  }
  public async validate() {
    await this.password().username()
  }
}

export default (request: RegisterUserRequest) => new UserRegisterValidator(request)
