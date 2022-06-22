import { _getCurrentDate } from '@common/misc/utils'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { LikeMapper } from '@modules/like/like.mapper'
import { LikeIdentifiers } from '@modules/like/types/consts/likes-identifiers.const'
import { LikeCreateDTO } from '@modules/like/types/dto/like-create.dto'
import { LikeFilterDTO } from '@modules/like/types/dto/like-filter.dto'
import { LikeUpdateDTO } from '@modules/like/types/dto/like-update.dto'
import { LikeDTO } from '@modules/like/types/dto/like.dto'
import { ILikeEntity } from '@modules/like/types/interfaces/like-entity.interface'
import { ILikeRepository } from '@modules/like/types/interfaces/like-repository.interface'
import { ILikeService } from '@modules/like/types/interfaces/like-service.interface'
import { Inject } from '@nestjs/common'

export class LikeService implements ILikeService {
  constructor(
    @Inject(LikeIdentifiers.ILikeRepository)
    private likeRepository: ILikeRepository,

    @Inject(LikeMapper)
    private likeMapper: LikeMapper
  ) {}
  async create(params: { likeCreateDTO: LikeCreateDTO }): Promise<LikeDTO> {
    const { likeCreateDTO } = params

    const likeEntity = <ILikeEntity>{
      ...likeCreateDTO,
      createdAt: _getCurrentDate(),
      modifiedAt: _getCurrentDate(),
    }
    const likeCreated = await this.likeRepository.create({
      likeEntity,
    })

    return this.likeMapper.toDTO({
      likeEntity: likeCreated,
    })
  }

  async findAll(params: {
    likeFilterDTO: LikeFilterDTO
  }): Promise<IResultsSet<LikeDTO>> {
    const result = await this.likeRepository.findAll({
      likeFilterDTO: params.likeFilterDTO,
    })

    return {
      pagination: result.pagination,
      items: await Promise.all(
        result.items.map((like) =>
          this.likeMapper.toDTO({
            likeEntity: like,
          })
        )
      ),
    }
  }

  async updateOne(params: {
    likeId: string
    likeUpdateDTO: LikeUpdateDTO
  }): Promise<LikeDTO | void> {
    const likeSearched = this.likeRepository.findOne({
      likeFilterDTO: {
        likeIds: [...params.likeId],
      },
    })

    if (likeSearched) {
      return
    }

    const likeEntity = <ILikeEntity>{
      ...params.likeUpdateDTO,
      modifiedAt: _getCurrentDate(),
    }

    return this.likeRepository.updateOne({
      likeId: params.likeId,
      likeEntity,
    })
  }

  async deleteOne(params: { likeId: string }): Promise<LikeDTO | void> {
    const likeSearched = this.likeRepository.findOne({
      likeFilterDTO: {
        likeIds: [...params.likeId],
      },
    })

    if (likeSearched) {
      return
    }

    return this.likeRepository.deleteOne({
      likeId: params.likeId,
    })
  }
}
