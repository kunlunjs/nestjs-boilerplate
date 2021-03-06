import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'

/**
 * socket.io 服务默认和主服务在一个端口上
 */
@WebSocketGateway()
export class SocketIOEventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(
      'Receive socket.io event[events]: ',
      data,
      new Date().toISOString()
    )
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('identity')
  async indentity(@MessageBody() data: number): Promise<number> {
    console.log(
      'Receive socket.io event[identity]: ',
      data,
      new Date().toISOString()
    )
    return data
  }
}
