import { Expose } from 'class-transformer'

export class ProductFeedbackDto {
  @Expose() id: string
  @Expose() title: string
  @Expose() category: string
  @Expose() updateStatus: string
  @Expose() detail: string
  @Expose() userId: string
  @Expose() createdAt: Date
  @Expose() modifiedAt: Date
}
