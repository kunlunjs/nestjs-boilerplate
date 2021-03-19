import { Body, Controller, Get, Post } from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './schemas/cat.schema'

@Controller('mongoose')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // POST /api/mongoose/cat
  /**
    {
        "_id": "605450405aca945dfddea88d",
        "name": "name",
        "age": 23,
        "bread": "bread",
        "__v": 0
    }
   */
  @Post('cat')
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    const result = await this.catsService.create(createCatDto)
    return result
  }

  // GET /api/mongoose/cats
  /**
    [
        {
            "_id": "605450405aca945dfddea88d",
            "name": "name",
            "age": 23,
            "bread": "bread",
            "__v": 0
        }
    ]
   */
  @Get('cats')
  async findAll(): Promise<Cat[]> {
    const result = await this.catsService.findAll()
    return result
  }
}
