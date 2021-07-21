import * as path from 'path'
import { existsSync, readFileSync } from 'fs-extra'
import * as dotenv from 'dotenv'
import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common'
import type { PickByValue } from 'utility-types'
import { CONFIG_OPTIONS } from './constants'
import type { EnvConfig, EnvConfigKeys, EnvConfigValueType } from './interfaces'
import { ConfigModuleOptions } from './interfaces'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

// TODO
// 环境变量是 number 类型的 key
type NumberKeys<T extends keyof PickByValue<EnvConfig, number>> = T

const numKeys = [
  'PORT',
  'JWT_EXPIRATION_TIME',
  'HTTP_TIMEOUT',
  'HTTP_MAX_REDIRECTS',
  'MONGO_PORT',
  'MONGO_RETRY_DELAY',
  'MONGO_RETRY_ATTEMPTS',
  'MYSQL_PORT',
  'POSTGRESQL_PORT',
  'CACHE_TTL',
  'REDIS_PORT',
  'THROTTLE_LIMIT'
]
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig
  constructor() {
    const envPath = `.env.${process.env['NODE_ENV'] || 'development'}`
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
    this.envConfig = dotenv.parse(readFileSync(envFile)) as any as EnvConfig
  }

  get<T extends EnvConfigKeys>(key: T): EnvConfigValueType<T> {
    const config = this.envConfig[key]
    if (numKeys.includes(key)) {
      return +config as EnvConfigValueType<T>
    }
    if (['DB_SSL'].includes(key)) {
      return (
        config === 'false' ? false : config === 'true' ? true : config
      ) as EnvConfigValueType<T>
    }
    return config
  }

  getAll(): EnvConfig {
    return Object.keys(this.envConfig).reduce((acc, cur) => {
      if (numKeys.includes(cur)) {
        acc[cur] = +this.envConfig[cur]
      } else {
        acc[cur] = this.envConfig[cur]
      }
      return acc
    }, {}) as EnvConfig
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
