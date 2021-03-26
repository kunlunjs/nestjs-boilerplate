import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Body,
  UploadedFile,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Multer } from 'multer'
import { Express, Response } from 'express'
import { AppService } from './app.service'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserEntity } from './entities/user.entity'
import { RoleEntity } from './entities/role.entity'
import { LocalAuthGuard } from './common/guards/local-auth.guard'
import { AuthService } from './modules/auth/auth.service'
import { Public } from './common/decorators/public.decorator'
import { PoliciesGuard } from './common/guards/policies.guard'
import { CheckPolicies } from './common/decorators/check-policies.decorator'
import { Action } from './common/constants/action.enum'
import { AppAbility, Article } from './modules/cals/cals-ability.factory'
import { ReadArticlePolicyHandler } from './modules/cals/policy-handler'

type File = Express.Multer.File

@Controller()
@UseInterceptors(CacheInterceptor)
@UseInterceptors(new LoggingInterceptor(AppController.name))
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  // GET /api
  @Get()
  @UseInterceptors(new LoggingInterceptor(`${AppController.name}/getHome`))
  getHome() {
    return this.appService.getHome()
  }
  /* -------------------------------------------------------- */
  /**
   * POST /api/auth/login
   * @param {{username: 'john', password: 'changeme'}} req.user
   * @returns {access_token: '...'}
   *
   * curl -X POST \
   * http://localhost:3000/api/auth/login -d '{"username": "john", "password": "changeme"}' \
   * -H "Content-Type: application/json"
   *
   * authService.validateUser -> userService.findOne() -> authService.login
   */
  // @Public()
  @UseGuards(LocalAuthGuard) // 等效于 @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: Express.Request) {
    // req.user 由 AuthGuard('local') 自动将 req.body {username, password} 注入 req.user
    return this.authService.login(req.user)
  }

  /**
   * 获取用户资料 http request 携带 token
   * GET /api/profile
   * @param {Bearer ...} req.header.Authorization
   * @returns {userId: 1, username: 'john'}
   *
   * JwtStrategy.constructor -> JwtStrategy.validate
   *
   * curl http://localhost:3000/api/profile -H "Authorization: Bearer ..."
   */
  // @Public()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Express.Request) {
    // req.user 由 JwtStrategy.validate 返回
    return req.user
  }

  /**
   * @Public
   * 当配置了 global guard（路由保护，auth.module.ts） 时，让这个路由公开，可作用于 controller 上
   * 方法和控制器级别的 guard 受此钳制
   * 默认返回 { "statusCode": 401, "message": "Unauthorized" }
   */
  @Public()
  @Get('public')
  async public() {
    return []
  }

  /* -------------------------------------------------------- */
  /**
   * 演示基于 @cals/ability 的权限处理
   */
  @Public()
  @Get('cals')
  @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  // 等效于
  @CheckPolicies(new ReadArticlePolicyHandler())
  async cals() {
    return []
  }

  /* -------------------------------------------------------- */
  /**
   * 上传
   * POST /api/upload 在PostMan 中选择 form-data key: file value: 选择文件
   * https://github.com/expressjs/multer#multeropts
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() body: { name?: string }, @UploadedFile() file: File) {
    return {
      ss: 1,
      body,
      file: file.buffer.toString()
    }
  }

  /* -------------------------------------------------------- */
  /**
   * 返回自动序列化
   * http://localhost:3000/api/serializer
   */
  @Get('serializer')
  serializer(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'Kmail',
      lastName: 'Mysliwiec',
      password: 'password',
      role: new RoleEntity({ id: 1, name: 'admin' })
    })
  }
}
