import type { ITranslationDecorator } from '@/types/ITranslationDecorator'

export const TRANSLATION_DECORATOR_KEY = 'custom:translate'

export function Translate(data: ITranslationDecorator): PropertyDecorator {
  return ((target, key) => {
    Reflect.defineMetadata(TRANSLATION_DECORATOR_KEY, data, target, key)
  }) as PropertyDecorator
}
