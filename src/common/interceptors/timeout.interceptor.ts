import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { timeout } from 'rxjs/operators'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(5000))
  }
}
