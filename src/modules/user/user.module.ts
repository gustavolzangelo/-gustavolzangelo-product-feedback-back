import { PrismaModule } from '@common/prisma/prisma.module'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { UserController } from '@modules/user/user.controller'
import { UserMapper } from '@modules/user/user.mapper'
import { UserRepository } from '@modules/user/user.repository'
import { UserService } from '@modules/user/user.service'
import { JwtPassportStrategy } from '@modules/utils/jwt-strategy'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // TODO: use private-public key pair instead simple string secret
      useFactory: (config: ConfigService) => config.get('auth'),
    }),
  ],
  controllers: [UserController],
  providers: [
    { provide: UserIdentifiers.IUserService, useClass: UserService },
    { provide: UserIdentifiers.IUserRepository, useClass: UserRepository },
    { provide: UserIdentifiers.IUserMapper, useClass: UserMapper },
    JwtPassportStrategy,
  ],
})
export class UserModule {}
