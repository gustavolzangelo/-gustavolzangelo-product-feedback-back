import { PublicRoute } from '@common/decorators/is-public-route.decorator'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { CommentIdentifiers } from '@modules/comment/types/consts/comment-identifiers'
import { CommentCreateDTO } from '@modules/comment/types/dto/comment-create.dto'
import { CommentFilterDTO } from '@modules/comment/types/dto/comment-filter.dto'
import { CommentUpdateDTO } from '@modules/comment/types/dto/comment-update.dto'
import { CommentDTO } from '@modules/comment/types/dto/comment.dto'
import { ICommentService } from '@modules/comment/types/interfaces/comment-service.interface'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'

@Controller('comments')
export class CommentController {
  constructor(
    @Inject(CommentIdentifiers.ICommentService)
    private commentService: ICommentService
  ) {}

  @PublicRoute()
  @Post()
  async create(
    @Body() commentCreateDTO: CommentCreateDTO
  ): Promise<CommentDTO> {
    return this.commentService.create({
      commentCreateDTO,
    })
  }

  @PublicRoute()
  @Get()
  async findAll(
    @Query() commentFilterDTO: CommentFilterDTO
  ): Promise<IResultsSet<CommentDTO>> {
    return this.commentService.findAll({
      commentFilterDTO,
    })
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() commentUpdateDTO: CommentUpdateDTO
  ): Promise<CommentDTO> {
    const comment = await this.commentService.updateOne({
      commentId: id,
      commentUpdateDTO,
    })

    if (!comment) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }

    res.status(HttpStatus.OK)
    return comment
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ) {
    const comment = await this.commentService.deleteOne({
      commentId: id,
    })
    if (!comment) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }
    res.status(HttpStatus.OK)
  }
}
