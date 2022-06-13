import { PublicRoute } from '@common/decorators/is-public-route.decorator'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { UserJwtDTO } from '@modules/user/types/dto/user-jwt.dto'
import { UserCreateDto } from '@modules/user/types/dto/user-create.dto'
import { UserLoginDto } from '@modules/user/types/dto/user-login.dto'
import { UserUpdateDto } from '@modules/user/types/dto/user-update.dto'
import { UserDTO } from '@modules/user/types/dto/user.dto'
import { IUserService } from '@modules/user/types/interfaces/user-service.interface'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CookieOptions, Response } from 'express'

@Controller('users')
export class UserController {
  private isDev: any
  private domain: string
  private cookieSessionName: string
  private cookieSignName: string
  private cookieMaxAge: number

  constructor(
    @Inject(UserIdentifiers.IUserService) private userService: IUserService,
    private config: ConfigService
  ) {
    this.isDev = this.config.get('common.isDev')
    this.domain = this.config.get('common.domain')
    this.cookieSessionName = this.config.get('auth.cookieSessionName')
    this.cookieSignName = this.config.get('auth.cookieSignName')
    this.cookieMaxAge = this.config.get('auth.cookieMaxAge')
  }

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<UserDTO> {
    return this.userService.create({ userCreateDto: createUserDto })
  }

  private attachCookiesAccessToken(params: {
    res: Response
    accessToken: string
  }): Response {
    const { res, accessToken } = params

    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
      maxAge: this.cookieMaxAge * 0.99, // 99% of cookieMaxAge in ms
      secure: !this.isDev(),
      domain: !this.isDev() ? this.domain : undefined,
      path: '/',
    }

    res.cookie(this.cookieSessionName, accessToken, cookiesOptions)
    res.cookie(this.cookieSignName, '#monitoringHub', {
      ...cookiesOptions,
      httpOnly: false,
    })

    return res
  }

  @PublicRoute()
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userLoginDto: UserLoginDto
  ): Promise<UserJwtDTO> {
    const userJwtDto = await this.userService.login({ userLoginDto })

    res.status(HttpStatus.OK)
    res = this.attachCookiesAccessToken({
      res,
      accessToken: userJwtDto.accessToken,
    })

    return userJwtDto
  }

  @Get()
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll()
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<UserDTO> {
    const user = await this.userService.updateOne({ userId: id, userUpdateDto })

    if (!user) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }

    res.status(HttpStatus.OK)
    return user
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ) {
    const user = await this.userService.deleteOne({ userId: id })
    if (!user) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }
    res.status(HttpStatus.OK)
  }
}
