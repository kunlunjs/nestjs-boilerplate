import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from '@nestjs/common'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 5
    }
  }
}
