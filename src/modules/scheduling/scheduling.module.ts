import { Module } from '@nestjs/common'
import { SchedulingService } from './scheduling.service'

// https://docs.nestjs.com/techniques/task-scheduling
@Module({
  providers: [SchedulingService]
})
export class SchedulingModule {}
