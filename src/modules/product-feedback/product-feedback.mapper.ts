import { ProductFeedbackEntity } from '@modules/product-feedback/product-feedback.entity'
import { ProductFeedbackDto } from '@modules/product-feedback/types/dto/product-feedback.dto'
import { instanceToPlain, plainToInstance } from 'class-transformer'

export class ProductFeedbackMapper {
  async toDto(params: {
    productFeedbackEntity: ProductFeedbackEntity
  }): Promise<ProductFeedbackDto> {
    return plainToInstance(
      ProductFeedbackDto,
      instanceToPlain(params.productFeedbackEntity),
      {
        excludeExtraneousValues: true,
      }
    )
  }
}
