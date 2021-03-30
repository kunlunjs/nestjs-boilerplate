import { Module } from '@nestjs/common'
import { NextJSController } from './nextjs.controller'
import { NextJSService } from './nextjs.service'

// SSR 集成 NextJS
@Module({
  imports: [],
  controllers: [NextJSController],
  providers: [NextJSService]
})
export class NextJSModule {}
