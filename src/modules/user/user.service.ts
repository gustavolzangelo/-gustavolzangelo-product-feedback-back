import { _compareHash, _createHash, _getCurrentDate } from '@common/misc/utils'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { UserJwtDTO } from '@modules/user/types/dto/user-jwt.dto'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'
import { UserLoginDto } from '@modules/user/types/dto/user-login.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { UserDTO } from '@modules/user/types/dto/user.dto'
import { IUserMapper } from '@modules/user/types/interfaces/user-mapper.interface'
import { IUserRepository } from '@modules/user/types/interfaces/user-repository.interface'
import { IUserService } from '@modules/user/types/interfaces/user-service.interface'
import { UserEntity } from '@modules/user/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserIdentifiers.IUserRepository)
    private userRepository: IUserRepository,

    @Inject(UserIdentifiers.IUserMapper)
    private mapper: IUserMapper,

    private jwtService: JwtService
  ) {}
  async create(params: { userCreateDto: UserCreateDto }): Promise<UserDTO> {
    const { userCreateDto } = params
    const userSearched = await this.userRepository.findOne({
      userFilterDTO: { emails: [userCreateDto.email] },
    })

    if (userSearched) {
      throw UserIdentifiers.EXCEPTIONS.EMAIL_ALREADY_REGISTERED()
    }

    const newUser: UserEntity = {
      ...userCreateDto,
      id: randomUUID(),
      password: _createHash({
        text: userCreateDto.password,
      }),
      createdAt: _getCurrentDate(),
    }
    const userCreated = await this.userRepository.create({
      userEntity: newUser,
    })

    return this.mapper.toDto({ user: userCreated })
  }

  async login(params: { userLoginDto: UserLoginDto }): Promise<UserJwtDTO> {
    const user = await this.userRepository.findOne({
      userFilterDTO: { usernames: [params.userLoginDto.username] },
    })

    if (!user) {
      throw UserIdentifiers.EXCEPTIONS.UNAUTHORIZED()
    }

    const isValidPassword = _compareHash({
      text: params.userLoginDto.password,
      hash: user.password,
    })

    if (!isValidPassword) {
      throw UserIdentifiers.EXCEPTIONS.UNAUTHORIZED()
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
    }
  }

  findAll(): Promise<UserDTO[]> {
    return this.userRepository.findAll({ userFilterDTO: {} })
  }

  updateOne(params: {
    userId: string
    userUpdateDto: UserUpdateDto
  }): Promise<UserDTO | void> {
    const userSearched = this.userRepository.findOne({
      userFilterDTO: { userIds: [...params.userId] },
    })

    if (userSearched) {
      return
    }

    return this.userRepository.updateOne({
      userId: params.userId,
      userData: params.userUpdateDto,
    })
  }

  deleteOne(params: { userId: string }): Promise<UserDTO | void> {
    const userSearched = this.userRepository.findOne({
      userFilterDTO: { userIds: [...params.userId] },
    })

    if (userSearched) {
      return
    }

    return this.userRepository.deleteOne({ userId: params.userId })
  }
}
