import { Module } from '@nestjs/common'
import { ServerSentEventController } from './sse.controller'

// https://docs.nestjs.com/techniques/server-sent-events#usage
@Module({
  imports: [],
  controllers: [ServerSentEventController],
  providers: []
})
export class ServerSentEventModule {}
