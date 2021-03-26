import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'ws'

@WebSocketGateway(8080)
export class WebSocketEventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(`Receive websocket event[events]: `, data)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
  }

  // TODO WebSockets 中使用缓存
  // https://docs.nestjs.com/techniques/caching#websockets-and-microservices
}
