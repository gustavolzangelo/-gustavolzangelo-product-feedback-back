import { _calcLimitAndOffset, _pagination } from '@common/misc/utils'
import { PrismaService } from '@common/prisma/prisma.service'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { LikeFilterDTO } from '@modules/like/types/dto/like-filter.dto'
import { ILikeEntity } from '@modules/like/types/interfaces/like-entity.interface'
import { ILikeRepository } from '@modules/like/types/interfaces/like-repository.interface'

export class LikeRepository implements ILikeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    likeFilterDTO: LikeFilterDTO
  }): Promise<IResultsSet<ILikeEntity>> {
    const {
      likeIds,
      productFeedbackIds,
      userIds,
      itemsPerPage,
      pageNumber,
      sort,
    } = params.likeFilterDTO

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

    const likesFound = await this.prisma.like.findMany({
      where: {
        ...(likeIds && {
          id: { in: likeIds },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
        ...(productFeedbackIds && {
          productFeedbackId: { in: productFeedbackIds },
        }),
      },
      take: limit,
      skip,
      orderBy: sortObject,
    })

    const totalItems = await this.prisma.like.count({
      where: {
        ...(likeIds && {
          id: { in: likeIds },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
        ...(productFeedbackIds && {
          productFeedbackId: { in: productFeedbackIds },
        }),
      },
    })

    const pagination = _pagination({
      itemsInPage: likesFound.length,
      limit,
      page,
      totalItems,
    })

    return {
      items: likesFound,
      ...(totalItems && { pagination }),
    }
  }

  async findOne(params: {
    likeFilterDTO: LikeFilterDTO
  }): Promise<ILikeEntity> {
    const { likeIds, productFeedbackIds, userIds } = params.likeFilterDTO

    return this.prisma.like.findFirst({
      where: {
        ...(likeIds && {
          id: { in: likeIds },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
        ...(productFeedbackIds && {
          productFeedbackId: { in: productFeedbackIds },
        }),
      },
    })
  }

  async create(params: { likeEntity: ILikeEntity }): Promise<ILikeEntity> {
    return this.prisma.like.create({
      data: { ...params.likeEntity },
    })
  }

  async deleteOne(params: { likeId: string }): Promise<ILikeEntity> {
    return this.prisma.like.delete({
      where: { id: params.likeId },
    })
  }

  async updateOne(params: {
    likeId: string
    likeEntity: ILikeEntity
  }): Promise<ILikeEntity> {
    return this.prisma.like.update({
      data: { ...params.likeEntity },
      where: { id: params.likeId },
    })
  }
}
