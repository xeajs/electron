import Koa from 'koa'
import { createListen } from './helpers/listen'
import { initialization } from './initialization'

initialization().then(async () => {
  const app = new Koa()

  createListen(app)
})
