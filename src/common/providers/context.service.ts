import type { UserEntity } from '@/entities/user.entity'
import rc from 'request-context'

export class ContextService {
  private static readonly namespace = 'request'
  private static authUserKey = 'user_key'
  private static languageKey = 'language_key'

  private static get<T>(key: string): T {
    return rc.get(ContextService.getKeyWithNamespace(key))
  }

  private static set(key: string, value: any): void {
    rc.set(ContextService.getKeyWithNamespace(key), value)
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextService.namespace}.${key}`
  }

  static setAuthUser(user: UserEntity): void {
    ContextService.set(ContextService.authUserKey, user)
  }

  static getAuthUser(): UserEntity {
    return ContextService.get(ContextService.authUserKey)
  }

  static setLanguage(language: string): void {
    ContextService.set(ContextService.languageKey, language)
  }

  static getLanguage(): void {
    ContextService.get(ContextService.languageKey)
  }
}
