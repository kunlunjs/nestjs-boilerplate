import { Module } from '@nestjs/common'
import { MicroserviceMathController } from './microservice-math.controller'

@Module({
  controllers: [MicroserviceMathController]
})
export class MicroserviceMathModule {}
