import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class BaseFilterDTO {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 1))
  pageNumber?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 10))
  itemsPerPage?: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.split(','))
  sort?: string[]
}
