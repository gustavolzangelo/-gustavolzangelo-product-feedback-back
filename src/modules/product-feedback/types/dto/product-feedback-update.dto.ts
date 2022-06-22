import { PartialType } from '@nestjs/mapped-types'
import { ProductFeedbackCreateDto } from './product-feedback-create.dto'

export class ProductFeedbackUpdateDto extends PartialType(
  ProductFeedbackCreateDto
) {}
