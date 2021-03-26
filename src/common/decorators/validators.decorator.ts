import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator'

// TODO 待完善
// https://github.com/typestack/class-validator Custom validation decorators
export function IsPassword(
  property?: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return ((object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      options: validationOptions,
      constraints: property ? [property] : [],
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          if (typeof value === 'string') {
            return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value)
          }
          return false
        }
      }
    })
  }) as PropertyDecorator
}
