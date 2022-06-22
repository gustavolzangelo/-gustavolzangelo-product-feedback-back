import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { LikeFilterDTO } from '@modules/like/types/dto/like-filter.dto'
import { ILikeEntity } from '@modules/like/types/interfaces/like-entity.interface'

export interface ILikeRepository {
  findAll(params: {
    likeFilterDTO: LikeFilterDTO
  }): Promise<IResultsSet<ILikeEntity>>
  findOne(params: { likeFilterDTO: LikeFilterDTO }): Promise<ILikeEntity>
  create(params: { likeEntity: ILikeEntity }): Promise<ILikeEntity>
  deleteOne(params: { likeId: string }): Promise<ILikeEntity>
  updateOne(params: {
    likeId: string
    likeEntity: ILikeEntity
  }): Promise<ILikeEntity>
}
