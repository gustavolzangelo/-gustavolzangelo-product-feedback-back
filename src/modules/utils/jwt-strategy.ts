import { _get } from '@common/misc/utils'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { IUserRepository } from '@modules/user/types/interfaces/user-repository.interface'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(UserIdentifiers.IUserRepository)
    private userRepository: IUserRepository,
    private config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // <https://github.com/mikenicholson/passport-jwt#writing-a-custom-extractor-function> - accessed in: August 12, 2021
        (req) =>
          _get({
            obj: req,
            path: `signedCookies[${config.get('auth.cookieSessionName')}]`,
            or: _get({
              obj: req,
              path: 'headers.authorization',
              or: '',
            }).replace('Bearer ', ''),
          }) || null,
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      // TODO: use private-public key pair instead simple string secret
      secretOrKey: config.get('auth.secret'),
    })
  }
  async validate(req: Request, payload: any) {
    // const xOriginHeader = req.get('X-Origin') || 'not-found'
    // if (
    //   !payload.audience ||
    //   payload.audience.toLowerCase() !== xOriginHeader.toLowerCase()
    // ) {
    //   throw UserIdentifiers.EXCEPTIONS.UNAUTHORIZED()
    // }
    const user = await this.userRepository.findOne({
      userFilterDTO: { userIds: [payload.sub] },
    })

    if (!user) {
      throw UserIdentifiers.EXCEPTIONS.UNAUTHORIZED()
    }
    // this is req.user
    return {
      type: UserIdentifiers.JWT_AUTHENTICATION,
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
}
