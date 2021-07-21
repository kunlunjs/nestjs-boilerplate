import { STATUS_CODES } from 'http'
import type { Reflector } from '@nestjs/core'
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus, UnprocessableEntityException } from '@nestjs/common'
import type { ValidationError } from 'class-validator'
import type { Response } from 'express'
import { isEmpty, isObject, snakeCase } from 'lodash'

/**
 * 改写校验错误对象结构，支持国际化
 */
@Catch(UnprocessableEntityException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let statusCode = exception.getStatus()
    const r = exception.getResponse() as any

    if (Array.isArray(r.message) && r.message[0]) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      r.error = STATUS_CODES[statusCode]
      const validationErrors = r.message as ValidationError[]
      this.validationFilter(validationErrors)
    }

    r.statusCode = statusCode
    r.error = STATUS_CODES[statusCode]

    response.status(statusCode).json(r)
  }

  private validationFilter(validationErrors: ValidationError[]): void {
    for (const validationError of validationErrors) {
      if (
        Array.isArray(validationError.children) &&
        !isEmpty(validationError.children[0])
      ) {
        this.validationFilter(validationError.children)
        return
      }

      if (isObject(validationError.constraints)) {
        for (const [constraintKey, constraint] of Object.entries(
          validationError.constraints
        )) {
          // convert default messages
          if (!constraint) {
            // convert error message to error.fields.{key} syntax for i18n translation
            validationError.constraints[
              constraintKey
            ] = `error.fields.${snakeCase(constraintKey)}`
          }
        }
      }
    }
  }
}
