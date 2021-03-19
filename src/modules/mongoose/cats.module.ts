import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CatsService } from './cats.service'
import { CatsController } from './cats.controller'
import { Cat, CatSchema } from './schemas/cat.schema'
// import { DatabaseModule } from 'src/database/database.module'
// import { catsProviders } from './cats.providers'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema
      }
    ])
  ],
  controllers: [CatsController],
  providers: [CatsService]
})
export class MongooseCatsModule {}

// method 2
// 这种方式在 app.module.ts 中直接 imports: [CatsModule] 就可以，不用再导入数据库模块
// @Module({
//   imports: [DatabaseModule],
//   controllers: [CatsController],
//   providers: [CatsService, ...catsProviders]
// })
// export class MongooseCatsModule {}
