import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Role } from '../enum/role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取控制器或方法上的注入的允许 roles
    // const roles = this.reflector.get<string[]>('role', context.getHandler())
    // if (!roles) {
    //   return true
    // }
    // const request = context.switchToHttp().getRequest()
    // const user = request.user
    // const hasRole = () =>
    //   user.roles.some(role => !!roles.find(item => item === role))
    // return user && user.roles && hasRole()

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.roles?.includes(role))
  }
}
