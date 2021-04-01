import {
  applyDecorators,
  Param,
  ParseUUIDPipe,
  PipeTransform,
  SetMetadata,
  Type,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

// TODO 待完善
/**
 * 简化控制器或方法上的装饰器数量
 * @param {any} roles
 * @returns 新装饰器
 */
export function Auth(...roles: string[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    SetMetadata('roles', roles)
    // UseGuards(),
    // UseInterceptors(),
  )
}

export function UUIDParam(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes)
}
