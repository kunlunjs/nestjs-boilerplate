import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Role } from '../constants/role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 方法 1. 获取控制器上@Roles('admin')的注入的元数据 roles => ['admin']
    // const roles = this.reflector.get<string[]>('roles', context.getClass())

    // 方法 2. 获取方法上@Roles('admin')的注入的元数据 roles => ['admin']
    // const roles = this.reflector.get<string[]>('role', context.getHandler())
    // if (!roles) {
    //   return true
    // }

    // 方法 3. 方法上@Roles('admin')定义的元数据合并控制器上@Public('user')的 => ['user', 'admin']
    // const roles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
    //   // 返回即将被调用的处理程序的引用
    //   context.getHandler(),
    //   // 返回此特定处理程序所属的 Controller 类的类型
    //   context.getClass()
    // ])

    // 方法 4. 方法上@Roles('admin')定义的元数据覆盖控制器上@Roles('user')的 => ['admin']
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!roles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return user && roles.some(role => user.roles?.includes(role))
  }
}
