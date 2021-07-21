import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../modules/config/config.module'
import { ConfigService } from '../modules/config/config.service'
import { TranslationService } from './services'
import { EnvService } from './services/env.service'
import { GeneratorService } from './services/generator.service'
import { ValidatorService } from './services/validator.service'

const providers = [
  EnvService,
  GeneratorService,
  // TranslationService,
  ValidatorService
]

@Global()
@Module({
  providers: [ConfigService, ...providers],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
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
  exports: [ConfigService, JwtModule, ...providers]
})
export class SharedModule {}
