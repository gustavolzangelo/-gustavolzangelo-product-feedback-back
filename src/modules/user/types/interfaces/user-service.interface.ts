import { UserJwtDTO } from '@modules/user/types/dto/user-jwt.dto'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'
import { UserLoginDto } from '@modules/user/types/dto/user-login.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { UserDTO } from '@modules/user/types/dto/user.dto'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { UserFilterDTO } from '../dto/user-filter.dto'

export interface IUserService {
  findAll(params: {
    userFilterDTO: UserFilterDTO
  }): Promise<IResultsSet<UserDTO>>
  create(params: { userCreateDto: UserCreateDto }): Promise<UserDTO>
  deleteOne(params: { userId: string }): Promise<UserDTO | void>
  updateOne(params: {
    userId: string
    userUpdateDto: UserUpdateDto
  }): Promise<UserDTO | void>
  login(params: { userLoginDto: UserLoginDto }): Promise<UserJwtDTO>
}
