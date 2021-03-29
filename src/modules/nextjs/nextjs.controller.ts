import { Controller, Get, Req, Res } from '@nestjs/common'
import { NextJSService } from './nextjs.service'
import { Request, Response } from 'express'

@Controller('nextjs')
export class NextJSController {
  constructor(private nextjsService: NextJSService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.nextjsService.getNextServer().getRequestHandler()
    handle(req, res)
  }
}
