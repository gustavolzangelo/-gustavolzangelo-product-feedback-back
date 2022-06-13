import { _getCurrentDate } from '@common/misc/utils'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { IUserRepository } from '@modules/user/types/interfaces/user-repository.interface'
import { IUserService } from '@modules/user/types/interfaces/user-service.interface'
import { UserEntity } from '@modules/user/user.entity'
import { UserMapper } from '@modules/user/user.mapper'
import { UserService } from '@modules/user/user.service'
import { JwtPassportStrategy } from '@modules/utils/jwt-strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

describe('UsersService', () => {
  let userService: IUserService
  let userRepository: IUserRepository
  const mockUserRepository: IUserRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserIdentifiers.IUserMapper, useClass: UserMapper },
      ],
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          // TODO: use private-public key pair instead simple string secret
          useFactory: (config: ConfigService) => config.get('auth'),
        }),
      ],
    })
      .useMocker((token) => {
        if (token === UserIdentifiers.IUserRepository) {
          return mockUserRepository
        }
        if (token === JwtPassportStrategy) {
          return null
        }
      })
      .compile()

    userService = module.get<IUserService>(UserService)
    userRepository = module.get<IUserRepository>(
      UserIdentifiers.IUserRepository
    )
  })

  it('should be defined', async () => {
    const result: UserEntity[] = [
      {
        id: 'string',
        email: 'string',
        username: 'string',
        password: 'string',
        name: 'string',
        surname: 'string',
        createdAt: _getCurrentDate(),
      },
    ]
    jest
      .spyOn(userRepository, 'findAll')
      .mockImplementation(() => Promise.resolve(result))

    expect(await userService.findAll()).toBe(result)
  })
})
