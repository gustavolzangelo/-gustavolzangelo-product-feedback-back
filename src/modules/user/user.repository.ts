import { _calcLimitAndOffset, _pagination } from '@common/misc/utils'
import { PrismaService } from '@common/prisma/prisma.service'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
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
  }): Promise<IResultsSet<UserEntity>> {
    const { emails, userIds, usernames, itemsPerPage, pageNumber, sort } =
      params.userFilterDTO

    const sortObject = {}
    if (sort) {
      sort.forEach((sortValue) => {
        sortObject[sortValue.replace('-', '')] = sortValue.includes('-')
          ? 'desc'
          : 'asc'
      })
    }

    const { page, limit, skip } = _calcLimitAndOffset({
      itemsPerPage,
      pageNumber,
    })

    const usersFound = await this.prisma.user.findMany({
      where: {
        ...(userIds && {
          id: { in: userIds },
        }),
        ...(emails && {
          email: { in: emails },
        }),
        ...(usernames && {
          username: { in: usernames },
        }),
      },
      take: limit,
      skip,
      orderBy: sortObject,
    })

    const totalItems = await this.prisma.user.count({
      where: {
        ...(userIds && {
          id: { in: userIds },
        }),
        ...(emails && {
          email: { in: emails },
        }),
        ...(usernames && {
          username: { in: usernames },
        }),
      },
    })

    const pagination = _pagination({
      itemsInPage: usersFound.length,
      limit,
      page,
      totalItems,
    })

    return {
      items: usersFound,
      ...(totalItems && { pagination }),
    }
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
