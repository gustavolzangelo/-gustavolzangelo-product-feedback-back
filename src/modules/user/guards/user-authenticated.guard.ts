import { IS_PUBLIC_ROUTE_KEY } from '@common/decorators/is-public-route.decorator'
import { UserIdentifiers } from '@modules/user/types/consts/user-identifiers.const'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserAuthenticatedGuard extends AuthGuard(['jwt']) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    return this.validateRequest(context)
  }

  async validateRequest(context: ExecutionContext): Promise<any> {
    const reflectorTargets = [context.getHandler(), context.getClass()]

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      reflectorTargets
    )
    if (isPublic) {
      return true
    }

    const canActivate = await super.canActivate(context)

    if (!canActivate) {
      throw UserIdentifiers.EXCEPTIONS.UNAUTHORIZED()
    }

    return canActivate
  }
}
