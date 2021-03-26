import { Module } from '@nestjs/common'
import { MicroserviceController } from './microservice.controller'

@Module({
  controllers: [MicroserviceController]
})
export class MicroserviceModule {}
