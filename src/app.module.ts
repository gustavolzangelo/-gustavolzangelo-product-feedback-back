import authConfig from '@common/config/auth.config'
import commonConfig from '@common/config/common.config'
import { UserModule } from '@modules/user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './common/prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, authConfig],
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
