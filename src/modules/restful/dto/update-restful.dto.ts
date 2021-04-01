import {
  PartialType,
  OmitType,
  PickType,
  IntersectionType
} from '@nestjs/mapped-types'
import { IsNumberString } from 'class-validator'
import { CreateRESTfulDto } from './create-restful.dto'

class AdditionalDto {
  color: string
}

// 继承 CreateRESTfulDto 所有字段及其校验然后都变为可选的
// export class UpdateRESTfuleDto extends PartialType(CreateRESTfulDto) {}

// 选择 CreateRESTfulDto 中的 age 字段然后将其变为可选的
// export class UpdateRESTfuldto extends PartialType(
//   PickType(CreateRESTfulDto, ['age'] as const)
// ) { }

// 排除掉 CreateRESTfulDto 中的 age 字段然后将其它字段都变为可选的
export class UpdateRESTfuldto extends PartialType(
  OmitType(CreateRESTfulDto, ['age'] as const)
) {
  // ID
  @IsNumberString()
  id: number
}

// 组合成新类型（包含两者）
// export class UpdateRESTfuldto extends IntersectionType(CreateRESTfulDto, AdditionalDto) {}
