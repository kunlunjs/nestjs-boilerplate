import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { requestLogger, responseLogger } from '../logger'

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const { method, originalUrl: url, body } = request
    requestLogger.info(
      `${method} ${url}`,
      JSON.stringify(request.headers),
      /POST|PUT/.test(method) ? JSON.stringify(body) : ''
    )
    const now = new Date().getTime()

    return next.handle().pipe(
      map(data => {
        const response = ctx.getResponse()
        const status = response.statusCode
        const res = {
          data,
          status,
          message: null,
          success: true
        }
        // if (typeof data === 'string' && typeof data['nModified'] === 'number') {
        //   data = {}
        // }
        responseLogger.info(
          `${method} ${url} ${status} ${new Date().getTime() - now}ms`
        )
        return res
      })
    )
  }
}
