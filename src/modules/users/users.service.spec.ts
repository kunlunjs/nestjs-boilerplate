import { Test, TestingModule } from '@nestjs/testing'
import { UserEntity, UsersService } from '../users/users.service'

describe('UserService', () => {
  let service: UsersService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    }).compile()

    service = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it.each`
    name      | returnVal
    ${'john'} | ${{ userId: 1, username: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: UserEntity }) => {
      expect(await service.findOne(name)).toEqual(returnVal)
    }
  )
})
