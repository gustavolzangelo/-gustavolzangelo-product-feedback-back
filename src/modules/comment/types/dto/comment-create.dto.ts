import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CommentCreateDTO {
  @IsString()
  @IsNotEmpty()
  comment: string

  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  productFeedbackId: string
}
