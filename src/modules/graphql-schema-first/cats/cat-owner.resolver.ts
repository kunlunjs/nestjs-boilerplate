import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import type { Cat, Owner } from '../graphql.schema'
import type { OwnersService } from '../owners/owners.service'

@Resolver('Cat')
export class CatOwnerResolver {
  constructor(private readonly ownerService: OwnersService) {}

  @ResolveField()
  async owner(@Parent() cat: Cat & { ownerId: number }): Promise<Owner> {
    return this.ownerService.findOneById(cat.ownerId)
  }
}
