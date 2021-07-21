import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Reflector } from '@nestjs/core'
import type {
  AppAbility,
  CalsAbilityFactory
} from '../../modules/cals/cals-ability.factory'
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator'

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CalsAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || []
    // 从 token 中解析出
    const { user = { isAdmin: true } } = context.switchToHttp().getRequest()
    const ability = this.caslAbilityFactory.createForUser(user)
    return policyHandlers.every(handler => {
      return this.execPolicyHandler(handler, ability)
    })
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }
    return handler.handle(ability)
  }
}
