import { Controller, Get } from '@nestjs/common'
import {
  Client,
  ClientProxy,
  MessagePattern,
  Transport
} from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { Public } from '@/common/decorators'

@Controller('microservice-math')
export class MicroserviceMathController {
  @Client({
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env['TRANSPORT_PORT'] as string, 10) || 4000
    }
  })
  client: ClientProxy

  // GET /api/microservice-math/sum
  @Public()
  @Get('sum')
  call(): Observable<number> {
    const pattern = { cmd: 'sum' }
    const data = [1, 2, 3, 4, 5]
    return this.client.send(pattern, data)
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b)
  }
}
