import { Controller, Get, Param } from '@nestjs/common'
import { TypeOrmMongoEntity } from './mongodb.entity'
import { TypeOrmMongoService } from './mongodb.service'

@Controller('typeorm-mongo')
export class TypeOrmMongoController {
  constructor(private readonly jsonService: TypeOrmMongoService) {}

  @Get('list')
  findAll(): Promise<TypeOrmMongoEntity[]> {
    return this.jsonService.findAll()
  }

  @Get(':id')
  findOne(@Param() id: string): Promise<TypeOrmMongoEntity | undefined> {
    return this.jsonService.findOne(id)
  }
}
