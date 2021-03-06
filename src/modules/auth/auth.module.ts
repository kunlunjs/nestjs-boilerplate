import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@/common/strategies/jwt.stategy'
import { jwtConstants } from '@/common/strategies/constants'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { LocalStrategy } from '@/common/strategies/local.strategy'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // PassportModule.register({
    //   session: true
    // }),
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
    // 全局路由保护，建议写到 app.module 的 providers 中
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ],
  exports: [AuthService]
})
export class AuthModule {}
