import { DatabaseType, LoggerOptions } from 'typeorm'
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'

export interface EnvConfig {
  HELLO_MESSAGE: string

  PORT: number
  NODE_ENV: string

  // JWT AUTH
  JWT_SECRET_KEY: string
  JWT_EXPIRATION_TIME: number

  // HTTP
  HTTP_TIMEOUT: number
  HTTP_MAX_REDIRECTS: number

  // TypeORM
  DB_TYPE: DatabaseType
  DB_LOGGING: LoggerOptions
  DB_CACHE: Pick<BaseConnectionOptions, 'cache'>
  DB_LOGGER: Pick<BaseConnectionOptions, 'logger'>
  DB_SSL: boolean // Pick<PostgresConnectionCredentialsOptions, 'ssl'>

  // TypeORM MongoDB
  MONGO_TYPE: 'mongodb'
  MONGO_USERNAME: string
  MONGO_PASSWORD: string
  MONGO_HOST: string
  MONGO_PORT: number
  MONGO_DATABASE: string
  MONGO_RETRY_DELAY: number
  MONGO_RETRY_ATTEMPTS: number

  // PostgreSQL #
  // MYSQL_TYPE: string
  MYSQL_USERNAME: string
  MYSQL_PASSWORD: string
  MYSQL_HOST: string
  MYSQL_PORT: number
  MYSQL_DATABASE: string

  // PostgreSQL
  POSTGRESQL_TYPE: 'postgres'
  POSTGRESQL_USERNAME: string
  POSTGRESQL_PASSWORD: string
  POSTGRESQL_HOST: string
  POSTGRESQL_PORT: number
  POSTGRESQL_DATABASE: string

  // Microservice
  TRANSPORT_PORT: string
  TRANSPORT_RETRY_DELAY: string
  TRANSPORT_RETRY_ATTEMPTS: string

  // CACHE
  CACHE_TTL: number

  // REDIS
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_PASSWORD: string

  // 限流
  THROTTLE_TTL: number
  THROTTLE_LIMIT: number

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
