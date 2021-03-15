import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RecipeModel {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  creationDate: Date

  @Field(type => [String])
  ingredients: string[]
}
