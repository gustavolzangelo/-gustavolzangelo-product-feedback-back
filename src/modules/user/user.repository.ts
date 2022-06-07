import { PrismaService } from '@common/prisma/prisma.service'
import { UserFilterDTO } from '@modules/user/types/dto/user-filter.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { IUserRepository } from '@modules/user/types/interfaces/user-repository.interface'
import { UserEntity } from '@modules/user/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    userFilterDTO: UserFilterDTO
  }): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      where: {
        ...(params.userFilterDTO.userIds && {
          id: { in: params.userFilterDTO.userIds },
        }),
      },
    })
  }

  async findOne(params: { userFilterDTO: UserFilterDTO }): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        ...(params.userFilterDTO.userIds && {
          id: { in: params.userFilterDTO.userIds },
        }),
        ...(params.userFilterDTO.emails && {
          email: { in: params.userFilterDTO.emails },
        }),
        ...(params.userFilterDTO.usernames && {
          username: { in: params.userFilterDTO.usernames },
        }),
      },
    })
  }

  async create(params: { userEntity: UserEntity }): Promise<UserEntity> {
    return this.prisma.user.create({ data: { ...params.userEntity } })
  }

  async deleteOne(params: { userId: string }): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id: params.userId } })
  }

  async updateOne(params: {
    userId: string
    userData: UserUpdateDto
  }): Promise<UserEntity> {
    return this.prisma.user.update({
      data: { ...params.userData },
      where: { id: params.userId },
    })
  }
}
