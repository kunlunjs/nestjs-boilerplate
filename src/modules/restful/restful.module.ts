import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { logger } from '@/common/middlewares'
import { RESTfulController } from './restful.controller'
import { RESTfulService } from './restful.service'

@Module({
  providers: [RESTfulService],
  controllers: [RESTfulController]
})
export class RESTfulModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger(RESTfulModule.name)).forRoutes('*')
  }
}
