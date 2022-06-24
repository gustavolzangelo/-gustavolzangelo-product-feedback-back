import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { CommentCreateDTO } from '@modules/comment/types/dto/comment-create.dto'
import { CommentFilterDTO } from '@modules/comment/types/dto/comment-filter.dto'
import { CommentUpdateDTO } from '@modules/comment/types/dto/comment-update.dto'
import { CommentDTO } from '@modules/comment/types/dto/comment.dto'

export interface ICommentService {
  create(params: { commentCreateDTO: CommentCreateDTO }): Promise<CommentDTO>
  findAll(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<IResultsSet<CommentDTO>>
  updateOne(params: {
    commentId: string
    commentUpdateDTO: CommentUpdateDTO
  }): Promise<CommentDTO | void>
  deleteOne(params: { commentId: string }): Promise<CommentDTO | void>
}
