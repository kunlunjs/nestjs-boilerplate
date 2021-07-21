import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { DYNAMIC_CONFIG_OPTIONS } from './constants'
import { DynamicConfigService } from './dynamic-config.service'

jest.mock('dotenv')
jest.mock('fs')

describe('DynamicConfigService', () => {
  let service: DynamicConfigService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DynamicConfigService,
        {
          provide: DYNAMIC_CONFIG_OPTIONS,
          useValue: {
            foldler: 'config'
          }
        }
      ]
    }).compile()

    service = moduleRef.get<DynamicConfigService>(DynamicConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
