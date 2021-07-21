import type { AbstractEntity } from '../abstract.entity'

export class AbstractDto {
  id: string
  // 创建时间
  createdAt: Date
  // 更新时间
  updatedAt: Date

  constructor(entity: AbstractEntity) {
    this.id = entity.id
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
  }
}
