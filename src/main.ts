import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WsAdapter } from '@nestjs/platform-ws'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { RolesGuard } from './common/guards/roles.guards'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { AppService } from './app.service'

export const GLOBAL_PREFIX = 'api'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 允许跨域请求 https://docs.nestjs.com/security/cors
  app.enableCors()
  // 设置路由全局前缀
  app.setGlobalPrefix(GLOBAL_PREFIX)
  /**
   * 全局拦截器
   * 会在 module 加载完，controller 加载前初始化
   */
  app.useGlobalInterceptors(new LoggingInterceptor(bootstrap.name))
  /**
   * 全局过滤器
   *
   */
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter())
  // TODO useGlobalGuards
  /**
   * 全局守卫
   */
  // app.useGlobalGuards()
  /**
   * 全局管道，依赖 class-validator
   */
  app.useGlobalPipes(new ValidationPipe())
  // WebSocket 服务
  app.useWebSocketAdapter(new WsAdapter(app))

  /**
   * 配置渲染模板位置和引擎
   */
  app.useStaticAssets(path.join(__dirname, '../public'))
  app.setBaseViewsDir(path.join(__dirname, '../views'))
  app.setViewEngine('hbs')

  /**
   * 开启 gzip 压缩
   * https://docs.nestjs.com/techniques/compression
   */
  app.use(compression())
  // TODO 理解 helmet 选项
  /**
   * 安全
   * https://docs.nestjs.com/security/helmet
   */
  app.use(
    helmet({
      // 开启这个选项会导致
      // Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'".
      // Either the 'unsafe-inline' keyword, a hash('sha256-KaTA/04nO8gX81h3eJkbac/8o94DAESlPH7wRbp8adU='),
      // or a nonce('nonce-...') is required to enable inline execution.
      contentSecurityPolicy: false
    })
  )
  // TODO CSRF 保护
  /**
   * CSRF 保护
   * https://docs.nestjs.com/security/csrf
   */

  // TODO 什么场景下会用到
  /**
   * context
   */
  // const appService = app.get(AppService)

  await app.listen(3000)
  console.log(`🚀 Application is running on: ${await app.getUrl()}`)
}

bootstrap()
