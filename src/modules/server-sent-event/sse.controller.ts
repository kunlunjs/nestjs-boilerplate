import { join } from 'path'
import type { MessageEvent } from '@nestjs/common'
import { Controller, Get, Res, Sse, Req } from '@nestjs/common'
import { readFileSync } from 'fs-extra'
import type { Observable } from 'rxjs'
import { interval } from 'rxjs'
import type { Response } from 'express'
import { Request } from 'express'
import { map } from 'rxjs/operators'
import { Public } from '@/common/decorators'

const html = readFileSync(join(process.cwd(), './public/sse.html')).toString()

@Controller('sse')
export class ServerSentEventController {
  // 浏览器中打开 http://localhost:3000/api/sse/index
  // @Public()
  @Public()
  @Get('index')
  index(@Res() response: Response) {
    // index.html 中通过 EventSource 对象来与 /api/sse 接口通讯
    response.type('text/html').send(html)
  }

  // 动态 Server Sent Event 页面

  // 通过 GET /api/sse （加载index.html 时自动请求）每秒钟向 index.html 推送一条数据
  // 有轮询请求
  @Public()
  @Sse() // 默认 /api/sse，可以指定
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(i => ({ data: { number: i } })))
  }

  // 动态 Server Sent Event 接口
}
