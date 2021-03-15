import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WsAdapter } from '@nestjs/platform-ws'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

export const GLOBAL_PREFIX = 'api'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 开启允许跨域请求 https://docs.nestjs.com/security/cors
  app.enableCors()
  // 设置路由全局前缀
  app.setGlobalPrefix(GLOBAL_PREFIX)
  /**
   * 全局拦截器
   * 会在 module 加载完，controller 加载前初始化
   */
  app.useGlobalInterceptors(new LoggingInterceptor(bootstrap.name))
  // 全局管道，依赖 class-validator
  app.useGlobalPipes(new ValidationPipe())
  // WebSocket 服务
  app.useWebSocketAdapter(new WsAdapter(app))

  /**
   * 配置渲染模板位置和引擎
   */
  app.useStaticAssets(path.join(__dirname, '../public'))
  app.setBaseViewsDir(path.join(__dirname, '../views'))
  app.setViewEngine('hbs')

  // 开启 gzip 压缩 https://docs.nestjs.com/techniques/compression
  app.use(compression())
  // https://docs.nestjs.com/security/helmet
  app.use(helmet())
  // TODO CSRF 保护
  /**
   * CSRF 保护
   * https://docs.nestjs.com/security/csrf
   */

  await app.listen(3000)
  console.log(`🚀 Application is running on: ${await app.getUrl()}`)
}

bootstrap()
