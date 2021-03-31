import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmMongoController } from './mongodb.controller'
import { TypeOrmMongoEntity } from './mongodb.entity'
import { TypeOrmMongoService } from './mongodb.service'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmMongoEntity])],
  providers: [TypeOrmMongoService],
  controllers: [TypeOrmMongoController]
})
export class TypeOrmMongoModule {}
