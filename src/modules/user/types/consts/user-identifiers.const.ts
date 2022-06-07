import { CustomException } from '@common/exceptions/custom.exception'
import { HttpStatus } from '@nestjs/common'

export const UserIdentifiers = {
  UserEntity: 'UserEntity',
  IUserEntity: 'IUserEntity',
  IUserMapper: 'IUserMapper',
  IUserRepository: 'IUserRepository',
  IUserService: 'IUserService',

  JWT_AUTHENTICATION: 'JWT_AUTHENTICATION',

  EXCEPTIONS: {
    EMAIL_ALREADY_REGISTERED: () =>
      new CustomException({
        code: 'AUTH-USER-EMAIL_ALREADY_REGISTERED',
        message: 'Email is already registered',
      }),
    UNAUTHORIZED: () =>
      new CustomException({
        code: 'AUTH-USER-UNAUTHORIZED',
        message: 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
      }),
  },
}
