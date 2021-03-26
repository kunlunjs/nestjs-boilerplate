import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors
} from '@nestjs/common'
import { Public } from '@/common/decorators'
import { UtilsService } from '@/common/providers/utils.service'
// import Mock from '@/utils/mock'
// import { HttpCacheInterceptor } from '@/common/interceptors'

@Controller('cache')
// @UseInterceptors(CacheInterceptor)
// @UseInterceptors(HttpCacheInterceptor)
export class CacheManagerController {
  // GET /api/cache/sample
  @Public()
  @Get('simple')
  // @CacheKey('random_array') // 自定义缓存 key
  @CacheTTL(5) // 自定义过期时间
  simple() {
    const length = Math.ceil(Math.random() * 1000)
    return {
      count: length,
      items: [...Array(length)].map((_, ix) => ({
        id: ix,
        name: UtilsService.generateRandomString(6)
      }))
    }
  }
}
