import { User } from 'models'
import { UserResponse } from 'interfaces/user'
function getUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.getTime(),
    updatedAt: user.updatedAt.getTime(),
  }
}
export { getUserResponse }
