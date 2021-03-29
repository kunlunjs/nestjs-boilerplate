import { Module } from '@nestjs/common'
import { EventEmitController } from './event-emit.controller'
import { EventEmitService } from './event-emit.service'
import { EventEmitCreatedListener } from './listeners/eventemit-created.listener'

@Module({
  controllers: [EventEmitController],
  providers: [EventEmitService, EventEmitCreatedListener]
})
export class EventEmitModule {}
