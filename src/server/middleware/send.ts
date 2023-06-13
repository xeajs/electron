import Koa from 'koa'
import getStatusMessage from 'statuses'

declare module 'koa' {
  type IThrowTypes = { code?: number; message?: string } | string
  interface DefaultContext {
    send200(body?: {}): void

    send400(): void
    send400(code: number): void
    send400(message: string): void
    send400(code: number, message: string): void

    send401(): void
    send403(): void
    send404(): void
    send500(): void
  }
}

export function useSendTool() {
  return async function (ctx: Koa.Context, next: Koa.Next) {
    ctx.send200 = function (body) {
      ctx.status = 200
      ctx.body = body || ''
    }
    ctx.send400 = function (...body) {
      let code = 400
      if (typeof body[0] === 'number') code = body[0]
      let message = getStatusMessage(400)
      if (typeof body[0] === 'string') message = body[0]
      if (typeof body[1] === 'string') message = body[1]
      ctx.status = 400
      ctx.body = { code, message }
    }
    ctx.send401 = function () {
      ctx.status = 401
      ctx.body = { code: 401, message: getStatusMessage(401) }
    }
    ctx.send403 = function () {
      ctx.status = 403
      ctx.body = { code: 403, message: getStatusMessage(403) }
    }
    ctx.send404 = function () {
      ctx.status = 404
      ctx.body = { code: 404, message: getStatusMessage(404) }
    }
    ctx.send500 = function () {
      ctx.status = 500
      ctx.body = { code: 500, message: getStatusMessage(500) }
    }

    return next()
  }
}
