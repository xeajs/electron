import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa'

const secret = 'asdf'

const resolver = function (ctx: Context) {
  const header = ctx.headers.authorization
  const cookie = ctx.cookies.get('authorization')
  const search = ctx.request.query.authorization as string | undefined
  return cookie || header || search
}

function signAuth(id: number) {
  return jwt.sign({ id }, secret, { algorithm: 'HS256', expiresIn: '7d' })
}

function authVerify(passthrough?: true) {
  return async (ctx: Context, next: Next) => {
    const token = resolver(ctx)
    if (!token) return ctx.throw(401)

    try {
      const decoded = jwt.verify(token, secret, { complete: false })
      ctx.state.user = decoded
      ctx.state.token = token
    } catch (e) {
      if (!passthrough) return ctx.throw(401, { originalError: e })
      ctx.state.jwtOriginalError = e
    }

    return next()
  }
}

export { authVerify, signAuth }
