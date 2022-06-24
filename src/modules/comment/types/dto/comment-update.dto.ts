import { PartialType } from '@nestjs/mapped-types'
import { CommentCreateDTO } from './comment-create.dto'

export class CommentUpdateDTO extends PartialType(CommentCreateDTO) {}
