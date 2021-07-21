import { AppService } from '@/app.service'
import { Public } from '@/common/decorators'
import { Controller, Get, Render, Res } from '@nestjs/common'
import type { Response } from 'express'
import type { MVCService } from './mvc.service'

/**
 * MVC 渲染动态模板
 */
@Controller('mvc')
export class MVCController {
  constructor(private mvcService: MVCService) {}
  /**
   * 根据路由指定渲染模板
   * http://localhost:3000/api/mvc/hbs
   */
  @Public()
  @Get('hbs')
  @Render('index') // pages/index.hbs
  hbs() {
    return { message: '/api/mvc/hbs -> pages/index.hbs' }
  }

  /**
   * 动态选择渲染模板
   */
  @Public()
  @Get()
  render(@Res() res: Response) {
    return res.render(this.mvcService.getViewName(), {
      message: '/api/mvc -> pages/{动态模板}.hbs'
    })
  }
}
