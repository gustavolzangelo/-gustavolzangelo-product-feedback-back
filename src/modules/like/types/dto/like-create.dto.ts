import { IsNotEmpty, IsUUID } from 'class-validator'

export class LikeCreateDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsUUID()
  productFeedbackId: string
}
