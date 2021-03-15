import {
  Global,
  HttpModule,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
  Module
} from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from './modules/config/config.module'
import { ConfigService } from './modules/config/config.service'

// @Injectable()
// export class HttpConfigService implements HttpModuleOptionsFactory {
//   createHttpOptions(): HttpModuleOptions {
//     return {
//       timeout: 5000,
//       maxRedirects: 5
//     }
//   }
// }

@Global()
@Module({
  providers: [ConfigService],
  imports: [
    /**
     * HttpModule
     * 内部封装了 axios
     * https://docs.nestjs.com/techniques/http-module#http-module
     */
    // HttpModule,
    // HttpModule.register({
    //   timeout: 5000,
    //   maxRedirects: 5
    // }),
    // HttpConfigService 使用上面的定义
    // HttpModule.registerAsync({
    //   useClass: HttpConfigService
    // }),
    HttpModule.registerAsync({
      // 可异步配置
      useFactory: (configService: ConfigService) => {
        return {
          timeout: 5000,
          maxRedirects: 5
        }
      }
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = configService.getAll()
        return {
          secret: JWT_SECRET_KEY,
          signOptions: {
            ...(JWT_EXPIRATION_TIME
              ? {
                  expiresIn: JWT_EXPIRATION_TIME
                }
              : {})
          }
        }
      }
    })
  ],
  exports: [ConfigService, HttpModule, JwtModule]
})
export class GlobalModule {}
