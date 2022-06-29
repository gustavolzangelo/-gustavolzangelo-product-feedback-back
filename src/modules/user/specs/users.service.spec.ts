import { _getCurrentDate } from '@common/misc/utils'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { IUserRepository } from '@modules/user/types/interfaces/user-repository.interface'
import { IUserService } from '@modules/user/types/interfaces/user-service.interface'
import { UserMapper } from '@modules/user/user.mapper'
import { UserService } from '@modules/user/user.service'
import { JwtPassportStrategy } from '@modules/utils/jwt-strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { IUserMapper } from '../types/interfaces/user-mapper.interface'
import { UserEntity } from '../user.entity'

describe('UsersService', () => {
  let userService: IUserService
  let userRepository: IUserRepository
  let userMapper: IUserMapper
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
    userMapper = module.get<IUserMapper>(UserIdentifiers.IUserMapper)
  })

  it('should be defined', async () => {
    const result: IResultsSet<UserEntity> = {
      items: [
        {
          id: 'string',
          email: 'string',
          username: 'string',
          password: 'string',
          name: 'string',
          surname: 'string',
          createdAt: _getCurrentDate(),
        },
      ],
      pagination: {
        page: 0,
        totalPages: 1,
        itemsInPage: 1,
        totalItems: 1,
        itemsPerPage: 5,
      },
    }
    jest
      .spyOn(userRepository, 'findAll')
      .mockImplementation(() => Promise.resolve(result))

    const resultDTO = {
      pagination: result.pagination,
      items: await Promise.all(
        result.items.map((user) => userMapper.toDto({ user }))
      ),
    }

    expect(await userService.findAll({ userFilterDTO: {} })).toStrictEqual(
      resultDTO
    )
  })
})
