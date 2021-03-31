import { Public } from '@/common/decorators'
import { ParseIntPipe } from '@/common/pipes'
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
  ParseArrayPipe
} from '@nestjs/common'
import { Request } from 'express'
import { CreateRESTfulDto } from './dto/create-restful.dto'
import { UpdateRESTfuldto } from './dto/update-restful.dto'

@Controller('restful')
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
  create(@Body() createRESTfulDto: CreateRESTfulDto) {
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
    console.log('PUT /api/restful ', updateRESTfulDtos)
    return {}
  }
}
