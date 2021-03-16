import { DatabaseType, LoggerOptions } from 'typeorm'
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'

export interface EnvConfig {
  NODE_ENV: string
  APP_HOST: string
  APP_PORT: number

  // JWT AUTH
  JWT_SECRET_KEY: string
  JWT_EXPIRATION_TIME: number

  // CACHE
  CACHE_TTL: string

  // HTTP
  HTTP_TIMEOUT: number
  HTTP_MAX_REDIRECTS: number

  // DATABASE
  DB_TYPE: DatabaseType
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_HOST: string
  DB_PORT: number
  DB_DATABASE: string
  ENTITY_PREFIX: string
  DB_LOGGING: LoggerOptions
  DB_CACHE: Pick<BaseConnectionOptions, 'cache'>
  DB_LOGGER: Pick<BaseConnectionOptions, 'logger'>
  DB_SSL: boolean // Pick<PostgresConnectionCredentialsOptions, 'ssl'>
  TIMEZONE: string

  // REDIS
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_PASSWORD: string

  FALLBACK_LANGUAGE: string

  S3_BUCKET_NAME: string
  AWS_S3_ACCESS_KEY_ID: string
  AWS_S3_SECRET_ACCESS_KEY: string
}

// 配置项 key 类型
export type EnvConfigKeys = keyof EnvConfig
// 配置项 value 类型
export type EnvConfigValue<T extends EnvConfig, K extends EnvConfigKeys> = T[K]
// 配置项 value 类型
export type EnvConfigValueType<K extends EnvConfigKeys> = EnvConfig[K]
