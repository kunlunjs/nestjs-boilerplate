import type { ThrottlerOptionsFactory } from '@nestjs/throttler'

export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  async createThrottlerOptions() {
    // return {
    //   ttl: 60,
    //   limit: 10
    // }
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ttl: 60,
          limit: 10
        })
      })
    })
  }
}
