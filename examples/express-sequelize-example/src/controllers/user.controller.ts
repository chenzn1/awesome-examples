import { userService } from 'services'
import { Request, Response } from 'interfaces/http'

export default {
  registerUser(req: Request, res: Response) {
    const { username, password } = req.swagger.params.user.value
    return userService.registerUser({ username, password })
  },
}
