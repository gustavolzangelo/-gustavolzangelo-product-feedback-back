import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { ProductFeedbackCreateDto } from '@modules/product-feedback/types/dto/product-feedback-create.dto'
import { ProductFeedbackFilterDto } from '@modules/product-feedback/types/dto/product-feedback-filter.dto'
import { ProductFeedbackUpdateDto } from '@modules/product-feedback/types/dto/product-feedback-update.dto'
import { ProductFeedbackDto } from '@modules/product-feedback/types/dto/product-feedback.dto'

export interface IProductFeedbackService {
  create(params: {
    productFeedbackCreateDto: ProductFeedbackCreateDto
  }): Promise<ProductFeedbackDto>

  findAll(params: {
    productFeedbackFilterDTO: ProductFeedbackFilterDto
  }): Promise<IResultsSet<ProductFeedbackDto>>

  updateOne(params: {
    productFeedbackId: string
    productFeedbackUpdateDto: ProductFeedbackUpdateDto
  }): Promise<ProductFeedbackDto | void>

  deleteOne(params: {
    productFeedbackId: string
  }): Promise<ProductFeedbackDto | void>
}
