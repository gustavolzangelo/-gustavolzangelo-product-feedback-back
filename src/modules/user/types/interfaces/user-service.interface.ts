import { AccountJwtDTO } from '@modules/user/types/dto/account-jwt.dto'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'
import { UserLoginDto } from '@modules/user/types/dto/user-login.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { UserDTO } from '@modules/user/types/dto/user.dto'

export interface IUserService {
  findAll(): Promise<UserDTO[]>
  create(params: { userCreateDto: UserCreateDto }): Promise<UserDTO>
  deleteOne(params: { userId: string }): Promise<UserDTO>
  updateOne(params: {
    userId: string
    userUpdateDto: UserUpdateDto
  }): Promise<UserDTO>
  login(params: { userLoginDto: UserLoginDto }): Promise<AccountJwtDTO>
}
