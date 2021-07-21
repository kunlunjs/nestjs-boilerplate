import type { ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import type { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

/**
 * 允许使用策略链 AuthGuard(['strategy1', 'strategy2'])，依次进行所有都失败则失败
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /*
  canActivate(context: ExecutionContext) {
    // 可以自定义处理逻辑
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
  */

  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
