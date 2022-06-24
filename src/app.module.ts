import authConfig from '@common/config/auth.config'
import commonConfig from '@common/config/common.config'
import { ExceptionsFilter } from '@common/exceptions/exception.filter'
import { EnvelopeInterceptor } from '@common/interceptors/envelope.interceptor'
import { PrismaModule } from '@common/prisma/prisma.module'
import { CommentModule } from '@modules/comment/comment.module'
import { CsrfModule } from '@modules/csrf/csrf.module'
import { LikeModule } from '@modules/like/like.module'
import { ProductFeedbackModule } from '@modules/product-feedback/product-feedback.module'
import { UserAuthenticatedGuard } from '@modules/user/guards/user-authenticated.guard'
import { UserModule } from '@modules/user/user.module'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${
        process.env.BUILD_ENV === 'prd'
          ? '.env'
          : '.env.' + process.env.BUILD_ENV
      }`,
      load: [commonConfig, authConfig],
    }),
    PrismaModule,
    UserModule,
    ProductFeedbackModule,
    LikeModule,
    CommentModule,
    CsrfModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAuthenticatedGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EnvelopeInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
