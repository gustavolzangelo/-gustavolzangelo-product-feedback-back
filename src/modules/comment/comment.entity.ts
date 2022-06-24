import { ICommentEntity } from '@modules/comment/types/interfaces/comment-entity.interface'

export class CommentEntity implements ICommentEntity {
  id: string
  comment: string
  userId: string
  productFeedbackId: string | null
  createdAt: Date
  modifiedAt: Date
}
