import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Req,
  Query,
  Put,
  ParseIntPipe,
  ParseArrayPipe,
  UseGuards,
  Injectable,
  ExecutionContext,
  CanActivate,
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  UseFilters,
  UsePipes,
  PipeTransform,
  ArgumentMetadata,
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Public } from '@/common/decorators'
// import { ParseIntPipe } from '@/common/pipes'
import { CreateRESTfulDto } from './dto/create-restful.dto'
import { UpdateRESTfuldto } from './dto/update-restful.dto'
import { log } from '@/utils/log'
import { tap } from 'rxjs/operators'

@Injectable()
class TestControllerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    log(`[${TestControllerGuard.name}]`)
    return true
  }
}

@Injectable()
class TestMethodGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    log(`[${TestMethodGuard.name}]`)
    return true
  }
}

@Injectable()
class TestControllerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now()
    log(`Enter ${TestControllerInterceptor.name}`)
    return next.handle().pipe(
      tap(() => {
        log(`Leave ${TestControllerInterceptor.name} +${Date.now() - now}ms`)
      })
    )
  }
}

@Injectable()
class TestMethodInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now()
    log(`Enter ${TestMethodInterceptor.name}`)
    return next.handle().pipe(
      tap(() => {
        log(`Leave ${TestMethodInterceptor.name} +${Date.now() - now}ms`)
      })
    )
  }
}

@Injectable()
class TestControllerPipe implements PipeTransform<any> {
  entry: string
  constructor(entry?: string) {
    if (entry) {
      this.entry = entry
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const entry = this.entry ? `[${this.entry}] ` : ''
    log(`${entry}${TestControllerPipe.name}`)
    // 可以抛出异常
    return value
  }
}

@Injectable()
class TestMethodPipe implements PipeTransform<any> {
  entry: string
  constructor(entry?: string) {
    if (entry) {
      this.entry = entry
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const entry = this.entry ? `[${this.entry}] ` : ''
    log(`${entry}${TestMethodPipe.name}`)
    // 可以抛出异常
    return value
  }
}

@Catch()
export class TestControllerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    log(`${TestControllerFilter.name}`)
    response.status(400).json({
      data: null,
      status: 400,
      message: exception,
      error: exception
    })
  }
}

@Catch()
export class TestMethodFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    log(`${TestMethodFilter.name}`)
    response.status(400).json({
      data: null,
      status: 400,
      message: exception,
      error: exception
    })
  }
}

@Controller('restful')
@UseGuards(TestControllerGuard)
@UseInterceptors(TestControllerInterceptor)
@UsePipes(new TestControllerPipe(RESTfulController.name))
@UseFilters(TestControllerFilter)
export class RESTfulController {
  /**
   * GET /api/restful
   * curl http://localhost:3000/api/restful
   */
  @Public()
  @Get()
  findMany(@Req() req: Request) {
    console.log(`GET ${req.originalUrl}`)
    return []
  }

  /**
   * /restful/:id?id=1,2,3,4,5&sort
   * @Param() @Query() @Body() 都支持多管道校验
   * curl http://localhost:3000/api/restful/1?sort&id=1,2,3
   * curl http://localhost:3000/api/restful/abc
   */
  @Public()
  @Get(':id')
  @UseGuards(TestMethodGuard)
  @UseInterceptors(TestMethodInterceptor)
  @UsePipes(new TestMethodPipe('method'))
  @UseFilters(TestMethodFilter)
  findOne(
    @Req() req: Request,
    @Param('id', new ParseIntPipe() /*, ...OtherParsePipe*/) id: number,
    // 支持 query 中 sort
    @Query('sort', new ParseBoolPipe()) sort: boolean,
    // 校验query 中 id
    @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[]
  ) {
    console.log(
      `GET ${req.originalUrl} ${RESTfulController.name} ${this.findOne.name}`
    )
    return {}
  }

  /**
   * 只要 CreateRESTfulDto 中有校验装饰器且 app.useGlobalPipes(new ValidationPipe(...)) 则生效
   */
  @Public()
  @Post()
  @UseGuards(TestMethodGuard)
  @UseInterceptors(TestMethodInterceptor)
  @UsePipes(new TestMethodPipe('method'))
  @UseFilters(TestMethodFilter)
  create(
    @Query('sort', new ParseBoolPipe()) sort: boolean,
    @Body() createRESTfulDto: CreateRESTfulDto
  ) {
    console.log(
      `POST /api/restful ${JSON.stringify(
        createRESTfulDto
      )} ${Object.prototype.toString.call(createRESTfulDto.createdDate)}`
    )
    return {}
  }

  @Public()
  @Put(':id')
  // 不支持如下方式
  // update(@Body() updateRESTfulDtos: UpdateRESTfuldto[])
  // 支持
  update(
    @Body(new ParseArrayPipe({ items: UpdateRESTfuldto }))
    updateRESTfulDtos: UpdateRESTfuldto[]
  ) {
    console.log(`PUT /api/restful ${JSON.stringify(updateRESTfulDtos)}`)
    return {}
  }
}
