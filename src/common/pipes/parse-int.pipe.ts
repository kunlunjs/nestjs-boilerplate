import type { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  // 可以异步
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed')
    }
    return val
  }
}
