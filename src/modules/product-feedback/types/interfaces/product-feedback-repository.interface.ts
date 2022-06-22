import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { ProductFeedbackEntity } from '@modules/product-feedback/product-feedback.entity'
import { ProductFeedbackFilterDto } from '@modules/product-feedback/types/dto/product-feedback-filter.dto'
import { IProductFeedbackEntity } from '@modules/product-feedback/types/interfaces/product-feedback-entity.interface'

export interface IProductFeedbackRepository {
  findAll(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IResultsSet<IProductFeedbackEntity>>

  findOne(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IProductFeedbackEntity>

  create(params: {
    productFeedbackEntity: ProductFeedbackEntity
  }): Promise<IProductFeedbackEntity>

  deleteOne(params: {
    productFeedbackId: string
  }): Promise<IProductFeedbackEntity>

  updateOne(params: {
    productFeedbackId: string
    productFeedbackEntity: IProductFeedbackEntity
  }): Promise<IProductFeedbackEntity>
}
