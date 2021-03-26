import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AbstractDto } from './dto/abstact.dto'
import { UtilsService } from './providers/utils.service'

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at'
  })
  updatedAt: Date

  abstract dtoClass: new (entity: AbstractEntity, options: any) => T

  toDto(options: any) {
    return UtilsService.toDto(this.dtoClass, this, options)
  }
}
