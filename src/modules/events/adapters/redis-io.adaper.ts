import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'
import { createAdapter } from 'socket.io-redis'
import { RedisClient } from 'redis'

/**
 * 和官方仓库案例有所不同，采用 socket.io-redis 最新版本
 * https://github.com/socketio/socket.io-redis
 */
const pubClient = new RedisClient({
  host: '47.111.100.233',
  port: 6379,
  password: '***'
})
const subClient = pubClient.duplicate()

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options)
    server.adapter(createAdapter({ pubClient, subClient }))
    return server
  }
}
