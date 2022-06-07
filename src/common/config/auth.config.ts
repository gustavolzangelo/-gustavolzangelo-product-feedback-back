import { registerAs } from '@nestjs/config'

// Keep the cookie's maxAge equal to the token's expiresIn
const defaultCookieMaxAge = 604800000 // 7 days in ms
const defaultTokenExpiresIn = `${defaultCookieMaxAge / 1000}s` // defaultCookieMaxAge in sec

export default registerAs('auth', () => ({
  // TODO: use private-public key pair instead simple string secret
  secret: process.env.AUTH_JWT_SECRET + process.env.BUILD_ENV,
  signOptions: {
    expiresIn: process.env.AUTH_JWT_EXPIRES_IN || defaultTokenExpiresIn,
  },
  cookieMaxAge:
    parseInt(process.env.AUTH_COOKIE_MAX_AGE) || defaultCookieMaxAge,
  cookieSessionName: process.env.AUTH_COOKIE_SESSION_NAME || '_session_cookie',
  cookieSignName: process.env.AUTH_COOKIE_SIGN_NAME || '_sign_life',
}))
