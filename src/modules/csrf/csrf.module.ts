import { Module } from '@nestjs/common'
import { CsrfController } from '@modules/csrf/csrf.controller'

@Module({
  controllers: [CsrfController],
})
export class CsrfModule {}
