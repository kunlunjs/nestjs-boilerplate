import mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(
        `mongodb//root:***@47.111.100.233:27017/nestjs`
      )
    }
  }
]
