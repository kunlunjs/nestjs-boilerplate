import { Module } from '@nestjs/common'
import { MVCController } from './mvc.controller'
import { MVCService } from './mvc.service'

// https://docs.nestjs.com/techniques/mvc#model-view-controller
@Module({
  controllers: [MVCController],
  providers: [MVCService]
})
export class MVCModule {}
