import { Context } from 'koa'
import { signAuth } from 'src/server/helper/auth'
import { Service } from 'src/server/service'

export class User {
  static async login(ctx: Context) {
    ctx.send200(signAuth(9))

    const user = await Service.User.query(8)
  }
  static logout(ctx: Context) {
    // ctx.send400(String(ctx.state.user.id))
    // ctx.send401()
    // ctx.send403()
    // ctx.send404()
    ctx.send500()
  }
}
