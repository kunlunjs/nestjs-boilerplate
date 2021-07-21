import { Injectable } from '@nestjs/common'
import type { EventEmitter2 } from '@nestjs/event-emitter'
import type { CreateEventEmitDto } from './dto/create-eventemit.dto'
import type { EventEmitEntity } from './entities/eventemit.entity'
import { EventEmitCreatedEvent } from './events/eventemit-created.event'

@Injectable()
export class EventEmitService {
  public eventemits: EventEmitEntity[] = [
    {
      id: 1,
      name: 'Eventemit #1',
      description: 'Description eventemit #1'
    },
    {
      id: 2,
      name: 'Eventemit #2',
      description: 'Description eventemit #2'
    }
  ]

  constructor(private eventEmitter: EventEmitter2) {}

  create(createEventEmitDto: CreateEventEmitDto) {
    const eventemit = {
      id: this.eventemits.length + 1,
      ...createEventEmitDto
    }
    this.eventemits.push(eventemit)

    const eventEmitCreatedEvent = new EventEmitCreatedEvent()
    eventEmitCreatedEvent.name = eventemit.name
    eventEmitCreatedEvent.description = eventemit.description
    this.eventEmitter.emit('eventemit.created', eventEmitCreatedEvent)

    return eventemit
  }
}
