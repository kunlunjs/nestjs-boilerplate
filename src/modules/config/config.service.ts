import * as path from 'path'
import { existsSync, readFileSync } from 'fs-extra'
import * as dotenv from 'dotenv'
import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common'
import { CONFIG_OPTIONS } from './constants'
import {
  ConfigModuleOptions,
  EnvConfig,
  EnvConfigKeys,
  EnvConfigValueType
} from './interfaces'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor() {
    const envPath = `${process.env['NODE_ENV'] || 'development'}.env`
    const rootEnvFile = path.resolve(process.cwd(), envPath)
    const configEnvFile = path.resolve(process.cwd(), './config', envPath)
    let envFile
    // 优先从根目录查找配置文件，其次是 config 目录
    if (existsSync(rootEnvFile)) {
      envFile = rootEnvFile
    } else if (existsSync(configEnvFile)) {
      envFile = configEnvFile
    } else {
      throw new ServiceUnavailableException('Missing configuration file')
    }
    this.envConfig = (dotenv.parse(readFileSync(envFile)) as any) as EnvConfig
  }

  get<T extends EnvConfigKeys>(key: T): EnvConfigValueType<T> {
    const config = this.envConfig[key]
    if (
      ['APP_PORT', 'JWT_EXPIRATION_TIME', 'DB_PORT', 'REDIS_PORT'].includes(key)
    ) {
      return +config as EnvConfigValueType<T>
    }
    if (['DB_SSL'].includes(key)) {
      return (config === 'false'
        ? false
        : config === 'true'
        ? true
        : config) as EnvConfigValueType<T>
    }
    return config
  }

  getAll(): EnvConfig {
    const configs = this.envConfig
    return {
      ...configs,
      APP_PORT: +configs.APP_PORT,
      DB_PORT: +configs.DB_PORT,
      // DB_SSL:
      //   configs.DB_SSL === 'false'
      //     ? false
      //     : configs.DB_SSL === 'true'
      //     ? true
      //     : configs.DB_SSL,
      REDIS_PORT: +configs.REDIS_PORT,
      JWT_EXPIRATION_TIME: +configs.JWT_EXPIRATION_TIME
    }
  }

  isEnv(env: string): boolean {
    return this.envConfig.NODE_ENV === env
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development'
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production'
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    // let entries = [process.cwd(), './src/modules/**/*.entity{.ts,.js}']
    // let migrations = [process.cwd(), './src/database/**/*.migrations{.ts,.js}']
    return {}
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development'
  }

  get fallbackLanguage(): string {
    return this.get('FALLBACK_LANGUAGE').toLocaleLowerCase()
  }
}
