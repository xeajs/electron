import Koa from 'koa'
import serveStatic from 'koa-static'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import path from 'node:path'

export const deploy = async (app: Koa) => {
  app.use(historyApiFallback())
  app.use(serveStatic(path.resolve(__dirname, '../'), { gzip: true }))
}
