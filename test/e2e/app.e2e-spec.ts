import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { readFileSync } from 'fs-extra'
import { AppModule } from '../../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // beforeAll(async () => {})
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should get a JWT then successfully make a call', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'john', password: 'changeme' })
      .expect(201)

    const token = loginReq.body.access_token
    return request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ userId: 1, username: 'john' })
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  it('should allow for file uploads', () => {
    return request(app.getHttpServer())
      .post('/api/upload')
      .attach('file', './package.json')
      .field('name', 'filename')
      .expect(201)
      .expect({
        body: {
          name: 'filename'
        },
        file: readFileSync('./package.json')
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
