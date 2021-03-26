import * as path from 'path'
import { BullModule } from '@nestjs/bull'
import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  CacheInterceptor
} from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import * as redisStore from 'cache-manager-redis-store'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventEmitModule } from './modules/eventemit/eventemit.module'
import { QueueModule } from './modules/queues/queue.module'
import { SchedulingService } from './modules/scheduling/scheduling.service'
import { TypeOrmMongoDBEntity } from './modules/typeorm/mongodb.entity'
import { TypeOrmMongoDBModule } from './modules/typeorm/mongodb.module'
import { RecipesModule } from './modules/graphql-code-first/recipes.module'
import { CatsModule } from './modules/graphql-schema-first/cats/cats.module'
import { SocketIOEventsModule } from './modules/events/socket.io-events.module'
import { WebSocketEventsModule } from './modules/events/websocket-events.module'
import { DynamicConfigModule } from './modules/dynamic/dynamic-config.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { ConfigModule } from './modules/config/config.module'
import { ConfigService } from './modules/config/config.service'
import { CacheConfigService } from './modules/cache/cache-config.service'
import { SharedModule } from './shared/shared.module'
import { MongooseCatsModule } from './modules/mongoose/cats.module'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { CatsController } from './modules/mongoose/cats.controller'
import { ThrottlerConfigService } from './modules/throttler/throttler-config.service'
import { CalsModule } from './modules/cals/cals.module'
import { MicroserviceModule } from './modules/microservices/microservice.module'
import { ServerSentEventModule } from './modules/sse/sse.module'
import { MVCModule } from './modules/mvc/mvc.module'
import { CacheManagerModule } from './modules/cache/cache.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtAuthGuard } from './common/guards'

@Module({
  imports: [
    /**
     * 微服务模块
     */
    MicroserviceModule,
    /**
     * 发布订阅事件
     */
    EventEmitterModule.forRoot(),
    EventEmitModule,
    /*----------------------------------------------------------------*/
    /**
     * 定时任务
     */
    // ScheduleModule.forRoot(),
    // SchedulingService,
    /*----------------------------------------------------------------*/
    /**
     * 队列处理
     */
    // BullModule.forRoot({
    //   redis: {
    //     host: '47.111.100.233',
    //     port: 6379,
    //     password: 'redis.2021_turing-fe'
    //   }
    // }),
    BullModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = await configService.getAll()
        return {
          redis: {
            host: config.REDIS_HOST,
            port: config.REDIS_PORT,
            password: config.REDIS_PASSWORD
          }
        }
      }
    }),
    QueueModule,
    /*----------------------------------------------------------------*/
    /**
     * 静态文件服务
     * 默认读取根目录下 client/index.html
     * open http://localhost:3000/index.html or http://localhost:3000/
     * 不受 app.setGlobalPrefix('api') 约束
     */
    // 同步读取配置
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), './client'),
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false
      }
    }),
    // TODO 理解 ServeStaticModule 异步配置
    // 异步读取配置
    // ServeStaticModule.forRootAsync({})
    /*----------------------------------------------------------------*/
    /**
     * 简单缓存
     * pnpm i cache-manager
     * AppController 上添加 class 级别 @UseInterceptors(CacheInterceptor)
     */
    // 同步读取配置
    // CacheModule.register(),
    // CacheModule.registerAsync({
    //   useClass: CacheConfigService
    // }),
    // 异步读取配置
    CacheModule.registerAsync({
      // useFactory: () => {
      //   return {
      //     ttl: 5
      //   }
      // }
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          // 过期时间(s)，null 为永不过期
          ttl: configService.get('CACHE_TTL')
          // max: 10 // maximum number of items in cache
        }
        // 支持 redis 作为缓存存储器
        // https://github.com/BryanDonovan/node-cache-manager#store-engines
        // return {
        //   store: redisStore,
        //   host: configService.get('REDIS_HOST'),
        //   port: configService.get('REDIS_PORT')
        // }
      }
    }),
    CacheManagerModule,
    /*----------------------------------------------------------------*/
    /**
     * 动态模块
     * 指定根目录下的配置目录
     * 比较与 ConfigModule 的差异
     */
    DynamicConfigModule.register({ folder: './config' }),
    /*----------------------------------------------------------------*/
    // typeorm 数据库模块
    // 同步配置
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: '47.111.100.233',
    //   port: 27017,
    //   // database: 'nestjs',
    //   username: 'super',
    //   password: 'mongodb.2021_turing-fe',
    //   entities: [TypeOrmMongoDBEntity],
    //   synchronize: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }),
    // 异步配置
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [SharedModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const config = await configService.getAll()
    //     return {
    //       type: config.DB_TYPE,
    //       host: config.DB_HOST,
    //       port: config.DB_PORT,
    //       // database: 'nestjs',
    //       username: config.DB_USERNAME,
    //       password: config.DB_PASSWORD,
    //       entities: [TypeOrmMongoDBEntity],
    //       synchronize: true,
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true
    //     }
    //   }
    // }),
    // 使用 TypeOrm 操作 MongoDB
    // TypeOrmMongoDBModule,
    /*----------------------------------------------------------------*/
    // 使用 Mongoose 操作 MongoDB
    // MongooseModule.forRoot(
    //   'mongodb://root:mongodb.2021_turing-fe@47.111.100.233:27017/nestjs',
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   }
    // ),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const {
          DB_HOST,
          DB_PORT,
          DB_USERNAME,
          DB_PASSWORD,
          DB_DATABASE
          // DB_MONGODB_RETRY_DELAY,
          // DB_MONGODB_RETRY_ATTEMPTS
        } = configService.getAll()
        return {
          uri: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
          // retryDelay: DB_MONGODB_RETRY_DELAY,
          // retryAttempts: DB_MONGODB_RETRY_ATTEMPTS
        }
      }
    }),
    MongooseCatsModule,
    /*----------------------------------------------------------------*/
    /**
     * GraphQL code first
     * 与 schema first 二取一
     * open http://localhost:3000/graphql
     */
    GraphQLModule.forRoot({
      // 默认在项目根目录下
      autoSchemaFile: path.join(
        process.cwd(),
        'src/modules/graphql-code-first/schema.gql'
      ),
      installSubscriptionHandlers: true
    }),
    // GraphQLModule.forRootAsync({}),
    RecipesModule,
    /*----------------------------------------------------------------*/
    /**
     * GraphQL schema first
     * 与 code first 二取一
     * open http://localhost:3000/graphql
     */
    // CatsModule,
    // GraphQLModule.forRoot({
    //   typePaths: [
    //     path.join(process.cwd(), 'src/modules/graphql-schema-first/**/*.graphql')
    //   ],
    //   installSubscriptionHandlers: true
    // }),
    /*----------------------------------------------------------------*/
    /**
     * socket.io 和 Websocket 使用
     */
    // SocketIOEventsModule,
    WebSocketEventsModule,

    /*----------------------------------------------------------------*/
    // TODO 速率限制
    /**
     * 速率限制
     * https://docs.nestjs.com/security/rate-limiting
     */
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10
    // }),
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: ThrottlerConfigService
    // }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      imports: [SharedModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.getAll()
        return {
          ttl: config.THROTTLE_TTL,
          limit: config.THROTTLE_LIMIT
        }
      }
    }),
    /* ---------------------------- MVC 模块 ------------- */
    MVCModule,
    /* ---------------------------- Server Sent Events 模块 ------------- */
    ServerSentEventModule,
    /* ---------------------------- cals 模块---------------------------- */
    CalsModule,
    /* ----------------------------授权模块---------------------------- */
    // 登录授权验证
    AuthModule, // 可以包含全局路由保护 APP_GUARD
    /* ----------------------------业务模块---------------------------- */
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * 全局路由 Authorization
     * 可以写在子模块中，如 modules/auth/auth.module.ts 中
     * 使用 @Public() 放过
     */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    /**
     * 将缓存处理绑定到全局端点，配合 CacheModule.registerAsync(...)
     * 全局缓存在 CacheKey 下
     * 可以通过 @CacheKey('name') 和 @CacheTTL(20) 在方法上来重写缓存设置
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    // 支持多中间件
    // .apply(cors(), helmet(), logger)
    //   .exclude(
    //     { path: 'cats', method: RequestMethod.GET },
    //     { path: 'cats', method: RequestMethod.POST },
    //     'cats/(.*)'
    // )
    // .forRoutes('*')
    // 不需要带 GLOBAL_PREFIX
    // .forRoutes('mongoose/cats')
    // .forRoutes({
    //   path: 'mongoose/cats',
    //   method: RequestMethod.ALL
    // })
    // 支持通配符
    // .forRoutes({
    //   path: 'ab*cd',
    //   method: RequestMethod.GET
    // })
    // 可传入多个控制器，以逗号分隔
    // .forRoutes(CatsController)
  }
}
