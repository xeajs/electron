import Koa from 'koa'
import { createListen } from './helpers/listen'
import { createStatic } from './helpers/static'
import { initialization } from './initialization'

initialization().then(() => {
  const app = new Koa()

  createListen(app)
  createStatic(app)
})
