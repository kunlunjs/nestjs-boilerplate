import { Module } from '@nestjs/common'
import { CacheManagerController } from './cache.controller'

// https://docs.nestjs.com/techniques/caching
@Module({
  controllers: [CacheManagerController]
})
export class CacheManagerModule {}
