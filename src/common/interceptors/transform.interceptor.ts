import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { requestLogger, responseLogger } from '../logger'
import { log } from '@/utils/log'

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  entrance: string
  constructor(entrance?: string) {
    if (entrance) {
      this.entrance = entrance
    }
  }

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
    // const now = Date.now()
    const entry = this.entrance ? `[${this.entrance}] ` : ''
    const begin = new Date()
    log(`${entry}Enter ${TransformInterceptor.name}`)

    return next.handle().pipe(
      map(data => {
        // 如果发生校验错误则不会到这里
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
          `${method} ${url} ${status} +${Date.now() - begin.getTime()}ms`
        )
        log(
          `${entry}Leave ${TransformInterceptor.name} +${
            Date.now() - begin.getTime()
          }ms`
        )
        return res
      })
    )
  }
}
