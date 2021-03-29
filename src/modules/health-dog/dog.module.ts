import { Module } from '@nestjs/common'
import { DogHealthIndicator } from './dog.health'
import { DogService } from './dog.service'

// 配合 modules/health 演示
@Module({
  providers: [DogService, DogHealthIndicator],
  exports: [DogHealthIndicator]
})
export class DogModule {}
