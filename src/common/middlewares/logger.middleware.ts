import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`)
    next()
  }
}

/**
 * 功能型中间件
 * consumer.apply(logger).forRoutes(...)
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...')
  next()
}
