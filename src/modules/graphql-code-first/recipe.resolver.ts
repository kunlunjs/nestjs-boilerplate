import { NotFoundException } from '@nestjs/common'
import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import type { RecipeInput } from './dto/new-recipe.input'
import type { RecipesArgs } from './dto/recipes.args'
import { RecipeModel } from './models/recipe.model'
import type { RecipesService } from './recipes.service'

const pubSub = new PubSub()

@Resolver(of => RecipeModel)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  /**
    {
      recipes {
        id
        title
        description
        creationDate
        ingredients
      }
    }
   */
  @Query(returns => RecipeModel)
  async recipe(@Args('id') id: string): Promise<RecipeModel> {
    const recipe = await this.recipesService.findOneById(id)
    if (!recipe) {
      throw new NotFoundException(id)
    }
    return recipe
  }

  @Query(returns => [RecipeModel])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<RecipeModel[]> {
    return this.recipesService.findAll(recipesArgs)
  }

  @Mutation(returns => RecipeModel)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: RecipeInput
  ): Promise<RecipeModel> {
    const recipe = await this.recipesService.create(newRecipeData)
    pubSub.publish('recipeAdded', {
      recipeAdded: recipe
    })
    return recipe
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id)
  }

  @Subscription(returns => RecipeModel)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded')
  }
}
