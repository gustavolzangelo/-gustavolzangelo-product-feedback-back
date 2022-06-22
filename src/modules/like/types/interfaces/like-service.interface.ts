import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { LikeCreateDTO } from '@modules/like/types/dto/like-create.dto'
import { LikeFilterDTO } from '@modules/like/types/dto/like-filter.dto'
import { LikeUpdateDTO } from '@modules/like/types/dto/like-update.dto'
import { LikeDTO } from '@modules/like/types/dto/like.dto'

export interface ILikeService {
  create(params: { likeCreateDTO: LikeCreateDTO }): Promise<LikeDTO>
  findAll(params: {
    likeFilterDTO: LikeFilterDTO
  }): Promise<IResultsSet<LikeDTO>>
  updateOne(params: {
    likeId: string
    likeUpdateDTO: LikeUpdateDTO
  }): Promise<LikeDTO | void>
  deleteOne(params: { likeId: string }): Promise<LikeDTO | void>
}
