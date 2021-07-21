import type { Document } from 'mongoose'

export interface Cat extends Document {
  readonly name: string
  readonly age: number
  readonly bread: string
}
