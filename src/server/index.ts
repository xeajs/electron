import Koa from 'koa'
import { createServer } from 'node:http'
import { deploy } from './helper/deploy'
import { listen } from './helper/listen'
import router from './router'
import socket from './socket'

const app = new Koa()
app.use(router.routes())
app.use(router.allowedMethods())

const server = createServer(app.callback())
socket(server)
listen(server)
deploy(app)
