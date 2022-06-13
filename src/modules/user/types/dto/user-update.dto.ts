import { PartialType } from '@nestjs/mapped-types'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'

export class UserUpdateDto extends PartialType(UserCreateDto) {}
