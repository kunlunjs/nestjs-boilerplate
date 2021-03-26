import { ITranlationDecorator } from '@/types/translation-decorator.interface'

export const TRANSLATION_DECORATOR_KEY = 'custom:translate'

export function Translate(data: ITranlationDecorator): PropertyDecorator {
  return ((target, key) => {
    Reflect.defineMetadata(TRANSLATION_DECORATOR_KEY, data, target, key)
  }) as PropertyDecorator
}
