import invoke from '@/share/invoke'
import mitt from '@/share/mitt'
import Koa from 'koa'
import appConfig from '~/app.config'

export const createListen = async (app: Koa, callback?: () => void) => {
  app.listen(appConfig.PORT, () => {
    console.info(``)
    console.info(`serve running at:`)
    console.info(`- Main Process Server: ` + `http://localhost:${appConfig.PORT}/`)
    // console.info(`- Render Process Server: `.rainbow + `http://localhost:${GetProcessPort().Render}/`.blue)
    // console.info(`- 外部存储目录: `.rainbow + `${path.resolve($$.AppInfo.WorkPath)}`.blue)
    // console.info(`- appId: `.rainbow + `${ElectronBuilderConfig.appId}`.blue)

    mitt.emit('main:createBrowserWindow', '/')
    invoke(callback)
  })
}
