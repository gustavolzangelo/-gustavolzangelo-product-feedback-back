import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

export class UserFilterDTO {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => value.split(','))
  userIds?: string[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  emails?: string[]

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  usernames?: string[]
}
