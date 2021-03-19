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
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    console.log(15, exception)
    response.status(status).json({
      status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })
  }
}
