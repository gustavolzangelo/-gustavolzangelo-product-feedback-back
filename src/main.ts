import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import * as morgan from 'morgan'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  const config = app.get(ConfigService)
  const isDev = config.get('common.isDev')

  const secret = config.get('auth.secret')

  app.use(helmet())
  app.use(cookieParser(secret))
  // !isTest() && app.use(csurf({ cookie: { httpOnly: true, secure: !isDev() } }))
  app.use(morgan(isDev() ? 'dev' : 'tiny'))
  await app.listen(9000)
}
bootstrap()
