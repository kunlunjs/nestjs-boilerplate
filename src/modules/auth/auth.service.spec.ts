import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtStrategy } from '../../common/strategies/jwt.stategy'
import { LocalStrategy } from '../../common/strategies/local.strategy'
import { jwtConstants } from '../../common/strategies/constants'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
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
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()

    service = moduleRef.get<AuthService>(AuthService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

describe('validateUser', () => {
  let service: AuthService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '600s' }
        })
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()

    service = moduleRef.get<AuthService>(AuthService)
  })

  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUser('maria', 'guess')
    expect(res.userId).toEqual(3)
  })

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser('xxx', 'xxx')
    expect(res).toBeNull()
  })
})

describe('validateLogin', () => {
  let service: AuthService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn }
        })
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy]
    }).compile()

    service = moduleRef.get<AuthService>(AuthService)
  })

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({ username: 'maria', userId: 3 })
    expect(res.access_token).toBeDefined()
  })
})
