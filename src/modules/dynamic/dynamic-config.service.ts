import * as path from 'path'
import { Inject, Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs-extra'
import { DYNAMIC_CONFIG_OPTIONS } from './constants'
import type { DynamicConfigOptions, EnvConfig } from './interfaces'

@Injectable()
export class DynamicConfigService {
  private readonly envConfig: EnvConfig

  constructor(@Inject(DYNAMIC_CONFIG_OPTIONS) options: DynamicConfigOptions) {
    const filePath = `.env.${process.env['NODE_ENV'] || 'development'}`
    const envFile = path.resolve(process.cwd(), options.folder, filePath)
    this.envConfig = dotenv.parse(fs.readFileSync(envFile))
  }

  get(key: string): string {
    return this.envConfig[key] || ''
  }
}
