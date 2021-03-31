import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { grpcClientOptions } from '@/grpc-client.options'
import { GRPCHeroController } from './grpc-hero.controller'
import { DogHealthIndicator } from '../health-dog/dog.health'

/**
 * GRPC 微服务模块
 * pnpm i @nestjs/microservices grpc @grpc/proto-loader
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions
      }
    ])
  ],
  controllers: [GRPCHeroController]
})
export class GRPCHeroModule {}
