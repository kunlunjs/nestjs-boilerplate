# Nest 中的 GraphQL

## 核心 package
```bash
pnpm i graphql
pnpm i @nestjs/graphql
pnpm i graphql-tools
pnpm i apollo-server-express
```

## 基本使用
```ts
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    // forRoot 选项将被传递到底层的 Apollo 实例
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      // 指定包含的模块
      include: [SomeModule]
    })
  ]
})
export class AppModule {}
```

1. 代码优先
使用 decorator 和 TypeScript 类生成相应的 GraphQL 模式

```ts
import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      // 如为 true 则动态生成模式（内存中）
      // 自动生成 graphql 文件的位置
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // 按字母对 schema 排序
      sortSchema: true,
    })
  ]
})
export class AppModule {}
```

2. 模式优先
真值的来源是 GraphQL SDL（模型定义语言）文件（跨平台），Nest 基于 GraphQL 模式自动生成 TypeScript 类型定义
```typescript
// app.module.ts
import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      // 首先要指定 graphql 文件路径
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      }
    })
  ]
})
export class AppModule {}

// generator-typing.ts 执行 ts-node generator-typing.ts 生成相应 graphql 文件
import { join } from 'path';
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  // 为每个对象类型生成附加的 _typename 字段
  // emitTypenameField: true,
  watch: true
})
```
