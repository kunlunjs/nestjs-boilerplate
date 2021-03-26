import { ExecutionContext, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number
  ): Promise<boolean> {
    const client = context.switchToWs().getClient()
    const ip = client.conn.remoteAddress()
    const key = this.generateKey(context, ip)
    // TODO socket 限流
    // https://docs.nestjs.com/security/rate-limiting#rate-limiting
    // const ttls = await this.storageService.getRecord(key)
    return true
  }
}
