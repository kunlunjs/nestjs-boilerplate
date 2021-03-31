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
    const entry = this.entrance ? ` [${this.entrance}] ` : ' '
    const begin = new Date()
    log(`[ ${begin.toISOString()}]${entry}Enter ${LoggerMiddleware.name}`)
    next()
    const end = new Date()
    log(
      `[ ${end.toISOString()}]${entry}Leave ${LoggerMiddleware.name} +${
        end.getTime() - begin.getTime()
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
    const entry = name ? ` [${name}] ` : ' '
    const begin = new Date()
    log(`[ ${begin.toISOString()}]${entry}Enter ${logger.name}`)
    next()
    const end = new Date()
    log(
      `[ ${end.toISOString()}]${entry}Leave ${logger.name} +${
        end.getTime() - begin.getTime()
      }ms`
    )
  }
}
