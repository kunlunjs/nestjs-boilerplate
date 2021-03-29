import { Controller, Get, Req, Res } from '@nestjs/common'
import { NextJSService } from './nextjs.service'
import { Request, Response } from 'express'
import { Public } from '@/common/decorators'

@Controller('nextjs')
export class NextJSController {
  constructor(private nextjsService: NextJSService) {}

  // TODO
  @Public()
  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.nextjsService.getNextServer().getRequestHandler()
    handle(req, res)
  }
}
