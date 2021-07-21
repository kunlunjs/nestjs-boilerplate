import { Injectable } from '@nestjs/common'
import type {
  AbilityClass,
  ExtractSubjectType,
  InferSubjects
} from '@casl/ability'
import { Ability, AbilityBuilder } from '@casl/ability'
import { Action } from '@/common/constants/action.enum'

export class User {
  id: string
  isAdmin: boolean
}

export class Article {
  id: string
  isPublished: boolean
  authorId: string
}

export type Subjects = InferSubjects<typeof Article | typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CalsAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>
    )

    /**
     * 权限策略
     */
    // user.isAdmin === true 时有最高权限
    if (user.isAdmin) {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      // 所有人都可以读
      can(Action.Read, 'all') // read-only access to everything
    }
    // authorId === user.id 时可以 Update
    can(Action.Update, Article, { authorId: user.id })
    // isPublished === true 时可以 Delete
    cannot(Action.Delete, Article, { isPublished: true })

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
