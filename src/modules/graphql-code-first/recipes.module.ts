import { Module } from '@nestjs/common'
import { DateScalar } from '@/graphql/scalars/date.scalar'
import { RecipesResolver } from './recipe.resolver'
import { RecipesService } from './recipes.service'

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar]
})
export class RecipesModule {}
