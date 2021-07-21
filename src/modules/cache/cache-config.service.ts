import type { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 5
    }
  }
}
