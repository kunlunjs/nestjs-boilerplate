import { Body, Controller, Post } from '@nestjs/common'
import type { CreateEventEmitDto } from './dto/create-eventemit.dto'
import type { EventEmitService } from './event-emit.service'

@Controller('eventemit')
export class EventEmitController {
  constructor(private eventEmitService: EventEmitService) {}

  @Post()
  create(@Body() createEeventEmitDto: CreateEventEmitDto) {
    return this.eventEmitService.create(createEeventEmitDto)
  }
}
