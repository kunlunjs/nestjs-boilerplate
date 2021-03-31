import { logger } from '@/common/middlewares'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
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
