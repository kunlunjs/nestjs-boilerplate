import type { ValidationArguments } from 'class-validator'
import {
  Contains,
  IsDate,
  IsEmail,
  IsEnum,
  IsFQDN,
  IsInt,
  IsNumberString,
  IsOptional,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidateNested
} from 'class-validator'
import {
  CustomStringValidator,
  IsLongerThan,
  IsUserAlreadyExist
} from '@/common/validators/custom.validator'
import { Type } from 'class-transformer'

enum EGender {
  'male' = 'male',
  'female' = 'female'
}

interface Point {
  x: number
  y: number
}

class Tag {
  @Length(10, 20, {
    message: 'Tag is too short or long'
  })
  name: string
}

class Email {
  @IsEmail()
  email: string
}

/**
 * 默认都是 IsNotEmpty() 的
 */
export class CreateRESTfulDto extends Email {
  // 不参与校验
  extra: string

  // 姓名
  @Length(6, 20)
  name: string

  // 自定义异步校验 值为 "admin" 或 "user" 则校验失败
  @IsUserAlreadyExist({
    message: 'User with name $value already exists'
  })
  firstName: string

  // 字段关联校验，比 firstName 长
  @IsLongerThan('firstName', {
    message: "User's lastName must be longer than firstName"
  })
  lastName: string

  // 最小长度 2
  @MinLength(2, {
    /**
     * 自定义校验错误返回，message 的三种使用方式
     */
    // message: 'Title is too short. ',
    // 可用 $value, $property, $target, $contraint1,...$contraintn
    // here, $constraint1 will be replaced with "2", and $value with actual supplied value
    // message:
    //   'Title is too short. Minimal length is $constraint1 characters, but actual is $value'
    message: (args: ValidationArguments): string => {
      if (args.value.length < 2) {
        return 'Too short, minimum length is 2 character'
      } else {
        return (
          'Too short, minimum length is ' + args.constraints[0] + ' characters'
        )
      }
    }
  })
  title: string

  // 文本包含 my
  @Contains('my')
  introduction: string

  // // 枚举
  @IsEnum(EGender)
  gender: EGender

  // // 1 ~ 120 的数字
  @IsInt()
  @Min(1)
  @Max(120)
  age: number

  // @IsFQDN()
  // site: string

  // 日期
  @Type(() => Date) // 将字符串时间转为 Date 对象类型，可以放在 @IsDate() 下面
  @IsDate()
  createdDate: Date

  // 对象数组
  @ValidateNested()
  tags1: Array<Record<string, any>>

  // TODO 对象数组
  @ValidateNested()
  tags2: Tag[]

  // 标签，数组中每一项都要符合要求（长度小于等于2）
  @MaxLength(2, {
    each: true
  })
  set1: Set<string> // 表示不能重复

  @ValidateNested()
  set2: Set<Tag>

  // // 标签，数组中每一个都要符合要求
  // @MaxLength(2, {
  //   each: true
  // })
  // map1: Map<string, Tag>

  // @ValidateNested()
  // map2: Map<string, Tag>

  // // 多维数组
  // @ValidateNested()
  // martrix: Point[][]

  // 自定义文本校验
  // 值为 custom string 才能通过校验
  @Validate(CustomStringValidator, {
    message: 'Wront custom string'
  })
  custom: string
}
