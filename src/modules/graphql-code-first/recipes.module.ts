import { Module } from '@nestjs/common'
import { DateScalar } from '../../common/scalars/date.scalar'
import { RecipesResolver } from './recipe.resolver'
import { RecipesService } from './recipes.service'

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar]
})
export class RecipesModule {}
