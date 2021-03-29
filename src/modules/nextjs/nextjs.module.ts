import { Module } from '@nestjs/common'
import { NextJSController } from './nextjs.controller'
import { NextJSService } from './nextjs.service'

@Module({
  imports: [],
  controllers: [NextJSController],
  providers: [NextJSService]
})
export class NextJSModule {}
