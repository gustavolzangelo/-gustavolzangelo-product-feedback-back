import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { CommentFilterDTO } from '@modules/comment/types/dto/comment-filter.dto'
import { ICommentEntity } from '@modules/comment/types/interfaces/comment-entity.interface'

export interface ICommentRepository {
  findAll(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<IResultsSet<ICommentEntity>>
  findOne(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<ICommentEntity>
  create(params: { commentEntity: ICommentEntity }): Promise<ICommentEntity>
  deleteOne(params: { commentId: string }): Promise<ICommentEntity>
  updateOne(params: {
    commentId: string
    commentEntity: ICommentEntity
  }): Promise<ICommentEntity>
}
