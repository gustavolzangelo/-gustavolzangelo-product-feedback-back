import { BaseFilterDTO } from '@common/types/dto/base-filter.dto'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

export class CommentFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  commentIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  userIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  productFeedbackIds?: string[]
}
