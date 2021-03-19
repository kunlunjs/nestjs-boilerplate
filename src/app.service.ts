import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleInit
} from '@nestjs/common'
import { DynamicConfigService } from './modules/dynamic/dynamic-config.service'

@Injectable()
export class AppService {
  // private helloMessage: string // = 'Hello World!'

  // DynamicConfigService 要在 AppModule 中注册，且 DynamicConfigService exports 出 DynamicConfigService
  // constructor(configService: DynamicConfigService) {
  //   this.helloMessage = configService.get('HELLO_MESSAGE')
  // }

  getHome(): string {
    return 'Hello World!' // this.helloMessage
  }
}
