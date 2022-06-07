import { UserDTO } from '@modules/user/types/dto/user.dto'
import { IUserMapper } from '@modules/user/types/interfaces/user-mapper.interface'
import { User } from '@prisma/client'
import { instanceToPlain, plainToInstance } from 'class-transformer'

export class UserMapper implements IUserMapper {
  async toDto(params: { user: User }): Promise<UserDTO> {
    return plainToInstance(UserDTO, instanceToPlain(params.user), {
      excludeExtraneousValues: true,
    })
  }
}
