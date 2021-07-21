import type { ObjectID } from 'typeorm'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class TypeOrmMongoEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  page: string

  @Column()
  json: Record<string, any>

  @Column()
  description: string

  @Column()
  isPublished: boolean
}
