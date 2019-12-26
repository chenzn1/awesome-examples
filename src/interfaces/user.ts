export interface UserResponse {
  id: number
  nickname: string
  username: string
  token?: string
}

export interface CreateAndUpdateUserRequest {
  nickname: string
  password?: string
}
