import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common'
import { WsAdapter } from '@nestjs/platform-ws'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import compression from 'compression'
import { log } from '@/utils/log'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { RolesGuard } from './common/guards/roles.guards'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { AppService } from './app.service'
import { logger } from './common/middlewares/logger.middleware'
import { SharedModule } from './shared/shared.module'
import { EnvService } from './shared/services/env.service'
import { setupSwagger } from './setup-swagger'
import { Transport } from '@nestjs/microservices'

export const GLOBAL_PREFIX = 'api'

const PORT = parseInt(process.env['PORT'] as string, 10) || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 允许跨域请求 https://docs.nestjs.com/security/cors
  app.enableCors()
  // 设置路由全局前缀
  app.setGlobalPrefix(GLOBAL_PREFIX)
  /**
   * 全局中间件
   */
  // app.use(logger)
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
  app.useGlobalPipes(
    new ValidationPipe(
      // TODO 理解 ValidationPipe 选项
      {
        whitelist: true,
        transform: true,
        dismissDefaultMessages: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        exceptionFactory: errors => new UnprocessableEntityException(errors)
      }
    )
  )

  /**
   * 配置渲染模板位置和引擎
   */
  app.useStaticAssets(path.join(process.cwd(), './public'), {
    prefix: 'static',
    // 禁止默认使用（找不到请求对应的静态文件） public/index.html
    index: false
  })
  app.setBaseViewsDir(path.join(process.cwd(), './pages'))
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
      // 不开启这个选项会导致
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

  // TODO 获取 Service 实例
  /**
   * context
   */
  // const appService = app.get(AppService)

  // 获取模块内 service
  const envService = app.select(SharedModule).get(EnvService)

  /**
   * WebSocket 服务
   */
  app.useWebSocketAdapter(new WsAdapter(app))

  /**
   * 微服务
   */
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: envService.getNumber('TRANSPORT_PORT'),
      retryDelay: envService.getNumber('TRANSPORT_RETRY_DELAY') || 3000,
      retryAttempts: envService.getNumber('TRANSPORT_RETRY_ATTEMPTS') || 5
    }
  })
  await app.startAllMicroservicesAsync()

  /**
   * Swagger 文档
   */
  if (['development', 'staging'].includes(envService.nodeEnv)) {
    setupSwagger(app)
  }

  await app.listen(PORT)
  log(`🚀 Application is running on: ${await app.getUrl()}`)
}

bootstrap()
