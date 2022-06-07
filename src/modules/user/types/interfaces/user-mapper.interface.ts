import { UserDTO } from '@modules/user/types/dto/user.dto'
import { User } from '@prisma/client'

export interface IUserMapper {
  toDto(params: { user: User }): Promise<UserDTO>
}
