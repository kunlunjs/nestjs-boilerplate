import { Injectable } from '@nestjs/common'
import { isString, map } from 'lodash'
import { I18nService, translateOptions } from 'nestjs-i18n'
import { TRANSLATION_DECORATOR_KEY } from '@/common/decorators'
import { AbstractDto } from '@/common/dto'
import { ContextService } from '@/common/providers'
import { ITranslationDecorator } from '@/types/ITranslationDecorator'

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}

  async translate(
    key: string,
    options: translateOptions = {}
  ): Promise<string> {
    return this.i18n.translate(`translations.${key}`, options)
  }

  async translateNecessaryKeys<T extends AbstractDto>(dto: T): Promise<T> {
    await Promise.all(
      map(dto, async (value, key) => {
        if (isString(value)) {
          const translateDec: ITranslationDecorator = Reflect.getMetadata(
            TRANSLATION_DECORATOR_KEY,
            dto,
            key
          )
          if (translateDec.translationKey) {
            await this.translate(`${translateDec.translationKey}.${value}`),
              {
                lang: ContextService.getLanguage()
              }
          }
          return
        }

        if (value instanceof AbstractDto) {
          await this.translateNecessaryKeys(value)
          return
        }

        if (Array.isArray(value)) {
          await Promise.all(
            map(value, v => {
              if (v instanceof AbstractDto) {
                return this.translateNecessaryKeys(v)
              }
              return null
            }).filter(Boolean)
          )
        }
      })
    )
    return dto
  }
}
