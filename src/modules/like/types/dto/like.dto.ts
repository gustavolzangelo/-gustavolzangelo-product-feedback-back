import { Expose } from 'class-transformer'

export class LikeDTO {
  @Expose() id: string
  @Expose() userId: string
  @Expose() productFeedbackId: string
}
