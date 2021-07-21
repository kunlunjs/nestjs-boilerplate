import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err =>
          throwError(new HttpException('New message', HttpStatus.BAD_GATEWAY))
        )
      )
  }
}
