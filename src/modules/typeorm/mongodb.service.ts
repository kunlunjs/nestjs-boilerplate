import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmMongoDBEntity } from './mongodb.entity'

@Injectable()
export class TypeOrmMongoDBService {
  constructor(
    @InjectRepository(TypeOrmMongoDBEntity)
    private jsonRepository: Repository<TypeOrmMongoDBEntity>
  ) {}

  async findAll(): Promise<TypeOrmMongoDBEntity[]> {
    return this.jsonRepository.find()
  }

  async findOne(id: string): Promise<TypeOrmMongoDBEntity> {
    return this.jsonRepository.findOne(id)
  }
}
