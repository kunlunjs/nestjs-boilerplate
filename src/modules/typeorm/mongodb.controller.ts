import { Controller, Get, Param } from '@nestjs/common'
import { TypeOrmMongoDBEntity } from './mongodb.entity'
import { TypeOrmMongoDBService } from './mongodb.service'

@Controller('typeorm')
export class TypeOrmMongoDBController {
  constructor(private readonly jsonService: TypeOrmMongoDBService) {}

  @Get('list')
  findAll(): Promise<TypeOrmMongoDBEntity[]> {
    return this.jsonService.findAll()
  }

  @Get(':id')
  findOne(@Param() id: string): Promise<TypeOrmMongoDBEntity> {
    return this.jsonService.findOne(id)
  }
}
