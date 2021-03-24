# Nest Pipe

![picture 2](../public/images/882c771dd3b6a5c1528755689b98a271085146a3d6e5b23b0a7561552e85f44f.png)  

https://docs.nestjs.com/pipes#pipes


## Nest 自带 Pipe

- `ParseDefaultValuePipe`
- `ParseArrayPipe`
- `ParseBoolPipe`
- `ParseIntPipe`
- `ParseUUIDPipe`
- `ValidationPipe`

## 基本使用

```ts
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // value 是当前处理的方法参数（被路由处理方法接收之前）
  // metadata 是当前处理方法的参数的元数据
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (!!errors.length) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}

```

## 接口
`ArgumentMetadata`
```ts
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom'
  metatype?: Type<unkown>
  data?: string
}
```