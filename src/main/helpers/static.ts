import Koa from 'koa'
import serveStatic from 'koa-static'
import path from 'node:path'

export const createStatic = async (app: Koa) => {
  app.use(serveStatic(path.resolve(__dirname, '../'), { gzip: true }))
}
