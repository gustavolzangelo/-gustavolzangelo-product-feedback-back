import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { UserFilterDTO } from '@modules/user/types/dto/user-filter.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { UserEntity } from '@modules/user/user.entity'

export interface IUserRepository {
  findAll(params: {
    userFilterDTO: UserFilterDTO
  }): Promise<IResultsSet<UserEntity>>
  findOne(params: { userFilterDTO: UserFilterDTO }): Promise<UserEntity>
  create(params: { userEntity: UserEntity }): Promise<UserEntity>
  deleteOne(params: { userId: string }): Promise<UserEntity>
  updateOne(params: {
    userId: string
    userData: UserUpdateDto
  }): Promise<UserEntity>
}
