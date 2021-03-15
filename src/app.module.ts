import * as path from 'path'
import { BullModule } from '@nestjs/bull'
import { Module, CacheModule } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
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

@Module({
  imports: [
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
    BullModule.forRoot({
      redis: {
        host: '42.193.185.71',
        port: 6379
      }
    }),
    // BullModule.forRootAsync({}),
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
      rootPath: path.join(__dirname, '../client'),
      exclude: ['/api*']
    }),
    // 异步读取配置
    // ServeStaticModule.forRootAsync({})
    /*----------------------------------------------------------------*/
    /**
     * 简单缓存
     * pnpm i cache-manager
     * AppController 上添加 class 级别 @UseInterceptors(CacheInterceptor)
     */
    // 同步读取配置
    CacheModule.register(),
    // 异步读取配置
    // CacheModule.registerAsync({

    // })
    /*----------------------------------------------------------------*/
    /**
     * 动态模块
     * 指定根目录下的配置目录
     */
    DynamicConfigModule.register({ folder: './config' }),
    /*----------------------------------------------------------------*/
    // typeorm 数据库模块
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '42.193.185.71',
      port: 27017,
      // database: 'nestjs',
      username: 'super',
      password: 'zaixiyuzhonghuhan',
      entities: [TypeOrmMongoDBEntity],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    // TypeOrmModule.forRootAsync({}),
    TypeOrmMongoDBModule,
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

    // TODO 速率限制
    /**
     * 速率限制
     * https://docs.nestjs.com/security/rate-limiting
     */
    /* ----------------------------业务模块---------------------------- */
    // 登录授权验证
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
