import * as path from 'path'
import { GraphQLDefinitionsFactory } from '@nestjs/graphql'

// 执行 ts-node src/modules/graphql-schema-first/generate-typings.ts 生成 graphql.schema.ts
const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: [path.join(__dirname, './**/*.graphql')],
  path: path.join(__dirname, './graphql.schema.ts'),
  // 默认生成 interface
  outputAs: 'class' // 生成 abstract class
  // watch: true
})
