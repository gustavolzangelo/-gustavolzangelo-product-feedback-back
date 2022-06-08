import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
  public code: string
  public attributes: any

  constructor(params: {
    code: string
    message: string
    status?: number
    attributes?: any
  }) {
    super(params.message, params.status || HttpStatus.PRECONDITION_FAILED)

    this.code = params.code
    this.attributes = params.attributes || {}
  }

  append(params: {
    message?: string
    code?: string
    attributes?: any
  }): CustomException {
    this.message = params.message || this.message
    this.code = params.code || this.code
    this.attributes = params.attributes || this.attributes

    return this
  }
}
