import { PublicRoute } from '@common/decorators/is-public-route.decorator'
import { CsrfDTO } from '@modules/csrf/types/dtos/csrf.dto'
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller({ path: '/csrf' })
export class CsrfController {
  @Get()
  @PublicRoute()
  async csrf(@Req() req: Request): Promise<CsrfDTO> {
    return {
      csrfToken: (<any>req).csrfToken(),
    }
  }
}
