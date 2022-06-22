import { PublicRoute } from '@common/decorators/is-public-route.decorator'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
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
import { LikeIdentifiers } from './types/consts/likes-identifiers.const'
import { LikeCreateDTO } from './types/dto/like-create.dto'
import { LikeFilterDTO } from './types/dto/like-filter.dto'
import { LikeUpdateDTO } from './types/dto/like-update.dto'
import { LikeDTO } from './types/dto/like.dto'
import { ILikeService } from './types/interfaces/like-service.interface'

@Controller('likes')
export class LikeController {
  constructor(
    @Inject(LikeIdentifiers.ILikeService)
    private likeService: ILikeService
  ) {}

  @PublicRoute()
  @Post()
  async create(@Body() likeCreateDTO: LikeCreateDTO): Promise<LikeDTO> {
    return this.likeService.create({
      likeCreateDTO,
    })
  }

  @PublicRoute()
  @Get()
  async findAll(
    @Query() likeFilterDTO: LikeFilterDTO
  ): Promise<IResultsSet<LikeDTO>> {
    return this.likeService.findAll({
      likeFilterDTO,
    })
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() likeUpdateDTO: LikeUpdateDTO
  ): Promise<LikeDTO> {
    const like = await this.likeService.updateOne({
      likeId: id,
      likeUpdateDTO,
    })

    if (!like) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }

    res.status(HttpStatus.OK)
    return like
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ) {
    const like = await this.likeService.deleteOne({
      likeId: id,
    })
    if (!like) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }
    res.status(HttpStatus.OK)
  }
}
