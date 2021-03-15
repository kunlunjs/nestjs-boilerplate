import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name)

  // CronExpression 上有很多写好的任务时间
  // @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45')
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds')
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds')
  }
}
