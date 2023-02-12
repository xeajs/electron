import Koa from 'koa'
import invoke from 'src/share/invoke'
import mitt from 'src/share/mitt'
import { mainPort, renderPort } from 'src/share/port'

export const createListen = async (app: Koa, callback?: () => void) => {
  app.listen(mainPort, () => {
    console.info(`serve running at:`)
    console.info(`- Main Process Server: ` + `http://localhost:${renderPort}/`)
    // console.info(`- Render Process Server: ` + `http://localhost:${appConfig.renderPort}/`)
    // console.info(`- 外部存储目录: `.rainbow + `${path.resolve($$.AppInfo.WorkPath)}`.blue)
    // console.info(`- appId: `.rainbow + `${ElectronBuilderConfig.appId}`.blue)

    mitt.emit('main:createBrowserWindow', '/')
    invoke(callback)
  })
}
