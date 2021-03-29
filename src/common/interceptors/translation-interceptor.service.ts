import { TranslationService } from '@/shared/services'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
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
