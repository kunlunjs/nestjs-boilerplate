import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest()
    const { httpAdapter } = this.httpAdapterHost
    const httpServer = httpAdapter.getHttpServer()

    const isGetRequest = httpServer.getRequestMethod(request) === 'GET'
    const excludePaths: string[] = []
    if (
      !isGetRequest ||
      (isGetRequest && excludePaths.includes(httpServer.getRequestUrl))
    ) {
      return undefined
    }
    // 默认使用 request URL 作为 cache key，可以变更为其它的，如 http header
    return httpServer.getRequestUrl(request)
  }
}
