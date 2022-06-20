import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import * as cookieParser from 'cookie-parser'

describe('User', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .useMocker((token) => {
      //   if (token === JwtPassportStrategy) {
      //     return null
      //   }
      // })
      .compile()

    app = moduleRef.createNestApplication()
    app.use(cookieParser('secret'))
    await app.init()
  })

  // app.getHttpServer().get('/users', (req, res) => {
  //   console.log('oi')
  // })

  // httpServer.post('/login', (req, res) => {
  //   {
  //     console.log(req, res)
  //   }
  // })

  it(`/GET users without authentication`, async () => {
    // const httpServer: HttpServer = app.getHttpServer()
    // const response = await request(app.getHttpServer())
    //   .post('/users/login')
    //   .send({ username: 'gustavo', password: '123456789' })
    //   .expect(200)
    // return request(app.getHttpServer()).get('/users').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
