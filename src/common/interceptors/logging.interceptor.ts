import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  entrance: string
  constructor(entrance?: string) {
    // console.log('LoggingInerceptor entrance: ', entrance)
    if (entrance) {
      this.entrance = entrance
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const endpoint = this.entrance ? ` ${this.entrance}` : ''
    console.log(`Before${endpoint}...`)
    const now = Date.now()
    return next
      .handle()
      .pipe(tap(() => console.log(`After${endpoint}...${Date.now() - now}ms`)))
  }
}
