import { _envelopeDTO } from '@common/misc/utils'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class EnvelopeInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return _envelopeDTO({
          status: context.switchToHttp().getResponse().statusCode,
          data,
        })
      })
    )
  }
}
