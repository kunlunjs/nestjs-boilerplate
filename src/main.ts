import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common'
import { WsAdapter } from '@nestjs/platform-ws'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import compression from 'compression'
import { log } from '@/utils/log'
import { AppModule } from './app.module'
import { LoggingInterceptor, TransformInterceptor } from './common/interceptors'
import { HttpExceptionFilter, AllExceptionsFilter } from './common/filters'
import { RolesGuard } from './common/guards'
import { AppService } from './app.service'
import { logger } from './common/middlewares'
import { SharedModule } from './shared/shared.module'
import { EnvService } from './shared/services'
import { setupSwagger } from './setup-swagger'
import { grpcClientOptions } from './grpc-client.options'

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
  app.useGlobalInterceptors(
    new LoggingInterceptor(bootstrap.name),
    new TransformInterceptor(bootstrap.name)
  )
  /**
   * 全局过滤器
   *
   */
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter())

  /**
   * 全局守卫
   */
  // app.useGlobalGuards()

  /**
   * 全局管道，依赖 class-validator
   * app.module.ts
   *  {
        provide: APP_PIPE,
        useClass: ValidationPipe
      }
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // 自动删除请求中未定义的属性字段
      whitelist: true,
      transform: true,
      // 禁用详细错误
      // disableErrorMessages: true,
      // 如果请求出现未定义的属性字段，forbidNonWhitelisted 和 whitelist 都为 true 时则返回错误响应
      // 是否隐藏默认错误信息 contraints: {...}
      // forbidNonWhitelisted: true,
      // dismissDefaultMessages: true,
      // 默认校验错误码 400，指定为 422
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // 默认校验错误是 BadRequestException，指定为 UnprocessableEntityException
      exceptionFactory: errors => new UnprocessableEntityException(errors)
    })
  )

  /**
   * 配置渲染模板位置和引擎
   * 第二个参数支持更多选项配置
   */
  app.useStaticAssets(path.join(process.cwd(), './public'))
  app.setBaseViewsDir(path.join(process.cwd(), './pages'))
  app.setViewEngine('hbs')

  /**
   * 开启 gzip 压缩
   * https://docs.nestjs.com/techniques/compression
   */
  app.use(compression())

  /**
   * 安全
   * https://docs.nestjs.com/security/helmet
   */
  // app.use(
  //   helmet({
  //     // 不开启这个选项会导致
  //     // Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'".
  //     // Either the 'unsafe-inline' keyword, a hash('sha256-KaTA/04nO8gX81h3eJkbac/8o94DAESlPH7wRbp8adU='),
  //     // or a nonce('nonce-...') is required to enable inline execution.
  //     contentSecurityPolicy: false
  //   })
  // )

  /**
   * CSRF 保护
   * https://docs.nestjs.com/security/csrf
   */

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
  // 连接 modules/gprc
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  // 连接 modules/microservices
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: envService.getNumber('TRANSPORT_PORT'),
      retryDelay: 3000,
      retryAttempts: 5
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
