import { UserModel } from 'models'
import { UserResponse } from 'interfaces/user'
function getUserResponse(user: UserModel): UserResponse {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.getTime(),
    updatedAt: user.updatedAt.getTime(),
  }
}
export { getUserResponse }
