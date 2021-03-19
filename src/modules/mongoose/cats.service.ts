import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat, CatDocument } from './schemas/cat.schema'
// import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>
  ) {}
  // 对应 cats.module.ts 中 method 2，Cat 来自于 ./interfaces/cat.interface
  // constructor(@Inject('CAT_MODEL') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto)
    return createdCat.save()
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec()
  }
}
