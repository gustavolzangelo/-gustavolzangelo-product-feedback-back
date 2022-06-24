import { PrismaModule } from '@common/prisma/prisma.module'
import { CommentController } from '@modules/comment/comment.controller'
import { CommentMapper } from '@modules/comment/comment.mapper'
import { CommentRepository } from '@modules/comment/comment.repository'
import { CommentService } from '@modules/comment/comment.service'
import { CommentIdentifiers } from '@modules/comment/types/consts/comment-identifiers'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [CommentController],
  providers: [
    {
      provide: CommentIdentifiers.ICommentService,
      useClass: CommentService,
    },
    {
      provide: CommentIdentifiers.ICommentRepository,
      useClass: CommentRepository,
    },
    CommentMapper,
  ],
})
export class CommentModule {}
