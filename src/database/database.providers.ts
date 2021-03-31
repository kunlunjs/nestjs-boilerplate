import mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(
        `mongodb//root:1qaz2wsx@localhost:27017/nestjs`
      )
    }
  }
]
