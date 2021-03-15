import { Module } from '@nestjs/common'
import { SocketIOEventsGateway } from './socket.io-events.gateway'

@Module({
  providers: [SocketIOEventsGateway]
})
export class SocketIOEventsModule {}
