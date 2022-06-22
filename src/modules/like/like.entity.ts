import { ILikeEntity } from './types/interfaces/like-entity.interface'

export class LikeEntity implements ILikeEntity {
  id: string
  userId: string
  productFeedbackId: string
}
