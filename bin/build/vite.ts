import vite, { InlineConfig } from 'vite'

export async function serve(inlineOptions: InlineConfig) {
  try {
    const viteServer = await vite.createServer(inlineOptions)
    if (!viteServer.httpServer) throw new Error('HTTP server not available')
    await viteServer.listen()
    viteServer.printUrls()
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (e: any) {
    console.error(`error when starting vite dev server:\n${e.stack}`)
    process.exit(1)
  }
}
export function build(inlineOptions: InlineConfig) {
  vite.build(inlineOptions).catch((e) => {
    console.error(`error during vite build:\n${e.stack}`)
    process.exit(1)
  })
}
