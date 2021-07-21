import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { jwtConstants } from '../strategies/constants'

/**
 * 创建自定义参数装饰器
 */
export const CustomDecorator = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    if (!req.user) {
      return !!data ? req.user[data] : req.user
    }

    // 使用 jsonwebtoken 解析出 token
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(' ')
      : null
    if (token && token[1]) {
      const decoded: any = jwt.verify(token[1], jwtConstants.secret)
      return !!data ? decoded[data] : decoded.user
    }
  }
)
