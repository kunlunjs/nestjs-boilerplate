import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { log } from '@/utils/log'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  entrance: string
  constructor(entrance?: string) {
    if (entrance) {
      this.entrance = entrance
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const endpoint = this.entrance ? ` ${this.entrance}` : ''
    const request = context.switchToHttp().getRequest()
    const { method, originalUrl: url, headers, body } = request
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        if (url.indexOf('/nextjs') === -1) {
          log(
            `${method} ${url} ${JSON.stringify(headers)} ${
              /POST|PUT/.test(method) ? JSON.stringify(body) : ''
            } ${Date.now() - now}ms`
          )
        }
      })
    )
  }
}
