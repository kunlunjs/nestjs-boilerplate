import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator'
import { registerDecorator, ValidatorConstraint } from 'class-validator'

/**
 * 自定义文本校验
 */
@ValidatorConstraint()
export class CustomStringValidator implements ValidatorConstraintInterface {
  validate(val: string) {
    return val === 'custom string'
  }
}

export function IsLongerThan(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (target: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsLongerThanContraint
    })
  }
}

@ValidatorConstraint({ name: 'IsLongerThan' })
export class IsLongerThanContraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // IsLongerThanContraint 除最后一个参数外的其它参数
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return (
      typeof value === 'string' &&
      typeof relatedValue === 'string' &&
      value.length > relatedValue.length
    )
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUserAlreadyExist',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return new Promise(resolve => {
            if (value !== 'admin' && value !== 'user') {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        }
      }
    })
  }
}
