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
import { EventEmitModule } from './modules/event-emit/event-emit.module'
import { QueueModule } from './modules/queues/queue.module'
import { SchedulingService } from './modules/scheduling/scheduling.service'
import { TypeOrmMongoEntity } from './modules/typeorm/mongodb.entity'
import { TypeOrmMongoModule } from './modules/typeorm/mongodb.module'
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
import {
  logger,
  LoggerMiddleware
} from './common/middlewares/logger.middleware'
import { CatsController } from './modules/mongoose/cats.controller'
import { ThrottlerConfigService } from './modules/throttler/throttler-config.service'
import { CalsModule } from './modules/cals/cals.module'
import { MicroserviceMathModule } from './modules/microservices/microservice-math.module'
import { ServerSentEventModule } from './modules/server-sent-event/sse.module'
import { MVCModule } from './modules/mvc/mvc.module'
import { CacheManagerModule } from './modules/cache/cache.module'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { JwtAuthGuard } from './common/guards'
import { HealthModule } from './modules/health/health.module'
import { GRPCHeroModule } from './modules/grpc/grpc-hero.module'
import { DogModule } from './modules/health-dog/dog.module'
import { NextJSModule } from './modules/nextjs/nextjs.module'
import { RESTfulModule } from './modules/restful/restful.module'
import { ValidationPipe } from './common/pipes'

@Module({
  imports: [
    /**
     * ???????????????
     */
    MicroserviceMathModule,
    GRPCHeroModule,
    /**
     * ??????????????????
     */
    EventEmitterModule.forRoot(),
    EventEmitModule,
    /*----------------------------------------------------------------*/
    /**
     * ????????????
     */
    // ScheduleModule.forRoot(),
    // SchedulingService,
    /*----------------------------------------------------------------*/
    /**
     * ????????????
     */
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379
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
            port: config.REDIS_PORT
          }
        }
      }
    }),
    QueueModule,
    /*----------------------------------------------------------------*/
    /**
     * ??????????????????
     * ???????????????????????? client/index.html
     * open http://localhost:3000/index.html or http://localhost:3000/
     * ?????? app.setGlobalPrefix('api') ??????
     */
    // ??????????????????
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), './client'),
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false
      }
    }),
    // ??????????????????
    // ServeStaticModule.forRootAsync({})
    /*----------------------------------------------------------------*/
    /**
     * ????????????
     * pnpm i cache-manager
     * AppController ????????? class ?????? @UseInterceptors(CacheInterceptor)
     */
    // ??????????????????
    // CacheModule.register(),
    // CacheModule.registerAsync({
    //   useClass: CacheConfigService
    // }),
    // ??????????????????
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
          // ????????????(s)???null ???????????????
          ttl: configService.get('CACHE_TTL')
          // max: 10 // maximum number of items in cache
        }
        // ?????? redis ?????????????????????
        // https://github.com/BryanDonovan/node-cache-manager#store-engines
        // return {
        //   store: redisStore,
        //   host: configService.get('REDIS_HOST')
        // }
      }
    }),
    CacheManagerModule,
    /*----------------------------------------------------------------*/
    /**
     * ????????????
     * ?????????????????????????????????
     * ????????? ConfigModule ?????????
     */
    // DynamicConfigModule.register({ folder: './config' }),
    /*----------------------------------------------------------------*/
    // typeorm ???????????????
    // ????????????
    // ????????????????????????/ormconfig.json ????????????
    // TypeOrmModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'localhost',
    //   port: 27017,
    //   database: 'nestjs',
    //   username: 'root',
    //   password: '',
    //   entities: [TypeOrmMongoEntity],
    //   synchronize: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }),
    // ????????????
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
    //       entities: [TypeOrmMongoEntity],
    //       synchronize: true,
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true
    //     }
    //   }
    // }),
    // ?????? TypeOrm ?????? MongoDB
    // TypeOrmMongoModule,
    /*----------------------------------------------------------------*/
    // ?????? Mongoose ?????? MongoDB
    // MongooseModule.forRoot(
    //   'mongodb://root:1qaz2wsx@localhost:27017/nestjs',
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
          MONGO_HOST: HOST,
          MONGO_PORT: PORT,
          MONGO_USERNAME: NAME,
          MONGO_PASSWORD: PW,
          MONGO_DATABASE: DB
          // MONGO_RETRY_DELAY: DELAY,
          // MONGO_RETRY_ATTEMPTS: ATTEMPTS
        } = configService.getAll()
        return {
          uri: `mongodb://${NAME}:${PW}@${HOST}:${PORT}/${DB}`
          // retryDelay: DELAY,
          // retryAttempts: ATTEMPTS
        }
      }
    }),
    MongooseCatsModule,
    /*----------------------------------------------------------------*/
    // HealthModule,
    /*----------------------------------------------------------------*/
    /**
     * GraphQL code first
     * ??? schema first ?????????
     * open http://localhost:3000/graphql
     */
    GraphQLModule.forRoot({
      // ???????????????????????????
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
     * ??? code first ?????????
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
     * socket.io ??? Websocket ??????
     */
    // SocketIOEventsModule,
    WebSocketEventsModule,

    /*----------------------------------------------------------------*/
    // TODO ????????????
    /**
     * ????????????
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
    /* ---------------------------- MVC ?????? ------------- */
    MVCModule,
    /* ---------------------------- Server Sent Events ?????? ------------- */
    ServerSentEventModule,
    /* ---------------------------- cals ??????---------------------------- */
    CalsModule,
    /* ----------------------------????????????---------------------------- */
    // ??????????????????
    AuthModule, // ?????????????????????????????? APP_GUARD
    /* ----------------------------????????????---------------------------- */
    UsersModule,
    // ?????? class-validate ?????????
    RESTfulModule,
    /* ----------------------------NextJS??????---------------------------- */
    NextJSModule,
    /* ----------------------------????????????---------------------------- */
    HealthModule,
    DogModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * ???????????? Authorization
     * ?????????????????????????????? modules/auth/auth.module.ts ???
     * ?????? @Public() ??????
     */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // },
    /**
     * ????????????????????????????????????????????? CacheModule.registerAsync(...)
     * ??????????????? CacheKey ???
     * ???????????? @CacheKey('name') ??? @CacheTTL(20) ?????????????????????????????????
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
    consumer.apply(logger(AppModule.name)).forRoutes('*')
    // consumer
    //   .apply(LoggerMiddleware)
    // ??????????????????
    // .apply(cors(), helmet(), logger)
    //   .exclude(
    //     { path: 'cats', method: RequestMethod.GET },
    //     { path: 'cats', method: RequestMethod.POST },
    //     'cats/(.*)'
    // )
    // .forRoutes('*')
    // ???????????? GLOBAL_PREFIX
    // .forRoutes('mongoose/cats')
    // .forRoutes({
    //   path: 'mongoose/cats',
    //   method: RequestMethod.ALL
    // })
    // ???????????????
    // .forRoutes({
    //   path: 'ab*cd',
    //   method: RequestMethod.GET
    // })
    // ??????????????????????????????????????????
    // .forRoutes(CatsController)
  }
}
