import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import mongoose from 'mongoose'

const isMongoIdReg = /^[a-fA-F0-9]{24}$/

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !mongoose.isValidObjectId(value)) {
      throw new BadRequestException('Validation field')
    }
    return value
  }
}
