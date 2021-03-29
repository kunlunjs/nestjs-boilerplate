import { Injectable } from '@nestjs/common'
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError
} from '@nestjs/terminus'
import { DogService } from './dog.service'
import { DogState } from './interfaces/dog.interface'

@Injectable()
export class DogHealthIndicator extends HealthIndicator {
  constructor(private readonly dogService: DogService) {
    super()
  }

  async isHealth(key: string): Promise<HealthIndicatorResult> {
    const dogs = await this.dogService.getDogs()
    const badboys = dogs.filter(dog => dog.state === DogState.BAD_BOY)
    const isHealthy = badboys.length === 0

    const result = this.getStatus(key, isHealthy, {
      badboys: badboys.length
    })

    if (isHealthy) {
      return result
    }
    throw new HealthCheckError('Dogcheck failed', result)
  }
}
