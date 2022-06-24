import { _calcLimitAndOffset, _pagination } from '@common/misc/utils'
import { PrismaService } from '@common/prisma/prisma.service'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { CommentFilterDTO } from '@modules/comment/types/dto/comment-filter.dto'
import { ICommentEntity } from '@modules/comment/types/interfaces/comment-entity.interface'
import { ICommentRepository } from '@modules/comment/types/interfaces/comment-repository.interface'

export class CommentRepository implements ICommentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<IResultsSet<ICommentEntity>> {
    const {
      commentIds,
      productFeedbackIds,
      userIds,
      itemsPerPage,
      pageNumber,
      sort,
    } = params.commentFilterDTO

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

    const commentsFound = await this.prisma.comment.findMany({
      where: {
        ...(commentIds && {
          id: { in: commentIds },
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

    const totalItems = await this.prisma.comment.count({
      where: {
        ...(commentIds && {
          id: { in: commentIds },
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
      itemsInPage: commentsFound.length,
      limit,
      page,
      totalItems,
    })

    return {
      items: commentsFound,
      ...(totalItems && { pagination }),
    }
  }

  async findOne(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<ICommentEntity> {
    const { commentIds, productFeedbackIds, userIds } = params.commentFilterDTO

    return this.prisma.comment.findFirst({
      where: {
        ...(commentIds && {
          id: { in: commentIds },
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

  async create(params: {
    commentEntity: ICommentEntity
  }): Promise<ICommentEntity> {
    return this.prisma.comment.create({
      data: { ...params.commentEntity },
    })
  }

  async deleteOne(params: { commentId: string }): Promise<ICommentEntity> {
    return this.prisma.comment.delete({
      where: { id: params.commentId },
    })
  }

  async updateOne(params: {
    commentId: string
    commentEntity: ICommentEntity
  }): Promise<ICommentEntity> {
    return this.prisma.comment.update({
      data: { ...params.commentEntity },
      where: { id: params.commentId },
    })
  }
}
