import { LikeDTO } from '@modules/like/types/dto/like.dto'
import { ILikeEntity } from '@modules/like/types/interfaces/like-entity.interface'
import { instanceToPlain, plainToInstance } from 'class-transformer'

export class LikeMapper {
  async toDTO(params: { likeEntity: ILikeEntity }): Promise<LikeDTO> {
    return plainToInstance(LikeDTO, instanceToPlain(params.likeEntity), {
      excludeExtraneousValues: true,
    })
  }
}
