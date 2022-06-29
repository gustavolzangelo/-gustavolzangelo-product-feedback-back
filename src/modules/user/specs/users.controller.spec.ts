import authConfig from '@common/config/auth.config'
import commonConfig from '@common/config/common.config'
import { _getCurrentDate } from '@common/misc/utils'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'
import { UserJwtDTO } from '@modules/user/types/dto/user-jwt.dto'
import { UserDTO } from '@modules/user/types/dto/user.dto'
import { IUserService } from '@modules/user/types/interfaces/user-service.interface'
import { UserController } from '@modules/user/user.controller'
import { HttpStatus } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Response } from 'express'
import { UserUpdateDto } from '../types/dto/user-update.dto'

const userDto: UserDTO = {
  id: 'string',
  email: 'string',
  username: 'string',
  name: 'string',
  surname: 'string',
  createdAt: _getCurrentDate(),
}
const userCreateDto: UserCreateDto = {
  email: 'string',
  username: 'string',
  password: 'string',
  name: 'string',
  surname: 'string',
}

const userUpdateDto: UserUpdateDto = {
  ...userCreateDto,
  name: 'Gustavo',
}

const userJwtDto: UserJwtDTO = {
  accessToken: 'string',
}

const resultSetUserDto = {
  items: [userDto],
  pagination: {
    page: 0,
    totalPages: 1,
    itemsInPage: 1,
    totalItems: 1,
    itemsPerPage: 5,
  },
}

const mockResponse: any = () => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.cookie = jest.fn().mockReturnValue(res)
  return res
}

describe('UsersController', () => {
  let userController: UserController
  let userService: IUserService
  const mockService: IUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
    login: jest.fn(),
    updateOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
        ConfigModule.forRoot({
          load: [commonConfig, authConfig],
        }),
      ],
    })
      .useMocker((token) => {
        if (token === UserIdentifiers.IUserService) {
          return mockService
        }
      })
      .compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<IUserService>(UserIdentifiers.IUserService)
  })

  it('create an user', async () => {
    jest
      .spyOn(userService, 'create')
      .mockImplementation(() => Promise.resolve(userDto))

    expect(await userController.create({ ...userCreateDto })).toBe(userDto)
  })

  it('login with success', async () => {
    jest
      .spyOn(userService, 'login')
      .mockImplementation(() => Promise.resolve(userJwtDto))

    const res = mockResponse()

    expect(
      await userController.login(res, {
        username: 'string',
        password: 'string',
      })
    ).toBe(userJwtDto)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.cookie).toHaveBeenCalledTimes(2)
  })

  it('get all users', async () => {
    jest
      .spyOn(userService, 'findAll')
      .mockImplementation(() => Promise.resolve(resultSetUserDto))

    expect(await userController.findAll({})).toStrictEqual(resultSetUserDto)
  })

  it('update an user successfully', async () => {
    const updatedUser: UserDTO = {
      ...userDto,
      name: userUpdateDto.name,
    }

    jest
      .spyOn(userService, 'updateOne')
      .mockImplementation(() => Promise.resolve(updatedUser))

    const res = mockResponse()

    expect(
      await userController.update(res, 'string', userUpdateDto)
    ).toStrictEqual(updatedUser)

    expect(res.status).toBeCalledWith(HttpStatus.OK)
  })

  it('update an user fails', async () => {
    jest
      .spyOn(userService, 'updateOne')
      .mockImplementation(() => Promise.resolve())

    const res = mockResponse()

    await userController.update(res, 'string', userUpdateDto)
    expect(res.status).toBeCalledWith(HttpStatus.NOT_FOUND)
  })

  it('delete an user successfully', async () => {
    jest
      .spyOn(userService, 'deleteOne')
      .mockImplementation(() => Promise.resolve({ ...userDto }))

    const res = mockResponse()

    await userController.remove(res, 'string')

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
  })
  it(`try delete a user that don't exist`, async () => {
    jest
      .spyOn(userService, 'deleteOne')
      .mockImplementation(() => Promise.resolve())

    const res = mockResponse()

    await userController.remove(res, 'string')

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
  })
})
