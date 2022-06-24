import { _envelopeDTO, _get, _isArray } from '@common/misc/utils'
import { CustomException } from '@common/types/exceptions/custom.exception'
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerException } from '@nestjs/throttler'
import { CookieOptions } from 'express'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private isDev: any
  private domain: string
  private cookieSessionName: string
  private cookieSignName: string

  constructor(private config: ConfigService) {
    this.isDev = this.config.get('common.isDev')
    this.domain = this.config.get('common.domain')
    this.cookieSessionName = this.config.get('auth.cookieSessionName')
    this.cookieSignName = this.config.get('auth.cookieSignName')
  }

  catch(exception: any, host: ArgumentsHost) {
    const error: any = {}
    const status = _get({
      obj: exception,
      path: 'status',
      or: HttpStatus.INTERNAL_SERVER_ERROR,
    })

    switch (_get({ obj: exception, path: 'name', or: 'unknown' })) {
      case CustomException.name:
        error.code = _get({
          obj: exception,
          path: 'code',
          or: 'unavailable',
        })
        error.message = _get({
          obj: exception,
          path: 'message',
          or: 'unavailable',
        })
        break
      case NotFoundException.name:
        error.code = 'NOT-FOUND'
        error.message = 'Not found'
        break
      case ThrottlerException.name:
        error.code = 'RATE-LIMIT'
        error.message = 'Too many requests'
        break
      case BadRequestException.name:
        const message = _get({
          obj: exception,
          path: 'response.message',
          or: 'unavailable',
        })

        error.code = 'VALIDATION'
        error.message = _isArray(message) ? message[0] : message
        break
      default:
        if (exception.code === 'EBADCSRFTOKEN') {
          error.code = 'CSRF-TOKEN'
          error.message = 'Access denied'

          break
        }

        error.code = 'UNEXPECTED'
        error.message = 'An unexpected error has occurred'

        console.error('ERROR: ', exception)
        break
    }

    error.attributes = _get({ obj: exception, path: 'attributes', or: {} })

    const httpArgs = host.switchToHttp().getResponse()

    if (status === HttpStatus.UNAUTHORIZED) {
      const cookiesOptions: CookieOptions = {
        domain: !this.isDev() ? this.domain : undefined,
        path: '/',
      }

      httpArgs
        .clearCookie(this.cookieSessionName, cookiesOptions)
        .clearCookie(this.cookieSignName, cookiesOptions)
    }

    httpArgs.status(status).json(_envelopeDTO({ status, errors: [error] }))
  }
}
