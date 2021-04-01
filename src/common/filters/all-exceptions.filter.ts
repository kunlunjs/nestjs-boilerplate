import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpCode,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { GqlContextType } from '@nestjs/graphql'
import { Request, Response } from 'express'
import { log } from '@/utils/log'

// @Catch()
// export class AllExceptionsFiles extends BaseExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     super.catch(exception, host)
//   }
// }

/**
 * exception 校验错误
 * {
        "response": {
            "statusCode": 400,
            "message": "Validation failed",
            "error": "Bad Request"
        },
        "status": 400,
        "message": "Validation failed"
    }
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    if (host.getType() === 'http') {
      // do something that is only important in the context of regular HTTP requests (REST)
    } else if (host.getType() === 'rpc') {
      // do something that is only important in the context of Microservice requests
    } else if (host.getType<GqlContextType>() === 'graphql') {
      // do something that is only important in the context of GraphQL requests
    }
    // 获取请求响应对象的另外一种方法
    // const [req, res, next] = host.getArgs()
    // const req = host.getArgByIndex(0)
    // const res = host.getArgByIndex(1)
    // const next = host.getArgByIndex(2)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    log(AllExceptionsFilter.name)
    response.status(status).json({
      data: null,
      status,
      message:
        status === HttpStatus.UNPROCESSABLE_ENTITY
          ? 'Bad request'
          : 'Internal server error',
      // exception instanceof Error ? exception.name : 'Internal server error',
      error: exception
      // exception instanceof Error ? exception.stack : 'Internal server error'
    })
  }
}
