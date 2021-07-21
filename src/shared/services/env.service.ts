import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dotenv from 'dotenv'

/**
 * 通过 process.env 存取环境变量等配置，是 modules/config 之外的另一种方式
 */
export class EnvService {
  constructor() {
    const nodeEnv = this.nodeEnv
    dotenv.config({
      path: `.env.${nodeEnv}`
    })
    // Replace \\n with \n to support multiline strings in AWS
    for (const key of Object.keys(process.env)) {
      if (typeof process.env[key] === 'string') {
        process.env[key] = (process.env[key] as string).replace(/\\n/g, '\n')
      }
    }
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development'
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production'
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development'
  }

  public get(key: string): string {
    return process.env[key] || ''
  }

  public getNumber(key: string): number {
    return Number(this.get(key))
  }

  get fallbackLanguage(): string {
    return this.get('FALLBACK_LANGUAGE').toLowerCase()
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    // TODO 待完成
    return {}
  }
}
