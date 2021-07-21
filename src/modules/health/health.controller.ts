import { Public } from '@/common/decorators'
import { Controller, Get, Type } from '@nestjs/common'
import type { RedisOptions } from '@nestjs/microservices'
import { GrpcOptions, Transport } from '@nestjs/microservices'
import type {
  HealthCheckService,
  GRPCHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  MongooseHealthIndicator,
  SequelizeHealthIndicator,
  MicroserviceHealthIndicator
} from '@nestjs/terminus'
import { HealthCheck } from '@nestjs/terminus'
import { InjectConnection } from '@nestjs/typeorm'
import type { Connection } from 'typeorm'
import type { DogHealthIndicator } from '../health-dog/dog.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dogHealthIndicator: DogHealthIndicator,
    private grpc: GRPCHealthIndicator,
    private memory: MemoryHealthIndicator,
    private typeorm: TypeOrmHealthIndicator,
    private mongoose: MongooseHealthIndicator,
    private sequelize: SequelizeHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    /**
     * 多数据库连接，mysql1 mysql2 要和 ./health.module.ts TypeOrmModule.forRootAsync({name: 'mysql-rs01'}) 一致
     */
    @InjectConnection('mysql-rs01')
    private mysql1: Connection,
    @InjectConnection('mysql-rs02')
    private mysql2: Connection
  ) {}

  /**
   * /api/health
   * @returns {"status":"ok","info":{"dog":{"status":"up","badboys":0},"memory_rss":{"status":"up"},"typeorm":{"status":"up"},"redis":{"status":"up"}},"error":{},"details":{"dog":{"status":"up","badboys":0},"memory_rss":{"status":"up"},"typeorm":{"status":"up"},"redis":{"status":"up"}}}
   */
  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      /**
       * src/modules/health-dog
       */
      async () => this.dogHealthIndicator.isHealth('dog'),
      /**
       * 内存
       */
      // TODO 有问题待解决
      // async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      /**
       * TypORM
       */
      // 单数据库连接
      // async () => this.typeorm.pingCheck('typeorm'),
      // 多数据库连接
      async () => this.typeorm.pingCheck('mysql1', { connection: this.mysql1 }),
      async () => this.typeorm.pingCheck('mysql2', { connection: this.mysql2 }),
      /**
       * mongoose
       */
      // async () => this.mongoose.pingCheck('mongoose'),
      /**
       * Sequelize
       */
      // TODO 有问题待解决
      // async () => this.sequelize.pingCheck('sequelize'),
      /**
       * GRPC
       */
      // TODO
      // async () =>
      //   this.grpc.checkService<GrpcOptions>('hero_service', 'hero.health.v1', {
      //     timeout: 2000
      //   }),
      /**
       * 微服务
       */
      // TODO
      // async () =>
      //   this.microservice.pingCheck('tcp', {
      //     transport: Transport.TCP,
      //     options: { host: 'localhost', port: 8889 }
      //   }),
      async () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url: 'redis://localhost:6379'
          }
        })
    ])
  }
}
