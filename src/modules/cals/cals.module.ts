import { Module } from '@nestjs/common'
import { CalsAbilityFactory } from './cals-ability.factory'

@Module({
  providers: [CalsAbilityFactory],
  exports: [CalsAbilityFactory]
})
export class CalsModule {}
