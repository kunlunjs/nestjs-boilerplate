import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { GqlContextType } from '@nestjs/graphql'
import { Request, Response } from 'express'

// @Catch()
// export class AllExceptionsFiles extends BaseExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     super.catch(exception, host)
//   }
// }

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
    response.status(status).json({
      status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
  }
}
