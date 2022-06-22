import { BaseFilterDTO } from '@common/types/dto/base-filter.dto'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

export class ProductFeedbackFilterDto extends BaseFilterDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  productFeedbackIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  userIds?: string[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  productFeedbackTitle?: string[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  productFeedbackCategories?: string[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  productFeedbackUpdateStatus?: string[]
}
