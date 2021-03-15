import { DynamicModule, Module } from '@nestjs/common'
import { DYNAMIC_CONFIG_OPTIONS } from './constants'
import { DynamicConfigService } from './dynamic-config.service'

export interface DynamicConfigModuleOptions {
  folder: string
}

@Module({})
export class DynamicConfigModule {
  static register(options: DynamicConfigModuleOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: [
        {
          provide: DYNAMIC_CONFIG_OPTIONS,
          useValue: options
        },
        DynamicConfigService
      ],
      exports: [DynamicConfigService]
    }
  }
}
