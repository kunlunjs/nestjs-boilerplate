import type { ArgumentMetadata, PipeTransform, Type } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (!!errors.length) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  private toValidate(metatype: Type<any>): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
