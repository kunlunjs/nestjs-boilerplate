import { SetMetadata } from '@nestjs/common'
import { Role } from '../enum/role.enum'

export const ROLES_KEY = 'roles'

// 可以在方法或控制器上这般使用 @Roles('admin') 等效于 @SetMetadata(ROLES_KEY, ['admin'])
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
