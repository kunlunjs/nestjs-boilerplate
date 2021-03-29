import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class TypeOrmMySQLEntity {
  @PrimaryGeneratedColumn()
  id: string
}
