import { UserEntity } from '@/modules/users/users.service'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { ContextService } from '../providers'

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    const user = <UserEntity>request.user
    ContextService.setAuthUser(user)
    return next.handle()
  }
}
