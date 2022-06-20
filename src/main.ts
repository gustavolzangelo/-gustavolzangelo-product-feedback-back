import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import * as morgan from 'morgan'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = app.get(ConfigService)
  const isDev = config.get('common.isDev')
  const isTest = config.get('common.isTest')

  const secret = config.get('auth.secret')

  console.log(isTest())

  app.use(helmet())
  app.use(cookieParser(secret))
  // !isTest() && app.use(csurf({ cookie: { httpOnly: true, secure: !isDev() } }))
  app.use(morgan(isDev() ? 'dev' : 'tiny'))

  await app.listen(3000)
}
bootstrap()
