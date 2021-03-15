import { Module } from '@nestjs/common'
import { EventEmitController } from './eventemit.controller'
import { EventEmitService } from './eventemit.service'
import { EventEmitCreatedListener } from './listeners/eventemit-created.listener'

@Module({
  controllers: [EventEmitController],
  providers: [EventEmitService, EventEmitCreatedListener]
})
export class EventEmitModule {}
