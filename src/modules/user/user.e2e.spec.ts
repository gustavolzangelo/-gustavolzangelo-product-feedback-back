import authConfig from '@common/config/auth.config'
import commonConfig from '@common/config/common.config'
import { JwtPassportStrategy } from '@modules/utils/jwt-strategy'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { UserModule } from './user.module'
import { UserService } from './user.service'

describe('User', () => {
  let app: INestApplication
  const userService = { findAll: () => ['test'] }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot({
          load: [commonConfig, authConfig],
        }),
      ],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .useMocker((token) => {
        if (token === JwtPassportStrategy) {
          return null
        }
      })
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      data: userService.findAll(),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
