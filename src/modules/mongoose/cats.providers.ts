import mongoose, { Mongoose } from 'mongoose'

const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bread: String
})

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Cats', CatSchema),
    inject: ['DATABASE_CONNECTION']
  }
]
