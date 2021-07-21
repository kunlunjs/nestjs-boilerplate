import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import type { EventEmitCreatedEvent } from '../events/eventemit-created.event'

@Injectable()
export class EventEmitCreatedListener {
  @OnEvent('eventemit.created')
  handlerEventEmitCreatedEvent(event: EventEmitCreatedEvent) {
    console.log(event)
  }
}
