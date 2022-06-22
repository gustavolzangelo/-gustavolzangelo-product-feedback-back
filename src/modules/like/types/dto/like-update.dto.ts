import { LikeCreateDTO } from '@modules/like/types/dto/like-create.dto'
import { PartialType } from '@nestjs/mapped-types'

export class LikeUpdateDTO extends PartialType(LikeCreateDTO) {}
