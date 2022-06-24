import { PrismaModule } from '@common/prisma/prisma.module'
import { LikeController } from '@modules/like/like.controller'
import { LikeMapper } from '@modules/like/like.mapper'
import { LikeRepository } from '@modules/like/like.repository'
import { LikeService } from '@modules/like/like.service'
import { LikeIdentifiers } from '@modules/like/types/consts/likes-identifiers.const'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [LikeController],
  providers: [
    {
      provide: LikeIdentifiers.ILikeService,
      useClass: LikeService,
    },
    {
      provide: LikeIdentifiers.ILikeRepository,
      useClass: LikeRepository,
    },
    LikeMapper,
  ],
})
export class LikeModule {}
