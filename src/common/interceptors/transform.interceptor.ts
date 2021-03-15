import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { reqLogger, resLogger } from '../logger'

export interface Response<T> {
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
    const { method, originalUrl: url } = request
    reqLogger.info(`${method} ${url}`, request.headers)

    return next.handle().pipe(
      map(data => {
        const res = ctx.getResponse()
        const status = res.statusCode
        const result = {
          status,
          data
        }
        resLogger.info(`${method} ${url}`, result)
        return result
      })
    )
  }
}
