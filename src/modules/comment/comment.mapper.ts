import { CommentDTO } from '@modules/comment/types/dto/comment.dto'
import { ICommentEntity } from '@modules/comment/types/interfaces/comment-entity.interface'
import { instanceToPlain, plainToInstance } from 'class-transformer'

export class CommentMapper {
  async toDTO(params: { commentEntity: ICommentEntity }): Promise<CommentDTO> {
    return plainToInstance(CommentDTO, instanceToPlain(params.commentEntity), {
      excludeExtraneousValues: true,
    })
  }
}
