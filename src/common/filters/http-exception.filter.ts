import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import { log } from '@/utils/log'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  entrance: string
  constructor(entrance?: string) {
    if (entrance) {
      this.entrance = entrance
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // const request = ctx.getRequest()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    log(`[ ${new Date().toISOString()}] ${HttpExceptionFilter.name}`)
    response.status(status).json({
      data: null,
      status,
      message: exception.name,
      error: exception.stack
    })
  }
}
