import { Context } from 'koa'

export class Hello {
  static async ping(ctx: Context) {
    ctx.body = 'pong'
  }
}
