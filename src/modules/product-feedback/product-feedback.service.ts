import { _getCurrentDate } from '@common/misc/utils'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { ProductFeedbackMapper } from '@modules/product-feedback/product-feedback.mapper'
import { ProductFeedbackIdentifiers } from '@modules/product-feedback/types/consts/product-feedback-identifiers.const'
import { ProductFeedbackCreateDto } from '@modules/product-feedback/types/dto/product-feedback-create.dto'
import { ProductFeedbackFilterDto } from '@modules/product-feedback/types/dto/product-feedback-filter.dto'
import { ProductFeedbackUpdateDto } from '@modules/product-feedback/types/dto/product-feedback-update.dto'
import { ProductFeedbackDto } from '@modules/product-feedback/types/dto/product-feedback.dto'
import { IProductFeedbackEntity } from '@modules/product-feedback/types/interfaces/product-feedback-entity.interface'
import { IProductFeedbackRepository } from '@modules/product-feedback/types/interfaces/product-feedback-repository.interface'
import { IProductFeedbackService } from '@modules/product-feedback/types/interfaces/product-feedback-service.interface.dto'
import { Inject } from '@nestjs/common'

export class ProductFeedbackService implements IProductFeedbackService {
  constructor(
    @Inject(ProductFeedbackIdentifiers.IProductFeedbackRepository)
    private productFeedbackRepository: IProductFeedbackRepository,

    @Inject(ProductFeedbackMapper)
    private productFeedbackMapper: ProductFeedbackMapper
  ) {}
  async create(params: {
    productFeedbackCreateDto: ProductFeedbackCreateDto
  }): Promise<ProductFeedbackDto> {
    const { productFeedbackCreateDto } = params

    const productFeedbackEntity = <IProductFeedbackEntity>{
      ...productFeedbackCreateDto,
      createdAt: _getCurrentDate(),
      modifiedAt: _getCurrentDate(),
    }
    const productFeedbackCreated = await this.productFeedbackRepository.create({
      productFeedbackEntity,
    })

    return this.productFeedbackMapper.toDto({
      productFeedbackEntity: productFeedbackCreated,
    })
  }

  async findAll(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IResultsSet<ProductFeedbackDto>> {
    const result = await this.productFeedbackRepository.findAll({
      productFeedbackFilterDTO: params.productFeedbackFilterDTO,
    })

    return {
      pagination: result.pagination,
      items: await Promise.all(
        result.items.map((productFeedback) =>
          this.productFeedbackMapper.toDto({
            productFeedbackEntity: productFeedback,
          })
        )
      ),
    }
  }

  async updateOne(params: {
    productFeedbackId: string
    productFeedbackUpdateDto: ProductFeedbackUpdateDto
  }): Promise<ProductFeedbackDto | void> {
    const productFeedbackSearched = this.productFeedbackRepository.findOne({
      productFeedbackFilterDTO: {
        productFeedbackIds: [...params.productFeedbackId],
      },
    })

    if (productFeedbackSearched) {
      return
    }

    const productFeedbackEntity = <IProductFeedbackEntity>{
      ...params.productFeedbackUpdateDto,
      modifiedAt: _getCurrentDate(),
    }

    return this.productFeedbackRepository.updateOne({
      productFeedbackId: params.productFeedbackId,
      productFeedbackEntity,
    })
  }

  async deleteOne(params: {
    productFeedbackId: string
  }): Promise<ProductFeedbackDto | void> {
    const productFeedbackSearched = this.productFeedbackRepository.findOne({
      productFeedbackFilterDTO: {
        productFeedbackIds: [...params.productFeedbackId],
      },
    })

    if (productFeedbackSearched) {
      return
    }

    return this.productFeedbackRepository.deleteOne({
      productFeedbackId: params.productFeedbackId,
    })
  }
}
