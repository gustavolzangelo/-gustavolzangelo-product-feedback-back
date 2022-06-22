import { BaseFilterDTO } from '@common/types/dto/base-filter.dto'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

export class LikeFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  likeIds?: string[]

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
}
