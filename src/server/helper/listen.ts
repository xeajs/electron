import address from 'address'
import detect from 'detect-port'
import { Server } from 'node:http'
import { mainPort } from 'src/share/port'

export async function listen(server: Server) {
  const port = await detect(mainPort)
  server.listen(port, '0.0.0.0', () => {
    console.info(`➜ Local:   http://localhost:${port}/`)
    console.info(`➜ Network: http://${address.ip()}:${port}/`)
    console.info(`➜ Socket:  ws://${address.ip()}:${port}/`)

    // console.info(`- Render Process Server: ` + `http://localhost:${appConfig.renderPort}/`)
    // console.info(`- 外部存储目录: `.rainbow + `${path.resolve($$.AppInfo.WorkPath)}`.blue)
    // console.info(`- appId: `.rainbow + `${ElectronBuilderConfig.appId}`.blue)
  })
}
