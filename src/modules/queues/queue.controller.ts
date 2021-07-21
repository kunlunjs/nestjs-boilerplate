import { InjectQueue } from '@nestjs/bull'
import { Controller, Post } from '@nestjs/common'
import type { Queue } from 'bull'

/**
 * POST /queue/transcode 进行队列处理
 */
@Controller('queue')
export class QueueController {
  constructor(@InjectQueue('queue') private readonly queue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.queue.add('transcode', {
      file: 'mv.mp3'
    })
  }
}
