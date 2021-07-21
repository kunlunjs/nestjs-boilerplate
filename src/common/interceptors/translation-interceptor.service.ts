import type { TranslationService } from '@/shared/services'
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

@Injectable()
export class TranslationInterceptor implements NestInterceptor {
  constructor(private readonly translationService: TranslationService) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      mergeMap((data: any) => {
        return this.translationService.translateNecessaryKeys(data)
      })
    )
  }
}
