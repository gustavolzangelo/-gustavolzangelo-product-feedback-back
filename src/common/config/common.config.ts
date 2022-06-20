import { registerAs } from '@nestjs/config'

export default registerAs('common', () => ({
  port: process.env.PORT,

  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60'),
    limit: parseInt(process.env.RATE_LIMIT_REQUESTS || '250'),
  },

  isDev: () => process.env.BUILD_ENV === 'dev',
  isTest: () => process.env.BUILD_ENV === 'test',
  isStg: () => process.env.BUILD_ENV === 'stg',
  isPrd: () => process.env.BUILD_ENV === 'prd',
}))
