import { PrismaModule } from '@common/prisma/prisma.module'
import { ProductFeedbackController } from '@modules/product-feedback/product-feedback.controller'
import { ProductFeedbackMapper } from '@modules/product-feedback/product-feedback.mapper'
import { ProductFeedbackRepository } from '@modules/product-feedback/product-feedback.repository'
import { ProductFeedbackService } from '@modules/product-feedback/product-feedback.service'
import { ProductFeedbackIdentifiers } from '@modules/product-feedback/types/consts/product-feedback-identifiers.const'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [ProductFeedbackController],
  providers: [
    {
      provide: ProductFeedbackIdentifiers.IProductFeedbackService,
      useClass: ProductFeedbackService,
    },
    {
      provide: ProductFeedbackIdentifiers.IProductFeedbackRepository,
      useClass: ProductFeedbackRepository,
    },
    ProductFeedbackMapper,
  ],
})
export class ProductFeedbackModule {}
