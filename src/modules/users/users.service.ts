import { Injectable } from '@nestjs/common'

export type UserEntity = any

/**
 * 用户数据层操作
 */
@Injectable()
export class UsersService {
  private readonly users: UserEntity[]

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme'
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret'
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess'
      }
    ]
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.users.find(user => user.username === username)
  }
}
