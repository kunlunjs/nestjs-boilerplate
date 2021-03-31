import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SequelizeModule } from '@nestjs/sequelize'
import { DogModule } from '../health-dog/dog.module'
import { HealthController } from './health.controller'

@Module({
  imports: [
    TerminusModule,
    DogModule,
    // TODO 连接不上，待修复
    // MongooseModule.forRoot(`mongodb://nestjs:1qaz2wsx@localhost:27017/nestjs`)
    // 单数据库连接
    // TypeOrmModule.forRoot(/* 默认加载 ormconfig.json */)
    // 多数据库连接
    TypeOrmModule.forRootAsync({
      name: 'mysql-rs01',
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1qaz2wsx',
        database: 'nestjs',
        synchronize: true
      })
    }),
    TypeOrmModule.forRootAsync({
      name: 'mysql-rs02',
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '1qaz2wsx',
        database: 'nestjs',
        synchronize: true
      })
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1qaz2wsx',
      database: 'nestjs',
      // autoLoadModels: true,
      synchronize: true
    })
  ],
  controllers: [HealthController]
})
export class HealthModule {}
