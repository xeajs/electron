import { build, createServer } from 'vite'

export async function renderStartServer() {
  try {
    const server = await createServer({ server: { host: true }, clearScreen: false })

    if (!server.httpServer) {
      throw new Error('HTTP server not available')
    }

    await server.listen()

    server.printUrls()
  } catch (e) {
    console.error(`error when starting dev server:\n${e.stack}`)
    process.exit(1)
  }
}
export async function renderBuild() {
  try {
    await build()
  } catch (e) {
    console.error(`error during build:\n${e.stack}`)
    process.exit(1)
  }
}
