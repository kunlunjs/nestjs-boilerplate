import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable
} from '@nestjs/common'

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5
    }
  }
}
