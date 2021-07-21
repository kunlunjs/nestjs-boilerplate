import type { NestMiddleware } from '@nestjs/common'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConstants } from '../strategies/constants'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // constructor(private readonly userService: UserService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (authorization && authorization.split(' ')[1]) {
      const token = authorization.split(' ')[1] as string
      const decoded = jwt.verify(token, jwtConstants.secret)
      const user = {}
      // const user = await this.userService.findById(decoded.id)

      if (!user) {
        throw new NotFoundException('User not found')
      }

      // req.user = user.user
      next()
    } else {
      throw new UnauthorizedException('Not authorized')
    }
  }
}
