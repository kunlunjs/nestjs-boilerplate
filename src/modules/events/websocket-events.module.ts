import { Module } from '@nestjs/common'
import { WebSocketEventsGateway } from './websocket-events.gateway'

@Module({
  providers: [WebSocketEventsGateway]
})
export class WebSocketEventsModule {}
