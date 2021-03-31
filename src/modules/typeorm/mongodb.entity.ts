import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

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
