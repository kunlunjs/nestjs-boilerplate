import { Injectable } from '@nestjs/common'
import type { RecipeInput } from './dto/new-recipe.input'
import type { RecipesArgs } from './dto/recipes.args'
import type { RecipeModel } from './models/recipe.model'

@Injectable()
export class RecipesService {
  async create(data: RecipeInput): Promise<RecipeModel> {
    return {} as any
  }

  async findAll(recipesArgs: RecipesArgs): Promise<RecipeModel[]> {
    return [] as RecipeModel[]
  }

  async findOneById(id: string): Promise<RecipeModel> {
    return {} as any
  }

  async remove(id: string): Promise<boolean> {
    return true
  }
}
