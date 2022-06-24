import { _getCurrentDate } from '@common/misc/utils'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { CommentMapper } from '@modules/comment/comment.mapper'
import { CommentIdentifiers } from '@modules/comment/types/consts/comment-identifiers'
import { CommentCreateDTO } from '@modules/comment/types/dto/comment-create.dto'
import { CommentFilterDTO } from '@modules/comment/types/dto/comment-filter.dto'
import { CommentUpdateDTO } from '@modules/comment/types/dto/comment-update.dto'
import { CommentDTO } from '@modules/comment/types/dto/comment.dto'
import { ICommentEntity } from '@modules/comment/types/interfaces/comment-entity.interface'
import { ICommentRepository } from '@modules/comment/types/interfaces/comment-repository.interface'
import { ICommentService } from '@modules/comment/types/interfaces/comment-service.interface'
import { Inject } from '@nestjs/common'

export class CommentService implements ICommentService {
  constructor(
    @Inject(CommentIdentifiers.ICommentRepository)
    private commentRepository: ICommentRepository,

    @Inject(CommentMapper)
    private commentMapper: CommentMapper
  ) {}
  async create(params: {
    commentCreateDTO: CommentCreateDTO
  }): Promise<CommentDTO> {
    const { commentCreateDTO } = params

    const commentEntity = <ICommentEntity>{
      ...commentCreateDTO,
      createdAt: _getCurrentDate(),
      modifiedAt: _getCurrentDate(),
    }
    const commentCreated = await this.commentRepository.create({
      commentEntity,
    })

    return this.commentMapper.toDTO({
      commentEntity: commentCreated,
    })
  }

  async findAll(params: {
    commentFilterDTO: CommentFilterDTO
  }): Promise<IResultsSet<CommentDTO>> {
    const result = await this.commentRepository.findAll({
      commentFilterDTO: params.commentFilterDTO,
    })

    return {
      pagination: result.pagination,
      items: await Promise.all(
        result.items.map((comment) =>
          this.commentMapper.toDTO({
            commentEntity: comment,
          })
        )
      ),
    }
  }

  async updateOne(params: {
    commentId: string
    commentUpdateDTO: CommentUpdateDTO
  }): Promise<CommentDTO | void> {
    const commentSearched = this.commentRepository.findOne({
      commentFilterDTO: {
        commentIds: [...params.commentId],
      },
    })

    if (commentSearched) {
      return
    }

    const commentEntity = <ICommentEntity>{
      ...params.commentUpdateDTO,
      modifiedAt: _getCurrentDate(),
    }

    return this.commentRepository.updateOne({
      commentId: params.commentId,
      commentEntity,
    })
  }

  async deleteOne(params: { commentId: string }): Promise<CommentDTO | void> {
    const commentSearched = this.commentRepository.findOne({
      commentFilterDTO: {
        commentIds: [...params.commentId],
      },
    })

    if (commentSearched) {
      return
    }

    return this.commentRepository.deleteOne({
      commentId: params.commentId,
    })
  }
}
