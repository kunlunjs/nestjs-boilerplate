# TypeOrm

```ts
// app.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmMongoDBEntity } from './modules/typeorm/mongodb.entity'
import { TypeOrmMongoDBModule } from './modules/typeorm/mongodb.module'

@Module({
  imports: [
    // typeorm 数据库模块
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nestjs',
      username: 'root',
      password: '1qaz2wsx',
      entities: [TypeOrmMongoDBEntity],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    // TypeOrmModule.forRootAsync({}),
    TypeOrmMongoDBModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```