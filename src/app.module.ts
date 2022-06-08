import authConfig from '@common/config/auth.config'
import commonConfig from '@common/config/common.config'
import { ExceptionsFilter } from '@common/exceptions/exception.filter'
import { EnvelopeInterceptor } from '@common/interceptors/envelope.interceptor'
import { PrismaModule } from '@common/prisma/prisma.module'
import { CsrfModule } from '@modules/csrf/csrf.module'
import { UserAuthenticatedGuard } from '@modules/user/guards/user-authenticated.guard'
import { UserModule } from '@modules/user/user.module'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, authConfig],
    }),
    PrismaModule,
    UserModule,
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
