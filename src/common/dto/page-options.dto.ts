import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { EOrder } from '../constants/order.enum'

export class PageOptionsDto {
  // 排序 ASC
  @ApiPropertyOptional({
    enum: EOrder,
    default: EOrder.ASC
  })
  @IsEnum(EOrder)
  @IsOptional()
  readonly order: EOrder = EOrder.ASC

  // 当前页
  @ApiPropertyOptional({
    minimum: 1,
    default: 1
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1

  // 每页数量
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  @IsOptional()
  readonly take: number = 10

  // 起始位置
  get skip(): number {
    return (this.page - 1) * this.take
  }

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly q?: string
}
