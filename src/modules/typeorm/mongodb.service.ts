import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TypeOrmMongoEntity } from './mongodb.entity'

@Injectable()
export class TypeOrmMongoService {
  constructor(
    @InjectRepository(TypeOrmMongoEntity)
    private jsonRepository: Repository<TypeOrmMongoEntity>
  ) {}

  async findAll(): Promise<TypeOrmMongoEntity[]> {
    return this.jsonRepository.find()
  }

  async findOne(id: string): Promise<TypeOrmMongoEntity | undefined> {
    return this.jsonRepository.findOne(id)
  }
}
