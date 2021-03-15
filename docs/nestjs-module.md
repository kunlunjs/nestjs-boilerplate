# Nest Module

## basic module

`nest g module cats`

```ts
// cats/cats.module.ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
// app.module.ts
import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [CatsModule]
})
export class AppModule {}
```

## Shared modules

```ts
// cats/cats.module.ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // 任何导入 CatsModule 的模块都可以访问 CatsService，并与导入 CatsService 的所有其它模块共享相同的实例
  exports: [CatsService]
})
export class CatsModule {
  // TODO optional，由于循环依赖性，模块类本身不能作为提供程序注入？（需要加深理解）
  constructor(private catService: CatsService)
}
```

## Module re-exporting

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule]
})
export class CoreModule {}

```

## Dependency injection

## Dynamic modules

```ts
// database.module.ts
// 动态模块
import { Module, DynamicModule } from '@nestjs/common'
import { createDatabaseProviders } from './database.providers'
import { Connection } from './connection.provider'

@Module({
  providers: [Connection]
})
export class DatabaseModule {
  static forRoot(entities = [], options?: Record<string, any>): DynamicModule {
    const providers = createDatabaseProviders(options, entities)
    return {
      // 如需要在全局模块中注册则开启此选项
      // global: true
      module: DatabaseModule,
      providers,
      exports: providers
    }
  }
}
// app.module.ts
// 导入和配置动态模块
import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { User } from './users/entities/user.entity'

@Module({
  imports: [DatabaseModule.forRoot([User])]
})
export class AppModule {}
```

## Global modules

```ts
import { Module, Global } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

// 全局模块应该只注册一次，在根模块或核心模块中注册
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```