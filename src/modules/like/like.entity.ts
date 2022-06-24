import { ILikeEntity } from '@modules/like/types/interfaces/like-entity.interface'

export class LikeEntity implements ILikeEntity {
  id: string
  userId: string
  productFeedbackId: string
  createdAt: Date
  modifiedAt: Date
}
