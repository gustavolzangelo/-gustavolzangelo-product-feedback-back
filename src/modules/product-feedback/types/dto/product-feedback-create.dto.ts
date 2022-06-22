import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class ProductFeedbackCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  category: string

  @IsNotEmpty()
  @IsString()
  updateStatus: string

  @IsNotEmpty()
  @IsString()
  detail: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}
