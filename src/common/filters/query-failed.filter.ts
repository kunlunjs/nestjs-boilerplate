import { STATUS_CODES } from 'http'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus } from '@nestjs/common'
import type { Reflector } from '@nestjs/core'
import { QueryFailedError } from 'typeorm'
import type { Response } from 'express'
import { constraintErrors } from '../constants/constraint-errors'

/**
 * TypeORM 查询失败
 */
@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const message = constraintErrors[exception.constraint]

    const status =
      exception.constraint && exception.constraint.startsWith('UQ')
        ? HttpStatus.CONFLICT
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      data: null,
      status,
      message,
      error: STATUS_CODES[status]
    })
  }
}
