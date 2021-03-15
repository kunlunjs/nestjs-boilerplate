import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // 详见 https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  // payload 中 sub 和 username 来自 constructor 解析出来的 token 内含信息
  // { username: 'john', sub: 1, iat: 1615799315, exp: 1615799375 }
  async validate(payload: any) {
    // sub 来自 jwt 标准
    return { userId: payload.sub, username: payload.username }
  }
}
