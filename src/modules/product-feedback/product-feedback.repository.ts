import { _calcLimitAndOffset, _pagination } from '@common/misc/utils'
import { PrismaService } from '@common/prisma/prisma.service'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { ProductFeedbackFilterDto } from '@modules/product-feedback/types/dto/product-feedback-filter.dto'
import { IProductFeedbackEntity } from '@modules/product-feedback/types/interfaces/product-feedback-entity.interface'
import { IProductFeedbackRepository } from '@modules/product-feedback/types/interfaces/product-feedback-repository.interface'

export class ProductFeedbackRepository implements IProductFeedbackRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IResultsSet<IProductFeedbackEntity>> {
    const {
      productFeedbackIds,
      productFeedbackTitle,
      productFeedbackCategories,
      productFeedbackUpdateStatus,
      userIds,
      itemsPerPage,
      pageNumber,
      sort,
    } = params.productFeedbackFilterDTO

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

    const productFeedbacksFound = await this.prisma.productFeedback.findMany({
      where: {
        ...(productFeedbackIds && {
          id: { in: productFeedbackIds },
        }),
        ...(productFeedbackTitle && {
          title: { in: productFeedbackTitle },
        }),
        ...(productFeedbackCategories && {
          category: { in: productFeedbackCategories },
        }),
        ...(productFeedbackUpdateStatus && {
          updateStatus: { in: productFeedbackUpdateStatus },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
      },
      take: limit,
      skip,
      orderBy: sortObject,
    })

    const totalItems = await this.prisma.productFeedback.count({
      where: {
        ...(productFeedbackIds && {
          id: { in: productFeedbackIds },
        }),
        ...(productFeedbackTitle && {
          title: { in: productFeedbackTitle },
        }),
        ...(productFeedbackCategories && {
          category: { in: productFeedbackCategories },
        }),
        ...(productFeedbackUpdateStatus && {
          updateStatus: { in: productFeedbackUpdateStatus },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
      },
    })

    const pagination = _pagination({
      itemsInPage: productFeedbacksFound.length,
      limit,
      page,
      totalItems,
    })

    return {
      items: productFeedbacksFound,
      ...(totalItems && { pagination }),
    }
  }

  async findOne(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IProductFeedbackEntity> {
    const {
      productFeedbackIds,
      productFeedbackTitle,
      productFeedbackCategories,
      productFeedbackUpdateStatus,
      userIds,
    } = params.productFeedbackFilterDTO

    return this.prisma.productFeedback.findFirst({
      where: {
        ...(productFeedbackIds && {
          id: { in: productFeedbackIds },
        }),
        ...(productFeedbackTitle && {
          title: { in: productFeedbackTitle },
        }),
        ...(productFeedbackCategories && {
          category: { in: productFeedbackCategories },
        }),
        ...(productFeedbackUpdateStatus && {
          updateStatus: { in: productFeedbackUpdateStatus },
        }),
        ...(userIds && {
          userId: { in: userIds },
        }),
      },
    })
  }

  async create(params: {
    productFeedbackEntity: IProductFeedbackEntity
  }): Promise<IProductFeedbackEntity> {
    return this.prisma.productFeedback.create({
      data: { ...params.productFeedbackEntity },
    })
  }

  async deleteOne(params: {
    productFeedbackId: string
  }): Promise<IProductFeedbackEntity> {
    return this.prisma.productFeedback.delete({
      where: { id: params.productFeedbackId },
    })
  }

  async updateOne(params: {
    productFeedbackId: string
    productFeedbackEntity: IProductFeedbackEntity
  }): Promise<IProductFeedbackEntity> {
    return this.prisma.productFeedback.update({
      data: { ...params.productFeedbackEntity },
      where: { id: params.productFeedbackId },
    })
  }
}
