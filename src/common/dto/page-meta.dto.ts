import { ApiProperty } from '@nestjs/swagger'

import { PageOptionsDto } from './page-options.dto'

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  itemCount: number
}

export class PageMetaDto {
  // 当前页数
  @ApiProperty()
  readonly page: number

  // 每页数量
  @ApiProperty()
  readonly take: number

  // 总数
  @ApiProperty()
  readonly itemCount: number

  // 总页数
  @ApiProperty()
  readonly pageCount: number

  // 是否有前一页
  @ApiProperty()
  readonly hasPreviousPage: boolean

  // 是否有下一页
  @ApiProperty()
  readonly hasNextPage: boolean

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
    this.page = pageOptionsDto.page
    this.take = pageOptionsDto.take
    this.itemCount = itemCount
    this.pageCount = Math.ceil(this.itemCount / this.take)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}
