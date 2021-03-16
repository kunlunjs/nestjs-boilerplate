import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../../common/strategies/jwt.stategy'
import { jwtConstants } from '../../common/strategies/constants'
import { LocalStrategy } from '../../common/strategies/local.strategy'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn
      }
    })
  ],
  // providers: [AuthService, LocalStrategy, JwtStrategy],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
    // 全局路由保护
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ],
  exports: [AuthService]
})
export class AuthModule {}
