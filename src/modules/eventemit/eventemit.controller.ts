import { Body, Controller, Post } from '@nestjs/common'
import { CreateEventEmitDto } from './dto/create-eventemit.dto'
import { EventEmitService } from './eventemit.service'

@Controller('eventemit')
export class EventEmitController {
  constructor(private eventEmitService: EventEmitService) {}

  @Post()
  create(@Body() createEeventEmitDto: CreateEventEmitDto) {
    return this.eventEmitService.create(createEeventEmitDto)
  }
}
