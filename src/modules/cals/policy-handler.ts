import { Action } from '@/common/constants/action.enum'
import { IPolicyHandler } from '@/common/guards/policies.guard'
import { AppAbility, Article } from './cals-ability.factory'

/**
 * 读权限
 */
export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article)
  }
}

/**
 * 写权限
 */
export class UpdateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Article)
  }
}
