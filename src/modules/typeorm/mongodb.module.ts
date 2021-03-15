import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmMongoDBController } from './mongodb.controller'
import { TypeOrmMongoDBEntity } from './mongodb.entity'
import { TypeOrmMongoDBService } from './mongodb.service'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmMongoDBEntity])],
  providers: [TypeOrmMongoDBService],
  controllers: [TypeOrmMongoDBController]
})
export class TypeOrmMongoDBModule {}
