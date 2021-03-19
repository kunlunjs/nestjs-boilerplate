import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

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
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    console.log(28, status)
    response.status(status).join({
      status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
  }
}
