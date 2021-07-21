import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import type { Document } from 'mongoose'

export type CatDocument = Cat & Document

@Schema()
export class Cat {
  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  bread: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)
