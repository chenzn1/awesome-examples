export interface UserResponse {
  id: number
  username: string
  createdAt: number
  updatedAt: number
}

export interface RegisterUserRequest {
  username: string
  password: string
}
