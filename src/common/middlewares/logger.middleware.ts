import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { log } from '@/utils/log'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  entrance: string
  // constructor(entrance?: string) {
  //   if (entrance) {
  //     this.entrance = entrance
  //   }
  // }

  use(req: Request, res: Response, next: NextFunction) {
    const entry = this.entrance ? `[${this.entrance}] ` : ''
    const begin = new Date()
    log(`${entry}Enter ${LoggerMiddleware.name}`)
    next()
    log(
      `${entry}Leave ${LoggerMiddleware.name} +${
        Date.now() - begin.getTime()
      }ms`
    )
  }
}

/**
 * 功能型中间件
 * consumer.apply(logger).forRoutes(...)
 */
export function logger(name?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const entry = name ? `[${name}] ` : ''
    const begin = new Date()
    log(`${entry}Enter ${logger.name}`)
    next()
    log(`${entry}Leave ${logger.name} +${Date.now() - begin.getTime()}ms`)
  }
}
