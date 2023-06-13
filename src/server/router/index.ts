import Router from '@koa/router'
// import logger from 'koa-logger'
import { Controller } from 'src/server/controller'
import { authVerify } from 'src/server/helper/auth'
import { useSendTool } from 'src/server/middleware/send'

const router = new Router()
export default router
router.use(useSendTool())

router.all('/ping', Controller.Hello.ping)
router.get('/v1/login', Controller.User.login)
router.get('/v1/logout', authVerify(), Controller.User.logout)
