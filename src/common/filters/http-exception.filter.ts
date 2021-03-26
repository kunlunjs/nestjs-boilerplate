import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // const request = ctx.getRequest()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    response.status(status).json({
      data: null,
      status,
      message: exception.name,
      error: exception.stack
    })
  }
}
