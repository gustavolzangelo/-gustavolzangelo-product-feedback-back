import { User } from '@prisma/client'

export class UserEntity implements User {
  id: string
  email: string
  username: string
  password: string
  name: string
  surname: string
  createdAt: Date
}
